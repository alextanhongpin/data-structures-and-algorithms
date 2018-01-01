const Stack = require('./index')

const s = new Stack()
s.push('David')
s.push('Raymond')
s.push('Brian')

console.log(s.length())
console.log(s.peek())

const popped = s.pop()
console.log(`popped: ${popped}`)

console.log(`peek: ${s.peek()}`)

s.clear()
console.log(s.peek())
console.log(s.length())

// Use Cases
// 1. Multiple base conversions

function mulBase (num, base) {
  const s = new Stack()
  do {
    console.log(num % base)
    s.push(num % base)
    num = Math.floor(num /= base)
  } while (num > 0)
  let converted = ''
  while (s.length() > 0) {
    converted += s.pop()
  }
  return converted
}

const num1 = 32
const base2 = 2
const newNum1 = mulBase(num1, base2)
console.log(`${num1} converted to base ${base2} is ${newNum1}`)

const num2 = 125
const base8 = 8
const newNum2 = mulBase(num2, base8)
console.log(`${num2} converted to base ${base8} is ${newNum2}`)

// 2. Palindromes

function isPalindrome (word) {
  const s = new Stack()
  for (let i = 0; i < word.length; i += 1) {
    s.push(word[i])
  }

  let rword = ''
  while (s.length() > 0) {
    rword += s.pop()
  }

  return word === rword
}

function printPalindrome (word) {
  if (isPalindrome(word)) {
    console.log(`${word} is a palindrome`)
  } else {
    console.log(`${word} is not a palindrome`)
  }
}

printPalindrome('hello')
printPalindrome('racecar')
