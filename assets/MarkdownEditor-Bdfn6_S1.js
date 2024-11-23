import{c as W,g as G,s as C,A as ae,C as re,r as h,K as se,a3 as ee,j as o,e as E,v as x,f as H,p as B,d as te,a4 as ie,T as Y,G as Z,x as ne,y as le,z as ce,u as de,B as I,k as T,Z as J,I as pe,P as ue}from"./index-4chPmM9C.js";import{p as he,M as me}from"./Markdown-8lSB3uPJ.js";import{H as fe}from"./Help-Bnl1Kwbs.js";import{M as ge}from"./MessageBox-DXDqoKa-.js";import{H as be}from"./HighlightEditor-1CUIzYVt.js";import{C as xe}from"./Container-C8SHZo0h.js";import{S as Q}from"./Stack-B4-VCkfS.js";import{u as we}from"./useSlot-DekJVIgz.js";import{A as _}from"./Alert-ChjVyBz8.js";import{C as ke}from"./CircularProgress-BD09Ye-d.js";import"./index-B6cx8Fi-.js";import"./Chip-MrnrkyWL.js";import"./Link-XYSd53nS.js";import"./Divider-CQkEIGcn.js";import"./dividerClasses-D1NAiJjn.js";import"./TableRow-CIv-1fwP.js";import"./Dialog-CEoRn2cJ.js";import"./Modal-Ct_31Wfa.js";import"./AlertTitle-N7IIYitW.js";import"./useThemeProps-CkKX_7KJ.js";import"./Close-DnDzb1N-.js";function ve(e){return W("PrivateSwitchBase",e)}G("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const ye=e=>{const{classes:t,checked:a,disabled:s,edge:i}=e,l={root:["root",a&&"checked",s&&"disabled",i&&`edge${x(i)}`],input:["input"]};return H(l,ve,t)},Ce=C(ae)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:e,ownerState:t})=>e==="start"&&t.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:e,ownerState:t})=>e==="end"&&t.size!=="small",style:{marginRight:-12}}]}),Se=C("input",{shouldForwardProp:re})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),$e=h.forwardRef(function(t,a){const{autoFocus:s,checked:i,checkedIcon:l,className:d,defaultChecked:c,disabled:m,disableFocusRipple:w=!1,edge:p=!1,icon:r,id:u,inputProps:k,inputRef:X,name:N,onBlur:M,onChange:z,onFocus:U,readOnly:q,required:$=!1,tabIndex:L,type:v,value:R,...A}=t,[S,P]=se({controlled:i,default:!!c,name:"SwitchBase",state:"checked"}),f=ee(),O=b=>{U&&U(b),f&&f.onFocus&&f.onFocus(b)},j=b=>{M&&M(b),f&&f.onBlur&&f.onBlur(b)},y=b=>{if(b.nativeEvent.defaultPrevented)return;const V=b.target.checked;P(V),z&&z(b,V)};let g=m;f&&typeof g>"u"&&(g=f.disabled);const oe=v==="checkbox"||v==="radio",D={...t,checked:S,disabled:g,disableFocusRipple:w,edge:p},K=ye(D);return o.jsxs(Ce,{component:"span",className:E(K.root,d),centerRipple:!0,focusRipple:!w,disabled:g,tabIndex:null,role:void 0,onFocus:O,onBlur:j,ownerState:D,ref:a,...A,children:[o.jsx(Se,{autoFocus:s,checked:i,defaultChecked:c,className:K.input,disabled:g,id:oe?u:void 0,name:N,onChange:y,readOnly:q,ref:X,required:$,ownerState:D,tabIndex:L,type:v,...v==="checkbox"&&R===void 0?{}:{value:R},...k}),S?l:r]})});function je(e){return W("MuiFormControlLabel",e)}const F=G("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),Be=e=>{const{classes:t,disabled:a,labelPlacement:s,error:i,required:l}=e,d={root:["root",a&&"disabled",`labelPlacement${x(s)}`,i&&"error",l&&"required"],label:["label",a&&"disabled"],asterisk:["asterisk",i&&"error"]};return H(d,je,t)},Re=C("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[{[`& .${F.label}`]:t.label},t.root,t[`labelPlacement${x(a.labelPlacement)}`]]}})(B(({theme:e})=>({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${F.disabled}`]:{cursor:"default"},[`& .${F.label}`]:{[`&.${F.disabled}`]:{color:(e.vars||e).palette.text.disabled}},variants:[{props:{labelPlacement:"start"},style:{flexDirection:"row-reverse",marginRight:-11}},{props:{labelPlacement:"top"},style:{flexDirection:"column-reverse"}},{props:{labelPlacement:"bottom"},style:{flexDirection:"column"}},{props:({labelPlacement:t})=>t==="start"||t==="top"||t==="bottom",style:{marginLeft:16}}]}))),Pe=C("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,t)=>t.asterisk})(B(({theme:e})=>({[`&.${F.error}`]:{color:(e.vars||e).palette.error.main}}))),Fe=h.forwardRef(function(t,a){const s=te({props:t,name:"MuiFormControlLabel"}),{checked:i,className:l,componentsProps:d={},control:c,disabled:m,disableTypography:w,inputRef:p,label:r,labelPlacement:u="end",name:k,onChange:X,required:N,slots:M={},slotProps:z={},value:U,...q}=s,$=ee(),L=m??c.props.disabled??($==null?void 0:$.disabled),v=N??c.props.required,R={disabled:L,required:v};["checked","name","onChange","value","inputRef"].forEach(g=>{typeof c.props[g]>"u"&&typeof s[g]<"u"&&(R[g]=s[g])});const A=ie({props:s,muiFormControl:$,states:["error"]}),S={...s,disabled:L,labelPlacement:u,required:v,error:A.error},P=Be(S),f={slots:M,slotProps:{...d,...z}},[O,j]=we("typography",{elementType:Y,externalForwardedProps:f,ownerState:S});let y=r;return y!=null&&y.type!==Y&&!w&&(y=o.jsx(O,{component:"span",...j,className:E(P.label,j==null?void 0:j.className),children:y})),o.jsxs(Re,{className:E(P.root,l),ownerState:S,ref:a,...q,children:[h.cloneElement(c,R),v?o.jsxs("div",{children:[y,o.jsxs(Pe,{ownerState:S,"aria-hidden":!0,className:P.asterisk,children:[" ","*"]})]}):y]})});function Me(e){return W("MuiSwitch",e)}const n=G("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),ze=e=>{const{classes:t,edge:a,size:s,color:i,checked:l,disabled:d}=e,c={root:["root",a&&`edge${x(a)}`,`size${x(s)}`],switchBase:["switchBase",`color${x(i)}`,l&&"checked",d&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},m=H(c,Me,t);return{...t,...m}},Le=C("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.edge&&t[`edge${x(a.edge)}`],t[`size${x(a.size)}`]]}})({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${n.thumb}`]:{width:16,height:16},[`& .${n.switchBase}`]:{padding:4,[`&.${n.checked}`]:{transform:"translateX(16px)"}}}}]}),Ie=C($e,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.switchBase,{[`& .${n.input}`]:t.input},a.color!=="default"&&t[`color${x(a.color)}`]]}})(B(({theme:e})=>({position:"absolute",top:0,left:0,zIndex:1,color:e.vars?e.vars.palette.Switch.defaultColor:`${e.palette.mode==="light"?e.palette.common.white:e.palette.grey[300]}`,transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),[`&.${n.checked}`]:{transform:"translateX(20px)"},[`&.${n.disabled}`]:{color:e.vars?e.vars.palette.Switch.defaultDisabledColor:`${e.palette.mode==="light"?e.palette.grey[100]:e.palette.grey[600]}`},[`&.${n.checked} + .${n.track}`]:{opacity:.5},[`&.${n.disabled} + .${n.track}`]:{opacity:e.vars?e.vars.opacity.switchTrackDisabled:`${e.palette.mode==="light"?.12:.2}`},[`& .${n.input}`]:{left:"-100%",width:"300%"}})),B(({theme:e})=>({"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:Z(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(e.palette).filter(ne(["light"])).map(([t])=>({props:{color:t},style:{[`&.${n.checked}`]:{color:(e.vars||e).palette[t].main,"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:Z(e.palette[t].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${n.disabled}`]:{color:e.vars?e.vars.palette.Switch[`${t}DisabledColor`]:`${e.palette.mode==="light"?le(e.palette[t].main,.62):ce(e.palette[t].main,.55)}`}},[`&.${n.checked} + .${n.track}`]:{backgroundColor:(e.vars||e).palette[t].main}}}))]}))),Te=C("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,t)=>t.track})(B(({theme:e})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:e.vars?e.vars.palette.common.onBackground:`${e.palette.mode==="light"?e.palette.common.black:e.palette.common.white}`,opacity:e.vars?e.vars.opacity.switchTrack:`${e.palette.mode==="light"?.38:.3}`}))),Ee=C("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,t)=>t.thumb})(B(({theme:e})=>({boxShadow:(e.vars||e).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),Ne=h.forwardRef(function(t,a){const s=te({props:t,name:"MuiSwitch"}),{className:i,color:l="primary",edge:d=!1,size:c="medium",sx:m,...w}=s,p={...s,color:l,edge:d,size:c},r=ze(p),u=o.jsx(Ee,{className:r.thumb,ownerState:p});return o.jsxs(Le,{className:E(r.root,i),sx:m,ownerState:p,children:[o.jsx(Ie,{type:"checkbox",icon:u,checkedIcon:u,ref:a,ownerState:p,...w,classes:{...r,root:r.switchBase}}),o.jsx(Te,{className:r.track,ownerState:p})]})});function st(){const{t:e}=de(),[t,a]=h.useState(""),[s,i]=h.useState(""),[l,d]=h.useState(!0),[c,m]=h.useState(!1),[w,p]=h.useState(!1);return h.useEffect(()=>{var r;document.title=`${e("title")} - ${e("pages.markdown-editor")}`,(r=document.querySelector('meta[name="description"]'))==null||r.setAttribute("content",e("description.markdown-editor"))},[e]),h.useEffect(()=>{l&&i(t)},[t]),o.jsxs(xe,{maxWidth:"xl",sx:{width:"100%",height:"100%",paddingY:2,gap:2,flexWrap:"wrap"},children:[o.jsxs(I,{sx:{display:"flex",flexGrow:1,gap:2,alignContent:"center",flexWrap:"wrap"},children:[o.jsxs(Q,{spacing:2,sx:{flexGrow:1,flexShrink:1,flexBasis:1,minWidth:"300px"},children:[o.jsxs(I,{display:"flex",gap:2,children:[o.jsxs(T,{variant:"contained",component:"label",children:[e("common.open"),o.jsx("input",{type:"file",accept:".md",style:{clip:"rect(0 0 0 0)",clipPath:"inset(50%)",width:0,height:0},onChange:async r=>{if(r.target.files&&r.target.files.length>0){const u=r.target.files[0];a(await u.text()),r.target.value=""}}})]}),o.jsx(T,{variant:"contained",onClick:()=>{const r=new Blob([t],{type:"text/plain"}),u=URL.createObjectURL(r),k=document.createElement("a");k.href=u,k.download="file.md",document.body.appendChild(k),k.click(),document.body.removeChild(k),URL.revokeObjectURL(u)},children:e("common.save")}),o.jsx(I,{flexGrow:1}),o.jsx(Fe,{label:e("markdown-editor.auto-refresh"),control:o.jsx(J,{arrow:!0,title:e("markdown-editor.lag-warning"),children:o.jsx(Ne,{checked:l,onChange:r=>d(r.target.checked)})})})]}),o.jsxs(_,{severity:"info",children:[" ",e("markdown-editor.edit")," "]}),o.jsx(be,{language:"markdown",text:t,onChange:r=>a(r)})]}),o.jsxs(Q,{spacing:2,sx:{flexGrow:1,flexShrink:1,flexBasis:1,minWidth:"300px"},children:[o.jsxs(I,{display:"flex",gap:2,children:[o.jsx(T,{variant:"contained",onClick:()=>{i(t)},children:e("common.refresh")}),o.jsx(T,{disabled:typeof window.print!="function",variant:"contained",startIcon:w&&o.jsx(ke,{size:"16px",color:"inherit"}),onClick:()=>{const r=document.getElementById("iframe-to-export");p(!0),he(s,r).finally(()=>{p(!1)})},children:e("common.export")}),o.jsx(J,{arrow:!0,title:e("markdown-editor.info"),children:o.jsx(pe,{onClick:()=>m(!0),children:o.jsx(fe,{})})})]}),o.jsxs(_,{severity:"info",children:[" ",e("markdown-editor.preview")," "]}),o.jsx(ue,{sx:{flexGrow:1,flexShrink:1,flexBasis:1,minWidth:"200px",whiteSpace:"wrap",px:1},square:!0,children:o.jsx(me,{text:s,forceRefresh:!0})})]})]}),o.jsx("iframe",{id:"iframe-to-export",style:{display:"none"}}),o.jsx(ge,{open:c,severity:"info",onClose:()=>m(!1),title:e("common.notice"),content:e("markdown-editor.info")})]})}export{st as default};
