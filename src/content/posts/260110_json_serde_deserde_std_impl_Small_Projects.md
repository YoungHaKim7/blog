---
title: 260110_json_serde_deserde_std_impl_Small_Projects
published: 2026-01-10
description: 'rust std만 이용해서 나만의 serde_json을 만들어보자'
image: ''
tags: [rust, SmallProjects, serialization, deserialization ]
category: 'rust'
draft: false 
lang: ''
---

# link

<hr />

# Summary
- std만 이용해서 나만의 serde_json을 만들어보자.
  - HashMap스타일로 키값과 value가 나오는 스타일로 만듬.
  - 많이 허접하지만 기본 원리를 익힌다 생각하자.

# Rust
- json 샘플파일
  - https://jsonplaceholder.typicode.com/posts/1

- `lib.rs`
  - [Rust Code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/999_Small_Projects/json_serde_impl)

```rs
#[derive(Debug)]
pub struct RawJsonSerde {
    pub title: String,
    pub value: String,
}

#[derive(Debug)]
pub struct RawJsonDeserde {
    pub title: String,
    pub value: String,
}

// Simple JSON serializer using only std
impl RawJsonSerde {
    pub fn to_json(&self) -> String {
        format!(
            r#"{{"title":"{}","value":"{}"}}"#,
            escape_json_string(&self.title),
            escape_json_string(&self.value)
        )
    }
}

// Simple JSON deserializer using only std
impl RawJsonDeserde {
    pub fn from_json(json: &str) -> Result<Self, String> {
        let json = json.trim();

        if !json.starts_with('{') || !json.ends_with('}') {
            return Err("Invalid JSON: missing braces".to_string());
        }

        let content = &json[1..json.len() - 1];
        let mut title = String::new();
        let mut value = String::new();

        // Parse title field: look for "title":"value"
        if let Some(start) = content.find(r#""title":"#) {
            let value_start = start + 8; // Skip "title": (8 chars: quote + title + quote + colon)
            // Skip any whitespace after the colon
            let after_whitespace = &content[value_start..].trim_start();
            // Skip the opening quote of the value
            let after_opening_quote = &after_whitespace[1..];
            if let Some(end) = find_json_string_end(after_opening_quote) {
                title = unescape_json_string(&after_opening_quote[..end]);
            }
        }

        // Parse value field: look for "value":"data" or "body":"data"
        let value_pattern = if content.contains(r#""value":"#) {
            r#""value":"#
        } else if content.contains(r#""body":"#) {
            r#""body":"#
        } else {
            ""
        };

        if !value_pattern.is_empty() {
            if let Some(start) = content.find(value_pattern) {
                let value_start = start + value_pattern.len(); // Skip "value":" or "body":"
                // Skip any whitespace after the colon
                let after_whitespace = &content[value_start..].trim_start();
                // Skip the opening quote of the value
                let after_opening_quote = &after_whitespace[1..];
                if let Some(end) = find_json_string_end(after_opening_quote) {
                    value = unescape_json_string(&after_opening_quote[..end]);
                }
            }
        }

        if title.is_empty() && value.is_empty() {
            return Err("Invalid JSON: missing fields".to_string());
        }

        Ok(RawJsonDeserde { title, value })
    }
}

// Helper: Escape special characters in JSON strings
fn escape_json_string(s: &str) -> String {
    let mut result = String::with_capacity(s.len());
    for c in s.chars() {
        match c {
            '\\' => result.push_str("\\\\"),
            '"' => result.push_str("\\\""),
            '\n' => result.push_str("\\n"),
            '\r' => result.push_str("\\r"),
            '\t' => result.push_str("\\t"),
            _ => result.push(c),
        }
    }
    result
}

// Helper: Find the end of a JSON string (handling escaped quotes)
// Input should NOT include the opening quote
fn find_json_string_end(s: &str) -> Option<usize> {
    let mut chars = s.chars().peekable();
    let mut pos = 0;

    while let Some(c) = chars.next() {
        match c {
            '\\' => {
                // Skip next character (escape sequence)
                pos += c.len_utf8();
                if let Some(escaped_char) = chars.next() {
                    pos += escaped_char.len_utf8();
                }
            }
            '"' => return Some(pos),
            _ => {
                pos += c.len_utf8();
            }
        }
    }
    None
}

// Helper: Unescape JSON string
fn unescape_json_string(s: &str) -> String {
    let mut result = String::with_capacity(s.len());
    let mut chars = s.chars().peekable();

    while let Some(c) = chars.next() {
        if c == '\\' {
            if let Some(next) = chars.next() {
                match next {
                    '\\' => result.push('\\'),
                    '"' => result.push('"'),
                    'n' => result.push('\n'),
                    'r' => result.push('\r'),
                    't' => result.push('\t'),
                    _ => {
                        result.push(c);
                        result.push(next);
                    }
                }
            }
        } else {
            result.push(c);
        }
    }
    result
}

```


- test코드

```rs

use json_serde_impl::*;

#[test]
fn serde_data() {
    let raw_json = RawJsonSerde {
        title: "Hello \"World\"".to_string(),
        value: "Test\\Value".to_string(),
    };

    let json_string = raw_json.to_json();
    assert!(json_string.contains("title"));
    assert!(json_string.contains("value"));

    let desered = RawJsonDeserde::from_json(&json_string).unwrap();
    assert_eq!(desered.title, "Hello \"World\"");
    assert_eq!(desered.value, "Test\\Value");
}

#[test]
fn serde_simple() {
    let data = RawJsonSerde {
        title: "Test Title".to_string(),
        value: "Test Value".to_string(),
    };

    let json = data.to_json();
    let parsed = RawJsonDeserde::from_json(&json).unwrap();

    assert_eq!(parsed.title, "Test Title");
    assert_eq!(parsed.value, "Test Value");
}

#[test]
fn deserde_invalid_json() {
    let result = RawJsonDeserde::from_json("not json");
    assert!(result.is_err());
}

#[test]
fn input_json() {
    let json_data = include_str!("../assets/input.json");
    let parsed = RawJsonDeserde::from_json(&json_data).unwrap();
    println!("{parsed:#?}");
}
```

- assets JSON파일

```json
{
  "userId": 1,
  "id": 10,
  "title": "optio molestias id quia eum",
  "body": "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error"
}

```

