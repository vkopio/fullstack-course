(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(38)},18:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(11),u=t.n(c),o=(t(18),t(2)),i=function(e){var n=e.value,t=e.changeHandler;return r.a.createElement("div",null,"Rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:n,onChange:t}))},l=function(e){var n=e.persons,t=e.removalHandler;return n.map(function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t(e)}},"Poista"))})},s=function(e){return r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},m=t(3),f=t.n(m),d="/api/persons",v=function(){return f.a.get(d).then(function(e){return e.data})},h=function(e){return f.a.post(d,e).then(function(e){return e.data})},p=function(e){return f.a.delete("".concat(d,"/").concat(e)).then(function(e){return e.data})},b=function(e,n){return f.a.put("".concat(d,"/").concat(e),n).then(function(e){return e.data})},g={success:"green",error:"red"},E=function(e){var n=e.notification;if(0===Object.keys(n).length)return null;var t={color:g[n.type]};return r.a.createElement("div",{className:"error",style:t},n.message)},w=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),m=Object(o.a)(u,2),f=m[0],d=m[1],g=Object(a.useState)(""),w=Object(o.a)(g,2),j=w[0],y=w[1],O=Object(a.useState)(""),C=Object(o.a)(O,2),N=C[0],k=C[1],P=Object(a.useState)({}),S=Object(o.a)(P,2),H=S[0],L=S[1];Object(a.useEffect)(function(){v().then(function(e){c(e)})},[]);var J=function(e){L(e),setTimeout(function(){L({})},5e3)},x=t.filter(function(e){return e.name.toLowerCase().includes(N.toLowerCase())}),B=function(){d(""),y("")};return r.a.createElement("div",null,r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(E,{notification:H}),r.a.createElement(i,{value:N,changeHandler:function(e){k(e.target.value)}}),r.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),r.a.createElement(s,{addPerson:function(e){e.preventDefault();var n={name:f,number:j},a=t.find(function(e){return e.name===f});if(a){var r="".concat(f," on jo luettelossa. Korvataanko vanha numero uudella?");return window.confirm(r)&&b(a.id,n).then(function(e){c(t.map(function(n){return n.id!==a.id?n:e})),J({message:"P\xe4ivitettiin ".concat(e.name),type:"success"})}).catch(function(e){J({message:e.response.data.error,type:"error"})}),void B()}h(n).then(function(e){c(t.concat(e)),J({message:"Lis\xe4ttiin ".concat(e.name),type:"success"}),B()}).catch(function(e){J({message:e.response.data.error,type:"error"})})},newName:f,newNumber:j,handleNameChange:function(e){d(e.target.value)},handleNumberChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(l,{persons:x,removalHandler:function(e){var n;window.confirm("Poistetaanko ".concat(e.name,"?"))&&p((n=e).id).then(function(){c(t.filter(function(e){return e.id!==n.id})),J({message:"Poistettiin ".concat(n.name),type:"success"})}).catch(function(e){c(t.filter(function(e){return e.id!==n.id})),J({message:"Henkil\xf6 ".concat(n.name," oli jo poistettu."),type:"error"})})}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.9fbcf099.chunk.js.map