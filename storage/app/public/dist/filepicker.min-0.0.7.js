!function(e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).webit=e()}(function(){return function n(u,o,f){function l(t,e){if(!o[t]){if(!u[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(s)return s(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=o[t]={exports:{}},u[t][0].call(r.exports,function(e){return l(u[t][1][e]||e)},r,r.exports,n,u,o,f)}return o[t].exports}for(var s="function"==typeof require&&require,e=0;e<f.length;e++)l(f[e]);return l}({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){(0,u.default)(e).forEach(function(e){(0,n.default)(e,t)||(void 0!==e.classList?e.classList.add(t):e.className+=" "+t)})};var n=o(e("./hasClass")),u=o(e("./rea"));function o(e){return e&&e.__esModule?e:{default:e}}},{"./hasClass":7,"./rea":21}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var f=n(e("./re")),l=n(e("./isArrayLike")),s=n(e("./isEmpty")),a=n(e("./isTextContent"));function n(e){return e&&e.__esModule?e:{default:e}}r.default=function e(t,r){t=(0,f.default)(t);for(var n=(0,l.default)(r)?r:[r],u=0;u<n.length;u++){var o=n[u];(0,l.default)(o)?e(t,o):((0,a.default)(o)&&(o=document.createTextNode((0,s.default)(o)?"":o)),t.appendChild(o))}return r}},{"./isArrayLike":13,"./isEmpty":14,"./isTextContent":15,"./re":20}],3:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,r){function t(e){var t=e.target;if(o)for(;t&&t!==n;){if(t[l.default](o))return r&&e.preventDefault(),void(f&&f(e,t));t=t.parentNode}else r&&e.preventDefault(),f&&f(e,t)}var n=e.el,u=e.eventName,o=e.querySelector,f=e.cb;return n.addEventListener(u,t),t};var l=(r=e("../other/matchesMethodName"))&&r.__esModule?r:{default:r}},{"../other/matchesMethodName":17}],4:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(){return(0,u.default)((0,n.default)(arguments,"change"),!1)};var n=o(e("./parseArguments")),u=o(e("./addListener"));function o(e){return e&&e.__esModule?e:{default:e}}},{"./addListener":3,"./parseArguments":6}],5:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(){return(0,u.default)((0,n.default)(arguments),!0)};var n=o(e("./parseArguments")),u=o(e("./addListener"));function o(e){return e&&e.__esModule?e:{default:e}}},{"./addListener":3,"./parseArguments":6}],6:[function(e,t,r){"use strict";function u(e,t){return t<e.length?e[t]:void 0}function o(e,t){return"string"==typeof u(e,t)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){var r,n={el:void 0,eventName:void 0,querySelector:void 0,cb:void 0};return function(e,t){return"function"==typeof u(e,t)}(e,0)&&t?(n.el=document,n.cb=u(e,0),n.eventName=t):(o(e,r=0)?n.el=document:(n.el=u(e,r),r+=1),t?n.eventName=t:(n.eventName=u(e,r),r+=1),o(e,r)?(n.querySelector=u(e,r),n.cb=u(e,r+1)):n.cb=u(e,r)),n}},{}],7:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){return void 0!==(e=(0,n.default)(e)).classList?e.classList.contains(t):!!e.className.match(new RegExp("(?:^|\\s)"+t+"(?!\\S)","ig"))};var n=(r=e("./re"))&&r.__esModule?r:{default:r}},{"./re":20}],8:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){if(!e.headers)return!1;e=e.headers.get("content-type");return e&&0<=e.indexOf("application/json")}},{}],9:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){return(0,n.default)(e)?e.json():e.text()};var n=(r=e("./isResponseJson"))&&r.__esModule?r:{default:r}},{"./isResponseJson":8}],10:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){return(0,u.default)("POST",e,t).then(n.default)};var n=o(e("./jsonOrText")),u=o(e("./request"));function o(e){return e&&e.__esModule?e:{default:e}}},{"./jsonOrText":9,"./request":11}],11:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t,r){var n={headers:{"X-Requested-With":"XMLHttpRequest"},method:e};void 0!==r&&("GET"==e?(e=(0,u.default)(r).toString(),console.log(e),t+=e?"?"+e:""):n.body=(0,u.default)(r));return fetch(t,n)};var u=(r=e("./urlParams"))&&r.__esModule?r:{default:r}},{"./urlParams":12}],12:[function(e,t,r){"use strict";function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){for(var t=function e(t,r,n){void 0===r&&(r=[]);void 0===n&&(n=[]);for(var u in t){var o=Array.from(r);o.push(u),"object"===f(t[u])?n=e(t[u],o,n):n.push([o,t[u]])}return n}(e),r=new URLSearchParams,n=0;n<t.length;n++)r.append(function(e){for(var t="",r=0;r<e.length;r++)t+=0==r?e[r]:"["+e[r]+"]";return t}(t[n][0]),t[n][1]);return r}},{}],13:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){return"[object Array]"===Object.prototype.toString.call(e)||"[object NodeList]"===Object.prototype.toString.call(e)}},{}],14:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){return null==e}},{}],15:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){return"string"==typeof e||"number"==typeof e||null==e}},{}],16:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var f=n(e("./setAttributes")),l=n(e("./append"));function n(e){return e&&e.__esModule?e:{default:e}}r.default={Fragment:"fragment",h:function(e,t){var r;if(e===this.Fragment?r=new DocumentFragment:"function"==typeof e?r=e(t):(r=document.createElement(e),t&&(0,f.default)(r,t)),r){for(var n=arguments.length,u=new Array(2<n?n-2:0),o=2;o<n;o++)u[o-2]=arguments[o];(0,l.default)(r,u)}return r}}},{"./append":2,"./setAttributes":23}],17:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n="matches",n=n=(r.default=void 0)!==Element.prototype.msMatchesSelector?"msMatchesSelector":n;r.default=n},{}],18:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){var r;e="string"==typeof e?(r=document,e):(r=e,t);return r.querySelector(e)}},{}],19:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){var r;e="string"==typeof e?(r=document,e):(r=e,t);return r.querySelectorAll(e)}},{}],20:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){return"string"!=typeof e?e:(0,n.default)(e)};var n=(r=e("./q"))&&r.__esModule?r:{default:r}},{"./q":18}],21:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e){return"string"!=typeof e?"object"!=u(e)||void 0===e.tagName?e:[e]:(0,n.default)(e)};var n=(r=e("./qa"))&&r.__esModule?r:{default:r};function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}},{"./qa":19}],22:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){(0,n.default)(e).forEach(function(e){void 0!==e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(?:^|\\s)"+t+"(?!\\S)","ig"),"")})};var n=(r=e("./rea"))&&r.__esModule?r:{default:r}},{"./rea":21}],23:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){var r,n,u=(e=(0,f.default)(e)).tagName.toUpperCase();for(n in t)if(t.hasOwnProperty(n))if(r=t[n],"data-"==(n="className"==n?"class":n).substr(0,5))e.dataset[n.substr(5)]=r;else if("style"==n)for(var o in r)e.style[o]=r[o];else"checked"==n&&"INPUT"==u?e.checked=!!r:e.setAttribute(n,(0,l.default)(r)?"":r)};var f=n(e("./re")),l=n(e("./isEmpty"));function n(e){return e&&e.__esModule?e:{default:e}}},{"./isEmpty":14,"./re":20}],24:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,t){f=t,u=e,(0,l.default)(u,"[type=file]",function(e,t){m(t.files)}),(0,d.default)(u,"dragenter",function(){(0,s.default)(".file-picker","file-picker--dragover")}),(0,d.default)(u,"dragover"),(0,d.default)(u,"drop",function(e){(0,n.default)(".file-picker","file-picker--dragover"),m(e.dataTransfer.files)})};var u,o,f,n=v(e("dom-helpers/src/removeClass")),l=v(e("dom-helpers/src/event/change")),s=v(e("dom-helpers/src/addClass")),a=v(e("dom-helpers/src/http/post")),i=v(e("dom-helpers/src/append")),d=v(e("dom-helpers/src/event/onp")),c=v(e("dom-helpers/src/jsx")),p=v(e("dom-helpers/src/q"));function v(e){return e&&e.__esModule?e:{default:e}}var y=20971520;function m(e){for(var t,r=e,n=0;n<r.length;n++)(0,i.default)((0,p.default)(u,".file-list"),c.default.h("li",null,c.default.h("a",null,r[n].name),c.default.h("span",null,"0%")));(0,s.default)(u,"file-picker--file-list"),o?_(e):(t=function(){_(e)},(0,a.default)(f+"/new").then(function(e){o=e.hash,t()}))}function _(r){for(var n=0,e=0;e<r.length;e++)!function(t){if(r[t].size>y)return(0,p.default)(u,".file-list li:nth-of-type("+(t+1)+") span").innerHTML="Par lielu ("+Math.round(r[t].size/1024/1024)+"Mb)";var e=new FormData;e.append("file",r[t]),e.append("upload",o),fetch(f+"/upload",{headers:{"X-Requested-With":"XMLHttpRequest"},method:"POST",body:e}).then(function(e){return e.text()}).then(function(e){(0,p.default)(u,".file-list li:nth-of-type("+(t+1)+") span").innerHTML="100%",++n>=r.length&&((0,s.default)(u,"file-picker--success"),setTimeout(h,4e3))})}(e)}function h(){(0,n.default)(u,"file-picker--success"),(0,n.default)(u,"file-picker--file-list"),(0,p.default)(u,".file-list").innerHTML=""}},{"dom-helpers/src/addClass":1,"dom-helpers/src/append":2,"dom-helpers/src/event/change":4,"dom-helpers/src/event/onp":5,"dom-helpers/src/http/post":10,"dom-helpers/src/jsx":16,"dom-helpers/src/q":18,"dom-helpers/src/removeClass":22}]},{},[24])(24)});