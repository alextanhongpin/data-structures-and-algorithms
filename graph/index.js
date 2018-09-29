// Tests whether there is an edge from the vertex x to the vertex y.
function adjacent (G, x, y) {
  return G[x] && G[x].includes(y)
}
// Lists all vertices y such that there is an edge from the vertex x to the vertex y.
function neighbours (G, x) {
  return G[x] || []
}

// Adds the vertex x, if it is not there.
function addVertex (G, x) {
  if (G[x]) {
    return false
  }
  G[x] = []
  return true
}

// Removes the vertex x, if it is there.
function removeVertex (G, x) {
  return !!G[x] && delete (G[x])
}

// Adds the edge from the vertex x to the vertex y, if it is not there.
function addEdge (G, x, y) {
  let exist = !!G[x]
  if (!exist) {
    G[x] = [y]
  }
  if (exist && !G[x].includes(y)) {
    G[x].push(y)
  }
  return !exist
}

// Removes the edge from the vertex x to the vertex y, if it is there.
function removeEdge (G, x, y) {
  if (G[x] && G[x].includes(y)) {
    G[x] = G[x].filter(v => v !== y)
    if (!G[x].length) {
      delete (G[x])
    }
    return true
  }
  return false
}

// Returns the value associated with the vertex x.
function getVertexValue (G, x) {

}
// Sets the value associated with the vertex x to v.
function setVertexValue (G, x, v) {

}

function main () {
  let graph = {
    a: ['b', 'c'],
    b: ['c', 'd'],
    c: ['e', 'f']
  }
  console.log('a -> b ?', adjacent(graph, 'a', 'b'))
  console.log('a -> z ?', adjacent(graph, 'a', 'z'))

  console.log('neighbours', neighbours(graph, 'a'))
  console.log('addVertex', addVertex(graph, 'z'))
  console.log('graph', graph)

  console.log('removeVertex', removeVertex(graph, 'z'))
  console.log('removeVertex', removeVertex(graph, 'u'))
  console.log('graph', graph)

  console.log('addEdge', addEdge(graph, 'x', 'y'))
  console.log('addEdge', addEdge(graph, 'a', 'e'))
  console.log('graph', graph)

  console.log('removeEdge', removeEdge(graph, 'x', 'y'))
  console.log('graph', graph)
}
main()
