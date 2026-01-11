---
title: 260110_002array_Haskell_VS_Rust_FP
published: 2026-01-10
description: 'Haskell array && Rust array + map+fileter+zip / 002 러스트 개발자가 되기 위한 Functional Programming 기초 필수 지식 '
image: ''
tags: [rust, std, haskell, FP, Functional]
category: 'haskell'
draft: false 
lang: ''
---

# link
- [Haskell array](#haskell-array)
- [Rust array](#rust-array)

# Summary
- Haskell Array VS Rust array 비교해서 감을 잡아보자
  - Rust는 Array만 쓰고 싶었지만 길이가 줄어들고 변수가 변화하는 기능구현은 어쩔수 없이 Vector를 사용하였다. ㅠㅠ

# 출처: 

- [FP 영상 모아보기](https://youtube.com/playlist?list=PLA_-EWSPTJcu4i7RFCl_KeGrrz37C4_Oc&si=Hus4TzJtODo6bGI6)

# Haskell array[|🔝|](#link)
- [haskell code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/001_FP_Functional_Programming/001_Core_Principle_of_FP/b01_array_list)

```hs
numbers :: [Int]
numbers = [10, 20, 30, 40]

-- Access by index (not recommended for performance)
value :: Int
value = numbers !! 2   -- 30

squares :: [Int]
squares = map (^2) numbers

evens :: [Int]
evens = filter even numbers

total :: Int
total = sum numbers

main :: IO ()
main = do
    putStrLn "=== Basic List ==="
    print numbers          -- [10,20,30,40]

    putStrLn "\n=== Index Access (use carefully) ==="
    print value            -- 30

    putStrLn "\n=== Map: Transform each element ==="
    print squares          -- [100,400,900,1600]
    print (map (*3) numbers)  -- [30,60,90,120]

    putStrLn "\n=== Filter: Select elements ==="
    print evens            -- [10,20,30,40] (all are even)
    print (filter (>25) numbers) -- [30,40]

    putStrLn "\n=== Fold: Reduce to single value ==="
    print total            -- 100
    print (product numbers) -- 2400000
    print (foldl (+) 0 numbers) -- 100
    print (foldr (-) 0 numbers) -- -20

    putStrLn "\n=== List Operations ==="
    print (head numbers)   -- 10
    print (tail numbers)   -- [20,30,40]
    print (init numbers)   -- [10,20,30]
    print (last numbers)   -- 40
    print (length numbers) -- 4
    print (null numbers)   -- False

    putStrLn "\n=== List Construction ==="
    print (5 : numbers)    -- [5,10,20,30,40]
    print (numbers ++ [50,60]) -- [10,20,30,40,50,60]
    print (replicate 4 7)  -- [7,7,7,7]
    print (take 3 numbers) -- [10,20,30]
    print (drop 2 numbers) -- [30,40]

    putStrLn "\n=== List Comprehensions ==="
    print [x*2 | x <- numbers]  -- [20,40,60,80]
    print [x | x <- numbers, x > 25]  -- [30,40]
    print [(x,y) | x <- [1..3], y <- [10..12]] -- Cartesian product

    putStrLn "\n=== Zipping ==="
    print (zip [1..4] "abcd")  -- [(1,'a'),(2,'b'),(3,'c'),(4,'d')]
    print (zipWith (+) numbers [1..4])  -- [11,22,33,44]

    putStrLn "\n=== More Useful Functions ==="
    print (reverse numbers) -- [40,30,20,10]
    print (minimum numbers) -- 10
    print (maximum numbers) -- 40
```

- result(haskell)

```bash
=== Basic List ===
[10,20,30,40]

=== Index Access (use carefully) ===
30

=== Map: Transform each element ===
[100,400,900,1600]
[30,60,90,120]

=== Filter: Select elements ===
[10,20,30,40]
[30,40]

=== Fold: Reduce to single value ===
100
240000
100
-20

[20,30,40]
[10,20,30]
40
4
False

=== List Construction ===
[5,10,20,30,40]
[10,20,30,40,50,60]
[7,7,7,7]
[10,20,30]
[30,40]

=== List Comprehensions ===
[20,40,60,80]                                                                                                                                         [30,40]                                                                                                                                               [(1,10),(1,11),(1,12),(2,10),(2,11),(2,12),(3,10),(3,11),(3,12)]

=== Zipping ===
[(1,'a'),(2,'b'),(3,'c'),(4,'d')]
[11,22,33,44]

=== More Useful Functions ===
[40,30,20,10]
10
40
```

# Rust array[|🔝|](#link)

- [rust code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/004_FP_Functional_Programming/a02_array_zip_rev_map_filter)

```rs
fn main() {
    // === Basic List ===
    let numbers = vec![10, 20, 30, 40];

    println!("=== Basic List ===");
    println!("{numbers:?}"); // [10, 20, 30, 40]

    // === Index Access (use carefully) ===
    let value = numbers[2];
    println!("\n=== Index Access (use carefully) ===");
    println!("{value}"); // 30

    // === Map: Transform each element ===
    let squares: Vec<i32> = numbers.iter().map(|x| x * x).collect();
    let times_three: Vec<i32> = numbers.iter().map(|x| x * 3).collect();

    println!("\n=== Map: Transform each element ===");
    println!("{squares:?}");
    println!("{times_three:?}");

    // === Filter: Select elements ===
    let evens: Vec<i32> = numbers.iter().copied().filter(|x| x % 2 == 0).collect();
    let greater_than_25: Vec<i32> = numbers.iter().copied().filter(|x| *x > 25).collect();

    println!("\n=== Filter: Select elements ===");
    println!("{evens:?}");
    println!("{greater_than_25:?}");

    // === Fold: Reduce to single value ===
    let total: i32 = numbers.iter().sum();
    let product: i32 = numbers.iter().product();
    let foldl = numbers.iter().fold(0, |acc, x| acc + x);
    let foldr = numbers.iter().rev().fold(0, |acc, x| x - acc);

    println!("\n=== Fold: Reduce to single value ===");
    println!("{total}");
    println!("{product}");
    println!("{foldl}");
    println!("{foldr}");

    // === List Operations ===
    println!("\n=== List Operations ===");
    println!("{:?}", numbers.first()); // Some(10)
    println!("{:?}", &numbers[1..]); // [20, 30, 40]
    println!("{:?}", &numbers[..numbers.len() - 1]); // [10, 20, 30]
    println!("{:?}", numbers.last()); // Some(40)
    println!("{}", numbers.len());
    println!("{}", numbers.is_empty());

    // === List Construction ===
    println!("\n=== List Construction ===");
    let mut cons = vec![5];
    cons.extend(&numbers);
    println!("{cons:?}");

    let mut appended = numbers.clone();
    appended.extend([50, 60]);
    println!("{appended:?}");

    println!("{:?}", vec![7; 4]); // replicate
    println!("{:?}", &numbers[..3]); // take
    println!("{:?}", &numbers[2..]); // drop

    // === List Comprehensions ===
    println!("\n=== List Comprehensions ===");
    let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();
    let filtered: Vec<i32> = numbers.iter().copied().filter(|x| *x > 25).collect();

    let cartesian: Vec<(i32, i32)> = (1..=3)
        .flat_map(|x| (10..=12).map(move |y| (x, y)))
        .collect();

    println!("{doubled:?}");
    println!("{filtered:?}");
    println!("{cartesian:?}");

    // === Zipping ===
    println!("\n=== Zipping ===");
    let zipped: Vec<(i32, char)> = (1..=4).zip("abcd".chars()).collect();
    let zip_with: Vec<i32> = numbers.iter().zip(1..=4).map(|(a, b)| a + b).collect();

    println!("{zipped:?}");
    println!("{zip_with:?}");

    // === More Useful Functions ===
    println!("\n=== More Useful Functions ===");
    let reversed: Vec<i32> = numbers.iter().rev().copied().collect();
    let min = numbers.iter().min();
    let max = numbers.iter().max();

    println!("{reversed:?}");
    println!("{min:?}");
    println!("{max:?}");
}
```

- result(Rust code)

```bash

=== Basic List ===
[10, 20, 30, 40]

=== Index Access (use carefully) ===
30

=== Map: Transform each element ===
[100, 400, 900, 1600]
[30, 60, 90, 120]

=== Filter: Select elements ===
[10, 20, 30, 40]
[30, 40]

=== Fold: Reduce to single value ===
100
240000
100
-20

=== List Operations ===
Some(10)
[20, 30, 40]
[10, 20, 30]
Some(40)
4
false

=== List Construction ===
[5, 10, 20, 30, 40]
[10, 20, 30, 40, 50, 60]
[7, 7, 7, 7]
[10, 20, 30]
[30, 40]

=== List Comprehensions ===
[20, 40, 60, 80]
[30, 40]
[(1, 10), (1, 11), (1, 12), (2, 10), (2, 11), (2, 12), (3, 10), (3, 11), (3, 12)]

=== Zipping ===
[(1, 'a'), (2, 'b'), (3, 'c'), (4, 'd')]
[11, 22, 33, 44]

=== More Useful Functions ===
[40, 30, 20, 10]
Some(10)
Some(40)
```

