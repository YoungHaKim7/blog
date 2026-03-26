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

- C & Rust로 구현한(StringView)

- 같이 연관 되는 blog글
  - [These patterns prevent crashes, overflow, UB, or invalid memory access](../prevent_crashes_overflow_ub_invalid_memory_access/)
  - [StringView(C, Rust 코드 비교해서 정리)](../stringview/)

- [unsafe rust 예시 코드](https://github.com/YoungHaKim7/glibc_The_GNU_C_Library_Training/tree/main/001_study_glibc/training_c/01_String_Tsoding/02_Unsafe_Rust/b01_string_view_impl)

# UnsafeRust(StringView)

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
