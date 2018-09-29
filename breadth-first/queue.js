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
