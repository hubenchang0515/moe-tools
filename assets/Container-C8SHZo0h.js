import{$ as h,v as c,r as W,j as v,e as k,f as R,c as $,s as G}from"./index-4chPmM9C.js";import{s as T,u as M,a as P}from"./useThemeProps-CkKX_7KJ.js";const S=h(),j=T("div",{name:"MuiContainer",slot:"Root",overridesResolver:(a,s)=>{const{ownerState:o}=a;return[s.root,s[`maxWidth${c(String(o.maxWidth))}`],o.fixed&&s.fixed,o.disableGutters&&s.disableGutters]}}),y=a=>M({props:a,name:"MuiContainer",defaultTheme:S}),L=(a,s)=>{const o=i=>$(s,i),{classes:p,fixed:u,disableGutters:l,maxWidth:t}=a,e={root:["root",t&&`maxWidth${c(String(t))}`,u&&"fixed",l&&"disableGutters"]};return R(e,o,p)};function N(a={}){const{createStyledComponent:s=j,useThemeProps:o=y,componentName:p="MuiContainer"}=a,u=s(({theme:t,ownerState:e})=>({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",...!e.disableGutters&&{paddingLeft:t.spacing(2),paddingRight:t.spacing(2),[t.breakpoints.up("sm")]:{paddingLeft:t.spacing(3),paddingRight:t.spacing(3)}}}),({theme:t,ownerState:e})=>e.fixed&&Object.keys(t.breakpoints.values).reduce((i,r)=>{const d=r,n=t.breakpoints.values[d];return n!==0&&(i[t.breakpoints.up(d)]={maxWidth:`${n}${t.breakpoints.unit}`}),i},{}),({theme:t,ownerState:e})=>({...e.maxWidth==="xs"&&{[t.breakpoints.up("xs")]:{maxWidth:Math.max(t.breakpoints.values.xs,444)}},...e.maxWidth&&e.maxWidth!=="xs"&&{[t.breakpoints.up(e.maxWidth)]:{maxWidth:`${t.breakpoints.values[e.maxWidth]}${t.breakpoints.unit}`}}}));return W.forwardRef(function(e,i){const r=o(e),{className:d,component:n="div",disableGutters:m=!1,fixed:f=!1,maxWidth:b="lg",classes:U,...C}=r,x={...r,component:n,disableGutters:m,fixed:f,maxWidth:b},g=L(x,p);return v.jsx(u,{as:n,ownerState:x,className:k(g.root,d),ref:i,...C})})}const w=N({createStyledComponent:G("div",{name:"MuiContainer",slot:"Root",overridesResolver:(a,s)=>{const{ownerState:o}=a;return[s.root,s[`maxWidth${c(String(o.maxWidth))}`],o.fixed&&s.fixed,o.disableGutters&&s.disableGutters]}}),useThemeProps:a=>P({props:a,name:"MuiContainer"})});export{w as C};