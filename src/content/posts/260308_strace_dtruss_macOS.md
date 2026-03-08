---
title: 260308_strace_dtruss_macOS
published: 2026-03-08
description: 'macOS에서는 `strace`(LinuxOS)를 쓰지 못해서 `dtruss`(macOS)를 써야함. `dtruss`기초'
image: ''
tags: [rust, reverse, strace, dtruss]
category: 'rust_Reverse_Engineering'
draft: false 
lang: ''
---

# link

- macOS먼저 `dtruss` 쓰기 위해서 사전 작업을 해 줘야함 밑에 링크 참고
 - [(220801)HOW TO TURN ON / OFF SYSTEM INTEGRITY PROTECTION for MacOS | DIY GEEK](https://youtu.be/a51UrFcwtqc?si=Q1kS9pYv_PWkAWwj)

# strace(linuxOS) vs dtruss(macos)

## `dtruss`

```bash
$ dtruss
USAGE: dtruss [-acdefholLs] [-t syscall] { -p PID | -n name | command | -W name }

          -p PID          # examine this PID
          -n name         # examine this process name
          -t syscall      # examine this syscall only
          -W name         # wait for a process matching this name
          -a              # print all details
          -c              # print syscall counts
          -d              # print relative times (us)
          -e              # print elapsed times (us)
          -f              # follow children
          -l              # force printing pid/lwpid
          -o              # print on cpu times
          -s              # print stack backtraces
          -L              # don't print pid/lwpid
          -b bufsize      # dynamic variable buf size
   eg,
       dtruss df -h       # run and examine "df -h"
       dtruss -p 1871     # examine PID 1871
       dtruss -n tar      # examine all processes called "tar"
       dtruss -f test.sh  # run test.sh and follow children
```


# Rust Code로 연습해보기

```rs
fn main() {
    let my_string = String::from("Hello, Rust!");

    // Convert the String to a Vec<u8>
    let string_as_u8: Vec<u8> = my_string.into_bytes();

    // Print the result
    println!("{:?}", string_as_u8);
}
```

## Result(`dtruss`)

```bash
$ sudo dtruss -a ./target/release/a01_dtruss_test
	PID/THRD  RELATIVE  ELAPSD    CPU SYSCALL(args) 		 = return
 4966/0x54c8:       232:        0:       0 fork()		 = 0 0
 4966/0x54c8:       234      60      1 crossarch_trap(0x0, 0x0, 0x0)		 = -1 Err#45
 4966/0x54c8:       236       1      0 csrctl(0x0, 0x16D26EA4C, 0x4)		 = -1 Err#1
[72, 101, 108, 108, 111, 44, 32, 82, 117, 115, 116, 33]
 4966/0x54c8:       345      56      0 proc_info(0xF, 0x1366, 0x0)		 = 0 0
 4966/0x54c8:       349       1      0 thread_selfid(0x0, 0x0, 0x0)		 = 21704 0
 4966/0x54c8:       351       1      0 crossarch_trap(0x0, 0x0, 0x0)		 = -1 Err#45
 4966/0x54c8:       362       0      0 csrctl(0x0, 0x16D26E8EC, 0x4)		 = -1 Err#1
 4966/0x54c8:       362       0      0 crossarch_trap(0x0, 0x0, 0x0)		 = -1 Err#45
 4966/0x54c8:       391      14     13 fsgetpath(0x16D26EC60, 0x400, 0x16D26EB38)		 = 14 0
 4966/0x54c8:       396       5      4 shared_region_check_np(0x16D26EC50, 0x0, 0x0)		 = 0 0
 4966/0x54c8:       422       1      0 getpid(0x0, 0x0, 0x0)		 = 4966 0
 4966/0x54c8:       485       4      3 munmap(0x102E38000, 0xA0000)		 = 0 0
 4966/0x54c8:       486       2      1 munmap(0x102ED8000, 0x8000)		 = 0 0
 4966/0x54c8:       488       1      1 munmap(0x102EE0000, 0x4000)		 = 0 0
 4966/0x54c8:       489       2      1 munmap(0x102EE4000, 0x4000)		 = 0 0
 4966/0x54c8:       490       1      1 munmap(0x102EE8000, 0x24000)		 = 0 0
 4966/0x54c8:       494       3      3 munmap(0x102F0C000, 0x60000)		 = 0 0
 4966/0x54c8:       503       0      0 crossarch_trap(0x0, 0x0, 0x0)		 = -1 Err#45
 4966/0x54c8:       535      28     27 open(".\0", 0x100000, 0x0)		 = 3 0
 4966/0x54c8:       537       2      1 fcntl(0x3, 0x32, 0x16D26E1E8)		 = 0 0
 4966/0x54c8:       538       1      1 close(0x3)		 = 0 0
 4966/0x54c8:       541       2      1 fsgetpath(0x16D26E1F8, 0x400, 0x16D26E1D8)		 = 172 0
 4966/0x54c8:       543       3      2 fsgetpath(0x16D26E208, 0x400, 0x16D26E1E8)		 = 14 0
 4966/0x54c8:       546       0      0 csrctl(0x0, 0x16D26E60C, 0x4)		 = -1 Err#1
 4966/0x54c8:       552       4      3 __mac_syscall(0x186EE23DE, 0x2, 0x16D26E530)		 = 0 0
 4966/0x54c8:       552       0      0 csrctl(0x0, 0x16D26E61C, 0x4)		 = -1 Err#1
 4966/0x54c8:       555       3      1 sysctl([unknown, 3, 0, 0, 0, 0] (2), 0x16D26E598, 0x16D26E590, 0x186ED91BA, 0x20)		 = 0 0
 4966/0x54c8:       556       1      0 sysctl([unknown, 100, 101, 0, 0, 0] (3), 0x16D26E62C, 0x16D26E620, 0x0, 0x0)		 = 0 0
 4966/0x54c8:       559       2      1 __mac_syscall(0x186EDF135, 0x5A, 0x16D26E5B0)		 = 0 0
 4966/0x54c8:       567       4      4 sysctl([unknown, 3, 0, 0, 0, 0] (2), 0x16D26D7E8, 0x16D26D7E0, 0x186EE0ED2, 0xD)		 = 0 0
 4966/0x54c8:       568       1      0 sysctl([CTL_KERN, 143, 0, 0, 0, 0] (2), 0x16D26D898, 0x16D26D890, 0x0, 0x0)		 = 0 0
 4966/0x54c8:       575       5      4 open("/\0", 0x20100000, 0x0)		 = 3 0
 4966/0x54c8:       589      14     12 openat(0x3, "System/Cryptexes/OS\0", 0x100000, 0x0)		 = 4 0
 4966/0x54c8:       590       1      0 dup(0x4, 0x0, 0x0)		 = 5 0
 4966/0x54c8:       593       3      2 fstatat64(0x4, 0x16D26D371, 0x16D26D2E0)		 = 0 0
 4966/0x54c8:       598       5      5 openat(0x4, "System/Library/dyld/\0", 0x100000, 0x0)		 = 6 0
 4966/0x54c8:       599       1      0 fcntl(0x6, 0x32, 0x16D26D370)		 = 0 0
 4966/0x54c8:       600       0      0 dup(0x6, 0x0, 0x0)		 = 7 0
 4966/0x54c8:       600       0      0 dup(0x5, 0x0, 0x0)		 = 8 0
 4966/0x54c8:       601       0      0 close(0x3)		 = 0 0
 4966/0x54c8:       601       0      0 close(0x5)		 = 0 0
 4966/0x54c8:       601       0      0 close(0x4)		 = 0 0
 4966/0x54c8:       602       0      0 close(0x6)		 = 0 0
 4966/0x54c8:       603       2      1 __mac_syscall(0x186EE23DE, 0x2, 0x16D26E080)		 = 0 0
 4966/0x54c8:       604       1      0 shared_region_check_np(0x16D26E0C8, 0x0, 0x0)		 = 0 0
 4966/0x54c8:       607       2      1 fsgetpath(0x16D26E230, 0x400, 0x16D26E1B4)		 = 82 0
 4966/0x54c8:       608       1      0 fcntl(0x8, 0x32, 0x16D26E230)		 = 0 0
 4966/0x54c8:       609       0      0 close(0x8)		 = 0 0
 4966/0x54c8:       609       0      0 close(0x7)		 = 0 0
 4966/0x54c8:       633      13     12 stat64("/Users/gy-gyoung/my_project/Rust_Lang/9999/radare2_reverse-engineering_training/radare2_macOS_tutorial/dtruss_macos_training/a01_dtruss_test/target/release/a01_dtruss_test\0", 0x16D26DDB0, 0x0)		 = 0 0
 4966/0x54c8:       651      19     18 open("/Users/gy-gyoung/my_project/Rust_Lang/9999/radare2_reverse-engineering_training/radare2_macOS_tutorial/dtruss_macos_training/a01_dtruss_test/target/release/a01_dtruss_test\0", 0x0, 0x0)		 = 3 0
 4966/0x54c8:       657       6      5 mmap(0x0, 0x637B0, 0x1, 0x40002, 0x3, 0x0)		 = 0x102BF4000 0
 4966/0x54c8:       658       1      0 fcntl(0x3, 0x32, 0x16D26DED8)		 = 0 0
 4966/0x54c8:       660       1      0 munmap(0x102BF4000, 0x637B0)		 = 0 0
 4966/0x54c8:       661       0      0 close(0x3)		 = 0 0
 4966/0x54c8:       664       3      3 stat64("/Users/gy-gyoung/my_project/Rust_Lang/9999/radare2_reverse-engineering_training/radare2_macOS_tutorial/dtruss_macos_training/a01_dtruss_test/target/release/a01_dtruss_test\0", 0x16D26E320, 0x0)		 = 0 0
 4966/0x54c8:       677       2      2 stat64("/usr/lib/libSystem.B.dylib\0", 0x16D26D220, 0x0)		 = -1 Err#2
 4966/0x54c8:       683       2      2 stat64("/System/Volumes/Preboot/Cryptexes/OS/usr/lib/libSystem.B.dylib\0", 0x16D26D1D0, 0x0)		 = -1 Err#2
 4966/0x54c8:      1116       2      1 mprotect(0x102BD4000, 0x4000, 0x1)		 = 0 0
 4966/0x54c8:      1192       3      2 getfsstat64(0x0, 0x0, 0x2)		 = 10 0
 4966/0x54c8:      1199       5      4 getfsstat64(0x102C14060, 0x54B0, 0x2)		 = 10 0
 4966/0x54c8:      1205       5      4 getattrlist("/\0", 0x16D26A8E0, 0x16D26A850)		 = 0 0
 4966/0x54c8:      1311      33     32 open("/dev/dtracehelper\0", 0x2, 0x0)		 = 3 0
 4966/0x54c8:      1669     359    358 ioctl(0x3, 0x80086804, 0x16D26A7E8)		 = 0 0
 4966/0x54c8:      1672       2      2 close(0x3)		 = 0 0
 4966/0x54c8:      1678       1      0 shared_region_check_np(0xFFFFFFFFFFFFFFFF, 0x0, 0x0)		 = 0 0
 4966/0x54c8:      1696       2      1 access("/AppleInternal/XBS/.isChrooted\0", 0x0, 0x0)		 = -1 Err#2
 4966/0x54c8:      1717       3      1 bsdthread_register(0x187212BA0, 0x187212B94, 0x4000)		 = 1073746399 0
 4966/0x54c8:      1749       0      0 getpid(0x0, 0x0, 0x0)		 = 4966 0
 4966/0x54c8:      1755       3      2 shm_open(0x1870A2F29, 0x0, 0x10)		 = 3 0
 4966/0x54c8:      1756       1      0 fstat64(0x3, 0x16D26AE70, 0x0)		 = 0 0
 4966/0x54c8:      1762       6      5 mmap(0x0, 0x8000, 0x1, 0x40001, 0x3, 0x0)		 = 0x102BFC000 0
 4966/0x54c8:      1766       0      0 close(0x3)		 = 0 0
 4966/0x54c8:      1770       2      1 csops(0x1366, 0x0, 0x16D26AFCC)		 = 0 0
 4966/0x54c8:      1785       2      2 ioctl(0x2, 0x4004667A, 0x16D26AF3C)		 = 0 0
 4966/0x54c8:      1803      12     11 getentropy(0x16D26ADD8, 0x20, 0x0)		 = 0 0
 4966/0x54c8:      1822       1      0 mprotect(0x1033E4000, 0x4000, 0x0)		 = 0 0
 4966/0x54c8:      1822       1      0 mprotect(0x1037E8000, 0x4000, 0x0)		 = 0 0
 4966/0x54c8:      1856       1      0 mprotect(0x103140000, 0x4000, 0x1)		 = 0 0
 4966/0x54c8:      1877       1      0 issetugid(0x0, 0x0, 0x0)		 = 0 0
 4966/0x54c8:      1984       6      5 getattrlist("/Users/gy-gyoung/my_project/Rust_Lang/9999/radare2_reverse-engineering_training/radare2_macOS_tutorial/dtruss_macos_training/a01_dtruss_test/target/release/a01_dtruss_test\0", 0x16D26AE40, 0x16D26AE5C)		 = 0 0
 4966/0x54c8:      1997      12     11 access("/Users/gy-gyoung/my_project/Rust_Lang/9999/radare2_reverse-engineering_training/radare2_macOS_tutorial/dtruss_macos_training/a01_dtruss_test/target/release\0", 0x4, 0x0)		 = 0 0
 4966/0x54c8:      2008      11     10 open("/Users/gy-gyoung/my_project/Rust_Lang/9999/radare2_reverse-engineering_training/radare2_macOS_tutorial/dtruss_macos_training/a01_dtruss_test/target/release\0", 0x0, 0x0)		 = 3 0
 4966/0x54c8:      2009       1      0 fstat64(0x3, 0x1033F9F90, 0x0)		 = 0 0
 4966/0x54c8:      2010       0      0 csrctl(0x0, 0x16D26B00C, 0x4)		 = 0 0
 4966/0x54c8:      2011       1      0 fcntl(0x3, 0x32, 0x16D26AD28)		 = 0 0
 4966/0x54c8:      2012       0      0 close(0x3)		 = 0 0
 4966/0x54c8:      2017       2      1 open("/Users/gy-gyoung/my_project/Rust_Lang/9999/radare2_reverse-engineering_training/radare2_macOS_tutorial/dtruss_macos_training/a01_dtruss_test/target/release/Info.plist\0", 0x0, 0x0)		 = -1 Err#2
 4966/0x54c8:      2029       1      0 proc_info(0x2, 0x1366, 0xD)		 = 64 0
 4966/0x54c8:      2038       2      1 csops_audittoken(0x1366, 0x10, 0x16D26B070)		 = 0 0
 4966/0x54c8:      2050       5      4 sysctl([unknown, 3, 0, 0, 0, 0] (2), 0x16D26B428, 0x16D26B420, 0x18B1D90E7, 0x15)		 = 0 0
 4966/0x54c8:      2051       1      0 sysctl([CTL_KERN, 141, 0, 0, 0, 0] (2), 0x16D26B4B8, 0x16D26B4B0, 0x0, 0x0)		 = 0 0
 4966/0x54c8:      2193       1      0 fcntl(0x0, 0x1, 0xFFFFFFFFF34D92C8)		 = 0 0
 4966/0x54c8:      2193       0      0 fcntl(0x1, 0x1, 0xFFFFFFFFF34D92C8)		 = 0 0
 4966/0x54c8:      2193       0      0 fcntl(0x2, 0x1, 0xFFFFFFFFF34D92C8)		 = 0 0
 4966/0x54c8:      2197       1      0 sigaction(0xD, 0x16D26E968, 0x16D26E990)		 = 0 0
 4966/0x54c8:      2199       2      1 sysctl([CTL_HW, 7, 0, 0, 0, 0] (2), 0x1F34E3AC0, 0x16D26E908, 0x0, 0x0)		 = 0 0
 4966/0x54c8:      2203       1      0 getrlimit(0x1003, 0x16D26E980, 0x0)		 = 0 0
 4966/0x54c8:      2208       3      2 mmap(0x16CA74000, 0x4000, 0x3, 0x41012, 0xFFFFFFFFFFFFFFFF, 0x0)		 = 0x16CA74000 0
 4966/0x54c8:      2209       1      0 mprotect(0x16CA74000, 0x4000, 0x0)		 = 0 0
 4966/0x54c8:      2209       0      0 sigaction(0xB, 0x0, 0x16D26E9D0)		 = 0 0
 4966/0x54c8:      2210       1      0 sigaltstack(0x0, 0x16D26E960, 0x0)		 = 0 0
 4966/0x54c8:      2211       1      0 mmap(0x0, 0x24000, 0x3, 0x41002, 0xFFFFFFFFFFFFFFFF, 0x0)		 = 0x102C04000 0
 4966/0x54c8:      2211       1      0 mprotect(0x102C04000, 0x4000, 0x0)		 = 0 0
 4966/0x54c8:      2211       0      0 sigaltstack(0x16D26E960, 0x0, 0x0)		 = 0 0
 4966/0x54c8:      2213       0      0 sigaction(0xB, 0x16D26E998, 0x0)		 = 0 0
 4966/0x54c8:      2214       0      0 sigaction(0xA, 0x0, 0x16D26E9D0)		 = 0 0
 4966/0x54c8:      2214       0      0 sigaction(0xA, 0x16D26E998, 0x0)		 = 0 0
 4966/0x54c8:      2215       1      0 proc_info(0x5, 0x1366, 0x2)		 = 0 0
 4966/0x54c8:      2230       8      7 write(0x1, "[72, 101, 108, 108, 111, 44, 32, 82, 117, 115, 116, 33]\n\0", 0x38)		 = 56 0
 4966/0x54c8:      2232       0      0 sigaltstack(0x16D26E878, 0x0, 0x0)		 = 0 0
 4966/0x54c8:      2233       1      0 munmap(0x102C04000, 0x24000)		 = 0 0

CALL                                        COUNT
bsdthread_register                              1
csops                                           1
csops_audittoken                                1
exit                                            1
fstatat64                                       1
getentropy                                      1
getrlimit                                       1
issetugid                                       1
shm_open                                        1
thread_selfid                                   1
write                                           1
access                                          2
fstat64                                         2
getattrlist                                     2
getfsstat64                                     2
getpid                                          2
ioctl                                           2
openat                                          2
__mac_syscall                                   3
dup                                             3
proc_info                                       3
shared_region_check_np                          3
sigaltstack                                     3
crossarch_trap                                  4
fsgetpath                                       4
mmap                                            4
stat64                                          4
csrctl                                          5
sigaction                                       5
mprotect                                        6
open                                            6
sysctl                                          7
fcntl                                           8
munmap                                          8
close                                          11
```


