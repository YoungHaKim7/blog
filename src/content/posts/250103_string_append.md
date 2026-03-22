---
title: 250103_string_append
published: 2025-01-03
description: '(concat , append) This keeps original data and adds new text after it.'
image: ''
tags: [rust, std]
category: 'rust'
draft: false 
lang: ''
---

# link

# Rust Code

```rs
#[derive(Debug)]
struct Young {
    data: String,
}

impl Young {
    fn new() -> Self {
        Self {
            data: "".to_string(),
        }
    }

    // append new text after original
    fn input(&mut self, x: &str) {
        self.data.push_str(x);
    }
}

fn main() {
    let my_da = Young {
        data: "young".to_string(),
    };

    let my_da02 = Young {
        data: "young".to_string(),
    };

    let data = Young::new();

    let mut data2 = my_da02;

    println!("Hello, world! {data:?}");
    println!("Hello, world! {data2:?}");

    data2.input("testtest");

    println!("After input: {data2:?}");
}
```

# Output

```bash
Hello, world! Young { data: "" }
Hello, world! Young { data: "young" }
After input: Young { data: "youngtesttest" }
```

# ✅ Why push_str is correct
- In Rust

| method     | meaning           |
| ---------- | ----------------- |
| `=`        | replace           |
| `+`        | move + concat     |
| `push_str` | append safely     |
| `format!`  | create new string |

