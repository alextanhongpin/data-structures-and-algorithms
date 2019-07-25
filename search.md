## Linear Search

Time complexity: O(n)

```js
function linearSearch(arr, value) {
  for (let i in arr) {
    if (arr[i] === value) {
      return i
    }
  }
  return -1
}

linearSearch([1, 2, 3, 4, 5], 4)
```


## Binary Search

Time complexity: Best case O(n), worst case O(log n)
```js
function binarySearch(arr, n) {
  let lo = 0
  let hi = arr.length - 1

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (arr[mid] <= n) {
      lo = mid + 1
    } else {
      hi = mid
    }
  }
  return lo - 1
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 5))
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 0))
console.log(binarySearch([], -1))
console.log(binarySearch([1], 5))
```

```js
function binarySearchRecursive(arr, n) {
  const binarySearchHelper = (lo, hi) => {
    if (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      return arr[mid] <= n ?
        binarySearchHelper(mid + 1, hi) :
        binarySearchHelper(lo, mid)
    }
    return lo - 1
  }
  return binarySearchHelper(0, arr.length - 1)
}

console.log(binarySearchRecursive([1, 2, 3, 4, 5, 6, 7, 8, 9], 5))
console.log(binarySearchRecursive([1, 2, 3, 4, 5, 6, 7, 8, 9], 0))
console.log(binarySearchRecursive([], -1))
console.log(binarySearchRecursive([1], 5))
```
