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

# n-permutations from list, improved version of the above algorithm

```go
package main

import "fmt"

func main() {
	perms := func(data []int, k int) [][]int {
		var result [][]int
		var rec func(depth int, data, output []int)
		rec = func(depth int, data, output []int) {
			if output == nil {
				output = make([]int, k)
			}
			if depth == k {
				tmp := make([]int, k)
				copy(tmp, output)
				result = append(result, tmp)
				return
			}
			for i, n := range data {
				output[depth] = n
				rec(depth+1, data[i+1:], output)
			}
		}
		rec(0, data, nil)
		return result
	}
	var (
		n    = 3
		nums = []int{1, 2, 3, 4, 5}
	)
	for _, res := range perms(nums, n) {
		fmt.Println(res)
	}
}
```

# JS Version
```js
function permutations(arr = [], k = 0) {
  const result = []
  const recursion = (depth = 0, output = [], rest = []) => {
    if (!output.length) output = Array(k).fill(-1)
    if (depth === k) {
      result.push([...output])
      return
    }
    // Why not for (let i in rest)? 
    // Common mistake - the "i" is a string, not integer.
    for (let i = 0; i < rest.length; i += 1) {
      output[depth] = rest[i]
      recursion(depth + 1, output, rest.slice(i + 1))
    }
  }
  recursion(0, [], arr)
  return result
}

console.log(permutations([1, 2, 3, 4, 5], 3))
```
