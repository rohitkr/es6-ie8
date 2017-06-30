// import {sayHello} from './lib'
// import * as pfill from './polyfill';

import * as pf from './polyfill';
import * as sayHello from './lib'
import cjs from './cjs';
import * as constants from './constants';

// In some cases, you don't know which exports will
// be accessed until you actually run the code. In
// these cases, Rollup creates a namespace object
// for dynamic lookup

Object.keys( constants ).forEach( key => {
	console.log( `The value of ${key} is ${constants[key]}` );
});

[1,2,43,5].forEach(k => {
	console.log(k);
});

console.log(sayHello.default);

cjs();

function fun () {
  var element = document.createElement('div')
  element.innerHTML = 'JavaScript ES6 module bundle for IE-8 Successful'
  sayHello.sayHello();

  return element
}

document.body.appendChild(fun());


export default function () {
	console.log('this is a ES-6 modules');
}