```go
package main

import (
	"fmt"
)

const (
	MAXN = 100
	TOL  = 2
	LEN  = 10
)

type Node struct {
	word string
	next [2 * LEN]int
}

var root = NewNode("")
var tree = [MAXN]Node{}
var ptr int

func NewNode(x string) *Node {
	return &Node{
		word: x,
		next: [2 * LEN]int{},
	}
}

func main() {
	dictionary := []string{"hell", "help", "shel", "smell", "fell", "felt", "oops", "pop", "oouch", "halt"}
	for _, word := range dictionary {
		tmp := NewNode(word)
		add(root, tmp)
	}
	fmt.Println(getSimilarWords(root, "ops"))
	fmt.Println(getSimilarWords(root, "hel"))
}

func min(nums ...int) int {
	val := 1<<8 - 1
	for _, n := range nums {
		if n < val {
			val = n
		}
	}
	return val
}

func add(root, curr *Node) {
	if root.word == "" {
		*root = *curr
		return
	}
	dist := editDistance(curr.word, root.word)
	if tree[root.next[dist]].word == "" {
		ptr++
		tree[ptr] = *curr
		root.next[dist] = ptr
	} else {
		add(&(tree[root.next[dist]]), curr)
	}
}

func getSimilarWords(root *Node, s string) (ret []string) {
	if root.word == "" {
		return
	}
	dist := editDistance(root.word, s)
	if dist <= TOL {
		ret = append(ret, root.word)
	}

	start := dist - TOL
	if start < 0 {
		start = 1
	}

	for start < (dist + TOL) {
		tmp := getSimilarWords(&tree[root.next[start]], s)
		ret = append(ret, tmp...)
		start++
	}
	return
}

func editDistance(s, t string) int {
	m, n := len(s)+1, len(t)+1
	dp := make([][]int, m)
	for i := 0; i < m; i++ {
		dp[i] = make([]int, n)
		dp[i][0] = i
	}
	for i := 0; i < n; i++ {
		dp[0][i] = i
	}
	for i := 1; i < m; i++ {
		for j := 1; j < n; j++ {
			if s[i-1] != t[j-1] {
				dp[i][j] = min(
					1+dp[i-1][j],
					1+dp[i][j-1],
					1+dp[i-1][j-1],
				)
			} else {
				dp[i][j] = dp[i-1][j-1]
			}

		}
	}
	return dp[m-1][n-1]
}
```

Output:

```
[oops pop]
[hell help fell shel]
```
