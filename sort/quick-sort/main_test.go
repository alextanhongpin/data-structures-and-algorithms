package main

import (
	"log"
	"sort"
	"testing"
	"testing/quick"
)

func TestQuickSort(t *testing.T) {
	f := func(arr []int) bool {
		c := make([]int, len(arr))
		copy(c, arr)
		sort.Ints(c)

		o := Quicksort(arr, 0, len(arr)-1)
		for k, v := range c {
			if o[k] != v {
				return false
			}
		}
		return true
	}

	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}
}
