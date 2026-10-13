// Tuning panel (only loaded with ?tune). Changes apply live and are kept in this browser.
// "Copy settings" gives the JSON to paste into content/settings.json to publish them.
import "./panel.css";
import { $, state, S, DEFAULTS, save, forgetTuning, applyColors, colorsFor, onColors } from "./state";
import { PROJECTS } from "./content";
import { setOnStat, showDots, realNow } from "./dots";
import { replay, resample, relayout } from "./main";

const HTML = `
<details id="panel">
  <summary title="Drag to move · click to fold">Settings</summary>
  <div class="pbody">
    <h4 id="colfor">Colors</h4>
    <div class="colors">
      <label class="swatch"><input id="bgc" type="color"><span>Background</span></label>
      <label class="swatch"><input id="inkc" type="color"><span>Text &amp; dots</span></label>
    </div>
    <div class="seg">
      <button class="btn" id="coldef" type="button">Make default</button>
      <button class="btn" id="coluse" type="button">Use default</button>
    </div>
    <div class="stat" id="colnote"></div>
    <h4>Layout <span style="font-weight:400">· % of width</span></h4>
    <div class="seg" id="ltab">
      <button data-v="desk" type="button">Desktop</button>
      <button data-v="phone" type="button">Phone</button>
    </div>
    <div id="lay-desk" class="lay">
      <div class="lrow"><span>Gaps</span><input id="l-gap" type="range" min="0.5" max="8" step="0.1"><output></output></div>
      <div class="lrow"><span>Text</span><input id="l-t" type="range" min="15" max="60" step="0.1"><output></output></div>
      <div class="lrow"><span>Pictures</span><input id="l-p" type="range" min="25" max="75" step="0.1"><output></output></div>
      <div class="lrow"><span>Film</span><input id="l-f" type="range" min="3" max="20" step="0.1"><output></output></div>
    </div>
    <div id="lay-phone" class="lay" hidden>
      <div class="lrow"><span>Gaps</span><input id="p-gap" type="range" min="1" max="10" step="0.1"><output></output></div>
      <div class="lrow"><span>Main</span><input id="p-m" type="range" min="60" max="94" step="0.1"><output></output></div>
      <div class="lrow"><span>Film</span><input id="p-f" type="range" min="6" max="40" step="0.1"><output></output></div>
      <div class="stat" id="pnote"></div>
    </div>
    <button class="btn" id="lreset" type="button">Reset layout</button>
    <h4>Dots</h4>
    <label>Dot shape
      <div class="seg" id="shape">
        <button data-v="round" type="button">Round</button>
        <button data-v="square" type="button">Square</button>
      </div>
    </label>
    <label>Dot size <input id="dotsize" type="range" min="0.3" max="1.6" step="0.05"></label>
    <label>Fill <input id="fill" type="range" min="0.25" max="0.7" step="0.01"></label>
    <label>Buzz <input id="buzz" type="range" min="0" max="3" step="0.05"></label>
    <label class="row2"><input id="real" type="checkbox"> Body text turns into real type</label>
    <label class="row2"><input id="reveal" type="checkbox"> Show real text underneath</label>
    <button class="btn" id="replay" type="button">Replay transition</button>
    <h4>Publish</h4>
    <button class="btn" id="copy" type="button">Copy settings</button>
    <div class="stat" id="copynote">Paste into content/settings.json and commit to make them live.</div>
    <button class="btn" id="discard" type="button">Discard my changes</button>
    <div class="stat" id="stat"></div>
  </div>
</details>`;

export function mount() {
  document.body.insertAdjacentHTML("beforeend", HTML);
  const inp = (id: string) => $<HTMLInputElement>(id);
  const pageName = (r: string) => r === "/" ? "Work" : r === "/about/" ? "About" : PROJECTS.find(p => `/work/${p.slug}/` === r)?.title || r;
  setOnStat(n => { $("stat").textContent = `${n.toLocaleString()} dots`; });

  // Colors: every page (Work, About, each project) can have its own pair; pages without one use the default.
  const showColors = () => {
    const r = state.current ?? "/", c = colorsFor(r);
    inp("bgc").value = c.bg; inp("inkc").value = c.ink;
    $("colfor").textContent = `Colors · ${pageName(r)}`;
    $("colnote").textContent = S.colors.pages[r] ? "This page has its own colors." : "This page uses the default colors.";
  };
  onColors.push(showColors); showColors();
  const setColor = (prop: "bg" | "ink", v: string) => { const r = state.current ?? "/"; S.colors.pages[r] = { ...colorsFor(r), [prop]: v }; save(); applyColors(); };
  inp("bgc").addEventListener("input", e => setColor("bg", (e.target as HTMLInputElement).value));
  inp("inkc").addEventListener("input", e => setColor("ink", (e.target as HTMLInputElement).value));
  $("coldef").addEventListener("click", () => { const r = state.current ?? "/"; S.colors.default = { ...colorsFor(r) }; delete S.colors.pages[r]; save(); applyColors(); });
  $("coluse").addEventListener("click", () => { delete S.colors.pages[state.current ?? "/"]; save(); applyColors(); });

  // Layout: changing one share rescales the others (keeping their proportion) so they always fill the width.
  const showLayout = () => {
    for (const k in S.layout) { const i = inp("l-" + k); i.value = String((S.layout as any)[k]); i.nextElementSibling!.textContent = (+(S.layout as any)[k]).toFixed(1); }
    for (const k in S.layoutPhone) { const i = inp("p-" + k); i.value = String((S.layoutPhone as any)[k]); i.nextElementSibling!.textContent = (+(S.layoutPhone as any)[k]).toFixed(1); }
    $("pnote").textContent = state.phone ? "" : "Applies below 760 px wide: narrow the window to see it.";
  };
  let lt: number | undefined;
  const changed = () => { save(); showLayout(); relayout(); clearTimeout(lt); lt = window.setTimeout(resample, 150); };
  inp("l-gap").addEventListener("input", e => { S.layout.gap = +(e.target as HTMLInputElement).value; changed(); });
  inp("p-gap").addEventListener("input", e => { S.layoutPhone.gap = +(e.target as HTMLInputElement).value; changed(); });
  const shares = (obj: () => Record<string, number>, keys: string[], prefix: string) => {
    for (const k of keys) inp(prefix + k).addEventListener("input", e => {
      const v = +(e.target as HTMLInputElement).value, others = keys.filter(x => x !== k), l = obj();
      const rest = others.reduce((a, x) => a + l[x], 0) || 1;
      for (const x of others) l[x] = (100 - v) * l[x] / rest;
      l[k] = v;
      changed();
    });
  };
  shares(() => S.layout as any, ["t", "p", "f"], "l-");
  shares(() => S.layoutPhone as any, ["m", "f"], "p-");
  const showTab = (v: string) => {
    $("lay-desk").hidden = v !== "desk"; $("lay-phone").hidden = v !== "phone";
    $("ltab").querySelectorAll<HTMLElement>("button").forEach(b => b.classList.toggle("on", b.dataset.v === v));
  };
  $("ltab").addEventListener("click", e => { const b = (e.target as Element).closest<HTMLElement>("button"); if (b) showTab(b.dataset.v!); });
  state.mq.addEventListener("change", () => { showTab(state.phone ? "phone" : "desk"); showLayout(); });
  showTab(state.phone ? "phone" : "desk"); showLayout();
  $("lreset").addEventListener("click", () => {
    if ($("lay-phone").hidden) S.layout = { ...DEFAULTS.layout }; else S.layoutPhone = { ...DEFAULTS.layoutPhone };
    changed();
  });

  // Dots
  const D = S.dots;
  inp("dotsize").value = String(D.dotSize); inp("fill").value = String(D.fill); inp("buzz").value = String(D.buzz); inp("real").checked = D.real;
  $("shape").querySelectorAll<HTMLElement>("button").forEach(x => x.classList.toggle("on", x.dataset.v === D.shape));
  $("shape").addEventListener("click", e => {
    const b = (e.target as Element).closest<HTMLElement>("button"); if (!b) return;
    D.shape = b.dataset.v!; save();
    b.parentElement!.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b));
  });
  let st2: number | undefined;
  inp("dotsize").addEventListener("input", e => { D.dotSize = +(e.target as HTMLInputElement).value; save(); clearTimeout(st2); st2 = window.setTimeout(resample, 120); });
  inp("fill").addEventListener("input", e => { D.fill = +(e.target as HTMLInputElement).value; save(); });
  inp("buzz").addEventListener("input", e => { D.buzz = +(e.target as HTMLInputElement).value; save(); });
  inp("real").addEventListener("change", e => {
    D.real = (e.target as HTMLInputElement).checked; save();
    showDots(new Set());
    if (D.real) realNow(); else resample();
  });
  inp("reveal").addEventListener("change", e => document.body.classList.toggle("reveal", (e.target as HTMLInputElement).checked));
  $("replay").addEventListener("click", replay);

  // Publish
  $("copy").addEventListener("click", async () => {
    const { panelPos, ...published } = S;
    const json = JSON.stringify(published, (_, v) => typeof v === "number" ? Math.round(v * 100) / 100 : v, 2) + "\n";
    try { await navigator.clipboard.writeText(json); $("copynote").textContent = "Copied. Paste into content/settings.json and commit to make it live."; }
    catch { console.log(json); $("copynote").textContent = "Couldn't copy: the settings are in the browser console."; }
  });
  $("discard").addEventListener("click", () => { if (confirm("Discard your tuning and go back to the published settings?")) { forgetTuning(); location.reload(); } });

  // The panel floats: drag it by its title bar; its position is remembered.
  const panel = $("panel"), handle = panel.querySelector("summary")!;
  const place = (l: number, t: number) => {
    panel.style.left = Math.max(0, Math.min(innerWidth - panel.offsetWidth, l)) + "px";
    panel.style.top = Math.max(0, Math.min(innerHeight - 36, t)) + "px";
    panel.style.right = panel.style.bottom = "auto";
  };
  if (S.panelPos && !state.phone) place(S.panelPos.l, S.panelPos.t);   // on the phone it starts at the bottom
  let pd: { x: number; y: number; l: number; t: number } | null = null, moved = false;
  handle.addEventListener("pointerdown", e => { pd = { x: e.clientX, y: e.clientY, l: panel.offsetLeft, t: panel.offsetTop }; moved = false; e.preventDefault(); });
  addEventListener("pointermove", e => {
    if (!pd) return;
    const dx = e.clientX - pd.x, dy = e.clientY - pd.y;
    if (!moved && Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    if (moved) place(pd.l + dx, pd.t + dy);
  });
  addEventListener("pointerup", () => { if (pd && moved) { S.panelPos = { l: panel.offsetLeft, t: panel.offsetTop }; save(); } pd = null; });
  handle.addEventListener("click", e => { if (moved) { e.preventDefault(); moved = false; } });
}
