---
title: 260201_Serialize_Deserialize
published: 2026-02-01
description: 'CS 기초 | 직렬화(Serialize)와 역직렬화(Deserialize)란?'
image: ''
tags: [rust, db]
category: 'rust_DB'
draft: false 
lang: ''
---

# link

<hr />

# JSON 실제로 땡기고 싶을 때 쓰는 싸이트 굿
- https://jsonplaceholder.typicode.com/posts/1

<hr />

# CS 기초 | 직렬화(Serialize)와 역직렬화(Deserialize)란?

![img1 daumcdn](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/c87a6816-2b18-4651-a944-3427b8d3cdcf)
![serializationFile-1](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/7e7cca5f-768d-4690-9715-422c47a06873)

![serialize](https://github.com/user-attachments/assets/b5948273-78e0-4921-a9c6-16cfe960b0dd)

- Advanced VB.NET Programming – Serializing Objects with JSON | Computer Science
  - https://youtu.be/XGKroxBlx0I?si=RI85KA3lD5NaEde6

# 직렬화(Serialize)

프로그램의 object에 담긴 데이터를 어떤 외부 파일에 write 및 전송하는 것
 


# 역직렬화(Deserialize)

어떤 외부 파일의 데이터를 프로그램 내의 object로 read 해오는 것

https://woo-dev.tistory.com/101

https://sora9z.tistory.com/69

<hr>

# parsing-json-rust

  - https://www.shuttle.rs/blog/2024/01/18/parsing-json-rust

# Using Serde-rust

  - https://www.shuttle.rs/blog/2024/01/23/using-serde-rust


# (bebop)Json보다 1,000배가 빠르다는데 테스트 해보자

- rust crates.io
  - 한글 자료 https://news.hada.io/topic?id=13820&utm_source=discord&utm_medium=bot&utm_campaign=1480
  - https://crates.io/crates/bebop
  - github https://github.com/betwixt-labs/bebop

<hr>

# 데이터 넣고 빼기 Tutorial
- Hitchhiker's Guide to JSON Data in Rust 🦀 Serialize and Deserialize with Serde 🗺️ Rust Tutorial | Trevor Sullivan 
  - https://youtu.be/YLZtw8_aLwA?si=xtz1sRpN4ZP80Ys7

# What is the `r#""#` operator in Rust?

- https://stackoverflow.com/questions/26611664/what-is-the-r-operator-in-rust
- The r character at the start of a string literal denotes a raw string literal. It's not an operator, but rather a prefix.

In a normal string literal, there are some characters that you need to escape to make them part of the string, such as " and \. The " character needs to be escaped because it would otherwise terminate the string, and the \ needs to be escaped because it is the escape character.

In raw string literals, you can put an arbitrary number of # symbols between the r and the opening ". To close the raw string literal, you must have a closing ", followed by the same number of # characters as there are at the start. With zero or more # characters, you can put literal \ characters in the string (\ characters do not have any special meaning). With one or more # characters, you can put literal " characters in the string. If you need a " followed by a sequence of # characters in the string, just use the same number of # characters plus one to delimit the string. For example: r##"foo #"# bar"## represents the string foo #"# bar. The literal doesn't stop at the quote in the middle, because it's only followed by one #, whereas the literal was started with two #.

To answer the last part of your question, there's no way to have a string literal that evaluates variables in the current scope. Some languages, such as PHP, support that, but not Rust. You should consider using the format! macro instead. Note that for JSON, you'll still need to double the braces, even in a raw string literal, because the string is interpreted by the macro.
- 문자열 리터럴의 시작 부분에 있는 r 문자는 원시 문자열 리터럴을 나타냅니다. 연산자가 아니라 접두사입니다.

일반적인 문자열 리터럴에는 문자열의 일부로 만들기 위해 탈출해야 하는 문자들이 있습니다. 예를 들어, ""와 \\. 문자는 문자열을 종료하기 때문에 탈출해야 하고, \\는 탈출 문자이기 때문에 탈출해야 합니다.

원시 문자열 리터럴에서는 r과 오프닝 사이에 임의의 수의 # 기호를 넣을 수 있습니다. 원시 문자열 리터럴을 닫으려면 닫힘이 있어야 하고, 그 다음에 시작할 때와 동일한 수의 # 문자가 있어야 합니다. 0개 이상의 # 문자를 사용하면 문자열에 리터럴 \\ 문자를 넣을 수 있습니다(\\ 문자는 특별한 의미가 없습니다). 하나 이상의 # 문자를 사용하면 문자열에 리터럴 " 문자를 넣을 수 있습니다. 문자열에 "" 뒤에 # 문자 시퀀스가 필요한 경우 동일한 수의 # 문자와 하나를 사용하여 문자열을 구분합니다. 예를 들어, r#"foo #"#bar"#"#bar"#는 문자열 foo #"#bar를 나타냅니다. 리터럴은 중간에 따옴표에서 멈추지 않는데, 이는 하나의 # 뒤에 오는 문자가 두 개의 #으로 시작되었기 때문입니다.

질문의 마지막 부분에 답하기 위해 현재 범위에서 변수를 평가하는 문자열 리터럴을 사용할 방법이 없습니다. PHP와 같은 일부 언어에서는 이를 지원하지만 Rust는 지원하지 않습니다. 대신! macro 형식을 사용하는 것을 고려해야 합니다. JSON의 경우 문자열이 매크로에 의해 해석되기 때문에 원시 문자열 리터럴에서도 괄호를 두 배로 늘려야 합니다.


