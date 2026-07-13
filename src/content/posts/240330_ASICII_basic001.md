---
title: 240330_ASICII_basic001
published: 2024-03-30
description: '왜 ASCII에서 소문자는 대문자 바로 뒤에 오지 않을까?'
image: ''
tags: [CS, Computer, Science, ascii]
category: 'zCS_ComputerScience'
draft: false 
lang: ''
---

# **[왜 ASCII에서 소문자는 대문자 바로 뒤에 오지 않을까?](<https://news.hada.io/topic?id=29303&utm_source=discord&utm_medium=bot&utm_campaign=5116>)**
- ASCII에서 `Z`는 `90`, `a`는 `97`에 배치되어 있으며, 그 사이 6개 문자 덕분에 대문자와 소문자의 코드 차이가 **32**로 맞춰짐
- **32**는 `2^5`라서 `A` `65`와 `a` `97`처럼 대응하는 대소문자는 항상 `00100000` 비트 하나만 다름
- 이 배치 덕분에 `32`의 비트 반전값과 **AND**하면 대문자화, `32`와 **OR**하면 소문자화, `32`와 **XOR**하면 대소문자 반전이 가능함
- 알파벳 순번은 문자 코드에 `31`을 **AND**해 하위 5비트만 남기면 얻을 수 있으며, `A/a`는 1, `Z/z`는 26이 됨
- ASCII는 **7비트**로 128개 코드 포인트…

# ASCII

- https://ko.wikipedia.org/wiki/ASCII

- 코드의 의미

|||||||
|-|-|-|-|-|-|
|ACK|Acknowledge|EOT|End of Transmission|PN|Punch On|
|BEL|Bell|ESC|Escape|RES|Restore|
|BS|Backspace|ETB|End of Transmission Block|RS|Reader Stop|
|BYP|Bypass|ETX|End of Text|SI|Shift In|
|CAN|Cancel|FF|From Feed|SM|Set Mode|
|CC|Cursor Control|FS|Field Separator|SMM|Start of Manual Message|
|CR|Carriage Return|HT|Horizontal Tab|SO|Shift Out|
|CU1|Customer Use 1|IFS|Interchange File Separator|SOH|Start of Heading|
|CU2|Customer Use 2|IGS|Interchange Group Separator|SOS|Start of Significance|
|DC1|Device Control1|IRS|Interchange Record Separator|STX|Start of Text|
|DC2|Device Control2|IUS|Interchange Unit Separator|SUB|Substitute|
|DC4|Device Control4|LC|Lower Case|SYN|Synchronous|
|DEL|Delete|LF|Line Feed|TM|Tape Mark|
|DLE|Data Link Escape|NAK|Nagative Acknowledge|UC|Upper Case|
|DS|Digital Select|NL|New Line|VT|Vertical Tab|
|EM|End of Medium|NUL|Null|¢|Cent Sign|
|ENQ|Enquire|PF|Punch off|¬|Logical NOT|

## 다시 정리

- 이 표는 **ASCII 제어 문자(Control Characters)**와 일부 확장 문자 및 장치 제어 코드의 약어를 정리한 것입니다. 초기 컴퓨터와 텔레타이프(Teletype), 프린터, 자기테이프 등의 장치를 제어하기 위해 사용되었습니다.

- 아래는 주요 항목을 기능별로 묶어서 설명한 것입니다.

| 분류      | 코드      | 의미                        | 용도            |
| ------- | ------- | ------------------------- | ------------- |
| 전송 시작/끝 | SOH     | Start of Heading          | 헤더 시작         |
|         | STX     | Start of Text             | 본문 시작         |
|         | ETX     | End of Text               | 본문 끝          |
|         | EOT     | End of Transmission       | 전송 종료         |
|         | ETB     | End of Transmission Block | 블록 종료         |
| 응답      | ACK     | Acknowledge               | 정상 수신         |
|         | NAK     | Negative Acknowledge      | 오류 발생, 재전송 요청 |
|         | ENQ     | Enquiry                   | 상대 상태 확인      |
| 화면/입력   | BS      | Backspace                 | 한 칸 뒤로        |
|         | HT      | Horizontal Tab            | 탭             |
|         | LF      | Line Feed                 | 다음 줄          |
|         | CR      | Carriage Return           | 줄 처음으로        |
|         | VT      | Vertical Tab              | 세로 탭          |
|         | FF      | Form Feed                 | 다음 페이지        |
|         | ESC     | Escape                    | 특수 명령 시작      |
| 장치 제어   | DC1~DC4 | Device Control            | 장치 제어용        |
|         | DLE     | Data Link Escape          | 데이터 링크 제어     |
| 문자 집합   | SI      | Shift In                  | 기본 문자 집합      |
|         | SO      | Shift Out                 | 다른 문자 집합      |
| 구분자     | FS      | Field Separator           | 필드 구분         |
|         | GS(IGS) | Group Separator           | 그룹 구분         |
|         | RS(IRS) | Record Separator          | 레코드 구분        |
|         | US(IUS) | Unit Separator            | 단위 구분         |
| 기타      | BEL     | Bell                      | 벨(삑 소리)       |
|         | DEL     | Delete                    | 삭제            |
|         | NUL     | Null                      | 값 없음          |
|         | CAN     | Cancel                    | 취소            |
|         | SUB     | Substitute                | 대체 문자         |
|         | SYN     | Synchronous Idle          | 동기 통신         |


## 표에 있는 특수 코드들

- 다음 항목들은 표준 ASCII에는 포함되지 않거나 특정 장비에서만 사용된 코드입니다.

| 코드       | 의미                      |
| -------- | ----------------------- |
| BYP      | Bypass                  |
| CC       | Cursor Control          |
| CU1, CU2 | Customer Use 1, 2       |
| DS       | Digital Select          |
| LC       | Lower Case              |
| UC       | Upper Case              |
| PF       | Punch Off               |
| PN       | Punch On                |
| RES      | Restore                 |
| SM       | Set Mode                |
| SMM      | Start of Manual Message |
| TM       | Tape Mark               |

- 이들은 IBM 메인프레임, 텔레타이프, 천공 카드(punch card), 자기테이프 장치 등에서 사용되던 제조사별 확장 제어 코드입니다.

- 지금도 자주 쓰이는 것

- 오늘날 일반적인 운영체제와 터미널에서 자주 볼 수 있는 것은 다음 정도입니다.
  - `\r` → CR (Carriage Return)
  - `\t` → HT (Horizontal Tab)
  - `\b` → BS (Backspace)
  - `\0` → NUL
  - `\a` → BEL (터미널 벨)
  - `0x1B` → ESC (ANSI 이스케이프 시퀀스의 시작)
  - `0x7F` → DEL

- 예를 들어 터미널에서 글자 색을 바꾸는 ANSI 시퀀스는 ESC 문자로 시작합니다.


```bash
ESC [31mHello ESC [0m
```


- 여기서 `ESC`는 ASCII 값 27(0x1B) 입니다.

- 참고로, 질문에 나온 표는 **ASCII 제어 문자(ANSI X3.4)**뿐만 아니라 EBCDIC 및 IBM 장비의 제어 코드까지 함께 실어 놓은 표입니다. 그래서 `PN`, `PF`, `DS`, `TM`, `LC`, `UC`처럼 순수 ASCII에는 없는 항목들도 포함되어 있습니다.

# BEL (0x07) asks the terminal to beep/flash

- https://asciify.dev/ascii/control/bell

```c
fputs("Build finished\a\n", stdout);
// BEL (0x07) asks the terminal to beep/flash
fflush(stdout);
```
