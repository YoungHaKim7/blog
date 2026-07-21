---
title: 260202_fold_sum_product_compare
published: 2026-02-02
description: 'Compare `fold()` & `sum()` & `product()` (Rust lang)'
image: ''
tags: [optimization, FunctionalProgramming, FP, fold, sum, product]
category: 'zFP_FunctionalProgramming'
draft: false 
lang: ''
---

# link

- [다른 글 보기 fold() 자세히 정리 & `fold()`의 장점. fold_advantage](../260201_fold_advantage/)

<hr />

# Here's a comparison of the three iterator reduction methods in Rust:

| Function        | Purpose                                                 | When to Use                                                              | Return Type                                                         | Example                            |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- | ---------------------------------- |
| `fold(init, f)` | Reduce an iterator using a custom accumulator function. | When you need custom logic, multiple values, or a different output type. | **Any type `B`** (chosen by you)                                    | `iter.fold(0, \|acc, x\| acc + x)` |
| `sum()`         | Add all elements together.                              | When you simply want the total of numeric values.                        | A type implementing `std::iter::Sum` (usually the element type)     | `iter.sum::<i32>()`                |
| `product()`     | Multiply all elements together.                         | When you want the product of numeric values.                             | A type implementing `std::iter::Product` (usually the element type) | `iter.product::<i32>()`            |


## Return type examples

| Input Iterator          | `fold()`                                                                | `sum()`                   | `product()`               |
| ----------------------- | ----------------------------------------------------------------------- | ------------------------- | ------------------------- |
| `Iterator<Item = i32>`  | `i32`, `f64`, `String`, `(i32, usize)`, `Vec<_>`, `HashMap<_, _>`, etc. | `i32`, `i64`, `f64`, etc. | `i32`, `i64`, `f64`, etc. |
| `Iterator<Item = &str>` | `String` (concatenation), `usize` (count bytes), etc.                   | ❌ Not supported           | ❌ Not supported           |

# Which one should I choose?

| If you want to...                                          | Use         |
| ---------------------------------------------------------- | ----------- |
| Add all values                                             | `sum()`     |
| Multiply all values                                        | `product()` |
| Count while summing                                        | `fold()`    |
| Compute an average (sum and count together)                | `fold()`    |
| Build a `String`                                           | `fold()`    |
| Build a `Vec`, `HashMap`, or custom struct                 | `fold()`    |
| Return a completely different type than the iterator items | `fold()`    |

## Rule of thumb

- Use `sum()` when your intent is "add everything."
- Use `product()` when your intent is "multiply everything."
- Use `fold()` when the computation is anything more general than summing or multiplying, or when the accumulator/result type differs from the iterator's item type. `fold()` is the most flexible because it can return any type you define through its initial accumulator and closure.


# `fold()` Examples

- `fold()` → Any return type

```rs
let nums = [1, 2, 3, 4];

let result: (i32, usize) = nums.iter().fold((0, 0), |(sum, count), &x| {
    (sum + x, count + 1)
});
```

- Returns:

```rs
(i32, usize)
```

# `sum()`

```rs
let nums = [1, 2, 3, 4];

let sum: i32 = nums.iter().sum();
```

- Returns:

```rs
i32
```

# `product()`

```rs
let nums = [1, 2, 3, 4];

let product: i32 = nums.iter().product();
```

- Returns:

```rs
i32
```


