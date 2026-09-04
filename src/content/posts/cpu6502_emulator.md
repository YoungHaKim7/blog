---
title: cpu6502_emulator
published: 2026-09-04
description: 'Rust port of the C++ 6502 emulator.'
image: ''
tags: [cpu, emulator]
category: 'zCS_ComputerScience'
draft: false 
lang: ''
---

# link

- [sample code러스트로 구현한 6502 cpu Emulator](https://github.com/YoungHaKim7/cpu_6502-rs)

<hr />

# 6502 Emulator

- A Rust implementation of a MOS Technology 6502 CPU emulator.
  - This crate is a Rust port of the original C++ 6502 emulator presented in the accompanying YouTube video. The purpose of the project is to reproduce the behavior of a 6502-compatible processor in software, including its registers, memory accesses, status flags, addressing modes, instructions, and instruction execution.

## What is the 6502?

- The MOS Technology 6502 is an 8-bit microprocessor originally introduced in the 1970s. It became one of the most influential CPUs of the early personal-computer and video-game era.

- The processor has:
 - an 8-bit accumulator (`A`),
 - two 8-bit index registers (`X` and `Y`),
 - an 8-bit stack pointer (`SP`),
 - a 16-bit program counter (`PC`),
 - an 8-bit processor-status register (`P`),
 - a 16-bit address space,
 - and an instruction set consisting of operations with different addressing modes and cycle counts.

- The emulator reproduces these CPU concepts using Rust data structures and functions.

## High-level architecture

- The crate is divided into two primary modules:

```text
+-----------------------------+
|          6502 CPU           |
|                             |
|  +-----+ +-----+ +------+  |
|  |  A  | |  X  | |  Y   |  |
|  +-----+ +-----+ +------+  |
|                             |
|  +------+ +------+ +-----+ |
|  |  PC  | |  SP   | | P  | |
|  +------+ +------+ +-----+ |
+-------------+---------------+
             |
             | read / write
             v
+-----------------------------+
|            Mem              |
|                             |
|     64 KiB address space    |
+-----------------------------+
```

- The [`Cpu`] represents the processor itself, while [`Mem`] represents the memory visible to the processor.

## Modules

### [`cpu`]

- The [`cpu`] module contains the processor implementation.

- It is responsible for the CPU's registers, status flags, instruction decoding, addressing modes, and execution of 6502 instructions.

- The CPU accesses memory through the memory abstraction provided by [`Mem`].

### [`mem`]

- The [`mem`] module contains the memory implementation used by the emulator.

- The 6502 has a 16-bit address bus, which allows it to address:

```text
2^16 = 65,536 bytes
```

- Therefore, the address space ranges from:

```text
$0000 ..= $FFFF
```

- Memory is conceptually a byte-addressable array indexed by a 16-bit address.

## CPU execution model

At a high level, a 6502 repeatedly performs the following operations:

```text
      +-------+
      | Fetch |
      +---+---+
          |
          v
     +---------+
     | Decode  |
     +----+----+
          |
          v
     +---------+
     | Execute |
     +----+----+
          |
          v
     +---------+
     | Update  |
     | State   |
     +----+----+
          |
          +-----------> Fetch next instruction
```

- The program counter (`PC`) identifies the next instruction to fetch. The CPU reads the opcode from memory, determines which instruction it represents, obtains any required operands, executes the operation, and updates its registers and processor-status flags.

## Registers

- The 6502 exposes several important CPU registers.

### Accumulator (`A`)

- The accumulator is an 8-bit register used by many arithmetic, logical, and data-transfer instructions.

### Index registers (`X` and `Y`)

- The `X` and `Y` registers are 8-bit index registers. They are commonly used for indexed addressing, loops, counters, and manipulating data structures in memory.

### Stack pointer (`SP`)

- The stack pointer identifies the current position within the processor's hardware stack. On the 6502, the stack occupies page `$0100` of the address space.

### Program counter (`PC`)

- The program counter is a 16-bit register containing the address of the next instruction to execute.

- Because it is 16 bits wide, it can address the complete 64 KiB address space.

### Processor status (`P`)

- The processor-status register contains individual flags describing the current state of the CPU.

- Typical 6502 status flags include:
 - Carry (`C`)
 - Zero (`Z`)
 - Interrupt Disable (`I`)
 - Decimal (`D`)
 - Break (`B`)
 - Unused (`U`)
 - Overflow (`V`)
 - Negative (`N`)

- The [`StatusFlags`] type represents these processor-status bits in the Rust implementation.

## Addressing modes

- A 6502 instruction does not necessarily obtain its operand in the same way for every instruction. The CPU provides several addressing modes.

- Important addressing modes include:

  - Immediate
  - Zero Page
  - Zero Page,X
  - Zero Page,Y
  - Absolute
  - Absolute,X
  - Absolute,Y
  - Indirect
  - Indexed Indirect
  - Indirect Indexed
  - Relative
  - Accumulator
  - Implied

- For example, an immediate instruction may contain its operand directly after the opcode:

```txt
LDA #$42
```

- Conceptually, the CPU reads:

```text
opcode | operand
-------+--------
 A9   |   42
```
- and loads `$42` directly into the accumulator.

- By contrast, an absolute addressing instruction contains a 16-bit memory address from which the operand must be loaded.

## Status flags

- Many 6502 instructions modify one or more processor-status flags.
 - For example, an arithmetic or logical operation may set the Zero flag when its result is zero, or set the Negative flag when bit 7 of an 8-bit result is set.
 - The flags are important because conditional branch instructions use them to determine whether execution should continue at another address.

## Memory and CPU interaction

- The CPU does not operate in isolation. Instructions frequently require memory reads and writes.

- Conceptually:

```text
Cpu
|
| read/write(address)
v
Mem
|
v
[0x0000 ... 0xFFFF]
```

- Keeping the CPU and memory implementation separate makes the emulator easier to understand and test.

- It also mirrors an important aspect of the actual hardware: the CPU communicates with the outside world through its address and data buses.

## Rust module structure

- This crate uses two external Rust modules:

```bash
src/
├── lib.rs
├── cpu.rs
└── mem.rs
```
- The declarations below tell Rust to load `cpu.rs` and `mem.rs` as submodules of this crate. Rust's module system maps an external module declaration such as `mod cpu;` to the corresponding source file `src/cpu.rs`.

```bash
crate
├── cpu
└── mem
```

## Public API

- The implementation modules are declared with `pub`, which makes the modules themselves accessible to users of the crate.

```rs
pub mod cpu;
pub mod mem;
```

- The crate then re-exports the most important types:

```rs
pub use cpu::{Cpu, StatusFlags};
pub use mem::Mem;
```

- This means users can write:

```rs
use emulator::{Cpu, Mem, StatusFlags};
```

- instead of having to write:

```rs
use emulator::cpu::Cpu;
use emulator::cpu::StatusFlags;
use emulator::mem::Mem;
```

- Re-exporting the primary types provides a simpler public API while allowing the implementation to remain organized into separate modules.

## Example

- A typical emulator program can conceptually be structured like this:

```rs
use emulator::{Cpu, Mem};

fn main() {
   // Create the memory used by the emulated computer.
   let mut mem = Mem::new();

   // Create the 6502 CPU.
   let mut cpu = Cpu::new();

   // Load a program into memory.
   //
   // The exact initialization and execution API depends on the
   // implementation in `cpu.rs` and `mem.rs`.
   
   // cpu.reset(&mut mem);
   // cpu.step(&mut mem);
}
```

## Useful references

- The following resources are useful when studying this emulator.

### 6502 documentation

-  **6502 instruction reference — Obelisk**   A widely used reference for the 6502 instruction set, addressing modes, opcodes, flags, and instruction behavior.

- [http://www.obelisk.me.uk/6502/](http://www.obelisk.me.uk/6502/)

### Rust documentation

- **The Rust Reference — Crates and source files**   Explains crates, source files, modules, and the relationship between `lib.rs` and the rest of the crate.

- [https://doc.rust-lang.org/stable/reference/crates-and-source-files.html](https://doc.rust-lang.org/stable/reference/crates-and-source-files.html)

### Rust module documentation

- **The Rust Reference — Modules**   Explains how `mod`, `pub mod`, external module files, and the Rust module tree work.

- [https://doc.rust-lang.org/stable/reference/items/modules.html](https://doc.rust-lang.org/stable/reference/items/modules.html)

### Rustdoc

- **The Rustdoc Book — How to write documentation**   Explains crate-level documentation, `//!`, `///`, Markdown, examples, links, and API documentation.

- [https://doc.rust-lang.org/rustdoc/how-to-write-documentation.html](https://doc.rust-lang.org/rustdoc/how-to-write-documentation.html)

### Original implementation

- [This Rust project was written as a port of the C++ implementation shown in the original YouTube video:](https://youtu.be/qJgsuQoy9bc)

## Documentation strategy

- This crate-level documentation intentionally explains both the **software architecture** and the **hardware concepts** being emulated.
- The goal is that a reader can start at `lib.rs`, understand the overall architecture, and then move into the implementation:

```bash
lib.rs
|
+--> cpu.rs
|      |
|      +--> registers
|      +--> status flags
|      +--> addressing modes
|      +--> opcode decoding
|      +--> instruction execution
|
+--> mem.rs
       |
       +--> 6502 address space
       +--> memory reads
       +--> memory writes
```

- The detailed implementation comments in `cpu.rs` and `mem.rs` should explain how each part of the source code corresponds to the behavior of the original 6502 processor.

## Further reading

- When documenting individual instructions, it is useful to cross-reference the official/technical descriptions of the 6502 instruction set and then explain how the Rust implementation reproduces that behavior.
 - In particular, pay attention to:
   - 1. opcode values,
   - 2. addressing modes,
   - 3. affected status flags,
   - 4. instruction length,
   - 5. cycle count,
   - 6. page-boundary behavior,
   - 7. signed relative branch offsets,
   - 8. stack behavior,
   - 9. interrupt/reset behavior,
   - 10. 8-bit arithmetic and overflow behavior.

- These details are where an emulator can differ subtly from a simple high-level implementation of the same instruction.

```rs
//! [`cpu`]: crate::cpu
//! [`mem`]: crate::mem
//! [`Cpu`]: crate::Cpu
//! [`Mem`]: crate::Mem
//! [`StatusFlags`]: crate::StatusFlags
pub mod cpu;
pub mod mem;

pub use cpu::{Cpu, StatusFlags};
pub use mem::Mem;
```
