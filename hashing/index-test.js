const HashTable = require('./index')

const someNames = [
  'David',
  'Jennifer',
  'Donnie',
  'Raymond',
  'Cynthia',
  'Mike',
  'Clayton',
  'Danny',
  'Jonathan'
]

const hTable = new HashTable()

someNames.forEach((name) => {
  hTable.put(name, name)
})

hTable.showDistro()

// Hashing integer keys

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function genStuData (arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let num = ''
    for (let j = 0; j <= 9; j += 1) {
      num += Math.floor(Math.random() * 10)
    }
    num += getRandomInt(50, 100)
    arr[i] = num
  }
}

const numStudents = 10
const students = new Array(numStudents)
genStuData(students)
for (let i = 0; i < students.length; i += 1) {
  console.log(students[i].substring(0, 8) + ' ' + students[i].substring(9))
}

console.log('Data distribution:\n')
const hTable2 = new HashTable()

for (let i = 0; i < students.length; i += 1) {
  hTable2.put(students[i], 'test:' + students[i])
}
hTable2.showDistro()
console.log('get students', hTable2.get(students[0]))
