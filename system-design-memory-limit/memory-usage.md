```go
package main

import (
	"fmt"
	"unsafe"
)

func main() {
	// 1 byte = 8 bits
	// Sizeof takes an expression x of any type and returns the size in bytes ...
	{
		var i int                            // Defaults to int32 (based on OS architecture).
		fmt.Println("int", unsafe.Sizeof(i)) // 1 byte
	}
	{
		var i int8
		fmt.Println("int8", unsafe.Sizeof(i)) // 1 byte
	}
	{
		var i int16
		fmt.Println("int16", unsafe.Sizeof(i)) // 2 bytes
	}
	{
		var i int32
		fmt.Println("int32", unsafe.Sizeof(i)) // 4 bytes
	}
	{
		var i int64
		fmt.Println("int64", unsafe.Sizeof(i)) // 8 bytes
	}
	{
		var b byte
		fmt.Println("byte", unsafe.Sizeof(b)) // 8 bytes
	}
	{
		var s string
		fmt.Println("string", unsafe.Sizeof(s)) // 8 bytes
	}
}
```

## Testing

Actual memory usage can be obtained through profiling. E.g. profiling with test:
```bash
$ go test -memprofile=mem.out -cpuprofile=cpu.out ./...
```
