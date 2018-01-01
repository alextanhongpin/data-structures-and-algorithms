const LinkedList = require('./index')

const cities = new LinkedList()
cities.insert('Conway', 'head')
cities.insert('Russelville', 'Conway')
cities.insert('Alma', 'Russelville')
cities.display()
console.log()
cities.remove('Russelville')
cities.display()

console.log()
cities.dispReverse()
