---
title: Study_macOS_Kernel_001
published: 2026-11-11
description: 'macOS Kernel공부하는 방법 01'
image: ''
tags: [kernel, rust, macOS]
category: 'rust_Kernel_macOS'
draft: false 
lang: ''
---

# link

- [한국에서 리눅스 정리 잘된 싸이트minzkn.com](https://www.minzkn.com/linuxkernel)

<hr />

# How to Study the macOS Kernel — A Step-by-Step Roadmap

- If your goal is to understand how macOS works internally, I recommend studying XNU (the macOS kernel), Darwin, Mach, BSD, I/O Kit, and the Apple system architecture.

One important distinction:

- macOS API Documentation explains how applications use macOS functionality.
- Darwin documentation explains the underlying operating-system environment.
- XNU source code lets you study the actual kernel implementation.

You should study both the public APIs and the kernel source code, but prioritize XNU if your goal is operating-system development and reverse engineering.

## 1. Understand the macOS architecture

<img width="1408" height="768" alt="Image" src="https://github.com/user-attachments/assets/a2cb2a3f-62fd-4147-92cc-e0b43a52a250" />

[Part 23: Case Studies | Computer Architecture & OS Mastery - Wasil Zafar](https://images.openai.com/static-rsc-4/yAl4PtmyqiHpktZ_7z8RXWPQnjwxej7BxKOF9rvKwlkt3iPXMPW4R-GXhrecKiBXIF2PYGKpDp4Tbmb3cLGxvaD9qbghr5qYzCO3lZ5WjPIUV7ZABdwpRRwzIcbohSp0AbniY-F35MyQvh3_h0s1gp058qB2NsWiCa0Nv6-we94?purpose=inline)

[wasilzafar.com](https://www.wasilzafar.com/pages/series/computer-architecture/comp-arch-case-studies.html?utm_source=chatgpt.com)

macOS uses the XNU kernel, which combines three major components:

| Component | Responsibility                                              |
| --------- | ----------------------------------------------------------- |
| Mach      | Threads, scheduling, virtual memory, IPC, exceptions        |
| BSD       | Processes, POSIX APIs, filesystems, networking, permissions |
| I/O Kit   | Device drivers and hardware management                      |

Other important components include:

- libSystem: Core user-space system libraries.
- launchd: System and service management.
- APFS: Apple's filesystem.
- IOKit frameworks: Interfaces for interacting with hardware.
- System calls: The boundary between user applications and the kernel.

A useful high-level execution path is:

```
             User Applications
                     |
              macOS Frameworks
                     |
                 libSystem
                     |
                System Calls
                     |
       +-------------+-------------+
       |                           |
    Mach Kernel                 BSD Layer
       |                           |
       +-------------+-------------+
                     |
                 I/O Kit
                     |
              Hardware Devices
```

This is a conceptual diagram, not a literal call path for every operation.

## 2. Follow this learning sequence

I recommend studying the kernel in the following order.

1. Stage 1 — Darwin and macOS fundamentals

   Learn:
   - Darwin architecture
   - User space vs. kernel space
   - System calls
   - Process and thread models
   - Virtual memory
2. Stage 2 — Mach kernel

   Learn:
   - Mach tasks and threads
   - Mach ports
   - IPC (Inter-Process Communication)
   - Virtual memory management
   - Scheduling
   - Exceptions and traps
3. Stage 3 — BSD subsystem

   Learn:
   - Process management
   - File descriptors
   - VFS (Virtual File System)
   - BSD sockets
   - Signals
   - Permissions and credentials
   - System-call implementation
4. Stage 4 — Memory management

   Learn:
   - Virtual address spaces
   - Page tables
   - Physical memory
   - TLB
   - Memory mapping (`mmap`)
   - Copy-on-write
   - Mach VM objects
5. Stage 5 — I/O Kit and drivers

   Learn:
   - I/O Kit architecture
   - Device matching
   - Driver objects
   - Hardware interrupts
   - DMA
   - DriverKit
6. Stage 6 — Kernel security

   Learn:
   - System Integrity Protection (SIP)
   - Apple Mobile File Integrity (AMFI)
   - Code signing
   - Entitlements
   - Sandbox
   - Secure Boot
   - Kernel extensions and their restrictions
7. Stage 7 — Kernel source-code analysis

   Read actual XNU implementation, trace functions, inspect structures, and understand how components interact.

## 3. Study the official Apple documentation

These are the most useful documentation resources.

[Apple Documentation | kean.blog](https://images.openai.com/static-rsc-4/HCLm5Y5U2uuwyWoMoy4-EAcXzE88MlproSotcGjJ6VQmQCAK_clcMj4Fl4XOh-z76UZl5-gdmFDj1eJlCWT_bX-VruVW8wmG3SFseAIaQfodoA61VIjfHZ7IhLiDtvDhIgnG_bj8m2NTE1R2eePoPeNxGlR35cYujuBwmhMO5BM?purpose=inline)

1\. Apple Developer Documentation

[Apple Developer Documentation](https://developer.apple.com/documentation/?utm_source=chatgpt.com)

Start here for public macOS APIs and frameworks.

[Why is macOS often referred to as 'Darwin'? - Ask Different](https://images.openai.com/static-rsc-4/Xi8z8OfsS5DTl9Y5TrvdWYr7MxvLZKSp3geKGYufKrjXcbiCO-3S615QgXplMdMQd3NTnBsuSI53MZTi4Cb3Y2GbXouiCUb3NkVMiBPYGDqNalPgIBfGfneHRHaPTjyuo9xktsfBSVR05aQpMhWmcP8QKA06uQVlHPSZ-ScHJkw?purpose=inline)

2\. XNU Kernel Documentation

[Apple XNU source repository and README](https://github.com/apple-open-source/macos/blob/master/xnu/README.md?utm_source=chatgpt.com)

This is the most important resource. Read the architecture, source tree, and build instructions.

[Darwin · iOS逆向：Apple操作系统](https://images.openai.com/static-rsc-4/GzG3VWdOAIvq83krTyQE2QhZPzdpugYQawqAM5-1q7bbxBIAcEvwBdACyyel3zeErL0s1U7Iy5AnT3c-KFUPd1jJinlglABgjU_IlRJ3tUVtu_8NtN4JRQ5KOhscETggj_ZNZRR81-jYDwhiaXhEB9f0xYJQr4v3ERsf2oCgivc?purpose=inline)

3\. Kernel Programming Guide

[Building and Debugging Kernels](https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/KernelProgramming/build/build.html?utm_source=chatgpt.com)

An older, archived guide covering kernel architecture and development. Use it for foundational concepts, not as the definitive guide to current macOS.

[Creating a Driver Using the DriverKit SDK | Apple Developer Documentation](https://images.openai.com/static-rsc-4/U9H3JFb3_rvOqx8BKltf9XSDXy3L1loSx00OjxR1rdKRz13ifocrBcQruQm7I2cJY8C7lEIJHtX6t_2aE41f88kNx7srTJ2ly1NwUvB-F_H0sJMr8WJ2i6G-VGx7E00du1ds4N7pvNasHxkHQTcWjEYtLaOdphwbkJg8es0jEoE?purpose=inline)

4\. I/O Kit Fundamentals

[Introduction to I/O Kit Fundamentals](https://developer.apple.com/library/archive/documentation/DeviceDrivers/Conceptual/IOKitFundamentals/Introduction/Introduction.html?utm_source=chatgpt.com)

Learn the historical and architectural foundations of Apple's driver model.

[What's new in DriverKit - Discover - Apple Developer](https://images.openai.com/static-rsc-4/DTKRqoxgVs_h6aDIkkVBXQmVUNPDT9WzQfGKMIO2muZykZ7qf_Zi0WbYPJdQ4GLyEn8i8M_4K9YnziQ4hzd-7MzAfcI81iUMKhzRtodWUO2dzVvYGj-4h8VQ0vsQm203ZH2uQADeRik0Nj6C4qlO2gQ8Ja0r_YU3Pee-oQsCZxM?purpose=inline)

5\. DriverKit

[DriverKit Documentation](https://developer.apple.com/documentation/driverkit?language=objc\&utm_source=chatgpt.com)

Learn modern user-space driver development.

[Apple Publishes New Apple Platform Security Guide - MacRumors](https://images.openai.com/static-rsc-4/2fDUI1Zmdhu5qgloaf71ACwW-EjMrp5OemofaHl_SAeKhiM2U6VHufKvN_PV1lZ_OJ2zn_JaSo0XhstaS08bAvUV-vq3MzhI3QjINuOVsdCbpR44MmCBuKc9C1usGjBbtoSCeSU8S5vUcO38k99L4t70GG4-e8mGUpH9VpZtzcc?purpose=inline)

6\. Apple Platform Security

[Apple Platform Security Guide](https://help.apple.com/pdf/security/en_US/apple-platform-security-guide.pdf?utm_source=chatgpt.com)

Study Secure Boot, SIP, code signing, and kernel security.

## 4. Download and explore the XNU source code

The most important repository is:

[Oakstone & Github | Executive Search for GTM SaaS](https://images.openai.com/static-rsc-4/HQnzkeZepdcbz6yki5F911xaI7qZFrq-EjoAnoh5focKQlZBBR_xVRxmdszYIh8CF9ZImt1zDUWQIDbeJm9vx6gJmTSUYpEpChiHmY_gLt1gXp9uq4lq-oxfEEM9g7FJhQpCYi7WHrUwBF9vcV_4-kwArSHYrPmmA6I2uBI6wFE?purpose=inline)

[apple-oss-distributions/xnu](https://github.com/apple-oss-distributions/xnu?utm_source=chatgpt.com)

Clone it:

```bash
git clone https://github.com/apple-oss-distributions/xnu.git

cd xnu
```

Explore the source tree:

```bash
tree -L 2
```

If `tree` isn't installed:

```bash
brew install tree
```

### Important source directories

| Directory     | What to study                          |
| ------------- | -------------------------------------- |
| `osfmk/`      | Mach kernel                            |
| `bsd/`        | BSD subsystem                          |
| `iokit/`      | I/O Kit                                |
| `libkern/`    | Kernel C++ support                     |
| `pexpert/`    | Platform-specific code                 |
| `security/`   | Kernel security                        |
| `libsyscall/` | User-space syscall interfaces          |
| `tools/`      | Kernel debugging and development tools |

These directories are particularly important because they let you connect operating-system concepts with their actual implementation.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub+1



### Recommended source-code reading order

I recommend the following progression:

```bash
xnu/
 ├── osfmk/
 │    ├── kern/       # Kernel scheduling and tasks
 │    ├── vm/         # Virtual memory
 │    ├── ipc/        # Mach IPC
 │    ├── mach/       # Mach interfaces
 │    └── arm/        # ARM-specific implementation
 │
 ├── bsd/
 │    ├── kern/       # BSD process and syscall logic
 │    ├── vm/         # BSD virtual memory integration
 │    ├── net/        # Networking
 │    ├── vfs/        # Filesystem layer
 │    └── sys/        # System interfaces
 │
 ├── iokit/
 ├── libkern/
 ├── pexpert/
 └── security/
```

Directory contents can change between XNU releases, so use the checked-out source tree as your reference.

## 5. Set up your macOS kernel research environment

I recommend using your macOS terminal with these tools.

Install basic utilities:

```bash
xcode-select --install

brew install \
    git \
    cmake \
    ninja \
    llvm \
    lldb \
    cscope \
    universal-ctags \
    jq
```

Check your system:

```bash
uname -a
uname -m
sw_vers
```

Inspect kernel information:

```bash
sysctl kern.version
sysctl kern.osrelease
sysctl kern.osrevision
```

Inspect processes:

```bash
ps aux
```

Inspect virtual memory:

```bash
vm_stat
```

Inspect loaded kernel extensions:

```bash
kmutil showloaded
```

Inspect Mach-O binaries:

```bash
file /usr/lib/system/libsystem_kernel.dylib

otool -L /usr/lib/system/libsystem_kernel.dylib
```

Inspect symbols:

```bash
nm -gU /usr/lib/system/libsystem_kernel.dylib
```

For assembly and debugging:

```bash
xcrun llvm-objdump --help
xcrun lldb
```

Important: The publicly available XNU source is not the complete source of every component shipped in macOS. Some Apple hardware, firmware, and platform-specific implementations are not publicly available.

## 6. Practical exercises: Learn by investigating the kernel

Don't just read documentation. Write small programs and investigate what happens inside macOS.

Here are seven exercises I recommend.

| Exercise            | What to investigate               | Tools                          |
| ------------------- | --------------------------------- | ------------------------------ |
| 1. Process creation | `fork()`, `execve()`, `waitpid()` | LLDB, `dtruss` where permitted |
| 2. System calls     | User-space to kernel transitions  | `libsyscall`, LLDB             |
| 3. Threads          | Mach threads and pthreads         | `pthread`, Mach APIs           |
| 4. Virtual memory   | `mmap()`, `mach_vm_allocate()`    | LLDB, `vmmap`                  |
| 5. IPC              | Mach ports and messages           | Mach APIs                      |
| 6. Filesystems      | VFS and file descriptors          | `fs_usage`                     |
| 7. Device drivers   | I/O Kit and DriverKit             | Xcode, I/O Registry            |

For example, investigate virtual memory:

```c
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <unistd.h>

int main(void) {
    size_t size = getpagesize();

    void *ptr = mmap(
        NULL,
        size,
        PROT_READ | PROT_WRITE,
        MAP_PRIVATE | MAP_ANON,
        -1,
        0
    );

    if (ptr == MAP_FAILED) {
        perror("mmap");
        return 1;
    }

    printf("Allocated address: %p\n", ptr);

    *(int *)ptr = 1234;

    printf("Value: %d\n", *(int *)ptr);

    munmap(ptr, size);

    return 0;
}
```

Compile and run:

```
clang -g -O0 main.c -o vm_test

./vm_test

lldb ./vm_test
```

Investigate:

1. How does `mmap()` reach the kernel?
2. How does XNU allocate virtual memory?
3. How are Mach VM objects involved?
4. When are physical pages actually allocated?
5. What happens when the process accesses the allocated address?

This exercise connects macOS APIs to actual kernel implementation.

## 7. Learn kernel debugging and reverse engineering

For deeper investigation, learn these tools:

| Tool           | Purpose                                         |
| -------------- | ----------------------------------------------- |
| LLDB           | Debugging and inspecting execution              |
| `nm`           | Symbol inspection                               |
| `otool`        | Mach-O binary analysis                          |
| `llvm-objdump` | Assembly disassembly                            |
| `dtrace`       | Dynamic system tracing, subject to restrictions |
| `fs_usage`     | Filesystem activity                             |
| `vmmap`        | Process virtual memory                          |
| Instruments    | Performance analysis                            |

Since macOS has strong security protections, some tracing and kernel-debugging operations require special permissions or a separate development environment.

Avoid disabling SIP or changing boot security on your everyday Mac just to study XNU. Apple recommends disabling system protections only temporarily when necessary for development.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://developer.apple.com\&sz=32)

Apple Developer Documentation+1



For kernel experiments, use a dedicated test Mac or an appropriate virtualized environment.

## 8. Recommended books

[‎Mac OS X Internals by Amit Singh on Apple Books](https://images.openai.com/static-rsc-4/qlkR5DJtI9Ygi6UKR97yUc3_3ihxzjPLIRuE_fRC-96CCydR0R7vWWv6OU6trxH0C4scKoD1wAimHf6VijgXP-gqLhkDW3yjleh0SMGF2qeWjrPC1REbA6Oy008nCqj8soZjkCuvSlaKh1FSzZeGJquHFQUHOrQ298wLoTDkenM?purpose=inline)

1\. Mac OS X Internals

Amit Singh

Excellent for understanding Mach, BSD, virtual memory, I/O Kit, and macOS internals. It describes older macOS versions, so verify implementation details against current XNU.

[Operating Systems: Three Easy Pieces Paperback 9781985086593| eBay](https://images.openai.com/static-rsc-4/_vgSg6LMn1acYwEoIT64q_UlYrOrvcuFsnO-ElHdEQbN0DxRxylM2eqhJHub9pixrAiPOh-YHSu9ILNvI03crKGNR066TEL9EfXiOcgc4ej3Lt2SxzZPnkfjoDBiLMrS-J9wLowA_04l-Q5g2JEinrn9c1L2sjLUEG0K4VikrNk?purpose=inline)

2\. Operating Systems: Three Easy Pieces

Remzi and Andrea Arpaci-Dusseau

Excellent for understanding processes, concurrency, memory management, and filesystems.

[Free online textbook](https://pages.cs.wisc.edu/~remzi/OSTEP/?utm_source=chatgpt.com)

[The design and implementation of the FreeBSD operating system Second edition - relié - Marshall K Mckusick, George V. Neville-Neil, Robert N.M. Watson - Achat Livre ou ebook | fnac](https://images.openai.com/static-rsc-4/lbsT_H00gefq-zymEdSHIBZf4UuaG51MnpOo0u7Yk_q5m60Gt7D4Ca3uNxtpZaEzBoHK53WW0QkE-oGHk6A4YhK-0SPWZmBlEWyUJcOWzw0jvVjvrv1QPCLq5RAc62KAZpFtTMsgGEnPM9_Xk0rPjv1krfw920EnR-QGuhR6QgI?purpose=inline)

3\. The Design and Implementation of the FreeBSD Operating System

George V. Neville-Neil and Marshall Kirk McKusick

Useful for understanding BSD concepts that are relevant to XNU's BSD subsystem.

## 9. My recommended learning path

Given your existing work on ARM64, x86-64, Rust, page tables, and bare-metal operating systems, I would approach XNU by connecting what you already know to its implementation.

Suggested 8-week curriculum

| Week | Main subject           | Practical result                  |
| ---- | ---------------------- | --------------------------------- |
| 1    | Darwin architecture    | Understand XNU structure          |
| 2    | Mach tasks and threads | Trace thread creation             |
| 3    | Mach IPC               | Build a Mach messaging example    |
| 4    | BSD system calls       | Trace `open`, `read`, `write`     |
| 5    | Virtual memory         | Investigate `mmap` and Mach VM    |
| 6    | I/O Kit / DriverKit    | Understand device management      |
| 7    | Kernel security        | Study SIP and code signing        |
| 8    | XNU source analysis    | Trace a complete kernel operation |

Final project

Trace a user-space program calling `mmap()` through the macOS system-call interface into XNU's virtual-memory implementation.

### The most important resources

If you only bookmark four resources, choose these:

1. [XNU source code](https://github.com/apple-oss-distributions/xnu?utm_source=chatgpt.com)
2. [Apple Kernel Documentation](https://developer.apple.com/documentation/kernel?utm_source=chatgpt.com)
3. [DriverKit Documentation](https://developer.apple.com/documentation/driverkit?utm_source=chatgpt.com)
4. [Apple Platform Security Guide](https://help.apple.com/pdf/security/en_US/apple-platform-security-guide.pdf?utm_source=chatgpt.com)

My advice: Start with Mach, then BSD, then virtual memory. Don't begin by trying to build and boot a custom XNU kernel. First understand the source code and trace how a simple user-space operation reaches the kernel.

I can also prepare a practical 4-week macOS XNU kernel study course, with daily reading assignments, source-code paths, terminal commands, and C/Rust exercises.
