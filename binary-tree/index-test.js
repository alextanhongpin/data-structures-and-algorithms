const BinarySearchTree = require('./index')

const nums = new BinarySearchTree()
nums.insert(23)
nums.insert(3)
nums.insert(54)
nums.insert(1)
nums.insert(-1)
nums.insert(32)
nums.insert(66)
nums.insert(3)

console.log('Inorder Traversal')
BinarySearchTree.inOrder(nums.root)
