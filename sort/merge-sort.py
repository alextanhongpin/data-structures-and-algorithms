def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    M = len(arr) / 2
    L = arr[0:M]
    R = arr[M:]

    return merge(merge_sort(L), merge_sort(R))

def merge(left, right):
    result = []
    l, r = 0, 0
    while l < len(left) and r < len(right):
        if left[l] <= right[r]:
            result.append(left[l])
            l += 1
        else:
            result.append(right[r])
            r += 1
    result.extend(left[l:])
    result.extend(right[r:])
    return result

data = [12,3,1,3,4,1,2,6,8,23,4,90,4,-3,4]
result = merge_sort(data)
print(data, result, len(data) == len(result))

print(merge_sort([]))
print(merge_sort([1,-100]))
print(merge_sort([3,2,1]))

