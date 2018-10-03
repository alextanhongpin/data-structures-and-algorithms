```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
	data := make([]int, 100)
	for i := 0; i < 100; i++ {
		data[i] = rand.Intn(1000)
	}
	fmt.Println(mergesort(data))
}

func mergesort(data []int) []int {
	if len(data) <= 1 {
		return data
	}
	mid := len(data) / 2
	left := data[:mid]
	right := data[mid:]
	return merge(mergesort(left), mergesort(right))
}

func merge(left, right []int) []int {
	var result []int

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
```
