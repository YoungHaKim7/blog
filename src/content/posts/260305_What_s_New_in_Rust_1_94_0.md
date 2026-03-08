---
title: 260305_What_s_New_in_Rust_1_94_0
published: 2026-03-05
description: 'Announcing Rust 1.94.0 (Mar. 5, 2026 · The Rust Release Team)'
image: ''
tags: [rust, release]
category: 'rust_Releases_Notes'
draft: false 
lang: ''
---

# link

- [Announcing Rust 1.94.0(Mar. 5, 2026 · The Rust Release Team)](https://blog.rust-lang.org/2026/03/05/Rust-1.94.0/)

<hr />

# What's in 1.94.0 stable

## Array windows

- Rust 1.94 adds array_windows, an iterating method for slices. It works just like windows but with a constant length, so the iterator items are &[T; N] rather than dynamically-sized &[T]. In many cases, the window length may even be inferred by how the iterator is used!

- For example, part of one 2016 Advent of Code puzzle is looking for ABBA patterns: "two different characters followed by the reverse of that pair, such as xyyx or abba." If we assume only ASCII characters, that could be written by sweeping windows of the byte slice like this:

```rs
fn has_abba(s: &str) -> bool {
    s.as_bytes()
        .array_windows()
        .any(|[a1, b1, b2, a2]| (a1 != b1) && (a1 == a2) && (b1 == b2))
}

```

- The destructuring argument pattern in that closure lets the compiler infer that we want windows of 4 here. If we had used the older .windows(4) iterator, then that argument would be a slice which we would have to index manually, hoping that runtime bounds-checking will be optimized away.



# rust code연습

```rs
fn has_abba(s: &str) -> bool {
    s.as_bytes()
        .array_windows()
        .any(|[a1, b1, b2, a2]| (a1 != b1) && (a1 == a2) && (b1 == b2))
}

fn find_abba_positions(s: &str) -> Vec<(usize, String)> {
    s.as_bytes()
        .array_windows()
        .enumerate()
        .filter_map(|(i, &[a1, b1, b2, a2])| {
            if (a1 != b1) && (a1 == a2) && (b1 == b2) {
                let pattern: String = vec![a1, b1, b2, a2]
                    .into_iter()
                    .map(|c| c as char)
                    .collect();
                Some((i, pattern))
            } else {
                None
            }
        })
        .collect()
}

fn main() {
    // "example01_basic"
    println!("=== Basic ABBA Pattern Detection ===\n");

    let test_cases = vec![
        ("abba", true),   // Classic ABBA pattern
        ("xyyx", true),   // Another ABBA pattern
        ("aaaa", false),  // Not ABBA (all same)
        ("abca", false),  // Not ABBA (middle not same)
        ("ababa", false), // Windows: "abab", "baba" - neither are ABBA
        ("hello", false), // No ABBA pattern
        ("", false),      // Empty string
        ("abb", false),   // Too short
        ("aabb", false),  // Window is "aabb" - doesn't match ABBA
    ];

    for (input, expected) in test_cases {
        let result = has_abba(input);
        let status = if result == expected { "✓" } else { "✗" };
        println!(
            "{status} \"{:10}\" -> {} (expected: {})",
            input, result, expected
        );
    }

    // example02_filter.rs
    println!("=== Filtering Words with ABBA Patterns ===\n");

    let words = vec![
        "radar", "level", "civic", "kayak", // Palindromes
        "abba", "xyyx", "deed", "noon", // ABBA patterns
        "hello", "world", "rust", "code", // No ABBA
        "anna", "elle", "momm", // Mixed
    ];

    println!("All words:");
    for word in &words {
        print!("{word} ");
    }
    println!("\n");

    let words_with_abba: Vec<_> = words.iter().filter(|word| has_abba(word)).collect();

    println!("Words with ABBA pattern: {} found", words_with_abba.len());
    for word in words_with_abba {
        println!("  - {word}");
    }
    // Example 3: Find ABBA pattern positions
    // Demonstrates finding and displaying where ABBA patterns occur
    println!("=== Finding ABBA Pattern Positions ===\n");

    let test_strings = vec!["abba", "xyyxyyx", "abababa", "xabbay", "no-pattern-here"];

    for s in test_strings {
        let has = has_abba(s);
        let positions = find_abba_positions(s);

        println!("String: \"{s}\"");
        println!("  Has ABBA: {has}");

        if !positions.is_empty() {
            println!("  ABBA positions:");
            for (pos, pattern) in positions {
                println!("    - Position {pos}: \"{pattern}\"");
            }
        }
        println!();
    }
}
```

- result
```bash
=== Basic ABBA Pattern Detection ===

✓ "abba      " -> true (expected: true)
✓ "xyyx      " -> true (expected: true)
✓ "aaaa      " -> false (expected: false)
✓ "abca      " -> false (expected: false)
✓ "ababa     " -> false (expected: false)
✓ "hello     " -> false (expected: false)
✓ "          " -> false (expected: false)
✓ "abb       " -> false (expected: false)
✓ "aabb      " -> false (expected: false)
=== Filtering Words with ABBA Patterns ===

All words:
radar level civic kayak abba xyyx deed noon hello world rust code anna elle momm 

Words with ABBA pattern: 6 found
  - abba
  - xyyx
  - deed
  - noon
  - anna
  - elle
=== Finding ABBA Pattern Positions ===

String: "abba"
  Has ABBA: true
  ABBA positions:
    - Position 0: "abba"

String: "xyyxyyx"
  Has ABBA: true
  ABBA positions:
    - Position 0: "xyyx"
    - Position 3: "xyyx"

String: "abababa"
  Has ABBA: false

String: "xabbay"
  Has ABBA: true
  ABBA positions:
    - Position 1: "abba"

String: "no-pattern-here"
  Has ABBA: false
```
