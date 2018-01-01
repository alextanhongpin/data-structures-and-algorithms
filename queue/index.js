// A queue is a type of list where data are inserted at the end and are
// removed from the front. Queues are used to store data in the order
// in which they occur, as opposed to stack, in which the last piece of
// data entered is the first element used for processing.

class Queue {
  constructor () {
    this.dataStore = []
  }
  // Adds an element to the end of a queue
  enqueue (element) {
    this.dataStore.push(element)
  }
  // Removes an element from the front of a queue
  dequeue () {
    return this.dataStore.shift()
  }
  // Examine the front element of the queue
  front () {
    return this.dataStore[0]
  }
  // Examine the back element of the queue
  back () {
    return this.dataStore[this.dataStore.length - 1]
  }
  // Display all elements in a queue
  toString () {
    let retStr = ''
    for (let i = 0; i < this.dataStore.length; i += 1) {
      retStr += this.dataStore[i] + '\n'
    }
    return retStr
  }
  // Tells if a queue is empty or not
  empty () {
    return this.dataStore.length === 0
  }
  count () {
    return this.dataStore.length
  }
}

module.exports = Queue
