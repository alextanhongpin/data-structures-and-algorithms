import tables
# Proc name cannot be the same as the module?
proc fibo*(n: int): int64 =
  case n
  of 0: int64(0)
  of 1, 2: 1
  else: fibo(n - 2) + fibo(n - 1)

proc fib_dynamic*(n: int): uint64 =
  var table = {
    0: uint64(0),
    1: uint64(1),
  }.toTable
  # var table: seq[int64]
  # setlen(table, n + 1)
  # echo table, len(table)
  # Either newSeq(seq[string], 3) 
  # Or s = @[]; setlen(s, len)
  # table[0] = 0
  # table[1] = 1

  for i in 2..n:
    table[i] = table[i - 2] + table[i - 1]

  result = table[n]

# NOTE: This will also be executed in the test file
proc main(): void =
  echo fibo(10)
  echo fib_dynamic(100)

main()

