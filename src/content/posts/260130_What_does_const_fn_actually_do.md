---
title: 260130_What_does_const_fn_actually_do
published: 2026-01-30
description: 'const fn을 사용하여 얻는 것, 중요한 경우, 그렇지 않은 경우를 구체적인 시스템 수준의 직관(C/C++ 스타일)으로 설명해 드리겠습니다.'
image: ''
tags: [rust, const_fn, std, optimization]
category: 'optimization'
draft: false 
lang: ''
---

# link
- [1. What does const fn actually do?](#what-are-the-advantages-of-playing-const-fn)
- [2. The REAL advantages of `const fn`](#2-the-real-advantages-of-const-fn)
  - [🔹 1) Zero runtime cost (literally zero)](#-1-zero-runtime-cost-literally-zero)
  - [🔹 2) Enables static and const data structures](#-2-enables-static-and-const-data-structures)
  - [🔹 3) Stronger correctness guarantees](#-3-stronger-correctness-guarantees)
  - [🔹 4) Better optimizations (even at runtime)](#-4-better-optimizations-even-at-runtime)
  - [🔹 5) Enables type-level programming patterns|](#-5-enables-type-level-programming-patterns)
  - [🔹 6) Essential for embedded / no_std](#-6-essential-for-embedded--no_std)
- [3. What const fn is NOT good for](#3-what-const-fn-is-not-good-for)
- [4. Mental model (best way to remember)](#4-mental-model-best-way-to-remember)
- [5. (표로 비교해서 보기) Comparison with C / C++](#5-comparison-with-c--c)
- [6. When you should care (based on your questions)](#6-when-you-should-care-based-on-your-questions)

<hr />

# What are the advantages of playing `const fn`? 

- I’ll explain what you gain by using const fn, when it matters, and when it does not, with concrete systems-level intuition (C/C++ style).
  - const fn을 사용하여 얻는 것, 중요한 경우, 그렇지 않은 경우를 구체적인 시스템 수준의 직관(C/C++ 스타일)으로 설명해 드리겠습니다.

# 1. What does const fn actually do?[|🔝|](#link)
- 1. const fn은 실제로 무엇을 하나요?

- A `const fn` can be executed at compile time or at runtime.
  - 'const fn'은 컴파일 시간이나 런타임에 실행될 수 있습니다.

> Think of const fn as
> “this function is pure enough that the compiler is allowed to run it early.”

> const fn을 다음과 같이 생각하세요
> "이 함수는 컴파일러가 조기에 실행할 수 있을 만큼 충분히 순수합니다."

- Example: 

```rs
const fn add(a: usize, b: usize) -> usize {
    a + b
}

const N: usize = add(3, 5);
```

- The compiler literally computes `N = 8` while compiling.

# 2. The REAL advantages of `const fn`[|🔝|](#link)

## 🔹 1) Zero runtime cost (literally zero)[|🔝|](#link)

- With const fn:

```rs
const STACK: Stack<i32, 64> = Stack::new();
```
- There is:
  - ❌ no runtime initialization
  - ❌ no constructor call
  - ❌ no code executed at program start

- The data already exists in the binary.

- This matters in:
  - kernels
  - embedded
  - hot-start services
  - real-time systems

> In C terms: this is like `.bss` / `.data`, not `main()` code.

- 있습니다:
  - ❌ 런타임 초기화 없음
  - ❌ 생성자 호출 없음
  - ❌ 프로그램 시작 시 실행되는 코드 없음

- 데이터는 이미 바이너리에 존재합니다.

- 이것은 중요합니다:
  - 커널
  - 내장된
  - 핫 스타트 서비스
  - 실시간 시스템

> C 용어로: 이것은 '메인()' 코드가 아니라 '.bss' / '.data'와 같습니다.

## 🔹 2) Enables `static` and `const` data structures[|🔝|](#link)

- Without `const fn`:

```rs
static S: Stack<i32, 8> = Stack::new(); // ❌ illegal
```

- With `const fn`:

```rs
static S: Stack<i32, 8> = Stack::new(); // ✅
```

- This unlocks:
  - global caches
  - lock-free queues
  - interrupt-safe buffers
  - allocator-free subsystems

- In Rust, global state is intentionally hard — const fn is how you do it safely.

- 잠금이 해제됩니다:
  - 글로벌 캐시
  - 잠금 해제 대기열
  - 인터럽트 안전 버퍼
  - 할당자 없는 하위 시스템

- Rust에서는 글로벌 상태가 의도적으로 어렵습니다 — 안전하게 수행하는 방법은 const fn입니다.

## 🔹 3) Stronger correctness guarantees[|🔝|](#link)
- 🔹 3) 더 강력한 정확성 보장

- If something is allowed in `const fn`, then:
  - no heap allocation
  - no I/O
  - no locks
  - no syscalls
  - no hidden global state

- This is a semantic guarantee, not just performance.

> “If it compiles as const, it cannot do spooky action at a distance.”

- This is stronger than `inline`, `#[pure]`, or `constexpr` in C++.


- `const fn`에서 어떤 것이 허용된다면:
  - 힙 할당 없음
  - 입출력 없음
  - 자물쇠 없음
  - 시스콜 없음
  - 숨겨진 글로벌 상태 없음

- 이것은 단순한 성능이 아니라 의미론적 보증입니다.

> "만약 그것이 일정한 값으로 컴파일된다면, 먼 거리에서는 으스스한 행동을 할 수 없습니다."

- 이것은 C++에서 `inline`, `#[pure]`, 또는 `constexpr`보다 더 강합니다.

## 🔹 4) Better optimizations (even at runtime)[|🔝|](#link)
- 🔹 4) 더 나은 최적화(실행 시에도)

- Even when called at runtime, a `const fn`:
  - is easier to inline
  - has fewer side effects
  - is more aggressively constant-folded

- Example:


- 런타임에 호출되더라도, `const fn`:
  - 인라인이 더 쉽습니다
  - 부작용이 적습니다
  - 보다 공격적으로 일정한 folded을 유지합니다

- 예:

```rs
fn f() {
    let x = Stack::<i32, 8>::new(); // compiler may still const-fold
}
```

- The optimizer can materialize the struct directly instead of calling code.
- 옵티마이저는 코드를 호출하는 대신 구조를 직접 구현할 수 있습니다.

## 🔹 5) Enables type-level programming patterns[|🔝|](#link)

- Rust uses const fn everywhere internally:

```rs
struct Buffer<const N: usize> {
    data: [u8; N],
}
```

- You can compute values for types:

```rs
const fn next_pow2(n: usize) -> usize {
    n.next_power_of_two()
}

struct Table<const N: usize> {
    data: [u8; next_pow2(N)],
}
```

- This is impossible without `const fn`.


## 🔹 6) Essential for embedded / no_std[|🔝|](#link)

- In `no_std` environments:
  - there may be no allocator
  - `main()` may not even exist
  - initialization order matters

- `const fn` lets you build everything at compile time.

- This is why:
  - `spin::Mutex`
  - heapless
  - embedded-hal
  - OS kernels

heavily depend on `const fn`.

- 🔹 6) 임베디드 / no_std에 필수적인 요소[|🔝|](#link)

- `no_std` 환경에서는:
  - 할당자가 없을 수 있습니다
  - '메인 ()'는 존재하지 않을 수도 있습니다
  - 초기화 순서 문제

- `const fn`을 사용하면 컴파일 시 모든 것을 빌드할 수 있습니다.

- 이것이 바로 이유입니다:
  - `spin::Mutex`
  - 힙리스
  - 내장된 할
  - OS 커널

- `const fn`에 크게 의존합니다.

# 3. What `const fn` is NOT good for[|🔝|](#link)

- Important to avoid cargo-culting:

- ❌ 1) Business logic
- ❌ 2) Anything involving I/O
- ❌ 3) Code that must run dynamically
- ❌ 4) Complex mutation (today)

- 3. 'const fn'이 좋지 않은 이유

- 화물 재배를 피하는 것이 중요합니다:

- ❌ 1) 비즈니스 논리
- ❌ 2) I/O와 관련된 모든 것
- ❌ 3) 동적으로 실행되어야 하는 코드
- ❌ 4) 복합 돌연변이 (오늘날)

- Example anti-pattern:

```rs
const fn calculate_tax(x: f64) -> f64 { ... } // ❌ pointless
```

- This gives **no real benefit**.

# 4. Mental model (best way to remember)[|🔝|](#link)

> `const fn` turns code into data.

- If something:
  - is always the same
  - does not depend on runtime state
  - is required early
  - must exist globally

- → it belongs in `const fn`.

- 4. 정신 모델 (기억하는 가장 좋은 방법)

'const fn'은 코드를 데이터로 변환합니다.

- 만약 어떤 것이:
  - 항상 동일합니다
  - 런타임 상태에 의존하지 않습니다
  - 조기에 필요합니다
  - 전 세계적으로 존재해야 합니다

- → 'const fn'에 속합니다.

# 5. Comparison with C / C++[|🔝|](#link)

| Feature             | Rust `const fn` | C `static init` | C++ `constexpr` |
| ------------------- | --------------- | --------------- | --------------- |
| Memory safety       | ✅              | ❌              | ❌             |
| Heap allowed        | ❌              | ❌              | ❌             |
| Side-effect free    | Enforced        | Not enforced    | Weakly enforced |
| Works with generics | ✅              | ❌              | Partial         |
| Zero-cost guarantee | ✅              | Maybe           | Maybe           |

- Rust is the **strictest and safest** here.

# 6. When you should care (based on your questions)[|🔝|](#link)

- Given your interest in:
  - lock-free structures
  - channels
  - static buffers
  - kernel / low-level Rust
  - performance

- 👉 const fn is not optional knowledge — it’s core.

- You’re already thinking at the right abstraction level.

- 6. 당신이 신경 써야 할 때 (질문에 근거하여)

- 관심을 가져주셔서 감사합니다:
  - 잠금 장치가 없는 구조물
  - 채널
  - 정적 버퍼
  - 커널 / 로우 레벨 러스트
  - 성능

- 👉 const fn은 선택적 지식이 아니라 핵심입니다.

- 당신은 이미 올바른 추상화 수준에서 생각하고 있습니다.

