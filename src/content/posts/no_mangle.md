---
title: no_mangle
published: 2026-10-15
description: 'The `#[no_mangle]` attribute in Rust tells the compiler not to change (mangle) the name of a function or variable in the compiled binary.'
image: ''
tags: [attribute, rust, FFI, OS]
category: 'rust_attribute'
draft: false 
lang: ''
---


- The `#[no_mangle]` attribute in Rust tells the compiler not to change (mangle) the name of a function or variable in the compiled binary.

# What is Name Mangling?

- Normally, the Rust compiler transforms your original function names into an encoded string (e.g., adding module paths, crate names, and type signatures) so the linker can uniquely identify them.

# Why Use `#[no_mangle]`?

- • Foreign Function Interface (FFI): It allows other languages like C, C++, or Python to call your Rust code by looking up the exact, plain function name you wrote instead of a scrambled compiler symbol.
- • WebAssembly (WASM): It keeps exported Rust functions visible and accessible when compiled to WASM.
- • Entry Points / Plugins: It preserves the raw symbol name for dynamic linking or loading shared libraries.
  - https://stackoverflow.com/questions/78221495/why-is-no-mangle-required-to-see-rust-functions-in-wasm-library

## Important Notes

- • Safety & Unsafe Attributes: Because disabling name mangling can lead to symbol name collisions and undefined behavior if two different libraries use the same name, modern Rust (Edition 2024 / Rust 1.82+) requires writing it as #[unsafe(no_mangle)] to acknowledge these safety risks.
- • Usage Example:
  - https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html

```rs
#[unsafe(no_mangle)]
pub extern "C" fn hello_from_rust() {
    println!("Hello from Rust!");
}
```

- Are you trying to call Rust from C/C++, export a function to WebAssembly, or fix a compiler warning about unsafe attributes?
