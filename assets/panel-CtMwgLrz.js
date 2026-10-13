import{o as R,$ as o,S as n,c as f,s as d,a as m,b as r,D,r as k,d as $,e as B,f as H,g as J,h as N,t as O,P as W,i as G}from"./index-C-wRMB2r.js";const U=`
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
    <div class="stat" id="copynote">Paste into Look in /admin (or content/settings.json) to make them live.</div>
    <button class="btn" id="discard" type="button">Discard my changes</button>
    <div class="stat" id="stat"></div>
  </div>
</details>`;function Y(){document.body.insertAdjacentHTML("beforeend",U);const a=t=>o(t),M=t=>t==="/"?"Work":t==="/about/"?"About":W.find(e=>`/work/${e.slug}/`===t)?.title||t;G(t=>{o("stat").textContent=`${t.toLocaleString()} dots`});const x=()=>{const t=r.current??"/",e=f(t);a("bgc").value=e.bg,a("inkc").value=e.ink,o("colfor").textContent=`Colors · ${M(t)}`,o("colnote").textContent=n.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};R.push(x),x();const L=(t,e)=>{const i=r.current??"/";n.colors.pages[i]={...f(i),[t]:e},d(),m()};a("bgc").addEventListener("input",t=>L("bg",t.target.value)),a("inkc").addEventListener("input",t=>L("ink",t.target.value)),o("coldef").addEventListener("click",()=>{const t=r.current??"/";n.colors.default={...f(t)},delete n.colors.pages[t],d(),m()}),o("coluse").addEventListener("click",()=>{delete n.colors.pages[r.current??"/"],d(),m()});const h=()=>{for(const t in n.layout){const e=a("l-"+t);e.value=String(n.layout[t]),e.nextElementSibling.textContent=(+n.layout[t]).toFixed(1)}for(const t in n.layoutPhone){const e=a("p-"+t);e.value=String(n.layoutPhone[t]),e.nextElementSibling.textContent=(+n.layoutPhone[t]).toFixed(1)}o("pnote").textContent=r.phone?"":"Applies below 760 px wide: narrow the window to see it."};let w;const b=()=>{d(),h(),N(),clearTimeout(w),w=window.setTimeout(k,150)};a("l-gap").addEventListener("input",t=>{n.layout.gap=+t.target.value,b()}),a("p-gap").addEventListener("input",t=>{n.layoutPhone.gap=+t.target.value,b()});const E=(t,e,i)=>{for(const g of e)a(i+g).addEventListener("input",q=>{const P=+q.target.value,T=e.filter(c=>c!==g),v=t(),A=T.reduce((c,j)=>c+v[j],0)||1;for(const c of T)v[c]=(100-P)*v[c]/A;v[g]=P,b()})};E(()=>n.layout,["t","p","f"],"l-"),E(()=>n.layoutPhone,["m","f"],"p-");const y=t=>{o("lay-desk").hidden=t!=="desk",o("lay-phone").hidden=t!=="phone",o("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};o("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&y(e.dataset.v)}),r.mq.addEventListener("change",()=>{y(r.phone?"phone":"desk"),h()}),y(r.phone?"phone":"desk"),h(),o("lreset").addEventListener("click",()=>{o("lay-phone").hidden?n.layout={...D.layout}:n.layoutPhone={...D.layoutPhone},b()});const s=n.dots;a("dotsize").value=String(s.dotSize),a("fill").value=String(s.fill),a("buzz").value=String(s.buzz),a("real").checked=s.real,o("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===s.shape)),o("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(s.shape=e.dataset.v,d(),e.parentElement.querySelectorAll("button").forEach(i=>i.classList.toggle("on",i===e)))});let S;a("dotsize").addEventListener("input",t=>{s.dotSize=+t.target.value,d(),clearTimeout(S),S=window.setTimeout(k,120)}),a("fill").addEventListener("input",t=>{s.fill=+t.target.value,d()}),a("buzz").addEventListener("input",t=>{s.buzz=+t.target.value,d()}),a("real").addEventListener("change",t=>{s.real=t.target.checked,d(),$(new Set),s.real?B():k()}),a("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),o("replay").addEventListener("click",H);const F=()=>JSON.stringify(O(n),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`;o("copy").addEventListener("click",async()=>{const t=F();try{await navigator.clipboard.writeText(t),o("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),o("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),o("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(J(),location.reload())});const l=o("panel"),z=l.querySelector("summary"),C=(t,e)=>{l.style.left=Math.max(0,Math.min(innerWidth-l.offsetWidth,t))+"px",l.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",l.style.right=l.style.bottom="auto"};n.panelPos&&!r.phone&&C(n.panelPos.l,n.panelPos.t);let p=null,u=!1;z.addEventListener("pointerdown",t=>{p={x:t.clientX,y:t.clientY,l:l.offsetLeft,t:l.offsetTop},u=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!p)return;const e=t.clientX-p.x,i=t.clientY-p.y;!u&&Math.abs(e)+Math.abs(i)>4&&(u=!0),u&&C(p.l+e,p.t+i)}),addEventListener("pointerup",()=>{p&&u&&(n.panelPos={l:l.offsetLeft,t:l.offsetTop},d()),p=null}),z.addEventListener("click",t=>{u&&(t.preventDefault(),u=!1)})}export{Y as mount};
