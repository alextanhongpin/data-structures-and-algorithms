```
$ go test -bench=. -benchmem -memprofile=mem.out -cpuprofile=cpu.out
goos: darwin
goarch: amd64
BenchmarkSortV1-4             30          35792316 ns/op           0.00 MB/s    46515170 B/op     321116 allocs/op
BenchmarkSortV2-4            500           3232459 ns/op           0.00 MB/s      804465 B/op          1 allocs/op
```
