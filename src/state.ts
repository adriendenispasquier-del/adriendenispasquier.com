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
  SB: null as HTMLElement | null,       // the About text box (scrolls on its own, like the list)
  filter: "",                           // home: the chosen filter ("" = All)
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
  layout: { gap: number; t: number; p: number; f: number; hh: number; order: string };   // hh: header height in px; order: columns from left, e.g. "tpf"
  layoutPhone: { gap: number; m: number; f: number; hh: number };
  dots: {
    shape: string; dotSize: number; fill: number; buzz: number; real: boolean;
    anim: string;        // "particles" (dots travel to the text) or lichen: "crust" | "leafy" | "rosette" (dots grow in place)
    overflow: number;    // lichen: how far it spills past the letters, in % of the font size
    branches: number;    // lichen: space between the branches past the letters, in dot sizes
    realBelow: number;   // text smaller than this (px) turns into real type once formed, titles included (0 = never)
    allReal: boolean;    // everything (name, menu, titles too) turns into real type once formed
    speed: number;       // animation speed (1 = default, 2 = twice as fast)
    lichenDot: number;   // lichen: dot size in px, the same for all text
    lichenDensity: number;   // lichen: how close the dots sit for their size (1 = solid)
  };
  grid: string;                                              // "open" | "closed" | "none"
  line: number;                                              // grid line thickness, px
  spacing: number;                                           // vertical space between the text column's sections (1 = default)
  font: string;                                              // "pair" (Redaction + Degular Mono) or one family for everything
  type: { name: number; titles: number; lists: number; text: number; about: number };   // font-size multipliers
  fontPhone: string;                                         // the same two, for phones
  typePhone: { name: number; titles: number; lists: number; text: number; about: number };
  panelPos?: { l: number; t: number };
}
type PageColors = { page: string; bg: string; ink: string }[];
const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));
const fromFile = (f: typeof defaults): Settings => ({
  ...clone(f),
  layout: { ...clone(f.layout), hh: (f.layout as any).hh ?? 66, order: (f.layout as any).order || "tpf" },
  layoutPhone: { ...clone(f.layoutPhone), hh: (f.layoutPhone as any).hh ?? 46 },
  dots: { ...{ anim: "particles", overflow: 12, branches: 8, realBelow: 12, lichenDot: 2, lichenDensity: 1, allReal: true, speed: 1 }, ...clone(f.dots) as any },
  grid: (f as any).grid || "open",
  line: (f as any).line ?? 1,
  spacing: (f as any).spacing ?? 1,
  font: (f as any).font || "pair",
  type: { name: 1, titles: 1, lists: 1, text: 1, about: 1, ...(f as any).type },
  fontPhone: (f as any).fontPhone || (f as any).font || "pair",
  typePhone: { name: 1, titles: 1, lists: 1, text: 1, about: 1, ...((f as any).typePhone || (f as any).type) },
  colors: { default: { ...f.colors.default }, pages: Object.fromEntries((f.colors.pages as PageColors).map(c => [canonical(c.page), { bg: c.bg, ink: c.ink }])) },
});
/** The settings as stored in content/settings.json (per-page colours as a list, for the admin). */
export const toFile = (s: Settings) => ({
  colors: { default: s.colors.default, pages: Object.entries(s.colors.pages).map(([page, c]) => ({ page, ...c })) },
  layout: s.layout, layoutPhone: s.layoutPhone, dots: s.dots, grid: s.grid, line: s.line, spacing: s.spacing, font: s.font, type: s.type, fontPhone: s.fontPhone, typePhone: s.typePhone,
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
    S.typePhone = { ...S.typePhone, ...st.typePhone };
    if (st.fontPhone) S.fontPhone = st.fontPhone;
    if (st.grid) S.grid = st.grid;
    if (st.line !== undefined) S.line = st.line;
    if (st.spacing !== undefined) S.spacing = st.spacing;
    if (st.font) S.font = st.font;
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

// Fonts (Adobe kit nva7btn). "pair" is Redaction for names and titles with Degular Mono for text and lists;
// any other choice sets every text in that one family, and the Work list is no longer in capitals.
export const FONTS: { v: string; label: string; css?: string; weight?: string; bold?: string }[] = [
  { v: "pair", label: "Redaction + Degular Mono" },
  { v: "redaction", label: "Redaction", css: '"redaction", Georgia, serif' },
  { v: "degular", label: "Degular", css: '"degular", Helvetica, sans-serif' },
  { v: "acumin-pro", label: "Acumin Pro", css: '"acumin-pro", Helvetica, sans-serif' },
  { v: "garamond-premier-pro", label: "Garamond Premier Pro", css: '"garamond-premier-pro", Garamond, serif', weight: "500" },   // Medium
  { v: "castoro", label: "Castoro", css: '"castoro", Georgia, serif', bold: "400" },   // no bold: the Next link stays regular
];
function applyFont() {
  const rs = document.documentElement.style, f = FONTS.find(f => f.v === (state.phone ? S.fontPhone : S.font) && f.css);
  if (f) { rs.setProperty("--serif", f.css!); rs.setProperty("--mono", f.css!); }
  else { rs.removeProperty("--serif"); rs.removeProperty("--mono"); }
  if (f?.weight) rs.setProperty("--weight", f.weight); else rs.removeProperty("--weight");
  if (f?.bold) rs.setProperty("--bold", f.bold); else rs.removeProperty("--bold");
  document.body.classList.toggle("one-font", !!f);
  // Load the family's regular and bold now (the dots are redrawn when they arrive).
  if (f) for (const w of [f.weight || "400", f.bold || "700"]) document.fonts.load(`${w} 20px ${f.css}`).catch(() => {});
}

// Layout. Desktop: margins and column gaps share one value; text, pictures and film split the rest and always
// fill it. Phone: margins and the one gap share a value; main column and film split the rest.
/** Column orders on desktop (t = text, p = pictures, f = film), from left to right. */
export const ORDERS = ["tpf", "tfp", "ptf", "pft", "ftp", "fpt"];
export const PIC_GAP = .45;   // space between big pictures, as a fraction of the gap
export function applyLayout() {
  const rs = document.documentElement.style;
  // Grid and font sizes
  document.body.classList.remove("grid-open", "grid-closed", "grid-none");
  document.body.classList.add("grid-" + S.grid);
  rs.setProperty("--line", S.line + "px"); rs.setProperty("--vgap", String(S.spacing));
  const type = state.phone ? S.typePhone : S.type;
  for (const k of ["name", "titles", "lists", "text", "about"] as const) rs.setProperty(`--fs-${k}`, String(type[k]));
  applyFont();
  rs.setProperty("--hh", (state.phone ? S.layoutPhone.hh : S.layout.hh) + "px");
  if (state.phone) {
    const l = layoutPhoneNow(), g = l.gap, avail = 100 - 3 * g, mw = l.m / 100 * avail, fw = l.f / 100 * avail;
    rs.setProperty("--gx", g + "vw"); rs.setProperty("--mw", mw + "vw");
    rs.setProperty("--fl", (g + mw + g) + "vw"); rs.setProperty("--fw", fw + "vw");
    rs.setProperty("--gap", g * PIC_GAP + "vw");
    rs.setProperty("--mwa", (mw + g + fw) + "vw");   // About (no film): the main column takes the film's place too
  } else {
    const l = layoutNow(), g = l.gap;
    const avail = 100 - 4 * g, T = l.t / 100 * avail, Pw = l.p / 100 * avail, Fw = l.f / 100 * avail;
    // Columns from left to right in the chosen order (t = text, p = pictures, f = film), a gap before each.
    const width: Record<string, number> = { t: T, p: Pw, f: Fw }, left: Record<string, number> = {};
    let x = g;
    for (const c of ORDERS.includes(l.order) ? l.order : "tpf") { left[c] = x; x += width[c] + g; }
    // The vertical rule runs along the text column's side facing the pictures.
    const rule = left.t < left.p ? left.t + T : left.t;
    rs.setProperty("--gx", g + "vw"); rs.setProperty("--tl", left.t + "vw"); rs.setProperty("--tw", T + "vw"); rs.setProperty("--lw", rule + "vw");
    rs.setProperty("--gl", left.p + "vw"); rs.setProperty("--gw", Pw + "vw"); rs.setProperty("--fl", left.f + "vw"); rs.setProperty("--fw", Fw + "vw");
    // About has no film: the pictures take its place too when the two sit side by side.
    const ord = ORDERS.includes(l.order) ? l.order : "tpf", together = Math.abs(ord.indexOf("p") - ord.indexOf("f")) === 1;
    rs.setProperty("--gla", (together ? Math.min(left.p, left.f) : left.p) + "vw"); rs.setProperty("--gwa", (together ? Pw + g + Fw : Pw) + "vw");
    rs.setProperty("--gap", g * PIC_GAP + "vw");
  }
}
