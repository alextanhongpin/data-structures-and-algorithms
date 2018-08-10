const assert = require('assert')

function main() {
  console.time('naiveLevenshtein')
  assert.equal(naiveLevenshtein('sitting', 'sitting'.length, 'kitten', 'kitten'.length), 3)
  console.timeEnd('naiveLevenshtein')

  console.time('levenshtein')
  assert.equal(levenshtein('sitting', 'kitten'), 3)
  console.timeEnd('levenshtein')

  console.time('levenshteinOptimized')
  assert.equal(levenshteinOptimized('sitting', 'kitten'), 3)
  console.timeEnd('levenshteinOptimized')
}


function naiveLevenshtein(s, m, t, n) {
  // let m = s.length
  // let n = t.length

  if (!m) return n
  if (!n) return m
  
  let cost = !(s[m - 1] === t[n - 1])
  return Math.min(
    naiveLevenshtein(s, m - 1, t, n) + 1,
    naiveLevenshtein(s, m, t, n - 1) + 1,
    naiveLevenshtein(s, m - 1, t, n - 1) + cost
  )
}

function levenshtein(s, t) {
  let m = s.length // Row
  let n = t.length // Column

  if (!m) return n
  if (!n) return m

  let d = Array(m + 1).fill(0).map(() => 
    Array(n + 1).fill(0)
  )
  
  for (let i = 0; i <= m; i += 1) {
    d[i][0] = i
  }

  for (let j = 0; j <= n; j += 1) {
    d[0][j] = j
  }

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      let cost = s[i - 1] === t[j - 1] ? 0 : 1
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // Deletion
        d[i][j - 1] + 1, // Insertion
        d[i - 1][j - 1] + cost // Substitution
      )
    }
  }
  return d[m][n]
}

function levenshteinOptimized(s, t) {
  let m = s.length
  let n = t.length
  let v0 = Array(n + 1).fill(0).map((_, i) => i)
  let v1 = Array(n + 1).fill(0)

  for (let i = 0; i < m; i += 1) {
    v1[0] = i + 1
    for (let j = 0; j < n; j += 1) {
      let deletionCost = v0[j + 1] + 1
      let insertionCost = v1[j] + 1
      let substitutionCost = s[i] === t[j] ? v0[j] : v0[j] + 1
      v1[j + 1] = Math.min(deletionCost, insertionCost, substitutionCost)
    }
    v0 = [...v1]
  } 
  return v0[n]
}


main()
