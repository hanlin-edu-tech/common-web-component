(function(e){function t(t){for(var n,o,i=t[0],c=t[1],s=t[2],f=0,l=[];f<i.length;f++)o=i[f],a[o]&&l.push(a[o][0]),a[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);p&&p(t);while(l.length)l.shift()();return u.push.apply(u,s||[]),r()}function r(){for(var e,t=0;t<u.length;t++){for(var r=u[t],n=!0,o=1;o<r.length;o++){var i=r[o];0!==a[i]&&(n=!1)}n&&(u.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},o={app:0},a={app:0},u=[];function i(e){return c.p+"static/js/"+({}[e]||e)+"."+{"chunk-4fa873d6":"35fa68f1","chunk-ef78d0ec":"2de8ea7f"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.e=function(e){var t=[],r={"chunk-4fa873d6":1,"chunk-ef78d0ec":1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=new Promise(function(t,r){for(var n="static/css/"+({}[e]||e)+"."+{"chunk-4fa873d6":"9f647a2d","chunk-ef78d0ec":"a77a2cc6"}[e]+".css",a=c.p+n,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var s=u[i],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===n||f===a))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){s=l[i],f=s.getAttribute("data-href");if(f===n||f===a)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var n=t&&t.target&&t.target.src||a,u=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");u.request=n,delete o[e],p.parentNode.removeChild(p),r(u)},p.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(p)}).then(function(){o[e]=0}));var n=a[e];if(0!==n)if(n)t.push(n[2]);else{var u=new Promise(function(t,r){n=a[e]=[t,r]});t.push(n[2]=u);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,c.nc&&f.setAttribute("nonce",c.nc),f.src=i(e),s=function(t){f.onerror=f.onload=null,clearTimeout(l);var r=a[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,u=new Error("Loading chunk "+e+" failed.\n("+n+": "+o+")");u.type=n,u.request=o,r[1](u)}a[e]=void 0}};var l=setTimeout(function(){s({type:"timeout",target:f})},12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var p=f;u.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[r("router-view")],1)},a=[],u=r("2877"),i={},c=Object(u["a"])(i,o,a,!1,null,null,null),s=c.exports,f=r("cebc"),l=r("8c4f");n["a"].use(l["a"]);var p=new l["a"]({base:"./",routes:[{path:"/:preExamCategory/:preExamCategoryDesc/:subject",name:"PreYearExam",component:function(){return r.e("chunk-4fa873d6").then(r.bind(null,"d551"))},props:function(e){return Object(f["a"])({},e.params)}},{path:"/gsat/歷屆學測解題",name:"GSATPreExam",component:function(){return r.e("chunk-ef78d0ec").then(r.bind(null,"3f8f"))}}]}),d=r("2f62");n["a"].use(d["a"]);var h=new d["a"].Store({state:{},mutations:{},actions:{}}),y=(r("bbef"),r("795b")),g=r.n(y),m=r("bc3a"),v=r.n(m);v.a.defaults.baseURL="",v.a.interceptors.response.use(function(e){return e},g.a.reject);var b={install:function(e,t){e.prototype.$axios=v.a}},j=r("4aa6"),w=r.n(j),A=r("7618"),k={registerArrayLast:function(){Array.prototype.last||(Array.prototype.last=function(){return this[this.length-1]})},registerArrayFirst:function(){Array.prototype.first||(Array.prototype.first=function(){return this[0]})},registerObjArrayGroupBy:function(){Array.prototype.objGroupBy=function(e){var t=this;return t.reduce(function(r,n){if("object"===Object(A["a"])(n)){var o=n[e];return r[o]=r[o]||[],r[o].push(n),r}return t},w()(null))}}};k.registerArrayFirst(),k.registerArrayLast(),k.registerObjArrayGroupBy(),n["a"].config.productionTip=!1,n["a"].use(b),new n["a"]({router:p,store:h,render:function(e){return e(s)}}).$mount("#app")}});
//# sourceMappingURL=app.68f36e50.js.map