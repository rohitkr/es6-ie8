class A {
  static war () {
    console.log('war')
  }

  foo () {
    console.log('a')
  }
}

class C extends A {
	constructor () {
		super();
		this.name = 'this is class c';
	}
}

export default A
