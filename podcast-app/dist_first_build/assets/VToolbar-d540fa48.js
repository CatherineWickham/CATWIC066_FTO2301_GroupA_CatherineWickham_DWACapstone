import{a as x,g as y,p as T,m as H,c as I,f as E,h as D,i as w,k as $,o as q,V as F,x as u}from"./VCard-ba4fbd38.js";import{p as V,n as k,u as a,m as Q,t as U,q as j,Q as z,s as A,c as h,a4 as G,b as o}from"./index-60f7ff30.js";import{h as J}from"./VTextField-bcce73b8.js";const K=V({text:String,...x(),...y()},"VToolbarTitle"),L=k()({name:"VToolbarTitle",props:K(),setup(e,n){let{slots:t}=n;return T(()=>{const s=!!(t.default||t.text||e.text);return a(e.tag,{class:["v-toolbar-title",e.class],style:e.style},{default:()=>{var l;return[s&&a("div",{class:"v-toolbar-title__placeholder"},[t.text?t.text():e.text,(l=t.default)==null?void 0:l.call(t)])]}})}),{}}}),M=[null,"prominent","default","comfortable","compact"],O=V({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>M.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...H(),...x(),...I(),...E(),...y({tag:"header"}),...Q()},"VToolbar"),Z=k()({name:"VToolbar",props:O(),setup(e,n){var c;let{slots:t}=n;const{backgroundColorClasses:s,backgroundColorStyles:l}=D(U(e,"color")),{borderClasses:_}=w(e),{elevationClasses:C}=$(e),{roundedClasses:B}=q(e),{themeClasses:P}=j(e),{rtlClasses:S}=z(),i=A(!!(e.extended||(c=t.extension)!=null&&c.call(t))),r=h(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),d=h(()=>i.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return G({VBtn:{variant:"text"}}),T(()=>{var g;const N=!!(e.title||t.title),R=!!(t.image||e.image),m=(g=t.extension)==null?void 0:g.call(t);return i.value=!!(e.extended||m),a(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},s.value,_.value,C.value,B.value,P.value,S.value,e.class],style:[l.value,e.style]},{default:()=>[R&&a("div",{key:"image",class:"v-toolbar__image"},[t.image?a(u,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},t.image):a(F,{key:"image-img",cover:!0,src:e.image},null)]),a(u,{defaults:{VTabs:{height:o(r.value)}}},{default:()=>{var v,b,f;return[a("div",{class:"v-toolbar__content",style:{height:o(r.value)}},[t.prepend&&a("div",{class:"v-toolbar__prepend"},[(v=t.prepend)==null?void 0:v.call(t)]),N&&a(L,{key:"title",text:e.title},{text:t.title}),(b=t.default)==null?void 0:b.call(t),t.append&&a("div",{class:"v-toolbar__append"},[(f=t.append)==null?void 0:f.call(t)])])]}}),a(u,{defaults:{VTabs:{height:o(d.value)}}},{default:()=>[a(J,null,{default:()=>[i.value&&a("div",{class:"v-toolbar__extension",style:{height:o(d.value)}},[m])]})]})]})}),{contentHeight:r,extensionHeight:d}}});export{Z as V,O as m};