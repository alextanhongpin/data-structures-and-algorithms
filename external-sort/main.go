package main

import (
	"bufio"
	"fmt"
	"log"
	"math/rand"
	"os"
	"runtime/pprof"
	"strconv"
)

func main() {
	n := 1000000
	// writeSampleData(n)
	// readSampleData()

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
		// bs := make([]byte, binary.MaxVarintLen64)
		// n := binary.PutVarint(bs, num)
		// bs = bs[:n] // Truncate the additional bytes.
		// Write to the buffer. The actual write to the file only
		// occurs when flush is called.
		// if _, err := w.Write(bs); err != nil {
		//         log.Fatal(err)
		// }
		// w.WriteRune('\n')
		w.WriteString(strconv.FormatInt(num, 10))
		w.WriteRune('\n')
		// Slower alternative tested.
		// f.WriteString(strconv.FormatInt(rand.Int63(), 10))
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

	var count int
	for scanner.Scan() {
		i := scanner.Text()
		n, err := strconv.ParseInt(i, 10, 64)
		if err != nil {
			log.Fatal(err)
		}
		// v, n := binary.Varint(b)
		log.Println(n)
		count++
	}
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
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

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		t := scanner.Text()
		if t == "" {
			continue
		}
		v, err := strconv.ParseInt(t, 10, 64)
		if err != nil {
			log.Fatal(err)
		}
		// b := scanner.Bytes()
		// if len(b) == 0 {
		//         continue
		// }
		// v, n := binary.Varint(b)
		// if v == 0 && n < 0 {
		//         break
		// }
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
				// bs := make([]byte, binary.MaxVarintLen64)
				// n := binary.PutVarint(bs, v)
				// bs = bs[:n]

				// Don't forget to add a new line at the end.
				// bs = append(bs, byte('\n'))
				// w.WriteString(fmt.Sprint(v))
				w.WriteString(strconv.FormatInt(v, 10))
				w.WriteRune('\n')
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

	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}
}

func mergeFiles() {
	n := 10

	scanners := make([]*bufio.Scanner, n)
	for i := 0; i < n; i++ {
		f, err := os.Open(fmt.Sprintf("tmp_%d.txt", i))
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()
		scanners[i] = bufio.NewScanner(f)
	}

	var items []int64
	cache := make(map[int64]int, n)
	counter := make(map[int]int, n)
	for i := 0; i < n; i++ {
		scanners[i].Scan()
		v, err := strconv.ParseInt(scanners[i].Text(), 10, 64)
		if err != nil {
			log.Fatal(err)
		}
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
		// w.WriteString(fmt.Sprint(min))
		w.WriteString(strconv.FormatInt(min, 10))
		w.WriteRune('\n')

		// w.WriteString(fmt.Sprintf("%d\n", min))
		// Take the next item from the scanner.
		items = extractMin(items)

		idx := cache[min]
		counter[idx]++
		scanners[idx].Scan()
		t := scanners[idx].Text()
		if t == "" {
			delete(cache, min)
			continue
		}
		v, err := strconv.ParseInt(t, 10, 64)
		if err != nil {
			log.Println("eof", err)
			break
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
