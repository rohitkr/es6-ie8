import B from './b'
import { car } from './c'

function fun () {
  var element = document.createElement('div')
  element.innerHTML = 'Heya all!!!!'
  new B().foo()
  car()
  return element
}

document.body.appendChild(fun())
