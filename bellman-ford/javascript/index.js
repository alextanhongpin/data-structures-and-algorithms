const fs = require('fs')
const bellmanFord = require('./bellman-ford').bellmanFord
const bellmanFordArbitrage = require('./bellman-ford').bellmanFordArbitrage

function main () {
  basicBellmanFord()
  currencyArbitrage()
}
main()

function drawGraph (vertices, edges, distance, fileName) {
  let output = `digraph G {
  layout=circo
  ${edges.map(([u, v, w]) =>
    `"${vertices[u]} (${distance[u]})" -> "${vertices[v]} (${distance[v]})" [label="${w}"]`
  ).join('\n\t')
}
}`

  fs.writeFileSync(fileName, output)
}

function basicBellmanFord () {
  let vertices = [0, 1, 2, 3, 4]
  let edges = [
    [0, 1, -1],
    [0, 2, 4],
    [1, 2, 3],
    [1, 3, 2],
    [1, 4, 2],
    [3, 2, 5],
    [3, 1, 1],
    [4, 3, -3]
  ]

  let source = 0 // Starts with A

  let [distance, predecessor] = bellmanFord(vertices, edges, source)
  // console.log(distance, predecessor)
  drawGraph(vertices, edges, distance, 'bellman-ford.dot')
}

function currencyArbitrage () {
  let labels = ['USD', 'EUR', 'GBP', 'CHF', 'CAD']
  let vertices = [0, 1, 2, 3, 4]

  // // CHF -> GBP -> CHF (0.62 * 1.614 = 1.00068)
  let matrix = [
    [1, 0.741, 0.657, 1.061, 1.011],
    [1.35, 1, 0.889, 1.433, 1.366],
    [1.521, 1.126, 1, 1.614, 1.538],
    [0.943, 0.698, 0.62, 1, 0.953],
    [0.955, 0.732, 0.65, 1.049, 1]
  ]

  // // EUR -> GBP -> CHF -> EUR
  // (1.433 * 0.62 * 1.126 = 1.00040596)
  // matrix = [
  //   [1, 0.741, 0.657, 1.061, 1.005],
  //   [1.349, 1, 0.888, 1.433, 1.366],
  //   [1.521, 1.126, 1, 1.614, 1.538],
  //   [0.942, 0.698, 0.619, 1, 0.953],
  //   [0.995, 0.732, 0.65, 1.049, 1]
  // ]

  // https://priceonomics.com/jobs/puzzle/
  labels = ['USD', 'EUR', 'JPY', 'BTC']
  vertices = [0, 1, 2, 3]
  matrix = [
    [1, 0.7779, 102.459, 0.0083],
    [1.2581, 1, 131.711, 0.01125],
    [0.0098, 0.0075, 1, 0.0000811],
    [115.65, 88.8499, 12325.44, 1]
  ]

  // // This sample data does not work
  // matrix = [
  //   [0, 0.5, 0.8, 0.6, 0.1],
  //   [0.9, 0, 0.3, 0.7, 0.3],
  //   [0.7, 0.5, 0, 0.4, 0.9],
  //   [0.3, 0.6, 0.3, 0, 0.6],
  //   [0.6, 0.4, 0.7, 0.3, 0]
  // ]
  let edges = []
  let V = vertices.length
  for (let i = 0; i < V; i += 1) {
    for (let j = 0; j < V; j += 1) {
      if (i === j) continue
      // Take the natural logarithm of the values in the currency table and negate them
      // The negative cycles detected are the arbitrage situations
      edges.push([i, j, -Math.log(matrix[i][j])])
    }
  }

  for (let i of vertices) {
    let paths = bellmanFordArbitrage(vertices, edges, i)

    if (paths) {
      let profit = 1
      let start = paths.shift()
      while (paths.length) {
        let next = paths.shift()
        let from = labels[start]
        let to = labels[next]
        let exchange = matrix[start][next]
        profit *= exchange
        console.log(`from ${from} to ${to} exchange rate is ${exchange}`)
        start = next
      }
      console.log('total profit is', profit)
    } else {
      console.log('no profit')
    }
    console.log('')
  }
}
