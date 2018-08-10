#![feature(test)]

use std::collections::HashMap;

extern crate test;

pub fn fib(n: usize) -> u64 {
  match n {
    0 | 1 => n as u64,
    _ => fib(n - 2) + fib(n - 1),
  }
}

pub fn fib_if_else(n: usize) -> u64 {
  if n == 0 || n == 1 {
    return n as u64;
  }
  return fib(n - 2) + fib(n - 1);
}

pub fn fib_hashmap(n: usize, mut table: HashMap<usize, u64>) -> u64 {
  match n {
    0 | 1 => {
      table.entry(n).or_insert(n as u64);
      // n as u64
      *table.get(&n).unwrap()
    },
    _ => match table.get(&n) {
      Some(&v) => v,
      None => {
        let n1 = n - 1;
        let n2 = n - 2;
        let n1 = *table.get(&n1).unwrap();
        let n2 = *table.get(&n2).unwrap();
        table.entry(n).or_insert(n1 + n2);
        *table.get(&n).unwrap()
      }
    }
  }
}


pub fn fib_dynamic(n: usize) -> u64 {
  let mut table: Vec<u64> = vec![0; n + 1];

  table[0] = 0;
  table[1] = 1;

  for i in 2..=n {
    table[i] = table[i - 2] + table[i - 1]
  }

  return table[n];
}

#[cfg(test)]
mod tests {
  use super::*;
  use test::Bencher;

  #[test]
  fn test_fib() {
    assert_eq!(fib(5), 5);
  }

  #[test]
  fn test_fib_if_else() {
    assert_eq!(fib_if_else(5), 5);
  }

  #[test]
  fn test_fib_dynamic() {
    assert_eq!(fib_dynamic(5), 5);
  }

  #[test]
  fn test_fib_hashmap() {
    let table = HashMap::new();
    assert_eq!(fib_hashmap(5, table), 5);
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
