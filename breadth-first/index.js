// An algorithm for traversing or searching graph/graph data
// structures. It explores all the neighbors at the present depth
// prior to moving on to nodes at the next depth level.

const Queue = require('./queue')
const Stack = require('./stack')

let graph = {
  a: ['b', 'c'],
  b: ['d', 'e'],
  c: ['f', 'g']
}

function breadthFirstSearch (graph, v) {
  // FIFO Queue as opposed to DFS's LIFO.
  let queue = Queue()
  queue.enqueue(v)
  while (!queue.isEmpty()) {
    let w = queue.dequeue()
    process.stdout.write(w)
    process.stdout.write(' ')
    if (graph[w]) {
      queue.enqueue(...graph[w])
    }
  }
}

console.log()
console.log('breadth first search:')
breadthFirstSearch(graph, 'a')
console.log()

// NOTE: Not possible to perform recursion for breadth-first-search.
// function breadthFirstSearchRecursive (graph, v, depth = 0) {

function depthFirstSearch (root) {
  // FIFO Queue as opposed to DFS's LIFO.
  let stack = Stack()
  stack.push(root)
  while (!stack.isEmpty()) {
    let w = stack.pop()
    process.stdout.write(w)
    process.stdout.write(' ')
    if (graph[w]) {
      stack.push(...graph[w])
    }
  }
}

console.log()
console.log('depth first search:')
depthFirstSearch('a')
console.log()

function depthFirstSearchRecursive (graph, v, cache = {}, depth = 0) {
  console.group(`[depth] ${depth}`)
  console.log(v)
  if (cache[v]) {
    return
  }
  cache[v] = true
  return graph[v] && graph[v].map(w => {
    depthFirstSearchRecursive(graph, w, cache, depth + 1)
    console.groupEnd()
  })
}

console.log()
console.log('depth first search recursive:')
depthFirstSearchRecursive(graph, 'a')
console.log()
