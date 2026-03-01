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

# User Mode vs Kernel mode(유저 모드 vs 커널 모드) 차이점



|User Mode|Kernel Mode|
|-|-|
|User applications|Linux kernel with various <br />system calls and system call <br />interfaces.|
|Low lovel components such <br />as daemons, graphics and <br />other libraries|Process scheduling, <br />memory management, <br />virtual file system and <br />network systems|
|C standard libraries and<br /> various subroutines such as<br /> `fopen()`, `calloc()`, `exec()`||


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
