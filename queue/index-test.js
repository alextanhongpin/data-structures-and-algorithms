const Queue = require('./index')

// 1. Basic use case
const q = new Queue()
q.enqueue('Meredith')
q.enqueue('Cynthia')
q.enqueue('Jennifer')

q.dequeue('Meredith')
console.log(q.toString())

console.log(`Front of queue: ${q.front()}`)
console.log(`Back of queue: ${q.back()}`)

// 2. Assigning Partners at a Square Dance
function Dancer (name, sex) {
  this.name = name
  this.sex = sex
}

function getDancers (males, females) {
  const dancers = [
    'F Allison McMillan',
    'M Frank Optiz',
    'M Mason McMillan',
    'M Clayton Ruff',
    'F Cheryl Ferenback',
    'M Raymond Williams',
    'F Jennifer Ingram',
    'M Bryan Frazer',
    'M David Durr',
    'M Danny Martin',
    'F Aurora Adney'
  ]
  dancers.forEach((dancer) => {
    const d = dancer.split(' ')
    const sex = d[0]
    const name = d[1]
    if (sex === 'F') {
      females.enqueue(new Dancer(name, sex))
    } else {
      males.enqueue(new Dancer(name, sex))
    }
  })
}

function dance (males, females) {
  console.log('The dancer partners are:\n')
  while (!females.empty() && !males.empty()) {
    const female = females.dequeue()
    console.log(`Female dancer is: ${female.name}`)
    const male = males.dequeue()
    console.log(`and the male dancer is ${male.name}`)
    console.log()
  }
}

const maleDancers = new Queue()
const femaleDancers = new Queue()
getDancers(maleDancers, femaleDancers)
dance(maleDancers, femaleDancers)

if (!femaleDancers.empty()) {
  console.log(`${femaleDancers.front().name} is waiting to dance.`)
}
if (!femaleDancers.empty()) {
  console.log(`There are ${femaleDancers.count()} female dancers waiting to dance.`)
}
if (!maleDancers.empty()) {
  console.log(`${maleDancers.front().name} is waiting to dance.`)
}

if (!maleDancers.empty()) {
  console.log(`There are ${maleDancers.count()} male dancers waiting to dance.`)
}

// 3. Sorting Data with Queues
function distribute (nums, queues, n, digit) {
  for (let i = 0; i < n; ++i) {
    if (digit === 1) {
      queues[nums[i] % 10].enqueue(nums[i])
    } else {
      queues[Math.floor(nums[i] / 10)].enqueue(nums[i])
    }
  }
}

function collect (queues, nums) {
  let i = 0
  for (let digit = 0; digit < 10; ++digit) {
    while (!queues[digit].empty()) {
      nums[i++] = queues[digit].dequeue()
    }
  }
}

function dispArray (arr) {
  console.log(arr.join(' '))
}

const queues = Array(10).fill(0).reduce((a, b, i) => {
  a[i] = new Queue()
  return a
}, [])

const numbers = '22 29 96 59 30 81 83 54 0 49'.split(' ').map(i => parseInt(i, 10))
const nums = Array(10).fill(0).reduce((a, b, i) => {
  a[i] = numbers[i]
  return a
}, [])

console.log('')
console.log('Before radix sort:')
dispArray(nums)
console.log('')

distribute(nums, queues, 10, 1)
collect(queues, nums)

distribute(nums, queues, 10, 10)
collect(queues, nums)

console.log('After radix sort:')
dispArray(nums)

// 4. Priority Queue
class PriorityQueue extends Queue {
  dequeue () {
    let priority = this.dataStore[0].code
    for (let i = 0; i < this.dataStore.length; ++i) {
      if (this.dataStore[i].code < priority) {
        priority = i
      }
    }
    return this.dataStore.splice(priority, 1)
  }
  toString () {
    let retStr = ''
    for (let i = 0; i < this.dataStore.length; ++i) {
      retStr += this.dataStore[i].name + ' code: ' + this.dataStore[i].code + '\n'
    }
    return retStr
  }
}

function Patient (name, code) {
  this.name = name
  this.code = code
}

console.log()
const p1 = new Patient('Smith', 5)
const ed = new PriorityQueue()
ed.enqueue(p1)

ed.enqueue(new Patient('Jones', 4))
ed.enqueue(new Patient('Fehrenbach', 6))
ed.enqueue(new Patient('Brown', 1))
ed.enqueue(new Patient('Ingram', 1))
console.log(ed.toString())

const seen1 = ed.dequeue()
console.log(`Patient being treated: ${seen1[0].name}`)
console.log(`Patients waiting to be seen:`)
console.log(ed.toString())

const seen2 = ed.dequeue()
console.log(`Patient being treated: ${seen2[0].name}`)
console.log(`Patients waiting to be seen:`)
console.log(ed.toString())

const seen3 = ed.dequeue()
console.log(`Patient being treated: ${seen3[0].name}`)
console.log(`Patients waiting to be seen:`)
console.log(ed.toString())
