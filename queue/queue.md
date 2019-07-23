```js
class Queue {
  constructor(array = []) {
    this.array = array
  }
  peek() {
    return this.array[0]
  }
  isEmpty() {
    return this.array.length === 0
  }
  enqueue(value) {
    this.array.push(value)
  }
  dequeue() {
    return this.array.shift()
  }
  getBuffer() {
    return this.array.slice()
  }
  size() {
    return this.array.length
  }
}

class StackTwoQueue {
  constructor() {
    this.inbox = new Queue()
  }
  push(value) {
    this.inbox.enqueue(value)
  }
  pop() {
    let n = this.inbox.size() - 1
    const outbox = new Queue()
    while (--n > -1) {
      outbox.enqueue(this.inbox.dequeue())
    }
    const last = this.inbox.dequeue()
    this.inbox = outbox
    return last
  }
}

const stack = new StackTwoQueue()
stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack.pop())
stack.push(4)
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
```
