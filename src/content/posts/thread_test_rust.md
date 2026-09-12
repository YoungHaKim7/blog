---
title: thread_test_rust
published: 2026-09-12
description: 'cargo test thread test'
image: ''
tags: [profiling, thread, strace, perf]
category: 'rust_Debugging_profiling'
draft: false 
lang: ''
---

# `cargo test -- --test-threads=1`   

```bash
cargo test -- --test-threads=1
```

means:

> **Build and run all Rust tests in the current Cargo package, but execute only one test at a time.**

Let's break it down.

### 1. `cargo test`

```bash
cargo test
```

Cargo finds the tests in your project and runs them.

For example, if your project contains:

```text
ffmpeg_rs/
├── src/
│   ├── lib.rs
│   ├── codec/
│   │   ├── pcm.rs
│   │   ├── h264.rs
│   │   └── ...
│   └── ...
└── tests/
    ├── decoder.rs
    └── encoder.rs
```

then:

```bash
cargo test
```

does **not mean "test the file I'm currently editing."**

It generally builds the test targets and runs the tests discovered in the package.

---

### 2. Why the second `--`?

The command has:

```bash
cargo test -- --test-threads=1
          ↑
```

The first `--` separates **Cargo arguments** from **test-harness arguments**.

Think of it as:

```text
cargo test
    │
    ├── arguments before `--`
    │       → Cargo
    │
    └── arguments after `--`
            → Rust test executable
```

So:

```bash
cargo test -- --test-threads=1
```

means:

```text
Cargo:
    "Build and run the tests."

Test harness:
    "Run with only one test thread."
```

---

### 3. `--test-threads=1`

Normally:

```bash
cargo test
```

allows multiple tests to execute concurrently.

For example:

```text
CPU
 │
 ├── test A
 ├── test B
 ├── test C
 ├── test D
 └── test E
```

With:

```bash
cargo test -- --test-threads=1
```

you get:

```text
CPU
 │
 └── test A
       ↓
     finish
       ↓
     test B
       ↓
     finish
       ↓
     test C
       ↓
     finish
```

So it is useful when debugging tests that interfere with one another or when investigating unexpectedly high CPU usage.

---

## 4. In your `ffmpeg_rs` project

When you ran:

```bash
cargo test -- --test-threads=1
```

you were **not testing only `pcm.rs`**.

You were telling Cargo to run the test suite for the package, with the test harness restricted to one test at a time.

That's an important distinction.

If you have:

```text
src/codec/pcm.rs
src/codec/aac.rs
src/codec/h264.rs
src/format/muxer.rs
...
```

and they contain `#[test]` functions, those tests can all be included.

Your uploaded `pcm.rs` itself contains many `#[test]` functions, but `cargo test` is not limited to that file. 

---

## 5. How to see exactly what is being tested

Use:

```bash
cargo test -- --list
```

This **doesn't run the tests**. It lists them.

You'll get something similar to:

```text
codec::pcm::tests::decoder_s16le: test
codec::pcm::tests::decoder_s24le: test
codec::pcm::tests::encoder_s16le: test
codec::pcm::tests::round_trip: test
...
```

Then you can run a specific test:

```bash
cargo test decoder_s16le
```

or:

```bash
cargo test round_trip
```

---

## 6. If you specifically want to test `pcm.rs`

Rust's normal unit-test model doesn't work like:

```bash
cargo test pcm.rs
```

Instead, you normally filter by the **test name/module path**.

For example:

```bash
cargo test pcm
```

will run tests whose names match `pcm`.

You can combine that with single-threaded execution:

```bash
cargo test pcm -- --test-threads=1
```

And if you want to see output:

```bash
cargo test pcm -- --test-threads=1 --nocapture
```

So for your CPU investigation, I'd start with:

```bash
cargo test pcm -- --test-threads=1 --nocapture
```

Then, if that still consumes 100% CPU, we know the problem is much more specifically associated with the PCM tests rather than another test elsewhere in `ffmpeg_rs`.


# test 2

- This output is very useful. We can now narrow the problem down substantially.

## 1. The process tree is completely normal

You have:

```text
systemd
 └─ ghostty
     └─ fish
         └─ cargo test -- --test-threads=1
             └─ ffmpeg_rs-92bbeda044d74837 --test-threads=1
                 └─ {ffmpeg_rs-92bbe}
```

Specifically:

```text
PID 6540 = cargo
PID 6551 = Rust test executable
PID 6720 = thread inside Rust test executable
```

So:

```text
cargo
  │
  └── test executable
        │
        └── test thread 6720
```

There is **no mysterious orphaned process** here.

---

## 2. The important clue is PID 6720

Your earlier output showed:

```text
6551  6540  99.9%  ... ffmpeg_rs-... --test-threads=1
```

And `pstree` shows:

```text
└─{ffmpeg_rs-92bbe},6720
```

That means the test executable has a thread with PID/TID:

```text
6720
```

This is very likely the thread actually consuming the CPU.

`--test-threads=1` means the Rust **test harness** is configured to execute one test at a time. It does **not** mean the entire process can only have one OS thread. Libraries/runtime code can still create additional threads.

In your case, however, the process tree only shows one additional thread, so we should inspect it directly.

---

# 3. Check CPU per thread

Run:

```bash
ps -L -p 6551 -o pid,tid,psr,%cpu,stat,etime,comm
```

You should get something like:

```text
    PID     TID PSR %CPU STAT     ELAPSED COMMAND
   6551    6551   3  0.0 Sl         01:30 ffmpeg_rs-92bbe
   6551    6720   7 99.9 R          01:30 ffmpeg_rs-92bbe
```

The interesting part would be:

```text
TID 6720
CPU 99.9%
STAT R
```

`R` means **running**.

That would establish:

```text
ffmpeg_rs process
       │
       └── TID 6720
              │
              └── 100% CPU
```

---

# 4. This is now looking like a CPU-bound loop

The fact that:

```text
ELAPSED = 01:20
CPU     = 99.9%
```

is significant.

The process has been alive for ~80 seconds and has accumulated roughly:

```text
CPU time ≈ 80 seconds
```

for one core.

This is very different from a process simply waiting for I/O.

For example, if it were waiting on a file/socket:

```text
CPU: 0%
state: S
```

would be more typical.

Instead:

```text
CPU: ~100%
```

suggests the thread is actively executing instructions.

---

# 5. Now find the exact function

This is the most important next step.

Run:

```bash
sudo perf top -p 6551
```

Let it run for around 5–10 seconds.

You want the top entries.

For example, if you see:

```text
  85.0%  ffmpeg_rs    ffmpeg_rs::codec::pcm::receive_frame
   8.0%  ffmpeg_rs    ffmpeg_rs::codec::pcm::send_packet
   2.0%  ffmpeg_rs    ...
```

then we know the PCM implementation is actually responsible.

But if you see:

```text
  90%  ffmpeg_rs    some_other_function
```

then we know the PCM code isn't the culprit.

---

# 6. An even more targeted command

Because this is your debug test executable, try:

```bash
sudo perf record -g -p 6551 -- sleep 5
```

Then:

```bash
sudo perf report
```

The `-g` records the call graph.

You might get something like:

```text
Children      Self  Command     Shared Object        Symbol
--------------------------------------------------------------
  99.8%      99.8% ffmpeg_rs    ffmpeg_rs            pcm::...
   99.8%      ...  ffmpeg_rs    ffmpeg_rs            test_...
```

The call stack is what we really want.

---

# 7. You can also inspect the thread with GDB

Attach to the process:

```bash
gdb -p 6551
```

Then:

```gdb
info threads
```

You may see:

```text
  Id   Target Id             Frame
* 1    Thread ... (LWP 6551) ...
  2    Thread ... (LWP 6720) ...
```

Switch to the suspicious thread:

```gdb
thread 2
```

Then:

```gdb
bt
```

Or, even better:

```gdb
thread apply all bt
```

That should show exactly what Rust is doing.

---

# 8. There's one especially important possibility in your project

Your process is:

```text
ffmpeg_rs-92bbeda044d74837
```

Notice that this is the **test binary for the entire crate**.

It is not necessarily testing only:

```text
pcm.rs
```

When you run:

```bash
cargo test -- --test-threads=1
```

Cargo builds the crate's complete test executable and runs **all unit tests** in that executable.

So even though you were investigating `pcm.rs`, the CPU-intensive test could be somewhere else in your FFmpeg Rust port.

The process name:

```text
ffmpeg_rs-92bbeda044d74837
```

doesn't tell us which test is running.

---

# 9. Find the test that is currently running

Run:

```bash
cargo test -- --test-threads=1 --nocapture
```

If your tests print nothing, add temporary prints around suspicious tests:

```rust
#[test]
fn some_test() {
    eprintln!("START some_test");

    // test code

    eprintln!("END some_test");
}
```

Then you'll see:

```text
START test_a
ok

START test_b
```

If you get:

```text
START test_b
```

and then CPU goes to 100% forever:

```text
START test_b
        ↓
      100% CPU
        ↓
      never returns
```

you have identified the test.

---

# 10. One thing I would NOT blame now

I would **not** blame:

```bash
--test-threads=1
```

anymore.

That option was a good diagnostic, and your result is actually useful.

You have demonstrated:

```text
Multiple test threads?
        │
        └── No

CPU still ~100%?
        │
        └── Yes
```

Therefore the problem is likely:

```text
single test
    ↓
calls some function
    ↓
function becomes CPU-bound
    ↓
doesn't terminate
```

or:

```text
single test
    ↓
calls library code
    ↓
library creates/uses a worker thread
    ↓
worker consumes CPU
```

---

## 11. I would run these three commands next

### A. Identify the CPU-consuming thread

```bash
ps -L -p 6551 -o pid,tid,psr,%cpu,stat,etime,comm
```

### B. Identify the function

```bash
sudo perf top -p 6551
```

### C. Identify the call stack

```bash
sudo gdb -p 6551
```

then:

```gdb
thread apply all bt
```

---

### My current diagnosis

The evidence now looks like this:

```text
                    CPU
                     │
                     ▼
                 cargo 6540
                     │
                     │
                     ▼
        ffmpeg_rs test process 6551
                     │
                     │
                     ▼
             thread/TID 6720
                     │
                     │
                  ~100%
                     │
                     ▼
             CPU-bound code
```

So **we've ruled out an orphaned Cargo process and ordinary test parallelism**.

The next piece of evidence we need is the **symbol/call stack for TID 6720**. `perf top -p 6551` is the quickest. If you paste that output, I can tell you which part of your FFmpeg Rust code is actually causing the 100% CPU usage.


# `ps` & `pstree`

- Yes — this output makes the situation much clearer.

### The important line

```text
PID    PPID  %CPU  %MEM  ELAPSED  CMD
6551   6540  99.9   7.2  01:20    .../target/debug/deps/ffmpeg_rs-92bbeda044d74837 --test-threads=1
```

Your **Rust test executable itself is consuming essentially one full CPU core**:

```text
CPU = 99.9%
Memory = 7.2%
Runtime = 1 minute 20 seconds
```

So the problem is **not Firefox, GNOME, or the terminal**. It is definitely this process:

```text
ffmpeg_rs-92bbeda044d74837
```

And because you ran:

```bash
--test-threads=1
```

this is **not caused by multiple Rust test threads running simultaneously**.

---

## 1. The process hierarchy is important

You have:

```text
6551  6540  99.9%  ffmpeg_rs-... --test-threads=1
```

So PID `6540` is the parent of the test executable.

Run:

```bash
ps -fp 6540
```

and:

```bash
pstree -aps 6551
```

I expect you'll see something similar to:

```text
cargo
  └── ffmpeg_rs-92bbeda044d74837
        └── test thread
```

The critical question now is:

> **Why is this particular test binary still running for 1+ minutes?**

Your `pcm.rs` tests should not normally take anywhere near that long.

---

# 2. This is probably not normal PCM processing

From the PCM file you uploaded, the actual decoder/encoder operations contain finite loops.

For example, the decoder's byte-swapping path processes the packet and terminates, and the 24-bit conversion path also iterates over a finite packet size. 

Likewise, the encoder has finite loops for byte swapping and 24-bit conversion. 

The tests themselves also use bounded collections/loops. For example, the lookup test iterates over a fixed `expect` collection. 

And the round-trip test iterates over a fixed set of cases. 

I don't see an obvious:

```rust
loop {
    ...
}
```

or:

```rust
while condition {
    // condition never changes
}
```

in this file.

So **99.9% CPU for 80 seconds strongly suggests that the test executable is stuck somewhere else**, or one of the tests is exercising code outside the PCM implementation.

---

# 3. First: find exactly which test is stuck

Run:

```bash
cargo test -- --test-threads=1 --nocapture
```

The important difference is:

```text
--nocapture
```

Normally Rust captures test output.

With:

```bash
--nocapture
```

you'll see output from the tests directly.

Even better, list the tests first:

```bash
cargo test -- --list
```

You should get something like:

```text
test_pcm_decode_s16le: test
test_pcm_decode_s24be: test
test_pcm_encode_s16le: test
...
```

Then run individual tests:

```bash
cargo test test_pcm_decode_s16le -- --nocapture
```

If that finishes immediately:

```bash
cargo test test_pcm_decode_s24be -- --nocapture
```

etc.

This lets us find the exact test that causes the CPU spike.

---

# 4. Even better: attach `strace`

Since you're on Linux, this is probably the most useful next diagnostic.

First stop the current process:

```bash
kill 6551
```

Then run:

```bash
strace -f -p 6551
```

**But only if PID 6551 is still alive.**

If it is already gone, start the test again:

```bash
cargo test -- --test-threads=1
```

Find the PID:

```bash
pgrep -af ffmpeg_rs
```

Then:

```bash
strace -f -p <PID>
```

If it is actually stuck in a userspace CPU loop, you may see very few/no system calls.

For example:

```text
strace: Process 6551 attached
```

and then essentially nothing.

That would be a strong indication of:

```text
Rust code
   ↓
tight userspace loop
   ↓
100% CPU
   ↓
no syscalls
```

---

# 5. `perf` is even better for this particular problem

Because you're investigating **why Rust code consumes 100% CPU**, I'd recommend `perf`.

Run:

```bash
sudo perf top -p 6551
```

You'll see something similar to:

```text
Samples: ...
Overhead  Symbol

  80.2%   some_function
  12.4%   another_function
   4.1%   ...
```

This is extremely valuable.

If you see something like:

```text
ffmpeg_rs::codec::pcm::...
```

then we've found the problem.

If instead you see:

```text
std::thread::park
```

or:

```text
futex
```

then it's a synchronization issue.

If you see:

```text
regex
alloc
hashbrown
...
```

then the CPU is being consumed somewhere else.

---

# 6. You can also get the backtrace of the running process

Try:

```bash
sudo gdb -p 6551
```

Then inside GDB:

```gdb
thread apply all bt
```

This is particularly useful because it tells us exactly where the thread is executing.

For example:

```text
Thread 1:
#0  pcm_decode(...)
#1  receive_frame(...)
#2  ...
#3  ...
```

Then we know immediately where to investigate.

Exit:

```gdb
quit
```

---

# 7. One interesting clue: 7.2% memory

This part:

```text
%MEM
7.2
```

is somewhat interesting.

Your test process is using significantly more memory than the other processes shown.

However, `%MEM` is **system-wide percentage**, not "7.2% of the Rust program's allocation."

Get the actual memory size:

```bash
ps -p 6551 -o pid,%cpu,%mem,rss,vsz,etime,cmd
```

For example:

```text
PID   %CPU %MEM    RSS     VSZ     ELAPSED CMD
6551  99.9  7.2  123456  456789  00:01:20 ...
```

The important values are:

* `RSS` — actual resident physical memory
* `VSZ` — virtual address space
* `%CPU` — CPU consumption

If `RSS` is continuously increasing, that's another important clue.

---

# 8. Check whether memory is growing

Run:

```bash
watch -n 1 'ps -p 6551 -o pid,%cpu,%mem,rss,vsz,etime,cmd'
```

You might see:

```text
PID   %CPU  %MEM    RSS     VSZ
6551  99.9   7.2  500000  800000
6551  99.9   7.3  510000  810000
6551  99.9   7.4  520000  820000
6551  99.9   7.5  530000  830000
```

If RSS continuously increases:

```text
500 MB
510 MB
520 MB
530 MB
...
```

then we're potentially looking at a **memory allocation loop / runaway test**.

If memory remains stable:

```text
500 MB
500 MB
501 MB
500 MB
```

then it's more likely a **CPU-bound loop**.

---

# 9. Important: `--test-threads=1` proves something

You originally suspected the Rust test runner might be spawning many tests.

But your new output is:

```text
ffmpeg_rs-... --test-threads=1
```

and:

```text
99.9% CPU
```

Therefore:

```text
cargo test
    │
    └── test binary
            │
            └── ONE test thread
                    │
                    └── ~100% CPU
```

So we can eliminate the simple explanation:

> "Rust is running dozens of tests simultaneously."

That's not what's happening.

---

# 10. The most useful command now

I'd like you to run this while PID `6551` is consuming 100% CPU:

```bash
sudo perf top -p 6551
```

Give it about **5–10 seconds**, then copy the top ~20 lines here.

Also run:

```bash
ps -p 6551 -o pid,ppid,%cpu,%mem,rss,vsz,etime,cmd
```

And:

```bash
pstree -aps 6551
```

Those three outputs should let us narrow this down considerably.

### Current diagnosis

```text
Firefox              ~16%
Rust test executable ~100%  ← PROBLEM
GNOME Shell           ~8%
everything else       low
```

So we've now confirmed that **the 100% CPU is coming from the `ffmpeg_rs` test binary itself**, not from the desktop environment.

The next step is to determine **which function/test inside that binary is burning the CPU**. `perf top -p 6551` is probably the fastest way to find it.

