/* eslint require-jsdoc: 'error', valid-jsdoc: 'error' */
/**
 * @private
 * @module fusioncharts.renderer.javascript.polyfill
 */
/* eslint-disable no-extend-native, no-eq-null, new-cap */
var polyfill = function () {
  /*
  * Polyfills
  * Ofcourse and obviously for IE8
  */
  // Pollyfills for Object.create
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
  if (typeof Object.create !== 'function') {
    // Production steps of ECMA-262, Edition 5, 15.2.3.5
    // Reference: http://es5.github.io/#x15.2.3.5
    /* jslint freeze: false */
    Object.create = (function () {
      // To save on memory, use a shared constructor
      // eslint-disable-next-line no-empty-function
      // make a safe reference to Object.prototype.hasOwnProperty
      var hasOwn = Object.prototype.hasOwnProperty;
      // eslint-disable-next-line no-empty-function
      function Temp () { }

      return function (O) {
        var Properties, prop, obj;
        // 1. If Type (O) is not Object or Null throw a TypeError exception.
        if (typeof O !== 'object') {
          throw new TypeError('Object prototype may only be an Object or null');
        }

        // 2. Let obj be the result of creating a new object as if by the
        //    expression new Object () where Object is the standard built-in
        //    constructor with that name
        // 3. Set the [[Prototype]] internal property of obj to O.
        Temp.prototype = O;
        obj = new Temp();
        Temp.prototype = null; // Let's not keep a stray reference to O...

        // 4. If the argument Properties is present and not undefined, add
        //    own properties to obj as if by calling the standard built-in
        //    function Object.defineProperties with arguments obj and
        //    Properties.
        if (arguments.length > 1) {
                    // Object.defineProperties does ToObject on its first argument.
          Properties = Object(arguments[1]);
          for (prop in Properties) {
            if (hasOwn.call(Properties, prop)) {
              obj[prop] = Properties[prop];
            }
          }
        }

        // 5. Return obj
        return obj;
      };
    })();
  }

  // Pollyfills for Array indexOf
  // Ref: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  if (!Array.prototype.indexOf) {
    /* jslint freeze: false */
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      var k, O, len, n;

      // 1. Let O be the result of calling ToObject passing
      //    the this value as the argument.
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      O = Object(this);

      // 2. Let lenValue be the result of calling the Get
      //    internal method of O with the argument "length".
      // 3. Let len be ToUint32 (lenValue).
      len = O.length >>> 0;

      // 4. If len is 0, return -1.
      if (len === 0) {
        return -1;
      }

      // 5. If argument fromIndex was passed let n be
      //    ToInteger (fromIndex); else let n be 0.
      n = +fromIndex || 0;

      if (Math.abs(n) === Infinity) {
        n = 0;
      }

      // 6. If n >= len, return -1.
      if (n >= len) {
        return -1;
      }

      // 7. If n >= 0, then Let k be n.
      // 8. Else, n<0, Let k be len - abs (n).
      //    If k is less than 0, then let k be 0.
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 9. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ToString (k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the
        //    HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        //    i.  Let elementK be the result of calling the Get
        //        internal method of O with the argument ToString (k).
        //   ii.  Let same be the result of applying the
        //        Strict Equality Comparison Algorithm to
        //        searchElement and elementK.
        //  iii.  If same is true, return k.
        if (k in O && O[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }

  // Pollyfills for Array forEach
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  if (!Array.prototype.forEach) {
    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.io/#x15.4.4.18
    /* jslint freeze: false */
    Array.prototype.forEach = function (callback, thisArg) {
      var T, k, O, len, kValue;

      if (this == null) {
        throw new TypeError(' this is null or not defined');
      }

      // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
      O = Object(this);

      // 2. Let lenValue be the result of calling the Get internal method of O
      // with the argument "length".
      // 3. Let len be ToUint32 (lenValue).
      len = O.length >>> 0;

      // 4. If IsCallable (callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 1) {
        T = thisArg;
      }

            // 6. Let k be 0
      k = 0;

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ToString (k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal method of O
        // with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
          // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
          kValue = O[k];

          // ii. Call the Call internal method of callback with T as the this value and
          // argument list containing kValue, k, and O.
          callback.call(T, kValue, k, O);
        }
        // d. Increase k by 1.
        k++;
      }
      // 8. return undefined
    };
  }

    // Guard against the whiny IE
    /* jshint ignore:start */
    // Production steps of ECMA-262, Edition 5, 15.4.4.14
    // Reference: http://es5.github.io/#x15.4.4.14
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      var k,
        O,
        n,
        len;

      // 1. Let O be the result of calling ToObject passing
      //    the this value as the argument.
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      O = Object(this);

      // 2. Let lenValue be the result of calling the Get
      //    internal method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      len = O.length >>> 0;

      // 4. If len is 0, return -1.
      if (len === 0) {
        return -1;
      }

      // 5. If argument fromIndex was passed let n be
      //    ToInteger(fromIndex); else let n be 0.
      n = +fromIndex || 0;

      if (Math.abs(n) === Infinity) {
        n = 0;
      }

      // 6. If n >= len, return -1.
      if (n >= len) {
        return -1;
      }

      // 7. If n >= 0, then Let k be n.
      // 8. Else, n<0, Let k be len - abs(n).
      //    If k is less than 0, then let k be 0.
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 9. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the
        //    HasProperty internal method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        //    i.  Let elementK be the result of calling the Get
        //        internal method of O with the argument ToString(k).
        //   ii.  Let same be the result of applying the
        //        Strict Equality Comparison Algorithm to
        //        searchElement and elementK.
        //  iii.  If same is true, return k.
        if (k in O && O[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }

  // Pollyfill for Object.create
  if (typeof Object.create !== 'function') {
    // Production steps of ECMA-262, Edition 5, 15.2.3.5
    // Reference: http://es5.github.io/#x15.2.3.5
    Object.create = (function () {
      // To save on memory, use a shared constructor
      // eslint-disable-next-line no-empty-function
      // make a safe reference to Object.prototype.hasOwnProperty
      var hasOwn = Object.prototype.hasOwnProperty;
      // eslint-disable-next-line no-empty-function
      function Temp () {}

      return function (O) {
        var obj, Properties, prop;

        // 1. If Type(O) is not Object or Null throw a TypeError exception.
        if (typeof O !== 'object') {
          throw TypeError('Object prototype may only be an Object or null');
        }

        // 2. Let obj be the result of creating a new object as if by the
        //    expression new Object() where Object is the standard built-in
        //    constructor with that name
        // 3. Set the [[Prototype]] internal property of obj to O.
        Temp.prototype = O;
        obj = new Temp();
        Temp.prototype = null; // Let's not keep a stray reference to O...

        // 4. If the argument Properties is present and not undefined, add
        //    own properties to obj as if by calling the standard built-in
        //    function Object.defineProperties with arguments obj and
        //    Properties.
        if (arguments.length > 1) {
                    // Object.defineProperties does ToObject on its first argument.
          Properties = Object(arguments[1]);
          for (prop in Properties) {
            if (hasOwn.call(Properties, prop)) {
              obj[prop] = Properties[prop];
            }
          }
        }

        // 5. Return obj
        return obj;
      };
    })();
  }

    // Pollyfill for Function.bind.
  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      var aArgs,
        fToBind,
        // eslint-disable-next-line no-empty-function
        fNOP,
        fBound;
      if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
      }

      aArgs = Array.prototype.slice.call(arguments, 1);
      fToBind = this;
      // eslint-disable-next-line no-empty-function
      fNOP = function () {};
      fBound = function () {
        return fToBind.apply(this instanceof fNOP ? this : oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
      };

      if (this.prototype) {
        // native functions don't have a prototype
        fNOP.prototype = this.prototype;
      }
      fBound.prototype = new fNOP();

      return fBound;
    };
  }

  // Production steps of ECMA-262, Edition 5, 15.4.4.21
  // Reference: http://es5.github.io/#x15.4.4.21
  if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (callback /* , initialValue */) {
      'use strict';
      var t = Object(this),
        len = t.length >>> 0,
        k = 0,
        value;
      if (this == null) {
        throw new TypeError('Array.prototype.reduce called on null or undefined');
      }
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      if (arguments.length == 2) {
        value = arguments[1];
      } else {
        while (k < len && !(k in t)) {
          k++;
        }
        if (k >= len) {
          throw new TypeError('Reduce of empty array with no initial value');
        }
        value = t[k++];
      }
      for (; k < len; k++) {
        if (k in t) {
          value = callback(value, t[k], k, t);
        }
      }
      return value;
    };
  }

  // Production steps of ECMA-262, Edition 5, 15.4.4.18
  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  if (!Object.keys) {
    Object.keys = (function () {
      var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

      return function (obj) {
        var result = [], prop, i;
        if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }
  /* jshint ignore:end */

  // Pollyfill for Math.sign
  if (!Math.sign) {
    Math.sign = function (x) {
      // If x is NaN, the result is NaN.
      // If x is -0, the result is -0.
      // If x is +0, the result is +0.
      // If x is negative and not -0, the result is -1.
      // If x is positive and not +0, the result is +1.
      x = +x; // convert to a number
      if (x === 0 || isNaN(x)) {
        return Number(x);
      }
      return x > 0 ? 1 : -1;
    };
  }

  // Pollyfill for Object.assign
  if (typeof Object.assign !== 'function') {
    Object.assign = function (target) { // .length of function is 2
      'use strict';
      var to,
        index,
        nextSource,
        nextKey;

      if (target == null) { // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      to = Object(target);

      for (index = 1; index < arguments.length; index++) {
        nextSource = arguments[index];

        if (nextSource != null) { // Skip over if undefined or null
          for (nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    };
  }

  if (typeof getComputedStyle == 'undefined') {
    // eslint-disable-next-line no-global-assign
    getComputedStyle = function (el) {
      this.el = el;
      this.getPropertyValue = function (prop) {
        var re = /(\-([a-z]){1})/g;
        if (prop === 'float') {
          prop = 'styleFloat';
        }
        if (re.test(prop)) {
          prop = prop.replace(re, function () {
            return arguments[2].toUpperCase();
          });
        }
        return el.currentStyle[prop] ? el.currentStyle[prop] : null;
      };
      return this;
    };
  }

  return function () {};
}

export default polyfill();

/* eslint-enable no-extend-native, no-eq-null, new-cap */
