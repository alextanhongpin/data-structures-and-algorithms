function main () {
  let x = [[1.0, 1.1], [1.0, 1.0], [0.0, 0.0], [0.0, 0.1]]
  let y = ['A', 'A', 'B', 'B']
  console.log(x, y)
  let targetX = [0, 0]
  let result = knn(x, y, targetX)
  console.log('Nearest neighbour is', result)
}

function euclidean ([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function knn (x, y, targetX, k = 3) {
  let scores = x.map((p, i) => [euclidean(targetX, p), i])
    .sort((a, b) => a[0] - b[0])
    .map(([score, i]) => i)
    .slice(0, k)
    .reduce((acc, i) => {
      acc[y[i]] = acc[y[i]] ? acc[y[i]] + 1 : 1
      return acc
    }, {})
  return Object.entries(scores).sort(([k1, v1], [k2, v2]) => v2 - v1)[0][0]
}
main()
