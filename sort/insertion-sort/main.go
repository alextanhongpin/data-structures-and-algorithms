package main

import "fmt"

// Insertion Sort:
// Time complexity: O(n*n)
// Takes maximum time if the elements are sorted in reverse order, and minimum
// time when elements are already sorted.
// Stable: Yes.

func InsertionSortNaive(in []int) []int {
	for i := 1; i < len(in); i++ {
		j := i
		for j > 0 && in[j-1] > in[j] {
			// Perform swap.
			in[j], in[j-1] = in[j-1], in[j]
			j--
		}
	}
	return in
}

func InsertionSortOptimized(in []int) []int {
	for i := 0; i < len(in); i++ {
		x := in[i]
		j := i - 1
		// Shift larger values to the right, but only shift the smaller
		// value to the left once.
		for j >= 0 && in[j] > x {
			in[j+1] = in[j]
			j--
		}
		in[j+1] = x
	}
	return in
}

func main() {
	in := []int{3, 2, 1, 100, 10, 33, 1}

	c := make([]int, len(in))
	copy(c, in)
	fmt.Println(InsertionSortNaive(c))

	c2 := make([]int, len(in))
	copy(c2, in)
	fmt.Println(InsertionSortOptimized(c2))
	fmt.Println(in)
}
