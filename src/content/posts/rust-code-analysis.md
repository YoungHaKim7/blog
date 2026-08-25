---
title: rust-code-analysis
published: 2025-08-25
description: 'Library to analyze and collect metrics on source code'
image: ''
tags: [analyze, debugging, profiling]
category: 'rust_Debugging_profiling'
draft: false 
lang: ''
---

# Library to analyze and collect metrics on source code
- https://github.com/mozilla/rust-code-analysis

## ebook
- https://mozilla.github.io/rust-code-analysis/

# Supported Metrics

- CC: it calculates the code complexity examining the control flow of a program.
- SLOC: it counts the number of lines in a source file.
- PLOC: it counts the number of physical lines (instructions) contained in a source file.
- LLOC: it counts the number of logical lines (statements) contained in a source file.
- CLOC: it counts the number of comments in a source file.
- BLANK: it counts the number of blank lines in a source file.
- HALSTEAD: it is a suite that provides a series of information, such as the effort required to maintain the analyzed code, the size in bits to store the program, the difficulty to understand the code, an estimate of the number of bugs present in the codebase, and an estimate of the time needed to implement the software.
- MI: it is a suite that allows to evaluate the maintainability of a software.
- NOM: it counts the number of functions and closures in a file/trait/class.
- NEXITS: it counts the number of possible exit points from a method/function.
- NARGS: it counts the number of arguments of a function/method.

## 지원되는 지표

```txt
CC: 프로그램의 제어 흐름을 검토하여 코드 복잡도를 계산합니다.
SLOC: 소스 파일의 줄 수를 셉니다.
PLOC: 소스 파일에 포함된 물리적 라인(명령어)의 수를 셉니다.
LLOC: 소스 파일에 포함된 논리 라인(문장)의 수를 셉니다.
CLOC: 소스 파일 내 주석의 개수를 셉니다.
BLANK: 소스 파일 내 빈 줄의 개수를 셉니다.
할스티드: 이는 분석된 코드를 유지하는 데 필요한 노력, 프로그램을 저장하는 비트 단위 크기, 코드를 이해하는 난이도, 코드베이스에 존재하는 버그 수 추정치, 그리고 소프트웨어 구현에 필요한 시간 추정치와 같은 일련의 정보를 제공하는 스위트입니다.
MI: 소프트웨어의 유지보수성을 평가할 수 있게 해주는 도구 모음입니다.
NOM: 파일, 속성, 클래스 내 함수와 클로저의 개수를 셉니다.
종료 지점(NEXITS): 메서드나 함수에서 나갈 수 있는 가능한 종료 지점의 수를 셉니다.
NARGS: 함수나 메서드의 인수 개수를 셉니다.
```
