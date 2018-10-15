package main

import (
	"bufio"
	"encoding/binary"
	"fmt"
	"io"
	"log"
	"math/rand"
	"os"
	"runtime/pprof"
)

func main() {
	n := 1000000
	writeSampleData(n)
	// readSampleData(100)

	// Number of items to sort.
	buckets := 10
	bucketSize := n / buckets

	// Write CPU profile.
	cpuf, err := os.Create("cpu.out")
	if err != nil {
		log.Fatal(err)
	}
	pprof.StartCPUProfile(cpuf)
	defer pprof.StopCPUProfile()

	writeToTempFiles(buckets, bucketSize)

	log.Println("finish writing to temp file")
	mergeFiles()

	memf, err := os.Create("mem.out")
	if err != nil {
		log.Fatal(err)
	}
	pprof.WriteHeapProfile(memf)
	defer memf.Close()
}

func writeSampleData(n int) {
	f, err := os.Create("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()
	// rand.Seed(time.Now().UnixNano())

	// Setup buffered writer.
	w := bufio.NewWriter(f)
	defer w.Flush()

	for i := 0; i < n; i++ {
		// Binary encoded integers is faster.
		num := rand.Int63()
		if err := binary.Write(w, binary.BigEndian, num); err != nil {
			log.Fatal(err)
		}
	}
}

func readSampleData(limit int) {
	f, err := os.Open("output.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	r := bufio.NewReader(f)
	var count int
	for {
		var i int64
		err := binary.Read(r, binary.BigEndian, &i)
		if err != nil && err == io.EOF {
			break
		}
		fmt.Println(i)
		count++
		if count > limit {
			break
		}
	}
	fmt.Println("read items", count)
}

func writeToTempFiles(buckets, bucketSize int) {
	f, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	var items []int64
	var start, offset int

	r := bufio.NewReader(f)
loop:
	for {
		var v int64
		err := binary.Read(r, binary.BigEndian, &v)
		if err != nil && err == io.EOF {
			break loop
		}
		items = append(items, v)
		offset++
		if offset == (start+1)*bucketSize {
			// Perform mergesort on the current bucket.
			sort(items)

			// Write to a temp file with the start index.
			name := fmt.Sprintf("tmp_%d.txt", start)
			f, err := os.Create(name)
			if err != nil {
				log.Fatal(err)
			}
			w := bufio.NewWriter(f)
			for _, v := range items {
				binary.Write(w, binary.BigEndian, v)
			}
			w.Flush()
			f.Close()

			// Reset the bucket.
			items = items[:0]

			// Increment the next bucket.
			start++
		}
	}
	fmt.Println("end scanning", offset)
}

func mergeFiles() {
	n := 10

	scanners := make([]*bufio.Reader, n)
	for i := 0; i < n; i++ {
		f, err := os.Open(fmt.Sprintf("tmp_%d.txt", i))
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()
		scanners[i] = bufio.NewReader(f)
	}

	var items []int64
	cache := make(map[int64]int, n)
	counter := make(map[int]int, n)
	for i := 0; i < n; i++ {
		var v int64
		binary.Read(scanners[i], binary.BigEndian, &v)
		cache[v] = i
		counter[i]++
		items = append(items, v)
	}

	outf, err := os.Create("output.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer outf.Close()

	w := bufio.NewWriter(outf)
	defer w.Flush()

	for len(items) > 0 {
		minHeap(items)

		min := items[0]
		binary.Write(w, binary.BigEndian, min)

		// Take the next item from the scanner.
		items = extractMin(items)

		idx := cache[min]
		counter[idx]++

		var v int64
		err := binary.Read(scanners[idx], binary.BigEndian, &v)
		if err != nil && err == io.EOF {

			delete(cache, min)
			continue
		}
		items = append(items, v)
		delete(cache, min)
		cache[v] = idx
	}
}

func extractMin(arr []int64) []int64 {
	if len(arr) == 0 {
		return arr
	}

	// Decrease heap size by 1.
	n := len(arr) - 1
	arr[0], arr = arr[n], arr[:n] // Truncate the slice.
	if n > 0 {
		heapify(arr, n, 0)
	}
	return arr
}

func minHeap(arr []int64) {
	n := len(arr)
	for i := (n - 1) / 2; i > -1; i-- {
		heapify(arr, n, i)
	}
}

func heapify(arr []int64, n, i int) {
	smallest := i
	l, r := 2*i+1, 2*i+2
	if l < n && arr[l] < arr[smallest] {
		smallest = l
	}
	if r < n && arr[r] < arr[smallest] {
		smallest = r
	}
	if smallest != i {
		arr[i], arr[smallest] = arr[smallest], arr[i]
		heapify(arr, n, smallest)
	}
}

func sort(arr []int64) {
	tmp := make([]int64, len(arr))
	copy(tmp, arr)
	mergesort(tmp, arr, 0, len(arr))
}

func mergesort(tmp, arr []int64, start, end int) {
	if end-start < 2 {
		return
	}
	if end-start == 2 {
		if arr[start] > arr[start+1] {
			arr[start], arr[start+1] = arr[start+1], arr[start]
		}
		return
	}
	mid := (start + end) / 2
	mergesort(arr, tmp, start, mid)
	mergesort(arr, tmp, mid, end)

	i, j := start, mid
	idx := start
	for idx < end {
		if j >= end || (i < mid && tmp[i] < tmp[j]) {
			arr[idx] = tmp[i]
			i++
		} else {
			arr[idx] = tmp[j]
			j++
		}
		idx++
	}
}
