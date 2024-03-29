(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.webit = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _hasClass = _interopRequireDefault(require("./hasClass"));

var _rea = _interopRequireDefault(require("./rea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(els, className) {
  (0, _rea["default"])(els).forEach(function (el) {
    if (!(0, _hasClass["default"])(el, className)) {
      if (typeof el.classList != 'undefined') {
        el.classList.add(className);
      } else {
        el.className += ' ' + className;
      }
    }
  });
}

},{"./hasClass":7,"./rea":21}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _re = _interopRequireDefault(require("./re"));

var _isArrayLike = _interopRequireDefault(require("./isArrayLike"));

var _isEmpty = _interopRequireDefault(require("./isEmpty"));

var _isTextContent = _interopRequireDefault(require("./isTextContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param string|DOM node Selector or DOM node
 */
function append(el, childs) {
  // Resolve element
  el = (0, _re["default"])(el);
  /**
   * Array vai NodeList
   *
   * form elementam ir .length
   * Tāpēc, ja skatās pēc iterator, tad form būs kā array
   */

  var items = (0, _isArrayLike["default"])(childs) ? childs : [childs];

  for (var i = 0; i < items.length; i++) {
    var item = items[i];

    if ((0, _isArrayLike["default"])(item)) {
      append(el, item);
    } else {
      if ((0, _isTextContent["default"])(item)) {
        item = document.createTextNode((0, _isEmpty["default"])(item) ? '' : item);
      }

      el.appendChild(item);
    }
  }

  return childs;
}

var _default = append;
exports["default"] = _default;

},{"./isArrayLike":13,"./isEmpty":14,"./isTextContent":15,"./re":20}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _matchesMethodName = _interopRequireDefault(require("../other/matchesMethodName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Pievieno event listener.
 * Iekšējai izmantošanai
 * @param args event funkcijas argument (el, eventName, querySelector, cb)
 */
function _default(args, preventDefault) {
  var el = args.el,
      eventName = args.eventName,
      querySelector = args.querySelector,
      cb = args.cb; // Atgriežam event handler, lai to var remove

  var eventHandler = function eventHandler(ev) {
    var matchedEl = ev.target;

    if (querySelector) {
      while (matchedEl && matchedEl !== el) {
        if (matchedEl[_matchesMethodName["default"]](querySelector)) {
          // Auto Prevent event
          if (preventDefault) {
            ev.preventDefault();
          }

          if (cb) {
            cb(ev, matchedEl);
          }

          return;
        }

        matchedEl = matchedEl.parentNode;
      }
    } else {
      // Auto Prevent event
      if (preventDefault) {
        ev.preventDefault();
      }

      if (cb) {
        cb(ev, matchedEl);
      }
    }
  };

  el.addEventListener(eventName, eventHandler);
  return eventHandler;
}

},{"../other/matchesMethodName":17}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _parseArguments = _interopRequireDefault(require("./parseArguments"));

var _addListener = _interopRequireDefault(require("./addListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  return (0, _addListener["default"])((0, _parseArguments["default"])(arguments, 'change'), false);
}

},{"./addListener":3,"./parseArguments":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _parseArguments = _interopRequireDefault(require("./parseArguments"));

var _addListener = _interopRequireDefault(require("./addListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  return (0, _addListener["default"])((0, _parseArguments["default"])(arguments), true);
}

},{"./addListener":3,"./parseArguments":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function a(args, index) {
  return index < args.length ? args[index] : undefined;
}

function astring(args, index) {
  return typeof a(args, index) === 'string';
}

function afunction(args, index) {
  return typeof a(args, index) === 'function';
}
/**
 * Parse arguments
 *
 * These are possible signatures
 *
 * First case is when argument definedEventName is undefined
 *
 * 1.1 on(domNode, 'click', '.selector', function(){})
 * 1.2 on(domNode, 'click', function(){})
 * 1.3 on('click', '.selectr', function(){})
 * 1.4 on('click', function(){})
 *
 * Signatures when argument definedEventName is defined
 * In this case asume, that there is no eventName in arguments signature
 *
 * 2.1 click(domNode, '.selector', function(){})
 * 2.2 click(domNode, function(){})
 * 2.3 click('.selector', function(){})
 * 2.4 click(function(){})
 */


function _default(args, definedEventName) {
  var r = {
    el: undefined,
    eventName: undefined,
    querySelector: undefined,
    cb: undefined
  }; // 2.4
  // Ir padots definedEventName un args ir tikai callback

  if (afunction(args, 0) && definedEventName) {
    r.el = document;
    r.cb = a(args, 0);
    r.eventName = definedEventName;
    return r;
  }

  var i = 0; // DOM elements
  // 1.3, 1.4, 2.3

  if (astring(args, i)) {
    r.el = document;
  } // 1.1, 1.2, 2.1, 2.2
  else {
    r.el = a(args, i);
    i = i + 1;
  } // Event


  if (definedEventName) {
    r.eventName = definedEventName;
  } else {
    r.eventName = a(args, i);
    i = i + 1;
  } // Selector un Callback ir pēdējie 1 vai 2 argumenti


  if (astring(args, i)) {
    r.querySelector = a(args, i);
    r.cb = a(args, i + 1);
  } else {
    r.cb = a(args, i);
  }

  return r;
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _re = _interopRequireDefault(require("./re"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(el, className) {
  el = (0, _re["default"])(el);

  if (typeof el.classList != 'undefined') {
    return el.classList.contains(className);
  } else {
    return el.className.match(new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'ig')) ? true : false;
  }
}

},{"./re":20}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * Is fetch response json
 * Check only headers. Even if there is json header
 * response could be invalid json
 */
function _default(response) {
  if (!response.headers) {
    return false;
  }

  var ct = response.headers.get('content-type');
  return ct && ct.indexOf('application/json') >= 0;
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _isResponseJson = _interopRequireDefault(require("./isResponseJson"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Check respone content type and parse response
 * If content type is json then parse json response
 * otherwise return text response
 */
function _default(response) {
  if ((0, _isResponseJson["default"])(response)) {
    return response.json();
  } else {
    return response.text();
  }
}

},{"./isResponseJson":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _jsonOrText = _interopRequireDefault(require("./jsonOrText"));

var _request = _interopRequireDefault(require("./request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(url, data) {
  return (0, _request["default"])('POST', url, data).then(_jsonOrText["default"]);
}

},{"./jsonOrText":9,"./request":11}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _urlParams = _interopRequireDefault(require("./urlParams"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(method, url, data) {
  var params = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    method: method
  };

  if (typeof data != 'undefined') {
    if (method == 'GET') {
      var q = (0, _urlParams["default"])(data).toString();
      console.log(q);
      url = url + (q ? '?' + q : '');
    } else {
      params.body = (0, _urlParams["default"])(data);
    }
  }

  return fetch(url, params);
}

},{"./urlParams":12}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function formatUrlParamKey(path) {
  var r = '';

  for (var i = 0; i < path.length; i++) {
    if (i == 0) {
      r += path[i];
    } else {
      r += '[' + path[i] + ']';
    }
  }

  return r;
}

function qp(data, path, pairs) {
  if (typeof path == 'undefined') {
    path = [];
  }

  if (typeof pairs == 'undefined') {
    pairs = [];
  }

  for (var field in data) {
    var keys = Array.from(path);
    keys.push(field);

    if (_typeof(data[field]) === 'object') {
      pairs = qp(data[field], keys, pairs);
    } else {
      pairs.push([keys, data[field]]);
    }
  }

  return pairs;
}

function _default(data) {
  var pairs = qp(data);
  var body = new URLSearchParams();

  for (var i = 0; i < pairs.length; i++) {
    body.append(formatUrlParamKey(pairs[i][0]), pairs[i][1]);
  }

  return body;
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * Array un NodeList būs kā array
 *
 * Nevar skatīties pēs .length un iterator, jo .length ir arī form elementam
 */
function _default(value) {
  return Object.prototype.toString.call(value) === '[object Array]' || Object.prototype.toString.call(value) === '[object NodeList]';
}

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(v) {
  return typeof v === 'undefined' || v === null;
}

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(c) {
  return typeof c === 'string' || typeof c === 'number' || typeof c === 'undefined' || c === null;
}

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _setAttributes = _interopRequireDefault(require("./setAttributes"));

var _append = _interopRequireDefault(require("./append"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Helpers for using jsx syntax to create dom elements
 * use babel pragma to set custom handler for creating dom elements
 */
var _default = {
  Fragment: 'fragment',
  h: function h(elementName, attributes) {
    var el;

    if (elementName === this.Fragment) {
      el = new DocumentFragment();
    } else if (typeof elementName == 'function') {
      el = elementName(attributes);
    } else {
      el = document.createElement(elementName);

      if (attributes) {
        (0, _setAttributes["default"])(el, attributes);
      }
    }

    if (el) {
      for (var _len = arguments.length, childs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        childs[_key - 2] = arguments[_key];
      }

      (0, _append["default"])(el, childs);
    }

    return el;
  }
};
exports["default"] = _default;

},{"./append":2,"./setAttributes":24}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Store matches method name
 * Internet explorer 11 uses msMatchesSelector
 * Modern browsers - matches
 *
 * Element.prototype.matches = Element.prototype.msMatchesSelector;
 */
var n = 'matches';

if (typeof Element.prototype.msMatchesSelector != 'undefined') {
  n = 'msMatchesSelector';
}

var _default = n;
exports["default"] = _default;

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

/**
 * querySelectorAll
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

  return parentNode.querySelectorAll(querySelector);
}

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _q = _interopRequireDefault(require("./q"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Resolve dom element.
 * First check if el is string representing selector, then
 * find element matching selector using document.querySelector function
 * Otherwise return el
 */
function _default(el) {
  if (typeof el === 'string') {
    return (0, _q["default"])(el);
  }

  return el;
}

},{"./q":18}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _qa = _interopRequireDefault(require("./qa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * Resolve dom element.
 * First check if el is string representing selector, then
 * find element matching selector using document.querySelectorAll function
 * Always return NodeList or array, even if els is single Dom Node
 */
function _default(els) {
  if (typeof els === 'string') {
    return (0, _qa["default"])(els);
  } // If single dom node


  if (_typeof(els) == 'object' && typeof els.tagName != 'undefined') {
    return [els];
  }

  return els;
}

},{"./qa":19}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _rea = _interopRequireDefault(require("./rea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(els, className) {
  (0, _rea["default"])(els).forEach(function (el) {
    if (typeof el.classList != 'undefined') {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'ig'), '');
    }
  });
}

},{"./rea":21}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _q = _interopRequireDefault(require("./q"));

var _append = _interopRequireDefault(require("./append"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * replace element childs with new dom element
 * Signatures
 * replaceContent(domNode, selector, newContent)
 * replaceContent(domNode, newContent)
 * replaceContent(selector, newContent)
 */
function _default(a1, a2, a3) {
  var el, newContent; // First element is querySelector

  if (typeof a1 === 'string') {
    newContent = a2;
    el = (0, _q["default"])(document, a1);
  } // First element is domNode
  else {
    // Second is string and third argument is defined
    if (typeof a2 === 'string' && typeof a3 != 'undefined') {
      newContent = a3;
      el = (0, _q["default"])(a1, a2);
    } // Second argument is newContent
    else {
      el = a1;
      newContent = a2;
    }
  }

  if (!el) {
    return newContent;
  }

  el.innerHTML = '';
  return (0, _append["default"])(el, newContent);
}

},{"./append":2,"./q":18}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _re = _interopRequireDefault(require("./re"));

var _isEmpty = _interopRequireDefault(require("./isEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(el, attributes) {
  el = (0, _re["default"])(el);
  var tagName = el.tagName.toUpperCase();
  var value;

  for (var key in attributes) {
    if (!attributes.hasOwnProperty(key)) {
      continue;
    }

    value = attributes[key];

    if (key == 'className') {
      key = 'class';
    }

    if (key.substr(0, 5) == 'data-') {
      el.dataset[key.substr(5)] = value;
    } else if (key == 'style') {
      for (var k in value) {
        el.style[k] = value[k];
      }
    } else if (key == 'checked' && tagName == 'INPUT') {
      el.checked = value ? true : false;
    } else {
      el.setAttribute(key, (0, _isEmpty["default"])(value) ? '' : value);
    }
  }
}

},{"./isEmpty":14,"./re":20}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _replaceContent = _interopRequireDefault(require("dom-helpers/src/replaceContent"));

var _removeClass = _interopRequireDefault(require("dom-helpers/src/removeClass"));

var _change = _interopRequireDefault(require("dom-helpers/src/event/change"));

var _addClass = _interopRequireDefault(require("dom-helpers/src/addClass"));

var _append = _interopRequireDefault(require("dom-helpers/src/append"));

var _onp = _interopRequireDefault(require("dom-helpers/src/event/onp"));

var _jsx = _interopRequireDefault(require("dom-helpers/src/jsx"));

var _q = _interopRequireDefault(require("dom-helpers/src/q"));

var _state = _interopRequireDefault(require("./state"));

var _createUpload = _interopRequireDefault(require("./requests/createUpload"));

var _finishUpload = _interopRequireDefault(require("./requests/finishUpload"));

var _uploadFile = _interopRequireDefault(require("./requests/uploadFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var field = null;
var filesToUpload = [];
var metaFields = [];
var onSuccess = null;
var clearSuccess = null;
var maxSize = 20 * 1024 * 1024; // 20Mb

function _submit() {
  var meta = {};
  metaFields.forEach(function (field) {
    meta[field.name] = field.getValue();
  });
  (0, _finishUpload["default"])(meta, function () {
    if (onSuccess) {
      onSuccess();
    } else {
      (0, _addClass["default"])(field, 'file-picker--success');
    }

    filesToUpload = [];
    createFileList(filesToUpload); // Notīrām meta laukus

    metaFields.forEach(function (field) {
      return field.clear();
    }); // Notīrām selected file

    (0, _q["default"])(field, '[type=file]').value = '';
    setTimeout(function () {
      if (clearSuccess) {
        clearSuccess();
      } else {
        (0, _removeClass["default"])(field, 'file-picker--success');
      }
    }, 4000);
  });
}

function startUpload() {
  (0, _createUpload["default"])(function () {
    return uploadFiles(filesToUpload);
  });
}

function uploadFiles(files) {
  var done = 0;

  for (var i = 0; i < files.length; i++) {
    if (files[i].size > maxSize) {
      // file too large
      (0, _q["default"])(field, 'file-picker__file-list li:nth-of-type(' + (i + 1) + ') span').innerHTML = 'Par lielu (' + (Math.round(files[i].size / 1024 / 1024) + 'Mb') + ')';
      continue;
    }

    (0, _uploadFile["default"])(files[i], function (index) {
      return function () {
        // Change progress to 100%
        (0, _q["default"])(field, '.file-picker__file-list li:nth-of-type(' + (index + 1) + ') span').innerHTML = '100%';
        done++;
      };
    }(i));
  }
}

function createFileList(files) {
  (0, _replaceContent["default"])((0, _q["default"])(field, '.file-picker__file-list'));

  if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      (0, _append["default"])((0, _q["default"])(field, '.file-picker__file-list'), _jsx["default"].h("li", null, _jsx["default"].h("a", null, files[i].name), _jsx["default"].h("span", null, "0%")));
    }

    (0, _addClass["default"])(field, 'file-picker--file-list');
  } else {
    (0, _removeClass["default"])(field, 'file-picker--file-list');
  }
}

function _default(el, config) {
  field = el;

  _state["default"].set('uploadsHost', config.uploadUrl);

  _state["default"].set('autoUpload', config.autoUpload);

  onSuccess = config.onSuccess;
  clearSuccess = config.clearSuccess;
  metaFields = [];

  if (typeof config.metaFields != 'undefined') {
    metaFields = config.metaFields;
  }

  (0, _change["default"])(field, '[type=file]', function (ev, el) {
    (0, _removeClass["default"])(field, 'file-picker--dragover');
    filesToUpload = filesToUpload.concat(_toConsumableArray(el.files));
    createFileList(filesToUpload);
    startUpload();
  });
  (0, _onp["default"])(field, 'dragenter', function () {
    (0, _addClass["default"])(field, 'file-picker--dragover');
  });
  (0, _onp["default"])(field, 'dragover');
  (0, _onp["default"])(field, 'drop', function (ev) {
    (0, _removeClass["default"])(field, 'file-picker--dragover');
    filesToUpload = filesToUpload.concat(_toConsumableArray(ev.dataTransfer.files));
    createFileList(filesToUpload);
    startUpload();
  }); // Builtin button for finish upload

  (0, _onp["default"])('click', '.file-picker__buttons button', function () {
    _submit();
  }); // Custom submit button

  if (config.submitButton) {
    (0, _onp["default"])(config.submitButton, 'click', function () {
      _submit();
    });
  }

  return {
    submit: function submit() {
      _submit();
    }
  };
}

},{"./requests/createUpload":26,"./requests/finishUpload":27,"./requests/uploadFile":28,"./state":29,"dom-helpers/src/addClass":1,"dom-helpers/src/append":2,"dom-helpers/src/event/change":4,"dom-helpers/src/event/onp":5,"dom-helpers/src/jsx":16,"dom-helpers/src/q":18,"dom-helpers/src/removeClass":22,"dom-helpers/src/replaceContent":23}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _post = _interopRequireDefault(require("dom-helpers/src/http/post"));

var _state = _interopRequireDefault(require("../state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createUpload(cb) {
  // Ja upload izveidots, tad turpinām
  if (_state["default"].get('uploadId')) {
    cb();
  } else {
    (0, _post["default"])(_state["default"].get('uploadsHost') + '/new').then(function (r) {
      _state["default"].set('uploadId', r.hash);

      cb();
    });
  }
}

var _default = createUpload;
exports["default"] = _default;

},{"../state":29,"dom-helpers/src/http/post":10}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _post = _interopRequireDefault(require("dom-helpers/src/http/post"));

var _state = _interopRequireDefault(require("../state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function finishUpload(meta, cb) {
  (0, _post["default"])(_state["default"].get('uploadsHost') + '/finish', {
    upload: _state["default"].get('uploadId'),
    meta: meta
  }).then(function (r) {
    _state["default"].set('uploadId', null);

    cb();
  });
}

var _default = finishUpload;
exports["default"] = _default;

},{"../state":29,"dom-helpers/src/http/post":10}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _state = _interopRequireDefault(require("../state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function uploadFile(file, cb) {
  var data = new FormData();
  data.append('file', file);
  data.append('upload', _state["default"].get('uploadId'));
  fetch(_state["default"].get('uploadsHost') + '/upload', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    method: 'POST',
    body: data
  }).then(function (r) {
    return r.text();
  }).then(function (r) {
    cb();
  });
}

var _default = uploadFile;
exports["default"] = _default;

},{"../state":29}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var state = {};
var _default = {
  set: function set(key, value) {
    state[key] = value;
  },
  get: function get(key) {
    return state[key];
  }
};
exports["default"] = _default;

},{}]},{},[25])(25)
});
