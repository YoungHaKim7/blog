---
title: 260131_implementing_LFU_Cache_Least_Frequently_Used
published: 2026-01-31
description: '(C++ & Rust) How to implement a Least Frequently Used (LFU) cache?'
image: ''
tags: [rust, optimization, LFU]
category: 'optimization'
draft: false 
lang: ''
---

# link

- C++
- [C++로 LFU(Least Frequently Used) 구현하기](#c로-먼저-구현해보자)
  - [C++ LFU code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Cpp_lang/001_LFU_impl/a01_LFU_cache)

- Rust
- [Rust로 LFU 구현하기](#rust로-lfu-cache를-구현해-보자)
  - [Rust LFU code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/005_std_Cooking_Rust/002_cache_LFUCache/a01_cache_lfu_cache)
- [Rust Nightly ver.1.95 구현linked_list_cursors](#nightly-version으로-구현해보자rust-ver-195nightly)
  - [Rust Nightly code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/005_std_Cooking_Rust/002_cache_LFUCache/a02_cache_lfu_cache_night_ver)

- MIT 영상 모아보기   
    - [MIT 6.172 Performance Engineering of Software Systems, Fall 2018 MIT OpenCourseWare](https://youtube.com/playlist?list=PLUl4u3cNGP63VIBQVWguXxZZi0566y7Wf&si=LXXD8Fnt7uN2VAN2)

<hr />

# How to implement a Least Frequently Used (LFU) cache?[|🔝|](#link)
- https://stackoverflow.com/questions/21117636/how-to-implement-a-least-frequently-used-lfu-cache?rq=3

<hr />

# C++로 먼저 구현해보자.[|🔝|](#link)

```cpp
// https://stackoverflow.com/questions/21117636/how-to-implement-a-least-frequently-used-lfu-cache?rq=3
// Source - https://stackoverflow.com/a/54516986
// Posted by Andrushenko Alexander, modified by community. See post 'Timeline'
// for change history Retrieved 2026-02-01, License - CC BY-SA 4.0

#include <cassert>
#include <list>
#include <string>
#include <unordered_map>

typedef unsigned uint;

template <typename K, typename V = K> struct Entry {
    K key;
    V value;
};

template <typename K, typename V = K> class LFUCache {

    typedef typename std::list<Entry<K, V>> ElementList;
    typedef typename std::list<std::pair<uint, ElementList>> FrequencyList;

  private:
    std::unordered_map<K, std::pair<typename FrequencyList::iterator,
                                    typename ElementList::iterator>>
        cacheMap;
    FrequencyList elements;
    uint maxSize;
    uint curSize;

    void incrementFrequency(std::pair<typename FrequencyList::iterator,
                                      typename ElementList::iterator>
                                p) {
        if (p.first == prev(elements.end())) {
            // frequency list contains single list with some frequency, create
            // new list with incremented frequency (p.first->first + 1)
            elements.push_back(
                {p.first->first + 1, {{p.second->key, p.second->value}}});
            // erase and insert the key with new iterator pair
            cacheMap[p.second->key] = {prev(elements.end()),
                                       prev(elements.end())->second.begin()};
        } else {
            // there exist element(s) with higher frequency
            auto pos = next(p.first);
            if (p.first->first + 1 == pos->first)
                // same frequency in the next list, add the element in the begin
                pos->second.push_front({p.second->key, p.second->value});
            else
                // insert new list before next list
                pos =
                    elements.insert(pos, {p.first->first + 1,
                                          {{p.second->key, p.second->value}}});
            // update cachMap iterators
            cacheMap[p.second->key] = {pos, pos->second.begin()};
        }
        // if element list with old frequency contained this singe element,
        // erase the list from frequency list
        if (p.first->second.size() == 1)
            elements.erase(p.first);
        else
            // erase only the element with updated frequency from the old list
            p.first->second.erase(p.second);
    }

    void eraseOldElement() {
        if (elements.size() > 0) {
            auto key = prev(elements.begin()->second.end())->key;
            if (elements.begin()->second.size() < 2)
                elements.erase(elements.begin());
            else
                elements.begin()->second.erase(
                    prev(elements.begin()->second.end()));
            cacheMap.erase(key);
            curSize--;
        }
    }

  public:
    LFUCache(uint size) {
        if (size > 0)
            maxSize = size;
        else
            maxSize = 10;
        curSize = 0;
    }
    void set(K key, V value) {
        auto entry = cacheMap.find(key);
        if (entry == cacheMap.end()) {
            if (curSize == maxSize)
                eraseOldElement();
            if (elements.begin() == elements.end()) {
                elements.push_front({1, {{key, value}}});
            } else if (elements.begin()->first == 1) {
                elements.begin()->second.push_front({key, value});
            } else {
                elements.push_front({1, {{key, value}}});
            }
            cacheMap.insert(
                {key, {elements.begin(), elements.begin()->second.begin()}});
            curSize++;
        } else {
            entry->second.second->value = value;
            incrementFrequency(entry->second);
        }
    }

    bool get(K key, V &value) {
        auto entry = cacheMap.find(key);
        if (entry == cacheMap.end())
            return false;
        value = entry->second.second->value;
        incrementFrequency(entry->second);
        return true;
    }
};

int main() {
    bool rc;
    int r;
    LFUCache<int> cache(3); // cache of size 3
    cache.set(1, 1);
    cache.set(2, 2);
    cache.set(3, 3);
    cache.set(2, 4);

    rc = cache.get(1, r);

    assert(rc);
    assert(r == 1);
    // evict old element, in this case 3
    cache.set(4, 5);
    rc = cache.get(3, r);
    assert(!rc);
    rc = cache.get(4, r);
    assert(rc);
    assert(r == 5);

    LFUCache<int, std::string> cache2(2);
    cache2.set(1, "one");
    cache2.set(2, "two");
    std::string val;
    rc = cache2.get(1, val);
    if (rc)
        assert(val == "one");
    else
        assert(false);

    cache2.set(3, "three"); // evict 2
    rc = cache2.get(2, val);
    assert(rc == false);
    rc = cache2.get(3, val);
    assert(rc);
    assert(val == "three");
}
```

<hr />


# Rust로 LFU cache를 구현해 보자.[|🔝|](#link)

```rs
use std::collections::{HashMap, VecDeque};
use std::hash::Hash;

type Freq = u64;

/// Using VecDeque instead of LinkedList for better stable API support
type ElementList<K, V> = VecDeque<Entry<K, V>>;
type FrequencyList<K, V> = VecDeque<(Freq, ElementList<K, V>)>;

/// Entry<K, V> == C++ struct Entry<K, V>
#[derive(Clone)]
struct Entry<K, V> {
    key: K,
    value: V,
}

pub struct LFUCache<K, V> {
    /// key -> frequency
    cache_map: HashMap<K, Freq>,

    /// Ordered by increasing frequency (front = least freq)
    elements: FrequencyList<K, V>,

    max_size: usize,
    cur_size: usize,
}

impl<K, V> LFUCache<K, V>
where
    K: Eq + Hash + Clone,
    V: Clone,
{
    pub fn new(size: usize) -> Self {
        Self {
            cache_map: HashMap::new(),
            elements: VecDeque::new(),
            max_size: if size > 0 { size } else { 10 },
            cur_size: 0,
        }
    }

    /* ---------------- internal helpers ---------------- */

    fn increment_frequency(&mut self, key: &K) {
        let freq = *self.cache_map.get(key).unwrap();
        let new_freq = freq + 1;

        // Find and remove the entry from the old frequency list
        let mut entry: Option<Entry<K, V>> = None;
        let mut freq_idx: Option<usize> = None;

        for (i, (f, list)) in self.elements.iter_mut().enumerate() {
            if *f == freq {
                freq_idx = Some(i);
                // Find and remove the entry with matching key
                for j in 0..list.len() {
                    if &list[j].key == key {
                        entry = Some(list.remove(j).unwrap());
                        break;
                    }
                }
                break;
            }
        }

        let entry = entry.unwrap();

        // Remove empty frequency list
        if let Some(idx) = freq_idx {
            if self.elements[idx].1.is_empty() {
                self.elements.remove(idx);
            }
        }

        // Insert into new frequency list
        let mut inserted = false;
        for (f, list) in self.elements.iter_mut() {
            if *f == new_freq {
                list.push_front(entry.clone());
                self.cache_map.insert(key.clone(), new_freq);
                inserted = true;
                break;
            }
        }

        if !inserted {
            // Find the correct position to insert (sorted by frequency)
            let mut insert_idx = 0;
            for (i, (f, _)) in self.elements.iter().enumerate() {
                if *f > new_freq {
                    insert_idx = i;
                    break;
                }
                insert_idx = i + 1;
            }

            let mut new_list = VecDeque::new();
            new_list.push_front(entry);
            self.elements.insert(insert_idx, (new_freq, new_list));
            self.cache_map.insert(key.clone(), new_freq);
        }
    }

    fn erase_old_element(&mut self) {
        if let Some((_, list)) = self.elements.front_mut() {
            if let Some(entry) = list.pop_back() {
                self.cache_map.remove(&entry.key);
                self.cur_size -= 1;
            }
            if list.is_empty() {
                self.elements.pop_front();
            }
        }
    }

    /* ---------------- public API ---------------- */

    pub fn set(&mut self, key: K, value: V) {
        if self.cache_map.contains_key(&key) {
            // update value
            let freq = self.cache_map[&key];
            for (f, list) in self.elements.iter_mut() {
                if *f == freq {
                    for e in list.iter_mut() {
                        if e.key == key {
                            e.value = value.clone();
                            break;
                        }
                    }
                    break;
                }
            }
            self.increment_frequency(&key);
            return;
        }

        if self.cur_size == self.max_size {
            self.erase_old_element();
        }

        // insert with frequency 1
        if let Some((f, list)) = self.elements.front_mut() {
            if *f == 1 {
                list.push_front(Entry {
                    key: key.clone(),
                    value,
                });
            } else {
                let mut list = VecDeque::new();
                list.push_front(Entry {
                    key: key.clone(),
                    value,
                });
                self.elements.push_front((1, list));
            }
        } else {
            let mut list = VecDeque::new();
            list.push_front(Entry {
                key: key.clone(),
                value,
            });
            self.elements.push_front((1, list));
        }

        self.cache_map.insert(key, 1);
        self.cur_size += 1;
    }

    pub fn get(&mut self, key: K) -> Option<V> {
        if !self.cache_map.contains_key(&key) {
            return None;
        }

        let freq = self.cache_map[&key];
        let mut value = None;

        for (f, list) in self.elements.iter() {
            if *f == freq {
                for e in list.iter() {
                    if e.key == key {
                        value = Some(e.value.clone());
                        break;
                    }
                }
                break;
            }
        }

        self.increment_frequency(&key);
        value
    }
}

fn main() {
    let mut cache = LFUCache::<i64, i64>::new(3);

    cache.set(1, 1);
    cache.set(2, 2);
    cache.set(3, 3);
    cache.set(2, 4);

    let r = cache.get(1);
    assert_eq!(r, Some(1));

    cache.set(4, 5); // evict key 3

    assert_eq!(cache.get(3), None);
    assert_eq!(cache.get(4), Some(5));

    let mut cache2 = LFUCache::<i64, String>::new(2);
    cache2.set(1, "one".to_string());
    cache2.set(2, "two".to_string());

    let r = cache2.get(1);
    assert_eq!(r, Some("one".to_string()));

    cache2.set(3, "three".to_string()); // evict 2

    assert_eq!(cache2.get(2), None);
    assert_eq!(cache2.get(3), Some("three".to_string()));
}
```

# nightly version으로 구현해보자(rust ver. 1.95nightly)[|🔝|](#link)
- [linked_list_cursors(nightly)](https://doc.rust-lang.org/std/collections/linked_list/struct.Cursor.html)

```rs
#![feature(linked_list_cursors)]
use std::collections::{HashMap, LinkedList};
use std::hash::Hash;

type Freq = u64;

/// Entry<K, V> == C++ struct Entry<K, V>
#[derive(Clone)]
struct Entry<K, V> {
    key: K,
    value: V,
}

/// Each frequency node:
/// (frequency, list of entries with that frequency)
type ElementList<K, V> = LinkedList<Entry<K, V>>;
type FrequencyList<K, V> = LinkedList<(Freq, ElementList<K, V>)>;

pub struct LFUCache<K, V> {
    /// key -> (frequency, index inside that frequency list)
    ///
    /// Rust does not allow stable iterators like C++,
    /// so we store (frequency, key) and re-locate on demand.
    cache_map: HashMap<K, Freq>,

    /// Ordered by increasing frequency (front = least freq)
    elements: FrequencyList<K, V>,

    max_size: usize,
    cur_size: usize,
}

impl<K, V> LFUCache<K, V>
where
    K: Eq + Hash + Clone,
    V: Clone,
{
    pub fn new(size: usize) -> Self {
        Self {
            cache_map: HashMap::new(),
            elements: LinkedList::new(),
            max_size: if size > 0 { size } else { 10 },
            cur_size: 0,
        }
    }

    /* ---------------- internal helpers ---------------- */

    fn increment_frequency(&mut self, key: &K) {
        let freq = *self.cache_map.get(key).unwrap();

        let new_freq = freq + 1;
        let mut entry: Option<Entry<K, V>> = None;

        let mut cursor = self.elements.cursor_front_mut();

        while let Some((f, list)) = cursor.current() {
            if *f == freq {
                // remove entry from old frequency list
                let mut list_cursor = list.cursor_front_mut();
                while let Some(e) = list_cursor.current() {
                    if &e.key == key {
                        entry = Some(e.clone());
                        list_cursor.remove_current();
                        break;
                    }
                    list_cursor.move_next();
                }

                // remove empty frequency list
                if list.is_empty() {
                    cursor.remove_current();
                }
                break;
            }
            cursor.move_next();
        }

        let entry = entry.unwrap();

        // insert into new frequency list
        let mut cursor = self.elements.cursor_front_mut();
        while let Some((f, _)) = cursor.current() {
            if *f == new_freq {
                cursor.current().unwrap().1.push_front(entry);
                self.cache_map.insert(key.clone(), new_freq);
                return;
            }
            if *f > new_freq {
                break;
            }
            cursor.move_next();
        }

        let mut new_list = LinkedList::new();
        new_list.push_front(entry);
        cursor.insert_before((new_freq, new_list));
        self.cache_map.insert(key.clone(), new_freq);
    }

    fn erase_old_element(&mut self) {
        if let Some((_, list)) = self.elements.front_mut() {
            if let Some(entry) = list.pop_back() {
                self.cache_map.remove(&entry.key);
                self.cur_size -= 1;
            }
            if list.is_empty() {
                self.elements.pop_front();
            }
        }
    }

    /* ---------------- public API ---------------- */

    pub fn set(&mut self, key: K, value: V) {
        if self.cache_map.contains_key(&key) {
            // update value
            let freq = self.cache_map[&key];
            for (f, list) in self.elements.iter_mut() {
                if *f == freq {
                    for e in list.iter_mut() {
                        if e.key == key {
                            e.value = value.clone();
                            break;
                        }
                    }
                    break;
                }
            }
            self.increment_frequency(&key);
            return;
        }

        if self.cur_size == self.max_size {
            self.erase_old_element();
        }

        // insert with frequency 1
        if let Some((f, list)) = self.elements.front_mut() {
            if *f == 1 {
                list.push_front(Entry {
                    key: key.clone(),
                    value,
                });
            } else {
                let mut list = LinkedList::new();
                list.push_front(Entry {
                    key: key.clone(),
                    value,
                });
                self.elements.push_front((1, list));
            }
        } else {
            let mut list = LinkedList::new();
            list.push_front(Entry {
                key: key.clone(),
                value,
            });
            self.elements.push_front((1, list));
        }

        self.cache_map.insert(key, 1);
        self.cur_size += 1;
    }

    pub fn get(&mut self, key: K) -> Option<V> {
        if !self.cache_map.contains_key(&key) {
            return None;
        }

        let freq = self.cache_map[&key];
        let mut value = None;

        for (f, list) in self.elements.iter() {
            if *f == freq {
                for e in list.iter() {
                    if e.key == key {
                        value = Some(e.value.clone());
                        break;
                    }
                }
                break;
            }
        }

        self.increment_frequency(&key);
        value
    }
}

fn main() {
    let mut cache = LFUCache::<i64, i64>::new(3);

    cache.set(1, 1);
    cache.set(2, 2);
    cache.set(3, 3);
    cache.set(2, 4);

    let r = cache.get(1);
    assert_eq!(r, Some(1));

    cache.set(4, 5); // evict key 3

    assert_eq!(cache.get(3), None);
    assert_eq!(cache.get(4), Some(5));

    let mut cache2 = LFUCache::<i64, String>::new(2);
    cache2.set(1, "one".to_string());
    cache2.set(2, "two".to_string());

    let r = cache2.get(1);
    assert_eq!(r, Some("one".to_string()));

    cache2.set(3, "three".to_string()); // evict 2

    assert_eq!(cache2.get(2), None);
    assert_eq!(cache2.get(3), Some("three".to_string()));
}
```

