## LFU

```js
// What is caching? Process of storing data into temporary memory so that it can be easily retrieved for later use if it is required again.
// Least-frequently-used.
// Least-recently-used.
class LFUNode {
  constructor(key, value) {
    this.next = null
    this.prev = null
    this.key = key
    this.value = value
    this.freqCount = 1
  }
}

class LFUDoublyLinkedList {
  constructor() {
    this.head = new LFUNode('buffer head', null)
    this.tail = new LFUNode('buffer tail', null)
    this.head.next = this.tail
    this.tail.prev = this.head
    this.size = 0
  }
  insertAtHead(node) {
    node.next = this.head.next
    this.head.next.prev = node
    this.head.next = node
    node.prev = this.head
    this.size++
  }
  removeAtTail() {
    const oldTail = this.tail.prev
    const prev = this.tail.prev
    prev.prev.next = this.tail
    this.tail.prev = prev.prev
    this.size--
    return oldTail
  }
  removeNode(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
    this.size--
  }
}

class LFUCache {
  constructor(capacity) {
    this.keys = {} // Stores LFUNode.
    this.freq = {} // Stores LFUDoublyLinkedList.
    this.capacity = capacity
    this.minFreq = 0
    this.size = 0
  }


  set(key, value) {
    let node = this.keys[key]
    if (node === undefined) {
      node = new LFUNode(key, value)
      this.keys[key] = node
      if (this.size !== this.capacity) {
        // Insert without deleting.
        if (this.freq[1] === undefined) {
          this.freq[1] = new LFUDoublyLinkedList()
        }
        console.log('inserting', this.freq)
        this.freq[1].insertAtHead(node)
        this.size++
      } else {
        // Delete and insert.
        const oldTail = this.freq[this.minFreq].removeAtTail()
        delete this.keys[oldTail.key]

        if (this.freq[1] === undefined) {
          this.freq[1] = new LFUDoublyLinkedList()
        }

        this.freq[1].insertAtHead(node)
      }
      this.minFreq = 1
    } else {
      const oldFreqCount = node.freqCount
      node.data = value
      node.freqCount++

      this.freq[oldFreqCount].removeNode(node)

      if (this.freq[node.freqCount] === undefined) {
        this.freq[node.freqCount] = new LFUDoublyLinkedList()
      }

      this.freq[node.freqCount].insertAtHead(node)
      if (oldFreqCount === this.minFreq && Object.keys(this.freq[oldFreqCount]).size === 0) {
        this.minFreq++
      }
    }
  }

  get(key) {
    const node = this.keys[key]
    if (node === undefined) {
      return null
    }

    const oldFreqCount = node.freqCount
    node.freqCount++

    this.freq[oldFreqCount].removeNode(node)

    if (this.freq[node.freqCount] === undefined) {
      this.freq[node.freqCount] = new LFUDoublyLinkedList()
    }
    this.freq[node.freqCount].insertAtHead(node)
    if (oldFreqCount === this.minFreq && Object.keys(this.freq[oldFreqCount]).length === 0) {
      this.minFreq++
    }
    return node.data
  }
}

const lfu = new LFUCache(5)
lfu.set(1, 1)
lfu.set(2, 2)
lfu.set(3, 3)
lfu.get(1)
```

## LRU

```js
// DoublyLinkedList
class DLLNode {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.keys = {}
    this.head = new DLLNode('', null)
    this.tail = new DLLNode('', null)
    this.head.next = this.tail
    this.tail.prev = this.head
  }
  removeNode(node) {
    const prev = node.prev
    const next = node.next
    prev.next = next
    next.prev = prev
  }
  addNode(node) {
    const realTail = this.tail.prev
    realTail.next = node

    this.tail.prev = node
    node.prev = realTail
    node.next = this.tail
  }

  get(key) {
    const node = this.keys[key]
    if (node === undefined) {
      return null
    } else {
      this.removeNode(node)
      this.addNode(node)
      return node.value
    }
  }
  set(key, value) {
    const node = this.keys[key]
    if (node) {
      this.removeNode(node)
    }

    const newNode = new DLLNode(key, value)
    this.addNode(newNode)
    this.keys[key] = newNode

    // Evict a node.
    if (Object.keys(this.keys).length > this.capacity) {
      const realHead = this.head.next
      this.removeNode(realHead)
      delete this.keys[realHead.key]
    }
  }
}

const lru = new LRUCache(5)
lru.set(1, 1)
lru.set(2, 2)
lru.set(3, 3)
lru.set(4, 4)
lru.set(5, 5)

console.log(lru.get(1))
console.log(lru.get(2))

lru.set(6, 6)
lru.set(7, 7)
lru.set(8, 8)

console.log(lru.get(1))
console.log(lru.get(2))
console.log(lru.get(3))
console.log(lru)
```
