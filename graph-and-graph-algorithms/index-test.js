const Graph = require('./index')

const g = new Graph(5)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)

g.showGraph()

// g.dfs(0)
g.bfs(0)

const vertex = 4
const paths = g.pathTo(vertex)
let route = ''
while (paths.length > 0) {
  if (paths.length > 1) {
    route += paths.pop() + '-'
  } else {
    route += paths.pop()
  }
}
console.log('route:', route)
console.log()

// Topological sorting
const g2 = new Graph(6)
g2.addEdge(1, 2)
g2.addEdge(2, 5)
g2.addEdge(1, 3)
g2.addEdge(1, 4)
g2.addEdge(0, 1)
g2.vertexList = ['CS1', 'CS2', 'Data Structures', 'Assembly Languages', 'Operating Systems', 'Algorithms']

g2.showGraph()
g2.topSort()
