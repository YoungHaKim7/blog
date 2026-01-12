---
title: 260106_trait_02_dispatch_polymorphism
published: 2026-01-06
description: 'dispatch , monomorphism VS polymorphish'
image: ''
tags: [rust, traits, std]
category: 'rust'
draft: false 
lang: ''
---

# link

<hr />

# Dynamic vs Static Dispatch in Rust | Ryan Levick
- https://youtu.be/tM2r9HD4ivQ?si=E8gbXgTyW7guzxFt

- 01-part2
# Rust Linz, July 2021 - Rainer Stropek - Traits, not your grandparents' interfaces | Rust[|🔝|](#link)
- https://youtu.be/B0fL3WmJZsc?si=6fx78OYct0iM_yAl
  - PPT자료
    - https://slides.com/rainerstropek/rust-traits/fullscreen
      - 발표code
        - https://github.com/rstropek/rust-samples/tree/master/tictactoe

<hr>

# (37min30sec나옴)

# monomorphism
- 

```rs
use std::io::*;

pub trait Animal {
    fn make_sound(&self) -> &'static str;
}

pub struct Cat;
pub struct Dog;

impl Animal for Cat {
    fn make_sound(&self) -> &'static str {
        "Miau\n"
    }
}

impl Animal for Dog {
    fn make_sound(&self) -> &'static str {
        "Wuff\n"
    }
}

fn print_sound(animal: &impl Animal) {
    stdout().write(animal.make_sound().as_bytes()).unwrap();
}

fn main() {
    // Static dispatching

    let a = Cat {};
    print_sound(&a);

    let a = Dog {};
    print_sound(&a);
}
```

## Generics 예시

- Generics

```rs
pub fn generic_x2<T>(x: T, y: T) -> T
where
    T: std::ops::Add<Output = T>,
{
    x + y
}

pub fn main() {
    let f32_val = generic_x2(30.0, 30.0);
    let f32_val = generic_x2(30, 30);
    println!("Hello, world!");
}
```

```asm
<f64 as core::ops::arith::Add>::add::he5a6ca80c6a76c81:
        movsd   qword ptr [rsp - 16], xmm0
        movsd   qword ptr [rsp - 8], xmm1
        addsd   xmm0, xmm1
        ret

<i32 as core::ops::arith::Add>::add::h92c456839a0e285c:
        sub     rsp, 24
        mov     qword ptr [rsp], rdx
        mov     dword ptr [rsp + 16], edi
        mov     dword ptr [rsp + 20], esi
        add     edi, esi
        mov     dword ptr [rsp + 12], edi
        seto    al
        jo      .LBB1_2
        mov     eax, dword ptr [rsp + 12]
        add     rsp, 24
        ret
.LBB1_2:
        mov     rdi, qword ptr [rsp]
        call    qword ptr [rip + core::panicking::panic_const::panic_const_add_overflow::h532d5f821bdb4234@GOTPCREL]

core::fmt::rt::<impl core::fmt::Arguments>::new_const::h2436ae93a7b5e8d1:
        mov     rax, rdi
        mov     qword ptr [rsp - 8], rsi
        mov     qword ptr [rdi], rsi
        mov     qword ptr [rdi + 8], 1
        mov     rdx, qword ptr [rip + .Lanon.afb97f780453eadfa0115a93aa567b93.0]
        mov     rcx, qword ptr [rip + .Lanon.afb97f780453eadfa0115a93aa567b93.0+8]
        mov     qword ptr [rdi + 32], rdx
        mov     qword ptr [rdi + 40], rcx
        mov     ecx, 8
        mov     qword ptr [rdi + 16], rcx
        mov     qword ptr [rdi + 24], 0
        ret

example::generic_x2::ha1338498e3f7fe2f:
        push    rax
        mov     dword ptr [rsp], edi
        mov     dword ptr [rsp + 4], esi
        lea     rdx, [rip + .Lanon.afb97f780453eadfa0115a93aa567b93.2]
        call    <i32 as core::ops::arith::Add>::add::h92c456839a0e285c
        pop     rcx
        ret

example::generic_x2::hfb3f8a2a38c8902f:
        sub     rsp, 24
        movsd   qword ptr [rsp + 8], xmm0
        movsd   qword ptr [rsp + 16], xmm1
        lea     rdi, [rip + .Lanon.afb97f780453eadfa0115a93aa567b93.2]
        call    <f64 as core::ops::arith::Add>::add::he5a6ca80c6a76c81
        add     rsp, 24
        ret

.LCPI5_0:
        .quad   0x403e000000000000
example::main::hf6eacbf6b45cf567:
        sub     rsp, 72
        movsd   xmm1, qword ptr [rip + .LCPI5_0]
        movaps  xmm0, xmm1
        call    qword ptr [rip + example::generic_x2::hfb3f8a2a38c8902f@GOTPCREL]
        movsd   qword ptr [rsp + 56], xmm0
        mov     esi, 30
        mov     edi, esi
        call    qword ptr [rip + example::generic_x2::ha1338498e3f7fe2f@GOTPCREL]
        mov     dword ptr [rsp + 68], eax
        lea     rdi, [rsp + 8]
        lea     rsi, [rip + .Lanon.afb97f780453eadfa0115a93aa567b93.4]
        call    qword ptr [rip + core::fmt::rt::<impl core::fmt::Arguments>::new_const::h2436ae93a7b5e8d1@GOTPCREL]
        lea     rdi, [rsp + 8]
        call    qword ptr [rip + std::io::stdio::_print::h02b5be036b2109f4@GOTPCREL]
        add     rsp, 72
        ret

.Lanon.afb97f780453eadfa0115a93aa567b93.0:
        .zero   8
        .zero   8

.Lanon.afb97f780453eadfa0115a93aa567b93.1:
        .asciz  "/app/example.rs"

.Lanon.afb97f780453eadfa0115a93aa567b93.2:
        .quad   .Lanon.afb97f780453eadfa0115a93aa567b93.1
        .asciz  "\017\000\000\000\000\000\000\000\030\000\000\000\005\000\000"

.Lanon.afb97f780453eadfa0115a93aa567b93.3:
        .ascii  "Hello, world!\n"

.Lanon.afb97f780453eadfa0115a93aa567b93.4:
        .quad   .Lanon.afb97f780453eadfa0115a93aa567b93.3
        .asciz  "\016\000\000\000\000\000\000"
```

# Dynamic Dispatch

```rs
use std::io::*;

pub trait Animal {
    fn make_sound(&self) -> &'static str;
}

pub struct Cat;
pub struct Dog;

impl Animal for Cat {
    fn make_sound(&self) -> &'static str {
        "Miau\n"
    }
}

impl Animal for Dog {
    fn make_sound(&self) -> &'static str {
        "Wuff\n"
    }
}

// Dynamic Dispatch 
// trait object
fn print_sound(animal: &dyn Animal) {
    stdout().write(animal.make_sound().as_bytes()).unwrap();
}

fn main() {
    let da: &dyn Animal = &Cat {};
    print_sound(da);

    let da: &dyn Animal = &Dog {};
    print_sound(da);
}
```

# Static Dispatch
- Compile Time 때 fn을 만든다.
  - Compile이 느리다.  fn을 다 만들기 때문Assembly로 보면 fn을  다 만드는걸 확인가능

# Dynamic Dispatch
- Dynamic Programming
- Runtime 때 fn을 만든다.

```rs
fn main() {
    let a = Box::new(10);
}
```

# Static과 Dynamic은 둘다 stack에서 생성

# Box는 Heap에 생성

<hr>

# 번역 본
- A static dispatch typically will be slower to compile because it has to do that copy-pasting and it has to compile two functions and stuff like that. So yeah, there is often the case where you might move to dynamic dispatch because you can pay the performance penalty. It's fine, your code's fast enough even with the paying performance penalty, but you will only have to compile this one function instead of, you know, let's say we have a hundred different spell checkers, you would have to have a hundred different versions of spell checkpoint, which can get pretty expensive to compile.
  - 정적 디스패치는 복사 붙여넣기를 해야 하고 두 개의 함수 같은 것들을 컴파일해야 하기 때문에 일반적으로 컴파일 속도가 느려집니다. 그래서 종종 성능 패널티를 지불할 수 있기 때문에 동적 디스패치로 이동하는 경우가 있습니다. 성능 패널티를 지불하더라도 코드가 충분히 빠르지만, 이 하나의 함수만 컴파일하면 됩니다. 예를 들어, 우리가 100개의 다른 철자 검사기를 가지고 있다고 가정하면, 당신은 100개의 다른 버전의 철자 검사기를 가지고 있어야 하며, 이는 컴파일 비용이 많이 들 수 있습니다.

- Exactly! Static dispatch gives you faster runtime performance because the compiler generates specific versions of functions for each type, but this can lead to longer compile times and increased binary size due to the duplication of code. On the other hand, dynamic dispatch, which involves using trait objects and the dyn keyword, allows you to compile only one version of a function and reuse it, but it comes with a slight runtime performance cost because of the overhead of dynamic dispatch. So, depending on your needs—whether you prioritize runtime performance or faster compile times and smaller binary sizes—you might choose between static and dynamic dispatch accordingly. It's all about finding the right balance for your particular use case!
  - 맞아요! 정적 디스패치는 컴파일러가 각 유형별로 특정 버전의 함수를 생성하기 때문에 런타임 성능이 더 빠르지만, 코드의 중복으로 인해 컴파일 시간이 길어지고 이진 크기가 증가할 수 있습니다. 반면에 특성 객체와 dyn 키워드를 사용하는 동적 디스패치는 함수의 한 버전만 컴파일하여 재사용할 수 있지만 동적 디스패치의 오버헤드로 인해 런타임 성능 비용이 약간 듭니다. 따라서 런타임 성능을 우선시하든 컴파일 시간을 단축하든 이진 크기를 작게 선택하든 필요에 따라 정적 디스패치와 동적 디스패치 중에서 선택할 수 있습니다. 이 모든 것은 사용자의 특정 사용 사례에 적합한 균형을 찾는 것입니다!

- Is there a difference between spellcheck1 and spellcheck2 in terms of pure functionality? Theoretically, these are from the answers that we will get back. If we pass in the same spellchecker to each one, we'll get the same exact answer. From a functionality perspective, there is no difference between, in this case, between dynamic dispatch and static dispatch. We will see in just one second, I'll talk about how dynamic dispatch can also unlock additional functionality that you cannot get if you need to use static dispatch.
  - 스펠체크1과 스펠체크2는 순수한 기능 면에서 차이가 있나요? 이론적으로, 이것들은 우리가 돌려받을 답변들입니다. 만약 우리가 각각에게 같은 스펠체크를 전달한다면, 우리는 같은 정확한 답변을 얻을 수 있을 것입니다. 기능적인 관점에서, 이 경우에는 동적 디스패치와 정적 디스패치 사이에 차이가 없습니다. 우리는 단 1초 후에 보게 될 것입니다, 나는 동적 디스패치가 정적 디스패치를 사용해야 할 경우 얻을 수 없는 추가 기능을 어떻게 잠금 해제할 수 있는지에 대해 이야기할 것입니다.

- You're absolutely right! From a purely functional perspective, there's no difference between using static dispatch and dynamic dispatch if you pass the same spellchecker into each. Both approaches will give you the same result when you perform the spell check.
  - 당신 말이 전적으로 옳아요! 순수하게 기능적인 관점에서 보면, 만약 당신이 같은 철자 검사기를 각각에게 전달한다면 정적 발송과 동적 발송 사이에 아무런 차이가 없습니다. 당신이 철자 검사를 수행할 때 두 접근법 모두 당신에게 같은 결과를 줄 것입니다.

- However, dynamic dispatch can unlock additional flexibility that static dispatch cannot offer. For example, with dynamic dispatch, you can work with heterogeneous collections of trait objects. This means you could have a collection of different types that all implement the same trait, and you can handle them uniformly at runtime. Static dispatch doesn't allow this because it requires the type to be known and fixed at compile-time.
  - 그러나 동적 디스패치는 정적 디스패치가 제공하지 못하는 추가적인 유연성을 제공할 수 있습니다. 예를 들어 동적 디스패치를 사용하면 이종 특성 객체 컬렉션을 사용하여 작업할 수 있습니다. 즉, 모두 동일한 특성을 구현하는 다양한 유형의 컬렉션을 가질 수 있으며 런타임에 균일하게 처리할 수 있습니다. 정적 디스패치는 컴파일 시 유형을 알고 고정해야 하므로 이를 허용하지 않습니다.

- So, while both approaches can perform the same tasks, dynamic dispatch provides more flexibility at the cost of some runtime performance. This can be particularly useful in scenarios where you need to work with multiple types in a generic way or when the types involved aren't known until runtime.
  - 따라서 두 접근 방식 모두 동일한 작업을 수행할 수 있지만 동적 디스패치는 일부 런타임 성능을 희생시키면서 더 많은 유연성을 제공합니다. 이는 일반적인 방식으로 여러 유형을 사용해야 하는 시나리오나 관련된 유형이 런타임까지 알려지지 않은 경우에 특히 유용할 수 있습니다.

- So there's another question in chat. Can I do everything I can do with static dispatch that I can with dynamic dispatch? And the answer is no, you can't. In this particular case, with what we've written right here, the answer is yes. So everything we've written here, there's nothing special about dynamic dispatch other than the performance, both compile times and runtime differences that we talked about, and things like that, binary size, things like that. That's the only difference in this case. But let's take a look at one interesting thing.
  - 그래서 채팅에서 또 다른 질문이 있습니다. 제가 동적 디스패치로 할 수 있는 모든 것을 할 수 있을까요? 그리고 대답은 '아니오' 입니다. 이 경우에는, 우리가 여기에 쓴 것을 보면, 답은 '네' 입니다. 그래서 우리가 여기에 쓴 모든 것들, 우리가 이야기했던 컴파일 시간과 런타임 차이, 그리고 이진 크기 같은 것들 외에는 동적 디스패치에 특별한 것이 없습니다. 이 경우에 유일한 차이점이 있습니다. 하지만 한 가지 흥미로운 것을 살펴봅시다.

- You're correct! In the specific example you're discussing, where you're simply using dynamic dispatch as a way to avoid compiling multiple versions of a function, there's no functional difference between dynamic and static dispatch, other than the performance and binary size implications.
  - 맞습니다! 논의 중인 특정 예제에서 동적 디스패치를 단순히 여러 버전의 함수를 컴파일하는 것을 피하기 위한 방법으로 사용하는 경우에는 동적 디스패치와 정적 디스패치 사이에 성능과 이진 크기에 영향을 미치는 기능적 차이가 없습니다

- However, when it comes to more complex scenarios, there are certain things you can do with dynamic dispatch that aren't possible with static dispatch. One key example is working with heterogeneous collections, as mentioned earlier. With dynamic dispatch, you can store different types that implement the same trait in the same collection (like a `Vec<Box<dyn Trait>>`). This isn't possible with static dispatch because static dispatch requires the type to be known at compile time.
  - 그러나 좀 더 복잡한 시나리오에서는 동적 디스패치로 할 수 있는 것들이 있는데, 동적 디스패치는 정적 디스패치로는 불가능합니다. 한 가지 중요한 예는 앞서 언급한 바와 같이 이기종 컬렉션에서 작업하는 것입니다. 동적 디스패치를 사용하면 동일한 특성을 구현하는 다양한 유형을 동일한 컬렉션에 저장할 수 있습니다(예를 들어 `Vec<Box<dyn Trait>`). 정적 디스패치는 컴파일 시 유형을 알아야 하기 때문에 정적 디스패치에서는 불가능합니다.

- Dynamic dispatch also allows for more flexibility in cases where you don't know the concrete type of an object until runtime. For example, if you're implementing a plugin system where different plugins implement a common trait, you can load these plugins dynamically at runtime and work with them through a trait object. Static dispatch, by contrast, requires all types to be known and resolved at compile time, which makes this kind of dynamic loading impossible.
  - 동적 디스패치는 런타임까지 개체의 구체적인 유형을 모르는 경우에 더 유연하게 사용할 수 있게 해줍니다. 예를 들어, 서로 다른 플러그인이 공통 특성을 구현하는 플러그인 시스템을 구현하는 경우, 이러한 플러그인을 런타임에 동적으로 로드하고 특성 개체를 통해 함께 작업할 수 있습니다. 반면 정적 디스패치는 컴파일 시 모든 유형을 알고 해결해야 하므로 이러한 유형의 동적 로드가 불가능합니다.

- So, while static dispatch can be more efficient, dynamic dispatch offers a level of flexibility that's necessary in certain situations where types aren't known until runtime or where you need to work with a variety of types in a generic way.
  - 따라서 정적 디스패치가 더 효율적일 수 있지만 동적 디스패치는 런타임까지 유형을 알 수 없거나 일반적인 방식으로 다양한 유형을 사용해야 하는 특정 상황에서 필요한 수준의 유연성을 제공합니다

- Oh yeah, we added some fields here, which I don't want to do anymore.
  - 아, 여기에 더 이상 하고 싶지 않은 필드를 추가했습니다.

- Got it! If you're no longer interested in adding those fields, you can simply remove or avoid modifying the fields you added earlier. If this change impacts how the rest of your code works, make sure to adjust the relevant parts so everything still functions as expected. Is there a specific part you're focusing on or something else you'd like to adjust?
  - 알겠습니다! 더 이상 해당 필드를 추가하는 데 관심이 없으면 이전에 추가한 필드를 제거하거나 수정하는 것을 피할 수 있습니다. 이 변경 사항이 코드의 나머지 작동 방식에 영향을 미치면 모든 것이 예상대로 작동하도록 관련 부분을 조정하십시오. 중점을 두고 있거나 조정하고 싶은 다른 부분이 있습니까?

- Cool, so here's an interesting thing that we can do with dynamic dispatch.
  - 좋습니다, 여기 동적 출동으로 할 수 있는 흥미로운 일이 있습니다.

- Sure, dynamic dispatch allows us to do some interesting things that aren't possible with static dispatch. For example, with dynamic dispatch, you can store different types that implement the same trait in a collection, like a vector, without knowing their specific types at compile time. This flexibility is great for situations where you want to work with objects that share a common interface but might be different under the hood.
  - 물론 동적 디스패치를 사용하면 정적 디스패치에서는 불가능한 몇 가지 흥미로운 작업을 수행할 수 있습니다. 예를 들어 동적 디스패치를 사용하면 컴파일 시 특정 유형을 몰라도 벡터와 같이 동일한 특성을 구현하는 여러 유형을 컬렉션에 저장할 수 있습니다. 이러한 유연성은 공통 인터페이스를 공유하지만 후드 아래에서는 다를 수 있는 개체를 작업하려는 상황에 적합합니다.

- Would you like to dive into a specific example or explore another aspect of dynamic dispatch?
  - 구체적인 예로 들어가시겠습니까, 아니면 동적 파견의 다른 측면을 살펴보시겠습니까?

- We want to run multiple spell checkers over our input text. So we can say, let spell checkers and anti-space spell checkers.
  - 우리는 입력 텍스트를 통해 여러 개의 철자 검사기를 실행하려고 합니다. 그래서 우리는 철자 검사기와 반공간 철자 검사기를 말할 수 있습니다.

- With dynamic dispatch, you can create a vector of spell checkers, even if they are of different types, as long as they implement the same trait. For instance, you could define a trait called SpellChecker and have multiple structs that implement this trait in different ways. Then, by using the dyn keyword, you can create a vector that holds different spell checkers and run them sequentially over your input text.
  - 동적 디스패치를 사용하면 동일한 특성을 구현하는 한 다른 유형에 속하더라도 맞춤법 체커의 벡터를 생성할 수 있습니다. 예를 들어, 맞춤법 체커라는 특성을 정의하고 이 특성을 다양한 방식으로 구현하는 여러 구조를 가질 수 있습니다. 그런 다음 dyn 키워드를 사용하면 다양한 맞춤법 체커를 유지하는 벡터를 생성하여 입력 텍스트 위에 순차적으로 실행할 수 있습니다

- Would you like to see this concept expanded or explained in more detail?
  - 이 개념을 확장하거나 더 자세히 설명하고 싶으신가요?

- Because when we call vec with no spell checker and anti-space checker, we're trying to construct essentially a vector with two different types in it, trying to construct a vector that has both a no-op spell checker and an anti-space checker. And we can't do that in Rust. And it's essentially for reasons that we talked about before with the function parameter.
  - 왜냐하면 우리가 철자 검사기와 반공간 검사기가 없는 vec를 호출할 때, 우리는 본질적으로 두 가지 다른 유형을 가진 벡터를 구성하려고 노력하고 있고, 노옵 철자 검사기와 반공간 검사기를 모두 포함하는 벡터를 구성하려고 노력하고 있기 때문입니다. 그리고 우리는 러스트에서 그렇게 할 수 없습니다. 그리고 그것은 본질적으로 우리가 전에 함수 매개변수와 함께 이야기했던 이유들 때문입니다.

- Exactly! In Rust, a Vec can only hold elements of the same type. When you try to put different types into a Vec, like a NoOpSpellChecker and an AntiSpaceChecker, you run into a problem because Rust expects all elements in a Vec to be the same type.
  - 맞아요! 러스트에서, Vec은 같은 종류의 요소들만 담을 수 있습니다. NoOpSpellChecker와 AntiSpaceChecker와 같은 다른 종류의 요소들을 Vec에 넣으려고 하면, 러스트가 Vec의 모든 요소들이 같은 종류일 것이라고 예상하기 때문에 문제에 부딪히게 됩니다.

- This is where dynamic dispatch and trait objects come in handy. By using the dyn keyword, you can create a vector that holds any type of object, as long as they all implement the same trait. This allows you to have different types of spell checkers in the same vector, despite their underlying types being different.
  - 동적 디스패치와 특성 객체가 유용한 이유입니다. dyn 키워드를 사용하면 모든 유형의 객체가 동일한 특성을 구현하는 한 모든 유형의 객체를 유지하는 벡터를 만들 수 있습니다. 이를 통해 기본 유형은 다르지만 동일한 벡터에 다른 유형의 철자 검사기를 가질 수 있습니다.

- Here's how you can do it:
  - 이렇게 할 수 있습니다:

```rs
trait SpellChecker {
    fn check(&self, text: &str) -> bool;
}

struct NoOpSpellChecker;
struct AntiSpaceChecker;

impl SpellChecker for NoOpSpellChecker {
    fn check(&self, _text: &str) -> bool {
        true // Always passes, no-op
    }
}

impl SpellChecker for AntiSpaceChecker {
    fn check(&self, text: &str) -> bool {
        !text.contains(" ") // Fails if the text contains spaces
    }
}

fn main() {
    let spell_checkers: Vec<Box<dyn SpellChecker>> = vec![
        Box::new(NoOpSpellChecker),
        Box::new(AntiSpaceChecker),
    ];

    let text = "This is a test text.";
    for checker in spell_checkers.iter() {
        println!("Spell check passed: {}", checker.check(text));
    }
}

```

- In this example, `NoOpSpellChecker` always returns true, and `AntiSpaceChecker` returns false if there are spaces in the text. Despite their differences, both are stored in the same `Vec<Box<dyn SpellChecker>>`.
  - 이 예에서 `NoOpSpellChecker`는 항상 `true`를 반환하고 `AntiSpaceChecker`는 텍스트에 공백이 있으면 `false`를 반환합니다. 서로 다름에도 불구하고 둘 다 동일한 Vec<Box<dyn SpellChecker>에 저장됩니다.

- By using dynamic dispatch with trait objects (`Box<dyn SpellChecker>`), you bypass the limitation of needing all elements in the vector to be the same concrete type, enabling more flexibility in how you structure your Rust programs.
  - 특성 개체(`Box<dyn SpellChecker>`)와 함께 동적 디스패치를 사용하면 벡터의 모든 요소가 동일한 콘크리트 유형이어야 한다는 제한을 우회하여 Rust 프로그램을 구성하는 방식에 보다 유연성을 확보할 수 있습니다.

- When we create vectors, we have to allocate enough space in the vector for each item in them, and no-obstacle checker and anti-space checker might have different sizes in memory. In this case, they don't. So, you know, go back to thinking where you have multiple different ones, but, you know, you need to be able to lay out in memory in your vector, okay, each space takes up x number of bytes, and the only way we can be sure of that is if every element in the vector is of the same exact type, and no-spell checker and anti-spell checker, anti-space checker, are two different types, all right? So, this doesn't happen, and if we look at the error message, it basically says, hey, I'm building a vector of no-obstacle checkers here, and you pass me an anti-space checker. That's not cool. You can't do that. So, we can get around that by, instead, let's go ahead and box these up real quick.
  - 벡터를 만들 때, 벡터의 각 항목에 대해 충분한 공간을 할당해야 하는데, 장애물이 없는 검사기와 반공간 검사기는 메모리의 크기가 다를 수 있습니다. 이런 경우에는 그렇지 않습니다. 자, 여러분이 여러 개의 다른 벡터를 가지고 있다고 생각해 보세요. 하지만, 여러분은 벡터의 메모리에 저장할 수 있어야 합니다. 각 공간은 x개의 바이트를 차지합니다. 우리가 확신할 수 있는 유일한 방법은 벡터의 모든 요소가 정확히 같은 유형이고, 반공간 검사기인 노-스펠 검사기와 안티-스펠 검사기가 두 가지 다른 유형인가요? 이런 일은 일어나지 않습니다. 우리가 오류 메시지를 보면, 기본적으로, "야, 나 여기 장애물이 없는 검사기들의 벡터를 만들고 있는데, 여러분은 나에게 반공간 검사기를 건네줍니다. 멋지죠. 그렇게 할 수는 없습니다. 그래서, 우리는 이 문제를 극복할 수 있습니다. 대신에, 이것들을 정말 빠르게 박스업 해봅시다.

- Exactly! The issue here comes from Rust's strict type system, which requires all elements in a vector to be of the same type. Since NoOpSpellChecker and AntiSpaceChecker are different types, you can't just put them together in a vector without some form of abstraction.
  - 맞아요! 여기서 문제는 러스트의 엄격한 유형 체계에서 비롯되는데, 벡터의 모든 요소가 동일한 유형이어야 합니다. NoOpSpellChecker와 AntiSpaceChecker는 서로 다른 유형이기 때문에, 어떤 형태의 추상화 없이 벡터에 함께 넣을 수는 없습니다.

- This is where boxing comes into play. By boxing these types into `Box<dyn SpellChecker>`, you can store them in a vector because now they are seen as the same type: a boxed trait object. The `Box<dyn SpellChecker>` is a pointer to a trait object, which allows for dynamic dispatch, meaning the exact type (whether it's NoOpSpellChecker or AntiSpaceChecker) is determined at runtime rather than compile time.
  - 바로 여기서 복싱이 활성화됩니다. 이러한 유형을 `Box<dyn SpellChecker>`에 입력하면 벡터에 저장할 수 있는데, 이제는 상자에 입력된 특성 개체와 동일한 유형으로 간주되기 때문입니다. `Box<dyn SpellChecker>`는 특성 개체를 가리키는 포인터로, 동적 디스패치를 가능하게 하는데, 이는 정확한 유형(NoOpSpellChecker 또는 AntiSpaceChecker 중 어느 것인지)이 컴파일 시간이 아닌 런타임에 결정된다는 것을 의미합니다.

- When you box these types, the vector only needs to store pointers of a fixed size, regardless of the actual size of the types they point to. This allows the vector to accommodate different types, as long as they all implement the SpellChecker trait.
  - 이 유형들을 상자에 넣을 때 벡터는 실제로 가리키는 유형의 크기와 상관없이 고정된 크기의 포인터만 저장하면 됩니다. 이를 통해 벡터는 모두 스펠체커 특성을 구현하는 한 다양한 유형을 수용할 수 있습니다.

- Here's how it would look in code:
  - 코드는 다음과 같습니다:

```rs

let spell_checkers: Vec<Box<dyn SpellChecker>> = vec![
    Box::new(NoOpSpellChecker),
    Box::new(AntiSpaceChecker),
];

```

- By boxing each checker, you effectively turn them into a trait object that Rust can handle uniformly in the vector. This way, the vector knows exactly how much space to allocate for each item (the size of a pointer) and can safely store different types that share the same trait.
  - 당신은 각 체커를 상자에 넣음으로써 벡터에서 러스트가 균일하게 다룰 수 있는 특성 개체로 효과적으로 변환할 수 있습니다. 이렇게 하면 벡터는 각 항목에 대해 어느 정도의 공간을 할당해야 하는지 정확히 알고 있으며(포인터의 크기) 동일한 특성을 공유하는 여러 유형을 안전하게 저장할 수 있습니다.

- So, boxing is a great tool when you need to store heterogeneous types in a homogeneous collection, like a Vec. It provides the flexibility you need while still respecting Rust's type system and memory layout requirements
  - 따라서 복싱은 Vec과 같이 이종 유형을 균질한 컬렉션에 저장해야 할 때 훌륭한 도구입니다. 러스트의 유형 시스템 및 메모리 레이아웃 요구 사항을 준수하면서도 필요한 유연성을 제공합니다



<hr>

# 58min부터

- Sure! When comparing Spellcheck1 and Spellcheck2, the key difference lies in how they resolve which function to call.

  - Spellcheck1 (Static Dispatch): The compiler determines at compile time exactly which method implementation to use. This is done by creating a separate instance of the function for each type that implements the trait. This process, called monomorphization, means that each function call is direct and has no runtime overhead. The trade-off is that it can increase the binary size, since a separate version of the function is generated for each type.

  - Spellcheck2 (Dynamic Dispatch): This uses a trait object (dyn Trait) and determines at runtime which method implementation to call. The compiler generates code that performs an indirect function call via a vtable (virtual method table), which adds a slight runtime cost due to the indirection. However, it allows you to work with multiple different types through a common interface (the trait) without needing to know the specific type at compile time. The benefit here is more flexibility, especially when working with collections of different types that implement the same trait.

- In practice, static dispatch (Spellcheck1) is usually faster because it avoids the indirection of dynamic dispatch. However, dynamic dispatch (Spellcheck2) is more flexible and allows for more dynamic, polymorphic behavior, which is particularly useful in scenarios where the exact types of the objects are not known until runtime.

-The difference in calls between Spellcheck1 and Spellcheck2 comes down to this trade-off between performance and flexibility:

  - Performance: Spellcheck1 (static dispatch) wins, as it's faster due to the absence of runtime indirection.
  - Flexibility: Spellcheck2 (dynamic dispatch) wins, as it allows handling multiple types through a single interface.

- So, depending on your needs, you would choose one over the other. If you need every bit of performance and can afford to have separate function versions, go with static dispatch. If you need flexibility and polymorphism, dynamic dispatch is the way to go.



- 물론입니다! Spellcheck1과 Spellcheck2를 비교할 때 핵심적인 차이점은 어떤 함수를 호출할지 해결하는 방법에 있습니다.

  - Spellcheck1 (Static Dispatch): 컴파일러는 컴파일 시에 정확히 어떤 방법을 구현할지 결정합니다. 이것은 특성을 구현하는 각 유형에 대해 함수의 별도 인스턴스를 생성함으로써 수행됩니다. 이 프로세스를 단형화라고 하며, 각 함수 호출은 직접적이고 런타임 오버헤드가 없다는 것을 의미합니다. 절충점은 각 유형에 대해 함수의 별도 버전이 생성되기 때문에 이진 크기를 증가시킬 수 있다는 것입니다.

  - Spellcheck2 (Dynamic Dispatch): 특성 객체(dyn Trat)를 사용하여 런타임에 어떤 메서드를 호출할지 결정합니다. 컴파일러는 vtable (가상 메서드 테이블)을 통해 간접 함수 호출을 수행하는 코드를 생성하며, 이는 간접으로 인해 약간의 런타임 비용을 추가합니다. 그러나 컴파일 시 특정 유형을 알 필요 없이 공통 인터페이스 (특성)를 통해 여러 다른 유형으로 작업할 수 있습니다. 여기서 이점은 특히 동일한 특성을 구현하는 다른 유형의 컬렉션과 작업할 때 더 유연하다는 것입니다.

- 실제로 정적 디스패치(Spellcheck1)는 동적 디스패치의 간접적인 방향을 피하기 때문에 일반적으로 더 빠릅니다. 그러나 동적 디스패치(Spellcheck2)는 더 유연하고 보다 동적이고 다형성적인 동작을 가능하게 하며, 이는 런타임까지 객체의 정확한 유형을 알 수 없는 시나리오에서 특히 유용합니다.

- Spellcheck1과 Spellcheck2 사이의 통화 차이는 성능과 유연성 사이의 균형으로 귀결됩니다:

  - 성능: 스펠체크1(정적 디스패치)이 승리하는데, 런타임 인다이렉션이 없어 속도가 빠르기 때문입니다.
  - 유연성: Spellcheck2(다이나믹 디스패치)는 단일 인터페이스를 통해 여러 유형을 처리할 수 있기 때문에 승리합니다.

- 따라서 필요에 따라 다른 하나를 선택합니다. 모든 성능이 필요하고 개별 기능 버전을 가질 수 있는 여유가 있다면 정적 디스패치를 사용하십시오. 유연성과 다형성이 필요하다면 동적 디스패치를 사용하는 것이 좋습니다.


<hr>

# 성능 손실은 거의 없는 Static에서 Dynamic Dispatch 부담없이 바꿔도 된다

- Does doneDispatch add a significant memory overhead? No, it shouldn't be significant. A vtable will be a vtable with one function in it will probably just be the size of one pointer, the pointer to wherever the implementation of that method is, and so that's eight bytes or whatever, that's not very big. So memory is not what you need to worry about in terms of overhead for dynamic dispatch. It's really runtime performance and the fact that you have to go through two pointer looksups and the compiler can't optimize that away, whereas it can optimize away the static dispatch call.
  - 디스패치가 메모리 오버헤드를 크게 추가합니까? 아니요, 그렇게 크지 않아야 합니다. vtable은 하나의 기능이 포함된 vtable이 될 것입니다. 아마도 포인터 하나의 크기일 것이고, 그 방식을 구현하는 곳이 어디든 포인터일 것이고, 따라서 8바이트나 그 정도는 그리 크지 않습니다. 따라서 메모리는 동적 디스패치를 위해 오버헤드 측면에서 걱정할 필요가 없습니다. 실제로 런타임 성능이고 두 번의 포인터 검색을 거쳐야 하고 컴파일러가 이를 최적화할 수는 없지만 정적 디스패치 호출을 최적화할 수는 있습니다.


- Dynamic dispatch does indeed add a small amount of memory overhead, primarily due to the vtable, but as you mentioned, it's minimal. A vtable usually just contains pointers to the functions for the trait’s methods, so in most cases, it’s just a few extra bytes. This overhead is generally negligible in terms of memory usage.

The main concern with dynamic dispatch is the runtime performance overhead because the method calls require two pointer lookups: one to get the vtable and another to find the correct function within the vtable. This indirection prevents the compiler from performing certain optimizations that are possible with static dispatch, where everything is determined at compile time.

- In summary, while dynamic dispatch does introduce some memory overhead, it’s typically not significant. The more critical trade-off is the potential runtime performance hit due to the necessary indirection.

- 동적 디스패치는 vtable 때문에 메모리 오버헤드를 약간 추가하기는 하지만, 말씀하신 것처럼 메모리 오버헤드는 거의 없습니다. vtable은 보통 특성 메서드에 대한 함수에 대한 포인터만 포함하므로 대부분의 경우 몇 바이트만 추가됩니다. 이 오버헤드는 메모리 사용량 측면에서 일반적으로 무시할 수 있습니다.

동적 디스패치의 주된 관심사는 런타임 성능 오버헤드인데, 하나는 vtable을 얻는 것이고 다른 하나는 vtable 내에서 정확한 함수를 찾는 것이다. 이러한 방향성은 컴파일러가 정적 디스패치에서 가능한 특정 최적화를 수행하는 것을 방해하며, 컴파일 시 모든 것이 결정된다.

- 요약하면, 동적 디스패치는 메모리 오버헤드를 발생시키기는 하지만, 일반적으로 중요하지는 않습니다. 더 중요한 절충점은 필요한 방향성으로 인해 발생할 수 있는 런타임 성능 타격입니다.-

<hr>

# Box를 쓰면 복잡한 수명 문제를 한방에 해결하는 아주 심플한 방법!!

- There was a question about using ampersand and spellchecker inside of our text editor type that we just talked about instead of boxed and that's totally fine. You can also do that, but then you're running into the thing about lifetimes. Box is great because it's owned. You don't have to worry about lifetimes and stuff like that, but anytime you borrow something inside of a struct, you will have to worry about the lifetime of that borrow and stuff like that. That's not specific to dynamic dispatch though.
  - 방금 이야기한 텍스트 편집기 유형 안에 박스 대신 앰프와 철자 검사기를 사용하는 것에 대한 질문이 있었는데 괜찮습니다. 그렇게 할 수도 있지만, 그러면 수명에 대한 문제에 부딪히게 됩니다. 박스는 소유권이 있기 때문에 좋습니다. 수명에 대해 걱정할 필요는 없지만, 구조물 안에 있는 것을 빌릴 때마다 대출 수명에 대해 걱정해야 합니다. 하지만 동적 디스패치에만 해당되는 것은 아닙니다.

- Yes, using &spellchecker (a reference) inside your struct is an alternative to using Box<dyn SpellChecker>, but as you pointed out, it introduces the need to manage lifetimes. When you use a reference in a struct, you have to ensure that the referenced object outlives the struct, which can complicate your code with lifetime annotations.
  - 예, 구조물 내부에 &spellchecker(참조)를 사용하는 것이 Box<dyn SpellChecker>를 사용하는 것의 대안이지만, 지적하신 바와 같이 수명을 관리해야 할 필요성이 있습니다. 구조물에서 참조를 사용할 때는 참조된 개체가 구조물보다 오래 지속되는지 확인해야 하므로 수명 주석이 있는 코드가 복잡해질 수 있습니다.

- On the other hand, using Box<dyn SpellChecker> avoids these lifetime issues because the Box owns the object it points to, so you don’t have to worry about the referenced object going out of scope while the struct is still in use. This makes Box a more straightforward option when you want to avoid the complexity of lifetimes, especially when dealing with dynamic dispatch.
  - 반면에 Box<dyn SpellChecker>를 사용하면 Box가 가리키는 개체를 소유하기 때문에 이러한 수명 문제를 피할 수 있으므로 구조물이 아직 사용되는 동안 참조 개체가 범위를 벗어날 것을 걱정할 필요가 없습니다. 따라서 특히 동적 디스패치를 처리할 때 수명의 복잡성을 피하고 싶을 때 Box는 더 간단한 옵션이 됩니다.

- However, this is more of a general Rust borrowing concept and isn't specific to dynamic dispatch. It’s about the trade-offs between ownership and borrowing, and whether you want to deal with the added complexity of lifetimes in your code.
  - 그러나 이것은 일반적인 Rust 차입 개념에 가깝고 동적 파견에만 국한된 것은 아닙니다. 소유와 차입 사이의 상충 관계, 그리고 코드에서 추가되는 수명의 복잡성을 처리할지 여부에 관한 것입니다.

