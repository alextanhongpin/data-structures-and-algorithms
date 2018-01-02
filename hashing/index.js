class HashTable {
  constructor () {
    this.table = new Array(137)
    this.buildChains()
  }
  // Not recommended due to collision
  // simpleHash (data) {
  //   let total = 0
  //   for (let i = 0; i < data.length; i += 1) {
  //     total += data.charCodeAt(i)
  //   }
  //   console.log(`Hash value: ${data} -> ${total}`)
  //   return total % this.table.length
  // }
  hash (data) {
    // Horner's method
    const H = 37
    let total = 0

    for (let i = 0; i < data.length; i += 1) {
      // total += H + total * data.charCodeAt(i)
      total += H * total + data.charCodeAt(i) // Typos?
    }

    total %= this.table.length
    if (total < 1) {
      total += this.table.length - 1
    }
    console.log(`Hash value: ${data} -> ${total}`)
    return parseInt(total, 10)
  }
  showDistro () {
    for (let i = 0; i < this.table.length; i += 1) {
      if (this.table[i][0] !== undefined) {
        console.log(`${i}: ${this.table[i]}`)
      }
    }
  }
  put (key, data) {
    const pos = this.hash(key)
    let index = 0
    if (this.table[pos][index] === undefined) {
      this.table[pos][index] = data
    } else {
      ++index
      while (this.table[pos][index] !== undefined) {
        index++
      }
      this.table[pos][index] = data
    }
  }
  get (key) {
    const pos = this.hash(key)
    let index = 0
    while (this.table[pos][index] !== key) {
      if (this.table[pos][index] !== undefined) {
        return this.table[pos][index]
      }
      index++
    }
    return this.table[pos][index]
  }
  buildChains () {
    for (let i = 0; i < this.table.length; i += 1) {
      this.table[i] = []
    }
  }
}

module.exports = HashTable
