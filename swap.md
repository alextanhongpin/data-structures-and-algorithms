# Number Swapper
Write a function to swap two number in place (that is, without temporary variables).

Solution:
The idea is that the difference between the two numbers is fixed. So to swap `a` and `b`, we
1. Store the difference in `a`
2. Add the difference to `b` to get `original a`
3. Deduct the difference from `a` to get `original b`


```js
function swap(a, b) {
  // Given a = 100, b = 10
  a = a - b; // 100 - 10 = 90
  b = b + a; // 10 + 90 = 100
  a = b - a; // 100 - 90 = 10

  console.log(a, b);
}

swap(-10, 100);
```

This can be solved using XOR bitwise operations too:
```js
function swap(a, b) {
  a ^= b;
  b ^= a;
  a ^= b;

  console.log(a, b);
}

swap(10, 20);
```
