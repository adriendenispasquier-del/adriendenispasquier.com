import{o as Q,$ as s,S as n,c as D,s as p,a as q,b as i,D as S,F as V,r as M,d as Z,e as tt,f as et,g as nt,h as st,t as at,P as ot,i as it}from"./index-9i7f6A-t.js";const lt=`
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
</details>`;function rt(){document.body.insertAdjacentHTML("beforeend",lt);const a=t=>s(t),Y=t=>t==="/"?"Work":t==="/about/"?"About":t==="/personal/"?"Personal":ot.find(e=>`/work/${e.slug}/`===t)?.title||t;it(t=>{s("stat").textContent=`${t.toLocaleString()} dots`});const H=()=>{const t=i.current??"/",e=D(t);a("bgc").value=e.bg,a("inkc").value=e.ink,s("colfor").textContent=`Colors · ${Y(t)}`,s("colnote").textContent=n.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};Q.push(H),H();const $=(t,e)=>{const o=i.current??"/";n.colors.pages[o]={...D(o),[t]:e},p(),q()};a("bgc").addEventListener("input",t=>$("bg",t.target.value)),a("inkc").addEventListener("input",t=>$("ink",t.target.value)),s("coldef").addEventListener("click",()=>{const t=i.current??"/";n.colors.default={...D(t)},delete n.colors.pages[t],p(),q()}),s("coluse").addEventListener("click",()=>{delete n.colors.pages[i.current??"/"],p(),q()});const P=()=>{for(const t in n.layout){const e=a("l-"+t);e.value=String(n.layout[t]),e.nextElementSibling.textContent=t==="hh"?n.layout[t]+"px":(+n.layout[t]).toFixed(1)}for(const t in n.layoutPhone){const e=a("p-"+t);e.value=String(n.layoutPhone[t]),e.nextElementSibling.textContent=t==="hh"?n.layoutPhone[t]+"px":(+n.layoutPhone[t]).toFixed(1)}s("pnote").textContent=i.phone?"":"Applies below 760 px wide: narrow the window to see it."};let N;const d=()=>{p(),P(),st(),clearTimeout(N),N=window.setTimeout(M,150)};a("l-gap").addEventListener("input",t=>{n.layout.gap=+t.target.value,d()}),a("p-gap").addEventListener("input",t=>{n.layoutPhone.gap=+t.target.value,d()}),a("l-hh").addEventListener("input",t=>{n.layout.hh=+t.target.value,d()}),a("p-hh").addEventListener("input",t=>{n.layoutPhone.hh=+t.target.value,d()});const G=(t,e,o)=>{for(const v of e)a(o+v).addEventListener("input",u=>{const k=+u.target.value,L=e.filter(h=>h!==v),y=t(),g=L.reduce((h,_)=>h+y[_],0)||1;for(const h of L)y[h]=(100-k)*y[h]/g;y[v]=k,d()})};G(()=>n.layout,["t","p","f"],"l-"),G(()=>n.layoutPhone,["m","f"],"p-");const C=t=>{s("lay-desk").hidden=t!=="desk",s("lay-phone").hidden=t!=="phone",s("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};s("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&C(e.dataset.v)}),i.mq.addEventListener("change",()=>{C(i.phone?"phone":"desk"),P()}),C(i.phone?"phone":"desk"),P(),s("lreset").addEventListener("click",()=>{s("lay-phone").hidden?n.layout={...S.layout}:n.layoutPhone={...S.layoutPhone},d()});const j=()=>s("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===n.grid));j(),s("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(n.grid=e.dataset.v,j(),d())});const m=s("font");m.innerHTML=V.map(t=>`<option value="${t.v}">${t.label}</option>`).join("");let w=i.phone?"phone":"desk";const E=()=>w==="phone",T=()=>E()?n.typePhone:n.type,O=["name","titles","lists","text"],z=()=>O.forEach(t=>{const e=a("fs-"+t);e.value=String(T()[t]),e.nextElementSibling.textContent=Math.round(T()[t]*100)+"%"}),F=()=>{s("ftab").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===w)),m.value=E()?n.fontPhone:n.font,z()};F(),s("ftab").addEventListener("click",t=>{const e=t.target.closest("button");e&&(w=e.dataset.v,F())}),i.mq.addEventListener("change",()=>{w=i.phone?"phone":"desk",F()}),m.addEventListener("change",()=>{E()?n.fontPhone=m.value:n.font=m.value,d()});for(const t of O)a("fs-"+t).addEventListener("input",e=>{T()[t]=+e.target.value,z(),d()});s("fsreset").addEventListener("click",()=>{E()?n.typePhone={...S.typePhone}:n.type={...S.type},z(),d()});const l=n.dots;a("dotsize").value=String(l.dotSize),a("fill").value=String(l.fill),a("buzz").value=String(l.buzz),a("real").checked=l.real,s("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===l.shape)),s("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(l.shape=e.dataset.v,p(),e.parentElement.querySelectorAll("button").forEach(o=>o.classList.toggle("on",o===e)))});let R;a("dotsize").addEventListener("input",t=>{l.dotSize=+t.target.value,p(),clearTimeout(R),R=window.setTimeout(M,120)}),a("fill").addEventListener("input",t=>{l.fill=+t.target.value,p()}),a("buzz").addEventListener("input",t=>{l.buzz=+t.target.value,p()}),a("real").addEventListener("change",t=>{l.real=t.target.checked,p(),Z(new Set),l.real?tt():M()}),a("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),s("replay").addEventListener("click",et);const I=()=>JSON.stringify(at(n),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,K="adriendenispasquier-del/adriendenispasquier.com",B="main",X="content/settings.json",A="adp-github-token",f={get:()=>{try{return localStorage.getItem(A)}catch{return null}},set:t=>{try{t?localStorage.setItem(A,t):localStorage.removeItem(A)}catch{}}},x=()=>{s("signout").hidden=!f.get()};x(),s("signout").addEventListener("click",()=>{f.set(null),x(),s("copynote").textContent="Token forgotten in this browser."}),s("publish").addEventListener("click",async()=>{const t=s("copynote");let e=f.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const o=`https://api.github.com/repos/${K}/contents/${X}`,v={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const u=await fetch(`${o}?ref=${B}`,{headers:v});if(u.status===401||u.status===403||u.status===404)throw new Error("auth");if(!u.ok)throw new Error(String(u.status));const{sha:k}=await u.json(),L=new TextEncoder().encode(I()),y=btoa(Array.from(L,h=>String.fromCharCode(h)).join("")),g=await fetch(o,{method:"PUT",headers:v,body:JSON.stringify({message:"Update the look from the tuning panel",content:y,sha:k,branch:B})});if(g.status===401||g.status===403)throw new Error("auth");if(!g.ok)throw new Error(String(g.status));f.set(e),x(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(u){u.message==="auth"?(f.set(null),x(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),s("copy").addEventListener("click",async()=>{const t=I();try{await navigator.clipboard.writeText(t),s("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),s("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),s("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(nt(),location.reload())});const J=[...document.querySelectorAll("#panel details.sec")];J.forEach(t=>t.addEventListener("toggle",()=>{t.open&&J.forEach(e=>{e!==t&&(e.open=!1)})}));const r=s("panel"),U=r.querySelector("summary"),W=(t,e)=>{r.style.left=Math.max(0,Math.min(innerWidth-r.offsetWidth,t))+"px",r.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",r.style.right=r.style.bottom="auto"};n.panelPos&&!i.phone&&W(n.panelPos.l,n.panelPos.t);let c=null,b=!1;U.addEventListener("pointerdown",t=>{c={x:t.clientX,y:t.clientY,l:r.offsetLeft,t:r.offsetTop},b=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!c)return;const e=t.clientX-c.x,o=t.clientY-c.y;!b&&Math.abs(e)+Math.abs(o)>4&&(b=!0),b&&W(c.l+e,c.t+o)}),addEventListener("pointerup",()=>{c&&b&&(n.panelPos={l:r.offsetLeft,t:r.offsetTop},p()),c=null}),U.addEventListener("click",t=>{b&&(t.preventDefault(),b=!1)})}export{rt as mount};
