# Create a cross product of arrays

```js
const a = ['a', 'b', 'c']
const b = ['e', 'f']
const c = ['g', 'h', 'i']

function cross(a, ...rest) {
  if (!rest.length) return a
  
  let result = a
  while (rest.length) {
    const a = result
    const b = rest.shift()
    result = []
    for (let i of a) {
      for (let j of b) {
        result.push(i+j)
      }
    }
  }
  
  return result
}

cross(a, b, c) // aeg,aeh,aei,afg,afh,afi,beg,beh,bei,bfg,bfh,bfi,ceg,ceh,cei,cfg,cfh,cfi
```
