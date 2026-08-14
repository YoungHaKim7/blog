---
title: c23_constexpr_basic001
published: 2026-08-11
description: 'constexpr c23 basic'
image: ''
tags: [c, c23, constexpr]
category: 'z_c'
draft: false 
lang: ''
---

# link


# c23(`constexpr` 예시)

```c
#include <fenv.h>
#include <stdio.h>

int main(void) {
    constexpr float f = 23.0f;
    constexpr float g = 33.0f;
    fesetround(FE_TOWARDZERO);
    constexpr float h = f / g; // is not affected by fesetround() above
    printf("%f\n", h);
}
```

# `constexpr`를 쓰면 좋은 점

`constexpr` means, roughly, **“this value/expression is allowed to be evaluated at compile time.”**

For example:

```c
constexpr double eps1m01 = 1.0 - 0x1P-01;
```

has several advantages.

### 1. The compiler can calculate it at compile time

The compiler can evaluate:

```c
1.0 - 0x1P-01
```

during compilation, so at runtime there is no need to perform that calculation.

Conceptually:

```c
constexpr double x = 1.0 - 0.5;
```

becomes effectively:

```c
const double x = 0.5;
```

in the generated program.

---

### 2. It guarantees the value cannot be modified

`constexpr` implies `const` for the object:

```c
constexpr double x = 0.5;

x = 1.0;   // error
```

So it communicates:

> This is a constant known at compile time and should never change.

---

### 3. It allows use where a compile-time constant is required

This is one of the important differences from an ordinary variable.

For example:

```c
constexpr int n = 10;

int array[n];
```

`n` is available as a constant expression.

Likewise, compile-time constructs such as `_Static_assert` can use constant expressions:

```c
constexpr int n = 10;

_Static_assert(n == 10);
```

---

### 4. It documents programmer intent

Compare:

```c
double eps1m01 = 0.5;
```

with:

```c
constexpr double eps1m01 = 1.0 - 0x1P-01;
```

The second tells the reader:

> This value is deliberately a compile-time constant, and its mathematical relationship to `1.0` is important.

This can be more useful than simply writing `0.5`.

---

### 5. It catches mistakes earlier

Because the initializer must be a constant expression, something like:

```c
int get_value(void);

constexpr int x = get_value();  // error
```

is rejected because `get_value()` cannot be evaluated as a C constant expression.

That can catch accidental dependencies on runtime computation.

---

### One subtle point

`constexpr` is **not primarily an optimization keyword**.

The compiler is already very good at optimizing:

```c
const double x = 1.0 - 0.5;
```

The bigger benefits are:

* **compile-time evaluation**
* **compile-time validation**
* **immutability**
* **expressing intent**
* **allowing use in constant-expression contexts**

So for your example:

```c
constexpr double eps1m01 = 1.0 - 0x1P-01;
```

the interesting part is less about making `0.5` faster and more about saying:

> **“`eps1m01` is a mathematically defined constant whose value is known at compile time.”**

