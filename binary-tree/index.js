class Node {
  constructor (data, left, right) {
    this.data = data
    this.left = left
    this.right = right
  }

  show () {
    return this.data
  }
}

class BinarySearchTree {
  constructor () {
    this.root = null
  }
  insert (data) {
    const n = new Node(data, null, null)
    if (!this.root) {
      this.root = n
    } else {
      let current = this.root
      let parent
      while (true) {
        parent = current
        if (data < current.data) {
          current = current.left

          if (!current) {
            parent.left = n
            break
          }
        } else {
          current = current.right
          if (!current) {
            parent.right = n
            break
          }
        }
      }
    }
  }
  // Visits all the nodes of a BST in ascending order of the node key values
  static inOrder (node) {
    if (node) {
      BinarySearchTree.inOrder(node.left)
      console.log(node.show())
      BinarySearchTree.inOrder(node.right)
    }
  }
}

module.exports = BinarySearchTree
