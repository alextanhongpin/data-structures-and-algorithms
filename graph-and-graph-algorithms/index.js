
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
    for (const w in this.adj[v]) {
      const wi = parseInt(w, 10)
      if (!this.marked[wi]) {
        this.dfs(wi)
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

      for (const w in this.adj[v]) {
        const wi = parseInt(w, 10)
        if (!this.marked[wi]) {
          this.edgeTo[wi] = v
          this.marked[wi] = true
          queue.unshift(wi)
        }
      }
    }
  }

  pathTo (v) {
    let source = 0
    if (!this.hasPathTo(v)) {
      console.log('no path', this.hasPathTo(v), v)
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

  toString () {}
}

module.exports = Graph
