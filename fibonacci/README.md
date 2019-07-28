## Iteration
```js
function fibonacci(n) {
  let a = 0
  let b = 1
  let c = 1
  for (let i = 2; i < n; i++) {
    c = a + b
    a = b
    b = c
  }
  return c
}
console.log(fibonacci(11))
```
