import{r as u,b as pe,n as J,o as fe,j as M,at as Te,au as Pe,av as ae,s as _,m as ee,t as L,w as te,i as $,l as ne,ak as G,q as K,p as le,P as Se,v as me,aw as Ce,z as U,W as he,ao as we}from"./index-BWtQfFBG.js";import{u as V}from"./Alert-ByE0Lq3o.js";function ce(...e){return e.reduce((t,o)=>o==null?t:function(...s){t.apply(this,s),o.apply(this,s)},()=>{})}function Me(e=window){const t=e.document.documentElement.clientWidth;return e.innerWidth-t}const Ie={entering:{opacity:1},entered:{opacity:1}},be=u.forwardRef(function(t,o){const n=pe(),s={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{addEndListener:r,appear:i=!0,children:a,easing:p,in:x,onEnter:P,onEntered:g,onEntering:E,onExit:h,onExited:f,onExiting:I,style:y,timeout:v=s,TransitionComponent:k=Te,...l}=t,m=u.useRef(null),S=J(m,fe(a),o),R=b=>c=>{if(b){const d=m.current;c===void 0?b(d):b(d,c)}},T=R(E),C=R((b,c)=>{Pe(b);const d=ae({style:y,timeout:v,easing:p},{mode:"enter"});b.style.webkitTransition=n.transitions.create("opacity",d),b.style.transition=n.transitions.create("opacity",d),P&&P(b,c)}),w=R(g),F=R(I),N=R(b=>{const c=ae({style:y,timeout:v,easing:p},{mode:"exit"});b.style.webkitTransition=n.transitions.create("opacity",c),b.style.transition=n.transitions.create("opacity",c),h&&h(b)}),W=R(f),A=b=>{r&&r(m.current,b)};return M.jsx(k,{appear:i,in:x,nodeRef:m,onEnter:C,onEntered:w,onEntering:T,onExit:N,onExited:W,onExiting:F,addEndListener:A,timeout:v,...l,children:(b,c)=>u.cloneElement(a,{style:{opacity:0,visibility:b==="exited"&&!x?"hidden":void 0,...Ie[b],...y,...a.props.style},ref:S,...c})})});function Ne(e){return ee("MuiBackdrop",e)}_("MuiBackdrop",["root","invisible"]);const De=e=>{const{ownerState:t,...o}=e;return o},Fe=e=>{const{classes:t,invisible:o}=e;return ne({root:["root",o&&"invisible"]},Ne,t)},We=L("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,o.invisible&&t.invisible]}})({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",variants:[{props:{invisible:!0},style:{backgroundColor:"transparent"}}]}),ge=u.forwardRef(function(t,o){const n=te({props:t,name:"MuiBackdrop"}),{children:s,className:r,component:i="div",invisible:a=!1,open:p,components:x={},componentsProps:P={},slotProps:g={},slots:E={},TransitionComponent:h,transitionDuration:f,...I}=n,y={...n,component:i,invisible:a},v=Fe(y),k={transition:h,root:x.Root,...E},l={...P,...g},m={slots:k,slotProps:l},[S,R]=V("root",{elementType:We,externalForwardedProps:m,className:$(v.root,r),ownerState:y}),[T,C]=V("transition",{elementType:be,externalForwardedProps:m,ownerState:y}),w=De(C);return M.jsx(T,{in:p,timeout:f,...I,...w,children:M.jsx(S,{"aria-hidden":!0,...R,classes:v,ref:o,children:s})})});function Ae(e){const t=K(e);return t.body===e?G(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function Y(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function de(e){return parseInt(G(e).getComputedStyle(e).paddingRight,10)||0}function Be(e){const o=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].includes(e.tagName),n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return o||n}function ue(e,t,o,n,s){const r=[t,o,...n];[].forEach.call(e.children,i=>{const a=!r.includes(i),p=!Be(i);a&&p&&Y(i,s)})}function Q(e,t){let o=-1;return e.some((n,s)=>t(n)?(o=s,!0):!1),o}function Oe(e,t){const o=[],n=e.container;if(!t.disableScrollLock){if(Ae(n)){const i=Me(G(n));o.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${de(n)+i}px`;const a=K(n).querySelectorAll(".mui-fixed");[].forEach.call(a,p=>{o.push({value:p.style.paddingRight,property:"padding-right",el:p}),p.style.paddingRight=`${de(p)+i}px`})}let r;if(n.parentNode instanceof DocumentFragment)r=K(n).body;else{const i=n.parentElement,a=G(n);r=(i==null?void 0:i.nodeName)==="HTML"&&a.getComputedStyle(i).overflowY==="scroll"?i:n}o.push({value:r.style.overflow,property:"overflow",el:r},{value:r.style.overflowX,property:"overflow-x",el:r},{value:r.style.overflowY,property:"overflow-y",el:r}),r.style.overflow="hidden"}return()=>{o.forEach(({value:r,el:i,property:a})=>{r?i.style.setProperty(a,r):i.style.removeProperty(a)})}}function je(e){const t=[];return[].forEach.call(e.children,o=>{o.getAttribute("aria-hidden")==="true"&&t.push(o)}),t}class Le{constructor(){this.modals=[],this.containers=[]}add(t,o){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&Y(t.modalRef,!1);const s=je(o);ue(o,t.mount,t.modalRef,s,!0);const r=Q(this.containers,i=>i.container===o);return r!==-1?(this.containers[r].modals.push(t),n):(this.containers.push({modals:[t],container:o,restore:null,hiddenSiblings:s}),n)}mount(t,o){const n=Q(this.containers,r=>r.modals.includes(t)),s=this.containers[n];s.restore||(s.restore=Oe(s,o))}remove(t,o=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const s=Q(this.containers,i=>i.modals.includes(t)),r=this.containers[s];if(r.modals.splice(r.modals.indexOf(t),1),this.modals.splice(n,1),r.modals.length===0)r.restore&&r.restore(),t.modalRef&&Y(t.modalRef,o),ue(r.container,t.mount,t.modalRef,r.hiddenSiblings,!1),this.containers.splice(s,1);else{const i=r.modals[r.modals.length-1];i.modalRef&&Y(i.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}const $e=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Ue(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function Ke(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let o=t(`[name="${e.name}"]:checked`);return o||(o=t(`[name="${e.name}"]`)),o!==e}function ze(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||Ke(e))}function Ye(e){const t=[],o=[];return Array.from(e.querySelectorAll($e)).forEach((n,s)=>{const r=Ue(n);r===-1||!ze(n)||(r===0?t.push(n):o.push({documentOrder:s,tabIndex:r,node:n}))}),o.sort((n,s)=>n.tabIndex===s.tabIndex?n.documentOrder-s.documentOrder:n.tabIndex-s.tabIndex).map(n=>n.node).concat(t)}function He(){return!0}function qe(e){const{children:t,disableAutoFocus:o=!1,disableEnforceFocus:n=!1,disableRestoreFocus:s=!1,getTabbable:r=Ye,isEnabled:i=He,open:a}=e,p=u.useRef(!1),x=u.useRef(null),P=u.useRef(null),g=u.useRef(null),E=u.useRef(null),h=u.useRef(!1),f=u.useRef(null),I=J(fe(t),f),y=u.useRef(null);u.useEffect(()=>{!a||!f.current||(h.current=!o)},[o,a]),u.useEffect(()=>{if(!a||!f.current)return;const l=K(f.current);return f.current.contains(l.activeElement)||(f.current.hasAttribute("tabIndex")||f.current.setAttribute("tabIndex","-1"),h.current&&f.current.focus()),()=>{s||(g.current&&g.current.focus&&(p.current=!0,g.current.focus()),g.current=null)}},[a]),u.useEffect(()=>{if(!a||!f.current)return;const l=K(f.current),m=T=>{y.current=T,!(n||!i()||T.key!=="Tab")&&l.activeElement===f.current&&T.shiftKey&&(p.current=!0,P.current&&P.current.focus())},S=()=>{var w,F;const T=f.current;if(T===null)return;if(!l.hasFocus()||!i()||p.current){p.current=!1;return}if(T.contains(l.activeElement)||n&&l.activeElement!==x.current&&l.activeElement!==P.current)return;if(l.activeElement!==E.current)E.current=null;else if(E.current!==null)return;if(!h.current)return;let C=[];if((l.activeElement===x.current||l.activeElement===P.current)&&(C=r(f.current)),C.length>0){const N=!!((w=y.current)!=null&&w.shiftKey&&((F=y.current)==null?void 0:F.key)==="Tab"),W=C[0],A=C[C.length-1];typeof W!="string"&&typeof A!="string"&&(N?A.focus():W.focus())}else T.focus()};l.addEventListener("focusin",S),l.addEventListener("keydown",m,!0);const R=setInterval(()=>{l.activeElement&&l.activeElement.tagName==="BODY"&&S()},50);return()=>{clearInterval(R),l.removeEventListener("focusin",S),l.removeEventListener("keydown",m,!0)}},[o,n,s,i,a,r]);const v=l=>{g.current===null&&(g.current=l.relatedTarget),h.current=!0,E.current=l.target;const m=t.props.onFocus;m&&m(l)},k=l=>{g.current===null&&(g.current=l.relatedTarget),h.current=!0};return M.jsxs(u.Fragment,{children:[M.jsx("div",{tabIndex:a?0:-1,onFocus:k,ref:x,"data-testid":"sentinelStart"}),u.cloneElement(t,{ref:I,onFocus:v}),M.jsx("div",{tabIndex:a?0:-1,onFocus:k,ref:P,"data-testid":"sentinelEnd"})]})}function Xe(e){return typeof e=="function"?e():e}function Ge(e){return e?e.props.hasOwnProperty("in"):!1}const X=new Le;function Ve(e){const{container:t,disableEscapeKeyDown:o=!1,disableScrollLock:n=!1,closeAfterTransition:s=!1,onTransitionEnter:r,onTransitionExited:i,children:a,onClose:p,open:x,rootRef:P}=e,g=u.useRef({}),E=u.useRef(null),h=u.useRef(null),f=J(h,P),[I,y]=u.useState(!x),v=Ge(a);let k=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(k=!1);const l=()=>K(E.current),m=()=>(g.current.modalRef=h.current,g.current.mount=E.current,g.current),S=()=>{X.mount(m(),{disableScrollLock:n}),h.current&&(h.current.scrollTop=0)},R=le(()=>{const c=Xe(t)||l().body;X.add(m(),c),h.current&&S()}),T=()=>X.isTopModal(m()),C=le(c=>{E.current=c,c&&(x&&T()?S():h.current&&Y(h.current,k))}),w=u.useCallback(()=>{X.remove(m(),k)},[k]);u.useEffect(()=>()=>{w()},[w]),u.useEffect(()=>{x?R():(!v||!s)&&w()},[x,w,v,s,R]);const F=c=>d=>{var D;(D=c.onKeyDown)==null||D.call(c,d),!(d.key!=="Escape"||d.which===229||!T())&&(o||(d.stopPropagation(),p&&p(d,"escapeKeyDown")))},N=c=>d=>{var D;(D=c.onClick)==null||D.call(c,d),d.target===d.currentTarget&&p&&p(d,"backdropClick")};return{getRootProps:(c={})=>{const d=Se(e);delete d.onTransitionEnter,delete d.onTransitionExited;const D={...d,...c};return{role:"presentation",...D,onKeyDown:F(D),ref:f}},getBackdropProps:(c={})=>{const d=c;return{"aria-hidden":!0,...d,onClick:N(d),open:x}},getTransitionProps:()=>{const c=()=>{y(!1),r&&r()},d=()=>{y(!0),i&&i(),s&&w()};return{onEnter:ce(c,a==null?void 0:a.props.onEnter),onExited:ce(d,a==null?void 0:a.props.onExited)}},rootRef:f,portalRef:C,isTopModal:T,exited:I,hasTransition:v}}function Je(e){return ee("MuiModal",e)}_("MuiModal",["root","hidden","backdrop"]);const Qe=e=>{const{open:t,exited:o,classes:n}=e;return ne({root:["root",!t&&o&&"hidden"],backdrop:["backdrop"]},Je,n)},Ze=L("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.open&&o.exited&&t.hidden]}})(me(({theme:e})=>({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0,variants:[{props:({ownerState:t})=>!t.open&&t.exited,style:{visibility:"hidden"}}]}))),_e=L(ge,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),et=u.forwardRef(function(t,o){const n=te({name:"MuiModal",props:t}),{BackdropComponent:s=_e,BackdropProps:r,classes:i,className:a,closeAfterTransition:p=!1,children:x,container:P,component:g,components:E={},componentsProps:h={},disableAutoFocus:f=!1,disableEnforceFocus:I=!1,disableEscapeKeyDown:y=!1,disablePortal:v=!1,disableRestoreFocus:k=!1,disableScrollLock:l=!1,hideBackdrop:m=!1,keepMounted:S=!1,onBackdropClick:R,onClose:T,onTransitionEnter:C,onTransitionExited:w,open:F,slotProps:N={},slots:W={},theme:A,...b}=n,c={...n,closeAfterTransition:p,disableAutoFocus:f,disableEnforceFocus:I,disableEscapeKeyDown:y,disablePortal:v,disableRestoreFocus:k,disableScrollLock:l,hideBackdrop:m,keepMounted:S},{getRootProps:d,getBackdropProps:D,getTransitionProps:O,portalRef:xe,isTopModal:ye,exited:oe,hasTransition:re}=Ve({...c,rootRef:o}),z={...c,exited:oe},B=Qe(z),H={};if(x.props.tabIndex===void 0&&(H.tabIndex="-1"),re){const{onEnter:j,onExited:q}=O();H.onEnter=j,H.onExited=q}const se={...b,slots:{root:E.Root,backdrop:E.Backdrop,...W},slotProps:{...h,...N}},[Ee,ve]=V("root",{elementType:Ze,externalForwardedProps:se,getSlotProps:d,additionalProps:{ref:o,as:g},ownerState:z,className:$(a,B==null?void 0:B.root,!z.open&&z.exited&&(B==null?void 0:B.hidden))}),[ke,ie]=V("backdrop",{elementType:s,externalForwardedProps:se,additionalProps:r,getSlotProps:j=>D({...j,onClick:q=>{R&&R(q),j!=null&&j.onClick&&j.onClick(q)}}),className:$(r==null?void 0:r.className,B==null?void 0:B.backdrop),ownerState:z}),Re=J(r==null?void 0:r.ref,ie.ref);return!S&&!F&&(!re||oe)?null:M.jsx(Ce,{ref:xe,container:P,disablePortal:v,children:M.jsxs(Ee,{...ve,children:[!m&&s?M.jsx(ke,{...ie,ref:Re}):null,M.jsx(qe,{disableEnforceFocus:I,disableAutoFocus:f,disableRestoreFocus:k,isEnabled:ye,open:F,children:u.cloneElement(x,H)})]})})});function tt(e){return ee("MuiDialog",e)}const Z=_("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),nt=u.createContext({}),ot=L(ge,{name:"MuiDialog",slot:"Backdrop",overrides:(e,t)=>t.backdrop})({zIndex:-1}),rt=e=>{const{classes:t,scroll:o,maxWidth:n,fullWidth:s,fullScreen:r}=e,i={root:["root"],container:["container",`scroll${U(o)}`],paper:["paper",`paperScroll${U(o)}`,`paperWidth${U(String(n))}`,s&&"paperFullWidth",r&&"paperFullScreen"]};return ne(i,tt,t)},st=L(et,{name:"MuiDialog",slot:"Root",overridesResolver:(e,t)=>t.root})({"@media print":{position:"absolute !important"}}),it=L("div",{name:"MuiDialog",slot:"Container",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.container,t[`scroll${U(o.scroll)}`]]}})({height:"100%","@media print":{height:"auto"},outline:0,variants:[{props:{scroll:"paper"},style:{display:"flex",justifyContent:"center",alignItems:"center"}},{props:{scroll:"body"},style:{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}}}]}),at=L(he,{name:"MuiDialog",slot:"Paper",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.paper,t[`scrollPaper${U(o.scroll)}`],t[`paperWidth${U(String(o.maxWidth))}`],o.fullWidth&&t.paperFullWidth,o.fullScreen&&t.paperFullScreen]}})(me(({theme:e})=>({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"},variants:[{props:{scroll:"paper"},style:{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"}},{props:{scroll:"body"},style:{display:"inline-block",verticalAlign:"middle",textAlign:"initial"}},{props:({ownerState:t})=>!t.maxWidth,style:{maxWidth:"calc(100% - 64px)"}},{props:{maxWidth:"xs"},style:{maxWidth:e.breakpoints.unit==="px"?Math.max(e.breakpoints.values.xs,444):`max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,[`&.${Z.paperScrollBody}`]:{[e.breakpoints.down(Math.max(e.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}}},...Object.keys(e.breakpoints.values).filter(t=>t!=="xs").map(t=>({props:{maxWidth:t},style:{maxWidth:`${e.breakpoints.values[t]}${e.breakpoints.unit}`,[`&.${Z.paperScrollBody}`]:{[e.breakpoints.down(e.breakpoints.values[t]+32*2)]:{maxWidth:"calc(100% - 64px)"}}}})),{props:({ownerState:t})=>t.fullWidth,style:{width:"calc(100% - 64px)"}},{props:({ownerState:t})=>t.fullScreen,style:{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${Z.paperScrollBody}`]:{margin:0,maxWidth:"100%"}}}]}))),dt=u.forwardRef(function(t,o){const n=te({props:t,name:"MuiDialog"}),s=pe(),r={enter:s.transitions.duration.enteringScreen,exit:s.transitions.duration.leavingScreen},{"aria-describedby":i,"aria-labelledby":a,BackdropComponent:p,BackdropProps:x,children:P,className:g,disableEscapeKeyDown:E=!1,fullScreen:h=!1,fullWidth:f=!1,maxWidth:I="sm",onBackdropClick:y,onClick:v,onClose:k,open:l,PaperComponent:m=he,PaperProps:S={},scroll:R="paper",TransitionComponent:T=be,transitionDuration:C=r,TransitionProps:w,...F}=n,N={...n,disableEscapeKeyDown:E,fullScreen:h,fullWidth:f,maxWidth:I,scroll:R},W=rt(N),A=u.useRef(),b=O=>{A.current=O.target===O.currentTarget},c=O=>{v&&v(O),A.current&&(A.current=null,y&&y(O),k&&k(O,"backdropClick"))},d=we(a),D=u.useMemo(()=>({titleId:d}),[d]);return M.jsx(st,{className:$(W.root,g),closeAfterTransition:!0,components:{Backdrop:ot},componentsProps:{backdrop:{transitionDuration:C,as:p,...x}},disableEscapeKeyDown:E,onClose:k,open:l,ref:o,onClick:c,ownerState:N,...F,children:M.jsx(T,{appear:!0,in:l,timeout:C,role:"presentation",...w,children:M.jsx(it,{className:$(W.container),onMouseDown:b,ownerState:N,children:M.jsx(at,{as:m,elevation:24,role:"dialog","aria-describedby":i,"aria-labelledby":d,...S,className:$(W.paper,S.className),ownerState:N,children:M.jsx(nt.Provider,{value:D,children:P})})})})})});export{nt as D,et as M,dt as a,Me as g};
