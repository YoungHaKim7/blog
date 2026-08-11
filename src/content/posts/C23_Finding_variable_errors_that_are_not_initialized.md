---
title: C23_Finding_variable_errors_that_are_not_initialized
published: 2026-08-11
description: 'clang&gcc로 초기화되지 않는 변수 에러 찾기 & Finding variable errors that are not initialized with clang & gcc'
image: ''
tags: [c, c23, clang, gcc, cmake]
category: 'z_c'
draft: false 
lang: ''
---

# link

- [(외부링크) 예시코드 C23 - 초기화 되지 않는 변수 찾기](https://github.com/YoungHaKim7/c23_pthread_cmake_just_sample/tree/main/05_sample_c23_code/a02_uninitialized_error_check)

- [c23 code 지금blog 내용으로 이동](#c23-test-code)

- [gcc & clang으로 확인하기](#gcc-or-clang)

- [Cmake file로 확인](#cmake를-활용한-build-활용법)


<hr />

# test version check[|🔝|](#link)

```bash
# Linux OS
OS: openSUSE Tumbleweed x86_64
# test 커널 버젼
Kernel: Linux 7.1.6-1-default

# clang 버젼
$ clang --version
clang version 22.1.8
Target: x86_64-suse-linux
Thread model: posix
InstalledDir: /usr/bin

# gcc 버젼
$ gcc --version
gcc (SUSE Linux) 16.1.1 20260731
Copyright (C) 2026 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

# `gcc` or `clang`

- `clang`

```bash
# 이거 에러를 못잡네
 /usr/bin/clang -std=c23 -Wall -Wextra -pedantic -Werror -O1 -ggdb -o ./target/a02_uninitialized_error_check src/main.c

# 이게 최고네
$ /usr/bin/clang --analyze -std=c23 -Xanalyzer -analyzer-output=text src/main.c

src/main.c:24:5: warning: 2nd function call argument is an uninitialized
      value [core.CallAndMessage]
   24 |     printf("the temp is %u\n", tmp);
      |     ^                          ~~~
src/main.c:8:5: note: 'tmp' declared without an initial value
    8 |     unsigned tmp;
      |     ^~~~~~~~~~~~
src/main.c:12:5: note: 'Default' branch taken. Execution continues on line
      24
   12 |     switch ((unsigned)argc) {
      |     ^
src/main.c:24:5: note: 2nd function call argument is an uninitialized value
   24 |     printf("the temp is %u\n", tmp);
      |     ^                          ~~~
1 warning generated.
```

- `gcc`

```bash
# gcc 는 버젼 16이상 되야하는듯
❯ gcc -std=c23 -Wmaybe-uninitialized -Wall -Wextra -pedantic -Werror -O1 -ggdb -o ./target/a02_uninitialized_error_check src/main.c
src/main.c: In function ‘main’:
src/main.c:24:5: error: ‘tmp’ may be used uninitialized [-Werror=maybe-uninitialized]
   24 |     printf("the temp is %u\n", tmp);
      |     ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
src/main.c:8:14: note: ‘tmp’ was declared here
    8 |     unsigned tmp;
      |              ^~~
cc1: all warnings being treated as errors
```


# Cmake를 활용한 Build 활용법[|🔝|](#link)

This example is **deliberately broken**: it demonstrates a `switch` that
fails to assign a value on every path, so the compiler rejects it.


## 기본 컴파일러가 `gcc`로 되어 있는 상태

```bash
$  cmake -S . -B target && cmake --build target
-- The C compiler identification is GNU 16.1.1
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Configuring done (0.2s)
-- Generating done (0.0s)
-- Build files have been written to: ./a03_uninitialized_error_part2/target
[ 50%] Building C object CMakeFiles/a03_uninitialized_error_part2.dir/src/main.c.o
./a03_uninitialized_error_part2/src/main.c: In function ‘main’:
./a03_uninitialized_error_part2/src/main.c:25:32: error: ‘tmp’ undeclared (first use in this function)
   25 |     printf("the temp is %u\n", tmp);
      |                                ^~~
./a03_uninitialized_error_part2/src/main.c:25:32: note: each undeclared identifier is reported only once for each function it appears in
./a03_uninitialized_error_part2/src/main.c:4:26: warning: unused parameter ‘argv’ [-Wunused-parameter]
    4 | int main(int argc, char *argv[argc + 1]) {
      |                    ~~~~~~^~~~~~~~~~~~~~
./a03_uninitialized_error_part2/src/main.c:13:18: warning: statement will never be executed [-Wswitch-unreachable]
   13 |         unsigned tmp = 45;
      |                  ^~~
gmake[2]: *** [CMakeFiles/a03_uninitialized_error_part2.dir/build.make:79: CMakeFiles/a03_uninitialized_error_part2.dir/src/main.c.o] Error 1
gmake[1]: *** [CMakeFiles/Makefile2:87: CMakeFiles/a03_uninitialized_error_part2.dir/all] Error 2
gmake: *** [Makefile:91: all] Error 2
```

## `clang` 으로 강제 세팅

```bash
$ cmake -S . -B target -D CMAKE_BUILD_TYPE=Debug -D CMAKE_C_COMPILER=/usr/bin/clang && cmake --build target

-- The C compiler identification is Clang 22.1.8
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/clang - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Configuring done (0.2s)
-- Generating done (0.0s)
-- Build files have been written to: ./a03_uninitialized_error_part2/target
[ 50%] Building C object CMakeFiles/a03_uninitialized_error_part2.dir/src/main.c.o
clang: warning: -lm: 'linker' input unused [-Wunused-command-line-argument]
warning: unknown warning option '-Werror=maybe-uninitialized'; did you mean '-Werror=uninitialized'? [-Wunknown-warning-option]
./a03_uninitialized_error_part2/src/main.c:25:32: error:
      use of undeclared identifier 'tmp'
   25 |     printf("the temp is %u\n", tmp);
      |                                ^~~
./a03_uninitialized_error_part2/src/main.c:4:26: warning:
      unused parameter 'argv' [-Wunused-parameter]
    4 | int main(int argc, char *argv[argc + 1]) {
      |                          ^
2 warnings and 1 error generated.
gmake[2]: *** [CMakeFiles/a03_uninitialized_error_part2.dir/build.make:79: CMakeFiles/a03_uninitialized_error_part2.dir/src/main.c.o] Error 1
gmake[1]: *** [CMakeFiles/Makefile2:87: CMakeFiles/a03_uninitialized_error_part2.dir/all] Error 2
gmake: *** [Makefile:91: all] Error 2
```

### fishshell에서 multi line으로 입력해서 눈에 보기 좋게 입력(`clang` 으로 컴파일러 강제 세팅)

```bash
$ cmake -S . \
        -B target \
        -D CMAKE_BUILD_TYPE=Debug \
        -D CMAKE_C_COMPILER=/usr/bin/clang \
        && cmake --build target
-- The C compiler identification is Clang 22.1.8
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/clang - skipped
-- Detecting C compile features
-- Detecting C compile features - done
-- Configuring done (0.2s)
-- Generating done (0.0s)
-- Build files have been written to: ./a03_uninitialized_error_part2/target
[ 50%] Building C object CMakeFiles/a03_uninitialized_error_part2.dir/src/main.c.o
clang: warning: -lm: 'linker' input unused [-Wunused-command-line-argument]
warning: unknown warning option '-Werror=maybe-uninitialized'; did you mean '-Werror=uninitialized'? [-Wunknown-warning-option]
./a03_uninitialized_error_part2/src/main.c:25:32: error:
      use of undeclared identifier 'tmp'
   25 |     printf("the temp is %u\n", tmp);
      |                                ^~~
./a03_uninitialized_error_part2/src/main.c:4:26: warning:
      unused parameter 'argv' [-Wunused-parameter]
    4 | int main(int argc, char *argv[argc + 1]) {
      |                          ^
2 warnings and 1 error generated.
gmake[2]: *** [CMakeFiles/a03_uninitialized_error_part2.dir/build.make:79: CMakeFiles/a03_uninitialized_error_part2.dir/src/main.c.o] Error 1
gmake[1]: *** [CMakeFiles/Makefile2:87: CMakeFiles/a03_uninitialized_error_part2.dir/all] Error 2
gmake: *** [Makefile:91: all] Error 2
```

- `tmp` is declared without an initializer and only assigned in *some* `switch`
  cases (`case 0`, `case 1`). There is no `default`, so when the selector matches
  no case the variable is left indeterminate, yet it is read by `printf` afterward.
  - `tmp`는 초기화 없이 선언되고 *일부* `switch` 케이스(`case 0`, `case 1`)에서만
    값을 대입받습니다. `default`가 없으므로 선택자가 어떤 케이스와도 맞지 않으면
    변수가 미정 상태로 남는데, 그 직후 `printf`에서 이를 읽습니다.

- Three knobs in `CMakeLists.txt` make the warning into a hard error:
  1. `-Wall -Wextra` — enables `-Wmaybe-uninitialized`.
  2. `-O1` — the *may be uninitialized* data-flow analysis only runs at `-O1` and above (at `-O0` it is silently skipped).
  3. `-Werror=maybe-uninitialized` — promotes that specific warning to an error so the build fails.
  - `CMakeLists.txt`의 세 설정이 이 경고를 컴파일 에러로 바꿉니다:
    1. `-Wall -Wextra` — `-Wmaybe-uninitialized`를 켭니다.
    2. `-O1` — *초기화되지 않았을 수 있음* 데이터 흐름 분석은 `-O1` 이상에서만 동작합니다(`-O0`에서는 생략됨).
    3. `-Werror=maybe-uninitialized` — 해당 경고를 에러로 격상시켜 빌드를 실패시킵니다.

# `CMakefile.txt`[|🔝|](#link)

```cmake
cmake_minimum_required(VERSION 4.0)

set(CMAKE_C_STANDARD 23)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_C_EXTENSIONS OFF)
# set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

get_filename_component(ProjectId ${CMAKE_CURRENT_SOURCE_DIR} NAME)
string(REPLACE " " "_" ProjectId ${ProjectId})
project(${ProjectId} LANGUAGES C)

# Force GCC 15(LinuxOS)
# set(CMAKE_C_COMPILER "/opt/gcc-15/bin/gcc")
# Force GCC 15(macOS)
# set(CMAKE_C_COMPILER "/opt/homebrew/opt/gcc@15/bin/gcc-15")
# Force Clang 21(LinuxOS)
# set(CMAKE_C_COMPILER "/usr/bin/clang-21")
# Force Clang 21(macOS)
# set(CMAKE_CXX_COMPILER "/opt/homebrew/opt/llvm/bin/clang")

SET (CMAKE_C_FLAGS_INIT                "-Wall -std=c23")
SET (CMAKE_C_FLAGS_DEBUG_INIT          "-g")
SET (CMAKE_C_FLAGS_MINSIZEREL_INIT     "-Os -DNDEBUG")
SET (CMAKE_C_FLAGS_RELEASE_INIT        "-O3 -DNDEBUG")
SET (CMAKE_C_FLAGS_RELWITHDEBINFO_INIT "-O2 -g")

SET (CMAKE_CXX_FLAGS_INIT                "-Wall -std=c++26")
SET (CMAKE_CXX_FLAGS_DEBUG_INIT          "-g")
SET (CMAKE_CXX_FLAGS_MINSIZEREL_INIT     "-Os -DNDEBUG")
SET (CMAKE_CXX_FLAGS_RELEASE_INIT        "-O3 -DNDEBUG")
SET (CMAKE_CXX_FLAGS_RELWITHDEBINFO_INIT "-O2 -g")

# Common compile flags
add_compile_options(
    -pedantic
    -pthread
    -pedantic-errors
    -lm
    -Wall
    -Wextra
    -Werror=maybe-uninitialized
    -O1   # -Wmaybe-uninitialized analysis only runs at -O1 and above
    -ggdb
    # -std=c23
)

# Main executable with C sources
add_executable(${ProjectId}
    src/main.c
    # src/mandelbrot.c
)

target_link_options(${ProjectId} PRIVATE -pthread -lm)

# Output directory
set_target_properties(${ProjectId} PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY
       "${CMAKE_BINARY_DIR}/$<LOWER_CASE:$<CONFIG>>"
)
```


# c23 test code[|🔝|](#link)

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[argc + 1]) {
    (void)argv; // argc is used below; argv is not -> silence -Wunused-parameter
    // Deliberately NOT initialized. It is assigned only inside *some*
    // switch cases below; if no case matches, it is left indeterminate.
    unsigned tmp;

    // argc's value is not known at compile time, so the compiler cannot
    // prove which case (if any) will run -> 'tmp' may stay unset.
    switch ((unsigned)argc) {
    case 0:
        tmp = 0;
        break;
    case 1:
        tmp = 1;
        break;
        // NOTE: no `default` here, and no assignment for argc >= 2,
        //       so 'tmp' is not guaranteed to be set on every path.
    }

    // Error: on a path where no case matched, 'tmp' may be used uninitialized.
    printf("the temp is %u\n", tmp);

    return EXIT_SUCCESS;
}
```
