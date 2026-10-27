// Split-flap (the Dots animation "flap"): nothing travels. Every visible letter has a cell in its place and the
// cell's drum flips, very fast, until it shows the new letter, like an old departure board. Where the old page and
// the new one have a letter in the same place, that drum rolls from one to the other (and stays still if they are
// the same); old letters with no successor roll away to blank, new ones roll in from blank, in a wave from the top
// left. The rolling is drawn on one canvas over the page (one pass a frame, however many letters); the real text
// (laid out, justified and hyphenated as usual) is hidden underneath until its letters have landed.
import { S } from "./state";

export interface Letter { x: number; y: number; w: number; h: number; ch: string; font: string; color: string }

// The drum's order: blank, signs, letters, digits (so a letter going away to blank passes through digits).
const DRUM = " .,:;-–—&'’()/→ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const rnd = () => DRUM[15 + Math.random() * (DRUM.length - 15) | 0];   // a letter or a digit

/** The visible box of an element: the screen, cut by any scrolling or clipping box around it. */
function clipOf(el: Element) {
  let l = 0, t = 0, r = innerWidth, b = innerHeight;
  for (let p = el.parentElement; p; p = p.parentElement) {
    const o = getComputedStyle(p).overflowY;
    if (o === "visible") continue;
    const q = p.getBoundingClientRect(); l = Math.max(l, q.left); t = Math.max(t, q.top); r = Math.min(r, q.right); b = Math.min(b, q.bottom);
  }
  return { l, t, r, b };
}

/** Every visible letter of the dot-drawn elements under root, where the browser placed it. mark: hide their real
 *  text while the cells roll (the cells take its place). */
export function letters(root: ParentNode, mark = false): Letter[] {
  const out: Letter[] = [], range = document.createRange(), clips = new Map<Element | null, ReturnType<typeof clipOf>>();
  for (const el of root.querySelectorAll<HTMLElement>("[data-p]")) {
    const er = el.getBoundingClientRect();
    if (!er.width || er.bottom < 0 || er.top > innerHeight || !el.textContent!.trim()) continue;
    let clip = clips.get(el.parentElement); if (!clip) clips.set(el.parentElement, clip = clipOf(el));
    if (er.bottom < clip.t || er.top > clip.b || er.right < clip.l || er.left > clip.r) continue;   // scrolled out of its box
    let any = false;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
      const cs = getComputedStyle(n.parentElement!);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`, up = cs.textTransform === "uppercase";
      for (let i = 0; i < n.data.length; i++) {
        const c = n.data[i]; if (/\s/.test(c)) continue;
        range.setStart(n, i); range.setEnd(n, i + 1);
        const r = range.getClientRects()[0];
        if (!r || !r.width || r.bottom < clip.t || r.top > clip.b || r.right < clip.l || r.left > clip.r) continue;
        out.push({ x: r.left, y: r.top, w: r.width, h: r.height, ch: up ? c.toUpperCase() : c, font, color: cs.color });
        any = true;
      }
    }
    if (mark && any) el.classList.add("fl-hide");
  }
  return out;
}

/** The letters a drum shows going from one letter to another: forward through the alphabet, skipping ahead if it
 *  is more than n letters away (Random: any n letters, then its own). */
function run(from: string, to: string, n: number) {
  const seq = [from];
  if (from === to) return seq;
  const a = DRUM.indexOf(from), b = DRUM.indexOf(to);
  if (S.dots.flapOrder === "random" || a < 0 || b < 0) { for (let k = 0; k < n; k++) seq.push(rnd()); seq.push(to); return seq; }
  const dist = (b - a + DRUM.length) % DRUM.length, skip = Math.max(0, dist - n);
  for (let k = skip + 1; k <= dist; k++) seq.push(DRUM[(a + k) % DRUM.length]);
  return seq;
}

type Job = Letter & { seq: string[]; t0: number; k: number; at: number };   // at: when it last changed
let cv: HTMLCanvasElement | null = null, jobs: Job[] = [], raf = 0, endT: number | undefined;

/** Stop at once: the real text shows. */
export function finish() {
  cancelAnimationFrame(raf); clearTimeout(endT); jobs = [];
  document.querySelectorAll(".fl-hide").forEach(e => e.classList.remove("fl-hide"));
  cv?.remove(); cv = null;
}

// Where the baseline sits in a letter's box, per font (measured once).
const BASE = new Map<string, number>();
function baseline(ctx: CanvasRenderingContext2D, font: string, h: number) {
  const k = font + "|" + h; let b = BASE.get(k);
  if (b === undefined) { const m = ctx.measureText("Hg"); b = (h - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2 + m.fontBoundingBoxAscent; BASE.set(k, b); }
  return b;
}

/** Roll from the letters that were on screen (before) to the ones there now (after, read with mark = true). */
export function play(before: Letter[], after: Letter[]) {
  finishCells();
  const C = cv = document.createElement("canvas"); C.className = "flap";
  const dpr = Math.min(2, devicePixelRatio || 1), W = innerWidth, H = innerHeight;
  C.width = Math.round(W * dpr); C.height = Math.round(H * dpr); C.style.width = W + "px"; C.style.height = H + "px";
  document.body.append(C);
  const ctx = C.getContext("2d")!; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";
  const D = S.dots, flip = Math.max(8, D.flip / (D.speed || 1)), now = performance.now(), squeeze = Math.min(70, flip * .9);
  const span = Math.hypot(W, H * .8);
  const delay = (x: number, y: number) => Math.hypot(x, y * 1.6) / span * D.wave * 1000 / (D.speed || 1) + Math.random() * 120;
  // The old letters, by line, to find the one in the same place as each new letter.
  const byLine = new Map<number, (Letter & { taken?: boolean })[]>();
  for (const o of before) { const k = Math.round(o.y); (byLine.get(k) || byLine.set(k, []).get(k)!).push(o); }
  const at = (l: Letter) => {
    const cx = l.x + l.w / 2;
    for (let k = Math.round(l.y) - 2; k <= Math.round(l.y) + 2; k++) for (const o of byLine.get(k) || [])
      if (!o.taken && Math.abs(o.x + o.w / 2 - cx) < Math.max(o.w, l.w) * .5) return o;
    return null;
  };
  const list: Job[] = [];
  for (const l of after) {
    const o = at(l); if (o) o.taken = true;
    const from = o ? o.ch : " ", n = Math.max(1, Math.round(D.flips * (.6 + Math.random() * .8)));
    list.push({ ...l, seq: run(from, l.ch, n), t0: now + delay(l.x, l.y), k: 0, at: -1e9 });
  }
  for (const lst of byLine.values()) for (const o of lst) if (!o.taken)
    list.push({ ...o, seq: run(o.ch, " ", Math.max(2, D.flips * .6 | 0)), t0: now + delay(o.x, o.y) * .7, k: 0, at: -1e9 });
  list.sort((a, b) => a.font < b.font ? -1 : a.font > b.font ? 1 : 0);   // fewer font changes while drawing
  jobs = list;
  const tick = (t: number) => {
    let live = 0, font = "", color = "";
    ctx.clearRect(0, 0, W, H);
    for (const j of jobs) {
      if (t >= j.t0 && j.k < j.seq.length - 1) {
        const k = Math.min(j.seq.length - 1, Math.floor((t - j.t0) / flip));
        if (k !== j.k) { j.k = k; j.at = t; }
      }
      if (j.k < j.seq.length - 1 || t - j.at < squeeze) live++;
      const ch = j.seq[j.k]; if (ch === " ") continue;
      if (j.font !== font) { ctx.font = font = j.font; }
      if (j.color !== color) ctx.fillStyle = color = j.color;
      const by = j.y + baseline(ctx, font, j.h), u = (t - j.at) / squeeze;
      if (D.flapMotion && u < 1) {
        // The flap falling: the letter squeezes through the middle of its cell, then opens out.
        const sy = .15 + .85 * (1 - (1 - u) * (1 - u)), cy = j.y + j.h / 2;
        ctx.setTransform(dpr, 0, 0, dpr * sy, 0, cy * dpr * (1 - sy));
        ctx.fillText(ch, j.x + j.w / 2, by);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      } else ctx.fillText(ch, j.x + j.w / 2, by);
    }
    if (live) { raf = requestAnimationFrame(tick); return; }
    // Landed: the real text shows under the drawing, then the drawing goes (no flash while its colour fades in).
    document.querySelectorAll(".fl-hide").forEach(e => e.classList.remove("fl-hide"));
    endT = window.setTimeout(() => { if (cv === C) { C.remove(); cv = null; } }, 500);
  };
  raf = requestAnimationFrame(tick);
}
// A new roll starts from what is on screen: drop the old drawing (its letters were read before this).
function finishCells() { cancelAnimationFrame(raf); clearTimeout(endT); jobs = []; cv?.remove(); cv = null; }
