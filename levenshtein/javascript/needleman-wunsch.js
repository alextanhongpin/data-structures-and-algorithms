function main() {
 
  let s = 'GATTACA' // Vertical 
  let t = 'GCATGCU' // Horizontal

  let n = s.length + 1 // Rows 
  let m = t.length + 1 // Columns

  // Normally use `d` for distance
  let d = Array(n).fill(0).map(() => {
    return Array(m).fill(0)
  })

  // d(i,0) = i
  for (let i = 0; i < n; i += 1) {
    d[i][0] = -i
  }


  // d(0,j) = j
  for (let j = 0; j < m; j += 1) {
    d[0][j] = -j
  }

  for (let i = 1; i < n; i += 1) {
    for (let j = 1; j < m; j += 1) {
      let similarity = s[i - 1] === t[j - 1] ? 1 : -1
      d[i][j] = Math.max(
        d[i - 1][j - 1] + similarity,
        d[i][j - 1] - 1,
        d[i - 1][j] - 1
      )
    }
  }
  console.log(d, d[n - 1][m - 1])
}

main()
