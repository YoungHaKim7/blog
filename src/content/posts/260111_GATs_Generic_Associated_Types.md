---
title: 260111_GATs_Generic_Associated_Types
published: 2026-01-11
description: '🦀 Generic Associated Types (GATs) in Rust'
image: ''
tags: [rust, GATs, std, traits]
category: 'rust'
draft: false 
lang: ''
---

# link
- [🦀 Generic Associated Types (GATs) in Rust](#-generic-associated-types-gats-in-rust)
  - [1️⃣ What problem do GATs solve?](#1%EF%B8%8F⃣-what-problem-do-gats-solve)
  - [2️⃣ The Core Idea of GATs](#2%EF%B8%8F⃣-the-core-idea-of-gats)
  - [3️⃣ Minimal GAT Example](#3%EF%B8%8F⃣-minimal-gat-example)
  - [4️⃣ Why where Self: 'a is required](#4%EF%B8%8F⃣-why-where-self-a-is-required)
  - [5️⃣ Concrete Implementation Example](#5%EF%B8%8F⃣-concrete-implementation-example)
  - [6️⃣ GATs vs Regular Associated Types](#6%EF%B8%8F⃣-gats-vs-regular-associated-types)
  - [7️⃣ Real-World Example: StreamingIterator](#7%EF%B8%8F⃣-real-world-example-streamingiterator)
  - [8️⃣ GATs + Traits = Higher-Kinded Types (Almost)](#8%EF%B8%8F⃣-gats--traits--higher-kinded-types-almost)
  - [9️⃣GATs in Graph / Iterator APIs (Advanced)](#9%EF%B8%8F⃣-gats-in-graph--iterator-apis-advanced)
  - [🔟 Common Mistakes](#-common-mistakes)
  - [1️⃣1️⃣ Mental Mode](#1%EF%B8%8F⃣1%EF%B8%8F⃣-mental-model)
  - [1️⃣2️⃣ When SHOULD you use GATs?](#1%EF%B8%8F⃣2%EF%B8%8F⃣-when-should-you-use-gats)
  - [1️⃣3️⃣ Stability](#1%EF%B8%8F⃣3%EF%B8%8F⃣-stability)
- code sample
  - [Code Sample(GATs)](#code-samplegats)


- Rust 1.65에 안정화된 GATs
  - [221028_Generic associated types to be stable in Rust 1.65 | Oct. 28, 2022 · Jack Huey on behalf of The Types Team](https://blog.rust-lang.org/2022/10/28/gats-stabilization/)

<hr />

# 🦀 Generic Associated Types (GATs) in Rust[|🔝|](#link)

# 1️⃣ What problem do GATs solve?[|🔝|](#link)
- GAT는 어떤 문제를 해결하나요?

- ❌ Before GATs (limitation)
  - Associated types could not depend on lifetimes or type parameters.
- ❌ GATs (limit) 이전
  - 연관된 유형은 수명이나 유형 매개변수에 의존할 수 없습니다

```rs
trait Iterable {
    type Item;

    fn iter(&self) -> ???;
}
```

- We cannot express:
> “The iterator’s item type depends on the lifetime of &self.”
- This breaks zero-copy iterators, views, borrowing APIs, and streaming abstractions.

- 표현할 수 없습니다:
> "반복자의 항목 유형은 &self의 수명에 따라 달라집니다."
- 이렇게 하면 제로 카피 반복자, 보기, 차용 API, 스트리밍 추상화가 깨집니다.
  
# 2️⃣ The Core Idea of GATs[|🔝|](#link)
- GAT의 핵심 아이디어
- Associated types that themselves take generics (types or lifetimes).
  - 제네릭(유형 또는 수명)을 직접 사용하는 관련 유형.

```rs
trait Trait {
    type Assoc<'a>;
}
```
- This means:
  - `Assoc` is not a single type
  - It is a family of types, indexed by `'a`
- 이것은 다음을 의미합니다:
  - Associate는 단일 유형이 아닙니다
  - 그것은 `'a`로 색인된 유형의 계열입니다

# 3️⃣ Minimal GAT Example[|🔝|](#link)

- [Rust code 3](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/GATs/a02_minimal_gat_ex)

```rs
trait BorrowingIterator {
    type Item<'a>
    where
        Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>>;
}
```

- Key insight:
  - `Item<'a>` depends on how long `&mut self` lives
  - Enables borrowed items without allocation
- 주요 인사이트:
  - `아이템 <'a>`는 `&mut self` 자아의 수명에 따라 달라집니다
  - 할당 없이 대여한 항목을 활성화합니다

# 4️⃣ Why where Self: 'a is required[|🔝|](#link)

```rs
type Item<'a> where Self: 'a;
```

- This tells Rust:

> “Self lives at least as long as 'a”

- Without this, returning references into self would be unsound.

- 이것은 러스트에게 말합니다:
> "자신은 적어도 'a'만큼 오래 삽니다."
- 이것이 없다면, 자기 자신에 대한 언급을 되돌리는 것은 타당하지 않을 것입니다.

# 5️⃣ Concrete Implementation Example[|🔝|](#link)

- [rust code 5](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/GATs/a03_concrete_impl_ex)

- 구체적인 구현 예시
- A slice iterator without allocation
  - 할당되지 않은 슬라이스 반복기

```rs
struct SliceIter<'s, T> {
    slice: &'s [T],
    pos: usize,
}

trait MyIter {
    type Item<'a>
    where
        Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>>;
}

impl<'s, T> MyIter for SliceIter<'s, T> {
    type Item<'a> = &'a T where Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>> {
        let item = self.slice.get(self.pos)?;
        self.pos += 1;
        Some(item)
    }
}
```

- 🧠 Why GAT is required here
  - `&'a T` borrows from `self`
  - `'a` changes on every call
  - Associated types must vary per lifetime
- 🧠 여기에 GAT가 필요한 이유
  - `&'a T`는 자기 자신에게서 차용한 것입니다
  - `a`는 모든 호출에서 변경됩니다
  - 관련 유형은 평생에 따라 달라져야 합니다

# 6️⃣ GATs vs Regular Associated Types[|🔝|](#link)

|Feature	| Associated Type	|GAT|
|-|-|-|
|Depends on lifetime	|❌|	✅|
|Depends on type param	|❌|	✅|
|Zero-copy APIs	|❌|	✅|
|Streaming iterators	|❌|	✅|

# 7️⃣ Real-World Example: `StreamingIterator`[|🔝|](#link)

[rust code 7](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/GATs/a04_streaming_iter)

```rs
trait StreamingIterator {
    type Item<'a>
    where
        Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>>;
}
```

- Used when:
  - Items cannot be owned
  - Each item borrows from internal buffers
  - Example: parsers, tokenizers, IO buffers
- 사용 시:
  - 아이템을 소유할 수 없습니다
  - 각 항목은 내부 버퍼에서 차용됩니다
  - 예제: 파서, 토큰라이저, IO 버퍼


# 8️⃣ GATs + Traits = Higher-Kinded Types (Almost)[|🔝|](#link)

- Rust does not have HKTs, but GATs get very close:

```rs
trait Container {
    type View<'a, T>
    where
        Self: 'a;

    fn view<'a, T>(&'a self) -> Self::View<'a, T>;
}
```

- This allows:
  - Generic containers
  - Borrowed views
  - Zero-cost abstractions
- 이렇게 하면 됩니다:
  - 일반 컨테이너
  - 차용된 보기
  - 제로 코스트 추상화

# 9️⃣ GATs in Graph / Iterator APIs (Advanced)[|🔝|](#link)

- [GATs in Graph Rust code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/GATs/a06_gats_graph)

```rs
trait Graph {
    type Node;
    type Neighbors<'a>: Iterator<Item = Self::Node>
    where
        Self: 'a;

    fn neighbors<'a>(&'a self, n: Self::Node) -> Self::Neighbors<'a>;
}
```

- Benefits:
  - No heap allocation
  - No `Box<dyn Iterator>`
  - Fully static dispatch
- 혜택:
  - 힙 할당 없음
  - No `Box<dyn Iterator>`
  - 완전 정적 디스패치

# 🔟 Common Mistakes[|🔝|](#link)

- ❌ Forgetting the lifetime bound

```rs
type Item<'a>; // ERROR

```

- ✅ Correct

```rs
type Item<'a> where Self: 'a;

```

# 1️⃣1️⃣ Mental Model[|🔝|](#link)

- Think of a GAT as:

> A function at the type level

```rs
Item<'a> = &'a T
Item<'a> = Ref<'a>
Item<'a> = SliceIter<'a>
```

# 1️⃣2️⃣ When SHOULD you use GATs?[|🔝|](#link)

- Use GATs if you need:
  - Borrowed return types
  - Zero-copy iteration
  - Streaming APIs
  - High-performance libraries
  - To avoid `Box<dyn Trait>`
- 필요한 경우 GAT를 사용하세요:
  - 차입 수익 유형
  - 제로 카피 반복
  - 스트리밍 API
  - 고성능 라이브러리
  - `Box<dyn Trait>`을 피하기 위해

<hr />

- Avoid GATs if:
  - Owned types are fine
  - Simplicity matters more than performance

- 다음과 같은 경우 GAT를 피합니다:
  - 소유한 유형은 괜찮습니다
  - 성능보다 단순함이 더 중요합니다

# 1️⃣3️⃣ Stability[|🔝|](#link)

- ✅ Stable since Rust 1.65
- No nightly required
- Widely used in ecosystem now

- 🔚 Summary

> GATs let associated types depend on lifetimes or generics, unlocking safe, zero-copy, allocation-free APIs.

- One sentence takeaway:

> GATs are Rust’s way of expressing “the type I return depends on how long you borrow me.”

- ✅ 러스트 1.65 이후 안정적
- 야간 필요 없음
- 현재 생태계에서 널리 사용되고 있습니다

- 🔚 요약

GAT는 연관된 유형을 수명이나 제네릭에 의존하게 하여, 안전하고 복사본이 없으며 할당이 필요 없는 API를 잠금 해제합니다.

- 한 문장 요약:

GAT는 러스트의 표현 방식입니다. "내가 돌려주는 타입은 네가 나를 얼마나 오래 빌리느냐에 달려 있어."


# Code Sample(GATs)[|🔝|](#link)

- [code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/GATs/a01_iterable)

```rs
// Before GATs: Cannot express "Item depends on lifetime of &self"
// This is what we WANTED to write (but couldn't before GATs):
// trait Iterable {
//     type Item<'a>;  // ❌ Error: associated type cannot have lifetime parameters
//     fn iter<'a>(&'a self) -> Self::Item<'a>;
// }

// With GATs (Rust 1.65+): We can finally write natural APIs!
trait IterableGAT {
    type Item<'a> where Self: 'a;

    fn iter<'a>(&'a self) -> Self::Item<'a>;
}

struct MyVec<T>(Vec<T>);

impl<T> IterableGAT for MyVec<T> {
    type Item<'a> = std::slice::Iter<'a, T> where Self: 'a;

    fn iter<'a>(&'a self) -> Self::Item<'a> {
        self.0.iter()
    }
}

fn main() {
    let v = MyVec(vec![1, 2, 3]);

    // Zero-copy iteration over borrowed data
    for item in v.iter() {
        println!("{}", item);
    }
}
```

- Result

```rs
1
2
3
```

<hr />

- `StreamingIterator`

```rs
trait StreamingIterator {
    type Item<'a>
    where
        Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>>;
}

// Example 1: Tokenizer - splits text into tokens borrowing from internal buffer
struct Tokenizer<'input> {
    input: &'input str,
    position: usize,
}

impl<'input> Tokenizer<'input> {
    fn new(input: &'input str) -> Self {
        Self { input, position: 0 }
    }
}

impl<'input> StreamingIterator for Tokenizer<'input> {
    type Item<'a> = &'a str where Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>> {
        while self.position < self.input.len() {
            let start = self.position;
            let byte = self.input.as_bytes()[self.position];
            self.position += 1;

            if !byte.is_ascii_whitespace() {
                return Some(&self.input[start..self.position]);
            }
        }
        None
    }
}

// Example 2: Parser - yields parsed elements borrowing from internal buffer
struct Parser<'input> {
    input: &'input str,
    position: usize,
}

impl<'input> Parser<'input> {
    fn new(input: &'input str) -> Self {
        Self { input, position: 0 }
    }
}

impl<'input> StreamingIterator for Parser<'input> {
    type Item<'a> = (&'a str, &'a str) where Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>> {
        if self.position >= self.input.len() {
            return None;
        }

        // Parse key=value pairs
        let remaining = &self.input[self.position..];
        if let Some(eq_pos) = remaining.find('=') {
            if let Some(end_pos) = remaining[eq_pos + 1..].find(|c| c == ',') {
                let key = &remaining[..eq_pos];
                let value = &remaining[eq_pos + 1..eq_pos + 1 + end_pos];
                self.position += eq_pos + 1 + end_pos + 1;
                return Some((key, value));
            }
        }
        None
    }
}

// Example 3: IO Buffer - yields chunks borrowing from internal buffer
struct IoBuffer {
    buffer: Vec<u8>,
    position: usize,
    chunk_size: usize,
}

impl IoBuffer {
    fn new(data: Vec<u8>, chunk_size: usize) -> Self {
        Self {
            buffer: data,
            position: 0,
            chunk_size,
        }
    }
}

impl StreamingIterator for IoBuffer {
    type Item<'a> = &'a [u8] where Self: 'a;

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>> {
        if self.position >= self.buffer.len() {
            return None;
        }

        let end = (self.position + self.chunk_size).min(self.buffer.len());
        let chunk = &self.buffer[self.position..end];
        self.position = end;
        Some(chunk)
    }
}

fn main() {
    // Example 1: Tokenizer - borrowing from internal text buffer
    println!("=== Tokenizer Example ===");
    let text = "hello world foo bar";
    let mut tokenizer = Tokenizer::new(text);

    while let Some(token) = tokenizer.next() {
        println!("Token: {}", token);
    }

    // Example 2: Parser - borrowing key=value pairs from internal buffer
    println!("\n=== Parser Example ===");
    let config = "name=alice,age=30,city=nyc";
    let mut parser = Parser::new(config);

    while let Some((key, value)) = parser.next() {
        println!("Parsed: {} = {}", key, value);
    }

    // Example 3: IO Buffer - yielding chunks borrowing from internal buffer
    println!("\n=== IO Buffer Example ===");
    let data = b"Hello, this is a streaming buffer example".to_vec();
    let mut buffer = IoBuffer::new(data, 10);

    let mut chunk_num = 1;
    while let Some(chunk) = buffer.next() {
        println!("Chunk {}: {:?}", chunk_num, std::str::from_utf8(chunk).unwrap());
        chunk_num += 1;
    }
}
```

- result

```bash
=== Tokenizer Example ===
Token: h
Token: e
Token: l
Token: l
Token: o
Token: w
Token: o
Token: r
Token: l
Token: d
Token: f
Token: o
Token: o
Token: b
Token: a
Token: r

=== Parser Example ===
Parsed: name = alice
Parsed: age = 30

=== IO Buffer Example ===
Chunk 1: "Hello, thi"
Chunk 2: "s is a str"
Chunk 3: "eaming buf"
Chunk 4: "fer exampl"
Chunk 5: "e"
```

<hr />

- Trait demonstrating GATs (Generic Associated Types) for HKT-like patterns

```rs
// Trait demonstrating GATs (Generic Associated Types) for HKT-like patterns
trait Container {
    // The GAT: View<'a> represents a borrowed view into the container
    type View<'a>
    where
        Self: 'a;

    fn view<'a>(&'a self) -> Self::View<'a>;
}

// Example 1: Vec - returns a slice view
impl<T> Container for Vec<T> {
    type View<'a> = &'a [T] where T: 'a;

    fn view<'a>(&'a self) -> &'a [T] {
        self.as_slice()
    }
}

// Example 2: Box - returns a reference to its contents
impl<T> Container for Box<T> {
    type View<'a> = &'a T where T: 'a;

    fn view<'a>(&'a self) -> &'a T {
        &**self
    }
}

// Example 3: Option - returns an Option with a reference
impl<T> Container for Option<T> {
    type View<'a> = Option<&'a T> where T: 'a;

    fn view<'a>(&'a self) -> Option<&'a T> {
        self.as_ref()
    }
}

// Example 4: Result - returns Result with references to both Ok and Err
impl<T, E> Container for Result<T, E> {
    type View<'a> = Result<&'a T, &'a E> where T: 'a, E: 'a;

    fn view<'a>(&'a self) -> Result<&'a T, &'a E> {
        self.as_ref()
    }
}

// Example 5: Array - returns a slice view
impl<T, const N: usize> Container for [T; N] {
    type View<'a> = &'a [T] where T: 'a;

    fn view<'a>(&'a self) -> &'a [T] {
        self.as_slice()
    }
}

fn main() {
    // Example 1: Vec container
    let vec_container: Vec<i32> = vec![1, 2, 3, 4, 5];
    let vec_view: &[i32] = vec_container.view();
    println!("Example 1 (Vec): container = {:?}, view = {:?}", vec_container, vec_view);

    // Example 2: Box container
    let box_container: Box<i32> = Box::new(42);
    let box_view: &i32 = box_container.view();
    println!("Example 2 (Box): container = {}, view = {}", box_container, box_view);

    // Example 3: Option container
    let option_container: Option<i32> = Some(100);
    let option_view: Option<&i32> = option_container.view();
    println!("Example 3 (Option): container = {:?}, view = {:?}", option_container, option_view);

    // Example 4: Result container
    let result_container: Result<i32, String> = Ok(200);
    let result_view: Result<&i32, &String> = result_container.view();
    println!("Example 4 (Result): container = {:?}, view = {:?}", result_container, result_view);

    // Example 5: Array container
    let array_container: [i32; 3] = [10, 20, 30];
    let array_view: &[i32] = array_container.view();
    println!("Example 5 (Array): container = {:?}, view = {:?}", array_container, array_view);

    println!("\nAll 5 GAT Container examples compiled successfully!");
    println!("\nKey GAT benefits demonstrated:");
    println!("  1. Generic containers - works with Vec, Box, Option, Result, Array");
    println!("  2. Borrowed views - each returns a reference with proper lifetime tracking");
    println!("  3. Zero-cost abstractions - monomorphized at compile time");
}
```

- result
```bash
Example 1 (Vec): container = [1, 2, 3, 4, 5], view = [1, 2, 3, 4, 5]
Example 2 (Box): container = 42, view = 42
Example 3 (Option): container = Some(100), view = Some(100)
Example 4 (Result): container = Ok(200), view = Ok(200)
Example 5 (Array): container = [10, 20, 30], view = [10, 20, 30]

All 5 GAT Container examples compiled successfully!

Key GAT benefits demonstrated:
  1. Generic containers - works with Vec, Box, Option, Result, Array
  2. Borrowed views - each returns a reference with proper lifetime tracking
  3. Zero-cost abstractions - monomorphized at compile time
```

