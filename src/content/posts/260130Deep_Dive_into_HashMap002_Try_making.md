---
title: 260130Deep_Dive_into_HashMap002_Try_making
published: 2026-01-30
description: '나만의 HashMap만들기 & Assembly code로 Hash최적화 시도'
image: ''
tags: [rust, hashmap, optimization, assembly, std]
category: 'optimization'
draft: false 
lang: ''
---

# link
- [std HashMap만들면서 익히기 (쉽게easy)](#stdcollectionshashmap을-활용해서-나만의-hashmap을-만들어-보자)
  - [rust code) easy ver. HashMap(std를 활용해서 딸깍)](https://github.com/YoungHaKim7/hashmap_easy_ver)
- [나만의 HashMap만들면서(Assembly code추가) 익히기 (어렵게hard) Hash부분을 assembly code로 바꿈 ㅋ](#assembly로-hash부분을-stdhash-버리고-극한의-최적화hard-mode)
  - [rust code) assembly + 나름 최적화 시켜서 극한의 HashMap](https://github.com/YoungHaKim7/custom_hashmap)

- [`cargo bench`를 활용해서 성능을 객관적으로 판단해 보자]
  - [비교한 자료`cargo bench`](https://github.com/YoungHaKim7/custom_hashmap?tab=readme-ov-file#-the-benchmark-now-compiles-and-runs-successfully-the-results-show)

- MRU & LRU 개념 이해하기
  - [Why does a cache use the most-recently-used (MRU) algorithm as the evict policy? | stackoverflow](https://stackoverflow.com/questions/5088128/why-does-a-cache-use-the-most-recently-used-mru-algorithm-as-the-evict-policy)
  - [Least-Recently-Used(LRU)Wiki 정의](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU))

<hr />

# `std::collections::HashMap`을 활용해서 나만의 HashMap을 만들어 보자[|🔝|](#link)

- Below is a very detailed, line-by-line explanation of your `std::collections::HashMap`-based LRU cache, including what each line does, why it exists, and how it participates in LRU semantics.
- I will not change the code, only explain and comment it conceptually.
- 아래는 각 줄이 무엇을 하는지, 왜 존재하는지, 그리고 LRU 의미론에 어떻게 참여하는지를 포함하여, 당신의 `std::collections::HashMap` 기반 LRU 캐시에 대한 매우 상세한 줄별 설명입니다.
- 코드를 바꾸지 않고 개념적으로만 설명하고 댓글을 달겠습니다.


## 1️⃣ Imports and constants[|🔝|](#link)

```rs
use std::collections::HashMap;
use std::hash::Hash;
```

- `HashMap`
  - → Used to map keys → entry index in O(1) average time.

- `Hash`
  - → Required trait so keys can be hashed by HashMap.

- '해시맵'
  - → O(1) 평균 시간 내에 키 → 입력 인덱스를 매핑하는 데 사용됩니다.

- '해시'
  - → 해시맵으로 키를 해시할 수 있도록 요구되는 특성.

  
```rs
pub const CACHE_SIZE: usize = 128;
```

- A default capacity constant
- Not used directly inside the struct
- Intended as a convenient default for users
- 기본 용량 상수
- 구조물 내부에서 직접 사용하지 않음
- 사용자에게 편리한 기본 설정으로 제공됩니다

## 2️⃣ Entry structure (node in the LRU list)[|🔝|](#link)

```rs
struct Entry<K, V> {
```

- Defines one cache node, storing both:
  - the key/value
  - links for the LRU doubly-linked list
- 하나의 캐시 노드를 정의하고 둘 다 저장합니다:
  - 핵심/가치
  - LRU 이중 링크 목록 링크

<hr />

```rs
    key: K,
```

- Stores the key inside the entry
- Required so we can:
  - remove the key from the HashMap when evicting
  - avoid reverse lookups
- 항목 내부에 키를 저장합니다
- 우리가 할 수 있도록 필요합니다:
  - 퇴거할 때 해시맵에서 키 제거
  - 거꾸로 보기 피하기

<hr />

```rs
    val: Option<V>,
```
- Stores the cached value
  - Wrapped in Option so we can:
  - invalidate entries (None) without removing the slot
  - reuse indices safely
- 캐시된 값을 저장합니다
  - 옵션으로 감싸서 할 수 있습니다:
  - 슬롯을 제거하지 않고 항목 무효화(없음)
  - 인덱스를 안전하게 재사용

```rs
    prev: Option<usize>,
    next: Option<usize>,
```

- Indices into entries: `Vec<Entry<K,V>>`
- This forms a doubly-linked list
- usize instead of pointers → safe and cache-friendly
- 항목에 인덱스: `Vec<Entry<K,V>>`
- 이것은 이중 연결된 목록을 형성합니다
- 포인터 대신 사용하기 → 안전하고 캐시 친화적

## 3️⃣ LRUCache structure

```rs
pub struct LRUCache<K, V> {
```

- Defines the main LRU cache container.
- 주요 LRU 캐시 컨테이너를 정의합니다.

```rs
    capacity: usize,
```

- Maximum number of live cache entries
- When exceeded → evict least-recently-used entry
- 최대 라이브 캐시 항목 수
- 초과 시 → 최소 recently 사용 항목 퇴거

```rs
    head: Option<usize>, // MRU(Most Recently Used)
```

- Index of most recently used entry
- Front of the linked list
- 가장 최근에 사용된 항목의 색인
- 링크된 목록의 앞쪽

```rs
    tail: Option<usize>, // LRU(Least-Recently-Used)
```

- Index of least recently used entry
- Back of the linked list
- Evicted when capacity is exceeded
- 최근에 사용된 항목의 색인
- 연결된 목록의 뒷면
- 용량 초과 시 퇴거


```rs
    map: HashMap<K, usize>,
```

- Maps `key → index into entries`
- Enables **O(1)** lookup
- HashMap does not store values, only indices

```rs
    entries: Vec<Entry<K, V>>,
```

- Stores all entries contiguously

- Acts as:
  - node storage
  - indexable linked list memory
- Never shrinks

## 4️⃣ Trait bounds

```rs
impl<K, V> LRUCache<K, V>
where
    K: Eq + Hash + Clone,
```

- `Eq` → key comparison
- `Hash` → usable by `HashMap`
- `Clone` → needed during eviction (copy key out)

## 5️⃣ Constructor

```rs
        Self {
            capacity,
```
- Creates an empty LRU cache.

- Store max capacity

```rs
            head: None,
            tail: None,
```

- Empty linked list
- No MRU or LRU yet

```rs
            map: HashMap::new(),
```

- Empty key → index mapping

```rs
            entries: Vec::with_capacity(capacity),
```

- Pre-allocate space
- Avoid reallocations for first `capacity` inserts

## 6️⃣ Internal list helpers

### 🔹 `detach` — remove node from LRU list

```rs
fn detach(&mut self, i: usize) {
```

- Removes entry `i` from the linked list without deleting it.

```rs
        let (prev, next) = {
            let e = &self.entries[i];
            (e.prev, e.next)
        };
```

- Extract neighbors
- Done in a block to avoid borrow conflicts

```rs
        if let Some(p) = prev {
            self.entries[p].next = next;
```

- If `i` had a previous node

- Link previous → next

```rs
        } else {
            // i was head
            self.head = next;
        }
```

- If no prev, `i` was MRU

- Update `head`

```rs
        if let Some(n) = next {
            self.entries[n].prev = prev;
```

- If `i` had a next node
- Link next → previous

```rs
        } else {
            // i was tail
            self.tail = prev;
        }
```

- If no `next`, `i` was LRU
- Update `tail`

```rs
        self.entries[i].prev = None;
        self.entries[i].next = None;
```

- Fully detach node
- Prevent dangling links
- 완전 분리 노드
- 매달린 링크 방지

### 🔹 `push_front` — move node to MRU

```rs
fn push_front(&mut self, i: usize) {
```
- Adds entry `i` to the front (MRU position).

```rs
        self.entries[i].prev = None;
        self.entries[i].next = self.head;
```

- New head has no previous
- Points to old head

```rs
        if let Some(old_head) = self.head {
            self.entries[old_head].prev = Some(i);
```

- Old head now points back to `i`

```rs
        } else {
            // list was empty
            self.tail = Some(i);
        }
```

- First element
- Head and tail are same


```rs
        self.head = Some(i);
```

- pdate MRU pointer

### 🔹 `access` — mark key as recently used

```rs
fn access(&mut self, key: &K) {
```

- Called on every successful get or insert.

```rs
        let i = self.map[key];
```

- Lookup index
- Safe because caller checked existence

```rs
        if Some(i) == self.head {
            return; // already MRU
        }
```

- No work needed if already MRU


```rs
        self.detach(i);
        self.push_front(i);
```

- Move entry to front
- Core LRU behavior

### 🔹 remove_tail — evict LRU entry

```rs
fn remove_tail(&mut self) {
```

- Evicts the least recently used entry.
  - 가장 최근에 사용된 항목을 삭제합니다.

```rs
        if let Some(i) = self.tail {
```

- Only if cache is non-empty


```rs
            let key = self.entries[i].key.clone();
```

- Extract key for HashMap removal


```rs
            self.detach(i);
```
- Remove from linked list

```rs
            self.map.remove(&key);
```

```rs
            self.entries[i].val = None;
```

- Mark entry as empty
- Slot stays allocated


## 7️⃣ Public API

### 🔹 insert

```rs
pub fn insert(&mut self, key: K, value: V) -> Option<V> {
```

- Insert or update a value.

```rs
        if let Some(&i) = self.map.get(&key) {
```

- Key already exists

```rs
            let old = self.entries[i].val.replace(value);
```

- Replace value
- Keep old for return

```rs
            self.detach(i);
            self.push_front(i);
```

- Update recency


```rs
            return old;
```

- Return replaced value

```rs
        if self.len() == self.capacity {
            self.remove_tail();
        }
```

- Evict LRU if cache is full

```rs
        let i = self.entries.len();
```
- New index

```rs
        self.entries.push(Entry {
```

- Create new entry node

```rs
            key: key.clone(),
            val: Some(value),
            prev: None,
            next: None,
```

- Initially detached

```rs
        self.push_front(i);
```

- New entry becomes MRU


```rs
        self.map.insert(key, i);
```

- Register key → index

```rs
        None
```

- No old value replaced

### 🔹 get

```rs
pub fn get(&mut self, key: &K) -> Option<&V> {
```

- Lookup + update recency.

```rs
        if self.map.contains_key(key) {
            self.access(key);
        }
```

- If exists → mark as MRU

```rs
        self.map
            .get(key)
            .and_then(|&i| self.entries[i].val.as_ref())
```

- Return reference to value

### 🔹 get_mut

- Same as get, but mutable reference.

### 🔹 remove

```rs
pub fn remove(&mut self, key: &K) -> Option<V> {
```

- Remove entry entirely.

```rs
        self.map.remove(key).map(|i| {
```

- Remove from map
- Retrieve index

```rs
            self.detach(i);
```

- Remove from LRU list

```rs
            self.entries[i].val.take().unwrap()
```

- Take ownership of value

### 🔹 Utility methods

```rs
pub fn contains(&self, key: &K) -> bool
pub fn len(&self) -> usize
pub fn is_full(&self) -> bool
pub fn is_empty(&self) -> bool
```

- Simple wrappers around HashMap

- O(1) operations


## 🧠 Final mental model

```rs
HashMap<K, usize>
        ↓
 entries Vec<Entry>
        ↓
 index-based doubly linked list
```

- This design gives:
  - ✅ O(1) get / insert / remove
  - ✅ No unsafe code
  - ✅ No heap allocation per node
  - ✅ Cache-friendly memory layout

<hr />

# Assembly로 Hash부분을 `std::Hash` 버리고, 극한의 최적화(hard mode)[|🔝|](#link)

- I’ll do this in a systems-programming style explanation, not a beginner gloss.
  - 초보자용 글로스가 아닌 시스템 프로그래밍 스타일의 설명으로 하겠습니다.

> [!WARNING]
> Hash부분이 암호화 되지 않아 보안에는 취약하다. 공부용이라 생각하자.

## 🧪 Mental model summary (one line)
- 아이디어는 이 한줄이다. 아주 단순하다.

```
"Take the first 2 bytes, take the last 2 bytes, glue them together."

"처음 2바이트, 마지막 2바이트를 가져와서 서로 붙입니다."
```


# Hash부분을 속도를 올리기 위해 Assembly를 활용하였다.(x86_64)
- [full code + Assembly + Rust](https://github.com/YoungHaKim7/custom_hashmap)

- rust code로 넣은모습.

```rs
#[cfg(target_os = "linux")]
#[inline(always)]
pub unsafe fn look_up_identifier(data: *const u8, len: usize) -> u32 {
    unsafe {
        let result: u32;
        std::arch::asm!(
            "cmp rsi, 4",
            "jb 2f",
            "movzx eax, WORD PTR [rdi]",
            "movzx edx, WORD PTR [rdi + rsi - 2]",
            "shl eax, 16",
            "or eax, edx",
            "jmp 3f",
            "2:",
            "mov eax, 80",
            "3:",
            in("rdi") data,
            in("rsi") len,
            lateout("eax") result,
            clobber_abi("system")
        );
        result
    }
}
```

- `main.asm`

```asm
/* main.s — x86_64 Linux
 *
 * uint32_t look_up_identifier(const uint8_t *data, size_t len)
 *
 * rdi = data pointer
 * rsi = len
 * return value in eax
 */

    .section .text
    .global look_up_identifier
    .type look_up_identifier, @function

look_up_identifier:
    /* if (len < 4) goto fail */
    cmp     rsi, 4
    jb      fail

    /* load first 2 bytes */
    movzx   eax, WORD PTR [rdi]            # eax = data[0..1]

    /* load last 2 bytes */
    movzx   edx, WORD PTR [rdi + rsi - 2]  # edx = data[len-2..len-1]

    /* shift first half */
    shl     eax, 16

    /* combine */
    or      eax, edx

    ret

fail:
    mov     eax, 80
    ret
```

## 🧠 Register mapping (Linux x86_64 ABI)

```txt
rdi → data pointer
rsi → len
eax → return value (u32)
edx → temporary (last 2 bytes)
```

### 📦 Bit-level result layout

```txt
eax (u32)
31            16 15             0
┌────────────────┬────────────────┐
│ data[0..1]     │ data[len-2..]  │
└────────────────┴────────────────┘
```

### 🧩 One-to-one mapping with your Rust inline asm

| Rust inline asm                       | main.s       |
| ------------------------------------- | ------------ |
| `cmp rsi, 4`                          | `cmp rsi, 4` |
| `jb 2f`                               | `jb fail`    |
| `movzx eax, WORD PTR [rdi]`           | same         |
| `movzx edx, WORD PTR [rdi + rsi - 2]` | same         |
| `shl eax, 16`                         | same         |
| `or eax, edx`                         | same         |
| `mov eax, 80`                         | same         |


### 🧠 What the function computes (one-screen view)

```rs
look_up_identifier(data: *const u8, len: usize) -> u32
```

- 기본적인 아이디어는 문자열 앞 2가리, 뒷자리 2자리를 가져와서 hash 값으로 쓰는 아주 단순한 원리.

```txt
Memory (bytes)
┌───────────────────────────────────────────┐
│ data[0]  data[1]  ...        data[len-2] │ data[len-1]
└───┬────────┬───────────────────┬─────────┘
    │        │                   │
    │        │                   └─ last 2 bytes
    │        └─ first 2 bytes
    │
    ▼

If len >= 4:
────────────────────────────────────────────────────────

   first WORD (16 bits)          last WORD (16 bits)
┌───────────────┐              ┌───────────────┐
│ data[0..1]    │              │ data[len-2..] │
└───────┬───────┘              └───────┬───────┘
        │                               │
        │                               │
        ▼                               ▼

        eax = first_word << 16
        edx = last_word

        eax = eax | edx

        result (u32):
        ┌─────────────────────────────────────────┐
        │ first_word (16 bits) | last_word (16)  │
        └─────────────────────────────────────────┘


If len < 4:
────────────────────────────────────────────────────────

        result = 80 (constant fallback)
```


### 🧩 Instruction-by-instruction flow (diagram)

```txt
Registers on entry:
────────────────────────────────────────
rdi → data pointer
rsi → len

Assembly flow:
────────────────────────────────────────

cmp rsi, 4
│
├─ len < 4 ───────────────► eax = 80
│                          │
│                          └──► return eax
│
└─ len >= 4
   │
   ├─ movzx eax, WORD PTR [rdi]
   │      ↑
   │      │
   │      └─ load first 2 bytes
   │
   ├─ movzx edx, WORD PTR [rdi + rsi - 2]
   │      ↑
   │      │
   │      └─ load last 2 bytes
   │
   ├─ shl eax, 16
   │
   ├─ or eax, edx
   │
   └──► return eax

```

### 📦 Bit-level view (hash shape)

```txt
32-bit result layout
────────────────────────────────────────

31            16 15             0
┌────────────────┬────────────────┐
│ first 2 bytes  │ last 2 bytes   │
│ data[0..1]     │ data[len-2..]  │
└────────────────┴────────────────┘
```

### 🎯 What this means conceptually

```txt
HASH(data) =
    if len >= 4:
        (first_two_bytes << 16) | last_two_bytes
    else:
        80
```

## Properties (important for intuition)

```txt
✔ O(1) time
✔ Zero loops
✔ Zero branches after length check
✔ Extremely cache-friendly
✘ Very weak hash
✘ Collisions are easy
✘ NOT cryptographically safe
```

### 🧠 Why this is fast (visual intuition)

```txt
Standard hash (SipHash):
┌─────────────────────────────┐
│ mix → rotate → xor → repeat │  (many rounds)
└─────────────────────────────┘

This hash:
┌──────────┐  ┌──────────┐
│ load 16b │  │ load 16b │
└────┬─────┘  └────┬─────┘
     │             │
     └─── combine ─┘
```

## 이번에는 Arm버젼이다.

```rs
#[cfg(target_os = "macos")]
#[inline(always)]
pub unsafe fn look_up_identifier(data: *const u8, len: usize) -> u32 {
    unsafe {
        let result: u32;
        std::arch::asm!(
            "cmp {len}, #4",
            "b.lo 2f",
            "ldrh w0, [{data}]",
            "sub x1, {len}, #2",
            "ldrh w2, [{data}, x1]",
            "lsl w0, w0, #16",
            "orr w0, w0, w2",
            "b 3f",
            "2:",
            "mov w0, #80",
            "3:",
            data = in(reg) data,
            len = in(reg) len,
            lateout("w0") result,
            clobber_abi("system")
        );
        result
    }
}
```

### ✅ main.s (macOS / ARM64)

```asm
/* main.s — macOS ARM64 (AArch64)
 *
 * uint32_t look_up_identifier(const uint8_t *data, size_t len)
 *
 * x0 = data pointer
 * x1 = len
 * return value in w0
 */

    .section __TEXT,__text
    .global _look_up_identifier
    .align 2

_look_up_identifier:
    /* if (len < 4) goto fail */
    cmp     x1, #4
    b.lo    fail

    /* load first 2 bytes */
    ldrh    w0, [x0]          // w0 = data[0..1]

    /* compute (len - 2) */
    sub     x2, x1, #2

    /* load last 2 bytes */
    ldrh    w3, [x0, x2]      // w3 = data[len-2..len-1]

    /* shift first half */
    lsl     w0, w0, #16

    /* combine */
    orr     w0, w0, w3

    ret

fail:
    mov     w0, #80
    ret
```

## 🧠 Register usage (quick reference)

```txt
x0 → data pointer
x1 → len
x2 → len - 2
w0 → result (return register)
w3 → last 2 bytes
```

## 📦 Bit layout of the return value

```txt
w0 (u32)
31            16 15             0
┌────────────────┬────────────────┐
│ data[0..1]     │ data[len-2..]  │
└────────────────┴────────────────┘
```




