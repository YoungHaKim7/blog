---
title: gccrs_An_alternative_compiler_for_Rust
published: 2026-02-07
description: 'GCC Front-End for Rust'
image: ''
tags: [rust, gccrs, compiler]
category: 'rust_Compiler'
draft: false 
lang: ''
---

# GCC Front-End for Rust
- https://github.com/rust-gcc/gccrs

# Install Linux

```bash
$ mkdir gccrs-build
$ cd gccrs-build
$ ../gccrs/configure --prefix=$HOME/gccrs-install --disable-bootstrap --enable-multilib --enable-languages=rust
$ make
```

- MacOS
  - The path of header dir and sysroot should be specified when you configure the project.

```bash
$ mkdir mac-build
$ cd mac-build
$ ../gccrs/configure --prefix=$HOME/gccrs-install --disable-bootstrap --enable-multilib --enable-languages=rust --with-native-system-header-dir=/usr/include --with-sysroot=/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk
$ make
```

# **[gccrs: Rust를 위한 대체 컴파일러](<https://news.hada.io/topic?id=17681&utm_source=discord&utm_medium=bot&utm_campaign=1480>)**
- `gccrs`는 GCC 프로젝트의 일환으로 개발 중인 대체 Rust 컴파일러입니다.  
- 이 프로젝트는 GNU 컴파일러 컬렉션 내에서 Rust를 지원하는 것을 목표로 하며, `rustc`와 동일한 동작을 목표로 합니다.  
- 주요 목표는 특히 LLVM이 지원하지 않는 플랫폼에서 Rust를 컴파일할 수 있는 대안을 제공하는 것입니다.  
...
