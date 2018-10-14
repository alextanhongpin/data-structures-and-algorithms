package main

import (
	"log"
	"os"
	"runtime/pprof"
)

func main() {
	var arr [1024 * 1024]int64
	for i := 0; i < 1024*1024; i++ {
		arr[i] = int64(i)
	}
	// fmt.Println(arr)
	f, err := os.Create("mem.out")
	if err != nil {
		log.Fatal(err)
	}
	pprof.WriteHeapProfile(f)
	defer f.Close()
}
