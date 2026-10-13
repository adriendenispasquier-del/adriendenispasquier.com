import { defineConfig } from "vite";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prepare, makePages, ORIGIN, type Site } from "./src/pages";

const root = (...p: string[]) => resolve(__dirname, ...p);
const json = (f: string) => JSON.parse(readFileSync(f, "utf8"));
const attr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export default defineConfig({
  build: { target: "es2022" },
  plugins: [
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
              `<meta property="og:image" content="${attr(page.image)}">`,
              `<meta name="twitter:card" content="summary_large_image">`,
            ].map(t => "  " + t).join("\n") + "\n</head>")
            .replace(`<div class="lscroll" id="L"></div>`, `<div class="lscroll" id="L">${page.left}</div>`);
          const out = root("dist", page.path.slice(1));
          mkdirSync(out, { recursive: true });
          writeFileSync(resolve(out, "index.html"), html);
          if (page.path === "/") writeFileSync(root("dist/404.html"), html);   // unknown addresses show Work
        }
        writeFileSync(root("dist/sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths().map(p => `  <url><loc>${ORIGIN}${p}</loc></url>`).join("\n")}
</urlset>
`);
      },
    },
  ],
});
