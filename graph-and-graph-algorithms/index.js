
class Vertex {
  constructor (label) {
    this.label = label
  }
}

class Graph {
  constructor (v) {
    this.vertices = v
    this.edges = 0
    this.adj = []
    this.edgeTo = []
    this.vertexList = []

    // For each vertices, initialize an empty dictionary with empty string
    for (let i = 0; i < this.vertices; i += 1) {
      this.adj[i] = []
      this.adj[i].push('')
    }

    this.marked = []
    for (let i = 0; i < this.vertices; i += 1) {
      this.marked[i] = false
    }
  }

  addEdge (v, w) {
    this.adj[v].push(w)
    this.adj[w].push(v)
    this.edges += 1
  }

  showGraph () {
    for (let i = 0; i < this.vertices; i += 1) {
      let print = `${i} ->`
      for (let j = 0; j < this.vertices; j += 1) {
        if (this.adj[i][j] !== undefined) {
          print += this.adj[i][j] + ' '
        }
      }
      console.log(print)
    }
  }

  // Depth-first search
  dfs (v) {
    this.marked[v] = true
    if (this.adj[v] !== undefined) {
      console.log('Visited vertex:', v)
    }
    for (const key in this.adj[v]) {
      const w = this.adj[v][key]
      if (!this.marked[w]) {
        this.dfs(w)
      }
    }
  }

  // Breadth-first search
  bfs (s) {
    const queue = []
    this.marked[s] = true
    queue.unshift(s)

    while (queue.length > 0) {
      const v = queue.shift()
      if (v === undefined) {
        console.log('Visited vertex:', v)
      }

      for (const key in this.adj[v]) {
        const w = this.adj[v][key]
        if (!this.marked[w]) {
          this.edgeTo[w] = v
          this.marked[w] = true
          queue.unshift(w)
        }
      }
    }
  }

  pathTo (v) {
    let source = 0
    if (!this.hasPathTo(v)) {
      return undefined
    }
    const path = []
    for (let i = v; i !== source; i = this.edgeTo[i]) {
      path.push(i)
    }
    path.push(source)
    return path
  }

  hasPathTo (v) {
    return this.marked[v]
  }

  // Topological sorting
  topSort () {
    const stack = []
    const visited = []
    for (let i = 0; i < this.vertices; i += 1) {
      visited[i] = false
    }

    for (let i = 0; i < this.vertices; i += 1) {
      if (visited[i] === false) {
        this.topSortHelper(i, visited, stack)
      }
    }

    for (let i = 0; i < stack.length; i += 1) {
      if (stack[i] !== undefined && stack[i] !== false) {
        console.log(this.vertexList[stack[i]])
      }
    }
  }

  topSortHelper (v, visited, stack) {
    visited[v] = true
    for (const w in this.adj[v]) {
      if (!visited[this.adj[v][w]]) {
        this.topSortHelper(visited[this.adj[v][w]], visited, stack)
      }
    }
    stack.push(v)
  }
}

module.exports = Graph
