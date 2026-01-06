---
title: 260107_traits03_debug_display
published: 2026-01-07
description: 'rust std Traits(Debug, Display)'
image: ''
tags: [rust]
category: 'rust'
draft: false 
lang: ''
---

# `Debug` 구현하기
- derive macro를 써서 손 쉽게 구현

```rs
#[derive(Debug)]
struct Young {
    data: String,
}

fn main() {
    let my_str = Young {
        data: "test".to_string(),
    };
    println!("Debug {:?}", my_str);
}  
```

- 복잡한 타입일수록 내가 구현해줘야한다.
  - [Debug traits활용](https://doc.rust-lang.org/stable/std/fmt/trait.Debug.html)

```rs
use std::fmt;

struct Young {
    data: String,
}

impl fmt::Debug for Young {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.data)
    }
}

fn main() {
    let my_str = Young {
        data: "test".to_string(),
    };
    println!("Debug {:?}", my_str);
}
```

# Debug과 Display 구현은 똑같다.

- `{:?}` Debug
- `{}` Display
