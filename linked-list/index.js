class Node {
  constructor (element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}
class LinkedList {
  constructor () {
    this.head = new Node('head')
  }
  find (item) {
    let currNode = this.head
    while (currNode.element !== item) {
      currNode = currNode.next
    }
    return currNode
  }
  insert (newElement, item) {
    let newNode = new Node(newElement)
    let current = this.find(item)
    newNode.next = current.next
    newNode.prev = current
    current.next = newNode
  }
  remove (item) {
    let currNode = this.findPrevious(item)
    if (!(currNode.next === null)) {
      currNode.prev.next = currNode.next
      currNode.next.previous = currNode.previous
      currNode.next = null
      currNode.prev = null
    }
  }
  display () {
    let currNode = this.head
    while (!(currNode.next === null)) {
      console.log(currNode.next.element)
      currNode = currNode.next
    }
  }
  findPrevious (item) {
    let currNode = this.head
    while (!(currNode.next == null) && (currNode.next.element !== item)) {
      currNode = currNode.next
    }
    return currNode
  }
  findLast () {
    let currNode = this.head
    while (!(currNode.next === null)) {
      currNode = currNode.next
    }
    return currNode
  }
  dispReverse () {
    let currNode = this.findLast()
    while (!(currNode.prev === null)) {
      console.log(currNode.element)
      currNode = currNode.prev
    }
  }
}

module.exports = LinkedList
