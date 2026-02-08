---
title: 240701_for_all_vs_for_some
published: 2024-07-01
description: 'Rust로 수학 (for all & for some 연습)'
image: ''
tags: [rust, std, math, science]
category: 'rust_Math_Science'
draft: false 
lang: ''
---

# link
- [Rem(remainder) trait(The remainder operator %.)](https://doc.rust-lang.org/stable/std/ops/trait.Rem.html)

<hr />

# 1. The core idea (logic symbols)[|🔝|](#link)

| English phrase | Logical quantifier | Symbol |
| -------------- | ------------------ | ------ |
| **for some**   | existential        | `∃`    |
| **for all**    | universal          | `∀`    |

# 2. Formal mathematical meaning[|🔝|](#link)

- 🔹 “For some”

> There exists at least one element that satisfies the condition.

$$
\exists_x \in X \ P(x)
$$

- 🔹 “For all”

> Every element must satisfy the condition.

$$
\forall_x \in X \ P(x)
$$


# 3. Programming intuition (Rust-style)[|🔝|](#link)

## For some → `any()`

```rs
let exists = xs.iter().any(|x| x % 2 == 0);
```

```bash
Stop early on FIRST true
```

## For all → `all()`

```rs
let all = xs.iter().all(|x| x % 2 == 0);
```

```bash
Stop early on FIRST false

```

# 4. Rust 코드로 실습[|🔝|](#link)

```rs
use std::ops::Rem;

fn for_some<T>(x: &[T]) -> bool
where
    T: Copy + Rem<T, Output = T> + PartialEq<T> + From<u8>,
{
    if x.iter().any(|xi| *xi % T::from(2) == T::from(0)) {
        true
    } else {
        false
    }
}

fn for_all<T>(x: &[T]) -> bool
where
    T: Copy + Rem<T, Output = T> + PartialEq<T> + From<u8>,
{
    if x.iter().all(|xi| *xi % T::from(2) == T::from(0)) {
        true
    } else {
        false
    }
}

fn main() {
    let a = vec![1, 2, 3, 4, 5];
    let b = vec![1, 2, 3, 4, 5];
    let is_some = for_some(&a);
    println!("a is some : {is_some}");
    let is_all = for_all(&b);
    println!("b is all : {is_all}");
}
```

- result

```bash

a is some : true
b is all : false
```

