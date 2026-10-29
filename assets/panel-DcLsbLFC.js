import{o as rt,$ as a,S as n,c as B,s as l,a as N,b as u,O as ut,r as v,D,F as ct,d as E,e as j,f as vt,g as ht,h as bt,t as gt,P as yt,i as mt}from"./index-CZo6JBBS.js";const ft=`
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
      <label><input id="l-two" type="checkbox"> Two columns: portrait pictures side by side</label>
    </div>
    <div id="lay-phone" class="lay" hidden>
      <div class="lrow"><span>Gaps</span><input id="p-gap" type="range" min="1" max="10" step="0.1"><output></output></div>
      <div class="lrow"><span>Main</span><input id="p-m" type="range" min="60" max="94" step="0.1"><output></output></div>
      <div class="lrow"><span>Film</span><input id="p-f" type="range" min="6" max="40" step="0.1"><output></output></div>
      <div class="lrow"><span>Header</span><input id="p-hh" type="range" min="30" max="100" step="1"><output></output></div>
      <div class="lrow"><span>List rows</span><input id="p-rows" type="range" min="2" max="16" step="1"><output></output></div>
      <label><input id="p-two" type="checkbox"> Two columns: portrait pictures side by side</label>
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
</details>`;function xt(){document.body.insertAdjacentHTML("beforeend",ft);const s=t=>a(t),at=t=>t==="/"?"Work":t==="/about/"?"About":t==="/personal/"?"Personal":yt.find(e=>`/work/${e.slug}/`===t)?.title||t;mt(t=>{a("stat").textContent=`${t.toLocaleString()} dots`});const G=()=>{const t=u.current??"/",e=B(t);s("bgc").value=e.bg,s("inkc").value=e.ink,a("colfor").textContent=`Colors · ${at(t)}`,a("colnote").textContent=n.colors.pages[t]?"This page has its own colors.":"This page uses the default colors."};rt.push(G),G();const I=(t,e)=>{const i=u.current??"/";n.colors.pages[i]={...B(i),[t]:e},l(),N()};s("bgc").addEventListener("input",t=>I("bg",t.target.value)),s("inkc").addEventListener("input",t=>I("ink",t.target.value)),a("coldef").addEventListener("click",()=>{const t=u.current??"/";n.colors.default={...B(t)},delete n.colors.pages[t],l(),N()}),a("coluse").addEventListener("click",()=>{delete n.colors.pages[u.current??"/"],l(),N()});const M=()=>{s("l-two").checked=n.layout.two,s("p-two").checked=n.layoutPhone.two;for(const t in n.layout){if(t==="two")continue;if(t==="order"){a("l-order").value=n.layout.order;continue}const e=s("l-"+t);e.value=String(n.layout[t]),e.nextElementSibling.textContent=t==="hh"?n.layout[t]+"px":(+n.layout[t]).toFixed(1)}for(const t in n.layoutPhone){if(t==="two")continue;const e=s("p-"+t);e.value=String(n.layoutPhone[t]),e.nextElementSibling.textContent=t==="hh"?n.layoutPhone[t]+"px":t==="rows"?String(n.layoutPhone[t]):(+n.layoutPhone[t]).toFixed(1)}a("pnote").textContent=u.phone?"":"Applies below 760 px wide: narrow the window to see it."};let J;const r=()=>{l(),M(),bt(),clearTimeout(J),J=window.setTimeout(E,150)};s("l-gap").addEventListener("input",t=>{n.layout.gap=+t.target.value,r()}),s("p-gap").addEventListener("input",t=>{n.layoutPhone.gap=+t.target.value,r()});const ot={t:"Text",p:"Pictures",f:"Film"},L=a("l-order");L.innerHTML=ut.map(t=>`<option value="${t}">${[...t].map(e=>ot[e]).join(" · ")}</option>`).join(""),L.value=n.layout.order,L.addEventListener("change",()=>{n.layout.order=L.value,r()}),s("l-hh").addEventListener("input",t=>{n.layout.hh=+t.target.value,r()}),s("p-hh").addEventListener("input",t=>{n.layoutPhone.hh=+t.target.value,r()}),s("l-two").addEventListener("change",t=>{n.layout.two=t.target.checked,l(),v()}),s("p-two").addEventListener("change",t=>{n.layoutPhone.two=t.target.checked,l(),v()}),s("p-rows").addEventListener("input",t=>{n.layoutPhone.rows=+t.target.value,r()});const K=(t,e,i)=>{for(const d of e)s(i+d).addEventListener("input",p=>{const z=+p.target.value,F=e.filter(g=>g!==d),m=t(),f=F.reduce((g,pt)=>g+m[pt],0)||1;for(const g of F)m[g]=(100-z)*m[g]/f;m[d]=z,r()})};K(()=>n.layout,["t","p","f"],"l-"),K(()=>n.layoutPhone,["m","f"],"p-");const A=t=>{a("lay-desk").hidden=t!=="desk",a("lay-phone").hidden=t!=="phone",a("ltab").querySelectorAll("button").forEach(e=>e.classList.toggle("on",e.dataset.v===t))};a("ltab").addEventListener("click",t=>{const e=t.target.closest("button");e&&A(e.dataset.v)}),u.mq.addEventListener("change",()=>{A(u.phone?"phone":"desk"),M()}),A(u.phone?"phone":"desk"),M(),a("lreset").addEventListener("click",()=>{a("lay-phone").hidden?n.layout={...D.layout}:n.layoutPhone={...D.layoutPhone},r()});const U=()=>a("grid").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===n.grid));U();const W=[["g-line","line","px"],["g-spacing","spacing","×"]],Y=()=>W.forEach(([t,e,i])=>{const d=s(t);d.value=String(n[e]),d.nextElementSibling.textContent=n[e]+i});Y();for(const[t,e]of W)s(t).addEventListener("input",i=>{n[e]=+i.target.value,Y(),r()});a("grid").addEventListener("click",t=>{const e=t.target.closest("button");e&&(n.grid=e.dataset.v,U(),r())});const w=a("font");w.innerHTML=ct.map(t=>`<option value="${t.v}">${t.label}</option>`).join("");let k=u.phone?"phone":"desk";const S=()=>k==="phone",P=()=>S()?n.typePhone:n.type,X=["name","titles","lists","text","about"],it=t=>{let e=0;if(t==="name"){const d=document.querySelector(".hd a");d&&(e=parseFloat(getComputedStyle(d).fontSize))}else{const d=document.getElementById("L");if(!d)return 0;const p=document.createElement("span");p.style.cssText=`position:absolute;visibility:hidden;font-size:calc(var(--base) * var(--fs-${t}))`,d.appendChild(p),e=parseFloat(getComputedStyle(p).fontSize),p.remove()}const i=parseFloat(document.documentElement.style.getPropertyValue(`--fs-${t}`))||1;return e*.75*P()[t]/i},C=()=>X.forEach(t=>{const e=s("fs-"+t);e.value=String(P()[t]),e.nextElementSibling.textContent=`${Math.round(P()[t]*100)}% · ${Math.round(it(t)*2)/2}pt`});addEventListener("resize",()=>setTimeout(C,300));const O=()=>{a("ftab").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===k)),w.value=S()?n.fontPhone:n.font,C()};O(),a("ftab").addEventListener("click",t=>{const e=t.target.closest("button");e&&(k=e.dataset.v,O())}),u.mq.addEventListener("change",()=>{k=u.phone?"phone":"desk",O()}),w.addEventListener("change",()=>{S()?n.fontPhone=w.value:n.font=w.value,r()});for(const t of X)s("fs-"+t).addEventListener("input",e=>{P()[t]=+e.target.value,C(),r()});a("fsreset").addEventListener("click",()=>{S()?n.typePhone={...D.typePhone}:n.type={...D.type},C(),r()});const o=n.dots;s("dotsize").value=String(o.dotSize),s("fill").value=String(o.fill),s("buzz").value=String(o.buzz),s("real").checked=o.real,a("shape").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===o.shape)),a("shape").addEventListener("click",t=>{const e=t.target.closest("button");e&&(o.shape=e.dataset.v,l(),e.parentElement.querySelectorAll("button").forEach(i=>i.classList.toggle("on",i===e)))});let h;s("dotsize").addEventListener("input",t=>{o.dotSize=+t.target.value,l(),clearTimeout(h),h=window.setTimeout(E,120)}),s("fill").addEventListener("input",t=>{o.fill=+t.target.value,l(),o.anim!=="particles"&&(clearTimeout(h),h=window.setTimeout(E,120))});const $=a("anim"),_=["lichenDot","lichenDensity","overflow","branches","realBelow"],V=["flip","flips","wave"],q=()=>{for(const t of V){const e=s("d-"+t);e.value=String(o[t]),e.nextElementSibling.textContent=t==="flip"?o[t]+"ms":t==="wave"?o[t]+"s":String(o[t])}a("flapOrder").querySelectorAll("button").forEach(t=>t.classList.toggle("on",t.dataset.v===o.flapOrder)),s("d-flapMotion").checked=o.flapMotion};q();for(const t of V)s("d-"+t).addEventListener("input",e=>{o[t]=+e.target.value,l(),q(),clearTimeout(h),h=window.setTimeout(v,300)});a("flapOrder").addEventListener("click",t=>{const e=t.target.closest("button");e&&(o.flapOrder=e.dataset.v,l(),q(),v())}),s("d-flapMotion").addEventListener("change",t=>{o.flapMotion=t.target.checked,l(),v()});const R=()=>{$.value=o.anim,a("lich").hidden=o.anim==="particles"||o.anim==="flap",a("flapo").hidden=o.anim!=="flap";for(const t of _){const e=s("d-"+t);e.value=String(o[t]),e.nextElementSibling.textContent=t==="overflow"?o[t]+"%":t==="realBelow"?o[t]?o[t]+"px":"off":t==="lichenDot"?o[t]+"px":String(o[t])}a("pdots").hidden=o.anim!=="particles"};R(),$.addEventListener("change",()=>{o.anim=$.value,l(),R(),v()});for(const t of _)s("d-"+t).addEventListener("input",e=>{o[t]=+e.target.value,l(),R(),clearTimeout(h),h=window.setTimeout(t==="realBelow"?()=>{j(new Set),E()}:v,250)});s("buzz").addEventListener("input",t=>{o.buzz=+t.target.value,l()}),s("real").addEventListener("change",t=>{o.real=t.target.checked,l(),j(new Set),o.real?vt():E()});const Q=()=>{s("d-speed").value=String(o.speed),s("d-speed").nextElementSibling.textContent=o.speed+"×"};Q(),s("d-speed").addEventListener("input",t=>{o.speed=+t.target.value,l(),Q()}),s("d-speed").addEventListener("change",()=>v()),s("allreal").checked=o.allReal,s("allreal").addEventListener("change",t=>{o.allReal=t.target.checked,l(),j(new Set),v()}),s("reveal").addEventListener("change",t=>document.body.classList.toggle("reveal",t.target.checked)),a("replay").addEventListener("click",v);const Z=()=>JSON.stringify(gt(n),(t,e)=>typeof e=="number"?Math.round(e*100)/100:e,2)+`
`,lt="adriendenispasquier-del/adriendenispasquier.com",tt="main",dt="content/settings.json",H="adp-github-token",x={get:()=>{try{return localStorage.getItem(H)}catch{return null}},set:t=>{try{t?localStorage.setItem(H,t):localStorage.removeItem(H)}catch{}}},T=()=>{a("signout").hidden=!x.get()};T(),a("signout").addEventListener("click",()=>{x.set(null),T(),a("copynote").textContent="Token forgotten in this browser."}),a("publish").addEventListener("click",async()=>{const t=a("copynote");let e=x.get();if(!e&&(e=prompt(`Paste your GitHub token (fine-grained, this repository only, Contents: read and write).
It is kept only in this browser.`)?.trim()||null,!e))return;const i=`https://api.github.com/repos/${lt}/contents/${dt}`,d={Authorization:`Bearer ${e}`,Accept:"application/vnd.github+json"};t.textContent="Publishing…";try{const p=await fetch(`${i}?ref=${tt}`,{headers:d});if(p.status===401||p.status===403||p.status===404)throw new Error("auth");if(!p.ok)throw new Error(String(p.status));const{sha:z}=await p.json(),F=new TextEncoder().encode(Z()),m=btoa(Array.from(F,g=>String.fromCharCode(g)).join("")),f=await fetch(i,{method:"PUT",headers:d,body:JSON.stringify({message:"Update the look from the tuning panel",content:m,sha:z,branch:tt})});if(f.status===401||f.status===403)throw new Error("auth");if(!f.ok)throw new Error(String(f.status));x.set(e),T(),t.textContent="Published. The site rebuilds itself: live in about a minute."}catch(p){p.message==="auth"?(x.set(null),T(),t.textContent="GitHub refused the token. It needs access to this repository with Contents: read and write."):t.textContent="Couldn't publish (network or GitHub error). Nothing was changed."}}),a("copy").addEventListener("click",async()=>{const t=Z();try{await navigator.clipboard.writeText(t),a("copynote").textContent="Copied. Paste into content/settings.json, or set the same values in /admin → Look."}catch{console.log(t),a("copynote").textContent="Couldn't copy: the settings are in the browser console."}}),a("discard").addEventListener("click",()=>{confirm("Discard your tuning and go back to the published settings?")&&(ht(),location.reload())});const et=[...document.querySelectorAll("#panel details.sec")];et.forEach(t=>t.addEventListener("toggle",()=>{t.open&&et.forEach(e=>{e!==t&&(e.open=!1)})}));const c=a("panel"),nt=c.querySelector("summary"),st=(t,e)=>{c.style.left=Math.max(0,Math.min(innerWidth-c.offsetWidth,t))+"px",c.style.top=Math.max(0,Math.min(innerHeight-36,e))+"px",c.style.right=c.style.bottom="auto"};n.panelPos&&!u.phone&&st(n.panelPos.l,n.panelPos.t);let b=null,y=!1;nt.addEventListener("pointerdown",t=>{b={x:t.clientX,y:t.clientY,l:c.offsetLeft,t:c.offsetTop},y=!1,t.preventDefault()}),addEventListener("pointermove",t=>{if(!b)return;const e=t.clientX-b.x,i=t.clientY-b.y;!y&&Math.abs(e)+Math.abs(i)>4&&(y=!0),y&&st(b.l+e,b.t+i)}),addEventListener("pointerup",()=>{b&&y&&(n.panelPos={l:c.offsetLeft,t:c.offsetTop},l()),b=null}),nt.addEventListener("click",t=>{y&&(t.preventDefault(),y=!1)})}export{xt as mount};
