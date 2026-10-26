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
  media: Media[];                     // in the file: { src, tags } (or just the address)
  tags?: string[][];                  // each picture's filters (as slugs), in the same order as media
  cover?: Media;                      // picture used on Work and in link previews; defaults to the first one
  draft?: boolean;                    // hidden from the site
  personal?: boolean;                 // personal work: its own filter (shown when there is some), not in All
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
  filters?: string[];   // the menu: All, then these (each picture is tagged with the ones it belongs to)
}
export interface Item { m: Media | null; href?: string; cap?: string; alt?: string; ph?: string; alts?: Media[]; slug?: string }   // alts: pictures shown in turn on Work
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
/** "Brand Identity" → "brand-identity" (filter addresses and tags). */
export const slugOf = (name: string) => name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function prepare(files: [string, Omit<Project, "slug">][]): Project[] {
  return files
    .map(([slug, p]) => {
      const raw = ((p.media || []) as unknown as (string | { src?: string; tags?: string[] })[]).filter(m => typeof m === "string" ? m : m?.src);
      return { ...p, slug, media: raw.map(m => norm(typeof m === "string" ? m : m.src!)),
        tags: raw.map(m => typeof m === "string" ? [] : (m.tags || []).map(slugOf)), cover: p.cover ? norm(p.cover) : undefined };
    })
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

  // ── Filters: All, then the site's list (each project chooses its own), then Personal when there is personal work.
  const FILTERS = [...(SITE.filters || ["Brand Identity", "Photography", "Illustration"]).map(n => ({ name: n, slug: slugOf(n) })),
    ...(PERSONAL.length ? [{ name: "Personal", slug: "personal" }] : [])];
  // A project appears under a filter when one of its pictures has it (personal work: under Personal).
  const catsOf = (p: Project) => p.personal ? ["personal"] : [...new Set((p.tags || []).flat())];
  /** The projects a filter shows ("" = All: everything but personal work). */
  const filtered = (f: string) => !f ? WORK : PROJECTS.filter(p => catsOf(p).includes(f));
  /** A project's pictures under a filter: only the ones tagged with it (all of them for All and Personal). */
  const mediaFor = (p: Project, f: string) => !f || f === "personal" ? p.media : p.media.filter((_, i) => p.tags?.[i]?.includes(f));
  const menu = (on: string | null) => `<nav class="menu" aria-label="Filter the work">${[{ name: "All", slug: "" }, ...FILTERS].map(f =>
    `<a href="${f.slug ? `/?filter=${f.slug}` : "/"}" class="fl${on === f.slug ? " on" : ""}" data-f="${f.slug}" data-p data-k="f-${f.slug || "all"}"${on === f.slug ? ' aria-current="true"' : ""}>${esc(f.name)}</a>`).join("")}</nav>
    <div class="mrule" data-p data-k="mrule"></div>`;
  const menuKeys = ["f-all", ...FILTERS.map(f => "f-" + f.slug), "mrule"];
  /** The project list (several copies: it scrolls round as a carousel) and the matching pictures. */
  const listHTML = (group: Project[]) => group.length
    ? `<ul class="plist" id="PL">${Array.from({ length: LIST_COPIES }, (_, c) => group.map((p, i) =>
        `<li data-c="${c}"><a href="${projectPath(p)}" data-p data-i="${i}"><span class="pn">${esc(p.title)}</span><span class="ps">${p.services.map(esc).join(", ")}</span></a></li>`).join("")).join("")}</ul>`
    : `<p class="soon" data-p>Soon.</p>`;
  const itemsOf = (group: Project[], f = ""): Item[] => group.length
    ? group.map(p => {
        const ms = mediaFor(p, f), first = ms.includes(coverOf(p)) ? coverOf(p) : ms[0];   // the cover, if it belongs to the filter
        return { m: first, href: projectPath(p), cap: p.title, alt: altOf(p), alts: [...new Set([first, ...ms])], slug: p.slug };
      })
    : [{ m: null, ph: "Soon" }];
  const row = (label: string, body: string, cls = "") => `<div class="row${cls}"><span class="lab" data-p>${label}</span><div class="body">${body}</div></div>`;

  /** Home: the menu, About and Practices, the project list; the pictures of the chosen filter. */
  function home(): Page {
    const a = SITE.about, title = SEO.title?.trim() || `${NAME} — ${job} in ${place}`;
    const contact = a.contact.map(c => c.url ? `<a href="${esc(linkOf(c.url))}" target="_blank" rel="noopener">${esc(c.label)}</a>` : esc(c.label)).join(", ");
    return {
      path: "/", title, description: SITE.description, keys: menuKeys, loop: WORK.length > 0, image: firstCover(),
      left: `<div class="lhome">${hidden(`${NAME} — ${job} in ${place}`)}${menu("")}
        <div class="about">
          ${row("About", a.text.split(/\n\s*\n/).map(t => t.trim()).filter(Boolean).map(t => `<p class="txt" data-p>${inline(t)}</p>`).join(""))}
          ${row("Practices", `<p class="txt" data-p>${a.practice.map(inline).join(", ")}.</p>`, " ruled it")}
          ${a.contact.length ? row("Contact", `<p class="txt" data-p>${contact}</p>`, " it") : ""}
        </div>
        ${listHTML(WORK)}</div>`,
      items: itemsOf(WORK), pictures: WORK.map(coverOf).filter(still).map(full),
      jsonld: ld(person,
        { "@type": "WebSite", "@id": ORIGIN + "/#website", url: ORIGIN + "/", name: NAME, description: SITE.description, publisher: { "@id": person["@id"] } },
        { "@type": "ProfilePage", url: ORIGIN + "/", name: title, mainEntity: { "@id": person["@id"] },
          hasPart: WORK.map(p => ({ "@type": "CreativeWork", name: p.title, url: ORIGIN + projectPath(p) })) }),
    };
  }

  function buildPage(raw: string): Page {
    const path = canonical(raw);
    const m = path.match(/^\/work\/([^/]+)\/$/);
    const p = m && PROJECTS.find(p => p.slug === m[1]);
    if (!p) return home();
    const group = p.personal ? PERSONAL : WORK, nx = group[(group.indexOf(p) + 1) % group.length];
    const title = p.seo?.title?.trim() || `${p.title} — ${p.type} — ${NAME}`;
    const description = p.seo?.description?.trim() || summary(p.text) || SITE.description;
    const pics = p.media.filter(still).map(full);
    const credits = (p.credits || []).map(c => row(inline(c.label), `<p class="txt" data-p>${c.url ? link(c.url, esc(c.value)) : inline(c.value)}</p>`, " it")).join("");
    return {
      path, title, description, image: share(coverOf(p)), pictures: pics, keys: menuKeys,
      jsonld: ld(person, {
        "@type": "CreativeWork", "@id": ORIGIN + path + "#work", url: ORIGIN + path, name: p.title, headline: title, description,
        genre: p.type, keywords: p.services.join(", "), creator: { "@id": person["@id"] }, image: pics,
        ...(p.credits?.length ? { contributor: p.credits.map(c => ({ "@type": "Person", name: c.value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"), description: c.label })) } : {}),
      }),
      left: `<div class="lproj">${menu(null)}
        <div class="row head"><h1 class="lab it" data-p>${esc(p.title)}</h1><div class="body"><p class="txt" data-p>${p.services.map(esc).join(", ")}</p></div></div>
        ${row("", p.text.split(/\n\s*\n/).map(t => t.trim()).filter(Boolean).map(t => `<p class="txt" data-p>${inline(t)}</p>`).join(""), " ruled")}
        ${credits ? `<div class="credits">${credits}</div>` : ""}
        ${nx !== p ? `<a class="next" href="${projectPath(nx)}" data-p><span>Next — <i>${esc(nx.title)}</i></span><span>→</span></a>` : ""}
      </div>`,
      items: p.media.map((m, i) => ({ m, cap: p.title, alt: p.media.length > 1 ? `${altOf(p)} (${i + 1}/${p.media.length})` : altOf(p) })), zoom: true,
    };
  }

  /** Every address of the site (for the sitemap and the pages written at build time). */
  const paths = () => ["/", ...PROJECTS.map(projectPath)];

  return { buildPage, paths, filtered, listHTML, itemsOf, FILTERS };
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
  "about": "/",
  "personal": "/",
};
export const legacyPath = (hash: string) => LEGACY[hash.replace(/^#\/?/, "").replace(/\/+$/, "")] || "/";
