REPLACE = 0
DELETE = 1
INSERT = 2

def minEditDistance(source, target):
    s, t = len(source), len(target)
    m = [None] * (s + 1)
    op = [None] * (s + 1)

    for i in range(s + 1):
        m[i] = [None] * (t + 1)
        op[i] = [-1] * (t + 1)

    for i in range(s + 1):
        m[i][0] = i
    for j in range(t + 1):
        m[0][j] = j

    # Compute scores.
    for i in range(1, s + 1):
        for j in range(1, t + 1):
            cost = 0 if source[i-1] == target[j-1] else 1

            replaceCost = m[i-1][j-1] + cost
            deleteCost = m[i-1][j] + 1
            insertCost = m[i][j-1] + 1 

            costs = [replaceCost, deleteCost, insertCost]

            m[i][j] = min(costs)
            op[i][j] = costs.index(m[i][j])

    ops = []
    i, j = s, t
    while i != 0 and j != 0:
        if op[i][j] == DELETE or j == 0:
            ops.append('remove {}-th char {} of {}'.format(i, source[i-1], source))
            i = i - 1
        if op[i][j] == INSERT or i == 0:
            ops.append('insert {}-th char {} of {}'.format(j, target[j-1], target))
            j = j - 1
        else:
            if m[i-1][j-1] < m[i][j]:
                fmt='replace {}-th char of {} ({}) with {}'
                ops.append(fmt.format(i, source, source[i-1], target[j-1]))
            i, j = i - 1, j - 1
    return m[i][j], reversed(ops)

score, ops = minEditDistance('kitten', 'sitting')
print('score is ', score)
for o in ops:
    print(o)
