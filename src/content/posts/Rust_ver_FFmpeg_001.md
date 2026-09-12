---
title: Rust_ver_FFmpeg_001
published: 2026-09-12
description: 'Rust version of FFmpeg 001'
image: ''
tags: [ffmpeg]
category: 'rust_Projects'
draft: false 
lang: ''
---

# Rust version of FFmpeg

- Yes. If you're designing a Rust version of FFmpeg, I would organize codecs by **codec/format family**, rather than putting everything into one large `codec.rs`.

- A structure like this works well:

```bash
src/
└── codec/
    ├── mod.rs
    │
    ├── audio/
    │   ├── mod.rs
    │   ├── pcm.rs
    │   ├── aac.rs
    │   ├── mp3.rs
    │   ├── opus.rs
    │   ├── vorbis.rs
    │   ├── flac.rs
    │   └── ac3.rs
    │
    └── video/
        ├── mod.rs
        ├── h264.rs
        ├── h265.rs
        ├── vp8.rs
        ├── vp9.rs
        ├── av1.rs
        └── mpeg2.rs
```

### Common codecs to implement

#### Audio

| Rust file   | Codec                | Type               |
| ----------- | -------------------- | ------------------ |
| `pcm.rs`    | PCM                  | Uncompressed audio |
| `aac.rs`    | AAC                  | Lossy audio        |
| `mp3.rs`    | MP3                  | Lossy audio        |
| `opus.rs`   | Opus                 | Lossy audio        |
| `vorbis.rs` | Vorbis               | Lossy audio        |
| `flac.rs`   | FLAC                 | Lossless audio     |
| `ac3.rs`    | AC-3 / Dolby Digital | Lossy audio        |
| `eac3.rs`   | E-AC-3               | Lossy audio        |
| `alac.rs`   | ALAC                 | Lossless audio     |

#### Video

| Rust file   | Codec         | Type        |
| ----------- | ------------- | ----------- |
| `h264.rs`   | H.264 / AVC   | Lossy video |
| `h265.rs`   | H.265 / HEVC  | Lossy video |
| `mpeg1.rs`  | MPEG-1 Video  | Lossy video |
| `mpeg2.rs`  | MPEG-2 Video  | Lossy video |
| `mpeg4.rs`  | MPEG-4 Part 2 | Lossy video |
| `vp8.rs`    | VP8           | Lossy video |
| `vp9.rs`    | VP9           | Lossy video |
| `av1.rs`    | AV1           | Lossy video |
| `theora.rs` | Theora        | Lossy video |

### If you're trying to reproduce FFmpeg's architecture

I'd actually go one step further:

```bash
src/
├── codec/
│   ├── mod.rs
│   │
│   ├── audio/
│   │   ├── mod.rs
│   │   ├── pcm.rs
│   │   ├── aac.rs
│   │   ├── mp3.rs
│   │   └── opus.rs
│   │
│   └── video/
│       ├── mod.rs
│       ├── h264.rs
│       ├── h265.rs
│       └── av1.rs
│
├── format/
│   ├── mod.rs
│   ├── mp4.rs
│   ├── mkv.rs
│   ├── avi.rs
│   ├── mov.rs
│   ├── flv.rs
│   └── wav.rs
│
├── bitstream/
│   ├── mod.rs
│   ├── reader.rs
│   └── writer.rs
│
├── frame/
│   ├── mod.rs
│   ├── audio.rs
│   └── video.rs
│
├── packet.rs
├── decoder.rs
└── encoder.rs
```

- The important distinction is:

```text
                  FFmpeg-like library
                         │
          ┌──────────────┴──────────────┐
          │                             │
       CODECS                         FORMATS
          │                             │
    ┌─────┴─────┐                 ┌─────┴─────┐
    │           │                 │           │
  Audio       Video              MP4        MKV
    │           │
  AAC         H.264
  MP3         H.265
  Opus        AV1
  FLAC        VP9
```

So:

```bash
src/codec/aac.rs
```

- means **AAC codec implementation**.

```bash
src/codec/h264.rs
```

- means **H.264 codec implementation**.

- But:

```bash
src/format/mp4.rs
```

- means **MP4 container/muxer/demuxer**, which is different from H.264.
  - For example, an MP4 file might contain:

```text
movie.mp4
│
├── Container: MP4
│
├── Video stream
│   └── Codec: H.264
│
└── Audio stream
    └── Codec: AAC
```

- So if you're building this from scratch, I'd recommend implementing them in roughly this order:

```text
1. PCM
2. WAV container
3. MP3
4. AAC
5. H.264
6. MP4
7. H.265
8. VP9
9. AV1
10. MKV
```

- **PCM → AAC/MP3 → H.264 → MP4** is a particularly good progression because it takes you from a very simple codec to a sophisticated video codec and then to a container combining audio + video.

