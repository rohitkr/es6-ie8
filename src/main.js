// import pf from './polyfill';
import {default as lib, sayHello, sayBye} from './index';

var here = sayHello;
var there = sayBye;

console.log(here);

var version = '1.0.1';

export {version};

export default class  {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
  get area() {
    return this.calcArea();
  }

  calcArea() {
    return this.height * this.width;
  }
}
