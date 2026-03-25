---
title: StringView
published: 2026-03-20
description: 'StringView(C, Rust)'
image: ''
tags: [rust, kernel, c, compiler, MachineLearning]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link

- [C Strings are Terrible! | Tsoding | C의 String은 끔찍하다. ㅋ C String 정말 끔찍해! 자동 더빙 | Tsoding](https://youtu.be/y8PLpDgZc0E?si=vw2XopqAfMrteXDh)

# C vs Rust pointer comparison

| Concept           | C               | Rust              |
| ----------------- | --------------- | ----------------- |
| pointer to struct | `String_View *` | `&mut StringView` |
| arrow             | `sv->count`     | `sv.count`        |
| address           | `&s`            | `&mut s`          |
| modify            | pointer         | mutable reference |
| pointer math      | allowed         | not allowed       |
| slicing           | manual          | built-in          |

# C code

- [sample code](https://github.com/YoungHaKim7/glibc_The_GNU_C_Library_Training/tree/main/001_study_glibc/training_c/01_String_Tsoding/a08_string_view_custom)

```c
// main.c
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    const char *data;
    size_t count;
} String_View;

// Hello, World0...
// ^          ^

String_View sv(const char *cstr) {
    return (String_View){
        .data = cstr,
        .count = strlen(cstr),
    };
}

void sv_chop_left(String_View *sv, size_t n) {
    if (n > sv->count)
        n = sv->count;
    sv->count -= n;
    sv->data += n;
}

void sv_chop_right(String_View *sv, size_t n) {
    if (n > sv->count)
        n = sv->count;
    sv->count -= n;
}

int main() {
    String_View s = sv("Hello, World");
    sv_chop_right(&s, 3);
    sv_chop_left(&s, 2);
    printf("%.*s\n", (int)s.count, s.data);

    return 0;
}
```

# Rust code

```rs
// main.rs
#[derive(Debug, Clone, Copy)]
struct StringView<'a> {
    data: &'a str,
    count: usize,
}

impl<'a> StringView<'a> {
    fn sv(s: &'a str) -> Self {
        Self {
            data: s,
            count: s.len(),
        }
    }

    fn sv_chop_left(sv: &mut Self, n: usize) {
        let n = n.min(sv.count);

        sv.data = &sv.data[n..];
        sv.count -= n;
    }

    fn sv_chop_right(sv: &mut Self, n: usize) {
        let n = n.min(sv.count);

        sv.count -= n;
        sv.data = &sv.data[..sv.count];
    }
}

fn main() {
    let mut s = StringView::sv("Hello, World");

    StringView::sv_chop_right(&mut s, 3);
    StringView::sv_chop_left(&mut s, 2);

    println!("{}", s.data);
}
```

- Result

```bash
llo, Wo
```
