# Luhn algorithm

Can be used to generate credit card numbers.

```js
// Write JavaScript here and press Ctrl+Enter to execute
function luhn(s) {
	let r = s.split("").map(Number)
  let sum = 0
  for (let i = r.length-1; i > -1; i--  ) {
    let n = r[i]
    // If it is even number. Alternative, i % 2 === 1 will give the same result.
    if (i & 1 === 1) {
      n = n * 2
      n = n > 9 ? n - 9 : n
    }
    sum += n
  }
  return sum
}

function luhnFunctional(s) {
	let r = s.split("").map(Number)
  let even = r
  	.filter((_, i) => i % 2 === 1)
  	.map(i => i * 2)
    .map(i => i > 9 ? i - 9 : i)
  let odd = r.filter((_, i) => i % 2 === 0)
  return [...even, ...odd].reduce((acc, i) => acc + i, 0)
}

function verifyChecksum (s) {
	return luhn(s) % 10 === 0
}

function calculateChecksum(s) {
  return luhn(s) * 9 % 10
}

let s = "7992739871"
console.log("checksum digit", calculateChecksum(s))
console.log("valid checksum", verifyChecksum(s + calculateChecksum(s)))

console.log("luhn functional", luhnFunctional(s))
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


