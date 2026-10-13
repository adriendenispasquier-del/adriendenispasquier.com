# adriendenispasquier.com

Portfolio. Plain TypeScript + Vite, no framework. Deployed to GitHub Pages on every push to `main`.

```bash
npm install
npm run dev        # http://localhost:5175 (see .claude/launch.json) or the port Vite prints
npm run build      # → dist/ (also writes 404.html and sitemap.xml)
npm run typecheck
```

## Content

Everything editable lives in `content/`:

- `content/projects/<slug>.json` — one file per project; the file name is its address (`/work/<slug>`).
  - `title`, `type` (shown in the Work list), `order` (position in the list), `services`, `text`
    (paragraphs separated by a blank line), `credits` (`label` / `value`), `media`, optional `cover`, `draft`.
  - `media`: Cloudinary public ids (`v1774535107/Name_abc.jpg`), full `res.cloudinary.com` URLs,
    or `video:<id>` for videos. Order = order on the page. The first one is the cover unless `cover` is set.
- `content/site.json` — name, description, About text, practice, contact links, portrait.
- `content/settings.json` — the look: colours (default and per page), desktop and phone layout, dots.

## Tuning the look

Open the site with `?tune` (e.g. `http://localhost:5175/?tune` or the live site). A settings panel appears,
only in that browser, and changes apply live. **Copy settings** puts the JSON on the clipboard: paste it into
`content/settings.json` and commit to publish. `?tune=off` hides the panel again.

## Code

- `src/main.ts` — page changes, links, addresses (old `#/...` links are redirected).
- `src/content.ts` — reads `content/`, builds each page's text column, picture URLs.
- `src/dots.ts` — the dots: sampling text into dots, pulling magnets off and setting new ones, drawing (WebGL).
- `src/gallery.ts` — pictures, film, linked scrolling, the Work carousel, full-screen view.
- `src/state.ts` — shared elements, settings, colours and layout.
- `src/panel.ts` — the tuning panel (loaded only with `?tune`).

## Fonts

The site uses AppleMyungjo and Akkurat Mono when they're installed on the viewer's machine
(`src/styles.css`, `@font-face … local()`), and falls back to Georgia / a system monospace otherwise.
For everyone to see them, add licensed web-font files (Akkurat Mono: Lineto web licence;
AppleMyungjo is an Apple system font and generally can't be embedded — pick a licensable alternative).
