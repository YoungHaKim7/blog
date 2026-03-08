---
title: 150515_from_raw_parts
published: 2015-05-15
description: 'rust 1.00 `from_raw_parts`'
image: ''
tags: [rust, release]
category: 'rust_Releases_Notes'
draft: false 
lang: ''
---

# `from_raw_parts`
- https://doc.rust-lang.org/stable/std/vec/struct.Vec.html#method.from_raw_parts
- Creates a `Vec<T>` directly from a pointer, a length, and a capacity.

- **Safety**

- This is highly unsafe, due to the number of invariants that aren’t checked:
  - If `T` is not a zero-sized type and the capacity is nonzero, `ptr` must have been allocated using the global allocator, such as via the `alloc::alloc` function. If T is a zero-sized type or the capacity is zero, ptr need only be non-null and aligned.
  - `T` needs to have the same alignment as what `ptr` was allocated with, if the pointer is required to be allocated. (`T` having a less strict alignment is not sufficient, the alignment really needs to be equal to satisfy the `dealloc` requirement that memory must be allocated and deallocated with the same layout.)
  - The size of `T` times the `capacity` (ie. the allocated size in bytes), if nonzero, needs to be the same size as the pointer was allocated with. (Because similar to alignment, `dealloc` must be called with the same layout `size`.)
  - `length` needs to be less than or equal to `capacity`.
  - The first `length` values must be properly initialized values of type `T`.
  - `capacity` needs to be the capacity that the pointer was allocated with, if the pointer is required to be allocated.
  - The allocated size in bytes must be no larger than `isize::MAX`. See the safety documentation of `pointer::offset`.

- These requirements are always upheld by any `ptr` that has been allocated via `Vec<T>`. Other allocation sources are allowed if the invariants are upheld.

- Violating these may cause problems like corrupting the allocator’s internal data structures. For example it is normally not safe to build a `Vec<u8>` from a pointer to a C `char` array with length `size_t`, doing so is only safe if the array was initially allocated by a `Vec` or `String`. It’s also not safe to build one from a `Vec<u16>` and its length, because the allocator cares about the alignment, and these two types have different alignments. The buffer was allocated with alignment 2 (for `u16`), but after turning it into a `Vec<u8>` it’ll be deallocated with alignment 1. To avoid these issues, it is often preferable to do casting/transmuting using `slice::from_raw_parts` instead.

- The ownership of `ptr` is effectively transferred to the `Vec<T>` which may then deallocate, reallocate or change the contents of memory pointed to by the pointer at will. Ensure that nothing else uses the pointer after calling this function.

- 포인터, 길이, 용량에서 직접 `Vec`를 만듭니다.

- **안전**

- 이것은 확인되지 않은 불변량의 수 때문에 매우 안전하지 않습니다:
  - `T`가 제로 크기 유형이 아니고 용량이 0이 아닌 경우 `alloc::alloc` 함수와 같이 전역 할당기를 사용하여 `ptr`을 할당해야 합니다. T가 제로 크기 유형이거나 용량이 0인 경우 ptr은 널이 아닌 정렬된 것만 있으면 됩니다.
  - 포인터를 할당해야 하는 경우 `T`는 `ptr`이 할당된 것과 동일한 정렬을 가져야 합니다. (`T`가 덜 엄격한 정렬을 갖는 것만으로는 충분하지 않으며, 메모리를 동일한 레이아웃으로 할당하고 할당 해제해야 한다는 `dealloc` 요구 사항을 충족하려면 정렬이 동일해야 합니다.)
  - `T`의 크기에 `capacity(용량)`을 곱한 값(즉, 할당된 크기(바이트 단위)은 0이 아닌 경우 포인터가 할당된 크기와 동일해야 합니다. (정렬과 유사하게 `dealloc`도 동일한 레이아웃 '크기'로 호출해야 합니다.)
  - `length길이`는 `capacity용량`보다 작거나 같아야 합니다.
  - 첫 번째 `length길이` 값은 `T` 유형의 올바르게 초기화된 값이어야 합니다.
  - 포인터를 할당해야 하는 경우 `capacity용량`은 포인터에 할당된 용량이어야 합니다.
  - 할당된 크기(바이트)는 `isize::MAX`보다 크지 않아야 합니다. `pointer::offset`의 안전 문서를 참조하세요.

- 이러한 요구 사항은 항상 `Vec`를 통해 할당된 모든 `ptr`에 의해 유지됩니다. 불변량이 유지되는 경우 다른 할당 소스도 허용됩니다.

- 이를 위반하면 할당자의 내부 데이터 구조가 손상되는 등의 문제가 발생할 수 있습니다. 예를 들어, 포인터에서 길이가 `size_t`인 C `char` 배열로 `Vec<u8>`을 만드는 것은 일반적으로 안전하지 않으며, 배열이 처음에 `Vec` 또는 `String`에 의해 할당된 경우에만 안전합니다. 또한 할당자가 정렬에 신경 쓰고 이 두 유형의 정렬이 다르기 때문에 `Vec<u16`과 그 길이에서 하나를 만드는 것도 안전하지 않습니다. 버퍼는 정렬 2(`u16`의 경우)로 할당되었지만, `Vec<u8>`로 변환한 후 정렬 1로 할당 해제됩니다. 이러한 문제를 피하기 위해 대신 `slice::from_raw_parts`를 사용하여 캐스팅/변환하는 것이 바람직합니다.

- `ptr`의 소유권은 사실상 `Vec`로 이전되며, 이는 포인터가 가리키는 메모리의 내용을 마음대로 할당 해제, 재할당 또는 변경할 수 있습니다. 이 함수를 호출한 후 포인터를 사용하는 다른 기능이 없는지 확인합니다.

# Examples

```rs
use std::ptr;

let v = vec![1, 2, 3];

// Deconstruct the vector into parts.
let (p, len, cap) = v.into_raw_parts();

unsafe {
    // Overwrite memory with 4, 5, 6
    for i in 0..len {
        ptr::write(p.add(i), 4 + i);
    }

    // Put everything back together into a Vec
    let rebuilt = Vec::from_raw_parts(p, len, cap);
    assert_eq!(rebuilt, [4, 5, 6]);
}
```

## Using memory that was allocated elsewhere:

```rs
use std::alloc::{alloc, Layout};

fn main() {
    let layout = Layout::array::<u32>(16).expect("overflow cannot happen");

    let vec = unsafe {
        let mem = alloc(layout).cast::<u32>();
        if mem.is_null() {
            return;
        }

        mem.write(1_000_000);

        Vec::from_raw_parts(mem, 1, 16)
    };

    assert_eq!(vec, &[1_000_000]);
    assert_eq!(vec.capacity(), 16);
}
```
