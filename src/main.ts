import "./styles.css";
import { buildPage, legacyPath, canonical, type Page } from "./content";
import { ORIGIN } from "./pages";
import { dom, state, loadTuning, applyColors, applyLayout } from "./state";
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

let busy = 0;
async function go(path: string) {
  const page = buildPage(path), token = ++busy, first = state.current === null, prev = state.page;
  closeLightbox();
  if (!first) {
    const keep = new Set(KEEP_ALWAYS);
    if (page.workAbout && prev?.workAbout) { keep.add("work"); keep.add("about"); }
    dots.release(keep);
    G.classList.add("out"); F.classList.add("out");
  }
  state.current = page.path; state.page = page;
  setMeta(page);
  applyColors();
  // The text column is drawn by dots, so it can swap at once: the old dots are already loose
  // and the new magnets start pulling straight away.
  L.innerHTML = page.left; L.scrollTop = 0; M.scrollTop = 0;
  M.classList.toggle("home", !!page.loop);
  state.PL = document.getElementById("PL");
  centreList();
  if (first) { await document.fonts.ready; await new Promise(r => { requestAnimationFrame(r); setTimeout(r, 60); }); }
  dots.assign(dots.collectTargets(page.path));
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

// Internal links change page without reloading.
document.addEventListener("click", e => {
  const a = (e.target as Element).closest?.("a");
  if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  const path = canonical(url.pathname);
  if (path !== state.current) { history.pushState(null, "", path); go(path); }
});
addEventListener("popstate", () => go(location.pathname));
export const replay = () => go(state.current ?? "/");

// The pull-off wave starts where you click.
document.addEventListener("pointerdown", e => dots.setReleaseOrigin(e.clientX, e.clientY));
document.querySelectorAll<HTMLElement>(".hd [data-k]").forEach(a => {
  a.addEventListener("pointerenter", () => dots.setHoverKey(a.dataset.k!));
  a.addEventListener("pointerleave", () => dots.setHoverKey(null));
});

export const resample = () => { if (state.current !== null) dots.assign(dots.collectTargets(state.current), true); };
export const relayout = () => { applyLayout(); layoutFilm(); sync(main()); };
let rt: number | undefined;
addEventListener("resize", () => {
  clearTimeout(rt);
  rt = window.setTimeout(() => { dots.resizeCanvas(); layoutFilm(); sync(main()); resample(); }, 150);
});
state.mq.addEventListener("change", () => { state.phone = state.mq.matches; applyLayout(); if (state.current !== null) go(state.current); });

// Start
applyColors();
dots.start();
Promise.all(["400 20px redaction", "700 20px redaction", "italic 400 20px redaction", "400 12px degular-mono"].map(f => document.fonts.load(f).catch(() => {})))
  .then(() => go(location.pathname));
document.fonts.addEventListener("loadingdone", resample);
if (state.tuning) import("./panel").then(m => m.mount());
