---
title: 250101_0001_std_training_array
published: 2025-01-01
description: 'rust Standard Library(std) training'
image: ''
tags: [rust, std]
category: 'rust'
draft: false 
lang: ''
---

# link

# array[|🔝|](#link)
- 장점 및 주의점.
  - 같은 타입만 가능함.
  - random access에 성능이 좋다.
  - stack에 할당되어 빠르다.

- 단점
  - 크기를 늘리고 줄이고 불가능
    - 뭐 만들기 나름이지만 그맛에 러스트한다. 불가능은 없음. 아이디어만 있으면 다 할수 있다.ㅋ

## 기본 array simple ex)

[code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/2026/01/08/a01_arrays_simple)


```rs

fn main() {
    let mut my_arr = [1, 2, 3, 4];
    println!("before : my_array {:?}", my_arr);
    my_arr[3] = 10;
    println!("after : my_array {:?}", my_arr);
}
```


# bubble sort구현[|🔝|](#link)

[bubble code ex](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/2026/01/08/a02_arrays_bubble_sort)

```rs
fn print_array01<T: std::fmt::Display>(array: &[T]) {
    print!("[");
    for (i, elem) in array.iter().enumerate() {
        print!("{}", elem);

        if i != array.len() - 1 {
            print!(", ");
        }
    }
    println!("]");
}

fn main() {
    let mut sortable: [i32; 5] = [5, 8, 2, 7, 6];
    let length = sortable.len();
    let mut swapped = true;

    println!("bubble sort ~~~~start");
    print_array01(&sortable);

    while swapped {
        swapped = false;
        for i in 1..length {
            let previous_element = sortable[i - 1];
            let current_element = sortable[i];

            if previous_element > current_element {
                sortable.swap(i - 1, i);
                swapped = true;
            }
        }
    }

    println!("bubble sort ~~~~end");
}
```

