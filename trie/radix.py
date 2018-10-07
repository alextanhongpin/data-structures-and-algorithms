#  https://en.wikipedia.org/wiki/Radix_tree
import copy

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

def insert_iterative(root, word):
    traverse_node = root
    prefix = word
    while traverse_node is not None and not traverse_node.is_leaf():
        next_edge = None 
        # Go through each edges.
        for edge in traverse_node.edges:
            #  print('got prefix', prefix)
            if edge.label[0] != prefix[0]:
                #  print('not equal')
                continue 
            #  next_edge = edge

            # The scenario where the prefix is an exact match.
            if edge.label == prefix:
                # Do not need to iterate further. Break immediately.
                next_edge = None

                # Increment the score.
                edge.score += 1
                #  print('equal', prefix)
                return

            # This is an extension. E.g. car is part of cars.
            if edge.label in prefix:
                next_edge = edge
                edge.score += 1
                prefix = prefix[len(edge.label):]
                #  print('extend', edge.label, prefix)
                break

            i = -1 
            min_iter = min(len(edge.label), len(prefix))
            for k in range(min_iter):
                if edge.label[k] != prefix[k]:
                    break
                i = k + 1

            if i == -1:
                #  print('no match')
                break
            # Special condition.
            new_edge = Edge(edge.label[:i])
            new_edge.node = Node()

            old_edge = copy.deepcopy(edge)
            old_edge.label = old_edge.label[i:]
            if old_edge.label != '':
                new_edge.node.edges.append(old_edge) 

            prefix = prefix[i:]
            if prefix != '':
                split_edge = Edge(prefix)
                new_edge.node.edges.append(split_edge) 
            #  print('removed {}, split {}, add {} and {}'.format(edge.label, edge.label[:i], edge.label[i:], prefix))

            for i, e in enumerate(traverse_node.edges):
                if e.label == edge.label:
                    #  print('equal', e.label, edge.label)
                    traverse_node.edges.pop(i)
                    break

            #  traverse_node.edges.remove(edge)
            traverse_node.edges.append(new_edge)
            next_edge = new_edge
        if next_edge is None:
            break
        if next_edge.node is None:
            next_edge.node = Node()
        traverse_node = next_edge.node

    if not prefix:
        return
    traverse_node.edges.append(Edge(prefix))


root = Node()
insert_iterative(root, 'a')
insert_iterative(root, 'a')
insert_iterative(root, 'ab')
insert_iterative(root, 'ac')
insert_iterative(root, 'abc')
insert_iterative(root, 'a')
insert_iterative(root, 'b')
insert_iterative(root, 'john')
insert_iterative(root, 'johns')
insert_iterative(root, 'jojo')
insert_iterative(root, 'johny')
insert_iterative(root, 'john doe')
insert_iterative(root, 'jessie')
root.info()
