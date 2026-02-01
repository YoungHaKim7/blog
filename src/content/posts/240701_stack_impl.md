---
title: 240701_stack_impl
published: 2024-07-01
description: 'rust로 stack구현(vector로 편하게,  static array로 빡쎄게 구현,  const fn활용)'
image: ''
tags: [rust, algorithms, std]
category: 'rust_algorithms'
draft: false 
lang: ''
---

# link

<hr />

# vector를 활용해서 편하게 stack구현
- [rust code 예시 코드](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/003_Algorithms/001_DataStructures/001_stack/a01_stack_impl)

```rs
#[derive(Debug)]
pub struct Stack<T> {
    data: Vec<T>,
}

impl<T> Stack<T> {
    /// Create an empty stack
    pub fn new() -> Self {
        Stack { data: Vec::new() }
    }

    /// Create an empty stack with pre-allocated capacity
    pub fn with_capacity(capacity: usize) -> Self {
        Stack {
            data: Vec::with_capacity(capacity),
        }
    }

    /// Push an element onto the top of the stack
    pub fn push(&mut self, value: T) {
        self.data.push(value);
    }

    /// Pop an element from the top of the stack
    pub fn pop(&mut self) -> Option<T> {
        self.data.pop()
    }

    /// Push an element to the bottom (front) of the stack
    pub fn front_push(&mut self, value: T) {
        self.data.insert(0, value);
    }

    /// Peek the top element without popping
    pub fn peek(&self) -> Option<&T> {
        self.data.last()
    }

    /// Check if the stack is empty
    pub fn is_empty(&self) -> bool {
        self.data.is_empty()
    }

    /// Number of elements
    pub fn len(&self) -> usize {
        self.data.len()
    }
}

fn main() {
    let mut stack = Stack::with_capacity(4);

    stack.push(10);
    stack.push(20);
    stack.front_push(5);

    println!("{:?}", stack); // Stack { data: [5, 10, 20] }

    println!("pop: {:?}", stack.pop()); // Some(20)
    println!("peek: {:?}", stack.peek()); // Some(10)
}
```

# static array version (stack 구현)
- [static array version (stack impl)](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/003_Algorithms/001_DataStructures/001_stack/b01_static_array_stack_impl)


```rs
use std::mem::MaybeUninit;
use std::ptr;

#[derive(Debug)]
pub struct Stack<T, const N: usize> {
    data: [MaybeUninit<T>; N],
    len: usize,
}

impl<T, const N: usize> Stack<T, N> {
    /// Create an empty stack
    pub fn new() -> Self {
        // SAFETY: An uninitialized array of MaybeUninit is valid
        let data = unsafe { MaybeUninit::<[MaybeUninit<T>; N]>::uninit().assume_init() };

        Stack { data, len: 0 }
    }

    /// Push to top of stack
    pub fn push(&mut self, value: T) -> Result<(), T> {
        if self.len == N {
            return Err(value); // stack overflow
        }

        self.data[self.len].write(value);
        self.len += 1;
        Ok(())
    }

    /// Pop from top of stack
    pub fn pop(&mut self) -> Option<T> {
        if self.len == 0 {
            return None;
        }

        self.len -= 1;

        // SAFETY: element was initialized
        Some(unsafe { self.data[self.len].assume_init_read() })
    }

    /// Push to bottom (front) of stack
    pub fn front_push(&mut self, value: T) -> Result<(), T> {
        if self.len == N {
            return Err(value);
        }

        unsafe {
            // Shift elements right
            ptr::copy(self.data.as_ptr(), self.data.as_mut_ptr().add(1), self.len);
        }

        self.data[0].write(value);
        self.len += 1;
        Ok(())
    }

    /// Peek top element
    pub fn peek(&self) -> Option<&T> {
        if self.len == 0 {
            None
        } else {
            // SAFETY: element is initialized
            Some(unsafe { &*self.data[self.len - 1].as_ptr() })
        }
    }

    pub fn len(&self) -> usize {
        self.len
    }

    pub fn is_empty(&self) -> bool {
        self.len == 0
    }

    pub fn capacity(&self) -> usize {
        N
    }
}

impl<T, const N: usize> Drop for Stack<T, N> {
    fn drop(&mut self) {
        for i in 0..self.len {
            unsafe {
                self.data[i].assume_init_drop();
            }
        }
    }
}

pub struct IntoIter<T, const N: usize> {
    stack: Stack<T, N>,
}

impl<T, const N: usize> Iterator for IntoIter<T, N> {
    type Item = T;

    fn next(&mut self) -> Option<Self::Item> {
        self.stack.pop()
    }
}

impl<T, const N: usize> IntoIterator for Stack<T, N> {
    type Item = T;
    type IntoIter = IntoIter<T, N>;

    fn into_iter(self) -> Self::IntoIter {
        IntoIter { stack: self }
    }
}

pub struct Iter<'a, T, const N: usize> {
    stack: &'a Stack<T, N>,
    index: usize,
}

impl<'a, T, const N: usize> Iterator for Iter<'a, T, N> {
    type Item = &'a T;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index == 0 {
            return None;
        }
        self.index -= 1;
        // SAFETY: element is initialized
        Some(unsafe { &*self.stack.data[self.index].as_ptr() })
    }
}

pub struct IterMut<'a, T, const N: usize> {
    stack: &'a mut Stack<T, N>,
    index: usize,
}

impl<'a, T, const N: usize> Iterator for IterMut<'a, T, N> {
    type Item = &'a mut T;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index == 0 {
            return None;
        }
        self.index -= 1;
        // SAFETY: element is initialized and we have exclusive access
        Some(unsafe { &mut *self.stack.data[self.index].as_mut_ptr() })
    }
}

impl<T, const N: usize> Stack<T, N> {
    pub fn iter(&self) -> Iter<'_, T, N> {
        Iter { stack: self, index: self.len }
    }

    pub fn iter_mut(&mut self) -> IterMut<'_, T, N> {
        let index = self.len;
        IterMut { stack: self, index }
    }
}

fn main() {
    let mut stack: Stack<i32, 8> = Stack::new();

    stack.push(10).unwrap();
    stack.push(20).unwrap();
    stack.front_push(5).unwrap();

    assert_eq!(stack.pop(), Some(20));
    assert_eq!(stack.pop(), Some(10));
    assert_eq!(stack.pop(), Some(5));
    assert_eq!(stack.pop(), None);

    let mut stack02: Stack<i32, 8> = Stack::new();

    stack02.push(200).unwrap();
    stack02.push(100).unwrap();
    stack02.push(100).unwrap();
    stack02.push(100).unwrap();
    stack02.push(100).unwrap();
    stack02.front_push(10).unwrap();

    println!("stack 02 : {:?}", stack02);
    for i in stack02.iter() {
        println!("stack 02 : {:?}", i);
    }

    let data_store = stack02.pop();
    println!("data_store: {:?}", data_store);
}
```

# `const fn` 으로 최적화 버젼

- [`const fn`활용하기](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/003_Algorithms/001_DataStructures/001_stack/c01_const_constructible_version)

```rs
use std::mem::MaybeUninit;
use std::ptr;

#[derive(Debug)]
pub struct Stack<T, const N: usize> {
    data: [MaybeUninit<T>; N],
    len: usize,
}

impl<T, const N: usize> Stack<T, N> {
    /// Fully const constructor
    pub const fn new() -> Self {
        // SAFETY: `MaybeUninit<T>` is allowed to be uninitialized
        let data: [MaybeUninit<T>; N] = unsafe { MaybeUninit::uninit().assume_init() };
        Stack {
            data,
            len: 0,
        }
    }

    pub fn push(&mut self, value: T) -> Result<(), T> {
        if self.len == N {
            return Err(value);
        }
        self.data[self.len].write(value);
        self.len += 1;
        Ok(())
    }

    pub fn pop(&mut self) -> Option<T> {
        if self.len == 0 {
            return None;
        }
        self.len -= 1;
        Some(unsafe { self.data[self.len].assume_init_read() })
    }

    pub fn front_push(&mut self, value: T) -> Result<(), T> {
        if self.len == N {
            return Err(value);
        }

        unsafe {
            ptr::copy(self.data.as_ptr(), self.data.as_mut_ptr().add(1), self.len);
        }

        self.data[0].write(value);
        self.len += 1;
        Ok(())
    }
}

impl<T, const N: usize> Drop for Stack<T, N> {
    fn drop(&mut self) {
        for i in 0..self.len {
            unsafe {
                self.data[i].assume_init_drop();
            }
        }
    }
}

pub struct IntoIter<T, const N: usize> {
    stack: Stack<T, N>,
}

impl<T, const N: usize> Iterator for IntoIter<T, N> {
    type Item = T;

    fn next(&mut self) -> Option<Self::Item> {
        self.stack.pop()
    }
}

impl<T, const N: usize> IntoIterator for Stack<T, N> {
    type Item = T;
    type IntoIter = IntoIter<T, N>;

    fn into_iter(self) -> Self::IntoIter {
        IntoIter { stack: self }
    }
}

pub struct Iter<'a, T, const N: usize> {
    stack: &'a Stack<T, N>,
    index: usize,
}

impl<'a, T, const N: usize> Iterator for Iter<'a, T, N> {
    type Item = &'a T;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index == 0 {
            return None;
        }
        self.index -= 1;
        // SAFETY: element is initialized
        Some(unsafe { &*self.stack.data[self.index].as_ptr() })
    }
}

pub struct IterMut<'a, T, const N: usize> {
    stack: &'a mut Stack<T, N>,
    index: usize,
}

impl<'a, T, const N: usize> Iterator for IterMut<'a, T, N> {
    type Item = &'a mut T;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index == 0 {
            return None;
        }
        self.index -= 1;
        // SAFETY: element is initialized and we have exclusive access
        Some(unsafe { &mut *self.stack.data[self.index].as_mut_ptr() })
    }
}

impl<T, const N: usize> Stack<T, N> {
    pub fn iter(&self) -> Iter<'_, T, N> {
        Iter {
            stack: self,
            index: self.len,
        }
    }

    pub fn iter_mut(&mut self) -> IterMut<'_, T, N> {
        let index = self.len;
        IterMut { stack: self, index }
    }
}

fn main() {
    let mut stack: Stack<i32, 8> = Stack::new();

    stack.push(10).unwrap();
    stack.push(20).unwrap();
    stack.front_push(5).unwrap();

    assert_eq!(stack.pop(), Some(20));
    assert_eq!(stack.pop(), Some(10));
    assert_eq!(stack.pop(), Some(5));
    assert_eq!(stack.pop(), None);

    let mut stack02: Stack<i32, 8> = Stack::new();

    stack02.push(200).unwrap();
    stack02.push(100).unwrap();
    stack02.push(100).unwrap();
    stack02.push(100).unwrap();
    stack02.push(100).unwrap();
    stack02.front_push(10).unwrap();

    println!("stack 02 : {:?}", stack02);
    for i in stack02.iter() {
        println!("stack 02 : {:?}", i);
    }

    let data_store = stack02.pop();
    println!("data_store: {:?}", data_store);
}
```


# 같이 보면 좋은글
-  [`const fn`을 쓰는 이유 ,  장점과 단점](../260130_what_does_const_fn_actually_do/)

