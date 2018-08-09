import unittest
from fib import fib_dynamic, fibo

suite "testing fibonnaci":
  echo "setting up fibonacci test"
  setup:
    echo "run before each test"

  teardown:
    echo "run before each test"

  test "fib()":
    check(fibo(5) == 5)

  test "fib_dynamic()":
    check(fib_dynamic(5) == 5)

  echo "suite teardown: run once after the tests"
  