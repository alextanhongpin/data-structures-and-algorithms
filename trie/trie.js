/* trie.js is a basic trie implementation on the client side*/

class Node {
  constructor(symbol) {
    this.symbol = symbol
    this.children = {}
    this.count = 0
    this.endword = false
  }
}
class Trie {
  constructor() {
    this.children = {}
  }
  add(word) {
    let children = this.children
    for (let i = 0; i < word.length; i += 1) {
      let w = word[i]
      if (!children[w]) {
        children[w] = new Node(w)
      } else {
        children[w].count++
      }
      if (i == word.length - 1) {
        children[w].endword = true
      } else {
        children = children[w].children
      }
    }
  }
  has(word) {
    let children = this.children
    for (let w of word) {
      if (!children[w]) {
        return false
      }
      children = children[w].children
    }
    return !!children.endword
  }
  suggest(word) {
    let children = this.children
    for (let w of word) {
      if (!children[w]) {
        return []
      }
      children = children[w].children
    }
    const queue = Object.values(children)
    const result = new Set()
    while (queue.length) {
      const head = queue.shift()
      if (head.endword) {
        result.add(head.symbol)
      }
      for (let child in head.children) {
        head.children[child].symbol = head.symbol + child
        if (head.children[child].endword) {
          result.add(head.children[child].symbol)
        }
        queue.push(...Object.values(head.children))
      }
    }
    return [...result].map(i => word + i)
  }
}

const trie = new Trie()
trie.add("hello")
trie.add("har")
trie.add("hare")
trie.add("car")
trie.add("carsss")
trie.add("carsses")
trie.add("carxxes")
trie.add("haee")
trie.add("has")
trie.add("haseeees")
console.log(trie.has('hello'))
console.log(trie.has('ha'))
console.log(trie.suggest('h'))
