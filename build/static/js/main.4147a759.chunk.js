(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(18)},18:function(e,t,n){"use strict";n.r(t);var a=n(11),o=n(12),r=n(15),l=n(13),s=n(16),u=n(2),i=n(0),c=n.n(i),m=n(14),h=n.n(m),d=n(3),p=n.n(d),b=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(r.a)(this,Object(l.a)(t).call(this,e))).addPerson=function(e){e.preventDefault();var t={name:n.state.newName,number:n.state.newNumber,id:n.state.persons.length};p.a.post("http://localhost:3001/api/persons",t).then(function(e){n.setState({persons:n.state.persons.concat(t),newName:"",newNumber:""})})},n.handleNameChange=function(e){n.setState({newName:e.target.value})},n.handleNumberChange=function(e){n.setState({newNumber:e.target.value})},n.deletePerson=function(e){var t=n.state.persons[e].name;return function(){window.confirm("Poistetaanko henkil\xf6 "+t+"?")&&(fetch("http://localhost:3001/api/persons"+e,{method:"DELETE"}).then(function(e){return e.json()}).catch(function(e){return e}),console.log("person "+t+" deleted"))}},n.deletePerson=n.deletePerson.bind(Object(u.a)(Object(u.a)(n))),n.state={persons:[],newName:"",newNumber:""},n}return Object(s.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("did mount"),p.a.get("http://localhost:3001/api/persons").then(function(t){console.log("promise fulfilled"),e.setState({persons:t.data})})}},{key:"render",value:function(){var e=this;return c.a.createElement("div",null,c.a.createElement("h2",null,"Puhelinluettelo"),c.a.createElement("form",{onSubmit:this.addPerson},c.a.createElement("div",null,"Nimi: ",c.a.createElement("input",{value:this.state.newName,onChange:this.handleNameChange})),c.a.createElement("div",null,"Numero: ",c.a.createElement("input",{value:this.state.newNumber,onChange:this.handleNumberChange})),c.a.createElement("div",null,c.a.createElement("button",{type:"submit"},"Lis\xe4\xe4"))),c.a.createElement("form",null,c.a.createElement("h2",null,"Numerot"),e.state.persons.map(function(t){return c.a.createElement("p",{key:t.id},t.name,": ",t.number,c.a.createElement("button",{onClick:e.deletePerson(t.id)},"Poista"))})))}}]),t}(c.a.Component);h.a.render(c.a.createElement(b,null),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.4147a759.chunk.js.map