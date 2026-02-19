---
title: 260204_Impl_GUI_in_Windows_Kernel
published: 2026-02-04
description: 'Windows GUI를 구현하는 원리 ~ 역시 커널이구만.!'
image: ''
tags: [rust, kernel]
category: 'rust_Kernel'
draft: false 
lang: ''
---

# link
- [System Call이해하기(Linux VS Windows)](../260203_system_call_linux_vs_windows/)

# 윈도우에서 GUI프로그램의 작동 원리

- GUI 프로그램일 경우 그래픽과 메시지 등을 담당하는 기능이 커널 드라이버인 win32k.sys에서 담당하므로 시스템 콜 테이블을 가져오는 과정에서 KeServiceDescriptorTable이 아닌 KeServiceDescriptorTableShadow 구조체를 가져온다. 이 구조체는 커널 자체(KiServiceTable)와 win32k.sys의 시스템 콜 테이블이 모두 들어가 있다. 여기서 win32k.sys의 시스템 콜 테이블은 W32pServiceTable이다. win32k.sys의 시스템 콜도 역시 win32u.dll라는 라이브러리로 사용자 모드에 노출된다. user32.dll과 gdi32.dll이 win32u.dll의 함수를 사용한다.

- https://namu.wiki/w/%EC%8B%9C%EC%8A%A4%ED%85%9C%20%EC%BD%9C
