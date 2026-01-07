---
title: 251212_box_basic
published: 2025-12-12
description: 'rust box'
image: ''
tags: [rust, box, heap]
category: 'rust'
draft: false 
lang: ''
---

# Box를 써야하는 이유
- Heap에 들어가서 성능저하가 발생하는 Box는 언제 써야할까?
  - 무지 큰 데이터를 쓸때 Box가 더 이득이다.
  - deep copy인지 shadow copy인지 모르겠지만
  - stack에 데이터를 저장을 하고 thread 로 send를 한다면 heap에서 저장하는게 더 이득

```rs
fn main() {
    // 타입이 정해져있다. 정적
    let a = 10;
    println!("a {a}");
    println!("Hello, world!");

    // Use heap allocation (Box) instead of stack for large arrays
    let x_big_array: Box<[[i32; 1000]; 1000]> = Box::new([[0; 1000]; 1000]);

    println!("x_big_array address : {:p}", &*x_big_array);
    println!("thread {:?}", std::thread::current().id());
    println!("pid: {:?}", std::os::unix::process::parent_id());
    println!("~~~~");

    let thread01 = std::thread::spawn(move || {
        let copy_data: Box<[[i32; 1000]; 1000]> = x_big_array;

        println!("pid: {:?}", std::os::unix::process::parent_id());
        println!("thread {:?}", std::thread::current().id());
        println!("copy data first element : {:p}", &*copy_data);
    });
    thread01.join().unwrap();
}
```

- result

```bash
a 10
Hello, world!
x_big_array address : 0x7728e302f010
thread ThreadId(1)
pid: 103106
~~~~
pid: 103106
thread ThreadId(2)
copy data first element : 0x7728e302f010
```