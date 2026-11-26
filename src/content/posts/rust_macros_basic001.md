---
title: rust_macros_basic001
published: 2026-11-27
description: 'rust macros basic001'
image: ''
tags: [macro, macros, rust]
category: 'rust_macros'
draft: false 
lang: ''
---

# link

- [rust 공식북macros설명](https://doc.rust-lang.org/book/ch20-05-macros.html)
- [Metal API rust로 내가 만든거(macOS커널에 직접 연결해 GUI구현하기(macOS전용))](https://github.com/YoungHaKim7/metal-cpp-rs)
  - ABI-faithful Rust conversion of Apple's metal-cpp (macOS 27 / iOS 27 SDK era, Metal 4), implemented concretely against the Objective-C ABI — the same technique metal-cpp itself uses to bridge C++ to the runtime
    - 원본(C++구현한거)
      - https://github.com/apple/metal-cpp

- [`NSString` macro구현된거(rust코드)](#nsstring-macro구현된거)

- [**1. Expanded macro code**](#1-expanded-macro-code)

- [parameter 12개 구현한거](https://github.com/YoungHaKim7/metal-cpp-rs/blob/main/src/objc_abi.rs#L124-L138)

<hr />

# `NSString` macro구현된거[|🔝|](#link)

```rs
impl MTLArchitecture {
    /// -name
    ///
    /// # Safety
    /// Calls into the Objective-C runtime.
    pub unsafe fn name(&self) -> Ref<NSString> {
        Ref::from_raw(send::<Raw>(self.as_raw(), sel!("name")))
    }
}

objc_class!(
    /// NS::String (Foundation/NSString.hpp).
    pub struct NSString : "NSString";
);

macro_rules! objc_class {
    ($(#[$m:meta])* $vis:vis struct $name:ident : $cls:literal;) => {
        $(#[$m])*
        #[repr(transparent)]
        #[derive(Clone, Copy)]
        $vis struct $name($crate::objc_abi::Raw);

        impl $crate::objc_abi::Obj for $name {
            fn from_raw(ptr: $crate::objc_abi::Raw) -> Self {
                $name(ptr)
            }
            fn as_raw(&self) -> $crate::objc_abi::Raw {
                self.0
            }
            unsafe fn class_ptr() -> $crate::objc_abi::Class {
                $crate::objc_abi::class!($cls)
            }
        }

        impl $name {
            /// The nil object (metal-cpp nullptr).
            pub fn nil() -> Self {
                $name(std::ptr::null_mut())
            }
            pub fn is_nil(&self) -> bool {
                self.0.is_null()
            }
            /// +[Cls alloc] — owning (+1), *uninitialized* object.
            pub unsafe fn alloc() -> $crate::objc_abi::Strong<Self> {
                $crate::objc_abi::alloc::<Self>()
            }
            /// [[Cls alloc] init] — owning (+1), initialized object.
            pub unsafe fn new() -> $crate::objc_abi::Strong<Self> {
                $crate::objc_abi::new_obj::<Self>()
            }
            /// The Objective-C Class object.
            pub fn class() -> $crate::objc_abi::Class {
                $crate::objc_abi::class!($cls)
            }
        }

        impl std::fmt::Debug for $name {
            fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
                write!(f, "{}({:p})", stringify!($name), self.0)
            }
        }
    };
}

pub(crate) use objc_class;
```


# ChatGPT설명(Expanded macro code)[|🔝|](#link)

- The `objc_class!` is a **Rust declarative macro (**`macro_rules!`**)** that generates an Objective-C class wrapper around a raw Objective-C object pointer.

For your example:

```rs
objc_class!(
    /// `NS::String` (`Foundation/NSString.hpp`).
    pub struct NSString : "NSString";
);
```

The macro expands approximately into the following Rust code.

## **1. Expanded macro code**[|🔝|](#link)

```rs
/// `NS::String` (`Foundation/NSString.hpp`).
#[repr(transparent)]
#[derive(Clone, Copy)]
pub struct NSString($crate::objc_abi::Raw);

// Implement Objective-C object interface
impl $crate::objc_abi::Obj for NSString {
    fn from_raw(ptr: $crate::objc_abi::Raw) -> Self {
        NSString(ptr)
    }

    fn as_raw(&self) -> $crate::objc_abi::Raw {
        self.0
    }

    unsafe fn class_ptr() -> $crate::objc_abi::Class {
        $crate::objc_abi::class!("NSString")
    }
}

impl NSString {
    /// The nil object (metal-cpp nullptr).
    pub fn nil() -> Self {
        NSString(std::ptr::null_mut())
    }

    pub fn is_nil(&self) -> bool {
        self.0.is_null()
    }

    /// +[NSString alloc]
    pub unsafe fn alloc() -> $crate::objc_abi::Strong<Self> {
        $crate::objc_abi::alloc::<Self>()
    }

    /// [[NSString alloc] init]
    pub unsafe fn new() -> $crate::objc_abi::Strong<Self> {
        $crate::objc_abi::new_obj::<Self>()
    }

    /// Objective-C Class object.
    pub fn class() -> $crate::objc_abi::Class {
        $crate::objc_abi::class!("NSString")
    }
}

impl std::fmt::Debug for NSString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}({:p})", stringify!(NSString), self.0)
    }
}
```

Note: `$crate` is valid inside a macro definition. In ordinary expanded source, it resolves to the crate that defined the macro.

## **2. Understanding the generated structure**

The most important part is:

```rs
#[repr(transparent)]
#[derive(Clone, Copy)]
pub struct NSString(Raw);
```

Suppose:

```rs
pub type Raw = *mut std::ffi::c_void;
```

Then the memory representation is conceptually:

```rs
NSString
┌──────────────────────────┐
│ Raw pointer (8 bytes)    │
│ *mut c_void              │
└──────────────────────────┘
```

`#[repr(transparent)]` guarantees that `NSString` has the same layout and ABI as its single non-zero-sized field.

## **3. How the macro matches its input**

```rs
macro_rules! objc_class {
    ($(#[$m:meta])* $vis:vis struct $name:ident : $cls:literal;) => {
        // Generated code
    };
}
```

| Pattern          | Meaning                 | Example             |
| ---------------- | ----------------------- | ------------------- |
| `$(#[$m:meta])*` | Zero or more attributes | `/// Documentation` |
| `$vis:vis`       | Visibility              | `pub`               |
| `$name:ident`    | Identifier              | `NSString`          |
| `$cls:literal`   | String literal          | `"NSString"`        |
| `;`              | Required semicolon      | `;`                 |

The macro accepts:

```rs
objc_class!(
    pub struct NSString : "NSString";
);
```

It can also accept:

```rs
objc_class!(
    #[derive(Default)]
    pub struct MyObject : "NSObject";
);
```

## **4. How&#x20;**`NSString`**&#x20;connects to Objective-C**

Consider your original method:

```rs
impl MTLArchitecture {
    /// `-name`
    ///
    /// # Safety
    /// Calls into the Objective-C runtime.
    pub unsafe fn name(&self) -> Ref<NSString> {
        Ref::from_raw(send::<Raw>(self.as_raw(), sel!("name")))
    }
}
```

The execution flow is:

|**MTLArchitecture::name()**|
|-|
|⬇|
| **sel!("name")** <br /> Objective-C selector|
|⬇|
|**send::(self.as_raw(), selector)** <br /> Objective-C message dispatch|
|⬇|
|**Ref::from_raw(...)** <br /> Wrap returned Objective-C pointer|
|⬇|
|\*\*Ref|

## **5. Equivalent C++ Metal-cpp concept**

In Metal-cpp, the corresponding class is conceptually:

```cpp
namespace NS {

class String : public NS::Copying {
public:
    static String* alloc();
    String* init();

    // Other methods...
};

}
```

The Rust macro creates a lightweight wrapper around the Objective-C runtime object rather than implementing the underlying Objective-C class.

**Key takeaway:** `objc_class!` eliminates repetitive boilerplate. One declaration generates the Rust type, Objective-C object trait implementation, allocation methods, class lookup, nil handling, and debug formatting.
