# Given an array A[] and a number x, check for pair in A[] with sum as x
```go
package main

import (
	"fmt"
)

func main() {
	A := []int{1, 4, 45, 6, 10, -8}
	x := 16

	set := make(map[int]struct{})
	for _, i := range A {
		tmp := x - i
		if tmp >= 0 {
			if _, found := set[i]; found {
				fmt.Println(tmp, "+", i)
			}
		}
		set[tmp] = struct{}{}
	}
}
```
