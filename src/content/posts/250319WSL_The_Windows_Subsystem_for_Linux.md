---
title: 250319WSL_The_Windows_Subsystem_for_Linux
published: 2025-03-19
description: 'The Windows Subsystem for Linux is now open source | May 19, 2025 | By Pierre Boulay'
image: ''
tags: [rust, kernel, wsl]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link

- wsl
  - https://wsl.dev/
- wsl1(Windows Subsystem for Linux)
  - https://github.com/microsoft/WSL
- WSL2이제 오픈소스됨 github(250319)
  - The source for the Linux kernel used in Windows Subsystem for Linux 2 (WSL2) 
    - https://github.com/microsoft/WSL2-Linux-Kernel
  - [관련 블로그) May 19, 2025 | The Windows Subsystem for Linux is now open source By Pierre Boulay](https://blogs.windows.com/windowsdeveloper/2025/05/19/the-windows-subsystem-for-linux-is-now-open-source/)
 
- 커널 한눈에 보기
  - https://makelinux.github.io/kernel/map/

<hr />

# The Windows Subsystem for Linux is now open source | May 19, 2025 | By Pierre Boulay

- 번역 원본 https://blogs.windows.com/windowsdeveloper/2025/05/19/the-windows-subsystem-for-linux-is-now-open-source/
  - 파파고로 번역하였음

- 오늘 저희는 Linux용 Windows 서브시스템의 오픈 소스 출시를 발표하게 되어 매우 기쁩니다. 이는 이를 준비하기 위한 다년간의 노력과 Microsoft/WSL 보고서에서 제기된 첫 번째 이슈인 오픈 소스가 될 수 있을까요? · [Issue #1 · Microsoft/WSL.](https://github.com/microsoft/WSL/issues/1)

즉, 이제 WSL을 구동하는 코드가 Microsoft/WSL의 GitHub에서 사용할 수 있으며 커뮤니티에 오픈 소스로 제공됩니다! 소스에서 WSL을 다운로드하고 빌드한 후 새로운 수정 사항과 기능을 추가하고 WSL의 활발한 개발에 참여할 수 있습니다.

# WSL component overview

- WSL은 일련의 배포 구성 요소로 구성되어 있습니다. 일부는 Windows에서 실행되고 일부는 WSL 2 가상 머신 내부에서 실행됩니다. 다음은 WSL의 아키텍처 개요입니다:

<img width="1000" height="934" alt="Image" src="https://github.com/user-attachments/assets/ac51b1c7-e4a5-43bc-813f-4fd680c9c8cf" />

## WSL’s code can be broken up into these main areas:

- Command line executables that are the entry points to interact with WSL
  - `wsl.exe`, `wslconfig.exe` and `wslg.exe`
- The WSL service that starts the WSL VM, starts distros, mounts file access shares and more
  - `wslservice.exe`
- Linux init and daemon processes, binaries that run in Linux to provide WSL functionality
  - init for start up, gns for networking, localhost for port forwarding, etc.
- File sharing Linux files to Windows with WSL’s plan9 server implementation
  - plan9
- Head over to https://wsl.dev to learn more about each component.

- This comes as an addition to the already open sourced WSL components:

  - [microsoft/wslg: Enabling the Windows Subsystem for Linux to include support for Wayland and X server related scenarios](https://github.com/microsoft/wslg)

  - [microsoft/WSL2-Linux-Kernel: The source for the Linux kernel used in Windows Subsystem for Linux 2 (WSL2)](https://github.com/microsoft/WSL2-Linux-Kernel)

- The following components are still part of the Windows image and are not open sourced at this time:

  - `Lxcore.sys`, the kernel side driver that powers WSL 1

  - `P9rdr.sys` and `p9np.dll`, which runs the `\\wsl.localhost` filesystem redirection (from Windows to Linux)

<hr />

## 한글 번역본

### WSL의 코드는 다음과 같은 주요 영역으로 나눌 수 있습니다:
- WSL과 상호작용하기 위한 진입 지점인 명령줄 실행 파일
  - `wsl.exe`, `wslconfig.exe` and `wslg.exe`
- WSL VM을 시작하고, 디스트로를 시작하며, 파일 액세스 공유를 마운트하는 WSL 서비스 등
  - `wslservice.exe`
- Linux init 및 데몬 프로세스, WSL 기능을 제공하기 위해 Linux에서 실행되는 바이너리
  - 시작을 위한 init, 네트워킹을 위한 gns, 포트 포워딩을 위한 localhost 등.
- WSL의 plan9 서버 구현을 통해 Windows에 Linux 파일 공유
  - 플랜9

- 각 구성 요소에 대해 자세히 알아보려면 [https://wsl.dev](https://wsl.dev)로 이동하세요.

- 이는 이미 오픈 소스 WSL 구성 요소에 추가된 것입니다:

  - Microsoft/wslg: Wayland 및 X 서버 관련 시나리오에 대한 지원을 포함하도록 Windows 하위 시스템을 Linux용으로 활성화하기

  - Microsoft/WSL2-Linux-Kernel: Windows 서브시스템 for Linux 2 (WSL2)에서 사용되는 Linux 커널의 소스

- 다음 구성 요소는 여전히 Windows 이미지의 일부이며 현재 오픈 소스가 아닙니다:

  - Lxcore.sys, WSL 1을 구동하는 커널 사이드 드라이버

  - P9rdr.sys 및 p9np.dll, "\\wsl.localhost" 파일 시스템 리디렉션을 실행합니다(Windows에서 Linux로)

# 왜 지금 오픈 소스인가요? 약간의 역사...

- WSL은 2016년에 BUILD에서 처음 발표되었으며, Windows 10 Anniversary 업데이트와 함께 처음 출시되었습니다.

- 당시 WSL은 `lxcore.sys`라는 피코 프로세스 제공업체를 기반으로 하고 있었으며, 이를 통해 Windows는 ELF 실행 파일을 네이티브로 실행하고 Windows 커널 내부에 Linux syscall을 구현할 수 있었습니다. 이는 결국 오늘날 우리가 "WSL 1"이라고 알고 있는 것이 되었으며, WSL은 여전히 이를 지원합니다.

- 시간이 지나면서 네이티브 리눅스와 최적의 호환성을 제공하는 가장 좋은 방법은 리눅스 커널 자체에 의존하는 것이라는 것이 분명해졌습니다. WSL 2는 2019년에 처음 발표되었습니다.

- WSL의 커뮤니티가 성장함에 따라 WSL은 GPU 지원, 그래픽 애플리케이션 지원(wslg를 통한), `systemd` 지원과 같은 더 많은 기능을 갖추게 되었습니다.

- 결국 증가하는 커뮤니티 및 기능 요청을 따라잡기 위해 WSL은 더 빠르게 이동하고 Windows와 별도로 배송해야 한다는 것이 분명해졌습니다. 그래서 2021년에 WSL을 Windows 코드베이스에서 분리하여 자체 코드베이스로 옮겼습니다. 이 새로운 WSL은 2021년 7월에 버전 0.47.1로 Microsoft Store에 처음 배송되었습니다. 당시에는 Windows 11만 지원되었으며 패키지는 미리보기로 표시되어 최신 WSL을 경험하고 싶은 사용자에게만 권장되었습니다.

- 우리는 이 새로운 "WSL 패키지"가 일반적으로 출시될 준비가 될 때까지 계속해서 개발했습니다. 그 일은 2022년 11월에 일어났으며, WSL 1.0.0은 Windows 10에 대한 지원을 추가하고 이 새로운 WSL의 첫 번째 "안정적인" 릴리스였습니다.

- 그 이후로 우리는 모든 사용자를 Windows와 함께 제공되던 WSL 구성 요소에서 벗어나 이 새로운 WSL 패키지로 완전히 전환하기 위해 WSL을 계속 개선했습니다. Windows 11 24H2는 사용자를 "내장된" WSL 패키지에서 "새로운" WSL 패키지로 이동시킨 최초의 Windows 빌드였습니다. Windows 이미지에 `wsl.exe`를 유지하여 최신 패키지를 더 쉽게 다운로드할 수 있도록 했습니다.

- WSL을 계속 개선하면서 결국 또 다른 이정표를 세웠습니다: WSL 2.0.0 (컴퓨터 과학에서 가장 어려운 세 가지 문제는 무엇인가요? 하나의 오류와 이름 짓기!).
  - (What are the three hardest problems in computer science? Off by one errors and naming things!).

- WSL 2.0.0은 미러링 네트워킹, DNS 터널링, 세션 0 지원, 프록시 지원, 방화벽 지원 등과 같은 주요 개선 사항을 도입했습니다.

- 그리고 이것이 바로 오늘날에도 우리가 쌓아가고 있는 이정표입니다! 이 글을 쓰는 시점에서 WSL 2.5.7은 4년 전 0.47.1 이후 9페이지에 걸쳐 출시된 Github 버전 중 가장 최신 버전입니다!

# WSL의 배후 커뮤니티

수년 동안 우리는 첫날부터 WSL을 지원하는 강력한 커뮤니티가 생겨 믿을 수 없을 정도로 운이 좋았습니다. 우리는 사람들이 자신의 지식을 공유하고 버그를 추적하고, 새로운 기능을 구현하고, WSL을 개선하는 최선의 방법을 찾기 위해 수많은 시간을 할애하는 축복을 받았습니다.

WSL은 커뮤니티가 없었다면 오늘날과 같은 존재가 될 수 없었을 것입니다. WSL의 소스 코드에 접근하지 못했더라도 사람들은 현재와 같은 WSL에 기여하는 데 큰 기여를 할 수 있었습니다.

그렇기 때문에 오늘날 오픈 소스 WSL에 대해 매우 기대하고 있습니다. 소스 코드에 액세스하지 않고도 커뮤니티가 WSL에 얼마나 기여했는지 확인했으며, 커뮤니티가 프로젝트에 직접 코드를 기여할 수 있게 되면서 WSL이 어떻게 발전할지 기대됩니다.

# WSL 기여

WSL이 어떻게 작동하는지 배우고 싶으신가요? 특정 기능이 어떻게 작동하는지 확인하거나 변경하고 싶으신가요? 자세한 내용은 [Microsoft/WSL](https://github.com/microsoft/WSL)로 이동하세요!

