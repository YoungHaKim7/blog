---
title: C23_leak_macOS_system_libraries_during_initialization
published: 2026-03-23
description: 'Summary: Your code has **no memory leaks**. You_re correctly calling `free(s)` after `strdup()`. The 120 bytes reported are from macOS system libraries during initialization, which are suppressed with the `.lsan.supp` file. The real issue in your output is the typo: \"Hello, Worl\" - this is because line 8 (`s[n - 1] = 0;`) removes the last character \"d\" since there\"s no newline in the original string.'
image: ''
tags: [c, macOS, leak, fsanitize, debugging]
category: 'z_c'
draft: false 
lang: ''
---

# link

- [sample code](https://github.com/YoungHaKim7/glibc_The_GNU_C_Library_Training/tree/main/001_study_glibc/training_c/01_String_Tsoding/a05_dont_forget_free)

# macOS leak 조심하자.  무시해도 되는거구만.

- **Summary:** Your code has **no memory leaks**. You're correctly calling `free(s)` after `strdup()`. The 120 bytes reported are from macOS system libraries during initialization, which are suppressed with the `.lsan.supp` file.

- The real issue in your output is the typo: "Hello, Worl" - this is because line 8 (`s[n - 1] = 0;`) removes the last character 'd' since there's no newline in the original string.

# C code

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char *s = strdup("Hello, World");
    int n = strlen(s);
    s[n - 1] = 0;

    printf("%s\n", s);
    printf("sizeof(*s) = %zu\n", sizeof(*s));

    free(s);

    return 0;
}
```

- `.lsan.supp` 추가해주면 무시해준다

```bash
❯ eza -la
.rw-r--r--  251 gy-gyoung 23 Mar 22:21 .clang-format
.rw-r--r--  507 gy-gyoung 23 Mar 22:21 .gitignore
.rw-r--r--  100 gy-gyoung 23 Mar 22:23 .lsan.supp
```

- `.lsan.supp`

```txt
# Suppress macOS system library leaks
leak:libobjc.A.dylib
leak:libxpc.dylib
leak:libSystem.B.dylib
```

## Result

```bash
$ LSAN_OPTIONS=suppressions=../.lsan.supp
rm -rf target
mkdir -p target
/opt/homebrew/opt/llvm/bin/clang -g -fsanitize=leak -fno-omit-frame-pointer -c ./src/main.c
/opt/homebrew/opt/llvm/bin/clang -g -fsanitize=leak *.o
mv a.out *.o ./target
./target/a.out

Hello, Worl
sizeof(*s) = 1
-----------------------------------------------------
Suppressions used:
  count      bytes template
      3        120 libobjc.A.dylib
-----------------------------------------------------
```
