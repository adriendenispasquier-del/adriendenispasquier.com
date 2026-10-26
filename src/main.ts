import "./styles.css";
import { buildPage, legacyPath, canonical, filtered, listHTML, itemsOf, FILTERS, type Page } from "./content";
import { ORIGIN } from "./pages";
import { dom, state, S, loadTuning, applyColors, applyLayout, resetVisitor } from "./state";
import * as dots from "./dots";
import { renderMedia, resetScroll, layoutFilm, sync, main, closeLightbox, centreList } from "./gallery";

const { L, G, F, M } = dom;
const KEEP_ALWAYS = ["h1", "h2", "h3", "h4", "hline", "vrule"];   // header and rules never leave
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// Tuning panel: only for you. Open the site with ?tune once (it is remembered in this browser; ?tune=off to stop).
const q = new URLSearchParams(location.search).get("tune");
try {
  if (q === "off") localStorage.removeItem("adp-tune");
  else if (q !== null) localStorage.setItem("adp-tune", "1");
  state.tuning = localStorage.getItem("adp-tune") === "1";
} catch { /* storage unavailable */ }
if (state.tuning) loadTuning();
applyLayout();

// Old addresses (#/photography/fat-cat …) → new ones.
if (location.hash.startsWith("#/")) history.replaceState(null, "", legacyPath(location.hash));
else if (canonical(location.pathname) !== location.pathname) history.replaceState(null, "", canonical(location.pathname) + location.search);

let busy = 0, reading = false;   // reading: a page change is reading the new page into dots
async function go(path: string) {
  let page = buildPage(path);
  const token = ++busy, first = state.current === null, prev = state.page;
  closeLightbox(); document.body.classList.remove("aopen");
  if (!first) {
    const keep = new Set(KEEP_ALWAYS);
    for (const k of page.keys || []) if (prev?.keys?.includes(k)) keep.add(k);   // shared menu titles morph in place
    dots.release(keep);
    G.classList.add("out"); F.classList.add("out");
  }
  state.current = page.path; state.page = page;
  setMeta(page);
  applyColors();
  // The text column is drawn by dots, so it can swap at once: the old dots are already loose
  // and the new magnets start pulling straight away.
  L.innerHTML = page.left; L.scrollTop = 0; M.scrollTop = 0;
  // Home: the filter in the address (?filter=photography) chooses the list and the pictures.
  if (page.path === "/") {
    state.filter = filterFrom(location.search);
    if (state.filter) { swapList(state.filter); page = { ...page, items: itemsOf(filtered(state.filter)) }; }
  }
  markMenu(page.path === "/" ? state.filter : null);
  M.classList.toggle("home", !!page.loop);
  M.classList.toggle("about", page.path === "/about/");
  document.body.classList.toggle("about", page.path === "/about/");   // no film there
  state.PL = document.getElementById("PL");
  state.SB = state.phone ? null : document.getElementById("AB");   // on phone the About text flows with the page
  fitMenu();
  centreList();
  if (first) { await Promise.race([document.fonts.ready, sleep(300)]); await new Promise(r => { requestAnimationFrame(r); setTimeout(r, 60); }); }
  reading = true;
  const targets = await dots.collectTargets(page.path);   // read over a few frames: the animation never stalls
  if (token === busy) reading = false;
  if (!targets || token !== busy) return;
  dots.assign(targets);
  if (!first) { await sleep(220); if (token !== busy) return; }
  renderMedia(page.items, !!page.loop, !!page.zoom);
  resetScroll();
  G.classList.remove("out"); F.classList.remove("out");
}

function setMeta(page: Page) {
  document.title = page.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", ORIGIN + page.path);
}

// ── Filters (All, Brand Identity, Photography…): on the home page they swap the list and the pictures in place.
const filterFrom = (search: string) => { const f = new URLSearchParams(search).get("filter") || ""; return FILTERS.some(x => x.slug === f) ? f : ""; };
function markMenu(on: string | null) {
  document.querySelectorAll<HTMLElement>(".menu .fl").forEach(a => {
    const sel = on !== null && a.dataset.f === on;
    a.classList.toggle("on", sel); if (sel) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
  });
}
/** Put the filter's projects in the list (as real type when the dots turn into type). */
function swapList(f: string) {
  const old = L.querySelector(".plist, .soon"); if (!old) return;
  old.insertAdjacentHTML("afterend", listHTML(filtered(f))); old.remove();
  state.PL = document.getElementById("PL");
  if (S.dots.allReal || S.dots.real) L.querySelectorAll<HTMLElement>(".plist [data-p], .soon").forEach(e => e.classList.add("real"));
}
let filtering = 0;
async function applyFilter(f: string) {
  const token = ++filtering;
  state.filter = f; markMenu(f); document.body.classList.remove("aopen");
  // Fade the list and pictures out, swap them, fade back in.
  M.classList.add("swap"); G.classList.add("out"); F.classList.add("out");
  await sleep(260); if (token !== filtering) return;
  swapList(f); centreList();
  renderMedia(itemsOf(filtered(f)), true, false); resetScroll();
  resample();
  await sleep(30);
  M.classList.remove("swap"); G.classList.remove("out"); F.classList.remove("out");
}

// Internal links change page without reloading.
document.addEventListener("click", e => {
  const a = (e.target as Element).closest?.("a");
  if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  if (a.dataset.f !== undefined) {   // a filter
    history.pushState(null, "", url.pathname + url.search);
    if (state.current === "/") { if (a.dataset.f !== state.filter) applyFilter(a.dataset.f); } else go("/");
    return;
  }
  const path = canonical(url.pathname);
  if (path !== state.current) { history.pushState(null, "", path); go(path); }
});
addEventListener("popstate", () => {
  if (state.current === "/" && canonical(location.pathname) === "/") { const f = filterFrom(location.search); if (f !== state.filter) applyFilter(f); }
  else go(location.pathname);
});
export const replay = () => go(state.current ?? "/");

// "Denis" in the header swaps background and text colours for this visitor (remembered in their browser).
const invertBtn = document.getElementById("invert")!;
const setInvert = (on: boolean) => {
  state.invert = on; invertBtn.setAttribute("aria-pressed", String(on));
  try { on ? localStorage.setItem("adp-invert", "1") : localStorage.removeItem("adp-invert"); } catch { /* ignore */ }
  applyColors();
};
try { state.invert = localStorage.getItem("adp-invert") === "1"; invertBtn.setAttribute("aria-pressed", String(state.invert)); } catch { /* ignore */ }
invertBtn.addEventListener("click", () => setInvert(!state.invert));

// Phone: About opens as a sheet over the pictures (its text shows as real type there).
const abtn = document.getElementById("abtn")!;
const openAbout = (on: boolean) => {
  document.body.classList.toggle("aopen", on); abtn.setAttribute("aria-expanded", String(on));
  if (on) document.querySelectorAll<HTMLElement>(".about [data-p]").forEach(e => e.classList.add("real"));
};
abtn.addEventListener("click", () => {
  if (state.current !== "/") { history.pushState(null, "", "/"); go("/").then(() => openAbout(true)); }
  else openAbout(!document.body.classList.contains("aopen"));
});
addEventListener("keydown", e => { if (e.key === "Escape") openAbout(false); });

// The visitor settings are gone: forget any widths or dot sizes a visitor had set before.
resetVisitor();

// Pictures: no right-click menu ("Save image as…") and no dragging them out.
const isPicture = (t: EventTarget | null) => !!(t as Element)?.closest?.(".gi, .fi, .lbm");
document.addEventListener("contextmenu", e => { if (isPicture(e.target)) e.preventDefault(); });
document.addEventListener("dragstart", e => { if (isPicture(e.target)) e.preventDefault(); });

// The pull-off wave starts where you click.
document.addEventListener("pointerdown", e => dots.setReleaseOrigin(e.clientX, e.clientY));
document.querySelectorAll<HTMLElement>(".hd [data-k]").forEach(a => {
  a.addEventListener("pointerenter", () => dots.setHoverKey(a.dataset.k!));
  a.addEventListener("pointerleave", () => dots.setHoverKey(null));
});

export const resample = async () => {
  if (state.current === null || reading) return;   // the page change in progress reads the latest layout anyway
  fitMenu();
  const t = await dots.collectTargets(state.current);
  if (t) dots.assign(t, true);
};
export const relayout = () => { applyLayout(); fitMenu(); layoutFilm(); sync(main()); };

/** The menu (Work · Personal, About · Work) shrinks to fit the text column: it never runs over the pictures. */
export function fitMenu() {
  const m = document.querySelector<HTMLElement>(".menu"); if (!m) return;
  m.style.setProperty("--fit", "1");
  const kids = [...m.children] as HTMLElement[], gap = parseFloat(getComputedStyle(m).columnGap) || 0;
  const need = kids.reduce((a, k) => a + k.getBoundingClientRect().width, 0) + gap * (kids.length - 1), have = m.clientWidth;
  if (need > have) m.style.setProperty("--fit", String(have / need * .98));
}
let rt: number | undefined;
addEventListener("resize", () => {
  clearTimeout(rt);
  rt = window.setTimeout(() => { dots.resizeCanvas(); layoutFilm(); sync(main()); resample(); }, 150);
});
state.mq.addEventListener("change", () => { state.phone = state.mq.matches; applyLayout(); if (state.current !== null) go(state.current); });

// Start
applyColors();
dots.start();
// Wait for the fonts, but not forever: on a slow connection the page starts after 1.8 s anyway (the dots redraw when they arrive).
Promise.race([
  Promise.all(["400 20px redaction", "700 20px redaction", "italic 400 20px redaction", "400 12px degular-mono", "700 12px degular-mono", "20px 'Noto Sans Egyptian Hieroglyphs'"]
    .map(f => document.fonts.load(f, f.includes("Hieroglyphs") ? "𓇗𓆣" : undefined).catch(() => {}))),
  sleep(1800),
]).then(() => go(location.pathname));
document.fonts.addEventListener("loadingdone", resample);
if (state.tuning) import("./panel").then(m => m.mount());
