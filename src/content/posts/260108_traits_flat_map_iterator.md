---
title: 260108_traits_flat_map_iterator
published: 2026-01-08
description: 'Rust traits.Iterator) Let_s learn more about flat_map'
image: ''
tags: [rust, traits, iterator, flat_map, std]
category: 'rust'
draft: false 
lang: ''
---

# link

<hr />

# flat_map자세히 이해하기[|🔝|](#link)
- https://doc.rust-lang.org/stable/std/iter/trait.Iterator.html#method.flat_map

```rs
let cartesian: Vec<(i32, i32)> = (1..=3)
                            .flat_map(|x| (10..=12)
                            .map(move |y| (x, y)))
                            .collect();

println!("{cartesian:?}");
```

# Line-by-Line Explanation[|🔝|](#link)


```rs
let cartesian: Vec<(i32, i32)> =
```

- Declares a variable named cartesian

- Its type is a vector of tuples:

```rs
Vec<(i32, i32)>
```

# Outer Range Iterator[|🔝|](#link)

```rs
(1..=3)
```

```rs
std::ops::RangeInclusive<i32>
```

# `flat_map`[|🔝|](#link)

```rs
.flat_map(|x| ...)
```

# What `flat_map` does[|🔝|](#link)

- Takes each element x
- Maps it to another iterator
- Flattens all produced iterators into one sequence
  - 각 요소 x를 취합니다
  - 다른 반복기에 매핑합니다
  - 플랫텐은 모두 하나의 시퀀스로 생성된 반복자입니다

# Signature (simplified):[|🔝|](#link)

```rs
fn flat_map<U, F>(self, f: F) -> FlatMap<Self, U, F>
where
    Self: FnMut(Self::Item) -> I,
    U: IntoIterator
    F: FnMut(Self::Item) -> U,
```

# Key idea:[|🔝|](#link)

- `map` → nested iterators(중첩 반복자)
- `flat_map` → single flattened iterator(단일 평탄 반복기)

# Inner `map`[|🔝|](#link)


```rs
.map(move |y| (x, y))
```

```bash
(1,10), (1,11), (1,12)
```

- What happens here:
  - For each `x`, we map over `y`
  - For each `y`, we produce a tuple `(x, y)`
    - 각 `x`에 대해 `y` 위에 매핑합니다
    - 각 `y`에 대해 튜플 `(x, y)`를 생성합니다

# Why `move` Is Needed[|🔝|](#link)
- 오너쉽 문제 때문 ㅠㅠ

```rs
move |y| (x, y)
```

- `x` comes from the outer closure
- The inner closure may outlive the outer closure
- move copies `x` into the inner closure
  - 'x'는 외부 폐쇄에서 나옵니다
  - 내부 폐쇄는 외부 폐쇄보다 오래 지속될 수 있습니다
  - 복사본 'x'를 내부 클로저로 이동합니다.

- Since `i32` is `Copy`, this is:
  - Zero cost
  - Required by the borrow checker

# Without move ❌:[|🔝|](#link)

```bash
borrowed value does not live long enough
```

#  Flattening in Action

- Each `x` produces an iterator:

|x|	produced iterator|
|-|-|
|1|	(1,10),(1,11),(1,12)|
|2|	(2,10),(2,11),(2,12)|
|3|	(3,10),(3,11),(3,12)|

# 마무리는 `collect()`[|🔝|](#link)
- `.collect()`;


- Consumes the iterator
- Allocates a `Vec<(i32, i32)>`
- Stores all produced values
  - 반복기를 소모합니다
  - `Vec<(i32, i32)>`를 할당합니다
  - 생산된 모든 가치를 저장합니다


- Type inference uses:

```rs
Vec<(i32, i32)>
```

# 🧠 Mental Model원조는 역시 하스켈 코드이다.ㅋ[|🔝|](#link)
- Equivalent Haskell Code
- 역시 원조는 하스켈 코드
```hs
[(x, y) | x <- [1..3], y <- [10..12]]
```

- Rust Iterator Pipeline 
  - 마무리

```rs
(1..=3)
    .flat_map(|x|
        (10..=12).map(move |y| (x, y))
    )
```

# 🧩 Why This Is Powerful[|🔝|](#link)

- Zero intermediate allocations
- Lazy evaluation
- Compile-time checked
- Parallelizable
- Equivalent to nested loops, but functional

# 🧩 이것이 강력한 이유[|🔝|](#link)

- 중간 할당 없음
- 게으른 평가
- 컴파일 시간 확인
- 병렬화 가능
- 중첩 루프와 동등하지만 기능적


# ✅ Rewritten Using fold[|🔝|](#link)

```rs
fn main() {
    let cartesian: Vec<(i32, i32)> = (1..=3)
              .fold(Vec::new(), |mut acc, x| {
                  for y in 10..=12 {
                      acc.push((x, y));
                  }
                  acc
              });

    println!("{cartesian:?}");
}
```


# 비슷한 글[|🔝|](#link)
- [traits의 Iterator 기능 중 fold & reduce 알아보기](https://younghakim7.github.io/blog/posts/260108_traits05_iterator_reduce_fold/)

<br />

<hr />

<p align="center">
  <img width=35px src="https://user-images.githubusercontent.com/67513038/204034727-e2a992fc-6392-4dc4-8846-843f0c1a31c9.png" />
</p>


<hr />

# Haskell로 코드를 바꿔보자.[|🔝|](#link)

- 🐦 Equivalent Haskell Code
  - ✅ Most Direct (List Comprehension)
```hs
[(x, y) | x <- [1..3], y <- [10..12]]
```


- This is the closest semantic equivalent.

- ✅ Explicit concatMap Version (matches flat_map)

```hs
concatMap (\x -> map (\y -> (x, y)) [10..12]) [1..3]
```

```hs
main :: IO ()
main = do
  let result = concatMap (\x -> map (\y -> (x, y)) [10..12]) [1..3]
  print result
```

- ✅ Fully Desugared Functional Version

```hs
foldr (\x acc -> map (\y -> (x, y)) [10..12] ++ acc) [] [1..3]
```

```hs
main :: IO ()
main = do
  let result = foldr (\x acc -> map (\y -> (x, y)) [10..12] ++ acc) [] [1..3]
  print result
```

# 🔍 Line-by-Line Correspondence[|🔝|](#link)

|Rust|	Haskell|
|-|-|
| (1..=3)|	[1..3]|
| `flat_map`|		`concatMap`|
| `map`	|	`map`|
| `move`	|	implicit closure capture|
| `(x, y)`	|	`(x, y)`|
| iterator	|	list |


# 🧠 Conceptual Mapping[|🔝|](#link)
- Rust
  - Iterators are lazy
  - `flat_map` produces an iterator of iterators and flattens them
  - move explicitly captures `x`
    - 반복자는 게으릅니다
    - `flat_map`은 반복자의 반복자를 생성하여 평평하게 만듭니다
    - 이동은 `x`를 명시적으로 캡처합니다

- Haskell

  - Lists are lazy by default
  - concatMap does exactly what flat_map does
  - Closures capture automatically
    - 목록은 기본적으로 게으릅니다
    - concatMap은 flat_map이 하는 일을 정확히 수행합니다
    - 폐쇄는 자동으로 캡처됩니다

