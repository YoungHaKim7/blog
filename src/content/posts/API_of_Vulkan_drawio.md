---
title: API_of_Vulkan_drawio
published: 2024-08-25
description: 'API of Vulkan.(그림으로 Vulkan이해하기)'
image: ''
tags: [vulkan, drawio]
category: 'vulkan'
draft: false 
lang: ''
---

# link

- 여기에 총정리
  - https://github.com/YoungHaKim7/rust_gui_vulkan_trainning/edit/main/002_Vulkan_API_training/drawio_api_study/
  - https://github.com/YoungHaKim7/rust_gui_vulkan_trainning/tree/main/002_Vulkan_API_training
- Vulkan VS OpenGL
  - https://github.com/YoungHaKim7/rust_gui_vulkan_trainning#vulkan-vs-opengl

# 그림 출처 

- `vulkan_api.dio` 여기서 수정하면 됨(drawio 익스텐스받아서 수정하기(VSCode))

- https://gpuopen.com/news/v-ez-brings-easy-mode-vulkan/

<img width="2043" height="911" alt="Image" src="https://github.com/user-attachments/assets/b12ee15c-4aa1-4fca-94e0-639fcf459588" />

# vulkan의 핵심 개념
- OpenGL은 함수마다 Command Buffer를 작성하고 Queue에 제출하는 방식을 사용하는데, Queue에 제출을 할 때 시간이 조금 걸린다. Vulkan은 일일이 Command Buffer를 작성할 때마다 Queue에 제출하지 않고, Command Buffer를 따로 다 작성 후 마지막에 한번에 다 제출하는 방식을 쓴다. 이 때문에 싱글스레드로 사용하여 멀티코어를 활용하는 병렬 처리가 아니더라도 성능은 OpenGL보다 뛰어나다.
- https://namu.wiki/w/Vulkan(API)


<img width="695" height="494" alt="Image" src="https://github.com/user-attachments/assets/f04e72dd-f6a8-45f3-b377-8122b06cbdce" />


# Graphics pipeline basics

- https://vulkan.lunarg.com/doc/view/1.4.321.0/mac/antora/tutorial/latest/03_Drawing_a_triangle/02_Graphics_pipeline_basics/00_Introduction.html

<img width="403" height="643" alt="Image" src="https://github.com/user-attachments/assets/106becb5-d168-4f5d-8280-f3eb95ba0ed8" />
