# Reversing Linked list with golang

```go
package main

import (
	"fmt"
)

type Node struct {
	next  *Node
	value int
}

func NewNode(value int) *Node {
	return &Node{value: value}
}

func (n *Node) Add(value int) {
	node := n
	for node.next != nil {
		node = node.next
	}
	node.next = NewNode(value)
}

func (n *Node) List() {
	node := n
	for node != nil {
		fmt.Println(node.value)
		node = node.next
	}
}
func main() {
	n := NewNode(1)
	n.Add(2)
	n.Add(3)
	n.List()

	fmt.Println("Hello, playground")
	rev := reverse(n)
	rev.List()
	fmt.Printf("%+v", rev)
}

func reverse(n *Node) *Node {
  // Create three var
	var next, curr, prev *Node
  // Set the current to head
	curr = n
	for curr != nil {
		next = curr.next
		curr.next = prev
		prev = curr
		curr = next
	}
	return prev
}
```
