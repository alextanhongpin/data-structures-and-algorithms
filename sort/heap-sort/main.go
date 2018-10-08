package main

import "fmt"

func maxHeapify(arr []int, heap_size, i int) {
	left := 2*i + 1
	right := 2*i + 2
	largest := i
	if left < heap_size && arr[left] > arr[largest] {
		largest = left
	}
	if right < heap_size && arr[right] > arr[largest] {
		largest = right
	}
	if largest != i {
		arr[i], arr[largest] = arr[largest], arr[i]
		maxHeapify(arr, heap_size, largest)
	}
}

func buildHeap(arr []int) {
	heap_size := len(arr)
	for i := heap_size / 2; i > -1; i-- {
		maxHeapify(arr, heap_size, i)
	}
}

func HeapSort(arr []int) {
	heap_size := len(arr)
	buildHeap(arr)
	for i := heap_size - 1; i > 0; i-- {
		arr[0], arr[i] = arr[i], arr[0]
		heap_size--
		maxHeapify(arr, heap_size, 0)
	}
}

func main() {
	in := []int{3, 2, 1, 100, 10, 33, 1}
	HeapSort(in)
	fmt.Println(in)
}
