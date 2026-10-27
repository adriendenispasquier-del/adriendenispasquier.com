import{o as pt,$ as s,S as n,c as B,s as l,a as N,b as u,O as ut,D,F as ct,r as E,d as b,e as j,f as vt,g as ht,h as gt,t as bt,P as mt,i as yt}from"./index-6perHXV9.js";const ft=`
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
      <div class="lrow"><span>List rows</span><input id="p-rows" type="range" min="2" max="16" step="1"><output></output></div>
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
      <option value="flap">Flap (departure board)</option>
    </select>
    <div id="flapo" class="lay">
      <div class="lrow"><span>Flip</span><input id="d-flip" type="range" min="12" max="140" step="1"><output></output></div>
      <div class="lrow"><span>Flips</span><input id="d-flips" type="range" min="1" max="40" step="1"><output></output></div>
      <div class="lrow"><span>Wave</span><input id="d-wave" type="range" min="0" max="3" step="0.05"><output></output></div>
      <div class="seg" id="flapOrder"><button data-v="alphabet" type="button">Alphabet</button><button data-v="random" type="button">Random</button></div>
      <label><input id="d-flapMotion" type="checkbox"> Flap motion on each change</label>
    </div>
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
</details>`;function xt(){document.body.insertAdjacentHTML("beforeend",ft);const o=t=>s(t),at=t=>t==="/"?"Work":t==="/about/"?"About":t==="/personal/"?"Personal":mt.find(e=>`/work/${e.slug}/`===t)?.title||t;yt(t=>{s("stat").textContent=`${t.toLocaleString()} dots`});const G=()=>{const t=u.current??"/",e=B(t);o("bgc").value=e.bg,o("inkc").value=e.ink,s("colfor").textContent=`Colors · ${at(t)}`,s("colnote").textContent=n.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};pt.push(G),G();const I=(t,e)=>{const i=u.current??"/";n.colors.pages[i]={...B(i),[t]:e},l(),N()};o("bgc").addEventListener("input",t=>I("bg",t.target.value)),o("inkc").addEventListener("input",t=>I("ink",t.target.value)),s("coldef").addEventListener("click",()=>{const t=u.current??"/";n.colors.default={...B(t)},delete n.colors.pages[t],l(),N()}),s("coluse").addEventListener("click",()=>{delete n.colors.pages[u.current??"/"],l(),N()});const M=()=>{for(const t in n.layout){if(t==="order"){s("l-order").value=n.layout.order;continue}const e=o("l-"+t);e.value=String(n.layout[t]),e.nextElementSibling.textContent=t==="hh"?n.layout[t]+"px":(+n.layout[t]).toFixed(1)}for(const t in n.layoutPhone){const e=o("p-"+t);e.value=String(n.layoutPhone[t]),e.nextElementSibling.textContent=t==="hh"?n.layoutPhone[t]+"px":t==="rows"?String(n.layoutPhone[t]):(+n.layoutPhone[t]).toFixed(1)}s("pnote").textContent=u.phone?"":"Applies below 760 px wide: narrow the window to see it."};let J;const p=()=>{l(),M(),gt(),clearTimeout(J),J=window.setTimeout(E,150)};o("l-gap").addEventListener("input",t=>{n.layout.gap=+t.target.value,p()}),o("p-gap").addEventListener("input",t=>{n.layoutPhone.gap=+t.target.value,p()});const ot={t:"Text",p:"Pictures",f:"Film"},L=s("l-order");L.innerHTML=ut.map(t=>`<option value="${t}">${[...t].map(e=>ot[e]).join(" · ")}</option>`).join(""),L.value=n.layout.order,L.addEventListener("change",()=>{n.layout.order=L.value,p()}),o("l-hh").addEventListener("input",t=>{n.layout.hh=+t.target.value,p()}),o("p-hh").addEventListener("input",t=>{n.layoutPhone.hh=+t.target.value,p()}),o("p-rows").addEventListener("input",t=>{n.layoutPhone.rows=+t.target.value,p()});const K=(t,e,i)=>{for(const d of e)o(i+d).addEventListener("input",r=>{const z=+r.target.value,F=e.filter(g=>g!==d),y=t(),f=F.reduce((g,rt)=>g+y[rt],0)||1;for(const g of F)y[g]=(100-z)*y[g]/f;y[d]=z,p()})};K(()=>n.layout,["t","p","f"],"l-"),K(()=>n.layoutPhone,["m","f"],"p-");const A=t=>{s("lay-desk").hidden=t!=="desk",s("lay-phone").hidden=t!=="phone",s("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};s("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&A(e.dataset.v)}),u.mq.addEventListener("change",()=>{A(u.phone?"phone":"desk"),M()}),A(u.phone?"phone":"desk"),M(),s("lreset").addEventListener("click",()=>{s("lay-phone").hidden?n.layout={...D.layout}:n.layoutPhone={...D.layoutPhone},p()});const U=()=>s("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===n.grid));U();const W=[["g-line","line","px"],["g-spacing","spacing","×"]],Y=()=>W.forEach(([t,e,i])=>{const d=o(t);d.value=String(n[e]),d.nextElementSibling.textContent=n[e]+i});Y();for(const[t,e]of W)o(t).addEventListener("input",i=>{n[e]=+i.target.value,Y(),p()});s("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(n.grid=e.dataset.v,U(),p())});const w=s("font");w.innerHTML=ct.map(t=>`<option value="${t.v}">${t.label}</option>`).join("");let S=u.phone?"phone":"desk";const k=()=>S==="phone",C=()=>k()?n.typePhone:n.type,X=["name","titles","lists","text","about"],it=t=>{let e=0;if(t==="name"){const d=document.querySelector(".hd a");d&&(e=parseFloat(getComputedStyle(d).fontSize))}else{const d=document.getElementById("L");if(!d)return 0;const r=document.createElement("span");r.style.cssText=`position:absolute;visibility:hidden;font-size:calc(var(--base) * var(--fs-${t}))`,d.appendChild(r),e=parseFloat(getComputedStyle(r).fontSize),r.remove()}const i=parseFloat(document.documentElement.style.getPropertyValue(`--fs-${t}`))||1;return e*.75*C()[t]/i},P=()=>X.forEach(t=>{const e=o("fs-"+t);e.value=String(C()[t]),e.nextElementSibling.textContent=`${Math.round(C()[t]*100)}% · ${Math.round(it(t)*2)/2}pt`});addEventListener("resize",()=>setTimeout(P,300));const O=()=>{s("ftab").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===S)),w.value=k()?n.fontPhone:n.font,P()};O(),s("ftab").addEventListener("click",t=>{const e=t.target.closest("button");e&&(S=e.dataset.v,O())}),u.mq.addEventListener("change",()=>{S=u.phone?"phone":"desk",O()}),w.addEventListener("change",()=>{k()?n.fontPhone=w.value:n.font=w.value,p()});for(const t of X)o("fs-"+t).addEventListener("input",e=>{C()[t]=+e.target.value,P(),p()});s("fsreset").addEventListener("click",()=>{k()?n.typePhone={...D.typePhone}:n.type={...D.type},P(),p()});const a=n.dots;o("dotsize").value=String(a.dotSize),o("fill").value=String(a.fill),o("buzz").value=String(a.buzz),o("real").checked=a.real,s("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===a.shape)),s("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(a.shape=e.dataset.v,l(),e.parentElement.querySelectorAll("button").forEach(i=>i.classList.toggle("on",i===e)))});let v;o("dotsize").addEventListener("input",t=>{a.dotSize=+t.target.value,l(),clearTimeout(v),v=window.setTimeout(E,120)}),o("fill").addEventListener("input",t=>{a.fill=+t.target.value,l(),a.anim!=="particles"&&(clearTimeout(v),v=window.setTimeout(E,120))});const $=s("anim"),_=["lichenDot","lichenDensity","overflow","branches","realBelow"],V=["flip","flips","wave"],q=()=>{for(const t of V){const e=o("d-"+t);e.value=String(a[t]),e.nextElementSibling.textContent=t==="flip"?a[t]+"ms":t==="wave"?a[t]+"s":String(a[t])}s("flapOrder").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===a.flapOrder)),o("d-flapMotion").checked=a.flapMotion};q();for(const t of V)o("d-"+t).addEventListener("input",e=>{a[t]=+e.target.value,l(),q(),clearTimeout(v),v=window.setTimeout(b,300)});s("flapOrder").addEventListener("click",t=>{const e=t.target.closest("button");e&&(a.flapOrder=e.dataset.v,l(),q(),b())}),o("d-flapMotion").addEventListener("change",t=>{a.flapMotion=t.target.checked,l(),b()});const R=()=>{$.value=a.anim,s("lich").hidden=a.anim==="particles"||a.anim==="flap",s("flapo").hidden=a.anim!=="flap";for(const t of _){const e=o("d-"+t);e.value=String(a[t]),e.nextElementSibling.textContent=t==="overflow"?a[t]+"%":t==="realBelow"?a[t]?a[t]+"px":"off":t==="lichenDot"?a[t]+"px":String(a[t])}s("pdots").hidden=a.anim!=="particles"};R(),$.addEventListener("change",()=>{a.anim=$.value,l(),R(),b()});for(const t of _)o("d-"+t).addEventListener("input",e=>{a[t]=+e.target.value,l(),R(),clearTimeout(v),v=window.setTimeout(t==="realBelow"?()=>{j(new Set),E()}:b,250)});o("buzz").addEventListener("input",t=>{a.buzz=+t.target.value,l()}),o("real").addEventListener("change",t=>{a.real=t.target.checked,l(),j(new Set),a.real?vt():E()});const Q=()=>{o("d-speed").value=String(a.speed),o("d-speed").nextElementSibling.textContent=a.speed+"×"};Q(),o("d-speed").addEventListener("input",t=>{a.speed=+t.target.value,l(),Q()}),o("d-speed").addEventListener("change",()=>b()),o("allreal").checked=a.allReal,o("allreal").addEventListener("change",t=>{a.allReal=t.target.checked,l(),j(new Set),b()}),o("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),s("replay").addEventListener("click",b);const Z=()=>JSON.stringify(bt(n),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,lt="adriendenispasquier-del/adriendenispasquier.com",tt="main",dt="content/settings.json",H="adp-github-token",x={get:()=>{try{return localStorage.getItem(H)}catch{return null}},set:t=>{try{t?localStorage.setItem(H,t):localStorage.removeItem(H)}catch{}}},T=()=>{s("signout").hidden=!x.get()};T(),s("signout").addEventListener("click",()=>{x.set(null),T(),s("copynote").textContent="Token forgotten in this browser."}),s("publish").addEventListener("click",async()=>{const t=s("copynote");let e=x.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const i=`https://api.github.com/repos/${lt}/contents/${dt}`,d={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const r=await fetch(`${i}?ref=${tt}`,{headers:d});if(r.status===401||r.status===403||r.status===404)throw new Error("auth");if(!r.ok)throw new Error(String(r.status));const{sha:z}=await r.json(),F=new TextEncoder().encode(Z()),y=btoa(Array.from(F,g=>String.fromCharCode(g)).join("")),f=await fetch(i,{method:"PUT",headers:d,body:JSON.stringify({message:"Update the look from the tuning panel",content:y,sha:z,branch:tt})});if(f.status===401||f.status===403)throw new Error("auth");if(!f.ok)throw new Error(String(f.status));x.set(e),T(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(r){r.message==="auth"?(x.set(null),T(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),s("copy").addEventListener("click",async()=>{const t=Z();try{await navigator.clipboard.writeText(t),s("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),s("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),s("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(ht(),location.reload())});const et=[...document.querySelectorAll("#panel details.sec")];et.forEach(t=>t.addEventListener("toggle",()=>{t.open&&et.forEach(e=>{e!==t&&(e.open=!1)})}));const c=s("panel"),nt=c.querySelector("summary"),st=(t,e)=>{c.style.left=Math.max(0,Math.min(innerWidth-c.offsetWidth,t))+"px",c.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",c.style.right=c.style.bottom="auto"};n.panelPos&&!u.phone&&st(n.panelPos.l,n.panelPos.t);let h=null,m=!1;nt.addEventListener("pointerdown",t=>{h={x:t.clientX,y:t.clientY,l:c.offsetLeft,t:c.offsetTop},m=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!h)return;const e=t.clientX-h.x,i=t.clientY-h.y;!m&&Math.abs(e)+Math.abs(i)>4&&(m=!0),m&&st(h.l+e,h.t+i)}),addEventListener("pointerup",()=>{h&&m&&(n.panelPos={l:c.offsetLeft,t:c.offsetTop},l()),h=null}),nt.addEventListener("click",t=>{m&&(t.preventDefault(),m=!1)})}export{xt as mount};
