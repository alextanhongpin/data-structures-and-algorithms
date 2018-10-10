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

	// i := 0
	// s := make([]rune, len(source))
	// copy(s, source)
	// fmt.Println(string(s), "->", string(target))
	// for {
	//         if len(s) != len(target) {
	//                 if len(s) < len(target) {
	//                         s = append(s, target[len(s):]...)
	//                 }
	//                 if len(s) > len(target) {
	//                         s = s[:len(target)]
	//                 }
	//         } else {
	//                 t := make([]rune, len(target))
	//                 copy(t, target)
	//                 if s[i] != t[i] {
	//                         s[i], t[i] = t[i], s[i]
	//                 }
	//                 i++
	//         }
	//         fmt.Println("assign target", string(target), string(s))
	//         if string(target) == string(s) {
	//                 break
	//         }
	// }
}

func levenshtein(source, target []rune) int {
	s, t := len(source)+1, len(target)+1

	table := make([][]int, s)
	for row := range table {
		table[row] = make([]int, t)
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
			table[i][j] = min(
				table[i-1][j]+DeleteCost,                                    // Deletion
				table[i][j-1]+InsertCost,                                    // Insertion
				table[i-1][j-1]+indicatorFunction(source[i-1], target[j-1]), // Substitution
			)
		}
	}

	// Walk the path backward.
	i, j := len(source), len(target)
	var pathA, pathB, ops []rune
	var paths []string

	for i != 0 && j != 0 {
		substituteCost := table[i-1][j-1] + indicatorFunction(source[i-1], target[j-1])
		deleteCost := table[i-1][j] + DeleteCost
		insertCost := table[i][j-1] + InsertCost
		switch table[i][j] {
		case deleteCost:
			i--
			paths = append(paths, "delete: "+string(source[i]))
			pathA = append(pathA, source[i])
			pathB = append(pathB, '-')
			ops = append(ops, '-')
		case insertCost:
			j--
			paths = append(paths, "insert: "+string(target[j]))
			pathA = append(pathA, '-')
			pathB = append(pathB, target[j])
			ops = append(ops, '+')
		case substituteCost:
			j--
			i--
			paths = append(paths, "copy: "+string(target[j]))
			pathA = append(pathA, source[i])
			pathB = append(pathB, target[j])
			ops = append(ops, 's')
		}
	}
	fmt.Println("alignments")
	fmt.Println(string(reverse(pathA)))
	fmt.Println(string(reverse(pathB)))
	fmt.Println(string(reverse(ops)))
	fmt.Println("\noperations")
	fmt.Println(strings.Join(reverseString(paths), "\n"))

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
