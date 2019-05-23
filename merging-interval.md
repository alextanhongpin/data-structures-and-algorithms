https://www.geeksforgeeks.org/merging-intervals/
```js
// Input: {1,3}, {2,4}, {5,7}, {6,8}
// Output: {1,4}, {5,8}
const arr = [
  [1, 3],
  [2, 4],
  [5, 7],
  [6, 8]
]

function merge(arr) {
  const result = []
  const taken = {}
  for (let i = 0; i < arr.length; i += 1) {
    if (taken[i]) continue
    const [l1, r1] = arr[i]
    for (let j = i + 1; j < arr.length; j += 1) {
      if (taken[j]) continue
      const [l2, r2] = arr[j]
      if (l2 >= l1 && l2 <= r1 && r1 >= l2 && r1 <= r2) {
        taken[i] = true
        taken[j] = true
        result.push([l1, r2])
        break
      }
    }
  }
  if (!result.length) {
    return arr
  }
  return merge(result)
}

console.log(merge(arr))
```
