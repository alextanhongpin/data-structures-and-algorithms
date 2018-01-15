const Graph = require('./index')

const g = new Graph(5)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)

g.showGraph()

g.dfs(0)
g.dfs(1)
g.dfs(2)
g.dfs(3)

g.bfs(0)
g.bfs(1)
g.bfs(2)
g.bfs(3)

const vertex = 4
const paths = g.pathTo(vertex)
console.log('paths:', paths)
if (paths) {
  while (paths.length > 0) {
    if (paths.length > 1) {
      console.log(paths.pop() + '-')
    } else {
      console.log(paths.pop())
    }
  }
}
