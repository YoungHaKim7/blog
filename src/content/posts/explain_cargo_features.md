---
title: explain_cargo_features
published: 2026-02-03
description: 'Understanding Cargo Features in windows-rs'
image: ''
tags: [rust, toml, features]
category: 'rust_TOML'
draft: false 
lang: ''
---

# Understanding Cargo Features in `windows-rs`

The most important thing to understand is this:

Cargo features are a mechanism for conditionally enabling functionality in a Rust crate.

In the `windows` crate, features determine which Windows API modules, types, functions, interfaces, and dependencies are compiled into your application.

For example:

```toml
[dependencies]
windows = { version = "0.100.0", features = [
    "Win32_Foundation",
    "Win32_System_Threading",
    "Win32_System_Memory",
] }
```

This tells Cargo:

1. Download the `windows` crate.
2. Enable the `Win32_Foundation` feature.
3. Enable the `Win32_System_Threading` feature.
4. Enable the `Win32_System_Memory` feature.
5. Compile the corresponding generated Windows API bindings.

You do not need to enable every Windows API. You enable the APIs your application actually uses.

Let's understand how this works internally, starting with basic Cargo syntax and then examining the `windows-rs` feature graph.

## 1. First, understand what a Cargo feature is

Consider a small Rust library.

Project structure:

```bash
my_library/
├── Cargo.toml
└── src/
    └── lib.rs
```

`Cargo.toml`:

```toml
[package]
name = "my_library"
version = "0.1.0"
edition = "2024"

[features]
default = ["logging"]
logging = []
network = []
```

`src/lib.rs`:

```rs
#[cfg(feature = "logging")]
pub fn log_message() {
    println!("Logging enabled");
}

#[cfg(feature = "network")]
pub fn connect() {
    println!("Network enabled");
}
```

Let's examine each part.

### `[features]`

This section declares the features that your crate supports.

```toml
[features]
```

It does not automatically compile anything. It defines named configuration options that Cargo can activate.

### `default = ["logging"]`

```toml
default = ["logging"]
```

This means that Cargo enables the `logging` feature automatically when someone depends on your crate without disabling default features.

For example:

```toml
[dependencies]
my_library = "0.1.0"
```

Equivalent feature selection:

```toml
logging = enabled
network = disabled
```

You can disable default features:

```toml
[dependencies]
my_library = {
    version = "0.1.0",
    default-features = false
}
```

Now neither feature is enabled automatically.

### `logging = []`

```toml
logging = []
```

This declares a feature named `logging`.

The empty array means it does not explicitly activate any other features or optional dependencies.

It can still control conditional compilation:

```rs
#[cfg(feature = "logging")]
```

### `network = []`

Same concept:

```toml
network = []
```

It declares another independent feature.

### `#[cfg(feature = "...")]`

This is Rust's conditional compilation mechanism.

```rs
#[cfg(feature = "logging")]
pub fn log_message() {
    println!("Logging enabled");
}
```

The function exists in the compiled crate only when the `logging` feature is enabled.

Think of it like this:

Cargo feature selection

Enabled

`logging`

`log_message()` is compiled.

Disabled

`network`

`connect()` is not compiled.

The actual compilation condition is checked by rustc through Cargo-provided configuration flags.

Run:

```bash
cargo check --features logging
```

Or:

```bash
cargo check --features "logging network"
```

These commands activate the requested features.

## 2. Understanding the most important feature syntax

Before examining the actual Windows crate, you need to understand four different forms.

| Syntax                  | Meaning                                                   |
| ----------------------- | --------------------------------------------------------- |
| `feature = []`          | Feature with no explicit dependencies                     |
| `feature = ["A"]`       | Enabling this feature also enables feature A              |
| `feature = ["dep:foo"]` | Enabling this feature activates optional dependency `foo` |
| `feature = ["foo/bar"]` | Enables feature `bar` of dependency `foo`                 |

The second form is especially important in `windows-rs`.

Consider:

```toml
[features]

Foundation = []

Graphics = ["Foundation"]

Graphics_Capture = ["Graphics"]
```

This creates a dependency chain:

```
Foundation
    ↑
Graphics
    ↑
Graphics_Capture
```

If you activate `Graphics_Capture`, Cargo also activates:

```
Graphics_Capture
Graphics
Foundation
```

This is called a feature dependency.

It is not a runtime dependency. It is a compile-time configuration relationship.

## 3. Now examine the actual `windows-rs` Cargo.toml

Let's divide your file into logical sections.

### A. Package metadata

Your first section:

```toml
[pakage]
name = "windows"
version = "0.100.0"
edition = "2024"
rust-version = "1.95"
license = "MIT OR Apache-2.0"
description = "Rust for Windows"
repository = "https://github.com/microsoft/windows-rs"
documentation = "https://microsoft.github.io/windows-docs-rs/"
categories = ["os::windows-apis"]
readme = "readme.md"
```

There is one typo:

```
[pakage]
```

It must be:

```toml
[package]
```

Otherwise Cargo will not recognize this as the package metadata section.

Let's understand each field.

| Field           | Meaning                        |
| --------------- | ------------------------------ |
| `name`          | Crate/package name             |
| `version`       | Package version                |
| `edition`       | Rust language edition          |
| `rust-version`  | Minimum supported Rust version |
| `license`       | Package license                |
| `description`   | Short description              |
| `repository`    | Source code repository         |
| `documentation` | Documentation website          |
| `categories`    | Crates.io classification       |
| `readme`        | README file                    |

Important distinction:

```toml
edition = "2024"
rust-version = "1.95"
```

These are not feature declarations.

They specify the Rust language edition and minimum compiler version required by this package.

### B. Dependencies

```toml
[dependencies]
windows-collections = { workspace = true }
windows-core = { workspace = true }
windows-future = { workspace = true }
windows-numerics = { workspace = true }
windows-reference = { workspace = true }
windows-time = { workspace = true }
```

This section declares dependencies.

The interesting part is:

```toml
workspace = true
```

It means that the dependency configuration is inherited from the workspace root `Cargo.toml`.

For example, imagine the workspace root contains:

```toml
[workspace.dependencies]
windows-core = { path = "crates/libs/core", version = "0.1.0" }
```

Then the member crate can write:

```toml
[dependencies]
windows-core = { workspace = true }
```

This avoids repeating dependency configuration in every crate.

The six dependencies have different responsibilities:

| Dependency            | General responsibility                     |
| --------------------- | ------------------------------------------ |
| `windows-collections` | Windows-related collection types           |
| `windows-core`        | Core Windows interoperability abstractions |
| `windows-future`      | Asynchronous operation support             |
| `windows-numerics`    | Numerical types                            |
| `windows-reference`   | Reference-related support                  |
| `windows-time`        | Time-related types                         |

Notice that these dependencies are not necessarily all optional.

That means the `windows` crate declares them as dependencies regardless of whether you enable a particular Windows API feature.

However, their own features can be enabled or disabled independently.

### C. Library configuration

```toml
[lib]
test = false
doctest = false
```

This section configures the library target.

`test = false`:

Cargo does not build the library's own unit-test target in the normal library test configuration.

`doctest = false`:

Cargo does not execute documentation examples as doctests.

These settings do not control Windows API features.

### D. Workspace lints

```toml
[lints]
workspace = true
```

This inherits lint configuration from the workspace root.

For example, the workspace might define:

```toml
[workspace.lints.rust]
unsafe_op_in_unsafe_fn = "deny"
```

The `windows` crate inherits that configuration.

A lint is a compiler warning or error concerning code quality, correctness, or style.

Again, this is independent of the feature system.

### E. Documentation configuration

```toml
[package.metadata.docs.rs]
default-target = "x86_64-pc-windows-msvc"
targets = []
rustdoc-args = ["--cfg", "docsrs"]
```

This section provides configuration for docs.rs.

Let's examine it:

`default-target`

```toml
default-target = "x86_64-pc-windows-msvc"
```

The default documentation build target is 64-bit Windows using the MSVC ABI.

`targets`

```toml
targets = []
```

An empty target list means no additional documentation targets are requested here.

`rustdoc-args`

```toml
rustdoc-args = ["--cfg", "docsrs"]
```

Passes a conditional compilation configuration to rustdoc.

For example, source code can use:

```rs
#[cfg(docsrs)]
```

This is documentation-build configuration, not a normal Cargo feature.

## 4. The most important part: `default`, `std`, and `docs`

Now we reach:

```toml
[features]

default = ["std", "windows-core/proc-macros"]
docs = []

std = [
    "windows-collections/std",
    "windows-core/std",
    "windows-future/std",
    "windows-numerics/std",
    "windows-reference/std",
    "windows-time/std"
]
```

This section contains three important features.

### A. `default`

```toml
default = ["std", "windows-core/proc-macros"]
```

This means that when a user adds the `windows` crate normally:

```toml
[dependencies]
windows = "0.100.0"
```

Cargo automatically activates:

```bash
windows/default
    |
    +---- windows/std
    |
    +---- windows-core/proc-macros
```

There are two things being activated.

1. The `std` feature belonging to the `windows` crate.
2. The `proc-macros` feature belonging to the `windows-core` dependency.

The syntax:

```
"windows-core/proc-macros"
```

is particularly important.

It means:

> Enable the `proc-macros` feature of the dependency named `windows-core`.

It does NOT mean that `proc-macros` is a feature defined directly in the `windows` crate.

### B. `std`

```toml
std = [
    "windows-collections/std",
    "windows-core/std",
    "windows-future/std",
    "windows-numerics/std",
    "windows-reference/std",
    "windows-time/std"
]
```

This is a feature that forwards feature activation to other crates.

Suppose you activate:

```bash
cargo check --no-default-features --features std
```

Cargo enables:

```bash
windows/std
    |
    +---- windows-collections/std
    |
    +---- windows-core/std
    |
    +---- windows-future/std
    |
    +---- windows-numerics/std
    |
    +---- windows-reference/std
    |
    +---- windows-time/std
```

This is called feature forwarding.

The `windows` crate is saying:

"When my `std` feature is enabled, also enable the `std` features of my dependencies."

Why?

Because the library's dependencies may have their own independent configuration for standard-library support.

### C. `docs`

```
docs = []
```

This declares a feature named `docs`.

It does not enable any other feature.

It can be used inside Rust source code:

```rs
#[cfg(feature = "docs")]
pub fn documentation_helper() {
    // ...
}
```

Whether that feature has a practical effect depends on where and how the source code uses it.

## 5. Understanding the generated Windows API features

Now we reach the enormous part of your file:

```toml
# generated features

AI = ["Foundation"]
AI_Actions = ["AI"]
AI_Actions_Hosting = ["AI_Actions"]
AI_Actions_Provider = ["AI_Actions"]
AI_Agents = ["AI"]
AI_Agents_Mcp = ["AI_Agents"]
AI_MachineLearning = ["AI"]

ApplicationModel = ["Foundation"]
ApplicationModel_Activation = ["ApplicationModel"]
ApplicationModel_AppExtensions = ["ApplicationModel"]
ApplicationModel_AppService = ["ApplicationModel"]
```

These are generated feature declarations.

They represent the Windows API namespaces and their dependencies.

The word `generated` is important.

Microsoft's `windows-rs` project generates a large amount of Rust API binding code from Windows metadata.

Instead of manually defining every feature, the project generates these feature declarations.

### A. What does `Foundation = []` mean?

Consider:

```
Foundation = []
```

This declares a feature called `Foundation`.

It has no explicit feature dependencies.

When activated, it makes the corresponding Foundation API bindings available for compilation.

For example, a Rust program might use Windows foundation types.

The important distinction:

```
Foundation = []
```

does not mean the Windows Foundation API has no internal dependencies whatsoever.

It means only that this feature declaration does not explicitly activate another Cargo feature.

### B. What does `AI = ["Foundation"]` mean?

```
AI = ["Foundation"]
```

This means:

When `AI` is activated, Cargo also activates `Foundation`.

The dependency graph looks like this:

AI

Selected by your application

Feature dependency

Foundation

Automatically enabled

### C. What does `AI_Actions = ["AI"]` mean?

```
AI_Actions = ["AI"]
```

It means `AI_Actions` depends on `AI`.

Therefore:

```
AI_Actions
    └── AI
         └── Foundation
```

If you activate only `AI_Actions`, Cargo automatically activates all three.

### D. What about deeper features?

```toml
AI_Actions_Hosting = ["AI_Actions"]
AI_Actions_Provider = ["AI_Actions"]
AI_Agents = ["AI"]
AI_Agents_Mcp = ["AI_Agents"]
AI_MachineLearning = ["AI"]
```

Let's expand these.

For example:

```
AI_Agents_Mcp
    |
    +---- AI_Agents
              |
              +---- AI
                       |
                       +---- Foundation
```

Another example:

```
AI_Actions_Hosting
    |
    +---- AI_Actions
              |
              +---- AI
                       |
                       +---- Foundation
```

The important rule:

Cargo recursively activates the dependencies of every enabled feature.

You don't need to manually activate every parent feature.

### E. ApplicationModel example

```toml
ApplicationModel = ["Foundation"]

ApplicationModel_Activation = ["ApplicationModel"]

ApplicationModel_AppExtensions = ["ApplicationModel"]

ApplicationModel_AppService = ["ApplicationModel"]

ApplicationModel_Appointments = ["ApplicationModel"]

ApplicationModel_Appointments_AppointmentsProvider = [
    "ApplicationModel_Appointments"
]
```

The dependency graph:

```
Foundation
    |
    +---- ApplicationModel
               |
               +---- ApplicationModel_Activation
               |
               +---- ApplicationModel_AppExtensions
               |
               +---- ApplicationModel_AppService
               |
               +---- ApplicationModel_Appointments
                              |
                              +---- ApplicationModel_Appointments_AppointmentsProvider
```

For example, activating:

```toml
features = ["ApplicationModel_Appointments_AppointmentsProvider"]
```

also activates:

```
ApplicationModel_Appointments_AppointmentsProvider
ApplicationModel_Appointments
ApplicationModel
Foundation
```

This hierarchical design allows Microsoft to organize thousands of Windows API bindings into manageable groups.

## 6. The difference between the two groups of Windows APIs

Your file contains two broad categories of generated features.

### Group 1: Windows Runtime (WinRT) APIs

Examples:

```toml
AI = ["Foundation"]
ApplicationModel = ["Foundation"]
Devices = ["Foundation"]
Graphics = ["Foundation"]
Media = ["Foundation"]
Networking = ["Foundation"]
Security = ["Foundation"]
Storage = ["Foundation"]
System = ["Foundation"]
UI = ["Foundation"]
Web = ["Foundation"]
```

These represent major Windows API areas.

Here's a simplified overview:

| Feature            | API area                                     |
| ------------------ | -------------------------------------------- |
| `AI`               | Windows AI-related APIs                      |
| `ApplicationModel` | Application lifecycle and application models |
| `Devices`          | Hardware and device APIs                     |
| `Gaming`           | Gaming-related APIs                          |
| `Globalization`    | Language, locale, and formatting             |
| `Graphics`         | Graphics and imaging                         |
| `Media`            | Audio, video, and media                      |
| `Networking`       | Network communication                        |
| `Perception`       | Spatial and perception APIs                  |
| `Security`         | Authentication and security                  |
| `Services`         | Windows services APIs                        |
| `Storage`          | File and storage APIs                        |
| `System`           | System-related APIs                          |
| `UI`               | User interface APIs                          |
| `Web`              | Web-related APIs                             |

For example:

```toml
Graphics = ["Foundation"]

Graphics_Capture = ["Graphics"]

Graphics_DirectX = ["Graphics"]

Graphics_DirectX_Direct3D11 = ["Graphics_DirectX"]
```

The dependency graph is:

```
Foundation
    |
    +---- Graphics
              |
              +---- Graphics_Capture
              |
              +---- Graphics_DirectX
                         |
                         +---- Graphics_DirectX_Direct3D11
```

Suppose you want to use Windows screen capture functionality.

You might enable:

```
[dependencies]
windows = {
    version = "0.100.0",
    features = ["Graphics_Capture"]
}
```

Cargo recursively enables the parent features.

You do not need to write:

```toml
features = [
    "Foundation",
    "Graphics",
    "Graphics_Capture"
]
```

The following is sufficient:

```toml
features = ["Graphics_Capture"]
```

### Group 2: Traditional Win32 APIs

The second group looks different:

```toml
accctrl = ["minwindef", "shared", "winnt"]
aclapi = ["accctrl", "minwindef", "shared", "winnt"]
bcrypt = ["minwindef", "shared", "winnt"]
memoryapi = ["basetsd", "minwinbase", "minwindef", "shared", "winnt"]
processthreadsapi = [
    "basetsd",
    "guiddef",
    "minwinbase",
    "minwindef",
    "shared",
    "winnt"
]
```

These are lower-level Windows API header-related feature groups.

For example:

| Feature             | General Windows API area             |
| ------------------- | ------------------------------------ |
| `memoryapi`         | Virtual memory and memory management |
| `processthreadsapi` | Process and thread management        |
| `synchapi`          | Synchronization                      |
| `fileapi`           | File operations                      |
| `winuser`           | Window management and user interface |
| `winreg`            | Windows Registry                     |
| `winsock2`          | Socket networking                    |
| `bcrypt`            | Cryptographic primitives             |
| `debugapi`          | Debugging APIs                       |
| `sysinfoapi`        | System information                   |

Notice this example:

```toml
memoryapi = [
    "basetsd",
    "minwinbase",
    "minwindef",
    "shared",
    "winnt"
]
```

This means enabling `memoryapi` also activates five other features.

Its dependency graph:

```
memoryapi
    |
    +---- basetsd
    |
    +---- minwinbase
    |
    +---- minwindef
    |
    +---- shared
    |
    +---- winnt
```

These dependencies exist because the generated memory API bindings can rely on types and definitions provided by other Windows headers.

For example, a memory-management function might require:

- An integer type defined by a base type header.
- A Windows-specific pointer type.
- A memory-related structure.
- Windows-specific constants.

The feature dependencies ensure that the corresponding generated bindings are available together.

### C. Why are the names lowercase?

You might wonder why one group looks like this:

```
Graphics_Capture
```

while another looks like this:

```
memoryapi
```

They come from different Windows API naming conventions and metadata groupings.

Do not assume that the Cargo feature name is necessarily identical to the Rust module path or the original Windows C header name.

The Cargo feature controls compilation. The generated Rust API determines the actual module and item names you import.

## 7. Understanding feature dependencies with a real example

Let's use three features from your file:

```toml
Foundation = []

System = ["Foundation"]

System_Threading = ["System"]
```

Suppose your application wants to use the `System_Threading` API.

Your application's `Cargo.toml`:

```toml
[package]
name = "windows_example"
version = "0.1.0"
edition = "2024"

[dependencies]
windows = {
    version = "0.100.0",
    features = ["System_Threading"]
}
```

What happens?

Feature activation process

1. Your application requests a feature
   ```
   features = ["System_Threading"]
   ```
2. Cargo activates `System_Threading`
   ```
   System_Threading = ["System"]
   ```
3. Cargo activates `System`
   ```
   System = ["Foundation"]
   ```
4. Cargo activates `Foundation`
   ```
   Foundation = []
   ```
   There are no additional feature dependencies.
5. Rust compilation

   Cargo passes enabled feature configurations to rustc, and conditional compilation determines which generated bindings are included.

The final activated feature set is:

```
windows/System_Threading
windows/System
windows/Foundation
```

This is the fundamental mechanism behind the feature hierarchy in `windows-rs`.

## 8. What happens internally during compilation?

This is particularly important if you want to understand Rust's build system.

Consider:

```toml
[dependencies]
windows = {
    version = "0.100.0",
    features = ["System_Threading"]
}
```

The compilation process is conceptually:

```
             Your Application
                    |
                    |
               Cargo.toml
                    |
                    v
             Cargo Resolver
                    |
                    |
           Resolve Dependencies
                    |
                    v
          Resolve Feature Graph
                    |
                    |
          +---------+----------+
          |                    |
          v                    v
 System_Threading            System
          |                    |
          +---------+----------+
                    |
                    v
                Foundation
                    |
                    v
             rustc compilation
                    |
                    v
        Conditional Compilation
                    |
                    v
         Generated Rust Bindings
                    |
                    v
              Final Binary
```

The critical mechanism is `--cfg`.

Cargo communicates enabled features to the compiler using configuration flags.

For example, conceptually, the compiler receives:

```bash
rustc \
    --cfg 'feature="System_Threading"' \
    --cfg 'feature="System"' \
    --cfg 'feature="Foundation"'
```

The actual Cargo invocation includes many additional arguments, dependency paths, metadata, and build settings.

In Rust source code, these configurations can be checked with:

```rs
#[cfg(feature = "System_Threading")]
```

For example:

```
#[cfg(feature = "System_Threading")]
pub mod threading {
    // Threading-related implementation
}
```

If `System_Threading` is disabled, this module is excluded from compilation.

One important detail: Cargo's feature system is only one part of conditional compilation. The crate can also use target-specific conditions such as:

```rs
#[cfg(target_os = "windows")]
```

A feature being enabled does not automatically make a Windows-only API usable on Linux or macOS.

## 9. How to inspect features using the terminal

Since you are studying Windows APIs and the Rust build system, I recommend inspecting Cargo's actual feature resolution rather than just reading `Cargo.toml`.

First, create a project:

```bash
cargo new windows_feature_demo
cd windows_feature_demo
```

Add this dependency:

```toml
[dependencies]
windows = {
    version = "0.100.0",
    features = [
        "Foundation",
        "System",
        "System_Threading"
    ]
}
```

### A. Display available package features

```bash
cargo info windows@0.100.0
```

This displays package information and available feature information from the registry.

### B. Display the dependency feature tree

```bash
cargo tree -e features
```

This shows which features are activated across your dependency graph.

For a more focused view:

```bash
cargo tree -e features -i windows
```

The `-i` option means inverse dependency view.

It helps you understand which dependencies are requesting the `windows` crate.

### C. Inspect enabled features through Cargo metadata

```bash
cargo metadata --format-version 1
```

This produces machine-readable JSON containing package and dependency metadata, including declared features.

### D. Disable default features

```toml
[dependencies]
windows = {
    version = "0.100.0",
    default-features = false,
    features = ["System_Threading"]
}
```

Now the default feature set is not automatically activated.

Your explicitly selected API feature is still enabled.

This is useful when you want to investigate the effect of `std` and `windows-core/proc-macros` independently.

### E. Check compilation

For Windows:

```bash
rustup target add x86_64-pc-windows-msvc
```

Then:

```bash
cargo check --target x86_64-pc-windows-msvc
```

You can use the Windows MSVC target to check Windows-specific code even if your development machine runs Linux or macOS, provided the necessary toolchain components are installed.

## 10. An important Cargo concept: feature unification

There is another important concept you should understand: feature unification.

Imagine your application has two dependencies:

```toml
[dependencies]
library_a = "1.0"
library_b = "1.0"
```

Suppose both depend on `windows`:

```
Your Application
    |
    +---- library_a
    |         |
    |         +---- windows (Foundation)
    |
    +---- library_b
              |
              +---- windows (System_Threading)
```

Cargo generally unifies features for the same package version within a dependency resolution context.

The result is conceptually:

```
windows
    |
    +---- Foundation
    |
    +---- System_Threading
```

Both feature sets are enabled.

This means a dependency can activate a feature even if your own `Cargo.toml` doesn't explicitly request it.

Features are generally additive, not mutually exclusive.

This is why inspecting the resolved feature tree is important.

## 11. Understanding the entire `windows-rs` feature architecture

Let's put everything together.

## windows-rs feature architecture

Your Rust application

Cargo.toml

windows crate

Feature selection and generated API bindings

WinRT APIs

- Foundation
- ApplicationModel
- Devices
- Graphics
- Media
- Networking
- Security
- Storage
- System
- UI

Win32 APIs

- memoryapi
- processthreadsapi
- synchapi
- fileapi
- winuser
- winreg
- winsock2
- bcrypt

Generated Rust API bindings

Types, functions, interfaces, constants

rustc compilation

Conditional compilation and linking

One distinction is important: enabling a Cargo feature controls which generated bindings are compiled. It does not itself install a Windows component, start a service, or guarantee that the corresponding Windows API is available at runtime.

## 12. Practical example: Windows process and thread APIs

Let's connect the feature system to your Windows kernel studies.

Suppose you want to investigate:

- `CreateProcess`
- `CreateThread`
- `GetCurrentProcessId`
- `GetCurrentThreadId`

These belong to Windows process/thread APIs.

Your dependency configuration can look like:

```
[dependencies]
windows = {
    version = "0.100.0",
    features = [
        "Win32_Foundation",
        "Win32_System_Threading"
    ]
}
```

However, feature names are version-specific. For the exact `0.100.0` manifest you pasted, use the feature names actually declared there, rather than assuming the older `Win32_*` naming convention.

For example, your pasted manifest declares:

```toml
processthreadsapi = [
    "basetsd",
    "guiddef",
    "minwinbase",
    "minwindef",
    "shared",
    "winnt"
]
```

This is the feature dependency definition to investigate for those traditional Win32 APIs.

The key lesson is to distinguish:

```
Cargo feature name
        |
        v
Generated Rust module/item
        |
        v
Windows API function
        |
        v
Windows operating system implementation
```

These are four related but different things.

## 13. Recommended learning order

For your Windows kernel and Rust systems programming studies, I recommend understanding the following concepts in this order:

| Order | Topic                   | What to understand                          |
| ----- | ----------------------- | ------------------------------------------- |
| 1     | Cargo packages          | `[package]`, `[dependencies]`               |
| 2     | Cargo features          | `[features]`, `default`, feature arrays     |
| 3     | Feature dependencies    | Recursive activation                        |
| 4     | Feature forwarding      | `windows-core/std`                          |
| 5     | Conditional compilation | `#[cfg(feature = "...")]`                   |
| 6     | Feature unification     | Multiple dependencies enabling features     |
| 7     | Generated bindings      | How Windows metadata becomes Rust APIs      |
| 8     | Windows ABI             | FFI, calling conventions, types             |
| 9     | Windows APIs            | Win32 and WinRT                             |
| 10    | Windows internals       | Processes, threads, memory, synchronization |

Official references:

- [windows-rs Cargo.toml](https://github.com/microsoft/windows-rs/blob/master/crates/libs/windows/Cargo.toml?utm_source=chatgpt.com)
- [The Cargo Book — Features](https://doc.rust-lang.org/cargo/reference/features.html?utm_source=chatgpt.com)
- [Rust Reference — Conditional Compilation](https://doc.rust-lang.org/reference/conditional-compilation.html?utm_source=chatgpt.com)
- [Windows Rust API Documentation](https://microsoft.github.io/windows-docs-rs/?utm_source=chatgpt.com)

## The most important takeaway

Remember these three rules:

1. `feature = []` declares a feature without explicit dependencies.
2. `feature = ["A"]` means enabling this feature also enables feature `A`.
3. `feature = ["dependency/feature"]` forwards feature activation to another crate.

And most importantly:

A Cargo feature is a compile-time switch, not a runtime Windows API switch.

Once you understand that, the enormous `[features]` section in `windows-rs` becomes much easier to read: it is essentially a large, automatically generated dependency graph describing which Windows API bindings need to be compiled together.
