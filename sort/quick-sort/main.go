package main

func Quicksort(in []int, low, high int) []int {

	if low < high {
		p := partition(in, low, high)
		quicksort(in, low, p-1)  // Before p.
		quicksort(in, p+1, high) // After p.
	}

}

func partition(in []int, low, high int) []int {

	pivot := arr[high]
	i := low - 1
	for j := low; j <= high-1; j++ {
		if arr[j] <= pivot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}
func main() {

}
