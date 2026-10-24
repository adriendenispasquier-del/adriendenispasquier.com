import{o as ot,$ as s,S as n,c as N,s as l,a as O,b as r,O as at,D as T,F as it,r as x,d as j,e as V,f as lt,g as rt,h as dt,t as ut,P as pt,i as ct}from"./index-CqNOg9PG.js";const vt=`
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
</details>`;function bt(){document.body.insertAdjacentHTML("beforeend",vt);const o=t=>s(t),Z=t=>t==="/"?"Work":t==="/about/"?"About":t==="/personal/"?"Personal":pt.find(e=>`/work/${e.slug}/`===t)?.title||t;ct(t=>{s("stat").textContent=`${t.toLocaleString()} dots`});const B=()=>{const t=r.current??"/",e=N(t);o("bgc").value=e.bg,o("inkc").value=e.ink,s("colfor").textContent=`Colors · ${Z(t)}`,s("colnote").textContent=n.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};ot.push(B),B();const R=(t,e)=>{const i=r.current??"/";n.colors.pages[i]={...N(i),[t]:e},l(),O()};o("bgc").addEventListener("input",t=>R("bg",t.target.value)),o("inkc").addEventListener("input",t=>R("ink",t.target.value)),s("coldef").addEventListener("click",()=>{const t=r.current??"/";n.colors.default={...N(t)},delete n.colors.pages[t],l(),O()}),s("coluse").addEventListener("click",()=>{delete n.colors.pages[r.current??"/"],l(),O()});const z=()=>{for(const t in n.layout){if(t==="order"){s("l-order").value=n.layout.order;continue}const e=o("l-"+t);e.value=String(n.layout[t]),e.nextElementSibling.textContent=t==="hh"?n.layout[t]+"px":(+n.layout[t]).toFixed(1)}for(const t in n.layoutPhone){const e=o("p-"+t);e.value=String(n.layoutPhone[t]),e.nextElementSibling.textContent=t==="hh"?n.layoutPhone[t]+"px":(+n.layoutPhone[t]).toFixed(1)}s("pnote").textContent=r.phone?"":"Applies below 760 px wide: narrow the window to see it."};let G;const d=()=>{l(),z(),dt(),clearTimeout(G),G=window.setTimeout(x,150)};o("l-gap").addEventListener("input",t=>{n.layout.gap=+t.target.value,d()}),o("p-gap").addEventListener("input",t=>{n.layoutPhone.gap=+t.target.value,d()});const tt={t:"Text",p:"Pictures",f:"Film"},E=s("l-order");E.innerHTML=at.map(t=>`<option value="${t}">${[...t].map(e=>tt[e]).join(" · ")}</option>`).join(""),E.value=n.layout.order,E.addEventListener("change",()=>{n.layout.order=E.value,d()}),o("l-hh").addEventListener("input",t=>{n.layout.hh=+t.target.value,d()}),o("p-hh").addEventListener("input",t=>{n.layoutPhone.hh=+t.target.value,d()});const I=(t,e,i)=>{for(const y of e)o(i+y).addEventListener("input",p=>{const P=+p.target.value,C=e.filter(v=>v!==y),g=t(),m=C.reduce((v,st)=>v+g[st],0)||1;for(const v of C)g[v]=(100-P)*g[v]/m;g[y]=P,d()})};I(()=>n.layout,["t","p","f"],"l-"),I(()=>n.layoutPhone,["m","f"],"p-");const D=t=>{s("lay-desk").hidden=t!=="desk",s("lay-phone").hidden=t!=="phone",s("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};s("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&D(e.dataset.v)}),r.mq.addEventListener("change",()=>{D(r.phone?"phone":"desk"),z()}),D(r.phone?"phone":"desk"),z(),s("lreset").addEventListener("click",()=>{s("lay-phone").hidden?n.layout={...T.layout}:n.layoutPhone={...T.layoutPhone},d()});const J=()=>s("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===n.grid));J(),s("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(n.grid=e.dataset.v,J(),d())});const f=s("font");f.innerHTML=it.map(t=>`<option value="${t.v}">${t.label}</option>`).join("");let L=r.phone?"phone":"desk";const k=()=>L==="phone",A=()=>k()?n.typePhone:n.type,U=["name","titles","lists","text"],F=()=>U.forEach(t=>{const e=o("fs-"+t);e.value=String(A()[t]),e.nextElementSibling.textContent=Math.round(A()[t]*100)+"%"}),M=()=>{s("ftab").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===L)),f.value=k()?n.fontPhone:n.font,F()};M(),s("ftab").addEventListener("click",t=>{const e=t.target.closest("button");e&&(L=e.dataset.v,M())}),r.mq.addEventListener("change",()=>{L=r.phone?"phone":"desk",M()}),f.addEventListener("change",()=>{k()?n.fontPhone=f.value:n.font=f.value,d()});for(const t of U)o("fs-"+t).addEventListener("input",e=>{A()[t]=+e.target.value,F(),d()});s("fsreset").addEventListener("click",()=>{k()?n.typePhone={...T.typePhone}:n.type={...T.type},F(),d()});const a=n.dots;o("dotsize").value=String(a.dotSize),o("fill").value=String(a.fill),o("buzz").value=String(a.buzz),o("real").checked=a.real,s("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===a.shape)),s("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(a.shape=e.dataset.v,l(),e.parentElement.querySelectorAll("button").forEach(i=>i.classList.toggle("on",i===e)))});let b;o("dotsize").addEventListener("input",t=>{a.dotSize=+t.target.value,l(),clearTimeout(b),b=window.setTimeout(x,120)}),o("fill").addEventListener("input",t=>{a.fill=+t.target.value,l(),a.anim!=="particles"&&(clearTimeout(b),b=window.setTimeout(x,120))});const q=s("anim"),K=["lichenDot","lichenDensity","overflow","branches","realBelow"],$=()=>{q.value=a.anim,s("lich").hidden=a.anim==="particles";for(const t of K){const e=o("d-"+t);e.value=String(a[t]),e.nextElementSibling.textContent=t==="overflow"?a[t]+"%":t==="realBelow"?a[t]?a[t]+"px":"off":t==="lichenDot"?a[t]+"px":String(a[t])}s("pdots").hidden=a.anim!=="particles"};$(),q.addEventListener("change",()=>{a.anim=q.value,l(),$(),j()});for(const t of K)o("d-"+t).addEventListener("input",e=>{a[t]=+e.target.value,l(),$(),clearTimeout(b),b=window.setTimeout(t==="realBelow"?()=>{V(new Set),x()}:j,250)});o("buzz").addEventListener("input",t=>{a.buzz=+t.target.value,l()}),o("real").addEventListener("change",t=>{a.real=t.target.checked,l(),V(new Set),a.real?lt():x()}),o("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),s("replay").addEventListener("click",j);const W=()=>JSON.stringify(ut(n),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,et="adriendenispasquier-del/adriendenispasquier.com",Y="main",nt="content/settings.json",H="adp-github-token",w={get:()=>{try{return localStorage.getItem(H)}catch{return null}},set:t=>{try{t?localStorage.setItem(H,t):localStorage.removeItem(H)}catch{}}},S=()=>{s("signout").hidden=!w.get()};S(),s("signout").addEventListener("click",()=>{w.set(null),S(),s("copynote").textContent="Token forgotten in this browser."}),s("publish").addEventListener("click",async()=>{const t=s("copynote");let e=w.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const i=`https://api.github.com/repos/${et}/contents/${nt}`,y={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const p=await fetch(`${i}?ref=${Y}`,{headers:y});if(p.status===401||p.status===403||p.status===404)throw new Error("auth");if(!p.ok)throw new Error(String(p.status));const{sha:P}=await p.json(),C=new TextEncoder().encode(W()),g=btoa(Array.from(C,v=>String.fromCharCode(v)).join("")),m=await fetch(i,{method:"PUT",headers:y,body:JSON.stringify({message:"Update the look from the tuning panel",content:g,sha:P,branch:Y})});if(m.status===401||m.status===403)throw new Error("auth");if(!m.ok)throw new Error(String(m.status));w.set(e),S(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(p){p.message==="auth"?(w.set(null),S(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),s("copy").addEventListener("click",async()=>{const t=W();try{await navigator.clipboard.writeText(t),s("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),s("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),s("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(rt(),location.reload())});const X=[...document.querySelectorAll("#panel details.sec")];X.forEach(t=>t.addEventListener("toggle",()=>{t.open&&X.forEach(e=>{e!==t&&(e.open=!1)})}));const u=s("panel"),_=u.querySelector("summary"),Q=(t,e)=>{u.style.left=Math.max(0,Math.min(innerWidth-u.offsetWidth,t))+"px",u.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",u.style.right=u.style.bottom="auto"};n.panelPos&&!r.phone&&Q(n.panelPos.l,n.panelPos.t);let c=null,h=!1;_.addEventListener("pointerdown",t=>{c={x:t.clientX,y:t.clientY,l:u.offsetLeft,t:u.offsetTop},h=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!c)return;const e=t.clientX-c.x,i=t.clientY-c.y;!h&&Math.abs(e)+Math.abs(i)>4&&(h=!0),h&&Q(c.l+e,c.t+i)}),addEventListener("pointerup",()=>{c&&h&&(n.panelPos={l:u.offsetLeft,t:u.offsetTop},l()),c=null}),_.addEventListener("click",t=>{h&&(t.preventDefault(),h=!1)})}export{bt as mount};
