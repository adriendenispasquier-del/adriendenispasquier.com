import{o as Q,$ as n,S as s,c as D,s as u,a as q,b as i,D as S,F as V,r as M,d as Z,e as tt,f as et,g as st,h as nt,t as ot,P as at,i as it}from"./index-DzaFvVZ8.js";const lt=`
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
</details>`;function rt(){document.body.insertAdjacentHTML("beforeend",lt);const o=t=>n(t),Y=t=>t==="/"?"Work":t==="/about/"?"About":t==="/personal/"?"Personal":at.find(e=>`/work/${e.slug}/`===t)?.title||t;it(t=>{n("stat").textContent=`${t.toLocaleString()} dots`});const $=()=>{const t=i.current??"/",e=D(t);o("bgc").value=e.bg,o("inkc").value=e.ink,n("colfor").textContent=`Colors · ${Y(t)}`,n("colnote").textContent=s.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};Q.push($),$();const N=(t,e)=>{const a=i.current??"/";s.colors.pages[a]={...D(a),[t]:e},u(),q()};o("bgc").addEventListener("input",t=>N("bg",t.target.value)),o("inkc").addEventListener("input",t=>N("ink",t.target.value)),n("coldef").addEventListener("click",()=>{const t=i.current??"/";s.colors.default={...D(t)},delete s.colors.pages[t],u(),q()}),n("coluse").addEventListener("click",()=>{delete s.colors.pages[i.current??"/"],u(),q()});const C=()=>{for(const t in s.layout){const e=o("l-"+t);e.value=String(s.layout[t]),e.nextElementSibling.textContent=(+s.layout[t]).toFixed(1)}for(const t in s.layoutPhone){const e=o("p-"+t);e.value=String(s.layoutPhone[t]),e.nextElementSibling.textContent=(+s.layoutPhone[t]).toFixed(1)}n("pnote").textContent=i.phone?"":"Applies below 760 px wide: narrow the window to see it."};let G;const c=()=>{u(),C(),nt(),clearTimeout(G),G=window.setTimeout(M,150)};o("l-gap").addEventListener("input",t=>{s.layout.gap=+t.target.value,c()}),o("p-gap").addEventListener("input",t=>{s.layoutPhone.gap=+t.target.value,c()});const H=(t,e,a)=>{for(const v of e)o(a+v).addEventListener("input",r=>{const x=+r.target.value,L=e.filter(b=>b!==v),g=t(),y=L.reduce((b,_)=>b+g[_],0)||1;for(const b of L)g[b]=(100-x)*g[b]/y;g[v]=x,c()})};H(()=>s.layout,["t","p","f"],"l-"),H(()=>s.layoutPhone,["m","f"],"p-");const P=t=>{n("lay-desk").hidden=t!=="desk",n("lay-phone").hidden=t!=="phone",n("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};n("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&P(e.dataset.v)}),i.mq.addEventListener("change",()=>{P(i.phone?"phone":"desk"),C()}),P(i.phone?"phone":"desk"),C(),n("lreset").addEventListener("click",()=>{n("lay-phone").hidden?s.layout={...S.layout}:s.layoutPhone={...S.layoutPhone},c()});const j=()=>n("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===s.grid));j(),n("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(s.grid=e.dataset.v,j(),c())});const f=n("font");f.innerHTML=V.map(t=>`<option value="${t.v}">${t.label}</option>`).join("");let w=i.phone?"phone":"desk";const E=()=>w==="phone",T=()=>E()?s.typePhone:s.type,O=["name","titles","lists","text"],z=()=>O.forEach(t=>{const e=o("fs-"+t);e.value=String(T()[t]),e.nextElementSibling.textContent=Math.round(T()[t]*100)+"%"}),F=()=>{n("ftab").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===w)),f.value=E()?s.fontPhone:s.font,z()};F(),n("ftab").addEventListener("click",t=>{const e=t.target.closest("button");e&&(w=e.dataset.v,F())}),i.mq.addEventListener("change",()=>{w=i.phone?"phone":"desk",F()}),f.addEventListener("change",()=>{E()?s.fontPhone=f.value:s.font=f.value,c()});for(const t of O)o("fs-"+t).addEventListener("input",e=>{T()[t]=+e.target.value,z(),c()});n("fsreset").addEventListener("click",()=>{E()?s.typePhone={...S.typePhone}:s.type={...S.type},z(),c()});const l=s.dots;o("dotsize").value=String(l.dotSize),o("fill").value=String(l.fill),o("buzz").value=String(l.buzz),o("real").checked=l.real,n("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===l.shape)),n("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(l.shape=e.dataset.v,u(),e.parentElement.querySelectorAll("button").forEach(a=>a.classList.toggle("on",a===e)))});let R;o("dotsize").addEventListener("input",t=>{l.dotSize=+t.target.value,u(),clearTimeout(R),R=window.setTimeout(M,120)}),o("fill").addEventListener("input",t=>{l.fill=+t.target.value,u()}),o("buzz").addEventListener("input",t=>{l.buzz=+t.target.value,u()}),o("real").addEventListener("change",t=>{l.real=t.target.checked,u(),Z(new Set),l.real?tt():M()}),o("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),n("replay").addEventListener("click",et);const I=()=>JSON.stringify(ot(s),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,K="adriendenispasquier-del/adriendenispasquier.com",B="main",X="content/settings.json",A="adp-github-token",m={get:()=>{try{return localStorage.getItem(A)}catch{return null}},set:t=>{try{t?localStorage.setItem(A,t):localStorage.removeItem(A)}catch{}}},k=()=>{n("signout").hidden=!m.get()};k(),n("signout").addEventListener("click",()=>{m.set(null),k(),n("copynote").textContent="Token forgotten in this browser."}),n("publish").addEventListener("click",async()=>{const t=n("copynote");let e=m.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const a=`https://api.github.com/repos/${K}/contents/${X}`,v={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const r=await fetch(`${a}?ref=${B}`,{headers:v});if(r.status===401||r.status===403||r.status===404)throw new Error("auth");if(!r.ok)throw new Error(String(r.status));const{sha:x}=await r.json(),L=new TextEncoder().encode(I()),g=btoa(Array.from(L,b=>String.fromCharCode(b)).join("")),y=await fetch(a,{method:"PUT",headers:v,body:JSON.stringify({message:"Update the look from the tuning panel",content:g,sha:x,branch:B})});if(y.status===401||y.status===403)throw new Error("auth");if(!y.ok)throw new Error(String(y.status));m.set(e),k(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(r){r.message==="auth"?(m.set(null),k(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),n("copy").addEventListener("click",async()=>{const t=I();try{await navigator.clipboard.writeText(t),n("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),n("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),n("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(st(),location.reload())});const J=[...document.querySelectorAll("#panel details.sec")];J.forEach(t=>t.addEventListener("toggle",()=>{t.open&&J.forEach(e=>{e!==t&&(e.open=!1)})}));const d=n("panel"),U=d.querySelector("summary"),W=(t,e)=>{d.style.left=Math.max(0,Math.min(innerWidth-d.offsetWidth,t))+"px",d.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",d.style.right=d.style.bottom="auto"};s.panelPos&&!i.phone&&W(s.panelPos.l,s.panelPos.t);let p=null,h=!1;U.addEventListener("pointerdown",t=>{p={x:t.clientX,y:t.clientY,l:d.offsetLeft,t:d.offsetTop},h=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!p)return;const e=t.clientX-p.x,a=t.clientY-p.y;!h&&Math.abs(e)+Math.abs(a)>4&&(h=!0),h&&W(p.l+e,p.t+a)}),addEventListener("pointerup",()=>{p&&h&&(s.panelPos={l:d.offsetLeft,t:d.offsetTop},u()),p=null}),U.addEventListener("click",t=>{h&&(t.preventDefault(),h=!1)})}export{rt as mount};
