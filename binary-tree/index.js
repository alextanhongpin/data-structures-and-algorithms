class Node {
  constructor (data, left, right) {
    this.data = data
    this.left = left
    this.right = right
    this.count = 1
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
        } else if (data > current.data) {
          current = current.right
          if (!current) {
            parent.right = n
            break
          }
        } else if (data === current.data) {
          current.count += 1
          break
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
  // Visits the root node first, followed by the nodes in the subtrees
  // under the left child of the root node, followed by the nodes in
  // the subtrees under the right child of the root node
  static preOrder (node) {
    if (node) {
      console.log(node.show())
      BinarySearchTree.preOrder(node.left)
      BinarySearchTree.preOrder(node.right)
    }
  }
  // Visits all of the child nodes of the left subtree up to the root node,
  // and then visits all of the child nodes of the right subtree up to the
  // root node
  static postOrder (node) {
    if (node) {
      BinarySearchTree.postOrder(node.left)
      BinarySearchTree.postOrder(node.right)
      console.log(node.show())
    }
  }
  getMin () {
    let current = this.root
    while (current.left) {
      current = current.left
    }
    return current.data
  }
  getMax () {
    let current = this.root
    while (current.right) {
      current = current.right
    }
    return current.data
  }
  find (data) {
    let current = this.root
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left
      } else {
        current = current.right
      }
      if (!current) {
        return null
      }
    }
    return current
  }
  update (data) {
    const grade = this.find(data)
    grade.count += 1
    return grade
  }
  // remove(data) {
  //   this.removeNode(this.root, data)
  // }
}

module.exports = BinarySearchTree
