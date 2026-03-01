---
title: 260301_User_Mode_vs_Kernel_Mode
published: 2026-03-01
description: '커널 모드 대 사용자 모드: 왜 중요한가, 알아야 할 사항'
image: ''
tags: [rust, kernel]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link

- [(240926) 커널 모드 대 사용자 모드: 왜 중요한가, 알아야 할 사항 Dave's Garage](https://youtu.be/GB7JTXeGcs0?si=DU0_f2PfOBxB4RQF)
- [(241223)The Hardest Thing: Building and Running the UNIX Kernel from Original Sources Dave's Garage](https://youtu.be/IBFeM-sa2YY?si=ePQBPIfKfxRLqbmW)
- [(160116)Syscalls, Kernel vs. User Mode and Linux Kernel Source Code - bin 0x09 LiveOverflow](https://youtu.be/fLS99zJDHOc?si=Ws5roHzcde28qukl)

# Syscalls(Linux Programmer's Manual / Man)

- https://man7.org/linux/man-pages/man2/syscalls.2.html

- System calls and library wrapper functions
  - System calls are generally not invoked directly, but rather via wrapper functions in `glibc` (or perhaps some other library).  For details of direct invocation of a system call, see [intro(2)](https://man7.org/linux/man-pages/man2/intro.2.html). Often, but not always, the name of the wrapper function is the same as the name of the system call that it invokes.  For example, glibc contains a function chdir() which invokes the underlying "chdir" system call.
- 시스템 호출 및 라이브러리 래퍼 기능
  - 시스템 호출은 일반적으로 직접 호출되지 않고 glibc(또는 다른 라이브러리)의 래퍼 함수를 통해 호출됩니다. 시스템 호출의 직접 호출에 대한 자세한 내용은 인트로(2)를 참조하세요. 래퍼 함수의 이름이 호출되는 시스템 호출의 이름과 동일한 경우가 많지만 항상 그런 것은 아닙니다. 예를 들어, glibc에는 기본 "chdir" 시스템 호출을 호출하는 함수 cdir()가 포함되어 있습니다.

## System call(list겁나게 많다.)
- https://man7.org/linux/man-pages/man2/syscalls.2.html

```c
void main() {
    write(1, "HACK\n", s);
}
```
- [(160116)Syscalls, Kernel vs. User Mode and Linux Kernel Source Code - bin 0x09 LiveOverflow](https://youtu.be/fLS99zJDHOc?si=Ws5roHzcde28qukl)


# User Mode vs Kernel mode(유저 모드 vs 커널 모드) 차이점



|User Mode|Kernel Mode|
|-|-|
|User applications|Linux kernel with various <br />system calls and system call <br />interfaces.|
|Low lovel components such <br />as daemons, graphics and <br />other libraries|Process scheduling, <br />memory management, <br />virtual file system and <br />network systems|
|C standard libraries and<br /> various subroutines such as<br /> `fopen()`, `calloc()`, `exec()`||

# microsoft(설명그림 WindosOS)

- The following diagram illustrates the communication between user-mode and kernel-mode components.

<img width="512" height="426" alt="Image" src="https://github.com/user-attachments/assets/811f4c28-35bf-44be-9644-7d144511654a" />

- https://learn.microsoft.com/en-us/windows-hardware/drivers/gettingstarted/user-mode-and-kernel-mode

## User mode and kernel mode

- A processor in a computer that runs Windows operates in two different modes: user mode and kernel mode. The processor switches between these modes depending on the type of code it's executing. Applications operate in user mode. Core operating system components function in kernel mode. Although many drivers operate in kernel mode, some can function in user mode.
  - Windows를 실행하는 컴퓨터의 프로세서는 사용자 모드와 커널 모드라는 두 가지 모드로 작동합니다. 프로세서는 실행 중인 코드의 유형에 따라 이러한 모드를 전환합니다. 애플리케이션은 사용자 모드에서 작동합니다. 핵심 운영 체제 구성 요소는 커널 모드에서 작동합니다. 많은 드라이버가 커널 모드에서 작동하지만 일부 드라이버는 사용자 모드에서 작동할 수 있습니다.

### User mode

- When you launch an application in user mode, Windows creates a process for it. This process provides the application with a private virtual address space and a private handle table. Since each application's virtual address space is private, one application can't modify another application's data. Each application runs in isolation. This approach ensures that if an application crashes, it doesn't affect other applications or the operating system.

- The virtual address space of a user-mode application is also limited. A process running in user mode can't access virtual addresses that are reserved for the operating system. Limiting the virtual address space of a user-mode application prevents the application from modifying or damaging critical operating system data.
  - 사용자 모드에서 애플리케이션을 실행하면 Windows에서 해당 애플리케이션에 대한 프로세스를 생성합니다. 이 프로세스는 애플리케이션에 개인 가상 주소 공간과 개인 핸들 테이블을 제공합니다. 각 애플리케이션의 가상 주소 공간은 개인용이므로 한 애플리케이션은 다른 애플리케이션의 데이터를 수정할 수 없습니다. 각 애플리케이션은 독립적으로 실행됩니다. 이 접근 방식을 사용하면 애플리케이션이 충돌하더라도 다른 애플리케이션이나 운영 체제에 영향을 미치지 않습니다.
  - 사용자 모드 애플리케이션의 가상 주소 공간도 제한됩니다. 사용자 모드에서 실행되는 프로세스는 운영 체제에 예약된 가상 주소에 액세스할 수 없습니다. 사용자 모드 애플리케이션의 가상 주소 공간을 제한하면 애플리케이션이 중요한 운영 체제 데이터를 수정하거나 손상시키지 않습니다.

### Kernel mode

- All code that runs in kernel mode shares a single virtual address space. As a result, a kernel-mode driver isn't isolated from other drivers or the operating system. If a kernel-mode driver mistakenly writes to the wrong virtual address, it could compromise data that belongs to the operating system or another driver. If a kernel-mode driver crashes, it causes the entire operating system to crash.
  - 커널 모드에서 실행되는 모든 코드는 단일 가상 주소 공간을 공유합니다. 따라서 커널 모드 드라이버는 다른 드라이버나 운영 체제와 분리되지 않습니다. 커널 모드 드라이버가 잘못된 가상 주소에 잘못 쓰면 운영 체제나 다른 드라이버에 속하는 데이터가 손상될 수 있습니다. 커널 모드 드라이버가 충돌하면 전체 운영 체제가 충돌하게 됩니다.


# CLI 그림으로 이해(WindowsOS)

- [4분42초에 그림 나옴.](https://youtu.be/GB7JTXeGcs0?si=fq5sJ7BFhrvJlZ7h&t=282)


```bash
+--------------------------------------------------+
|                   USER MODE                      |
|--------------------------------------------------|
| System    |    | Services |          | User      |
| Processes |    |          |          | Processes |
+-----------+    +----------+          +-----------+
|    |                |                     |      |
|    |                ↓                     ↓      |
|    |          -----------------------------------|
|    |          |   Subsystem DLLs(Win32 API)      |
|    |          -----------------------------------|                                             |
|    ↓                     ↓                       |
|--------------------------------------------------|
|                  ntdll.dll
|                                                 |
| User Processes                                  |
|   explorer.exe                                  |
|   cmd.exe                                       |
|   notepad.exe                                   |
+-------------------↑------------------------------+
                    |
                    |
                    | System Call Interface
                    |
                    |
+-------------------↓------------------------------+
|                   KERNEL MODE                   |
|------------------------------------------------|
|     Executive Kernel(ntoskrnl.exe)             |
+---------------------------- +----------+--------+
|--------------------------------------------------|
| Executive    |    | Drivers |                 |
| Support      | -→ |         |                  |
+-----------+       +---------+                  |
    ↑                   | 
    ↓                   ↓
|------------------------------------------------|
|     HAL                            |
+---------------------------- +----------+--------+
                      ↑
                      ↓
|------------------------------------------------|
|     Hyper-v                            |
+---------------------------- +----------+--------+


| Active Kernel                                  |
|   ntoskrnl.exe                                 |
|                                                |
| Kernel Drivers                                 |
|   disk.sys                                     |
|   ndis.sys                                     |
|   kbdclass.sys                                 |
+------------------------------------------------+

```

# Visual CLI Flow(Real System Call)(WindowOS)


```txt
+-----------------------------+
| USER MODE                  |
|----------------------------|
| cmd.exe                    |
|   echo Hello > demo.txt   |
+-------------+-------------+
              |
              | syscall instruction
              v
+-------------+-------------+
| KERNEL MODE               |
|---------------------------|
| ntoskrnl.exe              |
|   NtCreateFile            |
|   NtWriteFile             |
|                           |
| ntfs.sys                  |
| disk.sys                  |
+-------------+-------------+
              |
              v
          Hardware (Disk)
```


# Protection ring
- https://en.wikipedia.org/wiki/Protection_ring

![Image](https://github.com/user-attachments/assets/646d3493-b72c-4d7b-bc9a-4647068c1236)
