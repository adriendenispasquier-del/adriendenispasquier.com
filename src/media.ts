// Picture and video URLs (Cloudinary). Pure functions: also used at build time.

/** A picture or video: a Cloudinary public id ("v123/Name_abc.jpg"), "video:<id>" for videos,
 *  a full res.cloudinary.com URL (as pasted from Cloudinary or inserted by the admin),
 *  or a file in the site itself ("/uploads/name.jpg"). */
export type Media = string;

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

const isLocal = (m: Media) => m.startsWith("/") || /^https?:/.test(m);
/** Files in the site keep their original names, which may contain spaces, "#", "?", accents…: each part of the
 *  path is encoded ("#" would otherwise cut the address short). Full https:// addresses are left as they are. */
const local = (m: Media) => !m.startsWith("/") ? m
  : m.split("/").map(seg => /%[0-9a-f]{2}/i.test(seg) ? seg : encodeURIComponent(seg)).join("/");
export const isVideo = (m: Media) => m.startsWith("video:") || /\.(mp4|webm|mov)$/i.test(m) && isLocal(m);
const vid = (m: Media) => m.replace(/^video:/, "");

// Images are requested as WebP, keeping animation and transparency. (f_auto would turn animated GIFs
// stored without a .gif ending into still PNG/JXL on Safari and some Chrome versions.)
export const IMG = (w: number) => `c_limit,w_${w},q_auto,f_webp,fl_awebp,fl_animated`;
/** Uploaded photos are served resized (written at build time, made on request while developing; see build/sizes.ts). */
const sized = (m: Media, w: number) => /^\/uploads\/[^/]+\.(jpe?g|png|webp)$/i.test(m) ? local(`/uploads/_w/${w}/${m.slice(9)}.webp`) : local(m);
export const big = (m: Media) => isLocal(m) ? sized(m, 1600) : isVideo(m) ? `${VL}q_auto,w_1600/${vid(m)}` : m.endsWith(".gif") ? CL + m : `${CL}${IMG(1600)}/${m}`;
export const huge = (m: Media) => isLocal(m) && !isVideo(m) ? sized(m, 2400) : isLocal(m) || m.endsWith(".gif") || isVideo(m) ? big(m) : `${CL}${IMG(2400)}/${m}`;
export const thumb = (m: Media) => isLocal(m) ? (isVideo(m) ? "" : sized(m, 300)) : isVideo(m) ? `${VL}so_1,w_300/${vid(m).replace(/\.\w+$/, ".jpg")}` : m.endsWith(".gif") ? CL + m : `${CL}${IMG(300)}/${m}`;
/** For link previews: a 1200 × 630 JPEG. */
export const share = (m: Media) => isLocal(m) ? sized(m, 1600) : isVideo(m) ? `${VL}so_1,c_fill,w_1200,h_630,q_auto/${vid(m).replace(/\.\w+$/, ".jpg")}` : `${CL}c_fill,w_1200,h_630,q_auto,f_jpg/${m}`;
// Very long animations exceed Cloudinary's conversion limit (50 megapixels over all frames): fall back to the original file.
export const fallback = (m: Media) => isVideo(m) || m.endsWith(".gif") ? "" : isLocal(m) ? (sized(m, 1) !== local(m) ? ` onerror="this.onerror=null;this.src='${local(m)}'"` : "") : ` onerror="this.onerror=null;this.src='${CL + m}'"`;   // a missing size falls back to the original
