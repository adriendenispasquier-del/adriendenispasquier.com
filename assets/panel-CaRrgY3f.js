import{o as Z,$ as s,S as n,c as M,s as p,a as q,b as i,O as tt,D as P,F as et,r as $,d as nt,e as st,f as ot,g as at,h as it,t as lt,P as rt,i as dt}from"./index-E2glSGcj.js";const ut=`
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
</details>`;function ct(){document.body.insertAdjacentHTML("beforeend",ut);const o=t=>s(t),K=t=>t==="/"?"Work":t==="/about/"?"About":t==="/personal/"?"Personal":rt.find(e=>`/work/${e.slug}/`===t)?.title||t;dt(t=>{s("stat").textContent=`${t.toLocaleString()} dots`});const H=()=>{const t=i.current??"/",e=M(t);o("bgc").value=e.bg,o("inkc").value=e.ink,s("colfor").textContent=`Colors · ${K(t)}`,s("colnote").textContent=n.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};Z.push(H),H();const N=(t,e)=>{const a=i.current??"/";n.colors.pages[a]={...M(a),[t]:e},p(),q()};o("bgc").addEventListener("input",t=>N("bg",t.target.value)),o("inkc").addEventListener("input",t=>N("ink",t.target.value)),s("coldef").addEventListener("click",()=>{const t=i.current??"/";n.colors.default={...M(t)},delete n.colors.pages[t],p(),q()}),s("coluse").addEventListener("click",()=>{delete n.colors.pages[i.current??"/"],p(),q()});const C=()=>{for(const t in n.layout){if(t==="order"){s("l-order").value=n.layout.order;continue}const e=o("l-"+t);e.value=String(n.layout[t]),e.nextElementSibling.textContent=t==="hh"?n.layout[t]+"px":(+n.layout[t]).toFixed(1)}for(const t in n.layoutPhone){const e=o("p-"+t);e.value=String(n.layoutPhone[t]),e.nextElementSibling.textContent=t==="hh"?n.layoutPhone[t]+"px":(+n.layoutPhone[t]).toFixed(1)}s("pnote").textContent=i.phone?"":"Applies below 760 px wide: narrow the window to see it."};let j;const l=()=>{p(),C(),it(),clearTimeout(j),j=window.setTimeout($,150)};o("l-gap").addEventListener("input",t=>{n.layout.gap=+t.target.value,l()}),o("p-gap").addEventListener("input",t=>{n.layoutPhone.gap=+t.target.value,l()});const X={t:"Text",p:"Pictures",f:"Film"},w=s("l-order");w.innerHTML=tt.map(t=>`<option value="${t}">${[...t].map(e=>X[e]).join(" · ")}</option>`).join(""),w.value=n.layout.order,w.addEventListener("change",()=>{n.layout.order=w.value,l()}),o("l-hh").addEventListener("input",t=>{n.layout.hh=+t.target.value,l()}),o("p-hh").addEventListener("input",t=>{n.layoutPhone.hh=+t.target.value,l()});const O=(t,e,a)=>{for(const v of e)o(a+v).addEventListener("input",u=>{const k=+u.target.value,S=e.filter(h=>h!==v),y=t(),g=S.reduce((h,V)=>h+y[V],0)||1;for(const h of S)y[h]=(100-k)*y[h]/g;y[v]=k,l()})};O(()=>n.layout,["t","p","f"],"l-"),O(()=>n.layoutPhone,["m","f"],"p-");const T=t=>{s("lay-desk").hidden=t!=="desk",s("lay-phone").hidden=t!=="phone",s("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};s("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&T(e.dataset.v)}),i.mq.addEventListener("change",()=>{T(i.phone?"phone":"desk"),C()}),T(i.phone?"phone":"desk"),C(),s("lreset").addEventListener("click",()=>{s("lay-phone").hidden?n.layout={...P.layout}:n.layoutPhone={...P.layoutPhone},l()});const G=()=>s("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===n.grid));G(),s("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(n.grid=e.dataset.v,G(),l())});const m=s("font");m.innerHTML=et.map(t=>`<option value="${t.v}">${t.label}</option>`).join("");let E=i.phone?"phone":"desk";const x=()=>E==="phone",z=()=>x()?n.typePhone:n.type,R=["name","titles","lists","text"],F=()=>R.forEach(t=>{const e=o("fs-"+t);e.value=String(z()[t]),e.nextElementSibling.textContent=Math.round(z()[t]*100)+"%"}),A=()=>{s("ftab").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===E)),m.value=x()?n.fontPhone:n.font,F()};A(),s("ftab").addEventListener("click",t=>{const e=t.target.closest("button");e&&(E=e.dataset.v,A())}),i.mq.addEventListener("change",()=>{E=i.phone?"phone":"desk",A()}),m.addEventListener("change",()=>{x()?n.fontPhone=m.value:n.font=m.value,l()});for(const t of R)o("fs-"+t).addEventListener("input",e=>{z()[t]=+e.target.value,F(),l()});s("fsreset").addEventListener("click",()=>{x()?n.typePhone={...P.typePhone}:n.type={...P.type},F(),l()});const r=n.dots;o("dotsize").value=String(r.dotSize),o("fill").value=String(r.fill),o("buzz").value=String(r.buzz),o("real").checked=r.real,s("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===r.shape)),s("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(r.shape=e.dataset.v,p(),e.parentElement.querySelectorAll("button").forEach(a=>a.classList.toggle("on",a===e)))});let I;o("dotsize").addEventListener("input",t=>{r.dotSize=+t.target.value,p(),clearTimeout(I),I=window.setTimeout($,120)}),o("fill").addEventListener("input",t=>{r.fill=+t.target.value,p()}),o("buzz").addEventListener("input",t=>{r.buzz=+t.target.value,p()}),o("real").addEventListener("change",t=>{r.real=t.target.checked,p(),nt(new Set),r.real?st():$()}),o("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),s("replay").addEventListener("click",ot);const B=()=>JSON.stringify(lt(n),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,_="adriendenispasquier-del/adriendenispasquier.com",J="main",Q="content/settings.json",D="adp-github-token",f={get:()=>{try{return localStorage.getItem(D)}catch{return null}},set:t=>{try{t?localStorage.setItem(D,t):localStorage.removeItem(D)}catch{}}},L=()=>{s("signout").hidden=!f.get()};L(),s("signout").addEventListener("click",()=>{f.set(null),L(),s("copynote").textContent="Token forgotten in this browser."}),s("publish").addEventListener("click",async()=>{const t=s("copynote");let e=f.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const a=`https://api.github.com/repos/${_}/contents/${Q}`,v={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const u=await fetch(`${a}?ref=${J}`,{headers:v});if(u.status===401||u.status===403||u.status===404)throw new Error("auth");if(!u.ok)throw new Error(String(u.status));const{sha:k}=await u.json(),S=new TextEncoder().encode(B()),y=btoa(Array.from(S,h=>String.fromCharCode(h)).join("")),g=await fetch(a,{method:"PUT",headers:v,body:JSON.stringify({message:"Update the look from the tuning panel",content:y,sha:k,branch:J})});if(g.status===401||g.status===403)throw new Error("auth");if(!g.ok)throw new Error(String(g.status));f.set(e),L(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(u){u.message==="auth"?(f.set(null),L(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),s("copy").addEventListener("click",async()=>{const t=B();try{await navigator.clipboard.writeText(t),s("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),s("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),s("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(at(),location.reload())});const U=[...document.querySelectorAll("#panel details.sec")];U.forEach(t=>t.addEventListener("toggle",()=>{t.open&&U.forEach(e=>{e!==t&&(e.open=!1)})}));const d=s("panel"),W=d.querySelector("summary"),Y=(t,e)=>{d.style.left=Math.max(0,Math.min(innerWidth-d.offsetWidth,t))+"px",d.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",d.style.right=d.style.bottom="auto"};n.panelPos&&!i.phone&&Y(n.panelPos.l,n.panelPos.t);let c=null,b=!1;W.addEventListener("pointerdown",t=>{c={x:t.clientX,y:t.clientY,l:d.offsetLeft,t:d.offsetTop},b=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!c)return;const e=t.clientX-c.x,a=t.clientY-c.y;!b&&Math.abs(e)+Math.abs(a)>4&&(b=!0),b&&Y(c.l+e,c.t+a)}),addEventListener("pointerup",()=>{c&&b&&(n.panelPos={l:d.offsetLeft,t:d.offsetTop},p()),c=null}),W.addEventListener("click",t=>{b&&(t.preventDefault(),b=!1)})}export{ct as mount};
