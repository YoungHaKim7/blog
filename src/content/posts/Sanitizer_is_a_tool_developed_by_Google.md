---
title: Sanitizer_is_a_tool_developed_by_Google
published: 2025-12-31
description: 'Sanitizers - Tools(AddressSanitizer(ASan), LeakSanitizer(LSan), ThreadSanitizer(TSan), MemorySanitizer(MSan), UndefinedBehaviorSanitizer(UBSan))'
image: ''
tags: [c, fsanitize, debugging, sanitizer]
category: 'z_c'
draft: false 
lang: ''
---

# link


# C언어에서 sanitizer컴파일 옵션

- justfile로 자동화 시킴

```bash
# Clang Sanitize(ASan=address / LSan=leak / TSan=thread / MSan=memory / UBSan=undefined (Undefined Behavior)
clang_which := `which clang`
# Files
source := src_dir+"/main.c"

san SAN:
    rm -rf target
    mkdir -p target
    {{clang_which}} -g -fsanitize={{SAN}} -fno-omit-frame-pointer -c {{source}}
    {{clang_which}} -g -fsanitize={{SAN}} *.o 
    mv a.out *.o {{target_dir}}
    {{target_dir}}/a.out
```


- [sample code](https://github.com/YoungHaKim7/C_Programming_Kernigan_and_Ritchie/tree/main/002_snippets_C_code/a02_ver3_openSUSE)

## 출력된 모습

- [sample code](https://github.com/YoungHaKim7/glibc_The_GNU_C_Library_Training/tree/main/001_study_glibc/training_c/01_String_Tsoding/a05_dont_forget_free)

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
```


# Sanitizers - Tools[|🔝|](#link)
- AddressSanitizer(ASan)
  - detects addressability issues
- LeakSanitizer(LSan)
  - detects memory leaks
  - https://github.com/google/sanitizers/wiki/AddressSanitizerLeakSanitizer
  - https://clang.llvm.org/docs/LeakSanitizer.html
    - Rust
      - https://github.com/rust-lang/rust/blob/master/src/doc/unstable-book/src/compiler-flags/sanitizer.md#leaksanitizer
- ThreadSanitizer(TSan)
  - detects data races and deadlocks
- MemorySanitizer(MSan)
  - detects use of uninitialized memory
  - https://clang.llvm.org/docs/MemorySanitizer.html
    - Rust
      - https://github.com/rust-lang/rust/blob/master/src/doc/unstable-book/src/compiler-flags/sanitizer.md#memorysanitizer 
- UndefinedBehaviorSanitizer(UBSan)
  - dectects undefined behavior

- [(19min나옴)Harnessing constexpr - A Path to Safer C++ - Mikhail Svetkin - C++Now 2025 | CppNow](https://youtu.be/THkLvIVg7Q8?si=A3Lq1Y5iCz7UJ493)

# sanitizers 설명서
- https://github.com/google/sanitizers/wiki/addresssanitizerflags

# Thread 설명서
- https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual

<hr />

# gcc로 하는 방법

- https://www.osc.edu/resources/getting_started/howto/howto_use_address_sanitizer

- In one command, this looks like:
```bash
gcc main.c -o main -fsanitize=address -static-libasan -g
```

- Or, splitting into separate compiling and linking stages:
```bash
gcc -c main.c -fsanitize=address -g
gcc main.o -o main -fsanitize=address -static-libasan
```


# cmake로 자동화 시키기(C23)

- [sample code](https://github.com/YoungHaKim7/c23_pthread_cmake_just_sample/tree/main/02_Sanitizers_Debugging_Memory_Thread)


- address 샘플 `CMakeLists.txt`

```cmake
cmake_minimum_required(VERSION 4.0)

get_filename_component(ProjectId ${CMAKE_CURRENT_SOURCE_DIR} NAME)
string(REPLACE " " "_" ProjectId ${ProjectId})
project(${ProjectId} LANGUAGES C)

# Force GCC 15
set(CMAKE_C_COMPILER "/opt/gcc-15/bin/gcc")

# Force Clang 20(macOS)
# set(CMAKE_CXX_COMPILER "/opt/homebrew/opt/llvm/bin/clang")

set(CMAKE_C_STANDARD 23)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_C_EXTENSIONS OFF)
SET (CMAKE_C_FLAGS_INIT                "-Wall -std=c23")
SET (CMAKE_C_FLAGS_DEBUG_INIT          "-g")
SET (CMAKE_C_FLAGS_MINSIZEREL_INIT     "-Os -DNDEBUG")
SET (CMAKE_C_FLAGS_RELEASE_INIT        "-O3 -DNDEBUG")
SET (CMAKE_C_FLAGS_RELWITHDEBINFO_INIT "-O2 -g")

SET (CMAKE_CXX_FLAGS_INIT                "-Wall -std=c++23")
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
    -ggdb
    -g
    -fsanitize=address
    # -std=c23
)

# Main executable with C23 sources
add_executable(${ProjectId}
    src/main.c
    # src/add_sources.c
)

target_link_options(${ProjectId} PRIVATE -pthread -lm -fsanitize=address)

# Output directory
set_target_properties(${ProjectId} PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/target
)
```

