---
title: 240201_Rust_TOML_lto_strip
published: 2024-02-01
description: 'This is a Rust release profile configuration inside Cargo.toml.You are doing a lot of performance-oriented Rust work (thread pools, channels, low-level memory, etc.), so this setup is clearly optimized for maximum runtime performance and smallest binary size. & explain Thin LTO vs Fat LTO in depth'
image: ''
tags: [rust, toml, optimization, lto, strip, panic]
category: 'rust_TOML'
draft: false 
lang: ''
---

# link

- [final-summary](#-final-summary)
  - [`lto = true` 의 의미](#1%EF%B8%8F⃣-lto--true)
  - [`strip = true` 의 의미](#2%EF%B8%8F⃣-strip--true)
  - [`opt-level=3` 의 의미](#3%EF%B8%8F⃣-opt-level--3)
  - [`panic-abort` 의 의미](#4%EF%B8%8F⃣-panic--abort)
  - [Real-world Effect효과가 얼마나 있나.  표로 비교해서 깔끔하게](#-real-world-effect)

<hr />

- [explain Thin LTO vs Fat LTO in depth](#explain-thin-lto-vs-fat-lto-in-depth)
  - [Normal Compilation(No LTO)](#1%EF%B8%8F⃣-normal-compilation-no-lto)
  - [Thin vs Fat LTO Comparison](#6%EF%B8%8F⃣-thin-vs-fat-lto-comparison)
    - [Thin LTO](#4%EF%B8%8F⃣-thin-lto)
    - [Fat LTO(Full LTO)](#3%EF%B8%8F⃣-fat-lto-full-lto)

- [Why `codegen-units = 1` + Fat LTO is almost redundant in Rust](#why-codegen-units--1--fat-lto-is-almost-redundant-in-rust)

<hr />

# 🔹 [profile.release][|🔝|](#link)

This section configures the release build profile used when you run:

```bash
cargo build --release
```

- Release mode enables LLVM optimizations and disables debug checks.

- Now let's examine each option.

#  1️⃣ `lto = true`[|🔝|](#link)
- What it is:

- LTO = Link Time Optimization

- It enables whole-program optimization across crate boundaries.

- Normally:

```txt
crate A compiled separately
crate B compiled separately
linked together later
```

- With LTO:

```txt
All crates merged → optimized as one large program
```

- **What it does:**
  - Enables cross-crate inlining
  - Removes dead code across crates
  - Improves constant propagation
  - Often reduces binary size
  - Often improves performance

- **Example**

- Without LTO:

```rs
// in another crate
pub fn small_fn() -> i32 { 5 }
```

- The function may not inline.

- With LTO:
- LLVM can inline `small_fn()` across crate boundaries.

- **Tradeoffs**
  - Slower compile time
  - More memory usage during compile

- **When to use**
  - Final production build
  - Performance-critical applications
  - CLI tools you want tiny

# 2️⃣ `strip = true`[|🔝|](#link)  

- What it is:

- Removes debug symbols from the binary.

- Equivalent to:

```txt
strip target/release/your_binary
```

- **What it removes:**
  - Debug info
  - Symbol names
  - Some metadata

- Result:
  - Smaller binary.
  - Example difference:

| Without strip | With strip |
| ------------- | ---------- |
| 5.2 MB        | 2.8 MB     |


- **Tradeoffs**
  - Harder to debug crashes
  - Stack traces become less readable

- **Best for**
  - Production builds
  - Distribution binaries
  - Docker images

# 3️⃣ `opt-level = 3`[|🔝|](#link)

- This controls LLVM optimization level.

- Rust levels:

| Level | Meaning                   |
| ----- | ------------------------- |
| 0     | No optimization           |
| 1     | Some optimization         |
| 2     | Default release           |
| 3     | Maximum speed             |
| "s"   | Optimize for size         |
| "z"   | Optimize for smaller size |


- You set:

```toml
opt-level = 3
```

## **What it enables**
- Aggressive inlining
- Loop unrolling
- Vectorization
- Instruction reordering
- Dead code elimination

## **Compared to default**

- Default release = `opt-level = 3` already.
- So explicitly setting it makes it clear.

## **When useful?**
- CPU heavy tasks
- Math
- Sorting
- Thread pools
- Lock-free structures

- Given your parallel channel work — this is appropriate.

# 4️⃣ `panic = "abort"`[|🔝|](#link)

- This is very important.

- Rust normally:

```txt
panic!() → stack unwinding
```

- Unwinding:
  - Walks back stack
  - Runs destructors
  - Cleans up memory
  - You changed it to:

```toml
panic = "abort"
```

- Now:

```txt
panic!() → immediate process abort
```

- No unwinding. No cleanup.

## What this changes
- **Normal (unwind)**

```txt
panic!
  ↓
stack unwinds
  ↓
drop() called
  ↓
program exits
```

- Abort

```txt
panic!
  ↓
process immediately exits
```

## Benefits

- Smaller binary
- Faster panic path
- No unwind tables
- Better for embedded / low-level systems

## Downsides

  - `Drop` does NOT run
  - No recovery
  - No `catch_unwind`

## When used

  - Embedded systems
  - OS kernels
  - Game engines
  - Performance-critical CLI
  - Microservices

- Given your systems-level interests — this is a very “low-level engineer” setting.

# 5️⃣  `codegen-units = 1`[|🔝|](#link)

- This one is very powerful.

- **What are codegen units?**

- Rust splits compilation into multiple LLVM units to compile in parallel.

- Default:

```toml
codegen-units = 16 (usually)
```

- That means:

```txt
Crate split into 16 chunks
Each optimized independently
Then linked
```

- Fast compile, but worse optimization.

- You set:

```toml
codegen-units = 1
```

- Now:

```txt
Entire crate compiled as one LLVM unit
```
## What this enables
- Better inlining
- Better global optimization
- Better constant propagation
- Often faster runtime

## Tradeoff

- Much slower compile time
- No parallel LLVM optimization

# 🧠 Combined Effect of ALL These[|🔝|](#link)

- Your configuration is basically:

> 🔥 "I want the absolute fastest and smallest binary possible, and I don't care about compile time."

- You enabled:
  - Whole program optimization (LTO)
  - Single LLVM unit
  - Maximum optimization
  - No unwind overhead
  - Stripped symbols

- This is production-grade optimization.

# 📊 Real-World Effect[|🔝|](#link)

- Typical improvements compared to default release:

| Setting         | Effect                    |
| --------------- | ------------------------- |
| LTO             | 3–10% runtime improvement |
| codegen-units=1 | 2–5% runtime improvement  |
| panic=abort     | smaller binary            |
| strip=true      | 30–50% smaller binary     |

- (Exact numbers depend on workload.)

# ⚙️ When NOT To Use This[|🔝|](#link)

- Avoid during:
  - Active development
  - Debugging crashes
  - Profiling with debug symbols
  - Fast iteration

- Because compile times increase significantly.

# 💡 Common Pattern[|🔝|](#link)

- Many projects use:

```toml
[profile.release]
lto = "fat"
codegen-units = 1
panic = "abort"
strip = true
```

- Or:

```toml
lto = "thin"
```

- Thin LTO compiles faster but still gives cross-crate optimization.

# 🏁 Final Summary[|🔝|](#link)

- Your configuration means:

```txt
Max performance
Max optimization
Smallest binary
Slower compilation
No panic unwinding
```

- This is a systems-programmer optimized release profile.

# explain Thin LTO vs Fat LTO in depth 

- Rust’s Link Time Optimization (LTO) has two major modes:

```txt
Thin LTO
Fat LTO (Full LTO)
```

- Both allow the compiler (LLVM) to optimize across crate boundaries, but they work very differently internally.

- I’ll explain this from the compiler architecture level, which is useful for systems programmers like you.


# 1️⃣ Normal Compilation (No LTO)[|🔝|](#link)

First understand what happens without LTO.

Suppose you have:

```txt
crate A
crate B
main crate
```

- Each crate compiles separately.

```txt
Rust code
   ↓
MIR (Mid-level IR)
   ↓
LLVM IR
   ↓
Machine Code (.o files)
   ↓
Linker merges binaries
```

- The key problem:
- ⚠️ The optimizer only sees one crate at a time.
- Example:

```rs
// crate A
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

```rs
// crate B
use crate_a::add;

fn main() {
    println!("{}", add(2,3));
}
```

- Without LTO:

```txt
crate A compiled → add() becomes a function
crate B compiled → calls add()
```

- LLVM cannot inline `add()`, because the function is in another compiled object file.

# 2️⃣ What LTO Does[|🔝|](#link)

- LTO delays optimization until the link stage.

- Instead of linking machine code:

```txt
object files (.o)
```

- Rust stores:

```txt
LLVM IR
```

- Then the linker runs LLVM optimization on the whole program.

- Now the optimizer sees:

```txt
ALL crates
ALL functions
ALL constants
```
- This allows:
  - cross-crate inlining
  - dead code elimination
  - constant propagation
  - vectorization across modules

# 3️⃣ Fat LTO (Full LTO)[|🔝|](#link)

- Fat LTO merges everything into one big module.
- Compilation pipeline

```txt
crate A → LLVM IR
crate B → LLVM IR
crate C → LLVM IR

            ↓

       Merge ALL IR

            ↓

   Global optimization pass

            ↓

        Machine code
```

- Diagram:

```txt
           +---------+
crate A →  |         |
crate B →  |  LLVM   | → optimized binary
crate C →  |         |
           +---------+
```

- Everything becomes one giant LLVM module.

## Advantages

Maximum optimization.

Examples:

Cross-crate inlining

```rs
// crate A
pub fn square(x: i32) -> i32 { x * x }
```


```rs
// crate B
let y = square(5);
```

- Fat LTO can produce:

```rs
y = 25
```

- The function disappears entirely.

## Dead code elimination

- If a crate contains unused functions:

```rs
crate utils
 ├── fn debug_log()
 ├── fn helper_math()
 └── fn unused()
```

- Fat LTO can remove unused code even across crate boundaries.

## Constant propagation across crates

```rs
pub const SIZE: usize = 1024;
```

- The optimizer can treat it as compile-time constant everywhere.

## Downsides

- Fat LTO is very expensive.
- Compile characteristics:

| Property     | Fat LTO   |
| ------------ | --------- |
| Compile time | Very slow |
| Memory use   | Very high |
| Parallelism  | Poor      |
| Optimization | Maximum   |

- Large Rust projects can take minutes longer to compile.

# 4️⃣ Thin LTO[|🔝|](#link)

- Thin LTO was invented to solve the compile time explosion of Fat LTO.

- Instead of merging everything, Thin LTO uses a summary index.

## Thin LTO pipeline

- Step 1: compile crates normally

```txt
crate A → LLVM IR
crate B → LLVM IR
crate C → LLVM IR
```

- Step 2: generate summary metadata

```txt
function names
call graph
inline candidates
global variables
```

- Step 3: lightweight global analysis

```txt
ThinLTO Index
```

- Step 4: optimized recompilation of modules in parallel

## Diagram:

```txt
      LLVM IR modules
   +-------+ +-------+
   |crate A| |crate B|
   +-------+ +-------+
        ↓       ↓

    Global Summary Index
        ↓
   cross-module decisions

        ↓

Parallel optimization

crate A optimized
crate B optimized
crate C optimized
```

- Key idea:

```txt
Modules stay separate
but share optimization information
```

#  5️⃣ What Thin LTO Can Do[|🔝|](#link)

- Thin LTO still enables many cross-crate optimizations.
- Example:

```rs
crate A
fn small_function()
```

- If it is small enough, Thin LTO can inline it.

- But instead of merging all code, it may:

```py
import only that function
```

- This is called function importing.

## Function Importing

- Instead of importing entire crates:

```rs
crate B imports only:

small_function()
```

- Not the whole module.

- This drastically reduces compile work.

#  6️⃣ Thin vs Fat LTO Comparison[|🔝|](#link)

| Feature              | Thin LTO  | Fat LTO   |
| -------------------- | --------- | --------- |
| Optimization power   | Very high | Maximum   |
| Compile time         | Medium    | Very slow |
| Memory usage         | Medium    | Huge      |
| Parallel compilation | Yes       | Mostly no |
| Scalability          | Excellent | Poor      |

# 7️⃣ Rust Configuration[|🔝|](#link)

- Rust supports three modes.

## Off

```toml
lto = false
```

- No cross-crate optimization.

## Thin LTO
```toml
lto = "thin"
```

- Best balance of speed and optimization.

- Recommended for most projects.

## Fat LTO
```toml
lto = "fat"
```

- Maximum optimization.

### Your current setting

- You wrote:

```toml
lto = true
```

- Rust interprets this as:

```toml
lto = "fat"
```

- So your configuration is Full LTO.

- Combined with:

```toml
codegen-units = 1
````

- You are effectively asking LLVM to treat your program like:

```txt
one giant optimized compilation unit
```

- This is maximum optimization mode.

# 8️⃣ Real Performance Differences[|🔝|](#link)

- Typical results:

| Mode     | Binary Size  | Runtime     |
| -------- | ------------ | ----------- |
| No LTO   | baseline     | baseline    |
| Thin LTO | -5% to -15%  | +2% to +8%  |
| Fat LTO  | -10% to -20% | +3% to +12% |

- Numbers depend heavily on workload.

- For:
  - CPU heavy
  - math heavy
  - low-level code

- LTO helps more.

# 9️⃣ Why Large Projects Use Thin LTO[|🔝|](#link)

- Projects like:
  - Firefox
  - Linux kernel (Clang builds)
  - large Rust services

- Prefer:

```txt
Thin LTO
```

- because Fat LTO becomes too slow to compile.

# 🔟 What Your Current Profile Means[|🔝|](#link)

Your profile:

```toml
[profile.release]
lto = true
strip = true
opt-level = 3
panic = "abort"
codegen-units = 1
```

- This is essentially:

```txt
Maximum runtime performance
Maximum binary shrink
Slowest compilation
```

- This is a "final production binary" profile.

<hr />

# Why `codegen-units = 1` + Fat LTO is almost redundant in Rust[|🔝|](#link)

- (the interaction between Rust’s crate partitioning and LLVM).

  - To understand why

```toml
codegen-units = 1
lto = "fat"
```

- is almost redundant, we need to look at how Rust → LLVM compilation is partitioned.

- There are two different layers of partitioning:

```txt
Rust crate partitioning      (controlled by codegen-units)
LLVM module merging          (controlled by LTO)
```

- These two mechanisms partially solve the same optimization barrier.

# 1️⃣ Rust Compilation Pipeline

```txt
Rust compilation roughly looks like this:

Rust source
   ↓
HIR (High-level IR)
   ↓
MIR (Mid-level IR)
   ↓
LLVM IR
   ↓
Machine code
```

- The key stage is LLVM IR generation, where Rust splits code into codegen units.

# 2️⃣ What codegen-units Actually Does

- Rust does parallel compilation by splitting a crate into chunks.

- Default release build:

```txt
codegen-units = 16
```

- Meaning:

```txt
crate
 ├── CGU 1
 ├── CGU 2
 ├── CGU 3
 ├── ...
 └── CGU 16
```

- Each CGU (CodeGen Unit) becomes an independent LLVM module.

- Diagram:

```txt
Rust crate
   │
   ├─ CGU1 → LLVM Module
   ├─ CGU2 → LLVM Module
   ├─ CGU3 → LLVM Module
   └─ CGU4 → LLVM Module
```

- Each module is optimized independently.
- That means:
  - 🚫 No cross-module inlining
  - 🚫 No cross-module constant propagation
  - 🚫 Limited dead code removal

# 3️⃣ What codegen-units = 1 Does

- When you set:

```txt
codegen-units = 1
```

- Rust generates one LLVM module per crate.

```txt
crate
   ↓
single LLVM module
```

- Diagram:

```txt
Rust crate
   │
   └── LLVM Module
```

- Now LLVM can:
  - ✅ inline functions inside the crate
  - ✅ propagate constants
  - ✅ eliminate dead code inside the crate

- So intra-crate optimization becomes maximal.

# 4️⃣ What Fat LTO Does

- Fat LTO merges ALL LLVM modules from ALL crates into one giant module.

- Without LTO:

```txt
crate A → LLVM module
crate B → LLVM module
crate C → LLVM module
```

- With Fat LTO:

```txt
    merge
A module ─┐
B module ─┼──→ ONE GIANT LLVM MODULE
C module ─┘
```

- Now the optimizer sees:

```txt
entire program
all crates
all functions
```

- So it can do:
  - ✅ cross-crate inlining
  - ✅ cross-crate constant propagation
  - ✅ whole-program dead code elimination

# 5️⃣ The Overlap

- Now observe what both options already achieve.


- `codegen-units = 1`

```txt
crate A → single LLVM module
crate B → single LLVM module
crate C → single LLVM module
```

- `Fat LTO`

```txt
crate A module
crate B module
crate C module

→ merged into ONE module
```

- But if each crate already has one module, LTO only merges a few modules.

# 6️⃣ Why It's Almost Redundant

- Consider these configurations.

## Case A

```toml
codegen-units = 16
lto = "fat"
```

- Result:

```txt
crate A → 16 modules
crate B → 16 modules
crate C → 16 modules

Fat LTO merges 48 modules
```

- Huge optimization gain.

## Case B

```toml
codegen-units = 1
lto = "fat"
```

- Result:

```txt
crate A → 1 module
crate B → 1 module
crate C → 1 module

Fat LTO merges 3 modules
```

- Optimization gain is smaller, because crates were already optimized internally.

# 7️⃣ Why Rust Developers Say "Almost Redundant"

- Because most benefits of `codegen-units = 1` already exist before LTO runs.
- So when LTO merges modules, it mostly improves:

```txt
cross-crate inlining
cross-crate dead code
```

- But intra-crate optimization was already maximal.

# 8️⃣ The Real Performance Impact

- Typical improvements:


| Setting           | Performance |
| ----------------- | ----------- |
| default release   | baseline    |
| `codegen-units=1` | +1–3%       |
| `fat LTO`         | +2–8%       |
| both              | +3–9%       |

- Notice the overlap.

- The gains don't add linearly.

# 9️⃣ Why Rust Still Allows Both

- Because they optimize different boundaries.

```txt
codegen-units = 1  → removes intra-crate boundaries
Fat LTO            → removes inter-crate boundaries
```

- So technically:

```txt
crate boundary optimization
```

- still requires LTO.

# 🔟 Compile Time Cost

- This combination is extremely expensive.

```txt
codegen-units = 1
+
fat LTO
```

- causes:

```txt
very slow compilation
very high memory usage
large LLVM optimization passes
```

- Large Rust projects can see 5–10× longer builds.

# 1️⃣1️⃣ Typical Production Setup

- Most high-performance Rust projects now use:

```toml
[profile.release]
lto = "thin"
codegen-units = 1
```

- Why?

- Thin LTO gives:

```txt
cross-crate optimization
parallel compilation
much faster builds
```


# 1️⃣2️⃣ Interesting Real-World Example

- The Rust compiler itself (rustc) uses Thin LTO because Fat LTO is too slow for such a large codebase.

- Similarly, major Rust projects like Firefox builds use Thin LTO.

## ✅ Short summary

```txt
codegen-units = 1
    ↓
max optimization inside a crate

fat LTO
    ↓
max optimization across crates
```

- Because most optimization opportunities are inside crates, enabling both gives diminishing returns.
