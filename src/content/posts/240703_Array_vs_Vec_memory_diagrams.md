---
title: 240703_Array_vs_Vec_memory_diagrams
published: 2024-07-03
description: 'I’ll explain Array vs Vec memory layout, where data lives, what’s on stack vs heap, and why performance differs, using clear CLI diagrams you can see with your eyes.'
image: ''
tags: [rust, std]
category: 'rust'
draft: false 
lang: ''
---

# link
- 극한의 상황에서는 vector를 못 쓸지도.. OS같이 온실같은 환경에서는 고민하지 않겠지만 embedded는 없는게 더 많다.
- 레딧글
  - [no_std libary that uses vectors?](https://www.reddit.com/r/rust/comments/tmgrzr/no_std_libary_that_uses_vectors/)
  - [fixed-slice-vec: an Embedded Rust no-std Vector](https://www.reddit.com/r/rust/comments/jj537w/fixedslicevec_an_embedded_rust_nostd_vector/)

- [`Array[T;N` vs `Vec<T>` 한눈에 비교_Summary table (pin this)](#summary-table-pin-this)
- [1️⃣ Fixed-size Array `[T; N]` memory diagram](#1%EF%B8%8F⃣-fixed-size-array-t-n-memory-diagram)
  - [2️⃣ Array inside a struct (still inline)](#2%EF%B8%8F⃣-array-inside-a-struct-still-inline)

- [3️⃣ `Vec<T>` memory diagram (three-part structure)](#3%EF%B8%8F⃣-vect-memory-diagram-three-part-structure)
- 비교해서 공부(Array vs Vec)
  - [4️⃣ Side-by-side: Array vs Vec (visual)](#4%EF%B8%8F⃣-side-by-side-array-vs-vec-visual)
  - [5️⃣ Where they live (important)](#5%EF%B8%8F⃣-where-they-live-important)

- Access cost 어느정도 cost를 지불해야하는지 깊게 파 보자
  - [6️⃣ Access cost (what the CPU does)](#6%EF%B8%8F⃣-access-cost-what-the-cpu-does)

- Cache behavior캐쉬 관점에서 비교해 보자
  - [7️⃣ Cache behavior (important difference)](#7%EF%B8%8F⃣-cache-behavior-important-difference)

- [8️⃣ Growing a Vec (reallocation diagram)](#8%EF%B8%8F⃣-growing-a-vec-reallocation-diagram)
- [9️⃣ Why arrays can be faster (sometimes)](#9%EF%B8%8F⃣-why-arrays-can-be-faster-sometimes)
- [🔟 Why Vec is used everywhere](#-why-vec-is-used-everywhere)
- [1️⃣1️⃣ Slice unifies both worlds슬라이스는 두 세계를 통합합니다](#1%EF%B8%8F⃣1%EF%B8%8F⃣-slice-unifies-both-worlds)

<hr />

- I’ll explain Array vs Vec memory layout, where data lives, what’s on stack vs heap, and why performance differs, using clear CLI diagrams you can see with your eyes.

# 🧠 Big picture (pin this first)

```rs
Array ([T; N]) → size known at compile time
Vec<T>         → size known at runtime
```
- Memory-wise:
```txt
Array → inline storage
Vec   → pointer to heap storage
```

# Summary table (pin this)[|🔝|](#link)

| Property          | Array [T; N]  | Vec<T>        |
|-|-|-|
| Size known        | Compile time  | Runtime       |
| Storage           | Inline        | Heap          |
| Grows             | ❌ No         | ✅ Yes        |
| Reallocation      | ❌ No         | ✅ Yes        |
| Indirection       | ❌ No         | ✅ Yes        |
| Cache-friendly    | Excellent     | Excellent     |
| Stack usage       | High if large | Small         |

# Final mental model (one sentence)[|🔝|](#link)

- Array owns the bytes directly.
- Vec owns a pointer to bytes.
  - 배열이 바이트를 직접 소유합니다.
  - Vec는 바이트 포인터를 소유하고 있습니다.

- Or visually:

```txt
Array = [ DATA ]
Vec   = [ POINTER ] → [ DATA ]
```

# 1️⃣ Fixed-size Array `[T; N]` memory diagram[|🔝|](#link)

- Rust code

```rs
let a: [i32; 4] = [10, 20, 30, 40];
```

- Memory layout (typically on stack)

```txt
Stack
┌───────────────────────────────┐
│ a[0] │ a[1] │ a[2] │ a[3]     │
│  10  │  20  │  30  │  40      │
└───────────────────────────────┘
```

- Key properties:

```txt
✔ One contiguous block
✔ No pointer indirection
✔ Size = 4 * size_of(i32)
✔ Known at compile time
```

- The array is the data.

# 2️⃣ Array inside a struct (still inline)[|🔝|](#link)

```rs
struct S {
    a: [i32; 4],
    b: i32,
}
```
- Memory:

```txt
Stack (or heap if S is heap-allocated)
┌─────────────────────────────────────┐
│ a[0] a[1] a[2] a[3] │ b             │
└─────────────────────────────────────┘
```
- 🔥 Arrays are always inline, never indirect.

# 3️⃣ `Vec<T>` memory diagram (three-part structure)[|🔝|](#link)

- Rust code

```rs
let v: Vec<i32> = vec![10, 20, 30, 40];
```

- What `Vec<T>` really is

```rs
Vec<T> = (ptr, len, capacity)
```

- Stack vs Heap

```txt
Stack                         Heap
┌─────────────────────┐      ┌───────────────────────────────┐
│ ptr ────────────────┼────▶ │ v[0] │ v[1] │ v[2] │ v[3]     │
│ len = 4             │      │  10  │  20  │  30  │  40      │
│ cap = 4             │      └───────────────────────────────┘
└─────────────────────┘
```

- Key properties:

```txt
✔ Vec header is small (3 machine words)
✔ Data lives on the heap
✔ Size can grow/shrink
```

- The vector points to the data, it is not the data.

# 4️⃣ Side-by-side: Array vs Vec (visual)[|🔝|](#link)

```txt
Array [i32; 4]:

┌───────────────┐
│ 10 20 30 40   │  ← inline, fixed
└───────────────┘


Vec<i32>:

┌───────────────┐        ┌───────────────┐
│ ptr len cap   │ ────▶  │ 10 20 30 40   │
└───────────────┘        └───────────────┘
```

# 5️⃣ Where they live (important)[|🔝|](#link)
- Local variable

```rs
let a = [1, 2, 3, 4];
let v = vec![1, 2, 3, 4];
```

```txt
Stack:
- a  → full array
- v  → only (ptr, len, cap)
```

```txt
Heap:
- v’s elements
```

# 6️⃣ Access cost (what the CPU does)[|🔝|](#link)
## Array access

```rs
a[i]
```

- CPU:

```rs
base_address + i * sizeof(T)
```
- ✔ Single address computation
- ✔ No pointer chasing

<hr />

## Vec access

```rs
v[i]
```
- CPU:

```txt
load ptr
ptr + i * sizeof(T)
```

- ❌ One extra load (usually cached)
- ✔ Still fast

# 7️⃣ Cache behavior (important difference)[|🔝|](#link)

## Array

```txt
┌────────────────────────────────┐
│ a0 a1 a2 a3 a4 a5 a6 a7 ...    │
└────────────────────────────────┘
```
- Always contiguous
- Perfect for cache + SIMD

## Vec

```txt
Stack: [ptr len cap]
Heap:  ┌────────────────────────┐
       │ v0 v1 v2 v3 v4 ...     │
       └────────────────────────┘
```

- Still contiguous
- But one level of indirection
- Heap placement may affect locality

# 8️⃣ Growing a Vec (reallocation diagram)[|🔝|](#link)

```rs
v.push(50);
```

- If capacity is exceeded:

```txt
Old heap:
┌───────────────┐
│ 10 20 30 40   │
└───────────────┘

Allocate new heap:
┌───────────────────────────┐
│ 10 20 30 40 50             │
└───────────────────────────┘

Update ptr, len, cap
Free old heap
```

- 🔥 This cannot happen with arrays.

# 9️⃣ Why arrays can be faster (sometimes)[|🔝|](#link)

```txt
✔ No heap allocation
✔ No reallocation
✔ Better cache predictability
✔ Better for SIMD
```

- But:

```txt
❌ Fixed size
❌ Large arrays may overflow stack
```

# 🔟 Why Vec is used everywhere[|🔝|](#link)

```txt
✔ Runtime-sized
✔ Can grow/shrink
✔ Easy to pass around
✔ Standard collection
```

- Rust APIs prefer:

```txt
&[T]  // slice
```
- Because both arrays and Vec can produce slices.

# 1️⃣1️⃣ Slice unifies both worlds[|🔝|](#link)

- 슬라이스는 두 세계를 통합합니다
```rs
fn foo(x: &[i32]) {}
```

```txt
Array → &[i32]
Vec   → &[i32]
```

- Memory:

```rs
Slice = (ptr, len)
```

```txt
┌───────────────┐
│ ptr len       │
└───────────────┘

```

- No ownership, just a view.

