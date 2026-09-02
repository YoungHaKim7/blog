---
title: rust-documentation_comments
published: 2026-08-02
description: 'In Rust, both /// and //! are documentation comments, but they document different things.'
image: ''
tags: [rust, doc]
category: 'rust_Documentation'
draft: false 
lang: ''
---

# link

<hr />

# Rust Documentation

In Rust, both `///` and `//!` are **documentation comments**, but they document **different things**.

The easiest way to remember them is:

> **`///` documents the item that follows.**
> **`//!` documents the item that contains it.**

---

## 1. `///` — documents the next item

`///` is called an **outer documentation comment**.

It is attached to the item immediately following it: a function, struct, enum, trait, module, constant, etc.

```rust
/// Adds two numbers together.
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

This is essentially equivalent to:

```rust
#[doc = "Adds two numbers together."]
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

So:

```rust
/// Documentation
fn foo() {}
```

means:

```text
Documentation
     ↓
    foo()
```

### Struct example

```rust
/// Represents a 3D point.
struct Point {
    /// X coordinate.
    x: f32,

    /// Y coordinate.
    y: f32,

    /// Z coordinate.
    z: f32,
}
```

Each `///` documents the thing immediately following it.

---

# 2. `//!` — documents the containing item

`//!` is called an **inner documentation comment**.

It documents the **module or crate containing the comment**, rather than the item after it.

For example:

```rust
//! This module provides mathematical utilities.

/// Adds two numbers.
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

Here:

```rust
//! This module provides mathematical utilities.
```

documents the **module itself**.

While:

```rust
/// Adds two numbers.
```

documents `add()`.

---

# 3. The important difference

Consider this file:

```rust
//! Math utilities for the application.

/// Adds two integers.
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

/// Multiplies two integers.
pub fn multiply(a: i32, b: i32) -> i32 {
    a * b
}
```

The documentation hierarchy is approximately:

```text
crate/module
│
├── Math utilities for the application.
│
├── add()
│   └── Adds two integers.
│
└── multiply()
    └── Multiplies two integers.
```

So:

| Syntax | Name              | Documents               |
| ------ | ----------------- | ----------------------- |
| `///`  | Outer doc comment | The **next item**       |
| `//!`  | Inner doc comment | The **containing item** |

---

# 4. Why is `//!` commonly used at the top of `lib.rs`?

This is one of the most important uses.

Suppose you have:

```text
my_project/
├── Cargo.toml
└── src/
    └── lib.rs
```

You can put:

```rust
//! # My Library
//!
//! A library for processing images.
//!
//! ## Features
//!
//! - Image loading
//! - Image manipulation
//! - Image saving

pub mod image;
pub mod color;
```

Because `//!` is an **inner doc comment**, it documents the **crate itself**.

When you run:

```bash
cargo doc
```

this becomes the documentation for the crate's main documentation page.

Conceptually:

```text
My Library
│
├── A library for processing images.
│
├── image
│
└── color
```

---

# 5. `///` inside `lib.rs`

You would normally use `///` for the public API:

```rust
//! # My Library
//!
//! Image processing library.

/// Represents an image.
pub struct Image {
    width: u32,
    height: u32,
}

/// Creates a new image.
pub fn create_image(width: u32, height: u32) -> Image {
    Image { width, height }
}
```

The resulting documentation has roughly:

```text
My Library
│
├── Image
│   └── Represents an image.
│
└── create_image()
    └── Creates a new image.
```

---

# 6. `//!` inside a module

It isn't restricted to `lib.rs`.

Suppose:

```text
src/
├── lib.rs
└── graphics.rs
```

`graphics.rs` could contain:

```rust
//! Graphics functionality.
//!
//! This module provides rendering-related types and functions.

/// Represents a vertex.
pub struct Vertex {
    pub x: f32,
    pub y: f32,
}

/// Creates a vertex.
pub fn vertex(x: f32, y: f32) -> Vertex {
    Vertex { x, y }
}
```

Here:

```rust
//! Graphics functionality.
```

documents the `graphics` module.

And:

```rust
/// Represents a vertex.
```

documents `Vertex`.

---

# 7. You can also use `//!` inside a module declaration

For example:

```rust
mod graphics {
    //! Everything related to graphics rendering.

    /// Represents a vertex.
    pub struct Vertex {
        pub x: f32,
        pub y: f32,
    }
}
```

The `//!` belongs to the `graphics` module.

---

# 8. Why are they called "outer" and "inner"?

This terminology comes from Rust's attribute syntax.

### Outer attribute

```rust
/// Documentation
struct Foo;
```

is an outer attribute applied **to the following item**.

Conceptually:

```rust
#[doc = "Documentation"]
struct Foo;
```

The attribute is **outside** the item.

---

### Inner attribute

```rust
//! Documentation
```

is conceptually:

```rust
#![doc = "Documentation"]
```

Notice the `!`:

```rust
#[doc = "..."]   // outer
#![doc = "..."]  // inner
```

The `!` means the attribute applies to the **containing item**.

That's the fundamental reason for the difference.

---

# 9. `///` vs `//!` visually

Think of it this way:

### `///`

```rust
/// What is Foo?
struct Foo;
```

```text
/// ────────┐
           ↓
        struct Foo
```

It describes **Foo**.

---

### `//!`

```rust
mod foo {
    //! What is this module?
    
    pub struct Bar;
}
```

```text
       mod foo
    ┌─────────────┐
    │ //! ───────┐ │
    │            ↓ │
    │ module itself│
    │             │
    │ Bar         │
    └─────────────┘
```

It describes **`foo` itself**.

---

# 10. A practical Rust project example

For a library, you might structure documentation like this:

```rust
//! # Vulkan Renderer
//!
//! A Vulkan rendering library written in Rust.
//!
//! This crate provides abstractions for:
//!
//! - Vulkan devices
//! - Swapchains
//! - Graphics pipelines
//! - Command buffers

pub mod device;
pub mod pipeline;
pub mod swapchain;
```

Then:

### `device.rs`

```rust
//! Vulkan device management.
//!
//! This module is responsible for creating and managing Vulkan devices.

/// Represents a Vulkan device.
pub struct Device {
    // ...
}

/// Creates a Vulkan device.
pub fn create_device() -> Device {
    // ...
}
```

### `pipeline.rs`

```rust
//! Graphics pipeline management.

/// Represents a Vulkan graphics pipeline.
pub struct Pipeline {
    // ...
}

/// Creates a graphics pipeline.
pub fn create_pipeline() -> Pipeline {
    // ...
}
```

This gives you a nice documentation hierarchy:

```text
Vulkan Renderer
│
├── device
│   │
│   ├── Device
│   │   └── Represents a Vulkan device.
│   │
│   └── create_device()
│       └── Creates a Vulkan device.
│
├── pipeline
│   │
│   ├── Pipeline
│   │   └── Represents a Vulkan graphics pipeline.
│   │
│   └── create_pipeline()
│       └── Creates a graphics pipeline.
│
└── swapchain
```

---

## 11. One more important distinction: `//` vs `///`

Don't confuse ordinary comments with documentation comments.

```rust
// This is an ordinary comment.
/// This is a documentation comment.
```

Ordinary:

```rust
// This function adds two numbers.
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

does **not** become part of `cargo doc`.

But:

```rust
/// Adds two numbers.
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

does.

Similarly:

```rust
//! This is crate/module documentation.
```

becomes part of generated Rust documentation.

---

## The rule to memorize

```text
///  → document the NEXT item
//!  → document the CONTAINING item
```

Or even shorter:

```text
/// = "What is this thing?"
 //! = "What is this module/crate?"
```

For most Rust projects:

```rust
//! Crate-level documentation goes here.

/// Public API documentation goes here.
pub struct MyStruct;

/// Function documentation goes here.
pub fn my_function() {}
```

And when you run:

```bash
cargo doc --open
```

Rustdoc uses these comments to build the HTML API documentation.

