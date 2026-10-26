// Tuning panel (only loaded with ?tune). Changes apply live and are kept in this browser until published.
// "Publish" saves them to content/settings.json on GitHub (the site then rebuilds itself, about a minute);
// "Copy settings" gives the same JSON to paste by hand.
import "./panel.css";
import { $, state, S, DEFAULTS, FONTS, ORDERS, save, forgetTuning, applyColors, colorsFor, onColors, toFile } from "./state";
import { PROJECTS } from "./content";
import { setOnStat, showDots, realNow } from "./dots";
import { replay, resample, relayout } from "./main";

const HTML = `
<details id="panel">
  <summary title="Drag to move · click to fold">Settings</summary>
  <div class="pbody">
    <details class="sec" name="adp-sec" open><summary id="colfor">Colors</summary><div class="sbody">
    <div class="colors">
      <label class="swatch"><input id="bgc" type="color"><span>Background</span></label>
      <label class="swatch"><input id="inkc" type="color"><span>Text &amp; dots</span></label>
    </div>
    <div class="seg">
      <button class="btn" id="coldef" type="button">Make default</button>
      <button class="btn" id="coluse" type="button">Use default</button>
    </div>
    <div class="stat" id="colnote"></div>
    </div></details>
    <details class="sec" name="adp-sec"><summary>Layout <span class="sub">· % of width</span></summary><div class="sbody">
    <div class="seg" id="ltab">
      <button data-v="desk" type="button">Desktop</button>
      <button data-v="phone" type="button">Phone</button>
    </div>
    <div id="lay-desk" class="lay">
      <div class="lrow"><span>Gaps</span><input id="l-gap" type="range" min="0.5" max="8" step="0.1"><output></output></div>
      <div class="lrow"><span>Text</span><input id="l-t" type="range" min="15" max="60" step="0.1"><output></output></div>
      <div class="lrow"><span>Pictures</span><input id="l-p" type="range" min="25" max="75" step="0.1"><output></output></div>
      <div class="lrow"><span>Film</span><input id="l-f" type="range" min="3" max="20" step="0.1"><output></output></div>
      <div class="lrow"><span>Header</span><input id="l-hh" type="range" min="36" max="140" step="1"><output></output></div>
      <span class="lab">Column order</span>
      <select id="l-order"></select>
    </div>
    <div id="lay-phone" class="lay" hidden>
      <div class="lrow"><span>Gaps</span><input id="p-gap" type="range" min="1" max="10" step="0.1"><output></output></div>
      <div class="lrow"><span>Main</span><input id="p-m" type="range" min="60" max="94" step="0.1"><output></output></div>
      <div class="lrow"><span>Film</span><input id="p-f" type="range" min="6" max="40" step="0.1"><output></output></div>
      <div class="lrow"><span>Header</span><input id="p-hh" type="range" min="30" max="100" step="1"><output></output></div>
      <div class="stat" id="pnote"></div>
    </div>
    <button class="btn" id="lreset" type="button">Reset layout</button>
    </div></details>
    <details class="sec" name="adp-sec"><summary>Grid &amp; font sizes</summary><div class="sbody">
    <span class="lab">Grid</span>
    <div class="seg seg3" id="grid">
      <button data-v="closed" type="button">Closed</button>
      <button data-v="open" type="button">Open</button>
      <button data-v="none" type="button">None</button>
    </div>
    <div class="seg" id="ftab">
      <button data-v="desk" type="button">Desktop</button>
      <button data-v="phone" type="button">Phone</button>
    </div>
    <span class="lab">Font</span>
    <select id="font"></select>
    <span class="lab">Font sizes</span>
    <div class="lrow"><span>Name</span><input id="fs-name" type="range" min="0.5" max="2" step="0.02"><output></output></div>
    <div class="lrow"><span>Titles</span><input id="fs-titles" type="range" min="0.5" max="1.6" step="0.02"><output></output></div>
    <div class="lrow"><span>Lists</span><input id="fs-lists" type="range" min="0.6" max="1.8" step="0.02"><output></output></div>
    <div class="lrow"><span>Text</span><input id="fs-text" type="range" min="0.7" max="1.6" step="0.02"><output></output></div>
    <div class="lrow"><span>About</span><input id="fs-about" type="range" min="0.5" max="1.8" step="0.02"><output></output></div>
    <button class="btn" id="fsreset" type="button">Reset sizes</button>
    </div></details>
    <details class="sec" name="adp-sec"><summary>Dots</summary><div class="sbody">
    <span class="lab">Animation</span>
    <select id="anim">
      <option value="particles">Particles (travel)</option>
      <option value="crust">Lichen — crust</option>
      <option value="leafy">Lichen — leafy</option>
      <option value="rosette">Lichen — rosette</option>
    </select>
    <div id="lich" class="lay">
      <div class="lrow"><span>Dot size</span><input id="d-lichenDot" type="range" min="0.6" max="8" step="0.1"><output></output></div>
      <div class="lrow"><span>Density</span><input id="d-lichenDensity" type="range" min="0.3" max="1.8" step="0.05"><output></output></div>
      <div class="lrow"><span>Overflow</span><input id="d-overflow" type="range" min="0" max="40" step="1"><output></output></div>
      <div class="lrow"><span>Branches</span><input id="d-branches" type="range" min="3" max="20" step="1"><output></output></div>
    </div>
    <div class="lrow"><span>Real below</span><input id="d-realBelow" type="range" min="0" max="24" step="0.5"><output></output></div>
    <div class="stat">Text smaller than this turns into real type once formed (titles too). 0 = never.</div>
    <label>Dot shape
      <div class="seg" id="shape">
        <button data-v="round" type="button">Round</button>
        <button data-v="square" type="button">Square</button>
      </div>
    </label>
    <div id="pdots" class="lay">
    <label>Dot size <input id="dotsize" type="range" min="0.3" max="1.6" step="0.05"></label>
    <label>Fill <input id="fill" type="range" min="0.25" max="0.7" step="0.01"></label>
    </div>
    <label>Buzz <input id="buzz" type="range" min="0" max="3" step="0.05"></label>
    <label class="row2"><input id="allreal" type="checkbox"> Everything turns into real type</label>
    <label class="row2"><input id="real" type="checkbox"> Body text turns into real type</label>
    <label class="row2"><input id="reveal" type="checkbox"> Show real text underneath</label>
    <button class="btn" id="replay" type="button">Replay transition</button>
    </div></details>
    <details class="sec" name="adp-sec"><summary>Publish</summary><div class="sbody">
    <button class="btn" id="publish" type="button">Publish for everyone</button>
    <div class="stat" id="copynote">Saves these settings to the site. Live about a minute later.</div>
    <div class="seg">
      <button class="btn" id="copy" type="button">Copy settings</button>
      <button class="btn" id="discard" type="button">Discard changes</button>
    </div>
    <button class="btn" id="signout" type="button" hidden>Forget my GitHub token</button>
    </div></details>
    <div class="stat" id="stat"></div>
  </div>
</details>`;

export function mount() {
  document.body.insertAdjacentHTML("beforeend", HTML);
  const inp = (id: string) => $<HTMLInputElement>(id);
  const pageName = (r: string) => r === "/" ? "Work" : r === "/about/" ? "About" : r === "/personal/" ? "Personal" : PROJECTS.find(p => `/work/${p.slug}/` === r)?.title || r;
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
    for (const k in S.layout) { if (k === "order") { ($("l-order") as HTMLSelectElement).value = S.layout.order; continue; } const i = inp("l-" + k); i.value = String((S.layout as any)[k]); i.nextElementSibling!.textContent = k === "hh" ? (S.layout as any)[k] + "px" : (+(S.layout as any)[k]).toFixed(1); }
    for (const k in S.layoutPhone) { const i = inp("p-" + k); i.value = String((S.layoutPhone as any)[k]); i.nextElementSibling!.textContent = k === "hh" ? (S.layoutPhone as any)[k] + "px" : (+(S.layoutPhone as any)[k]).toFixed(1); }
    $("pnote").textContent = state.phone ? "" : "Applies below 760 px wide: narrow the window to see it.";
  };
  let lt: number | undefined;
  const changed = () => { save(); showLayout(); relayout(); clearTimeout(lt); lt = window.setTimeout(resample, 150); };
  inp("l-gap").addEventListener("input", e => { S.layout.gap = +(e.target as HTMLInputElement).value; changed(); });
  inp("p-gap").addEventListener("input", e => { S.layoutPhone.gap = +(e.target as HTMLInputElement).value; changed(); });
  const NAMES: Record<string, string> = { t: "Text", p: "Pictures", f: "Film" };
  const osel = $("l-order") as HTMLSelectElement;
  osel.innerHTML = ORDERS.map(o => `<option value="${o}">${[...o].map(c => NAMES[c]).join(" · ")}</option>`).join("");
  osel.value = S.layout.order;
  osel.addEventListener("change", () => { S.layout.order = osel.value; changed(); });
  inp("l-hh").addEventListener("input", e => { S.layout.hh = +(e.target as HTMLInputElement).value; changed(); });
  inp("p-hh").addEventListener("input", e => { S.layoutPhone.hh = +(e.target as HTMLInputElement).value; changed(); });
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

  // Grid and font sizes
  const showGrid = () => $("grid").querySelectorAll<HTMLElement>("button").forEach(b => b.classList.toggle("on", b.dataset.v === S.grid));
  showGrid();
  $("grid").addEventListener("click", e => {
    const b = (e.target as Element).closest<HTMLElement>("button"); if (!b) return;
    S.grid = b.dataset.v!; showGrid(); changed();
  });
  const fsel = $("font") as HTMLSelectElement;
  fsel.innerHTML = FONTS.map(f => `<option value="${f.v}">${f.label}</option>`).join("");
  // Font and sizes are set separately for desktop and phone (the tab shows which one you are editing).
  let ftab = state.phone ? "phone" : "desk";
  const isPh = () => ftab === "phone";
  const type = () => isPh() ? S.typePhone : S.type;
  const sizes = ["name", "titles", "lists", "text", "about"] as const;
  const showSizes = () => sizes.forEach(k => { const i = inp("fs-" + k); i.value = String(type()[k]); i.nextElementSibling!.textContent = Math.round(type()[k] * 100) + "%"; });
  const showFont = () => {
    $("ftab").querySelectorAll<HTMLElement>("button").forEach(b => b.classList.toggle("on", b.dataset.v === ftab));
    fsel.value = isPh() ? S.fontPhone : S.font; showSizes();
  };
  showFont();
  $("ftab").addEventListener("click", e => { const b = (e.target as Element).closest<HTMLElement>("button"); if (b) { ftab = b.dataset.v!; showFont(); } });
  state.mq.addEventListener("change", () => { ftab = state.phone ? "phone" : "desk"; showFont(); });
  fsel.addEventListener("change", () => { if (isPh()) S.fontPhone = fsel.value; else S.font = fsel.value; changed(); });
  for (const k of sizes) inp("fs-" + k).addEventListener("input", e => { type()[k] = +(e.target as HTMLInputElement).value; showSizes(); changed(); });
  $("fsreset").addEventListener("click", () => { if (isPh()) S.typePhone = { ...DEFAULTS.typePhone }; else S.type = { ...DEFAULTS.type }; showSizes(); changed(); });

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
  inp("fill").addEventListener("input", e => { D.fill = +(e.target as HTMLInputElement).value; save(); if (D.anim !== "particles") { clearTimeout(st2); st2 = window.setTimeout(resample, 120); } });
  // Animation, lichen options and the small-text rule
  const asel = $("anim") as HTMLSelectElement;
  const LK = ["lichenDot", "lichenDensity", "overflow", "branches", "realBelow"] as const;
  const showAnim = () => { asel.value = D.anim; $("lich").hidden = D.anim === "particles";
    for (const k of LK) { const i = inp("d-" + k); i.value = String(D[k]); i.nextElementSibling!.textContent = k === "overflow" ? D[k] + "%" : k === "realBelow" ? (D[k] ? D[k] + "px" : "off") : k === "lichenDot" ? D[k] + "px" : String(D[k]); }
    $("pdots").hidden = D.anim !== "particles"; };
  showAnim();
  asel.addEventListener("change", () => { D.anim = asel.value; save(); showAnim(); replay(); });
  for (const k of LK) inp("d-" + k).addEventListener("input", e => {
    D[k] = +(e.target as HTMLInputElement).value; save(); showAnim(); clearTimeout(st2); st2 = window.setTimeout(k === "realBelow" ? () => { showDots(new Set()); resample(); } : replay, 250);
  });
  inp("buzz").addEventListener("input", e => { D.buzz = +(e.target as HTMLInputElement).value; save(); });
  inp("real").addEventListener("change", e => {
    D.real = (e.target as HTMLInputElement).checked; save();
    showDots(new Set());
    if (D.real) realNow(); else resample();
  });
  inp("allreal").checked = D.allReal;
  inp("allreal").addEventListener("change", e => { D.allReal = (e.target as HTMLInputElement).checked; save(); showDots(new Set()); replay(); });
  inp("reveal").addEventListener("change", e => document.body.classList.toggle("reveal", (e.target as HTMLInputElement).checked));
  $("replay").addEventListener("click", replay);

  // Publish
  const settingsJson = () => JSON.stringify(toFile(S), (_, v) => typeof v === "number" ? Math.round(v * 100) / 100 : v, 2) + "\n";
  // Publishing writes content/settings.json through GitHub's API with your token (fine-grained, this repository
  // only, Contents: read and write — the same kind the admin uses). The token is kept in this browser only.
  const REPO = "adriendenispasquier-del/adriendenispasquier.com", BRANCH = "main", FILE = "content/settings.json";
  const TOKEN_KEY = "adp-github-token";
  const token = {
    get: () => { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } },
    set: (t: string | null) => { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ } },
  };
  const showSignout = () => { $("signout").hidden = !token.get(); };
  showSignout();
  $("signout").addEventListener("click", () => { token.set(null); showSignout(); $("copynote").textContent = "Token forgotten in this browser."; });
  $("publish").addEventListener("click", async () => {
    const note = $("copynote");
    let t = token.get();
    if (!t) {
      t = prompt("Paste your GitHub token (fine-grained, this repository only, Contents: read and write).\nIt is kept only in this browser.")?.trim() || null;
      if (!t) return;
    }
    const api = `https://api.github.com/repos/${REPO}/contents/${FILE}`;
    const headers = { Authorization: `Bearer ${t}`, Accept: "application/vnd.github+json" };
    note.textContent = "Publishing…";
    try {
      const cur = await fetch(`${api}?ref=${BRANCH}`, { headers });
      if (cur.status === 401 || cur.status === 403 || cur.status === 404) throw new Error("auth");
      if (!cur.ok) throw new Error(String(cur.status));
      const { sha } = await cur.json();
      const bytes = new TextEncoder().encode(settingsJson());
      const content = btoa(Array.from(bytes, b => String.fromCharCode(b)).join(""));
      const res = await fetch(api, { method: "PUT", headers, body: JSON.stringify({ message: "Update the look from the tuning panel", content, sha, branch: BRANCH }) });
      if (res.status === 401 || res.status === 403) throw new Error("auth");
      if (!res.ok) throw new Error(String(res.status));
      token.set(t); showSignout();
      note.textContent = "Published. The site rebuilds itself: live in about a minute.";
    } catch (e) {
      if ((e as Error).message === "auth") { token.set(null); showSignout(); note.textContent = "GitHub refused the token. It needs access to this repository with Contents: read and write."; }
      else note.textContent = "Couldn't publish (network or GitHub error). Nothing was changed.";
    }
  });
  $("copy").addEventListener("click", async () => {
    const json = settingsJson();
    try { await navigator.clipboard.writeText(json); $("copynote").textContent = "Copied. Paste into content/settings.json, or set the same values in /admin → Look."; }
    catch { console.log(json); $("copynote").textContent = "Couldn't copy: the settings are in the browser console."; }
  });
  $("discard").addEventListener("click", () => { if (confirm("Discard your tuning and go back to the published settings?")) { forgetTuning(); location.reload(); } });

  // Sections: one open at a time, so the panel never grows taller than the screen.
  const secs = [...document.querySelectorAll<HTMLDetailsElement>("#panel details.sec")];
  secs.forEach(d => d.addEventListener("toggle", () => { if (d.open) secs.forEach(o => { if (o !== d) o.open = false; }); }));

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
