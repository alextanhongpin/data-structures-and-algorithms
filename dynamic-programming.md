## Knapsack

```js
// The knapsack problem. Given n weights and the values of items, put these items in a knapsack of a given capacity w, to get the maximum total value in the knapsack.
const weights = [1, 2, 4, 2, 5]
const values = [5, 3, 5, 3, 2]
const target = 10


// Time complexity: O(2^n)
function knapsackNaive(weights, values, target, index = weights.length - 1) {
  // Terminating condition.
  if (index <= -1 || target <= 0) {
    return 0
  }
  // If the weights has been used up, pick the previous weights.
  if (weights[index] > target) {
    return knapsackNaive(weights, values, target, index - 1)
  }
  // Find the ones with the highest weight to value ratio.
  const current = knapsackNaive(weights, values, target, index - 1)
  const currentPlusOthers = values[index] + knapsackNaive(weights, values, target - weights[index], index - 1)
  return Math.max(current, currentPlusOthers)
}

{
  console.time()
  const result = knapsackNaive(weights, values, target)
  console.log('knapsackNaive', result)
  console.timeEnd()
}

// Time complexity: O(n*w). Here n is the number of items, and w is the capacity of the knapsack.
// Space complexity: O(n *w). The algorithm requires an n times w combination to store the cached results inside the table.

function knapsackDP(weights, values, target, index = weights.length - 1, table = {}) {
  if (index <= -1 || target <= 0) return 0

  if (table[[index, target]]) return table[[index, target]]

  if (weights[index] > target) {
    return table[[index, target]] = knapsackDP(weights, values, target, index - 1, table)
  }

  const current = knapsackDP(weights, values, target, index - 1, table)
  const currentPlusOther = values[index] + knapsackDP(weights, values, target - weights[index], index - 1, table)
  return table[[index, target]] = Math.max(current, currentPlusOther)
}

{
  console.time()
  const result = knapsackDP(weights, values, target)
  console.log('knapsackDP', result)
  console.timeEnd()
}
```

## Longest common subsequence

```js
// Time complexity: O(m * n) // Space complexity: O(m * n)

function longestCommonSubsequenceNaive(str1, str2, str1Length = str1.length, str2Length = str2.length) {
  if (str1Length === 0 || str2Length === 0) return 0

  if (str1[str1Length - 1] === str2[str2Length - 1]) {
    return 1 + longestCommonSubsequenceNaive(str1, str2, str1Length - 1, str2Length - 1)
  } else {
    return Math.max(
      longestCommonSubsequenceNaive(str1, str2, str1Length, str2Length - 1),
      longestCommonSubsequenceNaive(str1, str2, str1Length - 1, str2Length),
    )
  }
}

// Time complexity: O(2^n).
longestCommonSubsequenceNaive('AGGTAB', 'GXTXAYB') // 4. GTAB.

function longestCommonSubsequenceDP(str1, str2) {
  const m = str1.length + 1
  const n = str2.length + 1
  const dp = Array(m).fill(() => Array(n).fill(0)).map(fn => fn())

  let max = 0
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      if (str1.charAt(row - 1) === str2.charAt(col - 1)) {
        dp[row][col] = dp[row - 1][col - 1] + 1
      } else {
        dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1])
      }
    }
  }
  return dp[m - 1][n - 1]
}

console.log(longestCommonSubsequenceDP('AGGTAB', 'GXTXAYB')) // 4. GTAB.
```


## Count coin ways

```js
// Time complexity: O(n ^ m). M is the number of types of coins available. N is the desired currency to convert into change.
Space complexity: O(n).

function countCoinWays(coins, n = coins.length, value) {
  // The value is already 0, so we found one solution.
  if (value === 0) {
    return 1
  }
  // Left: The value is less than 0, so it's not a solution. 
  // Right: There are no more coins, but the value has not reached the target either, so it's not a solution.
  if (value < 0 || (n <= 0 && value >= 1)) {
    return 0
  }
  // Left: The next solution.
  // Right: The remaining value.
  return countCoinWays(coins, n - 1, value) + countCoinWays(coins, n, value - coins[n - 1])
}

function countCoinWaysHelper(coins, target) {
  return countCoinWays(coins, coins.length, target)
}

console.log(countCoinWaysHelper([1, 2, 3], 4))


// Time complexity: O(m * n)

function countCoinWaysDP(coins, n, value) {
  const table = Array(value + 1).fill(() => Array(n).fill(0)).map(fn => fn())

  // For 0 value case, (no coins).
  for (let i = 0; i < n; i++) {
    table[0][i] = 1
  }
  console.log(table)
  // We start with value = 0, hence + 1.
  for (let i = 1; i < value + 1; i++) {
    for (let j = 0; j < n; j++) {
      // Solutions including j coins, coins[j]
      let x = i - coins[j] >= 0 ?
        table[i - coins[j]][j] :
        0
      let y = j >= 1 ?
        table[i][j - 1] :
        0

      // Total count.
      table[i][j] = x + y
    }
  }
  console.log(table)
  return table[value][n - 1]
}

const coins = [1, 2, 3]
console.log(countCoinWaysDP(coins, coins.length, 4))
```
