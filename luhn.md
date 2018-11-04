# Luhn algorithm

Can be used to generate credit card numbers.

```js
func calcChecksum(s) {
  let r = s.split('').reverse()
  let sum = 0
  for (let i = 0; i < r.length; i += 1) {
    let n = Number(r[i])
    if (i % 2 === 0) {
      n = n * 2
      n = n > 9 ? n - 9 : n
    }
    sum += n
  }
  return sum * 9 % 10
}

assert(calcChecksum('7992739871') == 3)
```

In Rust:

```rust
fn main() {
    let num: String = "7992739871".to_string();
    println!("checksum digit is {:?}", calc_luhn_checksum(num));
}

fn calc_luhn_checksum(num: String) -> u32 {
    // To reverse a string, convert it to chars first, then reverse it and 
    // collect it back as a string.
    let rev = num.chars().rev().collect::<String>();

    // You can't iterate through strings in rust. You need to convert it into
    // integers first.
    let mut i = 0;
    let mut sum = 0;
    for c in rev.chars() {
        // Converts character to digit.
        let n = c.to_digit(10).unwrap();
        let out = match i%2 {
            // Even
            0 => {
                // Multiply by 2, if the resulting number is greater than 9, 
                // subtract 9 from it.
                let mut n = n * 2;
                if n > 9 {
                    n = n - 9;
                }
                n
            },
            // Odd
            _ => n
        };
        sum += out;
        i+=1;
    }
    return sum * 9 % 10;
}
```

## References
https://en.wikipedia.org/wiki/Luhn_algorithm


