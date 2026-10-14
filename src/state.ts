// Shared page elements, live state and settings.
import defaults from "../content/settings.json";
import { canonical, type Page } from "./pages";

export const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

export const dom = {
  L: $("L"), G: $("G"), F: $("F"), GT: $("GT"), FT: $("FT"), M: $("M"), frame: $("frame"),
  lb: $("lb"), lbm: $("lbm"), cv: $<HTMLCanvasElement>("c"),
};

// Phone layout: narrow screens held upright. A phone turned sideways gets the desktop layout.
const mq = matchMedia("(max-width: 760px) and (orientation: portrait)");
export const state = {
  phone: mq.matches,
  mq,
  PL: null as HTMLElement | null,       // the Work project list (its own scroll space)
  current: null as string | null,       // current path
  page: null as Page | null,
  colTop: 66,                           // text-column dots are clipped above this line
  inkTo: [17, 17, 17],                  // dot colour the canvas eases towards
  tuning: false,                        // the tuning panel is open: settings come from this browser
  invert: false,                        // the visitor swapped background and text colours (click on "Denis")
};

// ───────── Settings ─────────
type Pair = { bg: string; ink: string };
export interface Settings {
  colors: { default: Pair; pages: Record<string, Pair> };   // pages: address → colours (a list in the file)
  layout: { gap: number; t: number; p: number; f: number };
  layoutPhone: { gap: number; m: number; f: number };
  dots: { shape: string; dotSize: number; fill: number; buzz: number; real: boolean };
  grid: string;                                              // "open" | "closed" | "none"
  type: { name: number; titles: number; lists: number; text: number };   // font-size multipliers
  panelPos?: { l: number; t: number };
}
type PageColors = { page: string; bg: string; ink: string }[];
const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));
const fromFile = (f: typeof defaults): Settings => ({
  ...clone(f),
  grid: (f as any).grid || "open",
  type: { name: 1, titles: 1, lists: 1, text: 1, ...(f as any).type },
  colors: { default: { ...f.colors.default }, pages: Object.fromEntries((f.colors.pages as PageColors).map(c => [canonical(c.page), { bg: c.bg, ink: c.ink }])) },
});
/** The settings as stored in content/settings.json (per-page colours as a list, for the admin). */
export const toFile = (s: Settings) => ({
  colors: { default: s.colors.default, pages: Object.entries(s.colors.pages).map(([page, c]) => ({ page, ...c })) },
  layout: s.layout, layoutPhone: s.layoutPhone, dots: s.dots, grid: s.grid, type: s.type,
});
export const DEFAULTS = fromFile(defaults);
export const S: Settings = clone(DEFAULTS);

const STORE = "adp-tuning";
/** While tuning, the values you change are kept in this browser (and override content/settings.json). */
export function loadTuning() {
  try {
    const st = JSON.parse(localStorage.getItem(STORE) || "null");
    if (!st) return;
    S.colors = { default: st.colors?.default || S.colors.default, pages: st.colors?.pages || S.colors.pages };
    S.layout = { ...S.layout, ...st.layout };
    S.layoutPhone = { ...S.layoutPhone, ...st.layoutPhone };
    S.dots = { ...S.dots, ...st.dots };
    S.type = { ...S.type, ...st.type };
    if (st.grid) S.grid = st.grid;
    S.panelPos = st.panelPos;
  } catch { /* storage unavailable */ }
}
export const save = () => { if (state.tuning) try { localStorage.setItem(STORE, JSON.stringify(S)); } catch { /* ignore */ } };
export const forgetTuning = () => { try { localStorage.removeItem(STORE); } catch { /* ignore */ } };

// ───────── Visitor settings ("-" menu) ─────────
// A visitor can change column widths, dot size and buzz for themselves. Kept in their browser, applied on top of
// the published settings, never published.
export interface Visitor { layout?: { t: number; p: number; f: number }; layoutPhone?: { m: number; f: number }; dotSize?: number; buzz?: number }
export let V: Visitor = {};
try { V = JSON.parse(localStorage.getItem("adp-visitor") || "{}"); } catch { /* storage unavailable */ }
export const saveVisitor = () => { try { localStorage.setItem("adp-visitor", JSON.stringify(V)); } catch { /* ignore */ } };
export const resetVisitor = () => { V = {}; try { localStorage.removeItem("adp-visitor"); } catch { /* ignore */ } };
export const layoutNow = () => ({ ...S.layout, ...V.layout });
export const layoutPhoneNow = () => ({ ...S.layoutPhone, ...V.layoutPhone });
export const dotSizeNow = () => V.dotSize ?? S.dots.dotSize;
export const buzzNow = () => V.buzz ?? S.dots.buzz;

const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
export const colorsFor = (path: string) => S.colors.pages[path] || S.colors.default;
export function applyColors() {
  const c0 = colorsFor(state.current ?? "/"), c = state.invert ? { bg: c0.ink, ink: c0.bg } : c0;
  document.documentElement.style.setProperty("--bg", c.bg);
  document.documentElement.style.setProperty("--ink", c.ink);
  state.inkTo = hex(c.ink);
  onColors.forEach(f => f());
}
export const onColors: (() => void)[] = [];

// Layout. Desktop: margins and column gaps share one value; text, pictures and film split the rest and always
// fill it. Phone: margins and the one gap share a value; main column and film split the rest.
export const PIC_GAP = .45;   // space between big pictures, as a fraction of the gap
export function applyLayout() {
  const rs = document.documentElement.style;
  // Grid and font sizes
  document.body.classList.remove("grid-open", "grid-closed", "grid-none");
  document.body.classList.add("grid-" + S.grid);
  for (const k of ["name", "titles", "lists", "text"] as const) rs.setProperty(`--fs-${k}`, String(S.type[k]));
  if (state.phone) {
    const l = layoutPhoneNow(), g = l.gap, avail = 100 - 3 * g, mw = l.m / 100 * avail, fw = l.f / 100 * avail;
    rs.setProperty("--gx", g + "vw"); rs.setProperty("--mw", mw + "vw");
    rs.setProperty("--fl", (g + mw + g) + "vw"); rs.setProperty("--fw", fw + "vw");
    rs.setProperty("--gap", g * PIC_GAP + "vw");
  } else {
    const l = layoutNow(), g = l.gap;
    const avail = 100 - 4 * g, T = l.t / 100 * avail, Pw = l.p / 100 * avail, Fw = l.f / 100 * avail;
    const lw = g + T, gl = lw + g, fl = gl + Pw + g;
    rs.setProperty("--gx", g + "vw"); rs.setProperty("--lw", lw + "vw"); rs.setProperty("--gl", gl + "vw");
    rs.setProperty("--gw", Pw + "vw"); rs.setProperty("--fl", fl + "vw"); rs.setProperty("--fw", Fw + "vw");
    rs.setProperty("--gap", g * PIC_GAP + "vw");
  }
}
