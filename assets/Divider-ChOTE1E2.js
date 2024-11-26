import{s as f,p as b,r as y,d as A,j as g,e as D,f as R,G as C}from"./index-OMC2sU8i.js";import{g as L}from"./dividerClasses-_aQeWJJF.js";const S=i=>{const{absolute:t,children:r,classes:n,flexItem:s,light:l,orientation:e,textAlign:o,variant:a}=i;return R({root:["root",t&&"absolute",a,l&&"light",e==="vertical"&&"vertical",s&&"flexItem",r&&"withChildren",r&&e==="vertical"&&"withChildrenVertical",o==="right"&&e!=="vertical"&&"textAlignRight",o==="left"&&e!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",e==="vertical"&&"wrapperVertical"]},L,n)},W=f("div",{name:"MuiDivider",slot:"Root",overridesResolver:(i,t)=>{const{ownerState:r}=i;return[t.root,r.absolute&&t.absolute,t[r.variant],r.light&&t.light,r.orientation==="vertical"&&t.vertical,r.flexItem&&t.flexItem,r.children&&t.withChildren,r.children&&r.orientation==="vertical"&&t.withChildrenVertical,r.textAlign==="right"&&r.orientation!=="vertical"&&t.textAlignRight,r.textAlign==="left"&&r.orientation!=="vertical"&&t.textAlignLeft]}})(b(({theme:i})=>({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(i.vars||i).palette.divider,borderBottomWidth:"thin",variants:[{props:{absolute:!0},style:{position:"absolute",bottom:0,left:0,width:"100%"}},{props:{light:!0},style:{borderColor:i.vars?`rgba(${i.vars.palette.dividerChannel} / 0.08)`:C(i.palette.divider,.08)}},{props:{variant:"inset"},style:{marginLeft:72}},{props:{variant:"middle",orientation:"horizontal"},style:{marginLeft:i.spacing(2),marginRight:i.spacing(2)}},{props:{variant:"middle",orientation:"vertical"},style:{marginTop:i.spacing(1),marginBottom:i.spacing(1)}},{props:{orientation:"vertical"},style:{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"}},{props:{flexItem:!0},style:{alignSelf:"stretch",height:"auto"}},{props:({ownerState:t})=>!!t.children,style:{display:"flex",whiteSpace:"nowrap",textAlign:"center",border:0,borderTopStyle:"solid",borderLeftStyle:"solid","&::before, &::after":{content:'""',alignSelf:"center"}}},{props:({ownerState:t})=>t.children&&t.orientation!=="vertical",style:{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(i.vars||i).palette.divider}`,borderTopStyle:"inherit"}}},{props:({ownerState:t})=>t.orientation==="vertical"&&t.children,style:{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(i.vars||i).palette.divider}`,borderLeftStyle:"inherit"}}},{props:({ownerState:t})=>t.textAlign==="right"&&t.orientation!=="vertical",style:{"&::before":{width:"90%"},"&::after":{width:"10%"}}},{props:({ownerState:t})=>t.textAlign==="left"&&t.orientation!=="vertical",style:{"&::before":{width:"10%"},"&::after":{width:"90%"}}}]}))),$=f("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(i,t)=>{const{ownerState:r}=i;return[t.wrapper,r.orientation==="vertical"&&t.wrapperVertical]}})(b(({theme:i})=>({display:"inline-block",paddingLeft:`calc(${i.spacing(1)} * 1.2)`,paddingRight:`calc(${i.spacing(1)} * 1.2)`,variants:[{props:{orientation:"vertical"},style:{paddingTop:`calc(${i.spacing(1)} * 1.2)`,paddingBottom:`calc(${i.spacing(1)} * 1.2)`}}]}))),h=y.forwardRef(function(t,r){const n=A({props:t,name:"MuiDivider"}),{absolute:s=!1,children:l,className:e,orientation:o="horizontal",component:a=l||o==="vertical"?"div":"hr",flexItem:c=!1,light:u=!1,role:p=a!=="hr"?"separator":void 0,textAlign:x="center",variant:m="fullWidth",...w}=n,d={...n,absolute:s,component:a,flexItem:c,light:u,orientation:o,role:p,textAlign:x,variant:m},v=S(d);return g.jsx(W,{as:a,className:D(v.root,e),role:p,ref:r,ownerState:d,"aria-orientation":p==="separator"&&(a!=="hr"||o==="vertical")?o:void 0,...w,children:l?g.jsx($,{className:v.wrapper,ownerState:d,children:l}):null})});h&&(h.muiSkipListHighlight=!0);export{h as D};