package main

import (
	"log"
	"sort"
	"testing"
	"testing/quick"
)

// go test -bench=. -cpuprofile=cpu.out -memprofile=mem.out
// go tool pprof bubblesort cpu.out
// top5 -cum
// list BubbleSort
// go tool pprof -inuse_objects mem.out

func TestBubbleSort(t *testing.T) {
	f := func(in []int) bool {
		copy := make([]int, len(in))
		for i, v := range in {
			copy[i] = v
		}
		sort.Ints(copy)
		out := BubbleSort(in)
		for i, v := range copy {
			if out[i] != v {
				return false
			}
		}
		return true
	}
	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}
}

func BenchmarkBubbleSort(b *testing.B) {
	for n := 0; n < b.N; n++ {
		in := []int{233, 78, 375, 959, 723, 970, 989, 438, 269, 816, 182, 866, 441, 926, 333, 995, 570, 951, 122, 836, 673, 296, 865, 25, 866, 901, 936, 329, 818, 232, 66, 836, 802, 606, 513, 981, 633, 753, 926, 382, 71, 120, 55, 359, 596, 120, 241, 850, 757, 689, 548, 985, 76, 118, 84, 823, 638, 663, 623, 539, 177, 948, 288, 922, 463, 127, 628, 988, 640, 262, 529, 833, 994, 234, 559, 847, 323, 308, 920, 671, 461, 780, 676, 604, 543, 35, 372, 404, 78, 120, 316, 351, 342, 947, 148, 517, 440, 439, 382, 869}
		BubbleSort(in)
	}
}

func BenchmarkBubbleSortOptimized(b *testing.B) {
	for n := 0; n < b.N; n++ {
		in := []int{233, 78, 375, 959, 723, 970, 989, 438, 269, 816, 182, 866, 441, 926, 333, 995, 570, 951, 122, 836, 673, 296, 865, 25, 866, 901, 936, 329, 818, 232, 66, 836, 802, 606, 513, 981, 633, 753, 926, 382, 71, 120, 55, 359, 596, 120, 241, 850, 757, 689, 548, 985, 76, 118, 84, 823, 638, 663, 623, 539, 177, 948, 288, 922, 463, 127, 628, 988, 640, 262, 529, 833, 994, 234, 559, 847, 323, 308, 920, 671, 461, 780, 676, 604, 543, 35, 372, 404, 78, 120, 316, 351, 342, 947, 148, 517, 440, 439, 382, 869}
		BubbleSortOptimized(in)
	}
}
