```go
package main

import (
	"fmt"
)

func main() {
	data := []int{-4, 33, 3, 4, 2, 1, 6}
	out := mergesort(data)
	fmt.Println(out)
}

func mergesort(data []int) []int {
	if len(data) <= 1 {
		return data
	}
	mid := len(data) / 2
	left := data[0:mid]
	right := data[mid:]
	return merge(mergesort(left), mergesort(right))
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
	if len(left) > 0 {
		result = append(result, left[l:]...)
	} 
	if len(right) > 0 {
		result = append(result, right[r:]...)
	}
	return

}
```
