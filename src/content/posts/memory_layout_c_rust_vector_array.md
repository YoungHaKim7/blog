---
title: memory_layout_c_rust_vector_array
published: 2026-09-11
description: 'C vs Rust메모리 할당을 비교해 보자/allocates **10 bytes** of heap memory, all initialized to zero. '
image: ''
tags: [rust, c, vector, array]
category: 'rust_Debugging_profiling'
draft: false 
lang: ''
---

# link
- [struct (C vs Rust) 비교해서 보기](../struct_in_c/#rust-%EA%B0%99%EC%9D%80-%EB%B2%A1%ED%84%B0-%EC%8A%A4%ED%83%80%EC%9D%BC)

<hr />

# C언어부터 알아보자
- Sure. Assuming `len = 10`, this:

```c
uint8_t *my_vec = calloc(len, sizeof(*my_vec));
```

allocates **10 bytes** of heap memory, all initialized to zero.

### CLI memory layout

```text
Stack
┌─────────────────────────────┐
│ my_vec                      │
│                             │
│ pointer ───────────────────────┐
└─────────────────────────────┘  │
                                 │
                                 ▼
Heap
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ byte 0  │ byte 1  │ byte 2  │ byte 3  │ byte 4  │
│   0     │   0     │   0     │   0     │   0     │
├─────────┼─────────┼─────────┼─────────┼─────────┤
│ byte 5  │ byte 6  │ byte 7  │ byte 8  │ byte 9  │
│   0     │   0     │   0     │   0     │   0     │
└─────────┴─────────┴─────────┴─────────┴─────────┘
   1 byte    1 byte    1 byte    1 byte    1 byte
```

Because:

```c
sizeof(uint8_t) == 1
```

we get:

```text
len                  = 10
sizeof(*my_vec)      = 1
calloc(10, 1)        = 10 bytes
```

### With hypothetical addresses

Suppose `calloc()` returns address `0x1000`:

```text
my_vec
   │
   │  0x1000
   ▼
Heap

Address       Value       my_vec[i]
───────────────────────────────────
0x1000        0           [0]
0x1001        0           [1]
0x1002        0           [2]
0x1003        0           [3]
0x1004        0           [4]
0x1005        0           [5]
0x1006        0           [6]
0x1007        0           [7]
0x1008        0           [8]
0x1009        0           [9]
```

So:

```c
my_vec[0]
```

means:

```text
*(my_vec + 0) → memory at 0x1000
```

and:

```c
my_vec[5]
```

means:

```text
*(my_vec + 5) → memory at 0x1005
```

### Important distinction

`my_vec` itself is **not the array**.

```text
Stack                         Heap

my_vec
┌──────────────┐
│ 0x1000       │──────────────► ┌───┬───┬───┬───┬───┐
└──────────────┘                 │ 0 │ 0 │ 0 │ 0 │ 0 │
   pointer                       ├───┼───┼───┼───┼───┤
                                 │ 0 │ 0 │ 0 │ 0 │ 0 │
                                 └───┴───┴───┴───┴───┘
                                  10 bytes
```

This is one of the key differences from Rust's `Vec<u8>`: the C pointer only tells you **where the allocation begins**. C does not automatically store the `len` alongside `my_vec`, which is why your code separately keeps:

```c
size_t len = 10;
```

So conceptually you have:

```text
my_vec ──► [ 0 ][ 0 ][ 0 ][ 0 ][ 0 ][ 0 ][ 0 ][ 0 ][ 0 ][ 0 ]
            └──────────────── 10 bytes ────────────────┘
len = 10
```


# The closest **C23 equivalent** is a dynamically allocated array initialized to 10 zero bytes.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t len = 10;

    unsigned char *my_vec = calloc(len, sizeof(*my_vec));

    if (my_vec == NULL) {
        return EXIT_FAILURE;
    }

    printf("my vec : [");

    for (size_t i = 0; i < len; ++i) {
        printf("%u", my_vec[i]);

        if (i + 1 < len) {
            printf(", ");
        }
    }

    printf("]\n");

    free(my_vec);

    return EXIT_SUCCESS;
}
```

### Rust → C23 mapping

| Rust                    | C23                           |
| ----------------------- | ----------------------------- |
| `let my_vec`            | `unsigned char *my_vec`       |
| `vec![0_u8; 10]`        | `calloc(10, sizeof(*my_vec))` |
| `u8`                    | `unsigned char`               |
| `my_vec.len()`          | `len`                         |
| `println!`              | `printf`                      |
| automatic `Vec` cleanup | `free(my_vec)`                |

The important part is:

```rust
let my_vec = vec![0_u8; 10];
```

which creates a `Vec<u8>` containing:

```text
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```

In C23:

```c
size_t len = 10;
unsigned char *my_vec = calloc(len, sizeof(*my_vec));
```

`calloc()` is particularly appropriate here because it **allocates memory and initializes all bytes to zero**.

If you want the C version to be closer to Rust's **`Vec` abstraction** (pointer + length + capacity), I can also show a C23 `struct Vec` implementation.

