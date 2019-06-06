/**
 * Author and copyright: Tishuk Nadezda (https://github.com/rainjeck)
 * Repository: https://github.com/rainjeck/clickout
 * License: MIT, see file 'LICENSE'
 */
'use strict';

export default class clickOut {
  constructor(params) {

    params = params || {};

    this.className = params.className || '.js-clickout';
    this.activeClass = params.activeClass || 'is-active';

    this.closestPolifill();
    this.matchesPolifill();

    const body = document.querySelector('body');

    body.addEventListener("click", (e) => {

      const eventTarget = e.target;
      const parent = eventTarget.closest(this.className);

      if ( parent === null ) {
        const elems = document.querySelectorAll(this.className);

        const activeClass = this.activeClass;

        let activeElements = [];

        [].forEach.call(elems, function(elem){
          if ( elem.classList.contains(activeClass) ) {
            elem.classList.remove(activeClass);
            activeElements.push(elem);
          }
        });

        // callback
        if (params.after && typeof params.after === "function" ) {
          params.after( activeElements );
        }
      }
    });
  }

  closestPolifill() {
    if (!Element.prototype.closest) {
      Element.prototype.closest = function(css) {
        var node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  }

  matchesPolifill() {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  }
}
