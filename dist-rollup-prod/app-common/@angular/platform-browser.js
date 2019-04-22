System.register(["@angular/common","@angular/core"],function(t,e){"use strict";var n,o,r,i,a,u,s,p,c,l,f,d,h,y,m,g,v,w,_,E,b,S,T,A,N,C,R,O,L,k,M,D,P,I,H,x,B,j,z,V,F,U;return{setters:[function(t){n=t.ɵparseCookieValue,o=t.DOCUMENT,r=t.PlatformLocation,i=t.isPlatformServer,a=t.ɵPLATFORM_BROWSER_ID,u=t.CommonModule},function(t){s=t.ɵglobal,p=t.Injectable,c=t.Inject,l=t.InjectionToken,f=t.ApplicationInitStatus,d=t.APP_INITIALIZER,h=t.Injector,y=t.NgProbeToken,m=t.Optional,g=t.NgZone,v=t.ViewEncapsulation,w=t.RendererStyleFlags2,_=t.PLATFORM_ID,E=t.ɵConsole,b=t.SecurityContext,S=t.ɵ_sanitizeHtml,T=t.ɵ_sanitizeStyle,A=t.ɵ_sanitizeUrl,N=t.PLATFORM_INITIALIZER,C=t.Sanitizer,R=t.createPlatformFactory,O=t.platformCore,L=t.ErrorHandler,k=t.ɵAPP_ROOT,M=t.RendererFactory2,D=t.Testability,P=t.APP_ID,I=t.NgModule,H=t.ApplicationModule,x=t.SkipSelf,B=t.inject,j=t.defineInjectable,z=t.Version,V=t.setTestabilityGetter,F=t.ApplicationRef,U=t.getDebugNode}],execute:function(){t({disableDebugTools:function(){yt(Ne,null)},enableDebugTools:function(t){return yt(Ne,new Ae(t)),t},makeStateKey:function(t){return t},"ɵangular_packages_platform_browser_platform_browser_a":me,"ɵangular_packages_platform_browser_platform_browser_b":ge,"ɵangular_packages_platform_browser_platform_browser_d":we,"ɵangular_packages_platform_browser_platform_browser_e":Ee,"ɵangular_packages_platform_browser_platform_browser_f":Re,"ɵangular_packages_platform_browser_platform_browser_h":ft,"ɵangular_packages_platform_browser_platform_browser_j":_t,"ɵescapeHtml":function(t){var e={"&":"&a;",'"':"&q;","'":"&s;","<":"&l;",">":"&g;"};return t.replace(/[&"'<>]/g,function(t){return e[t]})},"ɵflattenStyles":Dt,"ɵgetDOM":Y,"ɵinitDomAdapter":ye,"ɵsetRootDomAdapter":Q,"ɵshimContentAttribute":kt,"ɵshimHostAttribute":Mt});var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,n)};function G(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}var Z=function(){return(Z=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};function K(t,e,n,o){var r,i=arguments.length,a=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var u=t.length-1;u>=0;u--)(r=t[u])&&(a=(i<3?r(a):i>3?r(e,n,a):r(e,n))||a);return i>3&&a&&Object.defineProperty(e,n,a),a}function q(t,e){return function(n,o){e(n,o,t)}}function W(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}function J(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var o,r,i=n.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(o=i.next()).done;)a.push(o.value)}catch(t){r={error:t}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(r)throw r.error}}return a}var X=null;function Y(){return X}function Q(t){X||(X=t)}var $,tt=t("ɵDomAdapter",function(){function t(){this.resourceLoaderType=null}return Object.defineProperty(t.prototype,"attrToPropMap",{get:function(){return this._attrToPropMap},set:function(t){this._attrToPropMap=t},enumerable:!0,configurable:!0}),t}()),et=t("ɵangular_packages_platform_browser_platform_browser_k",function(t){function e(){var e=t.call(this)||this;e._animationPrefix=null,e._transitionEnd=null;try{var n=e.createElement("div",document);if(null!=e.getStyle(n,"animationName"))e._animationPrefix="";else for(var o=["Webkit","Moz","O","ms"],r=0;r<o.length;r++)if(null!=e.getStyle(n,o[r]+"AnimationName")){e._animationPrefix="-"+o[r].toLowerCase()+"-";break}var i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};Object.keys(i).forEach(function(t){null!=e.getStyle(n,t)&&(e._transitionEnd=i[t])})}catch(t){e._animationPrefix=null,e._transitionEnd=null}return e}return G(e,t),e.prototype.getDistributedNodes=function(t){return t.getDistributedNodes()},e.prototype.resolveAndSetHref=function(t,e,n){t.href=null==n?e:e+"/../"+n},e.prototype.supportsDOMEvents=function(){return!0},e.prototype.supportsNativeShadowDOM=function(){return"function"==typeof document.body.createShadowRoot},e.prototype.getAnimationPrefix=function(){return this._animationPrefix?this._animationPrefix:""},e.prototype.getTransitionEnd=function(){return this._transitionEnd?this._transitionEnd:""},e.prototype.supportsAnimation=function(){return null!=this._animationPrefix&&null!=this._transitionEnd},e}(tt)),nt={class:"className",innerHtml:"innerHTML",readonly:"readOnly",tabindex:"tabIndex"},ot={"\b":"Backspace","\t":"Tab","":"Delete","":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},rt={A:"1",B:"2",C:"3",D:"4",E:"5",F:"6",G:"7",H:"8",I:"9",J:"*",K:"+",M:"-",N:".",O:"/","`":"0","":"NumLock"};s.Node&&($=s.Node.prototype.contains||function(t){return!!(16&this.compareDocumentPosition(t))});var it,at=t("ɵBrowserDomAdapter",function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return G(e,t),e.prototype.parse=function(t){throw new Error("parse not implemented")},e.makeCurrent=function(){Q(new e)},e.prototype.hasProperty=function(t,e){return e in t},e.prototype.setProperty=function(t,e,n){t[e]=n},e.prototype.getProperty=function(t,e){return t[e]},e.prototype.invoke=function(t,e,n){var o;(o=t)[e].apply(o,function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(J(arguments[e]));return t}(n))},e.prototype.logError=function(t){window.console&&(console.error?console.error(t):console.log(t))},e.prototype.log=function(t){window.console&&window.console.log&&window.console.log(t)},e.prototype.logGroup=function(t){window.console&&window.console.group&&window.console.group(t)},e.prototype.logGroupEnd=function(){window.console&&window.console.groupEnd&&window.console.groupEnd()},Object.defineProperty(e.prototype,"attrToPropMap",{get:function(){return nt},enumerable:!0,configurable:!0}),e.prototype.contains=function(t,e){return $.call(t,e)},e.prototype.querySelector=function(t,e){return t.querySelector(e)},e.prototype.querySelectorAll=function(t,e){return t.querySelectorAll(e)},e.prototype.on=function(t,e,n){t.addEventListener(e,n,!1)},e.prototype.onAndCancel=function(t,e,n){return t.addEventListener(e,n,!1),function(){t.removeEventListener(e,n,!1)}},e.prototype.dispatchEvent=function(t,e){t.dispatchEvent(e)},e.prototype.createMouseEvent=function(t){var e=this.getDefaultDocument().createEvent("MouseEvent");return e.initEvent(t,!0,!0),e},e.prototype.createEvent=function(t){var e=this.getDefaultDocument().createEvent("Event");return e.initEvent(t,!0,!0),e},e.prototype.preventDefault=function(t){t.preventDefault(),t.returnValue=!1},e.prototype.isPrevented=function(t){return t.defaultPrevented||null!=t.returnValue&&!t.returnValue},e.prototype.getInnerHTML=function(t){return t.innerHTML},e.prototype.getTemplateContent=function(t){return"content"in t&&this.isTemplateElement(t)?t.content:null},e.prototype.getOuterHTML=function(t){return t.outerHTML},e.prototype.nodeName=function(t){return t.nodeName},e.prototype.nodeValue=function(t){return t.nodeValue},e.prototype.type=function(t){return t.type},e.prototype.content=function(t){return this.hasProperty(t,"content")?t.content:t},e.prototype.firstChild=function(t){return t.firstChild},e.prototype.nextSibling=function(t){return t.nextSibling},e.prototype.parentElement=function(t){return t.parentNode},e.prototype.childNodes=function(t){return t.childNodes},e.prototype.childNodesAsList=function(t){for(var e=t.childNodes,n=new Array(e.length),o=0;o<e.length;o++)n[o]=e[o];return n},e.prototype.clearNodes=function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},e.prototype.appendChild=function(t,e){t.appendChild(e)},e.prototype.removeChild=function(t,e){t.removeChild(e)},e.prototype.replaceChild=function(t,e,n){t.replaceChild(e,n)},e.prototype.remove=function(t){return t.parentNode&&t.parentNode.removeChild(t),t},e.prototype.insertBefore=function(t,e,n){t.insertBefore(n,e)},e.prototype.insertAllBefore=function(t,e,n){n.forEach(function(n){return t.insertBefore(n,e)})},e.prototype.insertAfter=function(t,e,n){t.insertBefore(n,e.nextSibling)},e.prototype.setInnerHTML=function(t,e){t.innerHTML=e},e.prototype.getText=function(t){return t.textContent},e.prototype.setText=function(t,e){t.textContent=e},e.prototype.getValue=function(t){return t.value},e.prototype.setValue=function(t,e){t.value=e},e.prototype.getChecked=function(t){return t.checked},e.prototype.setChecked=function(t,e){t.checked=e},e.prototype.createComment=function(t){return this.getDefaultDocument().createComment(t)},e.prototype.createTemplate=function(t){var e=this.getDefaultDocument().createElement("template");return e.innerHTML=t,e},e.prototype.createElement=function(t,e){return(e=e||this.getDefaultDocument()).createElement(t)},e.prototype.createElementNS=function(t,e,n){return(n=n||this.getDefaultDocument()).createElementNS(t,e)},e.prototype.createTextNode=function(t,e){return(e=e||this.getDefaultDocument()).createTextNode(t)},e.prototype.createScriptTag=function(t,e,n){var o=(n=n||this.getDefaultDocument()).createElement("SCRIPT");return o.setAttribute(t,e),o},e.prototype.createStyleElement=function(t,e){var n=(e=e||this.getDefaultDocument()).createElement("style");return this.appendChild(n,this.createTextNode(t,e)),n},e.prototype.createShadowRoot=function(t){return t.createShadowRoot()},e.prototype.getShadowRoot=function(t){return t.shadowRoot},e.prototype.getHost=function(t){return t.host},e.prototype.clone=function(t){return t.cloneNode(!0)},e.prototype.getElementsByClassName=function(t,e){return t.getElementsByClassName(e)},e.prototype.getElementsByTagName=function(t,e){return t.getElementsByTagName(e)},e.prototype.classList=function(t){return Array.prototype.slice.call(t.classList,0)},e.prototype.addClass=function(t,e){t.classList.add(e)},e.prototype.removeClass=function(t,e){t.classList.remove(e)},e.prototype.hasClass=function(t,e){return t.classList.contains(e)},e.prototype.setStyle=function(t,e,n){t.style[e]=n},e.prototype.removeStyle=function(t,e){t.style[e]=""},e.prototype.getStyle=function(t,e){return t.style[e]},e.prototype.hasStyle=function(t,e,n){var o=this.getStyle(t,e)||"";return n?o==n:o.length>0},e.prototype.tagName=function(t){return t.tagName},e.prototype.attributeMap=function(t){for(var e=new Map,n=t.attributes,o=0;o<n.length;o++){var r=n.item(o);e.set(r.name,r.value)}return e},e.prototype.hasAttribute=function(t,e){return t.hasAttribute(e)},e.prototype.hasAttributeNS=function(t,e,n){return t.hasAttributeNS(e,n)},e.prototype.getAttribute=function(t,e){return t.getAttribute(e)},e.prototype.getAttributeNS=function(t,e,n){return t.getAttributeNS(e,n)},e.prototype.setAttribute=function(t,e,n){t.setAttribute(e,n)},e.prototype.setAttributeNS=function(t,e,n,o){t.setAttributeNS(e,n,o)},e.prototype.removeAttribute=function(t,e){t.removeAttribute(e)},e.prototype.removeAttributeNS=function(t,e,n){t.removeAttributeNS(e,n)},e.prototype.templateAwareRoot=function(t){return this.isTemplateElement(t)?this.content(t):t},e.prototype.createHtmlDocument=function(){return document.implementation.createHTMLDocument("fakeTitle")},e.prototype.getDefaultDocument=function(){return document},e.prototype.getBoundingClientRect=function(t){try{return t.getBoundingClientRect()}catch(t){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}},e.prototype.getTitle=function(t){return t.title},e.prototype.setTitle=function(t,e){t.title=e||""},e.prototype.elementMatches=function(t,e){return!!this.isElementNode(t)&&(t.matches&&t.matches(e)||t.msMatchesSelector&&t.msMatchesSelector(e)||t.webkitMatchesSelector&&t.webkitMatchesSelector(e))},e.prototype.isTemplateElement=function(t){return this.isElementNode(t)&&"TEMPLATE"===t.nodeName},e.prototype.isTextNode=function(t){return t.nodeType===Node.TEXT_NODE},e.prototype.isCommentNode=function(t){return t.nodeType===Node.COMMENT_NODE},e.prototype.isElementNode=function(t){return t.nodeType===Node.ELEMENT_NODE},e.prototype.hasShadowRoot=function(t){return null!=t.shadowRoot&&t instanceof HTMLElement},e.prototype.isShadowRoot=function(t){return t instanceof DocumentFragment},e.prototype.importIntoDoc=function(t){return document.importNode(this.templateAwareRoot(t),!0)},e.prototype.adoptNode=function(t){return document.adoptNode(t)},e.prototype.getHref=function(t){return t.getAttribute("href")},e.prototype.getEventKey=function(t){var e=t.key;if(null==e){if(null==(e=t.keyIdentifier))return"Unidentified";e.startsWith("U+")&&(e=String.fromCharCode(parseInt(e.substring(2),16)),3===t.location&&rt.hasOwnProperty(e)&&(e=rt[e]))}return ot[e]||e},e.prototype.getGlobalEventTarget=function(t,e){return"window"===e?window:"document"===e?t:"body"===e?t.body:null},e.prototype.getHistory=function(){return window.history},e.prototype.getLocation=function(){return window.location},e.prototype.getBaseHref=function(t){var e=function(){if(!ut&&!(ut=document.querySelector("base")))return null;return ut.getAttribute("href")}();return null==e?null:function(t){it||(it=document.createElement("a"));return it.setAttribute("href",t),"/"===it.pathname.charAt(0)?it.pathname:"/"+it.pathname}(e)},e.prototype.resetBaseElement=function(){ut=null},e.prototype.getUserAgent=function(){return window.navigator.userAgent},e.prototype.setData=function(t,e,n){this.setAttribute(t,"data-"+e,n)},e.prototype.getData=function(t,e){return this.getAttribute(t,"data-"+e)},e.prototype.getComputedStyle=function(t){return getComputedStyle(t)},e.prototype.supportsWebAnimation=function(){return"function"==typeof Element.prototype.animate},e.prototype.performanceNow=function(){return window.performance&&window.performance.now?window.performance.now():(new Date).getTime()},e.prototype.supportsCookies=function(){return!0},e.prototype.getCookie=function(t){return n(document.cookie,t)},e.prototype.setCookie=function(t,e){document.cookie=encodeURIComponent(t)+"="+encodeURIComponent(e)},e}(et)),ut=null;var st=t("DOCUMENT",o);function pt(){return!!window.history.pushState}var ct=t("ɵBrowserPlatformLocation",function(t){function e(e){var n=t.call(this)||this;return n._doc=e,n._init(),n}return G(e,t),e.prototype._init=function(){this.location=Y().getLocation(),this._history=Y().getHistory()},e.prototype.getBaseHrefFromDOM=function(){return Y().getBaseHref(this._doc)},e.prototype.onPopState=function(t){Y().getGlobalEventTarget(this._doc,"window").addEventListener("popstate",t,!1)},e.prototype.onHashChange=function(t){Y().getGlobalEventTarget(this._doc,"window").addEventListener("hashchange",t,!1)},Object.defineProperty(e.prototype,"pathname",{get:function(){return this.location.pathname},set:function(t){this.location.pathname=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"search",{get:function(){return this.location.search},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hash",{get:function(){return this.location.hash},enumerable:!0,configurable:!0}),e.prototype.pushState=function(t,e,n){pt()?this._history.pushState(t,e,n):this.location.hash=n},e.prototype.replaceState=function(t,e,n){pt()?this._history.replaceState(t,e,n):this.location.hash=n},e.prototype.forward=function(){this._history.forward()},e.prototype.back=function(){this._history.back()},e=K([p(),q(0,c(st)),W("design:paramtypes",[Object])],e)}(r)),lt=t("ɵTRANSITION_ID",new l("TRANSITION_ID"));function ft(t,e,n){return function(){n.get(f).donePromise.then(function(){var n=Y();Array.prototype.slice.apply(n.querySelectorAll(e,"style[ng-transition]")).filter(function(e){return n.getAttribute(e,"ng-transition")===t}).forEach(function(t){return n.remove(t)})})}}var dt=t("ɵangular_packages_platform_browser_platform_browser_i",[{provide:d,useFactory:ft,deps:[lt,st,h],multi:!0}]),ht=t("ɵBrowserGetTestability",function(){function t(){}return t.init=function(){V(new t)},t.prototype.addToWindow=function(t){s.getAngularTestability=function(e,n){void 0===n&&(n=!0);var o=t.findTestabilityInTree(e,n);if(null==o)throw new Error("Could not find testability for element.");return o},s.getAllAngularTestabilities=function(){return t.getAllTestabilities()},s.getAllAngularRootElements=function(){return t.getAllRootElements()};s.frameworkStabilizers||(s.frameworkStabilizers=[]),s.frameworkStabilizers.push(function(t){var e=s.getAllAngularTestabilities(),n=e.length,o=!1,r=function(e){o=o||e,0==--n&&t(o)};e.forEach(function(t){t.whenStable(r)})})},t.prototype.findTestabilityInTree=function(t,e,n){if(null==e)return null;var o=t.getTestability(e);return null!=o?o:n?Y().isShadowRoot(e)?this.findTestabilityInTree(t,Y().getHost(e),!0):this.findTestabilityInTree(t,Y().parentElement(e),!0):null},t}());function yt(t,e){"undefined"!=typeof COMPILED&&COMPILED||((s.ng=s.ng||{})[t]=e)}var mt={ApplicationRef:F,NgZone:g},gt="probe",vt="coreTokens";function wt(t){return U(t)}function _t(t){return yt(gt,wt),yt(vt,Z({},mt,(t||[]).reduce(function(t,e){return t[e.name]=e.token,t},{}))),function(){return wt}}var Et=t("ɵELEMENT_PROBE_PROVIDERS",[{provide:d,useFactory:_t,deps:[[y,new m]],multi:!0}]),bt=t("EVENT_MANAGER_PLUGINS",new l("EventManagerPlugins")),St=t("EventManager",function(){function t(t,e){var n=this;this._zone=e,this._eventNameToPlugin=new Map,t.forEach(function(t){return t.manager=n}),this._plugins=t.slice().reverse()}return t.prototype.addEventListener=function(t,e,n){return this._findPluginFor(e).addEventListener(t,e,n)},t.prototype.addGlobalEventListener=function(t,e,n){return this._findPluginFor(e).addGlobalEventListener(t,e,n)},t.prototype.getZone=function(){return this._zone},t.prototype._findPluginFor=function(t){var e=this._eventNameToPlugin.get(t);if(e)return e;for(var n=this._plugins,o=0;o<n.length;o++){var r=n[o];if(r.supports(t))return this._eventNameToPlugin.set(t,r),r}throw new Error("No event manager plugin found for event "+t)},t=K([p(),q(0,c(bt)),W("design:paramtypes",[Array,g])],t)}()),Tt=t("ɵangular_packages_platform_browser_platform_browser_g",function(){function t(t){this._doc=t}return t.prototype.addGlobalEventListener=function(t,e,n){var o=Y().getGlobalEventTarget(this._doc,t);if(!o)throw new Error("Unsupported event target "+o+" for event "+e);return this.addEventListener(o,e,n)},t}()),At=t("ɵSharedStylesHost",function(){function t(){this._stylesSet=new Set}return t.prototype.addStyles=function(t){var e=this,n=new Set;t.forEach(function(t){e._stylesSet.has(t)||(e._stylesSet.add(t),n.add(t))}),this.onStylesAdded(n)},t.prototype.onStylesAdded=function(t){},t.prototype.getAllStyles=function(){return Array.from(this._stylesSet)},t=K([p()],t)}()),Nt=t("ɵDomSharedStylesHost",function(t){function e(e){var n=t.call(this)||this;return n._doc=e,n._hostNodes=new Set,n._styleNodes=new Set,n._hostNodes.add(e.head),n}return G(e,t),e.prototype._addStylesToHost=function(t,e){var n=this;t.forEach(function(t){var o=n._doc.createElement("style");o.textContent=t,n._styleNodes.add(e.appendChild(o))})},e.prototype.addHost=function(t){this._addStylesToHost(this._stylesSet,t),this._hostNodes.add(t)},e.prototype.removeHost=function(t){this._hostNodes.delete(t)},e.prototype.onStylesAdded=function(t){var e=this;this._hostNodes.forEach(function(n){return e._addStylesToHost(t,n)})},e.prototype.ngOnDestroy=function(){this._styleNodes.forEach(function(t){return Y().remove(t)})},e=K([p(),q(0,c(st)),W("design:paramtypes",[Object])],e)}(At)),Ct=t("ɵNAMESPACE_URIS",{svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"}),Rt=/%COMP%/g,Ot="_nghost-%COMP%",Lt="_ngcontent-%COMP%";function kt(t){return Lt.replace(Rt,t)}function Mt(t){return Ot.replace(Rt,t)}function Dt(t,e,n){for(var o=0;o<e.length;o++){var r=e[o];Array.isArray(r)?Dt(t,r,n):(r=r.replace(Rt,t),n.push(r))}return n}function Pt(t){return function(e){!1===t(e)&&(e.preventDefault(),e.returnValue=!1)}}var It=t("ɵDomRendererFactory2",function(){function t(t,e){this.eventManager=t,this.sharedStylesHost=e,this.rendererByCompId=new Map,this.defaultRenderer=new Ht(t)}return t.prototype.createRenderer=function(t,e){if(!t||!e)return this.defaultRenderer;switch(e.encapsulation){case v.Emulated:var n=this.rendererByCompId.get(e.id);return n||(n=new zt(this.eventManager,this.sharedStylesHost,e),this.rendererByCompId.set(e.id,n)),n.applyToHost(t),n;case v.Native:case v.ShadowDom:return new Vt(this.eventManager,this.sharedStylesHost,t,e);default:if(!this.rendererByCompId.has(e.id)){var o=Dt(e.id,e.styles,[]);this.sharedStylesHost.addStyles(o),this.rendererByCompId.set(e.id,this.defaultRenderer)}return this.defaultRenderer}},t.prototype.begin=function(){},t.prototype.end=function(){},t=K([p(),W("design:paramtypes",[St,Nt])],t)}()),Ht=function(){function t(t){this.eventManager=t,this.data=Object.create(null)}return t.prototype.destroy=function(){},t.prototype.createElement=function(t,e){return e?document.createElementNS(Ct[e],t):document.createElement(t)},t.prototype.createComment=function(t){return document.createComment(t)},t.prototype.createText=function(t){return document.createTextNode(t)},t.prototype.appendChild=function(t,e){t.appendChild(e)},t.prototype.insertBefore=function(t,e,n){t&&t.insertBefore(e,n)},t.prototype.removeChild=function(t,e){t&&t.removeChild(e)},t.prototype.selectRootElement=function(t,e){var n="string"==typeof t?document.querySelector(t):t;if(!n)throw new Error('The selector "'+t+'" did not match any elements');return e||(n.textContent=""),n},t.prototype.parentNode=function(t){return t.parentNode},t.prototype.nextSibling=function(t){return t.nextSibling},t.prototype.setAttribute=function(t,e,n,o){if(o){e=o+":"+e;var r=Ct[o];r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}else t.setAttribute(e,n)},t.prototype.removeAttribute=function(t,e,n){if(n){var o=Ct[n];o?t.removeAttributeNS(o,e):t.removeAttribute(n+":"+e)}else t.removeAttribute(e)},t.prototype.addClass=function(t,e){t.classList.add(e)},t.prototype.removeClass=function(t,e){t.classList.remove(e)},t.prototype.setStyle=function(t,e,n,o){o&w.DashCase?t.style.setProperty(e,n,o&w.Important?"important":""):t.style[e]=n},t.prototype.removeStyle=function(t,e,n){n&w.DashCase?t.style.removeProperty(e):t.style[e]=""},t.prototype.setProperty=function(t,e,n){Bt(e,"property"),t[e]=n},t.prototype.setValue=function(t,e){t.nodeValue=e},t.prototype.listen=function(t,e,n){return Bt(e,"listener"),"string"==typeof t?this.eventManager.addGlobalEventListener(t,e,Pt(n)):this.eventManager.addEventListener(t,e,Pt(n))},t}(),xt="@".charCodeAt(0);function Bt(t,e){if(t.charCodeAt(0)===xt)throw new Error("Found the synthetic "+e+" "+t+'. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.')}var jt,zt=function(t){function e(e,n,o){var r=t.call(this,e)||this;r.component=o;var i=Dt(o.id,o.styles,[]);return n.addStyles(i),r.contentAttr=kt(o.id),r.hostAttr=Mt(o.id),r}return G(e,t),e.prototype.applyToHost=function(e){t.prototype.setAttribute.call(this,e,this.hostAttr,"")},e.prototype.createElement=function(e,n){var o=t.prototype.createElement.call(this,e,n);return t.prototype.setAttribute.call(this,o,this.contentAttr,""),o},e}(Ht),Vt=function(t){function e(e,n,o,r){var i=t.call(this,e)||this;i.sharedStylesHost=n,i.hostEl=o,i.component=r,r.encapsulation===v.ShadowDom?i.shadowRoot=o.attachShadow({mode:"open"}):i.shadowRoot=o.createShadowRoot(),i.sharedStylesHost.addHost(i.shadowRoot);for(var a=Dt(r.id,r.styles,[]),u=0;u<a.length;u++){var s=document.createElement("style");s.textContent=a[u],i.shadowRoot.appendChild(s)}return i}return G(e,t),e.prototype.nodeOrShadowRoot=function(t){return t===this.hostEl?this.shadowRoot:t},e.prototype.destroy=function(){this.sharedStylesHost.removeHost(this.shadowRoot)},e.prototype.appendChild=function(e,n){return t.prototype.appendChild.call(this,this.nodeOrShadowRoot(e),n)},e.prototype.insertBefore=function(e,n,o){return t.prototype.insertBefore.call(this,this.nodeOrShadowRoot(e),n,o)},e.prototype.removeChild=function(e,n){return t.prototype.removeChild.call(this,this.nodeOrShadowRoot(e),n)},e.prototype.parentNode=function(e){return this.nodeOrShadowRoot(t.prototype.parentNode.call(this,this.nodeOrShadowRoot(e)))},e}(Ht),Ft="undefined"!=typeof Zone&&Zone.__symbol__||function(t){return"__zone_symbol__"+t},Ut=Ft("addEventListener"),Gt=Ft("removeEventListener"),Zt={},Kt="__zone_symbol__propagationStopped",qt="undefined"!=typeof Zone&&Zone[Ft("BLACK_LISTED_EVENTS")];qt&&(jt={},qt.forEach(function(t){jt[t]=t}));var Wt=function(t){return!!jt&&jt.hasOwnProperty(t)},Jt=function(t){var e=Zt[t.type];if(e){var n=this[e];if(n){var o=[t];if(1===n.length)return(a=n[0]).zone!==Zone.current?a.zone.run(a.handler,this,o):a.handler.apply(this,o);for(var r=n.slice(),i=0;i<r.length&&!0!==t[Kt];i++){var a;(a=r[i]).zone!==Zone.current?a.zone.run(a.handler,this,o):a.handler.apply(this,o)}}}},Xt=t("ɵDomEventsPlugin",function(t){function e(e,n,o){var r=t.call(this,e)||this;return r.ngZone=n,o&&i(o)||r.patchEvent(),r}return G(e,t),e.prototype.patchEvent=function(){if("undefined"!=typeof Event&&Event&&Event.prototype&&!Event.prototype.__zone_symbol__stopImmediatePropagation){var t=Event.prototype.__zone_symbol__stopImmediatePropagation=Event.prototype.stopImmediatePropagation;Event.prototype.stopImmediatePropagation=function(){this&&(this[Kt]=!0),t&&t.apply(this,arguments)}}},e.prototype.supports=function(t){return!0},e.prototype.addEventListener=function(t,e,n){var o=this,r=t[Ut],i=n;if(!r||g.isInAngularZone()&&!Wt(e))t.addEventListener(e,i,!1);else{var a=Zt[e];a||(a=Zt[e]=Ft("ANGULAR"+e+"FALSE"));var u=t[a],s=u&&u.length>0;u||(u=t[a]=[]);var p=Wt(e)?Zone.root:Zone.current;if(0===u.length)u.push({zone:p,handler:i});else{for(var c=!1,l=0;l<u.length;l++)if(u[l].handler===i){c=!0;break}c||u.push({zone:p,handler:i})}s||t[Ut](e,Jt,!1)}return function(){return o.removeEventListener(t,e,i)}},e.prototype.removeEventListener=function(t,e,n){var o=t[Gt];if(!o)return t.removeEventListener.apply(t,[e,n,!1]);var r=Zt[e],i=r&&t[r];if(!i)return t.removeEventListener.apply(t,[e,n,!1]);for(var a=!1,u=0;u<i.length;u++)if(i[u].handler===n){a=!0,i.splice(u,1);break}a?0===i.length&&o.apply(t,[e,Jt,!1]):t.removeEventListener.apply(t,[e,n,!1])},e=K([p(),q(0,c(st)),q(2,m()),q(2,c(_)),W("design:paramtypes",[Object,g,Object])],e)}(Tt)),Yt={pan:!0,panstart:!0,panmove:!0,panend:!0,pancancel:!0,panleft:!0,panright:!0,panup:!0,pandown:!0,pinch:!0,pinchstart:!0,pinchmove:!0,pinchend:!0,pinchcancel:!0,pinchin:!0,pinchout:!0,press:!0,pressup:!0,rotate:!0,rotatestart:!0,rotatemove:!0,rotateend:!0,rotatecancel:!0,swipe:!0,swipeleft:!0,swiperight:!0,swipeup:!0,swipedown:!0,tap:!0},Qt=t("HAMMER_GESTURE_CONFIG",new l("HammerGestureConfig")),$t=t("HAMMER_LOADER",new l("HammerLoader")),te=t("HammerGestureConfig",function(){function t(){this.events=[],this.overrides={}}return t.prototype.buildHammer=function(t){var e=new Hammer(t,this.options);for(var n in e.get("pinch").set({enable:!0}),e.get("rotate").set({enable:!0}),this.overrides)e.get(n).set(this.overrides[n]);return e},t=K([p()],t)}()),ee=t("ɵHammerGesturesPlugin",function(t){function e(e,n,o,r){var i=t.call(this,e)||this;return i._config=n,i.console=o,i.loader=r,i}return G(e,t),e.prototype.supports=function(t){return!(!Yt.hasOwnProperty(t.toLowerCase())&&!this.isCustomEvent(t))&&(!(!window.Hammer&&!this.loader)||(this.console.warn('The "'+t+'" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.'),!1))},e.prototype.addEventListener=function(t,e,n){var o=this,r=this.manager.getZone();if(e=e.toLowerCase(),!window.Hammer&&this.loader){var i=!1,a=function(){i=!0};return this.loader().then(function(){if(!window.Hammer)return o.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present."),void(a=function(){});i||(a=o.addEventListener(t,e,n))}).catch(function(){o.console.warn('The "'+e+'" event cannot be bound because the custom Hammer.JS loader failed.'),a=function(){}}),function(){a()}}return r.runOutsideAngular(function(){var i=o._config.buildHammer(t),a=function(t){r.runGuarded(function(){n(t)})};return i.on(e,a),function(){i.off(e,a),"function"==typeof i.destroy&&i.destroy()}})},e.prototype.isCustomEvent=function(t){return this._config.events.indexOf(t)>-1},e=K([p(),q(0,c(st)),q(1,c(Qt)),q(3,m()),q(3,c($t)),W("design:paramtypes",[Object,te,E,Object])],e)}(Tt)),ne=["alt","control","meta","shift"],oe={alt:function(t){return t.altKey},control:function(t){return t.ctrlKey},meta:function(t){return t.metaKey},shift:function(t){return t.shiftKey}},re=t("ɵKeyEventsPlugin",function(t){function e(e){return t.call(this,e)||this}var n;return G(e,t),n=e,e.prototype.supports=function(t){return null!=n.parseEventName(t)},e.prototype.addEventListener=function(t,e,o){var r=n.parseEventName(e),i=n.eventCallback(r.fullKey,o,this.manager.getZone());return this.manager.getZone().runOutsideAngular(function(){return Y().onAndCancel(t,r.domEventName,i)})},e.parseEventName=function(t){var e=t.toLowerCase().split("."),o=e.shift();if(0===e.length||"keydown"!==o&&"keyup"!==o)return null;var r=n._normalizeKey(e.pop()),i="";if(ne.forEach(function(t){var n=e.indexOf(t);n>-1&&(e.splice(n,1),i+=t+".")}),i+=r,0!=e.length||0===r.length)return null;var a={};return a.domEventName=o,a.fullKey=i,a},e.getEventFullKey=function(t){var e="",n=Y().getEventKey(t);return" "===(n=n.toLowerCase())?n="space":"."===n&&(n="dot"),ne.forEach(function(o){o!=n&&((0,oe[o])(t)&&(e+=o+"."))}),e+=n},e.eventCallback=function(t,e,o){return function(r){n.getEventFullKey(r)===t&&o.runGuarded(function(){return e(r)})}},e._normalizeKey=function(t){switch(t){case"esc":return"escape";default:return t}},e=n=K([p(),q(0,c(st)),W("design:paramtypes",[Object])],e)}(Tt)),ie=t("DomSanitizer",function(){return function(){}}()),ae=t("ɵDomSanitizerImpl",function(t){function e(e){var n=t.call(this)||this;return n._doc=e,n}return G(e,t),e.prototype.sanitize=function(t,e){if(null==e)return null;switch(t){case b.NONE:return e;case b.HTML:return e instanceof se?e.changingThisBreaksApplicationSecurity:(this.checkNotSafeValue(e,"HTML"),S(this._doc,String(e)));case b.STYLE:return e instanceof pe?e.changingThisBreaksApplicationSecurity:(this.checkNotSafeValue(e,"Style"),T(e));case b.SCRIPT:if(e instanceof ce)return e.changingThisBreaksApplicationSecurity;throw this.checkNotSafeValue(e,"Script"),new Error("unsafe value used in a script context");case b.URL:return e instanceof fe||e instanceof le?e.changingThisBreaksApplicationSecurity:(this.checkNotSafeValue(e,"URL"),A(String(e)));case b.RESOURCE_URL:if(e instanceof fe)return e.changingThisBreaksApplicationSecurity;throw this.checkNotSafeValue(e,"ResourceURL"),new Error("unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");default:throw new Error("Unexpected SecurityContext "+t+" (see http://g.co/ng/security#xss)")}},e.prototype.checkNotSafeValue=function(t,e){if(t instanceof ue)throw new Error("Required a safe "+e+", got a "+t.getTypeName()+" (see http://g.co/ng/security#xss)")},e.prototype.bypassSecurityTrustHtml=function(t){return new se(t)},e.prototype.bypassSecurityTrustStyle=function(t){return new pe(t)},e.prototype.bypassSecurityTrustScript=function(t){return new ce(t)},e.prototype.bypassSecurityTrustUrl=function(t){return new le(t)},e.prototype.bypassSecurityTrustResourceUrl=function(t){return new fe(t)},e=K([p(),q(0,c(st)),W("design:paramtypes",[Object])],e)}(ie)),ue=function(){function t(t){this.changingThisBreaksApplicationSecurity=t}return t.prototype.toString=function(){return"SafeValue must use [property]=binding: "+this.changingThisBreaksApplicationSecurity+" (see http://g.co/ng/security#xss)"},t}(),se=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return G(e,t),e.prototype.getTypeName=function(){return"HTML"},e}(ue),pe=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return G(e,t),e.prototype.getTypeName=function(){return"Style"},e}(ue),ce=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return G(e,t),e.prototype.getTypeName=function(){return"Script"},e}(ue),le=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return G(e,t),e.prototype.getTypeName=function(){return"URL"},e}(ue),fe=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return G(e,t),e.prototype.getTypeName=function(){return"ResourceURL"},e}(ue),de=t("ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS",[{provide:_,useValue:a},{provide:N,useValue:ye,multi:!0},{provide:r,useClass:ct,deps:[st]},{provide:st,useFactory:ge,deps:[]}]),he=t("ɵBROWSER_SANITIZATION_PROVIDERS",[{provide:C,useExisting:ie},{provide:ie,useClass:ae,deps:[st]}]);t("platformBrowser",R(O,"browser",de));function ye(){at.makeCurrent(),ht.init()}function me(){return new L}function ge(){return document}var ve=t("ɵangular_packages_platform_browser_platform_browser_c",[he,{provide:k,useValue:!0},{provide:L,useFactory:me,deps:[]},{provide:bt,useClass:Xt,multi:!0,deps:[st,g,_]},{provide:bt,useClass:re,multi:!0,deps:[st]},{provide:bt,useClass:ee,multi:!0,deps:[st,Qt,E,[new m,$t]]},{provide:Qt,useClass:te,deps:[]},{provide:It,useClass:It,deps:[St,Nt]},{provide:M,useExisting:It},{provide:At,useExisting:Nt},{provide:Nt,useClass:Nt,deps:[st]},{provide:D,useClass:D,deps:[g]},{provide:St,useClass:St,deps:[bt,g]},Et]);t("BrowserModule",function(){function t(t){if(t)throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")}var e;return e=t,t.withServerTransition=function(t){return{ngModule:e,providers:[{provide:P,useValue:t.appId},{provide:lt,useExisting:P},dt]}},t=e=K([I({providers:ve,exports:[u,H]}),q(0,m()),q(0,x()),q(0,c(e)),W("design:paramtypes",[Object])],t)}());function we(){return new _e(B(st))}var _e=t("Meta",function(){function t(t){this._doc=t,this._dom=Y()}return t.prototype.addTag=function(t,e){return void 0===e&&(e=!1),t?this._getOrCreateElement(t,e):null},t.prototype.addTags=function(t,e){var n=this;return void 0===e&&(e=!1),t?t.reduce(function(t,o){return o&&t.push(n._getOrCreateElement(o,e)),t},[]):[]},t.prototype.getTag=function(t){return t&&this._dom.querySelector(this._doc,"meta["+t+"]")||null},t.prototype.getTags=function(t){if(!t)return[];var e=this._dom.querySelectorAll(this._doc,"meta["+t+"]");return e?[].slice.call(e):[]},t.prototype.updateTag=function(t,e){if(!t)return null;e=e||this._parseSelector(t);var n=this.getTag(e);return n?this._setMetaElementAttributes(t,n):this._getOrCreateElement(t,!0)},t.prototype.removeTag=function(t){this.removeTagElement(this.getTag(t))},t.prototype.removeTagElement=function(t){t&&this._dom.remove(t)},t.prototype._getOrCreateElement=function(t,e){if(void 0===e&&(e=!1),!e){var n=this._parseSelector(t),o=this.getTag(n);if(o&&this._containsAttributes(t,o))return o}var r=this._dom.createElement("meta");this._setMetaElementAttributes(t,r);var i=this._dom.getElementsByTagName(this._doc,"head")[0];return this._dom.appendChild(i,r),r},t.prototype._setMetaElementAttributes=function(t,e){var n=this;return Object.keys(t).forEach(function(o){return n._dom.setAttribute(e,o,t[o])}),e},t.prototype._parseSelector=function(t){var e=t.name?"name":"property";return e+'="'+t[e]+'"'},t.prototype._containsAttributes=function(t,e){var n=this;return Object.keys(t).every(function(o){return n._dom.getAttribute(e,o)===t[o]})},t.ngInjectableDef=j({factory:we,token:t,providedIn:"root"}),t=K([p({providedIn:"root",useFactory:we,deps:[]}),q(0,c(st)),W("design:paramtypes",[Object])],t)}());function Ee(){return new be(B(st))}var be=t("Title",function(){function t(t){this._doc=t}return t.prototype.getTitle=function(){return Y().getTitle(this._doc)},t.prototype.setTitle=function(t){Y().setTitle(this._doc,t)},t.ngInjectableDef=j({factory:Ee,token:t,providedIn:"root"}),t=K([p({providedIn:"root",useFactory:Ee,deps:[]}),q(0,c(st)),W("design:paramtypes",[Object])],t)}()),Se="undefined"!=typeof window&&window||{},Te=function(){return function(t,e){this.msPerTick=t,this.numTicks=e}}(),Ae=function(){function t(t){this.appRef=t.injector.get(F)}return t.prototype.timeChangeDetection=function(t){var e=t&&t.record,n=null!=Se.console.profile;e&&n&&Se.console.profile("Change Detection");for(var o=Y().performanceNow(),r=0;r<5||Y().performanceNow()-o<500;)this.appRef.tick(),r++;var i=Y().performanceNow();e&&n&&Se.console.profileEnd("Change Detection");var a=(i-o)/r;return Se.console.log("ran "+r+" change detection cycles"),Se.console.log(a.toFixed(2)+" ms per check"),new Te(a,r)},t}(),Ne="profiler";var Ce=t("TransferState",function(){function t(){this.store={},this.onSerializeCallbacks={}}var e;return e=t,t.init=function(t){var n=new e;return n.store=t,n},t.prototype.get=function(t,e){return void 0!==this.store[t]?this.store[t]:e},t.prototype.set=function(t,e){this.store[t]=e},t.prototype.remove=function(t){delete this.store[t]},t.prototype.hasKey=function(t){return this.store.hasOwnProperty(t)},t.prototype.onSerialize=function(t,e){this.onSerializeCallbacks[t]=e},t.prototype.toJson=function(){for(var t in this.onSerializeCallbacks)if(this.onSerializeCallbacks.hasOwnProperty(t))try{this.store[t]=this.onSerializeCallbacks[t]()}catch(t){console.warn("Exception in onSerialize callback: ",t)}return JSON.stringify(this.store)},t=e=K([p()],t)}());function Re(t,e){var n,o,r=t.getElementById(e+"-state"),i={};if(r&&r.textContent)try{i=JSON.parse((n=r.textContent,o={"&a;":"&","&q;":'"',"&s;":"'","&l;":"<","&g;":">"},n.replace(/&[^;]+;/g,function(t){return o[t]})))}catch(t){console.warn("Exception while restoring TransferState for app "+e,t)}return Ce.init(i)}t("BrowserTransferStateModule",function(){function t(){}return t=K([I({providers:[{provide:Ce,useFactory:Re,deps:[st,P]}]})],t)}()),t("By",function(){function t(){}return t.all=function(){return function(t){return!0}},t.css=function(t){return function(e){return null!=e.nativeElement&&Y().elementMatches(e.nativeElement,t)}},t.directive=function(t){return function(e){return-1!==e.providerTokens.indexOf(t)}},t}()),t("VERSION",new z("7.2.4"))}}});
//# sourceMappingURL=platform-browser.js.map
