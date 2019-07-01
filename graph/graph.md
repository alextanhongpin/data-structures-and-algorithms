```js
class Graph {
  constructor(numVertices) {
    this.numVertices = numVertices
    this.adjacencyList = new Map()
  }
  addVertex(vert) {
    this.adjacencyList.set(vert, [])
  }
  addEdge(fromVert, toVert) {
    this.adjacencyList.get(fromVert).push(toVert)
    this.adjacencyList.get(toVert).push(fromVert)
  }
  printEdges() {
    for (let vert of this.adjacencyList.keys()) {
      const edges = this.adjacencyList.get(vert).join(' ')
      console.log(`${vert} -> ${edges}`)
    }
  }
  bfs(startingNode) {
    const visited = new Set()
    const queue = []
    queue.push(startingNode)

    while (queue.length) {
      // Take first.
      const node = queue.shift()
      if (visited.has(node)) continue
      visited.add(node)

      // Append.
      queue.push(...this.adjacencyList.get(node))
      console.log(node)
    }
  }
  dfs(startingNode) {
    const visited = new Set()
    const stack = []
    stack.push(startingNode)
    while (stack.length) {
      // Take first.
      const node = stack.shift()
      if (visited.has(node)) continue
      visited.add(node)

      console.log(node)
      // Prepend.
      stack.unshift(...this.adjacencyList.get(node))
    }
  }
}

const vertices = ['A', 'B', 'C', 'D', 'E', 'F']
const graph = new Graph(vertices.length)
for (let vert of vertices) {
  graph.addVertex(vert)
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'D')
graph.addEdge('A', 'E')
graph.addEdge('B', 'C')
graph.addEdge('D', 'E')
graph.addEdge('E', 'F')
graph.addEdge('E', 'C')
graph.addEdge('C', 'F')

graph.printEdges()

console.log('Breadth-First-Search')
graph.bfs('A') // A, B, D, E, C, F.

console.log('Depth-First-Search')
graph.dfs('A') // A, B, C, E, D, F.
```
