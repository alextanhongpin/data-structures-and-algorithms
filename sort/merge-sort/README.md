```
$ go test -bench=. -benchmem -memprofile=mem.out -cpuprofile=cpu.out
goos: darwin
goarch: amd64
BenchmarkSortV1-4             30          42158286 ns/op           0.00 MB/s    46515422 B/op     321116 allocs/op
BenchmarkSortV2-4            300           4069590 ns/op           0.00 MB/s      805573 B/op          1 allocs/op
BenchmarkSortV3-4            500           3345629 ns/op           0.00 MB/s      403063 B/op          1 allocs/op
BenchmarkSortV4-4            500           3448656 ns/op           0.00 MB/s      403120 B/op          1 allocs/op
```


## Code
```go
package main

import (
	"log"
	"reflect"
	"sort"
	"testing/quick"
)

func merge(left, right []int) []int {
	var result []int
	var i, j int
	for i < len(left) && j < len(right) {
		if left[i] < right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}
	result = append(result, left[i:]...)
	result = append(result, right[j:]...)
	return result
}

func mergeSort(n []int) []int {
	if len(n) <= 1 {
		return n
	}
	mid := len(n) / 2
	left := mergeSort(n[mid:])
	right := mergeSort(n[:mid])
	return merge(left, right)
}

func main() {
	f := func(a []int) bool {
		b := make([]int, len(a))
		copy(b, a)
		sort.Ints(a)
		return reflect.DeepEqual(a, mergeSort(b))
	}
	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}
}
```
