// Dots: the name, titles, text and rules are laid out by the browser, then drawn as dots on a canvas.
// Changing page pulls the "magnets" off (dots loosen and drift) and sets new ones (dots are pulled in).
// Body text crossfades to the real font once its dots have landed.
import { dom, state, S, dotSizeNow, buzzNow } from "./state";

export const BUZZ_SEL = ".hd a, .hd button, .t-big, .t-mid, .t-title";   // these stay as dots and gently buzz
const PHYS = { k: .03, damp: .82 };
const MAX_TARGETS = 45000, MAX_LICHEN = 160000;   // lichen dots don't move once grown: many more are affordable
const { L, M } = dom;

interface Target { x: number; y: number; r: number; key: string; buzz: boolean; sc: number; g?: number; fr?: number }   // g, fr: lichen growth time (0–1) and dot radius
interface Dot {
  x: number; y: number; vx: number; vy: number; tx: number; ty: number; r: number; tr: number;
  key: string | null; start: number; a: number; ta: number; seed: number; die: boolean;
  vis: number; hid: boolean; bz: boolean; sc: number; rest?: boolean;
  tw?: { fx: number; fy: number; tx: number; ty: number; fr: number; tr: number; fa: number; ta: number; t0: number; dur: number } | null;
  hold?: number; kick?: number; gx?: number; gy?: number; k?: number; dm?: number; _u?: number;
  lc?: boolean; g?: number; bt?: number; dd?: number;   // lichen: grows in place at bt, ungrows at dd
}
/** Lichen animations grow the dots in place instead of moving them. */
const lichen = () => S.dots.anim === "crust" || S.dots.anim === "leafy" || S.dots.anim === "rosette";

let keyEl = new Map<string, HTMLElement>(), gen = 0;
let buzzKeys = new Set<string>(), smallKeys = new Set<string>();
let P: Dot[] = [];
let W = 0, H = 0, DPR = 1;
let hoverKey: string | null = null;
let releaseOrigin: { x: number; y: number } | null = null;
let ink = [...state.inkTo];
export const setHoverKey = (k: string | null) => { hoverKey = k; };
export const setReleaseOrigin = (x: number, y: number) => { releaseOrigin = { x, y }; };
export const viewport = () => ({ W, H });
export let onStat: (n: number) => void = () => {};
export const setOnStat = (f: (n: number) => void) => { onStat = f; };

// Dot spaces: 0 = fixed on screen (header, rules), 1 = text column (scrolls), 2 = Work project list (scrolls inside it).
export const spaceOff = (sc: number) =>
  (sc >= 1 ? (state.phone ? (M.classList.contains("home") ? 0 : M.scrollTop) : L.scrollTop) : 0) +
  (sc === 2 && state.PL ? state.PL.scrollTop : 0);

// ───────── Canvas (WebGL points, 2D fallback) ─────────
const cv = dom.cv;
const gl = cv.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true });
let ctx: CanvasRenderingContext2D | null = null;
const loc: Record<string, WebGLUniformLocation | null> = {};
let buf = new Float32Array(4 * 8192);
if (gl) {
  const sh = (type: number, src: string) => { const o = gl.createShader(type)!; gl.shaderSource(o, src); gl.compileShader(o); return o; };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, `
    attribute vec4 a; uniform vec2 res; uniform float dpr; varying float al; varying float px;
    void main() {
      vec2 c = a.xy / res * 2.0 - 1.0;
      gl_Position = vec4(c.x, -c.y, 0.0, 1.0);
      float d = a.z * 2.0 * dpr;            // diameter in device pixels
      px = max(d, 1.0);
      gl_PointSize = px + 1.0;
      al = a.w * min(d, 1.0);               // sub-pixel dots fade instead of shrinking
    }`));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, `
    precision mediump float; uniform vec3 col; uniform float round; varying float al; varying float px;
    void main() {
      vec2 q = (gl_PointCoord - 0.5) * (px + 1.0);
      float d = round > 0.5 ? length(q) : max(abs(q.x), abs(q.y));
      float m = clamp(px * 0.5 - d + 0.5, 0.0, 1.0);
      gl_FragColor = vec4(col, 1.0) * (al * m);
    }`));
  gl.linkProgram(prog); gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  const a = gl.getAttribLocation(prog, "a");
  gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 4, gl.FLOAT, false, 16, 0);
  for (const u of ["res", "dpr", "col", "round"]) loc[u] = gl.getUniformLocation(prog, u);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
} else ctx = cv.getContext("2d");

export function resizeCanvas() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W * DPR; cv.height = H * DPR;
  cv.style.width = W + "px"; cv.style.height = H + "px";   // exactly the visible area (CSS 100vh is taller on iPhone)
  if (gl) gl.viewport(0, 0, cv.width, cv.height);
}
resizeCanvas();

// ───────── Sampling: DOM → dot targets ─────────
const off = document.createElement("canvas"), octx = off.getContext("2d", { willReadFrequently: true })!;
let R = 2;   // raster resolution (finer for tiny lichen dots)
function sampleElement(el: HTMLElement, key: string, sizeMul: number, buzz: boolean, sc: number): Target[] {
  const box = el.getBoundingClientRect();
  if (box.width < 1 || box.height < 1) return [];
  const fs0 = parseFloat(getComputedStyle(el).fontSize), lich = lichen();
  const pad = 4 + (lich ? Math.ceil(S.dots.overflow / 100 * fs0) + 2 : 0), bx = box.left - pad, by = box.top - pad;
  // Lichen: dot size in pixels, the same for all text; density sets the spacing (1 = solid). sizeMul > 1 when the page
  // has too many dots and they had to be spread out.
  const lstep = Math.max(.45, S.dots.lichenDot * .72 / S.dots.lichenDensity * sizeMul);
  R = lich && lstep < 1.2 ? 4 : 2;
  const w = Math.ceil(box.width + pad * 2), h = Math.ceil(box.height + pad * 2);
  off.width = w * R; off.height = h * R;
  octx.setTransform(R, 0, 0, R, 0, 0);
  octx.clearRect(0, 0, w, h);
  octx.fillStyle = "#000";
  // Text: each word drawn exactly where the browser placed it.
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const fsMain = parseFloat(getComputedStyle(el).fontSize);
  for (let n = walker.nextNode() as Text | null; n; n = walker.nextNode() as Text | null) {
    const cs = getComputedStyle(n.parentElement!);
    if (cs.display === "none") continue;
    octx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if ("letterSpacing" in octx) (octx as any).letterSpacing = cs.letterSpacing === "normal" ? "0px" : cs.letterSpacing;
    octx.textBaseline = "alphabetic";
    const upper = cs.textTransform === "uppercase";
    const stroke = parseFloat((cs as any).webkitTextStrokeWidth) || 0;   // the fine outline that thickens Degular Mono
    octx.strokeStyle = "#000";
    const re = /\S+/g; let m: RegExpExecArray | null;
    while ((m = re.exec(n.data))) {
      range.setStart(n, m.index); range.setEnd(n, m.index + m[0].length);
      const r = range.getClientRects()[0];
      if (!r) continue;
      const word = upper ? m[0].toUpperCase() : m[0];
      const tm = octx.measureText(word);
      const asc = tm.fontBoundingBoxAscent ?? parseFloat(cs.fontSize) * .8;
      const desc = tm.fontBoundingBoxDescent ?? parseFloat(cs.fontSize) * .2;
      const ty = r.top + (r.height - (asc + desc)) / 2 + asc - by;
      octx.fillText(word, r.left - bx, ty);
      if (stroke > 0) { octx.lineWidth = stroke; octx.strokeText(word, r.left - bx, ty); }
    }
  }
  // Rules: any border becomes a dotted line.
  for (const e of [el, ...el.querySelectorAll<HTMLElement>("*")]) {
    const cs = getComputedStyle(e), r = e.getBoundingClientRect();
    const t = parseFloat(cs.borderTopWidth), b = parseFloat(cs.borderBottomWidth), l = parseFloat(cs.borderLeftWidth), rr = parseFloat(cs.borderRightWidth);
    if (t > 0) octx.fillRect(r.left - bx, r.top - by, r.width, Math.max(t, 1));
    if (b > 0) octx.fillRect(r.left - bx, r.bottom - by - Math.max(b, 1), r.width, Math.max(b, 1));
    if (l > 0) octx.fillRect(r.left - bx, r.top - by, Math.max(l, 1), r.height);
    if (rr > 0) octx.fillRect(r.right - bx - Math.max(rr, 1), r.top - by, Math.max(rr, 1), r.height);
  }
  // Grid-sample the raster. Bigger type gets a coarser grid; "dot size" scales it.
  const step = lich ? lstep : Math.max(Math.min(Math.max(fsMain * .072, 1.45), 4.6) * sizeMul, .7);
  const data = octx.getImageData(0, 0, off.width, off.height).data;
  if (lich) return growLichen(data, w, h, bx, by, step, fsMain, key, buzz, sc);
  const out: Target[] = [], oy = spaceOff(sc);
  for (let y = step / 2; y < h; y += step) {
    for (let x = step / 2; x < w; x += step) {
      if (data[((Math.round(y * R) * off.width) + Math.round(x * R)) * 4 + 3] > 90) out.push({ x: bx + x, y: by + y + oy, r: step, key, buzz, sc });
    }
  }
  return out;
}

// ───────── Lichen: which cells grow, and when ─────────
// The sampled grid around the text is grown like lichen: from a spore in each separate shape, cell by cell to
// neighbouring cells. Inside the letters everything grows; past them growth thins out with distance (spill, a
// share of the font size), forms lobes, then keeps to branches spaced in dot sizes. Each cell gets its growth
// time; the dots then simply appear in that order (and disappear newest first when the page changes).
const hash = (x: number, y: number) => { let h = (x * 374761393 + y * 668265263) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
function noise(px: number, py: number, scale: number) {   // smooth random field in page pixels (continuous across elements)
  const fx = px / scale, fy = py / scale, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
  const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty), a = hash(x0, y0), b = hash(x0 + 1, y0), c = hash(x0, y0 + 1), d = hash(x0 + 1, y0 + 1);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}
function growLichen(data: Uint8ClampedArray, w: number, h: number, bx: number, by: number, step: number, fs: number, key: string, buzz: boolean, sc: number): Target[] {
  const D = S.dots, mode = D.anim, gw = Math.max(1, Math.floor(w / step)), gh = Math.max(1, Math.floor(h / step)), N = gw * gh;
  const cx = (c: number) => bx + (c % gw + .5) * step, cy = (c: number) => by + ((c / gw) | 0) * step + step / 2;
  const dist = new Int16Array(N).fill(999), q: number[] = [];
  for (let c = 0; c < N; c++) {
    const x = (c % gw + .5) * step, y = (((c / gw) | 0) + .5) * step;
    if (data[((Math.round(y * R) * off.width) + Math.round(x * R)) * 4 + 3] > 90) { dist[c] = 0; q.push(c); }
  }
  if (!q.length) return [];
  const ov = Math.round(D.overflow / 100 * fs / step), dot = D.lichenDot;
  for (let k = 0; k < q.length; k++) {   // distance from the letters, in cells
    const c = q[k], x = c % gw, y = (c / gw) | 0, nd = dist[c] + 1; if (nd > ov + 1) continue;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= gw || Y >= gh) continue;
      const j = Y * gw + X; if (dist[j] > nd) { dist[j] = nd; q.push(j); }
    }
  }
  const alive = new Uint8Array(N), done = new Uint8Array(N), when = new Float32Array(N), front: number[] = [];
  const vein = new Float32Array(N).fill(1), ox = new Float32Array(N), oy0 = new Float32Array(N), par = new Int32Array(N).fill(-1);   // each cell's spore, and who reached it
  const rad = (c: number, o: number) => Math.hypot(c % gw - ox[o], ((c / gw) | 0) - oy0[o]);
  const around = (c: number) => { let k = 0; const x = c % gw, y = (c / gw) | 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const X = x + dx, Y = y + dy; if ((dx || dy) && X >= 0 && Y >= 0 && X < gw && Y < gh && alive[Y * gw + X]) k++; } return k; };
  const accept = (c: number) => {
    const d = dist[c]; if (d > ov + 1) return 0;
    // Growth radiates from its spore: cells further out than the one that reached them are favoured
    // (strongly for leafy, which then grows in branches like mycelium; mildly for crust and rosette).
    const pa = par[c], out = pa < 0 || rad(c, pa) > rad(pa, pa) + .2 ? 1 : mode === "leafy" ? .08 : .5;
    return out * acceptRaw(c, d);
  };
  const acceptRaw = (c: number, d: number) => {
    if (d === 0) return mode === "leafy" ? [1, 1, .3, .05][Math.min(3, around(c))] : 1;   // leafy prefers tips: it branches before filling
    const px = cx(c), py = cy(c) + spaceOff(sc), n = noise(px, py, Math.max(32, dot * 10));
    let p = Math.pow(1 - d / (ov + 1.5), 1.6) * (.25 + .9 * n * n);
    const v = vein[c] = Math.abs(noise(px + 999, py, dot * D.branches) - .5);   // 0 on a branch's middle line
    if (d * step > dot * 1.5 && v > .15) p *= .03;   // branches, gaps in dot sizes
    if (v < .045) p = Math.max(p, .85 * Math.pow(1 - d / (ov + 1.5), .6));   // a branch's core grows readily: visible veins
    if (mode === "leafy") p *= [1, 1, .3, .01][Math.min(3, around(c))];
    if (mode === "rosette") p *= .8;
    return p;
  };
  let t = 0;
  const birth = (c: number) => {
    alive[c] = 1; done[c] = 1; when[c] = t;
    const pa = par[c];
    if (pa < 0) { ox[c] = c % gw; oy0[c] = (c / gw) | 0; } else { ox[c] = ox[pa]; oy0[c] = oy0[pa]; }   // inherit the spore
    const x = c % gw, y = (c / gw) | 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= gw || Y >= gh) continue;
      const j = Y * gw + X; if (!done[j] && dist[j] <= ov + 1) { if (par[j] < 0) par[j] = c; front.push(j); }
    }
  };
  // A spore in every separate shape (letters, dots on i's…), more in big ones.
  const seen = new Uint8Array(N);
  for (let c0 = 0; c0 < N; c0++) {
    if (dist[c0] || seen[c0]) continue;
    const blob = [c0]; seen[c0] = 1;
    for (let k = 0; k < blob.length; k++) {
      const c = blob[k], x = c % gw, y = (c / gw) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const X = x + dx, Y = y + dy; if (X < 0 || Y < 0 || X >= gw || Y >= gh) continue;
        const j = Y * gw + X; if (!seen[j] && !dist[j]) { seen[j] = 1; blob.push(j); }
      }
    }
    // The first spore at the shape's centre (the cell nearest its middle), so it grows outward from there;
    // very big shapes get a few more.
    let mx = 0, my = 0; for (const c of blob) { mx += c % gw; my += (c / gw) | 0; } mx /= blob.length; my /= blob.length;
    let best = blob[0], bd = Infinity; for (const c of blob) { const dd = (c % gw - mx) ** 2 + (((c / gw) | 0) - my) ** 2; if (dd < bd) { bd = dd; best = c; } }
    birth(best);
    for (let k = Math.floor(blob.length * step * step / 40000); k > 0; k--) { const c = blob[(Math.random() * blob.length) | 0]; if (!alive[c]) birth(c); }
  }
  // Growth: try frontier cells at random; time runs at a rate set by the size of the frontier (like real growth).
  let guard = N * 40;
  while (front.length && guard-- > 0) {
    const r = (Math.random() * front.length) | 0, c = front[r]; front[r] = front[front.length - 1]; front.pop();
    t += 1 / (front.length + 1);
    if (done[c]) continue;
    if (Math.random() < accept(c)) birth(c); else if (mode === "leafy" && !dist[c]) front.push(c); else done[c] = 1;
  }
  // Greys are a halftone screen: lighter cells keep only a staggered grid of dots, sized by the grey.
  const out: Target[] = [], oy = spaceOff(sc), m = Math.max(2, Math.round(dot * 2.2 / step)), rr = dot / 2;   // screen pitch: about two dots
  // Time is measured on the letters themselves (the spill around them finishes a little after).
  let T = 0; for (let c = 0; c < N; c++) if (alive[c] && !dist[c] && when[c] > T) T = when[c];
  T = T || t || 1;
  const wob = .7 * Math.min(1, Math.max(.15, 1.5 - D.lichenDensity));   // each dot slightly off the grid: organic, less wobble when dense
  for (let c = 0; c < N; c++) {
    if (!alive[c]) continue;
    const d = dist[c], g = Math.min(1.35, when[c] / T);
    const core = d > 0 && vein[c] < .045;   // vein cores are solid, the rest of the spill is screened
    const grey = core ? 1 : mode === "rosette" ? ((g * 6) % 1 > .4 ? .32 : 1) : d === 0 ? 1 : d > ov * .6 ? .32 : .55;
    let fr = rr * 1.45, jx = (Math.random() - .5) * wob * step, jy = (Math.random() - .5) * wob * step;   // solid: dots overlap enough to read black
    if (grey < 1) {
      const x = c % gw, y = (c / gw) | 0;
      if (y % m || (x + ((y / m) | 0) % 2 * 1) % m) continue;
      fr = Math.min(rr * 1.45, m * step * Math.sqrt(grey / Math.PI)); jx = jy = 0;   // lighter grey, smaller dot (never bigger than a solid one); the screen stays regular
    }
    out.push({ x: cx(c) + jx, y: cy(c) + oy + jy, r: step, key, buzz, sc, g, fr });
  }
  return out;
}

/** Reads the page into dot targets. Spread over several frames (a slice of a few ms each) so the animation never
 *  stalls; a newer call makes an older one give up (it returns null). */
let collecting = 0;
export async function collectTargets(pageId: string): Promise<Target[] | null> {
  const me = ++collecting;
  let slice = performance.now();
  const breathe = async () => {
    if (performance.now() - slice < 6) return true;
    await new Promise(r => setTimeout(r, 0)); slice = performance.now();
    return me === collecting;
  };
  const els = [...document.querySelectorAll<HTMLElement>("[data-p]")];
  const PL = state.PL, plr = PL && PL.getBoundingClientRect();
  const lich = lichen(), cap = lich ? MAX_LICHEN : MAX_TARGETS;
  let dens = lich ? 1 : dotSizeNow(), targets: Target[] = [];
  for (let pass = 0; pass < 3; pass++) {
    targets = []; keyEl = new Map(); buzzKeys = new Set(); smallKeys = new Set();
    for (let i = 0; i < els.length; i++) {
      if (!(await breathe())) return null;
      const el = els[i];
      const sc = PL && PL.contains(el) ? 2 : L.contains(el) ? 1 : 0;
      const key = el.dataset.k || `${pageId}:${i}`;
      keyEl.set(key, el);
      // Small text (below the size set in Dots) turns into real type once formed, like body text, whatever it is.
      const small = S.dots.realBelow > 0 && !!el.textContent!.trim() && parseFloat(getComputedStyle(el).fontSize) < S.dots.realBelow;
      const buzz = el.matches(BUZZ_SEL) && !small;
      if (small) smallKeys.add(key); if (buzz) buzzKeys.add(key);
      // List rows outside the visible part of the carousel go straight to real type.
      if (sc === 2 && S.dots.real && plr) { const r = el.getBoundingClientRect(); if (r.bottom < plr.top - 40 || r.top > plr.bottom + 40) { el.classList.add("real"); continue; } }
      // Text far below the fold doesn't need dots: it becomes real type straight away.
      if (sc && S.dots.real && !buzz && el.getBoundingClientRect().top > H * 1.3) { el.classList.add("real"); continue; }
      for (const t of sampleElement(el, key, dens, buzz, sc)) targets.push(t);
    }
    if (targets.length <= cap) break;
    dens /= Math.sqrt(cap / targets.length) * .97;   // too many: spread the dots out
  }
  return targets;
}

// ───────── Particles ─────────
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const spawn = (x: number, y: number): Dot => ({ x, y, vx: 0, vy: 0, tx: x, ty: y, r: 0, tr: 2, key: null, start: 0, a: 0, ta: 1, seed: Math.random() * 1000, die: false, vis: 1, hid: false, bz: false, sc: 0 });
let TR = { gx: 0, gy: 1, tempo: 1, wander: .12 };

/** Real text goes back to dots instantly (except elements that keep their magnet), so the dots can leave. */
export function showDots(keep: Set<string>) {
  gen++;
  document.querySelectorAll<HTMLElement>(".real").forEach(e => { if (!keep.has(e.dataset.k!)) e.classList.remove("real"); });
  for (const p of P) if (p.hid && !keep.has(p.key!)) { p.hid = false; p.vis = 1; }
}

/** Magnets pulled off in a wave spreading from where you clicked. Released dots slip off with a little
 *  gravity whose direction, strength and tempo change every time. */
export function release(keep: Set<string>) {
  if (lichen()) keep = new Set();   // lichen: everything retracts, then the new page grows (nothing stays)
  showDots(keep);
  const now = performance.now();
  if (lichen()) {
    releasedAt = now;
    // Lichen ungrows where it is: newest growth first, retracting toward where each shape started.
    for (const p of P) {
      if (p.sc) { const o = spaceOff(p.sc); p.y -= o; p.ty -= o; p.sc = 0; }
      if (p.die || (p.key && keep.has(p.key))) continue;
      p.key = null; p.bz = false;
      // Text that was real type goes quickly, so it doesn't linger under the new page's text.
      if (p.lc) p.dd = Math.min(p.dd ?? Infinity, now + Math.max(0, 1 - (p.g ?? 0) / 1.35) * (UNGROW - POP)); else { p.die = true; p.ta = 0; }
    }
    releaseOrigin = null;
    return;
  }
  const O = releaseOrigin ?? { x: rand(0, W), y: rand(0, H) };
  const ga = Math.random() < .5 ? rand(Math.PI * .3, Math.PI * .7) : rand(0, Math.PI * 2);
  const gm = rand(.25, 1.6);
  TR = { gx: Math.cos(ga) * gm, gy: Math.sin(ga) * gm, tempo: rand(.75, 1.3), wander: rand(.04, .45) };
  const maxD = Math.hypot(W, H);
  for (const p of P) {
    // The text column is about to reset its scroll: move its dots to screen space.
    if (p.sc) { const o = spaceOff(p.sc); p.y -= o; p.ty -= o; p.sc = 0; }
    if (p.die || (p.key && keep.has(p.key))) continue;
    p.key = null; p.bz = false; p.tw = null; p.start = Infinity; p.rest = false;
    p.hold = now + Math.min(Math.hypot(p.x - O.x, p.y - O.y) / maxD, 1) * 110 + rand(0, 90);
    p.kick = 1; p.gx = TR.gx; p.gy = TR.gy;
  }
  releaseOrigin = null;
}

/** Give the dots their new targets. gentle = same page re-laid out (resize, settings): just glide. */
export function assign(targets: Target[], gentle = false) {
  const now = performance.now();
  if (lichen()) return assignLichen(targets, gentle, now);
  const byKey = new Map<string, Target[]>();
  for (const t of targets) { if (!byKey.has(t.key)) byKey.set(t.key, []); byKey.get(t.key)!.push(t); }
  const pool: Dot[] = [], need: Target[] = [], holding = new Map<string, Dot[]>();
  for (const p of P) {
    if (p.die) continue;
    if (p.key && byKey.has(p.key)) { if (!holding.has(p.key)) holding.set(p.key, []); holding.get(p.key)!.push(p); }
    else pool.push(p);
  }
  // Elements that kept their magnet (header, rules, Work/About): morph in place.
  for (const [key, ts] of byKey) {
    const ps = holding.get(key) || [];
    ps.sort((a, b) => a.tx - b.tx || a.ty - b.ty);
    const tsS = [...ts].sort((a, b) => a.x - b.x || a.y - b.y);
    const n = Math.min(ps.length, tsS.length);
    for (let i = 0; i < n; i++) {
      const q = ps[i];
      const moved = Math.abs(q.tx - tsS[i].x) + Math.abs(q.ty - tsS[i].y) > .5;
      setTarget(q, tsS[i], now);
      if (!gentle && moved) q.tw = { fx: q.x, fy: q.y, tx: q.tx, ty: q.ty, fr: q.r, tr: q.tr * S.dots.fill, fa: q.a, ta: 1, t0: now, dur: 420 };
    }
    for (let i = n; i < ps.length; i++) { ps[i].key = null; pool.push(ps[i]); }
    for (let i = n; i < tsS.length; i++) need.push(tsS[i]);
  }

  const land = new Map<string, number>();
  const landAt = (key: string, t: number) => land.set(key, Math.max(land.get(key) || 0, t));
  if (!gentle) {
    // No ordering: each element's magnet switches on within a short random window, each dot a little later
    // still, so pulling off and setting overlap into one continuous movement. Each magnet pulls in the loose
    // dots nearest to it (a spatial grid finds them fast).
    const free = pool.filter(p => !p.die);
    const keyTime = new Map<string, number>();
    for (const t of targets) if (!keyTime.has(t.key)) keyTime.set(t.key, now + rand(20, 200));
    const C = 32, MAXR = 9;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const q of free) { if (q.x < x0) x0 = q.x; if (q.y < y0) y0 = q.y; if (q.x > x1) x1 = q.x; if (q.y > y1) y1 = q.y; }
    const cols = Math.max(1, Math.ceil((x1 - x0) / C) + 1), rows = Math.max(1, Math.ceil((y1 - y0) / C) + 1);
    const grid: Dot[][] = new Array(free.length ? cols * rows : 0);
    for (const q of free) { const c = Math.floor((q.y - y0) / C) * cols + Math.floor((q.x - x0) / C); (grid[c] || (grid[c] = [])).push(q); }
    let left = free.length;
    const stamp = Math.random();
    shuffle(need);
    for (const t of need) {
      // Search around a slightly jittered point, so paths cross a little.
      const jx = t.x + rand(-30, 30), jy = t.y + rand(-30, 30);
      const cx = Math.floor((jx - x0) / C), cy = Math.floor((jy - y0) / C);
      let best: Dot | null = null;
      for (let r = 0; r <= MAXR && !best && left; r++) {
        for (let gy = cy - r; gy <= cy + r && !best; gy++) {
          if (gy < 0 || gy >= rows) continue;
          const edge = gy === cy - r || gy === cy + r;
          for (let gx = cx - r; gx <= cx + r; gx += (edge || !r) ? 1 : 2 * r) {
            if (gx < 0 || gx >= cols) continue;
            const a = grid[gy * cols + gx];
            if (a && a.length) { best = a.pop()!; left--; break; }
          }
        }
      }
      let p = best;
      if (p) p._u = stamp;
      else {
        // No loose dot nearby: a fresh one is drawn in from the surroundings.
        const a = rand(0, Math.PI * 2), Rr = rand(30, 110);
        p = spawn(t.x + Math.cos(a) * Rr, t.y + Math.sin(a) * Rr);
        p.a = 0; p.r = t.r * S.dots.fill; p.gx = 0; p.gy = 0; p.hold = 0; p.kick = 0; P.push(p);
      }
      setTarget(p, t, keyTime.get(t.key)! + rand(0, 240));
      // Each dot has its own pull and friction: some arrive early, some overshoot and wobble, a few straggle.
      p.k = .03 * rand(.55, 1.5) / TR.tempo; p.dm = rand(.78, .88);
      landAt(t.key, keyTime.get(t.key)! + 1150);
    }
    for (const p of free) if (p._u !== stamp) { p.die = true; p.ta = 0; }   // unclaimed: fade where they lie
    for (const [key] of byKey) if (!land.has(key)) landAt(key, now + 450);
  } else {
    shuffle(pool); shuffle(need);
    while (pool.length < need.length) { const p = spawn(rand(0, W), rand(0, H)); p.a = 0; P.push(p); pool.push(p); }
    for (let i = 0; i < need.length; i++) setTarget(pool[i], need[i], now);
    for (let i = need.length; i < pool.length; i++) { const p = pool[i]; p.key = null; p.die = true; p.ta = 0; }
    for (const [key] of byKey) {
      const el = keyEl.get(key);
      if (el && el.classList.contains("real")) { for (const p of P) if (p.key === key) { p.hid = true; p.vis = 0; } }
      else landAt(key, now + 400);
    }
  }
  scheduleReal(land);
  onStat(targets.length);
}

/** Lichen: each element's dots appear in place in their growth order. What both pages share (the header, a menu
 *  title that doesn't move) stays; the rest was ungrown by release(). */
let releasedAt = -1e9;
const GROW = 1800, POP = 160, UNGROW = 900;   // ms: growth of a shape, one dot appearing, the old page retracting
function assignLichen(targets: Target[], gentle: boolean, now: number) {
  const byKey = new Map<string, Target[]>();
  for (const t of targets) { if (!byKey.has(t.key)) byKey.set(t.key, []); byKey.get(t.key)!.push(t); }
  const have = new Map<string, Dot[]>();
  for (const p of P) {
    if (p.die || p.dd !== undefined && p.dd < Infinity) continue;
    if (!p.lc || !p.key || !byKey.has(p.key)) { if (!p.lc) { p.die = true; p.ta = 0; } continue; }   // particles from before: fade
    if (!have.has(p.key)) have.set(p.key, []); have.get(p.key)!.push(p);
  }
  const land = new Map<string, number>();
  for (const [key, ts] of byKey) {
    const old = have.get(key) || [], el = keyEl.get(key);
    // Same shape in the same place (by count and corners): keep it as it is.
    const same = old.length && Math.abs(old.length - ts.length) <= Math.max(3, ts.length * .02) &&
      Math.abs(Math.min(...old.map(p => p.tx)) - Math.min(...ts.map(t => t.x))) < 1.5 && Math.abs(Math.min(...old.map(p => p.ty)) - Math.min(...ts.map(t => t.y))) < 1.5;
    if (same && !gentle) continue;
    // Changed: the old growth goes (at once when only re-laid out, else it ungrows), the new one grows.
    for (const p of old) { if (gentle) p.die = true, p.a = 0; else p.dd = now + Math.max(0, 1 - (p.g ?? 0) / 1.35) * (UNGROW - POP); }
    const t0 = gentle ? now - GROW - POP : Math.max(now, releasedAt + UNGROW) + rand(0, 60);   // once the old page has gone
    const hidden = gentle && !!el?.classList.contains("real");
    for (const t of ts) {
      const p = spawn(t.x, t.y);
      p.lc = true; p.key = key; p.sc = t.sc; p.tx = t.x; p.ty = t.y; p.tr = t.fr ?? t.r * S.dots.fill; p.g = t.g ?? 0;
      p.bt = t0 + p.g * GROW; p.dd = Infinity; p.bz = t.buzz; p.a = 0; p.r = 0; p.hid = hidden; p.vis = hidden ? 0 : 1;
      P.push(p);
    }
    if (!hidden) land.set(key, t0 + GROW + POP);
  }
  scheduleReal(land);
  onStat(targets.length);
}

/** Turn landed body text into real type. */
export function scheduleReal(land: Map<string, number>) {
  const g = gen;
  for (const [key, t] of land) {
    const el = keyEl.get(key);
    if (!el || buzzKeys.has(key)) continue;
    setTimeout(() => {
      if (g !== gen || !(S.dots.real || smallKeys.has(key)) || !el.isConnected) return;
      el.classList.add("real");
      for (const p of P) if (p.key === key) p.hid = true;
    }, Math.max(0, t - performance.now()) + 120);
  }
}
export const realNow = () => scheduleReal(new Map([...keyEl.keys()].map(k => [k, performance.now()])));

function setTarget(p: Dot, t: Target, start: number) {
  if (t.sc !== p.sc) { p.y += spaceOff(t.sc) - spaceOff(p.sc); p.sc = t.sc; }
  p.key = t.key; p.tx = t.x; p.ty = t.y; p.tr = t.r; p.ta = 1; p.start = start; p.die = false;
  p.bz = t.buzz; p.hid = false; p.rest = false; p.k = undefined; p.dm = undefined;
}
function shuffle<T>(a: T[]) { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }

// ───────── Animation loop ─────────
const inout = (u: number) => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
let last = performance.now();

function frame(now: number) {
  const dt = Math.min((now - last) / 16.67, 3); last = now;
  for (let i = 0; i < 3; i++) ink[i] += (state.inkTo[i] - ink[i]) * .06 * dt;
  // Update in place and compact the array (removing thousands of dots stays cheap).
  let w = 0;
  for (let i = 0; i < P.length; i++) { const p = P[i]; if (update(p, now, dt)) P[w++] = p; }
  P.length = w;
  draw(now);
  requestAnimationFrame(frame);
}

function update(p: Dot, now: number, dt: number) {
  const t = now * .00025, D = S.dots;
  p.vis += ((p.hid ? 0 : 1) - p.vis) * .14 * dt;
  if (p.lc) {
    // Lichen: no movement, the dot just grows in at its time and shrinks away at its end.
    if (p.die) return false;
    if (p.rest && p.dd === Infinity) return true;
    let u = now >= p.dd! ? 1 - (now - p.dd!) / POP : (now - p.bt!) / POP;
    if (now >= p.dd! && u <= 0) return false;
    u = Math.min(1, Math.max(0, u)); u = u * u * (3 - 2 * u);
    p.r = p.tr * u; p.a = u > 0 ? 1 : 0; p.rest = u >= 1;
    return true;
  }
  // Dots sitting on their magnet cost nothing until something disturbs them.
  if (p.rest) { if (p.key !== hoverKey) return true; p.rest = false; }
  if (p.tw) {
    // Kept element morphing in place (e.g. Work ↔ About sizes)
    const w = p.tw, u = (now - w.t0) / w.dur;
    if (u <= 0) { p.x = w.fx; p.y = w.fy; return true; }
    const v = Math.min(u, 1), e = inout(v);
    p.x = w.fx + (w.tx - w.fx) * e; p.y = w.fy + (w.ty - w.fy) * e;
    p.r = Math.max(.2, w.fr + (w.tr - w.fr) * e);
    p.a = w.fa + (w.ta - w.fa) * (w.ta > w.fa ? Math.min(1, v * 2.5) : v);
    if (u >= 1) { p.tw = null; p.vx = p.vy = 0; if (p.die) return false; if (p.key) { p.x = p.tx; p.y = p.ty; p.start = 0; } }
    return true;
  }
  let ax = 0, ay = 0, damp: number, lift = 1;
  const ang = (Math.sin(p.x * .0045 + t * 3 + p.seed) + Math.cos(p.y * .004 - t * 2)) * Math.PI;
  if (p.key && now >= p.start) {
    // Pulled toward its magnet
    const dx = p.tx - p.x, dy = p.ty - p.y, d = Math.hypot(dx, dy);
    const k = p.k ?? PHYS.k;
    ax = dx * k; ay = dy * k;
    const wn = Math.min(d / 160, 1) * TR.wander;
    ax += Math.cos(ang) * wn; ay += Math.sin(ang) * wn;
    damp = p.dm ?? PHYS.damp;
    lift = 1 + Math.min(d / 50, 1) * .4;
    if (d < .08 && Math.abs(p.vx) + Math.abs(p.vy) < .05) {
      p.x = p.tx; p.y = p.ty; p.vx = p.vy = 0;
      const tr = p.tr * D.fill;
      if (Math.abs(p.r - tr) < .02 && Math.abs(p.a - p.ta) < .02 && p.key !== hoverKey) { p.r = tr; p.a = p.ta; p.rest = true; return true; }
    }
  } else if (p.gx !== undefined) {
    // Loose on the canvas, no magnet holding it
    if (now < p.hold!) { p.vx = p.vy = 0; damp = 1; }
    else {
      if (p.kick) {
        p.kick = 0;
        const a = rand(0, Math.PI * 2), v = rand(.15, 1.2);
        p.vx += Math.cos(a) * v + p.gx * rand(.2, 1.4); p.vy += Math.sin(a) * v + p.gy! * rand(.2, 1.4);
      }
      ax = p.gx * .03 + Math.cos(ang) * .03; ay = p.gy! * .03 + Math.sin(ang) * .03;
      damp = .93; lift = 1.15;
    }
  } else { ax = Math.cos(ang) * .045; ay = Math.sin(ang) * .045; damp = .965; }
  const dmp = Math.pow(damp, dt);
  p.vx = p.vx * dmp + ax * dt; p.vy = p.vy * dmp + ay * dt;
  const sp = Math.abs(p.vx) + Math.abs(p.vy);
  if (sp > 22) { p.vx *= 22 / sp; p.vy *= 22 / sp; }
  p.x += p.vx * dt; p.y += p.vy * dt;
  const tr = p.tr * D.fill * lift * (hoverKey && p.key === hoverKey ? 1.35 : 1);
  p.r += (tr - p.r) * .14 * dt;
  p.a += (p.ta - p.a) * .07 * dt;
  return !(p.die && p.a < .01);
}

function draw(now: number) {
  if (buf.length < P.length * 4) buf = new Float32Array(P.length * 6);
  const o1 = spaceOff(1), o2 = spaceOff(2), D = S.dots, buzz = buzzNow();
  let plTop = 0, plBot = 0;
  if (state.PL) { const r = state.PL.getBoundingClientRect(); plTop = r.top; plBot = r.bottom; }
  let n = 0;
  for (let i = 0; i < P.length; i++) {
    const p = P[i], al = p.a * p.vis;
    if (al < .02) continue;
    let x = p.x, y = p.y;
    if (p.sc === 1) { y -= o1; if (y < state.colTop - 1) continue; }                 // clipped under the header
    else if (p.sc === 2) { y -= o2; if (y < plTop - 1 || y > plBot + 1) continue; }   // clipped to the list
    if (y < -10 || y > H + 10 || x < -10 || x > W + 10) continue;
    const r = Math.max(p.r, .3);
    if (p.bz && !p.tw && buzz > 0) {
      // Calm buzz: each dot hums on its own slow, small orbit (~1 Hz, ≤1px).
      const amp = Math.min(r * .55, 1.1) * buzz, f = .004 + (p.seed % 1) * .006;
      x += Math.sin(now * f + p.seed) * amp;
      y += Math.cos(now * f * .87 + p.seed * 1.7) * amp;
    }
    buf[n++] = x; buf[n++] = y; buf[n++] = r; buf[n++] = al;
  }
  if (gl) {
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(loc.res, W, H); gl.uniform1f(loc.dpr, DPR);
    gl.uniform3f(loc.col, ink[0] / 255, ink[1] / 255, ink[2] / 255);
    gl.uniform1f(loc.round, D.shape === "square" ? 0 : 1);
    gl.bufferData(gl.ARRAY_BUFFER, buf.subarray(0, n), gl.DYNAMIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, n / 4);
  } else if (ctx) {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0); ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = `rgb(${ink.map(Math.round).join(",")})`;
    for (let i = 0; i < n; i += 4) { ctx.globalAlpha = buf[i + 3]; const r = buf[i + 2]; ctx.fillRect(buf[i] - r, buf[i + 1] - r, r * 2, r * 2); }
    ctx.globalAlpha = 1;
  }
}

/** Start: dots condense out of a faint scattered field. */
export function start() {
  ink = [...state.inkTo];
  if (!lichen()) for (let i = 0; i < 2500; i++) { const p = spawn(rand(0, W), rand(0, H)); p.a = 0; p.ta = .15; P.push(p); }   // lichen grows from nothing
  requestAnimationFrame(frame);
}
