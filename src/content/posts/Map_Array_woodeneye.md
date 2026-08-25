---
title: Map_Array_woodeneye
published: 2026-08-20
description: 'game dev.) to describe the 12 edges of a cube. Map'
image: ''
tags: [vulkan, map, game, 3d]
category: 'vulkan'
draft: false 
lang: ''
---

# link

<hr />

# The `map` array

- It looks like you want to understand this `map` array. This is a compact way to describe the **12 edges of a cube**.

```rust
#[rustfmt::skip]
let map = [
    0, 1, 1, 3, 3, 2, 2, 0, // First 4 edges (bottom face)
    7, 6, 6, 4, 4, 5, 5, 7, // Next 4 edges (top face)
    6, 2, 3, 7, 0, 4, 5, 1, // Last 4 edges (connecting top and bottom)
];
```

Each **pair of numbers represents one edge**:

```text
Edge 0: 0 → 1
Edge 1: 1 → 3
Edge 2: 3 → 2
Edge 3: 2 → 0
...
```

There are 24 numbers, which represent:

> **12 edges × 2 endpoints = 24 values**

---

## Why are the vertices numbered from 0 to 7?

A cube has **8 corners (vertices)**. They can be represented using three binary bits:

```text
Vertex     Binary       Coordinates

0          000          (-r, -r, -r)
1          001          ( r, -r, -r)
2          010          (-r,  r, -r)
3          011          ( r,  r, -r)
4          100          (-r, -r,  r)
5          101          ( r, -r,  r)
6          110          (-r,  r,  r)
7          111          ( r,  r,  r)
```

The important idea is that **each bit determines whether a coordinate is `-r` or `+r`**.

For example:

```text
vertex 0 = binary 000 → (-r, -r, -r)
vertex 7 = binary 111 → (+r, +r, +r)
```

---

## How the code converts a number into coordinates

This line is the key:

```rust
edges[i][j] = if map[i * 2] & (1 << j) != 0 {
    r
} else {
    -r
};
```

Suppose the vertex number is `5`:

```text
5 = binary 101
```

The loop checks each bit:

```text
j = 0 → bit 0 = 1 → +r
j = 1 → bit 1 = 0 → -r
j = 2 → bit 2 = 1 → +r
```

So vertex `5` becomes approximately:

```text
(+r, -r, +r)
```

The exact interpretation of which axis corresponds to each bit depends on the coordinate convention, but the principle is the same.

---

## Visualizing the first four edges

The first part:

```rust
0, 1,
1, 3,
3, 2,
2, 0,
```

forms a square:

```text
      2 -------- 3
      |          |
      |          |
      0 -------- 1
```

The next four numbers form the opposite face, and the final four edges connect the two faces:

```text
      +--------+
     /|       /|
    +--------+ |
    | |      | |
    | +------|-+
    |/       |/
    +--------+
```

So the array is essentially a **connectivity table**:

> **Which cube vertices should be connected by lines?**

---

## Why use this approach?

Instead of manually writing coordinates for all 24 edge endpoints, the code stores only the vertex indices:

```rust
0, 1, 1, 3, ...
```

and generates the coordinates from their binary representation. This is compact and makes the cube topology easy to define.

### In summary

```text
map = list of pairs of vertex indices
       ↓
each index = 3-bit binary coordinate
       ↓
0 bit → -r
1 bit → +r
       ↓
generate the 12 wireframe edges of a cube
```

`#[rustfmt::skip]` is simply there to prevent `rustfmt` from reformatting the array, preserving the visually meaningful grouping of the cube's edges.
