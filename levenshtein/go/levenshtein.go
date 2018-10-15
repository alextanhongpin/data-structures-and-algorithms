package main

import (
	"fmt"
	"strings"
)

var (
	DeleteCost     = 1
	InsertCost     = 1
	SubstituteCost = 1
)

const (
	DELETE int = iota
	INSERT
	REPLACE
)

func main() {
	var (
		source = []rune("places")
		target = []rune("palace")
	)
	l := levenshtein(source, target)
	fmt.Println(l)
	longest := max(len(source), len(target))

	score := (float64(1) - float64(l)/float64(longest)) * 100
	fmt.Println(score)
}

func levenshtein(source, target []rune) int {
	s, t := len(source)+1, len(target)+1

	table := make([][]int, s)
	op := make([][]int, s)

	for row := range table {
		table[row] = make([]int, t)
		op[row] = make([]int, t)
		table[row][0] = row
	}
	for col := range table[0] {
		table[0][col] = col
	}

	indicatorFunction := func(a, b rune) int {
		if a == b {
			return 0
		}
		return SubstituteCost
	}

	for i := 1; i < s; i++ {
		for j := 1; j < t; j++ {
			costs := []int{
				table[i][j-1] + InsertCost,                                    // Insertion
				table[i-1][j] + DeleteCost,                                    // Deletion
				table[i-1][j-1] + indicatorFunction(source[i-1], target[j-1]), // Substitution
			}
			cost := min(costs...)
			table[i][j] = cost
			op[i][j] = indexOf(cost, costs)
		}
	}

	// Walk the path backward.
	i, j := len(source), len(target)

	var ops []string
	for i != 0 && j != 0 {
		cost := op[i][j]
		switch {
		case cost == DELETE || j == 0:
			str := fmt.Sprintf("deleted %d-th string (%c) for %s", i, source[i-1], string(source))
			ops = append(ops, str)
			i--
		case cost == INSERT || i == 0:
			str := fmt.Sprintf("insert %d-th string (%c) for %s", j, target[j-1], string(target))
			ops = append(ops, str)
			j--
		case cost == REPLACE:
			if table[i-1][j-1] < table[i][j] {
				str := fmt.Sprintf("replaced %d-th string (%c) with %c, %s", j, source[i-1], target[j-1], string(target))
				ops = append(ops, str)
			}
			i--
			j--
		}
	}
	fmt.Println(strings.Join(reverseString(ops), "\n"))
	return table[s-1][t-1]
}

func min(in ...int) int {
	out := 1<<7 - 1
	for _, i := range in {
		if i < out {
			out = i
		}
	}
	return out
}

func max(in ...int) int {
	out := -1 << 7
	for _, i := range in {
		if i > out {
			out = i
		}
	}
	return out
}

func reverse(in []rune) []rune {
	for i := 0; i < len(in)/2; i++ {
		j := len(in) - 1 - i
		in[i], in[j] = in[j], in[i]
	}
	return in
}

func reverseString(in []string) []string {
	for i := 0; i < len(in)/2; i++ {
		j := len(in) - 1 - i
		in[i], in[j] = in[j], in[i]
	}
	return in
}

func indexOf(i int, in []int) int {
	// We traverse backwards, indicating that we prefer substitution.
	for j := len(in) - 1; j > -1; j-- {
		if in[j] == i {
			return j
		}
	}
	return -1
}
