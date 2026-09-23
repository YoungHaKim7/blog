---
title: ash_vulkan_basic001
published: 2026-08-23
description: 'ash 라이브러리로 vulkan 연습 001'
image: ''
tags: [vulkan, ash, rust]
category: 'vulkan'
draft: false 
lang: ''
---

# link

- https://github.com/adrien-ben/vulkan-tutorial-rs

- [Rust ash example code](https://github.com/YoungHaKim7/rust_gui_vulkan_trainning/tree/main/004_ash_examples/001_macOS_vulkan)

# ash test


```rs
use ash::Entry;

fn main() {
    let entry = unsafe { Entry::load().unwrap() };

    let extensions = unsafe { entry.enumerate_instance_extension_properties(None).unwrap() };

    for extension in extensions {
        let name = unsafe { std::ffi::CStr::from_ptr(extension.extension_name.as_ptr()) };

        println!("{}", name.to_string_lossy());
    }
}
```

- result


```bash
$ cargo r

VK_KHR_device_group_creation
VK_KHR_external_fence_capabilities
VK_KHR_external_memory_capabilities
VK_KHR_external_semaphore_capabilities
VK_KHR_get_physical_device_properties2
VK_KHR_get_surface_capabilities2
VK_KHR_surface
VK_KHR_surface_maintenance1
VK_KHR_surface_protected_capabilities
VK_EXT_debug_report
VK_EXT_debug_utils
VK_EXT_headless_surface
VK_EXT_layer_settings
VK_EXT_metal_surface
VK_EXT_surface_maintenance1
VK_EXT_swapchain_colorspace
VK_MVK_macos_surface
VK_KHR_portability_enumeration
VK_LUNARG_direct_driver_loading
```

# hello ash


```rs
use ash::{Entry, vk};
use std::ffi::{CStr, CString};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // ------------------------------------------------------------
    // 1. Load the Vulkan loader
    // ------------------------------------------------------------
    let entry = unsafe { Entry::load()? };

    // ------------------------------------------------------------
    // 2. Enumerate available instance layers
    // ------------------------------------------------------------
    let available_layers = unsafe { entry.enumerate_instance_layer_properties()? };

    let has_validation = available_layers.iter().any(|layer| {
        let name = unsafe { CStr::from_ptr(layer.layer_name.as_ptr()) };

        name == c"VK_LAYER_KHRONOS_validation"
    });

    println!("Validation layer available: {has_validation}");

    // ------------------------------------------------------------
    // 3. Enumerate available instance extensions
    // ------------------------------------------------------------
    let available_extensions = unsafe { entry.enumerate_instance_extension_properties(None)? };

    let has_extension = |wanted: &CStr| {
        available_extensions.iter().any(|extension| {
            let name = unsafe { CStr::from_ptr(extension.extension_name.as_ptr()) };

            name == wanted
        })
    };

    let has_debug_utils = has_extension(c"VK_EXT_debug_utils");

    let has_portability_enumeration = has_extension(c"VK_KHR_portability_enumeration");

    let has_get_physical_device_properties2 =
        has_extension(c"VK_KHR_get_physical_device_properties2");

    println!("VK_EXT_debug_utils: {}", has_debug_utils);

    println!(
        "VK_KHR_portability_enumeration: {}",
        has_portability_enumeration
    );

    println!(
        "VK_KHR_get_physical_device_properties2: {}",
        has_get_physical_device_properties2
    );

    // ------------------------------------------------------------
    // 4. Application information
    // ------------------------------------------------------------
    let app_name = CString::new("Ash Practice")?;
    let engine_name = CString::new("No Engine")?;

    let app_info = vk::ApplicationInfo::default()
        .application_name(&app_name)
        .application_version(0)
        .engine_name(&engine_name)
        .engine_version(0)
        .api_version(vk::API_VERSION_1_0);

    // ------------------------------------------------------------
    // 5. Instance extensions
    // ------------------------------------------------------------
    let mut extension_names = Vec::new();

    // Debug utilities are optional.
    if has_validation && has_debug_utils {
        extension_names.push(c"VK_EXT_debug_utils".as_ptr());
    }

    // ------------------------------------------------------------
    // macOS / MoltenVK
    //
    // VK_KHR_portability_enumeration tells the loader that
    // we explicitly want to enumerate portability drivers such
    // as MoltenVK.
    //
    // With Vulkan 1.0, LunarG also recommends:
    //
    // VK_KHR_get_physical_device_properties2
    // ------------------------------------------------------------
    let use_portability = has_portability_enumeration;

    if use_portability {
        extension_names.push(c"VK_KHR_portability_enumeration".as_ptr());

        if has_get_physical_device_properties2 {
            extension_names.push(c"VK_KHR_get_physical_device_properties2".as_ptr());
        }
    }

    // ------------------------------------------------------------
    // 6. Instance creation flags
    // ------------------------------------------------------------
    let mut instance_flags = vk::InstanceCreateFlags::empty();

    if use_portability {
        instance_flags |= vk::InstanceCreateFlags::ENUMERATE_PORTABILITY_KHR;

        println!("Enabling Vulkan portability enumeration");
    }

    // ------------------------------------------------------------
    // 7. Validation layer
    // ------------------------------------------------------------
    let validation_layer_name = c"VK_LAYER_KHRONOS_validation";

    let layer_names = if has_validation {
        println!("Enabling validation layers");

        vec![validation_layer_name.as_ptr()]
    } else {
        println!("Validation layers not found, continuing without them");

        Vec::new()
    };

    // ------------------------------------------------------------
    // 8. Create Vulkan instance
    // ------------------------------------------------------------
    let create_info = vk::InstanceCreateInfo::default()
        .flags(instance_flags)
        .application_info(&app_info)
        .enabled_extension_names(&extension_names)
        .enabled_layer_names(&layer_names);

    let instance = unsafe { entry.create_instance(&create_info, None)? };

    println!("Instance created!");

    // ------------------------------------------------------------
    // 9. Enumerate physical devices
    // ------------------------------------------------------------
    let pdevices = unsafe { instance.enumerate_physical_devices()? };

    println!("Found {} physical device(s)", pdevices.len());

    if pdevices.is_empty() {
        return Err("No Vulkan physical device found".into());
    }

    // ------------------------------------------------------------
    // 10. Find a graphics queue
    // ------------------------------------------------------------
    let (pdevice, queue_family_index) = pdevices
        .iter()
        .find_map(|pdevice| {
            let queue_families =
                unsafe { instance.get_physical_device_queue_family_properties(*pdevice) };

            queue_families.iter().enumerate().find_map(|(index, info)| {
                if info.queue_flags.contains(vk::QueueFlags::GRAPHICS) {
                    Some((*pdevice, index as u32))
                } else {
                    None
                }
            })
        })
        .ok_or("No graphics queue family found")?;

    // ------------------------------------------------------------
    // 11. GPU information
    // ------------------------------------------------------------
    let props = unsafe { instance.get_physical_device_properties(pdevice) };

    let device_name = unsafe { CStr::from_ptr(props.device_name.as_ptr()) };

    println!("----------------------------------------");
    println!("Selected GPU: {}", device_name.to_string_lossy());

    println!(
        "Vulkan API: {}.{}.{}",
        vk::api_version_major(props.api_version),
        vk::api_version_minor(props.api_version),
        vk::api_version_patch(props.api_version),
    );

    println!("Driver version: {}", props.driver_version);
    println!("Graphics queue family: {}", queue_family_index);
    println!("----------------------------------------");

    // ------------------------------------------------------------
    // 12. Create logical device
    // ------------------------------------------------------------
    let queue_priority = [1.0_f32];

    let queue_info = vk::DeviceQueueCreateInfo::default()
        .queue_family_index(queue_family_index)
        .queue_priorities(&queue_priority);

    let queue_infos = std::slice::from_ref(&queue_info);

    let device_create_info = vk::DeviceCreateInfo::default().queue_create_infos(queue_infos);

    let device = unsafe { instance.create_device(pdevice, &device_create_info, None)? };

    // ------------------------------------------------------------
    // 13. Get graphics queue
    // ------------------------------------------------------------
    let graphics_queue = unsafe { device.get_device_queue(queue_family_index, 0) };

    println!("Logical device created!");
    println!("Graphics queue created!");
    println!("Vulkan initialization successful!");

    // Prevent the queue from being considered unused.
    let _ = graphics_queue;

    // ------------------------------------------------------------
    // 14. Cleanup
    // ------------------------------------------------------------
    unsafe {
        device.destroy_device(None);
        instance.destroy_instance(None);
    }

    Ok(())
}
```

- result

```bash
Validation layer available: true
VK_EXT_debug_utils: true
VK_KHR_portability_enumeration: true
VK_KHR_get_physical_device_properties2: true
Enabling Vulkan portability enumeration
Enabling validation layers
Instance created!
Found 1 physical device(s)
----------------------------------------
Selected GPU: Apple M4 Max
Vulkan API: 1.0.357
Driver version: 10402
Graphics queue family: 0
----------------------------------------
Validation Error: [ VUID-VkDeviceCreateInfo-pProperties-04451 ] | MessageID = 0x3a3b6ca0
vkCreateDevice(): VK_KHR_portability_subset must be enabled because physical device VkPhysicalDevice 0x7baf4a9320 supports it.
The Vulkan spec states: If the VK_KHR_portability_subset extension is included in pProperties of vkEnumerateDeviceExtensionProperties, ppEnabledExtensionNames must include "VK_KHR_portability_subset" (https://vulkan.lunarg.com/doc/view/1.4.357.1/mac/antora/spec/latest/chapters/devsandqueues.html#VUID-VkDeviceCreateInfo-pProperties-04451)
Objects: 1
    [0] VkPhysicalDevice 0x7baf4a9320

Logical device created!
Graphics queue created!
Vulkan initialization successful!
```
