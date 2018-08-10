# Levenshtein Distance

Levenshtein Distance (LD) is a measure of similarity between two strings, which we will refer to as source string (s) and target string (t). The distance is the number of deletions, insertions, or substitutions required to transform s into t. 

For example,

- if s is `test` and t is `test`, then LD(s,t) = 0, because no transformation are needed. The strings are already identical.
- if s is `test` and t is `tent`, then LD(s,t) = 1, because one substitution (change "s" to "n") is sufficient to transform s into t.

The greater the Levenshtein distance, the more different the strings are.


## The algorithm


