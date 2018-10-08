package main

import (
	"sort"
	"testing"
	"testing/quick"
)

func TestInsertionSort(t *testing.T) {

	f := func(in []int) bool {
		c := make([]int, len(in))
		copy(c, in)

		sort.Ints(c)

		t1 := make([]int, len(in))
		copy(t1, in)
		out1 := InsertionSortNaive(t1)

		t2 := make([]int, len(in))
		copy(t2, in)
		out2 := InsertionSortOptimized(t2)
		for k, v := range c {
			if out1[k] != v || out2[k] != v {
				return false
			}
		}
		return true
	}
	if err := quick.Check(f, nil); err != nil {
		t.Fatal(err)
	}
}
