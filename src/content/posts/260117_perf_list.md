---
title: 260117_perf_list
published: 2026-01-17
description: ''
image: ''
tags: [rust, perf, optimization]
category: 'optimization'
draft: false 
lang: ''
---

# link
- [Optimization adventures: making a parallel Rust workload 10x faster with (or without) Rayon rust perf NOVEMBER 18, 2024 by GUILLAUME ENDIGNOUX](https://gendignoux.com/blog/2024/11/18/rust-rayon-optimized.html)

<hr />

# perf-list
- https://man7.org/linux/man-pages/man1/perf-list.1.html

```bash
perf list
```

# linuxOS Install(perf 사용가능)

- https://askubuntu.com/questions/1553558/cannot-call-perf-on-ubntu-24-04

```bash
sudo apt-get update && sudo apt-get install linux-tools-generic
# or if that fails, use:
sudo apt-get install linux-perf
```

- export 설정

```bash
sudo apt install linux-tools-generic
...

export perf=/usr/lib/linux-tools/6.8.0-87-generic/perf
$perf stat <your_binary>
```

```
  branch-instructions OR cpu_atom/branch-instructions/[Kernel PMU event]
  branch-misses OR cpu_atom/branch-misses/           [Kernel PMU event]
  bus-cycles OR cpu_atom/bus-cycles/                 [Kernel PMU event]
  cache-misses OR cpu_atom/cache-misses/             [Kernel PMU event]
  cache-references OR cpu_atom/cache-references/     [Kernel PMU event]
  cpu-cycles OR cpu_atom/cpu-cycles/                 [Kernel PMU event]
  instructions OR cpu_atom/instructions/             [Kernel PMU event]
  mem-loads OR cpu_atom/mem-loads/                   [Kernel PMU event]
  mem-stores OR cpu_atom/mem-stores/                 [Kernel PMU event]
  ref-cycles OR cpu_atom/ref-cycles/                 [Kernel PMU event]
  topdown-bad-spec OR cpu_atom/topdown-bad-spec/     [Kernel PMU event]
  topdown-be-bound OR cpu_atom/topdown-be-bound/     [Kernel PMU event]
  topdown-fe-bound OR cpu_atom/topdown-fe-bound/     [Kernel PMU event]
  topdown-retiring OR cpu_atom/topdown-retiring/     [Kernel PMU event]
  branch-instructions OR cpu_core/branch-instructions/[Kernel PMU event]
  branch-misses OR cpu_core/branch-misses/           [Kernel PMU event]
  bus-cycles OR cpu_core/bus-cycles/                 [Kernel PMU event]
  cache-misses OR cpu_core/cache-misses/             [Kernel PMU event]
  cache-references OR cpu_core/cache-references/     [Kernel PMU event]
  cpu-cycles OR cpu_core/cpu-cycles/                 [Kernel PMU event]
  instructions OR cpu_core/instructions/             [Kernel PMU event]
  mem-loads OR cpu_core/mem-loads/                   [Kernel PMU event]
  mem-loads-aux OR cpu_core/mem-loads-aux/           [Kernel PMU event]
  mem-stores OR cpu_core/mem-stores/                 [Kernel PMU event]
  ref-cycles OR cpu_core/ref-cycles/                 [Kernel PMU event]
  slots OR cpu_core/slots/                           [Kernel PMU event]
  topdown-bad-spec OR cpu_core/topdown-bad-spec/     [Kernel PMU event]
  topdown-be-bound OR cpu_core/topdown-be-bound/     [Kernel PMU event]
  topdown-br-mispredict OR cpu_core/topdown-br-mispredict/[Kernel PMU event]
  topdown-fe-bound OR cpu_core/topdown-fe-bound/     [Kernel PMU event]
  topdown-fetch-lat OR cpu_core/topdown-fetch-lat/   [Kernel PMU event]
  topdown-heavy-ops OR cpu_core/topdown-heavy-ops/   [Kernel PMU event]
  topdown-mem-bound OR cpu_core/topdown-mem-bound/   [Kernel PMU event]
  topdown-retiring OR cpu_core/topdown-retiring/     [Kernel PMU event]
  cstate_core/c1-residency/                          [Kernel PMU event]
  cstate_core/c6-residency/                          [Kernel PMU event]
  cstate_core/c7-residency/                          [Kernel PMU event]
  cstate_pkg/c10-residency/                          [Kernel PMU event]
  cstate_pkg/c2-residency/                           [Kernel PMU event]
  cstate_pkg/c3-residency/                           [Kernel PMU event]
  cstate_pkg/c6-residency/                           [Kernel PMU event]
  cstate_pkg/c8-residency/                           [Kernel PMU event]
  i915/actual-frequency/                             [Kernel PMU event]
  i915/bcs0-busy/                                    [Kernel PMU event]
  i915/bcs0-sema/                                    [Kernel PMU event]
  i915/bcs0-wait/                                    [Kernel PMU event]
  i915/interrupts/                                   [Kernel PMU event]
  i915/rc6-residency/                                [Kernel PMU event]
  i915/rcs0-busy/                                    [Kernel PMU event]
  i915/rcs0-sema/                                    [Kernel PMU event]
  i915/rcs0-wait/                                    [Kernel PMU event]
  i915/requested-frequency/                          [Kernel PMU event]
  i915/software-gt-awake-time/                       [Kernel PMU event]
  i915/vcs0-busy/                                    [Kernel PMU event]
  i915/vcs0-sema/                                    [Kernel PMU event]
  i915/vcs0-wait/                                    [Kernel PMU event]
  i915/vcs1-busy/                                    [Kernel PMU event]
  i915/vcs1-sema/                                    [Kernel PMU event]
  i915/vcs1-wait/                                    [Kernel PMU event]
  i915/vecs0-busy/                                   [Kernel PMU event]
  i915/vecs0-sema/                                   [Kernel PMU event]
  i915/vecs0-wait/                                   [Kernel PMU event]
  intel_bts//                                        [Kernel PMU event]
  intel_pt//                                         [Kernel PMU event]
  msr/aperf/                                         [Kernel PMU event]
  msr/cpu_thermal_margin/                            [Kernel PMU event]
  msr/mperf/                                         [Kernel PMU event]
  msr/pperf/                                         [Kernel PMU event]
  msr/smi/                                           [Kernel PMU event]
  msr/tsc/                                           [Kernel PMU event]
  power/energy-cores/                                [Kernel PMU event]
  power/energy-gpu/                                  [Kernel PMU event]
  power/energy-pkg/                                  [Kernel PMU event]
  uncore_clock/clockticks/                           [Kernel PMU event]
  uncore_imc_free_running/data_read/                 [Kernel PMU event]
  uncore_imc_free_running/data_total/                [Kernel PMU event]
  uncore_imc_free_running/data_write/                [Kernel PMU event]

  ..
  ..
  밑에 겁나게 많다. 대충 5천줄...
  ..
```

