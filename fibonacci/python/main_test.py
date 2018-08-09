import unittest

from main import fib, fib_dynamic

class TestFib(unittest.TestCase):
	
	def test_fib(self):
		self.assertEqual(5, fib(5))

	def test_fib_dynamic(self):
		self.assertEqual(5, fib_dynamic(5))

if __name__ == '__main__':
	import timeit

	# Benchmark
	print(timeit.timeit("fib(10)", setup="from __main__ import fib"))
	print(timeit.timeit("fib_dynamic(10)", setup="from __main__ import fib_dynamic"))

	unittest.main()
