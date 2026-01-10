---
title: 240604_rust_String_utf8_simple01
published: 2024-06-04
description: 'Rust의 문자열 처리Vector_u8, utf8'
image: ''
tags: [rust, String, utf8, utf16]
category: 'rust'
draft: false 
lang: ''
---

# link

<hr />

# 출처 
- [Working with strings in Rust | Feb 19, 2020](https://fasterthanli.me/articles/working-with-strings-in-rust)

# Rust는 문자열을 uft-8로 처리한다.

- 기본적으로 `Vec<u8>`로 처리

- [Rust Code ex)](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/003_Rust_String/a01_utf8_string)


```rs
fn main() {
    let my_str = "안녕하세요.";
    for char in my_str.chars() {
        let code_point = char as u32;
        println!("문자 '{}': U+{:04X}", char, code_point);
    }
    // UTF-8 인코딩
    let utf8_encoded = my_str.as_bytes();
    println!("UTF-8 인코딩 결과: {:?}", utf8_encoded);

    // UTF-16 인코딩
    let utf16_encoded: Vec<u16> = my_str.encode_utf16().collect();
    println!("UTF-16 인코딩 결과: {:?}", utf16_encoded);
    // UTF-32 인코딩
    let utf32_encoded: Vec<u32> = my_str.chars().map(|c| c as u32).collect();
    println!("UTF-32 인코딩 결과: {:?}", utf32_encoded);

    println!();
    let my_str02 = "테스트";
    println!("테스트 : {:?}", my_str02.as_bytes());
}
```

- result

```bash
문자 '안': U+C548
문자 '녕': U+B155
문자 '하': U+D558
문자 '세': U+C138
문자 '요': U+C694
문자 '.': U+002E
UTF-8 인코딩 결과: [236, 149, 136, 235, 133, 149, 237, 149, 152, 236, 132, 184, 236, 154, 148, 46]
UTF-16 인코딩 결과: [50504, 45397, 54616, 49464, 50836, 46]
UTF-32 인코딩 결과: [50504, 45397, 54616, 49464, 50836, 46]

테스트 : [237, 133, 140, 236, 138, 164, 237, 138, 184]
```

