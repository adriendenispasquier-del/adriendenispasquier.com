import{o as dt,$ as s,S as n,c as R,s as r,a as B,b as u,O as rt,D as F,F as pt,r as x,d as E,e as N,f as ut,g as ct,h as vt,t as ht,P as gt,i as bt}from"./index-DM2UngZ0.js";const yt=`
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
    <div class="lrow"><span>Lines</span><input id="g-line" type="range" min="0.25" max="3" step="0.05"><output></output></div>
    <div class="lrow"><span>Spacing</span><input id="g-spacing" type="range" min="0.2" max="3" step="0.05"><output></output></div>
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
    <div class="lrow"><span>Speed</span><input id="d-speed" type="range" min="0.2" max="3" step="0.05"><output></output></div>
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
</details>`;function ft(){document.body.insertAdjacentHTML("beforeend",yt);const a=t=>s(t),nt=t=>t==="/"?"Work":t==="/about/"?"About":t==="/personal/"?"Personal":gt.find(e=>`/work/${e.slug}/`===t)?.title||t;bt(t=>{s("stat").textContent=`${t.toLocaleString()} dots`});const j=()=>{const t=u.current??"/",e=R(t);a("bgc").value=e.bg,a("inkc").value=e.ink,s("colfor").textContent=`Colors · ${nt(t)}`,s("colnote").textContent=n.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};dt.push(j),j();const G=(t,e)=>{const i=u.current??"/";n.colors.pages[i]={...R(i),[t]:e},r(),B()};a("bgc").addEventListener("input",t=>G("bg",t.target.value)),a("inkc").addEventListener("input",t=>G("ink",t.target.value)),s("coldef").addEventListener("click",()=>{const t=u.current??"/";n.colors.default={...R(t)},delete n.colors.pages[t],r(),B()}),s("coluse").addEventListener("click",()=>{delete n.colors.pages[u.current??"/"],r(),B()});const A=()=>{for(const t in n.layout){if(t==="order"){s("l-order").value=n.layout.order;continue}const e=a("l-"+t);e.value=String(n.layout[t]),e.nextElementSibling.textContent=t==="hh"?n.layout[t]+"px":(+n.layout[t]).toFixed(1)}for(const t in n.layoutPhone){const e=a("p-"+t);e.value=String(n.layoutPhone[t]),e.nextElementSibling.textContent=t==="hh"?n.layoutPhone[t]+"px":(+n.layoutPhone[t]).toFixed(1)}s("pnote").textContent=u.phone?"":"Applies below 760 px wide: narrow the window to see it."};let I;const p=()=>{r(),A(),vt(),clearTimeout(I),I=window.setTimeout(x,150)};a("l-gap").addEventListener("input",t=>{n.layout.gap=+t.target.value,p()}),a("p-gap").addEventListener("input",t=>{n.layoutPhone.gap=+t.target.value,p()});const st={t:"Text",p:"Pictures",f:"Film"},L=s("l-order");L.innerHTML=rt.map(t=>`<option value="${t}">${[...t].map(e=>st[e]).join(" · ")}</option>`).join(""),L.value=n.layout.order,L.addEventListener("change",()=>{n.layout.order=L.value,p()}),a("l-hh").addEventListener("input",t=>{n.layout.hh=+t.target.value,p()}),a("p-hh").addEventListener("input",t=>{n.layoutPhone.hh=+t.target.value,p()});const J=(t,e,i)=>{for(const l of e)a(i+l).addEventListener("input",d=>{const z=+d.target.value,D=e.filter(h=>h!==l),y=t(),m=D.reduce((h,lt)=>h+y[lt],0)||1;for(const h of D)y[h]=(100-z)*y[h]/m;y[l]=z,p()})};J(()=>n.layout,["t","p","f"],"l-"),J(()=>n.layoutPhone,["m","f"],"p-");const $=t=>{s("lay-desk").hidden=t!=="desk",s("lay-phone").hidden=t!=="phone",s("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};s("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&$(e.dataset.v)}),u.mq.addEventListener("change",()=>{$(u.phone?"phone":"desk"),A()}),$(u.phone?"phone":"desk"),A(),s("lreset").addEventListener("click",()=>{s("lay-phone").hidden?n.layout={...F.layout}:n.layoutPhone={...F.layoutPhone},p()});const U=()=>s("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===n.grid));U();const K=[["g-line","line","px"],["g-spacing","spacing","×"]],W=()=>K.forEach(([t,e,i])=>{const l=a(t);l.value=String(n[e]),l.nextElementSibling.textContent=n[e]+i});W();for(const[t,e]of K)a(t).addEventListener("input",i=>{n[e]=+i.target.value,W(),p()});s("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(n.grid=e.dataset.v,U(),p())});const f=s("font");f.innerHTML=pt.map(t=>`<option value="${t.v}">${t.label}</option>`).join("");let S=u.phone?"phone":"desk";const k=()=>S==="phone",C=()=>k()?n.typePhone:n.type,Y=["name","titles","lists","text","about"],at=t=>{let e=0;if(t==="name"){const l=document.querySelector(".hd a");l&&(e=parseFloat(getComputedStyle(l).fontSize))}else{const l=document.getElementById("L");if(!l)return 0;const d=document.createElement("span");d.style.cssText=`position:absolute;visibility:hidden;font-size:calc(var(--base) * var(--fs-${t}))`,l.appendChild(d),e=parseFloat(getComputedStyle(d).fontSize),d.remove()}const i=parseFloat(document.documentElement.style.getPropertyValue(`--fs-${t}`))||1;return e*.75*C()[t]/i},P=()=>Y.forEach(t=>{const e=a("fs-"+t);e.value=String(C()[t]),e.nextElementSibling.textContent=`${Math.round(C()[t]*100)}% · ${Math.round(at(t)*2)/2}pt`});addEventListener("resize",()=>setTimeout(P,300));const M=()=>{s("ftab").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===S)),f.value=k()?n.fontPhone:n.font,P()};M(),s("ftab").addEventListener("click",t=>{const e=t.target.closest("button");e&&(S=e.dataset.v,M())}),u.mq.addEventListener("change",()=>{S=u.phone?"phone":"desk",M()}),f.addEventListener("change",()=>{k()?n.fontPhone=f.value:n.font=f.value,p()});for(const t of Y)a("fs-"+t).addEventListener("input",e=>{C()[t]=+e.target.value,P(),p()});s("fsreset").addEventListener("click",()=>{k()?n.typePhone={...F.typePhone}:n.type={...F.type},P(),p()});const o=n.dots;a("dotsize").value=String(o.dotSize),a("fill").value=String(o.fill),a("buzz").value=String(o.buzz),a("real").checked=o.real,s("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===o.shape)),s("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(o.shape=e.dataset.v,r(),e.parentElement.querySelectorAll("button").forEach(i=>i.classList.toggle("on",i===e)))});let b;a("dotsize").addEventListener("input",t=>{o.dotSize=+t.target.value,r(),clearTimeout(b),b=window.setTimeout(x,120)}),a("fill").addEventListener("input",t=>{o.fill=+t.target.value,r(),o.anim!=="particles"&&(clearTimeout(b),b=window.setTimeout(x,120))});const q=s("anim"),X=["lichenDot","lichenDensity","overflow","branches","realBelow"],H=()=>{q.value=o.anim,s("lich").hidden=o.anim==="particles";for(const t of X){const e=a("d-"+t);e.value=String(o[t]),e.nextElementSibling.textContent=t==="overflow"?o[t]+"%":t==="realBelow"?o[t]?o[t]+"px":"off":t==="lichenDot"?o[t]+"px":String(o[t])}s("pdots").hidden=o.anim!=="particles"};H(),q.addEventListener("change",()=>{o.anim=q.value,r(),H(),E()});for(const t of X)a("d-"+t).addEventListener("input",e=>{o[t]=+e.target.value,r(),H(),clearTimeout(b),b=window.setTimeout(t==="realBelow"?()=>{N(new Set),x()}:E,250)});a("buzz").addEventListener("input",t=>{o.buzz=+t.target.value,r()}),a("real").addEventListener("change",t=>{o.real=t.target.checked,r(),N(new Set),o.real?ut():x()});const _=()=>{a("d-speed").value=String(o.speed),a("d-speed").nextElementSibling.textContent=o.speed+"×"};_(),a("d-speed").addEventListener("input",t=>{o.speed=+t.target.value,r(),_()}),a("d-speed").addEventListener("change",()=>E()),a("allreal").checked=o.allReal,a("allreal").addEventListener("change",t=>{o.allReal=t.target.checked,r(),N(new Set),E()}),a("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),s("replay").addEventListener("click",E);const V=()=>JSON.stringify(ht(n),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,ot="adriendenispasquier-del/adriendenispasquier.com",Q="main",it="content/settings.json",O="adp-github-token",w={get:()=>{try{return localStorage.getItem(O)}catch{return null}},set:t=>{try{t?localStorage.setItem(O,t):localStorage.removeItem(O)}catch{}}},T=()=>{s("signout").hidden=!w.get()};T(),s("signout").addEventListener("click",()=>{w.set(null),T(),s("copynote").textContent="Token forgotten in this browser."}),s("publish").addEventListener("click",async()=>{const t=s("copynote");let e=w.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const i=`https://api.github.com/repos/${ot}/contents/${it}`,l={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const d=await fetch(`${i}?ref=${Q}`,{headers:l});if(d.status===401||d.status===403||d.status===404)throw new Error("auth");if(!d.ok)throw new Error(String(d.status));const{sha:z}=await d.json(),D=new TextEncoder().encode(V()),y=btoa(Array.from(D,h=>String.fromCharCode(h)).join("")),m=await fetch(i,{method:"PUT",headers:l,body:JSON.stringify({message:"Update the look from the tuning panel",content:y,sha:z,branch:Q})});if(m.status===401||m.status===403)throw new Error("auth");if(!m.ok)throw new Error(String(m.status));w.set(e),T(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(d){d.message==="auth"?(w.set(null),T(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),s("copy").addEventListener("click",async()=>{const t=V();try{await navigator.clipboard.writeText(t),s("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),s("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),s("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(ct(),location.reload())});const Z=[...document.querySelectorAll("#panel details.sec")];Z.forEach(t=>t.addEventListener("toggle",()=>{t.open&&Z.forEach(e=>{e!==t&&(e.open=!1)})}));const c=s("panel"),tt=c.querySelector("summary"),et=(t,e)=>{c.style.left=Math.max(0,Math.min(innerWidth-c.offsetWidth,t))+"px",c.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",c.style.right=c.style.bottom="auto"};n.panelPos&&!u.phone&&et(n.panelPos.l,n.panelPos.t);let v=null,g=!1;tt.addEventListener("pointerdown",t=>{v={x:t.clientX,y:t.clientY,l:c.offsetLeft,t:c.offsetTop},g=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!v)return;const e=t.clientX-v.x,i=t.clientY-v.y;!g&&Math.abs(e)+Math.abs(i)>4&&(g=!0),g&&et(v.l+e,v.t+i)}),addEventListener("pointerup",()=>{v&&g&&(n.panelPos={l:c.offsetLeft,t:c.offsetTop},r()),v=null}),tt.addEventListener("click",t=>{g&&(t.preventDefault(),g=!1)})}export{ft as mount};
