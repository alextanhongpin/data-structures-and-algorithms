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
