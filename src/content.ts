// Content: projects (content/projects/*.json), site texts (content/site.json) and picture URLs.
import site from "../content/site.json";

/** A picture or video: a Cloudinary public id ("v123/Name_abc.jpg"), "video:<id>" for videos,
 *  or a full res.cloudinary.com URL (as pasted from Cloudinary or inserted by the admin). */
export type Media = string;

export interface Project {
  slug: string;
  title: string;
  type: string;
  order?: number;
  services: string[];
  text: string;                       // paragraphs separated by a blank line
  credits?: { label: string; value: string }[];
  media: Media[];
  cover?: Media;                      // picture used on Work; defaults to the first one
  draft?: boolean;                    // hidden from the site
}

const files = import.meta.glob<Omit<Project, "slug">>("/content/projects/*.json", { eager: true, import: "default" });

export const PROJECTS: Project[] = Object.entries(files)
  .map(([path, p]) => ({ ...p, slug: path.split("/").pop()!.replace(/\.json$/, ""), media: (p.media || []).map(norm) }))
  .filter(p => !p.draft && p.media.length)
  .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title));

export const SITE = site;

// ───────── Pictures ─────────
const CLOUD = "https://res.cloudinary.com/df2kod03a/";
export const CL = CLOUD + "image/upload/";
const VL = CLOUD + "video/upload/";

/** Full Cloudinary URLs → the short form used everywhere else (transformations are dropped). */
export function norm(m: Media): Media {
  const u = m.match(/^https?:\/\/res\.cloudinary\.com\/[^/]+\/(image|video)\/upload\/(.+)$/);
  if (!u) return m;
  const parts = u[2].split("/");
  while (parts.length > 1 && !/^v\d+$/.test(parts[0]) && /^[a-z]{1,4}_/.test(parts[0])) parts.shift();
  return (u[1] === "video" ? "video:" : "") + parts.join("/");
}

export const isVideo = (m: Media) => m.startsWith("video:");
// Images are requested as WebP, keeping animation and transparency. (f_auto would turn animated GIFs
// stored without a .gif ending into still PNG/JXL on Safari and some Chrome versions.)
export const IMG = (w: number) => `c_limit,w_${w},q_auto,f_webp,fl_awebp,fl_animated`;
export const big = (m: Media) => isVideo(m) ? `${VL}q_auto,w_1600/${m.slice(6)}` : m.endsWith(".gif") ? CL + m : `${CL}${IMG(1600)}/${m}`;
export const huge = (m: Media) => m.endsWith(".gif") || isVideo(m) ? big(m) : `${CL}${IMG(2400)}/${m}`;
export const thumb = (m: Media) => isVideo(m) ? `${VL}so_1,w_300/${m.slice(6).replace(/\.\w+$/, ".jpg")}` : m.endsWith(".gif") ? CL + m : `${CL}${IMG(300)}/${m}`;
// Very long animations exceed Cloudinary's conversion limit (50 megapixels over all frames): fall back to the original file.
export const fallback = (m: Media) => isVideo(m) || m.endsWith(".gif") ? "" : ` onerror="this.onerror=null;this.src='${CL + m}'"`;

// ───────── Pages ─────────
export interface Item { m: Media | null; href?: string; cap?: string; ph?: string }
export interface Page {
  path: string;
  title: string;
  description: string;
  left: string;          // HTML of the text column (elements marked data-p are drawn by dots)
  items: Item[];         // pictures
  loop?: boolean;        // carousel without start or end (Work)
  zoom?: boolean;        // pictures open full screen when clicked
  workAbout?: boolean;   // has the Work / About titles (they morph between these pages)
}

export const LIST_COPIES = 5;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const paras = (t: string, attrs = "") => t.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean).map(s => `<p class="mono" data-p${attrs}>${esc(s)}</p>`).join("");
export const projectPath = (p: Project) => `/work/${p.slug}`;
const firstSentence = (t: string) => (t.split(/(?<=[.!?])\s/)[0] || "").slice(0, 160);

export function buildPage(path: string): Page {
  const m = path.match(/^\/work\/([^/]+)\/?$/);
  if (m) {
    const i = PROJECTS.findIndex(p => p.slug === m[1]);
    if (i >= 0) {
      const p = PROJECTS[i], nx = PROJECTS[(i + 1) % PROJECTS.length];
      return {
        path, title: `${p.title} — ${SITE.name}`, description: firstSentence(p.text) || SITE.description,
        left: `<div class="lproj">
          <h1 class="t-title" data-p>${esc(p.title)}</h1>
          <p class="mono services" data-p>${p.services.map(esc).join(" - ")}</p>
          ${paras(p.text)}
          ${p.credits?.length ? `<div class="mono credits" data-p><span>Credits</span>${p.credits.map(c => `<span><b>${esc(c.label)}</b>${esc(c.value)}</span>`).join("")}</div>` : ""}
          <a class="next" href="${projectPath(nx)}" data-p><span>Next — ${esc(nx.title)}</span><span>→</span></a>
        </div>`,
        items: p.media.map(m => ({ m })), zoom: true,
      };
    }
  }
  if (path === "/about") {
    const a = SITE.about;
    const contact = a.contact.map(c => c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.label)}</a>` : `<span>${esc(c.label)}</span>`).join("");
    return {
      path, title: `About — ${SITE.name}`, description: firstSentence(a.text), workAbout: true,
      left: `<div class="labout">
        <a href="/" class="t-mid" data-p data-k="work">Work</a>
        <a href="/about" class="t-big" data-p data-k="about">About</a>
        ${paras(a.text, ' style="margin-bottom:1.5em"')}
        <div class="mono credits" data-p><span>Practice</span>${a.practice.map(t => `<span>${esc(t)}</span>`).join("")}</div>
        <div class="mono credits" data-p><span>Contact</span>${contact}</div>
      </div>`,
      items: [{ m: a.portrait ? norm(a.portrait) : null, ph: "Portrait" }],
    };
  }
  return {
    path: "/", title: SITE.name, description: SITE.description, workAbout: true, loop: true,
    left: `<div class="lhome">
      <a href="/" class="t-big" data-p data-k="work">Work</a>
      <a href="/about" class="t-mid" data-p data-k="about">About</a>
      <ul class="plist" id="PL">${Array.from({ length: LIST_COPIES }, (_, c) => PROJECTS.map((p, i) =>
        `<li data-c="${c}"><a href="${projectPath(p)}" data-p data-i="${i}"><span>${esc(p.title)}</span><span>${esc(p.type)}</span></a></li>`).join("")).join("")}</ul>
    </div>`,
    items: PROJECTS.map(p => ({ m: p.cover ? norm(p.cover) : p.media[0], href: projectPath(p), cap: p.title })),
  };
}

/** Old addresses (#/brand-design/archipel …) → new ones. */
export function legacyPath(hash: string): string | null {
  const h = hash.replace(/^#\/?/, "");
  if (!h) return null;
  const map: Record<string, string> = {
    "brand-design/archipel": "/work/archipel-berlin",
    "photography/archipel-berlin": "/work/archipel-still-life",
    "photography/fat-cat": "/work/fat-cat",
    "illustration/archipel": "/work/archipel-doodles",
    "illustration/cyberleaders": "/work/cyberleaders",
    "illustration/rocket-wine": "/work/rocket-wine",
    "about": "/about",
  };
  return map[h] || "/";
}
