#  https://en.wikipedia.org/wiki/Radix_tree

class Node():
    def __init__(self):
        self.edges = []

    def is_leaf(self):
        return not self.edges

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
    if not root and not word: return

    # There are no edges. Create new.
    if root.is_leaf():
        # Conventional to return None for mutating items in python.
        return root.edges.append(Edge(word))

    next_edge = [(i, edge) for i, edge in enumerate(root.edges) 
                 if similar_prefix(word, edge.label)] 

    if not next_edge:
        return root.edges.append(Edge(word))
        
    i, next_edge = next_edge[0]
    k = similar_prefix(word, next_edge.label)

    if not k: 
        # There are no matching prefix, which means that the word does not
        # exist yet.
        return root.edges.append(Edge(word))
    if k == len(word):
        # The len of both words matches. Increment the score as the same
        # pattern has been found.
        next_edge.score += 1
        return
    if k == len(next_edge.label):
        # The label is a prefix of the word. E.g, `car` is a prefix of `cars`.
        # Insert the difference, which is `s` in the example above.
        next_edge.score += 1
        if next_edge.node is None:
            next_edge.node = Node()
        insert(next_edge.node, word[k:])
        return

    # We need to split the prefix now since the length of k does not match any
    # of them. A possible example is `john` and `jojo`, where k will be equal
    # to 3, matching the prefix `jo` (john[:k] or jojo[:k]). In this scenario,
    # we will add the new prefix `jo` and split the edges into `hn` and `jo`.

    # Remove the old edge.
    edge = root.edges.pop(i)

    # Tmp variable to store the original label.
    label = edge.label

    # Update the existing label.
    edge.label = label[k:]

    # The new split prefix.
    new_edge = Edge(label[:k])
    new_edge.node = Node()
    new_edge.score += edge.score
    new_edge.node.edges.append(edge)

    insert(new_edge.node, word[k:])
    root.edges.append(new_edge)

def similar_prefix(a, b):
    '''
    Checks if string a and b has similar prefixes by comparing each characters.
    If they do not have similar prefix, it should return index 0, indicating
    that a[:index] or b[:index] is empty string. If they are perfect match, it
    would return the exact length.
    '''
    values = zip(a, b)
    for i, (left, right) in enumerate(values):
        if left != right:
            return i 
    return len(values) 
    
def lookup(root, word='', result = None):
    if result is None:
        result = set()

    i = 0
    traverse_node = root
    while traverse_node is not None and not traverse_node.is_leaf() and i < len(word):
        next_edge = [edge for edge in traverse_node.edges
                     if word[i:].startswith(edge.label)]
        if not next_edge:
            traverse_node = None
            break
        edge = next_edge[0]
        traverse_node = edge.node
        i += len(edge.label)

    if traverse_node is None:
        return result

    if i > len(word):
        return set() 

    out = [word[:i] + edge.label for edge in traverse_node.edges]
    for o in out:
        result.add(o)
        lookup(root, o, result)
    return result

def debug(root, word):
    insert(root, word)
    root.info()
    print('')

root = Node()
insert(root, 'a')
insert(root, 'b')
insert(root, 'bc')
insert(root, 'cb')
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
#  print(lookup(root, 'a', set()))
#  print(lookup(root, 'je', set()))
