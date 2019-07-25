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


## Linked List

```js
// LinkedList

class SinglyLinkedListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }
  isEmpty() {
    return this.size === 0
  }

  // Time complexity: O(1). 
  insert(value) {
    if (this.head === null) {
      this.head = new SinglyLinkedListNode(value)
    } else {
      const tmp = this.head
      this.head = new SinglyLinkedListNode(value)
      this.head.next = tmp
    }
    this.size++
  }

  remove(value) {
    let head = this.head
    if (head.value === value) {
      // Shift to the left.
      this.head = head.next
      this.size--
    } else {
      let prev = head
      while (head.next) {
        if (head.value === value) {
          prev.next = head.next
          prev = head
          head = head.next
          break
        }
        prev = head
        head = head.next
      }
      // The tail.
      if (head.value === value) {
        prev.next = null
      }
      this.size--
    }
  }
  deleteAtHead() {
    if (this.head) {
      const value = this.head.value
      this.head = this.head.next
      this.size--
      return value
    }
  }
}

const list = new SinglyLinkedList()
list.insert(1) // 1 -> null
list.insert(12) // 12 -> 1 -> null
list.insert(20) // 20 -> 12 -> 1 -> null
list.insert(100)

list.remove(12)
list.remove(20)
console.log(list)
console.log(list.deleteAtHead())
```

## Sum of linked list

```js
class LinkedListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor(node) {
    this.head = node
  }
  add(value) {
    let head = this.head
    if (!head) {
      this.head = new LinkedListNode(value)
      return
    }
    while (head.next) {
      head = head.next
    }
    head.next = new LinkedListNode(value)
  }
}

const linkedListA = new LinkedList()
linkedListA.add(3)
linkedListA.add(1)
linkedListA.add(5)
console.log(linkedListA)

const linkedListB = new LinkedList()
linkedListB.add(5)
linkedListB.add(9)
linkedListB.add(2)
console.log(linkedListB)

// a and b are LinkedListNode, not LinkedList
function addLinkedList(a, b, carry = 0) {
  if (!a && !b) return null
  let result = new LinkedListNode()
  let value = carry
  if (a) {
    value += a.value
  }
  if (b) {
    value += b.value
  }
  result.value = value % 10
  result.next = addLinkedList(a.next, b.next, value > 9 ? 1 : 0)
  return result
}

console.log(addLinkedList(linkedListA.head, linkedListB.head))
```
