class CArray {
  constructor (numElements) {
    this.dataStore = []
    this.pos = 0
    this.numElements = numElements

    for (let i = 0; i < numElements; i += 1) {
      this.dataStore[i] = i
    }

    this.gaps = [5, 3, 1]
  }
  setGaps (arr) {
    this.gaps = arr
  }
  insert (element) {
    this.dataStore[this.pos++] = element
  }
  clear () {
    this.dataStore = Array(this.numElements).fill(0)
  }
  setData () {
    this.dataStore = Array(this.numElements)
      .fill(0)
      .map(() => Math.floor(Math.random() * (this.numElements + 1)))
  }
  toString () {
    let temp = ''
    for (let i = 0; i < this.dataStore.length; i += 1) {
      temp += this.dataStore[i] + ' '
      if (i > 0 && i % 10 === 0) {
        temp += '\n'
      }
    }
    return temp
  }
  swap (arr, index1, index2) {
    const temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  }
  bubbleSort () {
    const numElements = this.dataStore.length
    for (let outer = numElements; outer >= 2; --outer) {
      for (let inner = 0; inner <= outer - 1; ++inner) {
        if (this.dataStore[inner] > this.dataStore[inner + 1]) {
          this.swap(this.dataStore, inner, inner + 1)
        }
        // console.log(this.toString())
      }
    }
  }
  selectionSort () {
    let min
    for (let outer = 0; outer <= this.dataStore.length - 2; outer += 1) {
      min = outer
      for (let inner = outer + 1; inner <= this.dataStore.length - 1; inner += 1) {
        if (this.dataStore[inner] < this.dataStore[min]) {
          min = inner
        }
      }
      this.swap(this.dataStore, outer, min)
      // console.log(this.toString())
    }
  }
  insertionSort () {
    let inner, temp
    for (let outer = 1; outer <= this.dataStore.length - 1; outer += 1) {
      temp = this.dataStore[outer]
      inner = outer
      while (inner > 0 && (this.dataStore[inner - 1] >= temp)) {
        this.dataStore[inner] = this.dataStore[inner - 1]
        inner -= 1
      }
      this.dataStore[inner] = temp
      // console.log(this.toString())
    }
  }

  // shellSort () {
  //   for (let g = 0; g < this.gaps.length; g += 1) {
  //     for (let i = this.gaps[g]; i < this.dataStore.length; i += 1) {
  //       const temp = this.dataStore[i]
  //       for (let j = i; j >= this.gaps[g] && this.dataStore[j - this.gaps[g]] > temp; j -= this.gaps[g]) {
  //         this.dataStore[j] = this.dataStore[j - this.gaps[g]]
  //       }
  //       this.dataStore[i] = temp
  //       console.log(this.toString())
  //     }
  //   }
  // }
  shellSort () {
    const N = this.dataStore.length
    let h = 1
    while (h < N / 3) {
      h = 3 * h + 1
    }
    while (h >= 1) {
      for (let i = h; i < N; i += 1) {
        for (let j = i; j >= h && this.dataStore[j] < this.dataStore[j - h]; j -= h) {
          this.swap(this.dataStore, j, j - h)
        }
        // console.log(this.toString())
      }
      h = (h - 1) / 3
    }
  }
}

module.exports = CArray
