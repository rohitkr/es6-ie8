(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Module = factory());
}(this, (function () { 'use strict';

/* greetings.js */

var sayHello = function sayHello() {
  console.log('Hello');
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var A = function () {
  function A() {
    classCallCheck(this, A);
  }

  A.war = function war() {
    console.log('war');
  };

  A.prototype.foo = function foo() {
    console.log('a');
  };

  return A;
}();

var C = function (_A) {
  inherits(C, _A);

  function C() {
    classCallCheck(this, C);

    var _this = possibleConstructorReturn(this, _A.call(this));

    _this.name = 'this is class c';
    return _this;
  }

  return C;
}(A);

sayHello();

var main = {};

return main;

})));
