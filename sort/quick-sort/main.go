package main

// Worst case occurs when the partition process always pick greatest
// or smallest element as pivot. If we consider the partition
// strategy where last element is pick as pivot, the worst case
// occurs when the array is already sorted in increasing or
// decreasing order.
// O(n ^ 2)
// Average: O(nlogn)
// Stable: No
func Quicksort(arr []int, low, high int) []int {
	if low < high {
		p := partition(arr, low, high)
		Quicksort(arr, low, p-1)  // Before p.
		Quicksort(arr, p+1, high) // After p.
	}
	return arr
}

func partition(arr []int, low, high int) int {
	pivot := arr[high]

	// Set the pivot index to the most left of the array. The pivot is
	// still at the last index, we just position the index value at i.
	i := low - 1
	for j := low; j <= high-1; j++ {
		// If the value on the right is less than the pivot value, swap
		// the position.
		if arr[j] <= pivot {
			// Increment the pivot position (shift to the right).
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	// Take the actual pivot value and swap it.
	arr[i+1], arr[high] = arr[high], arr[i+1]

	// Return the pivot value on the right.
	return i + 1
}

// 10, 80, 30, 90, 40, 50, 70
//  0 - 6
//
// pivot = 70
// i = -1
//
// j = 0, arr[j] = 10 < 70, i = 0, j == 0, no swap, [10] 80 30 90 40 50 70
// j = 1, arr[j] = 80 > 70, i = 0, j, no swap        10 [80] 30 90 40 50 70
// j = 2, arr[j] = 30 < 70, i = 1, swap              10 30 [80] 90 40 50 70
// j = 3, arr[j] = 90 > 70, no change                10 30 80 [90] 40 50 70
// j = 4, arr[j] = 40 < 70, i = 2, swap              10 30 40 90 [80] 50 70
// j = 5, arr[j] = 50 < 70, i = 3, swap              10 30 40 50 80 [90] 70
