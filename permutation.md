## Permutating strings

```js
function* permutate(str, target = []) {
  if (str.length === 1) {
    yield str.concat(target)
  }
  for (let i = 0; i < str.length; i++) {
    const left = str.slice(0, i)
    const middle = [str[i]]
    const right = str.slice(i + 1)
    yield* permutate(left.concat(right), middle.concat(target))
  }
}

for (let result of permutate(['a', 'b', 'c'])) {
  console.log(result)
}
```

## With backtracking

```js
function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function permutateString(str) {
  const arr = str.split('')
  const result = []
  const permutate = (arr, l, r) => {
    if (l === r) {
      result.push(arr.join(''))
      return
    }
    for (let i = l; i < r; i++) {
      swap(arr, l, i)
      permutate(arr, l + 1, r)
      swap(arr, i, l)
    }
  }
  permutate(arr, 0, arr.length)
  return result
}

console.log(permutateString('abc'))
```


# Find n-permutations from a given list
```go
package main

import (
	"fmt"
)

func main() {
	n := 3
	num := []int{1,2,3,4,5}

	// Find n-permutations from a given list.
	var helper func(curr, max int, data []int, output []int, results *[][]int)
	helper = func(k, n int, data, output []int, results *[][]int) {
		if output == nil {
			output = make([]int, n)
		}
		if k == n {
			cpy := make([]int, n)
			copy(cpy, output)
			*results = append(*results, cpy)
			return
		}
		for i, d := range data {
			output[k] = d
			dta := data[i+1:]
      // Increment the index, and fit in all possible combinations.
			helper(k+1, n, dta, output, results)
		}
	}
	results := make([][]int, 0)
	helper(0, n, num, nil, &results)
	fmt.Println(results)
}
```
