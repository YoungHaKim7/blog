---
title: 260121_Get_rid_of_the_unwrap_Err_don_t_panic
published: 2026-01-21
description: 'unwrap() 과 expect()를 제거하는 훈련 &  일단 코드 돌려 놓고 최적화 하기  절대 panic나면 안되는거 훈련'
image: ''
tags: [rust, std]
category: 'rust'
draft: false 
lang: ''
---

# link

- [(table표로 한눈에 체크)상황에 맞게 써야하는 경우를 생각해 보자](#01-decision-table-use-this-in-real-code)

- [unwrap()을 지우고 다르게 대응하는 패턴을 연습해보자.(절대로 패닉이 나지 않게 training)](#unwrap을-지우고-다르게-대응하는-패턴을-연습해보자절대로-패닉이-나지-않게-training)

- [전문가처럼 러스트 코드를 가지고 놀아보자.기본을 익혔으니 실전이다~](#기본을-익혔으니-실전이다)

<hr />

# 0.1 Decision table (use this in real code)[|🔝|](#link)

|Situation|                              Pattern|
|-|-|
|Prototype / test             |         `unwrap()`|
|Fatal config error           |         `expect("why")`|
|Recover or log               |         `match` / `if let`|
|Return error to caller       |         `ok_or` + `?`|
|Library / public API         |         `Result` + custom error|
|Fallback value               |         `unwrap_or` / `unwrap_or_else`|

## 0. 2. Visual summary (CLI)

```rs
unwrap()
  None → 💥

expect("msg")
  None → 💥 "msg"

ok_or("msg")
  None → Err("msg")

match
  None → your logic
```

## 0. 3. Final Rust wisdom 🧠

> `unwrap()` asserts correctness
> `expect()` explains correctness
> `ok_or()` propagates correctness
> `match` controls correctness


<hr />

# 1. `unwrap()` — “This must exist”[|🔝|](#link)

- Use when:
  - None indicates a programmer bug and should never happen.
- 사용할 때:
  - 프로그래머 버그를 나타내는 것은 없으며 절대 발생해서는 안 됩니다.

- Mental model

```rs
Option<T>
   |
   |-- Some(T)  → continue
   |-- None     → 💥 panic (bug)
```

### Option타입을 `unwrap()`을 하게 되면 panic이 발생[|🔝|](#link)

```rs
fn main() {
    let x: Option<i32> = None;
    let v = x.unwrap(); // 💥 panic
}
```

- error화면

```bash
thread 'main' (66097) panicked at src/main.rs:3:15:
called `Option::unwrap()` on a `None` value
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

## 2. Why does `unwrap()` panic?[|🔝|](#link)

- Because its definition explicitly panics on None.
- Conceptually, unwrap() is implemented like this:
- 그 정의가 명시적으로 '없음'에 대해 패닉을 일으키기 때문입니다.
- 개념적으로 Unwrap()은 다음과 같이 구현됩니다:

```rs
match self {
    Some(v) => v,
    None => panic!("called `Option::unwrap()` on a `None` value"),
}
```

## 3. Important contrast: `unwrap()` vs `debug_assert!`[|🔝|](#link)

- This is where people get confused.
- 사람들이 혼란스러워하는 부분입니다.

```rs
debug_assert!(opt.is_some());
let v = opt.unwrap();
```

- `debug_assert!` may be removed in release
- `unwrap()` is never removed

- So this still panics in release if `opt` is `None`.
  - 따라서 'opt'가 '없음'인 경우 릴리스에서 여전히 패닉 상태입니다.

## 4. When is `unwrap()` acceptable?[|🔝|](#link)

- `unwrap()` is acceptable only if you can prove None is impossible.
  - `unwrap()`은 `None`이 불가능하다는 것을 증명할 수 있을 때만 허용됩니다.
- Examples:
- Tests

```rs
let v = parse("123").unwrap();
```

- Proven invariants
- 증명된 불변량

```rs
let first = vec.first().unwrap(); // vec known non-empty
```
- After explicit check
  - 명시적인 확인 후

```rs
if opt.is_none() {
    return;
}
let v = opt.unwrap(); // safe by logic
```

## 5. When should you avoid `unwrap()`?[|🔝|](#link)

- Avoid it when:
  - Input comes from users
  - Reading config / files / env
  - Writing libraries
  - Failure is recoverable
  - You want custom error handling

- Use instead:
  - `expect("...")`
  - `ok_or(...)`
  - `match`
  - `?`

- 다음과 같은 경우 피하세요:
  - 사용자로부터 입력을 받습니다
  - 구성 / 파일 / 환경 읽기
  - 도서관(libraries) 쓰기
  - 실패는 회복 가능합니다
  - 사용자 지정 오류 처리를 원합니다

## 6. Final mental model 🧠[|🔝|](#link)

```rs
unwrap() = "I guarantee this is Some"
```

- If that guarantee is wrong → panic.
- Or even shorter:
- 그 보장이 틀렸다면 → 패닉입니다.
- 또는 더 짧게:


> `unwrap()` is a runtime assertion. If it fails, the program crashes.

> `언랩()`은 런타임 어설션입니다. 실패하면 프로그램이 충돌합니다.

# unwrap()을 지우고 다르게 대응하는 패턴을 연습해보자.(절대로 패닉이 나지 않게 training)
- 이 코드는 절대 panic이 나면 안된다는 패턴

## 2.1.Pattern 1(이건 패닉남 ㅋ) — `expect()` (panic, but with meaning)[|🔝|](#link)

```rs
let port = config.port
    .expect("config.port must be set (check config.toml)");
```

- Behavior

```rs
Some(v) → v
None    → panic("config.port must be set (check config.toml)")
```

- CLI flow

```rs
Option
 ├─ Some → OK
 └─ None → PANIC 💥 (custom message)
```
- ✅ Best replacement for `unwrap()`

## 2.2. Pattern 2 — match with custom error handling[|🔝|](#link)
- Use when:
  - You want full control
  - Possibly logging, fallback, or recovery


```rs
let value = match opt {
    Some(v) => v,
    None => {
        eprintln!("missing value: opt was None");
        return;
    }
};
```

- CLI flow

```rs
Option
 ├─ Some → use value
 └─ None → custom logic (log / return / default)
```

- ✅ Most explicit
- ❌ Verbose

## 2.3. Pattern 3 — `ok_or()` / `ok_or_else()` (idiomatic & powerful)[|🔝|](#link)

- Use when:
  - You want to return a Result
  - Custom error message

```rs
fn get_port(opt: Option<u16>) -> Result<u16, String> {
    opt.ok_or("port is missing".to_string())
}
```

- Or lazily:

```rs
opt.ok_or_else(|| format!("port missing at {}", file!()))
```

- CLI flow

```rs
Option
 ├─ Some → Ok(value)
 └─ None → Err(custom_error)
```

- ✅ Highly idiomatic
- ✅ Works perfectly with ?

## 2.4. Pattern 4 — `?` with `Option` → `Result`

- Use when:
  - You want clean propagation
  - No panic
- 사용할 때:
  - 깨끗한 전파를 원합니다
  - 당황하지 마세요

```rs
fn read_user(opt: Option<String>) -> Result<String, &'static str> {
    let user = opt.ok_or("user not provided")?;
    Ok(user)
}
```

- CLI flow

```rs
None → Err("user not provided") → return early
```

- This is the Rust way™ for libraries.

## 2.5. Pattern 5 — `if let` with custom message[|🔝|](#link)

- Use when:
  - Only care about Some
  - Clean syntax

- 사용할 때:
  - 일부에 대해서만 신경 씁니다
  - 깨끗한 구문

```rs
let value = if let Some(v) = opt {
    v
} else {
    panic!("expected value, found None");
};
```

- ⚠️ Panics, but readable.

## 2.7. Pattern 6 — unwrap_or_else() (panic or fallback)[|🔝|](#link)

- Custom panic message

```rs
let v = opt.unwrap_or_else(|| {
    panic!("opt must exist before calling process()");
});
```

- Fallback instead of panic

```rs
let v = opt.unwrap_or_else(|| default_value());
```

## 2.8. Pattern 7 — Convert to your own error type[|🔝|](#link)

- Professional-grade pattern 

```rs
#[derive(Debug)]
enum ConfigError {
    MissingPort,
}

fn get_port(opt: Option<u16>) -> Result<u16, ConfigError> {
    opt.ok_or(ConfigError::MissingPort)
}
```

- CLI flow

```rs
Option
 ├─ Some → Ok
 └─ None → Err(ConfigError::MissingPort)
```

- ✅ Best for libraries
- ✅ Scales well

# 9. Anti-patterns (avoid these ❌)[|🔝|](#link)

- ❌ Blind unwrap
```rs
opt.unwrap();
```

- ❌ Meaningless expect

```rs
opt.expect("None"); // useless
```

- ❌ Panic in library code

```rs
pub fn api() {
    opt.expect("missing"); // BAD
}
```

<hr />


# 기본을 익혔으니 실전이다~[|🔝|](#link)

- [다양한 에러 관리 예시 코드](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/005_std_Collections/030_Result_Err_Option/result_option_training)

```rs
// 10 Examples of Error Management WITHOUT unwrap/expect
// All examples use idiomatic Result-based error handling

#![allow(dead_code)]

use std::fmt;
use std::fs;
use std::io::{self, Read, Write};
use std::num::ParseIntError;

// ============================================================================
// Example 1: Basic ok_or() Pattern - Option → Result
// ============================================================================
#[derive(Debug, PartialEq)]
enum ConfigError {
    MissingKey(String),
}

fn get_config_value(map: &std::collections::HashMap<String, String>, key: &str) -> Result<String, ConfigError> {
    map.get(key)
        .cloned()
        .ok_or_else(|| ConfigError::MissingKey(key.to_string()))
}

#[test]
fn ex1_basic_ok_or() {
    let mut map = std::collections::HashMap::new();
    map.insert("host".to_string(), "localhost".to_string());

    assert_eq!(get_config_value(&map, "host"), Ok("localhost".to_string()));
    assert_eq!(get_config_value(&map, "port"), Err(ConfigError::MissingKey("port".to_string())));
}

// ============================================================================
// Example 2: String Parsing with ? Operator
// ============================================================================
fn parse_port(s: &str) -> Result<u16, ParseIntError> {
    let port: u16 = s.parse()?;  // ? propagates the error
    Ok(port)
}

#[test]
fn ex2_parse_with_question_mark() {
    assert_eq!(parse_port("8080"), Ok(8080));
    assert!(parse_port("abc").is_err());
    assert!(parse_port("99999").is_err());  // Too large for u16
}

// ============================================================================
// Example 3: Full Error Enum with Display + std::error::Error
// ============================================================================
#[derive(Debug)]
enum AppError {
    MissingConfig(&'static str),
    InvalidPort(u16),
    Io(io::Error),
    Parse(ParseIntError),
}

impl fmt::Display for AppError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            AppError::MissingConfig(key) => write!(f, "Missing config key: {}", key),
            AppError::InvalidPort(port) => write!(f, "Invalid port: {} (must be 1-65535)", port),
            AppError::Io(err) => write!(f, "IO error: {}", err),
            AppError::Parse(err) => write!(f, "Parse error: {}", err),
        }
    }
}

impl std::error::Error for AppError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            AppError::Io(err) => Some(err),
            AppError::Parse(err) => Some(err),
            _ => None,
        }
    }
}

// ============================================================================
// Example 4: Chaining Multiple ? Operations
// ============================================================================
fn load_and_validate(config_str: &str) -> Result<u16, AppError> {
    // Simulated config loading
    let port_str = config_str
        .lines()
        .find(|line| line.starts_with("port="))
        .map(|line| line.trim_start_matches("port="))
        .ok_or(AppError::MissingConfig("port"))?;

    let port: u16 = port_str.parse().map_err(AppError::Parse)?;

    if port == 0 {
        return Err(AppError::InvalidPort(port));
    }

    Ok(port)
}

#[test]
fn ex4_chaining_question_mark() {
    assert!(matches!(load_and_validate("port=8080"), Ok(8080)));
    assert!(matches!(load_and_validate("port=0"), Err(AppError::InvalidPort(0))));
    assert!(matches!(load_and_validate("port=abc"), Err(AppError::Parse(_))));
    assert!(matches!(load_and_validate("host=localhost"), Err(AppError::MissingConfig(_))));
}

// ============================================================================
// Example 5: File I/O without unwrap
// ============================================================================
fn read_file_contents(path: &str) -> Result<String, AppError> {
    let mut file = fs::File::open(path).map_err(AppError::Io)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents).map_err(AppError::Io)?;
    Ok(contents)
}

fn write_file_contents(path: &str, data: &str) -> Result<(), AppError> {
    let mut file = fs::File::create(path).map_err(AppError::Io)?;
    file.write_all(data.as_bytes()).map_err(AppError::Io)?;
    Ok(())
}

// ============================================================================
// Example 6: Result combinator - map()
// ============================================================================
fn get_port_or_default(result: Result<u16, AppError>) -> u16 {
    result.map(|port| port).unwrap_or(8080)  // unwrap_or is OK! It's not unwrap()
}

fn double_if_ok(value: Result<i32, AppError>) -> Result<i32, AppError> {
    value.map(|v| v * 2)
}

#[test]
fn ex6_result_map() {
    assert!(matches!(double_if_ok(Ok(5)), Ok(10)));
    assert!(double_if_ok(Err(AppError::MissingConfig("x"))).is_err());
}

// ============================================================================
// Example 7: Result combinator - and_then()
// ============================================================================
fn parse_then_validate(s: &str) -> Result<u16, AppError> {
    s.parse::<u16>()
        .map_err(AppError::Parse)
        .and_then(|port| {
            if port == 0 {
                Err(AppError::InvalidPort(port))
            } else {
                Ok(port)
            }
        })
}

#[test]
fn ex7_and_then() {
    assert!(matches!(parse_then_validate("8080"), Ok(8080)));
    assert!(matches!(parse_then_validate("0"), Err(AppError::InvalidPort(0))));
    assert!(matches!(parse_then_validate("abc"), Err(AppError::Parse(_))));
}

// ============================================================================
// Example 8: Combining Multiple Results - collect()
// ============================================================================
fn parse_all_ports(inputs: &[&str]) -> Result<Vec<u16>, AppError> {
    inputs
        .iter()
        .map(|s| s.parse::<u16>().map_err(AppError::Parse))
        .collect()
}

#[test]
fn ex8_collect_results() {
    assert!(matches!(parse_all_ports(&["80", "443", "8080"]), Ok(ports) if ports == &[80, 443, 8080]));
    assert!(parse_all_ports(&["80", "abc", "8080"]).is_err());
}

// ============================================================================
// Example 9: Enriching Error Context
// ============================================================================
#[derive(Debug)]
enum EnrichedError {
    ConfigLoadFailed { key: String, source: io::Error },
    InvalidValue { key: String, value: String },
}

impl fmt::Display for EnrichedError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            EnrichedError::ConfigLoadFailed { key, source } => {
                write!(f, "Failed to load config key '{}': {}", key, source)
            }
            EnrichedError::InvalidValue { key, value } => {
                write!(f, "Invalid value '{}' for key '{}'", value, key)
            }
        }
    }
}

impl std::error::Error for EnrichedError {}

fn load_config_with_context(path: &str, key: &str) -> Result<String, EnrichedError> {
    let contents = fs::read_to_string(path).map_err(|e| EnrichedError::ConfigLoadFailed {
        key: key.to_string(),
        source: e,
    })?;

    contents
        .lines()
        .find_line(|line| line.starts_with(&format!("{}=", key)))
        .map(|line| line.trim_start_matches(&format!("{}=", key)))
        .ok_or_else(|| EnrichedError::InvalidValue {
            key: key.to_string(),
            value: "<not found>".to_string(),
        })
        .map(|s| s.to_string())
}

// Helper trait for the example above
trait FindLine: Iterator {
    fn find_line<F>(&mut self, pred: F) -> Option<Self::Item>
    where
        F: FnMut(&Self::Item) -> bool;
}

impl<I: Iterator> FindLine for I {
    fn find_line<F>(&mut self, mut pred: F) -> Option<Self::Item>
    where
        F: FnMut(&Self::Item) -> bool,
    {
        self.find(|x| pred(x))
    }
}

// ============================================================================
// Example 10: From Trait for Automatic Error Conversion
// ============================================================================
#[derive(Debug)]
enum UnifiedError {
    Io(io::Error),
    Parse(ParseIntError),
    Custom(String),
}

impl From<io::Error> for UnifiedError {
    fn from(err: io::Error) -> Self {
        UnifiedError::Io(err)
    }
}

impl From<ParseIntError> for UnifiedError {
    fn from(err: ParseIntError) -> Self {
        UnifiedError::Parse(err)
    }
}

impl fmt::Display for UnifiedError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            UnifiedError::Io(e) => write!(f, "IO error: {}", e),
            UnifiedError::Parse(e) => write!(f, "Parse error: {}", e),
            UnifiedError::Custom(msg) => write!(f, "Custom error: {}", msg),
        }
    }
}

impl std::error::Error for UnifiedError {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            UnifiedError::Io(e) => Some(e),
            UnifiedError::Parse(e) => Some(e),
            UnifiedError::Custom(_) => None,
        }
    }
}

// Now ? works automatically for io::Error and ParseIntError!
fn read_port_from_file(path: &str) -> Result<u16, UnifiedError> {
    let contents = fs::read_to_string(path)?;  // io::Error → UnifiedError automatically
    let port: u16 = contents.trim().parse()?;  // ParseIntError → UnifiedError automatically
    Ok(port)
}

// ============================================================================
// Bonus: Type-safe error handling with thiserror crate pattern
// ============================================================================
// In real projects, use the thiserror crate for cleaner code:
/*
use thiserror::Error;

#[derive(Error, Debug)]
enum ModernError {
    #[error("Missing config: {0}")]
    MissingConfig(String),
    #[error("IO error: {0}")]
    Io(#[from] io::Error),
    #[error("Parse error: {0}")]
    Parse(#[from] ParseIntError),
}
*/

fn main() {
    println!("Run with: cargo test -- --nocapture");
}
```



