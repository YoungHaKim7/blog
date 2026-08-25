---
title: tokio-rs_tracing
published: 2025-12-25
description: 'Application-level tracing for Rust.(tokio-rs) '
image: ''
tags: [analyze, debugging, profiling, tracing]
category: 'rust_Debugging_profiling'
draft: false 
lang: ''
---

# link

- https://crates.io/crates/tracing

- https://docs.rs/tracing/0.1.44/tracing/

- https://github.com/tokio-rs/tracing

# tracing

- Application-level tracing for Rust. 

## Overview

- tracing is a framework for instrumenting Rust programs to collect structured, event-based diagnostic information.

- In asynchronous systems like Tokio, interpreting traditional log messages can often be quite challenging. Since individual tasks are multiplexed on the same thread, associated events and log lines are intermixed making it difficult to trace the logic flow. tracing expands upon logging-style diagnostics by allowing libraries and applications to record structured events with additional information about temporality and causality — unlike a log message, a span in tracing has a beginning and end time, may be entered and exited by the flow of execution, and may exist within a nested tree of similar spans. In addition, tracing spans are structured, with the ability to record typed data as well as textual messages.

- The tracing crate provides the APIs necessary for instrumenting libraries and applications to emit trace data.




```toml
[dependencies]
tracing = "0.1"
tracing-subscriber = "0.3"
```

```rust
use tracing::info;
use tracing_subscriber;

fn main() {
    // install global subscriber configured based on RUST_LOG envvar.
    tracing_subscriber::fmt::init();

    let number_of_yaks = 3;
    // this creates a new event, outside of any spans.
    info!(number_of_yaks, "preparing to shave yaks");

    let number_shaved = yak_shave::shave_all(number_of_yaks);
    info!(
        all_yaks_shaved = number_shaved == number_of_yaks,
        "yak shaving completed."
    );
}
```
