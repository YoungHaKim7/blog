---
title: 240702_shift_training
published: 2024-07-02
description: 'shift training'
image: ''
tags: [rust, algorithms, shift, std, traits]
category: 'rust_algorithms'
draft: false 
lang: ''
---

# link

- [rust code(shift)](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/003_Algorithms/002_shift_operator)
- [rust 공식문서Doc(Shift연산)trait.Shl](https://doc.rust-lang.org/stable/std/ops/trait.Shl.html)

<hr />

# shift001(0 index를 삭제하기)

```rs
use std::ops::Shl;

// Newtype wrapper to enable Shl implementation
struct ShiftVec<T>(Vec<T>);

impl<T: Copy> Shl<usize> for ShiftVec<T> {
    type Output = ShiftVec<T>;

    fn shl(mut self, rhs: usize) -> Self::Output {
        // Left shift: remove elements from front
        for _ in 0..rhs {
            if !self.0.is_empty() {
                self.0.remove(0);
            }
        }
        self
    }
}

fn main() {
    let my_arr = ShiftVec(vec![1, 2, 3, 4, 5]);
    println!("before arr : {:?}", my_arr.0);

    let res = my_arr << 1;

    println!("after arr  : {:?}", res.0);
}
```

- result

```bash
before arr : [1, 2, 3, 4, 5]
after arr  : [2, 3, 4, 5]
```

# shift002(0 index에 0추가하기)

```rs
use std::ops::Shl;

// Newtype wrapper to enable Shl implementation
struct ShiftVec<T>(Vec<T>);

impl<T: Copy + Default> Shl<usize> for ShiftVec<T> {
    type Output = ShiftVec<T>;

    fn shl(mut self, rhs: usize) -> Self::Output {
        // Left shift: add zeros to front (push_front)
        for _ in 0..rhs {
            // insert 0 at the beginning (push_front equivalent)
            self.0.insert(0, T::default());
        }
        self
    }
}

fn main() {
    let my_arr = ShiftVec(vec![1i32, 2, 3, 4, 5]);
    println!("before arr : {:?}", my_arr.0);

    let res = my_arr << 1;

    println!("after arr  : {:?}", res.0);
}
```

- result

```bash
before arr : [1, 2, 3, 4, 5]
after arr  : [0, 1, 2, 3, 4, 5]
```

