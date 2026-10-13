import { defineConfig } from "vite";
import { copyFileSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE = "https://www.adriendenispasquier.com";

export default defineConfig({
  build: { target: "es2022" },
  plugins: [
    {
      name: "site-files",
      closeBundle() {
        const dist = (f: string) => resolve(__dirname, "dist", f);
        // GitHub Pages serves 404.html for unknown paths: a copy of the app makes /work/... addresses work.
        copyFileSync(dist("index.html"), dist("404.html"));
        // Sitemap from the project files.
        const dir = resolve(__dirname, "content/projects");
        const slugs = readdirSync(dir).filter(f => f.endsWith(".json"))
          .filter(f => { const p = JSON.parse(readFileSync(resolve(dir, f), "utf8")); return !p.draft && p.media?.length; })
          .map(f => f.replace(/\.json$/, ""));
        const urls = ["/", "/about", ...slugs.map(s => `/work/${s}`)];
        writeFileSync(dist("sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${SITE}${u}</loc></url>`).join("\n")}
</urlset>
`);
      },
    },
  ],
});
