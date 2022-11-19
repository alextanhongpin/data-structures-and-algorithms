## Unique characters for all character code
```js
function isUniqueAsciiChars(str) {
  const charset = Array(256).fill(false)
  for (let i in str) {
    const code = str.charCodeAt(i)
    if (charset[code]) return false
    charset[code] = true
  }
  return true
}
console.log(isUniqueAsciiChars(''))
console.log(isUniqueAsciiChars('hello'))
console.log(isUniqueAsciiChars('a'))
console.log(isUniqueAsciiChars('ab'))
console.log(isUniqueAsciiChars('abb'))
```

## Unique characters from a-z

```js
function isUniqueAlphabets(str) {
  let hit = 0
  const charA = 'a'.charCodeAt()
  for (let i in str) {
    const code = str.charCodeAt(i) - charA
    if (hit & (1 << code)) return false
    hit |= (1 << code)
  }
  return true
}

console.log('empty string', isUniqueAlphabets(''))
console.log(isUniqueAlphabets('hello'))
console.log(isUniqueAlphabets('a'))
console.log(isUniqueAlphabets('ab'))
console.log(isUniqueAlphabets('abb'))
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

## Strings permutation

```js
function swap(arr, i, j) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

function permutateString(str) {
  const arr = str.split('')
  const result = []
  const permutate = (arr, lo, hi) => {
    if (lo === hi) {
      result.push(arr.join(''))
      return
    } else {
      for (let i = lo; i < hi; i++) {
        swap(arr, i, lo)
        permutate(arr, i + 1, hi)
        swap(arr, i, lo)
      }
    }
  }
  permutate(arr, 0, arr.length)
  return result
}
console.log(permutateString('abcd'))
console.log(permutateString('abc'))
```

## Find palindrone 

```js
function palindronePermutations(str) {
  let hashmap = {}
  for (let char of str) {
    if (!hashmap[char]) hashmap[char] = 0
    hashmap[char]++
  }
  let isOdd = false
  for (let char in hashmap) {
    if (hashmap[char] & 1) {
      isOdd = true
    }
  }
  const strOdd = str.length ^ 1
  const isPalindrone = (strOdd && isOdd) || (!strOdd && !isOdd)
  if (!isPalindrone) {
    return null
  }
  let odd = ''
  let even = ''
  for (let char in hashmap) {
    if (hashmap[char] & 1) {
      odd = char
    } else {
      for (let i = 0; i < Math.floor(hashmap[char] / 2); i++) {
        even += char
      }
    }
  }
  const permutations = permutateString(even)
  return permutations.map((permutate) => {
    return permutate + odd + permutate.split('').reverse().join('')
  })
}

console.log(palindronePermutations('aabbcadad'))
```

## Count compressed string

```js
const assert = require("assert");

function compressString(str) {
  const chars = str.split("");

  let result = "";
  while (chars.length) {
    const head = chars.shift();
    let consecutiveCounts = 1;
    while (chars.length) {
      const next = chars.shift();
      if (head === next) {
        consecutiveCounts++;
      } else {
        chars.unshift(next);
        break;
      }
    }
    result += head + consecutiveCounts.toString();
  }

  return result;
}

assert.equal("a2b1c5a3", compressString("aabcccccaaa"));
assert.equal("a1", compressString("a"));
assert.equal("a2", compressString("aa"));
assert.equal("a2b2c2", compressString("aabbcc"));
```
