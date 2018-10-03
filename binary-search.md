```go
package main

import (
	"log"
	"math/rand"
	"sort"
	"testing/quick"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

func main() {
	f := func(data []int) bool {
		// Data needs to be sorted for binary search.
		sort.Ints(data)
		index := -1
		target := -1
		if len(data) > 0 {
			index = rand.Intn(len(data))
			target = data[index]
		}
		expectedIndex, _ := binarySearch(target, data, 0, len(data), 1)
		return index == expectedIndex
	}

	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}
}

func binarySearch(target int, nums []int, left, right, depth int) (int, int) {
	if left < right {
		mid := (left + right) / 2
		value := nums[mid]

		if target > value {
			return binarySearch(target, nums, mid+1, right, depth+1)
		} else if target < value {
			return binarySearch(target, nums, left, mid, depth+1)
		} else {
			return mid, depth
		}
	}
	return -1, depth
}
```
