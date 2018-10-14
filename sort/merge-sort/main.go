package main

import "fmt"

// MergeSort is an efficient sorting algorithm that uses divide and conquer approach to order elements in an array. Mergesort runs in a guaranteed O(n log n) time.
func MergeSort(arr []int) []int {
	// Array is sorted if it is empty or has only one item.
	if len(arr) <= 1 {
		return arr
	}
	mid := len(arr) / 2
	left := arr[:mid]
	right := arr[mid:]

	return merge(MergeSort(left), MergeSort(right))
}

func merge(left, right []int) (result []int) {
	l, r := 0, 0
	for l < len(left) && r < len(right) {
		if left[l] <= right[r] {
			result = append(result, left[l])
			l++
		} else {
			result = append(result, right[r])
			r++
		}
	}
	result = append(result, left[l:]...)
	result = append(result, right[r:]...)
	return result
}

func main() {
	in := []int{3, 2, 1, 100, 10, 33, 1}
	o := MergeSort(in)
	fmt.Println(o)
}

// MergeSortV2 sorts the data in place with space complexity of O(n)
func MergeSortV2(arr []int) {
	tmp := make([]int, len(arr))
	copy(tmp, arr)
	mergesort(tmp, arr, 0, len(arr))
}

func mergesort(tmp, arr []int, start, end int) {
	if end-start < 2 {
		return
	}
	if end-start == 2 {
		if arr[start] > arr[start+1] {
			arr[start], arr[start+1] = arr[start+1], arr[start]
		}
		return
	}
	mid := (start + end) / 2
	mergesort(arr, tmp, start, mid)
	mergesort(arr, tmp, mid, end)

	i, j := start, mid
	idx := start
	for idx < end {
		if j >= end || (i < mid && tmp[i] < tmp[j]) {
			arr[idx] = tmp[i]
			i++
		} else {
			arr[idx] = tmp[j]
			j++
		}
		idx++
	}

}
