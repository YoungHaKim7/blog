---
title: glibc_string_h
published: 2026-01-02
description: 'I_ll explain the key functions in glibc_s `string.h` header, categorized by their purpose: '
image: ''
tags: [c, glibc, kernel]
category: 'z_c'
draft: false 
lang: ''
---

# link

<hr />

- I'll explain the key functions in glibc's `string.h` header, categorized by their purpose:

## Memory Operations

| Function | Purpose |
|----------|---------|
| `memcpy(dest, src, n)` | Copy n bytes from src to dest (regions MUST NOT overlap) |
| `memmove(dest, src, n)` | Copy n bytes from src to dest (handles overlapping regions safely) |
| `memset(dest, c, n)` | Fill n bytes with character c |
| `memcmp(s1, s2, n)` | Compare first n bytes of two memory blocks |
| `memchr(s, c, n)` | Find first occurrence of c in first n bytes |
| `memrchr(s, c, n)` | Find last occurrence of c in first n bytes (GNU extension) |
| `rawmemchr(s, c)` | Find c in string, assumes it exists (optimized) |
| `mempcpy(dest, src, n)` | Like memcpy but returns pointer after dest+n |
| `memccpy(dest, src, c, n)` | Copy until c found or n bytes |
| `memcmpeq(s1, s2, n)` | Memory comparison that returns 0/1 only |

## String Operations

| Function | Purpose |
|----------|---------|
| `strlen(s)` | Get string length (excluding null terminator) |
| `strnlen(s, maxlen)` | Get length up to maxlen (safe for non-null-terminated strings) |
| `strcpy(dest, src)` | Copy string (no bounds checking!) |
| `strncpy(dest, src, n)` | Copy up to n characters (may not null-terminate) |
| `strcat(dest, src)` | Append src to dest |
| `strncat(dest, src, n)` | Append up to n characters (always null-terminates) |
| `strcmp(s1, s2)` | Compare two strings |
| `strncmp(s1, s2, n)` | Compare first n characters |
| `strchr(s, c)` | Find first occurrence of c in string |
| `strrchr(s, c)` | Find last occurrence of c in string |
| `strchrnul(s, c)` | Like strchr but returns pointer to null if not found (GNU) |
| `strstr(haystack, needle)` | Find substring |
| `strcasestr(h, n)` | Case-insensitive substring search (GNU) |
| `strpbrk(s, accept)` | Find first char from accept set in s |
| `strspn(s, accept)` | Count initial chars from accept set |
| `strcspn(s, reject)` | Count initial chars NOT from reject set |
| `stpcpy(dest, src)` | Copy string, return pointer to null terminator |
| `stpncpy(dest, src, n)` | Copy up to n chars, return pointer to end |
| `strlcpy(dest, src, n)` | Copy with size limit, returns src length (BSD) |
| `strlcat(dest, src, n)` | Concatenate with size limit (BSD) |

## String Tokenization

| Function | Purpose |
|----------|---------|
| `strtok(s, delim)` | Split string into tokens (NOT thread-safe!) |
| `strtok_r(s, delim, saveptr)` | Reentrant version with state parameter |
| `strsep(stringp, delim)` | Alternative tokenizer (BSD/GNU) |

## String Duplication

| Function | Purpose |
|----------|---------|
| `strdup(s)` | Duplicate string (mallocs new copy) |
| `strndup(s, n)` | Duplicate up to n characters |

## Case-Insensitive Comparison

| Function | Purpose |
|----------|---------|
| `strcasecmp(s1, s2)` | Case-insensitive string compare |
| `strncasecmp(s1, s2, n)` | Case-insensitive compare of first n chars |
| `strcasecmp_l(s1, s2, loc)` | Locale-aware version |
| `strncasecmp_l(s1, s2, n, loc)` | Locale-aware version |

## Version/Transformation

| Function | Purpose |
|----------|---------|
| `strverscmp(s1, s2)` | Compare version strings (e.g., "file1" < "file10") |
| `strcoll(s1, s2)` | Locale-aware string comparison |
| `strxfrm(s, s2, n)` | Transform string for locale-aware comparison |

## Error/Signal Messages

| Function | Purpose |
|----------|---------|
| `strerror(errnum)` | Get error message string |
| `strerror_r(errnum, buf, buflen)` | Thread-safe version |
| `strerror_l(errnum, loc)` | Localized error message |
| `sigdescr_np(sig)` | Get signal description |

## Path Operations

| Function | Purpose |
|----------|---------|
| `basename(path)` | Get final component of path |

## Bit Operations

| Function | Purpose |
|----------|---------|
| `ffs(i)` | Find first set bit (1-indexed position) |

## Security/Safety Functions

| Function | Purpose |
|----------|---------|
| `__memcpy_chk` | Buffer overflow checked memcpy (Fortify) |
| `__memmove_chk` | Buffer overflow checked memmove |
| `__memset_chk` | Buffer overflow checked memset |
| `__strcpy_chk` | Buffer overflow checked strcpy |
| `__strcat_chk` | Buffer overflow checked strcat |
| `explicit_bzero(buf, len)` | Zero memory that won't be optimized away |
| `memset_explicit(buf, c, len)` | Like explicit_bzero but with any value |

## Utility Functions

| Function | Purpose |
|----------|---------|
| `bzero(s, n)` | Zero n bytes (deprecated, use memset) |

## Key Design Patterns:

1. **`__` prefix** = Internal glibc functions (`__memcpy`, `__strlen`, etc.)
2. **`_chk` suffix** = Runtime buffer overflow checking (FORTIFY_SOURCE)
3. **`_r` suffix** = Reentrant (thread-safe) versions
4. **`_l` suffix** = Locale-aware versions
5. **`libc_hidden_proto`** = Optimization - hides symbols for faster internal calls

## Why so many variants?

- **Performance**: `rawmemchr` assumes char exists, `mempcpy` returns end pointer
- **Safety**: `_chk` functions prevent buffer overflows
- **Thread safety**: `_r` versions store state in user-provided memory
- **Locale**: Different cultures have different string comparison rules
- **Backward compatibility**: BSD functions like `strlcpy`, deprecated `bzero`

This is the foundation of C string manipulation - virtually every C program uses these functions!

