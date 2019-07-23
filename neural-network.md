```js
function dot(v, w) {
  if (v.length !== w.length) throw 'v and w must have equal length'
  let result = 0
  for (let i in v) {
    result += v[i] * w[i]
  }
  return result
}

function random(n) {
  return Array(n).fill(() => Math.random() / 1000).map(fn => fn())
}

function activationFunction(value) {
  return value > 0.5 ?
    1 :
    0
}

const X = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
]
const y = [0, 1, 1, 1]

let weights = random(X[0].length)
let biasWeight = Math.random() / 1000

const epochs = 5
for (let epoch = 0; epoch < epochs; epoch++) {
  let accuracy = 0
  for (let i in X) {
    const Xi = X[i]
    const activationLevel = dot(Xi, weights) + (biasWeight + 1)
    const perceptronOutput = activationFunction(activationLevel)
    if (perceptronOutput === y[i]) {
      accuracy++
    }
    const updatedWeights = []
    for (let j in Xi) {
      updatedWeights.push(weights[j] + (y[i] - perceptronOutput) * Xi[j])
    }
    biasWeight = biasWeight + ((y[i] - perceptronOutput) * 1)
    weights = updatedWeights
  }
  console.log('accuracy:', accuracy, 'epoch:', epoch)
}
```
