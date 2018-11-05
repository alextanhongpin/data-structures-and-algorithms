# Simple Moving Average with a predefined window

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	m := NewSMA()
	m.Increment(1 * time.Second)
	m.Increment(1 * time.Second)
	m.Increment(1 * time.Second)
	m.Increment(1 * time.Second)
	m.Increment(1 * time.Second)
	m.Increment(1 * time.Second)
	m.Increment(1 * time.Second)
	m.Increment(2 * time.Second)
	m.Increment(2 * time.Second)
	m.Increment(2 * time.Second)
	m.Increment(2 * time.Second)
	m.Increment(2 * time.Second)

	fmt.Println(m.Value)
}

const window = 5

// SMA represents a metric object to store latency.
type SMA struct {
	// Value stores the most recent value.
	Value time.Duration
	counter int
	values  []time.Duration
}

// NewSMA returns a new simple moving average struct.
func NewSMA() *SMA {
	return &SMA{
		values: make([]time.Duration, window),
		counter: -1,
	}
}

// Increment the ping latency into the list and updates the cached ping.
func (s *SMA) Increment(elapsed time.Duration) {
	s.counter = (s.counter + 1) % window
	s.values[s.counter] = elapsed
	var value time.Duration
	var count int
	for _, v := range s.values {
		if v != 0 {
			count++
			value += v
		}
	}
	s.Value = value / time.Duration(count)
}
```
