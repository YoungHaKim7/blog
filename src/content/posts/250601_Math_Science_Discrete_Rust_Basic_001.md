---
title: 250601_Math_Science_Discrete_Rust_Basic_001
published: 2025-06-01
description: 'rust Math, Science, Discrete'
image: ''
tags: [rust]
category: 'rust'
draft: false 
lang: ''
---

# link

- 개발자가 알아야할 기초 수학
  - [이산수학(Discrete Mathematics)](#한글로-잘-된-이산-수학)
  - [개발자가 알아야할 숫자 표로 잘 정리 _ 모든 숫자 표현(자연수, 무리수 등등..](#허수imaginary-number-𝑖ℝ--𝕀--𝔍-는-어떻게-만들어-졌을까--지면-실업자가-되는-수학-배틀)
  - [기초적인 물리엔진 구현을 위한 기초 공식 (물체의 운동 2개, 전기와 자기 공식 4개만 외우면 된다, 이 세상을 모든 현상을 다 구현 가능한다. 현대 과학은 여기에 양자역학만 추가하면 됨.](#고전물리의-완성-19세기말-물체의-운동-2개--전기와-자기로-이세상-설명이-다-가능함)

<hr />

- 물리학 역사
  - [물리학의 발전 지도(The map of physics)_33 | 석군 seokkun](https://youtu.be/h6_dj8VIoN0?si=e_2DpjYRvhl9lwyH)
  - [KAIST김갑진 교수의 고전 물리학과 현대 물리학(양자역학까지 통합본으로 정리](../11_2D_3D_Game_Engine_Algorithm#양자역학은-여기에-정리-중)
    - [고전물리는(물체의 운동 2개), (전기와 자기 4개 공식) 다 설명가능 ..현대 물리는 양자역학추가하면됨.](../11_2D_3D_Game_Engine_Algorithm#고전물리의-완성-19세기말-물체의-운동-2개--전기와-자기로-이세상-설명이-다-가능함)
- 물리학 기초
  - [아인슈타인이 바라본 전기력 ⚡️ 과 자기력 🧲 | 석군 seokkun](https://youtu.be/4bJzl21eN5Y?si=-a0lC8iyI4s9bJ5d)

- 초끈 이론
  - [(초끈이론)물의 최소 단위는 입자가 아니라 끈이다? 우주의 모든 것을 설명할 수 있는 단 하나의 이론 #과학 #EBS지식](#초끈이론물의-최소-단위는-입자가-아니라-끈이다-우주의-모든-것을-설명할-수-있는-단-하나의-이론-과학-ebs지식)

<hr />

- [일반상대성 이론 이해하기 General Relativity Lecture 1 | Stanford](#일반상대성-이론-이해하기-general-relativity-lecture-1--stanford)

- [4차원 시공간 | Dongwoo Cha](https://youtu.be/c65OwSBIxUA?si=g5gwyogiCeoiwDik)

- [디랙 방정식 (1) | Dongwoo Cha](https://youtu.be/nUhLG8j6dO4?si=uphdKzduC5oqXgPL)

- 적분 모음
  - [[강연] 움직이는 세상을 표현한 수학의 언어, 미적분 2_by 김민형 / 2024 카오스강연 '세상에 나쁜 수학은 없다' 시즌2 1강 두 번째 이야기 | 카오스 사이언스](https://youtu.be/z_Gw3AHGJB0?si=2yqKa_zXJQdqEIuS)

- [수포자, 다들어와_전기기초수학 & 계산기 활용법 | 배러데이 소현쌤](https://youtu.be/5WOdNgDpyn8?si=uuwX1Vg8smXW-uUv)

- 미적분 기초
  - [(외부링크) 230926《미적분학의 본질》 시리즈 전편 몰아보기 | 3Blue1Brown 한국어](https://youtu.be/wvi4FuO-Rhs?si=-vYWCia5BXctLZfk)
  - [(외부링크) 미적분을 알아야 하는 이유](https://youtu.be/k6IOywoZSoI?si=e1iVAltlmbskEFCP)

- [양자역학은-여기에-정리-중](#양자역학은-여기에-정리-중)

- [파동방정식](#파동방정식)

- [현대물리는-여기에-양자역학을-추가하면-됨](#현대물리는-여기에-양자역학을-추가하면-됨)

- [고전물리의-완성-19세기말-물체의-운동-2개--전기와-자기로-이세상-설명이-다-가능함](#고전물리의-완성-19세기말-물체의-운동-2개--전기와-자기로-이세상-설명이-다-가능함)

- [물체의-운동-2개-start](#물체의-운동-2개-start)

- [전기와-자기-4개-공식-start](#전기와-자기-4개-공식-start)

<hr>

- [game-dev](#game-dev)

  - [입체-투영으로-쿼터니언4d-숫자-시각화-3blue1brown](#입체-투영으로-쿼터니언4d-숫자-시각화-3blue1brown)
  - [n차원-이해하기n차원-세계에서-일어나는-믿을-수-없는-신기한-현상--12-math](#n차원-이해하기n차원-세계에서-일어나는-믿을-수-없는-신기한-현상--12-math)
  - [내적-외적-이해(머신 러닝 기초](#내적-외적-이해)
  - [직교성-orthogonality_내적_외적을 이해하기 위한 상식basic](#직교성-orthogonality)
  - [(외부링크)3차원으로 좌표를 이용한 이해Quantum Projections | Physics Videos by Eugene Khutoryansky](https://youtu.be/0efTmbk6hf8?si=p6g8b9hu2enOr2YA)

- Ray Tracing관련
  - [Ray Tracing Harmonic Functions | Mark Gillespie](#ray-tracing-harmonic-functions)

- The Rotating Coordinate System(회전하면서 그림을 그리네 ㅎㅎ 3D로 그림으로 설명해줌 굿)
  - [To Master Physics, First Master The Rotating Coordinate System | Dialect](#to-master-physics-first-master-the-rotating-coordinate-system--dialect) 

<hr>

- 기초지식
  - [수학기호와 의미](#수학기호와-의미)
  - [A First Course in Linear Algebra_(Kuttler)](https://math.libretexts.org/Bookshelves/Linear_Algebra/A_First_Course_in_Linear_Algebra_(Kuttler))
  - [mathematics-3차원-공간의-흐름2024년-7월-25일](#mathematics-3차원-공간의-흐름2024년-7월-25일)
  - [허수imaginary-number-𝑖ℝ--𝕀--𝔍-는-어떻게-만들어-졌을까--지면-실업자가-되는-수학-배틀](#허수imaginary-number-𝑖ℝ--𝕀--𝔍-는-어떻게-만들어-졌을까--지면-실업자가-되는-수학-배틀)
  - [이산-수학discrete-mathematics책에-나오는-수학용어-영어로-%EF%B8%8F정리자연수ℕ-정수ℤ등등](#이산-수학discrete-mathematics책에-나오는-수학용어-영어로-%EF%B8%8F정리자연수ℕ-정수ℤ등등)
  - [백지-상태에서-미분-완전-정복-3시간--침착맨](#백지-상태에서-미분-완전-정복-3시간--침착맨)

<hr>

- 다양한 움직임의 알고리즘 모음
  - [연구원들은 이것이 버그라고 생각했습니다(Borwein 적분) |3Blue1Brown](https://youtu.be/851U557j6HE?si=USgO2Q1vqB1_G6D_)

<hr>

- Tensor관련
  - [The Meaning of the Metric Tensor | Dialect](https://youtu.be/Dn0ZZRVuJcU?si=M3OfGtyvSraD6p60)
  - [What is a tensor | Tenor calculus | Tensor calculus for physics | Tensor calculus msc mathematics](https://youtu.be/vQ0NAWoyOAk?si=PRzYhnVHxQD9ZaBQ)

<hr />

- 4차원 이해
  - [250426(외부링크)4차원 시공간을 이해하는 방법(민코프스키 시공간)](https://youtu.be/HgujaMy5SL8?si=gbOUvh5cBQpc71Qz)


- 해외 유튜버 볼만한거
  - [230705_The Art of Linear Programming | Tom S_선형 프로그래밍의 예술](https://youtu.be/E72DWgKP_1Y)
  - [220624_Amazing Math Animations ](https://youtu.be/GL5shUpBdno?si=1wEGV1OLgEphqFd-)


<hr>

# 양자역학은 여기에 정리 중.[|🔝|](#link)

- https://github.com/YoungHaKim7/silq_project

<hr>

# 한글로 잘 된 이산 수학[|🔝|](#link)
- 이산수학은 컴퓨터공학에서 필요한 기초 교과목으로 논리 및 명제, 집합 이론, 관계, 순열 및 조합, 순환 관계, 그래프 및 트리등의 개념을 학습한다. 이산수학의 개념은 향후 알고리즘 설계 및 분석, 데이타베이스 설계, 프로그래밍 원리 등 컴퓨터 전반에 걸쳐 필요한 수리적 토대가 된다.
- http://bigdata.dongguk.ac.kr/lectures/disc_math/_book/
- 1.1 이산수학(Discrete Mathematics)이란?

- 이산수학은 연속적(continuous)이 아닌 불연속(discrete) 객체를 다루는 수학의 한 분야임
  - 예를 들어, 미적분학은 주로 연속적인 대상을 다루며 이산수학에서는 다루지 않음
- discrete objects의 예:
  - 정수,
  - 컴퓨터 프로그램에서 각 단계,
  - 도로망에서 A지점에서 B지점으로 이동하는 서로 다른 경로,
  - 로또복권에서 당첨이 될 경우의 수.
- 이산수학에서는 컴퓨터 과학에서 필요로 하는 수학적 토대를 제공함

- http://bigdata.dongguk.ac.kr/lectures/disc_math/_book/%EC%9D%B4%EC%82%B0%EC%88%98%ED%95%99%EA%B0%9C%EC%9A%94.html
- Complementary Relations (보수 관계)
  - http://bigdata.dongguk.ac.kr/lectures/disc_math/_book/%EA%B4%80%EA%B3%84.html

<hr>

<table>
<colgroup>
<col width="42%">
<col width="31%">
<col width="26%">
</colgroup>
<thead>
<tr class="header">
<th>명칭</th>
<th>별명</th>
<th align="center">논리연산자</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>부정(negation)</td>
<td>NOT</td>
<td align="center">¬ or ~</td>
</tr>
<tr class="even">
<td>논리곱(conjunction)</td>
<td>AND</td>
<td align="center">∧</td>
</tr>
<tr class="odd">
<td>논리합(disjunction)</td>
<td>OR</td>
<td align="center">∨</td>
</tr>
<tr class="even">
<td>배타적 논리합(exclusive OR)</td>
<td>XOR</td>
<td align="center">⊕</td>
</tr>
<tr class="odd">
<td>함축(implication), 조건(conditional)</td>
<td>IMPLY</td>
<td align="center">→</td>
</tr>
<tr class="even">
<td>상호조건(biconditional)</td>
<td>IFF(if and only if)</td>
<td align="center">↔</td>
</tr>
</tbody>
</table>

<hr>

# Discrete Mathematics Final Review Part 1: Structures (Fall 2022) | A Yang[|🔝|](#link)

2022년 12월 7일
CS 2800 Final Exam Review Session
Ambrose Yang, Cornell University

Part 1: Propositional logic, sets, functions, relations, automata

1:30 Propositional and predicate logic<br>
19:15 Set theory<br>
26:35 Functions<br>
36:50 Cardinality of sets<br>
49:25 Relations<br>
1:09:18 Finite automata<br>

- https://youtu.be/B4-cJUoEwjA?si=jiheKg2V-vyupaaH

- part2
 - Discrete Mathematics Final Review Part 2: Combinatorics and Probability (Fall 2022) | A Yang
   - https://youtu.be/pO2F9BagUvA?si=ICT5zPfEwiYqZ0Ks

2022년 12월 8일
CS 2800 Final Exam Review Session
Ambrose Yang, Cornell University

Part 2: Combinations, Stirling numbers of the second kind, occupancy problems, combinatorial proofs, Principle of Inclusion-Exclusion, conditional probability, Bayes' Rule, random variables
<br>

0:30 Combinatorial formulas<br>
10:40 Distinguishable and indistinguishable balls and bins<br>
34:10 Combinatorial proofs<br>
41:50 Principle of Inclusion-Exclusion<br>
45:25 Probability basics: outcomes, sample spaces, events, conditional probability<br>
52:05 Bayes' Rule<br>
58:45 Random variables<br>


<hr>

- 모아보기 
  - https://youtube.com/playlist?list=PL7Wri0mncI36dTjRfvuFikrA0iMOGQrzV&si=44xpDVNsnpoKxMGO

<hr>

# Discrete Mathematics (Full Course) | My Lesson

- https://youtu.be/UwYJUKVc-Hs?si=9MMFRcxAN99pVbXF

<hr>

# Combinatorics and Probability (Complete Course) | Discrete Mathematics for Computer Science | My Lesson[|🔝|](#link)

- https://youtu.be/0GIwDazlUHs?si=JFis7W5T_jbCZqAh

# 눈으로 보는 영상 수학 모음[|🔝|](#link)

# The most beautiful equation in math, explained visually [Euler’s Formula] | Welch Labs
- https://youtu.be/f8CXG7dS-D0?si=zDgZ2HOOR9W2dgUA

# ‘쓸모없다’는 냉대를 받았던 허수 i. 수의 영역을 확장한 상상(수학역사) | EBS지식[|🔝|](#link)
- https://youtu.be/1cojxmkf7cc?si=KAVwsN2ZC9qy8Y5M


<hr>

# (함수시리즈 ep4) 로그, 세상을 단순하게 바꿔 보기 | 수학 취미로 하는 직장인[|🔝|](#link)
- https://youtu.be/mjugrlIds_8?si=ZSgHjO0Gznw1kVd9

# 고등수학과 대학수학의 가장 큰 차이 - 극한의 진짜 정의 - 엡실론은 무엇인가 | 12 Math[|🔝|](#link)
- https://youtu.be/vn4lUf6T028?si=IsyuP3CF74m-WaKo



<hr>

# 수학기호와 의미[|🔝|](#link)
- https://m.blog.naver.com/ssinznday/221956292856
- https://pigbrain.github.io/math/2015/07/15/MathematicalSymbol_on_Math

![Symbol](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/652528c1-0c39-43a1-8013-69693b4f9dd4)

- 수학기호의 의미

  - σ : 소문자 시그마는 표준편차를 나타내는 기호
  - Σ : 대문자 시그마는 아래첨자와 위첨자를 기입하여 합에 관한 기호로 사용
  - i : 아이. 허수단위. 제곱해서 -1이 되는 수
  - √ - 제곱근 또는 루트라고 읽습니다.
  - ∫ - 인테그랄 : 적분기호
  - ∬ - 중적분 기호로, 적분을 두번 하라는 것입니다.
  - ∏ - 대문자 파이
  - ∴ - 따라서 또는 그러므로(therefore)
  - ∵ - 왜냐하면(since)
  - ≒ - 약: 근사값을 쓸때 또는 양쪽 값이 거의 비슷할때 사용
  - dθ - 디쎄타 - 미분에서 사용되는 기호
  - ≡ - 합동 또는 모듈로(mod)를 나타내는 기호=도형의 합동 기호
  - ∈ - (왼쪽이 오른쪽의) 원소이다.
  - ∋ - (오른쪽이 왼쪽의) 원소이다.
  - ⊂ - (왼쪽이 오른쪽의) 부분집합이다. (오른쪽 집합이 왼쪽 집합을) 포함한다.
  - ⊃ - (오른쪽이 왼쪽의) 부분집합이다. (오른쪽 집합이 왼쪽 집합을) 포함한다.
  - ∪ - 합집합
  - ∩ - 교집합
  - ∀ - 임의의, 모든(for all, for every, arbitrary)
  - ∃ - 존재한다. exist.
    - ∃!  : There exist exactly one  - 유일하게(uniquely)
      - https://math.stackexchange.com/questions/21379/symbols-for-quantifiers-other-than-forall-and-exists
      - https://en.wikipedia.org/wiki/Uniqueness_quantification
  - [∄ (does not exists, 존재 하지 않는다)](https://m.blog.naver.com/PostView.naver?blogId=ssinznday&logNo=221956292856)

- 집합기호 : { }, ⊂,⊃,⊆,⊇,
- 명제기호 : ∧,∨,←,→,⇔,⇒,⇒
- 도형기호 : ∠(각),∽(닮음),≡(합동),?(평행),⊥(수직)
- 대소관계 : <, >, ≤,≥,
- 각종괄호 : (,),{,},[,]
- 적분기호 : ∫, ∬, ∮
- 미분기호 : ∂(편미분)
- 삼각함수 : sin, cos, tan, sec, cosec, cot, sinh, cosh, tanh, sech, cosech, coth, 각각의 함수에 역함수 기호(^-1)를 붙이면 arc삼각함수(=역삼각함수)가 된다.
- ∞(무한대), !(팩토리얼,factorial)
- 기타 기호

  - Å - 옴스트롱 또는 옴고스트롱. 10의 -10승
  - μ(마이크로) - 10의 -6승. 즉, 1/1000000 의 크기.
  - ℉ - 화씨. 온도 단위
  - ℃ - 섭씨. 온도 단위
  - ㎛(마이크로미터) ㎝(센티미터) - 길이의 단위
  - ㎟(제곱밀리미터)㎩ ㎢(제곱키로미터) - 넓이의 단위
  - ㎣(세제곱밀리미터) ㎤(세제곱 센티미터) ㎥(세제곱 미터) ㎦(세제곱 키로미터) - 부피의 단위.
  - ㏈ - 데시벨. 소리의 단위
  - ㎲ -마이크로초. 시간의 단위
  - ∞ 무한이 커지는 상태
  - ∠ 각의 크기를 나타내는 기호
  - ⊥ 서로 직교를 나타내는 기호


- 조건문
  - `⇔` (쌍조건문): A and B are true. Whether a symbol means a material biconditional or a logical equivalence, depends on the author’s style.
    - `A ⇔ B` is true only if both A and B are false, or both A and B are true
    - `p ⇔ q` 참이다. (`p ⇔ q` , `p ⇔ q` 2가지를 만족해 쓸수 있음)
  - `⇒` imply(=함의하다.)
  - `⇒` (Double Arrow): Standard for logical implication, "if P, then Q".
    - p implies q
    - https://m.blog.naver.com/ssinznday/221956292856
    - https://en.wikipedia.org/wiki/List_of_logic_symbols

- ◻ , ■
  - Tex`{\displaystyle \blacksquare }`◻ `{\displaystyle \Box }`증명 완료
  - q.e.d는 아주 위대한 정리의 굉장한 증명에만 사용한다고 합니다. 페르마의 마지막 정리 같은것

- q.e.d
  - 라틴어 'Quod Erat Demonstrandum(QED)
  - https://freshrimpsushi.github.io/ko/posts/1764

- ETS(다음을 보이면 충분하다)
  - Enough To Show
    - '어떤 조건을 보이기 위해 이것을 보이는 것으로 충분하다'
    - https://m.blog.naver.com/ssinznday/221956292856

- c.f.(비교)
  - confer의 약자, A(c.f. B)는 B와 A가 다르니 잘 비교해서 보라는 뜻.

- i.e.(즉, 다시 말하면)
  - 라틴어 id est의 약자, 영어로는 that is 에 해당
  - A (i.e. B)는 A를 다시 말하면 B와 수학적으로 같다는 의미
  - https://m.blog.naver.com/ssinznday/221956292856

- let A be B(A를 B라 하자.)
  - 수학을 전공하다 보면 굉장히 많이 보게 되는 표현
  - A라는 것을 B라는 조건으로 두고서 문제를 풀 때 사용
  - https://m.blog.naver.com/ssinznday/221956292856

- pf(증명)
  - Proof의 약자, 명제를 증명할 때 사용.

- sol(풀이)
  - Solution, 문제를 풀 때 사용

- Thm(정리)
  - Theorem, 정리는 자주 사용하는 참인 명제.
  - https://m.blog.naver.com/ssinznday/221956292856


- Def(정의)
  - Definition, 정의는 A는 B이다. 라고 정한 것을 말함.
  - 정의에는 참, 거짓이 없습니다. 그냥 그대로 가져다 사용하시면 됩니다.
 
- Contradiction(모순) `→   ←`
  - 결론을 부정하여 모순임을 보이는 증명 방법인 '귀류법'에서 사용
  - 간단하게 번개 모양의 화살표
  - → ←
  - I am surprised to see that nobody has mentioned ⊥ . In logic, this is a standard symbol for a formula that is always false, and therefore represents a contradiction exactly.
  - In almost all logical formalisms, one has a rule of inference that allows one to deduce p
from ⊥ for any p at all, and it is usually possible to prove that (p∧¬p)→⊥ and so forth.
  - https://math.stackexchange.com/questions/160039/are-there-any-symbols-for-contradictions

# ∀ (For all)
- 두 개의 닮은꼴 문자가 있다.

```
∀: U+2200, FOR ALL
Ɐ: U+2C6F, Turned A
ɐ: U+0250, Small turned A
```

- 수학 기호 `∀`: For all(포 올)이라고 부르며, 전칭(全稱) 기호, 보편양화사라고도 한다. '모든 것에 대하여'를 의미한다. 이 글자도 A를 뒤집어서 만든 글자이기는 하다. 이 기호를 가장 처음 사용한 사람은 게르하르트 겐첸(Gerhard Gentzen)으로, 더 먼저 만들어진 `∃` ∃(존재하는)로부터 착안했다고 한다. 아마도 'all'[1]의 앞글자에서 따왔을 듯하다. TeX에선 `\forall` 로 표시한다
- https://namu.wiki/w/%E2%88%80

# for all 여기 글 보다가 나옴
- https://varkor.github.io/blog/2018/07/03/existential-types-in-rust.html

<hr />

<hr />

# How to self study pure math - a step-by-step guide

https://youtu.be/byNaO_zn2fI


# 물리학의 지도

https://youtu.be/ZihywtixUYo


# 푸리에 변환이 대체 뭘까요? 그려서 보여드리겠습니다.

https://youtu.be/spUNpyF58BY

<hr>

# 애니매이션으로 모든 물리학 공식과 같이 연관 되어 보기.. 진짜 대박 최고 !!❤
- Animation vs. Physics | Alan Becker
  - https://youtu.be/ErMSHiQRnc8?si=mG-sttkOox6CS7Oq
- Animation vs. Math | Alan Becker
  - https://youtu.be/B1J6Ou4q8vE?si=53zJzMx2_-mTXdbS


<hr>

# 뉴턴 vs 라이프니치의 미적분 이야기 | 문명과 수학 | EBS 컬렉션 - 사이언스
- https://youtu.be/GJO-52Xm6JU?si=eeKIAaDbj7NirGlz

<hr>

# 일반상대성 이론 이해하기 General Relativity Lecture 1 | Stanford
- https://youtu.be/JRZgW1YjCKk?si=j_jkmTrcVEgJi_DA

# General Relativity Lecture 2
- https://youtu.be/5VKyRVLMMQ4?si=eoAwXjm0hKEHxE6t

<hr>

# (초끈이론)물의 최소 단위는 입자가 아니라 끈이다? 우주의 모든 것을 설명할 수 있는 단 하나의 이론 #과학 #EBS지식
- EBS 지식
  -  https://youtu.be/NTqUP3jQfN0?si=0bRO0G5NzDzAD-je



<hr />



<hr />


<hr>

- 7hr짜리 통합본(설 특집 풀버전) 김갑진 교수의 물리학 시리즈 (고전역학, 전자기학, 양자역학) [KAIST 김갑진 교수]
  - https://youtu.be/q4NEhgLC8lA?si=B86so_F_DchQrDBt

<hr>

- 고전역학 1편, 과학이란 무엇인가? (KAIST 김갑진 교수의 물리학 특강 1/8) | 안될과학 Unrealscience
  - https://youtu.be/s4xTAYAYqSA?si=lVUDQ0sVsaaAs0VD

- 중력과 시간이란 무엇인가? 고전역학 2편 (KAIST 김갑진 교수의 물리학 특강 2/8) | 안될과학 Unrealscience
  - https://youtu.be/icNXbHm-fVA?si=3RiDyouAGDn5ngI8

- 에너지란 무엇인가? 고전역학 3편 (KAIST 김갑진 교수의 물리학 특강 3/8) | 안될과학 Unrealscience
  - https://youtu.be/j6GpJdmwtoY?si=FwVFbkxt8Fs6WkXi

- 전기와 자기는 어떻게 발견되었나? 전자기학 1편 (KAIST 김갑진 교수의 물리학 특강 4/8) | 안될과학 Unrealscience
  - https://youtu.be/UfzT5pGKujc?si=8cFqJGVfsBa6zpv6

- 맥스웰 방정식의 의미! 전자기학 2편 (KAIST 김갑진 교수의 물리학 특강 5/8) | 안될과학 Unrealscience

  - https://youtu.be/OTF-oP7io_M?si=ungrjP_BujG9BE-n

- 빛은 입자인가 파동인가? 양자역학 1편! (KAIST 김갑진 교수의 물리학 특강 6/8) | 안될과학 Unrealscience
  - https://youtu.be/RglES21LdxE?si=JW6gKYca97QIZvM6

- 입자의 스핀과 불확정성의 원리란? 양자역학 2편! (KAIST 김갑진 교수의 물리학 특강 7/8) | 안될과학 Unrealscience
  - https://youtu.be/As2tGiGwjl4?si=KyJxHliSSOQioqja

- 양자컴퓨터란 무엇인가? 양자역학 3편! (KAIST 김갑진 교수의 물리학 특강 8/8) | 안될과학 Unrealscience
  - https://youtu.be/gjp9301in0U?si=3RDEvy26mChsOa0P

<hr>

- (설 특집 편집 합본 풀버전) 판타레이! 유체역학의 역사 그리고 낭만 과학사! [S&H연구소 민태기 소장] | 안될과학 Unrealscience
  - https://youtu.be/UDE9U26ZLuQ?si=axUKsYllHGjfqByz

<hr>

- 과학사모아보기 | 안될과학 Unrealscience
  - https://youtube.com/playlist?list=PLFs8qkZ9PQlc_shO4UO0OfngzK7tE7H6U&si=cKbXjJJlwpeKW32k

- 과학자들의 막장드라마가 펼쳐진다?뉴턴과 데카르트의 유체배틀 유체역학의 역사 1/15 (민태기 박사) | 안될과학 Unrealscience
  - https://youtu.be/ykZU0RNLwlo?si=ZZh3RNvVKVbCajLQ


- 왜 물리학의 천재들은 유체역학 연구를 포기했나? 유체역학의 역사 13/15 (민태기 소장) | 안될과학 Unrealscience
  - https://youtu.be/4SPYdbuumB8?si=czrxxC1hW2Nmr6Lg

- 나비에-스토크 방정식! 방정식이 갖는 의미는? 유체역학의 역사 15/15 (민태기 소장) | 안될과학 Unrealscience
  - https://youtu.be/rv8phdMB5XA?si=X51gXDvT9APaDVM1


<hr>

# 고전물리의 완성 (19세기말) 물체의 운동 2개 , 전기와 자기로 이세상 설명이 다 가능함.[[🔝]](#link)

# 물체의 운동 2개 ~~~~~start~~~~

## $F = ma$ 

## $F = G\frac{Mn}{r^2}$ 

# 물체의 운동 2개 ~~~~~end~~~~

<hr>

# 전기와 자기 4개 공식 ~~~~~start~~~~[[🔝]](#link)

## $\nabla\cdot E = \frac{\rho}{\epsilon_0}$  (Gauss'Law)

## $\nabla\cdot B = 0$ (Gauss'Law for Magnetism)

## $\nabla\times E = -\frac{\partial B}{\partial t}$ (Faraday's Law)

## $\nabla\times B = \mu_0(J+\epsilon_0\frac{\partial E}{\partial t})$ (Amperer's Law)

<br>

- $\cdot$ 점은 전자가 퍼져나가던가 모이던가
- $\times$ 곱하기 는 회전

![Screenshot 2024-01-16 at 9 41 02 PM](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/6a828bc8-8067-420c-bcaa-26437db63330)

- 현대의 벡터의 개념이 나오고 맥스웰 공식이 20개에서 4개로 줄어들었다.
  - '전자기파'는 어떻게 발견되었을까! 맥스웰 방정식의 그 이야기! [안될과학 - 랩미팅 12화] | 안될과학 Unrealscience
    - https://youtu.be/5UDuZ0Z_muo?si=R5nAt4XvwkxeZjs2
    - (헤비사이드) 맥스웰 20가지 공식을 4개의 공식으로 정리함(올리버 헤비사이드(Oliver Heaviside ; 1850년 ~ 1925년)는 영국의 수리 물리학자 및 전기 공학자이다)
      - https://namu.wiki/w/%EC%98%AC%EB%A6%AC%EB%B2%84%20%ED%97%A4%EB%B9%84%EC%82%AC%EC%9D%B4%EB%93%9C
      - https://ko.wikipedia.org/wiki/%EC%98%AC%EB%A6%AC%EB%B2%84_%ED%97%A4%EB%B9%84%EC%82%AC%EC%9D%B4%EB%93%9C 

- Ampere_maxwell https://em.geosci.xyz/content/maxwell1_fundamentals/formative_laws/ampere_maxwell.html

- 그리스 문자2(전자기 잘 정리됨) https://blog.naver.com/kogyver1/60107038104 

- 전자기 정리2 http://tomoyo.ivyro.net/123/wiki.php/TeX_%EB%B0%8F_LaTeX_%EC%88%98%EC%8B%9D_%EB%AC%B8%EB%B2%95 

- 미분 관련 수학 https://koodev.tistory.com/43 

![elect2](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/94f6aa2e-058d-478e-b3e0-91e329435e97)

- 출처 : 맥스웰 방정식의 의미! 전자기학 2편 (KAIST 김갑진 교수의 물리학 특강 5/8) | 안될과학 Unrealscience
  - https://youtu.be/OTF-oP7io_M?si=ungrjP_BujG9BE-n



# 전기와 자기 4개 공식 ~~~~~end~~~~

# 파동방정식[[🔝]](#link)

## $\nabla^2 E - \mu_0\epsilon_0 \frac{\partial^2 E}{\partial t^2} = 0 $
- 파동방정식은
  - 시간으로 두 번 미분
  - 공간으로 두 번 미분 이러면 무조건 파동방정식
- (Wave equation, Schrödinger Equation 혹은 Eigenvalue Equation)

  - 양자화학의 이해 11 https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiQp5HT6uGDAxWCjK8BHbCPC08QFnoECAoQAw&url=https%3A%2F%2Fnew.kcsnet.or.kr%2Fmain%2Fk_download%2Fchemedu_download.htm%3Fchempdf%3D3202050.pdf&usg=AOvVaw0mpXwPF_Ju_su3FEZcyF-W&opi=89978449 

<hr>

![Screenshot 2024-01-16 at 10 00 48 PM](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/6b0c1e2f-7979-4983-8d4d-10830bc57bf9)

- 출처: 에너지란 무엇인가? 고전역학 3편 (KAIST 김갑진 교수의 물리학 특강 3/8) | 안될과학 Unrealscience
  - https://youtu.be/j6GpJdmwtoY?si=FwVFbkxt8Fs6WkXi


<hr>

<br>

# 현대물리는 여기에 양자역학을 추가하면 됨.[[🔝]](#link)

https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/writing-mathematical-expressions

- 그리스 문자 https://namu.wiki/w/%EA%B7%B8%EB%A6%AC%EC%8A%A4%20%EB%AC%B8%EC%9E%90


- 미분연산자 나블라 http://tomoyo.ivyro.net/123/wiki.php/TeX_%EB%B0%8F_LaTeX_%EC%88%98%EC%8B%9D_%EB%AC%B8%EB%B2%95  

- Wiki https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:TeX_%EB%AC%B8%EB%B2%95 

- LaTex http://tug.ctan.org/info/symbols/comprehensive/symbols-a4.pdf 

<hr>

<hr>

# The Mystery of Spinors | Richard Behiel [[🔝]](#link)
- https://youtu.be/b7OIbMCIfs4?si=Dxyd231uerWk-8XE

<hr>

# The Math behind (most) 3D games - Perspective Projection | Brendan Galea[[🔝]](#link)

https://youtu.be/U0_ONQQ5ZNM

#  The scariest thing you learn in Electrical Engineering | The Smith Chart | Zach Star[[🔝]](#link)

https://youtu.be/pXWbdxOAuDs?si=iFq4dmffn2YGsfSk


# The Vector Equation of a 3D Line | Serpentine Integral[[🔝]](#link)
- https://youtu.be/3qZcgiTZRPA?si=NYOhoHgtao1xNBF-

# Understanding Lagrange Multipliers Visually | Serpentine Integral[[🔝]](#link)

https://youtu.be/5A39Ht9Wcu0?si=YhRq5P-oInEfatXF

# Change of Variables and the Jacobian | Serpentine Integral[[🔝]](#link)

https://youtu.be/hhFzJvaY__U?si=LSdQZsmFa6OkwhEV

# (영상모아보기)Multivariable Calculus Theory | Serpentine Integral[[🔝]](#link)

https://youtube.com/playlist?list=PLjHDjmY5z0pn_p5haaVYA-Epp5Hwx1gXO&si=88hlIRfY5q_B7a2q


<hr>

# Ampere-Maxwell[[🔝]](#link)

https://em.geosci.xyz/content/maxwell1_fundamentals/formative_laws/ampere_maxwell.html


<hr>

<hr>

# 위상수학[[🔝]](#link)

# 3차원 쌍곡 공간의 강직성: 유한 부피에서 무한 부피까지 [3] 2024년 2월 23일[[🔝]](#link)
- https://horizon.kias.re.kr/27045/

<hr>

<hr>

# Game Dev.[[🔝]](#link)

# 계산 퍼즐에 대한 가장 예상치 못한 답 | 3Blue1Brown[[🔝]](#link)
- https://youtu.be/HEfHFsfGXjs?si=ddtsMPkjMnAXohv-

# quaternion[[🔝]](#link)

# How to rotate 2D image in 3D space using a quaternion[[🔝]](#link)
- https://gamedev.stackexchange.com/questions/204878/how-to-rotate-2d-image-in-3d-space-using-a-quaternion

# 입체 투영으로 쿼터니언(4d 숫자) 시각화| 3Blue1Brown[[🔝]](#link)
https://youtu.be/d4EgbgTm0Bg?si=yTm8-X8ARBHF8cTU


# n차원 이해하기(n차원 세계에서 일어나는 믿을 수 없는 신기한 현상!! | 12 Math[[🔝]](#link)

- https://youtu.be/EXHR2-hECRM?si=w0upBH2l9W3xHXjO

# 내적 외적 이해[[🔝]](#link)
https://youtu.be/cpRgDDoGktk?si=qa8mwYFozUndljND

- [ 벡터의 내적과 외적 비교 ](https://rfriend.tistory.com/search/%EB%82%B4%EC%A0%81%EA%B3%BC%20%EC%99%B8%EC%A0%81)
  - (comparison between inner(or dot) product and outer(or cross) product of vector)
![img1 daumcdn](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/af9ed591-ec97-470c-ba1d-ae1247b2b541)

- 출처: [https://rfriend.tistory.com/search/내적과 외적](https://rfriend.tistory.com/search/%EB%82%B4%EC%A0%81%EA%B3%BC%20%EC%99%B8%EC%A0%81) [R, Python 분석과 프로그래밍의 친구 (by R Friend):티스토리]



# 직교성 (Orthogonality[[🔝]](#link)
https://hewonjeong.github.io/orthogonality/


# 허수(Imaginary number, 𝑖ℝ , 𝕀 , 𝔍 )는 어떻게 만들어 졌을까? : 지면 실업자가 되는 수학 배틀[[🔝]](#link)

- https://economiceco.tistory.com/m/15511

![img1 daumcdn](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/8a84c58a-ed02-48c4-ada0-23eba082f27b)
![img1 daumcdn](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/ee45a2e9-6f93-4215-a7b4-8018b6f6aa5d)

# 다차원이해와 허수
- https://youtu.be/G3UZyJ3RG2o?si=OvNryFU-WzFRjiX0

# 이산 수학(discrete mathematics)❤책에 나오는 수학용어 영어로 ❤️정리(자연수ℕ, 정수ℤ...등등)[[🔝]](#link)

- https://economiceco.tistory.com/m/12911

# Quick Understanding of Homogeneous Coordinates for Computer Graphics | Miolith[[🔝]](#link)

- https://youtu.be/o-xwmTODTUI?si=ibZnxrrPtfW5uEwB

<hr>

# Writing a Physics Engine from scratch | Pezzza's Work[[🔝]](#link)
- https://youtu.be/lS_qeBy3aQI?si=YBq9nGbzMDISR-xC

<hr>

# 백지 상태에서 미분 완전 정복 3시간 | 침착맨[[🔝]](#link)
- https://youtu.be/WVgJzNtJh-w?si=gb1W9VU--Gnc128k

<hr>

# Animation vs. Geometry | Alan Becker[[🔝]](#link)

- https://youtu.be/VEJWE6cpqw0?si=oB_OXtc8E9V8dsu_

<hr>

# Voronoi Edges Explained Part. 1 | Yusef28[[🔝]](#link)

https://youtu.be/g2bILAVIIvM?si=QrE41zrOxR2R0LRM

<hr>

# (MATHEMATICS) 3차원 공간의 흐름(2024년 7월 25일)[[🔝]](#link)
- https://horizon.kias.re.kr/29431/

<hr>

# Ray Tracing Harmonic Functions[[🔝]](#link)
- https://youtu.be/oDwedIuqh5Q?si=WPMYFULvJIESeyRX
  - Mark Gillespie

<hr>

# To Master Physics, First Master The Rotating Coordinate System | Dialect[[🔝]](#link)
- https://youtu.be/pD9NxA1aV7E?si=UY05Zemzy72ve0-3



