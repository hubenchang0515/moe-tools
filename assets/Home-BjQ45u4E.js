import{u as p,r as c,j as r,R as d,T as x}from"./index-BdWIayhR.js";import{A as h}from"./AppCard-kR9quI_g.js";import{M as l}from"./Markdown-CjNoyKN5.js";import{C as u}from"./Container-DJECjEDV.js";import{S as s}from"./Stack-Be4Dlogi.js";import{D as f}from"./Divider-Dyg-ztU7.js";import{G as m}from"./Grid2-DyXD5zeI.js";import"./index-eo_YJggV.js";import"./Chip-DY5dldU4.js";import"./Link-ojc_zQsa.js";import"./Alert-AZMT0D-7.js";import"./useSlot-CDo5mFzb.js";import"./Close-ah1PQ2ze.js";import"./TableRow-DWblZwie.js";import"./useThemeProps-CVx9ISyf.js";import"./dividerClasses-DbM84GJt.js";const j=`> [!,standard] 欢迎来到萌萌工具箱

![](https://www.dmoe.cc/random.php)`;function M(){const{t}=p();c.useEffect(()=>{var e;document.title=`${t("title")} - ${t("pages.home")}`,(e=document.querySelector('meta[name="description"]'))==null||e.setAttribute("content",t("description.base"))},[t]);let a=0;return r.jsx(u,{maxWidth:"xl",sx:{marginY:2},children:r.jsxs(s,{spacing:2,children:[r.jsx(l,{text:j,sx:{maxHeight:"50vh",overflow:"hidden"}}),d.map((e,n)=>r.jsxs(s,{spacing:2,children:[r.jsx(x,{variant:"h6",children:t(e.name)}),r.jsx(f,{}),r.jsx(m,{container:!0,spacing:2,children:e.apps.map((o,i)=>r.jsx(m,{size:{xs:12,md:6,lg:3},children:r.jsx(h,{name:t(o.name),url:o.url,image:`https://www.dmoe.cc/random.php?key=${a++}`},i)},i))})]},n))]})})}export{M as default};
