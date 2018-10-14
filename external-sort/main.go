package main

import (
	"bufio"
	"fmt"
	"log"
	"math/rand"
	"os"
	"runtime/pprof"
	"strconv"
	"time"
)

func init() {
}

func writeSampleData(n int) {
	f, err := os.Create("input.txt")
	if err != nil {
		log.Fatal(err)

	}
	defer f.Close()
	rand.Seed(time.Now().UnixNano())
	for i := 0; i < n; i++ {
		// bs := make([]byte, binary.MaxVarintLen64)
		// binary.PutVarint(bs, rand.Int63())
		// f.Write(bs)
		f.WriteString(strconv.FormatInt(rand.Int63(), 10))
		// f.WriteString(fmt.Sprintf("%d\n", rand.Int63()))
	}
}

func readSampleData() {
	f, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		fmt.Println(scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func writeToTempFiles(buckets, bucketSize int) {
	f, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	var items []int64
	var start, offset int

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		n, err := strconv.Atoi(scanner.Text())
		if err != nil {
			log.Fatal(err)
		}
		items = append(items, int64(n))
		offset++
		// fmt.Println(scanner.Text())
		if offset == (start+1)*bucketSize {
			// Perform mergesort on the current bucket.
			// log.Println("scanner: found", len(items), "items", "offset", offset)

			sort(items)
			// log.Println("mergesort: sorted items", sorted)

			// Write to a temp file with the start index.
			name := fmt.Sprintf("tmp_%d.txt", start)
			fmt.Println("file: create", name)
			f, err := os.Create(name)
			if err != nil {
				log.Fatal(err)
			}
			for _, v := range items {
				f.WriteString(fmt.Sprintf("%d\n", v))
				// f.WriteString(strconv.FormatInt(v, 10) + "\n")
			}
			f.Close()

			// Reset the bucket.
			items = items[:0]

			// Increment the next bucket.
			start++
		}
	}
	fmt.Println("end scanning", offset)

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func mergeFiles() {
	n := 10

	// files := make([]*os.File, n)
	scanners := make([]*bufio.Scanner, n)
	for i := 0; i < n; i++ {
		f, err := os.Open(fmt.Sprintf("tmp_%d.txt", i))
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()
		// files[i] = f
		scanners[i] = bufio.NewScanner(f)
	}

	var items []int64
	cache := make(map[int64]int, n)
	for i := 0; i < n; i++ {
		scanners[i].Scan()
		n, err := strconv.ParseInt(scanners[i].Text(), 10, 64)
		if err != nil {
			log.Fatal(err)
		}
		cache[int64(n)] = i
		items = append(items, int64(n))
	}

	outf, err := os.Create("output.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer outf.Close()

	for len(items) > 0 {
		minHeap(items)
		// log.Println("got items", items)
		min := items[0]
		// fmt.Println("min is", min)
		outf.WriteString(fmt.Sprintf("%d\n", min))
		// Take the next item from the scanner.
		items = extractMin(items)

		scanners[cache[min]].Scan()
		n, err := strconv.ParseInt(scanners[cache[min]].Text(), 10, 64)
		if err != nil {
			// log.Println("end of line")
			continue
			// break
			// log.Fatal(err)
		}
		items = append(items, int64(n))
		delete(cache, min)
		cache[int64(n)] = cache[min]
	}
	// Clear the remaining lines.
	// for i := 0; i < n; i++ {
	//
	//         // scanners[i].Scan()
	//         if scanners[i].Text() != "" {
	//                 n, err := strconv.ParseInt(scanners[i].Text(), 10, 64)
	//                 if err != nil {
	//                         log.Fatal(err)
	//                 }
	//                 outf.WriteString(fmt.Sprintf("%d\n", n))
	//         }
	//
	// }
	// log.Println("items left", items)
}

func main() {
	n := 1000000
	// writeSampleData(n)
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

	mergeFiles()

	memf, err := os.Create("mem.out")
	if err != nil {
		log.Fatal(err)
	}
	pprof.WriteHeapProfile(memf)
	defer memf.Close()

	// writeSampleData(100)
	// readSampleData()
	// arr := []int{3, 2, 1, 4, 9, 3, 19}
	// minHeap(arr)
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

	// for len(arr) > 0 {
	//         fmt.Println(arr)
	//         min := arr[0]
	//         fmt.Println("min is", min)
	//         arr = extractMin(arr)
	// }
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
