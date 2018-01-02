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

console.log('inorder Traversal:')
BinarySearchTree.inOrder(nums.root)

console.log('preorder Traversal:')
BinarySearchTree.preOrder(nums.root)

console.log('postorder Traversal:')
BinarySearchTree.postOrder(nums.root)

console.log('min:', nums.getMin())
console.log('max:', nums.getMax())

if (nums.find(3)) {
  console.log('exist:', 3)
}

if (!nums.find(1000)) {
  console.log('does not exist:', 1000)
}

console.log(JSON.stringify(nums, 2, null))
