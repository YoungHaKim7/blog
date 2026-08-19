---
title: Reason_Vulkan_uses_optional_uint32_t_alignmentVS_Size
published: 2026-08-16
description: 'Debugging할때 나오는 Alingment와 Size 개념을 잡아보자. The reason Vulkan uses optional<uint32_t> here is semantic rather than performance-related: a queue-family index may or may not have been found yet. The optional makes that state explicit instead of inventing a special sentinel integer.'
image: ''
tags: [vulkan, uint32_t, size, alignment, cpp]
category: 'vulkan'
draft: false 
lang: ''
---

# link

<hr />

# Debugging할때 나오는 Alingment와 Size 개념을 잡아보자.

# `std::optional<uint32_t>`

Yes. The key is that **`std::optional<uint32_t>` is not the same size as `uint32_t`**.

In your code, the declaration is:

```cpp
struct QueueFamilyIndices {
    std::optional<uint32_t> graphicsFamily;
    std::optional<uint32_t> presentFamily;
};
```

This is exactly the code in your Vulkan program. 

If your debugger shows:

```text
graphicsFamily
    Alignment: 4 bytes
    Size:      8 bytes
```

that is normal.

---

# 1. First: `uint32_t` itself

A `uint32_t` normally looks like:

```cpp
uint32_t graphicsFamily;
```

Its typical layout is:

```text
alignment = 4 bytes
size      = 4 bytes
```

because:

```text
uint32_t
   ↓
32 bits
   ↓
32 / 8
   ↓
4 bytes
```

So:

```text
address
   │
   ├── +0  [ 4 bytes ]
   │
   └── +4
```

For example:

```cpp
static_assert(sizeof(uint32_t) == 4);
static_assert(alignof(uint32_t) == 4);
```

On your normal 64-bit desktop platform, these will typically be true.

---

# 2. But `std::optional<uint32_t>` needs more information

Now look at:

```cpp
std::optional<uint32_t>
```

An `optional<T>` needs to represent **two states**:

```text
1. There is a uint32_t value.

2. There is no value.
```

For example:

```cpp
std::optional<uint32_t> x;

x = 5;
```

means:

```text
x contains 5
```

while:

```cpp
std::optional<uint32_t> x;
```

means:

```text
x does not contain a value
```

So internally, the implementation needs something conceptually like:

```text
┌───────────────────────────────┐
│ uint32_t value                │
│                               │
│ uint32_t has_value flag       │
└───────────────────────────────┘
```

Conceptually:

```cpp
template<class T>
class optional {
    T value;
    bool engaged;
};
```

**This is only a conceptual model**, not necessarily the exact implementation used by your standard library.

---

# 3. Why isn't the size 5 bytes?

You might initially expect:

```text
uint32_t = 4 bytes
bool     = 1 byte

4 + 1 = 5 bytes
```

But C++ objects have **alignment requirements**.

Your `uint32_t` has:

```text
alignment = 4
```

So the `optional<uint32_t>` object typically needs to have an overall size that is a multiple of 4.

For example, an implementation could conceptually have:

```text
offset

0                   4     5       8
│                   │     │       │
▼                   ▼     ▼       ▼
┌───────────────────┬─────┬───────┐
│ uint32_t          │flag │padding│
│ 4 bytes           │1 B  │3 B    │
└───────────────────┴─────┴───────┘
```

Therefore:

```text
4 bytes value
+ 1 byte state
+ 3 bytes padding
-----------------
= 8 bytes
```

That's one common way an `optional<uint32_t>` can occupy 8 bytes.

---

# 4. What does "alignment = 4" mean?

This is an extremely important distinction:

**Alignment is not size.**

If your debugger says:

```text
graphicsFamily
Alignment: 4
Size:      8
```

it means:

```text
Alignment = 4
```

> The object should start at an address appropriate for 4-byte alignment.

while:

```text
Size = 8
```

means:

> The object occupies 8 bytes of storage.

For example, it might be located at:

```text
0x1000
```

because:

```text
0x1000 % 4 == 0
```

But the object can still occupy:

```text
0x1000 ... 0x1007
```

which is 8 bytes.

---

# 5. Think about a structure

Your structure is:

```cpp
struct QueueFamilyIndices {
    std::optional<uint32_t> graphicsFamily;
    std::optional<uint32_t> presentFamily;
};
```

If each `optional<uint32_t>` is 8 bytes, the conceptual layout could be:

```text
QueueFamilyIndices

offset 0
       │
       ▼
┌────────────────────────┐
│ graphicsFamily         │
│                        │  8 bytes
│ optional<uint32_t>     │
└────────────────────────┘
offset 8
       │
       ▼
┌────────────────────────┐
│ presentFamily          │
│                        │  8 bytes
│ optional<uint32_t>     │
└────────────────────────┘
offset 16
```

So typically:

```cpp
sizeof(QueueFamilyIndices)
```

would be:

```text
16 bytes
```

and:

```cpp
alignof(QueueFamilyIndices)
```

would typically be:

```text
4 bytes
```

You can verify your actual compiler's result:

```cpp
#include <cstdint>
#include <iostream>
#include <optional>

struct QueueFamilyIndices {
    std::optional<uint32_t> graphicsFamily;
    std::optional<uint32_t> presentFamily;
};

int main() {
    std::cout
        << "sizeof(uint32_t): "
        << sizeof(uint32_t) << '\n';

    std::cout
        << "alignof(uint32_t): "
        << alignof(uint32_t) << '\n';

    std::cout
        << "sizeof(optional<uint32_t>): "
        << sizeof(std::optional<uint32_t>) << '\n';

    std::cout
        << "alignof(optional<uint32_t>): "
        << alignof(std::optional<uint32_t>) << '\n';

    std::cout
        << "sizeof(QueueFamilyIndices): "
        << sizeof(QueueFamilyIndices) << '\n';

    std::cout
        << "alignof(QueueFamilyIndices): "
        << alignof(QueueFamilyIndices) << '\n';
}
```

On a typical 64-bit Linux C++ implementation, you may get:

```text
sizeof(uint32_t): 4
alignof(uint32_t): 4

sizeof(optional<uint32_t>): 8
alignof(optional<uint32_t>): 4

sizeof(QueueFamilyIndices): 16
alignof(QueueFamilyIndices): 4
```

The **exact representation is implementation-dependent**, so don't rely on `optional<uint32_t>` always being exactly 8 bytes on every platform/compiler.

---

# 6. Why does Vulkan code use `optional` here?

This is actually a very nice design.

Your Vulkan code searches for queue families:

```cpp
if (queueFamily.queueFlags & VK_QUEUE_GRAPHICS_BIT) {
    indices.graphicsFamily = i;
}
```

and:

```cpp
if (presentSupport) {
    indices.presentFamily = i;
}
```

from your `findQueueFamilies()` function. 

The program initially has:

```cpp
QueueFamilyIndices indices;
```

which means conceptually:

```text
graphicsFamily = nothing
presentFamily  = nothing
```

Then the physical device is examined.

Suppose the GPU has:

```text
Queue family 0
    graphics = YES
    present  = YES

Queue family 1
    graphics = YES
    present  = NO
```

After searching:

```text
graphicsFamily = 0
presentFamily  = 0
```

So:

```cpp
indices.graphicsFamily.has_value()
```

is:

```text
true
```

and:

```cpp
indices.graphicsFamily.value()
```

returns:

```text
0
```

---

# 7. Why not just use `uint32_t`?

You could write:

```cpp
struct QueueFamilyIndices {
    uint32_t graphicsFamily;
    uint32_t presentFamily;
};
```

But now you have a problem.

What does this mean before you've found the queue family?

```text
graphicsFamily = ???
presentFamily  = ???
```

You need some sentinel value:

```cpp
uint32_t graphicsFamily = UINT32_MAX;
```

Then you might write:

```cpp
if (graphicsFamily != UINT32_MAX) {
    // found
}
```

But `std::optional` expresses the intent much more clearly:

```cpp
std::optional<uint32_t> graphicsFamily;
```

means:

```text
"Maybe there is a queue family index."
```

---

# 8. `optional` is essentially a tagged value

A useful mental model is:

```text
std::optional<uint32_t>

       ┌──────────────────────┐
       │                      │
       │       uint32_t       │
       │                      │
       ├──────────────────────┤
       │                      │
       │   engaged / empty    │
       │                      │
       └──────────────────────┘
```

The second part is effectively a **state indicator**.

You can think of it as:

```text
optional<uint32_t>

       state
        │
        ├── EMPTY
        │
        └── VALUE
              │
              └── uint32_t
```

Therefore `optional<T>` generally requires enough storage for:

```text
T
+
some representation of "has value"
+
possible padding
```

---

# 9. Why `has_value()` works

Your code:

```cpp
bool isComplete() {
    return graphicsFamily.has_value() &&
           presentFamily.has_value();
}
```

is asking:

```text
Does graphicsFamily contain a value?
             AND
Does presentFamily contain a value?
```

So:

```text
graphicsFamily     presentFamily
      │                  │
      ▼                  ▼
   has value?         has value?
      │                  │
      └────────┬─────────┘
               ▼
            complete?
```

This is then used here:

```cpp
return indices.isComplete() &&
       extensionsSupported &&
       swapChainAdequate;
```

from your Vulkan device-selection code. 

---

# 10. What happens when you call `.value()`?

Later your program does:

```cpp
indices.graphicsFamily.value()
```

and:

```cpp
indices.presentFamily.value()
```

when creating the logical device. 

`.value()` means:

> "Give me the contained `uint32_t`."

But if the optional is empty:

```cpp
std::optional<uint32_t> x;

x.value(); // throws std::bad_optional_access
```

That's why the program first establishes:

```cpp
indices.isComplete()
```

before using `.value()`.

---

# 11. There is also `operator*`

Instead of:

```cpp
indices.graphicsFamily.value()
```

you can write:

```cpp
*indices.graphicsFamily
```

when you know it contains a value.

And:

```cpp
indices.graphicsFamily.has_value()
```

is equivalent in intent to checking whether the optional is engaged.

You can also use:

```cpp
if (indices.graphicsFamily) {
    std::cout << *indices.graphicsFamily;
}
```

because `std::optional` has a boolean conversion.

---

# 12. The memory layout is the key to your question

So if your debugger reports:

```text
graphicsFamily

Alignment: 4 bytes
Size:      8 bytes
```

don't interpret it as:

```text
4 + 8 = 12
```

Instead:

```text
Alignment
    ↓
how the object should be positioned

Size
    ↓
how much memory the object occupies
```

For a typical implementation:

```text
std::optional<uint32_t>

alignment = 4
size      = 8
```

A conceptual layout is:

```text
             8 bytes total
        ┌───────────────────┐
offset  │ uint32_t          │
  0     │                   │
        │      4 bytes      │
        ├───────────────────┤
offset  │ engaged flag      │
  4     │      1 byte       │
        ├───────────────────┤
offset  │ padding           │
  5     │      3 bytes      │
        └───────────────────┘
```

Again, **this is a conceptual representation**, not a guarantee about the standard-library implementation.

---

## The most important takeaway

Your declaration:

```cpp
std::optional<uint32_t> graphicsFamily;
```

does **not** mean "an 8-byte integer."

It means:

```text
optional<uint32_t>
       │
       ├── uint32_t value       → 4 bytes
       │
       └── whether value exists  → extra storage
                                  ↓
                               padding
```

Therefore, on your implementation:

```text
                    alignment       size

uint32_t                4             4
optional<uint32_t>      4             8
```

And the reason Vulkan uses `optional<uint32_t>` here is semantic rather than performance-related: **a queue-family index may or may not have been found yet**. The `optional` makes that state explicit instead of inventing a special sentinel integer.

