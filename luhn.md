# Luhn algorithm

Can be used to generate credit card numbers.

```js
func calcChecksum(s) {
  let s = '7992739871'
  let r = s.split('').reverse()
  let sum = 0
  for (let i = 0; i < r.length; i += 1) {
    let n = Number(r[i])
    if (i % 2 === 0) {
      n = n * 2
      n = n > 9 ? n - 9 : n
    }
    sum += n
  }
  return sum * 9 % 10
}

assert(calcChecksum('7992739871') == 3)
```

## References
https://en.wikipedia.org/wiki/Luhn_algorithm
