## Quick Sort

```go
package main

import (
	"log"
	"reflect"
	"sort"
	"testing/quick"
)

func quickSort(nums []int, lo, hi int) {
	if lo < hi {
		p := partition(nums, lo, hi)
		quickSort(nums, lo, p-1)
		quickSort(nums, p+1, hi)
	}
}

func partition(nums []int, lo, hi int) int {
	pivot := nums[hi]
	i := lo
	for j := lo; j < hi; j++ {
		if nums[j] < pivot {
			nums[i], nums[j] = nums[j], nums[i]
			i++
		}
	}
	nums[i], nums[hi] = nums[hi], nums[i]
	return i
}

func main() {
	f := func(a []int) bool {
		b := make([]int, len(a))
		copy(b, a)
		sort.Ints(a)
		quickSort(b, 0, len(b)-1)
		return reflect.DeepEqual(a, b)
	}
	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}
}
```
