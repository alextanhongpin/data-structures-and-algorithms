// Stack are efficient structures because data can be added ot removed
// only from the top of a stack, making these procedure fast and easy
// to implement
// - a last-in, first-out (LIFO) data structures

class Stack {
  constructor () {
    this.dataStore = [] // Array that stores the stack element
    this.top = 0
  }
  // Pushing a new element onto the stack will store it in the top
  // position and increment the top variable so that the new top is
  // the next empty position in the array.
  push (element) {
    this.dataStore[this.top++] = element
  }
  // Does the reverse of the push method - it returns the element in
  // the top position of the stack and then decrements the top variable.
  pop () {
    return this.dataStore[--this.top]
  }
  // Returns the top element of the stack by accessing the element at the
  // top - 1 position of the array.
  peek () {
    return this.dataStore[this.top - 1]
  }
// Returns the number of elements that are stored in the stacks
  length () {
    return this.top
  }
  // Clears the elements in a stack
  clear () {
    this.top = 0
  }
}

module.exports = Stack
