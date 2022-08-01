(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * querySelector
 */
function _default(p1, p2) {
  var parentNode, querySelector;

  if (typeof p1 === 'string') {
    parentNode = document;
    querySelector = p1;
  } else {
    parentNode = p1;
    querySelector = p2;
  }

  return parentNode.querySelector(querySelector);
}

},{}],2:[function(require,module,exports){
"use strict";

var _q = _interopRequireDefault(require("dom-helpers/src/q"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

webit["default"]((0, _q["default"])('.file-picker'));

},{"dom-helpers/src/q":1}]},{},[2]);
