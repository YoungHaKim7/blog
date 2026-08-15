---
title: 260202_thread_local_basic001
published: 2026-02-02
description: '`thread_local!` = "Give every thread its own private copy of this variable.'
image: ''
tags: [rust, parallels, thread]
category: 'ParallelsConcurrency'
draft: false 
lang: ''
---

# link

- [rust code(`thread_local`)예시](#thread_local)
- [Whats happening(`thread_local`)로컬 쓰레드 작동원리](#whats-happening)
- [global variable로 했을때 차이점](#compare-with-a-normal-global-variable)


<hr />

# thread_local

Sure. Here's a very simple example showing the key advantage of `thread_local!`: **each thread has its own value**.

```rust
use std::cell::Cell;
use std::thread;

thread_local! {
    static COUNTER: Cell<u32> = const { Cell::new(0) };
}

fn main() {
    let t1 = thread::spawn(|| {
        COUNTER.with(|counter| {
            counter.set(counter.get() + 1);
            counter.set(counter.get() + 1);

            println!("Thread 1: {}", counter.get());
        });
    });

    let t2 = thread::spawn(|| {
        COUNTER.with(|counter| {
            counter.set(counter.get() + 1);

            println!("Thread 2: {}", counter.get());
        });
    });

    t1.join().unwrap();
    t2.join().unwrap();

    // Main thread has its own COUNTER.
    COUNTER.with(|counter| {
        println!("Main thread: {}", counter.get());
    });
}
```

Possible output:

```text
Thread 1: 2
Thread 2: 1
Main thread: 0
```

### What's happening?

Even though we wrote only one:

```rust
static COUNTER: Cell<u32>
```

there are actually **three independent counters**:

```text
             COUNTER
                │
       ┌────────┼────────┐
       ↓        ↓        ↓
    Main       Thread1  Thread2
     0            2        1
```

When Thread 1 does:

```rust
counter.set(counter.get() + 1);
```

it changes **Thread 1's counter only**.

Thread 2 has a completely separate counter.

### Compare with a normal global variable

Without thread-local storage, you might need:

```rust
static COUNTER: Mutex<u32> = ...;
```

because multiple threads would be accessing the **same** value.

With `thread_local!`:

```rust
thread_local! {
    static COUNTER: Cell<u32> = const { Cell::new(0) };
}
```

you don't need a `Mutex`, because each thread owns its own copy.

---

For your original compression example, the same idea would look like:

```rust
thread_local! {
    static COMPRESSION_ENABLED: Cell<bool> =
        const { Cell::new(false) };
}

fn compress() {
    COMPRESSION_ENABLED.with(|enabled| {
        enabled.set(true);

        println!("compression: {}", enabled.get());
    });
}
```

So the mental model is simply:

> **`thread_local!` = "Give every thread its own private copy of this variable."**

