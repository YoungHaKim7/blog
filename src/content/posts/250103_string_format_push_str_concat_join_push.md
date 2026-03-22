---
title: 250103_string_format_push_str_concat_join_push
published: 2025-01-03
description: ' String Method `format!`, `+`, `push_str`, `push`, `concat`, `join`'
image: ''
tags: [rust, std, join, concat, join, format]
category: 'rust'
draft: false 
lang: ''
---

# link

<hr />

# ✅ Summary

| Method     | Moves? | Mutable? | Recommended          |
| ---------- | ------ | -------- | -------------------- |
| `+`        | yes    | no       | sometimes            |
| `format!`  | no     | no       | ⭐ best              |
| `push_str` | no     | yes      | ⭐ best for struct   |
| `push`     | no     | yes      | char only            |
| `concat()` | no     | no       | slice                |
| `join()`   | no     | no       | slice with separator |


# There are several ways to concatenate strings

- In Rust, there are several ways to concatenate strings, and each one works a little differently because of ownership rules.

- Here are the main ways with clear examples.

## 1. Using `+` operator (moves left side)


```rs
fn main() {
    let a = String::from("young");
    let b = String::from("ha");

    let c = a + &b;

    println!("{c}");
}
```

- Output

```bash
youngha
```

:::important
`a` is moved
:::

```rs
let c = a + &b;
```

- is actually:

```rs
String::add(a, &b)
```

- So after this, `a` cannot be used.

## 2. Using `format!` (safe, no move)

- Best general method.

```rs
fn main() {
    let a = String::from("young");
    let b = String::from("ha");

    let c = format!("{}{}", a, b);

    println!("{c}");
    println!("{a}");
    println!("{b}");
}
```

- Output

```bash
youngha
young
ha
```

- ✔ does not move
- ✔ easiest
- ✔ recommended

## 3. Using `push_str` (modify existing string)

- Best when mutating struct / variable.

```rs
fn main() {
    let mut a = String::from("young");

    a.push_str("ha");

    println!("{a}");
}
```

- Output

```bash
youngha
```

# 4. Using `push` (single char)

```rs
fn main() {
    let mut a = String::from("young");

    a.push('!');

    println!("{a}");
}
```

- Output

```bash
young!
```

## 5. Using `concat()` (slice of strings)


```rs
fn main() {
    let a = "young";
    let b = "ha";
    let c = "kim";

    let s = [a, b, c].concat();

    println!("{s}");
}
```

- Output

```bash
younghakim
```

## 6. Using `join()`

```rs
fn main() {
    let parts = ["young", "ha", "kim"];

    let s = parts.join("-");

    println!("{s}");
}
```

- Output

```bash
young-ha-kim
```
