
// Graph G(V,E)
// Vertices is the node
// Edges is an array of [u, v, w]
function bellmanFord (vertices, edges, source) {
  // Initialize graph
  // At the beginning, all vertices have a weight of infinity
  let distance = {}
  let predecessor = {}
  for (let v of vertices) {
    // distance[v] = Infinity
    // The weight is zero at the source
    // distance[v] = v === source ? 0 : Infinity
    distance[v] = Infinity
    predecessor[v] = null
  }
  // The weight is zero at the source
  distance[source] = 0

  // Relax edges v - 1 times
  for (let i = 1; i < vertices.length - 1; i += 1) {
    for (let [u, v, w] of edges) {
      if (distance[u] + w < distance[v]) {
        distance[v] = distance[u] + w
        predecessor[v] = u
      }
    }
  }

  // Check for negative-weight cycle
  for (let [u, v, w] of edges) {
    if (distance[u] + w < distance[v]) {
      // console.log('negative', u, v)
      // return retrace(predecessor, source)
      throw new Error('graph contains a negative-weight cycle')
    }
  }

  // Simplified bellman-ford algorithm
  // // Relax edges v - 1 times
  // for (let i = 1; i < vertices.length; i += 1) {
  //   for (let [u, v, w] of edges) {
  //     if (distance[u] + w < distance[v]) {
  //       // Check for negative cycles
  //       if (i === vertices.length - 1) {
  //         throw new Error('graph contains a negative-weight cycle')
  //       }
  //       distance[v] = distance[u] + w
  //       predecessor[v] = u
  //     }
  //   }
  // }

  return [distance, predecessor]
}

function bellmanFordArbitrage (vertices, edges, source) {
  // Initialize graph
  // At the beginning, all vertices have a weight of infinity
  let distance = {}
  let predecessor = {}
  for (let v of vertices) {
    // distance[v] = Infinity
    // The weight is zero at the source
    // distance[v] = v === source ? 0 : Infinity
    distance[v] = Infinity
    predecessor[v] = null
  }
  // The weight is zero at the source
  distance[source] = 0

  // Relax edges v - 1 times
  for (let i = 1; i < vertices.length - 1; i += 1) {
    for (let [u, v, w] of edges) {
      if (distance[u] + w < distance[v]) {
        distance[v] = distance[u] + w
        predecessor[v] = u
      }
    }
  }

  // Check for negative-weight cycle
  for (let [u, v, w] of edges) {
    if (distance[u] + w < distance[v]) {
      return retrace(predecessor, source)
    }
  }

  // Simplified bellman-ford algorithm
  // // Relax edges v - 1 times
  // for (let i = 1; i < vertices.length; i += 1) {
  //   for (let [u, v, w] of edges) {
  //     if (distance[u] + w < distance[v]) {
  //       // Check for negative cycles
  //       if (i === vertices.length - 1) {
  //         throw new Error('graph contains a negative-weight cycle')
  //       }
  //       distance[v] = distance[u] + w
  //       predecessor[v] = u
  //     }
  //   }
  // }

  return null
}

function retrace (predecessor, source) {
  let arbitrageLoop = [source]
  let nextNode = source
  while (true) {
    nextNode = predecessor[nextNode]
    if (!arbitrageLoop.includes(nextNode)) {
      arbitrageLoop.push(nextNode)
    } else {
      arbitrageLoop.push(nextNode)
      let i = arbitrageLoop.indexOf(nextNode)
      arbitrageLoop = arbitrageLoop.slice(i)
      return arbitrageLoop.reverse()
    }
  }
}

module.exports = {
  bellmanFord,
  bellmanFordArbitrage
}
