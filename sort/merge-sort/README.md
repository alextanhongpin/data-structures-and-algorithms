```
$ go test -bench=. -benchmem -memprofile=mem.out -cpuprofile=cpu.out
goos: darwin
goarch: amd64
BenchmarkSortV1-4             30          42158286 ns/op           0.00 MB/s    46515422 B/op     321116 allocs/op
BenchmarkSortV2-4            300           4069590 ns/op           0.00 MB/s      805573 B/op          1 allocs/op
BenchmarkSortV3-4            500           3345629 ns/op           0.00 MB/s      403063 B/op          1 allocs/op
BenchmarkSortV4-4            500           3448656 ns/op           0.00 MB/s      403120 B/op          1 allocs/op
```
