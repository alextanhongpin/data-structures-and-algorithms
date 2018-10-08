package main

import (
	"log"
	"sort"
	"testing"
	"testing/quick"
)

func TestMergeSort(t *testing.T) {
	f := func(arr []int) bool {
		c := make([]int, len(arr))
		copy(c, arr)
		sort.Ints(c)

		arr = MergeSort(arr)
		for k, v := range c {
			if arr[k] != v {
				return false
			}
		}
		return true
	}

	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}
}
