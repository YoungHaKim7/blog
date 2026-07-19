---
title: 260110_001FP_Functional_Programming
published: 2026-01-10
description: '001 러스트 개발자가 되기 위한 Functional Programming 기초 필수 지식'
image: ''
tags: [rust, haskell, FP, Functional]
category: 'z_haskell'
draft: false 
lang: ''
---

# link
- [FP FP프로그래밍의 특징 7가지](#fp프로그래밍의-특징-7가지)
- [haskell하스켈 코드 (add, squre, max , isEven, abs 예시)](#haskell)
- [(270719)핵심 정리 1줄로 이해하기FP_Functional_Programming_Basic001](../260719_fp_functional_programming_basic001/)

# Summary

- 러스트 개발자가 되기 위한 Functional Programming 기초 필수 지식
- 기존 생각은 다 지워버리고 FP로 두뇌를 세팅 해야 합니다
- 작동 원리가 완전히 틀림
  - Haskell code를 보면서 함수형 프로그래밍의 감을 잡는다.

# 출처: 

- [FP 영상 모아보기](https://youtube.com/playlist?list=PLA_-EWSPTJcu4i7RFCl_KeGrrz37C4_Oc&si=Hus4TzJtODo6bGI6)


# FP프로그래밍의 특징 7가지[|🔝|](#link)

# 1. Core Principles of Functional Programming (FP)[|🔝|](#link)

- Functional programming is based on mathematical functions, not procedures.

- Key ideas (in simple terms)
  - 1. Pure functions
    - Same input → same output
    - No side effects

  - 2. Immutability
    - Values never change
    - “Modify” means “create a new value”

  - 3. Functions are values
    - Can be passed, returned, stored

  - 4. Higher-order functions
    - Functions that take other functions

  - 5. Referential transparency
    - An expression can be replaced by its value

  - 6. Composition over mutation
    - Build programs by combining small functions

  - 7. Lazy evaluation
    - Compute only when needed

- Haskell enforces these ideas by design, which makes it the ideal teaching language.

- 기능 프로그래밍은 절차가 아닌 수학적 기능을 기반으로 합니다.

- 주요 아이디어 (간단한 용어로)
  - 1. 순수 함수
    - 동일한 입력 → 동일한 출력
    - 부작용 없음

  - 2. 불변성
    - 가치는 변하지 않는다
    - "수정"은 "새로운 가치 창출"을 의미합니다

  - 3. 함수는 가치입니다
    - 통과, 반환, 저장 가능

  - 4. 고차 함수
    - 다른 함수를 취하는 함수

  - 5. 참조 투명성
    - 표현식은 그 값으로 대체할 수 있습니다

  - 6. 돌연변이에 대한 구성
    - 작은 함수들을 결합하여 프로그램을 구축하세요

  - 7. 게으른 평가
    - 필요할 때만 계산

- 해스켈은 이러한 아이디어를 디자인으로 구현하여 이상적인 교육 언어로 만듭니다.


# haskell[|🔝|](#link)

- add

```hs
add :: Int -> Int -> Int
add x y = x + y

main :: IO ()
main = do
    let result = add 3 5
    print result
```

```bash
ghc --make Main

# 실행파일이 생긴다. Main

8
```

-  add , square, double
- [code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/001_FP_Functional_Programming/001_Core_Principle_of_FP/a02_square_double_minus)

```hs
add :: Int -> Int -> Int
add x y = x + y

square :: Int -> Int
square x = x * x

double :: Int -> Int
double x = x * 2

main :: IO ()
main = do
    let result = add 3 5
    print result

    let res_square = square 3
    print res_square

    let res_double = double 9
    print res_double
```



-  짝수, max, ABS

```hs
-- isEven
isEven :: Int -> Bool
isEven x = x `mod` 2 == 0

-- max
max2 :: Int -> Int -> Int
max2 x y = if x > y then x else y

-- abs
absVal :: Int -> Int
absVal x = if x < 0 then -x else x

main :: IO ()
main = do
    let result = isEven 2
    print result

    let res_max = max2 10 8
    print res_max

    let res_absval = absVal (-20)
    print res_absval
```

