---
title: 260201_kernel_dev_in_Rust_basic01
published: 2026-02-01
description: 'rust개발자를 위한 커널 개발 기초'
image: ''
tags: [rust, kernel]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link

- [다양한 커널의 종류Comparison_of_operating_system_kernels](https://en.wikipedia.org/wiki/Comparison_of_operating_system_kernels)

- 유튜브 영상 모음
  - 마소 자료MicroSoft
    - [(230523) Getting to Know the Linux Kernel: A Beginner's Guide - Kelsey Steele & Nischala Yelchuri, Microsoft | The Linux Foundation](https://youtu.be/QatE61Ynwrw?si=5ISoYglI1PQdtlwV)
  - [(영상모아보기)Linux Kernel Exploitation Mahmoud Jadaan](https://youtube.com/playlist?list=PLDIsfsXZJWDNiQVSH3tmWrQWMmHc47Vtz&si=vZKfSHEpGSRJ4yRc)
  - [(영상모아보기) Building an OS | nanobyte](https://youtube.com/playlist?list=PLFjM7v6KGMpiH2G-kT781ByCNC_0pKpPN&si=b0rZrj8H_6bjYUmB)
  - [(영상모아보기) Advent of Compiler Optimisations 2025 | Matt Godbolt](https://youtube.com/playlist?list=PL2HVqYf7If8cY4wLk7JUQ2f0JXY_xMQm2&si=tiSMKMa4laTZ_2Jz)
  - Arm
    - [240205 유료강의소개 (인프런-로드맵 |'Arm 아키텍처의 구조와 원리 저자 직강 강의'- 모두 업로드 완료! | Austin Kim](https://m.youtube.com/watch?si=DAzymb8g8F7JhQC0&v=9kOdb7w_PCU&feature=youtu.be)
  - [리눅스 커널의 존재 이유_간단히 설명 굿](https://youtube.com/shorts/ivyPFMZg4KI?si=4Qwqgt42CYHmC10s)
  - [(240806) Operating Systems Course for Beginners | freeCodeCamp.org](https://youtu.be/yK1uBHPdp30?si=aGUK8RRxTdXu1A-9)
  - [(210108) System Design Course for beginners | Geek's Lesson](https://youtu.be/MbjObHmDbZo?si=SwE1oWai_aaJZaN5)
  - [(250325) System Design was HARD until I Learned these 30 Concepts | Ashish Pratap Singh](https://youtu.be/s9Qh9fWeOAk?si=uNOk8J2o7eFDMAO8)
  - RISC-V 아키텍처
    - [RISC-V영상 모아보기 | Austin Kim](https://youtube.com/playlist?list=PLRrUisvYoUw_4ES8R-H7lgjsqjZeKhI9W&si=nf6j59Z1IBzUai2d)
  - 리눅스 커널의 구조와 원리
    - Armv8-A
      - [영상모아 보기) 리눅스 커널의 구조와 원리 1부(v6.1, Armv8-A 기반) | Austin Kim](https://youtube.com/playlist?list=PLRrUisvYoUw_bFoK0ahLy9MHfBgBZJyz4&si=WmveEC7wLZ9ZK0nP)
  - dr Jonas Birch시리즈
    - [외부영상 (251003)Project: Coding a GRUB bootloader for booting Linux | dr Jonas Birch](https://www.youtube.com/watch?v=ukIajayMv5U&t=153s)
  - Windows Driver만들기
    - [영상 모아 보기 Diving into Windows Internals |  Nir Lichtman](https://youtube.com/playlist?list=PL0tgH22U2S3G2QpiK-Q1wKW_Fe-Wiu7JS&si=CYlEdyfJSgZ1ySbJ)
  - Linux Driver만들기
    - [241004) Linux Device Drivers Development Course for Beginners | freeCodeCamp.org](https://youtu.be/iSiyDHobXHA?si=fV8dy_rFzFZSI_oI)
  - Code Therapy w/ René Rebe자료
    - [(251006) Watch Linux Kernel developer working LIVE re-base patches after Linux 6.17 release! | Code Therapy w/ René Rebe](https://youtu.be/7gpTmNWNTow?si=sArzYWPNodzusX-A)
  


- 용어정리
  - [DPL개념이해](#dpl개념이해)
  - [Programs Call이해](#programs-call이해)
  - [시스템 콜 주요 개념](#시스템-콜-주요-개념)
  - [Effective Address란? 선형주소](#effective-address란-선형주소)
  - [컴퓨터 구조 | Instruction Sets](#컴퓨터-구조-instruction-sets)
  - [Addressing mode](#addressing-mode)

- 여기에 대부분 내가  정리한거 모음
  - https://github.com/YoungHaKim7/Kernel_dev_in_Rust

<hr />

# Kernel 요약(Rust dev러스트 개발자를 위한 커널개발 최신 소식)[|🔝|](#link)
  - How to write Rust in the kernel 
  - This page collects entries in our mini series on how to write Rust code in the Linux kernel.
    - Part 1: details on how to build, test, lint, and format Rust code.
    - Part 2: a close comparison of a PHY driver in Rust and in C.
    - Part 3: a look at the most common bindings Rust drivers will need to use.
  - https://lwn.net/Articles/1024941/

# How to write Rust in the kernel: part 1[|🔝|](#link)
[LWN subscriber-only content]
- https://lwn.net/SubscriberLink/1024202/556fa7b3c51d7899/

# How to write Rust in the kernel: part 2
- https://lwn.net/Articles/1025232/

# How to write Rust in the kernel: part 3
- https://lwn.net/Articles/1026694/

# 커널에서 에러 핸들링 하는방법(Rust)Best practices for error handling in kernel Rust[|🔝|](#link)
- https://lwn.net/Articles/990489/

# **[리눅스 커널 개발을 위한 Rust 언어의 새로운 기능들](<https://news.hada.io/topic?id=23716&utm_source=discord&utm_medium=bot&utm_campaign=1480>)**
- Rust for Linux 프로젝트가 **커널 개발에 필요한 핵심 언어 기능**을 추진하며, Rust 언어 자체 발전에 기여하고 있음  
- **필드 프로젝션(Field Projection)**, **제자리 초기화(In-place Initialization)**, **임의 Self 타입(Arbitrary Self Types)** 세 가지가 핵심  
- 이 기능들은 **스마트 포인터, 고정 메모…


<hr />

# 리눅스 관련 해외 유튜브 자료[|🔝|](#link)

- 리눅스 커널 4Kbytes알뜰하게 설명
  - [(240916)Linux Kernel 6.11 | Drama and 15X Part 1 | Maple Circuit](https://youtu.be/NPJ7DzdysE4?si=oqkQdZww0zCpOwMG)
  - [(240917)Linux Kernel 6.11 | Drama and 15X Part 2 | Maple Circuit](https://youtu.be/JCwHiNa_LZg?si=B3qyeiVlF9OLFOwx)

- [리눅스 시스템 설계 | jihunback](https://youtu.be/96FVy_h4VY8?si=WlnKdYFdVmR35hNY)

<hr />

# 용어정리[|🔝|](#link)

# DPL개념이해[|🔝|](#link)
- Privilege Level (Ring 0, Ring 3)
출처: https://elfmfl.tistory.com/2 [Elfmfl:티스토리]
# DPL
- (Descriptor Privilege Level)
  -  C++로 나만의 운영체재만들기(p.113)

# Programs Call이해[|🔝|](#link)
- https://youtu.be/e5g8eYKEhMw?si=vcOuJlO55xvguRwp

# 시스템 콜 주요 개념[|🔝|](#link)
- https://youtu.be/bfZ-f0m4nqQ?si=2vhhSy9DH6yc_KYd

# Effective Address란? 선형주소[|🔝|](#link)
- http://www.iamroot.org/xe/index.php?mid=Kernel&document_srl=26233

# [컴퓨터 구조] Instruction Sets[|🔝|](#link)
- https://blackinkgj.github.io/ISA/
  - 출처 : Willian Stallings. (2013). Computer Organization and Architecture. London:Pearson

# [Assembly] Can anyone explain to me what an effective address is?[|🔝|](#link)

I am taking a course on data organization this semester, and since it is the professor's first year teaching, he is not the greatest at explaining concepts. I have an assignment where I read some assembly code and identify what is going on and what the effective address is. I just have no idea how to identify what the EA is. Reading the textbook and going on Wikipedia have not helped either. Does anyone have a simple, concise explanation as to what it is? I can provide the code I am looking at for the assignment if need be.
-  [어셈블리] 효과적인 주소가 무엇인지 설명해 줄 수 있는 사람이 있습니까?
  - 저는 이번 학기에 데이터 정리에 대한 강의를 듣고 있는데 교수님의 1학년 강의이기 때문에 개념 설명에 능숙하지 않습니다. 저는 어셈블리 코드를 읽고 무슨 일이 일어나고 있는지, 유효 주소가 무엇인지 식별하는 과제가 있습니다. EA가 무엇인지 식별하는 방법을 전혀 모르겠습니다. 교과서를 읽고 위키피디아를 사용하는 것도 도움이 되지 않았습니다. 그것이 무엇인지에 대한 간단하고 간결한 설명을 가지고 있는 사람이 있습니까? 필요하다면 제가 찾고 있는 코드를 제공할 수 있습니다.
- https://www.reddit.com/r/learnprogramming/s/3Zcy1WFVoV

# Addressing mode[|🔝|](#link)
- https://en.m.wikipedia.org/wiki/Addressing_mode

# x86 memory segmentation[|🔝|](#link)
- https://en.m.wikipedia.org/wiki/X86_memory_segmentation

# Real mode[|🔝|](#link)
- https://en.m.wikipedia.org/wiki/Real_mode

# Protected mode[|🔝|](#link)
- https://en.m.wikipedia.org/wiki/Protected_mode

# 커밋 보면서 커널 공부
- 리눅스 커널 commit 보기
  - https://lore.kernel.org/all/?t=20251105135512
  - https://lore.kernel.org/all/

- [토발즈행님 메일헤더 분석 | 우분투한국커뮤니티](https://discourse.ubuntu-kr.org/t/topic/48700)

# Kernel_dev_in_Rust[|🔝|](#link)
https://docs.kernel.org/rust/quick-start.html

# 커널 디버깅은 GDB나 LLDB로[|🔝|](#link)
- GDB 는 여기에 정리중.
  - https://github.com/YoungHaKim7/GDB_Debugger_Training

- LLDB 는 여기에 정리중.
  - https://github.com/YoungHaKim7/LLDB_Debugging_training


# 커널 뉴비 자료 굿[|🔝|](#link)
- https://kernelnewbies.org/LinuxChanges#Linux_6.16.Networking

# Rust C interop[|🔝|](#link)
- https://www.reddit.com/r/rust/comments/90s2no/rust_c_interop/
- I read that I can use C libraries from Rust using FFI https://doc.rust-lang.org/1.9.0/book/ffi.html .
  - My question is are there any performance issues related to calling C code from Rust? (think Java JNI issue). Are there any gotchas around calling C code from Rust? This book chapter does not say much
  

<hr />

# Pin이거 죽어라 파야함
- https://news.hada.io/topic?id=23716&utm_source=discord&utm_medium=bot&utm_campaign=1480
- https://github.com/rust-lang/rust/pull/146307

- Field Projection (필드 프로젝션)
  - 구조체 포인터에서 특정 필드 포인터를 추출하는 기능으로, C의 &(r->field) 표현을 Rust에서 일반화하려는 시도임
  - 기존에는 참조(&) 와 *포인터(mut) 에서만 가능했으나, 사용자 정의 스마트 포인터에서는 제한이 있었음
  - Rust for Linux는 이를 확장해, 모든 포인터 타입에서 동일 문법으로 필드 접근이 가능하도록 추진 중임
  - 특히 Pin 타입(이동 불가 구조체)을 다루는 경우, 필드 투영 시 Pin<&mut Field> 또는 &mut Field 로 자동 변환되도록 설계됨
  - 이 기능이 구현되면 RCU(Read-Copy-Update) 패턴을 Rust에서 안전하게 지원할 수 있어, 락(lock) 없이도 고성능 데이터 접근이 가능해짐
  - 현재 GitHub의 [tracking issue](https://github.com/rust-lang/rust/pull/146307)에서 논의 중이며, Debian 14(2027) 이전 안정화를 목표로 함


<hr />

# Rust로 Linux커널 개발 관련 최신 소식[|🔝|](#link)

# (251211)러스트 커널 접수 완료 👍[|🔝|](#link)

# (251211)**[리눅스 커널에서의 Rust 실험 (성공적) 종료](<https://news.hada.io/topic?id=24987&utm_source=discord&utm_medium=bot&utm_campaign=1480>)**[|🔝|](#link)
- 리눅스 커널 내 **Rust 통합 작업**이 실험 단계를 마치고 **정식 구성 요소**로 인정됨  
- 연례 **Maintainers Summit**에서 개발자들이 Rust 지원을 **영구적 기능으로 채택**하기로 합의  
- 이에 따라 커널 내 Rust 관련 코드에서 **‘experimental’ 태그가 제거**될 예정  
- LWN 편집자는 “실험은 끝났고, 성공…

# (251017)**[리눅스 커널 개발을 위한 Rust 언어의 새로운 기능들](<https://news.hada.io/topic?id=23716&utm_source=discord&utm_medium=bot&utm_campaign=1480>)**[|🔝|](#link)
- Rust for Linux 프로젝트가 **커널 개발에 필요한 핵심 언어 기능**을 추진하며, Rust 언어 자체 발전에 기여하고 있음  
- **필드 프로젝션(Field Projection)**, **제자리 초기화(In-place Initialization)**, **임의 Self 타입(Arbitrary Self Types)** 세 가지가 핵심  
- 이 기능들은 **스마트 포인터, 고정 메모…  
