```
$ go test -bench=. -benchmem -memprofile=mem.out -cpuprofile=cpu.out
goos: darwin
goarch: amd64
BenchmarkSortV1-4             30          40980425 ns/op           0.00 MB/s    46515474 B/op     321116 allocs/op
BenchmarkSortV2-4            300           4013448 ns/op           0.00 MB/s      805565 B/op          1 allocs/op
BenchmarkSortV3-4            500           3708395 ns/op           0.00 MB/s      403062 B/op          1 allocs/op
```
