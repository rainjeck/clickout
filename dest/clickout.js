(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.clickOut = mod.exports;
  }
})(this, function (_exports) {
  /**
   * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
   * Repository: https://github.com/rainjeck/clickout
   * License: MIT, see file 'LICENSE'
   */
  'use strict';

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var clickOut =
  /*#__PURE__*/
  function () {
    function clickOut(params) {
      var _this = this;

      _classCallCheck(this, clickOut);

      params = params || {};
      this.className = params.className || '.js-clickout';
      this.activeClass = params.activeClass || 'is-active';
      this.closestPolifill();
      this.matchesPolifill();
      var body = document.querySelector('body');
      body.addEventListener("click", function (e) {
        var eventTarget = e.target;
        var parent = eventTarget.closest(_this.className);

        if (parent === null) {
          var elems = document.querySelectorAll(_this.className);
          var activeClass = _this.activeClass;
          var activeElements = [];
          [].forEach.call(elems, function (elem) {
            if (elem.classList.contains(activeClass)) {
              elem.classList.remove(activeClass);
              activeElements.push(elem);
            }
          }); // callback

          if (params.after && typeof params.after === "function") {
            params.after(activeElements);
          }
        }
      });
    }

    _createClass(clickOut, [{
      key: "closestPolifill",
      value: function closestPolifill() {
        if (!Element.prototype.closest) {
          Element.prototype.closest = function (css) {
            var node = this;

            while (node) {
              if (node.matches(css)) return node;else node = node.parentElement;
            }

            return null;
          };
        }
      }
    }, {
      key: "matchesPolifill",
      value: function matchesPolifill() {
        if (!Element.prototype.matches) {
          Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
        }
      }
    }]);

    return clickOut;
  }();

  _exports["default"] = clickOut;
});
//# sourceMappingURL=../dest/clickout.js.map
