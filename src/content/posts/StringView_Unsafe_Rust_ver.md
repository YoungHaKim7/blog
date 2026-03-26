---
title: StringView_Unsafe_Rust_ver
published: 2026-03-25
description: 'StringView(Unsafe Rust Version) 거의 C언어의 가까운 러스트 코드'
image: ''
tags: [UnsafeRust, c, StringView, rust]
category: 'Unsafe_Rust'
draft: false 
lang: ''
---

# link

- [C Strings are Terrible! | Tsoding | C의 String은 끔찍하다. ㅋ C String 정말 끔찍해! 자동 더빙 | Tsoding](https://youtu.be/y8PLpDgZc0E?si=vw2XopqAfMrteXDh)

- 같이 연관 되는 blog글
  - [These patterns prevent crashes, overflow, UB, or invalid memory access](../prevent_crashes_overflow_ub_invalid_memory_access/)
  - C & Rust로 구현한(StringView)
    - [StringView(C, Rust 코드 비교해서 정리)](../stringview/)

<hr />

- [C vs Rust comparison table](#-c-vs-rust-comparison-table)
- [Pointer comparison (important)](#-pointer-comparison-important)
- [Why Rust feels harder than C](#-why-rust-feels-harder-than-c)

- (code 라이별로 자세히 분석)Rust forces you to choose safety level.
  - [Your example shows the key difference](#-your-example-shows-the-key-difference)

<hr />

# ✅ Summary

| Feature                | C    | Rust          |
| ---------------------- | ---- | ------------- |
| Low level              | ✅    | ✅           |
| Safe by default        | ❌    | ✅           |
| Unsafe allowed         | ✅    | ✅           |
| Pointer math           | ✅    | unsafe       |
| Memory bugs possible   | many | few           |
| Performance            | high | high          |
| Kernel / exploit style | easy | unsafe needed |
| Modern safety          | no   | yes           |

- Rust = C + safety + ownership + optional unsafe

- C = raw power, no guardrails

# UnsafeRust(StringView)[|🔝|](#link)

- [unsafe rust 예시 코드](https://github.com/YoungHaKim7/glibc_The_GNU_C_Library_Training/tree/main/001_study_glibc/training_c/01_String_Tsoding/02_Unsafe_Rust/b01_string_view_impl)

```rs
// main.rs
struct StringView {
    data: *const u8,
    count: usize,
}

impl StringView {
    // equivalent to strlen
    fn c_strlen(mut s: *const u8) -> usize {
        let mut len = 0;

        unsafe {
            while *s != 0 {
                s = s.add(1);
                len += 1;
            }
        }

        len
    }

    // String_View sv(const char *cstr)
    fn sv(cstr: *const u8) -> Self {
        Self {
            data: cstr,
            count: Self::c_strlen(cstr),
        }
    }

    // void sv_chop_left(String_View *sv, size_t n)
    fn sv_chop_left(sv: *mut Self, mut n: usize) {
        unsafe {
            if n > (*sv).count {
                n = (*sv).count;
            }

            (*sv).count -= n;
            (*sv).data = (*sv).data.add(n);
        }
    }

    // void sv_chop_right(String_View *sv, size_t n)
    fn sv_chop_right(sv: *mut Self, mut n: usize) {
        unsafe {
            if n > (*sv).count {
                n = (*sv).count;
            }

            (*sv).count -= n;
        }
    }
}

fn main() {
    unsafe {
        // C string literal
        let cstr = b"Hello, World\0";

        let mut s = StringView::sv(cstr.as_ptr());

        StringView::sv_chop_right(&mut s, 3);
        StringView::sv_chop_left(&mut s, 2);

        // printf("%.*s\n", (int)s.count, s.data);
        let slice = std::slice::from_raw_parts(s.data, s.count);

        let text = std::str::from_utf8_unchecked(slice);

        println!("{}", text);
    }
}
```

- result

```bash
llo, Wo
```

- Here is a clear comparison table between C and Rust, focused on pointer, memory, struct, safety, and low-level behavior — based on your `String_View` / `StringView` example.
  - This table shows real differences in language design, not just syntax.

# ✅ C vs Rust comparison table[|🔝|](#link)

| Concept                | C                   | Rust                                  | Explanation                             |
| ---------------------- | ------------------- | ------------------------------------- | --------------------------------------- |
| Struct definition      | `typedef struct {}` | `struct {}`                           | Similar, but Rust has ownership rules   |
| Pointer to struct      | `String_View *`     | `*mut StringView` / `&mut StringView` | Rust separates raw pointer vs reference |
| Member access          | `sv->count`         | `sv.count` / `(*ptr).count`           | Rust references auto-deref              |
| Address of variable    | `&s`                | `&mut s` / `&s`                       | Rust distinguishes mutable / immutable  |
| Mutable / const        | none                | `mut` required                        | Rust must declare mutability            |
| Pointer arithmetic     | allowed             | only in `unsafe`                      | Rust forbids by default                 |
| Raw pointer read       | always allowed      | `unsafe` required                     | Rust checks safety                      |
| strlen                 | builtin library     | manual / unsafe                       | Rust has no null-string type            |
| String literal         | `"Hello"`           | `b"Hello\0"` or `"Hello"`             | Rust strings are not C strings          |
| Null-terminated string | default             | not default                           | Rust uses length + pointer              |
| Array bounds           | not checked         | checked (safe)                        | Rust prevents overflow                  |
| Slice                  | manual              | built-in `&[T]`                       | Rust slices store len                   |
| Printing string        | `printf("%.*s")`    | slice + utf8                          | Rust needs valid UTF-8                  |
| Function pointer arg   | pointer             | reference or pointer                  | Rust prefers references                 |
| Pointer vs reference   | same                | different types                       | Rust separates safety levels            |
| Memory safety          | manual              | enforced                              | Rust prevents UB                        |
| Dangling pointer       | possible            | prevented (safe)                      | unless unsafe                           |
| Use after free         | possible            | prevented                             | borrow checker                          |
| Double free            | possible            | prevented                             | ownership                               |
| Buffer overflow        | possible            | prevented                             | safe slice                              |
| Null pointer           | common              | rare                                  | Option / reference                      |
| Struct copy            | shallow copy        | move / copy trait                     | Rust tracks ownership                   |
| Default mutability     | mutable             | immutable                             | must use `mut`                          |
| Global variables       | easy                | restricted                            | Rust safer                              |
| Inline pointer math    | normal              | unsafe only                           | key difference                          |
| C style API            | natural             | needs unsafe                          | Rust wraps C                            |
| Compile checks         | few                 | many                                  | Rust compile-time safety                |
| Runtime cost           | low                 | low                                   | Rust = zero-cost abstraction            |
| UB risk                | high                | low                                   | Rust designed to avoid UB               |
| FFI support            | native              | excellent                             | Rust works with C                       |
| Kernel style code      | natural             | unsafe needed                         | but possible                            |
| Low-level control      | full                | full (unsafe)                         | Rust still allows                       |
| Safe high-level        | no                  | yes                                   | big Rust advantage                      |


# ✅ Pointer comparison (important)[|🔝|](#link)

| Concept      | C       | Rust safe     | Rust unsafe         |
| ------------ | ------- | ------------- | ------------------- |
| pointer      | `T *`   | `&T / &mut T` | `*const T / *mut T` |
| deref        | `*p`    | automatic     | `*p`                |
| pointer math | `p + 1` | ❌             | `p.add(1)`          |
| null         | allowed | no            | allowed             |
| UB check     | none    | compile-time  | none                |

# ✅ Why Rust feels harder than C[|🔝|](#link)

Because Rust forces you to choose:

| In C            | In Rust              |
| --------------- | -------------------- |
| pointer always  | pointer OR reference |
| mutable default | immutable default    |
| unsafe default  | safe default         |
| no ownership    | ownership required   |
| manual memory   | checked memory       |

- Rust makes you prove correctness at compile time.

# ✅ Your example shows the key difference[|🔝|](#link)

- C

```c
// main.c
sv->data += n;
```

- Rust unsafe

```rs
// main.rs
(*sv).data = (*sv).data.add(n);
```

- Rust safe (not possible with raw pointer)

```rs
// main.rs
sv.data = &sv.data[n..];
```

- Rust forces you to choose safety level.

