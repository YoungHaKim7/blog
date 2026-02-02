---
title: 260101_zig_gitignore
published: 2026-01-01
description: 'zig .gitignore'
image: ''
tags: [zig, gitignore]
category: 'zig'
draft: false 
lang: ''
---

# gitignore(zig)

- https://github.com/ziglang/zig/blob/master/.gitignore

```txt
# https://github.com/ziglang/zig/blob/master/.gitignore

# General(macOS)
.DS_Store

# This file is for zig-specific build artifacts.
# If you have OS-specific or editor-specific files to ignore,
# such as *.swp or .DS_Store, put those in your global
# ~/.gitignore and put this in your ~/.gitconfig:
#
# [core]
#     excludesfile = ~/.gitignore
#
# Cheers!
# -andrewrk

.zig-cache/
zig-out/
/release/
/debug/
/build/
/build-*/
/docgen_tmp/

# Although this was renamed to .zig-cache, let's leave it here for a few
# releases to make it less annoying to work with multiple branches.
zig-cache/
```
