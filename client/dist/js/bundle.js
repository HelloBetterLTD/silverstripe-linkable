/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/boot/index.js":
/*!**********************************!*\
  !*** ./client/src/boot/index.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _Injector = _interopRequireDefault(__webpack_require__(/*! lib/Injector */ "lib/Injector"));
var _Config = _interopRequireDefault(__webpack_require__(/*! lib/Config */ "lib/Config"));
var _registerComponents = _interopRequireDefault(__webpack_require__(/*! boot/registerComponents */ "./client/src/boot/registerComponents.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
window.ss = window.ss || {};
window.document.addEventListener('DOMContentLoaded', () => {
  (0, _registerComponents.default)();
});

/***/ }),

/***/ "./client/src/boot/registerComponents.js":
/*!***********************************************!*\
  !*** ./client/src/boot/registerComponents.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _Injector = _interopRequireDefault(__webpack_require__(/*! lib/Injector */ "lib/Injector"));
var _LinkFieldPopup = _interopRequireDefault(__webpack_require__(/*! ../components/LinkFieldPopup */ "./client/src/components/LinkFieldPopup.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = () => {
  _Injector.default.component.registerMany({
    LinkFieldPopup: _LinkFieldPopup.default
  });
};
exports["default"] = _default;

/***/ }),

/***/ "./client/src/components/LinkFieldPopup.js":
/*!*************************************************!*\
  !*** ./client/src/components/LinkFieldPopup.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _i18n = _interopRequireDefault(__webpack_require__(/*! i18n */ "i18n"));
var _reactstrap = __webpack_require__(/*! reactstrap */ "reactstrap");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Loading = (0, _Injector.loadComponent)('Loading');
const LinkFieldPopup = props => {
  const {
    isOpen,
    link,
    grid,
    onLinkSave,
    ModalComponent,
    ModalHeaderComponent,
    onClosed
  } = props;
  const formContainer = (0, _react.useRef)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const [form, setForm] = (0, _react.useState)(null);
  const handleHide = () => {
    if (typeof onClosed === 'function') {
      setForm('');
      onClosed();
    }
  };
  const bindFormAction = () => {
    if (formContainer.current) {
      const form = formContainer.current.querySelector('form');
      $(form).on('submit', function (e) {
        e.preventDefault();
        const $this = $(this);
        $.ajax({
          url: $this.attr('action'),
          method: 'POST',
          data: $this.serializeArray(),
          success: function (response) {
            if ($(response).is('.field')) {
              if (onLinkSave) {
                onLinkSave(response);
              }
            } else {
              setForm(response);
            }
          }
        });
        return false;
      });
    }
  };
  (0, _react.useEffect)(() => {
    bindFormAction();
  }, [form]);
  (0, _react.useEffect)(() => {
    if (link) {
      $.ajax({
        url: link,
        success: function (data) {
          setLoading(false);
          setForm(data);
        }
      });
    }
  }, [link]);
  return _react.default.createElement(ModalComponent, {
    size: 'md',
    centered: false,
    scrollable: true,
    isOpen: isOpen
  }, !!loading && _react.default.createElement(Loading, null), !loading && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(ModalHeaderComponent, {
    toggle: handleHide
  }, "Edit"), _react.default.createElement("div", {
    className: 'linkable-popup__body'
  }, _react.default.createElement("div", {
    ref: formContainer,
    className: 'linkable-popup__form-container',
    dangerouslySetInnerHTML: {
      __html: form
    }
  }))));
};
LinkFieldPopup.defaultProps = {
  isOpen: false,
  link: null,
  modalClassName: 'link-field-popup-modal',
  ModalComponent: _reactstrap.Modal,
  ModalHeaderComponent: _reactstrap.ModalHeader
};
var _default = exports["default"] = LinkFieldPopup;

/***/ }),

/***/ "./client/src/legacy/embeddedobjectfield.js":
/*!**************************************************!*\
  !*** ./client/src/legacy/embeddedobjectfield.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
window.ss = window.ss || {};
_jquery.default.entwine('ss', $ => {
  $('.embeddedObjectLoad').entwine({
    onclick() {
      const params = {
        SecurityID: $('input[name=SecurityID]').val(),
        URL: $(this).parent().find('input[type=text]').val()
      };
      const container = $(this).parents('div.embeddedobject');
      const button = this;
      const buttonText = button.val();
      button.val('Loading').prop('disabled', 'disabled');
      $.post($(this).data('href'), params, data => {
        button.val(buttonText).removeAttr('disabled');
        if (data && data.length) {
          container.html(data);
        }
      });
    }
  });
});

/***/ }),

/***/ "./client/src/legacy/linkfield.js":
/*!****************************************!*\
  !*** ./client/src/legacy/linkfield.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));
var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));
var _client = __webpack_require__(/*! react-dom/client */ "react-dom/client");
var _Injector = __webpack_require__(/*! lib/Injector */ "lib/Injector");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LinkFieldPopup = (0, _Injector.loadComponent)('LinkFieldPopup');
_jquery.default.entwine('ss', $ => {
  $('input.link').entwine({
    getURL: function (action) {
      const form = this.parents('form');
      let formUrl = form.attr('action');
      const formUrlParts = formUrl.split('?');
      let url = `${encodeURI(formUrl)}/field/${this.attr('name')}/${action}`;
      if (this.val()) {
        url = `${url}?LinkID=${this.val()}`;
      } else {
        url += '?LinkID=0';
      }
      if (typeof formUrlParts[1] !== 'undefined') {
        url = `${url}&${formUrlParts[1]}`;
      }
      const extraQuery = this.data('extra-query');
      if (typeof extraQuery !== 'undefined') {
        url = `${url}${extraQuery}`;
      }
      return url;
    },
    showDialog() {
      let dialog = $('#link-field-popup__dialog-wrapper');
      if (!dialog.length) {
        dialog = $('<div id="link-field-popup__dialog-wrapper" />');
        $('body').append(dialog);
      }
      dialog.open(this);
      return false;
    }
  });
  $('.linkfield-button').entwine({
    onclick() {
      this.siblings('input.link').showDialog();
      return false;
    }
  });
  $('.linkfield-remove-button').entwine({
    onclick() {
      const form = this.parents('form');
      let formUrl = form.attr('action');
      const formUrlParts = formUrl.split('?');
      let url = `${encodeURI(formUrl)}/field/${this.siblings('input:first').prop('name')}/doRemoveLink`;
      formUrl = formUrlParts[0];
      if (typeof formUrlParts[1] !== 'undefined') {
        url = `${url}&${formUrlParts[1]}`;
      }
      const holder = this.parents('.field:first');
      this.parents('.middleColumn:first').html("<img src='framework/images/network-save.gif' />");
      holder.load(url, () => {
        form.addClass('changed');
        holder.replaceWith(holder.html());
      });
      return false;
    }
  });
  $('#link-field-popup__dialog-wrapper').entwine({
    ReactRoot: null,
    Field: null,
    onunmatch() {
      this._clearModal();
    },
    open(field) {
      this.setField(field);
      this._renderModal(true);
    },
    close() {
      this._renderModal(false);
    },
    _renderModal(isOpen) {
      const handleHide = () => this.close();
      const field = this.getField();
      let root = this.getReactRoot();
      if (!root) {
        root = (0, _client.createRoot)(this[0]);
      }
      root.render(_react.default.createElement(LinkFieldPopup, {
        isOpen: isOpen,
        link: isOpen ? field.getURL('LinkFormHTML') : null,
        title: field.data('title'),
        onClosed: handleHide,
        onLinkSave: response => {
          this._onAfterSave(response);
        }
      }));
      this.setReactRoot(root);
    },
    _clearModal() {
      const root = this.getReactRoot();
      if (root) {
        root.unmount();
        this.setReactRoot(null);
      }
    },
    _onAfterSave(response) {
      this._clearModal();
      this.getField().parents('.field:first').replaceWith(response);
    }
  });
});

/***/ }),

/***/ "lib/Config":
/*!*************************!*\
  !*** external "Config" ***!
  \*************************/
/***/ (function(module) {

module.exports = Config;

/***/ }),

/***/ "lib/Injector":
/*!***************************!*\
  !*** external "Injector" ***!
  \***************************/
/***/ (function(module) {

module.exports = Injector;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

module.exports = React;

/***/ }),

/***/ "react-dom/client":
/*!*********************************!*\
  !*** external "ReactDomClient" ***!
  \*********************************/
/***/ (function(module) {

module.exports = ReactDomClient;

/***/ }),

/***/ "reactstrap":
/*!*****************************!*\
  !*** external "Reactstrap" ***!
  \*****************************/
/***/ (function(module) {

module.exports = Reactstrap;

/***/ }),

/***/ "i18n":
/*!***********************!*\
  !*** external "i18n" ***!
  \***********************/
/***/ (function(module) {

module.exports = i18n;

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************************!*\
  !*** ./client/src/bundles/bundle.js ***!
  \**************************************/


__webpack_require__(/*! boot */ "./client/src/boot/index.js");
__webpack_require__(/*! ../legacy/embeddedobjectfield */ "./client/src/legacy/embeddedobjectfield.js");
__webpack_require__(/*! ../legacy/linkfield */ "./client/src/legacy/linkfield.js");
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map