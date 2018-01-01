const Stack = require('./index')

const s = new Stack()
s.push('David')
s.push('Raymond')
s.push('Brian')

console.log(s.length())
console.log(s.peek())

const popped = s.pop()
console.log(`popped: ${popped}`)

console.log(`peek: ${s.peek()}`)

s.clear()
console.log(s.peek())
console.log(s.length())
