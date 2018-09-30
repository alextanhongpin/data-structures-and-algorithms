package main

import (
	"log"
	"math"
)

func main() {

	var (
		source = []rune("abc")
		target = []rune("xyz")
		s      = len(source)
		t      = len(target)
		sub    = 1
		ins    = 1
		del    = 1
	)
	levenshtein := factory(sub, del, ins)
	d := levenshtein(source, target, s, t)
	log.Println("got distance:", d)
}

func factory(sub, del, ins int) func(s, t []rune, m, n int) int {
	return func(s, t []rune, m, n int) int {
		if m == 0 {
			return n
		}
		if n == 0 {
			return m
		}
		matrix := make([][]int, m+1)
		for i := 0; i < m+1; i++ {
			matrix[i] = make([]int, n+1)
		}
		for j := 1; j < m+1; j++ {
			matrix[j][0] = j * del // Deletion.
		}

		for i := 1; i < n+1; i++ {
			matrix[0][i] = i * ins // Insertion.
		}

		for i := 1; i < m+1; i++ {
			log.Printf("start with: %s\n", string(t[:i-1]))
			for j := 1; j < n+1; j++ {
				cost := sub
				if s[i-1] == t[j-1] {
					cost = 0
				}
				scores := []int{
					matrix[i-1][j] + del,    // Deletion (Going backward is deletion, but forward is insertion)
					matrix[i][j-1] + ins,    // Insertion (Going upward is insertion, but downward is deletion)
					matrix[i-1][j-1] + cost, // Substitution
				}
				matrix[i][j] = min(scores...)
				switch argmin(scores) {
				case 0:
					log.Printf("deleted: %c inserted: %c present: %s\n", s[i-1], t[i-1], string(t[:i]))
				case 1:
					log.Printf("inserted: %c deleted: %c present: %s\n", t[j-1], s[j-1], string(t[:j]))
				case 2:
					log.Printf("copied: %c\n", t[i-1])
				}
			}
			log.Println()
		}
		for _, row := range matrix {
			log.Println(row)
		}
		return matrix[m][n]
	}
}
func min(ints ...int) int {
	v := math.MaxInt8
	for _, i := range ints {
		v = mincmp(i, v)
	}
	return v
}

func mincmp(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func argmin(arr []int) int {
	v := min(arr...)
	for i, a := range arr {
		if a == v {
			return i
		}
	}
	return -1
}
