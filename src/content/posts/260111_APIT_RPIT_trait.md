---
title: 260111_APIT_RPIT_trait
published: 2026-01-11
description: 'APIT is caller-chosen generics; RPIT is callee-chosen opaque types.'
image: ''
tags: [rust, APIT, RPIT, traits, std]
category: 'rust'
draft: false 
lang: ''
---

# link

- [Summary](#summary)
- [APIT vs RPIT in Rust](#apit-vs-rpit-in-rust)
  - [1️⃣ APIT — Argument-Position `impl Trait`](#1%EF%B8%8F⃣-apit--argument-position-impl-trait)
  - [2️⃣ RPIT — Return-Position `impl Trait`](#2%EF%B8%8F⃣-rpit--return-position-impl-trait)
  - [3️⃣ APIT vs RPIT — Side-by-Side(표로 비교)](#3%EF%B8%8F⃣-apit-vs-rpit--side-by-side표로-비교)
  - [4️⃣ Why async fn Uses RPIT](#4%EF%B8%8F⃣-why-async-fn-uses-rpit)
  - [5️⃣ Why APIT Cannot Work for async fn](#5%EF%B8%8F⃣-why-apit-cannot-work-for-async-fn)
  - [6️⃣ RPIT + Lifetimes (Critical Difference](#6%EF%B8%8F⃣-rpit--lifetimes-critical-difference)
  - [7️⃣ RPIT in Traits (RPITIT)](#7%EF%B8%8F⃣-rpit-in-traits-rpitit)
  - [8️⃣ GATs vs RPIT (Important!)](#8%EF%B8%8F⃣-gats-vs-rpit-important)
  - [9️⃣ When to Use Which언제 RPIT or APIT를 사용해야할까?](#9%EF%B8%8F⃣-when-to-use-which)
  - [🔟 One-Sentence Summary](#-one-sentence-summary)

<hr />

# Summary[|🔝|](#link)
- Below is a clear, precise explanation of APIT vs RPIT, with Rust code, mental models, and why this distinction matters for async, closures, and GATs.
  - 아래는 Rust 코드, 정신 모델(mental models), 비동기(async), 폐쇄(closures) 및 GAT에 대해 APIT와 RPIT의 명확하고 정확한 설명입니다.

- 한 문장 요약

> APIT is caller-chosen generics; RPIT is callee-chosen opaque types.

> APIT는 호출자가 선택한 제네릭이고, RPIT는 호출자가 선택한 불투명 타입입니다.


# APIT vs RPIT in Rust[|🔝|](#link)
- The core question
- Where does `impl Trait` (or an opaque type) appear?
  - Argument position → APIT
  - Return position → RPIT

- This affects:
  - who chooses the concrete type
  - monomorphization
  - type identity
  - lifetime capture
  - async / closure behavior

- 러스트에서 APIT 대 RPIT
  - 핵심 질문
  - `impl Trait`(또는 불투명한 유형)은 어디에 나타나나요?
    - Argument position(인수 위치) → APIT
    - Return position(복귀 위치) → RPIT

  - 이것은 영향을 미칩니다:
    - 콘크리트 유형을 선택하는 사람
    - 단일화
    - 타입 아이덴티티
    - 평생 포획

<hr />

# 1️⃣ APIT — Argument-Position `impl Trait`[|🔝|](#link)

- Definition

```rs
fn f(x: impl Iterator<Item = i32>) {
    for v in x {
        println!("{v}");
    }
}
```
 
- What it means
  - ➡️ Caller chooses the concrete type
- This is syntax sugar for:

```rs
fn f<I: Iterator<Item = i32>>(x: I) {
    for v in x {
        println!("{v}");
    }
}
```

- Key properties

|Property|	APIT|
|-|-|
|Who picks the type?	|Caller|
|Generic?	|✅|
|Monomorphized?	|✅|
|Type identity stable?	|❌<br />(depends on caller)|
|Can capture lifetimes?	|❌|


## APIT example: multiple callers

```rs
fn consume(it: impl Iterator<Item = i32>) {
    for x in it {
        println!("{x}");
    }
}

fn main() {
    consume(vec![1, 2, 3].into_iter());
    consume(0..5);
}
```

- Each call instantiates a different monomorphized version.
  - 각 호출은 서로 다른 단일화된 버전을 인스턴스화합니다.

<hr />

- APIT mental model
> “I accept any type that implements this trait.”
- APIT is just a generic parameter with nicer syntax.

- APIT 정신 모델
> "저는 이 특성을 구현하는 모든 유형을 받아들입니다."
- APIT는 더 나은 구문을 가진 일반적인 매개변수일 뿐입니다.


# 2️⃣ RPIT — Return-Position `impl Trait`[|🔝|](#link)

- Definition

```rs
fn make_iter() -> impl Iterator<Item = i32> {
    0..5
}
```

- What it means

  - ➡️ Function chooses the concrete type

- The caller:
  - does not know
  - cannot name
  - cannot change
  - the actual return type.

- 의미

  - ➡️ 기능은 콘크리트 유형을 선택합니다

- 발신자:
  - 모릅니다
  - 이름을 지정할 수 없습니다
  - 변경할 수 없습니다
  - 실제 반품 유형.

<hr />

- Desugaring (conceptual)
  - 디슈가링 (개념적)

```rs
type __MakeIterReturn = std::ops::Range<i32>;

fn make_iter() -> __MakeIterReturn {
    0..5
}
```

- 📌 This hidden type is fixed per function.
  - 📌 이 숨겨진 유형은 기능별로 고정되어 있습니다.

<hr />

- RPIT rules

```rs
fn bad(cond: bool) -> impl Iterator<Item = i32> {
    if cond {
        0..3
    } else {
        vec![1, 2, 3].into_iter() // ❌ different type
    }
}
```

- ✔ All return paths must produce the same concrete type
  - ✔ 모든 반환 경로는 동일한 콘크리트 유형을 생성해야 합니다

- RPIT mental model
> “I return some specific type, but you’re not allowed to know which.”

- RPIT 정신 모델
> "특정 유형을 반환하지만 어떤 유형인지 알 수 없습니다."

# 3️⃣ APIT vs RPIT — Side-by-Side(표로 비교)[|🔝|](#link)


| Feature               | APIT          | RPIT                 |
| --------------------- | ------------- | -------------------- |
| Position              | Argument      | Return               |
| Who chooses type      | Caller        | Callee               |
| Desugars to           | Generic param | Hidden concrete type |
| Type identity         | Per call      | Per function         |
| Can differ per call   | ✅             | ❌                    |
| Used by `async fn`    | ❌             | ✅                    |
| Can capture lifetimes | ❌             | ✅                    |

# 4️⃣ Why async fn Uses RPIT[|🔝|](#link)
- 4️⃣ 비동기 fn이 RPIT를 사용하는 이유

```rs
async fn compute() -> i32 {
    5
}
```

- Desugars to:

```rs
fn compute() -> impl Future<Output = i32> {
    async move { 5 }
}
```

- ✔ The future type is:
  - compiler-generated
  - unique
  - unnamed
  - captures locals

- 📌 This is RPIT

- ✔ 미래의 유형은:
  - 컴파일러 생성
  - 독특한
  - 이름 없는
  - 현지인을 사로잡습니다

- 📌 RPIT입니다

# 5️⃣ Why APIT Cannot Work for async fn[|🔝|](#link)
- 5️⃣ 비동기 FN에서 APIT가 작동하지 않는 이유

- ❌ Invalid:
  - 무효한

```rs
fn compute(f: impl Future<Output = i32>) -> i32 {
    // impossible
}
```

- Async requires:
  - returning a future
  - that captures locals
  - whose concrete type is hidden
- Only RPIT supports this

- 비동기화에는 다음이 필요합니다:
  - 미래를 되돌리기
  - 현지인을 사로잡는
  - 구체적인 유형이 숨겨져 있는 사람
- RPIT만이 이를 지원합니다

# 6️⃣ RPIT + Lifetimes (Critical Difference)[|🔝|](#link)
6️⃣ RPIT + 수명 (중요한 차이)

## RPIT can capture lifetimes
- RPIT는 수명을 포착할 수 있습니다

```rs
fn slice<'a>(s: &'a [i32]) -> impl Iterator<Item = &'a i32> {
    s.iter()
}
```

- ✔ The returned type contains `'a`

## APIT cannot express this

```rs
fn consume(it: impl Iterator<Item = &i32>) {
    // no way to tie lifetime
}
```

# 7️⃣ RPIT in Traits (RPITIT)[|🔝|](#link)

```rs
trait Factory {
    fn make(&self) -> impl Iterator<Item = i32>;
}
```

- ✔ Each implementor chooses its own hidden type
- ❌ Not object-safe
  - ✔ 각 구현자는 자신만의 숨겨진 유형을 선택합니다
  - ❌ 물건에 안전하지 않음

# 8️⃣ GATs vs RPIT (Important!)[|🔝|](#link)

- RPIT returns one fixed type
  - RPIT는 하나의 고정된 유형을 반환합니다

- GATs return types parameterized by lifetimes
  - GAT는 수명으로 매개변수화된 유형을 반환합니다

```rs
trait LendingIter {
    type Item<'a>
    where
        Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>>;
}
```

- 📌 RPIT cannot replace GATs
  - 📌 RPIT는 GAT를 대체할 수 없습니다

# 9️⃣ When to Use Which[|🔝|](#link)
- Use APIT when:
  - accepting flexible inputs
  - Writing generic helpers
  - You want caller freedom

- Use RPIT when:
  - Returning complex or unnamed types
  - Writing async fn
  - Hiding implementation details
  - Enabling zero-cost abstractions

- 다음과 같은 경우 APIT 사용:
  - 유연한 입력 수락
  - 일반 도우미 작성하기
  - 발신자의 자유를 원합니다

- RPIT는 다음과 같은 경우에 사용합니다:
  - 복소수 또는 이름 없는 유형 반환
  - 비동기 fn 작성하기
  - 구현 세부 정보 숨기기
  - 제로 비용 추상화 활성화

# 🔟 One-Sentence Summary[|🔝|](#link)
- 🔟 한 문장 요약

> APIT is caller-chosen generics; RPIT is callee-chosen opaque types.

> APIT는 호출자가 선택한 제네릭이고, RPIT는 호출자가 선택한 불투명 타입입니다.

