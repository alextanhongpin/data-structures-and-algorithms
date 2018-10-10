class Edge {
  constructor (label, score = 1) {
    this.label = label
    this.score = score
    this.node = new Node()
  }
}

class Node {
  constructor () {
    this.edges = []
  }
  display (depth = 0) {
    for (let edge of this.edges) {
      let str = `${edge.label}:${edge.score}`
      console.log(str.padStart(str.length + depth * 2))
      edge.node && edge.node.display(depth + 1)
    }
  }
}

function similarPrefix (a, b) {
  let min = Math.min(a.length, b.length)
  for (let i = 0; i < min; i += 1) {
    if (a[i] !== b[i]) {
      return i
    }
  }
  return min
}

function insert (root, word) {
  if (!root || !word) {
    return
  }

  let nextEdge = root.edges.filter(edge => similarPrefix(edge.label, word))
  if (!nextEdge.length) {
    root.edges.push(new Edge(word))
    return
  }
  let edge = nextEdge[0]
  let index = similarPrefix(edge.label, word)
  if (!index) {
    return root.edges.push(new Edge(word))
  }
  if (edge.label === word) {
    edge.score++
    return
  }
  if (word.startsWith(edge.label)) {
    edge.score++
    let prefix = word.substring(edge.label.length)
    return insert(edge.node, prefix)
  }

  // Remove the edge from the current edges.
  root.edges = root.edges.filter(edge => !similarPrefix(edge.label, word))

  let splitEdge = new Edge(edge.label.substring(0, index))
  splitEdge.score += edge.score

  {
    let prefix = edge.label.substring(index)
    edge.label = prefix
    splitEdge.node.edges.push(edge)
  }
  {
    let prefix = word.substring(index)
    if (prefix) {
      insert(splitEdge.node, prefix)
    }
  }
  root.edges.push(splitEdge)
}

function lookup (root, prefix, result = []) {
  let traverseRoot = root
  let foundElements = 0
  while (traverseRoot && traverseRoot.edges && traverseRoot.edges.length) {
    let nextEdge = traverseRoot.edges.filter(edge => prefix.substring(foundElements).startsWith(edge.label))
    if (!(nextEdge && nextEdge.length)) {
      break
    }
    let edge = nextEdge[0]
    foundElements += edge.label.length
    traverseRoot = edge.node
  }
  for (let edge of traverseRoot.edges) {
    let word = prefix + edge.label
    result.push({ word, score: edge.score })
    lookup(root, word, result)
  }
  return result
}

(function main () {
  let root = new Node()
  insert(root, 'hello')
  insert(root, 'hello')
  insert(root, 'hellos')
  insert(root, 'hell')
  insert(root, 'allo')
  insert(root, 'all')
  insert(root, 'allmighty')
  insert(root, 'abc')
  insert(root, 'abk')
  insert(root, 'aaa')
  insert(root, 'acb')
  root.display()
  console.log(lookup(root, 'all'))
  console.log(lookup(root, 'a'))
  console.log(lookup(root, 'ab'))
})()
