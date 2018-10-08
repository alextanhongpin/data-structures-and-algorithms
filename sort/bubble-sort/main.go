package main

import (
	"fmt"
)

// Worst Time Complexity: O(n * n). Worst case occurs when array is reverse sorted.
// Best Case Time Complexity: O(n). Best case occurs when array is already sorted.
// Stable: Yes

// BubbleSort repeatedly swap the adjacent elements if they are in the wrong order.
func BubbleSort(in []int) []int {
	for i := 0; i < len(in); i++ {
		for j := 0; j < len(in)-i-1; j++ {
			if in[j] > in[j+1] {
				in[j], in[j+1] = in[j+1], in[j]
			}
		}
	}
	return in
}

func BubbleSortOptimized(in []int) []int {
	// Traverse through all array elements.
	for i := 0; i < len(in); i++ {
		var swapped bool

		// Last i elements are already in place.
		for j := 0; j < len(in)-i-1; j++ {

			if in[j] > in[j+1] {
				in[j], in[j+1] = in[j+1], in[j]
				swapped = true
			}
		}

		// If no two elements were swapped by inner loop, then break.
		if !swapped {
			break
		}
	}
	return in
}

func main() {
	o := BubbleSort([]int{64, 34, 25, 12, 22, 11, 90})
	fmt.Println(o)
	o = BubbleSortOptimized([]int{64, 34, 25, 12, 22, 11, 90})
	fmt.Println(o)
}
