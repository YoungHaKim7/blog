---
title: pub_crate_access_mod
published: 2025-12-20
description: 'pub pub(crate) super 사용법(mod)'
image: ''
tags: [rust, pub, crate, super, mod]
category: 'rust'
draft: false 
lang: ''
---

# link



<hr />

# pub로 비공개 or 공개용 범위 조절로 내 맘대로 통제하기

`pub(in crate::vulkan::pipeline)` is a **restricted visibility modifier** in Rust.

It means:

> **This item is public, but only within the `crate::vulkan::pipeline` module and its descendants.**

Your code:

```rust
pub(in crate::vulkan::pipeline) unsafe fn new(
    context: &DeviceBundle,
    swapchain: &SwapchainBundle,
    shader_module: vk::ShaderModule,
    vertex_entry: &str,
    fragment_entry: &str,
) -> Self
```

### Compare the visibility modifiers

```rust
pub fn new(...)
```

Accessible **everywhere** the containing type is accessible.

```rust
pub(crate) fn new(...)
```

Accessible anywhere inside the **current crate**.

```rust
pub(super) fn new(...)
```

Accessible from the **parent module** and its descendants.

```rust
pub(in crate::vulkan::pipeline) fn new(...)
```

Accessible only from:

```text
crate
└── vulkan
    └── pipeline   ← allowed
        ├── ...
        └── children ← allowed
```

But **not** from unrelated modules:

```text
crate
├── vulkan
│   └── pipeline   ← allowed
│
└── renderer       ← NOT allowed
```

### Why use this?

Suppose your project looks like:

```text
src/
└── vulkan/
    ├── mod.rs
    ├── pipeline/
    │   ├── mod.rs
    │   ├── graphics.rs
    │   └── shader.rs
    └── device.rs
```

You might want `Pipeline::new()` to be available to the various pipeline implementation modules, but **not to the entire crate**.

So:

```rust
pub(in crate::vulkan::pipeline) unsafe fn new(...)
```

essentially says:

> "Make `new` visible to my pipeline subsystem, but don't expose it to the rest of the crate."

This is useful for **encapsulation**.

### A useful way to remember it

Think of:

```rust
pub(in crate::vulkan::pipeline)
```

as:

```text
pub, but only inside this module namespace
```

It's more restrictive than:

```rust
pub(crate)
```

because `pub(crate)` opens access to the **entire crate**, while `pub(in ...)` opens it only to a **specific module subtree**.
