import{o as U,$ as n,S as s,c as C,s as d,a as T,b as u,D as z,r as P,d as W,e as Y,f as K,g as X,h as _,t as Q,P as V,i as Z}from"./index-UaVo92R1.js";const tt=`
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
    <h4>Grid</h4>
    <div class="seg seg3" id="grid">
      <button data-v="closed" type="button">Closed</button>
      <button data-v="open" type="button">Open</button>
      <button data-v="none" type="button">None</button>
    </div>
    <h4>Font sizes</h4>
    <div class="lrow"><span>Name</span><input id="fs-name" type="range" min="0.5" max="2" step="0.02"><output></output></div>
    <div class="lrow"><span>Titles</span><input id="fs-titles" type="range" min="0.5" max="1.6" step="0.02"><output></output></div>
    <div class="lrow"><span>Lists</span><input id="fs-lists" type="range" min="0.6" max="1.8" step="0.02"><output></output></div>
    <div class="lrow"><span>Text</span><input id="fs-text" type="range" min="0.7" max="1.6" step="0.02"><output></output></div>
    <button class="btn" id="fsreset" type="button">Reset sizes</button>
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
    <button class="btn" id="publish" type="button">Publish for everyone</button>
    <div class="stat" id="copynote">Saves these settings to the site. Live about a minute later.</div>
    <div class="seg">
      <button class="btn" id="copy" type="button">Copy settings</button>
      <button class="btn" id="discard" type="button">Discard changes</button>
    </div>
    <button class="btn" id="signout" type="button" hidden>Forget my GitHub token</button>
    <div class="stat" id="stat"></div>
  </div>
</details>`;function nt(){document.body.insertAdjacentHTML("beforeend",tt);const o=t=>n(t),R=t=>t==="/"?"Work":t==="/about/"?"About":V.find(e=>`/work/${e.slug}/`===t)?.title||t;Z(t=>{n("stat").textContent=`${t.toLocaleString()} dots`});const D=()=>{const t=u.current??"/",e=C(t);o("bgc").value=e.bg,o("inkc").value=e.ink,n("colfor").textContent=`Colors · ${R(t)}`,n("colnote").textContent=s.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};U.push(D),D();const A=(t,e)=>{const a=u.current??"/";s.colors.pages[a]={...C(a),[t]:e},d(),T()};o("bgc").addEventListener("input",t=>A("bg",t.target.value)),o("inkc").addEventListener("input",t=>A("ink",t.target.value)),n("coldef").addEventListener("click",()=>{const t=u.current??"/";s.colors.default={...C(t)},delete s.colors.pages[t],d(),T()}),n("coluse").addEventListener("click",()=>{delete s.colors.pages[u.current??"/"],d(),T()});const k=()=>{for(const t in s.layout){const e=o("l-"+t);e.value=String(s.layout[t]),e.nextElementSibling.textContent=(+s.layout[t]).toFixed(1)}for(const t in s.layoutPhone){const e=o("p-"+t);e.value=String(s.layoutPhone[t]),e.nextElementSibling.textContent=(+s.layoutPhone[t]).toFixed(1)}n("pnote").textContent=u.phone?"":"Applies below 760 px wide: narrow the window to see it."};let M;const h=()=>{d(),k(),_(),clearTimeout(M),M=window.setTimeout(P,150)};o("l-gap").addEventListener("input",t=>{s.layout.gap=+t.target.value,h()}),o("p-gap").addEventListener("input",t=>{s.layoutPhone.gap=+t.target.value,h()});const F=(t,e,a)=>{for(const g of e)o(a+g).addEventListener("input",r=>{const w=+r.target.value,x=e.filter(c=>c!==g),v=t(),y=x.reduce((c,J)=>c+v[J],0)||1;for(const c of x)v[c]=(100-w)*v[c]/y;v[g]=w,h()})};F(()=>s.layout,["t","p","f"],"l-"),F(()=>s.layoutPhone,["m","f"],"p-");const E=t=>{n("lay-desk").hidden=t!=="desk",n("lay-phone").hidden=t!=="phone",n("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};n("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&E(e.dataset.v)}),u.mq.addEventListener("change",()=>{E(u.phone?"phone":"desk"),k()}),E(u.phone?"phone":"desk"),k(),n("lreset").addEventListener("click",()=>{n("lay-phone").hidden?s.layout={...z.layout}:s.layoutPhone={...z.layoutPhone},h()});const q=()=>n("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===s.grid));q(),n("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(s.grid=e.dataset.v,q(),h())});const N=["name","titles","lists","text"],L=()=>N.forEach(t=>{const e=o("fs-"+t);e.value=String(s.type[t]),e.nextElementSibling.textContent=Math.round(s.type[t]*100)+"%"});L();for(const t of N)o("fs-"+t).addEventListener("input",e=>{s.type[t]=+e.target.value,L(),h()});n("fsreset").addEventListener("click",()=>{s.type={...z.type},L(),h()});const i=s.dots;o("dotsize").value=String(i.dotSize),o("fill").value=String(i.fill),o("buzz").value=String(i.buzz),o("real").checked=i.real,n("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===i.shape)),n("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(i.shape=e.dataset.v,d(),e.parentElement.querySelectorAll("button").forEach(a=>a.classList.toggle("on",a===e)))});let $;o("dotsize").addEventListener("input",t=>{i.dotSize=+t.target.value,d(),clearTimeout($),$=window.setTimeout(P,120)}),o("fill").addEventListener("input",t=>{i.fill=+t.target.value,d()}),o("buzz").addEventListener("input",t=>{i.buzz=+t.target.value,d()}),o("real").addEventListener("change",t=>{i.real=t.target.checked,d(),W(new Set),i.real?Y():P()}),o("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),n("replay").addEventListener("click",K);const G=()=>JSON.stringify(Q(s),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,I="adriendenispasquier-del/adriendenispasquier.com",H="main",B="content/settings.json",S="adp-github-token",f={get:()=>{try{return localStorage.getItem(S)}catch{return null}},set:t=>{try{t?localStorage.setItem(S,t):localStorage.removeItem(S)}catch{}}},m=()=>{n("signout").hidden=!f.get()};m(),n("signout").addEventListener("click",()=>{f.set(null),m(),n("copynote").textContent="Token forgotten in this browser."}),n("publish").addEventListener("click",async()=>{const t=n("copynote");let e=f.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const a=`https://api.github.com/repos/${I}/contents/${B}`,g={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const r=await fetch(`${a}?ref=${H}`,{headers:g});if(r.status===401||r.status===403||r.status===404)throw new Error("auth");if(!r.ok)throw new Error(String(r.status));const{sha:w}=await r.json(),x=new TextEncoder().encode(G()),v=btoa(Array.from(x,c=>String.fromCharCode(c)).join("")),y=await fetch(a,{method:"PUT",headers:g,body:JSON.stringify({message:"Update the look from the tuning panel",content:v,sha:w,branch:H})});if(y.status===401||y.status===403)throw new Error("auth");if(!y.ok)throw new Error(String(y.status));f.set(e),m(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(r){r.message==="auth"?(f.set(null),m(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),n("copy").addEventListener("click",async()=>{const t=G();try{await navigator.clipboard.writeText(t),n("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),n("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),n("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(X(),location.reload())});const l=n("panel"),j=l.querySelector("summary"),O=(t,e)=>{l.style.left=Math.max(0,Math.min(innerWidth-l.offsetWidth,t))+"px",l.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",l.style.right=l.style.bottom="auto"};s.panelPos&&!u.phone&&O(s.panelPos.l,s.panelPos.t);let p=null,b=!1;j.addEventListener("pointerdown",t=>{p={x:t.clientX,y:t.clientY,l:l.offsetLeft,t:l.offsetTop},b=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!p)return;const e=t.clientX-p.x,a=t.clientY-p.y;!b&&Math.abs(e)+Math.abs(a)>4&&(b=!0),b&&O(p.l+e,p.t+a)}),addEventListener("pointerup",()=>{p&&b&&(s.panelPos={l:l.offsetLeft,t:l.offsetTop},d()),p=null}),j.addEventListener("click",t=>{b&&(t.preventDefault(),b=!1)})}export{nt as mount};
