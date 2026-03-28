---
title: 250104_string_impl_concat_default
published: 2025-01-04
description: 'Here’s your code cleaned up and extended with `push_str`, `push`, `concat`, and `join` examples in a clear, idiomatic Rust style:'
image: ''
tags: [rust, std]
category: 'rust'
draft: false 
lang: ''
---

# link

- [rust string append](../250103_string_append/)

<hr />

# Rust Code

- [rust code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/013_struct_impl/a01_string_new_concat_format_push_str)

```rs
#[derive(Debug)]
struct Young {
    data: String,
}

impl Default for Young {
    fn default() -> Self {
        Self {
            data: "my_default".to_string(),
        }
    }
}

impl Young {
    fn new() -> Self {
        Self {
            data: String::new(),
        }
    }

    // append string slice
    fn input(&mut self, x: &str) {
        self.data.push_str(x);
    }

    // push a single character
    fn push_char(&mut self, c: char) {
        self.data.push(c);
    }

    // concat using format!
    fn concat(&mut self, x: &str) {
        self.data = format!("{}{}", self.data, x);
    }

    // join multiple strings
    fn join_with(&mut self, parts: &[&str], sep: &str) {
        self.data = parts.join(sep);
    }
}

fn main() {
    let data = Young::new();

    let mut data2 = Young {
        data: "young".to_string(),
    };

    println!("Initial data:   {data:?}");
    println!("Initial data2:  {data2:?}");

    // push_str
    data2.input(" testtest");
    println!("After push_str: {data2:?}");

    // push (single char)
    data2.push_char('!');
    println!("After push:     {data2:?}");

    // concat
    data2.concat(" CONCAT");
    println!("After concat:   {data2:?}");

    // join
    let parts = ["Rust", "is", "fast"];
    data2.join_with(&parts, " ");
    println!("After join:     {data2:?}");

    // default

    let default_test = Young::default();
    println!("{default_test:?}");
}
```

- result

```bash
Initial data:   Young { data: "" }
Initial data2:  Young { data: "young" }
After push_str: Young { data: "young testtest" }
After push:     Young { data: "young testtest!" }
After concat:   Young { data: "young testtest! CONCAT" }
After join:     Young { data: "Rust is fast" }
Young { data: "my_default" }
```


