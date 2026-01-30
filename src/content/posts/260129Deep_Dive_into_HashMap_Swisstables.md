---
title: 260129Deep_Dive_into_HashMap_Swisstables
published: 2026-01-29
description: 'C++ Swisstables설명 & Rust 로 swisstable만들면서 하나씩 깊이 파고 들기'
image: ''
tags: [rust, std, hashmap, swisstable]
category: 'rust'
draft: false 
lang: ''
---

# link

- [C++ Swisstables설명자료](#c-swisstables설명자료)

- [Rust의 HashMap 깊게 파들어가기](#rust의-hashmap-깊게-파들어가기)

- [tiny버젼의 약간 쉬운 버젼으로 swisstable만들어보기](#below-is-a-tiny-educational-swisstable-style-hash-map-stripped-down-to-the-core-ideas)

- [(완성도 높은거)Rust코드로 SwissTable구현한거](#rust코드로-swisstable구현한거)

<hr />

# C++ Swisstables설명자료[|🔝|](#link)
- [171027) CppCon 2017: Matt Kulukundis “Designing a Fast, Efficient, Cache-friendly Hash Table, Step by Step”](https://youtu.be/ncHmEUmJZf4?si=cvaR7cQqEvhJTWwV)

## References[|🔝|](#link)
- [SwissTable Design(abseil.io)](https://abseil.io/about/design/swisstables)
- [absl::flat_hash_map(`raw_hash_set.h`)](https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/raw_hash_set.h)
- [F14 HashMap](https://github.com/facebook/folly/blob/main/folly/container/F14.md)

<hr />

# Rust의 HashMap 깊게 파들어가기[|🔝|](#link)

## 0. Big picture first (one paragraph)[|🔝|](#link)

- Rust’s HashMap is not a classic “bucket of linked lists” hash table.
- It is a cache-friendly, SIMD-accelerated, open-addressing hash table based on Google’s SwissTable design.
- Keys and values live in a dense array, while a separate control-byte array tracks occupancy and partial hashes.
- Lookups scan multiple slots at once using SIMD, making hash map operations branch-poor, cache-friendly, and fast.

- Keep that model in your head.

- 0. 먼저 큰 그림 (한 단락)

- Rust의 해시맵은 고전적인 "연결된 목록 버킷" 해시 테이블이 아닙니다.
- 구글의 SwissTable 디자인을 기반으로 한 캐시 친화적이고 SIMD 가속화된 오픈 어드레싱 해시 테이블입니다.
- 키와 값은 밀집된 배열로 존재하며, 별도의 제어 바이트 배열은 점유율과 부분 해시를 추적합니다.
- 조회는 SIMD를 사용하여 여러 슬롯을 한 번에 스캔하므로 해시 맵 작업이 브랜치가 낮고 캐시 친화적이며 빠릅니다.

- 그 모델을 머릿속에 간직하세요.

# 1. Classical hashmap (what SwissTable replaces)[|🔝|](#link)

- Old-school design (conceptual)

```bash
hash(key) % N → bucket
bucket → linked list / vec
```

- Problems:
  - Pointer chasing (cache misses)
  - Poor locality
  - Branch-heavy
  - Slow iteration

- Bad SIMD usage
- SwissTable throws this away completely.

- 문제:
  - 포인터 추적(캐시 미스)
  - 열악한 지역
  - 가지가 많은
  - 느린 반복

- SIMD 사용 불량
- SwissTable은 이것을 완전히 버립니다.


# 2. SwissTable core idea (the breakthrough)[|🔝|](#link)

- SwissTable is built on four key ideas:
- Open addressing (no linked lists)
- Control bytes (metadata separate from data)
- Partial hash (fingerprints)
- SIMD group scanning
- Everything else follows from this.

- 2. SwissTable의 핵심 아이디어 (획기적인 아이디어)

- SwissTable은 네 가지 주요 아이디어를 바탕으로 구축되었습니다:
- 주소 열기(연결된 목록 없음)
- 제어 바이트(데이터와 별도로 메타데이터)
- 부분 해시(지문)
- SIMD 그룹 스캐닝
- 다른 모든 것은 여기서 비롯됩니다.

# 3. Memory layout (this is crucial)[|🔝|](#link)
- 3. 메모리 레이아웃 (이것은 매우 중요합니다)

- SwissTable splits memory into two parallel arrays:
  - SwissTable은 메모리를 두 개의 병렬 배열로 나눕니다:

```txt
+--------------------+----------------------------+
| Control bytes      | Entries (keys + values)    |
+--------------------+----------------------------+
```

- Detailed view

```txt
control[0..N]     entries[0..N]
──────────────   ───────────────────────────────
| c0 | c1 | c2 |   | (K0, V0) | (K1, V1) | ...
──────────────   ───────────────────────────────
```

- Control bytes are tiny (1 byte each) and hot in cache.
- Entries are large and cold.

- This separation is fundamental.

- 제어 바이트는 작고(각각 1바이트) 캐시에서 뜨겁습니다.
- 항목이 크고 차갑습니다.

- 이 분리는 기본입니다.

# 4. Control byte meanings[|🔝|](#link)
- 4. 바이트 제어 의미

- Each control byte stores state + hash fingerprint.
  - 각 제어 바이트는 상태 + 해시 핑거프린트를 저장합니다.

```txt
0x80   = EMPTY
0xFE   = DELETED (tombstone)
0x00–0x7F = OCCUPIED, lower 7 bits = hash fingerprint
```

- So each occupied slot stores:

```txt
control[i] = hash(key) & 0x7F
```

- That’s only 7 bits, but it’s enough to filter candidates.
  - 그것은 단지 7비트에 불과하지만, 후보자들을 걸러내기에 충분합니다.

# 5. Hash splitting (very important)
- 5. 해시 분할(매우 중요)
- When you hash a key:
  - 키를 해시할 때:

```txt
full_hash = hash(key)
```

- SwissTable splits it:

```txt
h1 = full_hash >> 7        (used to pick starting index)
h2 = full_hash & 0x7F      (stored in control byte)
```

- Think of it as:
  - h1 → where to start probing
  - h2 → quick equality pre-check

- 생각해 보세요:
  - h1 → 탐색을 시작할 위치
  - h2 → 빠른 평등 사전 점검

# 6. Quadratic probing (but smarter)[|🔝|](#link)

- SwissTable uses quadratic probing, but with grouped steps.
- Instead of checking one slot at a time:

- 6. 이차 탐사 (하지만 더 똑똑함)

- SwissTable은 이차 탐색을 사용하지만, 그룹화된 단계를 사용합니다.
- 한 번에 하나의 슬롯을 확인하는 대신:

```txt
i, i+1, i+2, i+3, ...
```

- It checks groups of 16 (or 8) slots at once.
  - 16개(또는 8개) 슬롯 그룹을 한 번에 확인합니다.

# 7. SIMD lookup (this is the magic)[|🔝|](#link)

- Let’s say a group size is 16.
- Step-by-step lookup

  - 1. Load 16 control bytes into a SIMD register
  - 2. Compare all 16 bytes against h2
  - 3. Produce a bitmask
  - 4. Only check actual keys where bits are set

- ASCII visualization

- 7. SIMD 조회 (이것이 마법입니다)

- 그룹 크기가 16이라고 가정해 보겠습니다.
- 단계별 조회

  - 1. 16개의 제어 바이트를 SIMD 레지스터에 로드합니다
  - 2. 16바이트를 모두 h2와 비교하기
  - 3. 비트마스크 제작
  - 4. 비트가 설정된 실제 키만 확인합니다

- ASCII 시각화

```txt
Control group (16 bytes):
[h2][xx][h2][--][--][h2][xx][--][--][--][--][--][--][--][--][--]

SIMD compare == h2
↓
Bitmask: 10100100_00000000
```

Only those positions are checked with `Eq`.
- 👉 Most lookups never touch the key/value memory at all.

- 그 위치들만 'Eq'로 확인됩니다.
- 👉 대부분의 조회는 키/값 메모리를 전혀 건드리지 않습니다.

# 8. Empty-slot detection (early exit)[|🔝|](#link)

- SIMD is also used to detect EMPTY slots.
- Why?
- If an EMPTY slot appears during probing → key is not present
- No need to search further
- This is what makes open addressing fast instead of slow.

- 8. 빈 슬롯 감지(조기 종료)

- SIMD는 빈 슬롯을 감지하는 데에도 사용됩니다.
- 왜요?
- 탐색 중에 빈 슬롯이 나타나면 → 키가 없습니다
- 더 이상 검색할 필요 없음
- 이것이 오픈 어드레싱을 느리게 만드는 것이 아니라 빠르게 만드는 이유입니다.

# 9. Insertion flow (simplified)[|🔝|](#link)

```txt
hash(key)
↓
compute h1, h2
↓
scan control groups via SIMD
↓
if h2 match → check Eq
↓
else if EMPTY found → insert here
↓
write entry + control byte

```

- Deletion marks slots as DELETED (tombstone).
  - 삭제는 슬롯을 DELETED(툼스톤)로 표시합니다.

# 10. Why quadratic probing + groups works[|🔝|](#link)

- Quadratic probing:
  - Avoids clustering
  - Preserves cache locality

- Grouped probing:
  - Aligns with cache lines
  - Perfect for SIMD
  - Predictable memory access

- This is hardware-aware algorithm design.

- 10. 이차 탐색 + 그룹이 작동하는 이유

- 이차 탐사:
  - 클러스터링 방지
  - 캐시 로컬리티 유지

- 그룹 탐색:
  - 캐시 라인과 일치합니다
  - SIMD에 완벽한
  - 예측 가능한 메모리 액세스

- 이것은 하드웨어 인식 알고리즘 설계입니다.

# 11. Why iteration is fast[|🔝|](#link)
- 11. 반복이 빠른 이유

- Iteration walks the control array:
  - 반복은 제어 배열을 걷습니다:

```rs
for i in 0..N {
    if control[i] is OCCUPIED {
        yield entry[i]
    }
}
```

- No pointer chasing
- No bucket indirection
- Just linear memory

- 포인터 추적 금지
- 버킷 방향 없음
- 선형 메모리


# 12. Load factor & resizing[|🔝|](#link)

- SwissTable runs at high load factors (~87.5%) safely.

- Why this works:
  - SIMD makes probing cheap
  - Control bytes detect termination quickly

- Resize happens by:
  - Allocating a new table
  - Rehashing entries (but very fast due to locality)

- SwissTable은 고부하 요인(~87.5%)에서 안전하게 작동합니다.

- 이것이 작동하는 이유:
  - SIMD로 탐사 비용 절감
  - 제어 바이트가 종료를 빠르게 감지합니다

- 크기 조정은 다음에 의해 이루어집니다:
  - 새 테이블 할당하기
  - 재해시 항목(하지만 지역성 때문에 매우 빠름)

# 13. Why SipHash matters here[|🔝|](#link)

- SwissTable assumes good hash distribution.
- SipHash:
  - Prevents collision attacks (HashDoS)
  - Randomly seeded
  - Slightly slower, but safe

- For integer-heavy workloads, users switch to:
  - `ahash`
  - `fxhash`
  - `wyhash`

- Rust lets you do this per map.

- 13. SipHash가 중요한 이유

- SwissTable은 좋은 해시 분포를 가정합니다.
- SipHash:
  - 충돌 공격을 방지합니다(HashDoS)
  - 무작위로 시드 배정
  - 약간 느리지만 안전합니다

- 정수가 많은 워크로드의 경우 사용자는 다음으로 전환합니다:
  - '해시'
  - 'fx 해시'
  - '와이해시'

- Rust(러스트)언어은 지도마다 이 작업을 수행할 수 있게 해줍니다.

# 14. Logic errors you quoted (why they matter)[|🔝|](#link)

- Equal keys must hash equal
- Because:
  - SwissTable relies on hash to find location
  - If equality contradicts hash → lookup may never find the key

- Mutating keys is fatal (but not UB)
- Why no UB?
  - Rust isolates the failure to the map
  - But results are garbage: infinite loops, leaks, panics

- SwissTable is safe but unforgiving.

- 14. 인용한 논리 오류(중요한 이유)

- 동일한 키는 해시 값이 같아야 합니다
- 왜냐하면:
  - SwissTable은 위치를 찾기 위해 해시를 사용합니다
  - 동등성이 해시 → 조회와 모순되는 경우 키를 찾지 못할 수 있습니다

- 키를 변경하는 것은 치명적이지만 UB는 그렇지 않습니다
- 왜 UB가 없나요?
  - Rust은 지도(map)의 실패를 격리합니다
  - 하지만 결과는 쓰레기입니다: 무한 루프, 누수, 패닉

- 스위스테이블은 안전하지만 용서받지 못합니다.

# 15. Complete mental model (this is the takeaway)[|🔝|](#link)

```bash
HashMap =
  Control bytes (hot, SIMD, tiny)
+ Entries (cold, dense, compact)
+ Open addressing
+ Quadratic probing
+ Partial hash filtering
```

- Or in one sentence:
> SwissTable is a SIMD-accelerated, open-addressing hash table that separates metadata from data to minimize cache misses and branch mispredictions.

- 또는 한 문장으로:
> SwissTable은 데이터에서 메타데이터를 분리하여 캐시 누락과 분기 오예측을 최소화하는 SIMD 가속 오픈 어드레싱 해시 테이블입니다.

# 16. Visual summary (CLI-style)[|🔝|](#link)

```txt
Index:     0    1    2    3    4    5    6    7
Control:  [h2] [--] [--] [h2] [xx] [--] [--] [--]
Entries:  [K ] [  ] [  ] [K ] [  ] [  ] [  ] [  ]

SIMD scan → bitmask → Eq checks → done
```

<hr />

# Below is a tiny, educational SwissTable-style hash map, stripped down to the core ideas:[|🔝|](#link)

- [sample code (tiny ver. swisstable-style hashmap)](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/005_std_Collections/002_HashMap_HashSet_etc/002_tiny_ver_swisstable/a01_data_struct)

- 아래는 핵심 아이디어로 세분화된 작은 교육용 SwissTable 스타일의 해시 맵입니다:

- control bytes
- open addressing
- partial hash (fingerprint)
- group scanning (SIMD-like, but scalar for clarity)
- ⚠️ This is not production code. It is intentionally small so you can see the mechanism.


- 제어 바이트
- 오픈 주소 지정
- 부분 해시(지문)
- 그룹 스캐닝(SIMD와 유사하지만 명확성을 위해 스칼라)
- ⚠️ 이것은 프로덕션 코드가 아닙니다. 의도적으로 작기 때문에 메커니즘을 볼 수 있습니다.

# 1. What we are going to build (scope)[|🔝|](#link)
- 1. 우리가 만들 것 (범위)

- We will implement:
  - `TinySwissMap<K, V>`
  - Fixed capacity (power of two)
  - Linear probing in groups
  - Control bytes (`EMPTY`, `FULL`)
  - Partial hash (`h2`)
  - Separate control array + entry array

- We will not implement:
  - resizing
  - deletion
  - real SIMD (we simulate it with loops)

- This mirrors the principle, not the full complexity.

- 구현하겠습니다:
  - `TinySwissMap<K, V>`
  - 고정 용량(2의 거듭제곱)
  - 그룹별 선형 탐색
  - 제어 바이트('EMPTY', 'FULL')
  - 부분 해시 ('h2')
  - 별도 제어 배열 + 항목 배열

- 우리는 실행하지 않을 것입니다:
  - 크기 조정
  - 삭제
  - 실제 SIMD (루프로 시뮬레이션합니다)

- 이것은 전체 복잡성이 아니라 원칙을 반영합니다.

# 2. Memory layout (conceptual)[|🔝|](#link)

```txt
Index:    0    1    2    3    4    5    6    7
Control: [--] [h2] [--] [--] [h2] [--] [--] [--]
Entries: [   ][KV ][   ][   ][KV ][   ][   ][   ]
```

- `control[i]` is 1 byte
- `entries[i]` is `(K, V)`
- They are parallel arrays

- 제어 [i]는 1바이트입니다
- 항목[i]은 (K, V)입니다
- 병렬 배열입니다

# 3. Constants and control bytes[|🔝|](#link)

```rs
const EMPTY: u8 = 0x80; // same idea as SwissTable
const GROUP_SIZE: usize = 8; // small for learning
```

- Occupied slots store `h2 = hash & 0x7F`.

# 4. The data structure[|🔝|](#link)

```rs
use std::hash::{Hash, Hasher};
use std::collections::hash_map::DefaultHasher;

pub struct TinySwissMap<K, V> {
    control: Vec<u8>,
    entries: Vec<Option<(K, V)>>,
    mask: usize,
}
```

- Why `Option<(K, V)>`?
  - Keeps things safe and simple
  - Real SwissTable uses raw memory

  - 물건을 안전하고 간단하게 보관합니다
  - Real SwissTable은 원시 메모리를 사용합니다


# 5. Constructor[|🔝|](#link)

```rs
impl<K, V> TinySwissMap<K, V>
where
    K: std::clone::Clone,
    V: std::clone::Clone,
{
    pub fn new(capacity: usize) -> Self {
        assert!(capacity.is_power_of_two());

        Self {
            control: vec![EMPTY; capacity],
            entries: vec![None; capacity],
            mask: capacity - 1,
        }
    }
}
```

# 6. Hash splitting (h1 / h2)[|🔝|](#link)

```rs
fn hash<Q: Hash>(key: &Q) -> u64 {
    let mut hasher = DefaultHasher::new();
    key.hash(&mut hasher);
    hasher.finish()
}

fn h1(hash: u64) -> usize {
    (hash >> 7) as usize
}

fn h2(hash: u64) -> u8 {
    (hash & 0x7F) as u8
}
```

- This is exactly the SwissTable idea.

# 7. Group scanning (SIMD-like logic)[|🔝|](#link)

- Instead of real SIMD, we scan a group:

```rs
fn find_in_group(
    control: &[u8],
    start: usize,
    h2: u8,
) -> Option<usize> {
    for i in 0..GROUP_SIZE {
        let idx = start + i;
        let c = control[idx];
        if c == h2 {
            return Some(idx);
        }
        if c == EMPTY {
            return None; // early exit!
        }
    }
    None
}
```

- ⚠️ Important
- Encountering `EMPTY` means:

> the key does not exist anywhere further

- This is the heart of open addressing.
- ⚠️ 중요
- `EMPTY`을 만난다는 것은 다음을 의미합니다:

> 키는 더 이상 존재하지 않습니다

- 이것이 오픈 어드레싱의 핵심입니다.

# 8. Lookup (`get`)[|🔝|](#link)

```rs
impl<K: Eq + Hash, V> TinySwissMap<K, V> {
    pub fn get(&self, key: &K) -> Option<&V> {
        let hash = hash(key);
        let mut index = h1(hash) & self.mask;
        let tag = h2(hash);

        loop {
            let group_start = index & !(GROUP_SIZE - 1);

            if let Some(pos) = find_in_group(&self.control, group_start, tag) {
                if let Some((k, v)) = &self.entries[pos] {
                    if k == key {
                        return Some(v);
                    }
                }
            } else {
                return None;
            }

            index = (group_start + GROUP_SIZE) & self.mask;
        }
    }
}
```

- What happens here
  - 1. Hash key
  - 2. Compute start index
  - 3. Scan control bytes in a group
  - 4. Only check keys if fingerprint matches
  - 5. Stop early on `EMPTY`
- 여기서 일어나는 일
  - 1. 해시 키
  - 2. 시작 지수 계산
  - 3. 그룹 내 제어 바이트 스캔
  - 4. 지문이 일치하는 경우에만 키를 확인합니다
  - 5. 비어 있을 때(`EMPTY`) 일찍 멈춥니다

# 9. Insertion (insert)[|🔝|](#link)

```rs
impl<K: Eq + Hash, V> TinySwissMap<K, V> {
    pub fn insert(&mut self, key: K, value: V) {
        let hash = hash(&key);
        let mut index = h1(hash) & self.mask;
        let tag = h2(hash);

        loop {
            let group_start = index & !(GROUP_SIZE - 1);

            for i in 0..GROUP_SIZE {
                let idx = (group_start + i) & self.mask;

                if self.control[idx] == EMPTY {
                    self.control[idx] = tag;
                    self.entries[idx] = Some((key, value));
                    return;
                }
            }

            index = (group_start + GROUP_SIZE) & self.mask;
        }
    }
}
```

- This mirrors real SwissTable insertion:
  - probe groups
  - find empty
  - write control byte + entry

- 이것은 실제 SwissTable 삽입을 반영합니다:
  - 탐사 그룹
  - 비어 있음을 발견합니다
  - 쓰기 제어 바이트 + 항목

# 10. Example usage[|🔝|](#link)

```rs
fn main() {
    let mut map = TinySwissMap::new(16);

    map.insert("apple", 3);
    map.insert("banana", 5);
    map.insert("orange", 7);

    println!("{:?}", map.get(&"apple"));   // Some(3)
    println!("{:?}", map.get(&"banana"));  // Some(5)
    println!("{:?}", map.get(&"grape"));   // None
}
```

# 11. How this maps to real SwissTable[|🔝|](#link)

| Real SwissTable   | Tiny version     |
| ----------------- | ---------------- |
| SIMD compare      | Loop over group  |
| Control bytes     | `Vec<u8>`        |
| Raw memory        | `Option<(K, V)>` |
| Tombstones        | ❌ omitted       |
| Resize            | ❌ omitted       |
| Quadratic probing | Group stepping   |


<hr />

# Rust코드로 SwissTable구현한거[|🔝|](#link)

[miso code(rust로 swisstable구현)](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/005_std_Collections/002_HashMap_HashSet_etc/001_SwissTable_impl/miso)


# Key Concepts(Swisstable)[|🔝|](#link)

- 1. Control Byte Metadata

- Each slot has a 1-byte control byte:
  - 0x80 (1000_0000) = EMPTY (MSB set)
  - 0x00-0x7F (0xxxxxxx) = FULL with 7-bit hash tag
  - 0xFE = DELETED tombstone
  - 0xFF = SENTINEL (boundary marker)

- 2. SIMD Acceleration

- The code loads 16 control bytes at once using:
  - ARM NEON (neon.rs) on ARM platforms
  - Scalar fallback (scalar.rs) on other platforms

- 3. Hash Splitting

  h1 = hash >> 7            // Upper 57 bits → slot index
  h2 = (hash >> 57) & 0x7F  // Lower 7 bits → control tag

- 4. Probe Sequence

  - 1. Load 16 control bytes via SIMD
  - 2. Check for matching tags (using BitMask)
  - 3. Check for empty/deleted slots
  - 4. Advance to next group if needed
  - 5. Growth Policy

  - Grows when load factor exceeds 7/8 (87.5%)
  - Rehashes when tombstones ≥ half of live items
  - Capacity always power-of-two for fast modulo

# 주요 개념[|🔝|](#link)

- 1. 제어 바이트 메타데이터

- 각 슬롯에는 1바이트 제어 바이트가 있습니다:
  - 0x80 (1000_0000) = 비어 있음 (MSB 세트)
  - 0x00-0x7F (0xxxxxxx) = FULL with 7-bit hash tag
  - 0xFE = 삭제된 묘비
  - 0xFF = SENTINE (boundary 마커)

- 2. SIMD 가속

- 코드는 다음을 사용하여 한 번에 16개의 제어 바이트를 로드합니다:
  - ARM 플랫폼의 ARM 네온(neon.rs )
  - 다른 플랫폼의 스칼라 폴백(scalar.rs )

- 3. 해시 분할

  h1 = 해시 >> 7 // 상위 57비트 → 슬롯 인덱스
  h2 = (hash >> 57) & 0x7F // 하위 7비트 → 제어 태그

- 4. 탐사 순서

  - 1. SIMD를 통해 16개의 제어 바이트 로드
  - 2. 일치하는 태그를 확인합니다(BitMask 사용)
  - 3. 빈/삭제된 슬롯 확인
  - 4. 필요한 경우 다음 그룹으로 이동
  - 5. 성장 정책

  - 하중 계수가 7/8(87.5%)을 초과할 때 증가합니다
  - 묘비가 살아있는 아이템의 절반을 ≥ 때 재탕합니다
  - 빠른 모듈로를 위한 항상 2의 거듭제곱 용량

# Miso - SwissTable HashMap Implementation in Rust[|🔝|](#link)

A SwissTable hash map implementation from scratch for learning purposes.

## Overview

**SwissTable** is a modern hash table design developed by Google that optimizes for cache efficiency and SIMD acceleration. This project, called "Miso" (Korean for "young"), implements the core SwissTable algorithms in pure Rust.

### Why SwissTable?

Traditional hash tables use separate chaining or simple open addressing. SwissTable improves upon these with:
- **Metadata-only probing**: Search using only control bytes before touching actual data
- **SIMD acceleration**: Process 16 slots at once using vector instructions
- **Cache-friendly**: Metadata is compact and avoids pointer chasing

---

## Architecture[|🔝|](#link)

### File Structure

```
src/
├── lib.rs       # Module declarations
├── control.rs   # Control byte metadata management
├── bitmask.rs   # Bitmask for tracking SIMD matches
├── group.rs     # Generic SIMD operation trait
├── scalar.rs    # Fallback non-SIMD implementation
├── neon.rs      # ARM NEON SIMD implementation
└── table.rs     # Main HashMap implementation
```

---

## Detailed Code Explanation[|🔝|](#link)

### control.rs - Metadata Management[|🔝|](#link)

#### ControlByte Structure

```rust
#[repr(transparent)]
pub struct ControlByte(u8);
```

Each slot has a **control byte** that stores metadata:

| Value | Binary | Meaning |
|-------|--------|---------|
| `0x80` | `1000_0000` | EMPTY slot (MSB set) |
| `0xFE` | `1111_1110` | DELETED tombstone |
| `0x00-0x7F` | `0xxxxxxx` | FULL (7-bit hash tag, MSB clear) |
| `0xFF` | `1111_1111` | SENTINEL (end of valid slots) |

The **MSB (Most Significant Bit)** distinguishes empty (1) from full (0):
```rust
pub fn is_full(self) -> bool {
    self.0 & 0x80 == 0  // MSB is 0 → slot is occupied
}
```

#### ControlBytes Array

```rust
pub struct ControlBytes {
    bytes: Box<[ControlByte]>,
    capacity: usize,
}
```

Allocates `capacity + 16` bytes with a **sentinel** at position `capacity`:
- Allows SIMD reads to safely read 16 bytes past the end
- Sentinel (`0xFF`) ensures probing stops at boundary

**Clone Indexing** (lines 70-78):
```rust
fn clone_idx(&self, idx: usize) -> Option<usize> {
    if idx >= 15 { return None; }
    Some(self.capacity + idx + 1)  // Mirror indices 0-14
}
```
Mirrors the first 15 control bytes to the overflow area, ensuring SIMD reads that cross the capacity boundary see valid data.

---

### bitmask.rs - Match Tracking[|🔝|](#link)

```rust
pub struct BitMask(u16);
```

A 16-bit mask where each bit represents one slot in a SIMD group:

| Operation | Description |
|-----------|-------------|
| `any()` | Check if any bit is set |
| `lsb_idx()` | Get index of least significant set bit |
| `pop_lsb()` | Extract and remove LSB (for iteration) |

**Bit trick** (line 23):
```rust
self.0 &= self.0 - 1;  // Clears the lowest set bit
```

---

### group.rs - SIMD Abstraction[|🔝|](#link)

```rust
pub trait GroupOps {
    type View: Copy;
    fn load(ptr: *const ControlByte) -> Self::View;
    fn match_tag(view: Self::View, tag: u8) -> BitMask;
    fn match_deleted(view: Self::View) -> BitMask;
    fn match_empty(view: Self::View) -> BitMask;
}
```

This trait enables **platform-specific optimizations**:
- `NeonOps` - ARM NEON SIMD
- `ScalarOps` - Fallback for platforms without SIMD

---

### scalar.rs - Non-SIMD Fallback[|🔝|](#link)

```rust
pub struct ScalarOps;
```

Implements `GroupOps` with simple loops:

```rust
fn match_tag(view: Self::View, tag: u8) -> BitMask {
    let mut mask = BitMask::ZERO;
    for i in 0..16 {
        let byte = ControlByte::from(view[i]);
        if byte.is_full() && byte.tag() == tag {
            mask.set(i);
        }
    }
    mask
}
```

---

### neon.rs - ARM NEON SIMD[|🔝|](#link)

```rust
impl GroupOps for NeonOps {
    type View = uint8x16_t;  // 128-bit SIMD register
}
```

**Key operations**:
- `vld1q_u8` - Load 16 bytes in one instruction
- `vceqq_u8` - Parallel comparison of 16 bytes
- `vpaddl_*` - Horizontal reduction to extract bitmask

---

### table.rs - Main HashMap[|🔝|](#link)

#### Hash Splitting (lines 180-188)[|🔝|](#link)

```rust
fn get_h1_h2_from_key(&self, key: &K) -> (u64, u8) {
    let hash = hasher.finish();
    let h1 = hash >> 7;           // Upper 57 bits for indexing
    let h2 = (hash >> 57) & 0x7F; // Lower 7 bits for metadata
    (h1, h2)
}
```

The 64-bit hash is split:
- **h1**: Primary hash for slot selection
- **h2**: 7-bit tag stored in control byte for quick rejection

#### Probe Sequence (lines 128-172)[|🔝|](#link)

```rust
fn probe_for_insert(&self, h1: u64, h2: u8, key: &K) -> Option<InsertProbe> {
    let mut index = h1 & (self.capacity - 1);  // Start position
    loop {
        let group = Group::<DefaultOps>::load(ptr);  // Load 16 bytes
        let tag_mask = group.match_tag(h2);          // Find matching tags
        let delete_mask = group.match_deleted();
        let empty_mask = group.match_empty();

        // Check tag matches for potential key equality
        while let Some(hit) = tag_mask.pop_lsb() {
            if keys_equal(hit) { return Found; }
        }

        // Remember first tombstone for insertion
        if first_tombstone.is_none() && delete_mask.any() {
            first_tombstone = first_delete_position;
        }

        // Empty slot found
        if empty_mask.any() {
            return Vacant(first_tombstone.or(empty_position));
        }

        index = (index + 16) & mask;  // Advance to next group
    }
}
```

#### Growth Policy (lines 244-258)[|🔝|](#link)

```rust
fn should_grow(&self) -> bool {
    (tombstones + size + 1) * 8 >= capacity * 7  // Load factor > 7/8
}
```

SwissTable maintains **load factor ≤ 87.5%** for:
- Fewer probes on average
- More empty slots for SIMD to find quickly

---

## Example Usage[|🔝|](#link)

```rust
use miso::table::HashMap;

fn main() {
    let mut map = HashMap::new();

    // Insert key-value pairs
    map.insert("name", "Alice");
    map.insert("age", "30");

    // Lookup
    if let Some(name) = map.get(&"name") {
        println!("Name: {}", name);
    }

    // Delete
    map.delete(&"age");
}
```

---

# 원본자료[|🔝|](#link)

- **Repository**: https://github.com/thetinygoat/miso
- **Reddit Post**: ["Miso: A swiss table implementation from scratch in rust"](https://www.reddit.com/r/rust/comments/1n4q4vb/miso_a_swiss_table_implementation_from_scratch_in/)


### Original Author's Note[|🔝|](#link)

> "Hi everyone, excited to share what I've been working on for a couple of weeks. I got interested in implementing a hashmap after reading about them in some detail. I wanted to implement open addressing but after reading about Swiss tables, I decided to dive into the deep end."
>
> "This is my attempt at writing a Swiss table, just for pure learning purposes. It's been fun learning about SIMD and low-level bit manipulation."
>
> **한국어**: 안녕하세요 여러분, 해시맵 구현 프로젝트를 공유하게 되어 기쁩니다. 스위스 테이블에 대해 읽은 후 오픈 어드레싱 대신 스위스 테이블을 직접 구현해보기로 결정했습니다. SIMD와 저수준 비트 조작을 배우는 것이 재미있었습니다.

---

# Current Status[|🔝|](#link)

This project is still in its early phases, the core functionality is correct.

- [x] Open addressing with linear probing
- [x] Using control bytes while probing
- [x] Base functionality and correctness
- [x] SIMD acceleration (ARM NEON)
- [ ] x86 AVX2 support
- [ ] Iterator support
- [ ] Sharding for high concurrency

---

## Performance Considerations[|🔝|](#link)

### SIMD Benefits[|🔝|](#link)
- **16x parallelism**: Compare 16 control bytes in a single instruction
- **Cache efficiency**: Metadata is compact (1 byte per slot)
- **Reduced branches**: Bitmask eliminates per-slot conditional jumps

### Memory Layout[|🔝|](#link)
```
+----------------+---------------------+
| Control Bytes  | Key-Value Pairs     |
| (1 byte/slot)  | (variable size)     |
+----------------+---------------------+
```

### Probe Sequence[|🔝|](#link)
1. Load 16 control bytes via SIMD
2. Check for matching tags (potential same-key)
3. Check for empty slots (insertion point)
4. Advance to next group if needed

---

## Testing[|🔝|](#link)

Run tests with:
```bash
cargo test
```

Run benchmarks:
```bash
cargo bench
```

---

## References[|🔝|](#link)

- [SwissTable Design](https://abseil.io/about/design/swisstables)
- [absl::flat_hash_map](https://github.com/abseil/abseil-cpp/blob/master/absl/container/internal/raw_hash_set.h)
- [F14 HashMap](https://github.com/facebook/folly/blob/main/folly/container/F14.md)





