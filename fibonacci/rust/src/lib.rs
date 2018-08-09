#![feature(test)]

extern crate test;

pub fn fib(n: i32) -> i32 {
  match n {
    0 => 0,
    1 | 2 => 1,
    _ => fib(n - 2) + fib(n - 1),
  }
}

pub fn fib_if_else(n: i32) -> i32 {
  if n == 0 {
    return 0;
  }
  if n == 1 || n == 2 {
    return 1;
  }
  return fib(n - 2) + fib(n - 1);
}

pub fn fib_dynamic(n: i32) -> i32 {
  let mut table: Vec<i32> = vec![0; (n + 1) as usize];

  table[0] = 0;
  table[1] = 1;
  table[2] = 1;

  for i in 3..=n {
    let i = i as usize;
    table[i] = table[i - 2] + table[i - 1]
  }

  return table[n as usize];
}

#[cfg(test)]
mod tests {
  use super::*;
  use test::Bencher;

  #[test]
  fn test_fib() {
    assert_eq!(fib(5), 5);
  }

  #[bench]
  fn bench_fib(b: &mut Bencher) {
    b.iter(|| fib(20));
  }

  #[bench]
  fn bench_fib_if_else(b: &mut Bencher) {
    b.iter(|| fib_if_else(20));
  }

  #[bench]
  fn bench_fib_dynamic(b: &mut Bencher) {
    b.iter(|| fib_dynamic(20));
  }
}
