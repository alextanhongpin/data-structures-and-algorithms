// Stack is basically a LIFO data structure. In JS, it's basically just a push
// and pop operation with array.
class Stack {
  constructor () {
    this.data = []
  }
  push (...item) {
    this.data.unshift(...item)
  }
  pop () {
    return this.data.shift()
  }
  isEmpty () {
    return this.data.length === 0
  }
  size () {
    return this.data.length
  }
}

module.exports = () => new Stack()
