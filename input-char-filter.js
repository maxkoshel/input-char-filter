/**
 * Tool for filtering input chars defined by regexp pattern.
 *
 * @param {RegExp} regexp - Regular expression object.
 * @param {Function} [callback] - Function called if char allowed.
 * @returns {Function}
 */

(function(name, definition){
  if (typeof define === 'function'){ // AMD
    define(definition);
  } else if (typeof module !== 'undefined' && module.exports) { // Node.js
    module.exports = definition();
  } else { // Browser
    var theModule = definition(), global = this, old = global[name];
    theModule.noConflict = function() {
      global[name] = old;
      return theModule;
    };
    global[name] = theModule;
  }
})('inputCharFilter', function() {
  return function(regexp, callback) {
    'use strict';

    return function(event) {
      var chr;
      var e = event || window.event;

      if (e.ctrlKey || e.altKey || e.metaKey) return;

      chr = getChar(e);

      if (chr === null) return;
      if (!regexp.test(chr)) return false;

      typeof(callback) === 'function' && callback.call(chr);
    };

    function getChar(event) {

      if (event.which === null) {
        if (event.keyCode < 32) {
          return null;
        }

        return String.fromCharCode(event.keyCode); // IE
      }

      if (event.which !== 0 && event.charCode !== 0) {
        if (event.which < 32) return null;

        return String.fromCharCode(event.which); // others
      }

      return null; // special key
    }
  };
});
