import pf from './polyfill';
import {default as A} from './class';
import {default as lib, sayHello, sayBye} from './index';

var here = sayHello;
var there = sayBye;

console.log(here);

var version = '1.0.1';

export {version};

// export default A

// export default function () {console.log('this is a default fn')}

export default class  {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
  area() {
    return this.calcArea();
  }

  calcArea() {
    return this.height * this.width;
  }
}
