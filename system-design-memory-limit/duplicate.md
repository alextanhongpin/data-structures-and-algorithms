You have an array with all the numbers from 1 to N, where N is at most 32,000. The array may have duplicate entries, and you do not know what N is. With only 4KB of memory available, how would you print all duplicate elements in the array?

```go
package main

import (
	"fmt"
)

type BitSet struct {
	bitset []int
}

func NewBitSet(size int32) *BitSet {
	return &BitSet{make([]int, size>>5)} // Divide by 32.
}

func (b *BitSet) Get(pos int) bool {
	wordNum := pos >> 32         // Divide by 32.
	bitNum := uint(pos & (0x1F)) // Mod 32.
	return (b.bitset[wordNum] & (1 << bitNum)) != 0
}

func (b *BitSet) Set(pos int) {
	wordNum := pos >> 32         // Divide by 32.
	bitNum := uint(pos & (0x1F)) // Mod 32.
	b.bitset[wordNum] |= 1 << bitNum
}

func main() {
	checkDuplicates([]int{1, 2, 3, 4, 5, 5})
}

func checkDuplicates(nums []int) {
	bs := NewBitSet(32000)
	for _, n := range nums {
		// Num starts from 1.
		n0 := n - 1 // Bitset starts at 0, number starts at 1.
		if bs.Get(n0) {
			fmt.Println(n)
		} else {
			bs.Set(n0)
		}
	}
}
```
