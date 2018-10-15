package main

import (
	"fmt"
)

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
	MergeSortV3(in)
	fmt.Println(in)
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

func MergeSortV3(arr []int) {
	// Unless the number is a power of 2, this will actually allocate extra
	// storage size.
	// size := math.Pow(2, math.Ceil(math.Log2(float64(len(arr)/2))))
	buf := make([]int, len(arr)/2)
	mergesortv3(arr, buf)
}

func mergesortv3(arr, buf []int) {
	if len(arr) <= 1 {
		return
	}
	if len(arr) == 2 {
		if arr[1] < arr[0] {
			arr[0], arr[1] = arr[1], arr[0]
		}
		return
	}
	mid := len(arr) / 2
	left, right := arr[:mid], arr[mid:]
	mergesortv3(left, buf)
	mergesortv3(right, buf)
	// Use only additional N/2 space for sorting
	copy(buf, left)
	l, r := 0, 0
	for l < len(left) && r < len(right) {
		idx := l + r
		if buf[l] <= right[r] {
			arr[idx] = buf[l]
			l++
		} else {
			arr[idx] = right[r]
			r++
		}
	}
	for l < len(left) {
		arr[l+r] = buf[l]
		l++
	}
	for r < len(right) {
		arr[r+l] = right[r]
		r++
	}
	// buf = buf[:0]
}

func MergeSortV4(arr []int) {
	buf := make([]int, len(arr)/2)
	mergesortv4(arr, buf, 0, len(arr))
}

func mergesortv4(arr, buf []int, start, end int) {
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
	mergesortv4(arr, buf, start, mid)
	mergesortv4(arr, buf, mid, end)

	// Use only additional N/2 space for sorting
	copy(buf, arr[start:mid])

	l, r := start, mid
	i := start
	for l < mid && r < end {
		if buf[l-start] < arr[r] {
			arr[i] = buf[l-start]
			l++
		} else {
			arr[i] = arr[r]
			r++
		}
		i++
	}
	for l < mid {
		arr[i] = buf[l-start]
		l++
		i++
	}
	for r < end {
		arr[i] = arr[r]
		r++
		i++
	}
}
