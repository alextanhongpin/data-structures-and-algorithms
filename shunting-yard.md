## Shunting Yard algorithm

Operation is O(n).
```js
const calculator = '4+18/(9-3)+(3*4/(5-1))'

const isOperator = (c) => '+-*/'.includes(c)
const isBracket = (c) => '()'.includes(c)
const isLeftBracket = (c) => c === '('
const isRightBracket = (c) => c === ')'
const isNumber = (c) => Number.isInteger(parseInt(c, 10))

const tokens = []
const chars = calculator.split('')

for (let i = 0; i < calculator.length; i++) {
  const c = chars[i]
  if (isOperator(c)) {
    tokens.push(c)
  } else if (isBracket(c)) {
    tokens.push(c)
  } else if (isNumber(c)) {
    let j = i
    let number = ''
    while (j < calculator.length) {
      if (!isNumber(chars[j])) break
      number += chars[j]
      j++
    }
    if (number.length > 1) i = j - 1
    tokens.push(Number(number))
  }
}

const precedences = {
  '/': 2,
  '*': 2,
  '+': 1,
  '-': 1,
}

const queue = []
const stack = []

for (let token of tokens) {
  if (isNumber(token)) {
    queue.push(token)
    continue
  }

  if (isOperator(token)) {
    while (precedences[stack[stack.length - 1]] > precedences[token]) {
      queue.push(stack.pop())
    }
    stack.push(token)
    continue
  }

  if (isBracket(token)) {
    if (isLeftBracket(token)) {
      stack.push(token)
    } else {
      while (!isLeftBracket(stack[stack.length - 1])) {
        queue.push(stack.pop())
      }
      stack.pop()
    }
  }
}

while (stack.length) {
  queue.push(stack.pop())
}
console.log(queue)

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b,
  '*': (a, b) => a * b
}

while (queue.length) {
  const first = queue.shift()
  if (isOperator(first)) {
    const right = stack.pop()
    const left = stack.pop()
    const result = operations[first](left, right)
    console.log(`${left} ${first} ${right} = ${result}`)
    stack.push(result)
  } else {
    stack.push(first)
  }
}
console.log(stack)
```

References:

- https://en.m.wikipedia.org/wiki/Shunting-yard_algorithm
- https://brilliant.org/wiki/shunting-yard-algorithm/

Also take a look at operator precedence algorithm to create a recursive solution.
