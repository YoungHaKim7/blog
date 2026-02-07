---
title: Big_Picture_Rust_Compilation_Pipeline
published: 2026-02-07
description: 'Rust Compilation 컴파일 과정 한눈으로 보기'
image: ''
tags: [rust, compiler]
category: 'rust_Compiler'
draft: false 
lang: ''
---

# link

- [An abstract syntax tree (AST) Wiki용어 정리](https://en.wikipedia.org/wiki/Abstract_syntax_tree)

<hr />

# Big Picture: Rust Compilation Pipeline

```txt
Rust source code
    │
    ▼
AST  (parser)
    │
    ▼
HIR  (High-level IR)
    │
    ▼
MIR  (Mid-level IR)
    │
    ▼
LLVM IR
    │
    ▼
Machine code
```

- Rust does not go directly from AST → LLVM.

- Why?
  - Rust has ownership, borrowing, lifetimes, traits, generics
  - LLVM does not understand any of these
  - Rust needs its own semantic IRs to prove correctness before codegen

- 녹은 AST → LLVM에서 직접 발생하지 않습니다.

- 왜요?
  - 녹은 소유권, 차입, 수명, 특성, 제네릭을 가지고 있습니다
  - LLVM은 다음 중 어느 것도 이해하지 못합니다
  - Rust는 코드 생성 전에 정확성을 증명하기 위해 자체 의미론적 IR이 필요합니다

# How They Fit Together (Most Important)  
- 그들이 함께 어울리는 방법 (가장 중요한 것)

```txt
HIR  : Understand Rust
MIR  : Prove Rust is safe
LLVM : Make it fast
```

- Responsibility Split
- 책임 분할

| Layer | Responsibility          |
| ----- | ----------------------- |
| HIR   | Rust syntax + semantics |
| MIR   | Ownership + borrowing   |
| LLVM  | Optimization + codegen  |

# 🧠 One-Line Intuition (Very Useful)

- HIR: “What does this Rust code mean?”
- MIR: “Is this Rust code legal and safe?”
- LLVM: “How do I make this fast machine code?”
  - 🧠 한 줄 직관 (매우 유용)
    - HIR: "이 러스트 코드는 무엇을 의미하나요?"
    - MIR: "이 러스트 코드는 합법적이고 안전한가요?"
    - LLVM: "이 빠른 기계 코드는 어떻게 만드나요?"

# 📚 How to Study This Practically (Recommended Path)

- Since you like real source walkthroughs, I recommend:

## Step 1 – HIR

- `rustc_hir`
- Look at:
  - `ExprKind`
  - `StmtKind`

- Study desugaring (`for`, `match`, `?`)

## Step 2 – MIR (most time here)

- `rustc_middle::mir`
- Study:
  - `Body`
  - `BasicBlock`
  - `Place`
  - `Operand`

- Then:
  - borrow checker (`rustc_borrowck`)

## Step 3 – LLVM

- Use:

```bash
rustc -O --emit=llvm-ir
```

- Compare:
  - MIR vs LLVM
  - where drops become calls

