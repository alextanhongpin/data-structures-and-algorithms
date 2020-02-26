## Recursive Knapsack
```js
// const values = [60, 100, 120] 
// const weights = [10, 20, 30] 
// const maxWeight = 50
// const n = values.length
const values = [40, 100, 50, 60]
const weights = [20, 10, 40, 30]
const maxWeight = 60
const n = values.length

function knapsack(maxWeight, weights, values, n) {
  if (n === 0 || maxWeight === 0) {
    return 0
  }
  if (weights[n - 1] > maxWeight) {
    return knapsack(maxWeight, weights, values, n - 1)
  }

  return Math.max(
    values[n - 1] + knapsack(maxWeight - weights[n - 1], weights, values, n - 1),
    knapsack(maxWeight, weights, values, n - 1)
  )
}

console.log(knapsack(maxWeight, weights, values, n))
```

## Dynamic Programming
```js
function knapsackDp(maxWeight, weights, values, n) {
  const dp = Array(n + 1).fill(
    () => Array(maxWeight + 1).fill(0)
  ).map(fn => fn())

  for (let i = 1; i < n + 1; i += 1) {
    for (let j = 1; j < maxWeight + 1; j += 1) {
      if (weights[i - 1] <= j) {
        dp[i][j] = Math.max(
          values[i - 1] + dp[i - 1][j - weights[i - 1]],
          dp[i - 1][j]
        )
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  let result = dp[n][maxWeight]
  let weight = maxWeight
  for (let i = n; i > 0 && result > 0; i -= 1) {
    if (result === dp[i - 1][weight]) {
      continue
    } else {
      console.log('included', weights[i - 1])
      result -= values[i - 1]
      weight -= weights[i - 1]
    }
  }
  return dp[n][maxWeight]
}

console.log(knapsackDp(maxWeight, weights, values, n))
```
