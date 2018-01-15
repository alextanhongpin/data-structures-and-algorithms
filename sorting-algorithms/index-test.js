const CArray = require('./index')

const numElements = 10
const myNums = new CArray(numElements)
myNums.setData()
console.log(myNums.toString())
console.log()

console.log('Bubble Sort:')
myNums.bubbleSort()
console.log(myNums.toString())
console.log()

myNums.clear()
myNums.setData()
myNums.selectionSort()
console.log('Selection Sort:')
console.log(myNums.toString())
console.log()

myNums.clear()
myNums.setData()
myNums.insertionSort()
console.log('Insertion Sort:')
console.log(myNums.toString())
console.log()

myNums.clear()
myNums.setData()
myNums.shellSort()
console.log('Shell Sort with dynamic gap sequence:')
console.log(myNums.toString())
console.log()
