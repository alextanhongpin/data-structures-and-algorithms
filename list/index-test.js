const List = require('./index')

const list = new List()
list.append('john')
list.append('doe')
console.log(list.toString())
list.remove('john')
console.log(list.toString())
list.append('bary')
list.append('car')
console.log(list.toString())
list.insert('bar', 'bary')
list.insert('1', 'doe')
console.log(list.toString())
// list.clear()
// console.log(list.toString())
for (list.front(); list.currPos() < list.length(); list.next()) {
  console.log(list.currPos(), list.length())
  console.log(list.getElement())
}

function Customer (name, movie) {
  this.name = name
  this.movie = movie
}

function displayList (list) {
  for (list.front(); list.currPos() < list.length(); list.next()) {
    if (list.getElement() instanceof Customer) {
      const movie = list.getElement()
      console.log(`${movie.name}, ${movie.movie}`)
    } else {
      console.log(list.getElement())
    }
  }
}

function checkOut (name, movie, movies, movieList, customerList) {
  console.log('movie', movies)
  if (movies.includes(movie)) {
    var c = new Customer(name, movie)
    customerList.append(c)
    movieList.remove(movie)
  } else {
    console.log(`${movie} not available`)
  }
}

const movies = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Godfather: Part 2',
  'Pulp Fiction',
  'The Good, the Bad and the Ugly',
  '12 Angry Men',
  'Schindler\'s List',
  'The Dark Knight',
  'The Lord of the Rings: The Return of the King',
  'Fight Club',
  'Star Wars: Episode V - The Empire Strikes Back',
  'One Flew Over the Cuckoo\'s Nest',
  'The Lord of the Rings: The Fellowship of the Ring',
  'Inception',
  'Godfellas',
  'Star Wars',
  'Seven Samurai',
  'The Matrix',
  'Forest Grump',
  'City of God'
]

const movieList = new List()
const customers = new List()

for (let i = 0; i < movies.length; i += 1) {
  movieList.append(movies[i])
}

console.log('\nAvailable movies:\n')
displayList(movieList)

checkOut('Jane Doe', 'The Godfather', movies, movieList, customers)
console.log('Customer Rentals:\n')
displayList(customers)

console.log('\nRemaining movies:\n')
displayList(movieList)
