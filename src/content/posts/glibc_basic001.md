---
title: glibc_basic001
published: 2026-01-02
description: 'The GNU C Library (glibc) 001'
image: ''
tags: [c, glibc, kernel]
category: 'z_c'
draft: false 
lang: ''
---

# glibc_The_GNU_C_Library_Training
https://sourceware.org/glibc/sources.html

- unofficial github
  - https://github.com/bminor/glibc

# Raw bindings to platform APIs for Rust 
- https://github.com/rust-lang/libc
  - Doc
    - https://docs.rs/libc/latest/libc/

## Download sources

- Checkout the latest glibc in development:

```bash
git clone https://sourceware.org/git/glibc.git
cd glibc
git checkout master
```

- Releases are available by source branch checkout (gitweb) and tarball via ftp.

- Checkout the latest glibc 2.43 stable release:

```bash
git clone https://sourceware.org/git/glibc.git
cd glibc
git checkout release/2.43/master
bash

- Release tarballs are available via anonymous ftp at https://ftp.gnu.org/gnu/glibc/ and its mirrors. 

