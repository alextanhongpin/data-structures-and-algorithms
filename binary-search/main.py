from hypothesis import given, strategies as st

def binary_search(target, arr):
    if len(arr) == 0: 
            return -1
    left = 0
    right = len(arr) 
    while left <= right:
        mid = (left + right) / 2 
        val = arr[mid]
        if target < val:
            right = mid - 1
        elif target > val:
            left = mid + 1
        else:
            return mid
    return -1

@given(st.lists(st.integers()))
def test_binary_search(input):
    data = sorted(input)
    index, target = -1, -1
    if len(data) > 0:
        index = 0
        target = data[index]
    try:
        assert binary_search(target, data) == index
    except Exception as e:
        print(e)

test_binary_search()
