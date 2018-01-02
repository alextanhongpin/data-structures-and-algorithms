class Sets {
  constructor () {
    this.dataStore = []
  }
  add (data) {
    if (this.dataStore.indexOf(data) < 0) {
      this.dataStore.push(data)
      return true
    }
    return false
  }
  remove (data) {
    const pos = this.dataStore.indexOf(data)
    if (pos > -1) {
      this.dataStore.splice(pos, 1)
      return true
    }
    return false
  }
  contains (data) {
    return this.dataStore.indexOf(data) > -1
  }
  size () {
    return this.dataStore.length
  }
  union (set) {
    const tempSet = new Sets()
    for (let i = 0; i < this.size(); i += 1) {
      tempSet.add(this.dataStore[i])
    }
    for (let i = 0; i < set.size(); i += 1) {
      if (!tempSet.contains(set.dataStore[i])) {
        tempSet.dataStore.push(set.dataStore[i])
      }
    }
    return tempSet
  }
  intersect (set) {
    const tmpSet = new Sets()
    for (let i = 0; i < this.size(); i += 1) {
      if (set.contains(this.dataStore[i])) {
        tmpSet.add(this.dataStore[i])
      }
    }
    return tmpSet
  }
  count () {
    return this.dataStore.length
  }
  subset (set) {
    if (this.size() > set.size()) {
      return false
    } else {
      for (var member of this.dataStore) {
        if (!set.contains(member)) {
          return false
        }
      }
    }
    return true
  }
  difference (set) {
    const tmpSet = new Sets()
    for (let i = 0; i < this.size(); i += 1) {
      if (!set.contains(this.dataStore[i])) {
        tmpSet.add(this.dataStore[i])
      }
    }
    return tmpSet
  }
  show () {
    return this.dataStore
  }
}

module.exports = Sets
