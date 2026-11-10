---
title: Study_LinuxOS_Kernel_001
published: 2026-11-11
description: 'LinuxOS Kernel공부하는 방법 01'
image: ''
tags: [rust, kernel, linux, OS]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link

- [한국에서 리눅스 정리 잘된 싸이트minzkn.com](https://www.minzkn.com/linuxkernel)

- [LinuxOS Roadmap](../linux_kernel_map/)

<hr />

# CPU-MMU용어) COW가 나온다
- 지연 할당 및 공유: COW(Copy-on-Write)나 mmap을 통해 실제 쓰기가 일어날 때까지 물리 메모리 할당을 미루거나, 여러 프로세스가 같은 물리 페이지를 공유할 수 있습니다.
- https://www.minzkn.com/linuxkernel/pages/mmu-tlb.html#virtual-memory-motivation

# Linux Kernel Study Roadmap

If you want to study the Linux kernel by reading its API documentation and source code, I recommend following a structured path from operating-system fundamentals to kernel internals and eventually kernel development.

Since you're already studying x86-64 assembly, CPU architecture, MMU, page tables, and building your own operating system in Rust, you have a good foundation for understanding Linux internals.

My recommendation is to study Linux in this order:

## Linux kernel learning path

1. Linux architecture and fundamentals

   Kernel architecture, system calls, user mode vs. kernel mode.
2. Linux system calls and APIs

   Process management, files, memory, signals.
3. Process management

   Tasks, scheduling, context switching, threads.
4. Memory management

   Virtual memory, page tables, physical memory, page allocation.
5. Interrupts and device drivers

   Hardware interrupts, exceptions, DMA, device model.
6. VFS and filesystem

   Inodes, dentries, files, filesystem operations.
7. Networking

   Sockets, TCP/IP, network devices, Linux networking stack.
8. Kernel synchronization

   Spinlocks, mutexes, RCU, atomic operations.
9. Kernel development

   Build, configure, debug, trace, and modify the Linux kernel.

## 1. Start with official Linux documentation

Use these resources as your primary references.

[Iconos, Logos, Símbolos de Linux - Descarga Gratuita PNG, SVG](https://images.openai.com/static-rsc-4/oMdpejG-BH-oBXqCuGvjlVJzDiU9EVKupVj6nKGfOiJbHolwhvPMW6MKqiJcdX5L7Gf05kpgd5-ZbtvVRV3vtmEMEa2mNmwZKoz5ShCKGuS5Wdizl3KgdWAodPnuYVpcH61FbXwIKhD9lePdsCV3Dt-QrfuQGdcaztdGg3d_Qew?purpose=inline)

1\. [Linux Kernel Documentation](https://docs.kernel.org/?utm_source=chatgpt.com)

Main reference

The official documentation for kernel architecture, internal APIs, subsystems, drivers, memory management, and development.

[image](https://www.google.com/s2/favicons?domain=https://docs.kernel.org\&sz=32)

The Linux Kernel documentation

[Linux kernel source expands beyond 40 million lines – it has doubled in size in a decade | Tom's Hardware](https://images.openai.com/static-rsc-4/Kt-bfVraImYJh09VOn47VDlBH8VVuC6LbVTPgwboTPSdmVkH0jROi787Fi_dMAVP4cuzsga2XOc2G6MBrgmspUsvVIPn_uWApLVpk6jOQ3NryoudfpFeSqPfhjRjjfemyPVWC-0t79FvfBcW37DxLB3RO6Av3VxjBoWSlGHgNj4?purpose=inline)

2\. [Linux Kernel Source Code](https://github.com/torvalds/linux?utm_source=chatgpt.com)

Read actual kernel implementations. Documentation explains concepts; source code shows how they work.

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub

[Getting Help in Linux Terminal](https://images.openai.com/static-rsc-4/5AX9gynhZgcf-udMH41Pu9NuKMACnfBAnRQLazfmIhS_d4lWEf9mX0Uy12w4wXXfBt48tNOfk9540l0SjfpvkrFD-J-qhWHh9PDurCvVRb28W5zdsouSXlZSBHM5h0KTlu2LFQEuGUE8cScpdD7LmZ-WjbOalapEi_fwNuKMvV0?purpose=inline)

3\. [Linux man-pages](https://man7.org/linux/man-pages/?utm_source=chatgpt.com)

Learn userspace APIs, system calls, process management, signals, memory mapping, files, and sockets.

[image](https://www.google.com/s2/favicons?domain=https://kernel.org\&sz=32)

Kernel.org

[Embedded Software Engineer-I. Embedded Software Engineer-I Roadmap 🚀 | by Pranab Nandy | Medium](https://images.openai.com/static-rsc-4/7b0E8uYJQKOpAUyOWYxeMw0K5qs4YP_VWldi7ZJrRbDwFChMlgK0D6kER-A8rldY_CS3-ZYCw6bK6895oGSUEgOEZeoGw9Oe2gXsF3O1uWP3_ZnCiHONF1PN6Qv6pKKjRuJ5h3L9hlAJamJJiNg2tMgbqV3FEUg4WlJjBJmITpg?purpose=inline)

4\. [Linux Kernel Subsystem APIs](https://docs.kernel.org/subsystem-apis.html?utm_source=chatgpt.com)

Detailed references for scheduler, memory management, networking, storage, and other subsystems.

[image](https://www.google.com/s2/favicons?domain=https://cdn.kernel.org\&sz=32)

The Linux Kernel documentation

Important distinction:

There are two different types of Linux APIs:

| API                 | Purpose                                       | Example                                  |
| ------------------- | --------------------------------------------- | ---------------------------------------- |
| Userspace API       | Applications communicate with the kernel      | `open()`, `read()`, `mmap()`             |
| Internal kernel API | Kernel components communicate with each other | `kmalloc()`, `schedule()`, `spin_lock()` |

Do not confuse these two. The kernel's internal APIs are not generally stable across kernel versions.

## 2. Learn Linux system calls first

Start by understanding how a userspace application enters the kernel.

Study:

| Topic               | Important functions / concepts       |
| ------------------- | ------------------------------------ |
| System calls        | `syscall`, `openat`, `read`, `write` |
| Process creation    | `fork`, `clone`, `execve`            |
| Process termination | `exit`, `wait4`                      |
| Memory              | `mmap`, `munmap`, `brk`              |
| Signals             | `kill`, `sigaction`                  |
| Synchronization     | `futex`                              |
| Networking          | `socket`, `bind`, `listen`, `accept` |

Read these manual pages:

```
man 2 syscall
man 2 open
man 2 read
man 2 write
man 2 fork
man 2 clone
man 2 execve
man 2 mmap
man 2 futex
```

Then investigate the kernel source.

For example:

```
Userspace application
        |
        | read(fd, buf, size)
        v
   libc wrapper
        |
        | syscall instruction
        v
   Linux syscall entry
        |
        v
   VFS / filesystem
        |
        v
   Device driver
        |
        v
   Hardware
```

For x86-64, study the `syscall` instruction, `SYSCALL` entry handling, register conventions, and return to userspace.

## 3. Study Linux kernel internals

This is the most important part of your learning.

### Phase A — Process management

<img width="870" height="434" alt="Image" src="https://github.com/user-attachments/assets/8ac4d113-80a2-491e-b85b-862c334f92d7" />

[Processes — The Linux Kernel  documentation](https://images.openai.com/static-rsc-4/Jiv8GePgf8COaN7wY7A06wQyOR-i5UsEbq2p6E59_zXJiEo__xWcTU36w0CFxSATYD2yn5rVYt3-Z1uaUyXnDPMF-2RSEhgXVZIu9aLBdB-5X69al0TbeMpo6IuD-6bqSQD2MTM11pIBpjn30gxDhoRNec5Dv5dfUVqHxcyP56k?purpose=inline)

[linux-kernel-labs.github.io](https://linux-kernel-labs.github.io/refs/heads/master/lectures/processes.html?utm_source=chatgpt.com)

Study:

- `task_struct`
- Process and thread management
- `clone()` implementation
- Context switching
- Scheduler classes
- CFS and EEVDF scheduling
- CPU affinity
- SMP

Source directories:

```
kernel/
kernel/sched/
include/linux/sched.h
arch/x86/kernel/
```

### Phase B — Memory management

<img width="600" height="413" alt="Image" src="https://github.com/user-attachments/assets/ab166b1b-7693-4dea-9043-fbdc7b03be34" />

[Memory Management » ADMIN Magazine](https://images.openai.com/static-rsc-4/XloJW5XZSnuHg4Cu5GAQyvtglOloRCuBEpSTTkDqYwUXOZZPhHjI4SL2Oc28_LTITHQWkFcr3PB2S38_gssUa4LAhbJJ-NtJP7n3kBjHhg4A3p_HOj7UXky61Z2W-IyF4R-WgRF3XL0dvDv3y8eHnOJ8hGZ1QC4xvOEvBTQpY04?purpose=inline)

[admin-magazine.com](https://www.admin-magazine.com/Archive/2014/21/Managing-Linux-Memory?utm_source=chatgpt.com)

Study:

- Virtual address spaces
- Physical memory management
- Page tables
- TLB management
- Page faults
- Demand paging
- Buddy allocator
- SLAB / SLUB allocator
- `struct mm_struct`
- `struct vm_area_struct`

Source directories:

```
mm/
include/linux/mm.h
arch/x86/mm/
arch/x86/include/asm/
```

Pay particular attention to:

```
struct mm_struct;
struct vm_area_struct;
struct page;
```

Your existing MMU and page-table studies will be especially useful here.

### Phase C — Interrupts and hardware

Study:

- CPU exceptions
- Hardware interrupts
- IRQ handling
- Softirqs
- Tasklets
- Workqueues
- DMA
- I/O memory
- PCI device model

Source directories:

```
kernel/irq/
kernel/softirq.c
kernel/workqueue.c
drivers/
arch/x86/kernel/
```

### Phase D — Filesystem and VFS

<img width="1280" height="816" alt="Image" src="https://github.com/user-attachments/assets/4cbb4ddf-1e7f-4c58-916c-be05fd3d68c6" />

[Linux Virtual File System - SoByte](https://images.openai.com/static-rsc-4/93ue7Jn5KXCbvAy8VGekgmJcZG16w06nrHZuziti03BqATzDzNJvuKHUlWnMpp6o_raxW6wcWwvet662GYH1wAGz3OTR6sfW5vAEm_caZzHoGnoCNfbtzpwr3NpOCcJUVzNBLscKKW92_-wAAB0uGZ8cm-kqxNU0Oj5zDfLfBPc?purpose=inline)

[sobyte.net](https://www.sobyte.net/post/2022-08/linux-virtual-file-system/?utm_source=chatgpt.com)

Study:

- Virtual Filesystem Switch (VFS)
- `struct file`
- `struct inode`
- `struct dentry`
- `struct super_block`
- File descriptors
- Filesystem implementations
- Page cache

Source directories:

```
fs/
include/linux/fs.h
mm/filemap.c
```

### Phase E — Networking

Study:

- Socket API
- TCP/IP
- Network devices
- `sk_buff`
- Routing
- Netfilter
- Network namespaces

Source directories:

```
net/
include/linux/skbuff.h
drivers/net/
```

### Phase F — Synchronization

Study:

- Atomic operations
- Spinlocks
- Mutexes
- Read-write locks
- Memory barriers
- RCU
- Wait queues
- Lock-free data structures

Source directories:

```
kernel/locking/
include/linux/spinlock.h
include/linux/mutex.h
include/linux/rcupdate.h
```

## 4. Set up a Linux kernel development environment

I recommend using Ubuntu or another Linux distribution inside a VM rather than experimenting with your primary operating system.

Install the development tools:

```
sudo apt update

sudo apt install -y \
    build-essential \
    gcc \
    clang \
    llvm \
    lld \
    make \
    bc \
    bison \
    flex \
    libssl-dev \
    libelf-dev \
    libncurses-dev \
    dwarves \
    git \
    gdb \
    qemu-system-x86 \
    busybox-static
```

Download the Linux source:

```
git clone \
    --depth 1 \
    https://github.com/torvalds/linux.git

cd linux
```

Configure the kernel:

```
make defconfig
```

Enable debugging information and useful kernel debugging options:

```
make menuconfig
```

Build:

```
make -j"$(nproc)"
```

Explore the source tree:

```
linux/
├── arch/          # Architecture-dependent code
├── block/         # Block device layer
├── crypto/        # Cryptographic subsystem
├── drivers/       # Device drivers
├── fs/            # Filesystems and VFS
├── include/       # Kernel header files
├── init/          # Kernel initialization
├── ipc/           # Inter-process communication
├── kernel/        # Core kernel functionality
├── mm/            # Memory management
├── net/           # Networking
├── security/      # Security framework
├── sound/         # Audio subsystem
└── Documentation/ # Kernel documentation
```

## 5. Learn by reading actual kernel source code

I strongly recommend using this workflow:

Step 1: Find a kernel API.

For example:

```
kmalloc(size, GFP_KERNEL);
```

Step 2: Find its declaration.

```
rg "kmalloc" include/linux/
```

Step 3: Find its implementation.

```
rg "kmalloc" mm/
```

Step 4: Understand the implementation.

Use:

```
gdb
objdump
nm
readelf
```

Step 5: Trace its execution path.

Follow function calls until you understand how the kernel performs the operation.

For example:

```
kmalloc()
    |
    v
kmalloc_noprof()
    |
    v
SLUB allocator
    |
    v
Object allocation
    |
    v
Physical memory pages
```

The exact implementation depends on the kernel version and configuration.

## 6. Recommended books

[Developer's Library Linux Kernel Development, (Paperback) - Walmart Business Supplies](https://images.openai.com/static-rsc-4/6o8W88EDV2U4CLfA80yor0okITQsa8v-P9KN5F1iXbYOWf97cB7rWXPlWVF65LziTXH2np-pZIi-xlvlsUdNH9kgk0ZHrmRMMMkr_7mxbS_PLSv9rrJ0OlAzernUbLURtUs2xlr7ZNONins705RHp9ul94scsfNDiSezqK8Y9Pc?purpose=inline)

1\. Linux Kernel Development

Robert Love

Excellent introduction to Linux kernel architecture, processes, scheduling, system calls, and memory management.

[리눅스 커널의 이해, 개정 3판](https://images.openai.com/static-rsc-4/OH8F9YJruczxKU_uHRE8_kmjJP2B3W4aq1RDGqaD9v_NO8ZCV1G6y1AUA9ZFBEBEjDjYjYMSRKtTqoOrMNTlAKfMumybeWKSpr8mU_Fwc3uejDPd5hz4X3fuAXvjj9zCH8P6UzcMRw3DpvbfHzaTcA5C3n8Wq0urkDxNEuXGvag?purpose=inline)

2\. Understanding the Linux Kernel

Daniel P. Bovet and Marco Cesati

Detailed explanations of kernel internals. Some implementation details are from older Linux versions, so cross-check with current source.

[Linux Device Drivers eBook by Jonathan Corbet - EPUB | Rakuten Kobo 9780596555382](https://images.openai.com/static-rsc-4/rm_qKV6u4z0_VD9H05hr0Yx3NGnZJi9Js5_LczznFV6RBA69ekiL774-v33wXknxPCSG83QrKTy3yiz3Ba9p1rLISAi8iXoCUCed-1lO7FjQXSKcuys1dMYfgIeYyRe6aG9H0AInAGtW7fHAJcoWjI_tMqjAxuBEtAqv0wxFv3w?purpose=inline)

3\. Linux Device Drivers

Jonathan Corbet, Alessandro Rubini, Greg Kroah-Hartman

A useful introduction to device drivers. This is an older third edition, so use current kernel documentation for APIs.

[Kernel Internals Essentials – Processes and Threads | Linux Kernel Programming](https://images.openai.com/static-rsc-4/5TOvIXxG9jXBLpeW0CoFK-UCPzFSg8ZDx_v9owJz8R9r4VrEaHTpJzC5lf3qtmuPtQZW1q8cuX9tK0lSYKSUhpC6iENgOWVAyks74fEnOFrym5dJXLhWcjiPn2mJDXyE_K9I09FUiKXYwS16m2i-IeGw_KLYgh1_irOAYb9VaFE?purpose=inline)

4\. Linux Kernel Programming

Kaiwan N. Billimoria

Practical kernel programming, kernel modules, synchronization, and development tools.

## 7. A practical 12-week study schedule

| Weeks | Subject                             | Practical exercise                         |
| ----- | ----------------------------------- | ------------------------------------------ |
| 1     | Linux architecture and system calls | Trace `write()`                            |
| 2     | Process management                  | Study `fork()` and `clone()`               |
| 3     | Scheduler                           | Trace a context switch                     |
| 4–5   | Memory management                   | Study page faults and page tables          |
| 6     | Physical memory allocator           | Investigate buddy allocator                |
| 7     | Interrupts                          | Trace IRQ handling                         |
| 8     | Device drivers                      | Write a simple kernel module               |
| 9     | VFS                                 | Trace `openat()`                           |
| 10    | Networking                          | Trace TCP socket operations                |
| 11    | Synchronization                     | Implement a kernel synchronization example |
| 12    | Kernel debugging                    | Debug a kernel using QEMU and GDB          |

## 8. My recommended starting point: Linux x86-64 boot process

Since you're interested in CPU architecture and OS implementation, I would start by comparing your own Rust OS boot process with Linux.

Study this sequence:

<img width="1280" height="816" alt="Image" src="https://github.com/user-attachments/assets/4cbb4ddf-1e7f-4c58-916c-be05fd3d68c6" />

[Linux from Power-Up to User. Understanding the Linux boot process is… | by Shlomi Menahem | Mar, 2026 | Medium](https://images.openai.com/static-rsc-4/OAXvDRMcU968_yKAw6uJFIkNIoOelasHm06KpfIvgHNPipw5xYI7BcQhWwfQOvvyLmrtc7T1zYOeFJyalKu1sfK1cvnlG1mS3BpEWOlB4TuBTq7F7QfGXhPubjysQ08Fcrz4s3NTlQ9N0cgPPPpvsH_Z1dh5OhOWRpB0PUTm1iI?purpose=inline)

[medium.com](https://medium.com/%40shlomi.menahem/linux-from-power-up-to-user-0495e6d4676d?utm_source=chatgpt.com)

```
BIOS / UEFI
    |
    v
Bootloader (GRUB)
    |
    v
Linux kernel entry
    |
    v
Architecture initialization
    |
    v
start_kernel()
    |
    v
Memory initialization
    |
    v
Scheduler initialization
    |
    v
Interrupt initialization
    |
    v
Driver initialization
    |
    v
Rest_init()
    |
    v
Kernel threads and init process
    |
    v
Userspace starts
```

Start reading these source files:

```
arch/x86/boot/
arch/x86/kernel/head_64.S
arch/x86/kernel/setup.c
init/main.c
kernel/fork.c
kernel/sched/core.c
mm/init.c
```

In particular, find:

```
start_kernel()
```

in:

```
init/main.c
```

This is an excellent entry point into the Linux kernel initialization sequence.

## 9. Essential official documentation to bookmark

Here is the reading order I recommend:

| Order | Documentation                                                                                 |
| ----- | --------------------------------------------------------------------------------------------- |
| 1     | [Kernel README](https://docs.kernel.org/admin-guide/README.html?utm_source=chatgpt.com)       |
| 2     | [Core API](https://docs.kernel.org/core-api/index.html?utm_source=chatgpt.com)                |
| 3     | [Memory Management API](https://docs.kernel.org/core-api/mm-api.html?utm_source=chatgpt.com)  |
| 4     | [Scheduler](https://docs.kernel.org/scheduler/index.html?utm_source=chatgpt.com)              |
| 5     | [Driver API](https://docs.kernel.org/driver-api/index.html?utm_source=chatgpt.com)            |
| 6     | [Filesystem](https://docs.kernel.org/filesystems/index.html?utm_source=chatgpt.com)           |
| 7     | [Kernel Locking](https://docs.kernel.org/locking/index.html?utm_source=chatgpt.com)           |
| 8     | [Kernel Development HOWTO](https://docs.kernel.org/process/howto.html?utm_source=chatgpt.com) |

The official documentation also explains that Linux kernel development requires understanding GNU C, kernel-specific compiler extensions, and the development process.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://cdn.kernel.org\&sz=32)

The Linux Kernel documentation



## 10. The most important advice

Don't try to memorize every Linux kernel API.

Instead, learn these three things:

1. Architecture: Why does the kernel need this subsystem?
2. Implementation: How does the kernel implement this functionality?
3. Execution: What happens at the CPU, memory, and hardware levels?

For example, when studying `mmap()`:

```
Application
    |
    v
mmap()
    |
    v
System call
    |
    v
Memory management subsystem
    |
    v
do_mmap()
    |
    v
Virtual memory area
    |
    v
Page fault
    |
    v
Page table mapping
    |
    v
MMU / TLB
```

This is the level of understanding I recommend aiming for.

One final recommendation: Keep your Rust OS project alongside your Linux kernel studies. Implementing a simplified version of Linux concepts in Rust, then comparing it with Linux's C implementation, is an excellent way to understand operating-system internals.

I can help you build a Linux kernel source-code study course, starting with `start_kernel()` and progressing through the actual Linux x86-64 source code, explaining each function and its assembly-level behavior.

# Linux Kernel Source-Code Study Course

Lesson 1 — Kernel Boot and Initialization

Let's begin studying the actual Linux kernel source code, not just operating-system theory.

Our target architecture will be Linux x86-64, and we'll use C, x86-64 assembly, GDB, QEMU, and the Linux source tree.

The goal is to understand:

- How the CPU starts executing the Linux kernel.
- How assembly transfers control to C.
- How `start_kernel()` initializes the kernel.
- How physical memory and virtual memory are initialized.
- How the scheduler and interrupts become operational.
- How Linux eventually starts its first userspace process.

## Course structure

Linux kernel source-code curriculum

1. Current lesson

   Boot process and `start_kernel()`

   `head_64.S` → `setup_arch()` → `start_kernel()`
2. Memory initialization

   `mm_init()`, `mem_init()`, page tables, buddy allocator.
3. Process initialization

   `rest_init()`, `kernel_init()`, `kernel_thread()`.
4. Process creation

   `fork()`, `clone()`, `copy_process()`, `task_struct`.
5. CPU scheduler

   `schedule()`, context switching, CFS/EEVDF.
6. System calls

   `SYSCALL`, `entry_SYSCALL_64`, `do_syscall_64()`.
7. Virtual memory

   `mmap()`, page faults, `handle_mm_fault()`, TLB.
8. Interrupts and exceptions

   IDT, IRQ, exceptions, interrupt handling.
9. Filesystem and VFS

   `openat()`, `do_sys_openat2()`, inode, dentry.
10. Device drivers and kernel modules

    Device model, PCI, character devices, module loading.

# Lesson 1. Understanding the Linux boot process

## 1.1 Download and inspect the source code

We'll use the official Linux repository:

[torvalds/linux — GitHub repository](https://github.com/torvalds/linux?utm_source=chatgpt.com)

On your Linux machine:

```bash
git clone --depth 1 \
    https://github.com/torvalds/linux.git

cd linux
```

Check the version:

```bash
make kernelversion
```

Open the important directories:

```bash
ls arch/x86/boot/
ls arch/x86/kernel/
ls init/
```

The first files to investigate are:

| File                                 | Responsibility                |
| ------------------------------------ | ----------------------------- |
| `arch/x86/boot/header.S`             | Boot protocol header          |
| `arch/x86/boot/compressed/head_64.S` | Compressed kernel startup     |
| `arch/x86/kernel/head_64.S`          | 64-bit kernel entry           |
| `arch/x86/kernel/setup.c`            | Architecture setup            |
| `init/main.c`                        | Generic kernel initialization |

Note that modern Linux commonly boots through a bootloader and a decompression stage before entering the main 64-bit kernel code. We will follow that complete path.

## 1.2 Understand the boot sequence

The important distinction is that Linux does not immediately jump from `head_64.S` into `start_kernel()`.

The x86-64 startup code first prepares the CPU, page tables, and boot parameters. It then enters architecture-specific C code.

The actual high-level path in the current Linux source is:

## Linux x86-64 startup flow

Bootloader

GRUB / UEFI bootloader

Compressed kernel startup

`arch/x86/boot/compressed/head_64.S`

64-bit kernel entry

`arch/x86/kernel/head_64.S`

`startup_64`

Architecture-specific C initialization

`arch/x86/kernel/head64.c`

`x86_64_start_kernel()`

Architecture boot reservations

`x86_64_start_reservations()`

Main entry point

`start_kernel()`

`init/main.c`

This distinction is important: `start_kernel()` is the beginning of generic kernel initialization, not the first instruction executed by the CPU.

Sources: [head64.c](https://github.com/torvalds/linux/blob/master/arch/x86/kernel/head64.c?utm_source=chatgpt.com) · [head_64.S](https://github.com/torvalds/linux/blob/master/arch/x86/kernel/head_64.S?utm_source=chatgpt.com) · [init/main.c](https://github.com/torvalds/linux/blob/master/init/main.c?utm_source=chatgpt.com).&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub+2



## 1.3 Study `startup_64` assembly

Open:

```bash
vim arch/x86/kernel/head_64.S
```

Find:

```asm
SYM_CODE_START_NOALIGN(startup_64)
```

This is an important entry point for the 64-bit kernel startup code.

The current source begins with operations equivalent to:

```asm
mov %rsi, %r15

leaq __top_init_kernel_stack(%rip), %rsp

movl $MSR_GS_BASE, %ecx
xorl %eax, %eax
xorl %edx, %edx
wrmsr
```

Let's understand every instruction.

### Instruction 1: Preserve boot parameters

```
mov %rsi, %r15
```

At the 64-bit boot protocol entry, the bootloader provides the physical address of `struct boot_params` in `RSI`.

| Register | Meaning                       |
| -------- | ----------------------------- |
| `RSI`    | Boot parameters address       |
| `R15`    | Saved boot parameters address |

Why save it in `R15`?

Because Linux will execute function calls during initialization. According to the x86-64 calling convention, `R15` is a callee-saved register.

This allows the boot parameters pointer to survive normal C function calls.

### Instruction 2: Initialize the stack pointer

```asm
leaq __top_init_kernel_stack(%rip), %rsp
```

This initializes `RSP`.

Remember:

```asm
RSP = Stack Pointer
```

The stack is essential because function calls need a stack for:

- Return addresses
- Local variables
- Saved registers
- Function arguments that do not fit in registers

The instruction uses RIP-relative addressing.

Its conceptual operation is:

\\[ RSP = RIP + displacement \\]

### Instruction 3: Initialize GSBASE

```asm
movl $MSR_GS_BASE, %ecx
xorl %eax, %eax
xorl %edx, %edx
wrmsr
```

`WRMSR` writes a Model-Specific Register.

The register number is provided through `ECX`, while the value comes from `EDX:EAX`.

Here:

```asm
ECX = MSR_GS_BASE
EDX = 0
EAX = 0
```

Therefore:

```asm
GSBASE = 0
```

This establishes an initial GS base before normal per-CPU infrastructure is ready.

Study these CPU concepts:

- Model-Specific Registers (MSRs)
- `RDMSR`
- `WRMSR`
- `GSBASE`
- `IA32_GS_BASE`
- `IA32_KERNEL_GS_BASE`
- Per-CPU variables

Reference: [Linux x86-64 FS/GS documentation](https://docs.kernel.org/arch/x86/x86_64/fsgs.html?utm_source=chatgpt.com).

## 1.4 Study `x86_64_start_kernel()`

Now open:

```bash
vim arch/x86/kernel/head64.c
```

Find:

```c
void __init __noreturn x86_64_start_kernel(char *real_mode_data)
```

This function prepares the architecture-specific environment.

Some important operations include:

| Operation                   | Purpose                                          |
| --------------------------- | ------------------------------------------------ |
| `cr4_init_shadow()`         | Initialize the kernel's CR4 shadow state         |
| `reset_early_page_tables()` | Remove the early identity-map trampoline mapping |
| `clear_bss()`               | Clear uninitialized global data                  |
| `sme_early_init()`          | Initialize early AMD memory encryption support   |
| `kasan_early_init()`        | Initialize early KASAN support                   |
| `idt_setup_early_handler()` | Set up early exception handling                  |
| `copy_bootdata()`           | Copy and sanitize boot parameters                |

Finally:

```c
x86_64_start_reservations(real_mode_data);
```

Then:

```c
void __init __noreturn
x86_64_start_reservations(char *real_mode_data)
{
    /* ... */

    start_kernel();
}
```

This is the bridge between architecture-specific initialization and generic kernel initialization.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub



## 1.5 Understand `start_kernel()`

Now we reach the most important function in this lesson.

Open:

```bash
vim init/main.c
```

Search:

```bash
/start_kernel
```

Or:

```bash
rg -n "void start_kernel" init/main.c
```

The current function has this structure:

```c
void start_kernel(void)
{
    char *command_line;
    char *after_dashes;

    set_task_stack_end_magic(&init_task);

    smp_setup_processor_id();

    debug_objects_early_init();

    init_vmlinux_build_id();

    cgroup_init_early();

    local_irq_disable();

    early_boot_irqs_disabled = true;

    boot_cpu_init();

    page_address_init();

    pr_notice("%s", linux_banner);

    setup_arch(&command_line);

    mm_core_init_early();

    // More initialization follows...
}
```

This is an abbreviated excerpt. The complete implementation contains many more initialization operations.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub



Let's examine the first operations.

### A. `set_task_stack_end_magic()`

```
set_task_stack_end_magic(&init_task);
```

Linux initializes a magic value at the end of the initial task's kernel stack.

Purpose:

- Detect kernel stack corruption.
- Help detect stack overflow.
- Protect the initial task's stack boundary.

Investigate:

```bash
rg -n "set_task_stack_end_magic" \
    include/ kernel/
```

### B. `smp_setup_processor_id()`

```c
smp_setup_processor_id();
```

SMP means Symmetric Multiprocessing.

This prepares early CPU identification.

Study:

```bash
include/linux/smp.h
arch/x86/kernel/
kernel/smp.c
```

Important concepts:

- Logical CPU IDs
- Physical CPU IDs
- Bootstrap Processor (BSP)
- Application Processors (APs)
- Per-CPU data

### C. `local_irq_disable()`

```c
local_irq_disable();
```

This disables local CPU interrupts.

Why?

Linux is still performing sensitive early initialization. It needs to control when interrupt handlers can execute.

Conceptually, on x86-64, disabling maskable interrupts involves clearing the interrupt-enable flag in `RFLAGS` (the `IF` bit).

Important distinction:

- Maskable hardware interrupts are disabled.
- NMI is not disabled by this operation.
- Synchronous CPU exceptions are not generally disabled.

### D. `boot_cpu_init()`

```c
boot_cpu_init();
```

This initializes the boot CPU's online/present/possible state in Linux's CPU management infrastructure.

### E. `page_address_init()`

```c
page_address_init();
```

This initializes infrastructure for mapping physical pages to virtual addresses in configurations that need it.

### F. `setup_arch()`

```c
setup_arch(&command_line);
```

This is one of the most important calls.

It transfers control into architecture-specific initialization.

For x86-64, investigate:

```bash
arch/x86/kernel/setup.c
arch/x86/kernel/e820.c
arch/x86/mm/
```

Study:

- Memory map discovery
- E820 memory regions
- ACPI tables
- Kernel command line
- Initial page tables
- Reserved physical memory
- NUMA initialization

At this point, you should begin connecting Linux's implementation to your own Rust OS's memory initialization.

# 2. Practical source-code investigation

Now let's use terminal tools to investigate the actual implementation.

## 2.1 Find functions and declarations

```bash
# Find start_kernel()
rg -n "start_kernel" init/

# Find architecture initialization
rg -n "x86_64_start_kernel" arch/x86/

# Find setup_arch()
rg -n "setup_arch" arch/x86/

# Find boot CPU initialization
rg -n "boot_cpu_init" kernel/ include/
```

Read a specific section:

```bash
sed -n '700,900p' init/main.c
```

The line numbers may change between kernel revisions. Use the `rg` result to select the correct range.

## 2.2 Understand the function call graph

Generate a simplified call graph:

```c
startup_64()
    |
    +-- verify_cpu()
    |
    +-- __pi___startup_64()
    |
    +-- common_startup_64()
            |
            v
    x86_64_start_kernel()
            |
            +-- reset_early_page_tables()
            +-- clear_bss()
            +-- kasan_early_init()
            +-- idt_setup_early_handler()
            |
            v
    x86_64_start_reservations()
            |
            v
    start_kernel()
            |
            +-- boot_cpu_init()
            +-- page_address_init()
            +-- setup_arch()
            +-- mm_core_init_early()
            +-- trap_init()
            +-- mm_core_init()
            +-- sched_init()
            +-- rest_init()
```

This is a simplified conceptual graph, not an exhaustive execution trace. The exact sequence depends on kernel version and configuration.

## 2.3 Debugging with GDB and QEMU

Eventually, we'll debug the kernel at instruction level.

First, prepare a debugging-enabled configuration:

```bash
make x86_64_defconfig

make menuconfig
```

Enable:

```bash
Kernel hacking
    ├── Kernel debugging
    ├── Compile-time checks and compiler options
    └── Compile the kernel with debug info
```

Build:

```bash
make -j"$(nproc)"
```

Launch QEMU with a GDB debugging port:

```bash
qemu-system-x86_64 \
    -m 2G \
    -smp 2 \
    -kernel arch/x86/boot/bzImage \
    -append "console=ttyS0 earlyprintk=serial" \
    -nographic \
    -S -s
```

In another terminal:

```bash
gdb vmlinux
```

Inside GDB:

```bash
target remote :1234

break start_kernel

continue
```

When the breakpoint is reached:

```asm
disassemble /m start_kernel

info registers

x/20i $rip

bt
```

Useful GDB commands:

| Command            | Meaning                                      |
| ------------------ | -------------------------------------------- |
| `info registers`   | Display CPU registers                        |
| `x/20i $rip`       | Disassemble 20 instructions                  |
| `si`               | Execute one machine instruction              |
| `ni`               | Execute one instruction, stepping over calls |
| `bt`               | Display call stack                           |
| `info symbol $rip` | Find the symbol containing RIP               |
| `disassemble /m`   | Mix C source and assembly                    |

Note: `-S` pauses the virtual CPU before execution, and `-s` opens the GDB server on port 1234. The `-kernel` method and boot arguments should be adjusted if your kernel configuration or boot environment requires a different boot path.

# 3. Your Lesson 1 exercises

Try these exercises before moving to memory management.

Lesson 1 checklist

0/8 completed

Find startup_64 in head_64.S.

Find x86_64_start_kernel() in head64.c.

Find x86_64_start_reservations().

Find start_kernel() in init/main.c.

Explain why Linux saves the boot parameter pointer in R15.

Explain what WRMSR does.

Explain why local_irq_disable() is used.

Find setup_arch() and investigate its implementation.

# 4. What comes next?

Lesson 2

## Linux Memory Management Internals

This is where we'll go deeper into CPU architecture and MMU implementation.

We'll investigate the actual source code for:

| Topic                    | Source code                |
| ------------------------ | -------------------------- |
| Memory initialization    | `mm/mm_init.c`             |
| Memory map               | `mm/memblock.c`            |
| Physical page allocation | `mm/page_alloc.c`          |
| Page tables              | `arch/x86/mm/`             |
| Virtual memory areas     | `mm/mmap.c`                |
| Page faults              | `arch/x86/mm/fault.c`      |
| Page structures          | `include/linux/mm_types.h` |

We'll trace this execution path:

```
Physical RAM
    |
    v
Firmware memory map (E820)
    |
    v
memblock allocator
    |
    v
Memory zones
    |
    v
Buddy allocator
    |
    v
Physical page allocation
    |
    v
Virtual memory mapping
    |
    v
Page tables
    |
    v
CR3 / MMU / TLB
```

Our long-term objective: Understand how Linux manages CPU registers, physical memory, virtual addresses, page tables, processes, and hardware — down to the assembly instructions.

Useful reference: [Official Linux Memory Management Documentation](https://docs.kernel.org/mm/index.html?utm_source=chatgpt.com).

Continue with Lesson 2 when you're ready.
