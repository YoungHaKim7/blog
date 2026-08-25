---
title: profilers_rust
published: 2026-08-25
description: 'There are many different profilers available, each with their strengths and weaknesses. The following is an incomplete list of profilers that have been used successfully on Rust programs.'
image: ''
tags: [analyze, debugging, profiling]
category: 'rust_Debugging_profiling'
draft: false 
lang: ''
---

# link

- https://nnethercote.github.io/perf-book/profiling.html

# 종류

- [perf](https://perf.wiki.kernel.org/index.php/Main_Page) is a general-purpose profiler that uses hardware performance counters. [Hotspot](https://github.com/KDAB/hotspot) and [Firefox Profiler](https://profiler.firefox.com/) are good for viewing data recorded by perf. It works on Linux.
- [Instruments](https://developer.apple.com/forums/tags/instruments) is a general-purpose profiler that comes with Xcode on macOS.
- [Intel VTune Profiler](https://www.intel.com/content/www/us/en/developer/tools/oneapi/vtune-profiler.html) is a general-purpose profiler. It works on Windows, Linux, and macOS.
- [AMD μProf](https://developer.amd.com/amd-uprof/) is a general-purpose profiler. It works on Windows and Linux.
- [samply](https://github.com/mstange/samply/) is a sampling profiler that produces profiles that can be viewed in the Firefox Profiler. It works on Mac, Linux, and Windows.
- [flamegraph](https://github.com/flamegraph-rs/flamegraph) is a Cargo command that uses perf/DTrace to profile your code and then displays the results in a flame graph. It works on Linux and all platforms that support DTrace (macOS, FreeBSD, NetBSD, and possibly Windows).
- [Cachegrind](https://www.valgrind.org/docs/manual/cg-manual.html) & [Callgrind](https://www.valgrind.org/docs/manual/cl-manual.html) give global, per-function, and per-source-line instruction counts and simulated cache and branch prediction data. They work on Linux and some other Unixes.
- [DHAT](https://www.valgrind.org/docs/manual/dh-manual.html) is good for finding which parts of the code are causing a lot of allocations, and for giving insight into peak memory usage. It can also be used to identify hot calls to memcpy. It works on Linux and some other Unixes. [dhat-rs](https://github.com/nnethercote/dhat-rs/) is an experimental alternative that is a little less powerful and requires minor changes to your Rust program, but works on all platforms.
- [heaptrack](https://github.com/KDE/heaptrack) and [bytehound](https://github.com/koute/bytehound) are heap profiling tools. They work on Linux.
- [counts](https://github.com/nnethercote/counts/) supports ad hoc profiling, which combines the use of eprintln! statement with frequency-based post-processing, which is good for getting domain-specific insights into parts of your code. It works on all platforms.
- [Coz](https://github.com/plasma-umass/coz) performs causal profiling to measure optimization potential, and has Rust support via [coz-rs](https://github.com/plasma-umass/coz/tree/master/rust). It works on Linux.
