import {default as lib, sayHello, sayBye} from './index';

var here = sayHello;
var there = sayBye;

// export {here, there};
// module.exports = {a: ''};

console.log(here);

// export default 'TEST'

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
// module.exports = 'Foo';