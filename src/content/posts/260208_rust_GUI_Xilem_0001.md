---
title: 260208_rust_GUI_Xilem_0001
published: 2026-02-08
description: 'Rust GUI Xilem 최신 GUI 기술을 알아보자 paralles기술이 적용된 최고의 GUI'
image: ''
tags: [rust, xilem, GUI]
category: 'rust_GUI'
draft: false 
lang: ''
---

# link

- 여기에 GUI대부분 정리중.
  - https://github.com/YoungHaKim7/rust_gui_app_in_summary

# rust_GUI_Xilem_Training
- https://github.com/linebender
  - https://github.com/linebender/xilem

# link

- [최신뉴스(Latest_News)](#최신글-latest-news)

- [Xilem요약](#xilem)

<hr />

- 동영상 강연내용
- [(외부링크)240605_Xilem_강의내용github(pdf)](https://github.com/rustnl/meetups/tree/main/20240507-delft/slides)
  - https://docs.google.com/presentation/d/1355q8bpSUUCLDNy-YJ1QbaeBBG3px7Bv6YirkLXHIFw/edit#slide=id.p
  - [Xilem설계 분석! Druid부터 어떤 고민을 가지고 GUI를 고성능 최고의 작품을 만들수 있는지 분석해보자](./003_Xilem_an_architecture_for_UI_in_Rust)

- Xilem을 설명한 귀중한 동영상(240605)
  - [240605xilem-lets-build-high-performance-rust-ui---raph-levien--rust-nederland-rustnl](#240605xilem-lets-build-high-performance-rust-ui---raph-levien--rust-nederland-rustnl)

- niko-matsakis의 강연내용(240605)
  - [240605type-theory-for-busy-engineers---niko-matsakis--rust-nederland-rustnl](#type-theory-for-busy-engineers---niko-matsakis--rust-nederland-rustnl)
- Reddit관련정보
  - [Xilem 2024 plans Reddit글](https://www.reddit.com/r/rust/s/4AeLbaXNHV)
  - [Xilem: Rust로 만든 UI 아키텍처](https://www.reddit.com/r/rust/comments/ukk1p4/xilem_an_architecture_for_ui_in_rust/?tl=ko&utm_source=share&utm_medium=mweb3x&utm_name=mweb3xcss&utm_term=1&utm_content=share_button)

- xilem 만든 개발자 홈페이지(좋은글 많다)
  - https://raphlinus.github.io/rust/gui/2022/05/07/ui-architecture.html

<hr />

- 컴퓨터 상식
  - [DXC / ICD / GLSL / HLSL / SPIR-V VMA차이점](#dxc--icd--glsl--hlsl--spir-v-vma차이점)
  - [gpu는-어떻게-작동할까--brd-3d & CPU는 어떻게 작동할까? | bRd 3D](#gpu는-어떻게-작동할까--brd-3d)
  - [컴퓨터의-구조는-어떻게-되어있을까-cpu와-메모리-안될과학---랩미팅-15화--안될과학-unrealscience](#컴퓨터의-구조는-어떻게-되어있을까-cpu와-메모리-안될과학---랩미팅-15화--안될과학-unrealscience)

- Shader기초
  - [(외부링크)쉐이더 기술 이해_Shader compiler and tools for SDLSL (Simple Directmedia Layer Shader Language)](https://github.com/YoungHaKim7/SDL3_Rust_Game_Training?tab=readme-ov-file#%EC%89%90%EC%9D%B4%EB%8D%94-%EA%B8%B0%EC%88%A0-%EC%9D%B4%ED%95%B4_shader-compiler-and-tools-for-sdlsl-simple-directmedia-layer-shader-language)


<hr />

- [외부링크) Xilem: an architecture for UI in Rust](https://raphlinus.github.io/rust/gui/2022/05/07/ui-architecture.html)

  - [외부링크)elm architecture_아키텍쳐 이해_(A particularly common architecture for UI in Rust is The Elm Architecture](https://guide.elm-lang.org/webapps/structure.html)


<hr>

# Xilem[|🔝|](#link)

<p align="center">

  [![crates.io](https://img.shields.io/crates/v/xilem.svg)](https://crates.io/crates/xilem)
  [![Downloads](https://img.shields.io/crates/d/xilem.svg)](https://crates.io/crates/xilem)
  [![docs.rs](https://docs.rs/xilem/badge.svg)](https://docs.rs/xilem)
  <a href="https://github.com/linebender/xilem"><img alt="githubicon" width="20px" src="https://user-images.githubusercontent.com/67513038/218287708-001511d7-1cce-42d3-92d2-4a61193b38f0.png" /></a>![floemstar](https://img.shields.io/github/stars/linebender/xilem.svg)

</p>

- An experimental Rust native UI framework
  - Xilem is a UI toolkit. It combines ideas from Flutter, SwiftUI, and Elm. Like all of these, it uses lightweight view objects, diffing them to provide minimal updates to a retained UI. Like SwiftUI, it is strongly typed. For more details on Xilem's reactive architecture see Xilem: an architecture for UI in Rust.
    - Github 
      - https://github.com/linebender/xilem
    - crates
      - https://crates.io/crates/xilem

  - Rust 용 Data-first UI 디자인 툴킷인 Druid 를 만들었던 사람의 제안 글이네요. 꽤 긴글이라 도입부만 옮겨봅니다. 결과물이 나와봐야 알 것 같아요. Raph Levien은 사실 Druid만으로 말하기에는 너무 부족한 사람인데... (GPL) Ghostscript 메인테이너, Advogato 블로그 커뮤니티, Inconsolata 글꼴, Xi 편집기 등으로 예전부터 유명합니다.
    - https://raphlinus.github.io/rust/gui/2022/05/07/ui-architecture.html
    - https://news.hada.io/topic?id=6519

![1](https://github.com/YoungHaKim7/Cpp_Training/assets/67513038/e550734d-059b-4953-a011-9b315c9c8fa2)
- https://youtu.be/OvfNipIcRiQ?si=vn6pX8pVNB1dqSYq
  
# 최신글 Latest News[|🔝|](#link)
- [250324_나는 좋은 병렬 컴퓨터를 원해요](#gn-나는-좋은-병렬-컴퓨터를-원해요)
- 240119 https://linebender.org/blog/xilem-backend-roadmap/
- [(250603)Berkeley Seminar | Raph Levien | How Rust won: the quest for performant, reliable software | Topos Institute](https://youtu.be/k_-6KI3m31M?si=1M0I5qrYKiO8OVc4)

<hr />

# DXC / ICD / GLSL / HLSL / SPIR-V VMA차이점[|🔝|](#link)
- https://vulkan.lunarg.com/doc/sdk/1.4.304.1/windows/getting_started.html


- Terminology

|Term|	Description|
|-|-|
|DXC|	Microsoft's Open Source DirectX Shader Compiler|
|ICD|	Installable Client Driver: A Vulkan compatible display driver|
|GLSL|	OpenGL Shading Language|
|HLSL|	DirectX High-Level Shading Language|
|SPIR-V|	Standard Portable Intermediate Representation is a cross-API intermediate language (IL) that natively represents parallel compute and graphics programs|
|VMA|	The Vulkan Memory Allocator library provided by AMD.|
|Vulkan<br> Instance|	The Vulkan API object that stores all per-application states|
|Vulkan<br> Layer|	A library designed to work as a plug-in for the loader. It usually serves to provide validation and debugging functionality to applications|
|Vulkan<br> Loader|	A library which implements the Vulkan API entry points and manages layers, extensions, and drivers. It is found in the independent hardware vendor driver installs|

<hr>

# GPU는 어떻게 작동할까 | bRd 3D[|🔝|](#link)
- https://youtu.be/ZdITviTD3VM?si=Vr5NAYIbEncS0FtA

- 필수 단어(3D를 이해하기 위한 상식)
  - vertex -> 복수형 vertices
  - Polygon mesh
    - https://en.wikipedia.org/wiki/Polygon_mesh
  - Vertex Format(정점 형식)
    - https://paroj.github.io/gltut/Optimize%20Vertex%20Format.html
  - 정점 버퍼(Vertex Buffer)
    - https://vitacpp.tistory.com/71

# '컴퓨터'의 구조는 어떻게 되어있을까? CPU와 메모리! [안될과학 - 랩미팅 15화] | 안될과학 Unrealscience[|🔝|](#link)
- https://youtu.be/SiC74U8aJbM?si=t32SXPlahWLzeGLb

# CPU는 어떻게 작동할까? | bRd 3D[|🔝|](#link)
- https://youtu.be/Fg00LN30Ezg?si=6rixw2fhGOljPI9r


<hr>

# xilem 맛보기

##  계산기 만들기

- 예전 Druid에서 넘어와서 코드에 흔적들이 남아있다.

  - [xilem calculator 예시 코드](https://github.com/YoungHaKim7/rust_GUI_Xilem_Training/tree/main/002_Xilem_training_GUI/calculator)

```rs
use winit::{dpi::LogicalSize, error::EventLoopError, window::Window};
use xilem::{
    view::{
        button, flex, label, sized_box, Axis, CrossAxisAlignment, Flex, FlexExt, FlexSequence,
        FlexSpacer, MainAxisAlignment,
    },
    EventLoop, EventLoopBuilder, WidgetView, Xilem,
};

const DISPLAY_FONT_SIZE: f32 = 30.;
const GRID_GAP: f64 = 2.;

struct Calculator {
    current_num_index: usize,
    clear_current_on_input: bool,
    numbers: [String; 2],
    result: Option<String>,
    operation: Option<String>,
}

#[derive(Copy, Clone)]
enum MathOperator {
    Add,
    Subtract,
    Multiply,
    Divide,
}

impl MathOperator {
    fn as_str(&self) -> &'static str {
        match self {
            MathOperator::Add => "+",
            MathOperator::Subtract => "-",
            MathOperator::Multiply => "x",
            MathOperator::Divide => "÷ ",
        }
    }
}

impl Calculator {
    fn clear_all(&mut self) {
        self.current_num_index = 0;
        self.result = None;
        self.operation = None;
        for num in self.numbers.iter_mut() {
            *num = "".into();
        }
    }

    fn clear_entry(&mut self) {
        self.clear_current_on_input = false;
        if self.result.is_some() {
            self.clear_all();
            return;
        }
    }

    fn on_equals(&mut self) {
        todo!();
    }

    fn on_delete(&mut self) {
        if self.result.is_some() {
            // Delete does not do anything with the result. Invalid action.
            return;
        }
        let mut num = self.get_current_number();
        if !num.is_empty() {
            num.remove(num.len() - 1);
            self.set_current_number(num);
        } // else, invalid action
    }

    fn on_entered_digit(&mut self, digit: &str) {
        if self.result.is_some() {
            self.clear_all();
        } else if self.clear_current_on_input {
            self.clear_entry();
        }

        let mut num = self.get_current_number();

        if digit == "." {
            if num.contains('.') {
                return;
            }
        } else {
            num += digit;
        }
        self.set_current_number(num)
    }

    fn get_current_number(&mut self) -> String {
        self.numbers[self.current_num_index].clone()
    }

    fn set_current_number(&mut self, new_num: String) {
        self.numbers[self.current_num_index] = new_num;
    }

    fn on_entered_operator(&mut self, operator: MathOperator) {
        // self.clear_current_on_input = false;
        // if self.operation.is_some() && !self.numbers[1].is_empty() {
        //     if self.result.is_none() {
        //         self.on_equals();
        //     }
        //     todo!();
        // }
        // self.operation = Some(operator);
        todo!();
    }
}

fn centered_flex_row<State, Seq: FlexSequence<State>>(sequence: Seq) -> Flex<Seq, State> {
    flex(sequence)
        .direction(Axis::Horizontal)
        .cross_axis_alignment(CrossAxisAlignment::Center)
}

fn flex_row<State, Seq: FlexSequence<State>>(sequence: Seq) -> Flex<Seq, State> {
    flex(sequence)
        .direction(Axis::Horizontal)
        .cross_axis_alignment(CrossAxisAlignment::Fill)
        .main_axis_alignment(MainAxisAlignment::SpaceEvenly)
        .gap(GRID_GAP)
}

fn display_label(text: &str) -> impl WidgetView<Calculator> {
    label(text).text_size(DISPLAY_FONT_SIZE)
}

fn expanded_button(
    text: &str,
    callback: impl Fn(&mut Calculator) + Send + Sync + 'static,
) -> impl WidgetView<Calculator> + '_ {
    sized_box(button(text, callback)).expand()
}

fn digit_button(digit: &'static str) -> impl WidgetView<Calculator> {
    expanded_button(digit, |data: &mut Calculator| {
        data.on_entered_digit(digit);
    })
}

fn operator_button(math_operator: MathOperator) -> impl WidgetView<Calculator> {
    expanded_button(math_operator.as_str(), move |data: &mut Calculator| {
        data.on_entered_operator(math_operator);
    })
}

// impl statics dispatch
fn app_logic(data: &mut Calculator) -> impl WidgetView<Calculator> {
    let num_row = |nums: [&'static str; 3], operator| {
        flex_row((
            nums.map(|num| digit_button(num).flex(1.)),
            operator_button(operator).flex(1.),
        ))
    };
    flex((
        // Display
        centered_flex_row((
            FlexSpacer::Flex(0.1),
            display_label(data.numbers[0].as_ref()),
            data.operation
                .as_ref()
                .map(|operation| display_label(operation.as_str())),
            display_label(data.numbers[1].as_ref()),
            data.result.is_some().then(|| display_label("=")),
            data.result
                .as_ref()
                .map(|result| display_label(result.as_ref())),
            FlexSpacer::Flex(0.1),
        ))
        .flex(1.0),
        FlexSpacer::Fixed(0.1),
        // Top row
        flex_row((
            expanded_button("CE", Calculator::clear_entry).flex(1.),
            expanded_button("C", Calculator::clear_all).flex(1.),
            expanded_button("DEL", Calculator::on_delete).flex(1.),
            operator_button(MathOperator::Divide).flex(1.),
        )),
    ))
    .gap(GRID_GAP)
    .cross_axis_alignment(CrossAxisAlignment::Fill)
    .main_axis_alignment(MainAxisAlignment::End)
    .must_fill_major_axis(true)
}

fn run(event_loop: EventLoopBuilder) -> Result<(), EventLoopError> {
    let data = Calculator {
        current_num_index: 0,
        clear_current_on_input: false,
        numbers: ["".into(), "".into()],
        result: None,
        operation: None,
    };

    let app = Xilem::new(data, app_logic);
    let min_window_size = LogicalSize::new(200.0, 200.);
    let window_size = LogicalSize::new(400., 500.);
    let windows_attributes = Window::default_attributes()
        .with_title("Calculator")
        .with_resizable(true)
        .with_min_inner_size(min_window_size)
        .with_inner_size(window_size);
    app.run_windowed_in(event_loop, windows_attributes)?;
    Ok(())
}

fn main() -> Result<(), EventLoopError> {
    run(EventLoop::with_user_event())
}

```

- https://github.com/linebender/xilem
  - 설명Doc https://github.com/linebender/xilem/tree/main/docs 

<hr />

# toml Fmt

- 설치 https://taplo.tamasfe.dev/cli/installation/binary.html
- Taplo예시 https://github.com/linebender/xilem
  - `.taplo.toml`

```bash
taplo format Cargo.toml
```

- `.taplo.toml`

```toml
# See https://taplo.tamasfe.dev/configuration/file.html
# and https://taplo.tamasfe.dev/configuration/formatter-options.html

[formatting]
# Aligning comments with the largest line creates
# diff noise when neighboring lines are changed.
align_comments = false

# Matches how rustfmt formats Rust code
column_width = 100
indent_string = "    "
```

<hr />

# 알아야할 크레이터 정리
- Font introspection, complex text shaping and glyph rendering.
  - 글꼴 성찰, 복잡한 텍스트 형태 및 글리프 렌더링.
  - https://github.com/dfrg/swash

- Rich text layout library(Parley provides an API for implementing rich text layout. It is backed by Swash.)
  - 리치 텍스트 레이아웃 라이브러리(Parley는 리치 텍스트 레이아웃을 구현하기 위한 API를 제공합니다. Swash가 지원합니다.)
  - https://github.com/linebender/parley
    - The Parley text stack
      - Currently, Parley directly depends on
      - four crates: Fontique, Swash, Skrifa, and Peniko.
        - These crates cover different pieces of the text-rendering process.





# (240605)Xilem: Let's Build High Performance Rust UI - Raph Levien | Rust Nederland (RustNL)[|🔝|](#link)
- https://youtu.be/OvfNipIcRiQ?si=vn6pX8pVNB1dqSYq
  - 강의내용 github https://github.com/rustnl/meetups/tree/main/20240507-delft/slides


Ralph의 발표에 큰 박수를 보내 주세요. 감사합니다.

- We're working on this project of building high-performance UI. It's under the Xilin kind of umbrella for the project, but I'm going to talk about, I'm going to give an overview of the pieces of it, but the call to action here is come and get involved in the project.
ChatGPT
  - 우리는 고성능 UI를 구축하는 프로젝트를 진행 중입니다. 이 프로젝트는 Xilin의 일종의 프로젝트 안에 있지만, 저는 여기서 그 구성 요소에 대한 개요를 제공할 거에요. 그러나 여기서의 콜 투 액션은 이 프로젝트에 참여해 주세요.

- So first, I want to talk a little bit about the goals of the project. So the real focus of this entire thing is high performance. And that's actually a little bit of an unusual goal. Most of the time, you're more focused on developer experience, and so on and so forth. But we really feel like high performance is the niche. This is why you would use Rust to build UI.
ChatGPT
  - 먼저, 이 프로젝트의 목표에 대해 조금 이야기하고 싶습니다. 이 전체 프로젝트의 진정한 초점은 고성능입니다. 실제로 이것은 조금 이상한 목표입니다. 대부분의 경우에는 개발자 경험에 더 집중하는 편이지만, 우리는 고성능이 중요하다고 생각합니다. 이것이 Rust로 UI를 구축하는 이유입니다.
    
- That's driving a lot of the decisions that we're making. We're also focused on a very rich 2D graphics model. We want to have full access to vector graphics with all of the goodies like gradients and also really good font support. I'll talk about that a little bit more. Of course, that's what I do. But we don't want to just have something that's high-performance and rich but very hard to program. We also want to make a really ergonomic, easy-to-use API on top of that. And we want this to work on desktop and mobile. The project is being funded by Google. It's a research project that's being funded by Google Fonts. And the focus of that is Android apps. So we want to do both. We want to demonstrate a really good experience on Android, but I think the community is interested in desktop and other targets as well.
ChatGPT
  - 이러한 결정에 많은 영향을 미치고 있습니다. 또한 매우 풍부한 2D 그래픽 모델에도 집중하고 있습니다. 우리는 그래디언트와 같은 모든 기능을 갖춘 벡터 그래픽에 완전한 액세스를 원합니다. 또한 정말 좋은 글꼴 지원도 필요합니다. 좀 더 자세히 이야기하겠습니다. 물론, 그게 제가 하는 일이죠. 하지만 우리는 고성능과 풍부함만 가지고 있어서 프로그래밍이 매우 어렵다면 안 되겠습니다. 또한, 그 위에 정말 편안하고 사용하기 쉬운 API를 만들고 싶습니다. 그리고 이것을 데스크톱과 모바일에서 작동하도록 하고 싶습니다. 이 프로젝트는 Google에서 자금을 지원하고 있습니다. 이는 Google Fonts에서 자금을 지원하는 연구 프로젝트입니다. 이 프로젝트의 초점은 Android 앱입니다. 그래서 우리는 둘 다 하려고 합니다. Android에서 좋은 경험을 보여주고 싶지만, 커뮤니티는 데스크톱과 다른 타겟에도 관심이 있습니다.


- This is a research project. The goals of this, we're not offering this as a product, you know, something that's fully ready to use out of the box. Maybe it will evolve into that over time, but the goals for right now are to discover, like, what is the best way to build UI in Rust and, you know, to what extent are we able to realize these goals of being extremely high performance and fully featured as a user interface.
ChatGPT

  - 이것은 연구 프로젝트입니다. 이 프로젝트의 목표는 제품으로 제공되는 것이 아니라, 상자에서 꺼내서 즉시 사용할 수 있는 것이 아닙니다. 시간이 지나면 이것이 그렇게 진화될 수도 있지만, 현재의 목표는 Rust로 UI를 구축하는 가장 좋은 방법을 발견하는 것입니다. 그리고 우리가 얼마나 고성능이고 기능이 풍부한 사용자 인터페이스를 실현할 수 있는지에 대한 범위입니다.


- We want to work with the community. This is maybe a little bit of a newer focus of the project, that we've been maybe a little bit siloed, maybe doing some of our own things. But as I go through the slides, you'll see that there are a number of decisions that we've made about how do we cooperate with the Rust ecosystem instead of just doing our own thing.
ChatGPT
  - 우리는 커뮤니티와 함께 일하고 싶습니다. 이것은 프로젝트의 조금 새로운 초점일 수 있습니다. 우리는 조금 격리되어 있었거나 자체적인 일을 하고 있을 수도 있습니다. 그러나 저는 슬라이드를 통해 진행하면서 우리가 어떤 결정을 내렸는지 볼 수 있을 것입니다. Rust 생태계와의 협력에 대해 어떻게 할 것인지에 대한 것이죠.


- This is kind of a picture of what the problems that you need to solve in UI, and I want to point people to Nico. Nico Burns did a talk on Monday, and there's also a white paper that's coming out soon, and that work is giving a much more complete picture of what you're seeing on the screen here. But we are seeing the problem in layers. So there's a top layer, which is reactivity, and this could be provided, like each of these layers, each of these boxes could be provided by a number of different crates. So this reactivity could be provided by Dioxys or Leptos, and then I'll be talking a lot more about what we're doing with this. And then there's a middle layer, which is solving a lot of the guts of what's involved in UI, of having a full collection of widgets and having gestures and layout and your text editing. There's a lot of problems that need to be solved at that layer. And then there's also a really important layer at the bottom of infrastructure. How do you connect to the platform, and how do you do the basic functions of drawing, text rendering, getting to your GPU, and accessibility? I'll be talking a lot more about that.
ChatGPT
  - 이것은 UI에서 해결해야 할 문제들의 그림이며, Nico에게 주목하고 싶습니다. Nico Burns가 월요일에 발표를 했고, 곧 나올 화이트 페이퍼도 있습니다. 그 작업은 여기 화면에서 보이는 것의 훨씬 완전한 그림을 제공합니다. 하지만 우리는 문제를 층별로 보고 있습니다. 맨 위층은 반응성입니다. 이것은 각각의 층, 각각의 상자들이 여러 다른 크레이트로 제공될 수 있습니다. 이 반응성은 Dioxys나 Leptos에 의해 제공될 수 있으며, 저는 이에 대해 더 자세히 이야기하겠습니다. 그리고 중간층에는 UI의 내용을 해결하는 많은 내부 구조가 있습니다. 위젯의 전체 컬렉션과 제스처 및 레이아웃 및 텍스트 편집을 가지고 있는 것과 관련된 많은 문제들이 있습니다. 그리고 매우 중요한 하단의 인프라 레이어도 있습니다. 플랫폼에 연결하는 방법과 그래픽 처리 장치에 도달하는 방법, 그리고 접근성은 어떻게 하는지에 대해 더 많은 이야기를 나눌 것입니다.


- So this is kind of our instantiation of this layered architecture. And so at the top level, we have the Xilin Reactive Architecture. In the middle layer, we have Masonry, which is our widget set, which does not depend on Xilin. So you could imagine using Masonry with Deoxys or Leptos. And then we're using Taffy for layout. And at the bottom, we have a mixture of things that are Rust ecosystem, like WinIT. We made a decision. We switched over in January from our own platform integration to using WinIT. And then a lot of the other things are things that we're building, that obviously we're building for use in Xilin, but we're also hoping can be used by other projects in the Rust ecosystem.
ChatGPT

- 이것은 저희가 층별 아키텍처를 구현한 것입니다. 맨 위층에는 Xilin 반응형 아키텍처가 있습니다. 중간층에는 Xilin에 의존하지 않는 위젯 세트인 Masonry가 있습니다. 그래서 Masonry를 Deoxys나 Leptos와 함께 사용할 수 있다고 상상할 수 있습니다. 그리고 레이아웃에는 Taffy를 사용하고 있습니다. 맨 아래층에는 WinIT과 같은 Rust 생태계의 혼합물이 있습니다. 우리는 1월에 우리 자체의 플랫폼 통합에서 WinIT을 사용하도록 전환하는 결정을 내렸습니다. 그리고 다른 많은 것들은 우리가 구축 중인 것들입니다. 분명히 Xilin에서 사용하기 위해 구축 중이지만, Rust 생태계의 다른 프로젝트에서도 사용될 수 있기를 희망합니다.


- Again, Xylem is generic. There's a Xylem core, which is generic over the element tree that it's driving, so we can drive masonry widget set and also give a demo of using the Xylem core to drive DOM and create experience that can run in the browser.
ChatGPT

  - 다시 말해, Xilem은 범용적입니다. Xilem 코어는 그것이 구동하는 요소 트리에 대해 범용적입니다. 그래서 우리는 Masonry 위젯 세트를 구동할 수 있고, 또한 브라우저에서 실행할 수 있는 경험을 만들기 위해 Xilem 코어를 사용하여 DOM을 구동하는 데모를 제공할 수 있습니다.

- So the Xilin architecture, the Xilin Reactive architecture, gives you very simple code. Like this is your classic counter example, and this is really all of the code that there is. This is the actual code that I'm going to run. So it's a pretty simple code to get this functionality. And if I run this,
ChatGPT
  - Xilin 아키텍처, Xilin 반응형 아키텍처는 매우 간단한 코드를 제공합니다. 이것은 전형적인 카운터 예제이며, 실제로 모든 코드가 여기에 있습니다. 이것이 실행할 실제 코드입니다. 이 기능을 얻으려면 매우 간단한 코드입니다. 실행하면,


- Pray to the demo gods, we have a usable example. Very simple. And I'll tempt the demo gods a little bit more and do a little bit of live coding. Let's add a checkbox to this. Also add a checkbox and test my live typing skills. And we'll call it is zero. And we'll be checked if count is actually equal to zero. And then on the action, we've got the app state, which in this case is just a count. And we've got a Boolean for whether it's checked. And we'll just set the count to zero or one based on sort of the opposite of the checked state. And we'll coerce that to 32. And this should give an error because checkbox, I'll just add it.
ChatGPT
  - 신의 이름으로 데모를 기도해봅니다. 우리에게 사용 가능한 예제가 있습니다. 매우 간단합니다. 그리고 조금 더 데모를 유혹하고 실시간 코딩도 해보겠습니다. 이것에 체크박스를 추가해 봅시다. 타이핑 실력을 테스트하고 체크박스를 추가해 보겠습니다. 이를 'is zero'라고 부르겠습니다. 그리고 count가 실제로 0과 같은 경우에만 체크되도록 하겠습니다. 그리고 액션에는 이 경우 앱 상태가 있으며, 이는 단순히 카운트입니다. 그리고 체크 여부에 대한 불리언이 있습니다. 그리고 체크된 상태의 반대에 따라 카운트를 0 또는 1로 설정하겠습니다. 그리고 이를 32로 강제 변환할 것입니다. 이것은 checkbox가 없기 때문에 에러가 발생해야 합니다. 간단히 추가하겠습니다.


- And this is a Mac M1, so this is going to be a lot slower than what you saw yesterday morning, but it's pretty fast still. And now we've got a checkbox there, and we can use that. You know, it's reactive, so if you change the count here, reset it, it's changing the checkbox state because that's all kind of computed in the app logic. It's here.
ChatGPT
  - 이건 맥 M1이라서 어제 아침에 보았던 것보다 훨씬 느릴 거예요. 그러나 여전히 꽤 빠릅니다. 이제 체크박스가 있고, 이를 사용할 수 있습니다. 반응형이기 때문에 여기서 카운트를 변경하면 체크박스 상태도 변경되며, 이는 모두 앱 로직에서 계산됩니다. 여기 있습니다.

- All right, back to the slides. So yeah, there's a few things that are a little bit different than a lot of the reactive layers that you see are derived from the JavaScript world, which is typically very dynamically type. And I think Xylem is a lot more inspired by Swift UI than it is by JavaScript frameworks. So everything that you're seeing, all of these views that are created are statically type. And that also means that the process of reconciliation, of dissing, this is all working statically typed data. So it's going to be a lot more efficient than doing something that's dynamically type. You'll also notice looking at that code that there are no macros in there, that these are actually fairly simple Rust value data types. Like, you know, when there's a string, well, there's no label in here. I'm not going to add a label, life-coded, but it's really just a string. And then that string is a view that creates the underlying label widget, but the programmer doesn't really have to worry about that.
ChatGPT
  - 좋아요, 다시 슬라이드로 돌아가 보겠습니다. 그래서 많은 반응형 레이어들이 일반적으로 JavaScript 세계에서 유래되었는데, 이는 보통 매우 동적으로 타입됩니다. 그리고 Xilem은 JavaScript 프레임워크보다는 Swift UI에서 많은 영감을 받았다고 생각합니다. 그래서 보고 계신 모든 뷰들은 정적으로 타입됩니다. 그리고 이는 모든 재조정 및 해결 과정이 정적으로 타입된 데이터에서 작동하기 때문에, 동적으로 타입된 것을 수행하는 것보다 훨씬 효율적일 것입니다. 그 코드를 보면 거기에 매크로가 없다는 것을 알 수 있습니다. 이것들은 실제로 상당히 간단한 Rust 값 데이터 유형입니다. 예를 들어, 문자열이 있는 경우, 여기에는 레이블이 없습니다. 레이블을 추가하지 않겠습니다. 라이브 코딩하는 것은 아니지만, 이것은 정말로 그냥 문자열입니다. 그리고 그 문자열은 기본 레이블 위젯을 생성하는 뷰이지만, 프로그래머는 실제로 그것에 대해 걱정할 필요가 없습니다.


- So as I mentioned, there's a generic Xilin core. In this case, we're generating a masonry view, which is our native widget type. But you could also generate other things like web, and I'll show an example of that.
ChatGPT

  - 제가 언급했듯이, 범용 Xilem 코어가 있습니다. 이 경우에는 Masonry 뷰를 생성하고 있습니다. 이는 우리의 네이티브 위젯 유형입니다. 그러나 웹과 같은 다른 것들도 생성할 수 있습니다. 그것의 예를 보여드리겠습니다.


- XIALM is based at the core of XIALM. Drawing is really essential to any GUI toolkit, and that's also where you tend to spend most of the CPU time, most of the performance. It's just how fast can you get this thing drawn onto the screen. And so that's a lot of what I've been doing over the past few years, really, is building a fast 2D rendering engine that does as much of the work as possible on the GPU. You want to do as little as possible on the CPU. You want to offload all of that work to the GPU. So it is implementing the full standard 2D imaging model. So we have vector paths with fills and strokes, gradients, images, clips, blends, and text. Let's go to the demo.
ChatGPT
  - XIALM은 XIALM의 핵심에 기반합니다. 그리기는 모든 GUI 툴킷에 매우 중요하며, 대부분의 CPU 시간, 대부분의 성능을 사용하는 곳입니다. 화면에 이것을 얼마나 빨리 그릴 수 있는가가 중요합니다. 그래서 지난 몇 년 동안 저는 가능한 한 많은 작업을 GPU에서 수행하는 빠른 2D 렌더링 엔진을 구축하는 데 주력해 왔습니다. CPU에서 최소한의 작업을 수행하고 가능한 많은 작업을 GPU로 오프로드하려고 합니다. 그래서 표준 2D 이미징 모델을 완전히 구현하고 있습니다. 따라서 우리는 벡터 경로와 채우기 및 스트로크, 그래디언트, 이미지, 클립, 블렌드 및 텍스트를 사용할 수 있습니다. 데모로 이동해 보죠.

- Um, let's see if we can...
ChatGPT
  - 제가 도와드릴 수 있는 게 있나요? 무엇을 하고 싶으세요?


- So, I'm just going to run through kind of our standard test scene so you always have the...
ChatGPT
  - 그러니까, 제가 표준 테스트 장면을 실행해볼게요. 그래서 항상...


- You need to have that. Some of these things, like we have a lot of things in there for stroking, because just in the past few months we've moved from the stroke expansion being computed on the CPU to entirely being computed on the GPU. And actually there's a paper that I just submitted to a conference, so you can see the preprint. There's a lot of math that goes into computing the stuff on the GPU.
ChatGPT
  - 그걸 갖고 있어야 해요. 최근 몇 달 동안 스트로크 확장이 CPU에서 계산되는 것에서 완전히 GPU에서 계산되도록 이동했기 때문에 그 중 일부는 CPU에서 계산되는 것이 있습니다. 사실, 제가 방금 학회에 제출한 논문이 있으니까 프리프린트를 볼 수 있어요. GPU에서 이런 것들을 계산하는 데는 많은 수학이 필요합니다.

- Mention the turn async off. Things go a lot faster. Here's a fun test scene that has, you know, a little bit, this is actually not a lot of strokes. We have test scenes in here as, you know, tens of thousands of strokes. And so this one is showing a bunch of things. It's showing the animation and an image in there. And one of the things that we're also showing here is that our text and font handling is able to do variable fonts. And one of the goals, one of the things that's kind of driving this is to be able to do richer things like animate those variable font parameters. So you can go from light to bold, and you can animate the widths completely dynamically. And that's a, to get really high performance, this would be a major challenge with existing TD graphics libraries. So this is just kind of going through, this is our engineering test scene. So here you can see all the different blend modes. There's more coming up that are sort of stress tests for how many line segments that you can have and still get decent performance. Yeah, this is another one. This is the motion mark example. And let's see with the stats that you can ramp up to, I think it goes up to like 70,000 and still running it over 120 frames a second. So the performance, moving all of this from the CPU to the GPU just unlocks hugely increased performance. I'll show you another example that really shows off their performance. This is one of our standards test scenes. It's a map of Paris. It has
ChatGPT
  - Async를 끄면 성능이 훨씬 빨라집니다. 여기 재미있는 테스트 장면이 있어요. 이것은 실제로 많은 수의 스트로크가 아니에요. 여기에는 수천 개의 스트로크가 있는 테스트 장면도 있습니다. 그래서 이것은 여러 가지를 보여줍니다. 애니메이션과 이미지를 보여주고 있습니다. 여기서 우리가 보여주고 있는 다른 것 중 하나는 텍스트와 글꼴 처리가 변수 글꼴을 다룰 수 있다는 것입니다. 이것을 통해 변수 글꼴 매개변수를 애니메이션화할 수 있는 등 보다 풍부한 기능을 수행할 수 있는 것이 목표 중 하나입니다. 예를 들어 글꼴 두께를 가볍게 바꾸거나 진하게 바꾸고, 너비를 완전히 동적으로 애니메이션화할 수 있습니다. 기존의 2D 그래픽 라이브러리로는 이를 구현하는 것이 매우 어려운 과제일 것입니다. 여기 엔지니어링 테스트 장면이 있습니다. 다양한 블렌드 모드를 모두 볼 수 있습니다. 좀 더 나오는 것들은 성능을 얼마나 향상시킬 수 있는지에 대한 스트레스 테스트입니다. 이것은 또 다른 예제입니다. 이것은 모션 마크 예제입니다. 그리고 통계를 보면, 70,000까지 올라가고도 여전히 초당 120프레임으로 실행됩니다. 모든 것을 CPU에서 GPU로 옮기면 성능이 크게 향상됩니다. 다른 예를 보여드리겠습니다. 이것은 우리의 표준 테스트 장면 중 하나입니다. 파리 지도입니다.

- A million path segments in the image. You can zoom in, you can see there's a lot of detail there. And, you know, when we're async off, you get hundreds of frames per second. And again, with standard rendering thing, it's challenging even to get 60 frames a second out of this particular test scene. So that's really a lot of what the Xylem project is about, is how do you exploit, if you have all that power, if you have all that graphical power, how do you exploit that from a REST UI? So there's a lot more to be said, including the multi-threaded encoding. Like, if you're rendering a scene of that richness and complexity, and you're only able to get that data to the GPU from a single thread, that can easily be the bottleneck. So one of the goals of this project is, have the different parts of the UI running in different threads, and have it assemble all these scene fragments together. So there's a lot of technical detail. I actually have a talk that I was gonna put a link, I forgot to do that. I did a talk at REST Lab last November, and I go into a lot more detail about the Velo engine. So if you're interested, go check out that talk.
ChatGPT
  - 이미지에는 백만 개의 경로 세그먼트가 있습니다. 확대해서 볼 수 있습니다. 많은 디테일이 있습니다. 그리고 async를 끄면 초당 수백 프레임을 얻을 수 있습니다. 그리고 표준 렌더링에서는 이 특정 테스트 장면에서 60프레임을 얻는 것도 어려울 정도입니다. 그래서 Xilem 프로젝트의 주된 목적 중 하나는 만약 그만한 파워가 있다면, 그만한 그래픽 파워가 있다면, 이것을 어떻게 활용할 것인가에 대한 것입니다. 다양한 기술적 세부 사항이 있습니다. 실제로 저는 작년 11월에 REST Lab에서 발표한 것이 있는데, 그때 Velo 엔진에 대해 더 많은 세부 정보를 다루었습니다. 만약 관심이 있다면, 그 발표를 확인해 보세요.

- So the way that we use Velo in Xilin is also interesting because this is a different API. This is not having a Canvas context that has an in-mute reference to it, which would restrict you to a single thread. So we have a model in which the widget in Xilin retains a scene fragment. So the scene fragment is kind of, you can think of a scene fragment as like a snippet of binary SVG. So if you're painting, you don't have to repaint the whole widget every time. Then you can retain that scene fragment and only re-encode the subtree when it's changed. And so you can do things like change the transform. So if you're doing scrolling, you don't have to be re-encoding all the content of what's inside that clip window. You can just reuse that and then have the GPU do all the work of re-rendering it. So it's all about making the CPU do as little as possible and making the GPU do the work where it can be actually about 10 times as efficient in terms of how much you can get per second or how much throughput you can get per watch.
ChatGPT
  - Xilem에서 Velo를 사용하는 방식도 흥미롭습니다. 이것은 다른 API입니다. 이것은 Canvas 컨텍스트를 가지고 있지만 해당 컨텍스트에 대한 내부 참조가 있는 것이 아니기 때문에, 이것은 단일 스레드로 제한되지 않습니다. Xilem에서는 위젯이 장면 조각을 보유하도록 모델을 가지고 있습니다. 장면 조각을 이해하는 방법은 바이너리 SVG의 일부 조각으로 생각할 수 있습니다. 따라서 그림을 그릴 때마다 전체 위젯을 다시 그리지 않아도 됩니다. 그런 다음 그 장면 조각을 보존하고 하위 트리가 변경될 때만 재인코딩할 수 있습니다. 그래서 변형을 변경할 수 있습니다. 따라서 스크롤링을 할 때 스크롤 창 안에 있는 내용의 모든 내용을 다시 인코딩할 필요가 없습니다. 해당 내용을 재사용하고 GPU에게 모든 렌더링 작업을 수행하도록 할 수 있습니다. CPU가 최소한의 작업을 수행하고 GPU가 작업을 처리할 수 있는 곳에서 실제로는 초당 얼마나 많은 양을 얻을 수 있는지 또는 시간당 얼마나 많은 처리량을 얻을 수 있는지 약 10배 효율적입니다.

- Another one of the layers, or another one of the bricks in that image, text is obviously really central to any GUI. And so we have this new crate. And all these crates, by the way, that you saw, the pictures that you see here in bold, most of these just got released in the last two or three weeks. Some of them, I think the Xylem crate actually got released at midnight, so yesterday or today. Alon, in preparation for this talk, of course, we've been working on it for a very long time, but Parley is another one that got released, I think maybe two or three weeks ago. And it's an advanced text layout engine. And so it does the basics of text layout. So it does paragraph layout with line breaking. It has the ability to set attributes. You can do bold and italic and all that fun stuff. But it goes, and of course, it's designed for performance, really really metal performance. But we're also trying to do some richer things. So it supports variable fonts. And one of our goals, we don't have it, what you saw in the demo was not using Parley, I don't think. But we want to support variable fonts. We want to support the animation of variable font access and do richer interactions in the UI. Parley itself, of course, works well with Bellow, but it is not tied to a specific 2D rendering image. So this is one of these blocks that you can mix and match however you like. There's some details here. It's depending, there's two crates that are kind of below Parley. One is called Fontique, and Fontique accesses the system fonts and enumerates them and figures out which font is needed to render which script. And there's also a crate called Screefa, which does the low level font loading. So this is really the Rust alternative to FreeType. I think one of the most exciting things about Screefa is that there's work in progress to get this integrated into Chrome. So that's actually in a Chrome Canary build, I believe under a flag. But the goal is to make that really production quality to support all of the font loading that kind of low level font needs that Chrome has, which is a pretty big requirement.
ChatGPT
  - 텍스트는 GUI에서 아주 중요한 요소입니다. 그래서 우리는 이 새로운 크레이트를 가지고 있습니다. 여기서 보이는 그림들은 대부분이 지난 두 ~ 세 주 동안 출시된 것입니다. 일부는 실제로 지난 밤 자정에 출시된 것 같습니다. 이 토크를 준비하는 동안 아론은 물론 오랜 시간동안 작업해 왔지만, Parley도 이번에 출시된 것 중 하나입니다. 고급 텍스트 레이아웃 엔진입니다. 기본적인 텍스트 레이아웃을 수행합니다. 문단 레이아웃과 줄 바꿈을 수행합니다. 속성을 설정할 수 있습니다. 볼드체와 이탤릭체 등 다양한 속성을 사용할 수 있습니다. 물론 성능을 위해 설계되었습니다. 매우 빠른 성능입니다. 그러나 더 풍부한 기능을 구현하려고 노력하고 있습니다. 그래서 변수 글꼴을 지원합니다. 변수 글꼴 액세스의 애니메이션과 더 풍부한 UI 상호 작용을 지원하려고 합니다. Parley 자체는 Bellow와 잘 작동하지만, 특정 2D 렌더링 이미지에 결합되지 않았습니다. 따라서 원하는 대로 혼합 및 일치시킬 수 있는 이러한 블록 중 하나입니다. 여기에는 세부 정보가 있습니다. Parley 아래에 두 개의 크레이트가 있습니다. 하나는 Fontique이라고 하며, 시스템 글꼴에 액세스하고 필요한 글꼴을 렌더링하는 데 필요한 글꼴을 찾습니다. 그리고 Screefa라는 크레이트가 있으며, 이는 저수준 글꼴 로딩을 수행합니다. 이는 실제로 FreeType에 대한 Rust 대안입니다. Screefa에 대한 가장 흥미로운 점 중 하나는 Chrome에 통합되는 작업이 진행 중이라는 것입니다. 실제로 Chrome Canary 빌드에서 이를 확인할 수 있습니다. 하지만 그 목표는 실제로 프로덕션 품질을 갖추고, Chrome이 필요로 하는 모든 글꼴 로딩을 지원하는 것입니다.

- Another major goal of our project is to support accessibility well out of the box. And so we're funding work on AccessKit, which is, I think, the Rust ecosystem create for doing accessibility. And so it's a portable abstraction layer. Each platform has its own API for how it exposes accessibility. And so the Mac and Windows and Linux, more recently, backends are working pretty well. Android is in progress. That's one of our goals, to get that working. AccessKit is, of course, written in Rust, but there are bindings. We want to make that available for other languages. And there's some technical details I'll skip past and just go straight to the demo.
ChatGPT
  - 프로젝트의 또 다른 주요 목표 중 하나는 기본적으로 잘 알려진 접근성을 지원하는 것입니다. 그래서 우리는 AccessKit에 대한 작업을 후원하고 있습니다. 이것은 접근성을 처리하기 위한 Rust 생태계 크레이트입니다. 따라서 이는 휴대용 추상화 계층입니다. 각 플랫폼은 접근성을 노출하는 방식에 대한 고유한 API를 갖고 있습니다. 그래서 Mac, Windows, 그리고 리눅스 백엔드는 최근에 잘 작동하고 있습니다. 안드로이드는 진행 중입니다. 그것이 우리의 목표 중 하나입니다. 작동하도록 하는 것입니다. AccessKit은 물론 Rust로 작성되었지만, 바인딩이 있습니다. 이를 다른 언어로 이용할 수 있도록 하고 싶습니다. 몇 가지 기술적인 세부 사항은 건너뛰고 바로 데모로 이동하겠습니다.

- So we'll actually use that same simple example, and I'll turn it on. I'll go into the settings here, and I think I'll probably turn down the offer to update my software and go into accessibility and just turn on voiceover. Great. Fantastic.
ChatGPT
  - 그래서 실제로 같은 간단한 예제를 사용할 거에요. 그리고 접근성을 켜볼 거에요. 설정으로 들어가서 여기서 나의 소프트웨어를 업데이트할 것을 거절하고 접근성로 들어가서 VoiceOver를 켜볼 거에요. 좋아요. 훌륭해요.
16분 41초까지~~~






<hr>



39분 부터~~~
- We're very happy to be working with Matt Campbell, who is the real creator of AccessKit.
ChatGPT

  - 저희는 AccessKit의 실제 제작자인 Matt Campbell과 함께 일하게 되어 매우 기쁩니다.


- in combination with async, so how would you for example make an HTTP request?
ChatGPT
  - async와 결합해서, 예를 들어 HTTP 요청을 어떻게 만들까요?

- We just ripped the async out, which is fun. But we had a prototype where we had async integrated fairly deeply, so you have the ability to do waking, which is, of course, the primary point at which async integrates with a UI toolkit on a per-widget basis. So, again, this is a prototype that we had working, and then when we were making various different transitions to win it, that was part of the thing that we ended up taking that out. But we are planning on bringing that back, so you absolutely would be able to have a widget that says, you know,
ChatGPT
  - 저희는 방금 async를 제거했는데, 재미있었어요. 그러나 async가 꽤 깊이 통합된 프로토타입이 있었어요. 그래서 UI 툴킷과 개별 위젯 단위로 통합되는 주요 지점에서 깨우기 기능을 수행할 수 있었죠. 그래서, 다시 말하지만, 이건 저희가 작동하던 프로토타입이었고, 다양한 전환을 하면서 그것을 제거하게 됐어요. 하지만 저희는 그것을 다시 도입할 계획이 있어서, 위젯이 그런 기능을 가지게 될 수 있을 겁니다.

- DAFA network request, and then paint the widget based on the loading state while you're waiting for the request to come back. And so there's a prototype. I can point people to the code based on kind of an older version. This is why it's research. It's like we need to figure out the best way for all of these pieces to come together.
ChatGPT

  - DAFA 네트워크 요청을 하고, 요청이 돌아오는 동안 로딩 상태를 기반으로 위젯을 렌더링하는 거죠. 그래서 그런 프로토타입이 있습니다. 이전 버전을 기반으로 코드를 보여드릴 수 있습니다. 이런 이유로 연구가 필요한 겁니다. 모든 요소가 어떻게 가장 잘 결합될 수 있는지를 찾아내야 하니까요.

- but it's planned.
ChatGPT

  - 하지만 계획되어 있습니다.

- I think this is the final question.
ChatGPT
  - 이게 마지막 질문인 것 같네요.

- Hello, I've also been following your work for some time and I remember in Druid there was this a bit bizarre layer of integration with the system like file dialogues and application persistence with window closing. What did you do with that in the new Xilib architecture?
ChatGPT
  - 안녕하세요, 저는 당신의 작업을 오랫동안 지켜봐 왔고, Druid에서는 파일 대화 상자와 창 닫기 시 애플리케이션 지속성과 같은 시스템 통합 계층이 좀 이상하게 보였던 걸로 기억합니다. 새로운 Xilib 아키텍처에서는 그것을 어떻게 처리하셨나요?

- Well, I mean, the platform integration, we've just switched over to WinIT, and that does mean that we have a regress, so there is not a file open dialogue in Xilem at the moment. And so we do plan on porting that stuff on top of WinIT. I think there's some really good questions of, you know, do we do that in a way that's specific to Xilem, or do we try and make a more general crate that could be used by other, maybe other things in the Rust UI ecosystem? I think that's a little bit open. Like, the current state is, you know, we're trying to get the new infrastructure really functioning, and then pull in pieces from the kind of previous Druid. Yeah, one.
ChatGPT
  - 글쎄요, 플랫폼 통합에 대해서는, 저희가 WinIT로 전환했는데, 그로 인해 퇴보가 있었습니다. 현재 Xilem에는 파일 열기 대화 상자가 없어요. 그래서 그것을 WinIT 위에 이식할 계획입니다. Xilem에만 특화된 방식으로 할지, 아니면 Rust UI 생태계의 다른 요소들도 사용할 수 있는 더 일반적인 크레이트로 만들지에 대한 좋은 질문이 있다고 생각합니다. 이는 조금 열려 있는 부분인 것 같아요. 현재 상태는 새로운 인프라를 제대로 작동하게 만든 후, 이전 Druid에서 일부 요소를 가져오는 것입니다. 네, 그렇습니다.

- TouchGrade was mentioned earlier today. I don't remember the name, but yeah.
ChatGPT
  - 오늘 아침에 TouchGrade가 언급되었어요. 이름은 기억나지 않지만, 맞아요.
Okay, so give a huge hand to Ralph for his talk. Thank you.


<hr>

<br>

<hr>

<br>


# Type Theory for Busy Engineers - Niko Matsakis | Rust Nederland (RustNL)[|🔝|](#link)
- https://youtu.be/9qLACD9Bfbk?si=jNu4BcHI7-1s4tKy

- Hmm, let's see. It's possible that the VoiceOver settings might need to be adjusted for it to read out loud. Sometimes there could be a delay or a glitch in the system. Would you like me to guide you through checking the VoiceOver settings to ensure it's properly configured?
So, I'm going to talk about type theory for Bitly engineers. So, normally, at least lately, I feel like I'm giving talks about Rust roadmap and Rust features and things like that, and I decided to do something a little bit different. So, yeah, who am I? Well, as I guess a legend, I was going to make me feel a little blushy right now, but yeah, I work on the Rust system and on the Rust language, and I've been doing that a long time.
ChatGPT
  - 오늘은 Bitly 엔지니어들을 위한 타입 이론에 대해 이야기해보려고 합니다. 보통은 러스트 로드맵이나 러스트 기능 등에 대해 이야기를 많이 하지만, 이번에는 조금 다른 주제를 선택했습니다. 그래서, 네, 제가 누구냐면요. 제 소개를 하려니 조금 부끄럽네요. 저는 러스트 시스템과 러스트 언어 작업을 하고 있습니다. 그리고 꽤 오랜 시간 동안 이 일을 해왔습니다.

- One of the things I've noticed along the way is, you know, at first when we were building out and designing aspects of Rust, we would do like little models. So, we would say, okay, we want to think about how the type system should work. I'm going to figure out, just think about this part in isolation, and that can get you really, really far, right? And then we would think about a different part. And so we draft, make a model, a sort of some subset of Rust that's relevant, and just think about that part. But we've gotten to the point now where actually it's becoming kind of hard to keep the whole thing in your head, and we have unexpected interactions, you know, or little problems that arise. And so I've gotten interested in how can we make a better model that will help us understand and extend Rust going forward, and think about the new things that Rust should do, right? So, the goal is to make...
ChatGPT
  - 우리가 러스트를 구축하고 설계하면서 처음에는 작은 모델을 만들곤 했습니다. 그래서 "타입 시스템이 어떻게 작동해야 할지 생각해보자"고 하면서 이 부분만 고립시켜서 고민했죠. 이런 식으로 접근하면 꽤 멀리 갈 수 있습니다. 그런 다음에는 다른 부분을 생각했습니다. 그래서 러스트의 관련된 일부분을 모델로 작성하고 그 부분만 고민했습니다. 그런데 이제는 전체를 머릿속에 모두 담아두기가 어려워졌고, 예기치 못한 상호작용이나 작은 문제가 발생하기도 합니다. 그래서 어떻게 하면 러스트를 더 잘 이해하고 확장할 수 있는 더 나은 모델을 만들 수 있을지에 대해 관심이 생겼습니다. 앞으로 러스트가 어떤 새로운 기능을 갖춰야 할지 생각하는 데 도움이 되는 모델을 만드는 것이 목표입니다.
 
- Take something that lets you kind of play with the type system and experiment with it in prototype. Not to build a shippable compiler, but to help you understand Rust as it is today and where it might go. And then along the way...
ChatGPT
  - 타입 시스템을 가지고 놀고 실험할 수 있는 무언가를 만들어 프로토타입으로 활용하는 것이죠. 실제 배포 가능한 컴파일러를 만드는 것이 아니라, 현재의 러스트를 이해하고 향후 러스트가 나아갈 방향을 모색하는 데 도움을 주는 것이 목적입니다. 그렇게 하면서...


- mirror formality. I was told I need to explain this for non-native Rust speakers. So, there's an expression we say, oh, that's just a mirror formality. Like, it's a tiny little detail that you can get past. And in this case, mirror is also the mid-level IR, the middle IR of the compiler. So, that was the pun of this project. But the goal is to basically model, in a formal-ish way, how the type checker works, especially for the mid-level IR. So, not really all the way to Rust surface syntax yet.
ChatGPT
  - 미러 형식성(mirror formality)에 대해 설명할 필요가 있다고 들었어요. '그건 그냥 형식적인 절차일 뿐이다'라는 표현이 있는데, 이 경우 '미러'는 컴파일러의 중간 표현(IR)을 의미해요. 그래서 이 프로젝트의 말장난이 되었죠. 하지만 목표는 타입 체커가 어떻게 작동하는지, 특히 중간 표현(IR) 수준에서 형식적으로 모델링하는 것입니다. 아직 러스트의 표면 구문까지는 가지 않아요.

- about mere formality here right now. What I'm going to talk about is a subset of it that I call Formality Core, mostly because formality was already taken on Crates.io. I don't remember by whom. I should find them out. But it's like a reusable part of it that you could use to model your own type systems if you were designing a language, like some people we saw today, like the really cool June language and so forth. Maybe it might be useful to them. I don't know. I found it fun for my own experiments.
ChatGPT
  - 여기서 이야기하려는 것은 미러 형식성(Mere Formality)의 일부인 Formality Core라고 부르는 것입니다. 주로 Crates.io에서 'formality'라는 이름이 이미 사용 중이었기 때문입니다. 누가 사용 중인지는 기억이 안 나네요. 찾아봐야겠어요. 어쨌든, 이것은 언어를 설계할 때 여러분이 자신만의 타입 시스템을 모델링할 수 있는 재사용 가능한 부분입니다. 오늘 본 것처럼 멋진 June 언어 같은 것도 포함해서요. 그들에게 유용할지 모르겠지만, 제 실험에는 재미있었습니다.

- It's heavily inspired by a tool I use called PLT Red X, which is this other programming language called Racket. And it's basically the same thing. It's like a lightweight tool for playing with type system definitions and letting you kind of use the notation that you might have read in an academic paper and put it into your computer and run it and play with it. Now, I just said that you might have read in an academic paper. But what I noticed is, shockingly, not that many people have actually read academic papers. They're kind of not designed for easy entry and understanding. And so what I thought I would do today is talk about how I think about it and how formality core, like use formality core and kind of to walk through a very simple type system and give you a feeling for what it looks like. And true fact, I have not done a dry run of this talk. I have no idea how long it's going to take. So either we're going to go way over or way under, and we'll take a bunch of questions. We're going to figure it out. It's going to be fun.
ChatGPT
  - 이 Formality Core는 제가 사용하는 도구인 PLT Redex에서 크게 영감을 받았습니다. 이것은 Racket이라는 다른 프로그래밍 언어의 도구로, 타입 시스템 정의를 다루고, 여러분이 학술 논문에서 본 표기법을 컴퓨터에 입력하고 실행해보는 경량 도구입니다. 그런데 제가 학술 논문을 읽어봤을 수도 있다고 했지만, 사실 많은 사람들이 실제로 학술 논문을 읽지 않는다는 것을 알게 되었어요. 학술 논문은 쉽게 접근하고 이해하기에는 좀 어렵게 작성되어 있습니다. 그래서 오늘은 제가 어떻게 생각하는지, 그리고 Formality Core를 사용해서 아주 간단한 타입 시스템을 걸어보면서 설명하려고 합니다. 참고로, 이 발표를 리허설해본 적이 없어서 얼마나 걸릴지 전혀 모르겠어요. 그래서 시간이 많이 초과되거나 부족할 수도 있지만, 질문도 많이 받고 함께 해보겠습니다. 재미있을 거예요.

- It's heavily inspired by a tool I use called PLT Red X, which is this other programming language called Racket. And it's basically the same thing. It's like a lightweight tool for playing with type system definitions and letting you kind of use the notation that you might have read in an academic paper and put it into your computer and run it and play with it. Now, I just said that you might have read in an academic paper. But what I noticed is, shockingly, not that many people have actually read academic papers. They're kind of not designed for easy entry and understanding. And so what I thought I would do today is talk about how I think about it and how formality core, like use formality core and kind of to walk through a very simple type system and give you a feeling for what it looks like. And true fact, I have not done a dry run of this talk. I have no idea how long it's going to take. So either we're going to go way over or way under, and we'll take a bunch of questions. We're going to figure it out. It's going to be fun.
ChatGPT
  - 이 Formality Core는 제가 사용하는 도구인 PLT Redex에서 크게 영감을 받았습니다. 이것은 Racket이라는 다른 프로그래밍 언어의 도구로, 타입 시스템 정의를 다루고, 여러분이 학술 논문에서 본 표기법을 컴퓨터에 입력하고 실행해보는 경량 도구입니다. 그런데 제가 학술 논문을 읽어봤을 수도 있다고 했지만, 사실 많은 사람들이 실제로 학술 논문을 읽지 않는다는 것을 알게 되었어요. 학술 논문은 쉽게 접근하고 이해하기에는 좀 어렵게 작성되어 있습니다. 그래서 오늘은 제가 어떻게 생각하는지, 그리고 Formality Core를 사용해서 아주 간단한 타입 시스템을 걸어보면서 설명하려고 합니다. 참고로, 이 발표를 리허설해본 적이 없어서 얼마나 걸릴지 전혀 모르겠어요. 그래서 시간이 많이 초과되거나 부족할 수도 있지만, 질문도 많이 받고 함께 해보겠습니다. 재미있을 거예요.

- But part of this is, you know, I didn't really learn. I never really took a course on type systems, actually. I just kind of read things, and eventually it sort of made sense. So, I'm going to be telling you kind of my way of thinking about it. Probably some people who have actually studied this kind of thing will have their own opinions. So, the way I think about formality core, anyway, is that…
ChatGPT
  - 하지만 이건 제가 사실 정식으로 타입 시스템에 대한 과정을 듣지 않았다는 부분과도 관련이 있어요. 저는 그냥 자료들을 읽으면서 스스로 이해한 거죠. 그래서 제가 여러분께 제 방식으로 어떻게 생각하는지 설명하려고 해요. 이 분야를 정식으로 공부한 사람들은 다른 의견이 있을 수도 있지만, 제 관점에서 본 formality core는…

- Anyway, is that
ChatGPT
  - 어쨌든, 제가 생각하는 formality core는 타입 시스템의 기본적인 개념을 실험하고 이해하는 데 도움을 주는 도구라는 점이에요. 이를 통해 다양한 타입 시스템을 모델링하고, Rust의 타입 시스템을 더 잘 이해할 수 있게 돕는 거죠.
 
- in parallel systems before, like in Java. Actually, I'm going to tell you an anecdote because it's funny. One of the first courses that was taught in Rust was a systems programming course at Northeastern, and they went through and they taught the students Rust, and they got up to concurrency, and then they had a problem because they wanted to teach them about data races, but they couldn't produce them. So they said, okay, we're going to stop, and we're going to teach you Java, and then you're going to learn Java. Now look at this horrible bug. Okay, let's go back to Rust. Now you don't have this bug. Okay, good. So Rust kind of made...
ChatGPT
  - 병렬 시스템에서도 경험이 있어요, 예를 들어 Java에서요. 사실 재미있는 일화를 하나 드릴게요. Rust가 처음으로 가르쳐진 과목 중 하나가 Northeastern 대학에서 시스템 프로그래밍 과목인데요, 학생들에게 Rust를 가르치고 병행성에 도달했을 때 데이터 레이스에 대해 가르치려고 했는데, 문제가 생겼어요. 왜냐하면 데이터 레이스를 발생시킬 수가 없었거든요. 그래서 "좋아, 여기서 멈추고 Java를 가르칠게요. 자, 이런 심각한 버그를 보세요. 이제 Rust로 돌아가 보세요. 이제 이 버그가 없죠. 좋아요." 이렇게 하면서 Rust는...

- That is the true story. But Rust made concurrency this thing, at least my experience of it, is, yeah, I can still have bugs, but it's kind of like I plug it together, and I can think about it, and experiment with it, and if it kind of works, it usually works all the way up. If it works for simple stuff, it works also for many complicated cases. Formality core has the same feeling. I want to bring that same feeling, but to experimenting with type systems.
ChatGPT
  - 그 이야기는 사실입니다. 하지만 Rust는 병렬성을 이런 식으로 만들어 냈어요. 적어도 제 경험 상으로는, 예, 여전히 버그가 발생할 수 있지만, 그것을 조합하고 생각하고 실험해볼 수 있고, 그것이 작동한다면 보통은 모든 경우에 작동합니다. 간단한 것에 대해 작동한다면, 복잡한 경우에도 작동합니다. Formality core도 같은 느낌을 줍니다. 제가 원하는 것은 동일한 느낌을 가져다주지만, 타입 시스템 실험에 적용하는 것이에요.

- So here's the language we're going to walk through, called EG. And it does various, well, it's kind of a calculator, fancy calculator. So like this program.
ChatGPT
  - 그래서 여기 우리가 살펴볼 언어가 있습니다. EG라고 불리는 언어인데요, 이것은 다양한 기능을 갖춘 계산기와 같은 것이에요. 예를 들어 이 프로그램처럼요.

- When you run it.
ChatGPT
  - 실행하면요,

- You can have tuples, and they will be added up pairwise.
ChatGPT
  - 튜플을 가질 수 있으며, 튜플은 쌍으로 추가됩니다.

- so, and you can call them with this weird at sign, which is because of a limitation I'll explain later. And you can even have generics. So all of these are actually runnable examples in the program, and part of what I'm going to do today is kind of
ChatGPT
  - 그래서, 그리고 이상한 at 기호로 호출할 수 있습니다. 이것은 나중에 설명할 제한 때문입니다. 그리고 심지어 제네릭도 사용할 수 있습니다. 이 모든 것들은 사실 실행 가능한 예제들이고, 오늘 제가 할 일 중 하나는 이 프로그램에서 실행 가능한 예제를 보여주는 것입니다.

- Oh, wait, someone earlier did this. I forget who. I think it was the first talk. Let's start with a cargo clean, just because.
ChatGPT
  - 오, 기다려요. 이걸 누군가 이전에 했었어요. 누군지 기억이 안 나는데요. 제일 처음에 했던 것 같아요. 그냥 시작하기 전에 cargo clean부터 해봐요.

- So, when you build something in this, it really is just a Rust program that you can work with. Let's see, source, or where did I put the tests? Under source, test, talk examples, right. So, for example, here's that first one. Hopefully, you can read it.
ChatGPT
  - 그래서, 이것을 빌드하면 진정으로 작업할 수 있는 Rust 프로그램입니다. 자, 소스를 보거나 테스트를 어디에 넣었죠? 소스, 테스트, 톡 예제 아래, 맞아요. 예를 들어, 여기가 첫 번째 것입니다. 바라건대 읽을 수 있을 거예요.

- Executing 22 plus 44 gives me 66, and so on, right?
ChatGPT
  - 22 더하기 44를 실행하면 66이 나옵니다. 그리고 이런 식으로 계속 됩니다, 맞아요.

- How do we define a programming language in a more formal way? What am I doing here? Oh, I'm just showing you that what I am not modeling in this definition is type inference. So you can have generics, but you do have to specify their values explicitly.
ChatGPT
  - 어떻게 더 형식적인 방식으로 프로그래밍 언어를 정의할까요? 여기서 무엇을 하고 있나요? 아, 저는 여기서 타입 추론을 모델링하지 않는다는 것을 보여주고 있네요. 그래서 제네릭을 사용할 수 있지만, 값은 명시적으로 지정해야 합니다.

- That makes things a lot easier, actually. So, how do we define a program more formally? It starts out with something called a grammar. How many of you have heard of grammars? Okay, good.
ChatGPT
  - 실제로 이렇게 하면 훨씬 쉬워요. 그래서, 프로그램을 어떻게 더 형식적으로 정의할까요? 우선, 무언가를 시작하는데 그것은 문법이라고 하는 것입니다. 문법에 대해 들어보신 분들은 몇 분이나 계시나요? 좋아요, 좋아요.

- I wouldn't have to explain it too much. But basically, that defines the syntax, right? So, you might write something like, oh, a program and eg is a series of function definitions, you know, zero or more, followed by some expression that's going to compute the value. Well, in Formality Core, we're going to define that, but we're going to do it with a rough structure.
ChatGPT
  - 너무 많이 설명할 필요는 없겠죠. 그럼 기본적으로 그것은 문법을 정의하는 것이죠? 그래서, 프로그램과 eg는 함수 정의들의 연속이죠, 0개 이상, 그 다음에 값이 계산될 표현식이 따라올 거에요. 그런데, Formality Core에서는 그것을 정의할 거지만, 조금 거친 구조로 할 거에요.

- Yeah, so we might have this struct saying this is what a program is, and you can see it has fields, and you put an annotation on it called term, and that's a kind of bit of PL programming language jargon. A term is basically just a thing, something that you're a part of your program, or a value, or something we're going to talk about, essentially. We need a word for a thing, so term is it, and in here, you put the grammar.
ChatGPT
  - 그래요, 그래서 우리는 프로그램이 무엇인지를 정의하는 이런 구조를 가질 수 있습니다. 그리고 그것은 필드를 가지고 있으며, term이라는 주석을 달 수 있습니다. 그리고 그것은 PL 프로그래밍 언어 용어의 한 부분입니다. term은 기본적으로 프로그램의 부분이거나 값이거나, 우리가 이야기할 것 중 하나입니다. 우리는 무엇인가를 가리키는 단어가 필요하기 때문에 term이 그것입니다. 그리고 여기에는 문법을 넣습니다.

- You put the grip.
ChatGPT
  - 문법을 넣으세요.

- That will tell you, oh, I'm going to parse the value of this field here in the input. And if you have a little star that says, take zero or more things, collect them, and put them in a vector. So this would be zero or more function definitions. Of course, it's using traits and everything under the hood to drive the execution. And this would just parse a single expression.
ChatGPT
  - 별표는 입력에서 이 필드의 값을 구문 분석하라는 의미입니다. 별표는 해당 항목을 0개 이상 모아 벡터에 넣으라는 뜻입니다. 그래서 이 경우, 0개 이상의 함수 정의를 구문 분석하게 됩니다. 물론, 이 모든 과정은 내부적으로 트레이트와 기타 요소를 사용하여 실행을 구동합니다. 그리고 이것은 단일 표현식을 구문 분석하게 됩니다.

- grammar. Sometimes you have grammars that are a little more complicated, like the expression could be an integer, or it could be an identifier indicating a variable, or a bunch of expressions in a tuple. So when you have a choice of many different options, we'll model that with an enum.
ChatGPT
  - 문법이 좀 더 복잡해질 때가 있는데, 예를 들어 표현식이 정수일 수도 있고, 변수임을 나타내는 식별자일 수도 있으며, 또는 튜플 안에 여러 표현식이 있을 수도 있습니다. 여러 가지 선택지가 있을 때는 이를 열거형(enum)으로 모델링합니다.

- Okay.
ChatGPT
  - 그래서 이렇게 여러 선택지를 가진 문법을 다룰 때, 열거형을 사용하여 각각의 경우를 명시하고 처리할 수 있습니다. 이렇게 하면 프로그램의 구조와 의미를 더 명확하게 정의할 수 있습니다. 이 방식은 복잡한 프로그래밍 언어의 구문을 다루는 데 매우 유용합니다.

- And then for each of the variants, we're going to give the grammar. So these are the different choices. If it's an integer, it should just look like.
ChatGPT
  - 정수인 경우에는 그냥 숫자로 보이겠죠. 그래서 각 변형마다 해당 문법을 지정하게 됩니다. 예를 들어, 정수는 숫자처럼 보이도록 하고, 식별자는 변수 이름으로 인식되도록 하는 식입니다. 이런 식으로 다양한 선택지를 정의할 수 있습니다.

- It's an anonymous field. I just call it v0, v1, and so on. So here, one little handy macro is this id macro. That just declares a string, an identifier. So we're saying, okay, there's going to be an identifier types that I call id, and I'm going to parse. If I see an identifier, that's a var.
ChatGPT
  - 그래서 익명 필드는 그냥 v0, v1 이렇게 부르는 거죠. 여기서 유용한 매크로 중 하나가 id 매크로입니다. 이 매크로는 문자열, 즉 식별자를 선언합니다. 그래서 식별자 유형을 id라고 부르고, 식별자가 보이면 var로 파싱하겠다는 뜻입니다.

- See a little bit of handy notation. You can say $ with parentheses. That means a parenthesized list. So I've tried to put in the common conventions you'll often find. And so we're going to parse one or more expressions and build a tuple.
ChatGPT

  - 이 유용한 표기법을 보면, 달러 기호에 괄호를 붙이면 괄호로 묶인 목록을 의미합니다. 그래서 자주 사용하는 일반적인 관습을 포함시키려고 노력했습니다. 이제 하나 이상의 표현식을 파싱해서 튜플을 만들겠습니다.


- And we'll continue. Maybe we want to have plus, minus, times, and stars.
ChatGPT
  - 계속해서 플러스, 마이너스, 곱셈, 그리고 별표 연산자도 추가해 보겠습니다.



- The minor point is, if you have recursive types, it's still Rust. They have to have ARC, otherwise the type would have infinite size. That's no problem, and so on.
ChatGPT
- 맞습니다. 재귀적인 유형이 있으면 레퍼런스를 통해 참조 계수화된 ARC(Automatic Reference Counting)를 사용해야 합니다. 그렇지 않으면 유형이 무한하게 커집니다.


- non-obvious like let. So here we're declaring a local variable. It's going to be called id or whatever. It's going to have an initial value. It's going to execute an expression. That's going to look like this.
ChatGPT
- 네, 이 코드에서 let은 변수를 선언하는 Rust의 문법입니다. id라는 로컬 변수를 선언하고, 초기값을 설정합니다. 그 다음으로 표현식을 실행합니다.

- And so on. OK, you get the idea. So let's look at an example. Now, we wanted to write some tests, right? Because the whole idea of this is you can write this grammar and then play with it. Let me see where I have some tests. OK, here we go.
ChatGPT

Sure, let's take a look at the tests.


- Question mark, that's the normal debug input. You'd get something that's generated with the grammar in mind, a pretty printed version of it.
ChatGPT
  - 물음표는 일반적인 디버그 입력입니다. 문법을 고려하여 생성된 내용을 pretty print 버전으로 받게 됩니다.

- If you ask for the full detail with the hash sign, then you actually get the standard thing you get from a debuggable. This is pretty useful when you're writing tests of the parsing, because it gives you all the detail. And as some people who've played with my systems before will tell you, or when we didn't have this, it's kind of helpful when you're learning if you really want to know exactly what data structure you've got. In this case, in particular, we can see that the multiplication had higher precedence, right? We parsed.
ChatGPT
  - 물음표를 사용하면 pretty print 버전을 받지만, 해시 기호를 사용하여 전체 세부 사항을 요청하면 일반적인 디버그 출력을 받습니다. 이는 구문 분석 테스트를 작성할 때 매우 유용합니다. 시스템을 처음 배우는 사람들에게는 정확히 어떤 데이터 구조를 가지고 있는지 알 수 있어 도움이 됩니다. 이 경우 특히, 곱셈이 더 높은 우선순위를 가진다는 것을 알 수 있습니다.

- x plus y times 3 plus 66. If we did that wrong, we might have, for example, parentheses like this. We might have a plus that was getting multiplied rather than an addition of a sum. But we don't. We have the multiplication inside and then the as. OK, cool.
  - x 더하기 y 곱하기 3 더하기 66을 잘못 해석했으면, 예를 들어, 이렇게 괄호를 사용했을 수 있습니다. 플러스가 곱해지기보다는 합의 덧셈이 되어야 합니다. 하지만 우리는 곱셈이 내부에 있고, 그 다음에 더하기가 있습니다. 아주 좋습니다.

- That's all just parsing, and it's not a particularly smart parser. Oh, I already showed you this. But you have to declare the language. Okay, this is boring.
ChatGPT
  - 이것은 단지 파싱일 뿐이고, 특별히 똑똑한 파서는 아닙니다. 아, 이건 이미 보여드렸네요. 언어를 선언해야 합니다. 이 부분은 지루하죠.

- Well, one thing I'll note is you tell it what you want it to have as keywords. But let's do—okay, boring, boring. Let's talk about type checking.
ChatGPT
  - 네, 여기서 짚고 넘어갈 부분은 무엇을 키워드로 사용할지 지정해야 한다는 것입니다. 자, 이제 지루한 부분은 넘기고 타입 체크에 대해 이야기해 봅시다.

- This is where it gets a little more interesting. So, so far, we allowed you to define data structures and specify their grammar. And you kind of get for free a parser that will parse and give you what's called an abstract syntax tree, which is just an instance of those data structures and a way to view your program as a data structure and not as a string. But now we want to do type checking. And the type checking rules for this EG language are pretty simple.
ChatGPT
  - 여기서부터 더 흥미로워집니다. 지금까지는 데이터 구조를 정의하고 그들의 문법을 지정하는 방법을 다루었고, 이를 통해 추상 구문 트리(AST)를 자동으로 생성하는 파서를 얻을 수 있었습니다. 추상 구문 트리는 프로그램을 문자열이 아닌 데이터 구조로 볼 수 있게 해줍니다. 이제 타입 체크를 해보겠습니다. 이 EG 언어의 타입 체크 규칙은 매우 간단합니다.

- If you're adding things, they basically have to have the same type. So I can add two integers, I can add two tuples that are both two integers, but I can't add a tuple and an integer or two tuples of different arities. That should not work.
ChatGPT
  - 맞습니다. 더하기 연산을 수행할 때 두 피연산자는 같은 타입이어야 합니다. 즉, 두 정수를 더하거나 두 개의 정수로 구성된 두 튜플을 더할 수는 있지만, 튜플과 정수를 더하거나 서로 다른 크기의 튜플을 더할 수는 없습니다. 그런 경우는 작동하지 않아야 합니다.

- So that gives us a question, though. What are types in this language, right? The next thing we have to define—we defined what the program language is, but we didn't define the grammar of types. So the next thing you have to do is define that. We're going to have it basically be—I'm starting with the simple. I'm excluding generics for the moment. It's an integer, or it's a tuple of some set of other types.
ChatGPT
  - 그래서 여기서 중요한 질문이 생깁니다. 이 언어에서 타입이란 무엇일까요? 우리가 프로그램 언어의 정의는 했지만, 타입의 문법은 정의하지 않았습니다. 그래서 다음으로 해야 할 일은 그것을 정의하는 것입니다. 우리는 기본적으로 간단한 것부터 시작할 겁니다. 일단 제네릭은 제외하고, 정수 타입이거나 다른 타입들의 튜플이 되는 것으로 할 것입니다.


- Right, so that's just an enum with two variants. One is an integer, one is a tuple. Okay.
ChatGPT
  - 맞아요, 그래서 그건 두 가지 변형을 가진 열거형(enum)입니다. 하나는 정수고, 다른 하나는 튜플입니다. 알겠죠?

- Infants rule stuff.
ChatGPT
  - 그렇지 않아요. 죄송합니다만, 이해하지 못했어요. 좀 더 설명해주시겠어요?


- How many of you have seen something like this? OK, how many of you understood what the hell is what is going on here? Yeah, me either. OK, so this notation is actually ridiculously simple. It's like the world's... How many of you have written in TCL? OK, more than I thought. I have not written in TCL, but what I do know about TCL is that everything is a string. Well, this is kind of true here also. The way programming languages work basically, or these rules work, it's like you took the world's simplest interpreter and you run it, and it has to be simple because we have to be able to map it to mathematics. So it has to be very, very simple so that that mapping is very, very simple so that we can formally prove things about it.
ChatGPT
- 이해되었어요. 이것이 간단한 해석기처럼 보여요. 그리고 당신이 언급한 것처럼, 모든 것이 문자열처럼 다루어져요. 이것이 수학적으로 간단하게 매핑되어야 하기 때문에 이것이 간단해야 한다고 이해했어요.

- I'm going to walk through it. The very first confusing thing about inference rules, in my opinion, is their name, which is like, what is that? What is inference? I don't know. I think of type inference. It's not really about that. It's about this English word infer. It's basically a rule that says, if I infer something, it means I figured it out based on something else. Well, an inference rule is basically, how can we figure out a conclusion based on a set of premises? If these things are true, in other words, you can read them as if you see a big rule that has a big line,
ChatGPT
  - 인퍼런스 규칙은 전제 조합에 기반하여 결론을 추론하는 것을 나타내는 것이죠. 만약 이러한 사실들이 참이라면, 이것들은 어떻게 이해되어야 할까요? 큰 선이 있는 큰 규칙을 보게 되면,

- stuff on top of the line, that's the conditions. If x and y, then z, right? This is the conclusion. And then there's this thing over on the side, that's just the name, just so you can give it, refer to it. So like here, these are the two conditions on top, and that's the conclusion. Okay. Sometimes there's no conditions, and then we just write a line.
ChatGPT
  - 선 위에 있는 것들, 그것이 조건들이에요. 만약 x와 y라면, z가 되겠죠? 이것이 결론입니다. 그리고 옆에 있는 것은 그냥 이름일 뿐이에요. 그래서 이 규칙을 참고하기 위해 이름을 붙입니다. 이러한 것들은 위에 있는 두 가지 조건이고, 그것이 결론입니다. 때로는 조건이 없을 수도 있습니다. 그럴 때에는 단순히 선만 그립니다.

- It's a pretty handy notation, even though it's so simple. So here's an example of one of the inference rules you might write in EG, which is somewhat simpler.
ChatGPT
  - 네, 이러한 간단한 표기법이지만 상당히 편리합니다. 그래서 EG에서 작성할 수 있는 추론 규칙의 예시 하나를 보여드릴게요.


- What is going on here? So we've got this kind of, even in this very simple example, we've kind of got this Bayesian notation. What's happening there, when you see a string like this, this is also a term. Basically, it has two different parts to it, right? Overall, this is basically a predicate. It's something that we can say is true or not true, or at least true or not known to be true.
ChatGPT
  - 여기에서 어떤 일이 벌어지고 있는 걸까요? 이 매우 간단한 예제에서도 베이지안 표기법이 사용되었습니다. 문자열을 보면, 이것 또한 용어입니다. 기본적으로 이것은 두 가지 다른 부분을 갖고 있습니다. 전반적으로 이것은 기본적으로 술부입니다. 우리는 이것이 참인지, 거짓인지, 또는 적어도 참이 아닌지를 말할 수 있는 것입니다.


- variables. So here, the T, that's a variable saying some type. I'm going to call it T.
ChatGPT
  - 변수입니다. 여기서 T는 어떤 유형을 나타내는 변수입니다. 나는 그것을 T라고 부를 것입니다.

- And actually, you could call them meta variables very properly. Just call them variables. Basically, when you have these letters, usually that's kind of the variable. So, T is some type. Maybe it's U32, maybe it's parenthesis U32, U32.
ChatGPT
  - 네, 그것은 메타 변수라고도 할 수 있습니다. 단지 변수라고 하면 됩니다. 일반적으로 이런 문자는 변수를 나타냅니다. 그래서 T는 어떤 유형을 나타냅니다. U32일 수도 있고, (U32, U32)일 수도 있습니다.

- Gamma, by convention, I put it in here because I'm Greek, but I personally prefer to use the letter E because I actually speak English as the primary language, but gamma is usually used to mean the typing environment. It's basically the types of all the variables that have been declared, though it could have other stuff in Rust. It might have lifetime relationships and so forth.
ChatGPT
  - Gamma는 일반적으로 타이핑 환경을 의미합니다. 이는 지금까지 선언된 모든 변수의 타입을 나타내지만, Rust의 경우 수명 관련 정보 등 다른 정보도 포함될 수 있습니다.

- Variable names and types for those variables.
ChatGPT
  - Gamma는 변수 이름과 해당 변수의 타입을 나타냅니다.


- can actually define gamma, like everything else when we're doing an informality, we have to kind of define this stuff with Rust data structures. So here I'm not using the term macro just because I never need to parse it, but the so-called environment is basically just a list of variables that are in scope and their type. And I'm just using a map, you know, it's a B-tree map, actually, where it goes from one to the other. I'm also carrying the program along with me. That's so I can look up function definitions when you call them. We won't use that right now. But so that's what we're going to call when you see gamma, we're going to basically just think it means some environment, right?
ChatGPT
  - Gamma는 변수 이름과 해당 변수의 타입을 나타냅니다. 이를 표현하기 위해 Rust 데이터 구조를 사용합니다. 환경(Environment)은 현재 범위 내에 있는 변수와 그 타입의 리스트입니다. 저는 여기서 파싱할 필요가 없기 때문에 term 매크로를 사용하지 않았습니다. 환경은 변수와 그 타입 사이의 매핑을 나타내는 B-트리 맵으로 구성됩니다. 또한 프로그램을 함께 전달합니다. 이렇게 함으로써 함수 정의를 호출할 때 해당 함수를 찾을 수 있습니다.


- OK, and this notation we saw, gamma, parentheses, x. Well, you could think of gamma like a function you can call to get the type of a variable. So we'll do that by accessing the.
ChatGPT
  - gamma(x)와 같은 표기법을 보면 gamma를 변수의 타입을 얻기 위한 함수처럼 생각할 수 있습니다. 이를 위해 저는 gamma에 접근하여 함수를 호출합니다.

- Clear stuff. We saw these variables. What about this weird thing? That's called a turnstile. Why? Because, you know, when you walk in the subway, the little thing turns. But that's why. That's a turnstile, the thing that turns. And this colon. The answer is this is just stuff. It doesn't have any meaning. It's like opaque strings, like the name of a function. Effectively, the name of this predicate, if you want to, is like gamma colon. So it's kind of like Objective-C, if you did that, or Swift. I don't know how Swift works exactly. But in Objective-C, the name of a method is kind of strung out across, interspersed. So the name of this method, insert object, it's actually insert object at index, like one big string, even though you write it in parts. So here you could say the name of this rule is gamma colon, which is kind of hard to say out loud.
ChatGPT
  - 또 이상한 것이 있습니다. 바로 'turnstile'입니다. 이는 지하철에서 걸어가는 작은 것처럼 돌아가는 기계를 의미합니다. 그리고 이 콜론입니다. 이것은 그냥 정보일 뿐입니다. 의미가 없습니다. 그것은 마치 함수의 이름처럼 작동합니다.
  
- Sounds awkward. So maybe we can give it a better name. We'll see. We will in a second.
ChatGPT
  - 맞습니다. 다소 어색하죠. 아마 좀 더 나은 이름을 지어주는 게 좋을 것 같습니다. 곧 알아보겠습니다.


- conventions. I said they're just random stuff. That's how I think of it. You just have to accept it. It's just this is what they chose to use. But there are some common conventions people often use. The turnstile separates assumptions, your environment, the things that you got from the outside from the thing you're trying to prove with those assumptions. If I know that the variable x is a U32, then I know that a reference to x has type U32. That's based on this assumption.
ChatGPT
  - 맞아요. 표준은 그냥 랜덤한 것처럼 보이지만, 실제로는 일반적으로 사용되는 몇 가지 규칙이 있어요. 회전문은 가정과 함께 얻은 환경을 외부에서부터 얻은 것으로부터 증명하려는 것을 분리해줍니다. 만약 변수 x가 U32라는 것을 알고 있다면, x에 대한 참조는 U32 유형을 가진다는 것을 알 수 있습니다. 이것은 이 가정에 기반합니다.

- colon usually means hasType.
ChatGPT
  - 맞아요. 대부분의 경우 콜론은 "유형을 가지고 있다"는 의미로 해석됩니다.


- read this as assuming gamma, then E has the type T. And what I would say is this was actually like a turning point for me, personally, when I realized that this weird symbol basically meant assuming or lets me say. That's how I thought of it at first, I remember. Let us say, like this lets us say that. I was like, oh, I can read this now. It reads like English instead of this weird string of symbols. So just knowing what people mean by it is usually very impactful, I would say.
ChatGPT
  - 그렇죠. 이해할 때 가끔 추상적인 기호들이 혼란스럽게 느껴질 수 있지만, 그것들이 일종의 "언어"로서 사용된다고 생각하면 도움이 될 수 있습니다. 이해할 때 흔히 사용되는 의미와 함께 연관 짓는 것이 도움이 됩니다.

- But how will we write that in formality? We're just going to write it like a Rust function, so we have to give it a name.
ChatGPT
  - 그럼 "type_of_variable"과 같은 이름을 사용할 수 있겠죠? 그러면 예를 들어, gamma: x가 함수 "type_of_variable"의 인자로 전달되고, x의 타입이 반환됩니다.


- because it computes the type for an expression, like the type of an expression.
ChatGPT
  - 그렇습니다. 그러면 "expression_type"이라는 이름을 사용할 수 있습니다. 이것은 함수 이름으로써 "gamma: E"가 인자로 전달되고, "E"의 타입이 반환됩니다.

- But you'll notice that some of them, the first two, show up as parameters to this function, and the last one, the type that comes after the colon, that's actually the return value.
ChatGPT
  - 맞아요. "gamma"와 "E"는 함수의 매개변수로 전달되고, ":" 뒤에 오는 "T"는 반환 값입니다.

- less abstract. Normally, when you define the rules, there's not really a notion of input and output. It's just like a relationship between these things. If you have this variable, it has that type, and you can kind of run it in both ways. But when we're really going to execute it in real life, we have to think about what's the input and what gets computed from the input. Otherwise, it's not like a function, an executable function.
ChatGPT
  - 맞아요. 일반적으로 규칙을 정의할 때 입력과 출력에 대한 개념은 별도로 없어요. 단순히 이러한 관계가 있을 뿐이에요. 만약에 이 변수가 있다면 그 타입이 이것이다, 그리고 이를 양쪽으로 실행할 수 있어요. 하지만 실제로 실행할 때에는 입력이 무엇이고 입력으로부터 어떤 것이 계산되는지를 생각해야 해요. 그렇지 않으면 함수처럼 실행되지 않아요.

- Usually, so I just kind of baked that in, right? And so what this is saying is, given an environment and an expression, we should be able to figure out what the type of that expression is. That's actually a property, right? We're not going to, like, guess it. We're going to have to, it has to be something deterministic.
ChatGPT
  - 맞아요. 그래서 그것을 그냥 포함시켰어요. 이 말은 환경과 표현식이 주어졌을 때 그 표현식의 타입을 알아낼 수 있어야 한다는 것이에요. 이것은 실제로 속성이에요. 우리는 그것을 추측하지 않을 거에요. 그것은 결정적인 것이어야 해요.

- But OK, so here's how we're actually going to write it. We're going to write judgment function. And what this is is it's a crazy, wicked macro that I'm going to show you later. And then we're going to start with what looks like a fairly normal Rust function, except for this part here, where I have two arrows instead of one arrow. And that's because what we're going to do when you write this typing, it's possible that actually we're going to write a series of rules that we can use, like the rule we saw. And it's possible that more than one of them applies, right? It's also possible that zero apply. So in some sense, we're computing all the possible types for this expression. And if there are no possible types, then it's not a well-typed expression. It's invalid. But if there's more than one, no, that might be OK. Sometimes there's many ways to draw a conclusion. Any one of them is valid, sort of like A or B, right? It's true if A is true, it's true if B is true, and it's true if they're both true.
ChatGPT
  - 그렇죠. 그래서 실제로 우리가 작성할 건 판단 함수입니다. 이것은 제가 나중에 보여드릴 엄청난 매크로입니다. 그런 다음에는 보통 러스트 함수와 비슷한 것을 시작할 거에요. 단, 이 부분에서 하나의 화살표 대신 두 개의 화살표가 있는 이유는 무엇일까요? 이 타이핑을 작성할 때 실제로 우리가 사용할 수 있는 여러 규칙을 작성할 수 있기 때문입니다. 우리는 복수의 규칙이 적용될 수 있다는 것을 알고 있어요, 맞죠? 실제로 적용될 수도 있고, 적용되는 것이 없을 수도 있어요. 어떤 의미에서는 이 표현식에 대한 모든 가능한 유형을 계산하고 있는 거죠. 가능한 유형이 없으면, 이것은 유효한 표현식이 아닙니다. 그러나 여러 개가 있다면, 이것은 괜찮을 수도 있어요. 때로는 결론을 내리는 여러 가지 방법이 있습니다. 그중 아무것이나 유효합니다. A 또는 B처럼요. A가 참이면 참이고, B가 참이면 참이며, 둘 다 참이면 참이기 때문입니다.


- And this is how the rules are going to look. So this is the equivalent. This is the math up here.
ChatGPT
- 그럼요. 계속하셔도 좋습니다. 질문이나 의견이 있으면 언제든지 말씀해주세요.

- Okay, got me nervous.
ChatGPT
- 이해합니다. 코딩 동영상을 보면서 조금 긴장되기도 하죠. 하지만 여기서 중요한 건 당신의 논리를 이해하고 있으니 걱정하지 않아도 된다는 점입니다. 함께 살펴보겠습니다. 계속 진행할까요?

- Probably there is. Anyway, this is how the rules are going to look. There's going to be parentheses, and then this line, and then the conclusion down here, and the premises above. So we're saying…
ChatGPT
  - 이해했습니다. 이것이 규칙들이 어떻게 보일 것인지에 대한 설명이군요. 규칙을 파악하는 데 도움이 될 것 같습니다. 계속 진행해 볼까요?

- expression, and the environment, let's call it ends. This is just Rust pattern matching, so end. And the expression is a variable.
ChatGPT
  - 그렇군요. 그리고 식이 변수인 경우를 처리하는 것 같습니다. 이제 다른 경우도 살펴보겠습니다.

- Then I can compute the type by running these steps on top. I'm going to ask the environment to look up the variable x. You see that I put the question mark? That's because, actually, the way it's defined can return

   - 23분 58초

<hr />

# 최신뉴스 긴제목들 따로 정리[|🔝|](#link)

# **[GN⁺: 나는 좋은 병렬 컴퓨터를 원해요](<https://news.hada.io/topic?id=19912&utm_source=discord&utm_medium=bot&utm_campaign=1480>)**[|🔝|](#link)
- 250324GeekNews글
  - GPU는 CPU보다 **10~100배 더 강력**하지만, 동적 작업 처리에 어려움이 있고 **병렬 프로그래밍 도구가 부족**해 일반 작업에서 **성능을 충분히 활용하지 못하고 있음**  
  - 과거에 Connection Machine, Cell, Larrabee 같은 병렬 컴퓨터 디자인이 있었지만 프로그래밍 모델의 복잡성 등으로 실패함  
  - 현대 GPU는 …

