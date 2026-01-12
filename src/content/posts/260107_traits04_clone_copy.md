---
title: 260107_traits04_clone_copy
published: 2026-01-07
description: 'Clone, Copy Traits'
image: ''
tags: [rust, traits, std]
category: 'rust'
draft: false 
lang: ''
---

# `Clone` 구현하기
- derive macro를 써서 손 쉽게 구현

- error code
  - OwnerShip(오너쉽) 위반으로 실행 되지 않는다.

```rs
struct Young {
    data: String,
}

fn main() {
    let my_data = Young {
        data: "test".to_string(),
    };

    let my_data_clone = my_data;

    println!("my_data : {:?}", my_data);
}
```

- `cargo r`을 하게 되면 러스트가 Clone을 구현하라고 에러메세지를 알려준다.
```bash
consider implementing `Clone` for this type
...

```

- 복잡한 타입일수록 내가 구현해줘야한다.
  - [Clone traits활용](https://doc.rust-lang.org/stable/std/clone/trait.Clone.html)

- derive macro를 써서 날로 먹어도 되고

```rs
#[derive(Debug, Clone)]
struct Young {
    data: String,
}

fn main() {
    let my_data = Young {
        data: "test".to_string(),
    };

    let my_data_clone = my_data.clone();

    println!("my_data : {:?}", my_data);
}
```

- `Clone` 을 구현해 보자
  - 코드가 복잡할 수록 내가 구현 할줄 알아야한다.
  - Rust 는 Zero Cost Abstraction이라는 것만 기억하면된다.
  - 등가교환이다. 꽁짜는 없다.

```rs
#[derive(Debug)]
struct Young {
    data: String,
}

impl Clone for Young {
    fn clone(&self) -> Self {
        Self {
            data: self.data.clone(),
        }
    }
}

fn main() {
    let my_data = Young {
        data: "test".to_string(),
    };

    let my_data_clone = my_data.clone();

    println!("my_data : {:?}", my_data);
}
```
