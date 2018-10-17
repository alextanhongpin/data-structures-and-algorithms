package main

import (
	"fmt"
)

const (
	Replace int = iota
	Delete
	Insert
)

var (
	ReplaceCost = 1
	DeleteCost  = 1
	InsertCost  = 1
)

func main() {
	src, tgt := []byte("sitting"), []byte("kitten")

	cost, ops := levenshtein(src, tgt)
	fmt.Println("cost is", cost)
	fmt.Println("start:", string(src))
	for i, op := range ops {
		fmt.Println("Step", i+1, op)
	}
	fmt.Println("end:", string(tgt))
}

func levenshtein(src, tgt []byte) (int, []string) {
	s, t := len(src)+1, len(tgt)+1

	m := make([][]int, s)
	op := make([][]int, s)

	for i := 0; i < s; i++ {
		m[i] = make([]int, t)
		m[i][0] = i

		op[i] = make([]int, t)
	}
	for j := 0; j < t; j++ {
		m[0][j] = j
	}

	for i := 1; i < s; i++ {
		for j := 1; j < t; j++ {
			replaceCost := func() int {
				indicator := m[i-1][j-1]
				if src[i-1] == tgt[j-1] {
					return indicator + 0
				}
				return indicator + ReplaceCost
			}
			deleteCost := m[i-1][j] + DeleteCost
			insertCost := m[i][j-1] + InsertCost

			costs := []int{replaceCost(), deleteCost, insertCost}
			m[i][j] = min(costs...)

			op[i][j] = index(costs, m[i][j])
		}
	}
	var ops []string
	i, j := len(src), len(tgt)
	for i != 0 && j != 0 {
		cost := op[i][j]
		switch {
		case cost == Replace:
			// b = append(b[:i], append([]byte("\u0336"), b[i:]...)...)
			i--
			j--
			// If the scores are the same, it means there are no change.
			if m[i][j] < m[i+1][j+1] {
				s := fmt.Sprintf("replace %d-th character %c into %c", i+1, src[i], tgt[j])
				ops = append(ops, s)
			}
		case cost == Delete || j == 0:
			i--
			s := fmt.Sprintf("delete %d-th character %c", i+1, src[i])
			ops = append(ops, s)
		case cost == Insert || i == 0:
			j--
			s := fmt.Sprintf("insert %d-th character %c", j+1, tgt[j])
			ops = append(ops, s)

		}
	}
	reverse(ops)
	return m[s-1][t-1], ops
}
func reverse(arr []string) {
	for i := 0; i < len(arr)/2; i++ {
		j := len(arr) - i - 1
		arr[i], arr[j] = arr[j], arr[i]
	}
}

func min(nums ...int) int {
	val := 1<<7 - 1
	for _, i := range nums {

		if i < val {
			val = i
		}
	}
	return val
}

func index(arr []int, n int) int {
	for i, v := range arr {
		if v == n {
			return i
		}
	}
	return -1
}
