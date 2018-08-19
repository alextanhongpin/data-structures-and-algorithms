import math

def main():
    X = [[1.0, 1.1], [1.0, 1.0], [0.0, 0.0], [0.0, 0.1]]
    y = ['A', 'A', 'B', 'B']

    targetX = [0,0]
    k = 2
    result = knn(X, y, targetX, k)
    print('nearest neighbour is', result)

def euclidean(p1, p2):
    return math.sqrt(pow(p1[0] - p2[0], 2) + pow(p1[1] - p2[1], 2))

def knn(X, y, targetX, k):
    # Calculate the distance between target and the current points
    distances = [(i, euclidean(targetX, x)) for i, x in enumerate(X)]

    # Sort the distance in increasing order - the shorter the distance, the
    # closer the neighbour
    sorted_distances = sorted(distances, key = lambda x: x[1])

    # Find the majority labels of the nearest k-neighbours
    result = {}
    for i, score in sorted_distances[:k]:
        result[y[i]] =  result.get(y[i], 0) + 1

    # Return the majority class of our prediction for targetX
    return sorted(result, key = lambda x: result[x])

main()
