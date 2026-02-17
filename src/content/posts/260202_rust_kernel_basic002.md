---
title: 260202_rust_kernel_basic002
published: 2026-02-02
description: '현재(Linux  커널 도입된 버젼 6.18.12) Rust로 커널 만드는데 중요한 3가지 개념 정리(1. 필드 프로젝션(Field Projection), 2.제자리(in-place) 초기화 (In-place Initialization), 3. 임의 Self 타입(Arbitrary self types))'
image: ''
tags: [rust, kernel]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link

- https://rust-for-linux.com/
  - https://github.com/Rust-for-Linux/linux

- Linux Kernel
  - https://www.kernel.org/
- Linux Foundation 유튜브 채널
  - https://www.youtube.com/@LinuxfoundationOrg

- Rust 커뮤니티 리눅스 커널정보
  - https://users.rust-lang.org/t/rust-for-linux-kernel/85212

# Adding support for the Rust language to the Linux kernel. 
- https://github.com/Rust-for-Linux/linux

# 최근 리눅스 커널에 러스트 도입된 부분 Pin-init(The Linux Kernel Ver. 6.18.12참고)
- https://www.kernel.org/
- https://github.com/Rust-for-Linux/linux/commit/aeb5ecad5316f6af160993915163367290825b6b

- 이거 죽어라 파야함.
  - https://github.com/Rust-for-Linux/linux


# 러스트 커널 관련(Rust Kernel) 핵심 3가지(251025)[|🔝|](#link)
- https://news.hada.io/topic?id=23716&utm_source=discord&utm_medium=bot&utm_campaign=1480
- **주요 기능**(3가지):
  - **필드 프로젝션(Field Projection)**
  - **제자리(in-place) 초기화 (In-place Initialization)**
  - **임의 Self 타입(Arbitrary self types)**
- Rust 언어팀 공동 리더 Tyler Mandry는 Kangrejos 2025에서 Rust의 다가올 언어 기능을 발표하며, Linux 커널 프로젝트가 Rust 발전의 촉매제 역할을 했다고 언급함
  - 주요 기능: 필드 프로젝션, 제자리(in-place) 초기화, 임의 Self 타입(Arbitrary self types)
  - 커널 개발이 실제 사용 사례와 기술적 요구를 명확히 제시해, Rust의 언어 설계 방향을 구체화하는 데 기여
  - 가장 우선순위는 커널 바인딩에서 이미 사용 중인 불안정(unstable) 기능의 표준화임

<hr />

- Field Projection (필드 프로젝션)

  - 구조체 포인터에서 특정 필드 포인터를 추출하는 기능으로, C의 &(r->field) 표현을 Rust에서 일반화하려는 시도임
  - 기존에는 참조(&) 와 *포인터(mut) 에서만 가능했으나, 사용자 정의 스마트 포인터에서는 제한이 있었음
  - Rust for Linux는 이를 확장해, 모든 포인터 타입에서 동일 문법으로 필드 접근이 가능하도록 추진 중임
  - 특히 Pin 타입(이동 불가 구조체)을 다루는 경우, 필드 투영 시 Pin<&mut Field> 또는 &mut Field 로 자동 변환되도록 설계됨
  - 이 기능이 구현되면 RCU(Read-Copy-Update) 패턴을 Rust에서 안전하게 지원할 수 있어, 락(lock) 없이도 고성능 데이터 접근이 가능해짐
  - 현재 GitHub의 tracking issue에서 논의 중이며, Debian 14(2027) 이전 안정화를 목표로 함

<hr />

- Arbitrary Self Types (임의 Self 타입)

  - 스마트 포인터를 수용하는 메서드 정의를 가능하게 하는 기능
  - 기존에는 fn method(&self) 형태만 지원했지만, 이제 fn method(self: Pin<&mut MyStruct>) 같은 형태도 가능해짐
  - 커널에서는 Arc, Pin, Mutex 등 다양한 포인터 래퍼를 사용하므로 필수적인 기능임
  - 구현 과정에서 Deref 트레이트와의 충돌 문제가 있었으나, 새로운 Receiver 트레이트를 도입해 해결 중임
  - Receiver는 임의 Self 타입으로 사용될 수 있는 포인터임을 명시하는 역할을 함
  - 커널 개발에서는 이를 통해 포인터 체인 호출을 간결하게 유지할 수 있음
  - Ding은 Crater 도구를 이용해 기존 Rust 패키지 호환성을 검증 중이며, 1년 내 안정화 가능성을 언급함

<hr />

- In-place Initialization (제자리 초기화)

  - 커널에서 사용 중인 pin_init!() 매크로를 언어 차원에서 지원하는 기능임
  - 객체를 생성 후 이동하지 않고 메모리 상에서 직접 초기화하는 기능으로, Pin 구조체, Future, dyn 트레이트 등에 유용함
  - 세 가지 제안이 병행 논의 중임
    - `init` 키워드 방식: 최소한의 문법 추가로 기존 PinInit 트레이트 활용
    - `&out` 참조 방식: C의 out 포인터처럼 쓰기 전용 참조를 추가, 필드 단위 초기화 지원
    - `C++` 스타일 최적화 방식: 힙으로 즉시 이동될 객체를 초기부터 힙에 직접 생성
  - 최종적으로 PinInit과 out-reference 방식을 모두 실험해 실제 사용성을 검증할 계획임
  - 이 기능이 도입되면, 커널뿐 아니라 비동기 Rust 코드 전반의 구조 단순화에 기여할 것으로 전망됨



