// Queue is a FIFO operation. In JS, this can be represented by pushing the
// items to the end and taking them them out from the rear position through
// .shift().
class Queue {
  constructor () {
    this.data = []
  }
  enqueue (...items) {
    this.data.push(...items)
  }
  dequeue () {
    return this.data.shift()
  }
  isEmpty () {
    return this.data.length === 0
  }
}

module.exports = () => new Queue()
