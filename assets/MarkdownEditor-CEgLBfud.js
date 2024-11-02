import{m as A,s as W,t as b,G as ce,H as de,r as x,N as pe,a2 as oe,j as r,i as N,z as f,l as q,x as ae,y as ie,v as $,w as Y,C as ne,a3 as ue,T as _,J as ee,D as he,E as me,c as fe,d as ge,B as U,e as O,$ as te,a0 as xe,W as be}from"./index-BftqKwOi.js";import{p as ve,M as ke}from"./Markdown-C1UyCq5f.js";import{M as we}from"./MessageBox-CO6Oyjq5.js";import{C as ye}from"./Link-LBOt-UaF.js";import{S as re,T as Ce}from"./TextField-C87DL8eF.js";import{u as Se,A as se}from"./Alert-DLzT-3Kd.js";import"./dividerClasses-Bhph7Br7.js";import"./Dialog-DWxx_Qhu.js";import"./useThemeProps-D8HVhG40.js";function $e(e){return A("PrivateSwitchBase",e)}W("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const je=e=>{const{classes:t,checked:s,disabled:a,edge:i}=e,n={root:["root",s&&"checked",a&&"disabled",i&&`edge${f(i)}`],input:["input"]};return q(n,$e,t)},Pe=b(ce)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:e,ownerState:t})=>e==="start"&&t.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:e,ownerState:t})=>e==="end"&&t.size!=="small",style:{marginRight:-12}}]}),Re=b("input",{shouldForwardProp:de})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),Be=x.forwardRef(function(t,s){const{autoFocus:a,checked:i,checkedIcon:n,className:p,defaultChecked:l,disabled:g,disableFocusRipple:u=!1,edge:c=!1,icon:o,id:h,inputProps:m,inputRef:M,name:j,onBlur:P,onChange:R,onFocus:F,readOnly:G,required:z=!1,tabIndex:E,type:y,value:I,...H}=t,[B,D]=pe({controlled:i,default:!!l,name:"SwitchBase",state:"checked"}),v=oe(),K=w=>{F&&F(w),v&&v.onFocus&&v.onFocus(w)},L=w=>{P&&P(w),v&&v.onBlur&&v.onBlur(w)},C=w=>{if(w.nativeEvent.defaultPrevented)return;const Q=w.target.checked;D(Q),R&&R(w,Q)};let k=g;v&&typeof k>"u"&&(k=v.disabled);const le=y==="checkbox"||y==="radio",V={...t,checked:B,disabled:k,disableFocusRipple:u,edge:c},Z=je(V);return r.jsxs(Pe,{component:"span",className:N(Z.root,p),centerRipple:!0,focusRipple:!u,disabled:k,tabIndex:null,role:void 0,onFocus:K,onBlur:L,ownerState:V,ref:s,...H,children:[r.jsx(Re,{autoFocus:a,checked:i,defaultChecked:l,className:Z.input,disabled:k,id:le?h:void 0,name:j,onChange:C,readOnly:G,ref:M,required:z,ownerState:V,tabIndex:E,type:y,...y==="checkbox"&&I===void 0?{}:{value:I},...m}),B?n:o]})});function Me(e){return A("MuiCircularProgress",e)}W("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const S=44,X=ae`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,J=ae`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,Fe=typeof X!="string"?ie`
        animation: ${X} 1.4s linear infinite;
      `:null,ze=typeof J!="string"?ie`
        animation: ${J} 1.4s ease-in-out infinite;
      `:null,Le=e=>{const{classes:t,variant:s,color:a,disableShrink:i}=e,n={root:["root",s,`color${f(a)}`],svg:["svg"],circle:["circle",`circle${f(s)}`,i&&"circleDisableShrink"]};return q(n,Me,t)},Ie=b("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,t[s.variant],t[`color${f(s.color)}`]]}})($(({theme:e})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("transform")}},{props:{variant:"indeterminate"},style:Fe||{animation:`${X} 1.4s linear infinite`}},...Object.entries(e.palette).filter(ne()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),De=b("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),Te=b("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.circle,t[`circle${f(s.variant)}`],s.disableShrink&&t.circleDisableShrink]}})($(({theme:e})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:e.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:t})=>t.variant==="indeterminate"&&!t.disableShrink,style:ze||{animation:`${J} 1.4s ease-in-out infinite`}}]}))),Ne=x.forwardRef(function(t,s){const a=Y({props:t,name:"MuiCircularProgress"}),{className:i,color:n="primary",disableShrink:p=!1,size:l=40,style:g,thickness:u=3.6,value:c=0,variant:o="indeterminate",...h}=a,m={...a,color:n,disableShrink:p,size:l,thickness:u,value:c,variant:o},M=Le(m),j={},P={},R={};if(o==="determinate"){const F=2*Math.PI*((S-u)/2);j.strokeDasharray=F.toFixed(3),R["aria-valuenow"]=Math.round(c),j.strokeDashoffset=`${((100-c)/100*F).toFixed(3)}px`,P.transform="rotate(-90deg)"}return r.jsx(Ie,{className:N(M.root,i),style:{width:l,height:l,...P,...g},ownerState:m,ref:s,role:"progressbar",...R,...h,children:r.jsx(De,{className:M.svg,ownerState:m,viewBox:`${S/2} ${S/2} ${S} ${S}`,children:r.jsx(Te,{className:M.circle,style:j,ownerState:m,cx:S,cy:S,r:(S-u)/2,fill:"none",strokeWidth:u})})})});function Ee(e){return A("MuiFormControlLabel",e)}const T=W("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),Ue=e=>{const{classes:t,disabled:s,labelPlacement:a,error:i,required:n}=e,p={root:["root",s&&"disabled",`labelPlacement${f(a)}`,i&&"error",n&&"required"],label:["label",s&&"disabled"],asterisk:["asterisk",i&&"error"]};return q(p,Ee,t)},Oe=b("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[{[`& .${T.label}`]:t.label},t.root,t[`labelPlacement${f(s.labelPlacement)}`]]}})($(({theme:e})=>({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${T.disabled}`]:{cursor:"default"},[`& .${T.label}`]:{[`&.${T.disabled}`]:{color:(e.vars||e).palette.text.disabled}},variants:[{props:{labelPlacement:"start"},style:{flexDirection:"row-reverse",marginRight:-11}},{props:{labelPlacement:"top"},style:{flexDirection:"column-reverse"}},{props:{labelPlacement:"bottom"},style:{flexDirection:"column"}},{props:({labelPlacement:t})=>t==="start"||t==="top"||t==="bottom",style:{marginLeft:16}}]}))),Ae=b("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,t)=>t.asterisk})($(({theme:e})=>({[`&.${T.error}`]:{color:(e.vars||e).palette.error.main}}))),We=x.forwardRef(function(t,s){const a=Y({props:t,name:"MuiFormControlLabel"}),{checked:i,className:n,componentsProps:p={},control:l,disabled:g,disableTypography:u,inputRef:c,label:o,labelPlacement:h="end",name:m,onChange:M,required:j,slots:P={},slotProps:R={},value:F,...G}=a,z=oe(),E=g??l.props.disabled??(z==null?void 0:z.disabled),y=j??l.props.required,I={disabled:E,required:y};["checked","name","onChange","value","inputRef"].forEach(k=>{typeof l.props[k]>"u"&&typeof a[k]<"u"&&(I[k]=a[k])});const H=ue({props:a,muiFormControl:z,states:["error"]}),B={...a,disabled:E,labelPlacement:h,required:y,error:H.error},D=Ue(B),v={slots:P,slotProps:{...p,...R}},[K,L]=Se("typography",{elementType:_,externalForwardedProps:v,ownerState:B});let C=o;return C!=null&&C.type!==_&&!u&&(C=r.jsx(K,{component:"span",...L,className:N(D.label,L==null?void 0:L.className),children:C})),r.jsxs(Oe,{className:N(D.root,n),ownerState:B,ref:s,...G,children:[x.cloneElement(l,I),y?r.jsxs("div",{children:[C,r.jsxs(Ae,{ownerState:B,"aria-hidden":!0,className:D.asterisk,children:[" ","*"]})]}):C]})});function qe(e){return A("MuiSwitch",e)}const d=W("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),Ge=e=>{const{classes:t,edge:s,size:a,color:i,checked:n,disabled:p}=e,l={root:["root",s&&`edge${f(s)}`,`size${f(a)}`],switchBase:["switchBase",`color${f(i)}`,n&&"checked",p&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},g=q(l,qe,t);return{...t,...g}},He=b("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,s.edge&&t[`edge${f(s.edge)}`],t[`size${f(s.size)}`]]}})({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${d.thumb}`]:{width:16,height:16},[`& .${d.switchBase}`]:{padding:4,[`&.${d.checked}`]:{transform:"translateX(16px)"}}}}]}),Ke=b(Be,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.switchBase,{[`& .${d.input}`]:t.input},s.color!=="default"&&t[`color${f(s.color)}`]]}})($(({theme:e})=>({position:"absolute",top:0,left:0,zIndex:1,color:e.vars?e.vars.palette.Switch.defaultColor:`${e.palette.mode==="light"?e.palette.common.white:e.palette.grey[300]}`,transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),[`&.${d.checked}`]:{transform:"translateX(20px)"},[`&.${d.disabled}`]:{color:e.vars?e.vars.palette.Switch.defaultDisabledColor:`${e.palette.mode==="light"?e.palette.grey[100]:e.palette.grey[600]}`},[`&.${d.checked} + .${d.track}`]:{opacity:.5},[`&.${d.disabled} + .${d.track}`]:{opacity:e.vars?e.vars.opacity.switchTrackDisabled:`${e.palette.mode==="light"?.12:.2}`},[`& .${d.input}`]:{left:"-100%",width:"300%"}})),$(({theme:e})=>({"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:ee(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(e.palette).filter(ne(["light"])).map(([t])=>({props:{color:t},style:{[`&.${d.checked}`]:{color:(e.vars||e).palette[t].main,"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:ee(e.palette[t].main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${d.disabled}`]:{color:e.vars?e.vars.palette.Switch[`${t}DisabledColor`]:`${e.palette.mode==="light"?he(e.palette[t].main,.62):me(e.palette[t].main,.55)}`}},[`&.${d.checked} + .${d.track}`]:{backgroundColor:(e.vars||e).palette[t].main}}}))]}))),Ve=b("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(e,t)=>t.track})($(({theme:e})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:e.vars?e.vars.palette.common.onBackground:`${e.palette.mode==="light"?e.palette.common.black:e.palette.common.white}`,opacity:e.vars?e.vars.opacity.switchTrack:`${e.palette.mode==="light"?.38:.3}`}))),Xe=b("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(e,t)=>t.thumb})($(({theme:e})=>({boxShadow:(e.vars||e).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),Je=x.forwardRef(function(t,s){const a=Y({props:t,name:"MuiSwitch"}),{className:i,color:n="primary",edge:p=!1,size:l="medium",sx:g,...u}=a,c={...a,color:n,edge:p,size:l},o=Ge(c),h=r.jsx(Xe,{className:o.thumb,ownerState:c});return r.jsxs(He,{className:N(o.root,i),sx:g,ownerState:c,children:[r.jsx(Ke,{type:"checkbox",icon:h,checkedIcon:h,ref:s,ownerState:c,...u,classes:{...o,root:o.switchBase}}),r.jsx(Ve,{className:o.track,ownerState:c})]})}),Ye=fe(r.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 17h-2v-2h2zm2.07-7.75-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25"}),"Help");function it(){const{t:e}=ge(),[t,s]=x.useState(""),[a,i]=x.useState(""),[n,p]=x.useState(!0),[l,g]=x.useState(!1),[u,c]=x.useState(!1);return x.useEffect(()=>{n&&i(t)},[t]),r.jsxs(ye,{maxWidth:"xl",sx:{width:"100%",height:"100%",paddingY:2,gap:2,flexWrap:"wrap"},children:[r.jsxs(U,{sx:{display:"flex",flexGrow:1,gap:2,alignContent:"center",flexWrap:"wrap"},children:[r.jsxs(re,{spacing:2,sx:{flexGrow:1,flexShrink:1,flexBasis:1,minWidth:"300px"},children:[r.jsxs(U,{display:"flex",gap:2,children:[r.jsxs(O,{variant:"contained",component:"label",children:[e("common.open"),r.jsx("input",{type:"file",accept:".md",style:{clip:"rect(0 0 0 0)",clipPath:"inset(50%)",width:0,height:0},onChange:async o=>{if(o.target.files&&o.target.files.length>0){const h=o.target.files[0];s(await h.text()),o.target.value=""}}})]}),r.jsx(O,{variant:"contained",onClick:()=>{const o=new Blob([t],{type:"text/plain"}),h=URL.createObjectURL(o),m=document.createElement("a");m.href=h,m.download="file.md",document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(h)},children:e("common.save")}),r.jsx(U,{flexGrow:1}),r.jsx(We,{label:e("markdown-editor.auto-refresh"),control:r.jsx(te,{arrow:!0,title:e("markdown-editor.lag-warning"),children:r.jsx(Je,{checked:n,onChange:o=>p(o.target.checked)})})})]}),r.jsxs(se,{severity:"info",children:[" ",e("markdown-editor.edit")," "]}),r.jsx(Ce,{multiline:!0,fullWidth:!0,value:t,onChange:o=>s(o.target.value)})]}),r.jsxs(re,{spacing:2,sx:{flexGrow:1,flexShrink:1,flexBasis:1,minWidth:"300px"},children:[r.jsxs(U,{display:"flex",gap:2,children:[r.jsx(O,{variant:"contained",onClick:()=>{i(t)},children:e("common.refresh")}),r.jsx(O,{disabled:typeof window.print!="function",variant:"contained",startIcon:u&&r.jsx(Ne,{size:"16px",color:"inherit"}),onClick:()=>{const o=document.getElementById("iframe-to-export");c(!0),ve(a,o).finally(()=>{c(!1)})},children:e("common.export")}),r.jsx(te,{arrow:!0,title:e("markdown-editor.info"),children:r.jsx(xe,{onClick:()=>g(!0),children:r.jsx(Ye,{})})})]}),r.jsxs(se,{severity:"info",children:[" ",e("markdown-editor.preview")," "]}),r.jsx(be,{sx:{flexGrow:1,flexShrink:1,flexBasis:1,minWidth:"200px",whiteSpace:"wrap",px:1},square:!0,children:r.jsx(ke,{text:a,forceRefresh:!0})})]})]}),r.jsx("iframe",{id:"iframe-to-export",style:{display:"none"}}),r.jsx(we,{open:l,severity:"info",onClose:()=>g(!1),title:e("common.notice"),content:e("markdown-editor.info")})]})}export{it as default};