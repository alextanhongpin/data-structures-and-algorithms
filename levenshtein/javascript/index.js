
function main () {
  let s = 'gumbo' // source
  let t = 'gambol' // target

  let n = s.length + 1
  let m = t.length + 1

  let matrix = Array(m).fill(0).map(() => {
    return Array(n).fill(0)
  })

  for (let i = 0; i <= n; i += 1) {
    matrix[i][0] = i
  }

  for (let j = 0; j <= m; j += 1) {
    matrix[0][j] = j
  }

  console.log(matrix)

  // https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm

  for (let i = 1; i <= n; i += 1) {
    let si = s[i - 1]
    for (let j = 1; j <= m; j += 1) {
      let cost = si === t[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost)
    }
  }
  console.log(matrix, matrix[n][m])
}

main()
