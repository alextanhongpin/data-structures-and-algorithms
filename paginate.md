```go
package main

import (
	"log"
	"testing/quick"
)

func main() {
	f := func(items []int, perPage, page int) bool {
		total := len(items)
		start, end := paginate(total, perPage, page)
		if start == -1 || end == -1 {
			return true
		}
		result := items[start:end]
		return len(result) >= 0
	}
	if err := quick.Check(f, nil); err != nil {
		log.Fatal(err)
	}

}

func paginate(total, perPage, page int) (start, end int) {
	if total == 0 {
		start = -1
		end = -1
		return
	}
	perPage = max(5, min(perPage, 100))
	page = max(0, min(total/perPage, page))
	start = page * perPage
	end = min((page+1)*perPage, total)
	return
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
```
