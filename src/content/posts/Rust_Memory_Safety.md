---
title: Rust_Memory_Safety
published: 2024-01-01
description: 'Rust Memory Safety'
image: ''
tags: [rust, UnsafeRust]
category: 'rust'
draft: false 
lang: ''
---

# link

- [(261002) Robert Seacord: "Unsafe Rust" | RustConf 2026 | Rust Foundation | 6분 32초에 나옴](https://youtu.be/bTAEymCp7Ts?si=hU9mPSXJZLZ5g-jO&t=392)

<hr />

# Rust memory Safety


|Memory Bug|How Rust Prevents It|
|-|-|
|Use-after-free|Ownership system; compiler rejects access after move|
|Double-free|Single ownership; only one drop|
|Dangling pointers|Lifetime analysis at compile time|
|Data races|Borrowing rules + `Send`/`Sync` traits|
|Buffer overflows|Bounds checking on array access; the type system also statically checks some buffers|
|Null dereference|`Option<T>` forces handing|
