class Dictionary {
  constructor () {
    this.dataStore = []
  }
  add (key, value) {
    this.dataStore[key] = value
  }
  find (key) {
    return this.dataStore[key]
  }
  remove (key) {
    delete this.dataStore[key]
  }
  showAll () {
    for (const key of Object.keys(this.dataStore).sort()) {
      console.log(`${key} -> ${this.dataStore[key]}`)
    }
  }
  count () {
    let n = 0
    for (const key of Object.keys(this.dataStore)) {
      ++n
    }
    return n
  }
  clear () {
    for (const key in Object.keys(this.dataStore)) {
      delete this.dataStore[key]
    }
  }
}

module.exports = Dictionary
