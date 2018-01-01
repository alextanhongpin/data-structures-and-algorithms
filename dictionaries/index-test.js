const Dictionary = require('./index')

const pbook = new Dictionary()
pbook.add('Mike', '123')
pbook.add('David', '345')
pbook.add('Cynthia', '456')
console.log(pbook.find('David'))
pbook.remove('David')
pbook.showAll()
