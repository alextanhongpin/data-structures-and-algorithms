## Heap Permutation


```js
function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function* heapPermutation(arr, n = arr.length) {
  if (n === 1) {
    yield arr
  }
  for (let i = 0; i < n; i++) {
    yield* heapPermutation(arr, n - 1)
    if (n & 1) {
      swap(arr, 0, n - 1)
    } else {
      swap(arr, i, n - 1)
    }
  }
}

for (let result of heapPermutation(['a', 'b', 'c'])) {
  console.log(result)
}
```
