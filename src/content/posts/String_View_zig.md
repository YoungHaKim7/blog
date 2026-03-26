---
title: String_View_zig
published: 2026-03-27
description: 'String_View(C-> Zig) zig version (0.16.0-dev.2984+cb7d2b056)'
image: ''
tags: [zig, StringView, strlen]
category: 'zig'
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

# Zig Code

- [sample zig code](https://github.com/YoungHaKim7/glibc_The_GNU_C_Library_Training/tree/main/001_study_glibc/training_c/01_String_Tsoding/03_Zig_Code/string_view_zig)

- `zig version (0.16.0-dev.2984+cb7d2b056)`

```zig
// main.zig
const std = @import("std");
const Io = std.Io;

const string_view_zig = @import("string_view_zig");

const StringView = struct {
    data: [*]const u8,
    count: usize,

    // String_View sv(const char *cstr)
    pub fn sv(cstr: [*:0]const u8) StringView {
        return StringView{
            .data = cstr,
            .count = std.mem.len(cstr),
        };
    }

    pub fn chopLeft(self: *StringView, n: usize) void {
        var k = n;
        if (k > self.count) {
            k = self.count;
        }

        self.count -= k;
        self.data += k;
    }

    pub fn chopRight(self: *StringView, n: usize) void {
        var k = n;
        if (k > self.count) {
            k = self.count;
        }

        self.count -= k;
    }
};

pub fn main(init: std.process.Init) !void {
    try std.Io.File.stdout().writeStreamingAll(init.io, "StringView zig lang (ver0.16.0-dev.2984+cb7d2b056)\n\n\n");

    var s = StringView.sv("Hello, World");

    s.chopRight(3);
    s.chopLeft(2);

    std.debug.print("{s}\n", .{s.data[0..s.count]});
}
```

- result

```bash
$ zig build run

StringView zig lang (ver0.16.0-dev.2984+cb7d2b056)


llo, Wo
```


# zig코드 자세히 분석

## pointer to a null-terminated C string.

- In Zig,

```zig
cstr: [*:0]const u8
```

- means pointer to a null-terminated C string.
- I used this type because your original C code takes const char *, and in C that usually means a 0-terminated string.

- Let's break it down.

## 1. Your C code

```c
String_View sv(const char *cstr) {
    return (String_View){
        .data = cstr,
        .count = strlen(cstr),
    };
}
```
- Here:

```c
// main.c
const char *cstr
```
- means:

  - pointer to char
  - string must end with `'\0'`
  - required by `strlen`

- So Zig must use a type that guarantees null-termination.

## 2. Meaning of `[ *:0 ]const u8` in Zig

```zig
[*:0]const u8
```

- Breakdown:

| Part    | Meaning                              |
| ------- | ------------------------------------ |
| `u8`    | byte (same as char)                  |
| `const` | read-only                            |
| `[*]`   | pointer to many items                |
| `:0`    | sentinel value = 0 (null terminator) |

- So:

```zig
[*:0]const u8
```
- means

> pointer to many bytes, terminated by 0

- Exactly like:

```c
// main.c
const char *
```

- but **safer**, because Zig knows there is a terminator.

## 3. Why not []const u8 ?

- Because this:

```zig
[]const u8
```

- is a slice, not a C string.

- Slice already has length:

```txt
ptr + len
```

- So you don't need `strlen`.

- Your C code uses `strlen`, so we need null-terminated string.

## 4. Why `std.mem.len(cstr)` works

- `std.mem.len` expects a sentinel pointer:

```zig
std.mem.len(cstr)
```

- Works only if type is:

```zig
[*:0]const u8
```
- because it scans until `0`.

- Same as:

```c
// main.c
strlen(cstr)
```

## 5. If we used wrong type (example)

- ❌ Wrong:

```zig
pub fn sv(cstr: []const u8) StringView
```

- Then this fails:

```zig
std.mem.len(cstr) // error
```

- because slice already has length.

## 6. Summary

| Zig type        | Meaning                 | C equivalent     |
| --------------- | ----------------------- | ---------------- |
| `[*:0]const u8` | null-terminated pointer | `const char *`   |
| `[]const u8`    | slice (ptr + len)       | pointer + length |
| `[*]const u8`   | pointer without length  | raw pointer      |

- So I used:

```zig
// main.zig
cstr: [*:0]const u8
```

- because your C code uses:

```c
// main.c
const char * + strlen
```
- which requires a **null-terminated string**.


