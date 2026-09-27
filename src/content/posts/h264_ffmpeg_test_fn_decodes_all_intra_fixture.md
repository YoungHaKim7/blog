---
title: h264_ffmpeg_test_fn_decodes_all_intra_fixture
published: 2026-09-16
description: 'ffmpeg / test) fn decodes_all_intra_fixture '
image: ''
tags: [ffmpeg]
category: 'rust_Projects'
draft: false 
lang: ''
---

# link

- https://github.com/YoungHaKim7/ffmpeg_rs
  - https://github.com/YoungHaKim7/ffmpeg_rs/blob/main/src/codec/video/h264.rs#L3707-L3758


# `std::fs::read` test pattern

- The main compile error is this line:

```rust
std::read_env(&path)
```

There is no `std::read_env`. You want `std::fs::read`.

I would also simplify `std::format!` to `format!`, and use `ref_data` instead of `_ref` since the data is actually used.

```rust
#[test]
fn decodes_all_intra_fixture() {
    // H264_TEST=/path.h264 to decode another fixture; the reference
    // YUV is looked up as /tmp/h264_ref_*.yuv alongside a matching
    // -skip_loop_filter all decode.
    let path =
        std::env::var("H264_TEST").unwrap_or_else(|_| "/tmp/h264_alli.h264".into());

    let Ok(_data) = std::fs::read(&path) else {
        eprintln!("skip: no {path} fixture");
        return;
    };

    let frames = decode_file(&path);

    eprintln!("H264 WIP: decoded {} frames", frames.len());

    let Some(fr0) = frames.first() else {
        return;
    };

    let (w, h) = (fr0.width as usize, fr0.height as usize);

    let stem = path
        .trim_start_matches("/tmp/h264_")
        .trim_end_matches(".h264");

    let ref_path = format!("/tmp/h264_ref_{stem}_nolf.yuv");

    let Ok(ref_data) = std::fs::read(&ref_path) else {
        eprintln!("skip: no {ref_path} reference");
        return;
    };

    let plane = |fr: &Frame, p: usize| fr.plane(p).to_vec();

    // YUV420p = Y + U + V
    //
    // Y: w * h
    // U: w/2 * h/2 = w * h / 4
    // V: w/2 * h/2 = w * h / 4
    // Total: w * h * 3 / 2
    let frame_size = w * h * 3 / 2;

    for (idx, fr) in frames.iter().enumerate() {
        let y = plane(fr, 0);
        let u = plane(fr, 1);
        let v = plane(fr, 2);

        let off = idx * frame_size;

        if off + frame_size > ref_data.len() {
            break;
        }

        let mut maxd = 0i32;

        let mut cmp = |ours: &[u8], rp: usize| {
            for k in 0..ours.len() {
                let r = ref_data[rp + k] as i32;
                let diff = (ours[k] as i32 - r).abs();
                maxd = maxd.max(diff);
            }
        };

        // Y plane
        cmp(&y, off);

        // U plane
        cmp(&u, off + w * h);

        // V plane
        cmp(&v, off + w * h + w * h / 4);

        eprintln!(
            "H264 FRAME {idx}: max pixel diff = {maxd}"
        );

        if std::env::var_os("H264_DUMP").is_some() && idx == 0 {
            let mut out = Vec::new();

            out.extend_from_slice(&y);
            out.extend_from_slice(&u);
            out.extend_from_slice(&v);

            let _ = std::fs::write("/tmp/h264_ours.yuv", out);
        }

        eprintln!(
            "H264 FRAME {idx}: \
             (reconstruction WIP — assert turns on at <= 8)"
        );
    }
}
```

### The important fix

Your original code:

```rust
let Ok(_data) = std::read_env(&path) else {
```

should be:

```rust
let Ok(_data) = std::fs::read(&path) else {
```

The relevant `std` APIs are:

```text
std
├── env
│   ├── var()
│   └── var_os()
│
├── fs
│   ├── read()
│   └── write()
│
└── format!()
```

So:

```rust
std::env::var("H264_TEST")
std::fs::read(&path)
std::env::var_os("H264_DUMP")
std::fs::write("/tmp/h264_ours.yuv", out)
```

One other small point: `format!` is normally written simply as:

```rust
let ref_path = format!("/tmp/h264_ref_{stem}_nolf.yuv");
```

rather than:

```rust
std::format!("/tmp/h264_ref_{stem}_nolf.yuv");
```

- Both are related to the standard library macro, but the idiomatic Rust form is `format!`.
