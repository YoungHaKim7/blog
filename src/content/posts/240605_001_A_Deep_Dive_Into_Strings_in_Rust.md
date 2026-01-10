---
title: 240605_001_A_Deep_Dive_Into_Strings_in_Rust
published: 2024-06-05
description: 'A Deep Dive into Strings in Rust'
image: ''
tags: [rust, String, c, std]
category: 'rust'
draft: false 
lang: ''
---

# link

- [001_A Deep Dive Into Strings in Rust(러스트 코드)](#001_a-deep-dive-into-strings-in-rust-c-lang)
- [C코드로 xxd분석까지 해보기](#c언어로-인수를-받아보자)

<hr />

# (출처) Working with strings in Rust[|🔝|](#link) 
- Feb 19, 2020 
  - https://fasterthanli.me/articles/working-with-strings-in-rust

# 001_A Deep Dive Into Strings in Rust(& C lang)[|🔝|](#link)

- 인수를 받아서 단어를 출력해 보자.

- for-loop(Rust code)

```rs
// for_loop_args.rs
fn main() {
    for (i, arg) in std::env::args().skip(1).enumerate() {
        println!("arg[{}] = {}", i, arg);
    }
}

```

- closure

```rs
// closure_args.rs
fn main() {
    std::env::args()
        .skip(1)
        .enumerate()
        .for_each(|(i, arg)| {
            println!("arg[{}] = {}", i, arg);
        });
}
```

- result

```bash
$ cargo run -- hello 안녕

arg[0] = hello
arg[1] = 안녕
```


# C언어로 인수를 받아보자.[|🔝|](#link) 


```c
// print.c
#include <stdio.h> // for printf

int main(int argc, char **argv) {
    printf("argv = %p\n", *argv); // new !
    for (int i = 0; i < argc; i++) {
        char *arg = argv[i];
        printf("argv[%d] = %p\n", i, argv[i]); // new !
        printf("%s\n", arg);
    }

    return 0;
}
```

- result

```bash
$ gcc print.c -o a02_str_printf_mem
./print "ready" "set" "go"
argv = 0x16b152c40
argv[0] = 0x16b152c40
./build/./target/a02_str_printf_mem
argv[1] = 0x16b152c64
ready
argv[2] = 0x16b152c6a
set
argv[3] = 0x16b152c6e
go
```


```bash
인수를 처리하기 위해(0x24)
10진수로 36 bytes
a02_str_printf_mem
argv[0] = 0x16b152c40


argv[2] = 0x16b152c6a

ready  5bytes + 1bytes(\null)
총 6bytes 소모


  
```


- xxd로 분석

```bash

❯ ./build/./target/a02_str_printf_mem "ready" "set" "go" | xxd -g 1
00000000: 61 72 67 76 20 3d 20 30 78 31 36 66 61 32 65 63  argv = 0x16fa2ec
00000010: 34 30 0a 61 72 67 76 5b 30 5d 20 3d 20 30 78 31  40.argv[0] = 0x1
00000020: 36 66 61 32 65 63 34 30 0a 2e 2f 62 75 69 6c 64  6fa2ec40../build
00000030: 2f 2e 2f 74 61 72 67 65 74 2f 61 30 32 5f 73 74  /./target/a02_st
00000040: 72 5f 70 72 69 6e 74 66 5f 6d 65 6d 0a 61 72 67  r_printf_mem.arg
00000050: 76 5b 31 5d 20 3d 20 30 78 31 36 66 61 32 65 63  v[1] = 0x16fa2ec
00000060: 36 34 0a 72 65 61 64 79 0a 61 72 67 76 5b 32 5d  64.ready.argv[2]
00000070: 20 3d 20 30 78 31 36 66 61 32 65 63 36 61 0a 73   = 0x16fa2ec6a.s
00000080: 65 74 0a 61 72 67 76 5b 33 5d 20 3d 20 30 78 31  et.argv[3] = 0x1
00000090: 36 66 61 32 65 63 36 65 0a 67 6f 0a              6fa2ec6e.go.

```

- hex16진수로 봐야한다.

```bash
00000030: 2f 2e 2f 74 61 72 67 65 74 2f 61 30 32 5f 73 74  /./target/a02_st

2f 2e 2f 74 61 72 67 65 74 2f 61  30 32 5f  73 74
/  .  /  t  a  r   g e  t  /  a    0  2  _  s  t 

```


