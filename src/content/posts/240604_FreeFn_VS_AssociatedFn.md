---
title: 240604_FreeFn_VS_AssociatedFn
published: 2024-06-04
description: 'Free Functions vs. Associated Functions (Methods)'
image: ''
tags: [rust, std, functions]
category: 'rust'
draft: false 
lang: ''
---

# link

<hr />

# Free Functions vs. Associated Functions (Methods)

|Feature| 	Free Function	|Associated Function (Method)|
|-|-|-|
|Definition	|Defined at the module level, not within an `impl` block.|	Defined within an impl block for a struct or a trait.|
|Calling Syntax|	`function_name(args)` or `module::function_name(args)`. |	`instance.method_name(args)` or `Struct::method_name(args)` (if it doesn't take `&self`, `&mut self`, or `self`).|
|`self` Parameter| Does not take `&self`, `&mut self`, or `self` as a parameter.|	Takes `&self`, `&mut self`, or `self` to operate on an instance of the struct.|
|Use Case|	Often used for static utility functions, operations where no single data "owner" is clear, or generic functions.|	Used when the function's logic is tightly coupled to a specific data structure.|


# 같이 보면 좋은 글

[ `.`과 `::` 차이점 | asar blog](https://blog.asta.rs/posts/rust/2/)
