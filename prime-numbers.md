Sieve of Eratosthenes:

```go
package main

import (
	"fmt"
)

func main() {
	fmt.Println(primes(55))
}

func primes(n int) []int {
	sieve := make([]bool, n)
	for i := 0; i < n; i++ {
		sieve[i] = true
	}

	var result []int
	for i := 2; i < n; i++ {
		if sieve[i] {
			for j := i * i; j < n; j += i {
				sieve[j] = false
			}
			result = append(result, i)
		}
	}
	return result
}
```

Checking if a number is prime:

```go
func isPrime(n int) bool {
	m := int(math.Sqrt(float64(n))) + 1
	for i := 2; i < m; i++ {
		if n%i == 0 {
			return false
		}
	}
	return true
}

```
