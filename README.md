# Data Structures and Algorithms


Interesting data structures and algorithms that I learn, implemented in different languages and test cases.


Other algorithms not in this repo:
- [algorithm-x](https://github.com/alextanhongpin/algorithm-x) for solving sudoku
- [affinity-analysis](https://github.com/alextanhongpin/affinity-analysis) for market basket analysis
- [viterbi and hidden markov model](https://github.com/alextanhongpin/hidden-markov-model)
- [base62](https://github.com/alextanhongpin/go-base62) for url shortener
- [celebrity problem](https://github.com/alextanhongpin/celebrity-problem)
- [bandit-algorithm](https://github.com/alextanhongpin/go-bandit) as an alternative to A/B testing, and also used for dynamic pricing

## String algorithm

- Boyer Moore (used in grep)
- Levenshtein distance (user for edit-distance calculation)
- BK-tree can be used in conjunction with levenshtein for spell-checking


## Genetic Algorithm

Write your own implementation of Genetic Algorithm and look into the application in web/mobile. Compare it against stochastic gradient descent. Also, understand that Genetic Programming and genetic algorithm is different.

## Sudoku Solver

Look into how to solve sudoku uisng the `Dancing Links` and `Algorithm X` algorithms. Working solution with TypeScript [here](https://github.com/alextanhongpin/algorithm-x).

## Stable Marriage Problem

Look into how to solve stable marriage problems and test it on timetable allocation, dorm room allocation to students, candidates and hirers application and ...finding best dating partner. Wiki link [here](https://en.wikipedia.org/wiki/Stable_marriage_problem).

Solution in several languages can be found [here](https://github.com/alextanhongpin/stable-marriage-problem).

## Basic and advanced algorithms

Bubble sort, quick sort, shellsort, merge sort, etc. Learn the different kinds of sorting and then look into dynamic programming. Knapsack problem, and coin changing problem.

## Token Bucket & Leaky Bucket

Look into how to implement those algorithms in different languages.

## CRDT, Bloom Filter

Read and find out about [RaiBlock](https://raiblocks.net/), [IOTA](https://www.iota.org/), Directed acyclic graph (DAG), Distributed Hash Table (DHT), Merkle tree, cross chain bridges, bloom filters, cuckoo hashing, conflict-free replicated data ([CRDT](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type)), Nash Equilibrium, Puppeth...

Look into distributed hash table http://ntrg.cs.tcd.ie/undergrad/4ba2.05/group6/index.html, and CHORD implementation https://en.wikipedia.org/wiki/Chord_(peer-to-peer)

## Evolutionary Algorithms 

Look into ant colony optimization, particle swarm optimization etc and see how to apply it to actual problems (TSP, etc). Also look into generating the solutions in a different way (iterators, generators) and create canvas html simulations.
http://www.cleveralgorithms.com/nature-inspired/index.html

## Ultimate Tic Tac Toe

Create solution for this (monte-carlo tree search)

## OpenCV to detect Sudoku Board

And complete the sudoku puzzle with dancing links

## Pagerank algorithm
- https://www.geeksforgeeks.org/page-rank-algorithm-implementation/
- https://www.cs.princeton.edu/~chazelle/courses/BIB/pagerank.htm
- https://searchenginewatch.com/google-pagerank-algorithm-explained
- https://hackernoon.com/implementing-googles-pagerank-algorithm-88069314fb3d


## Algorithms 
How to use HMM in the real world
how to compute viterbi algorithm in different languages
- this can be used for content generation, chat bot
- https://www.freecodecamp.org/news/a-deep-dive-into-part-of-speech-tagging-using-viterbi-algorithm-17c8de32e8bc/



## Compression
Check out algorithm for compressed inputs, such as LZ77 (grammar-based compression) and Boldi-Vigna (graph compression).

## Segment Trees

https://kartikkukreja.wordpress.com/2014/11/09/a-simple-approach-to-segment-trees/

https://codeforces.com/blog/entry/15890
https://hackernoon.com/practical-data-structures-for-frontend-applications-when-to-use-segment-trees-9c7cdb7c2819
https://cp-algorithms.com/data_structures/segment_tree.html
https://www.hackerearth.com/practice/data-structures/advanced-data-structures/segment-trees/tutorial/
https://medium.com/m/global-identity?redirectUrl=https%3A%2F%2Fblog.mapbox.com%2Fa-dive-into-spatial-search-algorithms-ebd0c5e39d2a

## Technical Indicators

Try out all the possible technical indicators and write the algorithm in Python Jupyter. Also, run it against a real test data, plot it out and visualize the outcome. See if they can be used for prediction. Also, check if you can do image pattern matching against the popular technical indicators. Repo [here](https://github.com/alextanhongpin/technical-indicators)

TODO: Write unit test for the technical indicators.



## Sperner’s Lemma

Algorithm for splitting rent.

## Leslie Lamport

Look into his past work, including the Byzantine General Problem, and [The Part-Time Parliament]( https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf)




## Look into distributed synchronization protocols and implement a basic working example

## Look into operational transformation

## Look into grapheme cluster
Something to do with the unicode encoding.
http://unicode.org/reports/tr29/



## Dendogram
Hierarchical clustering and how to generate such clusters.


## TOCTOU
Time to check, time to use race condition. Read on it and how to prevent it.



## How does the redis TTL works

https://redis.io/commands/expire
Implement one version in golang, which takes advantage of the hash map random order to expire the first 20% of the keys.


