In this problem, you input a non-negative integer num and return the number of steps to reduce it to one. If the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.

``js
const t = 5000000000000000000000000000000
let n = t
let steps = 0
console.time()
while (n !== 1 ) {
  console.log(n, n.toString(2))
  if (n % 2 === 1) {
    n -= 1
  } else {
    n /= 2
  }
  steps += 1
}
console.log({steps})
console.timeEnd()
console.time()
console.log(count(t))
console.timeEnd()

function count(n) {
  const s = n.toString(2)
  const b = s.length // To shift the leftmost 1 bit, it is just division by 2.
  // e.g. n = 8, s = 1000
  // b = 4, cause length of s is 4. There are no more 1s after the first 1, so remove 0.
  // The last `-1` is because we want the result to be 1, not 0 after all operation. So we deduct the number of operations by 1.
  // If the questions is the number of operations to deduct to 0, then we can exclude the 0
  return b+s.slice(1).replaceAll('0', '').length-1
}
```
