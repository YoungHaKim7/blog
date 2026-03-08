---
title: 260213_What_s_New_in_Rust_1_93_0
published: 2026-02-13
description: 'Rust 1.93.0 released(Jan. 22, 2026)'
image: ''
tags: [rust, release]
category: 'rust_Releases_Notes'
draft: false 
lang: ''
---

# link

- [Rust doc각종 정보가 많다.](https://doc.rust-lang.org/stable/)

- [Rust Release Notes](https://doc.rust-lang.org/stable/releases.html)
  - [beta](https://doc.rust-lang.org/beta/releases.html)
- [What's Rust is it?_Stable, Beta, Nightly정보를 안 눈에](https://www.whatrustisit.com/)

- [Rust Edition Guide](https://doc.rust-lang.org/stable/edition-guide/index.html)

# 🦀 What’s New in Rust 1.93.0
- 원본 : https://weeklyrust.substack.com/p/whats-new-in-rust-1930?utm_source=substack&publication_id=2187430&post_id=185771279&utm_medium=email&utm_content=share&utm_campaign=email-share&triggerShare=true&isFreemail=true&r=2alrl0&triedRedirect=true

- Rust 1.93.0의 새로운 기능
- 지난주 러스트 팀은 올해 첫 출시작인 러스트 1.93.0을 발표했으며, 헤드라인은 머슬 범프인 1.2.5입니다.

이 릴리스에서는 빅 레코드와 재귀 네임서버를 처리하기 위해 새로운 머슬 DNS 리졸버를 도입했습니다.

Linux용 완전 정적 바이너리를 구축하는 경우, 1.2.4 버전으로 출시되고 1.2.5 버전으로 버그 수정이 이루어진 Musl의 DNS 리졸버 개선 덕분에 네트워킹이 훨씬 덜 복잡해졌습니다.

유일한 문제는 오래된 호환성 심볼이 제거된 것이었지만, libc는 2년 전에 이 문제를 해결했기 때문에 여전히 오래된 종속성을 유지하고 있다면 걱정할 필요가 없습니다.

다음으로, 작지만 맛있는 삶의 질 승리입니다: 마침내 asm! 블록 안에 개별 라인에 #[cfg]를 추가할 수 있습니다.

하나의 지침을 조건부로 포함하기 위해 거대한 어셈블리 블롭을 복사 붙여넣기하는 행위는 더 이상 없습니다. 이러한 변화는 우리가 그것 없이 어떻게 살았는지 궁금하게 만듭니다.

그리고 23개 이상의 안정화된 API가 있습니다. `Uninit`에는 초기화되지 않은 메모리를 저글링할 때 사용할 수 있지만 안전하지 않은 모든 곳에 안전하지 않은 메모리를 뿌리고 싶지 않을 때 완벽한 새로운 안전한 도우미인 affset_init_ref, affset_init_mut, 슬라이스 복사/클론 메서드 등이 있습니다.

String과 Vec도 이제 `into_raw_parts`를 가지게 되었고, 선택되지 않은 정수 연산이 공식적으로 축복받았으며, 슬라이스/ptrs가 배열로 변할 수 있습니다.

아, 그리고 맞춤형 글로벌 할당기가 드디어 스레드_로컬을 사용할 수 있게 되었네요! 저급 해커라면 여러분의 삶이 조금 덜 무섭습니다.

대체로 이번 릴리스는 러스트 팀이 우리가 계속 자르는 날카로운 가장자리를 조용히 청소하는 것처럼 느껴집니다.

<hr />

- What’s New in Rust 1.93.0

- Last week the Rust team announced Rust 1.93.0 which is the first release of the year, and the headline is the musl bump to 1.2.5.

The release introduced a new musl DNS resolver to handle big records and recursive nameservers.

And if you’re building fully static binaries for Linux, networking just got a lot less flaky thanks to improvements made to musl's DNS resolver which shipped in 1.2.4 and received bug fixes in 1.2.5.

The only catch was some old compatibility symbols got removed, but libc fixed that over two years ago, so if you’re still on old dependencies… you need not to worry.

Next up, a small but delicious quality-of-life win: you can finally put `#[cfg]` on individual lines inside `asm!` blocks.

No more copy-pasting giant assembly blobs just to conditionally include one instruction. It’s the kind of change that makes you wonder how we lived without it.

And then there’s over 23 stabilized APIs. MaybeUninit got new safe helpers like `assume_init_ref`, `assume_init_mut`, and slice-copy/clone methods, perfect for when you’re juggling uninitialized memory but don’t want to sprinkle unsafe everywhere.

String and Vec also now have into_raw_parts, unchecked integer operations are officially blessed, and slices/ptrs can turn into arrays.

Oh, and custom global allocators can finally use `thread_local!`. Low-level hackers, your lives just got marginally less terrifying.

All in all, this release feels like the Rust team quietly cleaning up the sharp edges we keep cutting ourselves on.

# `into_raw_parts` code연습

- https://doc.rust-lang.org/stable/std/string/struct.String.html#method.into_raw_parts

```rs
fn main() {
    println!("Hello, world! from_raw_parts rust 1.93!");

    let s = String::from("hello");

    let (ptr, len, cap) = s.into_raw_parts();

    let rebuilt = unsafe { String::from_raw_parts(ptr, len, cap) };

    assert_eq!(rebuilt, "hello");
}
```

## `into_raw_parts` 

- Decomposes a `String` into its raw components: `(pointer, length, capacity)`.
 - Returns the raw pointer to the underlying data, the length of the string (in bytes), and the allocated capacity of the data (in bytes). These are the same arguments in the same order as the arguments to [`from_raw_parts`].

- After calling this function, the caller is responsible for the memory previously managed by the `String`. The only way to do this is to convert the raw pointer, length, and capacity back into a `String` with the [`from_raw_parts`] function, allowing the destructor to perform the cleanup.

- `String` 을 원시 구성 요소로 분해합니다: '(pointer, length, capacity, 점, 길이, 용량)'.
 - 기본 데이터에 대한 원시 포인터, 문자열의 길이(바이트 단위), 데이터의 할당된 용량(바이트 단위)을 반환합니다. 이 인수들은 ['from_raw_parts'] 인수와 동일한 순서로 반환됩니다.

- 이 함수를 호출한 후 발신자는 이전에 '스트링'에서 관리하던 메모리를 책임집니다. 이를 수행하는 유일한 방법은 원시 포인터, 길이, 용량을 ['from_raw_parts'] 함수가 있는 '스트링'으로 다시 변환하여 파괴자가 정리를 수행할 수 있도록 하는 것입니다.

# `from_raw_parts`
- [`from_raw_parts`: String::from_raw_parts](https://doc.rust-lang.org/stable/std/string/struct.String.html#method.from_raw_parts)

- Creates a new String from a pointer, a length and a capacity.

- **Safety**

- This is highly unsafe, due to the number of invariants that aren’t checked:

  - all safety requirements for `Vec::<u8>::from_raw_parts`.
  - all safety requirements for `String::from_utf8_unchecked`.

- Violating these may cause problems like corrupting the allocator’s internal data structures. For example, it is normally not safe to build a String from a pointer to a C char array containing UTF-8 unless you are certain that array was originally allocated by the Rust standard library’s allocator.

- The ownership of buf is effectively transferred to the String which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

- 포인터, 길이 및 용량에서 새 문자열을 만듭니다.

- **안전**

- 이것은 확인되지 않은 불변량의 수 때문에 매우 안전하지 않습니다:

  - `Vec:<u8>::from_raw_parts`의 모든 안전 요구 사항.
  - `String::from_utf8_unchecked`의 모든 안전 요구 사항.

- 이를 위반하면 할당자의 내부 데이터 구조가 손상되는 등의 문제가 발생할 수 있습니다. 예를 들어, Rust 표준 라이브러리의 할당자가 원래 배열을 할당했는지 확실하지 않은 한 포인터에서 UTF-8이 포함된 C char 배열로 문자열을 생성하는 것은 일반적으로 안전하지 않습니다.

- buf의 소유권은 효과적으로 문자열로 이전되며, 문자열은 포인터가 가리키는 메모리의 내용을 임의로 할당 해제, 재할당 또는 변경할 수 있습니다. 이 함수를 호출한 후 포인터를 사용하는 다른 항목은 없는지 확인합니다.

- https://doc.rust-lang.org/stable/std/string/struct.String.html#method.from_raw_parts

```rs
unsafe {
    let s = string::from("hello");

    // deconstruct the string into parts.
    let (ptr, len, capacity) = s.into_raw_parts();

    let s = string::from_raw_parts(ptr, len, capacity);

    assert_eq!(string::from("hello"), s);
}
```


