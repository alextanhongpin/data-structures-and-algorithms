## Implementation 1

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


## Implementation 2
```
package main

import (
	"fmt"
	"strings"
)

func adder(arr []string) {
	arr = append(arr, "!")
}

func main() {
	bkTree := NewBKTree()

	dictionary := []string{"hell", "help", "shel", "smell", "fell", "felt", "oops", "pop", "oouch", "halt"}
	for _, word := range dictionary {
		bkTree.Add(word)
	}
	fmt.Println(bkTree.Search("ops", 2))
	fmt.Println(bkTree.Search("hel", 2))
}

type Node struct {
	word     string
	children map[int]*Node
}

func NewNode(x string) *Node {
	return &Node{
		word:     strings.ToLower(x),
		children: make(map[int]*Node),
	}
}

func (n *Node) AddChild(key int, word string) {
	n.children[key] = NewNode(word)
}

func (n *Node) HasKey(key int) bool {
	_, found := n.children[key]
	return found
}

type BKTree struct {
	root *Node
}

func NewBKTree() *BKTree {
	return &BKTree{}
}

func (b *BKTree) Add(word string) {
	if b.root == nil {
		b.root = NewNode(word)
		return
	}
	word = strings.ToLower(word)
	curNode := b.root
	dist := editDistance(curNode.word, word)
	for curNode.HasKey(dist) {
		if dist == 0 {
			return
		}
		curNode = curNode.children[dist]
		dist = editDistance(curNode.word, word)
	}
	curNode.AddChild(dist, word)
}

func recursiveSearch(node *Node, result *[]string, word string, d int) {
	curDist := editDistance(node.word, word)
	minDist := curDist - d
	maxDist := curDist + d
	if curDist <= d {
		*result = append(*result, node.word)
	}
	for key, children := range node.children {
		if key > minDist && key < maxDist {
			recursiveSearch(children, result, word, d)
		}
	}
}

func (b *BKTree) Search(word string, d int) []string {
	var result []string
	word = strings.ToLower(word)
	recursiveSearch(b.root, &result, word, d)
	return result
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

## Optimized

```go
package main

import (
	"bufio"
	"bytes"
	"fmt"
	"log"
	"os"
	"runtime"
	"runtime/pprof"
)

func main() {
	f, err := os.Create("cpu.out")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	pprof.StartCPUProfile(f)
	defer pprof.StopCPUProfile()

	bkTree := NewBKTree()
	dict, err := os.Open("/usr/share/dict/words")
	if err != nil {
		log.Fatal(err)
	}
	defer dict.Close()
	scanner := bufio.NewScanner(dict)
	max := 0
	for scanner.Scan() {
		bkTree.Add(scanner.Bytes())
		if len(scanner.Bytes()) > max {
			max = len(scanner.Bytes())
		}
	}
	fmt.Println("longest", max)
	// dictionary := []string{"hell", "help", "shel", "smell", "fell", "felt", "oops", "pop", "oouch", "halt"}
	// for _, word := range dictionary {
	//         bkTree.Add(word)
	// }
	fmt.Println(bkTree.Search([]byte("ops"), 2))
	fmt.Println(bkTree.Search([]byte("hel"), 2))
	fmt.Println(bkTree.Search([]byte("trie"), 2))

	mem, err := os.Create("mem.out")
	if err != nil {
		log.Fatal(err)
	}
	runtime.GC()
	pprof.WriteHeapProfile(mem)
	defer mem.Close()
}

type Node struct {
	word     []byte
	children map[int]*Node
}

func NewNode(x []byte) *Node {
	return &Node{
		word: bytes.ToLower(x),
		// children: node[:],
		children: make(map[int]*Node),
	}
}

func (n *Node) AddChild(key int, word []byte) {
	n.children[key] = NewNode(word)
}

func (n *Node) HasKey(key int) bool {
	_, found := n.children[key]
	return found
}

type BKTree struct {
	root *Node
	buf  []int
}

func NewBKTree() *BKTree {
	return &BKTree{
		buf: make([]int, 32),
	}
}

func (b *BKTree) Add(word []byte) {
	// if !b.isSet {
	if b.root == nil {
		b.root = NewNode(word)
		// b.isSet = true
		return
	}
	word = bytes.ToLower(word)
	curNode := b.root
	// buf := make([]int, 256)
	dist := editDistance(curNode.word, word, b.buf)
	for curNode.HasKey(dist) {
		if dist == 0 {
			return
		}
		curNode = curNode.children[dist]
		dist = editDistance(curNode.word, word, b.buf)
	}
	curNode.AddChild(dist, word)
}

func recursiveSearch(node *Node, result *[][]byte, word []byte, d int) {
	buf := make([]int, 256)
	curDist := editDistance(node.word, word, buf)
	minDist := curDist - d
	maxDist := curDist + d
	if curDist <= d {
		*result = append(*result, node.word)
	}
	for key, children := range node.children {
		if key > minDist && key < maxDist {
			recursiveSearch(children, result, word, d)
		}
	}
}

func (b *BKTree) Search(word []byte, d int) [][]byte {
	var result [][]byte
	word = bytes.ToLower(word)
	recursiveSearch(b.root, &result, word, d)
	return result
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

func editDistance(s, t []byte, buf []int) int {
	m, n := len(s), len(t)
	// v0 := make([]int, n+1)
	// v1 := make([]int, n+1)
	v0 := buf[:n+1]
	v1 := buf[:n+1]

	for i := 0; i < n; i++ {
		v0[i] = i
	}

	for i := 0; i < m; i++ {
		v1[0] = i + 1
		for j := 0; j < n; j++ {
			deletionCost := v0[j+1] + 1
			insertionCost := v1[j] + 1
			substitutionCost := v0[j] + 1
			if s[i] == t[j] {
				substitutionCost = v0[j]
			}
			v1[j+1] = min(deletionCost, insertionCost, substitutionCost)
		}
		tmp := v0
		v0 = v1
		v1 = tmp
	}
	return v0[n]
}
```
