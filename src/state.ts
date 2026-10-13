// Shared page elements, live state and settings.
import defaults from "../content/settings.json";
import type { Page } from "./content";

export const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;

export const dom = {
  L: $("L"), G: $("G"), F: $("F"), GT: $("GT"), FT: $("FT"), M: $("M"), frame: $("frame"),
  lb: $("lb"), lbm: $("lbm"), cv: $<HTMLCanvasElement>("c"),
};

const mq = matchMedia("(max-width: 760px)");
export const state = {
  phone: mq.matches,
  mq,
  PL: null as HTMLElement | null,       // the Work project list (its own scroll space)
  current: null as string | null,       // current path
  page: null as Page | null,
  colTop: 66,                           // text-column dots are clipped above this line
  inkTo: [17, 17, 17],                  // dot colour the canvas eases towards
  tuning: false,                        // the tuning panel is open: settings come from this browser
};

// ───────── Settings ─────────
type Pair = { bg: string; ink: string };
export type Settings = typeof defaults & { colors: { default: Pair; pages: Record<string, Pair> }; panelPos?: { l: number; t: number } };
const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));
export const DEFAULTS = clone(defaults) as Settings;
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
    S.panelPos = st.panelPos;
  } catch { /* storage unavailable */ }
}
export const save = () => { if (state.tuning) try { localStorage.setItem(STORE, JSON.stringify(S)); } catch { /* ignore */ } };
export const forgetTuning = () => { try { localStorage.removeItem(STORE); } catch { /* ignore */ } };

const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
export const colorsFor = (path: string) => S.colors.pages[path] || S.colors.default;
export function applyColors() {
  const c = colorsFor(state.current ?? "/");
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
  if (state.phone) {
    const l = S.layoutPhone, g = l.gap, avail = 100 - 3 * g, mw = l.m / 100 * avail, fw = l.f / 100 * avail;
    rs.setProperty("--gx", g + "vw"); rs.setProperty("--mw", mw + "vw");
    rs.setProperty("--fl", (g + mw + g) + "vw"); rs.setProperty("--fw", fw + "vw");
    rs.setProperty("--gap", g * PIC_GAP + "vw");
  } else {
    const l = S.layout, g = l.gap;
    const avail = 100 - 4 * g, T = l.t / 100 * avail, Pw = l.p / 100 * avail, Fw = l.f / 100 * avail;
    const lw = g + T, gl = lw + g, fl = gl + Pw + g;
    rs.setProperty("--gx", g + "vw"); rs.setProperty("--lw", lw + "vw"); rs.setProperty("--gl", gl + "vw");
    rs.setProperty("--gw", Pw + "vw"); rs.setProperty("--fl", fl + "vw"); rs.setProperty("--fw", Fw + "vw");
    rs.setProperty("--gap", g * PIC_GAP + "vw");
  }
}
