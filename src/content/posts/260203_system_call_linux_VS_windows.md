---
title: 260203_system_call_linux_VS_windows
published: 2026-02-03
description: 'System Call시스템 콜은 유저 프로그램이 커널 모드에서만 가능한 기능을 안전하게 사용할 수 있도록 도와주는 인터페이스이다.'
image: ''
tags: [rust, kernel]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link
- [11분 3초에 나옴) How a Single Bit Inside Your Processor Shields Your Operating System's Integrity | Core Dumped](https://youtu.be/H4SDPLiUnv4?si=GcMvP8HT4PHSIkIS&t=663)
  - [Kernel mode vs User Mode설명 간단히)Why Applications Are Operating-System Specific | Core Dumped](https://youtu.be/eP_P4KOjwhs?si=xJPZJfTiCfkjiJ-3)


# Summary

- System calls
fundamentally connect user-space programs to the operating system kernel in both Linux and Windows, allowing programs to request privileged services like file access or process creation. However, their implementation and public exposure differ significantly between the two systems.
- 기본적으로 사용자 공간 프로그램을 리눅스와 윈도우의 운영 체제 커널에 연결하여 프로그램이 파일 접근이나 프로세스 생성과 같은 권한 있는 서비스를 요청할 수 있도록 합니다. 그러나 두 시스템 간에 구현 방식과 공개 노출은 크게 다릅니다.
  - System Call시스템 콜은 유저 프로그램이 커널 모드에서만 가능한 기능을 안전하게 사용할 수 있도록 도와주는 인터페이스이다.
    - 나무wiki설명
      - https://namu.wiki/w/%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EC%BD%9C

# Wiki한글(시스템 호출System Call)
- https://ko.wikipedia.org/wiki/%EC%8B%9C%EC%8A%A4%ED%85%9C_%ED%98%B8%EC%B6%9C
- 영문 https://en.wikipedia.org/wiki/System_call

- 시스템 호출이란 프로그래밍 언어에서 지원하지 않는 기능에 대하여 운영 체제의 루틴을 호출하여 이용하는 것을 말한다. 시스템 호출의 세 가지 기능은 다음과 같다.

  - 사용자 모드에 있는 응용 프로그램이 커널의 기능을 사용할 수 있도록 한다.
  - 시스템 호출을 하면 사용자 모드에서 커널 모드로 바뀐다.
  - 커널에서 시스템 호출을 처리하면 커널 모드에서 사용자 모드로 돌아가 작업을 계속한다.

- 시스템 호출의 유형
  - 프로세스 제어(process control)
  - 파일 조작(file manipulation)
  - 장치 관리(device management)
  - 정보 유지(information maintenance)
  - 통신(communication)

<img width="960" height="720" alt="Image" src="https://github.com/user-attachments/assets/034359d7-5566-44a6-af51-39bc47ea7e80" />

- https://en.wikipedia.org/wiki/System_call#/media/File:Linux_kernel_interfaces.svg

# Key Differences Summary

|Feature|Linux|Windows|
|-|-|-|
|Primary<br />Interface|Direct system calls via `libc`|Windows API (Win32, etc.) in DLLs|
|System Call<br />Names|Well-documented and stable (e.g., `read`, `write`, `open`)|Undocumented, private, and unstable (e.g., `NtCreateFile`, `ZwAllocateVirtualMemory`)|
|Stability|System call numbers are relatively stable|System call numbers change between OS versions/builds|
|Invocation|Direct use of assembly instructions (`syscall`, `int 0x80`) by standard libraries|Indirect via library calls which then execute the low-level syscall instruction|

# OS-API(Examples of windows and Unix system calls)

- The following illustrates various equivalent `system calls` for Windows and UNIX operating systems.

||Windows|Unix,<br />Linux and MacOS|
|-|-|-|
|Process<br />control|`CreateProcess()`<br />`ExitProcess()`<br />`WaitForSingleObject()`|`fork()`<br />`exit()`<br />`wait()`|
|File<br />management|`CreateFile()`<br />`ReadFile()`<br />`WriteFile()`<br />`CloseHandle()`|`open()`<br />`read()`<br />`write()`<br />`close()`|
|Device<br />management|`SetConsoleMode()`<br />`ReadConsole()`<br />`WriteConsole()`|`ioctl()`<br />`read()`<br />`write()`|
|Information<br />maintenance|`GetCurrentProcessID()`<br />`SetTimer()`<br />`Sleep()`|`getpid()`<br />`alarm()`<br />`slepp()`|
|Communications|`CreatePipe()`<br />`CreateFileMapping()`<br />`MapViewOfFile()`|`pipe()`<br />`shm_open()`<br />`mmap()`|
|Protection|`SetFileSecurity()`<br />`InitlializeSecurityDescriptor()`<br />`SetSecurityDescriptorGroup()`|`chmod()`<br />`umask()`<br />`chown()`|

- Source : Silberschatz, A., Galvin, P. B., & Gagne, G. (2018). **Operating system concepts**. Willey
  - [System libraries in Linux vs. Windows](https://stackoverflow.com/questions/61467166/system-libraries-in-linux-vs-windows)

<hr />

# System Call List for Windows, Mac, and Linux 
- https://gist.github.com/lancejpollard/9ee20de29a2e8672ebcea2590ee44d4f

- Darwin(Kernel)
  - https://github.com/apple/darwin-xnu/blob/main/bsd/kern/syscalls.master

<hr />

# Linux System Calls

- **Direct Interface**: Linux provides a consistent, well-documented, and stable set of system calls across different distributions and versions. Developers can use the C standard library (`libc`) to make these calls, which translates functions like `open()`, `read()`, and `write()` into the appropriate underlying system calls.
- **Invocation**: System calls are typically invoked using an assembly instruction like `syscall` (on x86-64 systems) or a software interrupt, which switches the CPU from user mode to a more privileged kernel mode.
- **Stability**: The system call numbers (SSNs) are relatively stable, allowing applications to rely on a consistent interface.
- **Examples**: Common Linux system calls include `fork()` and `exec()` for process creation, and `exit()` for termination.
- **Tools**: Tools like `strace` allow users to monitor the sequence of system calls made by a program for debugging and analysis.

# Windows System Calls

- **Indirect Interface**: Windows abstracts its low-level system calls behind a higher-level set of functions known as the Windows API (Win32 API). These APIs reside in Dynamic Link Libraries (DLLs) like `kernel32.dll` and `ntdll.dll`.
- **API Wrappers**: User-space programs call these documented API functions as normal library functions. The DLLs, in turn, contain the actual, private system call stubs (prefixed with `Nt` or `Zw`, e.g., `NtCreateFile`) that handle the user-to-kernel mode transition.
- **Instability**: The underlying system call numbers are not stable and can change between different Windows builds and versions. This instability is why direct system calls are discouraged for general developers, as it would break application compatibility with future OS updates.
- **Compatibility**: This API-based approach allows Microsoft to maintain long-term compatibility for applications, as they only need to ensure the high-level API remains consistent, while the underlying kernel implementation can change.



<hr />


# 같은 보면 좋은글

- [Windows에서 GUI프로그램을 Windows커널과 연결해서 작동원리 알아보기](../260204_Impl_GUI_in_Windows_Kernel)
