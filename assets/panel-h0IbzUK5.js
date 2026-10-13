import{o as R,$ as n,S as o,c as S,s as d,a as C,b as u,D as j,r as P,d as B,e as J,f as U,g as W,h as Y,t as K,P as X,i as _}from"./index-CbQEXlMk.js";const Q=`
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
    <button class="btn" id="publish" type="button">Publish for everyone</button>
    <div class="stat" id="copynote">Saves these settings to the site. Live about a minute later.</div>
    <div class="seg">
      <button class="btn" id="copy" type="button">Copy settings</button>
      <button class="btn" id="discard" type="button">Discard changes</button>
    </div>
    <button class="btn" id="signout" type="button" hidden>Forget my GitHub token</button>
    <div class="stat" id="stat"></div>
  </div>
</details>`;function Z(){document.body.insertAdjacentHTML("beforeend",Q);const s=t=>n(t),N=t=>t==="/"?"Work":t==="/about/"?"About":X.find(e=>`/work/${e.slug}/`===t)?.title||t;_(t=>{n("stat").textContent=`${t.toLocaleString()} dots`});const T=()=>{const t=u.current??"/",e=S(t);s("bgc").value=e.bg,s("inkc").value=e.ink,n("colfor").textContent=`Colors · ${N(t)}`,n("colnote").textContent=o.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};R.push(T),T();const z=(t,e)=>{const a=u.current??"/";o.colors.pages[a]={...S(a),[t]:e},d(),C()};s("bgc").addEventListener("input",t=>z("bg",t.target.value)),s("inkc").addEventListener("input",t=>z("ink",t.target.value)),n("coldef").addEventListener("click",()=>{const t=u.current??"/";o.colors.default={...S(t)},delete o.colors.pages[t],d(),C()}),n("coluse").addEventListener("click",()=>{delete o.colors.pages[u.current??"/"],d(),C()});const x=()=>{for(const t in o.layout){const e=s("l-"+t);e.value=String(o.layout[t]),e.nextElementSibling.textContent=(+o.layout[t]).toFixed(1)}for(const t in o.layoutPhone){const e=s("p-"+t);e.value=String(o.layoutPhone[t]),e.nextElementSibling.textContent=(+o.layoutPhone[t]).toFixed(1)}n("pnote").textContent=u.phone?"":"Applies below 760 px wide: narrow the window to see it."};let D;const f=()=>{d(),x(),Y(),clearTimeout(D),D=window.setTimeout(P,150)};s("l-gap").addEventListener("input",t=>{o.layout.gap=+t.target.value,f()}),s("p-gap").addEventListener("input",t=>{o.layoutPhone.gap=+t.target.value,f()});const A=(t,e,a)=>{for(const b of e)s(a+b).addEventListener("input",r=>{const w=+r.target.value,k=e.filter(p=>p!==b),g=t(),y=k.reduce((p,O)=>p+g[O],0)||1;for(const p of k)g[p]=(100-w)*g[p]/y;g[b]=w,f()})};A(()=>o.layout,["t","p","f"],"l-"),A(()=>o.layoutPhone,["m","f"],"p-");const E=t=>{n("lay-desk").hidden=t!=="desk",n("lay-phone").hidden=t!=="phone",n("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};n("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&E(e.dataset.v)}),u.mq.addEventListener("change",()=>{E(u.phone?"phone":"desk"),x()}),E(u.phone?"phone":"desk"),x(),n("lreset").addEventListener("click",()=>{n("lay-phone").hidden?o.layout={...j.layout}:o.layoutPhone={...j.layoutPhone},f()});const i=o.dots;s("dotsize").value=String(i.dotSize),s("fill").value=String(i.fill),s("buzz").value=String(i.buzz),s("real").checked=i.real,n("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===i.shape)),n("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(i.shape=e.dataset.v,d(),e.parentElement.querySelectorAll("button").forEach(a=>a.classList.toggle("on",a===e)))});let M;s("dotsize").addEventListener("input",t=>{i.dotSize=+t.target.value,d(),clearTimeout(M),M=window.setTimeout(P,120)}),s("fill").addEventListener("input",t=>{i.fill=+t.target.value,d()}),s("buzz").addEventListener("input",t=>{i.buzz=+t.target.value,d()}),s("real").addEventListener("change",t=>{i.real=t.target.checked,d(),B(new Set),i.real?J():P()}),s("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),n("replay").addEventListener("click",U);const F=()=>JSON.stringify(K(o),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,G="adriendenispasquier-del/adriendenispasquier.com",q="main",I="content/settings.json",L="adp-github-token",v={get:()=>{try{return localStorage.getItem(L)}catch{return null}},set:t=>{try{t?localStorage.setItem(L,t):localStorage.removeItem(L)}catch{}}},m=()=>{n("signout").hidden=!v.get()};m(),n("signout").addEventListener("click",()=>{v.set(null),m(),n("copynote").textContent="Token forgotten in this browser."}),n("publish").addEventListener("click",async()=>{const t=n("copynote");let e=v.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const a=`https://api.github.com/repos/${G}/contents/${I}`,b={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const r=await fetch(`${a}?ref=${q}`,{headers:b});if(r.status===401||r.status===403||r.status===404)throw new Error("auth");if(!r.ok)throw new Error(String(r.status));const{sha:w}=await r.json(),k=new TextEncoder().encode(F()),g=btoa(Array.from(k,p=>String.fromCharCode(p)).join("")),y=await fetch(a,{method:"PUT",headers:b,body:JSON.stringify({message:"Update the look from the tuning panel",content:g,sha:w,branch:q})});if(y.status===401||y.status===403)throw new Error("auth");if(!y.ok)throw new Error(String(y.status));v.set(e),m(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(r){r.message==="auth"?(v.set(null),m(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),n("copy").addEventListener("click",async()=>{const t=F();try{await navigator.clipboard.writeText(t),n("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),n("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),n("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(W(),location.reload())});const l=n("panel"),$=l.querySelector("summary"),H=(t,e)=>{l.style.left=Math.max(0,Math.min(innerWidth-l.offsetWidth,t))+"px",l.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",l.style.right=l.style.bottom="auto"};o.panelPos&&!u.phone&&H(o.panelPos.l,o.panelPos.t);let c=null,h=!1;$.addEventListener("pointerdown",t=>{c={x:t.clientX,y:t.clientY,l:l.offsetLeft,t:l.offsetTop},h=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!c)return;const e=t.clientX-c.x,a=t.clientY-c.y;!h&&Math.abs(e)+Math.abs(a)>4&&(h=!0),h&&H(c.l+e,c.t+a)}),addEventListener("pointerup",()=>{c&&h&&(o.panelPos={l:l.offsetLeft,t:l.offsetTop},d()),c=null}),$.addEventListener("click",t=>{h&&(t.preventDefault(),h=!1)})}export{Z as mount};
