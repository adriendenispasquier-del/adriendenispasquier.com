// Pages: the text column, pictures and metadata for each address. Pure: used in the browser and at build time
// (to write a real HTML page per address for search engines and link previews).
import { norm, share, type Media } from "./media";

export interface Project {
  slug: string;
  title: string;
  type: string;
  order?: number;
  services: string[];
  text: string;                       // paragraphs separated by a blank line
  credits?: { label: string; value: string }[];
  media: Media[];
  cover?: Media;                      // picture used on Work and in link previews; defaults to the first one
  draft?: boolean;                    // hidden from the site
}
export interface Site {
  name: string;
  description: string;
  about: { text: string; practice: string[]; contact: { label: string; url: string }[]; portrait: string };
}
export interface Item { m: Media | null; href?: string; cap?: string; ph?: string }
export interface Page {
  path: string;          // canonical address, with a trailing slash ("/", "/about/", "/work/fat-cat/")
  title: string;
  description: string;
  image: string;         // link-preview picture
  left: string;          // HTML of the text column (elements marked data-p are drawn by dots)
  items: Item[];         // pictures
  loop?: boolean;        // carousel without start or end (Work)
  zoom?: boolean;        // pictures open full screen when clicked
  workAbout?: boolean;   // has the Work / About titles (they morph between these pages)
}

export const LIST_COPIES = 5;
export const ORIGIN = "https://www.adriendenispasquier.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const paras = (t: string, attrs = "") => t.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean).map(s => `<p class="mono" data-p${attrs}>${esc(s)}</p>`).join("");
const firstSentence = (t: string) => (t.split(/(?<=[.!?])\s/)[0] || "").slice(0, 160);
/** Contact links as typed in the admin: an email address becomes mailto:, "instagram.com/…" gets https://. */
const linkOf = (u: string) => /^[^\s@/:]+@[^\s@/]+\.[^\s@/]+$/.test(u.trim()) ? `mailto:${u.trim()}` : /^(https?:|mailto:|tel:|\/)/.test(u.trim()) ? u.trim() : `https://${u.trim()}`;
/** "/work/fat-cat" and "/work/fat-cat/" are the same page. */
export const canonical = (path: string) => (path.replace(/\/+$/, "") || "") + "/";

/** Project files (slug = file name) → the published projects, in list order. */
export function prepare(files: [string, Omit<Project, "slug">][]): Project[] {
  return files
    .map(([slug, p]) => ({ ...p, slug, media: (p.media || []).map(norm), cover: p.cover ? norm(p.cover) : undefined }))
    .filter(p => !p.draft && p.media.length)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title));
}

export function makePages(PROJECTS: Project[], SITE: Site) {
  const projectPath = (p: Project) => `/work/${p.slug}/`;
  const coverOf = (p: Project) => p.cover || p.media[0];

  function buildPage(raw: string): Page {
    const path = canonical(raw);
    const m = path.match(/^\/work\/([^/]+)\/$/);
    const p = m && PROJECTS.find(p => p.slug === m[1]);
    if (p) {
      const nx = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length];
      return {
        path, title: `${p.title} — ${SITE.name}`, description: firstSentence(p.text) || SITE.description, image: share(coverOf(p)),
        left: `<div class="lproj">
          <h1 class="t-title" data-p>${esc(p.title)}</h1>
          <p class="mono services" data-p>${p.services.map(esc).join(" - ")}</p>
          ${paras(p.text)}
          ${p.credits?.length ? `<div class="mono credits" data-p><span>Credits</span>${p.credits.map(c => `<span><b>${esc(c.label)}</b>${esc(c.value)}</span>`).join("")}</div>` : ""}
          <a class="next" href="${projectPath(nx)}" data-p><span>Next — ${esc(nx.title)}</span><span>→</span></a>
        </div>`,
        items: p.media.map(m => ({ m, cap: p.title })), zoom: true,
      };
    }
    if (path === "/about/") {
      const a = SITE.about, portrait = a.portrait ? norm(a.portrait) : null;
      const contact = a.contact.map(c => c.url ? `<a href="${esc(linkOf(c.url))}" target="_blank" rel="noopener">${esc(c.label)}</a>` : `<span>${esc(c.label)}</span>`).join("");
      return {
        path, title: `About — ${SITE.name}`, description: firstSentence(a.text) || SITE.description, workAbout: true,
        image: portrait ? share(portrait) : share(coverOf(PROJECTS[0])),
        left: `<div class="labout">
          <a href="/" class="t-mid" data-p data-k="work">Work</a>
          <a href="/about/" class="t-big" data-p data-k="about">About</a>
          ${paras(a.text, ' style="margin-bottom:1.5em"')}
          <div class="mono credits" data-p><span>Practice</span>${a.practice.map(t => `<span>${esc(t)}</span>`).join("")}</div>
          <div class="mono credits" data-p><span>Contact</span>${contact}</div>
        </div>`,
        items: [{ m: portrait, ph: "Portrait", cap: SITE.name }],
      };
    }
    return {
      path: "/", title: SITE.name, description: SITE.description, workAbout: true, loop: true, image: share(coverOf(PROJECTS[0])),
      left: `<div class="lhome">
        <a href="/" class="t-big" data-p data-k="work">Work</a>
        <a href="/about/" class="t-mid" data-p data-k="about">About</a>
        <ul class="plist" id="PL">${Array.from({ length: LIST_COPIES }, (_, c) => PROJECTS.map((p, i) =>
          `<li data-c="${c}"><a href="${projectPath(p)}" data-p data-i="${i}"><span>${esc(p.title)}</span><span>${esc(p.type)}</span></a></li>`).join("")).join("")}</ul>
      </div>`,
      items: PROJECTS.map(p => ({ m: coverOf(p), href: projectPath(p), cap: p.title })),
    };
  }

  /** Every address of the site (for the sitemap and the pages written at build time). */
  const paths = () => ["/", "/about/", ...PROJECTS.map(projectPath)];

  return { buildPage, paths };
}

/** Old addresses (#/brand-design/archipel …) → new ones. */
export function legacyPath(hash: string): string {
  const h = hash.replace(/^#\/?/, "");
  const map: Record<string, string> = {
    "brand-design/archipel": "/work/archipel-berlin/",
    "photography/archipel-berlin": "/work/archipel-still-life/",
    "photography/fat-cat": "/work/fat-cat/",
    "illustration/archipel": "/work/archipel-doodles/",
    "illustration/cyberleaders": "/work/cyberleaders/",
    "illustration/rocket-wine": "/work/rocket-wine/",
    "about": "/about/",
  };
  return map[h] || "/";
}
