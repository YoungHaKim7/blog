---
title: 240704_Array_vs_Vec_part2_memory
published: 2024-07-04
description: 'array와 Vec를 메모리를 찍어보며 구성을 예측해보자'
image: ''
tags: [rust, std]
category: 'rust'
draft: false 
lang: ''
---

# link

- [rust 실습코드](#rust-실습코드)

<hr />

# array와 Vec를 메모리를 찍어보며 구성을 예측해보자[|🔝|](#link)

## 벡터 인덱스별 메모리 주소 조회해 보기

```rs
fn main() {
    let my_vec = vec![1, 2, 3, 4, 5];

    for (i, val) in my_vec.iter().enumerate() {
        println!("index [{}], = {} , mem = {:p}", i, val, val)
    }
}
```

- result

```bash
index [0], = 1 , mem = 0xa9f0009a0
index [1], = 2 , mem = 0xa9f0009a4
index [2], = 3 , mem = 0xa9f0009a8
index [3], = 4 , mem = 0xa9f0009ac
index [4], = 5 , mem = 0xa9f0009b0
```

# Debug the memory with Rust vector and create an example of how it works.
- Below is a hands-on, “debug-the-memory” explanation of Vec<T> in Rust, with real code, pointer addresses, and CLI-style diagrams so you can see how it works.

- I’ll proceed step by step, like a debugger walkthrough.

# 1. What is a `Vec<T>` in memory?

- A `Vec<T>` is not the elements themselves.
It is a small struct on the stack that points to heap memory.

Conceptually (simplified):


```rs
struct Vec<T> {
    ptr: *mut T,   // heap pointer
    len: usize,    // number of initialized elements
    cap: usize,    // allocated capacity
}
```

# 2. Minimal example: observing memory addresses

```rs
fn debug_vec(v: &Vec<i32>) {
    println!("len = {}", v.len());
    println!("cap = {}", v.capacity());
    println!("ptr = {:p}", v.as_ptr());

    for i in 0..v.len() {
        unsafe {
            println!(
                "  [{}] addr = {:p}, value = {}",
                i,
                v.as_ptr().add(i),
                *v.as_ptr().add(i)
            );
        }
    }
}

fn main() {
    let mut v: Vec<i32> = Vec::new();

    println!("== After Vec::new() ==");
    debug_vec(&v);

    v.push(10);
    println!("\n== After push(10) ==");
    debug_vec(&v);

    v.push(20);
    println!("\n== After push(20) ==");
    debug_vec(&v);

    v.push(30);
    println!("\n== After push(30) ==");
    debug_vec(&v);
}
```

# 3. Sample output (annotated)

```bash
== After Vec::new() ==
len = 0
cap = 0
ptr = 0x0
```

- Interpretation
```bash
STACK                          HEAP
+------------------+
| Vec              |
| ptr = null       |  ----->  (nothing allocated)
| len = 0          |
| cap = 0          |
+------------------+
```

- after
```bash
== After push(10) ==
len = 1
cap = 4
ptr = 0x600003f8c000
  [0] addr = 0x600003f8c000, value = 10
```

## What happened?

Rust allocated heap memory automatically.

```bash
STACK                              HEAP
+------------------+      +---------------------------+
| Vec              | ---> | 10 | ?? | ?? | ??         |
| ptr = 0x6000...  |      +---------------------------+
| len = 1          |        ↑
| cap = 4          |        ptr
+------------------+

```

- Capacity is 4, not 1 → amortized growth
- Only index 0 is initialized

```bash
== After push(20) ==
len = 2
cap = 4
ptr = 0x600003f8c000
  [0] addr = 0x600003f8c000, value = 10
  [1] addr = 0x600003f8c004, value = 20
```

- Notice
  - Pointer did not change
  - Elements are contiguous
  - i32 = 4 bytes → addresses increase by 4

```bash
HEAP
addr+0x00 : 10
addr+0x04 : 20
addr+0x08 : ??
addr+0x0C : ??
```

```bash
== After push(30) ==
len = 3
cap = 4
ptr = 0x600003f8c000
```

- Still no reallocation.

# 4. Triggering reallocation (capacity growth)

```bash
fn main() {
    let mut v = Vec::with_capacity(2);

    for i in 0..10 {
        v.push(i);
        println!(
            "push {:2} | len = {:2}, cap = {:2}, ptr = {:p}",
            i,
            v.len(),
            v.capacity(),
            v.as_ptr()
        );
    }
}
```

- Typical output

```bash
push  0 | len =  1, cap =  2, ptr = 0x600003f8c000
push  1 | len =  2, cap =  2, ptr = 0x600003f8c000
push  2 | len =  3, cap =  4, ptr = 0x600003f90000  <-- moved!
push  3 | len =  4, cap =  4, ptr = 0x600003f90000
push  4 | len =  5, cap =  8, ptr = 0x600003f98000  <-- moved!
```


# 5. Reallocation visualized
- Before growth (cap = 2)

```txt
HEAP (old)
+----+----+
| 0  | 1  |
+----+----+
```

- After push causes overflow

```txt
1) allocate new bigger block
2) memcpy old data
3) free old block
```

```txt
HEAP (new)
+----+----+----+----+
| 0  | 1  | 2  | ?? |
+----+----+----+----+
```

- 🚨 All old pointers are now INVALID

# 6. Common debugging mistake (use-after-realloc)

```rs
fn main() {
    let mut v = vec![1, 2];

    let p = v.as_ptr(); // raw pointer to element[0]

    v.push(3); // may reallocate

    unsafe {
        println!("{}", *p); // ❌ Undefined Behavior
    }
}
```
- Why?

```bash
p ---> old heap (freed!)
v ---> new heap
```

- Rust prevents this in safe code, but raw pointers bypass checks


# 7. Vec vs Array `[T; N]` (memory-debug view)

## Fixed array
```rs
let a = [1, 2, 3, 4];
```

```txt
STACK ONLY
+----+----+----+----+
| 1  | 2  | 3  | 4  |
+----+----+----+----+
```


## Vec

```rs
let v = vec![1, 2, 3, 4];
```
```txt
STACK                     HEAP
+------------------+     +----+----+----+----+
| ptr ------------ | --> | 1  | 2  | 3  | 4  |
| len = 4          |     +----+----+----+----+
| cap = 4          |
+------------------+
```

# 8. Debugging tips for `Vec<T>`

## 1. Print internal state

```rs
println!("len={}, cap={}, ptr={:p}", v.len(), v.capacity(), v.as_ptr());
```

## 2. Watch for pointer changes

- If `as_ptr()` changes → reallocation happened

## 3. Avoid storing raw pointers across push

- Store indices, not pointers.

## 4. Pre-allocate if you know the size

```rs
let mut v = Vec::with_capacity(1_000_000);
```

# 9. Mental model (important)

```txt
Vec<T> = (stack metadata) + (heap buffer)
push() = may move the heap buffer
indexing = pointer arithmetic + bounds check
```

# rust 실습코드

- [rust code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/005_std_Collections/001_Vector/002_vec_memory)

```rs
fn main() {
    // 0 , 1, 2, 3
    let arr = [1, 2, 3, 4, 5];
    let arr02 = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13];
    println!("arr []: memory address : {:p}", &arr);
    for (i, val) in arr.iter().enumerate() {
        println!("arr[{}]: value={}, memory address : {:p}", i, val, val);
    }

    let my_vec: Vec<i32> = Vec::new();
    let my_vec02 = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let my_vec03 = vec![0; 10];
    println!("{my_vec03:?}");
    println!("vec {} bytes", size_of_val(&my_vec03));

    println!("my_vec02 32 bytes? : {}", size_of_val(&my_vec02));
    println!("arr : {} bytes", size_of_val(&arr));
    println!("arr02 : {} bytes", size_of_val(&arr02));

    println!("my_vec 02 adress : {:p}", &my_vec02);

    for (i, val) in my_vec02.iter().enumerate() {
        println!("my_vec 02 [{}] adress : {:p}", i, &val);
    }

    println!("my_vec 02 [{}]: {:p}", 0, &my_vec02[0]);
    println!("my_vec 02 [{}]: {:p}", 1, &my_vec02[1]);
}
```

- result

```bash
arr []: memory address : 0x7fffecbadf90
arr[0]: value=1, memory address : 0x7fffecbadf90
arr[1]: value=2, memory address : 0x7fffecbadf94
arr[2]: value=3, memory address : 0x7fffecbadf98
arr[3]: value=4, memory address : 0x7fffecbadf9c
arr[4]: value=5, memory address : 0x7fffecbadfa0
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
vec 24 bytes
my_vec02 32 bytes? : 24
arr : 20 bytes
arr02 : 44 bytes
my_vec 02 adress : 0x7fffecbae0f0
my_vec 02 [0] adress : 0x7fffecbae290
my_vec 02 [1] adress : 0x7fffecbae290
my_vec 02 [2] adress : 0x7fffecbae290
my_vec 02 [3] adress : 0x7fffecbae290
my_vec 02 [4] adress : 0x7fffecbae290
my_vec 02 [5] adress : 0x7fffecbae290
my_vec 02 [6] adress : 0x7fffecbae290
my_vec 02 [7] adress : 0x7fffecbae290
my_vec 02 [8] adress : 0x7fffecbae290
my_vec 02 [9] adress : 0x7fffecbae290
my_vec 02 [0]: 0x5c6c0857bb50
my_vec 02 [1]: 0x5c6c0857bb54
```

