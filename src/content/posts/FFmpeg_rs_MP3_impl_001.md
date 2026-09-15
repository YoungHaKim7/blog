---
title: FFmpeg_rs_MP3_impl_001
published: 2026-09-15
description: 'mp3 구현 중. Ffmpeg C언어로 된거 러스트로 변환 중. (mp3)파트 만드는 중 001'
image: ''
tags: [rust, mp3, ffmpeg]
category: 'rust_Projects'
draft: false 
lang: ''
---

# link
- [자세히 정리는 여기 부분 참고](#67-what-i-recommend-you-learn-first)

# MP3구현 중 공부 01일차

### 공부 순서

```txt
01. MP3 frame format
        ↓
02. MPEG audio header
        ↓
03. GetBits
        ↓
04. GranuleDef
        ↓
05. Bit reservoir
        ↓
06. Scale factors
        ↓
07. Huffman coding
        ↓
08. Requantization
        ↓
09. Stereo
        ↓
10. Reordering
        ↓
11. Antialias
        ↓
12. IMDCT
        ↓
13. DCT32
        ↓
14. Polyphase synthesis
        ↓
15. Mp3Decoder API
```

- [자세히 정리는 여기 부분 참고](#67-what-i-recommend-you-learn-first)

# MP3 Layer III decoder

> **This file implements an MP3 Layer III decoder, not an MP3 encoder.**

The file itself explicitly maps the Rust implementation to FFmpeg's `mpegaudiodec_template.c`, and its pipeline is:

```text
MP3 bytes
   │
   ▼
┌──────────────────┐
│  MPEG header     │  ← 4 bytes
└────────┬─────────┘
         ▼
┌──────────────────┐
│   Side information│
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Bit reservoir    │
│ + main data      │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Scale factors    │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Huffman decode   │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Requantization   │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Stereo processing│
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Reordering       │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Antialias        │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ IMDCT            │
└────────┬─────────┘
         ▼
┌──────────────────┐
│ Polyphase/DCT32  │
│ synthesis        │
└────────┬─────────┘
         ▼
     PCM f32
```

This exact pipeline is documented in your source: scale factors → exponents → Huffman requantization → stereo → reorder → antialias → IMDCT → synthesis. 

---

# 1. First: understand what "implement MP3" means

There are actually two very different projects:

```text
                 MP3 implementation
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
           Decoder              Encoder
              │                   │
        MP3 → PCM             PCM → MP3
```

Your uploaded file is:

```text
MP3 → PCM
```

Specifically:

```text
MP3 Layer III
      ↓
 compressed spectral data
      ↓
 Huffman
      ↓
 requantization
      ↓
 frequency-domain samples
      ↓
 IMDCT
      ↓
 subband synthesis
      ↓
 PCM f32
```

So if your goal is **"I want to understand how to build MP3 support in my FFmpeg-in-Rust project"**, this is an excellent decoder to study first.

The source even states that Layer 1 and Layer 2 are intentionally not implemented; this is specifically the Layer 3/MP3 portion. 

---

# 2. The source file is organized into major sections

Your 4,207-line file can be mentally divided like this:

```text
mp3.rs
│
├── 1. Imports
│
├── 2. Mathematical constants
│
├── 3. MP3 constants
│
├── 4. MP3 lookup tables
│
├── 5. Huffman tables
│
├── 6. Bitstream reader
│
├── 7. Granule representation
│
├── 8. Decoder state
│
├── 9. MP3 header parser
│
├── 10. Runtime-generated tables
│
├── 11. IMDCT
│
├── 12. DCT32
│
├── 13. Polyphase synthesis
│
├── 14. Scale-factor decoding
│
├── 15. Huffman decoding
│
├── 16. Stereo decoding
│
├── 17. Antialias
│
├── 18. Layer III decoding
│
├── 19. Frame decoding
│
├── 20. AudioDecoder implementation
│
└── 21. Tests
```

The important point is that **you should not read the file from line 1 to line 4207 as if it were ordinary application code**.

The huge arrays are data. The interesting algorithms are much smaller.

---

# 3. Lines 1–3: module documentation

Your file begins:

```rust
//! MP3 (MPEG audio layer 3) float decoder — port of the `libavcodec`
//! mpegaudio decode family, **float** variant
//! (`mpegaudiodec_float.c` = `mpegaudiodec_template.c` with `USE_FLOATS 1`).
```

The `//!` means:

```text
//!
//! module-level documentation
```

rather than documentation for the following function.

The important information is:

```text
MP3
 │
 └── MPEG Audio Layer III
```

and:

```text
float decoder
```

meaning the decoded samples are ultimately represented as `f32`.

The source also explicitly says that the output format is planar floating point (`FLTP`). 

---

# 4. The C → Rust mapping is extremely important

The next documentation table tells you where the implementation came from.

For example:

```text
C:
ff_mpa_check_header

Rust:
ff_mpa_check_header
```

and:

```text
C:
huffman_decode

Rust:
MpaDecodeCore::huffman_decode
```

and:

```text
C:
compute_imdct

Rust:
MpaDecodeCore::compute_imdct
```

and:

```text
C:
decode_frame

Rust:
Mp3Decoder::decode_frame
```

This is extremely useful when implementing your own FFmpeg clone because it gives you a roadmap:

```text
FFmpeg C implementation
        │
        ├── header
        ├── tables
        ├── bit reader
        ├── granule
        ├── Huffman
        ├── IMDCT
        ├── synthesis
        └── decoder API
                │
                ▼
             Rust
```

Your source explicitly documents these mappings. 

---

# 5. The most important MP3 concept: a frame

The documentation says:

```text
A frame is:

[4-byte header][side info][main data]
```

This is fundamental.

Think of an MP3 file as:

```text
MP3 file
│
├── Frame 0
│   ├── Header
│   ├── Side information
│   └── Main data
│
├── Frame 1
│   ├── Header
│   ├── Side information
│   └── Main data
│
├── Frame 2
│   └── ...
│
└── ...
```

The frame header tells the decoder things such as:

```text
MPEG version
Layer
bitrate
sample rate
channel mode
padding
```

The side information tells it how the compressed spectral data should be interpreted.

The main data contains the actual compressed audio information.

---

# 6. MP3 is not simply "Huffman decode → PCM"

A common beginner misconception is:

```text
MP3
 ↓
Huffman
 ↓
PCM
```

That's incorrect.

The actual process is much more complicated:

```text
             MP3
              │
              ▼
        MPEG header
              │
              ▼
        Side information
              │
              ▼
       Bit reservoir
              │
              ▼
        Scale factors
              │
              ▼
       Huffman symbols
              │
              ▼
      Requantized spectrum
              │
              ▼
       Stereo processing
              │
              ▼
       Frequency reorder
              │
              ▼
          Antialias
              │
              ▼
            IMDCT
              │
              ▼
       Subband samples
              │
              ▼
          DCT32
              │
              ▼
       synthesis window
              │
              ▼
             PCM
```

That entire sequence is represented in your implementation. 

---

# 7. Imports

Your code has:

```rust
use crate::{
    codec::{
        packet::Packet,
        params::{CodecId, CodecParameters, MediaType},
        traits::AudioDecoder,
    },
    util::{
        audio_frame::AudioFrame,
        channel_layout::ChannelLayout,
        error::{Error, Result},
        samplefmt::SampleFormat,
    },
};
```

Let's go line by line.

### `Packet`

```rust
packet::Packet::Packet
```

A compressed MP3 frame enters the decoder as a `Packet`.

Conceptually:

```text
file/demuxer
     │
     ▼
  Packet
     │
     ▼
 Mp3Decoder
```

---

### `CodecId`

```rust
CodecId
```

Identifies the codec:

```rust
CodecId::Mp3
```

Your decoder later checks:

```rust
match params.codec_id {
    CodecId::Mp3 => {}
    ...
}
```

So the codec framework knows:

```text
CodecId::Mp3
      ↓
Mp3Decoder
```

---

### `CodecParameters`

```rust
CodecParameters
```

Contains information such as:

```text
codec ID
sample rate
bit rate
channel layout
sample format
frame size
```

---

### `AudioDecoder`

```rust
traits::AudioDecoder
```

This is your framework abstraction.

Your MP3 decoder must implement:

```rust
trait AudioDecoder
```

with operations like:

```text
init()
send_packet()
receive_frame()
```

This is very similar conceptually to FFmpeg's:

```c
avcodec_send_packet()
avcodec_receive_frame()
```

---

### `AudioFrame`

This is the decoded PCM container.

So:

```text
Packet
   ↓
MP3 decoder
   ↓
AudioFrame
```

---

# 8. `OnceLock<Tables>`

You have:

```rust
static TABLES: std::sync::OnceLock<Tables> = std::sync::OnceLock::new();
```

This is a very important Rust design choice.

MP3 decoding requires many lookup tables.

Instead of constructing them every time:

```text
decode frame
    ↓
build tables ❌
    ↓
decode
```

you construct them once:

```text
first decode
    ↓
build tables
    ↓
cache Tables
```

then:

```text
second decode
    ↓
reuse Tables
```

So:

```text
                  ┌───────────────┐
                  │    Tables     │
                  │               │
                  │ Huffman       │
                  │ IMDCT window  │
                  │ exponent LUT  │
                  │ synthesis LUT │
                  └───────▲───────┘
                          │
                     OnceLock
                          │
          ┌───────────────┼───────────────┐
          │               │               │
       frame 0         frame 1         frame 2
```

This is a good Rust replacement for FFmpeg's static initialization machinery.

---

# 9. `EXP2_LUT`

```rust
const EXP2_LUT: [f64; 4] = [
    1.00000000000000000000,
    1.18920711500272106672,
    std::f64::consts::SQRT_2,
    1.68179283050742908606,
];
```

These correspond approximately to:

```text
2^0
2^(1/4)
2^(2/4)
2^(3/4)
```

or:

```text
2^0
2^0.25
2^0.5
2^0.75
```

Why?

MP3 requantization uses powers of two involving quarter-octave steps.

Instead of calculating:

```rust
2f64.powf(x)
```

every time, a table can be used.

This is a classic codec optimization:

```text
expensive calculation
       ↓
precompute
       ↓
lookup table
```

---

# 10. IMDCT constants

For example:

```rust
const I12_C3: f32 = fx(0.86602540378443864676 / 2.0);
```

and:

```rust
const I12_C4: f32 = fx(0.70710678118654752439 / 2.0);
```

These constants are used by the 12-point IMDCT.

The important thing is not to memorize these numbers.

Understand their origin:

```text
trigonometric formula
       ↓
factorization
       ↓
constant
       ↓
fast IMDCT
```

Instead of calculating lots of `sin()`/`cos()` operations while decoding, the implementation factors the transform and uses precomputed constants.

---

# 11. MP3 fundamental constants

You have:

```rust
pub const MPA_MAX_CHANNELS: usize = 2;
```

MP3 here supports:

```text
left
right
```

so:

```text
0 = left
1 = right
```

Then:

```rust
pub const SBLIMIT: usize = 32;
```

This is one of the most important MP3 numbers.

MP3 uses:

```text
32 subbands
```

Conceptually:

```text
frequency spectrum

0 Hz
│
├── subband 0
├── subband 1
├── subband 2
│
│ ...
│
└── subband 31
```

Then:

```rust
pub const MPA_FRAME_SIZE: usize = 1152;
```

For normal MPEG-1 Layer III:

```text
1152 samples/channel/frame
```

while MPEG-2/2.5 Layer III uses:

```text
576 samples/channel/frame
```

The decoder later chooses between these based on `lsf`. 

---

# 12. Bit reservoir

This is another extremely important MP3 concept.

Your source defines:

```rust
pub const BACKSTEP_SIZE: usize = 512;
```

and:

```rust
const LAST_BUF_SIZE: usize =
    2 * BACKSTEP_SIZE + EXTRABYTES;
```

The reason is that MP3 frames can borrow compressed data from previous frames.

Conceptually:

```text
Frame N-1
┌─────────────────────────────┐
│ main data                   │
│          ┌──────────────────┐
│          │                  │
└──────────┼──────────────────┘
           │
           │ reservoir
           ▼
Frame N
┌─────────────────────────────┐
│ header                      │
│ side info                   │
│ main data ←─────────────┐   │
└─────────────────────────┼───┘
                          │
                    previous data
```

The field:

```text
main_data_begin
```

says how far backward the decoder must look.

Your source explicitly explains that `main_data_begin` points into the previous-frame bit reservoir. 

This is one of the biggest reasons an MP3 decoder needs state across frames.

---

# 13. The `GranuleDef` structure

This is one of the most important structs in the entire file.

```rust
struct GranuleDef {
    scfsi: u8,
    part2_3_length: i32,
    big_values: i32,
    global_gain: i32,
    scalefac_compress: i32,
    block_type: u8,
    switch_point: u8,
    table_select: [i32; 3],
    subblock_gain: [i32; 3],
    scalefac_scale: u8,
    count1table_select: u8,
    region_size: [i32; 3],
    preflag: i32,
    short_start: i32,
    long_end: i32,
    scale_factors: [u8; 40],
    sb_hybrid: Box<[f32; SBLIMIT * 18]>,
}
```



This structure represents the compressed information for **one granule**.

Think:

```text
MP3 frame
│
├── channel 0
│   ├── granule 0
│   └── granule 1
│
└── channel 1
    ├── granule 0
    └── granule 1
```

for MPEG-1 stereo.

That's why the core has:

```rust
granules: [[GranuleDef; 2]; 2],
```

which means:

```text
[channel][granule]
```

---

# 14. `part2_3_length`

```rust
part2_3_length: i32,
```

This tells us how many bits are occupied by:

```text
part 2
+
part 3
```

where roughly:

```text
part 2 = scale factors
part 3 = Huffman-coded spectral data
```

This is crucial because Huffman decoding must not consume bits beyond the granule's allowed region.

---

# 15. `big_values`

```rust
big_values: i32,
```

MP3's Huffman-coded spectral data has two major portions.

```text
576 spectral values

┌────────────────────────────┐
│ big_values region           │
├────────────────────────────┤
│ count1 / quadruple region   │
└────────────────────────────┘
```

`big_values` tells the decoder how many Huffman pairs belong to the first region.

The decoder validates:

```rust
if big_values > 288 {
    return Err(Error::InvalidData("big_values too big".into()));
}
```

because each big-value Huffman symbol represents a pair.

```text
288 pairs × 2
       =
576 spectral lines
```

---

# 16. `global_gain`

```rust
global_gain: i32,
```

This controls the overall scale of the reconstructed spectral coefficients.

Later:

```rust
let gain = g.global_gain - 210;
```

is used during exponent calculation. 

Think of it as a coarse amplitude control:

```text
Huffman symbol
     │
     ▼
base spectral magnitude
     │
     +
global_gain / scalefactor
     │
     ▼
final spectral magnitude
```

---

# 17. `block_type`

```rust
block_type: u8,
```

This determines whether the granule uses:

```text
long block
short block
mixed block
```

Short blocks are especially important for transient signals.

For example:

```text
steady tone

████████████████████
        ↓
     long block
```

but:

```text
drum hit

█████
  ▲
transient
  ↓
short blocks
```

Short blocks divide the frequency transform into three smaller transforms.

The source later has:

```rust
imdct36()
```

for long blocks and:

```rust
imdct12()
```

for short blocks.

---

# 18. `sb_hybrid`

This field:

```rust
sb_hybrid: Box<[f32; SBLIMIT * 18]>,
```

is:

```text
32 × 18 = 576
```

floating-point values.

So:

```text
sb_hybrid[576]
```

represents the 576 spectral coefficients of one granule.

This is a key intermediate buffer:

```text
Huffman
   ↓
sb_hybrid[576]
   ↓
stereo
   ↓
reorder
   ↓
antialias
   ↓
IMDCT
```

---

# 19. `MpaDecodeCore`

Now we reach the actual decoder state:

```rust
struct MpaDecodeCore {
    header: MpaDecodeHeader,
    last_buf: Vec<u8>,
    last_buf_size: usize,
    bs: Bitstream,
    synth_buf: [Vec<f32>; MPA_MAX_CHANNELS],
    synth_buf_offset: [usize; MPA_MAX_CHANNELS],
    sb_samples: [[f32; 36 * SBLIMIT]; MPA_MAX_CHANNELS],
    mdct_buf: [[f32; SBLIMIT * 18]; MPA_MAX_CHANNELS],
    granules: [[GranuleDef; 2]; 2],
    dither_state: i32,
    crc: u32,
}
```



This is essentially the MP3 decoder's **machine state**.

You can visualize it as:

```text
MpaDecodeCore
│
├── header
│
├── last_buf
│      └── MP3 bit reservoir
│
├── bs
│      └── bitstream reader
│
├── synth_buf
│      └── synthesis filter state
│
├── sb_samples
│      └── subband samples
│
├── mdct_buf
│      └── previous IMDCT data
│
├── granules
│      └── compressed granule state
│
├── dither_state
│
└── crc
```

This is much more useful to remember than individual lines.

---

# 20. Why `MpaDecodeCore` exists separately from `Mp3Decoder`

This is a very good architecture.

```text
Mp3Decoder
│
├── API/framework concerns
│
│   init()
│   send_packet()
│   receive_frame()
│
└── MpaDecodeCore
    │
    ├── MP3 header
    ├── bit reservoir
    ├── Huffman
    ├── IMDCT
    ├── synthesis
    └── decoder state
```

In other words:

```text
Mp3Decoder
    = FFmpeg-like codec interface

MpaDecodeCore
    = actual MP3 algorithm
```

That separation will be very useful when you add:

```text
AAC
H264
PCM
FLAC
...
```

to your Rust FFmpeg project.

---

# 21. `MpaDecodeCore::new()`

The constructor:

```rust
fn new() -> MpaDecodeCore {
    MpaDecodeCore {
        header: MpaDecodeHeader::default(),
        last_buf: vec![0; LAST_BUF_SIZE],
        last_buf_size: 0,
        ...
    }
}
```

initializes all persistent state.

The important part:

```rust
last_buf: vec![0; LAST_BUF_SIZE],
```

allocates the bit reservoir.

And:

```rust
sb_samples: [[0.0; 36 * SBLIMIT]; MPA_MAX_CHANNELS],
```

allocates:

```text
2 × 1152-ish DSP state
```

for stereo processing.

---

# 22. `flush()`

```rust
fn flush(&mut self) {
    for ch in 0..MPA_MAX_CHANNELS {
        self.synth_buf[ch].fill(0.0);
    }

    self.mdct_buf = [[0.0; SBLIMIT * 18]; MPA_MAX_CHANNELS];

    self.last_buf_size = 0;
    self.dither_state = 0;
}
```

This is important because MP3 decoding is stateful.

If you seek/reset:

```text
old stream state
      ↓
    flush()
      ↓
new stream
```

Otherwise old IMDCT/synthesis/reservoir state could contaminate the new stream.

The source maps this directly to FFmpeg's `mp_flush`. 

---

# 23. MP3 header parsing

The function:

```rust
pub fn ff_mpa_check_header(header: u32) -> Result<()>
```

checks the 32-bit MPEG audio header.

The first test:

```rust
if (header & 0xffe0_0000) != 0xffe0_0000 {
```

checks the synchronization bits.

Conceptually:

```text
32-bit MP3 header

11111111111  MPEG version  layer ...
^^^^^^^^^^^
sync
```

The sync bits tell us:

> "This looks like the beginning of an MPEG audio frame."

If they're wrong:

```rust
return Err(Error::InvalidData("invalid frame sync".into()));
```

The function then validates:

```text
version
layer
bitrate
sample rate
```

The exact checks are in the uploaded source. 

---

# 24. Decode the header

Then:

```rust
pub fn avpriv_mpegaudio_decode_header(
    s: &mut MpaDecodeHeader,
    header: u32
) -> Result<bool>
```

turns the packed 32-bit header into a Rust structure.

The structure is:

```rust
pub struct MpaDecodeHeader {
    pub frame_size: i32,
    pub error_protection: i32,
    pub layer: i32,
    pub sample_rate: i32,
    pub sample_rate_index: i32,
    pub bit_rate: i32,
    pub nb_channels: i32,
    pub mode: i32,
    pub mode_ext: i32,
    pub lsf: i32,
}
```



So this:

```text
0xFF FB 90 64
```

gets transformed into something conceptually like:

```text
MpaDecodeHeader {
    layer: 3,
    sample_rate: 44100,
    bit_rate: 128000,
    nb_channels: 2,
    ...
}
```

---

# 25. Frame size calculation

This code is extremely important:

```rust
frame_size = (frame_size * 144000) / (sample_rate << s.lsf);
frame_size += padding;
```

For normal MPEG-1 Layer III, this essentially corresponds to:

```text
frame_size =
    floor(144 × bitrate / sample_rate)
    + padding
```

where bitrate is in bits/sec after the appropriate scaling.

For example:

```text
128 kbps
44.1 kHz
```

gives approximately:

```text
144 × 128000 / 44100
≈ 417.96
```

so MP3 frames alternate around:

```text
417 bytes
418 bytes
```

depending on padding.

That is why an MP3 parser cannot simply assume:

```text
every frame = same number of bytes
```

---

# 26. Runtime-generated tables

This:

```rust
fn tables() -> &'static Tables {
    TABLES.get_or_init(build_tables)
}
```

means:

```text
if tables don't exist
        ↓
 build_tables()

if they already exist
        ↓
 reuse them
```

Then:

```rust
fn build_tables() -> Tables
```

constructs:

```text
band_index_long
exp_table
expval_table
table_4_3_exp
table_4_3_value
mdct_win
synth_window
is_table_lsf
huff_vlc
huff_quad
```



This is effectively the MP3 decoder's mathematical "ROM".

---

# 27. Why lookup tables matter

Consider:

```rust
table_4_3_value
```

MP3 uses a nonlinear power function approximately related to:

$$
|x|^{4/3}
$$

Doing that with floating-point `pow()` for every spectral coefficient would be expensive.

Instead:

```text
x
│
▼
lookup table
│
▼
approximate x^(4/3)
```

This is a classic codec implementation technique.

The helper:

```rust
fn l3_unscale(value: i64, exponent: i32) -> i32
```

uses this table. 

---

# 28. `GetBits`: probably the most useful function to study first

Before deeply studying Huffman decoding, understand:

```rust
struct GetBits {
    buf: Vec<u8>,
    index: i64,
    size_in_bits: i64,
}
```

This is your bit reader.

MP3 is **not byte-oriented internally**.

It contains fields such as:

```text
9 bits
12 bits
8 bits
1 bit
5 bits
3 bits
...
```

Therefore:

```rust
get_bits(9)
```

must read exactly nine bits.

---

# 29. `get_bits1()`

```rust
fn get_bits1(&mut self) -> u32 {
    let v = self.bit(self.index);
    self.index = (self.index + 1).min(self.cap());
    v
}
```

Conceptually:

```text
before:

index
 ↓
101101001...
 ^
 next bit

get_bits1()
    ↓

returns 1
    ↓
index += 1
```

---

# 30. `get_bits(n)`

```rust
fn get_bits(&mut self, n: u32) -> u32 {
    if n == 0 {
        return 0;
    }

    let mut v = 0u32;

    for k in 0..n {
        v = (v << 1) | self.bit(self.index + k as i64);
    }

    self.index = (self.index + n as i64).min(self.cap());
    v
}
```

This is essentially:

```text
read bits one by one

1011

v = 0

read 1:
v = 1

read 0:
v = 10

read 1:
v = 101

read 1:
v = 1011
```

Mathematically:

$$
v_{new} = (v_{old} \ll 1) \;|\; bit
$$

This is the foundation of the entire decoder.

---

# 31. BigVlc

Then:

```rust
struct BigVlc {
    by_len: Vec<Vec<(u32, i32)>>,
    max_len: u32,
}
```

This represents the MP3 Huffman tables.

MP3 does not store spectral coefficients directly.

Instead:

```text
spectral values
     ↓
Huffman compression
     ↓
variable-length bit patterns
```

The decoder reverses that:

```text
bits
 ↓
Huffman code
 ↓
symbol
 ↓
(x, y)
```

---

# 32. Why the symbol is packed

The table contains values such as:

```rust
0x11
0x01
0x10
0x00
```

The documentation says:

```text
(x << 4) | y
```

So:

```text
0x31
```

means:

```text
x = 3
y = 1
```

These represent a pair:

```text
(x, y)
```

of spectral magnitudes.

---

# 33. Huffman decoding

The core:

```rust
fn decode(&self, gb: &mut GetBits) -> i32 {
    let mut code: u32 = 0;

    for len in 1..=self.max_len as usize {
        let b = gb.get_bits1();

        code = (code << 1) | b;

        if let Ok(idx) =
            self.by_len[len].binary_search_by_key(
                &code,
                |&(c, _)| c
            )
        {
            return self.by_len[len][idx].1;
        }
    }

    -1
}
```

This is beautifully illustrative.

Suppose the bitstream contains:

```text
101101...
```

The decoder progressively builds:

```text
1
10
101
1011
...
```

After each bit it asks:

```text
Does this prefix represent a valid Huffman symbol?
```

If yes:

```text
return symbol
```

This is how variable-length decoding works.

---

# 34. `huffman_decode()` is where MP3 starts becoming "real"

The function:

```rust
fn huffman_decode(
    bs: &mut Bitstream,
    g: &mut GranuleDef,
    exponents: &[i16; 576],
    end_pos2_in: i64,
)
```

takes:

```text
compressed bitstream
        +
granule configuration
        +
exponents
```

and produces:

```text
g.sb_hybrid[576]
```

The source explicitly describes this as reading the Huffman-coded residue into `sb_hybrid`. 

---

# 35. Requantization

Huffman decoding doesn't immediately produce the final floating-point sample.

For example:

```rust
g.sb_hybrid[s_index] = ...
```

eventually gets a value from:

```rust
t.expval_table[exponent][x]
```

This combines:

```text
Huffman magnitude
+
scale factor
+
global gain
```

into a floating-point spectral coefficient.

So:

```text
Huffman x
   │
   ▼
x^(4/3)
   │
   +
exponent
   │
   ▼
spectral coefficient
```

This is one of the most important MP3 concepts.

---

# 36. Scale factors → exponents

The function:

```rust
fn exponents_from_scale_factors(
    sri: i32,
    g: &GranuleDef,
    exponents: &mut [i16; 576],
)
```

converts compressed scale-factor information into 576 exponent values.

The central formula is:

```rust
let gain = g.global_gain - 210;
let shift = g.scalefac_scale as i32 + 1;
```

then:

```rust
let v0 =
    gain
    - ((g.scale_factors[i] as i32 + pretab[i] as i32) << shift)
    + 400;
```

Conceptually:

$$
E =
global\_gain
-
scale\_factor
+
constant
$$

These exponents control the amplitude of spectral coefficients.

---

# 37. Stereo processing

Your code has:

```rust
compute_stereo(
    self.header.mode_ext,
    lsf,
    sri,
    &mut self.granules,
    gr,
);
```

MP3 can encode stereo using different techniques.

The important one is **mid/side stereo**.

Instead of:

```text
Left
Right
```

the encoder can represent:

```text
Mid  = (Left + Right) / √2
Side = (Left - Right) / √2
```

Then the decoder reconstructs:

$$
L = \frac{M+S}{\sqrt{2}}
$$

$$
R = \frac{M-S}{\sqrt{2}}
$$

Your implementation also handles intensity stereo. The source identifies `compute_stereo` as implementing intensity and mid/side stereo. 

---

# 38. Reordering short blocks

```rust
fn reorder_block(sri: i32, g: &mut GranuleDef)
```

does nothing for long blocks:

```rust
if g.block_type != 2 {
    return;
}
```

For short blocks, the frequency coefficients are stored in an ordering optimized for compression.

They need to be rearranged before the IMDCT.

Conceptually:

```text
bitstream ordering

A A A A...
B B B B...
C C C C...

        ↓ reorder

A B C A B C A B C...
```

The implementation uses:

```rust
tmp: [f32; 576]
```

to perform that rearrangement. 

---

# 39. Antialias

After reordering:

```rust
compute_antialias(...)
```

is called.

This applies the alias-reduction butterflies between neighboring subbands.

Conceptually:

```text
subband N       subband N+1
   │                  │
   └──── butterfly ───┘
             ↓
      reduced aliasing
```

This is part of the MP3 hybrid filterbank.

---

# 40. IMDCT

Now we reach one of the mathematically most important parts.

The source has:

```rust
imdct12()
```

and:

```rust
imdct36()
```

The long-block transform is:

```text
18 spectral coefficients
       │
       ▼
    IMDCT-36
       │
       ▼
36 time-domain values
```

For short blocks:

```text
18 coefficients
      │
      ├── 6
      ├── 6
      └── 6
           ↓
three IMDCT-12 operations
```

The source explicitly describes this as 36-point IMDCT for long bands and three 12-point transforms for short blocks. 

---

# 41. Why IMDCT?

MP3 stores audio mostly in the frequency domain.

Eventually we need:

```text
frequency domain
       ↓
time domain
```

That's what the inverse modified discrete cosine transform does.

Very roughly:

$$
X[k] \rightarrow x[n]
$$

So:

```text
MP3 compressed spectrum
        │
        ▼
      IMDCT
        │
        ▼
time-domain subband signal
```

But we're not finished yet.

---

# 42. `imdct36()`

Your function begins:

```rust
fn imdct36(
    out: &mut [f32],
    out_off: usize,
    buf: &mut [f32],
    buf_off: usize,
    input: &mut [f32],
    win: &[f32],
)
```

Notice the many slices and offsets.

This is because the original C code operates on flat buffers with pointer arithmetic.

Rust translates that into:

```text
buffer
+
offset
+
slice
```

rather than raw pointer arithmetic.

The comment explains that `input` contains the 18 spectral lines and is modified in place. 

---

# 43. Prefix sums in IMDCT

For example:

```rust
let mut i = 17i32;
while i >= 1 {
    input[i as usize] += input[(i - 1) as usize];
    i -= 1;
}
```

This is an optimization/factorization of the transform.

Instead of implementing the IMDCT naively as:

```text
for n
    for k
        cos(...)
```

the code reorganizes the computation.

This is typical codec DSP code:

```text
naive mathematical transform
           ↓
factorization
           ↓
butterflies
           ↓
fewer multiplications
```

---

# 44. `imdct36_blocks()`

This function decides which window to use:

```rust
let win_idx = if switch_point && j < 2 {
    0
} else {
    block_type as usize
};
```

This is where MP3's block switching becomes visible in the DSP pipeline.

Then:

```rust
imdct36(...)
```

is called for every block.

---

# 45. DCT32

After the IMDCT, your code performs:

```rust
dct32(...)
```

This is another critical concept.

MP3 uses a **32-band polyphase synthesis filterbank**.

The function receives:

```rust
tab: &[f32]
```

containing:

```text
32 subband values
```

and produces:

```text
32 output values
```

The comment says exactly that:

```text
32 subband samples → 32 values
```



---

# 46. Why DCT32 exists

The pipeline is:

```text
Huffman coefficients
        ↓
requantization
        ↓
stereo
        ↓
reorder
        ↓
antialias
        ↓
IMDCT
        ↓
hybrid subband samples
        ↓
DCT32
        ↓
synthesis window
        ↓
PCM
```

So the IMDCT alone doesn't produce the final PCM stream.

You need the synthesis filterbank.

---

# 47. Butterfly macros

Inside `dct32()`:

```rust
macro_rules! bf {
    ($a:literal, $b:literal, $c:expr, $s:literal) => {{
        let tmp0 = val[$a] + val[$b];
        let tmp1 = val[$a] - val[$b];
        val[$a] = tmp0;
        val[$b] = mulh3(tmp1, $c, (1u32 << $s) as f32);
    }};
}
```

This is a Rust macro used to express repeated DSP operations.

Mathematically it resembles:

```text
a' = a + b
b' = (a - b) × coefficient
```

This is called a **butterfly**.

You'll see butterflies everywhere in:

```text
FFT
DCT
MDCT
IMDCT
codec DSP
```

---

# 48. `mpa_synth_filter()`

This is the final major DSP stage:

```rust
fn mpa_synth_filter(
    synth_buf: &mut [f32],
    synth_buf_offset: &mut usize,
    window: &[f32],
    dither_state: &mut i32,
    samples: &mut [f32],
    incr: usize,
    sb_samples: &[f32],
)
```

It performs:

```rust
dct32(...)
```

then:

```rust
apply_window(...)
```

The source summarizes it very clearly:

```text
32 subband samples
        ↓
DCT32
        ↓
window
        ↓
32 output samples
```



---

# 49. `apply_window()`

This is where the synthesis window is applied.

The important conceptual operation is:

$$
output[n] = \sum_k window[k] \cdot synthesis\_buffer[k]
$$

Your code performs many multiply-add operations:

```rust
sum += window[...] * synth_buf[...];
```

and:

```rust
sum -= window[...] * synth_buf[...];
```

This reconstructs the final PCM waveform.

---

# 50. Finally: `Mp3Decoder`

Now we get to the public decoder:

```rust
pub struct Mp3Decoder {
    core: MpaDecodeCore,
    params: CodecParameters,
    pending: Option<AudioFrame>,
    eof: bool,
}
```



This is your FFmpeg-like wrapper.

Think:

```text
                 Mp3Decoder
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
      core         pending       eof
        │
        ▼
 actual MP3 DSP
```

---

# 51. `Mp3Decoder::new()`

```rust
pub fn new() -> Self {
    let mut core = MpaDecodeCore::new();

    core.synth_buf =
        [vec![0.0; 512 * 2],
         vec![0.0; 512 * 2]];

    Mp3Decoder {
        core,
        params: CodecParameters::default(),
        pending: None,
        eof: false,
    }
}
```

The `synth_buf` is allocated per channel.

So:

```text
channel 0
    ↓
1024 f32

channel 1
    ↓
1024 f32
```

This is persistent synthesis-filter state.

---

# 52. `decode_frame()`

This is the high-level operation:

```rust
fn decode_frame(
    &mut self,
    pkt: &Packet
) -> Result<Option<AudioFrame>>
```

It does approximately:

```text
Packet
  │
  ├── skip leading zeros
  │
  ├── check size
  │
  ├── read 4-byte header
  │
  ├── decode header
  │
  ├── determine frame size
  │
  ├── decode Layer III
  │
  ├── allocate AudioFrame
  │
  ├── synthesis filter
  │
  └── return PCM
```

The relevant implementation is in the uploaded file. 

---

# 53. Reading the header

This line:

```rust
let header =
    u32::from_be_bytes(
        buf[..HEADER_SIZE]
            .try_into()
            .unwrap()
    );
```

takes:

```text
4 bytes

FF FB 90 64
```

and creates:

```text
u32
```

The use of:

```rust
from_be_bytes()
```

is important because the MPEG header is interpreted in big-endian bit order.

---

# 54. Calling the core

Eventually:

```rust
let nb_frames =
    self.core.mp_decode_frame(&buf[..frame_bytes])?;
```

This is the transition:

```text
Mp3Decoder
    │
    ▼
MpaDecodeCore
    │
    ▼
mp_decode_frame()
    │
    ▼
mp_decode_layer3()
```

The `mp_decode_layer3()` function then handles the actual MP3 Layer III algorithm.

---

# 55. The central function: `mp_decode_layer3()`

This is probably the **single most important function for you to study**.

Its structure is essentially:

```text
mp_decode_layer3()
│
├── read side information
│
├── determine main_data_begin
│
├── determine number of granules
│
├── for each granule
│   │
│   ├── read part2_3_length
│   ├── read big_values
│   ├── read global_gain
│   ├── read scalefac_compress
│   ├── read block information
│   ├── read Huffman table selection
│   ├── read region information
│   └── store GranuleDef
│
├── construct bit reservoir
│
├── for each granule
│   │
│   ├── read scale factors
│   ├── calculate exponents
│   ├── Huffman decode
│   ├── stereo
│   ├── reorder
│   ├── antialias
│   └── IMDCT
│
└── return number of synthesis blocks
```

This structure can be seen directly in the implementation. 

---

# 56. Side information

For MPEG-2/2.5:

```rust
main_data_begin =
    self.bs.gb.get_bits(8) as usize;
```

For MPEG-1:

```rust
main_data_begin =
    self.bs.gb.get_bits(9) as usize;
```

This difference is fundamental.

Then MPEG-1 stereo has:

```rust
nb_granules = 2;
```

while LSF versions use:

```rust
nb_granules = 1;
```

So:

```text
MPEG-1 Layer III

channel L: granule 0 + granule 1
channel R: granule 0 + granule 1


MPEG-2/2.5 Layer III

channel L: granule 0
channel R: granule 0
```

---

# 57. Reading `part2_3_length`

```rust
let part2_3_length =
    self.bs.gb.get_bits(12) as i32;
```

This means:

```text
read exactly 12 bits
```

and interpret them as:

```text
length of scale-factor + Huffman data
```

Then:

```rust
let big_values =
    self.bs.gb.get_bits(9) as i32;
```

reads another 9 bits.

Then:

```rust
let global_gain =
    self.bs.gb.get_bits(8) as i32;
```

reads another 8.

This illustrates why `GetBits` is so important.

---

# 58. Block splitting

This:

```rust
let blocksplit_flag =
    self.bs.gb.get_bits1();
```

determines whether the granule contains special block information.

If set:

```rust
let block_type =
    self.bs.gb.get_bits(2) as u8;
```

and:

```rust
let switch_point =
    self.bs.gb.get_bits1() as u8;
```

are read.

This eventually determines:

```text
long
short
mixed
```

transform processing.

---

# 59. Bit reservoir construction

After side information is parsed:

```rust
let byte_pos =
    (self.bs.gb.get_bits_count() >> 3) as usize;
```

moves from bits to bytes:

```text
bits / 8
```

Then data from the current frame is copied into:

```rust
self.last_buf
```

and:

```rust
self.bs.in_gb = Some(self.bs.gb.clone());
```

saves the current reader.

Then:

```rust
self.bs.gb =
    GetBits::init(
        self.last_buf[.....].to_vec(),
        reservoir_bits,
    );
```

creates a reader over:

```text
previous reservoir + current main data
```

This is the key mechanism allowing:

```text
Frame N
```

to read compressed data that physically appeared in:

```text
Frame N-1
```

---

# 60. `switch_buffer()`

The helper:

```rust
fn switch_buffer(
    bs: &mut Bitstream,
    pos: &mut i64,
    end_pos: &mut i64,
    end_pos2: &mut i64,
)
```

exists because the decoder may start reading from:

```text
previous-frame reservoir
```

and eventually reach:

```text
current frame
```

So the logical bitstream is:

```text
previous data
     │
     ▼
┌───────────────┐
│ reservoir     │
└───────┬───────┘
        │
        │ switch_buffer()
        ▼
┌───────────────┐
│ current frame │
└───────────────┘
```

This is one of the more difficult parts of MP3 decoding.

---

# 61. Output allocation

Once the compressed frame is decoded:

```rust
let mut frame =
    AudioFrame::alloc(
        SampleFormat::Fltp,
        self.params.ch_layout,
        frame_size
    )?;
```

creates the output PCM frame.

`Fltp` means:

```text
Float
Planar
```

So stereo output is:

```text
plane 0 = left samples

plane 1 = right samples
```

rather than:

```text
L R L R L R ...
```

---

# 62. Synthesis produces the PCM

This loop is the final critical stage:

```rust
for i in 0..nb_frames {
    let row =
        &self.core.sb_samples[ch]
            [i * SBLIMIT..(i + 1) * SBLIMIT];

    mpa_synth_filter(
        ...
        row,
    );
}
```

Each iteration receives:

```text
32 subband samples
```

and generates:

```text
32 PCM samples
```

Therefore:

```text
18 synthesis iterations
×
32 samples
=
576 samples
```

for an MPEG-2 granule.

For MPEG-1:

```text
36 synthesis iterations
×
32
=
1152 samples
```

This is a beautiful relationship to remember.

---

# 63. Final conversion to bytes

Finally:

```rust
for (dst, src) in
    plane.chunks_exact_mut(4).zip(samples.iter())
{
    dst.copy_from_slice(&src.to_ne_bytes());
}
```

Each:

```rust
f32
```

is four bytes:

```text
f32 = 32 bits = 4 bytes
```

So:

```text
f32 sample
    ↓
to_ne_bytes()
    ↓
[u8; 4]
```

and the bytes are copied into the `AudioFrame`.

---

# 64. `AudioDecoder` interface

Finally:

```rust
impl AudioDecoder for Mp3Decoder
```

connects the MP3 implementation to your codec framework.

The initialization:

```rust
fn init(
    &mut self,
    params: &CodecParameters
) -> Result<()>
```

checks:

```rust
CodecId::Mp3
```

and rejects:

```text
Mp1
Mp2
Rawvideo
...
```

The source has tests specifically verifying those initialization gates. 

---

# 65. `send_packet()` / `receive_frame()`

Your API works like:

```text
send_packet()
       │
       ▼
 decode
       │
       ▼
 pending: Option<AudioFrame>
       │
       ▼
receive_frame()
```

Specifically:

```rust
self.pending = self.decode_frame(pkt)?;
```

then:

```rust
match self.pending.take() {
    Some(frame) => Ok(frame),
    None if self.eof => Err(Error::Eof),
    None => Err(Error::Again),
}
```

So the API behaves similarly to FFmpeg's send/receive decoder model.

---

# 66. The most important data-flow diagram

If you want to understand this file deeply, memorize this:

```text
                   MP3 Packet
                       │
                       ▼
              ┌────────────────┐
              │ 4-byte Header  │
              └───────┬────────┘
                      │
                      ▼
              MpaDecodeHeader
                      │
                      ▼
              ┌────────────────┐
              │ Side Info      │
              └───────┬────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
   main_data_begin          GranuleDef
          │                       │
          ▼                       ▼
    Bit Reservoir          Scale Factors
          │                       │
          └───────────┬───────────┘
                      ▼
               Huffman Decode
                      │
                      ▼
              sb_hybrid[576]
                      │
                      ▼
                Requantize
                      │
                      ▼
               Stereo Decode
                      │
                      ▼
                  Reorder
                      │
                      ▼
                 Antialias
                      │
                      ▼
                   IMDCT
                      │
                      ▼
              sb_samples[...]
                      │
                      ▼
                   DCT32
                      │
                      ▼
              Synthesis Window
                      │
                      ▼
                  PCM f32
                      │
                      ▼
                AudioFrame
```

That is essentially the whole decoder.

---

# 67. What I recommend you learn first

Do **not** start by trying to understand all 4,207 lines.

Learn it in this order:

```text
01. MP3 frame format
        ↓
02. MPEG audio header
        ↓
03. GetBits
        ↓
04. GranuleDef
        ↓
05. Bit reservoir
        ↓
06. Scale factors
        ↓
07. Huffman coding
        ↓
08. Requantization
        ↓
09. Stereo
        ↓
10. Reordering
        ↓
11. Antialias
        ↓
12. IMDCT
        ↓
13. DCT32
        ↓
14. Polyphase synthesis
        ↓
15. Mp3Decoder API
```

The **four most important pieces** are:

```text
GetBits
   ↓
mp_decode_layer3
   ↓
huffman_decode
   ↓
imdct36 + mpa_synth_filter
```

If you understand those four, you understand the core of this MP3 decoder.

---

# 68. One important limitation of your current implementation

Your source intentionally does **not** implement everything FFmpeg's MP3 decoder supports.

It explicitly documents:

```text
Layer 1        not implemented
Layer 2        not implemented
CRC checking   not implemented
free-format    not implemented
MP3ADU         not implemented
MP3on4         not implemented
AHX            not implemented
SIMD           not implemented
```

and instead concentrates on:

```text
MPEG Layer III / MP3
scalar float decoder
```



That's actually a **good design for learning**.

---

# 69. Decoder vs. encoder: what you still need for "implement MP3"

If your ultimate goal is to create something like:

```text
ffmpeg -i input.wav output.mp3
```

then this file is only the **right-hand inverse direction**.

You currently have:

```text
                    YOUR CODE

MP3 ───────────────────────────► PCM
       decoder
```

An MP3 encoder would need:

```text
PCM
 │
 ▼
analysis filterbank
 │
 ▼
MDCT
 │
 ▼
psychoacoustic model
 │
 ▼
quantization
 │
 ▼
Huffman coding
 │
 ▼
bit reservoir
 │
 ▼
side information
 │
 ▼
MP3 frame
```

So the encoder is roughly:

```text
               MP3 ENCODER

PCM
 │
 ▼
Windowing
 │
 ▼
Filterbank / MDCT
 │
 ▼
Spectral coefficients
 │
 ├───────────────┐
 ▼               ▼
Psychoacoustic   Quantization
model                │
 │                   ▼
 └──────────────► Huffman
                     │
                     ▼
               Bit reservoir
                     │
                     ▼
                 MP3 frame
```

Whereas your uploaded file is:

```text
               MP3 DECODER

MP3 frame
    │
    ▼
Huffman
    │
    ▼
Requantization
    │
    ▼
IMDCT
    │
    ▼
Synthesis filterbank
    │
    ▼
PCM
```

---

## The best way to continue

Because your file is **4,207 lines**, a true line-by-line explanation of every line should be done in several parts rather than dumping thousands of explanations into one answer.

I suggest we study your exact file in this sequence:

### Part 1 — MP3 foundation

```text
lines 100–600
```

Focus on:

```text
constants
lookup tables
Huffman data
MP3 data structures
```

### Part 2 — Bitstream + header

```text
GetBits
MpaDecodeHeader
avpriv_mpegaudio_decode_header
```

### Part 3 — `mp_decode_layer3()`

This is the **most important part**:

```text
side information
granules
main_data_begin
bit reservoir
scale factors
```

### Part 4 — `huffman_decode()`

We'll take this **line by line**, including a concrete binary example such as:

```text
101101001...
       ↓
Huffman code
       ↓
(x, y)
       ↓
requantized f32
```

### Part 5 — IMDCT

We'll derive:

```text
18 spectral values
       ↓
IMDCT36
       ↓
36 time values
```

and explain the butterfly/factorization code mathematically.

### Part 6 — DCT32 + synthesis

We'll follow:

```text
sb_samples[32]
     ↓
DCT32
     ↓
synthesis window
     ↓
32 PCM samples
```

### Part 7 — `Mp3Decoder`

Finally:

```text
Packet
 ↓
send_packet()
 ↓
decode_frame()
 ↓
AudioFrame
 ↓
receive_frame()
```

That will give you both **line-by-line Rust knowledge** and an understanding of **how an actual MP3 decoder is architected**, rather than just explaining syntax.

The uploaded source itself already gives us an excellent map from each Rust function back to the corresponding FFmpeg C implementation, so we can use that mapping as the backbone of the study. 

