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

# Compute Shader

## Introduction

- In this bonus chapter, we’ll take a look at compute shaders. Up until now, all previous chapters dealt with the traditional graphics part of the Vulkan pipeline. But unlike older APIs like OpenGL, compute shader support in Vulkan is mandatory. This means that you can use compute shaders on every Vulkan implementation available, no matter if it’s a high-end desktop GPU or a low-powered embedded device.

- This opens up the world of general purpose computing on graphics processor units (GPGPU), no matter where your application is running. GPGPU means that you can do general computations on your GPU, something that has traditionally been a domain of CPUs. But with GPUs having become more and more powerful and more flexible, many workloads that would require the general purpose capabilities of a CPU can now be done on the GPU in realtime.
  - 이로 인해 애플리케이션이 어디서 실행되든 그래픽 처리 장치(GPGPU)에서 범용 컴퓨팅이 가능해집니다. GPGPU는 전통적으로 CPU의 영역이었던 일반 계산을 GPU에서 수행할 수 있다는 뜻입니다. 하지만 GPU가 점점 더 강력하고 유연해지면서, CPU의 범용 기능이 필요한 많은 작업을 이제는 GPU에서 실시간으로 처리할 수 있게 되었습니다.

- A few examples of where the compute capabilities of a GPU can be used are image manipulation, visibility testing, post-processing, advanced lighting calculations, animations, physics, (e.g., for a particle system) and much more. And it’s even possible to use compute for non-visual computational only work that does not require any graphics output, e.g., number crunching or AI related things. This is called "headless compute".


### Advantages

- Doing computationally expensive calculations on the GPU has several advantages. The most obvious one is offloading work from the CPU. Another one is not requiring moving data between the CPU’s main memory and the GPU’s memory. All the data can stay on the GPU without having to wait for slow transfers from the main memory.

- Aside from these, GPUs are heavily parallelized with some of them having tens of thousands of small compute units. This often makes them a better fit for highly parallel workflows than a CPU with a few large compute units.
The Vulkan pipeline


# The Vulkan pipeline
- It’s important to know that compute is completely separated from the graphics part of the pipeline. This is visible in the following block diagram of the Vulkan pipeline from the official specification:

- Compute Shader
  - https://docs.vulkan.org/tutorial/latest/11_Compute_Shader.html

<img width="1131" height="580" alt="Image" src="https://github.com/user-attachments/assets/fb197936-52e9-4e88-bbe9-637e31f524ae" />

# Advanced Vulkan Compute: The Power of Parallelism

- https://docs.vulkan.org/tutorial/latest/Advanced_Vulkan_Compute/introduction.html


# AI-Assisted Vulkan Development

- https://docs.vulkan.org/tutorial/latest/AI_Assisted_Vulkan/introduction.html
