```js
// For star rating -- Add

// *     - 0.00 to up votes and 1.00 to down votes (i.e. a full down vote)
// **    - 0.25 to up votes and 0.75 to down votes
// ***   - 0.50 to up votes and 0.50 to down votes
// ****  - 0.75 to up votes and 0.25 to down votes
// ***** - 1.00 to up votes and 0.00 to down votes (i.e. a full up vote)

function ratingToVotes(rating) {
  rating = Math.max(0, rating)
  rating = Math.min(5, rating)
  const upvotes = 0.25 * (Math.round(rating) - 1)
  const downvotes = 1 - upvotes
  return { upvotes, downvotes }
}

assert(1 === ratingToVotes(5).upvotes)
assert(0 === ratingToVotes(5).downvotes)
assert(1 === ratingToVotes(4.5).upvotes)
assert(0 === ratingToVotes(4.5).downvotes)

assert(0.75 === ratingToVotes(4).upvotes)
assert(0.25 === ratingToVotes(4).downvotes)

assert(0.5 === ratingToVotes(3).upvotes)
assert(0.5 === ratingToVotes(3).downvotes)

assert(0.25 === ratingToVotes(2).upvotes)
assert(0.75 === ratingToVotes(2).downvotes)

assert(0 === ratingToVotes(1).upvotes)
assert(1 === ratingToVotes(1).downvotes)
```

Reference:
- https://stackoverflow.com/questions/19613023/wilsons-confidence-interval-for-5-star-rating


## Wilson Score

```js
const wilsonScore = (upvotes, downvotes) => {
  if (upvotes + downvotes <= 0) return
  return ((upvotes + 1.9208) / (upvotes + downvotes) -
    1.96 * Math.sqrt((upvotes * downvotes) / (upvotes + downvotes) + 0.9604) /
    (upvotes + downvotes)) / (1 + 3.8416 / (upvotes + downvotes))
}

wilsonScore(100, 300)
```

Reference:
- https://www.evanmiller.org/how-not-to-sort-by-average-rating.html


## Bayesian

Simple Bayesian approach with a Beta prior:

```js
const pretendUpvotes = 4
const pretendDownvotes = 4

const score = (itemUpvotes, itemDownvotes) => {
  const upvotes = itemUpvotes + pretendUpvotes
  const downvotes = itemDownvotes + pretendDownvotes
  return upvotes / (upvotes + downvotes)
}

console.log(score(100, 1))
console.log(score(1, 0))
```

Reference:
- https://news.ycombinator.com/item?id=17989614

## Time decay
```js
const timeDecay = (days = 1) => {
  if (days < 1) return 1
  return Math.exp(-Math.log(days))
}

for (let i = 0; i < 50; i += 1) {
  console.log(timeDecay(i))
}
```

## Others


https://www.evanmiller.org/ranking-items-with-star-ratings.html
https://www.evanmiller.org/rank-hotness-with-newtons-law-of-cooling.html
http://julesjacobs.github.io/2015/08/17/bayesian-scoring-of-ratings.html
https://dataorigami.net/blogs/napkin-folding/79031811-multi-armed-bandits

Improved Evan Miller algorithm with frecency included.
- Take the last 30 days items created 
- Find the log of time decay algorithms
- Find all the items created with score applied
- Rank activity in batch

https://github.com/mozilla/application-services/issues/610
https://en.wikipedia.org/wiki/Frecency
http://wiki.mozilla.org/User:Mconnor/Past/PlacesFrecency
