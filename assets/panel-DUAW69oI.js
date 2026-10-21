import{o as Y,$ as n,S as s,c as T,s as d,a as z,b as u,D as P,F as K,r as F,d as X,e as _,f as Q,g as V,h as Z,t as tt,P as et,i as st}from"./index-CnMdIsMy.js";const nt=`
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
    </div>
    <div id="lay-phone" class="lay" hidden>
      <div class="lrow"><span>Gaps</span><input id="p-gap" type="range" min="1" max="10" step="0.1"><output></output></div>
      <div class="lrow"><span>Main</span><input id="p-m" type="range" min="60" max="94" step="0.1"><output></output></div>
      <div class="lrow"><span>Film</span><input id="p-f" type="range" min="6" max="40" step="0.1"><output></output></div>
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
    <span class="lab">Font</span>
    <select id="font"></select>
    <span class="lab">Font sizes</span>
    <div class="lrow"><span>Name</span><input id="fs-name" type="range" min="0.5" max="2" step="0.02"><output></output></div>
    <div class="lrow"><span>Titles</span><input id="fs-titles" type="range" min="0.5" max="1.6" step="0.02"><output></output></div>
    <div class="lrow"><span>Lists</span><input id="fs-lists" type="range" min="0.6" max="1.8" step="0.02"><output></output></div>
    <div class="lrow"><span>Text</span><input id="fs-text" type="range" min="0.7" max="1.6" step="0.02"><output></output></div>
    <button class="btn" id="fsreset" type="button">Reset sizes</button>
    </div></details>
    <details class="sec" name="adp-sec"><summary>Dots</summary><div class="sbody">
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
</details>`;function ot(){document.body.insertAdjacentHTML("beforeend",nt);const a=t=>n(t),B=t=>t==="/"?"Work":t==="/about/"?"About":t==="/personal/"?"Personal":et.find(e=>`/work/${e.slug}/`===t)?.title||t;st(t=>{n("stat").textContent=`${t.toLocaleString()} dots`});const A=()=>{const t=u.current??"/",e=T(t);a("bgc").value=e.bg,a("inkc").value=e.ink,n("colfor").textContent=`Colors · ${B(t)}`,n("colnote").textContent=s.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};Y.push(A),A();const D=(t,e)=>{const o=u.current??"/";s.colors.pages[o]={...T(o),[t]:e},d(),z()};a("bgc").addEventListener("input",t=>D("bg",t.target.value)),a("inkc").addEventListener("input",t=>D("ink",t.target.value)),n("coldef").addEventListener("click",()=>{const t=u.current??"/";s.colors.default={...T(t)},delete s.colors.pages[t],d(),z()}),n("coluse").addEventListener("click",()=>{delete s.colors.pages[u.current??"/"],d(),z()});const k=()=>{for(const t in s.layout){const e=a("l-"+t);e.value=String(s.layout[t]),e.nextElementSibling.textContent=(+s.layout[t]).toFixed(1)}for(const t in s.layoutPhone){const e=a("p-"+t);e.value=String(s.layoutPhone[t]),e.nextElementSibling.textContent=(+s.layoutPhone[t]).toFixed(1)}n("pnote").textContent=u.phone?"":"Applies below 760 px wide: narrow the window to see it."};let M;const c=()=>{d(),k(),Z(),clearTimeout(M),M=window.setTimeout(F,150)};a("l-gap").addEventListener("input",t=>{s.layout.gap=+t.target.value,c()}),a("p-gap").addEventListener("input",t=>{s.layoutPhone.gap=+t.target.value,c()});const q=(t,e,o)=>{for(const g of e)a(o+g).addEventListener("input",r=>{const x=+r.target.value,E=e.filter(b=>b!==g),y=t(),h=E.reduce((b,W)=>b+y[W],0)||1;for(const b of E)y[b]=(100-x)*y[b]/h;y[g]=x,c()})};q(()=>s.layout,["t","p","f"],"l-"),q(()=>s.layoutPhone,["m","f"],"p-");const L=t=>{n("lay-desk").hidden=t!=="desk",n("lay-phone").hidden=t!=="phone",n("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};n("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&L(e.dataset.v)}),u.mq.addEventListener("change",()=>{L(u.phone?"phone":"desk"),k()}),L(u.phone?"phone":"desk"),k(),n("lreset").addEventListener("click",()=>{n("lay-phone").hidden?s.layout={...P.layout}:s.layoutPhone={...P.layoutPhone},c()});const $=()=>n("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===s.grid));$(),n("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(s.grid=e.dataset.v,$(),c())});const f=n("font");f.innerHTML=K.map(t=>`<option value="${t.v}">${t.label}</option>`).join(""),f.value=s.font,f.addEventListener("change",()=>{s.font=f.value,c()});const N=["name","titles","lists","text"],S=()=>N.forEach(t=>{const e=a("fs-"+t);e.value=String(s.type[t]),e.nextElementSibling.textContent=Math.round(s.type[t]*100)+"%"});S();for(const t of N)a("fs-"+t).addEventListener("input",e=>{s.type[t]=+e.target.value,S(),c()});n("fsreset").addEventListener("click",()=>{s.type={...P.type},S(),c()});const i=s.dots;a("dotsize").value=String(i.dotSize),a("fill").value=String(i.fill),a("buzz").value=String(i.buzz),a("real").checked=i.real,n("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===i.shape)),n("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(i.shape=e.dataset.v,d(),e.parentElement.querySelectorAll("button").forEach(o=>o.classList.toggle("on",o===e)))});let G;a("dotsize").addEventListener("input",t=>{i.dotSize=+t.target.value,d(),clearTimeout(G),G=window.setTimeout(F,120)}),a("fill").addEventListener("input",t=>{i.fill=+t.target.value,d()}),a("buzz").addEventListener("input",t=>{i.buzz=+t.target.value,d()}),a("real").addEventListener("change",t=>{i.real=t.target.checked,d(),X(new Set),i.real?_():F()}),a("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),n("replay").addEventListener("click",Q);const H=()=>JSON.stringify(tt(s),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,J="adriendenispasquier-del/adriendenispasquier.com",j="main",U="content/settings.json",C="adp-github-token",m={get:()=>{try{return localStorage.getItem(C)}catch{return null}},set:t=>{try{t?localStorage.setItem(C,t):localStorage.removeItem(C)}catch{}}},w=()=>{n("signout").hidden=!m.get()};w(),n("signout").addEventListener("click",()=>{m.set(null),w(),n("copynote").textContent="Token forgotten in this browser."}),n("publish").addEventListener("click",async()=>{const t=n("copynote");let e=m.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const o=`https://api.github.com/repos/${J}/contents/${U}`,g={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const r=await fetch(`${o}?ref=${j}`,{headers:g});if(r.status===401||r.status===403||r.status===404)throw new Error("auth");if(!r.ok)throw new Error(String(r.status));const{sha:x}=await r.json(),E=new TextEncoder().encode(H()),y=btoa(Array.from(E,b=>String.fromCharCode(b)).join("")),h=await fetch(o,{method:"PUT",headers:g,body:JSON.stringify({message:"Update the look from the tuning panel",content:y,sha:x,branch:j})});if(h.status===401||h.status===403)throw new Error("auth");if(!h.ok)throw new Error(String(h.status));m.set(e),w(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(r){r.message==="auth"?(m.set(null),w(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),n("copy").addEventListener("click",async()=>{const t=H();try{await navigator.clipboard.writeText(t),n("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),n("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),n("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(V(),location.reload())});const O=[...document.querySelectorAll("#panel details.sec")];O.forEach(t=>t.addEventListener("toggle",()=>{t.open&&O.forEach(e=>{e!==t&&(e.open=!1)})}));const l=n("panel"),R=l.querySelector("summary"),I=(t,e)=>{l.style.left=Math.max(0,Math.min(innerWidth-l.offsetWidth,t))+"px",l.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",l.style.right=l.style.bottom="auto"};s.panelPos&&!u.phone&&I(s.panelPos.l,s.panelPos.t);let p=null,v=!1;R.addEventListener("pointerdown",t=>{p={x:t.clientX,y:t.clientY,l:l.offsetLeft,t:l.offsetTop},v=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!p)return;const e=t.clientX-p.x,o=t.clientY-p.y;!v&&Math.abs(e)+Math.abs(o)>4&&(v=!0),v&&I(p.l+e,p.t+o)}),addEventListener("pointerup",()=>{p&&v&&(s.panelPos={l:l.offsetLeft,t:l.offsetTop},d()),p=null}),R.addEventListener("click",t=>{v&&(t.preventDefault(),v=!1)})}export{ot as mount};
