---
title: 240604_Generics_basic01
published: 2024-06-04
description: '제네릭을 써야하는 이유. generic simple) We use generics to create definitions for items like function signatures or structs, which we can then use with many different concrete data types. '
image: ''
tags: [rust, generics, std]
category: 'rust'
draft: false 
lang: ''
---

# link

<hr />

# Generic Data Types
- We use generics to create definitions for items like function signatures or structs, which we can then use with many different concrete data types. Let’s first look at how to define functions, structs, enums, and methods using generics. Then, we’ll discuss how generics affect code performance.
- https://doc.rust-lang.org/book/ch10-01-syntax.html
- 일반 데이터 유형
  - 우리는 제네릭을 사용하여 함수 서명이나 구조와 같은 항목에 대한 정의를 만들고, 이를 다양한 구체적인 데이터 유형과 함께 사용할 수 있습니다. 먼저 제네릭을 사용하여 함수, 구조, 에넘, 메서드를 정의하는 방법을 살펴보겠습니다. 그런 다음 제네릭이 코드 성능에 미치는 영향에 대해 논의하겠습니다.

# Generic을 써야하는 이유

- 내가 젤 싫어하는게 비슷한 코드 반복 작업을 해야한다는 거~  귀찮다  많이~~
  -  이 미친짓을 할수 없다  해서 나온게 Generic

```rs
fn add(x: i32, y: i32) -> i32 {
    x + y
}

fn add_f64(x: f64, y: f64) -> f64 {
    x + y
}

fn main() {
    add(2, 2);
    add_f64(4.98, 6.90);
}
```

## 한번에 해결~~ Generic만세

- type마다 똑같은걸 만들수 없다.  뭐 매크로를 만들어서 해결할수 있다.
  - 일단 Generic으로 해결해 보자.

```rs
// fn add<T: std::ops::Add<Output = T>>(x: T, y: T) -> T
fn add<T>(x: T, y: T) -> T
where
    T: std::ops::Add<Output = T>,
{
    x + y
}
fn main() {
    add(2, 2);
    add(2.666, 3.001);
}
```

# 같이 보면 좋은글

- [Generics 쓰는 고급기술, Associated type, 여러개의 제네릭을 섞어보기](../260110_gats_mixing_multipletypes001/)
- [GATs(Generic_Associated Types알아보기)](../260111_gats_generic_associated_types/)

- Generics기초
  - [easy rust | 한글판 모아보기Easy Rust Korean / Rust in a Month of Lunches 한국어판
| mithradates](https://youtube.com/playlist?list=PLfllocyHVgsSJf1zO6k6o3SX2mbZjAqYE&si=W8KuizJ5a1bzUfCw)
    - [044 Easy Rust in Korean: Generics](https://youtu.be/o4Hqyfjxtco?si=hkLEqzzSGfw--3UX)
  - [easy rust | 영문판 모아보기(Eng.)Easy Rust / Rust in a Month of Lunches: bite-sized Rust tutorials)](https://youtube.com/playlist?list=PLfllocyHVgsRwLkTAhG0E-2QxCf-ozBkk&si=UE-rL-CzwaM_5g3y)
