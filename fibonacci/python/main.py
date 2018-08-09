def fib(n):
	if n == 0:
		return 0
	if n == 1 or n == 2:
		return 1
	return fib(n - 2) + fib(n - 1)

def fib_dynamic(n):
	table = [0] * (n + 1)
	table[0] = 0
	table[1] = 1
	table[2] = 1

	for i in range(2, n + 1):
		table[i] = table[i - 2] + table[i - 1]

	return table[n]

	
