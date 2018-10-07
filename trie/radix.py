#  https://en.wikipedia.org/wiki/Radix_tree
import copy

class Node():
    def __init__(self):
        self.edges = []
        self.prefix = ''
        self.leaf = None 

    def is_leaf(self):
        return self.leaf is not None
    
    def info(self, i = 0):
        for edge in self.edges:
            print('{} {}'.format(' ' * i, edge))
            if edge.node is not None:
                edge.node.info(i + 1)

class Edge():
    def __init__(self, label):
        self.label = label 
        self.node = None

    def __str__(self):
        return self.label

def lookup(root, string):
    traverse_node = root
    elements_found = 0

    while traverse_node is not None and not traverse_node.is_leaf() and elements_found < len(x):
        for edge in traverse_node.edges:
            if edge.label.startswith(x[:elements_found]):
                next_edge = edge
        if next_edge is not None:
            traverse_node = next_edge.target_node

            elements_found += len(next_edge.label)
        else:
            traverse_node = None
    return traverse_node is not None and traverse_node.is_leaf() and elements_found == len(x)


def insert(root, string):
    next_edge = None
    for edge in root.edges:
        # Check if the label has the first letter of the string.
        if edge.label.startswith(string[0]):
            next_edge = edge
            # There can be no other edges with the same prefix.
            break
    if next_edge is None:
        # TODO: Check how to convert the label back to char code.
        root.edges.append(Edge(string))
    else:
        old_label = next_edge.label
        i = 0 
        # Find similar prefixes.
        while string[:i] == next_edge.label[:i]:
            i += 1
        i -= 1
        # If they both have same prefixes, put them into the same group of
        # prefixes.
        tmp = copy.deepcopy(next_edge)
        tmp.label = tmp.label[i:] 

        str_edge = Edge(string[i:])

        new_prefix = string[:i]
        new_edge = Edge(new_prefix)
        
        new_node = Node()
        new_node.edges.append(tmp)
        new_node.edges.append(str_edge)

        new_edge.node = new_node
        new_edge.label = new_prefix

        next_edge.node = None
        root.edges.append(new_edge)
        root.edges.remove(next_edge)


root = Node()
insert(root, 'alex')
insert(root, 'alan')
insert(root, 'john')
insert(root, 'apple')
insert(root, 'car')
insert(root, 'cars')
insert(root, 'dog')
insert(root, 'dogs')
insert(root, 'hello')
insert(root, 'this')
root.info()
