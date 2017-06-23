/* greetings.js */

const sayHello = () => {
  console.log('Hello');
};

const π = 3.14159;
const e = 2.71828;
const φ = 1.61803;
const λ = 1.30357;

var constants = Object.freeze({
	π: π,
	e: e,
	φ: φ,
	λ: λ
});

function commonJSModule$1 () {
	console.log('this is a common js module');
}


var cjs = commonJSModule$1;

// import {sayHello} from './lib'
// import * as pfill from './polyfill';

// In some cases, you don't know which exports will
// be accessed until you actually run the code. In
// these cases, Rollup creates a namespace object
// for dynamic lookup

Object.keys( constants ).forEach( key => {
	console.log( `The value of ${key} is ${constants[key]}` );
});

cjs();

function fun () {
  var element = document.createElement('div');
  element.innerHTML = 'JavaScript ES6 module bundle for IE-8 Successful';
  sayHello();

  return element
}

document.body.appendChild(fun());
//# sourceMappingURL=bundle.js.map
