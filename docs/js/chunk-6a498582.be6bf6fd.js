(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a498582"],{"98b2":function(t,e,n){},b872:function(t,e,n){"use strict";n("98b2")},f7f0:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("v-btn",{on:{click:function(e){t.$window.document.getElementById("imgFile").click()}}},[n("v-icon",[t._v("mdi-image")]),n("span",[t._v("読み込み")]),n("input",{staticStyle:{visibility:"visible",width:"0",height:"0"},attrs:{id:"imgFile",type:"file"}})],1),n("br"),n("v-checkbox",{attrs:{label:"施設"},model:{value:t.isPrefab,callback:function(e){t.isPrefab=e},expression:"isPrefab"}}),n("img",{staticClass:"d",attrs:{id:"o"}}),n("canvas",{attrs:{id:"o2"}}),n("br"),n("v-btn",{on:{click:function(e){return t.downloadImg()}}},[t._v("画像をダウンロード")])],1)},i=[],o=n("2b0e"),l=o["a"].extend({data:()=>({isPrefab:!0}),computed:{elm:()=>({img:document.getElementById("o")})},methods:{ImgOnload(t,e){return new Promise((n,a)=>{const i=t;i.onload=n,i.onerror=t=>a(t),i.src=e})},canvasInit(t,e){return t.width=e.width,t.height=e.height,t.getContext("2d")},main(){let t,e,n;this.isPrefab?(t=211,e=274,n=192):(t=285,e=319,n=123);const a=document.getElementById("o2"),i=this.canvasInit(a,{width:n,height:n});i.drawImage(this.elm.img,t,e,n,n,0,0,n,n),i.fillStyle="#00FFFF",i.globalAlpha=.5,i.fillRect(285,319,123,123),i.globalAlpha=1,i.globalCompositeOperation="destination-out",i.fillStyle="rgba(0,0,0,1)";for(let o=0;o<=1;o++)for(let t=0;t<=1;t++){i.beginPath();const e=n*o,a=n*t,l=this.isPrefab?9:6;i.lineTo(e,a),i.arc(e+l*(1-2*o),a+l*(1-2*t),l,(1-o)*Math.PI,(1.5-t)*Math.PI,o^t),i.closePath(),i.fill()}},async downloadImg(){const t=document.getElementById("o2"),e=await this.toBlob(t),n="merged_"+Number(new Date);this.fileDownload_fromBlob(e,n)},fileDownload_fromBlob(t,e="img.png"){const n=URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=e,a.click(),URL.revokeObjectURL(n)},toBlob(t){return new Promise((e,n)=>{try{t.toBlob(e)}catch(a){n(a)}})}},async mounted(){document.getElementById("imgFile").addEventListener("change",t=>{const e=new FileReader;e.addEventListener("load",async t=>{await this.ImgOnload(this.elm.img,t.target.result),this.main(),this.downloadImg()}),e.readAsDataURL(t.target.files[0])})},watch:{isPrefab(){this.main()}}}),c=l,s=(n("b872"),n("2877")),r=n("6544"),d=n.n(r),m=n("8336"),h=n("ac7c"),b=n("132d"),g=Object(s["a"])(c,a,i,!1,null,"a399acaa",null);e["default"]=g.exports;d()(g,{VBtn:m["a"],VCheckbox:h["a"],VIcon:b["a"]})}}]);
//# sourceMappingURL=chunk-6a498582.be6bf6fd.js.map