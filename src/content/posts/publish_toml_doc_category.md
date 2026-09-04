---
title: publish_toml_doc_category
published: 2026-09-04
description: 'Category Slogs & cargo publish & doc basic'
image: ''
tags: [rust, doc]
category: 'rust_Documentation'
draft: false 
lang: ''
---

# link

- [참고 프로젝트](https://github.com/YoungHaKim7/cpu_6502-rs)


# github README와 crate.io글을 분리하는 방법은?

- crate.io.md작성하면 crates글과 분리된다


```bash
README.md
crates-io.md
```

## 내꺼 는

- https://github.com/YoungHaKim7/cpu_6502-rs

```toml
[package]
name = "cpu_6502-rs"
version = "0.1.0"
edition = "2024"
rust-version = "1.98"
license = "MIT"
description = "Rust port of the C++ 6502 emulator - learning how a CPU works by emulating one"
repository = "https://github.com/YoungHaKim7/cpu_6502-rs"
documentation = "https://docs.rs/cpu_6502-rs"
keywords = ["cpu", "emulator"]
categories = ["emulators"] 
```

# toml category 분리는 여기 키워드 참고

- https://crates.io/category_slugs

# 해외 다른 github을 보고 따라하자

- https://crates.io/
  - https://crates.io/categories/api-bindings


### 글 참고
- https://github.com/rust-lang/socket2

- `Cargo.toml`

```toml
[package]
name          = "socket2"
version       = "0.6.5"
authors       = [
  "Alex Crichton <alex@alexcrichton.com>",
  "Thomas de Zeeuw <thomasdezeeuw@gmail.com>"
]
license       = "MIT OR Apache-2.0"
readme        = "README.md"
repository    = "https://github.com/rust-lang/socket2"
homepage      = "https://github.com/rust-lang/socket2"
documentation = "https://docs.rs/socket2"
description = """
Utilities for handling networking sockets with a maximal amount of configuration
possible intended.
"""
keywords      = ["io", "socket", "network"]
categories    = ["api-bindings", "network-programming"]
edition       = "2021"
rust-version  = "1.70"
include       = [
  "Cargo.toml",
  "LICENSE-APACHE",
  "LICENSE-MIT",
  "README.md",
  "src/**/*.rs",
]

[package.metadata.docs.rs]
all-features = true
default-target = "x86_64-unknown-linux-gnu"
targets = [
  "aarch64-apple-ios",
  "aarch64-linux-android",
  "armv7-linux-androideabi",
  "i686-linux-android",
  "x86_64-apple-darwin",
  "x86_64-pc-solaris",
  "x86_64-pc-windows-msvc",
  "x86_64-unknown-freebsd",
  "x86_64-unknown-fuchsia",
  "x86_64-unknown-illumos",
  "x86_64-unknown-linux-gnu",
  "x86_64-unknown-linux-musl",
  "x86_64-unknown-netbsd",
  "x86_64-unknown-redox",
]

[package.metadata.playground]
features = ["all"]

[target.'cfg(any(unix, target_os = "wasi"))'.dependencies]
libc = "0.2.189"

[target.'cfg(windows)'.dependencies.windows-sys]
version = ">=0.60, <0.62"
features = [
  "Win32_Foundation",
  "Win32_Networking_WinSock",
  "Win32_System_IO",
  "Win32_System_Threading",
  "Win32_System_WindowsProgramming",
]

[features]
# Enable all API, even ones not available on all OSs.
all = []

[package.metadata.cargo_check_external_types]
allowed_external_types = [
  # Referenced via a type alias.
  "libc::socklen_t",
  "libc::*::socklen_t", # libc::socklen_t isn't always detected.
  "libc::sa_family_t",
  "libc::*::sa_family_t", # libc::sa_family_t is always detected.
  "windows_sys::Win32::Networking::WinSock::socklen_t",
  "windows_sys::Win32::Networking::WinSock::ADDRESS_FAMILY",
]
```
