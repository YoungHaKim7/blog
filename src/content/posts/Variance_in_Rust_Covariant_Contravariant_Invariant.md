---
title: Variance_in_Rust_Covariant_Contravariant_Invariant
published: 2026-02-08
description: '(그림으로 이해)CLI lifetime substitution visualization(Covariant vs Contravariant vs Invariant)'
image: ''
tags: [rust, covariant, contravariant, invariant, std]
category: 'rust'
draft: false 
lang: ''
---

# link

- 수학용어 잘 정리
  - https://en.wikipedia.org/wiki/Glossary_of_mathematical_symbols
- reference
  - https://doc.rust-lang.org/reference/subtyping.html
- nomicon
  - https://doc.rust-lang.org/nomicon/subtyping.html
- 한글로 잘 정리
  - https://yoo11052.tistory.com/234

- [(210221)Crust of Rust: Subtyping and Variance Jon Gjengset](https://youtu.be/iVYWDIW71jk?si=b3dl11_AU5hAczb_)

- [Rust contravariance, Regarding the contravariance of `fn(&’a i32) -> ()`](https://users.rust-lang.org/t/rust-contravariance-regarding-the-contravariance-of-fn-a-i32/124379)

- [(그림으로 이해)CLI lifetime substitution visualization(Covariant vs Contravariant vs Invariant)]()
  - [3️⃣  Covariance — “flows forward”](#3%EF%B8%8F⃣-covariance--flows-forward)
  - [4️⃣  Contravariance — “flows backward”](#4%EF%B8%8F⃣-contravariance--flows-backward)
  - [5️⃣  Invariance — “no movement allowed”](#5%EF%B8%8F⃣-invariance--no-movement-allowed)

- [(code)Variant in Rust](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/007_Variance_in_Rust)

# (그림으로 이해)CLI lifetime substitution visualization(Covariant vs Contravariant vs Invariant)[|🔝|](#link)

```bash
Let:
'long  ─────────────────────────
'short ───────────────

COVARIANT:
&'long T → &'short T   ✅

CONTRAVARIANT:
fn(&'short T) → fn(&'long T) ✅

INVARIANT:
&'long mut T → &'short mut T ❌
&'long mut T → &'long mut T  ✔ only exact
```

# 🧠 Final compressed rule (the one to remember)[|🔝|](#link)

- ChatGPT 가 제시
```bash
Produces T only        → Covariant
Consumes T only        → Contravariant
Produces + Consumes T → Invariant
```

- 내가 이해한거
  - 결국 라이프라임이 parameter변수가 길고 -> 리턴할 때 라이프 타임이 짧으면 안됨.
- lifetime이 안전한지를 판단하는 용어가(Covariant, Contravariant, Invariant)

```bash
READ only      → Covariant
WRITE only     → Contravariant
READ + WRITE   → Invariant
```

- ✅ Correct
- ✅ Rust-accurate
- ✅ Predictive
  - ✅ 정답
  - ✅ 녹이 슬지 않는 정확한
  - ✅ 예측


# Rustnomicon에서 설명한 자료(Variance)[|🔝|](#link)
- https://doc.rust-lang.org/nomicon/subtyping.html

- The type `F`'s variance is how the subtyping of its inputs affects the subtyping of its outputs. There are three kinds of variance in Rust. Given two types `Sub` and `Super`, where Sub is a subtype of `Super`:

  - `F` is covariant if `F<Sub>` is a subtype of `F<Super>` (the subtype property is passed through)
  - `F` is contravariant if `F<Super>` is a subtype of `F<Sub>` (the subtype property is "inverted")
  - `F` is invariant otherwise (no subtyping relationship exists)

- If we remember from the above examples, it was ok for us to treat `&'a T` as a subtype of `&'b T if 'a <: 'b`, therefore we can say that `&'a T` is covariant over `'a`.

- Also, we saw that it was not ok for us to treat `&mut &'a T` as a subtype of `&mut &'b T`, therefore we can say that `&mut T` is invariant over `T`

- 유형 `F`의 분산은 입력의 하위 유형이 출력의 하위 유형에 미치는 영향입니다. Rust에는 세 가지 종류의 분산이 있습니다. 주어진 두 가지 유형의 `Sub`와 `Super`, 여기서 Sub는 `Super`의 하위 유형입니다:

  - `F<Sub>`가 `F<Super>`의 하위 유형인 경우 `F`는 공변형입니다(하위 유형 속성이 통과됨)
  - `F<Super>`가 `F<Sub>`의 하위 유형인 경우 `F`는 반변수입니다(하위 유형 속성은 "반전")
  - 그렇지 않으면 `F`는 불변입니다(하위 유형 관계는 존재하지 않습니다)

- 위의 예시들을 기억해보면, `&a T`를 `&b T`의 하위 유형으로 취급해도 괜찮았습니다. 만약 'a'가 <: 'b'라면, 우리는 `&a T`가 `a`보다 공변적이라고 말할 수 있습니다.

- 또한, 우리는 `&mut &a T`를 `&mut &b T`의 아형으로 취급하는 것이 괜찮지 않다는 것을 알았기 때문에 `&mut T`가 `T`보다 불변이라고 말할 수 있습니다

- Here is a table of some other generic types and their variances:
  - 다음은 몇 가지 일반적인 유형과 그 차이에 대한 표입니다:

<table><thead><tr><th></th><th style="text-align: center">'a</th><th style="text-align: center">T</th><th style="text-align: center">U</th></tr></thead><tbody>
<tr><td><code>&amp;'a T </code></td><td style="text-align: center">covariant</td><td style="text-align: center">covariant</td><td style="text-align: center"></td></tr>
<tr><td><code>&amp;'a mut T</code></td><td style="text-align: center">covariant</td><td style="text-align: center">invariant</td><td style="text-align: center"></td></tr>
<tr><td><code>Box&lt;T&gt;</code></td><td style="text-align: center"></td><td style="text-align: center">covariant</td><td style="text-align: center"></td></tr>
<tr><td><code>Vec&lt;T&gt;</code></td><td style="text-align: center"></td><td style="text-align: center">covariant</td><td style="text-align: center"></td></tr>
<tr><td><code>UnsafeCell&lt;T&gt;</code></td><td style="text-align: center"></td><td style="text-align: center">invariant</td><td style="text-align: center"></td></tr>
<tr><td><code>Cell&lt;T&gt;</code></td><td style="text-align: center"></td><td style="text-align: center">invariant</td><td style="text-align: center"></td></tr>
<tr><td><code>fn(T) -&gt; U</code></td><td style="text-align: center"></td><td style="text-align: center"><strong>contra</strong>variant</td><td style="text-align: center">covariant</td></tr>
<tr><td><code>*const T</code></td><td style="text-align: center"></td><td style="text-align: center">covariant</td><td style="text-align: center"></td></tr>
<tr><td><code>*mut T</code></td><td style="text-align: center"></td><td style="text-align: center">invariant</td><td style="text-align: center"></td></tr>
</tbody></table>

- Some of these can be explained simply in relation to the others:

  - `Vec<T>` and all other owning pointers and collections follow the same logic as `Box<T>`
  - `Cell<T>` and all other interior mutability types follow the same logic as `UnsafeCell<T>`
  - `UnsafeCell<T>` having interior mutability gives it the same variance properties as `&mut T`
  - `*const T` follows the logic of `&T`
  - `*mut T` follows the logic of `&mut T` (or `UnsafeCell<T>`)

# 1️⃣ Mental model (one screen)[|🔝|](#link)

```txt
Sub <: Super
```

| Variance      | Relationship       |
| ------------- | ------------------ |
| Covariant     | `F<Sub> <: F<Super>` |
| Contravariant | `F<Super> <: F<Sub>` |
| Invariant     | no relation        |

# 2️⃣ CLI-style master table (built-ins)[|🔝|](#link)

| Type                    | Lifetime 'a | Type T      |
|-|-|-|
| &'a T                   | covariant   | covariant   |
| &'a mut T               | covariant   | invariant   |
| *const T                |     -       | covariant   |
| *mut T                  |     -       | invariant   |
| Box<T>                  |     -       | covariant   |
| Vec<T>                  |     -       | covariant   |
| UnsafeCell<T>           |     -       | invariant   |
| Cell<T>                 |     -       | invariant   |
| fn(T) -> U              |     -       | contra / co |
| dyn Trait<T> + 'a       | covariant   | invariant   |

```rs
use std::cell::Cell;

// ============================================================
// VARIANCE ANNOTATIONS - Why each field is covariant/invariant/contravariant
// ============================================================

#[derive(Debug)]
struct MyType<'a, 'b, A: 'a, B: 'b, C, D, E, F, G: Copy, H: Copy, In, Out, Mixed> {
    // ────────────────────────────────────────────────────────────────
    // a: &'a A  →  Covariant over 'a AND Covariant over A
    // ────────────────────────────────────────────────────────────────
    // WHY: Immutable reference can be treated as a shorter-lived reference
    // and can read from more specific types (subtyping works both ways)
    //
    // Example: &'static str can be used where &'a str is expected
    //          (longer lifetime → shorter lifetime is OK)
    //
    // ✅ WORKS: &'static i32 → &'a i32  (lifetime covariance)
    // ✅ WORKS: &'a Animal → &'a Dog   (type covariance - read only)
    a: &'a A,

    // ────────────────────────────────────────────────────────────────
    // b: &'b mut B  →  Covariant over 'b, INVARIANT over B
    // ────────────────────────────────────────────────────────────────
    // WHY: Can shorten lifetime, but CANNOT change type B
    //
    // ❌ NOT OK to be covariant over B because:
    //    If &'b mut Dog could become &'b mut Animal,
    //    you could write a Cat into the Dog's memory!
    //
    // Example of unsoundness if covariant:
    //   let mut dog: Dog = ...;
    //   let ref_mut: &mut Dog = &mut dog;
    //   let ref_animal: &mut Animal = ref_mut;  // ❌ If allowed...
    //   *ref_animal = Cat;  // 😱 Now dog is a Cat!
    b: &'b mut B,

    // ────────────────────────────────────────────────────────────────
    // c: *const C  →  Covariant over C
    // ────────────────────────────────────────────────────────────────
    // WHY: Read-only pointer, like &T - can read from more specific types
    // ✅ Similar to&T: safe to treat *const Dog as *const Animal
    c: *const C,

    // ────────────────────────────────────────────────────────────────
    // d: *mut D  →  INVARIANT over D
    // ────────────────────────────────────────────────────────────────
    // WHY: Mutable pointer allows writing, same issue as &mut T
    //
    // ❌ If *mut Dog could become *mut Animal:
    //    let mut dog: Dog = ...;
    //    let ptr: *mut Dog = &mut dog;
    //    let ptr_animal: *mut Animal = ptr;  // ❌ If allowed...
    //    *ptr_animal = Cat;  // 😱 Type confusion!
    d: *mut D,

    // ────────────────────────────────────────────────────────────────
    // e: E  →  Covariant over E
    // ────────────────────────────────────────────────────────────────
    // WHY: Owned value, can consume Dog where Animal is expected
    // ✅ MyType<Dog> can be used where MyType<Animal> is needed
    e: E,

    // ────────────────────────────────────────────────────────────────
    // f: Vec<F>  →  Covariant over F
    // ────────────────────────────────────────────────────────────────
    // WHY: Vec is like owned collection - only way to access T is by
    //      moving it out (which consumes Vec) or getting &T references
    // ✅ Vec<Dog> → Vec<Animal> is safe
    f: Vec<F>,

    // ────────────────────────────────────────────────────────────────
    // g: Cell<G>  →  INVARIANT over G
    // ────────────────────────────────────────────────────────────────
    // WHY: Cell allows interior mutation via &Cell<T>
    //
    // ❌ If Cell<Dog> could become Cell<Animal>:
    //    let dog_cell: Cell<Dog> = Cell::new(Dog);
    //    let animal_cell: &Cell<Animal> = &dog_cell;  // ❌ If allowed...
    //    animal_cell.set(Cat);  // 😱 dog_cell now contains Cat!
    //
    // KEY RULE: Any type with interior mutability (&T can modify T) is INVARIANT
    g: Cell<G>,

    // ────────────────────────────────────────────────────────────────
    // h1: H  →  Covariant over H (normally)
    // h2: Cell<H>  →  Invariant over H
    // RESULT:  INVARIANT over H (invariance WINS all conflicts)
    // ────────────────────────────────────────────────────────────────
    // WHY: When a type parameter appears in both covariant AND invariant
    //      positions, the overall variance is INVARIANT
    //
    // Rule: Covariant × Invariant = Invariant
    //
    // This prevents the unsound conversion through the invariant path
    h1: H,
    h2: Cell<H>,

    // ────────────────────────────────────────────────────────────────
    // i: fn(In) -> Out  →  CONTRAVARIANT over In, Covariant over Out
    // ────────────────────────────────────────────────────────────────
    // WHY: Function follows Liskov substitution principle backwards
    //
    // Input (In) is CONTRAVARIANT:
    //   fn(Animal) -> T  can be used where fn(Dog) -> T  is expected
    //   (accepting more general type is OK when more specific is needed)
    //
    // Output (Out) is COVARIANT:
    //   fn() -> Dog  can be used where fn() -> Animal  is expected
    //   (returning more specific type is OK)
    //
    // Remember: "Consumer is contravariant, Producer is covariant"
    i: fn(In) -> Out,

    // ────────────────────────────────────────────────────────────────
    // k1: fn(Mixed) -> usize  →  Contravariant over Mixed (normally)
    // k2: Mixed  →  Covariant over Mixed (normally)
    // RESULT:  INVARIANT over Mixed (invariance WINS all conflicts)
    // ────────────────────────────────────────────────────────────────
    // Same rule: when type appears in multiple positions with different
    // variances, the result is always INVARIANT
    //
    // Rule: Contravariant × Covariant = Invariant
    k1: fn(Mixed) -> usize,
    k2: Mixed,
}

fn main() {
    // ============================================================
    // ORIGINAL CODE THAT DIDN'T WORK:
    // Variables a, b, c, d, e, f, g, h1, h2, i, k1, k2
    // were never defined!
    // ============================================================

    // Working example with concrete types:
    let x: i32 = 42;
    let a: &i32 = &x;

    let mut y: i32 = 10;
    let b: &mut i32 = &mut y;

    let c: *const i32 = &x as *const i32;
    // Note: Using separate variable to avoid multiple mutable borrows
    let mut z: i32 = 20;
    let d: *mut i32 = &mut z as *mut i32;

    let e: i32 = 100;
    let f: Vec<i32> = vec![1, 2, 3];
    let g: Cell<i32> = Cell::new(5);

    let h1: i32 = 50;
    let h2: Cell<i32> = Cell::new(25);

    let i: fn(i32) -> i32 = |x| x * 2;

    let k1: fn(i32) -> usize = |x| x as usize;
    let k2: i32 = 99;

    let my_data = MyType {
        a,
        b,
        c,
        d,
        e,
        f,
        g,
        h1,
        h2,
        i,
        k1,
        k2,
    };

    println!("{my_data:?}");
}


```

# 3️⃣ Covariance — “flows forward”[|🔝|](#link)

- Rule

```txt
'a <: 'b
⇒ &'a T <: &'b T
```

## ✅ Example: `&'a T` (covariant)

```rs
fn takes_long02<'long>(x: &'long i32) -> i32 {
    let add = 20;
    x + add
}

fn main() {
    println!("{}", takes_long02(&100));
}
```

- Why it works

```rs
&'short i32 <: &'long i32
```

- Because:
  - you can read
  - you cannot mutate


## ✅ Example: `Vec<T>` (covariant)

```rs
fn take_vec(v: Vec<&'static str>) {}

fn main() {
    let v: Vec<&'static str> = vec!["hello"];
    take_vec(v); // OK
}
```

- Reason:

```rs
Vec<T> owns T
No mutation through aliasing
```

# 4️⃣ Contravariance — “flows backward”[|🔝|](#link)
- Contravariance — “flows backward”
- Only really shows up in function arguments

- Rule

```txt
T <: U
⇒ fn(U) <: fn(T)
```

```rs
// =====================================================
// CONTRAVARIANCE DEMONSTRATION in Rust
// =====================================================
//
// Function parameter types are CONTRAVARIANT
// This means: if T <: U, then fn(U) <: fn(T) (relationship flips!)
//
// For lifetimes: 'short <: 'long <: 'static (covariant - shorter is subtype of longer)
// Therefore:   fn(&'static) <: fn(&'long) <: fn(&'short) (contravariant - flipped!)

fn main() {
    // ================================================================
    // KEY INSIGHT: Understanding Contravariance Direction
    // ================================================================
    //
    // Which function type is "more permissive"?
    //
    // fn(&'long i32)  vs  fn(&'short i32)
    //
    // Answer: fn(&'long i32) is MORE PERMISSIVE!
    // Why? Because:
    //   - fn(&'long) CAN be called with &'short  (shorter coerces to longer) ✓
    //   - fn(&'short) CANNOT be called with &'long (longer won't coerce to shorter) ✗
    //
    // So: fn(&'long) <: fn(&'short)  (relationship is FLIPPED!)

    // ================================================================
    // DEMONSTRATION: Contravariance error with function pointers
    // ================================================================

    fn takes_static(x: &'static i32) -> i32 {
        *x
    }

    fn takes_any<'a>(x: &'a i32) -> i32 {
        *x
    }

    // Function pointer types
    type FnStatic = fn(&'static i32) -> i32;

    // takes_static has type: fn(&'static i32) -> i32
    // takes_any has type:    for<'a> fn(&'a i32) -> i32

    // Assignment 1: Works because takes_any can handle 'static
    let _f1: FnStatic = takes_any; // OK ✓

    // Assignment 2: ERROR! takes_static is more restrictive
    // let _f2: fn(&i32) = takes_static;  // ERROR ✗
    //
    // Error message:
    // "expected fn pointer `for<'a> fn(&'a _) -> _`,
    //  found fn item `fn(&'static _) -> _`"
    //
    // Why? Because:
    // - The target type accepts ANY lifetime ('a)
    // - takes_static only accepts 'static
    // - Cannot use a MORE restrictive function where a MORE permissive one is expected
    //
    // This is contravariance in action!

    // ================================================================
    // DEMONSTRATION 2: Visualizing the relationship
    // ================================================================

    // Lifetime hierarchy (covariant):
    // 'short <: 'long <: 'static
    // (shorter lifetimes are subtypes of longer ones)

    // Function pointer hierarchy (contravariant - FLIPPED!):
    // fn(&'static) <: fn(&'long) <: fn(&'short)
    // (functions accepting longer lifetimes are subtypes of functions accepting shorter ones)

    // Why the flip?
    //
    // fn(&'long) is MORE PERMISSIVE because it can accept:
    //   - &'long
    //   - &'short (coerces to &'long)
    //
    // fn(&'short) is LESS PERMISSIVE because it can only accept:
    //   - &'short
    //   - NOT &'long (won't coerce)

    // Therefore: fn(&'long) <: fn(&'short) (subtype relationship!)

    // ================================================================
    // DEMONSTRATION 3: Type coercion examples
    // ================================================================

    // Example showing lifetime coercion
    fn demonstrate_coercion() {
        let x: i32 = 42;
        let short_ref: &i32 = &x;

        // Functions with longer lifetime parameters can accept shorter references
        // This is why fn(&'long) is more permissive than fn(&'short)
        let callback: fn(&i32) -> i32 = |val: &i32| *val;
        let _ = callback(&x); // Works - any reference can be passed
        let _ = callback(short_ref); // Also works
    }

    // ================================================================
    // Summary: Variance Rules in Rust
    // ================================================================
    //
    // Type Constructor   | Variance in Lifetime | Example
    // -------------------|----------------------|------------------------
    // &T                 | Covariant            | &'long <: &'short
    // &mut T             | Covariant (lifetime) | &'long mut <: &'short mut
    // fn(&T)             | CONTRAVARIANT        | fn(&'short) <: fn(&'long)
    // fn() -> &T         | Covariant            | fn()->&'long <: fn()->&'short
    // Box<T>             | Covariant            | Box<Cat> <: Box<Animal>
    // Cell<T>            | Invariant            | No subtyping
    // UnsafeCell<T>      | Invariant            | No subtyping
    //
    // Key mnemonic:
    // - INPUT positions  = Contravariant (flips relationship)
    // - OUTPUT positions = Covariant (preserves relationship)
    // - BOTH input+output = Invariant (no relationship)

    println!("Contravariance demonstration complete!");
    println!();
    println!("Key insight:");
    println!("  'short <: 'long     (covariant)");
    println!("  fn(&'long) <: fn(&'short)  (CONTRAVARIANT - flipped!)");
}
```

- result

```bash
Contravariance demonstration complete!

Key insight:
  'short <: 'long     (covariant)
  fn(&'long) <: fn(&'short)  (CONTRAVARIANT - flipped!)
```


# 5️⃣ Invariance — “no movement allowed”[|🔝|](#link) 

- Rule

```rs
T <: U
≠> F<T> <: F<U>
```

## ❌ Example: `&mut T` (invariant)

```rs
fn demonstrate_exact_match<'a, 'b>(x: &'a mut &'b i32, long_lived: &'b i32) {
    let local = 42;

    // ❌ ERROR: lifetime mismatch
    // &mut T is invariant - we CANNOT write shorter lifetime into it
    // *x = &local;  // This would create dangling pointer!

    // ✅ This works - exact lifetime match
    *x = long_lived;
}

fn main() {
    // Error
    // demonstrate_exact_match(&mut (&_long), &_long);
}
```

## ❌ Example: UnsafeCell<T>


```rs
use std::cell::UnsafeCell;

// Demonstrating invariance: Box<T> is covariant, but UnsafeCell<T> is invariant

// This works - Box is covariant, so Box<&'short i32> can become Box<&'long i32>
fn box_covariant_demo<'a, 'b>(x: Box<&'a i32>) -> Box<&'b i32>
where
    'a: 'b, // 'a outlives 'b, so &'a can shrink to &'b
{
    x // ✓ Covariant: shorter lifetime is OK
}

// This would NOT work - UnsafeCell is invariant
// fn unsafecell_invariant_demo<'a, 'b>(x: UnsafeCell<&'a i32>) -> UnsafeCell<&'b i32>
// where
//     'a: 'b,
// {
//     x  // ❌ ERROR: UnsafeCell is invariant, T cannot change
// }

fn main() {
    let value = 5;
    let cell = UnsafeCell::new(&value);

    // ❌ ERROR: cannot assign to immutable reference
    // *cell.get() = &value;

    // Demonstrate why invariance matters:
    // If UnsafeCell were covariant, this would compile and be unsound:

    /*
    fn evil<'long>(cell: UnsafeCell<&'long i32>) {
        // Suppose we could extend &'short to &'long here...
        // Then we could store a reference that outlives its data
        // via interior mutation!
    }
    */

    // Contrast with covariant types:
    let boxed: Box<&i32> = Box::new(&value);
    let _shrunk: Box<&'static i32> = box_covariant_demo(boxed);
    // This works because Box is covariant - we can shrink the lifetime

    // But UnsafeCell forbids this:
    // let _shrunk_unsafe: UnsafeCell<&'static i32> = unsafecell_invariant_demo(cell);
    // ❌ Would error: expected UnsafeCell<&'static i32>, found UnsafeCell<&value i32>
}
```

- result(error화면)

```bash
error[E0597]: `value` does not live long enough
  --> src/main.rs:40:37
   |
22 |     let value = 5;
   |         ----- binding `value` declared here
...
40 |     let boxed: Box<&i32> = Box::new(&value);
   |                                     ^^^^^^ borrowed value does not live long enough
41 |     let _shrunk: Box<&'static i32> = box_covariant_demo(boxed);
   |                  ----------------- type annotation requires that `value` is borrowed for `'static`
...
47 | }
   | - `value` dropped here while still borrowed
   |
note: requirement that the value outlives `'static` introduced here
  --> src/main.rs:8:9
   |
```



