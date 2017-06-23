/* greetings.js */

export const sayHello = () => {
  console.log('Hello')
}

export const sayBye = () => {
  console.log('Bye')
}

export const sayHelloName = (name) => {
  console.log(sayHello() + ' ' + name);
}

export const sayByeName = (name) => {
  console.log(sayBye() + ' ' + name);
}

export const sayES6 = (name) => {
  console.log('ES-6');
}

export const sayJavaScript = (name) => {
  console.log('javaScript');
}

export default {
	a: 1,
	b: 1,
	c: 1,
	d: 1,
	e: 1
}