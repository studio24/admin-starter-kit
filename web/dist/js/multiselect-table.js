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
var _table, _rowSelector, _mainCheck, _Class_brand;
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * Multiselect table web component
 */

customElements.define('amplify-table-multiselect', (_table = /*#__PURE__*/new WeakMap(), _rowSelector = /*#__PURE__*/new WeakMap(), _mainCheck = /*#__PURE__*/new WeakMap(), _Class_brand = /*#__PURE__*/new WeakSet(), class extends HTMLElement {
  constructor() {
    super(...arguments);
    /**
     * Set up the component: find the table, build the main checkbox, wire events
     */
    _classPrivateMethodInitSpec(this, _Class_brand);
    // Declare private instance properties
    /** @type HTMLTableElement | null */
    _classPrivateFieldInitSpec(this, _table, void 0);
    /** @type string */_classPrivateFieldInitSpec(this, _rowSelector, void 0);
    /** @type HTMLInputElement */_classPrivateFieldInitSpec(this, _mainCheck, void 0);
  }
  /**
   * Initialize on connect
   * Checks DOM status first, so we don't query for elements before they exist
   */
  connectedCallback() {
    if (document.readyState !== 'loading') {
      _assertClassBrand(_Class_brand, this, _init).call(this);
      return;
    }
    document.addEventListener('DOMContentLoaded', () => _assertClassBrand(_Class_brand, this, _init).call(this), {
      once: true
    });
  }
  /**
   * Handle events for the web component
   * @param {Event} event The Event object
   */
  handleEvent(event) {
    if (event.type === 'change') {
      _assertClassBrand(_Class_brand, this, _onChange).call(this, event);
    }
  }

  /**
   * Route a change event to the right handler
   * @param {Event} event The Event object
   */
}));
function _init() {
  // Get the table
  _classPrivateFieldSet(_table, this, this.querySelector('table'));
  if (!_classPrivateFieldGet(_table, this)) return;

  // The selector used to find row checkboxes inside the table
  _classPrivateFieldSet(_rowSelector, this, this.getAttribute('row-selector') || 'td input[type="checkbox"]');

  // Build and inject the main "select all" checkbox
  _classPrivateFieldSet(_mainCheck, this, _assertClassBrand(_Class_brand, this, _createMainCheck).call(this));

  // Listen for change events on the whole component
  this.addEventListener('change', this);
}
/**
 * Create the main "select all" checkbox and label, insert before table
 */
function _createMainCheck() {
  let labelText = this.getAttribute('data-multiselect-label') || 'Select all';
  let id = "checkbox-table-all-".concat(crypto.randomUUID());
  let wrapper = document.createElement('div');
  let mainCheck = document.createElement('input');
  mainCheck.type = 'checkbox';
  mainCheck.id = id;
  let label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = labelText;
  wrapper.append(mainCheck, label);
  this.prepend(wrapper);
  return mainCheck;
}
/**
 * Get the current row checkboxes
 */
function _getRowBoxes() {
  return Array.from(_classPrivateFieldGet(_table, this).querySelectorAll(_classPrivateFieldGet(_rowSelector, this)));
}
function _onChange(event) {
  if (event.target === _classPrivateFieldGet(_mainCheck, this)) {
    _assertClassBrand(_Class_brand, this, _toggleAll).call(this);
  } else if (event.target.matches(_classPrivateFieldGet(_rowSelector, this))) {
    _assertClassBrand(_Class_brand, this, _syncMainCheck).call(this);
  }
}
/**
 * Check or uncheck every row to match the main "select all" checkbox
 */
function _toggleAll() {
  let checked = _classPrivateFieldGet(_mainCheck, this).checked;
  for (let box of _assertClassBrand(_Class_brand, this, _getRowBoxes).call(this)) {
    box.checked = checked;
  }
  _assertClassBrand(_Class_brand, this, _dispatch).call(this);
}
/**
 * Update the main "select all" checkbox to reflect the current row states
 */
function _syncMainCheck() {
  let boxes = _assertClassBrand(_Class_brand, this, _getRowBoxes).call(this);
  let checkedCount = boxes.filter(box => box.checked).length;
  if (checkedCount === 0) {
    _classPrivateFieldGet(_mainCheck, this).checked = false;
    _classPrivateFieldGet(_mainCheck, this).indeterminate = false;
  } else if (checkedCount === boxes.length) {
    _classPrivateFieldGet(_mainCheck, this).checked = true;
    _classPrivateFieldGet(_mainCheck, this).indeterminate = false;
  } else {
    _classPrivateFieldGet(_mainCheck, this).checked = false;
    _classPrivateFieldGet(_mainCheck, this).indeterminate = true;
  }
  _assertClassBrand(_Class_brand, this, _dispatch).call(this);
}
/**
 * Emit a selection-change event with the currently checked rows
 */
function _dispatch() {
  this.dispatchEvent(new CustomEvent('selection-change', {
    bubbles: true,
    detail: {
      selected: _assertClassBrand(_Class_brand, this, _getRowBoxes).call(this).filter(box => box.checked)
    }
  }));
}
/******/ })()
;