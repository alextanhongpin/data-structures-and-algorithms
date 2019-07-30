## Dijikstra


```js
const graph = {
  start: {
    A: 5,
    B: 10
  },
  A: {
    C: 4,
    D: 2
  },
  B: {
    A: 8,
    D: 7
  },
  C: {
    D: 6,
    finish: 3
  },
  D: {
    finish: 1
  },
  finish: {}
}

const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node
      }
    }
    return lowest
  }, null)
}

const dijikstra = graph => {
  const costs = Object.assign({
    finish: Infinity
  }, graph.start)
  const parents = {
    finish: null
  }
  for (let child in graph.start) {
    parents[child] = 'start'
  }
  const processed = []
  let node = lowestCostNode(costs, processed)
  while (node) {
    let cost = costs[node]
    let children = graph[node]
    for (let n in children) {
      let newCost = cost + children[n]
      if (!costs[n]) {
        costs[n] = newCost
        parents[n] = node
      }
      if (costs[n] > newCost) {
        costs[n] = newCost
        parents[n] = node
      }
    }
    processed.push(node)
    node = lowestCostNode(costs, processed)
  }

  let optimalPath = ['finish']
  let parent = parents.finish
  while (parent) {
    optimalPath.push(parent)
    parent = parents[parent]
  }
  optimalPath.reverse()
  const results = {
    distance: costs.finish,
    path: optimalPath
  }
  return results
}

console.log(dijikstra(graph))
```
