---
title: Trap_mechanism
published: 2026-10-05
description: 'A trap is a mechanism that transfers CPU execution to the OS kernel to handle a particular event or condition.'
image: ''
tags: [rust, OS, trap]
category: 'rust_OS'
draft: false 
lang: ''
---

# trap

- In CPU and Operating Systems (OS), a trap is an event that causes the CPU to stop its normal instruction execution and transfer control to a special handler, usually provided by the operating system (OS kernel).

- In simple terms:

- A trap is a mechanism that transfers CPU execution to the OS kernel to handle a particular event or condition.

### 1. What does the sentence mean?

Original:

> It is worth noting that computers have traps other than the instruction for executing a system call.

Meaning:

Computers have several mechanisms that transfer control to the OS kernel, not just the special CPU instruction used to request a system call.

For example, a system call is only one reason the CPU might enter the kernel.

### 2. Common types of traps and related events

| Event                    | Meaning                                   | Example                               |
| ------------------------ | ----------------------------------------- | ------------------------------------- |
| System call              | Program requests an OS service            | `write()`, `read()`                   |
| Divide error             | CPU detects division by zero              | `10 / 0`                              |
| Page fault               | Memory access requires OS handling        | Accessing an unmapped virtual address |
| Breakpoint               | Execution reaches a debugging breakpoint  | x86 `int3`                            |
| Invalid opcode           | CPU encounters an unsupported instruction | Invalid machine instruction           |
| General protection fault | CPU detects a protection violation        | Invalid privileged operation          |

Strictly speaking, CPU architecture distinguishes exceptions, interrupts, and traps. The sentence uses traps in a broader sense.

### 3. How does a trap work?

Consider a program accessing invalid memory.

```
        User Program
             |
             v
    Execute CPU instruction
             |
             v
    Access virtual memory
             |
             v
      Page fault occurs
             |
             v
    CPU transfers control
       to OS kernel
             |
             v
     Page Fault Handler
             |
       +-----+------+
       |            |
       v            v
   Resolve fault   Terminate
       |           process
       v
   Resume program
```

The CPU uses architecture-specific mechanisms to transfer execution to the appropriate handler.

### 4. x86-64 assembly examples

Here are two instructions that can cause transitions into an OS handler:

System call:

```asm
mov rax, 1       ; SYS_write
mov rdi, 1       ; stdout
syscall          ; Enter kernel
```

Breakpoint:

```asm
int3             ; Generate breakpoint exception
```

Both transfer CPU execution away from the normal user-program instruction stream, but they have different purposes.

### 5. Important terminology

| Term        | Explanation                                                 |
| ----------- | ----------------------------------------------------------- |
| Trap        | Often a synchronous event transferring control to a handler |
| Exception   | An event caused by instruction execution                    |
| Interrupt   | An event typically caused by external hardware              |
| System call | A controlled request for an OS service                      |
| Handler     | Kernel code responsible for processing an event             |

Remember this distinction:

- System call: The program intentionally asks the OS to do something.
- Exception: The CPU detects a condition during instruction execution.
- Interrupt: Hardware signals that something needs attention.

For OS development, understanding these mechanisms is essential because they explain how the CPU transitions between user mode and kernel mode.
