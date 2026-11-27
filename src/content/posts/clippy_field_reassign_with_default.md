---
title: clippy_field_reassign_with_default
published: 2026-11-28
description: 'Clippy is reporting clippy::field_reassign_with_default.'
image: ''
tags: [clippy, rust]
category: 'rust_clippy'
draft: false 
lang: ''
---

# link

- [공부할 코드 `harness.rs`](https://github.com/YoungHaKim7/metal_todo_app_hagul)
  - [diff로 비교해서 공부](https://github.com/YoungHaKim7/metal_todo_app_hagul/commit/1c5090e4e76f1018e911b7ddeace9fff02ab9b7b)


<hr />

# 문제의 코드


```rs
   /// Read the configuration from the environment.
   pub fn from_env() -> Harness {
       let mut h = Harness::default();
       h.frames = var("METAL_GUI_FRAMES").and_then(|v| v.to_string_lossy().parse().ok());
       h.shot_dir = var("METAL_GUI_SHOT_DIR").map(PathBuf::from);
       h.shot_frames = var("METAL_GUI_SHOT_FRAMES")
           .map(|v| parse_list(&v, |p| p.trim().parse().ok()))
           .unwrap_or_default();
       h.keys = var("METAL_GUI_KEYS")
           .map(|v| {
               parse_list(&v, |p| {
                   let (a, b) = p.trim().split_once(':')?;
                   Some(KeyTap {
                       frame: a.parse().ok()?,
                       code: b.parse().ok()?,
                   })
               })
           })
           .unwrap_or_default();
       h.holds = var("METAL_GUI_HOLD")
           .map(|v| {
               parse_list(&v, |p| {
                   let mut it = p.trim().split(':');
                   let frame = it.next()?.parse().ok()?;
                   let code = it.next()?.parse().ok()?;
                   let len = it.next()?.parse().ok()?;
                   Some((frame, code, len))
               })
           })
           .unwrap_or_default();
       h.mouse = var("METAL_GUI_MOUSE")
           .map(|v| {
               parse_list(&v, |p| {
                   let mut it = p.trim().split(':');
                   let frame = it.next()?.parse().ok()?;
                   let x = it.next()?.parse().ok()?;
                   let y = it.next()?.parse().ok()?;
                   let hold_frames = it.next().and_then(|s| s.parse().ok()).unwrap_or(0);
                   Some(MouseAt {
                       frame,
                       x,
                       y,
                       hold_frames,
                   })
               })
           })
           .unwrap_or_default();
       h.text = var("METAL_GUI_TEXT").and_then(|v| {
           let v = v.to_string_lossy().into_owned();
           let (frame, text) = v.split_once(':')?;
           Some((frame.trim().parse().ok()?, text.to_string()))
       });
       h.close_frame = var("METAL_GUI_CLOSE").and_then(|v| v.to_string_lossy().parse().ok());
       h.name = std::env::current_exe()
           .ok()
           .and_then(|p| p.file_stem().map(|s| s.to_string_lossy().into_owned()))
           .unwrap_or_else(|| "example".to_string());
       h
   }
```

## 변경한 코드

```rs
    pub fn from_env() -> Harness {
        Harness {
            frames: var("METAL_GUI_FRAMES").and_then(|v| v.to_string_lossy().parse().ok()),

            shot_dir: var("METAL_GUI_SHOT_DIR").map(PathBuf::from),

            shot_frames: var("METAL_GUI_SHOT_FRAMES")
                .map(|v| parse_list(&v, |p| p.trim().parse().ok()))
                .unwrap_or_default(),

            keys: var("METAL_GUI_KEYS")
                .map(|v| {
                    parse_list(&v, |p| {
                        let (a, b) = p.trim().split_once(':')?;

                        Some(KeyTap {
                            frame: a.parse().ok()?,
                            code: b.parse().ok()?,
                        })
                    })
                })
                .unwrap_or_default(),

            holds: var("METAL_GUI_HOLD")
                .map(|v| {
                    parse_list(&v, |p| {
                        let mut it = p.trim().split(':');

                        let frame = it.next()?.parse().ok()?;
                        let code = it.next()?.parse().ok()?;
                        let len = it.next()?.parse().ok()?;

                        Some((frame, code, len))
                    })
                })
                .unwrap_or_default(),

            mouse: var("METAL_GUI_MOUSE")
                .map(|v| {
                    parse_list(&v, |p| {
                        let mut it = p.trim().split(':');

                        let frame = it.next()?.parse().ok()?;
                        let x = it.next()?.parse().ok()?;
                        let y = it.next()?.parse().ok()?;

                        let hold_frames = it.next().and_then(|s| s.parse().ok()).unwrap_or(0);

                        Some(MouseAt {
                            frame,
                            x,
                            y,
                            hold_frames,
                        })
                    })
                })
                .unwrap_or_default(),

            text: var("METAL_GUI_TEXT").and_then(|v| {
                let v = v.to_string_lossy().into_owned();
                let (frame, text) = v.split_once(':')?;

                Some((frame.trim().parse().ok()?, text.to_string()))
            }),

            close_frame: var("METAL_GUI_CLOSE").and_then(|v| v.to_string_lossy().parse().ok()),

            name: std::env::current_exe()
                .ok()
                .and_then(|p| p.file_stem().map(|s| s.to_string_lossy().into_owned()))
                .unwrap_or_else(|| "example".to_string()),
        }
    }
```

### Clippy is reporting `clippy::field_reassign_with_default`.

```bash
$ cargo clippy --all-features --all-targets -- -D warnings

error: field assignment outside of initializer for an instance created with Default::default()
   --> src/gui/harness.rs:101:9
    |
101 |         h.frames = var("METAL_GUI_FRAMES").and_then(|v| v.to_string_lossy().parse().ok());
    |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    |
note: consider initializing the variable with `gui::harness::Harness { frames: var("METAL_GUI_FRAMES").and_then(|v| v.to_string_lossy().parse().ok()), shot_dir: var("METAL_GUI_SHOT_DIR").map(PathBuf::from), shot_frames: var("METAL_GUI_SHOT_FRAMES")
                  .map(|v| parse_list(&v, |p| p.trim().parse().ok()))
                  .unwrap_or_default(), keys: var("METAL_GUI_KEYS")
                  .map(|v| {
                      parse_list(&v, |p| {
                          let (a, b) = p.trim().split_once(':')?;
                          Some(KeyTap {
                              frame: a.parse().ok()?,
                              code: b.parse().ok()?,
                          })
                      })
                  })
                  .unwrap_or_default(), holds: var("METAL_GUI_HOLD")
                  .map(|v| {
                      parse_list(&v, |p| {
                          let mut it = p.trim().split(':');
                          let frame = it.next()?.parse().ok()?;
                          let code = it.next()?.parse().ok()?;
                          let len = it.next()?.parse().ok()?;
                          Some((frame, code, len))
                      })
                  })
                  .unwrap_or_default(), mouse: var("METAL_GUI_MOUSE")
                  .map(|v| {
                      parse_list(&v, |p| {
                          let mut it = p.trim().split(':');
                          let frame = it.next()?.parse().ok()?;
                          let x = it.next()?.parse().ok()?;
                          let y = it.next()?.parse().ok()?;
                          let hold_frames = it.next().and_then(|s| s.parse().ok()).unwrap_or(0);
                          Some(MouseAt {
                              frame,
                              x,
                              y,
                              hold_frames,
                          })
                      })
                  })
                  .unwrap_or_default(), text: var("METAL_GUI_TEXT").and_then(|v| {
                  let v = v.to_string_lossy().into_owned();
                  let (frame, text) = v.split_once(':')?;
                  Some((frame.trim().parse().ok()?, text.to_string()))
              }), close_frame: var("METAL_GUI_CLOSE").and_then(|v| v.to_string_lossy().parse().ok()), name: std::env::current_exe()
                  .ok()
                  .and_then(|p| p.file_stem().map(|s| s.to_string_lossy().into_owned()))
                  .unwrap_or_else(|| "example".to_string()) }` and removing relevant reassignments
   --> src/gui/harness.rs:100:9
    |
100 |         let mut h = Harness::default();
    |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    = help: for further information visit https://rust-lang.github.io/rust-clippy/rust-1.100.0/index.html#field_reassign_with_default
    = note: `-D clippy::field-reassign-with-default` implied by `-D warnings`
    = help: to override `-D warnings` add `#[allow(clippy::field_reassign_with_default)]`

error: could not compile `metal_todo_app_hagul` (bin "metal_todo_app_hagul") due to 1 previous error
warning: build failed, waiting for other jobs to finish...
error: could not compile `metal_todo_app_hagul` (bin "metal_todo_app_hagul" test) due to 1 previous error
```

