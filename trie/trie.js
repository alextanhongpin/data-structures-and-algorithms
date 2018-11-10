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
  search(word) {
    let node = this
    for (let w of word) {
      if (!node.children[w]) {
        return []
      }
      node = node.children[w]
    }
    let results = new Set()
    for (let child in node.children) {
      this.traverse(node.children[child], word, results)
    }
    return [...results]
  }
  iterate(word) {
    let node = this
    for (let w of word) {
      if (!node.children[w]) {
        return []
      }
      node = node.children[w]
    }

    let result = new Set()
    let stack = Object.values(node.children)
    let results = Array(stack.length).fill(word)
    while (stack.length) {
      let node = stack.pop()
      let str = results.pop()
      str += node.symbol
      if (node.endword) {
        result.add(str)

      }
      for (let key in node.children) {
        stack.push(node.children[key])
        results.push(str)
      }
    }
    return [...result]
  }
  traverse(node, word = '', results = new Set()) {
    word += node.symbol
    if (node.endword) {
      results.add(word)
    }
    for (let child in node.children) {
      this.traverse(node.children[child], word, results)
    }
    if (!Object.keys((node && node.children) || {}).length) {
      results.add(word)
    }
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
console.log(trie.search('ha'))
// console.log(trie.suggest('ca'))
console.log(trie.iterate('ha'))
