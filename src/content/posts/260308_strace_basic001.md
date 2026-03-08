---
title: 260308_strace_basic001
published: 2026-03-08
description: 'strace(LinuxOS) 001- `strace`는 사용자 공간 애플리케이션과 리눅스 커널 간의 상호작용을 진단, 디버깅 및 지시적으로 모니터링하는 데 사용되는 강력한 리눅스 명령줄 유틸리티입니다. (system call)시스템 호출, 신호 및 프로세스 상태 변경을 추적하여 소스 코드 없이 프로그램 충돌, 중단 또는 실패 문제를 해결하는 데 매우 유용합니다.'
image: ''
tags: [rust, strace, reverse]
category: 'rust_Reverse_Engineering'
draft: false 
lang: ''
---

# link

# `strace` 기초(man이 최고)
- https://man7.org/linux/man-pages/man1/strace.1.html

# example Command:

```bash
strace -f -o output.txt ./my_program
```

# DESCRIPTION

- In its simplest use case, strace runs the specified command until it exits.  It intercepts and records the system calls made by a process and the signals a process receives.  The name of each system call, its arguments, and its return value are printed to standard error or to the file specified with the -o option.
- strace is a useful diagnostic, instructional, and debugging tool. System administrators, diagnosticians, and troubleshooters will find it invaluable for solving problems with programs for which source code is not readily available, as recompilation is not required for tracing.  Students, hackers, and the overly-curious will discover that a great deal can be learned about a system and its system calls by tracing even ordinary programs.  Programmers will find that since system calls and signals occur at the user/kernel interface, a close examination of this boundary is very useful for bug isolation, sanity checking, and attempting to capture race conditions.
- Each line in the trace contains the system call name, followed by its arguments in parentheses and its return value.  An example from tracing the command "cat /dev/null" is:

```c
open("/dev/null", O_RDONLY) = 3
```

- Errors, typically indicated by a return value of -1, have the errno symbol and error string appended.

- 가장 간단한 사용 사례에서 strace는 지정된 명령이 종료될 때까지 실행합니다. strace는 프로세스가 수행한 시스템 호출과 프로세스가 수신하는 신호를 가로채고 기록합니다. 각 시스템 호출의 이름, 인수, 반환 값은 표준 오류 또는 -o 옵션으로 지정된 파일에 인쇄됩니다.
- strace는 유용한 진단, 교육 및 디버깅 도구입니다. 시스템 관리자, 진단가, 그리고 문제 해결사들은 소스 코드를 쉽게 사용할 수 없는 프로그램 문제를 해결하는 데 매우 유용할 것입니다. 왜냐하면 추적을 위해 재컴파일이 필요하지 않기 때문입니다. 학생들, 해커들, 그리고 지나치게 호기심 많은 사람들은 일반적인 프로그램도 추적함으로써 시스템과 시스템 호출에 대해 많은 것을 배울 수 있다는 것을 알게 될 것입니다. 프로그래머들은 시스템 호출과 신호가 사용자/커널 인터페이스에서 발생하기 때문에, 이 경계를 면밀히 검토하는 것이 버그 격리, 위생 점검, 그리고 인종 조건을 포착하려는 시도에 매우 유용하다는 것을 알게 될 것입니다.
- 추적의 각 줄에는 시스템 호출 이름과 괄호 안의 인수, 반환 값이 포함되어 있습니다. "cat /dev/null" 명령어를 추적하는 예는 다음과 같습니다:

```c
open("/dev/null", O_RDONLY) = 3
```

- 오류는 일반적으로 -1의 반환 값으로 표시되며, 오류 기호와 오류 문자열이 추가됩니다.

# `strace` 예시

- [strace예시 다른 글에 정리함.](../260308_reverse_enginerring_radare2/)

# `strace` Gemini설명

- `strace` is a powerful Linux command-line utility used to diagnose, debug, and instructively monitor interactions between user-space applications and the Linux kernel. It tracks system calls, signals, and process state changes, making it invaluable for troubleshooting crashing, hanging, or failing programs without requiring source code.
- `strace`는 사용자 공간 애플리케이션과 리눅스 커널 간의 상호작용을 진단, 디버깅 및 지시적으로 모니터링하는 데 사용되는 강력한 리눅스 명령줄 유틸리티입니다. 시스템 호출, 신호 및 프로세스 상태 변경을 추적하여 소스 코드 없이 프로그램 충돌, 중단 또는 실패 문제를 해결하는 데 매우 유용합니다. 주요 용도 및 기능:
  - Key Uses and Functionalities:
    - **System Call Tracing**: Records all system calls (`openat`, `read`, `write`, `close`, etc.) made by a process.
    - **Troubleshooting**: Identifies missing files, permission issues, and network problems by observing how a program interacts with the OS.
    - **Debugging**: Helps analyze application crashes by showing the exact system call leading to failure.
    - **Process Monitoring**: Attaches to running processes (`-p <pid>`) or runs new commands to monitor their behavior. 

## Commonly Used strace Options:

- `strace <command>`: Runs the command and traces its system calls.
- `-f`: Traces child processes created by `fork()` in addition to the main process.
- `-o <file>`: Saves the trace output to a file instead of printing it to `stderr`.
- `-p <pid>`: Attaches to an already running process with the specified process ID.
- `-s <size>`: Specifies the maximum string size to print (default is 32).
- `-e <expr>`: Filters the trace to specific events or system calls (e.g., `-e trace=open` to only trace file openings). 
