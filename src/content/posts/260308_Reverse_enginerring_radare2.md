---
title: 260308_Reverse_enginerring_radare2
published: 2026-03-08
description: '`strace` & `radare2`(사용법) UNIX-like reverse engineering framework and command-line toolset '
image: ''
tags: [rust, reverse, radare2, strace, c]
category: 'rust_Reverse_Engineering'
draft: false 
lang: ''
---

# link

- [radare2 리버스 엔지니어링 정리중](https://github.com/YoungHaKim7/radare2_reverse-engineering_training)

- [radare2_github_UNIX-like reverse engineering framework and command-line toolset](https://github.com/radareorg/radare2)

- youtube로 알게 됨.
  - [(160116)Syscalls, Kernel vs. User Mode and Linux Kernel Source Code - bin 0x09 | LiveOverflo](https://youtu.be/fLS99zJDHOc?si=Sc3b3GhXZkePLx9Y)

# radare2 Install(LinuxOS)

```bash
git clone https://github.com/radareorg/radare2
cd sys
./install.sh
```

## sample C code

```c
#include <unistd.h>

int main(void) { 
    write(1, "HACK\n", 5); 
}
```

# `write`
- https://man7.org/linux/man-pages/man2/write.2.html
```c
 #include <unistd.h>

 ssize_t write(size_t count;
               int fd, const void buf[count], size_t count);
```

# `strace`

```bash
 strace ./target/a01_write_gdb
execve("./target/a01_write_gdb", ["./target/a01_write_gdb"], 0x7ffeafc8ff10 /* 69 vars */) = 0
brk(NULL)                               = 0x17390000
mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f3bf5650000
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
fstat(3, {st_mode=S_IFREG|0644, st_size=104703, ...}) = 0
mmap(NULL, 104703, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f3bf5636000
close(3)                                = 0
openat(AT_FDCWD, "/lib64/libm.so.6", O_RDONLY|O_CLOEXEC) = 3
read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\0\0\0\0\0\0\0\0"..., 832) = 832
fstat(3, {st_mode=S_IFREG|0755, st_size=1117776, ...}) = 0
mmap(NULL, 1027168, PROT_READ, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7f3bf553b000
mmap(0x7f3bf554c000, 552960, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x11000) = 0x7f3bf554c000
mmap(0x7f3bf55d3000, 393216, PROT_READ, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x98000) = 0x7f3bf55d3000
mmap(0x7f3bf5633000, 12288, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0xf7000) = 0x7f3bf5633000
close(3)                                = 0
openat(AT_FDCWD, "/lib64/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0\16\265\2\0\0\0\0\0"..., 832) = 832
pread64(3, "\6\0\0\0\4\0\0\0@\0\0\0\0\0\0\0@\0\0\0\0\0\0\0@\0\0\0\0\0\0\0"..., 840, 64) = 840
fstat(3, {st_mode=S_IFREG|0755, st_size=2424320, ...}) = 0
pread64(3, "\6\0\0\0\4\0\0\0@\0\0\0\0\0\0\0@\0\0\0\0\0\0\0@\0\0\0\0\0\0\0"..., 840, 64) = 840
mmap(NULL, 2127216, PROT_READ, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7f3bf5200000
mmap(0x7f3bf5228000, 1540096, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x28000) = 0x7f3bf5228000
mmap(0x7f3bf53a0000, 339968, PROT_READ, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1a0000) = 0x7f3bf53a0000
mmap(0x7f3bf53f3000, 53248, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1f2000) = 0x7f3bf53f3000
mmap(0x7f3bf5400000, 30064, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7f3bf5400000
close(3)                                = 0
mmap(NULL, 8192, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f3bf5539000
arch_prctl(ARCH_SET_FS, 0x7f3bf553a0c0) = 0
set_tid_address(0x7f3bf553a390)         = 9969
set_robust_list(0x7f3bf553a3a0, 24)     = 0
rseq(0x7f3bf553a000, 0x20, 0, 0x53053053) = 0
mprotect(0x7f3bf53f3000, 16384, PROT_READ) = 0
mprotect(0x7f3bf5633000, 4096, PROT_READ) = 0
mprotect(0x403000, 4096, PROT_READ)     = 0
mprotect(0x7f3bf5691000, 8192, PROT_READ) = 0
prlimit64(0, RLIMIT_STACK, NULL, {rlim_cur=8192*1024, rlim_max=RLIM64_INFINITY}) = 0
getrandom("\x8f\x1f\x3f\x73\x8a\xe5\x0f\x20", 8, GRND_NONBLOCK) = 8
munmap(0x7f3bf5636000, 104703)          = 0
write(1, "HACK\n", 5HACK
)                   = 5
exit_group(0)                           = ?
+++ exited with 0 +++
```

# `raare2 -d ./write_test`


```bash
$ radare2 -d ./target/a01_write_gdb
 -- 99 bugs, take one down pass it around. 100 bugs...

[0x7f9e777e9440]> aaa
INFO: Analyze all flags starting with sym. and entry0 (aa)
INFO: Analyze imports (af@@@i)
INFO: Analyze entrypoint (af@ entry0)
INFO: Analyze symbols (af@@@s)
INFO: Analyze all functions arguments/locals (afva@@F)
INFO: Analyze function calls (aac)
INFO: Analyze len bytes of instructions for references (aar)
INFO: Finding and parsing C++ vtables (avrr)
INFO: Analyzing methods (af @@ method.*)
INFO: Recovering local variables (afva@@@F)
INFO: Skipping type matching analysis in debugger mode (aaft)
INFO: Propagate noreturn information (aanr)
INFO: Integrate dwarf function information
INFO: Use -AA or aaaa to perform additional experimental analysis

[0x7f982119c440]> s sym.main
[0x00401136]> pdf
            ;-- main:
            ; DATA XREF from dbg._start @ 0x401058(r)
┌ 31: int dbg.main (int argc, char **argv, char **envp);
│           0x00401136      55             push rbp                    ; main.c:3:16int main(void) { write(1, "HACK\n", 5); } ; int main();
│           0x00401137      4889e5         mov rbp, rsp
│           0x0040113a      ba05000000     mov edx, 5                  ; main.c:3:18int main(void) { write(1, "HACK\n", 5); }
│           0x0040113f      be04204000     mov esi, str.HACK_n         ; 0x402004 ; "HACK\n"
│           0x00401144      bf01000000     mov edi, 1
│           0x00401149      e8e2feffff     call sym.imp.write          ; ssize_t write(int fd, const char *ptr, size_t nbytes)
│           0x0040114e      b800000000     mov eax, 0
│           0x00401153      5d             pop rbp                     ; main.c:3:41int main(void) { write(1, "HACK\n", 5); }
└           0x00401154      c3             ret
[0x00401136]> db 0x00401149
[0x00401136]> dc
INFO: hit breakpoint at: 0x401149
[0x00401136]> V!


# vim key랑 동일 
j  fn 별로 내려가면서 볼수 있다. 내려가기
k

[0x00401136]> exit
Do you want to quit? (Y/n) y
Do you want to kill the process? (Y/n) y
```

