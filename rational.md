## Finding rational numbers

```go
package main

import (
	"fmt"
	"log"
	"math"
	"math/big"
	"strconv"
	"strings"
)

func main() {
	fmt.Println(Decompose("1.14"))
}

func parseFloatString(s string) *big.Rat {
	parts := strings.Split(s, ".")
	num, _ := strconv.ParseInt(parts[0], 10, 64)
	if len(parts) == 1 {
		return big.NewRat(num, 1)
	}
	den, _ := strconv.ParseInt(parts[1], 10, 64)
	pow := float64(len(parts[1]))
	tenth := int64(math.Pow(10, pow))
	if num == 0 {
		return big.NewRat(den, tenth)
	}
	return big.NewRat(num*tenth+den, tenth)
}

func parseRationalString(s string) *big.Rat {
	parts := strings.Split(s, "/")
	num, _ := strconv.ParseInt(parts[0], 10, 64)
	den, _ := strconv.ParseInt(parts[1], 10, 64)
	return big.NewRat(num, den)
}

func Decompose(s string) []string {
	log.Println("input", s)
	var rat *big.Rat
	if strings.Contains(s, "/") {
		rat = parseRationalString(s)
	} else {
		rat = parseFloatString(s)
	}
	log.Println(rat)

	result := make([]string, 0)
	num, den := int64(1), int64(1)
	if rat.Cmp(big.NewRat(1, 1)) > 0 {
		f, _ := rat.Float64()
		n := int64(f)
		r := big.NewRat(n, 1)
		rat = rat.Sub(rat, r)
		result = append(result, r.RatString())
	}

	for rat.Num().Cmp(big.NewInt(0)) > 0 {
		right := big.NewRat(num, den)
		if rat.Cmp(big.NewRat(1, 1)) < 0 {
			tmp, _ := big.NewRat(1, 1).Inv(rat).Float64()
			den = int64(math.Ceil(tmp)) - 1
		}
		for ; right.Cmp(rat) > 0; den++ {
			right = big.NewRat(1, den)
			log.Println(right, right.Cmp(rat), rat)
		}
		rat = rat.Sub(rat, right)
		result = append(result, right.RatString())
	}
	return result
}
```
