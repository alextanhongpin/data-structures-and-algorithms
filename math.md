## Knockout Tournament


How many matches will be played between 100 players in knockout tournament?
In knockout tournament, there is only one unbeaten team/individual, i.e. the eventual winner. Therefore, the rest of the participants have to lose in order to have one winner. The formula is (n - 1), hence 99 matches.

2^6 = 64
2^7 = 128
```
Round 1: 28 players are excluded from this round, only the remaining 72 will compete with each other. At the end, there will only be 36 players from this 72 players. If we include the 28 other players, we have 28 + 36 = 64 players that goes to the next round. 36 rounds have been played.
Round 2: Out of 64, only half will make it. 32 rounds have been played.
Round 3: Out of 32, only 16 will make it. 16 rounds have been played.
Round 4: Out of 16, only 8 will make it. 
Round 5: Out of 8, 4 will make it.
Round 6: Out of 4, only 2 will make it.
Round 7: Out of 2, we have a final winner.
```
The total number of rounds: 36 + 32 + 16 + 8 + 4 + 2 + 1 = 99 rounds.


Combinations and permutations

The difference between permutations and combinations is ordering. With permutations, we care about the ordering.


# How to calculate permutations?

Factorial.
Say we want to know how many permutations exists of the number 2,3,4,5 without listing them.

We have four digits, the first digit can be any of the four digits. The next will only have three possible combinations and so on.

4! = 4 x 3 x 2 x 1 = 24


## Permutations with repetitions

What if we want to find the total number of permutations involving the numbers 2,3, 4 and 5 but want to include orderings such as 5555 or 2234 where not all the numbers are used?

Since we can reuse the numbers, we have 4 number options available for each steps.
```
4 x 4 x 4 x 4 = 256
```
## Choosing a subset

How many different 5-card hands can be made from a standard deck of cards (52 cards)?
```
51! / 47! = 52 x 51 x 50 x 49 x 48 =311,875,200 
```
But that’s permutations, not combinations. To fix this, we need to divide by the number of hands that are different permutations but are the same combinations.
```
51! / (47! x 5!) = 2,598,960
```
This is basically the combination formula. If we have n objects and we want to choose k of them, we can find the total number of combinations by using the following formula:
```
n choose k = n! / k!(n-k)!
```

Other examples:
```
Combination:
Picking a team of 3 people from a group of 10. C(10, 3) = 10!/(7!3!) = 10 x 9 x 8 / 3 x 2 x 1 = 120
Permutation:
Picking a president, VP and Waterboy from a group of 10. P(10, 3) = 10! / 7! = 10 * 9 * 8 = 720
```
```
Combination:
Choosing 3 desserts from a menu of 10. C(10, 3) = 120
Permutation: listing your 3 favourite desserts, in order, from a menu of 10. P(10, 3) = 720.
```
