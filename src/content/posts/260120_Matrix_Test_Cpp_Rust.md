---
title: 260120_Matrix_Test_Cpp_Rust
published: 2026-01-20
description: 'Matrix Multiplication Benchmark (1000x1000 matrix) / C++ / Rust'
image: ''
tags: [rust, optimization, cpp]
category: 'optimization'
draft: false 
lang: ''
---

# link

# C++이 더 빠르다고 한 코드 영상[|🔝|](#link)
- https://youtu.be/t06fisE78TQ?si=HIjBHxQiPMyP9eFm

# 극한의 러스트 최적화 코드(안되면 되게 만드는 코드 ㅋㅋ)[|🔝|](#link)

- `Cargo.toml` 추가해 준다.(극한의 최적화)

```toml
[profile.release]
opt-level = 3
lto = true
codegen-units = 1
```

- `main.rs`

```rs
use std::time::Instant;

/// Original slow version - Vec<Vec<T>> with poor cache locality
fn matrix_mult_slow(n: usize) -> f64 {
    let mat_a = vec![vec![1i32; n]; n];
    let mat_b = vec![vec![1i32; n]; n];
    let mut result = vec![vec![0i32; n]; n];

    let start = Instant::now();

    for i in 0..n {
        for j in 0..n {
            for k in 0..n {
                result[i][j] += mat_a[i][k] * mat_b[k][j];
            }
        }
    }

    start.elapsed().as_secs_f64()
}

/// Optimization 1: Flat 1D array - eliminates double indirection
/// Better cache locality, single contiguous memory block
fn matrix_mult_flat(n: usize) -> f64 {
    let mat_a = vec![1i32; n * n];
    let mat_b = vec![1i32; n * n];
    let mut result = vec![0i32; n * n];

    let start = Instant::now();

    for i in 0..n {
        for k in 0..n {
            for j in 0..n {
                // Loop reordering: i->k->j instead of i->j->k
                // This improves cache locality for mat_b
                result[i * n + j] += mat_a[i * n + k] * mat_b[k * n + j];
            }
        }
    }

    start.elapsed().as_secs_f64()
}

/// Optimization 2: Loop reordering with iterators
/// Better spatial locality, reduces cache misses
fn matrix_mult_iterators(n: usize) -> f64 {
    let mat_a = vec![1i32; n * n];
    let mat_b = vec![1i32; n * n];
    let mut result = vec![0i32; n * n];

    let start = Instant::now();

    // Use iterators for better LLVM optimization potential
    for (i, row_a) in mat_a.chunks(n).enumerate() {
        for (k, &a) in row_a.iter().enumerate() {
            for (j, res) in result
                .chunks_mut(n)
                .skip(i)
                .take(1)
                .next()
                .unwrap()
                .iter_mut()
                .enumerate()
            {
                *res += a * mat_b[k * n + j];
            }
        }
    }

    start.elapsed().as_secs_f64()
}

/// Optimization 3: Cache-blocking / Tiling
/// Breaks matrix into blocks that fit in L1 cache
fn matrix_mult_tiled(n: usize) -> f64 {
    let mat_a = vec![1i32; n * n];
    let mat_b = vec![1i32; n * n];
    let mut result = vec![0i32; n * n];

    // Block size tuned for L1 cache (typically 32-64 for integers)
    let block_size = 32;

    let start = Instant::now();

    for ii in (0..n).step_by(block_size) {
        for jj in (0..n).step_by(block_size) {
            for kk in (0..n).step_by(block_size) {
                // Process block
                for i in ii..std::cmp::min(ii + block_size, n) {
                    for k in kk..std::cmp::min(kk + block_size, n) {
                        for j in jj..std::cmp::min(jj + block_size, n) {
                            result[i * n + j] += mat_a[i * n + k] * mat_b[k * n + j];
                        }
                    }
                }
            }
        }
    }

    start.elapsed().as_secs_f64()
}

/// Optimization 4: Unsafe version - eliminates bounds checks
/// Only use when you can guarantee indices are valid!
fn matrix_mult_unsafe(n: usize) -> f64 {
    let mat_a = vec![1i32; n * n];
    let mat_b = vec![1i32; n * n];
    let mut result = vec![0i32; n * n];

    let start = Instant::now();

    // Unsafe pointer arithmetic - no bounds checking
    let a_ptr = mat_a.as_ptr();
    let b_ptr = mat_b.as_ptr();
    let res_ptr = result.as_mut_ptr();

    for i in 0..n {
        for k in 0..n {
            for j in 0..n {
                unsafe {
                    *res_ptr.add(i * n + j) += *a_ptr.add(i * n + k) * *b_ptr.add(k * n + j);
                }
            }
        }
    }

    start.elapsed().as_secs_f64()
}

fn main() {
    let n = 1000;

    let iterations = 3;

    println!("Matrix Multiplication Benchmark ({}x{} matrix)\n", n, n);
    println!("Running {} iterations each...\n", iterations);

    // Warm up
    matrix_mult_flat(100);

    // Benchmark each version
    let versions = [
        (
            "1. Original (Vec<Vec>)",
            matrix_mult_slow as fn(usize) -> f64,
        ),
        ("2. Flat 1D Array", matrix_mult_flat),
        ("3. Loop Reordered + Iterators", matrix_mult_iterators),
        ("4. Cache-Blocked (Tiled)", matrix_mult_tiled),
        ("5. Unsafe (No Bounds Check)", matrix_mult_unsafe),
    ];

    for (name, func) in versions {
        let mut total = 0.0;
        for _ in 0..iterations {
            total += func(n);
        }
        let avg = total / iterations as f64;
        println!("{:<30} | {:.6} seconds", name, avg);
    }

    println!("\n=== WHY THE OPTIMIZATIONS WORK ===\n");

    println!("1. FLAT 1D ARRAY vs Vec<Vec<T>>:");
    println!("   - Vec<Vec> allocates each row separately → pointer chasing");
    println!("   - Flat array = single contiguous memory block");
    println!("   - Better spatial locality → fewer cache misses");

    println!("\n2. LOOP REORDERING (i->k->j vs i->j->k):");
    println!("   - Original: mat_b[k][j] with k in inner loop → poor cache reuse");
    println!("   - Reordered: mat_b[k*n+j] accessed sequentially → better prefetching");

    println!("\n3. CACHE BLOCKING/TILING:");
    println!("   - Breaks matrix into blocks fitting in L1 cache (~32KB)");
    println!("   - Each block loaded once, reused multiple times");
    println!("   - Reduces memory bandwidth pressure");

    println!("\n4. UNSAFE (NO BOUNDS CHECKING):");
    println!("   - Removes bounds checks on every array access");
    println!("   - Trusts the programmer to guarantee valid indices");
    println!("   - Saves instructions per iteration");

    println!("\n=== PERFORMANCE METRICS EXPLANATION ===\n");

    println!("From perf analysis of your original code:");
    println!("- 5x more branches than C++: Vec<Vec> indirection");
    println!("- 2.3x more instructions: Bounds checking + pointer chasing");
    println!("- Backend bound: CPU waiting on memory (cache misses)");
}

```

## perf분석자료[|🔝|](#link)

```bash
# Result

```bash
$ cargo r --release
Matrix Multiplication Benchmark (1000x1000 matrix)

Running 3 iterations each...

1. Original (Vec<Vec>)         | 1.259141 seconds
2. Flat 1D Array               | 0.119596 seconds
3. Loop Reordered + Iterators  | 0.121502 seconds
4. Cache-Blocked (Tiled)       | 0.269369 seconds
5. Unsafe (No Bounds Check)    | 0.119460 seconds

=== WHY THE OPTIMIZATIONS WORK ===

1. FLAT 1D ARRAY vs Vec<Vec<T>>:
   - Vec<Vec> allocates each row separately → pointer chasing
   - Flat array = single contiguous memory block
   - Better spatial locality → fewer cache misses

2. LOOP REORDERING (i->k->j vs i->j->k):
   - Original: mat_b[k][j] with k in inner loop → poor cache reuse
   - Reordered: mat_b[k*n+j] accessed sequentially → better prefetching

3. CACHE BLOCKING/TILING:
   - Breaks matrix into blocks fitting in L1 cache (~32KB)
   - Each block loaded once, reused multiple times
   - Reduces memory bandwidth pressure

4. UNSAFE (NO BOUNDS CHECKING):
   - Removes bounds checks on every array access
   - Trusts the programmer to guarantee valid indices
   - Saves instructions per iteration

=== PERFORMANCE METRICS EXPLANATION ===

From perf analysis of your original code:
- 5x more branches than C++: Vec<Vec> indirection
- 2.3x more instructions: Bounds checking + pointer chasing
- Backend bound: CPU waiting on memory (cache misses)

```


# perf분석_Rust code[|🔝|](#link)


```bash
$ perf stat ./rust_final_matrix_test_3_test

Matrix Multiplication Benchmark (1000x1000 matrix)

Running 3 iterations each...

1. Original (Vec<Vec>)         | 1.250554 seconds
2. Flat 1D Array               | 0.119676 seconds
3. Loop Reordered + Iterators  | 0.121358 seconds
4. Cache-Blocked (Tiled)       | 0.269381 seconds
5. Unsafe (No Bounds Check)    | 0.119483 seconds

=== WHY THE OPTIMIZATIONS WORK ===

1. FLAT 1D ARRAY vs Vec<Vec<T>>:
   - Vec<Vec> allocates each row separately → pointer chasing
   - Flat array = single contiguous memory block
   - Better spatial locality → fewer cache misses

2. LOOP REORDERING (i->k->j vs i->j->k):
   - Original: mat_b[k][j] with k in inner loop → poor cache reuse
   - Reordered: mat_b[k*n+j] accessed sequentially → better prefetching

3. CACHE BLOCKING/TILING:
   - Breaks matrix into blocks fitting in L1 cache (~32KB)
   - Each block loaded once, reused multiple times
   - Reduces memory bandwidth pressure

4. UNSAFE (NO BOUNDS CHECKING):
   - Removes bounds checks on every array access
   - Trusts the programmer to guarantee valid indices
   - Saves instructions per iteration

=== PERFORMANCE METRICS EXPLANATION ===

From perf analysis of your original code:
- 5x more branches than C++: Vec<Vec> indirection
- 2.3x more instructions: Bounds checking + pointer chasing
- Backend bound: CPU waiting on memory (cache misses)

 Performance counter stats for './rust_final_matrix_test_3_test':

          5,666.84 msec task-clock                       #    1.000 CPUs utilized
                59      context-switches                 #   10.411 /sec
                 2      cpu-migrations                   #    0.353 /sec
            45,203      page-faults                      #    7.977 K/sec
    42,975,899,322      cpu_atom/instructions/           #    1.96  insn per cycle              (0.15%)
   114,113,856,518      cpu_core/instructions/           #    3.96  insn per cycle              (99.81%)
    21,927,016,936      cpu_atom/cycles/                 #    3.869 GHz                         (0.15%)
    28,838,789,548      cpu_core/cycles/                 #    5.089 GHz                         (99.81%)
    10,347,010,446      cpu_atom/branches/               #    1.826 G/sec                       (0.17%)
    19,416,001,849      cpu_core/branches/               #    3.426 G/sec                       (99.81%)
        10,215,692      cpu_atom/branch-misses/          #    0.10% of all branches             (0.17%)
        12,263,762      cpu_core/branch-misses/          #    0.06% of all branches             (99.81%)
             TopdownL1 (cpu_core)                 #     39.3 %  tma_backend_bound
                                                  #      0.4 %  tma_bad_speculation
                                                  #      0.8 %  tma_frontend_bound
                                                  #     59.5 %  tma_retiring             (99.81%)
                                                  #     -6.2 %  tma_bad_speculation
                                                  #     47.2 %  tma_retiring             (0.17%)
                                                  #     49.0 %  tma_backend_bound
                                                  #     10.0 %  tma_frontend_bound       (0.17%)

       5.668168347 seconds time elapsed

       5.629308000 seconds user
       0.037995000 seconds sys
```


# GLM 분석자료(AI분석 자료)[|🔝|](#link)

- looking at the perf analysis, I can see some interesting patterns. Let me break down what's actually happening:

- Key Observation: The "Fast" Rust Code Has a Bug

- Looking at the "improved" Rust code:

```rs
for k in 0..n {
  sum = mat_a[i][k] + mat_b[k][j];  // ❌ This is ADDITION, not multiplication
}
result[i][j] = sum;
```

- This is doing element-wise addition, not matrix multiplication! You changed the algorithm entirely from O(n³) to O(n²), which is why it's faster -
but it's computing a different result.
  Real Performance Analysis

  - Comparing the actual matrix multiplication implementations:

|    Metric    | C++ (Slow) |     Rust (Slow)     |
|-|-|-|
| Time         | 0.688s     | 1.252s              |
| Instructions | 9.04B      | 21.05B (2.3x more!) |
| Cycles       | 3.53B      | 6.40B (1.8x more)   |
| Branches     | 1.01B      | 5.01B (5x more!!)   |
| IPC          | 2.56       | 3.29                |

- Why Rust's Vec-of-Vecs is Slow Here

- The 5x more branches and 2.3x more instructions come from:

  1. Double indirection: Each `mat_a[i][k]` requires two memory lookups instead of one
  2. Separate allocations: `Vec<Vec<T>>` allocates each row separately - poor cache locality
  3. Bounds checking: Rust inserts bounds checks on every array access (though LLVM often optimizes this away)
  4. Pointer chasing: Each inner vector access follows a pointer

- 러스트의 벡 오브 벡스가 느린 이유

- 5배 더 많은 분기와 2.3배 더 많은 지침은 다음과 같습니다:

1. 이중 방향: 각 `mat_a[i][k]`는 하나가 아닌 두 개의 메모리 조회가 필요합니다
2. 별도 할당: `Vec<Vec>`는 각 행을 개별적으로 할당합니다 - 캐시 로컬리티가 낮음
3. 경계 검사: Rust는 모든 배열 접근에 경계 검사를 삽입합니다(LLVM은 종종 이를 최적화합니다)
4. 포인터 추적: 각 내부 벡터 접근은 포인터를 따릅니다

  Proper Fixes (That Keep Matrix Multiplication)

```rs
  // Fix 1: Use flat 1D array (better cache locality)
  let n = 1000;
  let mat_a = vec![1; n * n];
  let mat_b = vec![2; n * n];
  let mut result = vec![0; n * n];

  for i in 0..n {
      for k in 0..n {
          for j in 0..n {  // Note: j loop reordered
              result[i * n + j] += mat_a[i * n + k] * mat_b[k * n + j];
          }
      }
  }
```

- The `Vec<Vec<T>>` abstraction is elegant for general-purpose code, but for performance-critical numerical computing, the indirection overhead is significant compared to C++'s contiguous `std::vector<std::vector<int>>` layout.
    - `Vec<Vec>` 추상화는 범용 코드에서는 우아하지만, 성능이 중요한 수치 컴퓨팅에서는 C++의 연속적인 `std::vector<std::vector<int>` 레이아웃에 비해 간접 오버헤드가 상당히 큽니다.


# C++ 이런 작은 작업은 C/C++이 더 빠른줄 알았는데 극한의 최적하니 러스트가 더 빨라짐.[|🔝|](#link)

```cpp
#include <chrono>
#include <iostream>
#include <vector>

int main(void) {
    int N = 1000;
    std::vector<std::vector<int>> matA(N, std::vector<int>(N, 1));
    std::vector<std::vector<int>> matB(N, std::vector<int>(N, 2));
    std::vector<std::vector<int>> result(N, std::vector<int>(N, 0));

    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < N; ++j)
            for (int k = 0; k < N; ++k)
                result[i][j] += matA[i][k] * matB[k][j];

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed = end - start;

    std::cout << "Elapsed time: " << elapsed.count() << " seconds" << std::endl;

    return 0;
}
```

- Result Optimization `-O3`

- intel 기준
  - 3th Gen Intel(R) Core(TM) i5-13600K (20) @ 5.10 GHz

```bash
$ cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_CXX_COMPILER=/opt/homebrew/opt/gcc@15/bin/g++-15 -D CMAKE_CXX_FLAGS_RELEASE_INIT="-O3 -DNDEBUG" -G Ninja .

Elapsed time: 0.688659 seconds
```

- 지금은 Cpp이 더 빠르다.


# 문제의 러스트 코드[|🔝|](#link)

```rs
use std::time::Instant;

fn main() {
    let n = 1_000;
    let mat_a = vec![vec![1; n]; n];
    let mat_b = vec![vec![1; n]; n];
    let mut result = vec![vec![0; n]; n];

    let start = Instant::now();

    for i in 0..n {
        for j in 0..n {
            for k in 0..n {
                result[i][j] += mat_a[i][k] * mat_b[k][j];
            }
        }
    }

    let duration = start.elapsed();
    println!(
        "Multiplication time : {:.6} seconds",
        duration.as_secs_f64()
    );
}
```

- Result(intel 기준)
  - 3th Gen Intel(R) Core(TM) i5-13600K (20) @ 5.10 GHz

```bash
Multiplication time : 1.252359 seconds

```
- Rust code가 느리다.


# Rust code 나름 개선해 보았다.[|🔝|](#link)

```rs
use std::time::Instant;

fn main() {
    let n = 1_000;
    let mat_a = vec![vec![1; n]; n];
    let mat_b = vec![vec![2; n]; n];
    let mut result = vec![vec![0; n]; n];

    let start = Instant::now();

    // Use (chatGPT ^^)
    for i in 0..n {
        for j in 0..n {
            let mut sum = 0;
            for k in 0..n {
                sum = mat_a[i][k] + mat_b[k][j];
            }
            result[i][j] = sum;
        }
    }

    let duration = start.elapsed();
    println!("Multiplication Time: {:.6} seconds", duration.as_secs_f64());
}
```


- C++ 보다 더 빨라짐 ㅋ
-  Result

- intel 기준
  - 3th Gen Intel(R) Core(TM) i5-13600K (20) @ 5.10 GHz

```bash
$ cargo r --release

Multiplication Time: 0.358726 seconds

```


# 원인을 분석하기 위해 perf을 활용해 보았다.[|🔝|](#link)


## C++로 생성된 `perf` 자료

```bash
$ perf stat ./cpp_vec_matrix_test01

Elapsed time: 0.690297 seconds

 Performance counter stats for './cpp_vec_matrix_test01':

            693.78 msec task-clock                       #    0.999 CPUs utilized
                 5      context-switches                 #    7.207 /sec
                 0      cpu-migrations                   #    0.000 /sec
             3,090      page-faults                      #    4.454 K/sec
     <not counted>      cpu_atom/instructions/                                                  (0.00%)
     9,041,220,615      cpu_core/instructions/           #    2.56  insn per cycle
     <not counted>      cpu_atom/cycles/                                                        (0.00%)
     3,530,437,346      cpu_core/cycles/                 #    5.089 GHz
     <not counted>      cpu_atom/branches/                                                      (0.00%)
     1,006,837,093      cpu_core/branches/               #    1.451 G/sec
     <not counted>      cpu_atom/branch-misses/                                                 (0.00%)
         1,026,073      cpu_core/branch-misses/          #    0.10% of all branches
             TopdownL1 (cpu_core)                 #     61.2 %  tma_backend_bound
                                                  #      0.4 %  tma_bad_speculation
                                                  #      0.4 %  tma_frontend_bound
                                                  #     38.0 %  tma_retiring

       0.694199122 seconds time elapsed

       0.690102000 seconds user
       0.004000000 seconds sys

```


## 드럽게 느린 러스트 코드 `perf` 분석자료[|🔝|](#link)

```bash

$ perf stat ./rust_vec_matrix_slow_code01
Multiplication time : 1.254597 seconds

 Performance counter stats for './rust_vec_matrix_slow_code01':

          1,257.79 msec task-clock                       #    1.000 CPUs utilized
                12      context-switches                 #    9.541 /sec
                 0      cpu-migrations                   #    0.000 /sec
             3,036      page-faults                      #    2.414 K/sec
     <not counted>      cpu_atom/instructions/                                                  (0.00%)
    21,049,306,496      cpu_core/instructions/           #    3.29  insn per cycle
     <not counted>      cpu_atom/cycles/                                                        (0.00%)
     6,400,607,256      cpu_core/cycles/                 #    5.089 GHz
     <not counted>      cpu_atom/branches/                                                      (0.00%)
     5,007,857,297      cpu_core/branches/               #    3.981 G/sec
     <not counted>      cpu_atom/branch-misses/                                                 (0.00%)
         1,020,886      cpu_core/branch-misses/          #    0.02% of all branches
             TopdownL1 (cpu_core)                 #     52.5 %  tma_backend_bound
                                                  #      0.4 %  tma_bad_speculation
                                                  #      0.4 %  tma_frontend_bound
                                                  #     46.7 %  tma_retiring

       1.258319050 seconds time elapsed

       1.256093000 seconds user
       0.002000000 seconds sys
```


## 개선된 러스트 코드 `perf`분석[|🔝|](#link)

```bash
perf stat ./rust_vec_matrix_fast_code02
Multiplication Time: 0.358508 seconds

 Performance counter stats for './rust_vec_matrix_fast_code02':

            361.74 msec task-clock                       #    0.999 CPUs utilized
                 3      context-switches                 #    8.293 /sec
                 0      cpu-migrations                   #    0.000 /sec
             3,037      page-faults                      #    8.395 K/sec
     <not counted>      cpu_atom/instructions/                                                  (0.00%)
     9,546,440,084      cpu_core/instructions/           #    5.19  insn per cycle
     <not counted>      cpu_atom/cycles/                                                        (0.00%)
     1,840,051,424      cpu_core/cycles/                 #    5.087 GHz
     <not counted>      cpu_atom/branches/                                                      (0.00%)
     3,506,848,462      cpu_core/branches/               #    9.694 G/sec
     <not counted>      cpu_atom/branch-misses/                                                 (0.00%)
         1,016,725      cpu_core/branch-misses/          #    0.03% of all branches
             TopdownL1 (cpu_core)                 #     31.8 %  tma_backend_bound
                                                  #      2.0 %  tma_bad_speculation
                                                  #     11.7 %  tma_frontend_bound
                                                  #     54.5 %  tma_retiring

       0.362200700 seconds time elapsed

       0.359065000 seconds user
       0.003000000 seconds sys
```

