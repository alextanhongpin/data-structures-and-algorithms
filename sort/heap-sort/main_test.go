package main

import (
	"sort"
	"testing"
	"testing/quick"
)

func TestHeapSort(t *testing.T) {
	f := func(in []int) bool {
		c := make([]int, len(in))
		copy(c, in)
		sort.Ints(c)

		HeapSort(in)
		for k, v := range c {
			if in[k] != v {
				return false
			}
		}
		return true
	}

	if err := quick.Check(f, nil); err != nil {
		t.Fatal(err)
	}
}
