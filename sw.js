if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const o=s=>l(s,n),t={module:{uri:n},exports:u,require:o};e[n]=Promise.all(i.map((s=>t[s]||o(s)))).then((s=>(r(...s),u)))}}define(["./workbox-5ffe50d4"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/About-UwfTXuWm.js",revision:null},{url:"assets/Alert-zoDG0pBZ.js",revision:null},{url:"assets/AlertTitle-DC-kB3SK.js",revision:null},{url:"assets/AppCard-C6VLpkLG.js",revision:null},{url:"assets/BadPixelDetection-_oCL5PNJ.js",revision:null},{url:"assets/Calculator-BVaGJfYZ.js",revision:null},{url:"assets/Canvas-Vb1wGuDm.js",revision:null},{url:"assets/Chip-DNbh50uC.js",revision:null},{url:"assets/CircularProgress-D9tBcd3R.js",revision:null},{url:"assets/Close-CWk7jeK-.js",revision:null},{url:"assets/CodeEditor-CORw5tww.js",revision:null},{url:"assets/Container-pm8YwrQ_.js",revision:null},{url:"assets/Dialog-BTzlCxHy.js",revision:null},{url:"assets/FramePage-CnZ4sub0.js",revision:null},{url:"assets/FrameRateDetection-C0T2guLR.js",revision:null},{url:"assets/GisTileDownload-DennjAfo.css",revision:null},{url:"assets/GisTileDownload-Dj_JLTm0.js",revision:null},{url:"assets/Grid2-sT_JegjO.js",revision:null},{url:"assets/Help-SKpHziSk.js",revision:null},{url:"assets/HighlightEditor-BGp6GyLz.js",revision:null},{url:"assets/HighlightEditor-DWiokNTh.css",revision:null},{url:"assets/Home-DI9Npo4o.js",revision:null},{url:"assets/index-hppoC6iV.js",revision:null},{url:"assets/index-j904Gvc5.js",revision:null},{url:"assets/index-lDLkfsWG.css",revision:null},{url:"assets/IpLocation-CXl2CZPD.js",revision:null},{url:"assets/Link-fPpoHJiz.js",revision:null},{url:"assets/Markdown-DxGD6MQ_.js",revision:null},{url:"assets/MarkdownEditor-BxBhhTxU.js",revision:null},{url:"assets/MessageBox-BOrzLt5K.js",revision:null},{url:"assets/Modal-CfcGAiNy.js",revision:null},{url:"assets/NotFound-Bb9wBexZ.js",revision:null},{url:"assets/Search-CS5O90Ra.js",revision:null},{url:"assets/Settings-D349vMnC.js",revision:null},{url:"assets/Stack-B1qDCXDJ.js",revision:null},{url:"assets/Switch-BoL6Msxu.js",revision:null},{url:"assets/TableRow-NeKCrLtQ.js",revision:null},{url:"assets/TextField-g8IOHXzJ.js",revision:null},{url:"assets/useSlot-CG_lEdXg.js",revision:null},{url:"assets/useThemeProps-CRnetRKO.js",revision:null},{url:"index.html",revision:"48330c052bac1dabb294bfbb99eb7428"},{url:"registerSW.js",revision:"06b4f9b10c74b31a8f819e8aefed7904"},{url:"PWA/icon-192.svg",revision:"a2afe8f4b8b8ac88e5c07a4b41effa1b"},{url:"PWA/icon-512.svg",revision:"428e0c1470fd39536ca27c1557c98807"},{url:"manifest.webmanifest",revision:"ed8cf3711562deddaea47da0f0b34c21"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));