---
title: 260118_Parallels_VS_Concurrency
published: 2026-01-18
description: 'Concurrency is about structuring programs to manage multiple tasks, while parallelism is about executing multiple tasks at the same time — Rust gives you first-class tools for both, and they often work best together.'
image: ''
tags: [rust, parallels, concurrency, asynchronous, synchronous, std]
category: 'ParallelsConcurrency'
draft: false 
lang: ''
---

# link
- Concurrency VS Parallelism Basic
  - [1️⃣ Definitions (short and accurate)](#1%EF%B8%8F⃣--definitions-short-and-accurate)
  - [2️⃣ Core differences (table)표로 이쁘게 비교 Concurrency VS Parallelism](#2%EF%B8%8F⃣--core-differences-table)
  - [3️⃣ Timeline visualization (key intuition)](#3%EF%B8%8F⃣--timeline-visualization-key-intuition)
  - [4️⃣ Concurrency example (Rust, single thread)](#4%EF%B8%8F⃣--concurrency-example-rust-single-thread)
  - [5️⃣ Parallelism example (Rust threads)](#5%EF%B8%8F⃣--parallelism-example-rust-threads)
  - [6️⃣ Parallel data processing (idiomatic Rust)](#6%EF%B8%8F⃣--parallel-data-processing-idiomatic-rust)
  - [7️⃣ Concurrency without parallelism (Mutex example)](#7%EF%B8%8F⃣--concurrency-without-parallelism-mutex-example)
  - [8️⃣ When to use which언제써야할까? Concurrency VS Parallelism](#8%EF%B8%8F⃣--when-to-use-which)
  - [9️⃣ Common misconception (important)](#9%EF%B8%8F⃣--common-misconception-important)
  - [🔟 One-sentence summary](#-one-sentence-summary)

- Rust Code필수 지식
  - [Future(Rust trait.Future)](#futurerust-traitfuture)
  - [Rc & Arc사용법 표로 이해](#rc--arc사용법-표로-이해)

- 필수기초지식
  - [그림으로 Concurrency VS Parallelism 설명 (54초부터)](#그림으로-concurrency-vs-parallelism-설명-54초부터)
  - [프로세서 상태 다이어 그램(Process status)](#프로세서-상태-다이어-그램)
  - [I/O Multiplexing(select, poll, epoll, kqueue)](#io-multiplexingselect-poll-epoll-kqueue)
  - [(용어 이해)유휴 시간, 遊休時間, idle time, off-time](#용어-이해유휴-시간-遊休時間-idle-time-off-time)
    - 용어 이해)Concurrency Wiki정의된거
  - [`ps`로 현재 프로세스가 돌아가는거 확인하기](#ps로-현재-프로세스가-돌아가는거-확인하기)
  - [`thread` 확인은 `top`]()

- 시스템 프로그래밍 개요
  - [프로세서, 프로세서 계층, 프로세스 동기화, 시그널, 프로세스 사이 통신, 세마포어 이해](#시스템-프로그래밍-개요)
    - 세마포어(Shemaphore), 뮤텍스(Mutex) 차이
    - Deadlock(데드락) 이해


- [1.3.1 플린의 분류법(SIMD,MIMD 같은거)](#131-플린의-분류법)
  - context(문맥)
  - ALU(Arithmetic Logic Unit)
  - GPU vs CPU

<hr />

# Rc & Arc사용법 표로 이해[|🔝|](#link)
- https://github.com/YoungHaKim7/Rust_Tutorial_Full_course?tab=readme-ov-file#rust--memory-container

# 그림으로 Concurrency VS Parallelism 설명 (54초부터)[|🔝|](#link)
- https://www.youtube.com/watch?v=_Im4_3Z1NxQ
- 그림으로 이쁘게 1분 31초(task설명 잘됨.)
  - https://www.youtube.com/watch?v=jfgQxS4WDxg&t=92s

- [240710_ByteByteGo(Concurrency Vs Parallelism)](https://youtu.be/RlM9AfWf1WU?si=G97YtSfO4mNEcpXX)

- 내가 정리한 Concurrency VS Parallelism
  - https://github.com/YoungHaKim7/Algorithm_Training/tree/main/07_Parallelism_Concurrency

# 시스템 프로그래밍 개요[|🔝|](#link)

- (프로세서, 프로세서 계층, 프로세스 동기화, 시그널, 프로세스 사이 통신, 세마포어 이해)
  - https://youtube.com/playlist?list=PLBrGAFAIyf5pIIFQv_U1dG36L5rylTvbx&si=TvM_LyiU9SnDWDzG
    - Semaphore세마포어 https://en.wikipedia.org/wiki/Semaphore_(programming)
      - 세마포어 뮤텍스 차이 https://jwprogramming.tistory.com/13
      - Mutex는 (Mut + ex, 1) 상호 배제 (Mutual exclusion))
        - https://jwprogramming.tistory.com/13
    - Deadlock(데드락) 이해  https://jwprogramming.tistory.com/12

# 프로세서 상태 다이어 그램[|🔝|](#link)
- https://jwprogramming.tistory.com/15
- Process status(내가 정리한거 그림이 똑같다.)
  - https://github.com/YoungHaKim7/Algorithm_Training/tree/main/06_OS_Algorithm#process-status

# Future(Rust trait.Future)[|🔝|](#link)

- https://doc.rust-lang.org/std/future/trait.Future.html


# 1.3.1 플린의 분류법[|🔝|](#link)
- 정리 잘됨.
  - https://blog.skby.net/%EB%B3%91%EB%A0%AC%EC%B2%98%EB%A6%AC%EB%A5%BC-%EC%9C%84%ED%95%9C-%EB%A9%80%ED%8B%B0-%ED%94%84%EB%A1%9C%EC%84%B8%EC%84%9C-%EC%8B%9C%EC%8A%A4%ED%85%9C/

|Single core<br /> processor|||Vector<br /> processor<br /> ex) GPU|
|-|-|-|-|
||SISD<br>Single instruction steam<br />Single data stream|SIMD<br />Single instruction stream<br />Multiple data stream||
|-|MISD<br />Multiple instruction stream<br />Single data stream|MIMD<br />Multiple instruction stream<br />Multiple data stream|-|
|Not covered<br />(실제 구현 사례 없음?)|-|-|Multi-core processor<br />ex) CPU|

- [그림 1-12] 플린의 병렬 처리 하드웨어 분류(CUDA 기반 GPU 병렬 처리 프로그래밍p.17)

- 2.2.7. SIMD의 한계
  - https://namu.wiki/w/%ED%94%8C%EB%A6%B0%20%EB%B6%84%EB%A5%98

- (210819)22. 컴퓨터구조 - 파이프라인과 병렬처리 by devraphy
  - 출처: https://devraphy.tistory.com/339 [개발자를 향하여:티스토리]

- Michael J. Flynn이 1966년에 제안한 컴퓨터 아키텍처 구분법(Flynn's taxonomy) 은 컴퓨팅 하들웨어를 두 가지 기준을 통해 네 종류로 분류.
  - ① 데이터에 대해 한 번에 수행하는 명령어(instruction)  개수와
  - ② 명령어가(또는 명령어들이) 수행되는 데이터(data) 개수다.

- 단일명령-단일데이터(Single Instruction-Single Data, SISD)는 하나의 명령어를 하나의 데이터에 대해 수행하는 가장 간단한 구조로, 단일 코어 CPU와 같이 하나의 코어를 가지는 직렬 처리 연산 장치가 이에 속한다.
- 복수명령-단일데이터(Multiple Instruction-Single Data, MISD)는 여러 개의 명령어를 하나의 데이터에 동시에 수행하는 구조를 말함.
  - MISD 구조는 개념적으로만 기술되는, 아직 실현되지 않은 컴퓨터 아키텍처.
- MIMD(ex. CPU) 
  - 다수의 SISD가 하나의 칩 안에 들어 있는 구조.
    - 독립됐다는 뜻은 각 프로세서가 자신만의 제어 장치(control unit)와 문맥(context)를 가진다는 의미
  - MIMD는 여러 개의 연산 유닛을 가지므로, 여러 스레드가 병렬로 동시에 작업을 수행하게 된다. 쉽게 이야기하자면 각 연산 유닛이 서로 다른 일을 한다고 생각하면 된다. MIMD 기반 병렬 처리는 각 스레드에 독립된 작업(task) 들을 분배하는 경우가 많으며, 이러한 병렬 처리 기법을 태스크 수준 병렬화(task-level parallelism) 라고 부른다.
    
- SIMD
  - 병렬 처리 하드웨어의 또 다른 형태는 하나의 동일한 명령어를 여러 개의 데이터에 대해 수행하는 SIMD구조.
    - SIMD 구조의 병렬 처리 하드웨어는 데이터 배열에 연산이 적용된다는 의미에서 벡터 프로세서(vector processor) 또는 배열 프로세서(array processor)라고도 한다.
    - ex) GPU

<hr />

- context(문맥)
  - 프로세스(process) 실행과 관련된 정보들(레지스터 상태, 메모리 스택 등)의 집합

- ALU
  - An arithmetic logic unit and its associated status register. The stored carry-out is connected to carry-in to facilitate efficient carry propagation.
  - https://en.wikipedia.org/wiki/Arithmetic_logic_unit

- GPU vs CPU
  - GPU은 초등학생 집합 (단순한 연산만, 동시에 같이 계산 하는거에 집중)
  - CPU은 박사들의 집합( 복잡한 연산이 가능)
  - [NVIDIA 15년 전 만든 영상 이게 최고(CPU vs GPU)](https://youtube.com/shorts/FNZTu2iHmR0?si=taX9_4FlGbq-KIRJ)
  - [CPU와 GPU의 차이는 교수 1명과 초등학생 100명의 차이??| 국가과학기술연구회(nst)](https://youtu.be/nJqvM9iISCk?si=iMhATNL_i1pohjrd)
  - [NVIDIA와 인공지능 (CPU/GPU 차이, 엔비디아 경쟁력, NPU, HBM) | 칩쟁이](https://youtu.be/EngDiTTVYiY?si=-NsiAI9HmGQ8ghNk)

# I/O Multiplexing(select, poll, epoll, kqueue)[|🔝|](#link)

- I/O Multiplexing(select, poll, epoll, kqueue)
  - https://www.mimul.com/blog/io-multiplexing/

# (용어 이해)유휴 시간, 遊休時間, idle time, off-time[|🔝|](#link)
- 컴퓨터 시스템이 사용 가능한 상태이나 실제적인 작업이 없는 시간. 계산 처리 시간과 데이터 입출력 처리 시간의 차이 등으로 컴퓨터의 어느 한쪽이 대기 상태에 있는 경우이다.
  - https://terms.tta.or.kr/dictionary/dictionaryView.do?subject=%EC%9C%A0%ED%9C%B4+%EC%8B%9C%EA%B0%84

- [Concurrency (computer science) Wiki](https://en.wikipedia.org/wiki/Concurrency_(computer_science))

# `ps`로 현재 프로세스가 돌아가는거 확인하기[|🔝|](#link)

```bash
$ ps
  PID TTY           TIME CMD
 1530 ttys000    0:00.05 -fish
```

# `thread` 확인은 top[|🔝|](#link)

```bash
$ top
```

- C언어로 만든 htop
  - https://github.com/htop-dev/htop

- Rust 언어로 만든
  - https://github.com/nix-rs/rtop

- Go로 만든 gtop
  -  https://github.com/aksakalli/gtop

# Go개발자가 정리한 (Goroutines)[|🔝|](#link)
- Goroutines vs Threads
  - https://tech.ssut.me/goroutine-vs-threads/

# MS-Dos는 싱글 쓰레드 OS[|🔝|](#link)
- Win부터 Parallelism 이 가능한 OS 시작
  - [MS-DOS기반을 버리고 Windows XP 시작 (August 24, 2001)| Wiki](https://en.wikipedia.org/wiki/Windows_XP) 
- [MS-DOS | Wiki](https://en.wikipedia.org/wiki/MS-DOS)
  - [전공생이 설명하는 OS / 쓰레드(Thread)와 동기화 문제220428한국사람이 잘 정리함 | 척척석사:티스토리](https://letsmakemyselfprogrammer.tistory.com/94)

- [Microsoft Windows | Wiki](https://en.wikipedia.org/wiki/Microsoft_Windows)
  - [Window9x 는 MS-Dos 기반이라 싱글쓰레드 OS](https://en.wikipedia.org/wiki/Microsoft_Windows)
    - (The next major consumer-oriented release of Windows, Windows 95, was released on August 24, 1995. While still remaining MS-DOS-based, Windows 95 introduced support for native 32-bit applications, plug and play hardware, preemptive multitasking, long file names of up to 255 characters, and provided increased stability over its predecessors.)
    - (윈도우 me가 마지막 MS-Dos)On September 14, 2000, Microsoft released Windows Me (Millennium Edition), the last DOS-based version of Windows.

# parallelism Rust 코드로 이해하기[|🔝|](#link)

- (sleep 실패한 이유 알아보기)쓰레드 아이디를 보며 parallelism이해하기

```rs
fn get_proc() {
    println!("{:?}", std::thread::current().id());
    println!("{}", std::process::id());
    std::thread::sleep(std::time::Duration::from_secs(1));
}

fn main() {
    let thread1 = std::thread::spawn(|| {
        get_proc();
    });
    let thread2 = std::thread::spawn(|| {
        get_proc();
    });
    get_proc();
    thread1.join().unwrap();
    thread2.join().unwrap();
}
```

- (sleep성공한 코드)

```rs
fn get_proc() {
    println!("{:?}", std::thread::current().id());
    println!("{}", std::process::id());
}

fn main() {
    let thread1 = std::thread::spawn(|| {
        get_proc();
    });
    std::thread::sleep(std::time::Duration::from_secs(1));

    let thread2 = std::thread::spawn(|| {
        get_proc();
    });
    std::thread::sleep(std::time::Duration::from_secs(1));

    get_proc();
    thread1.join().unwrap();
    thread2.join().unwrap();
}

```

- parallelism설명 예시


```rs
use std::thread;
use std::time::Duration;


fn fibonacci_sequence(n: usize) -> Vec<u32> {
    let mut sequence = vec![0, 1];
    if n > 1 {
        for _ in 2..(n + 1) {
            let next = sequence[sequence.len() - 1] + sequence[sequence.len() - 2];
            sequence.push(next);
        }
    }
    sequence
}

fn main() {
    let num_threads = 4;
    let mut handles = Vec::new();

    for i in 0..num_threads {
        let handle = thread::spawn(move || {
            println!("Thread {} started.", i);
            let fibonacci = fibonacci_sequence(i * 10);
            println!(
                "Thread {} computed Fibonacci sequence of length {}",
                i,
                fibonacci.len()
            );
            println!("Thread {}: Fibonacci sequence: {:?}", i, fibonacci);
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }
}
```

# Below is a clear, systems-level explanation of Concurrency vs Parallelism, with:[|🔝|](#link)

- ✅ A comparison table
- ✅ Timeline diagrams (visual intuition)
- ✅ Rust code examples for each
- ✅ When to use which
  - I’ll keep this precise and Rust-centric.

# 1️⃣  Definitions (short and accurate)[|🔝|](#link)

- 🔁 Concurrency

> Structuring a program to handle multiple tasks in overlapping time, even if only one runs at a time.

- About dealing with many things
- Can run on one thread
- Uses interleaving

- ⚡ Parallelism

> Executing multiple tasks at the same time on multiple CPU cores.

- About doing many things at once
- Requires multiple threads / cores
- Uses simultaneous execution

<hr />

- 🔁 동시성

> 한 번에 하나만 실행되더라도 여러 작업을 겹치는 시간에 처리할 수 있도록 프로그램을 구성합니다.

- 많은 일을 처리하는 것에 대하여
- 하나의 스레드에서 실행 가능
- 인터리빙 사용

- ⚡ 병렬 처리

> 여러 CPU 코어에서 여러 작업을 동시에 실행하기.

- 한 번에 여러 가지 일을 하는 것에 대해
- 여러 스레드/코어가 필요합니다
- 동시 실행 사용

# 2️⃣  Core differences (table)[|🔝|](#link)

| Aspect             | Concurrency                  | Parallelism             |
| ------------------ | ---------------------------- | ----------------------- |
| Goal               | Responsiveness, structure    | Performance, speed      |
| Runs at same time? | ❌ Not necessarily            | ✅ Yes                   |
| CPU cores          | 1 or more                    | 2+ required             |
| Threads            | Optional                     | Required                |
| Focus              | Task coordination            | Work distribution       |
| Typical tools      | async/await, mutex, channels | threads, rayon, atomics |
| Example            | Async server                 | Parallel computation    |


# 3️⃣  Timeline visualization (key intuition)[|🔝|](#link)

## 🧵 Concurrency on one core

```txt
Time →
Task A: ███░░░░░██░░░
Task B: ░░░███░░░░███
CPU   : █████████████
```

- Only one task runs at a time
- Tasks take turns
- Appears simultaneous, but isn’t

## 🧵🧵 Parallelism on multiple cores

```txt
Time →
Core 1: █████████
Core 2: █████████
Task A: █████
Task B: █████
```

- asks actually run at the same time
- True parallel execution

## 🔁 Concurrency + ⚡ Parallelism (real systems)

```txt
Core 1: Task A ─ Task C
Core 2: Task B ─ Task D
```

- Most real systems use both.

# 4️⃣  Concurrency example (Rust, single thread)[|🔝|](#link)

- Example: Cooperative concurrency with async

```rs
use std::time::Duration;

async fn task_a() {
    for i in 0..3 {
        println!("A {i}");
        tokio::time::sleep(Duration::from_millis(100)).await;
    }
}

async fn task_b() {
    for i in 0..3 {
        println!("B {i}");
        tokio::time::sleep(Duration::from_millis(100)).await;
    }
}

#[tokio::main(flavor = "current_thread")]
async fn main() {
    tokio::join!(task_a(), task_b());
}
```

- What’s happening
  - One OS thread
  - Tasks yield at `.await`
  - Scheduler interleaves execution
  - This is concurrency, not parallelism

# 5️⃣  Parallelism example (Rust threads)[|🔝|](#link)

```rs

use std::thread;

fn main() {
    let t1 = thread::spawn(|| {
        for i in 0..5 {
            println!("Thread A {i}");
        }
    });

    let t2 = thread::spawn(|| {
        for i in 0..5 {
            println!("Thread B {i}");
        }
    });

    t1.join().unwrap();
    t2.join().unwrap();
}
```

- What’s happening
  - Two OS threads
  - Can run on different CPU cores
  - True parallel execution

# 6️⃣  Parallel data processing (idiomatic Rust)[|🔝|](#link)

```rs
use rayon::prelude::*;

fn main() {
    let v: Vec<i64> = (1..=1_000_000).collect();

    let sum: i64 = v.par_iter().map(|x| *x * 2).sum();

    println!("{sum}");
}
```

- Work is split across threads
- Data-parallel
- This is pure parallelism

# 7️⃣  Concurrency without parallelism (Mutex example)[|🔝|](#link)

```rs
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));

    let handles: Vec<_> = (0..3).map(|_| {
        let counter = Arc::clone(&counter);
        thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        })
    }).collect();

    for h in handles {
        h.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

- Multiple threads
- Only one enters the critical section at a time
- Concurrency without effective parallelism inside the lock

# 8️⃣  When to use which[|🔝|](#link)
- Use Concurrency when:
  - Many I/O tasks
  - Waiting on network / disk
  - UI responsiveness
  - Async servers

- Use Parallelism when:
  - CPU-bound work
  - Large computations
  - Data processing
  - Image/video processing

# 9️⃣  Common misconception (important)[|🔝|](#link)

- 일반적인 오해 (중요

- ❌ Concurrency ≠ Parallelism

- You can have:
  - Concurrency without parallelism (async on one thread)
  - Parallelism without much concurrency (batch computation)
  - Both together (most real systems)
- 가질 수 있습니다:
  - 병렬 처리가 없는 동시성(하나의 스레드에서 비동기화)
  - 동시성이 크지 않은 병렬 처리(배치 계산)
  - 둘 다 함께 (대부분의 실제 시스템)

# 🔟 One-sentence summary[|🔝|](#link)

-  Concurrency is about structuring programs to manage multiple tasks, while parallelism is about executing multiple tasks at the same time — Rust gives you first-class tools for both, and they often work best together.

- 🔟 한 문장 요약
  - 동시성은 여러 작업을 관리하기 위해 프로그램을 구조화하는 것이고, 병렬성은 여러 작업을 동시에 실행하는 것입니다. Rust는 두 작업 모두에 대해 최고 수준의 도구를 제공하며, 종종 함께 작동합니다.


