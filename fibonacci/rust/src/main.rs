extern crate fibonacci;

use fibonacci::{fib, fib_dynamic};

fn main() {
    let n = 20;
    println!("got: {:?}", fib(n));
    println!("dynamic programming: {:?}", fib_dynamic(n));
}
