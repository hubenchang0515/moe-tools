import{u as F,r as c,j as e,B as l,y as u}from"./index-hppoC6iV.js";import{C as f}from"./Canvas-Vb1wGuDm.js";import{C as h}from"./Container-pm8YwrQ_.js";import{A as j}from"./Alert-zoDG0pBZ.js";import{A as g}from"./AlertTitle-DC-kB3SK.js";import"./useThemeProps-CRnetRKO.js";import"./useSlot-CG_lEdXg.js";import"./Close-CWk7jeK-.js";function k(){const{t:n}=F(),r=c.useRef(null);c.useEffect(()=>{var t;document.title=`${n("title")} - ${n("pages.bad-pixel-detection")}`,(t=document.querySelector('meta[name="description"]'))==null||t.setAttribute("content",n("description.bad-pixel-detection"))},[n]);const d=()=>{let t=0;const a=["#FF0000","#00FF00","#0000FF","#FFFF00","#FF00FF","#00FFFF","#FFFFFF","#000000"];return{onLoad:()=>{t=0},onDraw:o=>{const i=o.getContext("2d");i&&(i.fillStyle=a[t],i.fillRect(0,0,o.width,o.height))},onUpdate:()=>{},onInput:()=>{t=(t+1)%a.length}}},{onLoad:p,onDraw:x,onUpdate:m,onInput:s}=d();return e.jsx(h,{maxWidth:"xl",sx:{py:2,height:"100%"},children:e.jsxs(l,{height:"100%",display:"flex",flexDirection:"column",gap:2,children:[e.jsx(l,{flexGrow:1,children:e.jsx(f,{ref:r,onLoad:p,onDraw:x,onUpdate:m,onClick:s,onKeyDown:s})}),e.jsx(u,{variant:"contained",onClick:()=>{var t;(t=r.current)==null||t.requestFullscreen()},children:n("common.fullscreen")}),e.jsxs(j,{severity:"info",children:[e.jsx(g,{children:e.jsx("strong",{children:n("common.explain")})}),n("bad-pixel-detection.message")]})]})})}export{k as default};