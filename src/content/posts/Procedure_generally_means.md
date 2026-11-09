---
title: Procedure_generally_means
published: 2026-10-04
description: 'In CPU and Operating Systems (OS), the word procedure generally means a sequence of instructions that performs a specific task. In programming, a procedure is similar to a function or subroutine.'
image: ''
tags: [rust, OS, x86_64, procedure]
category: 'rust_OS'
draft: false 
lang: ''
---

# procedure

- In CPU and Operating Systems (OS), the word procedure generally means a sequence of instructions that performs a specific task.

- In programming, a procedure is similar to a function or subroutine.

### 1. What is a procedure?

A procedure is a reusable block of code that:

1. Performs a particular operation.
2. Can be called from another part of a program.
3. Executes its instructions.
4. Returns control to the caller when finished.

For example, in C:

```c
void print_hello(void) {
    printf("Hello!\n");
}

int main(void) {
    print_hello();  // Call procedure
    return 0;
}
```

Here, `print_hello()` is a procedure.

### 2. Procedure in CPU assembly

In x86-64 assembly, a procedure is commonly implemented as a function or subroutine.

```asm
section .text
global _start

_start:
    call my_procedure

    mov rax, 60
    xor rdi, rdi
    syscall

my_procedure:
    mov rax, 10
    mov rbx, 20
    add rax, rbx

    ret
```

Execution:

```asm
_start:
    |
    | call my_procedure
    v
my_procedure:
    |
    | mov rax, 10
    | mov rbx, 20
    | add rax, rbx
    | ret
    |
    v
_start: (continues after call)
```

Important instructions:

| Instruction | Meaning                                                     |
| ----------- | ----------------------------------------------------------- |
| `call`      | Calls a procedure and saves the return address on the stack |
| `ret`       | Returns to the saved return address                         |
| `push`      | Saves a value on the stack                                  |
| `pop`       | Restores a value from the stack                             |

### 3. Procedure vs. function vs. system call

| Term              | Meaning                                                 |
| ----------------- | ------------------------------------------------------- |
| Procedure         | A reusable sequence of instructions                     |
| Function          | A callable block of code, often returning a value       |
| Subroutine        | Another name for a procedure                            |
| System call       | A request from a program to the OS kernel for a service |
| Interrupt handler | A procedure executed in response to an interrupt        |

### 4. Procedure in an operating system

In OS development, you might encounter procedures such as:

- Memory allocation procedure
- Process scheduling procedure
- Interrupt handling procedure
- Context switching procedure
- Page table management procedure

Key takeaway:

A procedure is essentially a sequence of instructions designed to perform a particular task. The CPU executes those instructions when the procedure is called.

In Rust, the closest equivalent is a function:

```c
fn my_procedure() {
    println!("Hello!");
}
```
