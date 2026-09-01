---
title: struct_in_C
published: 2026-08-12
description: ''
image: ''
tags: [c, struct]
category: 'z_c'
draft: false 
lang: ''
---

# link

<hr />

Sure! Here is a simple and complete example showing how to use **`struct` in C**.

## 1. Basic `struct` example

Suppose we want to store information about a student. A `struct` lets us group different variables together.

```c
#include <stdio.h>
#include <string.h>

// Define a structure type
struct Student {
    char name[50];
    int age;
    float height;
};

int main(void) {
    // Create a variable of type struct Student
    struct Student student;

    // Assign values to the members
    strcpy(student.name, "Young");
    student.age = 30;
    student.height = 175.5f;

    // Access and print the members
    printf("Name   : %s\n", student.name);
    printf("Age    : %d\n", student.age);
    printf("Height : %.1f cm\n", student.height);

    return 0;
}
```

### Output

```text
Name   : Young
Age    : 30
Height : 175.5 cm
```

---

# 2. Understanding the structure definition

```c
struct Student {
    char name[50];
    int age;
    float height;
};
```

This defines a new structure type:

```text
Student
├── name    → char[50]
├── age     → int
└── height  → float
```

However, in **C**, `Student` is a **struct tag**, so you normally write:

```c
struct Student student;
```

The variable name is `student`.

---

# 3. Using `typedef struct`

A very common C style is to create an alias:

```c
typedef struct {
    char name[50];
    int age;
    float height;
} Student;
```

Now you can write:

```c
Student student;
```

instead of:

```c
struct Student student;
```

Here is a complete example:

```c
#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

int main(void) {
    Point point = {10, 20};

    printf("x = %d\n", point.x);
    printf("y = %d\n", point.y);

    return 0;
}
```

---

# 4. Passing a struct to a function using a pointer

This is especially important because it is similar to your `Stack *s` example.

```c
#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

void move_point(Point *p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}

int main(void) {
    Point point = {10, 20};

    printf("Before: (%d, %d)\n", point.x, point.y);

    // Pass the address of point
    move_point(&point, 5, 10);

    printf("After:  (%d, %d)\n", point.x, point.y);

    return 0;
}
```

### Output

```text
Before: (10, 20)
After:  (15, 30)
```

The important syntax is:

```c
p->x
```

This is shorthand for:

```c
(*p).x
```

Because `p` is a **pointer to a struct**.

---

## Summary

| Code                              | Meaning                           |
| --------------------------------- | --------------------------------- |
| `struct Student { ... };`         | Define a struct type              |
| `struct Student s;`               | Create a struct variable          |
| `s.age`                           | Access a struct member            |
| `Student *p`                      | Pointer to a struct               |
| `p->age`                          | Access a member through a pointer |
| `typedef struct { ... } Student;` | Create a convenient type name     |

A `struct` is essentially a way to **combine multiple related pieces of data into one object**. Your `Stack` example uses exactly the same idea: it combines the `data` array and `top` variable into one `Stack` object.

# C syntax of `struct` and `typedef`

- Yes, exactly. You are asking about the **C syntax of `struct` and `typedef`**, especially why the name `Stack` appears **after the closing `}`**.

Your current code is:

```c
typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;
```

This is a very common C style. Let's look at it carefully.

---

# 1. Why does `Stack` appear after `}`?

In C, this syntax:

```c
typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;
```

means:

> Define an anonymous structure, and create a type alias named `Stack` for it.

The general syntax of `typedef` is:

```c
typedef existing_type NewTypeName;
```

For example:

```c
typedef int Integer;
```

Now you can write:

```c
Integer x = 10;
```

instead of:

```c
int x = 10;
```

With a structure, the `existing_type` is the entire structure definition:

```c
struct {
    int data[MAX_SIZE];
    int top;
}
```

Then `Stack` is the new type name:

```c
typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;
```

Conceptually, you can read it from left to right as:

```text
typedef [this struct type] Stack;
                         ↑
                   new type alias
```

---

# 2. The structure itself has no name

Your code creates an **anonymous struct**:

```c
struct {
    int data[MAX_SIZE];
    int top;
}
```

There is no name between `struct` and `{`.

Then:

```c
} Stack;
```

creates the alias `Stack`.

So you use it like this:

```c
Stack s;
```

This is one reason `typedef struct { ... } Name;` is popular in C—it gives the type a clean name without requiring the `struct` keyword.

---

# 3. Another way: give the struct a name

You could write:

```c
struct Stack {
    int data[MAX_SIZE];
    int top;
};
```

Then you create a variable like this:

```c
struct Stack s;
```

Notice that in traditional C, you need to write `struct Stack`, not just `Stack`.

```c
struct Stack s;  // Correct
Stack s;         // Error in C
```

---

# 4. Named struct + typedef

You can combine both:

```c
typedef struct Stack {
    int data[MAX_SIZE];
    int top;
} Stack;
```

Now you can write either:

```c
struct Stack s1;
```

or:

```c
Stack s2;
```

Here, there are actually two names:

```text
struct Stack
       ↑
       struct tag

Stack
↑
typedef name
```

They exist in different C namespaces, so C allows them to have the same spelling.

---

# Comparison of the three styles

### Style 1: Anonymous struct + typedef

```c
typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;
```

Usage:

```c
Stack s;
```

**Advantages:**

* Short and clean.
* Very common in C programs.

**Disadvantage:**

* The underlying `struct` has no tag name.

---

### Style 2: Named struct only

```c
struct Stack {
    int data[MAX_SIZE];
    int top;
};
```

Usage:

```c
struct Stack s;
```

**Advantages:**

* Traditional C style.
* The struct has a proper tag name.

**Disadvantage:**

* You must repeatedly write `struct`.

---

### Style 3: Named struct + typedef

```c
typedef struct Stack {
    int data[MAX_SIZE];
    int top;
} Stack;
```

Usage:

```c
Stack s;
```

This is often useful in larger C programs because you have both the struct tag and the convenient alias.

---

# Why does C put the name after `}`?

This becomes easier to understand if you remember that C declarations generally put the **variable or alias name after the type**.

For example:

```c
int number;
```

Here:

```text
int      number
↑          ↑
type     name
```

Similarly:

```c
struct {
    int x;
    int y;
} point;
```

means:

> Create a variable named `point` whose type is this anonymous struct.

And:

```c
typedef struct {
    int x;
    int y;
} Point;
```

means:

> Create a type alias named `Point` for this anonymous struct.

So the name after `}` follows the normal C declaration grammar.

---

## One important distinction

Without `typedef`:

```c
struct {
    int x;
    int y;
} point;
```

`point` is a **variable**.

With `typedef`:

```c
typedef struct {
    int x;
    int y;
} Point;
```

`Point` is a **type alias**.

That's the key difference. The keyword `typedef` changes the meaning of the name declared after the structure from an object declaration into a **type declaration**.

### For your Stack example, this is perfectly idiomatic C:

```c
typedef struct {
    int data[MAX_SIZE];
    int top;
} Stack;
```

Then your code can simply say:

```c
Stack s;
```

which is probably the cleanest style for this particular program.


# Rust 같은 벡터 스타일

- If you mean **convert the Rust `Vec`-style stack implementation back into equivalent C code**, here is the closest comparison.

In Rust, `Vec<i32>` automatically manages:

* the element buffer
* the current length
* the allocated capacity
* memory allocation and deallocation

In C, we need to manage these things ourselves.

## Rust `Vec` → C equivalent

### Rust

```rust
struct Stack {
    data: Vec<i32>,
}

impl Stack {
    fn new() -> Self {
        Self {
            data: Vec::with_capacity(5),
        }
    }

    fn push(&mut self, value: i32) {
        self.data.push(value);
    }

    fn pop(&mut self) -> Option<i32> {
        self.data.pop()
    }
}
```

### Equivalent C code using a dynamic vector

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;       // Similar to Vec's pointer to heap memory
    size_t len;      // Similar to Vec::len()
    size_t capacity; // Similar to Vec::capacity()
} Stack;

// Similar to Vec::with_capacity(capacity)
Stack stack_new(size_t capacity) {
    Stack stack;

    stack.data = malloc(sizeof(int) * capacity);

    if (stack.data == NULL) {
        fprintf(stderr, "Memory allocation failed\n");
        exit(EXIT_FAILURE);
    }

    stack.len = 0;
    stack.capacity = capacity;

    return stack;
}

// Similar to Vec::push()
void stack_push(Stack *stack, int value) {
    // Grow the vector if it is full
    if (stack->len == stack->capacity) {
        size_t new_capacity = stack->capacity * 2;

        int *new_data = realloc(
            stack->data,
            sizeof(int) * new_capacity
        );

        if (new_data == NULL) {
            fprintf(stderr, "Memory reallocation failed\n");
            exit(EXIT_FAILURE);
        }

        stack->data = new_data;
        stack->capacity = new_capacity;
    }

    // Put the value at the end
    stack->data[stack->len] = value;

    printf(
        "Value: %d | Address: %p\n",
        value,
        (void *)&stack->data[stack->len]
    );

    stack->len++;
}

// Similar to Vec::pop()
int stack_pop(Stack *stack, int *result) {
    if (stack->len == 0) {
        return 0; // false: nothing to pop
    }

    stack->len--;

    printf(
        "Popped %d <- Memory Address: %p\n",
        stack->data[stack->len],
        (void *)&stack->data[stack->len]
    );

    *result = stack->data[stack->len];

    return 1; // true: successfully popped
}

// Similar to Rust's automatic Drop for Vec
void stack_free(Stack *stack) {
    free(stack->data);

    stack->data = NULL;
    stack->len = 0;
    stack->capacity = 0;
}

int main(void) {
    Stack stack = stack_new(5);

    printf("--- Pushing to Stack ---\n");

    stack_push(&stack, 10);
    stack_push(&stack, 20);
    stack_push(&stack, 30);

    printf("\n--- Popping from Stack ---\n");

    int value;

    if (stack_pop(&stack, &value)) {
        printf("Returned value: %d\n", value);
    }

    if (stack_pop(&stack, &value)) {
        printf("Returned value: %d\n", value);
    }

    // C requires us to free the memory manually.
    stack_free(&stack);

    return 0;
}
```

## The internal structure comparison

A Rust `Vec<i32>` is conceptually similar to this C structure:

```c
struct Vec {
    int *data;
    size_t len;
    size_t capacity;
};
```

Conceptually:

```text
Rust Vec<i32>                    C implementation
─────────────                    ────────────────
pointer to data             ≈    int *data
length                      ≈    size_t len
capacity                    ≈    size_t capacity
push()                      ≈    stack_push()
pop()                       ≈    stack_pop()
Drop automatically frees    ≈    free() manually
```

### The biggest difference

In Rust:

```rust
let mut stack = Vec::new();
stack.push(10);
// Memory is automatically released when `stack` goes out of scope.
```

In C:

```c
Stack stack = stack_new(5);
stack_push(&stack, 10);

stack_free(&stack);  // You must remember this!
```

Rust's ownership system and `Drop` mechanism automatically clean up a `Vec`, while in C you must explicitly call `free()`. This is one of the major safety advantages of Rust.


# Rust Vector

- You can implement the same idea in Rust using `Vec<i32>`. A `Vec` is Rust's growable vector type and can naturally be used as a **stack** because it provides `push()` and `pop()` methods.

Here is a Rust version that prints the memory address of each element, similar to your C program.

```rust
const MAX_SIZE: usize = 5;

struct Stack {
    data: Vec<i32>,
}

impl Stack {
    // Initialize an empty stack with space for MAX_SIZE elements.
    fn new() -> Self {
        Self {
            data: Vec::with_capacity(MAX_SIZE),
        }
    }

    // Push an element and inspect its memory address.
    fn push(&mut self, value: i32) {
        if self.data.len() >= MAX_SIZE {
            println!("Stack Overflow!");
            return;
        }

        self.data.push(value);

        // Get a reference to the element that was just pushed.
        let address = self.data.last().unwrap() as *const i32;

        println!("Value: {value:2} | Address: {address:p}");
    }

    // Pop an element and inspect its memory address.
    fn pop(&mut self) -> Option<i32> {
        if self.data.is_empty() {
            println!("Stack Underflow!");
            return None;
        }

        // The last element is the top of the stack.
        let index = self.data.len() - 1;

        // Get its address before removing it.
        let address = &self.data[index] as *const i32;
        let value = self.data[index];

        println!("Popped {value} <- Memory Address: {address:p}");

        self.data.pop()
    }
}

fn main() {
    let mut stack = Stack::new();

    println!("--- Pushing to Stack ---");
    stack.push(10);
    stack.push(20);
    stack.push(30);

    println!("\n--- Popping from Stack ---");
    stack.pop();
    stack.pop();
}
```

## Comparison with your C code

| C                       | Rust `Vec`                         |
| ----------------------- | ---------------------------------- |
| `int data[MAX_SIZE]`    | `Vec<i32>`                         |
| `int top`               | `Vec` internally tracks its length |
| `top++`                 | `data.push(value)`                 |
| `data[top--]`           | `data.pop()`                       |
| Manual index management | Built-in stack operations          |

### The important difference: where the data lives

In your C program:

```c
Stack s;
```

The `Stack` structure, including its fixed array `data`, is typically stored directly in the stack frame of `main`.

In the Rust version:

```rust
let mut stack = Stack::new();
```

The `Stack` object itself is typically stored locally, but the **elements inside `Vec<i32>` are allocated in a separate heap buffer**.

Conceptually:

```text
Rust call stack                 Heap
┌──────────────────┐           ┌──────────────────┐
│ Stack            │           │ 10 │ 20 │ 30 │    │
│ ┌──────────────┐ │           └──────────────────┘
│ │ Vec pointer ─┼───────────►       ^
│ │ length = 3   │ │                 |
│ │ capacity = 5 │ │          contiguous memory
│ └──────────────┘ │
└──────────────────┘
```

Therefore, the addresses printed for `10`, `20`, and `30` will usually be adjacent because a `Vec` stores its elements **contiguously**.

## Why use `Vec` as a stack?

Rust's `Vec` is an excellent stack because:

```rust
stack.push(value); // Add to the top
stack.pop();       // Remove from the top
```

Both operations are generally **O(1)** amortized, and you don't need to manually maintain a `top` variable.

One important note: **do not store these element addresses for later use**. If a `Vec` grows beyond its capacity, it may reallocate its buffer, and previously obtained pointers can become invalid. In this example, `Vec::with_capacity(MAX_SIZE)` avoids reallocation as long as we enforce the maximum size of 5.

So the idiomatic Rust version of your C stack is essentially:

```rust
let mut stack: Vec<i32> = Vec::new();

stack.push(10);
stack.push(20);
stack.push(30);

let value = stack.pop();
```

`Vec<T>` already provides most of the stack behavior that your C `Stack` structure implements manually.

