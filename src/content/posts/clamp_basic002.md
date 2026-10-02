---
title: clamp_basic002
published: 2026-08-18
description: 'clamp is useful when you want to force a value into a valid range.'
image: ''
tags: [rust, clamp]
category: 'rust'
draft: false 
lang: ''
---

# link

- [Kernel에서 좋다. Overflow, Underflow 방지](../prevent_crashes_overflow_ub_invalid_memory_access/)


<hr />

# `clamp`

- Absolutely. In Rust, `clamp` is useful when you want to **force a value into a valid range**.
  - https://doc.rust-lang.org/stable/std/cmp/trait.Ord.html#method.clamp
  - https://doc.rust-lang.org/stable/std/primitive.f64.html#method.clamp

The basic form is:

```rust
value.clamp(min, max)
```

It means:

```text
if value < min  → min
if value > max  → max
otherwise       → value
```

### 1. Basic integer example

```rust
fn main() {
    let x = 75;

    let result = x.clamp(0, 100);

    println!("{result}");
}
```

Output:

```text
75
```

---

### 2. Value below the minimum

```rust
fn main() {
    let x = -10;

    let result = x.clamp(0, 100);

    println!("{result}");
}
```

Output:

```text
0
```

Visual:

```text
             clamp(0, 100)
                  │
                  ▼
-10 ──────────────┬──────────────────────────────
                  0             100
                  ▲
                  │
               result
```

---

### 3. Value above the maximum

```rust
fn main() {
    let x = 150;

    let result = x.clamp(0, 100);

    println!("{result}");
}
```

Output:

```text
100
```

So:

```text
x = 150

150
 │
 ▼
clamp(0, 100)
 │
 ▼
100
```

---

### 4. Clamping a floating-point value

`clamp` works with floating-point numbers too.

```rust
fn main() {
    let brightness = 1.5_f32;

    let brightness = brightness.clamp(0.0, 1.0);

    println!("{brightness}");
}
```

Output:

```text
1
```

This is common for graphics:

```rust
let r = r.clamp(0.0, 1.0);
let g = g.clamp(0.0, 1.0);
let b = b.clamp(0.0, 1.0);
```

---

### 5. Clamping a negative value

```rust
fn main() {
    let volume = -0.5_f32;

    let volume = volume.clamp(0.0, 1.0);

    println!("{volume}");
}
```

Output:

```text
0
```

This guarantees:

```text
0.0 <= volume <= 1.0
```

---

### 6. Using `clamp` before indexing an array

This is very similar to your H.264 code.

```rust
fn main() {
    let table = [10, 20, 30, 40, 50];

    let qp = 100;

    let index = qp.clamp(0, 4) as usize;

    println!("{}", table[index]);
}
```

Without `clamp`:

```rust
table[qp as usize]
```

could attempt:

```text
table[100]
```

which is out of bounds.

With:

```rust
qp.clamp(0, 4)
```

we guarantee:

```text
0 <= index <= 4
```

---

### 7. Your H.264 example

Your code:

```rust
self.chroma_qp[0] =
    CHROMA_QP8[(qp + off[0]).clamp(0, 51) as usize] as i32;
```

Let's break it down.

Suppose:

```rust
let qp = 50;
let offset = 5;
```

First:

```rust
qp + offset
```

becomes:

```text
50 + 5
  │
  ▼
55
```

Then:

```rust
55.clamp(0, 51)
```

becomes:

```text
51
```

Then:

```rust
as usize
```

becomes:

```text
51_usize
```

So the entire expression:

```rust
CHROMA_QP8[(qp + offset).clamp(0, 51) as usize]
```

is effectively:

```rust
CHROMA_QP8[51]
```

The purpose is to guarantee that the array index stays within:

```text
0 ─────────────────────────────── 51
▲                                  ▲
minimum                          maximum
```

---

### 8. Clamping after adding an offset

This is probably the most important pattern for your current code.

```rust
fn main() {
    let qp = 48;
    let offset = 10;

    let adjusted_qp = (qp + offset).clamp(0, 51);

    println!("QP = {adjusted_qp}");
}
```

Output:

```text
QP = 51
```

Try a negative offset:

```rust
fn main() {
    let qp = 3;
    let offset = -10;

    let adjusted_qp = (qp + offset).clamp(0, 51);

    println!("QP = {adjusted_qp}");
}
```

Output:

```text
QP = 0
```

So:

```text
QP + offset
       │
       ▼
  ┌─────────────┐
  │   clamp     │
  │   0 ..= 51  │
  └─────────────┘
       │
       ▼
valid QP
```

---

### 9. Clamping a struct field

You can also modify a value directly:

```rust
struct Player {
    health: i32,
}

fn main() {
    let mut player = Player { health: 150 };

    player.health = player.health.clamp(0, 100);

    println!("{}", player.health);
}
```

Output:

```text
100
```

This is useful for things like:

```rust
health
energy
volume
brightness
opacity
```

---

### 10. `clamp` with `min` and `max` variables

The bounds don't have to be literals.

```rust
fn main() {
    let min = 10;
    let max = 20;
    let value = 35;

    let result = value.clamp(min, max);

    println!("{result}");
}
```

Output:

```text
20
```

You can think of it as:

```rust
let result = value.clamp(min, max);
```

being conceptually equivalent to:

```rust
let result = if value < min {
    min
} else if value > max {
    max
} else {
    value
};
```

That's the key idea.

---

## A useful mental model

Remember:

```rust
x.clamp(min, max)
```

as:

```text
              min          max
               │            │
               ▼            ▼
───────────────●────────────●───────────────
       │       │            │       │
       │       │            │       │
      x<min    │   valid     │    x>max
       │       │   range     │       │
       ▼       │            │       ▼
      min ─────┴────────────┴───── max
```

Or simply:

```rust
-100.clamp(0, 10)  == 0
    5.clamp(0, 10)  == 5
   100.clamp(0, 10) == 10
```

- One important detail: the bounds must satisfy **`min <= max`**. For example:

```rust
10.clamp(20, 5)
```

- is invalid because the minimum is greater than the maximum.

- For your H.264 code, `clamp(0, 51)` is particularly appropriate because you're explicitly restricting the computed QP to the valid **0–51 range** before using it as an array index.

