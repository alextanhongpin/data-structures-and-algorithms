## Bubble sort

Bubble sort iterates over the entire array and swaps the element if one is bigger than another.
- Time complexity: O(n^2)
- Space complexity: O(1)

```js
function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) swap(arr, i, j)
    }
  }
}
```

## Selection sort

Selection sort works by scanning the elements for the smallest element and inserting it into the current positions of the array.
- Time complexity: O(n^2)
- Space complexity: O(1)
```js

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[i]) {
        min = j
      }
    }
    if (min !== i) {
      swap(arr, i, min)
    }
  }
  return arr
}
```

## Insertion sort

- Time-complexity: O(n^2)
- Space-complexity: O(1)

```js
function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i]
    let j
    // If the item on the left is larger than the items on the right, push the items to the right (by incrementing the index by 1).
    for (j = i - 1; j > -1 && arr[j] > value; j--) {
      arr[j + 1] = arr[j]
    }
    // Place the smaller value at this position.
    arr[j + 1] = value
  }
}
```

## Count sort
- Time complexity: O(k+n)
- Space complexity: O(k)
```js
function countSort(arr) {
  let hash = {}
  for (let it of arr) {
    if (!hash[it]) hash[it] = 0
    hash[it]++
  }
  const result = []
  // The keys needs to be sorted.If there is a -tive number, it will be placed at the bottom.
  const keys = Object.keys(hash).map(i => parseInt(i, 10)).sort()
  for (let key of keys) {
    for (let i = 0; i < hash[key]; i++) {
      result.push(parseInt(key, 10))
    }
  }
  return result
}

const arr = [1, 4, 3, 2, 5, 6, 9, 7, -1, 8]

console.log(countSort(arr))
```
