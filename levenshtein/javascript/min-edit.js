
function main () {
  let s = 'gumbo' // source
  let t = 'gambol' // target

  let n = s.length + 1
  let m = t.length + 1

  // Normally use `d` for distance
  let d = Array(m).fill(0).map(() => {
    return Array(n).fill(0)
  })

  // d(i,0) = i
  for (let i = 0; i <= n; i += 1) {
    d[i][0] = i
  }

  // d(0,j) = j
  for (let j = 0; j <= m; j += 1) {
    d[0][j] = j
  }

  console.log(d)

  // https://people.cs.pitt.edu/~kirk/cs1501/Pruhs/Spring2006/assignments/editdistance/Levenshtein%20Distance.htm

  for (let i = 1; i <= n; i += 1) {
    let si = s[i - 1]
    for (let j = 1; j <= m; j += 1) {
      let cost = si === t[j - 1] ? 0 : 1 // Copy, else Substitution
      d[i][j] = Math.min(
	d[i - 1][j] + 1, // Deletion 
	d[i][j - 1] + 1, // Insertion
	d[i - 1][j - 1] + cost 
      )
    }
  }
  console.log(d, d[n][m])
}

main()
