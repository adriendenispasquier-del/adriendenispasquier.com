# adriendenispasquier.com

Portfolio. Plain TypeScript + Vite, no framework. Deployed to GitHub Pages on every push to `main`.

```bash
npm install
npm run dev        # http://localhost:5175 (see .claude/launch.json) or the port Vite prints
npm run build      # → dist/: one HTML page per address, 404.html and sitemap.xml
npm run typecheck
```

## Content

Everything editable lives in `content/`:

- `content/projects/<slug>.json` — one file per project; the file name is its address (`/work/<slug>/`).
  - `title`, `type` (shown in the Work list), `order` (position in the list), `services`, `text`
    (paragraphs separated by a blank line), `credits` (`label` / `value`), `media`, optional `cover`, `draft`.
  - `media`: Cloudinary public ids (`v1774535107/Name_abc.jpg`), full `res.cloudinary.com` URLs,
    `video:<id>` for videos, or files in the site (`/uploads/name.jpg`). Order = order on the page.
    The first one is the cover (Work and link previews) unless `cover` is set.
- `content/site.json` — name, description, About text, practice, contact links, portrait.
- `content/settings.json` — the look: colours (default, and a list of pages with their own colours, by
  address: `/`, `/about/`, `/work/fat-cat/`), desktop and phone layout, dots.

## Admin

`/admin/` ([Sveltia CMS](https://sveltiacms.app), config in `public/admin/config.yml`) edits everything in
`content/`: create, edit, reorder and hide projects, the About texts, and the look. Saving commits to `main`
on GitHub and the site rebuilds itself (about a minute).

- Sign in with **Sign In with Token**: a GitHub fine-grained token for this repository only, with
  *Contents: read and write*. It is kept in that browser.
- On your own computer you can also choose **Work with Local Repository** and pick this folder: changes are
  written to the files directly (nothing is published until you commit and push).
- Uploads go to `public/uploads/` (served at `/uploads/…`). To use your Cloudinary library instead, add
  your Cloudinary API key in `config.yml` (the commented `media_libraries` block). Never put the API secret there.

## Tuning the look

Open the site with `?tune` (e.g. `http://localhost:5175/?tune` or the live site). A settings panel appears,
only in that browser, and changes apply live. **Copy settings** puts the JSON on the clipboard: paste it into
`content/settings.json` (or set the same values in /admin → Site → Look) to publish. `?tune=off` hides the
panel again.

## Code

- `src/main.ts` — page changes, links, addresses (old `#/...` links are redirected).
- `src/pages.ts` — each address's text column, pictures, title, description and preview picture. Also used
  at build time (`vite.config.ts`) to write a real HTML page per address for search engines and shared links.
- `src/media.ts` — picture and video URLs (Cloudinary).
- `src/content.ts` — reads `content/` in the browser.
- `src/dots.ts` — the dots: sampling text into dots, pulling magnets off and setting new ones, drawing (WebGL).
- `src/gallery.ts` — pictures, film, linked scrolling, the Work carousel, full-screen view.
- `src/state.ts` — shared elements, settings, colours and layout.
- `src/panel.ts` — the tuning panel (loaded only with `?tune`).

## Fonts

Redaction (titles, name, lists) and Degular Mono (body text) come from the Adobe Fonts kit `nva7btn`
(linked in `index.html`, families set in `src/styles.css`). Fonts added to that kit on fonts.adobe.com
become available here without code changes.
