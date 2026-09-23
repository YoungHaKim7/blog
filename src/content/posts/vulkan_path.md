---
title: vulkan_path
published: 2024-01-01
description: ''
image: ''
tags: [vulkan]
category: 'vulkan'
draft: false 
lang: ''
---

# link

- [Vulkan API 이해하기(그림으로)](../api_of_vulkan_drawio/)

- [Vulkan SDK download_https://vulkan.lunarg.com/sdk/home)](https://vulkan.lunarg.com/sdk/home)

# Path Doc

- https://vulkan.lunarg.com/doc/view/1.3.290.0/mac/getting_started.html

```fish
# 설치한 곳에 바이너리 땡기기
fish_add_path "$HOME/VulkanSDK/1.4.357.1/macOS/bin"

# Vulkan PATH(Global Path설정)
set -gx VULKAN_SDK ~/VulkanSDK/1.4.357.1/macOS
set -gx DYLD_LIBRARY_PATH "$VULKAN_SDK/lib"

set -gx VK_ICD_FILENAMES VULKAN_SDK/share/vulkan/icd.d/MoltenVK_icd.json
set -gx DYLD_FALLBACK_LIBRARY_PATH VULKAN_SDK/lib
# MoltenVK ICD
set -gx VK_ICD_FILENAMES \
    "$VULKAN_SDK/share/vulkan/icd.d/MoltenVK_icd.json"

# Vulkan validation layers
set -gx VK_LAYER_PATH \
    "$VULKAN_SDK/share/vulkan/explicit_layer.d"
```
