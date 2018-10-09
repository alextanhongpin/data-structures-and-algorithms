#  https://en.wikipedia.org/wiki/Radix_tree
from copy import deepcopy

class Node():
    def __init__(self):
        self.edges = []

    def is_leaf(self):
        return len(self.edges) == 0

    def info(self, i = 0):
        for edge in self.edges:
            print('{} {}'.format('  ' * i, edge))
            if edge is not None and edge.node is not None:
                edge.node.info(i + 1)

class Edge():
    def __init__(self, label):
        self.label = label
        self.score = 1
        self.node = None

    def __str__(self):
        return '{}:{}'.format(self.label, self.score)

def insert(root = None, word = ''):
    if root is None or word is '': return

    # Prefix does not exist yet, add it.
    if root.is_leaf():
        root.edges.append(Edge(word))
        return

    i = -1
    idx = -1
    next_edge = None
    for idx, edge in enumerate(root.edges):
        max_cmp = min(len(edge.label), len(word))
        for k in range(max_cmp):
            if edge.label[k] != word[k]:
                continue
            next_edge = edge
            i = k + 1

    if next_edge is None or i == 0:
        root.edges.append(Edge(word))
        return
    if next_edge.label == word:
        next_edge.score += 1
        return
    if next_edge.label in word:
        next_edge.score += 1
        if next_edge.node is None:
            next_edge.node = Node()
        insert(next_edge.node, word[len(next_edge.label):])
        return

    edge = root.edges.pop(idx)
    split_prefix = edge.label[:i]
    edge.label = edge.label[i:]

    new_edge = Edge(split_prefix)
    new_edge.node = Node()
    new_edge.score += edge.score
    new_edge.node.edges.append(edge)

    insert(new_edge.node, word[i:])
    root.edges.append(new_edge)

def lookup(root, word='', result = set()):
    if word == '': 
        for edge in root.edges:
            result.add(edge.label)
        return result
    if root is None or word is '': return result

    i = 0 
    next_edge = None
    for edge in root.edges:
        print(edge.label)
        if edge.label[0] == word[0]:
            i += len(edge.label)
            next_edge = edge
            break
        else:
            continue

    if next_edge is None:
        return result
    result.add(next_edge.label)

    print(i, word[i:])
    return lookup(next_edge.node, word[i:], result)

def debug(root, word):
    insert(root, word)
    root.info()
    print('')

root = Node()
insert(root, 'a')
insert(root, 'ab')
insert(root, 'ac')
insert(root, 'abc')
insert(root, 'a')
insert(root, 'b')
insert(root, 'john')
insert(root, 'johns')
insert(root, 'jojo')
insert(root, 'johny')
insert(root, 'john doe')
insert(root, 'jess')
insert(root, 'jessie')
debug(root, 'jessica')

#  print('looking for word')
print(lookup(root, 'jo'))
#  print(lookup(root, 'j'))
#  print('\nlooking for word')
#  print(lookup(root, 'a'))
