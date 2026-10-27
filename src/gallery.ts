// Pictures, film and linked scrolling.
// One position drives the columns: whichever one you scroll is the "driver" and the others follow.
// Desktop: text, pictures and film, in proportion. Phone: the main column (text, then pictures) and the film,
// which mirrors the pictures exactly. Work is a carousel with no start and no end.
import { dom, state } from "./state";
import COLOURS, { RATIOS } from "virtual:colours";
import { LIST_COPIES, big, huge, thumb, fallback, isVideo, type Item } from "./content";

const { L, G, F, GT, FT, M, frame: frameEl, lb, lbm } = dom;
const H = () => innerHeight;

const cols = () => state.phone ? [M, F] : [L, G, F];
let driver: HTMLElement = G;
let anim: { from: number; to: number; t0: number; dur: number } | null = null;
const maxOf = (el: HTMLElement) => Math.max(0, el.scrollHeight - el.clientHeight);
const progressOf = (el: HTMLElement) => { const m = maxOf(el); return m ? el.scrollTop / m : 0; };
export const main = () => state.phone ? M : G;                           // the element whose scrolling shows the pictures
const goff = () => state.phone ? G.offsetTop : 0;                        // where the pictures start inside it
// Phone Work: the menu is pinned at the top and the list at the bottom; the pictures are seen in between.
const band = () => {
  if (!state.phone || !M.classList.contains("home")) return null;
  const mr = M.getBoundingClientRect(), menu = document.querySelector(".menu")!.getBoundingClientRect(), pl = state.PL?.getBoundingClientRect();
  return { top: menu.bottom - mr.top, bottom: (pl ? pl.top : mr.bottom) - mr.top };
};
const viewTop = () => band()?.top ?? 0;                                  // where the visible picture area starts
const viewH = () => { const b = band(); return b ? b.bottom - b.top : main().clientHeight; };   // its height
const gpos = () => main().scrollTop - goff() + viewTop();               // picture-strip coordinate at the top of that area
const setG = (v: number) => { main().scrollTop = v + goff() - viewTop(); };
const fscale = () => F.clientWidth / G.clientWidth;
const mid = (e: HTMLElement) => e.offsetTop + e.offsetHeight / 2;
const inout = (u: number) => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
const kids = () => GT.children as HTMLCollectionOf<HTMLElement>;

// Carousel (Work): one "round" is one picture of every project, in list order. Each round shows the next picture
// of each project (cover first). The strip grows as you scroll and rounds far behind are removed, so there is no
// start and no end, and the film (which mirrors it) is always filled from top to bottom, however few pictures a
// filter has (the rounds repeat). Content is only added below while you scroll; adding or removing it above moves
// the scroll position, which stops a phone's momentum, so that waits until the scrolling has stopped.
let loop = false, nItems = 0, untouched = true;
let gFirst = 0, gLast = -1;          // positions of the first and last rendered pictures (0 = first project's cover)
const posOf = (e: Element) => +(e as HTMLElement).dataset.g!;
export const centreFirst = () => { const it = kids()[-gFirst]; if (it) setG(mid(it) - viewH() / 2); };

/** Keep the element `ref` where it is on screen while the strip changes above it. */
function keep(ref: HTMLElement, change: () => void) {
  const el = main(), rel = ref.offsetTop - el.scrollTop;
  change();
  el.scrollTop = ref.offsetTop - rel;
}
/** Add rounds ahead of the view, drop rounds far behind. Returns true if the strip changed above the view.
 *  idle: the scrolling has stopped, so the strip may also change above the view. */
let extending = false;
function extend(idle = false) {
  if (!loop || anim || extending || !kids().length) return false;
  extending = true;
  try { return grow(idle); } finally { extending = false; }
}
function grow(idle: boolean) {
  const ks = kids(), view = viewH();
  const reach = Math.max(view * 2, framePad / fscale() + view * 1.2), far = reach * 2.5;   // in picture-strip pixels
  const above = () => gpos() - ks[0].offsetTop;
  const below = () => { const l = ks[ks.length - 1]; return l.offsetTop + l.offsetHeight - (gpos() + view); };
  const roundH = (start: boolean) => { const a = ks[start ? 0 : ks.length - nItems], b = ks[start ? nItems - 1 : ks.length - 1]; return b.offsetTop + b.offsetHeight - a.offsetTop; };
  let moved = false, n = 0;
  while (below() < reach && n++ < 40) addRound(gLast + 1, false);
  // Above: when stopped, or (rarely) when a long fling up is about to run out of pictures.
  if (above() < reach && (idle || above() < view * .6)) {
    const ref = ks[0], t0 = ref.offsetTop, need = reach * 1.5 - above();
    keep(ref, () => { n = 0; while (ref.offsetTop - t0 < need && n++ < 40) addRound(gFirst - nItems, true); });
    moved = true;
  }
  n = 0;
  while (ks.length > 2 * nItems && below() - roundH(false) > far && n++ < 40) dropRound(false);
  if (idle) { n = 0; while (ks.length > 2 * nItems && above() - roundH(true) > far && n++ < 40) { keep(ks[nItems], () => dropRound(true)); moved = true; } }
  return moved;
}
// Scrolling has stopped (no scroll for a moment, no finger down): tidy the strip above the view.
let idleT: number | undefined, touching = false;
function settle() {
  clearTimeout(idleT);
  idleT = window.setTimeout(() => {
    if (touching || anim) return settle();
    if (extend(true)) F.scrollTop = gpos() * fscale() - framePad;
  }, 200);
}
addEventListener("touchstart", () => { touching = true; }, { passive: true, capture: true });
addEventListener("touchend", () => { touching = false; settle(); }, { passive: true, capture: true });
addEventListener("touchcancel", () => { touching = false; settle(); }, { passive: true, capture: true });

// Phone pages with a start and an end: the film follows picture by picture (the text between the cover and the
// other pictures takes no room in the film). c = a position in one strip, measured from its top.
const centres = (root: HTMLElement, base: number) => [...root.children].map(e => (e as HTMLElement).offsetTop + (e as HTMLElement).offsetHeight / 2 - base);
function across(c: number, from: number[], to: number[], scale: number) {
  if (!from.length) return c * scale;
  if (c <= from[0]) return to[0] + (c - from[0]) * scale;
  for (let i = 0; i < from.length - 1; i++)
    if (c < from[i + 1]) return to[i] + (to[i + 1] - to[i]) * (c - from[i]) / (from[i + 1] - from[i]);
  return to[to.length - 1] + (c - from[from.length - 1]) * (scale || 1);
}

let framePad = 0;   // distance from the film's top edge to the frame
export function sync(src: HTMLElement) {
  if (loop) {
    // The film mirrors the pictures exactly; the picture at the top of the view sits at the top of the frame.
    const s = fscale();
    if (src === F) setG((F.scrollTop + framePad) / s);
    const moved = extend();
    if (src !== F || moved) F.scrollTop = gpos() * s - framePad;
  } else if (state.phone) {
    const s = fscale(), g = centres(GT, 0), f = centres(FT, 0);
    if (src === F) setG(across(F.scrollTop + F.clientHeight / 2, f, g, 1 / s) - viewH() / 2);
    else F.scrollTop = across(gpos() + viewH() / 2, g, f, s) - F.clientHeight / 2;
  } else {
    const p = progressOf(src);
    for (const el of cols()) if (el !== src) el.scrollTop = p * maxOf(el);
  }
  onScrolled();
}

const dy = (e: WheelEvent) => e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? H() : 1);
for (const el of [L, G, F, M]) {
  el.addEventListener("wheel", e => {
    if (lbOpen) return;
    if (state.phone) { if (cols().includes(el) && !(el === M && F.contains(e.target as Node))) { anim = null; driver = el; untouched = false; } return; }
    if (el === M) return;
    if (el === L && state.SB?.contains(e.target as Node)) return;   // the About text scrolls on its own
    untouched = false; anim = null; driver = el;
    // Over the text column, the wheel moves at picture speed and the text follows in proportion
    // (the text is often only a little taller than the screen, so scrolling it natively would jump the pictures).
    if (el === L || maxOf(el) < 2) { e.preventDefault(); driver = G; G.scrollTop += dy(e); }
  }, { passive: false });
  // (The film sits inside the main column in the page structure, so the main column ignores touches on it.)
  const grab = (e: Event) => {
    if (el === M && F.contains(e.target as Node)) return;
    if (!state.phone || cols().includes(el)) { anim = null; driver = state.phone && el !== F ? M : el; untouched = false; }
  };
  el.addEventListener("touchstart", grab, { passive: true });
  el.addEventListener("pointerdown", e => { if (state.phone) grab(e); }, { passive: true });
  el.addEventListener("scroll", () => { if (driver === el && cols().includes(el)) { sync(el); if (loop) settle(); } }, { passive: true });
}
// Desktop: wheel over the header or the gaps between columns scrolls the pictures.
document.addEventListener("wheel", e => {
  if (lbOpen) { e.preventDefault(); return; }
  const t = e.target as Element;
  if (state.phone) { if (!F.contains(t)) driver = M; return; }
  if ([L, G, F].some(el => el.contains(t)) || t.closest?.("#panel")) return;
  e.preventDefault(); anim = null; driver = G; untouched = false; G.scrollTop += dy(e);
}, { passive: false });
addEventListener("keydown", e => {
  if (lbOpen) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight" || e.key === "ArrowDown") openLightbox(lbIndex + 1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") openLightbox(lbIndex - 1);
    return;
  }
  const k = ({ ArrowDown: 80, ArrowUp: -80, PageDown: H() * .8, PageUp: -H() * .8, " ": H() * .8 } as Record<string, number>)[e.key];
  if (k === undefined || (e.target as Element).closest?.("input, textarea, #panel")) return;
  e.preventDefault(); anim = null; driver = main(); untouched = false; main().scrollBy({ top: k, behavior: "smooth" });
});

/** Glide so that picture i sits centred in view (film clicks). */
function scrollToItem(i: number) {
  const it = kids()[i]; if (!it) return;
  const el = main(), target = Math.min(maxOf(el), Math.max(0, goff() - viewTop() + mid(it) - viewH() / 2));
  anim = { from: el.scrollTop, to: target, t0: performance.now(), dur: 650 + Math.min(Math.abs(target - el.scrollTop), 4000) * .12 };
  driver = el;
  const step = (now: number) => {
    if (!anim) return;
    const u = Math.min(1, (now - anim.t0) / anim.dur);
    el.scrollTop = anim.from + (anim.to - anim.from) * inout(u);
    sync(el);
    if (u < 1) requestAnimationFrame(step); else { anim = null; sync(el); }
  };
  requestAnimationFrame(step);
}
FT.addEventListener("click", e => {
  const b = (e.target as Element).closest(".fi"); if (!b) return;
  untouched = false;
  scrollToItem([...FT.children].indexOf(b));
});

/** Film scale = film width / pictures width; gaps and the frame use the same scale. Pages with a start and an
 *  end get padding so the first and last pictures can reach the frame; the carousel is filled edge to edge. */
export function layoutFilm() {
  const s = fscale(), frameH = viewH() * s;
  FT.style.setProperty("--fgap", `${parseFloat(getComputedStyle(GT).rowGap) * s}px`);
  framePad = (F.clientHeight - frameH) / 2;
  FT.style.paddingTop = FT.style.paddingBottom = loop ? "0px" : `${framePad}px`;
  frameEl.style.height = `${frameH}px`;
  state.colTop = state.phone ? document.querySelector(".hd")!.getBoundingClientRect().bottom : L.getBoundingClientRect().top;
}

// The picture under the centre is "current": on Work, its project row is marked and the list glides so that
// row sits in its middle (desktop and phone).
let onRow: Element | null = null;
function onScrolled() {
  const c = gpos() + viewH() / 2, ks = kids(), PL = state.PL;
  if (!ks.length) return;
  let k = 0;
  for (let i = 0; i < ks.length; i++) if (mid(ks[i]) <= c) k = i;
  let mark: Element | null = null;
  if (PL) {
    const a = ks[k], b = ks[k + 1];
    const frac = b ? Math.min(1, Math.max(0, (c - mid(a)) / (mid(b) - mid(a)))) : 0;
    const rows = PL.children as HTMLCollectionOf<HTMLElement>, cp = copiesOf(PL), n = rows.length / cp, j = (cp >> 1) * n + (+a.dataset.i!);   // the middle copy
    const r0 = rows[j], r1 = rows[j + 1] || r0;
    PL.scrollTop = mid(r0) + (mid(r1) - mid(r0)) * frac - PL.offsetTop - PL.clientHeight / 2;
    mark = (frac < .5 ? r0 : r1).querySelector("a");
  }
  if (mark !== onRow) { onRow?.classList.remove("on"); mark?.classList.add("on"); onRow = mark; }
}

const copiesOf = (PL: HTMLElement) => +(PL.dataset.copies || LIST_COPIES);
/** Put the Work list on its middle copy before its dots are sampled. */
export function centreList() {
  const PL = state.PL; if (!PL) return;
  const cp = copiesOf(PL), r = PL.children[(cp >> 1) * PL.children.length / cp] as HTMLElement;
  if (r && cp >= 3) PL.scrollTop = r.offsetTop + r.offsetHeight / 2 - PL.offsetTop - PL.clientHeight / 2;
}

// ───────── Rendering ─────────
// Picture proportions are remembered, so a page seen before lays out at the right size straight away.
const RATIO = new Map<string, string>(Object.entries(RATIOS));   // known from the build; corrected when a picture loads
let pageItems: Item[] = [];

/** The picture at position g: on Work, project g mod n, its (g div n)-th picture; elsewhere item g. */
function itemAt(g: number): Item & { i: number } {
  if (!loop) return { ...pageItems[g], i: g };
  const n = nItems, p = ((g % n) + n) % n, r = Math.floor(g / n), it = pageItems[p];
  const alts = it.alts?.length ? it.alts : [it.m!];
  return { ...it, m: alts[((r % alts.length) + alts.length) % alts.length], i: p };
}
function stripHtml(g: number) {
  const it = itemAt(g), rr = (it.m && RATIO.get(it.m)) || (it.ph ? "4 / 5" : ""), col = it.m && COLOURS[it.m];
  // While loading, the box shows the picture's dominant colour.
  const st = rr || col ? ` style="${rr ? `aspect-ratio:${rr};` : ""}${col ? `--ph:${col}` : ""}"` : "";
  const data = ` data-i="${it.i}" data-g="${g}"${it.m ? ` data-m="${it.m.replace(/"/g, "&quot;")}"` : ""}`;
  const inner = !it.m ? `<span class="ph">${it.ph || ""}</span>`
    : isVideo(it.m) ? `<video src="${big(it.m)}" muted loop playsinline disablepictureinpicture controlslist="nodownload" preload="metadata"></video>`
    : `<img src="${big(it.m)}" alt="${(it.alt || it.cap || "").replace(/"/g, "&quot;")}" decoding="async"${fallback(it.m)}>`;
  const cap = it.cap ? `<span class="cap">${it.cap}</span>` : "";
  const gi = it.href ? `<a class="gi"${data} href="${it.href}"${st}>${inner}${cap}</a>` : `<div class="gi"${data}${st}>${inner}</div>`;
  // Videos uploaded to the site itself have no ready-made still: the film shows their first frame.
  const still = !it.m ? "" : thumb(it.m) ? `<img src="${thumb(it.m)}" alt="" decoding="async"${fallback(it.m)}>`
    : isVideo(it.m) ? `<video src="${big(it.m)}#t=0.1" muted playsinline disablepictureinpicture preload="metadata"></video>` : "";
  const fi = `<button class="fi"${data} type="button" aria-label="Go to picture"${st}>${still}</button>`;
  return [gi, fi];
}
/** Insert pictures g0 … g0+count-1 at the start or end of both strips. */
function insert(g0: number, count: number, atStart: boolean) {
  const parts = Array.from({ length: count }, (_, k) => stripHtml(g0 + k));
  const pos = atStart ? "afterbegin" : "beforeend";
  GT.insertAdjacentHTML(pos, parts.map(p => p[0]).join(""));
  FT.insertAdjacentHTML(pos, parts.map(p => p[1]).join(""));
  const sel = (root: HTMLElement) => [...root.children].filter(e => { const g = posOf(e); return g >= g0 && g < g0 + count; });
  for (const e of [...sel(GT), ...sel(FT)]) watch(e.querySelector("img, video"));
  for (const e of sel(GT)) { const v = e.querySelector("video"); if (v) playing.observe(v); }
  if (atStart) gFirst = g0; else gLast = g0 + count - 1;
}
const addRound = (g0: number, atStart: boolean) => insert(g0, nItems, atStart);
function dropRound(atStart: boolean) {
  for (const root of [GT, FT]) for (let k = 0; k < nItems; k++) {
    const e = atStart ? root.firstElementChild : root.lastElementChild, v = e?.querySelector("video");
    if (v) playing.unobserve(v);
    e?.remove();
  }
  if (atStart) gFirst += nItems; else gLast -= nItems;
}

// Videos play only while near the view (dozens of copies playing at once would make scrolling stutter).
const playing = new IntersectionObserver(es => {
  for (const e of es) { const v = e.target as HTMLVideoElement; if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }
}, { rootMargin: "50% 0px" });

// Both strips (and every copy) take a picture's real proportions as soon as any version knows them.
const ratioOf = (r: string) => { const [w, h] = r.split("/").map(Number); return w / h; };
function setRatio(m: string | undefined, w: number, h: number) {
  if (!w || !h || !m || RATIO.get(m) === `${w} / ${h}`) return;
  const was = RATIO.get(m); if (was && Math.abs(ratioOf(was) / (w / h) - 1) < .02) return;   // the build's value is close enough: nothing moves
  RATIO.set(m, `${w} / ${h}`);
  for (const e of [...GT.children, ...FT.children] as HTMLElement[]) if (e.dataset.m === m) e.style.aspectRatio = `${w} / ${h}`;
  layoutFilm();
  if (loop && untouched) centreFirst();
  sync(driver === F ? F : main());
}
function watch(m: HTMLImageElement | HTMLVideoElement | null) {
  if (!m) return;
  const done = () => {
    m.classList.add("in"); m.parentElement!.classList.add("ld");
    setRatio(m.parentElement!.dataset.m, (m as HTMLImageElement).naturalWidth || (m as HTMLVideoElement).videoWidth, (m as HTMLImageElement).naturalHeight || (m as HTMLVideoElement).videoHeight);
  };
  if (m.tagName === "VIDEO") m.addEventListener("loadeddata", done, { once: true });
  else if ((m as HTMLImageElement).complete && (m as HTMLImageElement).naturalWidth) done(); else m.addEventListener("load", done, { once: true });
}

export function renderMedia(items: Item[], isLoop: boolean, zoom: boolean) {
  loop = isLoop; nItems = items.length; pageItems = items;
  playing.disconnect();
  GT.innerHTML = FT.innerHTML = "";
  G.classList.toggle("zoomable", zoom);
  // Work starts with two rounds before and two after the first round; other pages show their pictures once.
  if (loop) { gFirst = 0; gLast = -1; insert(-2 * nItems, 5 * nItems, false); gFirst = -2 * nItems; }
  else { gFirst = 0; gLast = -1; insert(0, items.length, false); }
}

/** After a new page's pictures are in: reset positions and link everything. */
export function resetScroll() {
  anim = null; driver = main(); untouched = true;
  layoutFilm();
  G.scrollTop = F.scrollTop = M.scrollTop = 0;
  if (loop) centreFirst();
  sync(main());
}

// ───────── Full-screen view ─────────
let lbOpen = false, lbIndex = 0;
export function openLightbox(i: number) {
  const n = pageItems.length; if (!n) return;
  lbIndex = (i + n) % n;
  const m = pageItems[lbIndex].m; if (!m) return;
  lbm.innerHTML = isVideo(m)
    ? `<video src="${big(m)}" autoplay muted loop playsinline disablepictureinpicture controlslist="nodownload"></video>`
    : `<img src="${big(m)}" alt=""${fallback(m)}>`;
  // Show the copy already loaded for the gallery at once, then swap in a sharper one when it arrives.
  const im = lbm.querySelector("img");
  if (im && huge(m) !== big(m)) {
    const hi = new Image(); hi.src = huge(m);
    hi.onload = () => { if (im.isConnected) im.src = hi.src; };
  }
  // Load the following picture now, so clicking through feels instant.
  const nx = pageItems[(lbIndex + 1) % n].m; if (nx && !isVideo(nx)) new Image().src = big(nx);
  lbOpen = true; lb.classList.add("open");
}
export function closeLightbox() {
  if (!lbOpen) return;
  lbOpen = false; lb.classList.remove("open");
  setTimeout(() => { if (!lbOpen) lbm.innerHTML = ""; }, 300);
}
GT.addEventListener("click", e => {
  if (!state.page?.zoom) return;
  const it = (e.target as Element).closest<HTMLElement>(".gi"); if (it) openLightbox(+it.dataset.i!);
});
// On the picture: right half → the next one, left half → the previous one. Outside it, or on the cross: close.
const rightHalf = (e: MouseEvent) => e.clientX > innerWidth / 2;
lb.addEventListener("click", e => { if (lbm.contains(e.target as Node)) openLightbox(lbIndex + (rightHalf(e) ? 1 : -1)); else closeLightbox(); });
lbm.addEventListener("mousemove", e => lbm.classList.toggle("back", !rightHalf(e)));
