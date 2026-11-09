---
title: asm_vs_safe_rust_check_64bits
published: 2026-11-09
description: 'check_all_bits(asm VS safeRust Code)'
image: ''
tags: [rust, kernel, cpu, bithacks, x86_64, arm, assembly]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link

- [x86-64 vs ARM64 comparison(RDI vs X0 등등)](#11-x86-64-vs-arm64-comparison)
    - [assembly분석(x86_64)](#assembly분석x86_64)
    - [arm어셈블리 분석](#arm분석)

<hr />

# 최적화는 안전한 러스트 코드가 젤 빠름.

## 어셈블리는 공부용으로 만듬


# cpu 64비트 관리하는거 만들어봄.[|🔝|](#link)


- `src/lib.rs`

```rs
// safe rust
pub fn safe_rust_check_all_bits(value: u64) -> Vec<bool> {
    let bits: Vec<bool> = (0..64)
                        .rev()
                        .map(|i| (value & (1 << i)) != 0)
                        .collect();
    bits
}

// asm
unsafe extern "C" {
    fn check_bit(value: u64, index: u64) -> u64;
}

pub fn check_all_bits(value: u64) -> [bool; 64] {
    let mut bits = [false; 64];

    for i in 0usize..64 {
        let bit_index = (63 - i) as u64;

        let result = unsafe { check_bit(value, bit_index) };

        bits[i] = result != 0;
    }

    bits
}


```

- `tests/safe_rust.rs`

```rs
#[test]
fn safe_rust_check_all_bits_test() {
    let value: u64 = 1 << 62 | 1 << 32 | 1 << 30 | 1 << 20;

    let bits = safe_rust_check_all_bits(value);

    println!("{:?}", bits);
}
```

- `tests/asm_rust_ffi_test.rs`

```rs
#[test]
fn asm_test() {
    let values: [u64; 4] = [0, 1 << 61, 1 << 62, u64::MAX];

    for value in values {
        let bits = check_all_bits(value);

        println!("Value: {value:#066b}");
        println!("Bits:  {:?}", bits);
        println!();
    }
}
```


- `asm/x86_64.S`

```asm
.intel_syntax noprefix

#ifdef __APPLE__
#define SYMBOL(name) _##name
#else
#define SYMBOL(name) name
#endif

.text
.global SYMBOL(check_bit)

#ifndef __APPLE__
.type check_bit, @function
#endif

SYMBOL(check_bit):
    # RDI = value
    # RSI = bit index (0..63)
    # RAX = result (0 or 1)

    bt      rdi, rsi
    setc    al
    movzx   eax, al

    ret

#ifndef __APPLE__
.size check_bit, .-check_bit

.section .note.GNU-stack,"",@progbits
#endif
```

- 

```asm
#ifdef __APPLE__
#define SYMBOL(name) _##name
#else
#define SYMBOL(name) name
#endif

.text
.globl SYMBOL(check_bit)

#ifndef __APPLE__
.type check_bit, %function
#endif

SYMBOL(check_bit):
    // X0 = value
    // X1 = bit index (0..63)
    // Return X0 = 0 or 1

    lsr     x0, x0, x1
    and     x0, x0, #1

    ret

#ifndef __APPLE__
.size check_bit, .-check_bit
.section .note.GNU-stack,"",%progbits
#endif
```

- `build.rs`

```rs
use std::env;

fn main() {
    let arch = env::var("CARGO_CFG_TARGET_ARCH").expect("Missing target architecture");

    let asm_file = match arch.as_str() {
        "x86_64" => "asm/x86_64.S",
        "aarch64" => "asm/aarch64.S",
        other => panic!("Unsupported architecture: {other}"),
    };

    println!("cargo:rerun-if-changed={asm_file}");

    cc::Build::new().file(asm_file).compile("bitcheck_asm");
}
```



# assembly분석(x86_64)[|🔝|](#link)

Let's examine your x86-64 assembly code line by line, including the GNU assembler (GAS) syntax, C preprocessor directives, System V AMD64 calling convention, CPU registers, and how the `BT` instruction checks individual bits.

Your assembly function implements this Rust declaration:

```
unsafe extern "C" {
    fn check_bit(value: u64, index: u64) -> u64;
}
```

Its job is to check one bit of a 64-bit integer and return `0` or `1`.

# 1. Complete assembly code

```
.intel_syntax noprefix

#ifdef __APPLE__
#define SYMBOL(name) _##name
#else
#define SYMBOL(name) name
#endif

.text
.global SYMBOL(check_bit)

#ifndef __APPLE__
.type check_bit, @function
#endif

SYMBOL(check_bit):
    # RDI = value
    # RSI = bit index (0..63)
    # RAX = result (0 or 1)

    bt      rdi, rsi
    setc    al
    movzx   eax, al

    ret

#ifndef __APPLE__
.size check_bit, .-check_bit

.section .note.GNU-stack,"",@progbits
#endif
```

# 2. Intel syntax

```
.intel_syntax noprefix
```

This tells GNU assembler to use Intel assembly syntax instead of AT&T syntax.

There are two common x86 assembly syntaxes:

Intel syntax:

```
mov rax, rdi
add rax, 10
```

AT&T syntax:

```
movq %rdi, %rax
addq $10, %rax
```

The differences:

| Feature          | Intel               | AT&T                |
| ---------------- | ------------------- | ------------------- |
| Operand order    | Destination, source | Source, destination |
| Register prefix  | None                | `%`                 |
| Immediate prefix | None                | `$`                 |
| Memory operands  | `[rax]`             | `(%rax)`            |
| Size suffix      | Usually implicit    | `b`, `w`, `l`, `q`  |

For example:

```
mov rax, rdi
```

Means:

```
RAX = RDI
```

The destination is on the left.

# 3. C preprocessor directives

Your assembly file has `.S` as its extension.

This is important because uppercase `.S` tells GCC to run the C preprocessor before passing the source to the assembler.

## 3.1 Detect macOS

```
#ifdef __APPLE__
#define SYMBOL(name) _##name
#else
#define SYMBOL(name) name
#endif
```

These are C preprocessor directives, not CPU instructions.

They allow you to use different symbol names on different operating systems.

On Linux:

```
.global check_bit

check_bit:
```

On macOS:

```
.global _check_bit

_check_bit:
```

Why?

macOS Mach-O symbol naming convention typically adds a leading underscore to externally visible C symbols.

The macro:

```
#define SYMBOL(name) _##name
```

Uses the C preprocessor's `##` token-pasting operator.

For example:

```
SYMBOL(check_bit)
```

Expands to:

```
_check_bit
```

on macOS.

On Linux, it expands to:

```
check_bit
```

This makes the assembly function compatible with both platforms.

# 4. Section and symbol declarations

## 4.1 `.text`

```
.text
```

This tells the assembler that subsequent instructions belong to the executable code section.

A typical ELF executable has several sections:

| Section   | Purpose                           |
| --------- | --------------------------------- |
| `.text`   | Executable machine instructions   |
| `.rodata` | Read-only constants               |
| `.data`   | Initialized global variables      |
| `.bss`    | Zero-initialized global variables |
| `.symtab` | Symbol table                      |
| `.strtab` | Symbol names                      |

Your `check_bit` function belongs in `.text`.

## 4.2 `.global`

```
.global SYMBOL(check_bit)
```

This exports the symbol so that other object files can reference it.

Without this directive, the function might remain a local assembler symbol and Rust's linker would not be able to resolve the external reference.

On Linux, this becomes:

```
.global check_bit
```

On macOS:

```
.global _check_bit
```

## 4.3 `.type`

```
#ifndef __APPLE__
.type check_bit, @function
#endif
```

This tells the ELF assembler that `check_bit` is a function symbol.

The syntax is:

```
.type symbol_name, @function
```

This is ELF-specific metadata.

It helps tools such as:

```
readelf -s target/debug/z99_asm_ffi_bits_check
nm target/debug/z99_asm_ffi_bits_check
objdump -t target/debug/z99_asm_ffi_bits_check
```

Identify the symbol as a function.

Mach-O uses different object-file metadata, so this directive is excluded on macOS.

# 5. Function entry point

```
SYMBOL(check_bit):
```

This defines the function's entry label.

When Rust calls:

```
let result = unsafe {
    check_bit(value, bit_index)
};
```

The linker resolves the Rust external function reference to this assembly symbol.

The CPU starts executing at the address associated with this label.

# 6. Understanding the calling convention

This is one of the most important concepts when combining Rust and assembly.

Your function declaration:

```
fn check_bit(value: u64, index: u64) -> u64;
```

Uses the C ABI.

On Linux x86-64, Rust follows the System V AMD64 ABI.

On macOS x86-64, the standard calling convention also passes these first two integer arguments in `RDI` and `RSI`.

Function argument registers

# RDI

First argument

value: u64

# RSI

Second argument

index: u64

# RAX

Return value

result: u64 (0 or 1)

For example, suppose Rust calls:

```
check_bit(0x4000000000000000, 62);
```

When assembly starts, the registers contain:

```
RDI = 0x4000000000000000
RSI = 62
```

Your assembly function must return the result in `RAX`.

# 7. The actual bit-checking instructions

This is the most important part of your program.

## 7.1 `bt rdi, rsi`

```
bt rdi, rsi
```

`BT` means Bit Test.

Syntax:

```
bt destination, bit_index
```

It tests the specified bit and copies its value into the CPU Carry Flag (CF).

It does not modify the original value in `RDI`.

For example:

```
RDI = 0100 0000 0000 0000 ...
RSI = 62
```

The CPU checks bit 62.

Remember that bit numbering starts at zero:

```
Bit position:

63 62 61 60 59 58 57 56 ... 3 2 1 0
 0  1  0  0  0  0  0  0 ... 0 0 0 0
```

Therefore:

```
bt rdi, 62
```

Produces:

```
CF = 1
```

If the selected bit is zero:

```
CF = 0
```

The Carry Flag is a CPU status flag in `RFLAGS`.

CPU RFLAGS (simplified)

CF — Carry Flag

Bit test result

# 1

Selected bit = 1

# 0

Selected bit = 0

## 7.2 `setc al`

```
setc al
```

`SETC` means Set if Carry.

It checks the Carry Flag.

The behavior:

```
If CF == 1:
    AL = 1

If CF == 0:
    AL = 0
```

Here is an example:

```
Before:

RAX = 0x0000000000000000
CF  = 1

After:

AL  = 1
RAX = 0x0000000000000001
```

One important detail: `AL` is only the lowest 8 bits of `RAX`.

The register relationship:

```
64-bit: RAX
32-bit: EAX
16-bit: AX
 8-bit: AH | AL
```

Writing to `AL` does not automatically clear the upper bits of `RAX`.

That is why the next instruction is important.

## 7.3 `movzx eax, al`

```asm
movzx eax, al
```

`MOVZX` means Move with Zero Extension.

It copies the 8-bit value in `AL` into `EAX`, filling the remaining upper bits with zeros.

Example:

Before:

```
RAX = 0x123456789ABCDEF0
AL  = 0x01
```

After `setc al`:

```
RAX = 0x123456789ABCDE01
```

After:

```
movzx eax, al
```

The result becomes:

```
EAX = 0x00000001
```

On x86-64, writing to a 32-bit register such as `EAX` automatically zeroes the upper 32 bits of `RAX`.

Therefore:

```
RAX = 0x0000000000000001
```

This guarantees that your Rust function returns a clean `u64` value of either `0` or `1`.

## 7.4 `ret`

```
ret
```

This returns execution to the caller.

Conceptually:

1. Read the return address from the stack.
2. Transfer execution to that address.
3. Continue executing the Rust code.

The `ret` instruction does not change your return value in `RAX`.

# 8. ELF metadata and stack protection

```
#ifndef __APPLE__
.size check_bit, .-check_bit
#endif
```

`.size` specifies the size of the function symbol.

The expression:

```
.-check_bit
```

Means:

```
Current address - check_bit address
```

This calculates the number of bytes occupied by the function.

Next:

```asm
.section .note.GNU-stack,"",@progbits
```

This tells the ELF linker that this object file does not require an executable stack.

It helps avoid warnings such as:

```
warning: missing .note.GNU-stack section implies executable stack
```

This directive is excluded on macOS because it is ELF-specific.

# 9. Complete execution walkthrough

Let's trace the exact instructions using:

```rs
let value = 1u64 << 62;
let index = 62;

let result = unsafe {
    check_bit(value, index)
};
```

The input:

```
value = 0x4000000000000000

Binary:
0100000000000000000000000000000000000000000000000000000000000000
```

Execution:

## CPU execution trace

1. Function entry
   ```
   check_bit:
   ```
   ```
   RDI = 0x4000000000000000
   RSI = 62
   ```
2. Test bit 62
   ```
   bt rdi, rsi
   ```
   ```
   Bit 62 = 1
   CF = 1
   ```
3. Copy Carry Flag
   ```
   setc al
   ```
   ```
   AL = 1
   ```
4. Zero extension
   ```
   movzx eax, al
   ```
   ```
   EAX = 0x00000001
   RAX = 0x0000000000000001
   ```
5. Return
   ```
   ret
   ```
   ```
   Rust receives: 1
   ```

Result: true

# 10. Debug it with GDB

Since you're learning assembly through CLI tools, I recommend stepping through the actual instructions.

First, compile:

```
cargo build
```

Find the symbol:

```
nm -n target/debug/z99_asm_ffi_bits_check | grep check_bit
```

Disassemble:

```
objdump -d -Mintel target/debug/z99_asm_ffi_bits_check \
    | grep -A 10 '<check_bit>:'
```

Start GDB:

```
gdb target/debug/z99_asm_ffi_bits_check
```

Set a breakpoint:

```
(gdb) break check_bit
(gdb) run
```

Inspect registers:

```
(gdb) info registers rdi rsi rax eflags
```

Step through the instructions:

```
(gdb) si
(gdb) si
(gdb) si
(gdb) si
```

Inspect the Carry Flag:

```
(gdb) p $eflags & 1
```

If the result is `1`, the Carry Flag is set.

Inspect the return value:

```
(gdb) p/x $rax
```

Expected:

```bash
$1 = 0x1
```

# 11. Important performance optimization

Your current function:

```asm
bt      rdi, rsi
setc    al
movzx   eax, al
ret
```

Uses four instructions.

However, because `check_all_bits()` calls this function 64 times per value, you have 64 FFI calls and 64 function returns.

For your Rust program, a more efficient approach would be to process all 64 bits inside one assembly function.

For example, an alternative x86-64 implementation could use:

```asm
.intel_syntax noprefix

.text
.global check_all_bits

check_all_bits:
    # RDI = input u64
    # RSI = output bool array pointer

    xor     ecx, ecx

.loop:
    bt      rdi, 63
    setc    al
    mov     byte ptr [rsi + rcx], al

    shl     rdi, 1
    inc     ecx

    cmp     ecx, 64
    jne     .loop

    ret

.section .note.GNU-stack,"",@progbits
```

This processes all 64 bits in one assembly function call.

It writes the results directly into the output memory.

Note that this version uses one byte per Boolean, matching the element size of Rust's `[bool; 64]`. It also shifts the input left each iteration, so it visits bit 63 first.

For maximum performance, the loop can be further optimized or unrolled, and the output representation can be changed to a bitmask if individual Boolean bytes are not required.

My recommendation: First understand and debug the four-instruction `check_bit` function. Then compare it against the single-call `check_all_bits` implementation using `objdump` and GDB. That is a useful exercise in understanding FFI overhead, calling conventions, register allocation, and instruction-level optimization.


# Arm분석

- Let's examine your ARM64 (AArch64) assembly code line by line, including the GNU assembler (GAS) syntax, C preprocessor directives, ARM64 registers, calling convention, bitwise instructions, and how Rust calls the assembly function through FFI.

Your assembly function implements this Rust declaration:

```rs
unsafe extern "C" {
    fn check_bit(value: u64, index: u64) -> u64;
}
```

Its purpose is to check one bit in a 64-bit integer and return `0` or `1`.

# 1. Complete assembly code

```asm
#ifdef __APPLE__
#define SYMBOL(name) _##name
#else
#define SYMBOL(name) name
#endif

.text
.globl SYMBOL(check_bit)

#ifndef __APPLE__
.type check_bit, %function
#endif

SYMBOL(check_bit):
    // X0 = value
    // X1 = bit index (0..63)
    // Return X0 = 0 or 1

    lsr     x0, x0, x1
    and     x0, x0, #1

    ret

#ifndef __APPLE__
.size check_bit, .-check_bit
.section .note.GNU-stack,"",%progbits
#endif
```

# 2. C preprocessor directives

Your file uses the `.S` extension (uppercase S).

This means GCC runs the C preprocessor before passing the source code to the assembler.

These directives are not ARM CPU instructions.

## 2.1 Detect macOS

```asm
#ifdef __APPLE__
#define SYMBOL(name) _##name
#else
#define SYMBOL(name) name
#endif
```

This handles symbol naming differences between macOS and Linux.

On macOS:

```
SYMBOL(check_bit)
```

Expands to:

```
_check_bit
```

On Linux:

```
SYMBOL(check_bit)
```

Expands to:

```
check_bit
```

Why?

Mach-O, the macOS object-file format, conventionally prefixes externally visible C symbols with an underscore.

ELF, used by Linux, normally does not.

## 2.2 Understanding `##`

```
#define SYMBOL(name) _##name
```

The `##` operator is called the token-pasting operator.

It joins two tokens into one.

For example:

```
_##check_bit
```

Produces:

```
_check_bit
```

This lets you maintain one assembly implementation for both operating systems.

# 3. Section and symbol declarations

## 3.1 `.text`

```
.text
```

This tells the assembler that subsequent instructions belong to the executable code section.

Typical ELF sections include:

| Section   | Purpose                 |
| --------- | ----------------------- |
| `.text`   | Executable instructions |
| `.rodata` | Read-only data          |
| `.data`   | Initialized global data |
| `.bss`    | Zero-initialized data   |
| `.symtab` | Symbol table            |
| `.strtab` | Symbol names            |

Your `check_bit` function belongs in `.text`.

## 3.2 `.globl`

```
.globl SYMBOL(check_bit)
```

This exports the function symbol so that other object files can reference it.

For example, Rust declares:

```
unsafe extern "C" {
    fn check_bit(value: u64, index: u64) -> u64;
}
```

The linker must be able to find the corresponding assembly symbol.

On Linux:

```
.globl check_bit
```

On macOS:

```
.globl _check_bit
```

Without global visibility, the linker may not be able to resolve Rust's external function reference.

## 3.3 `.type`

```
#ifndef __APPLE__
.type check_bit, %function
#endif
```

This tells the ELF assembler that `check_bit` is a function symbol.

Syntax:

```
.type symbol_name, %function
```

The `%function` attribute identifies the symbol as executable function code.

You can inspect this information with:

```
readelf -s target/debug/z99_asm_ffi_bits_check
```

Or:

```
nm -n target/debug/z99_asm_ffi_bits_check
```

This directive is excluded on macOS because Mach-O uses different symbol metadata.

# 4. Function entry point

```
SYMBOL(check_bit):
```

This defines the function's entry label.

When Rust executes:

```
let result = unsafe {
    check_bit(value, index)
};
```

The linker resolves the function reference to this assembly symbol.

The CPU begins executing instructions at this address.

# 5. ARM64 calling convention

This is especially important when combining Rust and assembly.

Your Rust function declaration is:

```rs
unsafe extern "C" {
    fn check_bit(value: u64, index: u64) -> u64;
}
```

On Linux AArch64, the standard procedure-call convention (AAPCS64) specifies:

- `X0`–`X7`: first eight integer or pointer arguments.
- `X0`–`X1`: integer return values.
- `X19`–`X28`: callee-saved general-purpose registers.
- `X30`: link register (LR), containing the return address.

ARM64 function registers

# X0

First argument

value: u64

Also return register

# X1

Second argument

index: u64

# X30 (LR)

Link register

Stores the return address when called with BL.

For example, Rust calls:

```
check_bit(0x4000000000000000, 62);
```

When assembly starts:

```
X0 = 0x4000000000000000
X1 = 62
```

The assembly must return the result in `X0`.

# 6. Understanding the actual ARM64 instructions

This is the most important part of your program.

## 6.1 `lsr x0, x0, x1`

```
lsr x0, x0, x1
```

`LSR` means Logical Shift Right.

Syntax:

```
lsr destination, source, shift_amount
```

It shifts the bits of the source register to the right.

The vacant bits on the left are filled with zeros.

For example:

```
Before:

X0 = 0100 0000 0000 0000 ...
X1 = 62
```

The instruction:

```
lsr x0, x0, x1
```

Shifts the value right by 62 positions.

Conceptually:

```
Original:

0100 0000 0000 0000 0000 0000 ...
 ^

After shifting right by 62:

0000 0000 0000 0000 0000 0000 ... 0001
                                      ^
```

The selected bit moves into bit position zero.

The original value is replaced because `X0` is both the source and destination.

Important: `LSR` does not preserve the original value in `X0`.

### Why does it work?

Suppose:

```
value = 0b0100
index = 2
```

Shift right by two:

```
0100 >> 2 = 0001
```

The original bit 2 is now in position 0.

This is exactly what we need.

## 6.2 `and x0, x0, #1`

```
and x0, x0, #1
```

`AND` performs a bitwise AND operation.

Syntax:

```
and destination, source, immediate
```

Here:

```
#1 = 0000 ... 0001
```

The instruction keeps only the lowest bit.

For example, after `LSR`:

```
X0 = 0000 ... 0001
```

Then:

```
and x0, x0, #1
```

Produces:

```
X0 = 0000 ... 0001
```

If the selected bit was zero:

```
X0 = 0000 ... 0000
```

The result is always:

```
X0 = 0
```

or:

```
X0 = 1
```

This is a very useful technique for extracting an individual bit.

## 6.3 `ret`

```
ret
```

`RET` returns execution to the caller.

In AArch64, the default behavior is equivalent to:

```
ret x30
```

`X30` is the link register.

When the caller executes:

```
bl check_bit
```

The `BL` instruction:

1. Stores the return address in `X30`.
2. Branches to `check_bit`.

Then `RET`:

1. Reads the return address from `X30`.
2. Transfers execution back to the caller.

Your result remains in `X0`.

# 7. Complete execution walkthrough

Let's trace the instructions with:

```
let value = 1u64 << 62;
let index = 62;

let result = unsafe {
    check_bit(value, index)
};
```

The input value is:

```
Hexadecimal:

0x4000000000000000

Binary:

0100000000000000000000000000000000000000000000000000000000000000
```

## ARM64 CPU execution trace

1. Function entry
   ```
   check_bit:
   ```
   ```
   X0 = 0x4000000000000000
   X1 = 62
   ```
2. Logical shift right
   ```
   lsr x0, x0, x1
   ```
   ```
   X0 = 0x0000000000000001
   ```
3. Bitwise AND
   ```
   and x0, x0, #1
   ```
   ```
   X0 = 0x0000000000000001
   ```
4. Return
   ```
   ret
   ```
   ```
   Rust receives: 1
   ```

Result: true

# 8. ELF metadata and stack protection

## 8.1 `.size`

```
#ifndef __APPLE__
.size check_bit, .-check_bit
#endif
```

This tells the assembler the size of the function.

The expression:

```
.-check_bit
```

Means:

```
Current address - check_bit address
```

For example:

```asm
check_bit:
    lsr x0, x0, x1
    and x0, x0, #1
    ret
```

Each AArch64 instruction is 4 bytes.

Therefore:

```
Function size = 3 × 4 = 12 bytes
```

The `.size` directive records that information in the ELF symbol table.

## 8.2 `.note.GNU-stack`

```asm
.section .note.GNU-stack,"",%progbits
```

This is ELF-specific metadata.

It indicates that the assembly object does not require an executable stack.

It helps prevent linker warnings such as:

```
warning: missing .note.GNU-stack section implies executable stack
```

It is excluded on macOS because Mach-O does not use this ELF section.

# 9. Debug using GDB on ARM64

Since you're working with assembly and Rust FFI, I recommend inspecting the real CPU registers.

First compile:

```
cargo build
```

Disassemble:

```
aarch64-linux-gnu-objdump \
    -d target/debug/z99_asm_ffi_bits_check
```

If you're running natively on ARM64 Linux:

```
objdump -d target/debug/z99_asm_ffi_bits_check
```

Start GDB:

```
gdb target/debug/z99_asm_ffi_bits_check
```

Set a breakpoint:

```
(gdb) break check_bit
(gdb) run
```

Inspect registers:

```
(gdb) info registers x0 x1 x30 pc
```

Step through one instruction:

```
(gdb) si
```

Inspect `X0`:

```
(gdb) p/x $x0
```

Inspect `X1`:

```
(gdb) p/x $x1
```

You should see the input value and bit index before executing `LSR`.

After stepping through both bitwise instructions:

```
(gdb) p/x $x0
```

Expected:

```
$1 = 0x1
```

# 10. Performance optimization: extracting all 64 bits

Your current implementation checks one bit per assembly call.

If you want to check all 64 bits, you can move the loop into assembly.

For example:

AArch64 implementation:

```
.text
.global check_all_bits

#ifndef __APPLE__
.type check_all_bits, %function
#endif

check_all_bits:
    // X0 = input value
    // X1 = output array pointer
    // X2 = loop counter

    mov     x2, #0

.loop:
    lsr     x3, x0, #63
    strb    w3, [x1, x2]

    lsl     x0, x0, #1

    add     x2, x2, #1
    cmp     x2, #64
    b.ne    .loop

    ret

#ifndef __APPLE__
.size check_all_bits, .-check_all_bits
.section .note.GNU-stack,"",%progbits
#endif
```

Corresponding Rust declaration:

```
unsafe extern "C" {
    fn check_all_bits(value: u64, output: *mut bool);
}

fn check_all(value: u64) -> [bool; 64] {
    let mut bits = [false; 64];

    unsafe {
        check_all_bits(value, bits.as_mut_ptr());
    }

    bits
}
```

This version:

- Makes only one FFI call.
- Processes all 64 bits inside assembly.
- Writes one byte per Boolean.
- Avoids Rust-side iteration.

Note that this is an educational implementation, not necessarily the fastest possible implementation. It uses a loop and shifts the input on each iteration.

# 11. x86-64 vs ARM64 comparison[|🔝|](#link)

Here is the key difference between your two assembly implementations.

| Operation          | x86-64  | ARM64         |
| ------------------ | ------- | ------------- |
| First argument     | `RDI`   | `X0`          |
| Second argument    | `RSI`   | `X1`          |
| Return value       | `RAX`   | `X0`          |
| Test/extract bit   | `BT`    | `LSR` + `AND` |
| Conditional result | `SETC`  | Not needed    |
| Zero extension     | `MOVZX` | Not needed    |
| Return             | `RET`   | `RET`         |

x86-64

```
bt      rdi, rsi
setc    al
movzx   eax, al
ret
```

ARM64

```
lsr     x0, x0, x1
and     x0, x0, #1
ret
```

The main architectural difference:

- x86-64 has a dedicated `BT` instruction that transfers the selected bit into the Carry Flag.
- ARM64 extracts the bit using a logical shift and a bitwise AND.

Both produce exactly the same logical result.

One final detail: Your function assumes `index` is between `0` and `63`. For this range, the implementation is correct. If you want to support arbitrary `u64` indices, you should explicitly validate the index in Rust before calling assembly.

For your next learning step, I recommend comparing `LSR + AND` against ARM64's `UBFX` instruction. `UBFX` can extract the selected bit directly:

```
ubfx x0, x0, x1, #1
ret
```

That is a particularly interesting comparison with x86-64's `BT` instruction.

# 64-bit 패턴

- 네, 가능합니다! 다만 63-bit를 어떤 의미로 사용하는지 구분해야 합니다.

예를 들어 다음 비트 패턴을 말하는 거라면:

```
0100 0000 0000 0000 0000 0000 0000
```

가장 왼쪽의 `1`이 63번째 비트(0부터 세면 bit 62인지, 1부터 세면 63번째인지)에 해당하는지 확인해야 합니다.

### 1. 63번째 비트가 설정되어 있는지 검사하기

Rust에서는 `u64`를 사용하면 됩니다.

```
fn main() {
    let value: u64 = 1 << 62;

    let is_63bit = value & (1 << 62) != 0;

    let mut bits: Vec<bool> = Vec::new();
    bits.push(is_63bit);

    println!("Value: {:#066b}", value);
    println!("63rd bit: {}", is_63bit);
    println!("Vector: {:?}", bits);
}
```

Output:

```
Value: 0b0100000000000000000000000000000000000000000000000000000000000000
63rd bit: true
Vector: [true]
```

### 2. 여러 비트를 Vector에 저장하기

```
fn main() {
    let value: u64 = 1 << 62;

    let bits: Vec<bool> = (0..64)
        .rev()
        .map(|i| (value & (1 << i)) != 0)
        .collect();

    println!("{:?}", bits);
}
```

이 코드는 64비트를 각각 `bool`로 변환하여 `Vec<bool>`에 저장합니다.

### 핵심 차이

| 검사                       | 의미                  |
| ------------------------ | ------------------- |
| `usize::BITS == 64`      | 시스템의 포인터 너비가 64-bit |
| `value & (1 << 62) != 0` | 63번째 비트가 1인지 검사     |
| `value.count_ones()`     | 값에서 1로 설정된 비트의 개수   |

주의: 여기서 63-bit는 CPU가 63-bit 아키텍처라는 뜻이 아니라, `u64` 값의 63번째 비트가 설정되어 있다는 뜻입니다.
