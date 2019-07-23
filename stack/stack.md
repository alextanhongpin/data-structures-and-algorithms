## Basic stack

```js
class Stack {
  constructor(array = []) {
    this.array = array
  }
  peek() {
    return this.array[this.array.length - 1]
  }
  isEmpty() {
    return this.array.length === 0
  }
  push(value) {
    this.array.push(value)
  }
  pop() {
    return this.array.pop()
  }
  getBuffer() {
    return this.array.slice()
  }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
console.log(stack.pop())
console.log(stack.getBuffer())

function getStackNthTopNode(stack, n) {
  const bufferStack = new Stack(stack.getBuffer())
  while (--n) {
    bufferStack.pop()
  }
  return bufferStack.pop()
}

function searchStack(stack, value) {
  const bufferStack = new Stack(stack.getBuffer())
  while (!bufferStack.isEmpty()) {
    if (bufferStack.pop() === value) return true
  }
  return false
}

stack.push(2)
stack.push(3) // [1,2,3]
console.log(getStackNthTopNode(stack, 3))
console.log(searchStack(stack, 2))
console.log(searchStack(stack, 100))
```

## Queue with two stacks


```js
class Stack {
  constructor(array = []) {
    this.array = array
  }
  peek() {
    return this.array[this.array.length - 1]
  }
  isEmpty() {
    return this.array.length === 0
  }
  push(value) {
    this.array.push(value)
  }
  pop() {
    return this.array.pop()
  }
  getBuffer() {
    return this.array.slice()
  }
}

class QueueTwoStack {
  constructor() {
    this.inbox = new Stack()
    this.outbox = new Stack()
  }
  enqueue(value) {
    this.inbox.push(value)
  }
  dequeue(value) {
    if (this.outbox.isEmpty()) {
      while (!this.inbox.isEmpty()) {
        this.outbox.push(this.inbox.pop())
      }
    }
    return this.outbox.pop()
  }
}

const queue = new QueueTwoStack()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
console.log(queue.dequeue())
queue.enqueue(4)
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
```
