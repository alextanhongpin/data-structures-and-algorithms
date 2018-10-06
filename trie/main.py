class Node():
    def __init__(self):
        # Using dictionary for children would not allow lexicographic sorting because ordinary dictionary would not preserve the order of the keys.
        self.children = {}
        self.value = None
    def display(self, i = 0):
        for c in self.children:
            print(i, c, self.children[c].value)
            self.children[c].display(i+1)
    
def find(node, key):
    for char in key:
        if char in node.children:
            node = node.children[char]
        else:
            return None
    return node.value

def insert(root, string, value):
    node = root
    index_last_char = None
    for index_char, char in enumerate(string):
        if char in node.children:
            node = node.children[char]
        else:
            index_last_char = index_char
            break

    # Append new nodes for the remaining characters, if any.
    if index_last_char is not None:
        for char in string[index_last_char:]:
            node.children[char] = Node()
            node = node.children[char]

    # Store value in the terminal node.
    node.value = value


root = Node()
insert(root, 'hello', 100)
insert(root, 'hai', 20)
print(find(root, 'e'))

root.display()
