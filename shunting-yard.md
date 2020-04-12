## Shunting Yard algorithm

Operation is O(n).
```js
const calculator = '4 + 18 / ( 9 - 3 ) + ( 3 * 4 / ( 5 - 1 ) )'

const stack = []
const queue = []
const tokens = calculator
  .split(' ')
  .map((n) => {
    if (Number.isInteger(parseInt(n, 10))) return Number(n)
    return n
  })

const precedence = {
  '/': 2,
  '*': 2,
  '+': 1,
  '-': 1,
}
console.log(tokens)

// Here we are attempting to create the reverse polish notation.
for (let token of tokens) {
  if (typeof token === 'number') {
    // If it's a number, push it to the queue.
    queue.push(token)
  } else {
    // If it is an operator:
    // While there is an operator on top of the stack that has higher precedence than this operator, 
    // pop the operators in the stack and add them to the queue. Then add the current operator to the queue.
    if ('*+-/'.includes(token)) {
      while (precedence[stack[stack.length - 1]] > precedence[token]) {
        queue.push(stack.pop())
      }
      stack.push(token)
    } else if (token === ')') {
      // If it's a right bracket,
      // While the top of the stack is not a left bracket
      // Pop the stack and push it to the queue.
      // Discard the left operator.
      let out = stack.pop()
      while (out !== '(') {
        queue.push(out)
        out = stack.pop()
      }
    } else if (token === '(') {
      stack.push(token)
    }
  }
}

while (stack.length) {
  queue.push(stack.pop())
}

var operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}

while (queue.length) {
  const val = queue.shift()
  if (typeof val === 'number') {
    stack.push(val)
  } else {
    const rhs = stack.pop()
    const lhs = stack.pop()
    stack.push(operations[val](lhs, rhs))
  }
}

console.log(stack, queue)
```

References:

- https://en.m.wikipedia.org/wiki/Shunting-yard_algorithm
- https://brilliant.org/wiki/shunting-yard-algorithm/

Also take a look at operator precedence algorithm to create a recursive solution.
