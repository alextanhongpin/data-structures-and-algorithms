## Find peak in array

```js
function findPeak(arr, lo, hi) {
  const mid = Math.floor((hi - lo) / 2) + lo
  // Care about the boundary 0 and arr.length-1
  if ((mid === 0 || arr[mid - 1] <= arr[mid]) && (arr[mid] >= arr[mid + 1] || mid === arr.length - 1)) {
    return mid
  }
  // If left is greater than the mid, it's a downward gradient - the peak must be on the left.
  if (mid > 0 && arr[mid - 1] > arr[mid]) {
    return findPeak(arr, lo, mid - 1)
  }
  // Else the right is greater than the mid, it's an upward gradient - the peak is on the right.
  return findPeak(arr, mid + 1, hi)
}

const arr = [1, 3, 4, 1, 1, 0]
findPeak(arr, 0, arr.length - 1)
```
