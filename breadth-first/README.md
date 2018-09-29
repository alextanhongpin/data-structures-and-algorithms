# DFS and BFS

if
- _b_ is the branching factor
- _d_ is the depth where the solution is
- _h_ is the height of the tree (so d <= h)

then
- DFS takes O(b^h) time and O(h) space
- BFS takes O(b^d) time and O(b^d) space
- IDDFS takes O(b^d) time and O(d) space

## breadth-first
- solution is close to the root of the tree
- easier to parallelize

## depth-first
- solution is far from the root 
- must see whole tree anyway
- you know _d_, the depth of the answer

## iterative-deepening-depth-first-search (iddfs)
- you want BFS, don't have enough memory, but somewhat slower is acceptable
