package main

import (
	"log"
	"math/rand"
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

func TestMergeSortV2(t *testing.T) {
	f := func(arr []int) bool {
		c := make([]int, len(arr))
		copy(c, arr)
		sort.Ints(c)

		MergeSortV2(arr)
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

func TestMergeSortV3(t *testing.T) {
	f := func(arr []int) bool {
		c := make([]int, len(arr))
		copy(c, arr)
		sort.Ints(c)

		MergeSortV3(arr)
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

func BenchmarkSortV1(b *testing.B) {
	b.SetBytes(2)
	n := 100000
	arr := make([]int, n)
	for i := 0; i < n; i++ {
		arr[i] = rand.Int()
	}
	for i := 0; i < b.N; i++ {
		MergeSort(arr)
	}
}

func BenchmarkSortV2(b *testing.B) {
	b.SetBytes(2)
	n := 100000
	arr := make([]int, n)
	for i := 0; i < n; i++ {
		arr[i] = rand.Int()
	}
	for i := 0; i < b.N; i++ {
		MergeSortV2(arr)
	}
}
func BenchmarkSortV3(b *testing.B) {
	b.SetBytes(2)
	n := 100000
	arr := make([]int, n)
	for i := 0; i < n; i++ {
		arr[i] = rand.Int()
	}
	for i := 0; i < b.N; i++ {
		MergeSortV3(arr)
	}
}
