## Permutating strings

```js
function* permutate(str, target = []) {
  if (str.length === 1) {
    yield str.concat(target)
  }
  for (let i = 0; i < str.length; i++) {
    const left = str.slice(0, i)
    const middle = [str[i]]
    const right = str.slice(i + 1)
    yield* permutate(left.concat(right), middle.concat(target))
  }
}

for (let result of permutate(['a', 'b', 'c'])) {
  console.log(result)
}
```

## With backtracking

```js
function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function permutateString(str) {
  const arr = str.split('')
  const result = []
  const permutate = (arr, l, r) => {
    if (l === r) {
      result.push(arr.join(''))
      return
    }
    for (let i = l; i < r; i++) {
      swap(arr, l, i)
      permutate(arr, l + 1, r)
      swap(arr, i, l)
    }
  }
  permutate(arr, 0, arr.length)
  return result
}

console.log(permutateString('abc'))
```
