## Testing the sorting order
```go
package main

import (
	"fmt"
	"log"
	"reflect"
	"sort"
	"testing/quick"
)

func bubbleSort(nums []int) {
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			if nums[i] > nums[j] {
				nums[i], nums[j] = nums[j], nums[i]
			}
		}
		// The opposite holds true
		//for j := 0; j < len(nums)-i-1; j++ {
		//	if nums[j] > nums[j+1] {
		//		nums[j], nums[j+1] = nums[j+1], nums[j]
		//	}
		//}
	}
}

func insertionSort(nums []int) {
	// Starts from the first element.
	for i := 1; i < len(nums); i++ {
		j := i
		// While the number on the right is smaller than the number on the left, shift it backwards by one.
		for j > 0 && nums[j] < nums[j-1] {
			nums[j], nums[j-1] = nums[j-1], nums[j]
			j -= 1
		}
	}
}

func optimizedInsertionSort(nums []int) {
}

func main() {
	f := func(num []int) bool {
		cp := make([]int, len(num))
		copy(cp, num)
		insertionSort(num)
		sort.Ints(cp)
		return reflect.DeepEqual(cp, num)
	}

	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}
	fmt.Println("completed")
}
```
