import{o as W,$ as s,S as n,c as C,s as d,a as z,b as u,D as P,r as T,d as Y,e as K,f as X,g as _,h as Q,t as V,P as Z,i as tt}from"./index-Dow7kKdo.js";const et=`
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
</details>`;function nt(){document.body.insertAdjacentHTML("beforeend",et);const a=t=>s(t),I=t=>t==="/"?"Work":t==="/about/"?"About":t==="/personal/"?"Personal":Z.find(e=>`/work/${e.slug}/`===t)?.title||t;tt(t=>{s("stat").textContent=`${t.toLocaleString()} dots`});const A=()=>{const t=u.current??"/",e=C(t);a("bgc").value=e.bg,a("inkc").value=e.ink,s("colfor").textContent=`Colors · ${I(t)}`,s("colnote").textContent=n.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};W.push(A),A();const D=(t,e)=>{const o=u.current??"/";n.colors.pages[o]={...C(o),[t]:e},d(),z()};a("bgc").addEventListener("input",t=>D("bg",t.target.value)),a("inkc").addEventListener("input",t=>D("ink",t.target.value)),s("coldef").addEventListener("click",()=>{const t=u.current??"/";n.colors.default={...C(t)},delete n.colors.pages[t],d(),z()}),s("coluse").addEventListener("click",()=>{delete n.colors.pages[u.current??"/"],d(),z()});const E=()=>{for(const t in n.layout){const e=a("l-"+t);e.value=String(n.layout[t]),e.nextElementSibling.textContent=(+n.layout[t]).toFixed(1)}for(const t in n.layoutPhone){const e=a("p-"+t);e.value=String(n.layoutPhone[t]),e.nextElementSibling.textContent=(+n.layoutPhone[t]).toFixed(1)}s("pnote").textContent=u.phone?"":"Applies below 760 px wide: narrow the window to see it."};let M;const b=()=>{d(),E(),Q(),clearTimeout(M),M=window.setTimeout(T,150)};a("l-gap").addEventListener("input",t=>{n.layout.gap=+t.target.value,b()}),a("p-gap").addEventListener("input",t=>{n.layoutPhone.gap=+t.target.value,b()});const q=(t,e,o)=>{for(const g of e)a(o+g).addEventListener("input",r=>{const w=+r.target.value,x=e.filter(p=>p!==g),v=t(),h=x.reduce((p,U)=>p+v[U],0)||1;for(const p of x)v[p]=(100-w)*v[p]/h;v[g]=w,b()})};q(()=>n.layout,["t","p","f"],"l-"),q(()=>n.layoutPhone,["m","f"],"p-");const k=t=>{s("lay-desk").hidden=t!=="desk",s("lay-phone").hidden=t!=="phone",s("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};s("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&k(e.dataset.v)}),u.mq.addEventListener("change",()=>{k(u.phone?"phone":"desk"),E()}),k(u.phone?"phone":"desk"),E(),s("lreset").addEventListener("click",()=>{s("lay-phone").hidden?n.layout={...P.layout}:n.layoutPhone={...P.layoutPhone},b()});const F=()=>s("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===n.grid));F(),s("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(n.grid=e.dataset.v,F(),b())});const G=["name","titles","lists","text"],L=()=>G.forEach(t=>{const e=a("fs-"+t);e.value=String(n.type[t]),e.nextElementSibling.textContent=Math.round(n.type[t]*100)+"%"});L();for(const t of G)a("fs-"+t).addEventListener("input",e=>{n.type[t]=+e.target.value,L(),b()});s("fsreset").addEventListener("click",()=>{n.type={...P.type},L(),b()});const i=n.dots;a("dotsize").value=String(i.dotSize),a("fill").value=String(i.fill),a("buzz").value=String(i.buzz),a("real").checked=i.real,s("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===i.shape)),s("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(i.shape=e.dataset.v,d(),e.parentElement.querySelectorAll("button").forEach(o=>o.classList.toggle("on",o===e)))});let N;a("dotsize").addEventListener("input",t=>{i.dotSize=+t.target.value,d(),clearTimeout(N),N=window.setTimeout(T,120)}),a("fill").addEventListener("input",t=>{i.fill=+t.target.value,d()}),a("buzz").addEventListener("input",t=>{i.buzz=+t.target.value,d()}),a("real").addEventListener("change",t=>{i.real=t.target.checked,d(),Y(new Set),i.real?K():T()}),a("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),s("replay").addEventListener("click",X);const $=()=>JSON.stringify(V(n),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,B="adriendenispasquier-del/adriendenispasquier.com",H="main",J="content/settings.json",S="adp-github-token",m={get:()=>{try{return localStorage.getItem(S)}catch{return null}},set:t=>{try{t?localStorage.setItem(S,t):localStorage.removeItem(S)}catch{}}},f=()=>{s("signout").hidden=!m.get()};f(),s("signout").addEventListener("click",()=>{m.set(null),f(),s("copynote").textContent="Token forgotten in this browser."}),s("publish").addEventListener("click",async()=>{const t=s("copynote");let e=m.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const o=`https://api.github.com/repos/${B}/contents/${J}`,g={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const r=await fetch(`${o}?ref=${H}`,{headers:g});if(r.status===401||r.status===403||r.status===404)throw new Error("auth");if(!r.ok)throw new Error(String(r.status));const{sha:w}=await r.json(),x=new TextEncoder().encode($()),v=btoa(Array.from(x,p=>String.fromCharCode(p)).join("")),h=await fetch(o,{method:"PUT",headers:g,body:JSON.stringify({message:"Update the look from the tuning panel",content:v,sha:w,branch:H})});if(h.status===401||h.status===403)throw new Error("auth");if(!h.ok)throw new Error(String(h.status));m.set(e),f(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(r){r.message==="auth"?(m.set(null),f(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),s("copy").addEventListener("click",async()=>{const t=$();try{await navigator.clipboard.writeText(t),s("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),s("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),s("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(_(),location.reload())});const j=[...document.querySelectorAll("#panel details.sec")];j.forEach(t=>t.addEventListener("toggle",()=>{t.open&&j.forEach(e=>{e!==t&&(e.open=!1)})}));const l=s("panel"),O=l.querySelector("summary"),R=(t,e)=>{l.style.left=Math.max(0,Math.min(innerWidth-l.offsetWidth,t))+"px",l.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",l.style.right=l.style.bottom="auto"};n.panelPos&&!u.phone&&R(n.panelPos.l,n.panelPos.t);let c=null,y=!1;O.addEventListener("pointerdown",t=>{c={x:t.clientX,y:t.clientY,l:l.offsetLeft,t:l.offsetTop},y=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!c)return;const e=t.clientX-c.x,o=t.clientY-c.y;!y&&Math.abs(e)+Math.abs(o)>4&&(y=!0),y&&R(c.l+e,c.t+o)}),addEventListener("pointerup",()=>{c&&y&&(n.panelPos={l:l.offsetLeft,t:l.offsetTop},d()),c=null}),O.addEventListener("click",t=>{y&&(t.preventDefault(),y=!1)})}export{nt as mount};
