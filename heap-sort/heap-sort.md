# Heap-Sort in golang

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello, playground")

	var nodes []heapNode
	arr := []int{1, 5, 8, 3, 9, 6, 2, 7}
	for i, v := range arr {
		nodes = append(nodes, heapNode{v, i})
	}

	fmt.Println(nodes)
	minHeap(nodes)
	fmt.Println(nodes)
	
	var firstSet, secondSet bool

	for len(nodes) > 0 {
		var head heapNode
		head, nodes = nodes[0], nodes[1:]
		fmt.Println("min is", head.element)
		if !firstSet {
			node := heapNode{-4, head.index}
			nodes = append(nodes, node)
			firstSet = true
		}
		if !secondSet {
			node := heapNode{60, head.index}
			nodes = append(nodes, node)
			secondSet = true
		}
		minHeap(nodes)
	}
}

type heapNode struct {
	element int
	index   int
}

func minHeap(arr []heapNode) {
	n := len(arr)
	for i := n / 2; i > -1; i-- {
		heapify(arr, n, i)
	}
}

// heapify takes an array of int, with n equals the heap size and i is the index of the root.
func heapify(arr []heapNode, n, i int) {
	smallest := i
	left, right := i*2+1, i*2+2

	if left < n && arr[left].element < arr[smallest].element {
		smallest = left
	}
	if right < n && arr[right].element < arr[smallest].element {
		smallest = right
	}
	if smallest != i {
		arr[smallest], arr[i] = arr[i], arr[smallest]
		heapify(arr, n, smallest)
	}
}
```
