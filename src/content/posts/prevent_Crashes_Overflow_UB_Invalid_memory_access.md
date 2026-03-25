---
title: prevent_Crashes_Overflow_UB_Invalid_memory_access
published: 2026-03-20
description: 'These patterns prevent crashes, overflow, UB, or invalid memory access.'
image: ''
tags: [rust, kernel]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link

- [C Strings are Terrible! | Tsoding | C의 String은 끔찍하다. ㅋ C String 정말 끔찍해! 자동 더빙 | Tsoding](https://youtu.be/y8PLpDgZc0E?si=vw2XopqAfMrteXDh)

- [StringView(C, Rust 코드 비교해서 정리)](../stringview/)


<hr />

# These patterns prevent crashes, overflow, UB, or invalid memory access.
- In systems programming (C, C++, Rust, Zig, kernel code, compilers, parsers, allocators, etc.), there are several very common defensive patterns like

# 0. Your pattern in context

- Your code uses these patterns:

| pattern               | where        |
| --------------------- | ------------ |
| clamp                 | min(count)   |
| pointer + len         | StringView   |
| check before move     | chop_left    |
| check before subtract | chop_right   |
| slice instead pointer | Rust version |
| defensive programming | whole code   |

- This is exactly the style used in:
  - Zig std
  - Rust std
  - LLVM
  - Linux kernel
  - SQLite
  - Redis
  - game engines

# 00. Core rule of systems programming

- Most common rules:

```txt
never trust input
never exceed length
never underflow
never overflow
never move pointer blindly
always clamp
always check
```

- These patterns appear everywhere in low-level code.

```txt
절대 신뢰할 수 없는 입력
길이를 초과하지 않음
절대로 흐르지 않음
절대 넘치지 않음
포인터를 맹목적으로 움직이지 않기
항상 클램프
항상 확인
```

- clamp
- In computer science, clamping, or clipping is the process of limiting a value to a range between a minimum and a maximum value. Unlike wrapping, Clamping moves a value to the nearest boundary if it is outside the allowed range. 
  - 컴퓨터 과학에서 클램핑 또는 클리핑은 값을 최소 값과 최대 값 사이의 범위로 제한하는 프로세스입니다. 래핑과 달리 클램핑은 허용 범위를 벗어난 경우 값을 가장 가까운 경계로 이동합니다.
- https://en.wikipedia.org/wiki/Clamp_(function)

# 1. Clamp pattern (min / max)
- Pattern
```c
// main.c
if (n > len)
    n = len;
```

- Rust:

```rs
let n = n.min(len);
```

- Meaning:

> Never exceed bounds

- Used in:
  - string slicing
  - buffer writing
  - reading files
  - network packets
  - parsers

- Example:

```rs
fn read(buf: &mut [u8], n: usize) {
    let n = n.min(buf.len());
}
```
# 2. Clamp to range (min + max)

- Pattern:
```rs
// main.rs
x = x.clamp(min, max);
```

- Same as:

```c
// main.c
if (x < min) x = min;
if (x > max) x = max;
```

- Example:

```rs
// main.rs
let volume = volume.clamp(0, 100);
```

- Used in:
  - graphics
  - audio
  - physics
  - UI
  - game engines

# 3. Check before pointer move

- Very common in C.

```c
// main.c
if (ptr + n <= end)
    ptr += n;
```

- Rust equivalent:

```rs
// main.rs
if n <= slice.len() {
    slice = &slice[n..];
}
```

- Meaning:

> Never move pointer past end

- Used in:
  - parsers
  - lexers
  - binary readers
  - networking

# 4. Length + pointer pair pattern

- Used in your example.

```txt
pointer + length
```

- C: 

```c
// main.c
char *data;
size_t len;
```

- Rust:

```rs
&[u8]
&str
```

- Used in:
  - string_view
  - slices
  - buffers
  - kernel code
  - compilers

- Example:

```rs
struct View<'a> {
    data: &'a [u8],
    len: usize,
}
```

# 5. Check before subtract

- Pattern:

```c
// main.c
if (n > len)
    n = len;

len -= n;
```

```rs
// main.rs
let n = n.min(len);
len -= n;
```

- Meaning:

> Never underflow

- Why?
  - Because unsigned:

```c
// main.c
size_t len = 5;
len -= 10;  
```

- Result:
```txt
huge number (underflow)
```
- Very dangerous.

- Used in:
  - allocators
  - containers
  - string_view
  - ring buffers

# 6. Null / empty check pattern

- C:  

```c
// main.c
if (ptr == NULL)
    return;
```

- Rust

```rs
if slice.is_empty() {
    return;
}
```

- Meaning:

> Handle empty case first

- Used everywhere.

# 7. Early return pattern

- Very common in kernel / Rust / C.

```rs
// main.rs
if n == 0 {
    return;
}
```

- or

```c
// main.c
if (!ptr)
    return;
```

- Meaning:

> Exit early to keep code safe

- Used in:
  - OS kernels
  - drivers
  - parsers
  - allocators

# 8. Saturating arithmetic pattern

- Rust:

```rs
// main.rs
x = x.saturating_add(y);
x = x.saturating_sub(y);
```

- Meaning:

> Never overflow

- Example:

```rs
// main.rs
let x: u8 = 250;
let y = x.saturating_add(10); // 255, not overflow
```

- Used in:
  - embedded
  - kernel
  - graphics
  - DSP

- C equivalent:

```c
// main.c
if (x > MAX - y)
    x = MAX;
else
    x += y;
```

# 9. Checked arithmetic pattern

- Rust:

```rs
// main.rs
x.checked_add(y)
```

- Returns Option.

- Used when overflow must be detected.

- Example:

```rs
// main.rs
if let Some(v) = x.checked_add(y) {
    x = v;
}
```

- Used in:
  - crypto
  - big integers
  - parsers
  - compilers

# 10. Slice instead of pointer math (Rust pattern)

- C:

```c
// main.c
ptr += n;
len -= n;
```

- Rust:

```rs
// main.rs
slice = &slice[n..];
```

- Safer.

- Used everywhere in Rust std.

# 11. Defensive copy length pattern

- C:

```c
// main.c
memcpy(dst, src, min(dst_size, src_size));
```

- Rust:

```rs
// main.rs
let n = dst.len().min(src.len());
dst[..n].copy_from_slice(&src[..n]);
```

- Used in:
  - networking
  - kernel
  - file IO
  - serialization

# 12. Bounds check before index

- C:  

```c
// main.c
if (i < len)
    x = arr[i];
```

- Rust:

```rs
// main.rs
if let Some(x) = arr.get(i) {
}
```

- Used everywhere.

# 13. Sentinel / end pointer pattern

- C parsers use this:

```c
// main.c
while (ptr < end)
```

- Rust:

```rs
// main.rs
while !slice.is_empty()
```

- Used in:
  - compilers
  - lexers
  - JSON parsers
  - HTTP parsers



