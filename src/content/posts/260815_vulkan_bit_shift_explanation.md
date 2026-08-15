---
title: 260815_vulkan_bit_shift_explanation
published: 2026-08-15
description: 'Vulkan bit shift explanation'
image: ''
tags: [vulkan]
category: 'vulkan'
draft: false 
lang: ''
---

# link

- https://www.howtovulkan.com/#device-setup
- https://vulkan-tutorial.com/
- SDK
  - https://www.lunarg.com/products/vulkan-sdk/

- One stop solution for all Vulkan samples
  - https://github.com/KhronosGroup/Vulkan-Samples

- Rust)
  - https://github.com/gfx-rs/wgpu-native
  - 내가 정리중.
    - https://github.com/YoungHaKim7/rust_gui_vulkan_trainning

# In Vulkan code, you will often see something like:

```c
16 << 10
```

This is a **left bit shift**. Let's break it down.

### 1. `<<` means "shift bits to the left"

The expression:

```c
16 << 10
```

means:

> Take the binary representation of `16` and move its bits 10 positions to the left.

`16` in binary is:

```text
16 = 0000000000010000
```

Shift left by 10:

```text
0000000000010000
             ↓↓↓↓↓↓↓↓↓↓
0100000000000000
```

The result is:

```text
16 << 10 = 16384
```

Mathematically, for positive integers:

```text
x << n = x × 2ⁿ
```

Therefore:

```text
16 << 10
= 16 × 2¹⁰
= 16 × 1024
= 16384
```

---

### 2. Why does Vulkan code use this?

A common reason is to express **powers-of-two sizes** or **bit fields** clearly.

For example:

```c
#define MAX_SIZE (16 << 10)
```

means:

```text
16 KiB
```

because:

```text
16 × 1024 = 16384 bytes
```

So:

```c
16 << 10
```

is another way of writing:

```c
16384
```

or:

```c
16 * 1024
```

But the bit-shift form emphasizes that the value is based on binary powers of two.

---

### 3. Why `10`?

Because:

```text
2¹⁰ = 1024
```

So:

```text
x << 10
```

is equivalent to:

```text
x × 1024
```

For example:

```text
1 << 10  = 1024
2 << 10  = 2048
4 << 10  = 4096
8 << 10  = 8192
16 << 10 = 16384
```

This is particularly natural for memory-related Vulkan programming because GPUs and Vulkan resources frequently use **power-of-two / binary-aligned sizes**.

---

### 4. Compare with `16 << 20`

You will also frequently see:

```c
16 << 20
```

Since:

```text
2²⁰ = 1,048,576
```

we get:

```text
16 << 20
= 16 × 1,048,576
= 16,777,216
```

That's **16 MiB**.

So:

```text
16 << 10  → 16 KiB
16 << 20  → 16 MiB
```

assuming the context is measuring bytes.

---

### 5. A useful way to read it

When you see:

```c
16 << 10
```

you can mentally read it as:

> **"16 times 2 to the 10th."**

Similarly:

```c
1 << 20
```

means:

> **"2 to the 20th"**

and:

```c
64 << 10
```

means:

> **"64 KiB."**

---

### One important distinction

Don't confuse:

```c
16 << 10
```

with:

```c
16 >> 10
```

`<<` moves bits **left**:

```text
16 << 10 = 16384
```

while `>>` moves bits **right**:

```text
16 >> 10 = 0
```

for ordinary integer arithmetic, because the 16's set bit gets shifted away.

In Vulkan code, `<<` is often used for **bit masks, flags, alignment values, and binary-sized quantities**, so understanding it is very useful when reading Vulkan headers and examples.

