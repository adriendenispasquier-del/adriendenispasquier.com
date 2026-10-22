// Pages: the text column, pictures and metadata for each address. Pure: used in the browser and at build time
// (to write a real HTML page per address for search engines and link previews).
import { norm, share, big, isVideo, type Media } from "./media";

export interface Project {
  slug: string;
  title: string;
  type: string;
  order?: number;
  services: string[];
  text: string;                       // paragraphs separated by a blank line
  credits?: { label: string; value: string; url?: string }[];
  media: Media[];
  cover?: Media;                      // picture used on Work and in link previews; defaults to the first one
  draft?: boolean;                    // hidden from the site
  personal?: boolean;                 // listed under Personal (Pasquier in the header) instead of Work
  seo?: {                             // search engines (all optional)
    title?: string;                   //   title shown in results (default: "Title — Type — Name")
    description?: string;             //   text under the title (default: the start of the text)
    alt?: string;                     //   what the pictures show (Google Images, screen readers)
  };
}
export interface Site {
  name: string;
  description: string;
  about: { text: string; practice: string[]; contact: { label: string; url: string }[]; portrait: string };
  seo?: { title?: string; jobTitle?: string; location?: string };
}
export interface Item { m: Media | null; href?: string; cap?: string; alt?: string; ph?: string; alts?: Media[] }   // alts: pictures shown in turn on Work
export interface Page {
  path: string;          // canonical address, with a trailing slash ("/", "/about/", "/work/fat-cat/")
  title: string;
  description: string;
  image: string;         // link-preview picture
  left: string;          // HTML of the text column (elements marked data-p are drawn by dots)
  items: Item[];         // pictures
  loop?: boolean;        // carousel without start or end (Work)
  zoom?: boolean;        // pictures open full screen when clicked
  keys?: string[];       // menu titles on this page (Work, About, Personal): shared ones morph between pages
  noindex?: boolean;     // kept out of search engines (Personal while it is empty)
  jsonld?: object;       // structured data for search engines (who you are, what each project is)
  pictures?: string[];   // full addresses of the page's pictures, for the image sitemap
}

export const LIST_COPIES = 5;
export const ORIGIN = "https://adriendenispasquier.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
/** Text with links written as [text](address). External addresses open in a new tab. */
const link = (u: string, text: string) => {
  const href = linkOf(u), ext = /^(https?:|mailto:)/.test(href);
  return `<a class="inl" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
};
const inline = (s: string) => esc(s).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => link(u.replace(/&amp;/g, "&"), t));
const paras = (t: string, attrs = "") => t.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean).map(s => `<p class="mono" data-p${attrs}>${inline(s)}</p>`).join("");
/** The start of a text for search results: whole sentences up to about 160 characters (cut at a word if needed). */
export function summary(t: string, max = 160) {
  const flat = t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();
  let out = "";
  for (const s of flat.split(/(?<=[.!?])\s/)) { if ((out + " " + s).trim().length > max) break; out = (out + " " + s).trim(); }
  // Too short to say much (one brief sentence): carry on into the next one, cut at a word.
  if (out.length < 110 && flat.length > out.length) return flat.slice(0, max - 1).replace(/\s+\S*$/, "").replace(/[,;:—-]$/, "") + "…";
  return out;
}
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
  const WORK = PROJECTS.filter(p => !p.personal), PERSONAL = PROJECTS.filter(p => p.personal);
  const firstCover = () => share(coverOf(WORK[0] || PROJECTS[0]));
  const NAME = SITE.name, SEO = SITE.seo || {};
  const job = SEO.jobTitle || "Designer, illustrator & photographer", place = SEO.location || "Berlin";
  // Full addresses of pictures (videos: a still), for structured data and the image sitemap.
  const abs = (u: string) => u.startsWith("/") ? ORIGIN + u : u;
  const full = (m: Media) => abs(isVideo(m) ? share(m) : big(m));
  const still = (m: Media) => !(isVideo(m) && m.startsWith("/"));   // videos uploaded to the site have no still picture
  const altOf = (p: Project) => p.seo?.alt?.trim() || `${p.title} — ${p.type} by ${NAME}`;
  // Who you are, for search engines. Profiles (Instagram, Behance…) come from the Contact links on About.
  const person = {
    "@type": "Person", "@id": ORIGIN + "/#person", name: NAME, url: ORIGIN + "/", jobTitle: job,
    description: SITE.description, address: { "@type": "PostalAddress", addressLocality: place },
    ...(SITE.about.portrait ? { image: full(norm(SITE.about.portrait)) } : {}),
    knowsAbout: SITE.about.practice,
    sameAs: SITE.about.contact.map(c => linkOf(c.url || "")).filter(u => /^https?:/.test(u)),
  };
  const ld = (...graph: object[]) => ({ "@context": "https://schema.org", "@graph": graph });
  /** A heading for search engines and screen readers, not shown (the page shows its titles in dots). */
  const hidden = (t: string) => `<h1 class="sr">${esc(t)}</h1>`;

  /** Work and Personal: a carousel of the projects' pictures with the project list. */
  function listPage(path: string, group: Project[], menu: string, keys: string[], title: string, description: string, h1: string): Page {
    const list = group.length
      ? `<ul class="plist" id="PL">${Array.from({ length: LIST_COPIES }, (_, c) => group.map((p, i) =>
          `<li data-c="${c}"><a href="${projectPath(p)}" data-p data-i="${i}"><span>${esc(p.title)}</span><span>${esc(p.type)}</span></a></li>`).join("")).join("")}</ul>`
      : `<p class="mono" data-p style="margin-top:auto">Soon.</p>`;
    return {
      path, title, description, keys, loop: group.length > 0, image: group.length ? share(coverOf(group[0])) : firstCover(),
      left: `<div class="lhome">${hidden(h1)}<div class="menu">${menu}</div>${list}</div>`,
      items: group.length ? group.map(p => ({ m: coverOf(p), href: projectPath(p), cap: p.title, alt: altOf(p), alts: [...new Set([coverOf(p), ...p.media])] }))
        : [{ m: null, ph: "Soon" }],
      noindex: !group.length, pictures: group.map(coverOf).filter(still).map(full),
      jsonld: ld(person,
        ...(path === "/" ? [{ "@type": "WebSite", "@id": ORIGIN + "/#website", url: ORIGIN + "/", name: NAME, description, publisher: { "@id": person["@id"] } }] : []),
        { "@type": "CollectionPage", url: ORIGIN + path, name: title, description, about: { "@id": person["@id"] },
          hasPart: group.map(p => ({ "@type": "CreativeWork", name: p.title, url: ORIGIN + projectPath(p) })) }),
    };
  }

  function buildPage(raw: string): Page {
    const path = canonical(raw);
    const m = path.match(/^\/work\/([^/]+)\/$/);
    const p = m && PROJECTS.find(p => p.slug === m[1]);
    if (p) {
      const group = p.personal ? PERSONAL : WORK, nx = group[(group.indexOf(p) + 1) % group.length];
      const title = p.seo?.title?.trim() || `${p.title} — ${p.type} — ${NAME}`;
      const description = p.seo?.description?.trim() || summary(p.text) || SITE.description;
      const pics = p.media.filter(still).map(full);
      return {
        path, title, description, image: share(coverOf(p)), pictures: pics,
        jsonld: ld(person, {
          "@type": "CreativeWork", "@id": ORIGIN + path + "#work", url: ORIGIN + path, name: p.title, headline: title, description,
          genre: p.type, keywords: p.services.join(", "), creator: { "@id": person["@id"] }, image: pics,
          ...(p.credits?.length ? { contributor: p.credits.map(c => ({ "@type": "Person", name: c.value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"), description: c.label })) } : {}),
        }),
        left: `<div class="lproj">
          <h1 class="t-title" data-p>${esc(p.title)}</h1>
          <p class="mono services" data-p>${p.services.map(esc).join(" - ")}</p>
          ${paras(p.text)}
          ${p.credits?.length ? `<div class="mono credits" data-p><span>Credits</span>${p.credits.map(c => `<span><b>${inline(c.label)}</b>${c.url ? link(c.url, esc(c.value)) : inline(c.value)}</span>`).join("")}</div>` : ""}
          ${nx !== p ? `<a class="next" href="${projectPath(nx)}" data-p><span>Next — ${esc(nx.title)}</span><span>→</span></a>` : ""}
        </div>`,
        items: p.media.map((m, i) => ({ m, cap: p.title, alt: p.media.length > 1 ? `${altOf(p)} (${i + 1}/${p.media.length})` : altOf(p) })), zoom: true,
      };
    }
    if (path === "/about/") {
      const a = SITE.about, portrait = a.portrait ? norm(a.portrait) : null;
      const contact = a.contact.map(c => c.url ? `<a href="${esc(linkOf(c.url))}" target="_blank" rel="noopener">${esc(c.label)}</a>` : `<span>${esc(c.label)}</span>`).join("");
      return {
        path, title: `About — ${NAME}, ${place}`, description: summary(a.text) || SITE.description, keys: ["work", "about"],
        image: portrait ? share(portrait) : firstCover(), pictures: portrait ? [full(portrait)] : [],
        jsonld: ld(person, { "@type": "ProfilePage", url: ORIGIN + path, name: `About ${NAME}`, mainEntity: { "@id": person["@id"] } }),
        left: `<div class="labout">${hidden(`About ${NAME}`)}
          <div class="menu"><a href="/" class="t-mid" data-p data-k="work">Work</a><a href="/about/" class="t-big" data-p data-k="about">About</a></div>
          ${paras(a.text, ' style="margin-bottom:1.5em"')}
          <div class="mono credits" data-p><span>Practice</span>${a.practice.map(t => `<span>${inline(t)}</span>`).join("")}</div>
          <div class="mono credits" data-p><span>Contact</span>${contact}</div>
        </div>`,
        items: [{ m: portrait, ph: "Portrait", cap: NAME, alt: `Portrait of ${NAME}` }],
      };
    }
    if (path === "/personal/") return listPage(path, PERSONAL,
      `<a href="/personal/" class="t-big" data-p data-k="personal">Personal</a><a href="/" class="t-mid" data-p data-k="work">Work</a>`,
      ["personal", "work"], `Personal work — ${NAME}`, SITE.description, `Personal work by ${NAME}`);
    return listPage("/", WORK,
      `<a href="/" class="t-big" data-p data-k="work">Work</a><a href="/about/" class="t-mid" data-p data-k="about">About</a>`,
      ["work", "about"], SEO.title?.trim() || `${NAME} — ${job} in ${place}`, SITE.description, `${NAME} — ${job} in ${place}`);
  }

  /** Every address of the site (for the sitemap and the pages written at build time). */
  const paths = () => ["/", "/about/", "/personal/", ...PROJECTS.map(projectPath)];

  return { buildPage, paths };
}

/** Addresses of the previous site → new ones. Used for old #/… links in the browser, and at build time to
 *  write a redirect page at each old address (they were in the old sitemap, so search engines know them). */
export const LEGACY: Record<string, string> = {
  "brand-design": "/",
  "brand-design/archipel": "/work/archipel-berlin/",
  "brand-identity": "/",
  "photography": "/",
  "photography/archipel-berlin": "/work/archipel-still-life/",
  "photography/fat-cat": "/work/fat-cat/",
  "illustration": "/",
  "illustration/archipel": "/work/archipel-doodles/",
  "illustration/archipel-doodles": "/work/archipel-doodles/",
  "illustration/cyberleaders": "/work/cyberleaders/",
  "illustration/rocket-wine": "/work/rocket-wine/",
  "about": "/about/",
};
export const legacyPath = (hash: string) => LEGACY[hash.replace(/^#\/?/, "").replace(/\/+$/, "")] || "/";
