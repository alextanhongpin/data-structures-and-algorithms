import math

def main():
    dataset = [[1, 1, 'yes'],
               [1, 1, 'yes'],
               [1, 0, 'no'],
               [0, 1, 'no'],
               [0, 1, 'no']]
    labels = ['can survive without coming to surface', 'has flippers']
    e = entropy(dataset)
    # print('entropy', e)

    # Split dataset at column axis 1, where the value is equal 1
    # print(split_dataset(dataset, 0, 1))
    # print(split_at_best_feature(dataset))
    tree = create_tree(dataset, labels)
    print(tree)

# Entropy is the expected value of the information
def entropy(dataset):
    n = len(dataset)
    labels = {}

    for row in dataset:
        x = row[-1]
        if x not in labels.keys():
            labels[x] = 0
        labels[x] += 1

    e = 0.0
    for i in labels:
        p = labels[i] / n
        e -= p * math.log(p, 2)
    return e

def split_dataset(dataset, axis, value):
    new_dataset = []
    for row in dataset:
        if row[axis] == value:
            x = row[:axis]
            x.extend(row[axis+1:])
            new_dataset.append(x)
    return new_dataset

def split_at_best_feature(dataset):
    n = len(dataset[0]) - 1 # Number of features, - 1 because the last item is the label
    e = entropy(dataset) # Base entropy
    big = 0 # Best information gain
    y = -1 # Best feature

    for i in range(n):
        X = [x[i] for x in dataset]
        X = set(X)
        e_x = 0.0 # New entropy
        for x in X:
            sub_dataset = split_dataset(dataset, i, x)
            p = len(sub_dataset) / len(dataset)
            e_x += p * entropy(sub_dataset)
        ig = e - e_x
        if ig > big:
            big = ig
            y = i
    return y

def majority(y):
    c = {}
    for v in y:
        if v not in c.keys():
            c[v] = 0
        c[v] += 1
    c_sorted = sorted(c.iteritems(), key = lambda x: x[1], reverse = True)
    return c_sorted[0][0]

def create_tree(dataset, labels):
    y = [row[-1] for row in dataset]
    if y.count(y[0]) == len(y):
        return y[0]

    if len(dataset[0]) == 1:
        return majority(y)

    best_x = split_at_best_feature(dataset)
    best_y = labels[best_x]
    tree = {best_y: {}}
    del(labels[best_x])

    X = [row[best_x] for row in dataset]
    X = set(X)
    for x in X:
        sublabels = labels[:]
        tree[best_y][x] = create_tree(split_dataset(dataset, best_x, x), sublabels)
    return tree

main()
