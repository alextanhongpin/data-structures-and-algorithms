## Big-O notation

- Coefficient rule: if f(n) is O(g(n)), then kf(n) is O(g(n)) for any constant k > 0. Coefficients not related to the input size n is eliminated. This is because as n approaches infinity, the other coefficients becomes negligible.
- Sum rule: If f(n) is O(h(n)) and g(n) is O(p(n)), then f(n) + g(n) is O(h(n) + p(n)). The sum rule states that if a resultant time complexity is a sum of two different time complexities, the resultant Big-O notation is also the sum of the different Big-O notations.
- Product rule: If f(n) is O(h(n)) and g(n) is O(p(n)), then f(n)g(n) is O(h(n)p(n)). The product rule states that Big-O is multiplied when the time complexities are multiplied.
- Transitive rule. If f(n) is O(g(n)) and g(n) is O(h(n)), then f(n) is O(h(n)). The transitive rule is a simple way to state that the same time complexity has the same Big-O.
- Polynomial rule: If f(n) is a polynomial of degree k, then f(n) is O(n^k). Intuitively, the polynomial rule states that polynomial time complexities have Big-O of the same polynomial degree.
- Log of power rule. log(nk) is O(log(n)) for any constant k > 0. With the log of power rule, constants within a log function are also ignored in Big-O notation.


## Coefficient rule: “Get rid of constants”

Both `5f(n)` and `f(n)` have the same Big-O notation of `O(f(n))`. Below is `f(n) = n`:

```js
function f(n) {
	let count = 0
	for (let i = 0; i < n; i++) {
    count++
  }
  return count
}
```

Below is `f(n) = 5n`. But both examples have a Big-O notation of `O(n)`. When `n` is close to infinity, those four additional operations are meaningless.

```js
function f(n) {
  let count = 0
  for (let i = 0; i < i * 5; i += 1) {
    count++
  }
  return count
}
```

Below we have `f(n) = n + 1`. But the Big-O notation is still `O(n)`. The 1 operation is not dependent on the input `n`. As `n` approaches inifinity, it will become negligible.


```js
function f(n) {
  let count = 0
  for (let i = 0; i < n; i++) {
    count++
  }
  count += 3
  return count
}
```


## Sum Rule: "Add Big-Os up"

We have `f(n) = n)` and `f(n) = 5n`. The result is `6n`. But when applying the coefficient rule, the final result is `O(n) = n`.

```js
function f(n) {
  let count = 0
  for (let i = 0; i < n; i += 1) {
    count++
  }
  for (let i = 0; i < 5 * n; i += 1) {
    count++
  }
  return count
}
```

## Product Rule: "Multiply Big-Os"

The example below is `f(n) = 5n * n`. Applying the coefficient rule, the result is `O(n) = n^2`.
```js
function f(n) {
  let count = 0
  for (let i = 0; i < n; i++) {
    count++
    for (let i = 0; i < 5 * n; i++) {
      count++
    }
  } 
  return count
}
```

The example below has `O(n) = n ^ 2`. Ignore the constants:

```js
function f(n) {
  let count = 0
  for (let i = 0; i < n * 1000; i++) {
    for (let j = 0; j < n * 20; j++) {
      count++
    }
  }
  return count
}
```

The example below has `O(n) = n ^ 3`. There are four nested loops, but the last function run until 10:

```js
function f(n) {
  let count = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        for (let l = 0; l < 10; l++) {
          count++
        }
      }
    }
  }
  return count
}
```

The example below is `O(1)`, constnt complexity. The values does not depend on `n`:

```js
function f(n) {
  let count = 0
  for (let i = 0; i < 1000; i++) {
    count++
  }
  return count
}
```

Logarithmic complexity `O(log2n)`. For a given n, this will only operate only log2n times because i is incremented by multiplying 2 rathr than adding 1.

```js
function f(n) {
  let count = 0
  for (let i = 0; i < n; i * 2) {
    count++
  }
  return count
}
```

Infinite loop, the functin will not end. `O(infinity)`:

```js
function f(n) {
  while(true) {
    console.log(n)
  }
}
```

## Polynomial Rule: "Big-O to the Power of K"

`f(n) = n ^ 2`.

```js
function f(n) {
  let count = 0
  for (let i = 0; i < n * n; i += 1) {
    count++
  }
  return count
}
```

