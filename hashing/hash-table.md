## Hash table
```js
class HashTable {
  constructor(size) {
    this.size = size
    this.keys = Array(size).fill(null)
    this.values = Array(size).fill(null)
    this.limit = 0
  }
  hash(n) {
    return n % this.size
  }
  put(key, value) {
    if (this.limit >= this.size) throw 'table is full'
    let hash = this.hash(key)
    let i = 1
    while (this.keys[hash] !== null) {
      // Linear probing.
      // hash = hash + 1
      // hash = hash % this.size
      hash = hash + Math.pow(i, 2)
      hash = hash % this.size
      i++
    }
    this.keys[hash] = key
    this.values[hash] = value
    this.limit++
  }
  get(key) {
    let hash = this.hash(key)
    let i = 1
    while (this.keys[hash] !== key) {
      // Linear probing.
      // hash = hash + 1
      // hash = hash % this.size
      hash = hash + Math.pow(i, 2)
      hash = hash % this.size
      i++
    }
    return this.values[hash]
  }
}

const hashTable = new HashTable(11)
hashTable.put(1, 'hello world')
hashTable.put(12, 'hi')
hashTable.put(13, 'this is awesome')
hashTable.put(1100, 'helo')
hashTable.get(12)
console.log(hashTable)
```
