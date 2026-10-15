---
title: cdylib_ABI_dylib
published: 2026-10-15
description: 'cdylib VS dylib'
image: ''
tags: [ABI, FFI, rust, dll, so, dylib, cdylib]
category: 'rust_ABI'
draft: false 
lang: ''
---

# link

- [러스트 1.99 에서 정리한거 ABI(release)](https://github.com/YoungHaKim7/rust_release/tree/main/rust1_99_ABI)


<hr />

# `cdylib`

- A cdylib (C-interface dynamic library) is a target type in Rust used to compile your project into a shared dynamic library designed to be loaded by other languages or external runtimes (such as C, C++, Python, Node.js, or Java via JNI).
  - When you build a cdylib, the Rust compiler strips out Rust-specific metadata and outputs a standard system dynamic library:
- When you build a cdylib, the Rust compiler strips out Rust-specific metadata and outputs a standard system dynamic library:
  - https://doc.rust-lang.org/reference/linkage.html

- • Linux: `.so`
- • macOS: `.dylib`
- • Windows: `.dll`


## How to Configure `cdylib` in Cargo

- To configure your Rust library to compile as a `cdylib`, add the crate-type array to your `Cargo.toml` file under the `[lib]` section:

```toml
[package]
name = "my_ffi_library"
version = "0.1.0"
edition = "2021"

[lib]
# "cdylib" produces the C-compatible dynamic library.
# "rlib" is optionally included so you can still use it as a normal Rust dependency.
crate-type = ["cdylib", "rlib"]
```


## Basic Implementation Example

- When writing code for a `cdylib`, you generally expose functions using the C calling convention (`extern "C"`) and prevent Rust from mangling the function names (`#[no_mangle]`):

- `src/lib.rs` :


```rs
#[no_mangle]
pub extern "C" fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}
```


## Building the Project

- Compile the library using the standard Cargo command:


```bash
cargo build --release
```

- After compilation, your compiled shared library file will be available in the target directory:
  - • `target/release/libmy_ffi_library.so` (Linux)
  - • `target/release/libmy_ffi_library.dylib` (macOS)
  - • `target/release/my_ffi_library.dll` (Windows)

## `cdylib` vs `dylib`

|Library<br />Type|Primary Purpose|Characteristics|
|-|-|-|
|`cdylib`|For external languages / FFI (Python, C, Node.js, etc.).|Monolithic binary with unused Rust symbols stripped out. It only exports functions explicitly marked `#[no_mangle]`.|
|`dylib`|For Rust-to-Rust dynamic linking.|Retains internal Rust compiler metadata and layout specifics, meaning it expects the exact same compiler version for dependencies.|


## Advanced: Passing Linker Arguments

- If your dynamic library requires custom linker flags (such as setting an explicit `soname` on Linux or managing symbols), you can target `cdylib` targets specifically inside a `build.rs` script using the `cargo::rustc-link-arg-cdylib` instruction:
  - https://doc.rust-lang.org/cargo/reference/build-scripts.html

```rs
// build.rs
fn main() {
    // This flag is only applied when building the cdylib artifact
    println!("cargo::rustc-link-arg-cdylib=-Wl,-rpath,@loader_path");
}
```

- If you are trying to implement something specific, let me know:
  - • What language or tool will be consuming this library?
  - • Do you need assistance with complex data types (like strings or structs) across the FFI boundary?
