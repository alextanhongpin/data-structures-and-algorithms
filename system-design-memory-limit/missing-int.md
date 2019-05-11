## Find an integer not among four billion given ones

Given an input file with four billion integers, provide an algorithm to generate an integer which is not contained in the file. Assume you have 1 GB memory. Follow up with what you would do if you have only 10 MB of memory.

```
int32 = 4 bytes
4 billion = 4e9
size of 4 billion int32 = (4e9 * 4) bytes / (1024 * 1024 * 1024) = 14.9 GB

for int32, there are 2^32 possibilities, 4,294,967,296 integers
```

The solution below only needs half of 1gb to process the data. We use byte (1 byte) to store the bitwise values. If we have 4 billion integers, then it would be 4 billion / 8 bytes, which is 536,870,912 bytes or 512 MB.

```go
package main

import (
	"fmt"
	"math"
	"math/rand"
)

const Radix = 8

func main() {
	fmt.Println(0xFFFFFFFF == math.MaxUint32)
  // This takes up exactly 512 MB. unsafe.Sizeof(byte) is 1 byte. 
  // Hence 2 ^ 32 (4,294,967,296) / (8 * 1024 * 1024) = 512 MB.
	bitfield := make([]byte, 0xFFFFFFFF/8)
	var i int64
	for i = 0; i < math.MaxInt8; i++ {
		n := rand.Uint32()
		//if bitfield[n/Radix]&1<<(n%Radix) != 0 {
		//	fmt.Println("duplicate", n)
		//}
		bitfield[n/8] |= 1 << (n % Radix)
	}
	for i := 0; i < len(bitfield); i++ {
		for j := 0; j < Radix; j++ {
			if bitfield[i]&(1<<uint(j)) == 0 {
				fmt.Println("missing", i*8+j)
			}
		}
	}
}
```

References:
- https://stackoverflow.com/questions/7153659/find-an-integer-not-among-four-billion-given-ones
