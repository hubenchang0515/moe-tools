import{$ as T,ab as v,ac as u,ad as V,ae as b,af as B,r as p,a1 as D,j as F,e as M,f as $,c as E,ag as k,s as G}from"./index-DaGj_kTK.js";import{s as N,u as O,a as U}from"./useThemeProps-JxI2aYIG.js";const A=T(),I=N("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,s)=>s.root});function L(e){return O({props:e,name:"MuiStack",defaultTheme:A})}function q(e,s){const n=p.Children.toArray(e).filter(Boolean);return n.reduce((a,c,t)=>(a.push(c),t<n.length-1&&a.push(p.cloneElement(s,{key:`separator-${t}`})),a),[])}const z=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],H=({ownerState:e,theme:s})=>{let n={display:"flex",flexDirection:"column",...v({theme:s},u({values:e.direction,breakpoints:s.breakpoints.values}),a=>({flexDirection:a}))};if(e.spacing){const a=V(s),c=Object.keys(s.breakpoints.values).reduce((o,r)=>((typeof e.spacing=="object"&&e.spacing[r]!=null||typeof e.direction=="object"&&e.direction[r]!=null)&&(o[r]=!0),o),{}),t=u({values:e.direction,base:c}),d=u({values:e.spacing,base:c});typeof t=="object"&&Object.keys(t).forEach((o,r,i)=>{if(!t[o]){const l=r>0?t[i[r-1]]:"column";t[o]=l}}),n=b(n,v({theme:s},d,(o,r)=>e.useFlexGap?{gap:k(a,o)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${z(r?t[r]:e.direction)}`]:k(a,o)}}))}return n=B(s.breakpoints,n),n};function J(e={}){const{createStyledComponent:s=I,useThemeProps:n=L,componentName:a="MuiStack"}=e,c=()=>$({root:["root"]},o=>E(a,o),{}),t=s(H);return p.forwardRef(function(o,r){const i=n(o),f=D(i),{component:l="div",direction:h="column",spacing:x=0,divider:y,children:g,className:j,useFlexGap:C=!1,...P}=f,S={direction:h,spacing:x,useFlexGap:C},R=c();return F.jsx(t,{as:l,ownerState:S,ref:r,className:M(R.root,j),...P,children:y?q(g,y):g})})}const W=J({createStyledComponent:G("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,s)=>s.root}),useThemeProps:e=>U({props:e,name:"MuiStack"})});export{W as S};
