---
title: Study_WindowsOS_Kernel_001
published: 2026-11-11
description: 'WindowsOS Kernel공부하는 방법 01'
image: ''
tags: [rust, kernel, WindowsOS]
category: 'rust_Kernel_WindowsOS'
draft: false 
lang: ''
---

# link

- [한국에서 리눅스 정리 잘된 싸이트minzkn.com](https://www.minzkn.com/linuxkernel)

<hr />


# How to study the Windows kernel

Yes, studying Microsoft's documentation on GitHub is a good starting point. However, there is an important distinction:

The `MicrosoftDocs/win32` repository documents the Windows Win32 API, not the Windows kernel implementation itself.

If your goal is to understand how Windows works internally—processes, threads, virtual memory, scheduling, interrupts, system calls, drivers, and the I/O subsystem—you should study several layers of Windows architecture.

Since you have already been studying Rust operating systems, x86-64 assembly, page tables, MMU, and kernel development, I recommend approaching Windows from an OS-kernel developer's perspective rather than simply learning Windows application programming.

## 1. Understand the Windows documentation ecosystem

Start by distinguishing these documentation sources.

| Repository / documentation                                                                                                                                        | What you learn                              | Priority  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | --------- |
| [MicrosoftDocs/win32](https://github.com/MicrosoftDocs/win32/blob/docs/desktop-src/desktop-programming.md?utm_source=chatgpt.com)                                 | Windows user-mode APIs                      | Medium    |
| [Windows Driver Documentation](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/?utm_source=chatgpt.com)                                         | Kernel architecture and driver development  | Very high |
| [Windows Kernel DDI Reference](https://github.com/MicrosoftDocs/windows-driver-docs-ddi/blob/staging/wdk-ddi-src/content/_kernel/index.md?utm_source=chatgpt.com) | Kernel routines, structures, and interfaces | Very high |
| [Windows Hardware Developer Documentation](https://learn.microsoft.com/en-us/windows-hardware/drivers/?utm_source=chatgpt.com)                                    | WDK, drivers, debugging, and testing        | High      |
| [WinDbg Kernel Debugging](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/getting-started-with-windbg--kernel-mode-?utm_source=chatgpt.com)   | Inspecting actual kernel execution          | Very high |

The most important repository for your goal is:

[MicrosoftDocs/windows-driver-docs](https://github.com/MicrosoftDocs/windows-driver-docs?utm_source=chatgpt.com)

It contains documentation about the Windows kernel-mode architecture, managers, drivers, and kernel programming.

## 2. Learn the overall Windows architecture first

Before studying individual kernel functions, understand how the components communicate.

<img width="2514" height="1417" alt="Image" src="https://github.com/user-attachments/assets/0c227956-c139-4bc6-a20c-8424c509b990" />

[Windows System 프로그래밍 강의 | megayuchi - 인프런](https://images.openai.com/static-rsc-4/S3aceoGIJOYmG7u7fhKU2N3AMP1U_SgKiURQLke6KpnvOBi1O2-NdqJkqxErp3QJRD6EOb7FWVVaIV3gni4oF5XnAjkDEZru6y26ptZmOjTREqgNQsTu6Hi8_Dfahaazt-CReTyzeG3xH0kekLGhwSjnDpDIHmaZqgadmR6FvT8?purpose=inline)

[inflearn.com](https://www.inflearn.com/course/windows-system-programming?cid=336247\&utm_source=chatgpt.com)

Study these components in this order:

| Component                        | Responsibilities              | Concepts to study                        |
| -------------------------------- | ----------------------------- | ---------------------------------------- |
| Hardware Abstraction Layer (HAL) | Hardware abstraction          | Interrupt controllers, timers, hardware  |
| Windows Kernel (`ntoskrnl.exe`)  | Core OS mechanisms            | Scheduling, interrupts, synchronization  |
| Executive                        | Higher-level OS services      | Object, process, memory, I/O managers    |
| Memory Manager                   | Virtual and physical memory   | Page tables, paging, working sets        |
| Process/Thread Manager           | Process and thread management | Context switching, scheduling            |
| I/O Manager                      | Device communication          | IRPs, device objects, driver stacks      |
| Security Reference Monitor       | Access control                | Tokens, privileges, security descriptors |

A particularly useful Microsoft document is the [Kernel-Mode Driver Architecture Design Guide](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/?utm_source=chatgpt.com).

It describes the responsibilities of the major kernel-mode managers and libraries.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://learn.microsoft.com\&sz=32)

[Microsoft Learn+1](https://learn.microsoft.com/en-us/windows-hardware/drivers/kernel/)



## 3. Follow this learning roadmap

I recommend studying the following seven stages in order.

### Stage 1 — Windows user mode and kernel mode

Start here

Learn how an application communicates with the operating system.

Topics:

1. User mode vs. kernel mode.
2. Privilege levels (x86-64 rings).
3. System calls.
4. Windows API vs. Native API.
5. `ntdll.dll`.
6. `ntoskrnl.exe`.
7. System service dispatch.

Understand this conceptual call chain:

```
User Application
       |
       v
Win32 API
       |
       v
KernelBase.dll
       |
       v
ntdll.dll
       |
       v
System Call (syscall)
       |
       v
Windows Kernel
       |
       v
Kernel Executive Services
```

For example, when an application creates a process:

```
CreateProcessW()
       |
       v
Windows user-mode libraries
       |
       v
Native system-call interface
       |
       v
Kernel process-management services
       |
       v
New process and initial thread
```

The exact internal path varies by Windows version and API.

Read:

- [User Mode and Kernel Mode](https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/user-and-kernel-mode?utm_source=chatgpt.com)
- [Windows API documentation](https://learn.microsoft.com/en-us/windows/win32/?utm_source=chatgpt.com)

### Stage 2 — Process and Thread Management

Topics:

- `EPROCESS`
- `KPROCESS`
- `ETHREAD`
- `KTHREAD`
- Process creation and termination
- Thread scheduling
- Context switching
- Dispatcher objects
- Synchronization

Important question:

How does Windows switch the CPU from one thread to another?

Compare the concepts with your own x86-64 OS:

| Your OS implementation  | Windows concepts                 |
| ----------------------- | -------------------------------- |
| Process structure       | `EPROCESS`                       |
| Thread structure        | `ETHREAD` / `KTHREAD`            |
| Scheduler               | Dispatcher / scheduler           |
| Context switch          | Thread context switching         |
| Address-space switching | Process address-space management |

Read: [Windows Kernel-Mode Process and Thread Manager](https://github.com/MicrosoftDocs/windows-driver-docs/blob/staging/windows-driver-docs-pr/kernel/windows-kernel-mode-process-and-thread-manager.md?utm_source=chatgpt.com).&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub



### Stage 3 — Memory Management

This should be one of your highest priorities.

Topics:

1. Virtual address spaces.
2. Physical memory management.
3. Page tables.
4. Page faults.
5. Demand paging.
6. Working sets.
7. Memory-mapped files.
8. Kernel virtual address space.
9. TLB and address-space switching.

Compare:

| x86-64 OS concept        | Windows concept          |
| ------------------------ | ------------------------ |
| PML4 / page tables       | Hardware page tables     |
| Page fault handler       | Memory Manager           |
| Physical frame allocator | Physical page management |
| Address-space structure  | Process address space    |
| Virtual memory mapping   | Virtual memory manager   |
| Kernel heap              | Kernel pool              |

Pay particular attention to the distinction between the hardware page-table mechanisms and the Windows Memory Manager's higher-level policies.

### Stage 4 — Interrupts, Exceptions, and Scheduling

Topics:

- IDT
- Interrupt Service Routine (ISR)
- Interrupt Request Level (IRQL)
- Deferred Procedure Calls (DPC)
- Asynchronous Procedure Calls (APC)
- Hardware interrupts
- Software interrupts
- Exceptions
- Thread dispatching

One important Windows concept is IRQL.

For example:

```
PASSIVE_LEVEL
       |
       v
APC_LEVEL
       |
       v
DISPATCH_LEVEL
       |
       v
Device IRQLs
       |
       v
HIGH_LEVEL
```

IRQL controls which interrupt and execution contexts are allowed to run. It is not simply another name for x86 privilege rings.

Study how Windows handles an interrupt using an ISR and subsequently schedules work through a DPC.

### Stage 5 — Object Manager and I/O Manager

Topics:

- Windows Object Manager
- Handles
- Object types
- Object namespaces
- Device objects
- Driver objects
- I/O Request Packets (IRPs)
- Device stacks
- Asynchronous I/O

For example, a file operation conceptually follows:

```
Application
    |
    v
ReadFile()
    |
    v
Windows I/O system
    |
    v
I/O Manager
    |
    v
IRP_MJ_READ
    |
    v
File System Driver
    |
    v
Storage Driver
    |
    v
Hardware
```

Read Microsoft's [Overview of the Windows I/O Model](https://github.com/MicrosoftDocs/windows-driver-docs/blob/staging/windows-driver-docs-pr/kernel/overview-of-the-windows-i-o-model.md?utm_source=chatgpt.com).&#x20;

[image](https://www.google.com/s2/favicons?domain=https://github.com\&sz=32)

GitHub



### Stage 6 — Windows Security

Topics:

- Access tokens
- Security identifiers (SIDs)
- Privileges
- Access control lists (ACLs)
- Security descriptors
- User/kernel access boundaries
- Object access checking
- Windows security reference monitor

Understand how the kernel determines whether a process can access a particular object.

### Stage 7 — Device Driver Development

Finally, implement a small kernel-mode driver.

Study:

- Windows Driver Kit (WDK)
- Windows Driver Model (WDM)
- Kernel-Mode Driver Framework (KMDF)
- `DriverEntry`
- `IRP_MJ_CREATE`
- `IRP_MJ_CLOSE`
- `IRP_MJ_DEVICE_CONTROL`
- `DriverUnload`

Start with Microsoft's [Windows Driver Samples](https://github.com/microsoft/Windows-driver-samples?utm_source=chatgpt.com).

Don't begin by writing a complicated hardware driver. Start with a simple driver that creates a device and handles basic requests.

## 4. Set up a Windows kernel debugging environment

Reading documentation alone is insufficient. You should inspect the actual Windows kernel while it is running.

I recommend using a virtual machine rather than experimenting on your primary operating system.

[FLUG: QEMU lightning talk](https://images.openai.com/static-rsc-4/wqwmnEwDJC2e9rHOUR9Mi033jO5OqOmTUURk3cXY7qtKP1MRu7U-RgAqUprjwkIjPOKugzSnWZDnjgl-YEGHkqKdnFNfyQmXAOvhISJ3RcC8-Pm1jx6-KoEgefLwKlSDsPHMRwomKdCkKQcsnDpsA5W9HGUajqInvA-R3sYKFHk?purpose=inline)

1\. Windows 11 virtual machine

Use VMware, Hyper-V, or another suitable hypervisor. Keep a snapshot so you can recover from crashes.

[Visão geral do Depurador do Windows WinDbg - Windows drivers | Microsoft Learn](https://images.openai.com/static-rsc-4/GS_m3VbUG-izkXUjRImoGkDNoHdbBNVJhNB4MqyYf4IFJ13ZDAPGvAw-7mKqT-zhok51e-azLhZoS1xRxn7gUY_hleU3rxKXaVhclnyOhyavFfrEP25WNXvZ8ciXOcuP_uQN_JlaCVvr_Q3rMMR2qAQVim0PYfr3WCu0p9bfnlM?purpose=inline)

2\. [WinDbg](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/?utm_source=chatgpt.com)

Inspect kernel modules, symbols, registers, memory, threads, and kernel data structures.

[Sysinternals graphical tools — MCSI Library](https://images.openai.com/static-rsc-4/C1e8fPpnSZ02RxkXrEYYPjC86p4pz0zo7JaN2UTx6tHGVjRJlipaTn8LPzp565cf7SaE5v-1ntaYrP8dqEGTdJD-0wstBAWfHJdG3H84bNW6gcNhllZ-9_k7ctk3f_ReBKqNekYRQXp-hWIdJ1r6qPGmAGdRTvgviSZVROvQLf8?purpose=inline)

3\. [Sysinternals](https://learn.microsoft.com/en-us/sysinternals/?utm_source=chatgpt.com)

Use Process Explorer, Process Monitor, RAMMap, and other utilities to observe Windows internals.

[Write a Universal Windows Driver (KMDF) Based on a Template - Windows drivers | Microsoft Learn](https://images.openai.com/static-rsc-4/tIthEKYWZ117EuXAiehW1Z99PQW4-YM_acIuetowuFwZzPO8GrYcDKfBbnz6moLdq2LrJm3oyjhMzHaSaB8FjUJzURxcrYjwI3ztMQHLk8q5yh_HcgJ9qo1KjHIRNUsvUey3qbJTf9996Se-6lQ2OVcWPb3SZ88KUNIPoNvUO0w?purpose=inline)

4\. [Windows Driver Kit (WDK)](https://learn.microsoft.com/en-us/windows-hardware/drivers/download-the-wdk?utm_source=chatgpt.com)

Set up the environment for compiling and testing kernel-mode drivers.

### Your first WinDbg exercises

After setting up kernel debugging, learn these commands:

| Command            | Purpose                             |
| ------------------ | ----------------------------------- |
| `lm`               | List loaded modules                 |
| `!process 0 0`     | Display process information         |
| `!thread`          | Display current thread information  |
| `!pte ADDRESS`     | Inspect page-table entries          |
| `!address ADDRESS` | Examine virtual address information |
| `r`                | Display CPU registers               |
| `k`                | Display the call stack              |
| `dt`               | Display data structures             |
| `u ADDRESS`        | Disassemble instructions            |

For example:

```
kd> lm
kd> !process 0 0
kd> !thread
kd> r
kd> k
```

Official tutorial: [Get started with WinDbg kernel-mode debugging](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/getting-started-with-windbg--kernel-mode-?utm_source=chatgpt.com).&#x20;

[image](https://www.google.com/s2/favicons?domain=https://learn.microsoft.com\&sz=32)

Microsoft Learn



## 5. Read Windows Internals

I strongly recommend studying the book series [Windows Internals](https://learn.microsoft.com/en-us/sysinternals/resources/windows-internals?utm_source=chatgpt.com).

[‎Windows Internals by Pavel Yosifovich, Alex Ionescu, Mark Russinovich & David Solomon on Apple Books](https://images.openai.com/static-rsc-4/inXqndWVdDU3ouCFNSlHRQhe9knuVeSyqIflWBetwskJnpQyOw3yRj0J3ZI0je9jbBmlnhb0Hx9jZVSOBNBD4Jw1scSuRCNalVa_8QyOVfWN42VBZ0Q8eFSIFSlBDRYkf8X5FZf32gXVJgrFpTltUOFoBuvMLOWyb2433o9GPV8?purpose=inline)

[Windows Internals, Part 2, 7th Edition | Microsoft Press Store](https://images.openai.com/static-rsc-4/Fdnor5EE3dCMu4oAi6yXp0asE5OrlSet9QkhS3MbAVraWc4hc0RSzIFo5unvXm8WIUO1dXPreE-zJtjRqQafWw9SpMsyWPDzFD1KCy8_Oy_SzewGSs6x3cqAtsIfUDFI5-jb_M4iFWjSejKSjSH0_MHtXl8rXQQomN9GFZAjmcA?purpose=inline)

It provides a deeper explanation of Windows architecture than ordinary Win32 API documentation.

Prioritize these subjects:

1. System architecture.
2. Processes and jobs.
3. Threads and scheduling.
4. Memory management.
5. I/O system.
6. Security.
7. Boot process and initialization.

The book's coverage depends on the edition, so supplement older material with current Microsoft documentation.

## 6. A practical 12-week study schedule

Here is the order I would use:

| Weeks | Subject                   | Practical exercise                 |
| ----- | ------------------------- | ---------------------------------- |
| 1–2   | Windows architecture      | Trace a Win32 API call             |
| 3     | System calls              | Inspect `ntdll.dll` in WinDbg      |
| 4     | Processes and threads     | Examine `EPROCESS` and `ETHREAD`   |
| 5–6   | Memory management         | Inspect virtual addresses and PTEs |
| 7     | Interrupts and exceptions | Study IRQL, ISR, and DPC           |
| 8     | Scheduling                | Inspect thread states and context  |
| 9     | Object Manager            | Examine handles and kernel objects |
| 10    | I/O Manager               | Trace an IRP                       |
| 11    | Security                  | Examine access tokens and ACLs     |
| 12    | Driver development        | Build a simple KMDF driver         |

## 7. Connect Windows concepts to your Rust OS project

This is probably the most valuable exercise for understanding Windows deeply.

Instead of just memorizing Windows terminology, implement a small equivalent in your own operating system and compare the designs.

For example:

| Your Rust OS        | Windows                               |
| ------------------- | ------------------------------------- |
| Bootloader          | Windows Boot Manager                  |
| Kernel entry point  | Windows kernel initialization         |
| `PageTable`         | Hardware page tables + Memory Manager |
| `FrameAllocator`    | Physical Memory Manager               |
| `Process`           | `EPROCESS`                            |
| `Thread`            | `ETHREAD` / `KTHREAD`                 |
| `Scheduler`         | Windows dispatcher                    |
| Interrupt handler   | ISR                                   |
| Deferred work       | DPC                                   |
| System call handler | System service dispatch               |
| Device abstraction  | Device Object                         |
| Driver interface    | WDM / KMDF                            |

One important limitation: Windows is not an open-source operating system. Its kernel implementation is proprietary. Microsoft publishes documentation, public headers, debugging symbols, and driver samples, but these do not expose the complete kernel source code.

Therefore, combine documentation with WinDbg, disassembly, and practical experiments.

## My recommended study order

Recommended approach

I would prioritize these resources:

1. Windows Internals — understand how the operating system works.
2. Windows Driver Documentation — understand kernel architecture.
3. Windows Kernel DDI Reference — learn actual kernel interfaces.
4. WinDbg — investigate the running kernel.
5. Windows Driver Samples — learn through implementation.
6. Win32 API Documentation — understand the user-mode interface.

Useful starting links:

- [Win32 Documentation](https://github.com/MicrosoftDocs/win32?utm_source=chatgpt.com)
- [Windows Driver Documentation](https://github.com/MicrosoftDocs/windows-driver-docs?utm_source=chatgpt.com)
- [Windows Driver Samples](https://github.com/microsoft/Windows-driver-samples?utm_source=chatgpt.com)
- [Sysinternals Tools](https://learn.microsoft.com/en-us/sysinternals/?utm_source=chatgpt.com)
- [Windows Debugger](https://learn.microsoft.com/en-us/windows-hardware/drivers/debugger/?utm_source=chatgpt.com)

My advice: Don't try to learn every Windows API. Focus on the boundary between user mode and kernel mode, then study the Memory Manager, Process Manager, Scheduler, Interrupt Manager, and I/O Manager.

That will give you a much stronger understanding of Windows kernel architecture.

I can also turn this roadmap into a hands-on weekly Windows kernel course, with Rust OS comparisons, assembly exercises, WinDbg commands, and practical debugging assignments.

🖥️Weekly Windows kernel study lessons눌러서 설정하세요
