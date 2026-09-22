---
title: rust_test_target_install
published: 2026-09-23
description: 'LinuxOS & macOS & WindowOS test 많이 사용하는 3가지 OS 테스트 패턴'
image: ''
tags: [rust, test, nextest, Actions]
category: 'rust_Test'
draft: false 
lang: ''
---

# link

- [Github Actions 설정(LinuxOS, macOS, windowsOS 3가지 테스트 설명으로 자동화)](#4-to-actually-test-on-macos)

<hr />

# 다양한 플래폼 테스트 하는 방법(굳이 다른 환경에서 테스트 안해도 된다)

- Github Actions 설정(LinuxOS, macOS, windowsOS 3가지 테스트 설명으로 자동화

- 우선 타겟으로 테스트하고 실제로 OS들어가서 해보면 대충 99프로 이상 잘 되는듯



# Install[|🔝|](#link)

- Install
```bash
 # Install(LinuxOS)
rustup target add x86_64-unknown-linux-gnu 
rustup target add aarch64-unknown-linux-gnu 
rustup target add aarch64-unknown-linux-musl 
rustup target add x86_64-unknown-linux-musl

# macOS(Install)
rustup target add aarch64-apple-darwin
rustup target add x86_64-apple-darwin

# WindowsOS (Install)
rustup target add x86_64-pc-windows-gnu
rustup target add aarch64-pc-windows-gnu
rustup target add x86_64-pc-windows-msvc       # Intel/AMD Windows
rustup target add aarch64-pc-windows-msvc      # ARM64 Windows
```

- `target test`
```bash
# test linuxOS
cargo build --release --target aarch64-unknown-linux-gnu 
cargo build --release --target x86_64-unknown-linux-gnu 
cargo build --release --target x86_64-unknown-linux-musl 
cargo build --release --target aarch64-unknown-linux-musl

# test(macOS)
cargo build --release --target aarch64-apple-darwin
cargo build --release --target x86_64-apple-darwin

# WindowsOS test
cargo build --release --target x86_64-pc-windows-gnu
cargo build --release --target aarch64-pc-windows-gnu
cargo build --release --target x86_64-pc-windows-msvc       # Intel/AMD Windows
cargo build --release --target aarch64-pc-windows-msvc      # ARM64 Windows
```


# Yes. The important distinction is that your command:[|🔝|](#link)

```bash
cargo check --release --target x86_64-pc-windows-gnu
```

**does not actually run Windows code**. It checks whether your Rust project can compile for the Windows GNU target from Linux.

For macOS, the situation is different because Apple targets require Apple's SDK/toolchain components, and you generally cannot natively cross-compile to macOS from Linux using the normal Rust toolchain.

### 1. Check the macOS target

The Rust target names are typically:

```text
x86_64-apple-darwin      # Intel macOS
aarch64-apple-darwin     # Apple Silicon macOS
```

You can see available targets with:

```bash
rustup target list
```

You might see:

```text
aarch64-apple-darwin
x86_64-apple-darwin
```

You can add them:

```bash
rustup target add x86_64-apple-darwin
rustup target add aarch64-apple-darwin
```

However, **on Linux, adding the target alone is not enough to produce a usable macOS binary**.

---

### 2. Why Windows is easier

Your Windows example:

```bash
cargo check --release --target x86_64-pc-windows-gnu
```

works because the GNU Windows target can use a Linux-hosted cross-compilation toolchain.

Conceptually:

```text
Linux
  │
  ├── Rust compiler
  │
  └── x86_64-pc-windows-gnu
             │
             ▼
       Windows binary
```

For macOS:

```text
Linux
  │
  ├── Rust compiler
  │
  └── aarch64-apple-darwin
             │
             ▼
       macOS binary
```

The problem is the **Apple SDK/linker ecosystem**. Apple does not provide the macOS SDK as a normal Linux-native toolchain.

---

### 3. If you only want `cargo check`

If your project doesn't require linking native libraries, you can sometimes do:

```bash
cargo check --release --target aarch64-apple-darwin
```

or:

```bash
cargo check --release --target x86_64-apple-darwin
```

But `cargo check` is not a complete test of producing a runnable macOS executable.

For a project such as your Rust FFmpeg implementation, native dependencies may make this distinction particularly important.

---

### 4. To actually test on macOS[|🔝|](#link)

The most reliable approach is to **run the tests on an actual macOS environment**.

For example, with GitHub Actions you can have Linux development plus macOS CI:

```yaml
jobs:
  test:
    strategy:
      matrix:
        os:
          - ubuntu-latest
          - macos-latest
          - windows-latest

    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v4

      - uses: dtolnay/rust-toolchain@stable

      - run: cargo test --release
```

This gives you:

```text
Ubuntu
   │
   └── cargo test

macOS
   │
   └── cargo test

Windows
   │
   └── cargo test
```

This is much closer to **real platform testing** than cross-compilation.

---

### 5. For your Rust project, I would use[|🔝|](#link)

For local Linux development:

```bash
# Linux
cargo check --release
cargo test --release
```

Cross-check Windows:

```bash
cargo check --release --target x86_64-pc-windows-gnu
```

And test macOS through CI:

```text
GitHub Actions
├── Linux
│   └── cargo test --release
├── macOS
│   ├── cargo check --release
│   └── cargo test --release
└── Windows
    ├── cargo check --release
    └── cargo test --release
```

### In short[|🔝|](#link)

| Goal                    | Linux command                                          |
| ----------------------- | ------------------------------------------------------ |
| Check Linux             | `cargo check --release`                                |
| Test Linux              | `cargo test --release`                                 |
| Cross-check Windows     | `cargo check --release --target x86_64-pc-windows-gnu` |
| Cross-check macOS       | `cargo check --release --target aarch64-apple-darwin`* |
| **Actually test macOS** | **Run `cargo test` on macOS**                          |

* The macOS cross-target may require additional linker/SDK setup and isn't equivalent to having a real macOS environment.

- If your goal is **"I'm on Linux, but I want every `cargo test` to automatically test Linux + Windows + Intel Mac + Apple Silicon Mac"**, GitHub Actions is probably the cleanest setup.

