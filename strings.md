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
function removeDuplicatesEff(str) {
  let result = Array(str.length).fill('')
  let charset = Array(256).fill(false)
  let tail = 0
  for (let i = 0; i < str.length; i++) {
    if (!charset[str.charCodeAt(i)]) {
      result[tail++] = str[i]
      charset[str.charCodeAt(i)] = true
    }
  }
  return result.join('')
}

console.log(removeDuplicatesEff('abracadabra'))
console.log(removeDuplicatesEff('abcd'))
console.log(removeDuplicatesEff('aaaa'))
console.log(removeDuplicatesEff(''))
console.log(removeDuplicatesEff('aabb'))
console.log(removeDuplicatesEff('ababab'))
```

## Remove duplicates with space O(1)
```js
function removeDuplicates(str) {
  let result = Array(str.length).fill('')
  let tail = 0
  for (let i = 0; i < str.length; i++) {
    let j = 0
    for (j = 0; j < tail; j++) {
      if (result[j] === str[i]) {
        break
      }
    }
    if (j === tail) {
      result[tail++] = str[i]
    }
  }
  return result.join('')
}

console.log(removeDuplicates('abracadabra'))
console.log(removeDuplicates('abcd'))
console.log(removeDuplicates('aaaa'))
console.log(removeDuplicates(''))
console.log(removeDuplicates('aabb'))
console.log(removeDuplicates('ababab'))
```

## Check Anagram Sort

```js
function isAnagram(str1, str2) {
  const sortString = (str) => {
    return str.split('').sort().join('')
  }
  return sortString(str1) === sortString(str2)
}
console.log(isAnagram('listen', 'silent'))
console.log(isAnagram('alerted', 'altered'))
console.log(isAnagram('altered', 'related'))
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
function isAnagram2(str1, str2) {
  if (str1.length !== str2.length) return false
  const charset = Array(256).fill(0)
  let uniqueChars = 0
  let completed = 0

  for (let i in str1) {
    const char = str1.charCodeAt(i)
    if (!charset[char]) {
      uniqueChars++
    }
    charset[char]++
  }
  for (let j in str2) {
    const char = str2.charCodeAt(j)
    if (!charset[char]) return false
    charset[char]--
    if (charset[char] === 0) completed++
    if (completed === uniqueChars) {
      return parseInt(j, 10) === str2.length - 1
    }
  }
  return false
}

console.log(isAnagram2('listen', 'silent'))
console.log(isAnagram2('alerted', 'altered'))
console.log(isAnagram2('altered', 'related'))
```
