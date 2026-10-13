// Pictures, film and linked scrolling.
// One position drives the columns: whichever one you scroll is the "driver" and the others follow.
// Desktop: text, pictures and film, in proportion. Phone: the main column (text, then pictures) and the film,
// which mirrors the pictures exactly. Work is a carousel with no start and no end.
import { dom, state } from "./state";
import { PROJECTS, LIST_COPIES, big, huge, thumb, fallback, isVideo, type Item } from "./content";

const { L, G, F, GT, FT, M, frame: frameEl, lb, lbm } = dom;
const H = () => innerHeight;

const cols = () => state.phone ? [M, F] : [L, G, F];
let driver: HTMLElement = G;
let anim: { from: number; to: number; t0: number; dur: number } | null = null;
const maxOf = (el: HTMLElement) => Math.max(0, el.scrollHeight - el.clientHeight);
const progressOf = (el: HTMLElement) => { const m = maxOf(el); return m ? el.scrollTop / m : 0; };
export const main = () => state.phone ? M : G;                           // the element whose scrolling shows the pictures
const goff = () => state.phone ? G.offsetTop : 0;                        // where the pictures start inside it
const viewTop = () => state.phone && M.classList.contains("home") ? (document.querySelector(".lcol") as HTMLElement).offsetHeight : 0;   // pinned block, phone Work
const viewH = () => main().clientHeight - viewTop();                    // height of the visible picture area
const gpos = () => main().scrollTop - goff() + viewTop();               // picture-strip coordinate at the top of that area
const setG = (v: number) => { main().scrollTop = v + goff() - viewTop(); };
const fscale = () => F.clientWidth / G.clientWidth;
const mid = (e: HTMLElement) => e.offsetTop + e.offsetHeight / 2;
const inout = (u: number) => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
const kids = () => GT.children as HTMLCollectionOf<HTMLElement>;

// Carousel: the pictures are rendered five times and the position is kept in the middle copy, so there is no
// start and no end, and the film is always filled from top to bottom.
let loop = false, nItems = 0, untouched = true;
const COPIES = 5;
export const centreFirst = () => { const it = kids()[2 * nItems]; if (it) setG(mid(it) - viewH() / 2); };
const cycleLen = () => loop && kids()[nItems] ? kids()[nItems].offsetTop - kids()[0].offsetTop : 0;
function wrapG() {
  const C = cycleLen(); if (C <= 0) return false;
  if (gpos() < C * 1.5) { setG(gpos() + C); return true; }
  if (gpos() >= C * 2.5) { setG(gpos() - C); return true; }
  return false;
}

let framePad = 0;   // distance from the film's top edge to the frame
export function sync(src: HTMLElement) {
  if (loop) {
    // The film mirrors the pictures exactly; the picture at the top of the view sits at the top of the frame.
    const s = fscale();
    if (src === F) setG((F.scrollTop + framePad) / s);
    const wrapped = !anim && wrapG();
    if (src !== F || wrapped) F.scrollTop = gpos() * s - framePad;
  } else if (state.phone) {
    if (src === F) setG(F.scrollTop / fscale());
    else F.scrollTop = gpos() * fscale();
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
  el.addEventListener("scroll", () => { if (driver === el && cols().includes(el)) sync(el); }, { passive: true });
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

// The picture under the centre is "current": on Work, its project row is marked (and the desktop list
// glides so that row sits in its middle).
let onRow: Element | null = null;
function onScrolled() {
  const c = gpos() + viewH() / 2, ks = kids(), PL = state.PL;
  if (!ks.length) return;
  let idx = 0, k = 0;
  for (let i = 0; i < ks.length; i++) { const it = ks[i]; if (it.offsetTop <= c) idx = +it.dataset.i!; if (mid(it) <= c) k = i; }
  let mark: Element | null = null;
  if (PL && !state.phone) {
    const a = ks[k], b = ks[k + 1];
    const frac = b ? Math.min(1, Math.max(0, (c - mid(a)) / (mid(b) - mid(a)))) : 0;
    const rows = PL.children as HTMLCollectionOf<HTMLElement>, n = PROJECTS.length, j = 2 * n + (+a.dataset.i!);
    const r0 = rows[j], r1 = rows[j + 1] || r0;
    PL.scrollTop = mid(r0) + (mid(r1) - mid(r0)) * frac - PL.offsetTop - PL.clientHeight / 2;
    mark = (frac < .5 ? r0 : r1).querySelector("a");
  } else if (PL) mark = PL.querySelector(`li[data-c="0"] a[data-i="${idx}"]`);
  if (mark !== onRow) { onRow?.classList.remove("on"); mark?.classList.add("on"); onRow = mark; }
}

/** Put the Work list on its middle copy before its dots are sampled. */
export function centreList() {
  const PL = state.PL; if (!PL) return;
  const r = PL.children[2 * PROJECTS.length] as HTMLElement;
  if (r && LIST_COPIES >= 3) PL.scrollTop = r.offsetTop + r.offsetHeight / 2 - PL.offsetTop - PL.clientHeight / 2;
}

// ───────── Rendering ─────────
// Picture proportions are remembered, so a page seen before lays out at the right size straight away.
const RATIO = new Map<string, string>();
let pageItems: Item[] = [];
export function renderMedia(items: Item[], isLoop: boolean, zoom: boolean) {
  loop = isLoop; nItems = items.length; pageItems = items;
  const ratio = (it: Item) => (it.m && RATIO.get(it.m)) || (it.ph ? "4 / 5" : "");
  const gi = (it: Item, i: number) => {
    const rr = ratio(it), st = rr ? ` style="aspect-ratio:${rr}"` : "";
    const inner = !it.m ? `<span class="ph">${it.ph || ""}</span>`
      : isVideo(it.m) ? `<video src="${big(it.m)}" autoplay muted loop playsinline preload="metadata"></video>`
      : `<img src="${big(it.m)}" alt="${it.cap || ""}" decoding="async"${fallback(it.m)}>`;
    const cap = it.cap ? `<span class="cap">${it.cap}</span>` : "";
    return it.href ? `<a class="gi" data-i="${i}" href="${it.href}"${st}>${inner}${cap}</a>` : `<div class="gi" data-i="${i}"${st}>${inner}</div>`;
  };
  const fi = (it: Item, i: number) => `<button class="fi" data-i="${i}" type="button" aria-label="Go to picture ${i + 1}"${ratio(it) ? ` style="aspect-ratio:${ratio(it)}"` : ""}>${it.m ? `<img src="${thumb(it.m)}" alt="" decoding="async"${fallback(it.m)}>` : ""}</button>`;
  let g = "", f = "";
  for (let c = 0; c < (loop ? COPIES : 1); c++) { g += items.map(gi).join(""); f += items.map(fi).join(""); }
  GT.innerHTML = g; FT.innerHTML = f;
  G.classList.toggle("zoomable", zoom);
  // Both strips (and every copy) take a picture's real proportions as soon as any version knows them.
  const setRatio = (i: number, w: number, h: number) => {
    const m = items[i]?.m;
    if (!w || !h || !m || RATIO.get(m) === `${w} / ${h}`) return;
    RATIO.set(m, `${w} / ${h}`);
    document.querySelectorAll<HTMLElement>(`#GT [data-i="${i}"], #FT [data-i="${i}"]`).forEach(e => { e.style.aspectRatio = `${w} / ${h}`; });
    layoutFilm();
    if (loop && untouched) centreFirst();
    sync(driver === F ? F : main());
  };
  const watch = (m: HTMLImageElement | HTMLVideoElement | null, i: number) => {
    if (!m) return;
    const done = () => {
      m.classList.add("in"); m.parentElement!.classList.add("ld");
      setRatio(i, (m as HTMLImageElement).naturalWidth || (m as HTMLVideoElement).videoWidth, (m as HTMLImageElement).naturalHeight || (m as HTMLVideoElement).videoHeight);
    };
    if (m.tagName === "VIDEO") m.addEventListener("loadeddata", done, { once: true });
    else if ((m as HTMLImageElement).complete && (m as HTMLImageElement).naturalWidth) done(); else m.addEventListener("load", done, { once: true });
  };
  [...kids()].forEach(e => watch(e.querySelector("img, video"), +e.dataset.i!));
  [...FT.children].forEach(e => watch(e.querySelector("img"), +(e as HTMLElement).dataset.i!));
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
    ? `<video src="${big(m)}" autoplay muted loop playsinline></video>`
    : `<img src="${big(m)}" alt=""${fallback(m)}>`;
  // Show the copy already loaded for the gallery at once, then swap in a sharper one when it arrives.
  const im = lbm.querySelector("img");
  if (im && huge(m) !== big(m)) {
    const hi = new Image(); hi.src = huge(m);
    hi.onload = () => { if (im.isConnected) im.src = hi.src; };
  }
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
lb.addEventListener("click", e => { if (!lbm.contains(e.target as Node)) closeLightbox(); });   // outside the picture, or the cross
