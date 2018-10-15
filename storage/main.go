package main

import (
	"fmt"
	"log"
	"os"
	"runtime/pprof"
)

func main() {
	var arr [1024 * 1024]int64
	for i := 0; i < 1024*1024; i++ {
		arr[i] = int64(i)
	}
	b, c := arr[:len(arr)/2], arr[len(arr)/2:]

	d := make([]int64, len(arr)/2)
	copy(d, arr[:len(arr)/2])

	fmt.Println(arr, b, c, d)

	f, err := os.Create("mem.out")
	if err != nil {
		log.Fatal(err)
	}
	pprof.WriteHeapProfile(f)
	defer f.Close()
}
