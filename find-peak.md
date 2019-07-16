Given an array of integers. Find a peak element in it. An array element is peak if it is NOT smaller than its neighbors. For corner elements, we need to consider only one neighbor. For example, for input array {5, 10, 20, 15}, 20 is the only peak element. For input array {10, 20, 15, 2, 23, 90, 67}, there are two peak elements: 20 and 90. Note that we need to return any one peak element.

Following corner cases give better idea about the problem.
1) If input array is sorted in strictly increasing order, the last element is always a peak element. For example, 50 is peak element in {10, 20, 30, 40, 50}.
2) If input array is sorted in strictly decreasing order, the first element is always a peak element. 100 is the peak element in {100, 80, 60, 50, 20}.
3) If all elements of input array are same, every element is a peak element.


```js
const arr = [1, 3, 20, 4, 1, 0]

function findPeak(arr, lo, hi, n) {
  const mid = Math.floor((hi - lo) / 2) + lo
  const m = arr[mid]
  const l = arr[mid - 1]
  const r = arr[mid + 1]
  if ((mid === 0 || l <= m) && (mid === n - 1 || r <= m)) {
    return mid
  }
  if (m > l && m > r) {
    return mid
  }
  if (m > 0 && m < l) {
    return findPeak(arr, lo, mid - 1, n)
  }
  return findPeak(arr, mid + 1, hi, n)
}

console.log(findPeak(arr, 0, arr.length - 1, arr.length))
```
