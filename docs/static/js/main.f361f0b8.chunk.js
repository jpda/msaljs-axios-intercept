(this["webpackJsonpmsaljs-axios"]=this["webpackJsonpmsaljs-axios"]||[]).push([[0],{35:function(e,t,a){e.exports=a(65)},40:function(e,t,a){},59:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(31),c=a.n(i),s=(a(40),a(9)),o=a(16),l=a(15),u=a(7),h=a(5),d=a.n(h),m=a(10),v=a(32),p=a.n(v),g=a(20),f=function e(){Object(u.a)(this,e),this.accountAvailable=void 0,this.displayName=void 0,this.displayName="",this.accountAvailable=!1},k=function(){function e(){var t=this;Object(u.a)(this,e),this.msalObj=void 0,this.redirect=void 0,this.useStackLogging=void 0,this.requestConfiguration={scopes:["api://msaljs.jpda.app/power","api://msaljs.jpda.app/wake"]},this.redirect=!0,this.useStackLogging=!1,this.track("ctor: starting");var a=new g.b({auth:{clientId:"31c0ca04-16fb-49b6-83a2-e8c8487ea4fd",authority:"https://login.microsoftonline.com/98a34a88-7940-40e8-af71-913452037f31",redirectUri:"http://localhost:3000/auth",navigateToLoginRequestUrl:!1},cache:{cacheLocation:"sessionStorage"}});this.track("ctor: setting redirect callbacks"),a.handleRedirectCallback((function(e,a){t.track("redirectCallback"),a&&t.processLogin(a),e&&console.error(e)})),this.msalObj=a}return Object(s.a)(e,null,[{key:"createInstance",value:function(){return new e}},{key:"getInstance",value:function(){return this.instance||(this.instance=this.createInstance()),this.instance}}]),Object(s.a)(e,[{key:"login",value:function(){var e=Object(m.a)(d.a.mark((function e(t,a,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.track("entering login; scopes: "+n+", state: "+a+", redirect: "+t),a&&(this.track("Setting state to: "+a),this.requestConfiguration.state=a),!t&&!this.redirect){e.next=7;break}this.track("redirecting to login with parameters: "+JSON.stringify(this.requestConfiguration)),this.msalObj.loginRedirect(this.requestConfiguration),e.next=19;break;case 7:return e.prev=7,this.track("logging in with popup, config: "+JSON.stringify(this.requestConfiguration)),e.next=11,this.msalObj.loginPopup(this.requestConfiguration);case 11:r=e.sent,this.track("MsalHandler::login: got something: "+JSON.stringify(r)),this.processLogin(r),e.next=19;break;case 16:e.prev=16,e.t0=e.catch(7),console.error(e.t0);case 19:case"end":return e.stop()}}),e,this,[[7,16]])})));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"acquireAccessToken",value:function(){var e=Object(m.a)(d.a.mark((function e(t,a,n){var r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n&&(this.requestConfiguration.scopes=n),t&&(this.track("state: "+t),this.requestConfiguration.state=t),e.prev=2,this.track("access token silent: "+JSON.stringify(this.requestConfiguration)),e.next=6,this.msalObj.acquireTokenSilent(this.requestConfiguration);case 6:return r=e.sent,e.abrupt("return",r.accessToken);case 10:e.prev=10,e.t0=e.catch(2),e.t0 instanceof g.a&&(console.error("acquireAccessToken: error: "+JSON.stringify(e.t0)),"user_login_error"!==e.t0.errorCode&&"consent_required"!==e.t0.errorCode&&"interaction_required"!==e.t0.errorCode||this.login(a,t,this.requestConfiguration.scopes)),console.error(e.t0);case 14:return e.abrupt("return",null);case 15:case"end":return e.stop()}}),e,this,[[2,10]])})));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"getUserData",value:function(){var e=this.msalObj.getAccount(),t=new f;return e&&(t.accountAvailable=!0,t.displayName=e.name),t}},{key:"processLogin",value:function(e){this.track("processLogin"),e&&(this.track("id_token received: "+e.idToken),this.track("access_token received: "+e.accessToken),this.track("state received: "+e.accountState),e.accountState&&(this.track("got a "+e.accountState),window.location.pathname=e.accountState))}},{key:"track",value:function(e){var t="MsalHandler::"+e;if(this.useStackLogging){var a,n=null===(a=new Error("ok").stack)||void 0===a?void 0:a.split("\n")[2].trim(),r=null===n||void 0===n?void 0:n.indexOf("("),i=null===t||void 0===t?void 0:t.substring(3,r).trim();console.debug(i+e)}else console.log(t)}}]),e}();k.instance=void 0;var b=p.a.create({baseURL:"http://jpda.ngrok.io/api/"}),E=k.getInstance();b.interceptors.request.use(function(){var e=Object(m.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.debug("api::interceptor: request.url: "+t.url),e.next=3,E.acquireAccessToken(t.url);case 3:return a=e.sent,t.headers.Authorization="Bearer "+a,e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var y=b,j=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(u.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={headers:Array()},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;y.get("headers").then((function(t){var a=t.data;e.setState({headers:a})}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Headers received by server"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"key"),r.a.createElement("th",null,"value"))),r.a.createElement("tbody",null,this.state.headers.map((function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.key),r.a.createElement("td",null,e.value.length>100?e.value.substring(0,100)+".../snip":e.value))})))))}}]),a}(r.a.Component),O=(a(59),a(12)),w=a(8),A=a(14),C=function e(t,a){Object(u.a)(this,e),this.key=void 0,this.value=void 0,this.key=t,this.value=a},q=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).msalHandler=void 0,n.accountAvailable=void 0,n.state={claims:Array()},n.msalHandler=k.getInstance(),n.handleClick=n.handleClick.bind(Object(A.a)(n)),n.accountAvailable=!1,n}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.msalHandler.msalObj.getAccount()&&(this.accountAvailable=!0),this.accountAvailable&&this.parseToken(this.msalHandler.msalObj.getAccount().idToken)}},{key:"parseToken",value:function(e){var t=Object.keys(e).filter((function(e){return"decodedIdToken"!==e&&"rawIdToken"!==e})).map((function(t){return new C(t,Array.isArray(e[t])?e[t].join(","):e[t].toString())}));this.setState({claims:t})}},{key:"render",value:function(){return this.accountAvailable?r.a.createElement("div",null,r.a.createElement("h1",null,"User claims"),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"key"),r.a.createElement("th",null,"value"))),r.a.createElement("tbody",null,this.state.claims.map((function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.key),r.a.createElement("td",null,e.value.length>75?e.value.substring(0,75)+".../snip":e.value))}))))):r.a.createElement("div",null,r.a.createElement("button",{onClick:this.handleClick},"login"))}},{key:"handleClick",value:function(){var e=Object(m.a)(d.a.mark((function e(t){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log("clicked"),e.next=4,this.msalHandler.login();case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),a}(r.a.Component);function S(){var e=k.getInstance().getUserData();return r.a.createElement(O.a,null,r.a.createElement("div",{className:"nav-container"},r.a.createElement("nav",null,r.a.createElement("div",{className:"left-menu"},r.a.createElement(O.b,{to:"/"},"Home"),r.a.createElement(O.b,{to:"/auth"},e.accountAvailable?"Claims for "+e.displayName:"Login"),r.a.createElement(O.b,{to:"/headers"},"API + Headers")),r.a.createElement(O.b,{to:"/",className:"logo"},"ok"))),r.a.createElement("div",{className:"container"},r.a.createElement(w.c,null,r.a.createElement(w.a,{path:"/headers"},r.a.createElement(j,null)),r.a.createElement(w.a,{path:"/auth"},r.a.createElement(q,null)),r.a.createElement(w.a,{path:"/"},r.a.createElement(x,null)))))}function x(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Home"),r.a.createElement("p",null,"A simple example using msaljs, loginRedirect and state. Use ",r.a.createElement("a",{href:"/auth"},"Login")," to login or view your id_token claims. Use ",r.a.createElement("a",{href:"/headers"},"API + Headers")," to make an authenticated API call and echo back the headers received by the server."),r.a.createElement("p",null,"Code at ",r.a.createElement("a",{href:"https://github.com/jpda/msaljs-axios-intercept"},"https://github.com/jpda/msaljs-axios-intercept")))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[35,1,2]]]);
//# sourceMappingURL=main.f361f0b8.chunk.js.map