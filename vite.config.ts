import { defineConfig } from "vite";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prepare, makePages, ORIGIN, LEGACY, type Site } from "./src/pages";
import { dominantColours } from "./build/colours";
import { resized, writeSizes } from "./build/sizes";

const root = (...p: string[]) => resolve(__dirname, ...p);
const json = (f: string) => JSON.parse(readFileSync(f, "utf8"));
const attr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export default defineConfig({
  build: { target: "es2022" },
  plugins: [
    {
      // import COLOURS from "virtual:colours" → { picture: "#rrggbb" } (dominant colour of each picture)
      name: "colours",
      resolveId: id => id === "virtual:colours" ? "\0virtual:colours" : undefined,
      async load(id) { if (id === "\0virtual:colours") return `export default ${JSON.stringify(await dominantColours(__dirname))};`; },
    },
    {
      // Resized uploads: made on request while developing, written into dist after the build.
      name: "upload-sizes",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const m = decodeURIComponent((req.url || "").split("?")[0]).match(/^\/uploads\/_w\/(\d+)\/(.+)\.webp$/);
          if (!m) return next();
          const buf = await resized(__dirname, m[2], +m[1]).catch(() => null);
          if (!buf) return next();
          res.setHeader("Content-Type", "image/webp"); res.end(buf);
        });
      },
      async closeBundle() {
        const dir = root("content/projects"), names: string[] = [];
        const add = (m?: string) => { if (m && m.startsWith("/uploads/") && !m.slice(9).includes("/")) names.push(m.slice(9)); };
        for (const f of readdirSync(dir).filter(f => f.endsWith(".json"))) { const p = json(resolve(dir, f)); (p.media || []).forEach((m: any) => add(typeof m === "string" ? m : m?.src)); add(p.cover); }
        add(json(root("content/site.json")).about?.portrait);
        await writeSizes(__dirname, names);
      },
    },
    {
      // After the build, write a real HTML page for every address (title, description, link previews and the
      // page text already in place, for search engines and shared links), a 404 page and the sitemap.
      name: "site-pages",
      closeBundle() {
        const dir = root("content/projects");
        const projects = prepare(readdirSync(dir).filter(f => f.endsWith(".json")).map(f => [f.replace(/\.json$/, ""), json(resolve(dir, f))]));
        const { buildPage, paths } = makePages(projects, json(root("content/site.json")) as Site);
        const template = readFileSync(root("dist/index.html"), "utf8");
        for (const path of paths()) {
          const page = buildPage(path), url = ORIGIN + page.path;
          const html = template
            .replace(/<title>.*?<\/title>/, `<title>${attr(page.title)}</title>`)
            .replace(/(<meta name="description" content=")[^"]*/, `$1${attr(page.description)}`)
            .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
            .replace("</head>", [
              `<meta property="og:type" content="website">`,
              `<meta property="og:site_name" content="Adrien Denis-Pasquier">`,
              `<meta property="og:title" content="${attr(page.title)}">`,
              `<meta property="og:description" content="${attr(page.description)}">`,
              `<meta property="og:url" content="${url}">`,
              `<meta property="og:image" content="${attr(page.image.startsWith("/") ? ORIGIN + page.image : page.image)}">`,
              `<meta name="twitter:card" content="summary_large_image">`,
              ...(page.noindex ? [`<meta name="robots" content="noindex">`] : []),
              ...(page.jsonld ? [`<script type="application/ld+json">${JSON.stringify(page.jsonld).replace(/</g, "\\u003c")}</script>`] : []),
            ].map(t => "  " + t).join("\n") + "\n</head>")
            .replace(`<div class="lscroll" id="L"></div>`, `<div class="lscroll" id="L">${page.left}</div>`);
          const out = root("dist", page.path.slice(1));
          mkdirSync(out, { recursive: true });
          writeFileSync(resolve(out, "index.html"), html);
          if (page.path === "/") writeFileSync(root("dist/404.html"), html);   // unknown addresses show Work
        }
        // Redirect pages at the previous site's addresses (/photography/fat-cat → /work/fat-cat/ …).
        for (const [old, to] of Object.entries(LEGACY)) {
          mkdirSync(root("dist", old), { recursive: true });
          writeFileSync(root("dist", old, "index.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Adrien Denis-Pasquier</title>
<link rel="canonical" href="${ORIGIN}${to}"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${to}"><script>location.replace(${JSON.stringify(to)})</script>
</head><body><a href="${to}">${ORIGIN}${to}</a></body></html>
`);
        }
        // Sitemap with each page's pictures (for image search). Pages kept out of search engines are left out.
        const xml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        const listed = paths().map(buildPage).filter(p => !p.noindex);
        writeFileSync(root("dist/sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${listed.map(p => `  <url><loc>${ORIGIN}${p.path}</loc>${(p.pictures || []).map(u => `<image:image><image:loc>${xml(u)}</image:loc></image:image>`).join("")}</url>`).join("\n")}
</urlset>
`);
      },
    },
  ],
});
