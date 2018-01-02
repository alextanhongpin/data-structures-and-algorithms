const Sets = require('./index')

const names = new Sets()
names.add('David')
names.add('David')
names.add('Jennifer')
names.add('Cythia')
console.log(names.show())
names.remove('David')
console.log(names.show())

const names2 = new Sets()
names2.add('Jennifer')
names2.add('Carlos')

const merge = names.union(names2)
console.log(merge.show())

const intersect = names.intersect(names2)
console.log(intersect.show())

const s1 = new Sets()
s1.add('a')
s1.add('b')

const s2 = new Sets()
s2.add('a')
s2.add('b')
s2.add('c')

console.log(s1.subset(s2))
console.log(s2.difference(s1))
