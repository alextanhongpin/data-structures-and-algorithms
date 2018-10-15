package main

import (
	"bufio"
	"encoding/binary"
	"fmt"
	"io"
	"log"
	"math/rand"
	"os"
)

func main() {
	f, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer f.Close()

	out, err := os.Create("output.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer out.Close()

	// n := 1000000
	// writeSampleData(f, n)

	// head(out, 100)

	// Number of items to sort.
	// buckets := 10
	// bucketSize := n / buckets
	//
	// // Profile CPU.
	// cpuf, err := os.Create("cpu.out")
	// if err != nil {
	//         log.Fatal(err)
	// }
	// pprof.StartCPUProfile(cpuf)
	// defer pprof.StopCPUProfile()
	//
	// // Actual logic.
	// sortAndWriteFiles(f, buckets, bucketSize)
	//
	// mergeFiles(out, buckets)
	//
	// // Profile memory.
	// memf, err := os.Create("mem.out")
	// if err != nil {
	//         log.Fatal(err)
	// }
	// pprof.WriteHeapProfile(memf)
	// defer memf.Close()
	// log.Println("main: completed, terminating program")
}

func writeSampleData(f *os.File, n int) {
	w := bufio.NewWriterSize(f, 1024)
	defer w.Flush()

	for i := 0; i < n; i++ {
		num := rand.Int63()
		err := binary.Write(w, binary.BigEndian, num)
		if err != nil {
			log.Fatal(err)
		}
	}
	log.Printf("writer: wrote %d integers to file\n", n)
}

func head(f *os.File, n int) {
	r := bufio.NewReader(f)
	var count int

	var i int64
	for {
		err := binary.Read(r, binary.BigEndian, &i)
		if err != nil && err == io.EOF {
			break
		}
		fmt.Println(i)
		count++
		if count > n {
			break
		}
	}
}

func sortAndWriteFiles(f *os.File, buckets, bucketSize int) {
	// var items []int64
	items := make([]int64, bucketSize)
	var fileNum, offset int
	var w *bufio.Writer
	var i int64

	r := bufio.NewReader(f)
loop:
	for {
		// Read the integer from the file as int64 and append it to the
		// slice in memory.
		err := binary.Read(r, binary.BigEndian, &i)
		if err != nil {
			log.Println(err, i)
		}
		if err != nil && err == io.EOF {
			break loop
		}
		items[offset%bucketSize] = i

		if (offset+1)%bucketSize == 0 {
			// Perform mergesort on the current bucket.
			sort(items)

			// Write to a temp file with the start index.
			name := fmt.Sprintf("tmp_%d.txt", fileNum)
			f, err := os.Create(name)
			if err != nil {
				log.Fatal(err)
			}
			if w == nil {
				w = bufio.NewWriterSize(f, 1024)
			} else {
				// Reuse buffer.
				w.Reset(f)
			}

			// Write the sorted items into a separate file.
			for _, v := range items {
				// for i := 0; i < bucketSize; i++ {
				binary.Write(w, binary.BigEndian, v)
			}
			w.Flush()
			f.Close()

			// Reset the bucket.
			items = items[:0]
			items = items[:bucketSize]

			// Increment the next bucket.
			fileNum++
			fmt.Println("writer: completed", name)
		}
		// Increment the offset to keep track of the number of items.
		offset++
	}
	fmt.Println("end scanning", offset)
}

func mergeFiles(f *os.File, n int) {
	// Initialize readers for the n-files we created earlier.
	readers := make([]*bufio.Reader, n)
	for i := 0; i < n; i++ {
		f, err := os.Open(fmt.Sprintf("tmp_%d.txt", i))
		if err != nil {
			log.Fatal(err)
		}
		defer f.Close()
		readers[i] = bufio.NewReader(f)
	}

	items := make([]heapNode, n)
	var v int64
	for i := 0; i < n; i++ {
		err := binary.Read(readers[i], binary.BigEndian, &v)
		if err != nil {
			log.Fatal(err)
		}
		// Add items into the heap.
		items[i] = heapNode{element: v, index: i}
	}

	w := bufio.NewWriterSize(f, 1024)
	defer w.Flush()

	var i int64
	for len(items) > 0 {
		minHeap(items)
		err := binary.Write(w, binary.BigEndian, items[0].element)
		if err != nil {
			log.Fatal(err)
		}
		// Read the next value from the file that has previous min.
		err = binary.Read(readers[items[0].index], binary.BigEndian, &i)
		if err != nil && err == io.EOF {
			items = items[1:]
			continue
		}
		items[0].element = i
	}
}

type heapNode struct {
	element int64
	index   int
}

func minHeap(arr []heapNode) {
	n := len(arr)
	for i := (n - 1) / 2; i > -1; i-- {
		heapify(arr, n, i)
	}
}

func heapify(arr []heapNode, n, i int) {
	smallest := i
	l, r := 2*i+1, 2*i+2
	if l < n && arr[l].element < arr[smallest].element {
		smallest = l
	}
	if r < n && arr[r].element < arr[smallest].element {
		smallest = r
	}
	if smallest != i {
		arr[i], arr[smallest] = arr[smallest], arr[i]
		heapify(arr, n, smallest)
	}
}

func sort(arr []int64) {
	// Create a buffer to be reused.
	buf := make([]int64, len(arr)/2)
	mergesort(arr, buf)
}

func mergesort(arr, buf []int64) {
	if len(arr) <= 1 {
		return
	}
	mid := len(arr) / 2
	left, right := arr[:mid], arr[mid:]
	mergesort(left, buf)
	mergesort(right, buf)

	// We can sort 2 n-size array with an additional n-size array.
	copy(buf, left)
	l, r := 0, 0
	for l < len(left) && r < len(right) {
		if buf[l] <= right[r] {
			arr[l+r] = buf[l]
			l++
		} else {
			arr[l+r] = right[r]
			r++
		}
	}
	for l < len(left) {
		arr[l+r] = buf[l]
		l++
	}
	for r < len(right) {
		arr[l+r] = right[r]
		r++
	}
}
