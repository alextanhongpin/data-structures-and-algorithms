class List {
  constructor () {
    // Number of elements in list
    this.listSize = 0

    // Current position in list
    this.pos = 0

    // Initializes an empty array to store list elements
    this.dataStore = []
  }
  // Returns the number of element in list
  length () {
    return this.listSize
  }
  // Clears all elements from list
  clear () {
    this.dataStore = []
    this.listSize = this.pos = 0
  }
  // Returns string representation of list
  toString () {
    return this.dataStore
  }
  // Returns element at current position
  getElement () {
    return this.dataStore[this.pos]
  }
  // Inserts new element after existing element
  insert (element, after) {
    const insertPos = this.find(after)
    if (insertPos > -1) {
      this.dataStore.splice(insertPos + 1, 0, element)
      ++this.listSize
      return true
    }
    return false
  }
  // Adds new element to end of list
  append (element) {
    this.dataStore[this.listSize++] = element
  }
  // Removes element from list
  remove (element) {
    const foundAt = this.find(element)
    if (foundAt > -1) {
      this.dataStore.splice(foundAt, 1)
      --this.listSize
      return true
    }
    return false
  }
  // Sets current position to first element of list
  front () {
    this.pos = 0
  }
  // Sets current position to last element of list
  end () {
    this.pos = this.listSize - 1
  }
  // Moves current position back one element
  prev () {
    if (this.pos > 0) {
      --this.pos
    }
  }
  // Moves current position forward one element
  next () {
    if (this.pos < this.listSize) {
      ++this.pos
    }
  }
  // Returns the current position in list
  currPos () {
    return this.pos
  }
  // Moves the current position to specified position
  moveTo (position) {
    // TODO: Ensure it is within boundary
    this.pos = position
  }
  find (element) {
    for (let i = 0; i < this.dataStore.length; i += 1) {
      if (this.dataStore[i] === element) {
        return i
      }
    }
    return -1
  }
}

module.exports = List
