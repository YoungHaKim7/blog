---
title: 260109_DP_dynamic_programming_001
published: 2026-01-09
description: '동적 프로그래밍(DP, Dynamic Programming)은 주로 최적화 문제 적용되며, bottom-up(상향식), top-down(하향식)으로 접근 가능하다. 예시는 피보나치, LCS .. etc등등'
image: ''
tags: [rust, DP, Dynamic, algorithms]
category: 'rust'
draft: false 
lang: ''
---

# link
- [자료구조와 알고리즘_ 동적 계획법 001(Dynamic Programming, DP)](#자료구조와-알고리즘-동적-계획법-001dynamic-programming-dp)
- [DP 구현 방법 & 2가지 접근법 & 주의할점.](#dp-구현-방법)
  - [상향식Bottom-up 예시(fibonacci)](#1-상향식bottom-up-fibonacci)
  - [하향식Top-Bottom 예시(fibonacci)](#2-하향식top-down-fibonacci)

- 실습 어려운 예시(git diff 구현)
  - [C++ 로 만들어 보자](#c-로-lcs구현해보자)
  - [Rust로 만들어 보자](#rust코드로-구현해-보자lcs)

<hr />

# Summary
- 동적 프로그래밍(DP, Dynamic Programming)은 주로 최적화 문제 적용되며, bottom-up(상향식), top-down(하향식)으로 접근 가능하다. 예시는 피보나치, LCS .. etc등등

# 출처 : 
- 한글자료
  - https://blog.naver.com/cjy2103/223147151300
  - https://norman3.github.io/rl/docs/chapter02.html
  - https://velog.io/@chelsea/1-%EB%8F%99%EC%A0%81-%EA%B3%84%ED%9A%8D%EB%B2%95Dynamic-Programming-DP
- 영어자료
  - [Mastering Dynamic Programming - How to solve any interview problem (Part 1) | Tech With Nikola](https://youtu.be/Hdr64lKQ3e4?si=AARWqoDrhIEkHROm)
  - [Mastering Dynamic Programming - A Real-Life Problem (Part 2) Tech With Nikola](https://youtu.be/rE5h11FwiVw?si=H1MFxDOvfdSzp4fc)
    - github code 
      - https://github.com/freezing/data-structures-and-algorithms/tree/main/dynamic_programming/lcs
    - https://github.com/freezing/data-structures-and-algorithms/

- git diff 만들어보기(lcs활용)
- A longest common subsequence (LCS)
  - A longest common subsequence (LCS) is the longest subsequence common to all sequences in a set of sequences (often just two sequences). It differs from the longest common substring: unlike substrings, subsequences are not required to occupy consecutive positions within the original sequences. The problem of computing longest common subsequences is a classic computer science problem. Because it is polynomial and has an efficient algorithm to solve it, it is employed to compare data and merge changes to files in programs such as the diff utility and revision control systems such as Git. It has similar applications in computational linguistics and bioinformatics.
  - 가장 긴 공통 서브시퀀스(LCS)
    - 최장 공통 서브시퀀스(LCS)는 일련의 시퀀스(종종 두 개의 시퀀스)에서 모든 시퀀스에 공통적으로 사용되는 가장 긴 서브시퀀스입니다. 이 서브시퀀스는 서브시퀀스와 달리 원래 시퀀스 내에서 연속적인 위치를 차지할 필요가 없습니다. 최장 공통 서브시퀀스를 계산하는 문제는 고전적인 컴퓨터 과학 문제입니다. 이 문제는 다항식이고 이를 해결하는 효율적인 알고리즘을 가지고 있기 때문에 데이터를 비교하고 파일 변경 사항을 Git와 같은 diff 유틸리티 및 수정 제어 시스템과 같은 프로그램에서 병합하는 데 사용됩니다. 계산 언어학 및 생물정보학에서도 유사한 응용 분야를 가지고 있습니다.
    - https://en.wikipedia.org/wiki/Longest_common_subsequence- 

<hr />

# [자료구조와 알고리즘] 동적 계획법 001(Dynamic Programming, DP)[|🔝|](#link)
- 동적 프로그래밍은 주로 최적화 문제 적용되며, 다음과 같은 경우에 유용합니다.

- 피보나치수열과 같이 재귀적인 구조를 가지며 중복 계산이 발생하는 문제
- 최장 공통부분 수열((LCS)Longgest Common Subsequence, git에서 diff가 이걸로 구현.), 배낭 문제(Knapsack problem), 최단 경로 문제등의 최적화 문제

## DP의 단점[|🔝|](#link)
- 추가적인 메모리 공간이 필요하다.

<hr />

# DP 구현 방법[|🔝|](#link)
- 2가지 접근법이 있다.
  - 1. 상향식(bottom-up)
  - 2. 하향식(top-down)

## 1. 상향식(bottom-up)[|🔝|](#link)
- 주로 반복문과 배열로 해결
  - 작은 부분 문제부터 시작하여 큰 문제까지 차례대로 해결

## 2. 하향식(top-down)[|🔝|](#link)
- 재귀 함수 사용(stack overflow주의)
  - 큰 문제를 작은 부분 문제로 해결

### 쉬운 예시로 fibonacci활용

### 1. 상향식(bottom-up) (fibonacci)[|🔝|](#link)
-  주로 반복문과 배열로 해결
  - memoization 활용
  - Below is the bottom-up (iterative) dynamic programming version of Fibonacci in Rust.

- Bottom-Up Dynamic Programming (Tabulation)
- Idea
  - Start from the smallest subproblems
  - Build up the solution iteratively
  - No recursion, no stack overhead
  - Time: O(n)
  - Space: O(n) (or O(1) in the optimized version)

```rs
fn fibo(n: u64) -> u64 {
    if n < 2 {
        return n;
    }

    let n = n as usize;
    let mut dp = vec![0u64; n + 1];

    dp[0] = 0;
    dp[1] = 1;

    for i in 2..=n {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    dp[n]
}

fn main() {
    for i in 0..10 {
        println!("fibo({}) = {}", i, fibo(i));
    }
}
```

### 2. 하향식(top-down) (fibonacci)[|🔝|](#link)
- 재귀 함수 사용(stack overflow주의)
  - Your current implementation is top-down (recursive) without memoization.

```rs
fn fibo(n: u64) -> u64 {
    if n < 2 {
        return n;
    }

    fibo(n - 1) + fibo(n - 2)
}

fn main() {
    let res = fibo(10);
    println!("fibo (10) : {res}");
}
```

# C++ 로 LCS구현해보자[|🔝|](#link)
- 출처 : 
  - [Mastering Dynamic Programming - How to solve any interview problem (Part 1) | Tech With Nikola](https://youtu.be/Hdr64lKQ3e4?si=AARWqoDrhIEkHROm)
  - [Mastering Dynamic Programming - A Real-Life Problem (Part 2) Tech With Nikola](https://youtu.be/rE5h11FwiVw?si=H1MFxDOvfdSzp4fc)
    - github code 
      - https://github.com/freezing/data-structures-and-algorithms/tree/main/dynamic_programming/lcs
    - https://github.com/freezing/data-structures-and-algorithms/

- `lcs.h`
```cpp
// lcs.h
#pragma once

#include <vector>
#include <algorithm>

template <typename T>
std::vector<std::vector<int>> lcs_table(const std::vector<T> &a,
                                        const std::vector<T> &b) {
  std::vector<std::vector<int>> dp(a.size() + 1,
                                   std::vector<int>(b.size() + 1, 0));
  for (int i = 1; i <= a.size(); i++) {
    for (int j = 1; j <= b.size(); j++) {
      if (a[i - 1] == b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp;
}

template <typename T>
int longest_common_subsequence(const std::vector<T> &a,
                               const std::vector<T> &b) {
  return lcs_table(a, b)[a.size()][b.size()];
}

template <typename T>
std::vector<T> reconstruct_elements(const std::vector<std::vector<int>> &dp,
                                    const std::vector<T> &a,
                                    const std::vector<T> &b) {
  std::vector<T> elements{};
  int n = a.size();
  int m = b.size();
  while (n > 0 && m > 0) {
    if (a[n - 1] == b[m - 1]) {
      elements.push_back(a[n - 1]);
      n--;
      m--;
    } else if (dp[n - 1][m] > dp[n][m - 1]) {
      n--;
    } else {
      m--;
    }
  }
  std::reverse(elements.begin(), elements.end());
  return elements;
}
```

- `lcs_test.cpp`

```cpp
// lcs_test.cpp
#include <gmock/gmock.h>
#include <gtest/gtest.h>
#include <vector>

#include "lcs.h"

using namespace ::testing;

TEST(Lcs, Basic) {
  std::vector<int> a{6, 4, 5, 9, 11};
  std::vector<int> b{1, 15, 4, 5, 6, 9, 10, 11};
  int lcs = longest_common_subsequence(a, b);
  ASSERT_THAT(lcs, Eq(4));
}

TEST(Lcs, Empty) {
  std::vector<int> a{};
  std::vector<int> b{1, 15, 4, 5, 6, 9, 10, 11};
  int lcs = longest_common_subsequence(a, b);
  ASSERT_THAT(lcs, Eq(0));
}

TEST(Lcs, EmptyBoth) {
  std::vector<int> a{};
  std::vector<int> b{};
  int lcs = longest_common_subsequence(a, b);
  ASSERT_THAT(lcs, Eq(0));
}

TEST(Lcs, Same) {
  std::vector<int> a{1, 2, 3, 4, 5};
  std::vector<int> b{1, 2, 3, 4, 5};
  int lcs = longest_common_subsequence(a, b);
  ASSERT_THAT(lcs, Eq(5));
}

TEST(ReconstructLcs, Basic) {
  std::vector<int> a{6, 4, 5, 9, 11};
  std::vector<int> b{1, 15, 4, 5, 6, 9, 10, 11};
  auto lcs = lcs_table(a, b);
  std::vector<int> elements = reconstruct_elements(lcs, a, b);
  ASSERT_THAT(elements, ElementsAre(4, 5, 9, 11));
}

TEST(ReconstructLcs, Empty) {
  std::vector<int> a{};
  std::vector<int> b{1, 15, 4, 5, 6, 9, 10, 11};
  auto lcs = lcs_table(a, b);
  std::vector<int> elements = reconstruct_elements(lcs, a, b);
  ASSERT_THAT(elements, ElementsAre());
}

TEST(ReconstructLcs, EmptyBoth) {
  std::vector<int> a{};
  std::vector<int> b{};
  auto lcs = lcs_table(a, b);
  std::vector<int> elements = reconstruct_elements(lcs, a, b);
  ASSERT_THAT(elements, ElementsAre());
}

TEST(ReconstructLcs, Same) {
  std::vector<int> a{1, 2, 3, 4, 5};
  std::vector<int> b{1, 2, 3, 4, 5};
  auto lcs = lcs_table(a, b);
  std::vector<int> elements = reconstruct_elements(lcs, a, b);
  ASSERT_THAT(elements, ElementsAre(1, 2, 3, 4, 5));
}

TEST(ReconstructLcs, MultipleSolutions) {
    std::vector<int> a{1, 2, 3, 4, 5};
    std::vector<int> b{1, 3, 2, 4, 5};
    auto lcs = lcs_table(a, b);
    std::vector<int> elements = reconstruct_elements(lcs, a, b);
    ASSERT_THAT(elements, ElementsAre(1, 3, 4, 5));
}
```


- `print_dp_matrix.cpp`

```cpp
#include <iostream>

#include "lcs.h"

void print_matrix(const std::vector<std::vector<int>> &dp) {
    for (const auto &row: dp) {
        for (const auto &elem: row) {
            std::cout << elem << " ";
        }
        std::cout << std::endl;
    }
}

int main() {
    std::vector<int> a{1, 4, 5, 6, 9, 10, 11};
    std::vector<int> b{6, 4, 5, 9, 11};
    auto dp = lcs_table(b, a);
    print_matrix(dp);
    return 0;
}

```

- `text_diff.cpp`

```cpp
// text_diff.cpp

#include <fstream>
#include <iostream>
#include <vector>

#include "text_diff.h"

// Function to read the content of a file into a vector of strings
std::vector<std::string> read_file(const std::string &filename) {
  std::ifstream file(filename);
  std::vector<std::string> lines;
  std::string line;

  if (file.is_open()) {
    while (std::getline(file, line)) {
      lines.push_back(line);
    }
    file.close();
  } else {
    std::cerr << "Error: Unable to open file " << filename << std::endl;
  }

  return lines;
}

int main(int argc, char *argv[]) {
  if (argc != 3) {
    std::cerr << "Usage: " << argv[0] << " <file_a> <file_b>" << std::endl;
    return 1;
  }

  std::vector<std::string> file_a = read_file(argv[1]);
  std::vector<std::string> file_b = read_file(argv[2]);

  print_differences(file_a, file_b);
  return 0;
}
```

- `text_diff.h`

```cpp
// text_diff.h

#include <iostream>
#include <cassert>
#include <optional>
#include <vector>

#include "lcs.h"

void print_differences(const std::vector<std::string> &file_a,
                       const std::vector<std::string> &file_b) {
  auto lcs = reconstruct_elements(lcs_table(file_a, file_b), file_a, file_b);

  int line_a = 0, line_b = 0;
  for (const auto &line : lcs) {
    while (file_a[line_a] != line) {
      std::cout << "- " << file_a[line_a] << "\n";
      ++line_a;
    }
    while (file_b[line_b] != line) {
      std::cout << "+ " << file_b[line_b] << "\n";
      ++line_b;
    }

    assert(file_a[line_a] == file_b[line_b]);
    std::cout << "  " << file_a[line_a] << "\n";
    ++line_a;
    ++line_b;
  }

  while (line_a < file_a.size()) {
    std::cout << "- " << file_a[line_a] << "\n";
    ++line_a;
  }

  while (line_b < file_b.size()) {
    std::cout << "+ " << file_b[line_b] << "\n";
    ++line_b;
  }
}
```


- `text_diff_test.cpp`

```cpp
#include <gmock/gmock.h>
#include <gtest/gtest.h>
#include <vector>

#include "text_diff.h"

using namespace ::testing;

inline void PrintTo(const Differences &differences, std::ostream *os) {
  *os << "Differences{";
  *os << "removed_lines_a: ";
  *os << PrintToString(differences.removed_lines_a);
  *os << ", added_lines_b: ";
  *os << PrintToString(differences.added_lines_b);
  *os << "}";
}

TEST(TextDiff, Basic) {
  std::vector<std::string> file_a = {"Hello",
                                     "World",
                                     "This",
                                     "Is",
                                     "File",
                                     "A"};
  std::vector<std::string> file_b = {"Hello",
                                     "This",
                                     "File",
                                     "B",
                                     "Is",
                                     "World"};
  Differences expected{
      .removed_lines_a = {1, 3, 5},
      .added_lines_b = {3, 4, 5},
  };
  ASSERT_THAT(lcs_diff(file_a, file_b), Eq(expected));
}
```

## (LCS)test할 2 데이터

- `A.cpp`

```cpp
#include <cstdio>

int compute(int a, int b) {
  return a + b;
}

int main(int argc, char** argv) {
  int a = 3;
  int b = 4;
  int c;
  c = compute(a, b);
  printf("%d\n", c);
  return 0;
}
```

- `B.cpp`

```cpp
#include <iostream>

int compute(int a, int b) {
  return a - b;
}

int main(int argc, char** argv) {
  int c;
  int a = 3;
  int b = 4;
  c = compute(a, b);
  std::cout << c << std::endl;
  return 0;
}
```


# Rust코드로 구현해 보자(LCS)[|🔝|](#link)

- `lib.rs`
```rs
// lib.rs
pub mod lcs;
pub mod text_diff;
```

- `lcs.rs`
```rs
// lcs.rs
/// Computes the LCS dynamic programming table for two sequences.
pub fn lcs_table<T: PartialEq>(a: &[T], b: &[T]) -> Vec<Vec<usize>> {
    let mut dp = vec![vec![0; b.len() + 1]; a.len() + 1];
    for i in 1..=a.len() {
        for j in 1..=b.len() {
            if a[i - 1] == b[j - 1] {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = dp[i - 1][j].max(dp[i][j - 1]);
            }
        }
    }
    dp
}

/// Returns the length of the longest common subsequence.
pub fn longest_common_subsequence<T: PartialEq>(a: &[T], b: &[T]) -> usize {
    let dp = lcs_table(a, b);
    dp[a.len()][b.len()]
}

/// Reconstructs the LCS elements from the DP table.
pub fn reconstruct_elements<T: PartialEq + Clone>(
    dp: &[Vec<usize>],
    a: &[T],
    b: &[T],
) -> Vec<T> {
    let mut elements = Vec::new();
    let mut n = a.len();
    let mut m = b.len();
    while n > 0 && m > 0 {
        if a[n - 1] == b[m - 1] {
            elements.push(a[n - 1].clone());
            n -= 1;
            m -= 1;
        } else if dp[n - 1][m] > dp[n][m - 1] {
            n -= 1;
        } else {
            m -= 1;
        }
    }
    elements.reverse();
    elements
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_lcs_length() {
        let a = vec![1, 4, 5, 6, 9, 10, 11];
        let b = vec![6, 4, 5, 9, 11];
        assert_eq!(longest_common_subsequence(&a, &b), 4);
    }

    #[test]
    fn test_lcs_reconstruct() {
        let a = vec![1, 4, 5, 6, 9, 10, 11];
        let b = vec![6, 4, 5, 9, 11];
        let dp = lcs_table(&a, &b);
        let lcs = reconstruct_elements(&dp, &a, &b);
        assert_eq!(lcs, vec![4, 5, 9, 11]);
    }
}
```

- `text_diff.rs`

```rs
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

/// Reads a file into a vector of lines.
pub fn read_file<P: AsRef<Path>>(path: P) -> io::Result<Vec<String>> {
    let file = File::open(path)?;
    io::BufReader::new(file).lines().collect()
}

/// Prints the differences between two files using LCS.
pub fn print_differences(file_a: &[String], file_b: &[String]) {
    let dp = crate::lcs::lcs_table(file_a, file_b);
    let lcs = crate::lcs::reconstruct_elements(&dp, file_a, file_b);

    let mut line_a = 0;
    let mut line_b = 0;

    for line in &lcs {
        while file_a[line_a] != *line {
            println!("- {}", file_a[line_a]);
            line_a += 1;
        }
        while file_b[line_b] != *line {
            println!("+ {}", file_b[line_b]);
            line_b += 1;
        }

        assert_eq!(file_a[line_a], file_b[line_b]);
        println!("  {}", file_a[line_a]);
        line_a += 1;
        line_b += 1;
    }

    while line_a < file_a.len() {
        println!("- {}", file_a[line_a]);
        line_a += 1;
    }

    while line_b < file_b.len() {
        println!("+ {}", file_b[line_b]);
        line_b += 1;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_print_differences() {
        let a = vec!["line1".to_string(), "line2".to_string(), "line3".to_string()];
        let b = vec!["line1".to_string(), "modified".to_string(), "line3".to_string()];
        print_differences(&a, &b);
    }
}
```

- 테스트해볼 main (이제 2개 파일을 비교해서 git diff를 만들어보자 !!)

```rs
use dsa_dynamic_programming::text_diff;
use std::{env, process};

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 3 {
        eprintln!("Usage: {} <file_a> <file_b>", args[0]);
        process::exit(1);
    }

    let file_a = match text_diff::read_file(&args[1]) {
        Ok(lines) => lines,
        Err(e) => {
            eprintln!("Error: Unable to open file {}: {}", args[1], e);
            process::exit(1);
        }
    };

    let file_b = match text_diff::read_file(&args[2]) {
        Ok(lines) => lines,
        Err(e) => {
            eprintln!("Error: Unable to open file {}: {}", args[2], e);
            process::exit(1);
        }
    };

    text_diff::print_differences(&file_a, &file_b);
}
```
