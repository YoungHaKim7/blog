---
title: Bit_Pattern_training_001
published: 2025-12-30
description: 'When totaling the number of operations for algorithms here, any C operator is counted as one operation. Intermediate assignments, which need not be written to RAM, are not counted. Of course, this operation counting approach only serves as an approximation of the actual number of machine instructions and CPU time. All operations are assumed to take the same amount of time, which is not true in reality, but CPUs have been heading increasingly in this direction over time. There are many nuances that determine how fast a system will run a given sample of code, such as cache sizes, memory bandwidths, instruction sets, etc. In the end, benchmarking is the best way to determine whether one method is really faster than another, so consider the techniques below as possibilities to test on your target architecture. '
image: ''
tags: [rust, bithacks, CHAR_BIT, c, limits]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link

- [외부링크)스탠포드 bithacks](https://graphics.stanford.edu/~seander/bithacks.html)

- [내blog_ BitHacks](../260312_bit_pattern_training_bithacks_swar/)

- [Why programmers group bits in 4](#why-programmers-group-bits-in-4)

- [Real kernel example(13번 참고하면됨.](#real-kernel-example13번-참고하면됨--13-align-to-power-of-two-boundary)
  - [`align up` vs `align down` vs `check aligned`](#related-famous-alignment-tricks)

- [15 Legendary Bit Hacks](../260312_bit_pattern_training_bithacks_swar/#15-legendary-bit-hacks)
  - [1. Clear lowest set bit](../260312_bit_pattern_training_bithacks_swar/#1-clear-lowest-set-bit)
  - [2. Extract lowest set bit](../260312_bit_pattern_training_bithacks_swar/#2-extract-lowest-set-bit)
  - [3. Check power of two](../260312_bit_pattern_training_bithacks_swar/#3-check-power-of-two)
  - [4. Set bits below lowest set bit](../260312_bit_pattern_training_bithacks_swar/#4-set-bits-below-lowest-set-bit)
  - [5. Clear trailing ones](../260312_bit_pattern_training_bithacks_swar/#5-clear-trailing-ones-)
  - [6. Find lowest zero bit](../260312_bit_pattern_training_bithacks_swar/#6-find-lowest-zero-bit-)
  - [7. Binary → Gray code](../260312_bit_pattern_training_bithacks_swar/#7-binary--gray-code-)
  - [8. Gray → Binary](../260312_bit_pattern_training_bithacks_swar/#8-gray--binary)
  - [9. Test bit](../260312_bit_pattern_training_bithacks_swar/#9-test-bit-)
  - [10. Toggle bit](../260312_bit_pattern_training_bithacks_swar/#10-toggle-bit)
  - [11. Clear bit](../260312_bit_pattern_training_bithacks_swar/#11-clear-bit)
  - [12. Set bit](../260312_bit_pattern_training_bithacks_swar/#12-set-bit-)
  - [13. Align to power-of-two boundary](../260312_bit_pattern_training_bithacks_swar/#13-align-to-power-of-two-boundary)
  - [14. Branchless min/max](../260312_bit_pattern_training_bithacks_swar/#14-branchless-minmax)
  - [15. Fast popcount step](../260312_bit_pattern_training_bithacks_swar/#15-fast-popcount-step-)

- [(외부링크) Bit Twiddling Hacks](https://graphics.stanford.edu/~seander/bithacks.html)

- [Boolean Logic](../260312_bit_pattern_training_bithacks_swar/#boolean-logic)
  - https://introcs.cs.princeton.edu/java/71boolean/

- Operator Truth Table 기초
  - [NOT](../260312_bit_pattern_training_bithacks_swar/#not-operator-truth-table)
  - [AND](../260312_bit_pattern_training_bithacks_swar/#and-operator-truth-table)
  - [OR](../260312_bit_pattern_training_bithacks_swar/#or--operator-truth-table)
  - [XOR](../260312_bit_pattern_training_bithacks_swar/#xor-operator-truth-table)

- 만들면서 익히기
  - [Base64기초](../260312_bit_pattern_training_bithacks_swar/#base64기초)
  - [SWAR popcount algorithm (the famous 5-mask method)](../260312_bit_pattern_training_bithacks_swar/#swar-popcount-algorithm-the-famous-5-mask-method)
    - [Why this is called SWAR](../260312_bit_pattern_training_bithacks_swar/#why-this-is-called-swar)
    - [Why this was famous(SWAR)](../260312_bit_pattern_training_bithacks_swar/#why-this-was-famousswar)

<hr />



Here is the corrected, complete C program with `main()`, `printf()`, and user input.

### Complete C code (`main.c`)

```c

#include <stdio.h>
#include <limits.h>

int main(void) {
    printf("Compute the sign of an integer\n");
    
    int v;
    int sign;

    printf("Enter an integer: ");

    if (scanf("%d", &v) != 1) {
        printf("Invalid input.\n");
        return 1;
    }

    // Method 1: Portable C
    // Returns -1 if v < 0, otherwise 0.
    sign = -(v < 0);
    printf("\nMethod 1 (comparison): sign = %d\n", sign);

    // Method 2: Extract the sign bit using unsigned shift.
    // Assumes int and unsigned int have the same width
    // and int uses the conventional signed representation.
    sign = -(int)((unsigned int)v >> (sizeof(int) * CHAR_BIT - 1));
    printf("Method 2 (unsigned shift): sign = %d\n", sign);

    // Method 3: Implementation-defined behavior.
    // Right-shifting a negative signed integer is
    // implementation-defined in C.
    sign = v >> (sizeof(int) * CHAR_BIT - 1);
    printf("Method 3 (signed shift): sign = %d\n", sign);

    return 0;
}

```

Important correction: Your original Method 2 had an unnecessary conversion:

```bash
(unsigned int)((int)v)
```

The simpler expression is:

```bash
(unsigned int)v
```

Also, Method 2 extracts the most significant bit, so it assumes a conventional signed integer representation. The original expression `-(int)(...)` then converts that bit into `0` or `-1`.

### Compile and run

```bash
gcc -Wall -Wextra -std=c11 -O2 main.c -o main
./main
```

### Example output

Input: -25

```bash
Compute the sign of an integer
Enter an integer: -25

Method 1 (comparison): sign = -1
Method 2 (unsigned shift): sign = -1
Method 3 (signed shift): sign = -1
```

Input: 25

```bash
Method 1 (comparison): sign = 0
Method 2 (unsigned shift): sign = 0
Method 3 (signed shift): sign = 0
```

### Important: Sign indicator vs. mathematical sign

Your original code computes:

| Input | Result |
| ----- | ------ |
| `-25` | `-1`   |
| `0`   | `0`    |
| `25`  | `0`    |

If you want the mathematical sign function (`-1`, `0`, `1`), use:

```bash
sign = (v > 0) - (v < 0);
```

This is the most portable and straightforward solution in C.


Here is the complete C program with all five methods added, including `printf()` output to compare their results.

### Complete C code (`main.c`)

```c

#include <stdio.h>
#include <limits.h>

int main(void) {
    int v;
    int sign;

    printf("====================================\n");
    printf("       Compute Integer Sign\n");
    printf("====================================\n");

    printf("Enter an integer: ");

    if (scanf("%d", &v) != 1) {
        printf("Invalid input.\n");
        return 1;
    }

    printf("\nInput value: %d\n\n", v);

    // Method 1: Comparison (returns -1 or 0).
    sign = -(v < 0);
    printf("Method 1 (comparison):       %d\n", sign);

    // Method 2: Unsigned shift (returns -1 or 0).
    sign = -(int)((unsigned int)v >> (sizeof(int) * CHAR_BIT - 1));
    printf("Method 2 (unsigned shift):   %d\n", sign);

    // Method 3: Signed shift (less portable).
    sign = v >> (sizeof(int) * CHAR_BIT - 1);
    printf("Method 3 (signed shift):     %d\n", sign);

    // Method 4: Sign function (-1, 0, or +1).
    sign = (v != 0) | -(int)((unsigned int)v >> (sizeof(int) * CHAR_BIT - 1));
    printf("Method 4 (bitwise OR):       %d\n", sign);

    // Method 5: Signed shift (less portable).
    sign = (v != 0) | (v >> (sizeof(int) * CHAR_BIT - 1));
    printf("Method 5 (signed shift):     %d\n", sign);

    // Method 6: Portable mathematical sign function.
    sign = (v > 0) - (v < 0);
    printf("Method 6 (portable):         %d\n", sign);

    // Method 7: Non-negative test (returns 0 or +1).
    sign = 1 ^ ((unsigned int)v >> (sizeof(int) * CHAR_BIT - 1));
    printf("Method 7 (non-negative):     %d\n", sign);

    printf("\n====================================\n");

    return 0;
}

```

### Compile and execute

```bash
gcc -Wall -Wextra -std=c11 -O2 main.c -o main
./main
```

### Expected results

| Method               | `v = -10` | `v = 0` | `v = 10` |
| -------------------- | --------- | ------- | -------- |
| 1. Comparison        | -1        | 0       | 0        |
| 2. Unsigned shift    | -1        | 0       | 0        |
| 3. Signed shift      | -1        | 0       | 0        |
| 4. Bitwise OR        | -1        | 0       | 1        |
| 5. Signed shift + OR | -1        | 0       | 1        |
| 6. Portable sign     | -1        | 0       | 1        |
| 7. Non-negative      | 0         | 1       | 1        |

### Important: How Method 4 works

Consider:

```bash
sign = (v != 0) |
       -(int)((unsigned int)v >> (sizeof(int) * CHAR_BIT - 1));
```

For a conventional 32-bit `int`:

When `v = -10`:

```c
(v != 0)                         = 1
(unsigned int)v >> 31            = 1
-(int)1                          = -1

1 | -1                           = -1
```

When `v = 10`:

```c
(v != 0)                         = 1
(unsigned int)v >> 31            = 0
-(int)0                          = 0

1 | 0                            = 1
```

When `v = 0`:

```c
(v != 0)                         = 0
(unsigned int)v >> 31            = 0
-(int)0                          = 0

0 | 0                            = 0
```



- Recommended
  - For ordinary C programming, use:


```c
sign = (v > 0) - (v < 0);
```

- It is portable, concise, and does not depend on signed integer representation or implementation-defined right shifts.

# `CHAR_BIT`
- `CHAR_BIT` is a C standard macro defined in the header `<limits.h>`. It represents the number of bits in one byte.

```c
#include <limits.h>
```

For most modern computers:

```c
CHAR_BIT == 8
```

### 1. Why do we need `CHAR_BIT`?

In C, `sizeof(int)` returns the size of an `int` in bytes, not bits.

For example, on a typical 32-bit `int` system:

```c
sizeof(int) = 4       // 4 bytes
CHAR_BIT    = 8       // 8 bits per byte
```

Therefore:

```
sizeof(int) * CHAR_BIT
```

Calculates the total number of bits in an `int`:

$$
4 \times 8 = 32 \text{ bits}
$$

### 2. Understanding your expression

```c
(unsigned int)v >> (sizeof(int) * CHAR_BIT - 1)
```

Let's break it down.

| Expression               | Meaning                       | Typical result |
| ------------------------ | ----------------------------- | -------------- |
| `sizeof(int)`            | Number of bytes in `int`      | 4              |
| `CHAR_BIT`               | Number of bits per byte       | 8              |
| `sizeof(int) * CHAR_BIT` | Total bits                    | 32             |
| `... - 1`                | Index of most significant bit | 31             |

So the expression becomes:

```c
(unsigned int)v >> 31
```

This shifts the unsigned integer right by 31 positions, leaving its most significant bit in bit position 0.

### 3. Visual example (32-bit integer)

For `v = -10`, assuming conventional 32-bit two's-complement representation:

```c
(int)v:

11111111 11111111 11111111 11110110
|                                      |
31                                     0
```

Convert to unsigned and shift right by 31:

```
(unsigned int)v >> 31
```

Result:

```
00000000 00000000 00000000 00000001
                                      |
                                      1
```

For `v = 10`:

```bash
00000000 00000000 00000000 00001010

(unsigned int)v >> 31

00000000 00000000 00000000 00000000
```

### 4. Other useful macros in `<limits.h>`

| Macro      | Meaning                          | Typical value      |
| ---------- | -------------------------------- | ------------------ |
| `CHAR_BIT` | Bits per byte                    | 8                  |
| `CHAR_MAX` | Maximum `char` value (if signed) | 127                |
| `INT_MAX`  | Maximum `int` value              | 2,147,483,647      |
| `INT_MIN`  | Minimum `int` value              | -2,147,483,648     |
| `UINT_MAX` | Maximum `unsigned int` value     | 4,294,967,295      |
| `LONG_MAX` | Maximum `long` value             | Platform-dependent |

You can inspect these values with:

```c
#include <stdio.h>
#include <limits.h>

int main(void) {
    printf("CHAR_BIT = %d\n", CHAR_BIT);
    printf("sizeof(int) = %zu bytes\n", sizeof(int));
    printf("int bits = %zu\n", sizeof(int) * CHAR_BIT);

    printf("INT_MAX = %d\n", INT_MAX);
    printf("INT_MIN = %d\n", INT_MIN);
    printf("UINT_MAX = %u\n", UINT_MAX);

    return 0;
}
```

Key takeaway:

- `sizeof(int)` measures bytes.
- `CHAR_BIT` tells you how many bits are in one byte.
- `sizeof(int) * CHAR_BIT` calculates the total bit width of an `int`.

This is particularly useful when writing low-level C code involving bit manipulation, CPU registers, integer representations, and binary operations.
