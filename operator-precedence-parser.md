# Operator Precedence Parser
Attempt to create a calculator parser with the following, but it doesn't allow `()` operator yet

```js
const calculator = '10 * 10 + 2'
// TODO: Handle (, )
const tokens = calculator.split(' ').reduce((acc, value) => {
  if (Number.isInteger(Number(value))) {
    acc.push({
      type: 'number',
      value: Number(value)
    })
  } else if (['(', ')'].includes(value)) {
    acc.push({
      type: 'operator',
      value
    })
  } else {
    acc.push({
      type: 'operator',
      value
    })
  }
  return acc
}, [])

const priorities = {
  '(': 4,
  ')': 4,
  '/': 3,
  '*': 2,
  '+': 1,
  '-': 1
}

function iterator() {
  let i = 0
  return {
    parsePrimary() {
      return tokens[i]
    },
    advance() {
      i++
      return this
    },
    peekNext() {
      return tokens[i + 1]
    }
  }
}

var operations = {
  '+': function(a = 0, b = 0) {
    return a + b
  },
  '-': function(a = 0, b = 0) {
    return a - b
  },
  '*': function(a = 1, b = 1) {
    return a * b
  },
  '/': function(a = 1, b = 1) {
    return a / b
  }
}

const iter = iterator()

function parseExpression() {
  const loop = (lhs, minPriority = 0) => {
    let lookahead = iter.peekNext()
    while (lookahead && lookahead.type === 'operator' && priorities[lookahead.value] >= minPriority) {
      const operator = lookahead
      iter.advance().advance()
      let rhs = iter.parsePrimary()
      lookahead = iter.peekNext()
      while (lookahead && lookahead.type === 'operator' && priorities[lookahead.value] >= priorities[operator.value]) {
        rhs = loop(rhs, priorities[rhs.value])
        lookahead = iter.peekNext()
      }
      lhs = {
        type: 'number',
        value: operations[operator.value](lhs.value, rhs.value)
      }
    }
    return lhs
  }
  return loop(iter.parsePrimary(), 0).value
}
console.log(parseExpression())
```
References: https://en.wikipedia.org/wiki/Operator-precedence_parser
