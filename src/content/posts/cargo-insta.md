---
title: cargo-insta
published: 2026-06-25
description: 'A review tool for the insta snapshot testing library for Rust'
image: ''
tags: [analyze, debugging, profiling]
category: 'rust_Debugging_profiling'
draft: false 
lang: ''
---

# link

- https://crates.io/crates/cargo-insta
  - https://insta.rs/

# What's in the Box?

- Interactive snapshot reviews: with cargo-insta you can perform reviews of all changed snapshots conveniently.
- Inline snapshots: insta can store snapshots right within your source file.
- External snapshots: it's also possible to store snapshots as separate files.
- Redactions: if you have output which can change between test runs (such as random identifiers, timestamps or others) you can instruct insta to redact these parts.
- Flexible formats: you can pick between snapshoting into different formats such as JSON, YAML, TOML, CSV or others.
- Editor Support: insta also provides a VS Code Extension that lets you review snapshots right from within your editor.
- Pretty Diffs: insta renders beautiful snapshot diffs right in your terminal with the help of the similar crate.
- Supports older Rust: insta, similar and similar-asserts support Rust down to 1.51.
- Apache-2.0 licensed: because the best tools are Open Source under a convenient license

## 상자 안에는 뭐가 들어 있어요?

- 인터랙티브 스냅샷 리뷰: cargo-insta를 사용하면 변경된 모든 스냅샷을 편리하게 검토할 수 있습니다.
- 인라인 스냅샷: 인스타는 소스 파일 안에 바로 스냅샷을 저장할 수 있습니다.
- 외부 스냅샷: 스냅샷을 별도의 파일로 저장하는 것도 가능합니다.
- 가림 처리: 테스트 실행마다 바뀔 수 있는 출력(예: 무작위 식별자, 타임스탬프 등)이 있다면, insta에게 해당 부분을 가리도록 지시할 수 있습니다.
- 유연한 형식: JSON, YAML, TOML, CSV 등 다양한 형식으로 스냅샷을 선택할 수 있습니다.
- 에디터 지원: 인스타그램은 에디터 내에서 바로 스냅샷을 확인할 수 있는 VS Code 확장 프로그램도 제공합니다.
- Pretty Diffs: 비슷한 크레이트를 이용해 터미널에서 아름다운 스냅샷 차이를 렌더링해 줍니다.
- 구버전 Rust 지원: 인스턴스, 유사, 유사-어설트가 Rust 1.51까지 지원합니다.
- Apache-2.0 라이선스: 최고의 도구들은 편리한 라이선스 하에 오픈 소스이기 때문입니다



