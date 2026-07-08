/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
var _passwordInput, _showHideBtn, _screenReaderStatusMessage, _Class_brand;
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * Password toggle web component
 */

customElements.define('amplify-pw-toggle', (_passwordInput = /*#__PURE__*/new WeakMap(), _showHideBtn = /*#__PURE__*/new WeakMap(), _screenReaderStatusMessage = /*#__PURE__*/new WeakMap(), _Class_brand = /*#__PURE__*/new WeakSet(), class extends HTMLElement {
  constructor() {
    super(...arguments);
    /**
     * Insert an element immediately after a reference node
     * @param {Element} el - element to insert
     * @param {Element} referenceNode - node to insert after
     */
    _classPrivateMethodInitSpec(this, _Class_brand);
    // Declare private instance properties
    /** @type HTMLInputElement */
    _classPrivateFieldInitSpec(this, _passwordInput, void 0);
    /** @type HTMLButtonElement */_classPrivateFieldInitSpec(this, _showHideBtn, void 0);
    /** @type HTMLDivElement */_classPrivateFieldInitSpec(this, _screenReaderStatusMessage, void 0);
  }
  /**
   * Initialize on connect
   * Checks for DOM status first, ensuring code doesn't run before required
   * elements exist in the DOM.
   */
  connectedCallback() {
    if (document.readyState !== 'loading') {
      this.init();
      return;
    }
    document.addEventListener('DOMContentLoaded', () => this.init(), {
      once: true
    });
  }

  /**
   * Cleanup global event listeners on disconnect
   */
  disconnectedCallback() {
    var _classPrivateFieldGet2;
    (_classPrivateFieldGet2 = _classPrivateFieldGet(_passwordInput, this).form) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.removeEventListener('submit', this);
    window.removeEventListener('pageshow', this);
  }

  /**
   * Set up the component
   */
  init() {
    var _classPrivateFieldGet3;
    _classPrivateFieldSet(_passwordInput, this, this.querySelector('input[type="password"]'));
    _classPrivateFieldSet(_showHideBtn, this, this.querySelector('button[aria-controls="password-input"]'));
    _classPrivateFieldGet(_showHideBtn, this).removeAttribute('hidden');

    // Create and append a status region for updating screen readers.
    // This is injected between the input and button for a sensible reading order when
    // moving through the page content linearly:
    // [password input] -> [your password is visible/hidden] -> [show/hide password]
    _classPrivateFieldSet(_screenReaderStatusMessage, this, document.createElement('div'));
    _classPrivateFieldGet(_screenReaderStatusMessage, this).setAttribute('class', 'visuallyhidden');
    _classPrivateFieldGet(_screenReaderStatusMessage, this).setAttribute('aria-live', 'polite');
    _assertClassBrand(_Class_brand, this, _insertAfter).call(this, _classPrivateFieldGet(_screenReaderStatusMessage, this), _classPrivateFieldGet(_passwordInput, this));

    // Attach event listeners
    _classPrivateFieldGet(_showHideBtn, this).addEventListener('click', this);
    (_classPrivateFieldGet3 = _classPrivateFieldGet(_passwordInput, this).form) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.addEventListener('submit', this);
    window.addEventListener('pageshow', this);
    _assertClassBrand(_Class_brand, this, _hide).call(this); // Default to hidden
  }

  /**
   * Handle events for the web component
   * @param {Event} event
   */
  handleEvent(event) {
    if (event.type === 'click') {
      _assertClassBrand(_Class_brand, this, _toggle).call(this, event);
      return;
    }
    if (event.type === 'submit') {
      _assertClassBrand(_Class_brand, this, _hide).call(this);
      return;
    }
    if (event.type === 'pageshow') {
      if (event.persisted && _classPrivateFieldGet(_passwordInput, this).type !== 'password') {
        _assertClassBrand(_Class_brand, this, _hide).call(this);
      }
    }
  }
}));
function _insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}
/**
 * Set the password input's type and update the button/status text to match
 * @param {'password' | 'text'} type
 */
function _setType(type) {
  if (_classPrivateFieldGet(_passwordInput, this).type === type) return;
  _classPrivateFieldGet(_passwordInput, this).setAttribute('type', type);
  const isHidden = type === 'password';
  _classPrivateFieldGet(_showHideBtn, this).innerText = isHidden ? 'Show' : 'Hide';
  _classPrivateFieldGet(_screenReaderStatusMessage, this).innerText = isHidden ? 'Your password is hidden' : 'Your password is visible';
}
/**
 * Hide the password (mask input as type="password")
 */
function _hide() {
  _assertClassBrand(_Class_brand, this, _setType).call(this, 'password');
}
/**
 * Show the password (reveal input as type="text")
 */
function _show() {
  _assertClassBrand(_Class_brand, this, _setType).call(this, 'text');
}
/**
 * Toggle the password's visibility
 * @param {MouseEvent} event
 */
function _toggle(event) {
  event.preventDefault();
  _classPrivateFieldGet(_passwordInput, this).type === 'password' ? _assertClassBrand(_Class_brand, this, _show).call(this) : _assertClassBrand(_Class_brand, this, _hide).call(this);
}
/******/ })()
;