```go
package main

import (
	"fmt"
	"sort"
)

func main() {
	arr := []int{8, 7, 2, 5, 3, 1}
	sort.Ints(arr)
	lo, hi := 0, len(arr)-1

	target := 10
	for i := 0; i < len(arr)/2; i += 1 {
		sum := arr[lo] + arr[hi]
		if sum == target {
			fmt.Println(lo, hi, sum)
			break
		}
		if sum < target {
			lo++
		} else {
			hi--
		}
	}
}
```
