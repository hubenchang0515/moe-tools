import{a as i,u as s,r as a,j as e,T as n,L as c}from"./index-DuirXtDx.js";import{C as l}from"./Container-DCD7z5al.js";import{L as m}from"./Link-B8WhBkQz.js";import"./useThemeProps-DzVvHLYh.js";function h(){const o=i(),{t}=s();return a.useEffect(()=>{var r;document.title=`${t("title")} - ${t("pages.not-found")}`,(r=document.querySelector('meta[name="description"]'))==null||r.setAttribute("content",t("description.base"))},[t]),e.jsxs(l,{maxWidth:"xl",sx:{height:"100%",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},children:[e.jsx(n,{variant:"h1",sx:{textAlign:"center",fontSize:{xs:"2rem",sm:"2rem",md:"4rem",lg:"4rem",xl:"4rem"}},children:"404 Not Found"}),e.jsxs(n,{variant:"caption",sx:{textAlign:"center"},children:["Location Path: ",e.jsx("span",{style:{textDecoration:"underline"},children:decodeURI(o.pathname+o.search)})]}),e.jsxs(n,{variant:"overline",sx:{textAlign:"center"},children:["Back To ",e.jsx(m,{to:"/",component:c,children:"Home"})]})]})}export{h as default};
