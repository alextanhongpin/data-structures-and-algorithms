## Golang
```go
package main

import (
	"log"
	"math/rand"
	"sort"
	"testing/quick"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

func main() {
	f := func(data []int) bool {
		// Data needs to be sorted for binary search.
		sort.Ints(data)
		index := -1
		target := -1
		if len(data) > 0 {
			index = rand.Intn(len(data))
			target = data[index]
		}
		expectedIndex, _ := binarySearch(target, data, 0, len(data) - 1, 1)
		return index == expectedIndex
	}

	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}
}

func binarySearch(target int, nums []int, left, right, depth int) (int, int) {
	if left <= right {
		mid := (left + right) / 2
		value := nums[mid]

		if target > value {
			return binarySearch(target, nums, mid+1, right, depth+1)
		} else if target < value {
			return binarySearch(target, nums, left, mid, depth+1)
		} else {
			return mid, depth
		}
	}
	return -1, depth
}
```


## Iterative

```go
package main

import (
	"log"
	"math/rand"
	"sort"
	"testing/quick"
)

func main() {
	f := func(data []int) bool {
		sort.Ints(data)
		idx := -1
		tgt := -1
		if len(data) > 0 {
			idx = rand.Intn(len(data))
			tgt = data[idx]
		}
		return idx == binarySearch(tgt, data)
	}
	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}
}

func binarySearch(target int, data []int) int {
	left := 0
	right := len(data) - 1
	for left <= right {
		mid := (left + right) / 2
		val := data[mid]
		if target > val {
			left = mid + 1
		}
		if target < val {
			right = mid - 1
		}
		if target == val {
			return mid
		}
	}
	return -1
}
```

## Javascript

```js
function main () {
  console.log(binarySearch(3, [1, 2, 3, 4]))
  console.log(binarySearchRecursive(4, [1, 2, 3, 4], 0, 4))
}

main()

function binarySearch (target, arr = []) {
  let left = 0
  let right = arr.length
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const val = arr[mid]
    if (val === target) {
      return mid
    } else if (target < val) {
      right = mid - 1
    } else if (target > val) {
      left = val + 1
    }
  }
  return -1
}

function binarySearchRecursive (target, arr, left, right) {
  const mid = Math.floor((left + right) / 2)
  const val = arr[mid]
  if (target > val) {
    return binarySearchRecursive(target, arr, mid + 1, right)
  } else if (target < val) {
    return binarySearchRecursive(target, arr, left, right - 1)
  } else if (target === val) {
    return mid
  }
  return -1
}
```
