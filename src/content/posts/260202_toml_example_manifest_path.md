---
title: 260202_toml_example_manifest_path
published: 2026-02-02
description: 'The difference is where Cargo thinks the executable lives.(`--example` or `--manifest-path`)'
image: ''
tags: [rust, toml, example]
category: 'rust_TOML'
draft: false 
lang: ''
---

# link
- https://github.com/tokio-rs/topcoat/tree/main/examples/toasty-todo
- [(topcoat)A batteries-included framework for building web apps](https://github.com/tokio-rs/topcoat/)

<hr />

# Usually, I use ``--example`, so why are the commands different in this case?
- The difference is **where Cargo thinks the executable lives**.

## 1. The usual `--example`

When you run:

```bash
cargo run --example hello
```

Cargo assumes:

* You are in the root of a Cargo package (or workspace).
* The example is located in

```
my_project/
├── Cargo.toml
└── examples/
    └── hello.rs
```

or

```
examples/
    hello/
        main.rs
```

Cargo automatically looks inside the **current package's** `examples/` directory.

For example,

```
my_project/
├── Cargo.toml
├── src/
│   └── lib.rs
└── examples/
    ├── hello.rs
    └── world.rs
```

Then

```bash
cargo run --example hello
```

runs

```
examples/hello.rs
```

---

## 2. What `--manifest-path` does

Your command is

```bash
cargo run --manifest-path examples/toasty-todo/Cargo.toml
```

Here, `examples/toasty-todo` is **not** an example target.

Instead, it is an entirely separate Cargo package.

Imagine a repository like

```
repository/
├── Cargo.toml
├── src/
│   └── ...
└── examples/
    ├── toasty-todo/
    │   ├── Cargo.toml
    │   └── src/
    │       └── main.rs
    └── calculator/
        ├── Cargo.toml
        └── src/
```

Notice that

```
examples/toasty-todo/
```

contains its **own** `Cargo.toml`.

That means it is an independent crate.

Cargo has no idea you want that crate unless you tell it which manifest to use.

So

```bash
cargo run --manifest-path examples/toasty-todo/Cargo.toml
```

means

> "Use this `Cargo.toml` as the root package and run its binary."

---

## 3. Why not `--example toasty-todo`?

Because there is **no example target** named `toasty-todo`.

`--example` only works for examples declared by the current package, such as

```
examples/foo.rs
```

or

```
examples/foo/main.rs
```

It does **not** look for another Cargo package.

---

## 4. Why projects organize examples this way

Some example applications are much larger than a simple `examples/foo.rs`.

For example, they may have

```
toasty-todo/
├── Cargo.toml
├── src/
├── assets/
├── migrations/
├── tests/
└── README.md
```

Using a full Cargo package allows them to have:

* their own dependencies
* their own features
* separate `Cargo.toml`
* build scripts
* tests
* assets
* multiple source files

This would be awkward or impossible with a single `examples/foo.rs`.

---

## Summary

| Command                                        | Expects                                                                  | Used for                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------- |
| `cargo run --example foo`                      | `examples/foo.rs` (or `examples/foo/main.rs`) inside the current package | Small example programs                      |
| `cargo run --manifest-path path/to/Cargo.toml` | A specific `Cargo.toml`                                                  | Running a completely separate Cargo package |
| `cargo run`                                    | The current package's manifest (`Cargo.toml`)                            | Normal application or library binary        |

So, in your case, `examples/toasty-todo` is a standalone Cargo package with its own manifest, not an example target. That's why `--manifest-path` is used instead of `--example`.

