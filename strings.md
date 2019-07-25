## Unique characters for all character code
```js
function uniqueChars(str) {
  const chars = Array(256).fill(false)
  for (let i in str) {
    const code = str.charCodeAt(i)
    if (chars[code]) return false
    chars[code] = true
  }
  return true
}
```

## Unique characters from a-z

```js
function uniqueAlphabets(str) {
  let chars = 0
  const a = 'a'.charCodeAt()
  for (let i in str) {
    const code = str.charCodeAt(i) - a
    if ((chars & (1 << code)) > 0) return false
    chars |= (1 << code)
  }
  return true
}

console.log(uniqueChars('hello'))
console.log(uniqueAlphabets('helo'))
```

## Remove duplicate characters with extra space

```js
function removeDuplicateString(str = '') {
  if (str.length < 2) return str
  const alphabets = Array(256).fill(false)
  const result = Array(str.length).fill('')
  let tail = 0
  for (let i in str) {
    const char = str.charCodeAt(i)
    if (!alphabets[char]) {
      result[tail++] = str.charAt(i)
      alphabets[char] = true
    }
  }
  return result.join('')
}

removeDuplicateString('thisisaaaaaaaabbbccccbbbbthis')
```

## Remove duplicates with space O(1)
```js
function removeDuplicates(str = '') {
  if (str.length < 2) return str
  const result = Array(str.length).fill('')
  let tail = 0
  for (let i in str) {
    let j
    for (j = 0; j < tail; j++) {
      if (str[i] === result[j]) break
    }
    if (j === tail) {
      result[tail++] = str[i]
    }
  }
  return result.join('')
}

console.log(removeDuplicates('thisisaaaaaaaabbbccccbbbbthis'))
```

## Check Anagram extra buffer

```js
function checkAnagram(a, b) {
  if (a.length !== b.length) return false
  const chars = Array(256).fill(0)
  for (let i = 0; a[i] && b[i]; i++) {
    chars[a.charCodeAt(i)]++
    chars[b.charCodeAt(i)]--
  }
  for (let count of chars) {
    if (count !== 0) return false
  }
  return true
}

console.log(checkAnagram('listen', 'silent'))
```

## Check Anagram constant space
```js
function checkAnagram2(a, b) {
  if (a.length !== b.length) return false

  const chars = Array(256).fill(0)
  let uniqueChar = 0
  let completed = 0

  for (let i = 0; a[i]; i++) {
    const char = a.charCodeAt(i)
    if (!chars[char]) uniqueChar++
    chars[char]++
  }

  for (let i = 0; b[i]; i++) {
    const char = b.charCodeAt(i)
    if (!chars[char]) return false
    chars[char]--
    if (chars[char] === 0) {
      if (uniqueChar === ++completed) {
        return i === b.length - 1
      }
    }
  }
  return false
}

console.log(checkAnagram2('listen', 'silent'))
console.log(checkAnagram2('triangle', 'integral'))
```
