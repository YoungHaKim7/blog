---
title: rust_latex_doc
published: 2026-08-01
description: 'https://crates.io/crates/rust-latex-doc-minimal-example'
image: ''
tags: [rust, doc]
category: 'rust_Documentation'
draft: false 
lang: ''
---

# link

- Rust doc에 LaTex문법 적용해서 수학공식 표시하기
  - https://crates.io/crates/rust-latex-doc-minimal-example
  - 적용한 프로젝트
    - https://github.com/YoungHaKim7/rust_gpt-2_impl

<hr />

# If you ever need cargo doc with dependency docs, the flag must be an absolute path instead:
- 만약 의존성 문서가 포함된 cargo doc이 필요하다면, 플래그는 절대 경로여야 합니다:

```bash
RUSTDOCFLAGS="--html-in-header $PWD/src/docs-header.html" cargo doc
```

# `./cargo/config.toml`

```toml
[build]
rustdocflags = [ "--html-in-header", "./src/docs-header.html" ]

[alias]
docs = "doc --no-deps --open"
```

- `./Cargo.toml`
  - 추가

```toml
[dev-dependencies]
bytemuck = "1.16"
crossbeam-utils = "0.8.22"
either = "1.18.0"
glob = "0.3"

# https://crates.io/crates/rust-latex-doc-minimal-example
[package.metadata.docs.rs]
rustdoc-args = [ "--html-in-header", "./src/docs-header.html" ]
```


- `./src/docs-header.html`
  - 추가해주고

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css" integrity="sha384-9eLZqc9ds8eNjO3TmqPeYcDj8n+Qfa4nuSiGYa6DjLNcv9BtN69ZIulL9+8CqC9Y" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js"                  integrity="sha384-K3vbOmF2BtaVai+Qk37uypf7VrgBubhQreNQe9aGsz9lB63dIFiQVlJbr92dw2Lx" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/auto-render.min.js"    integrity="sha384-kmZOZB5ObwgQnS/DuDg6TScgOiWWBiVt0plIRkZCmE6rDZGrEOQeHM5PcHi+nyqe" crossorigin="anonymous"></script>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "\\(", right: "\\)", display: false},
                {left: "$", right: "$", display: false},
                {left: "\\[", right: "\\]", display: true}
            ]
        });
    });
</script>
```
