---
title: 260108_traits05_iterator_reduce_fold
published: 2026-01-08
description: 'traits의 Iterator 기능 중 fold와 reduce를 알아보자 & Iterator 활용'
image: ''
tags: [rust, traits, std]
category: 'rust'
draft: false 
lang: ''
---

# link

# Summary
- traits의 Iterator 기능 중 fold와 reduce를 알아보자 & Iterator 활용

# trait.Iterator
- https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html

# array.map

- https://doc.rust-lang.org/stable/std/primitive.array.html#method.map

# `fold` & `reduce` 활용
- https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.fold
- https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.reduce

- 둘다 타입 변환 가능
  - `fold`는 리턴값이 직접 값이 나온다
    - `fold` - Uses `*x` as `u32` to cast each `&i32` to `u32` before adding
    - 접기 - `*x`를 `u32`로 사용하여 각 `&i32`를 `u32`로 캐스팅한 후 추가합니다
  - `reduce`는 `Option<T>`가 나옴
    - `reduce` - First maps `i32` to `u32`, then reduces (returns `Option`)
    - 축소 - 먼저 `i32`를 `u32`로 매핑한 다음 축소((옵션)`Option` 반환)합니다

⏺ Fixed. The key difference between fold and reduce for type conversion:

|Method|Initial Value|Return Type |Use Case|
|-|-|-|-|
|fold|Required (specifies output type)|Direct value|When you want to control the accumulator type<br />누산기 유형을 제어하고 싶을 때|
|reduce|Not needed|`Option<T>`|When the iterator may be empty, type inferred from elements <br />반복자가 비어 있을 수 있는 경우 요소에서 추론된 유형을 입력합니다|

  Summary of changes:
  - Line 82: fold - Uses *x as u32 to cast each &i32 to u32 before adding
  - Line 86: reduce - First maps i32 to u32, then reduces (returns Option<u32>)

- [Rust code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/004_FP_Functional_Programming/a01_arrays)

```rs
let my_arr: [i32, 4] = [10, 20, 30, 40];

// Fold : Reduce to single value (i32 -> u32 conversion)
let my_fold_arr: u32 = my_arr
                        .iter()
                        .fold(0u32, |acc, x| acc + *x as u32);

println!("arr fold (i32->u32) :{my_fold_arr}");

// Reduce : Alternative without initial value (returns Option)
let my_reduce_arr: Option<u32> = my_arr
                                    .iter()
                                    .map(|x| *x as u32)
                                    .reduce(|acc, x| acc + x);

println!("arr reduce (i32->u32) :{my_reduce_arr:?}");
```

- result

```bash
arr fold (i32->u32) :100
arr reduce (i32->u32) :Some(100)
```


# Iterator추가

```rs
trait MySumExt: Sized {
    fn my_sum(self) -> i32;
    fn my_product(self) -> i32;
}

// impl<T: Iterator<Item = i32>> MySumExt for T
impl<T> MySumExt for T
where
    T: Iterator<Item = i32>,
{
    fn my_sum(self) -> i32 {
        let mut total = 0;
        for num in self {
            total += num;
        }
        total
    }

    fn my_product(self) -> i32 {
        let mut my_total = 1;
        for num in self {
            my_total *= num;
        }
        my_total
    }
}

fn main() {
    let my_arr = [10, 20, 30, 40];

    // my_sum()  custom method
    let sum_arr: i32 = my_arr.iter().copied().my_sum();

    // my_fn  "my_product"
    let my_product_arr = my_arr.iter().copied().my_product();
    println!("arr product :{my_product_arr:?}");
```

