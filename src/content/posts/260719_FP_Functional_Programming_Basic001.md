---
title: 260719_FP_Functional_Programming_Basic001
published: 2026-07-19
description: 'Functional programming is a style of programming that emphasizes the evaluation of expressions, rather than execution of commands. '
image: ''
tags: [FP, FunctionalProgramming]
category: 'zFP_FunctionalProgramming'
draft: false 
lang: ''
---

# link

- [초반에 정리한 blog글_FP FP프로그래밍의 특징 7가지(Haskell 코드로 이해)](../260110_001fp_functional_programming/)

- Blog정리중(260717)
  - https://younghakim7.github.io/blog/posts/260110_001fp_functional_programming/

- 외국 유튜브 영상
  - [영상모아보기 2022) Functional Programming | Missing CS Courses](https://youtube.com/playlist?list=PLA_-EWSPTJcu4i7RFCl_KeGrrz37C4_Oc&si=ZKhWyyLLwTzY13dN)

- C++좋은 책
  - [2018년도 책 Ivan Cukic | Functional Programming in C++: How to improve your C++ programs using functional techniques](https://www.amazon.com/Functional-Programming-programs-functional-techniques/dp/B0978262WN/)

  - [C++ 함수형 프로그래밍)C++과 함수형 프로그래밍 패러다임의 만남 PDF | 알렉산드루 볼보아카 저 최동훈 역 | 에이콘출판사 2024.12.02.](https://m.yes24.com/goods/detail/139862891)
    - 원서 : Hands-On Functional Programming with C++: An effective guide to writing accelerated functional code using C++17 and C++20

<hr />
 
# FP(Functional programming) 기본 개념
- ‘Functional programming is a style of programming that emphasizes the evaluation of expressions, rather than execution of commands. The expressions in these languages are formed by using functions to combine basic values. A functional language is a language that supports and encourages programming in a functional style.
—FAQ for comp.lang.functional’

- 함수형 프로그래밍은 명령 실행보다 표현식의 평가를 강조하는 프로그래밍 스타일입니다. 이러한 언어의 표현은 기본 값을 결합하기 위해 함수를 사용하여 형성됩니다. 함수형 언어는 함수형 스타일의 프로그래밍을 지원하고 장려하는 언어입니다.

—Comp.lang.functional에 대한 FAQ

- 다음에서 발췌
  -  Functional Programming in C++
    - Ivan Čukić

# 함수형 프로그래밍(Functional Programming)이란?

## Concept

> Avoids changing State and Mutable data

- 상태와 Data를 변경하는 것을 피하면서 프로그래밍하는 것입니다.
- 즉 대입문[assignment statements] 없이 프로그래밍하는 것입니다.

## 일급 시민(First-class citizens)
- 함수를 일급 시민으로 관리하겠다

### 일급 시민이 된다는 것은 무엇을 의미할까요?
- Argument로 전달할 수 있다는 의미. → 함수가 Argument로 전달될 수 있다.
- 함수의 Return값이 될 수 있다는 의미. → Return값이 함수가 될 수 있다.
- 값을 수정하기도, 값을 할당할 수도 있다는 의미. → 함수를 값처럼 할당하기도 수정도 할 수 있다.

### 일급 시민은 누가 있을까요?
- value
- type
- object
- entity

- https://nesoy.github.io/blog/Functional-Programming


# monads의 장점
- Haskell과 다른 함수 언어는 자주 monads를 사용하여 순수 함수로부터 부작용을 격리하고 캡슐화합니다. 모나드의 주제는 책을 쓸 수 있을 정도로 깊기 때문에, 나중을 기약하겠습니다.
- https://sungjk.github.io/2017/07/17/fp.html

# C++)Functional Programming in C++ Code Examples
- https://gitlab.com/manning-fpcpp-book

# Functional programming (FP) 
- Functional programming (FP) is a paradigm that treats computation as the evaluation of mathematical functions. It avoids changing states and mutable data, relying instead on pure functions and immutable variables to make code more predictable, easier to test, and highly scalable.

- The core concepts of functional programming include
  - Pure Functions: Functions that always return the exact same output for the same input and have no observable side effects (such as modifying a global variable or saving to a database).
  - Immutability: Data cannot be modified after it is created. To change a value, you must create a new copy of it, which eliminates the risk of hidden changes occurring elsewhere in your application.
  - First-Class Functions: Functions are treated just like any other data type; they can be stored in variables, passed as arguments to other functions, or returned from them.
  - Higher-Order Functions: Functions that take other functions as arguments or return them. They are heavily used to replace traditional looping constructs (e.g., using `map`, `filter`, and `reduce` in Javascript or Python).
- Because FP avoids state changes, it is highly favored for writing concurrent, multi-threaded software where thread safety and data consistency are critical.

- For a high-level overview of the principles of functional programming and how it differs from traditional object-oriented approaches:

기능 프로그래밍(FP) 
- 함수형 프로그래밍(FP)은 계산을 수학적 함수의 평가로 취급하는 패러다임입니다. 이는 상태 변화와 가변 데이터를 피하고 대신 순수 함수와 불변 변수에 의존하여 코드를 더 예측 가능하고 테스트하기 쉬우며 확장성이 높습니다.

- 기능 프로그래밍의 핵심 개념은 다음과 같습니다
  - 순수 함수: 동일한 입력에 대해 항상 동일한 출력을 반환하고 관찰 가능한 부작용(예: 전역 변수 수정 또는 데이터베이스 저장)이 없는 함수.
  - 불변성: 데이터는 생성된 후에는 수정할 수 없습니다. 값을 변경하려면 새 복사본을 만들어야 하므로 애플리케이션의 다른 곳에서 숨겨진 변경 사항이 발생할 위험이 제거됩니다.
  - 퍼스트 클래스 함수: 함수는 다른 데이터 유형과 마찬가지로 취급되며, 변수에 저장되거나 다른 함수에 인수로 전달되거나 반환될 수 있습니다.
  - 고차 함수: 다른 함수를 인수로 사용하거나 반환하는 함수입니다. 이 함수들은 전통적인 루프 구조(예: 자바스크립트 또는 파이썬에서 '맵', '필터', '축소' 사용)를 대체하는 데 많이 사용됩니다.
- FP는 상태 변경을 피하기 때문에 스레드 안전성과 데이터 일관성이 중요한 동시 멀티 스레드 소프트웨어를 작성하는 데 매우 선호됩니다.

- 기능 프로그래밍의 원칙과 기존 객체 지향 접근 방식과의 차이점에 대한 고급 개요를 보려면:
- https://en.wikipedia.org/wiki/Functional_programming

