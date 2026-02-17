---
title: 260211_How_to_Train_a_Neural_Net_SGD001
published: 2026-02-11
description: '1. Gradient descent) How to Train a Neural Net MIT OpenCourseWare'
image: ''
tags: [rust, ML, MachineLearning]
category: 'rust_ML_MachineLearning'
draft: false 
lang: ''
---

# link

- [(260211) Lec 02. How to Train a Neural Net MIT OpenCourseWare](https://youtu.be/vidCX_dMCu0?si=Lpcvc5_96O9uMnbN)

# How to train a neural net

- Review of gradient descent, SGD

- Computation graphs

- Backprop through chains

- Backprop through MLPs

- Backprop through DAGs

- Differentiable programming

# Gradient Descent

$$
\theta^* = argmin\sum_{i=1}^{N}\mathcal{L}(f_\theta(x^{i}),y^{i})
$$

## The core Gradient Descent update rule is:

$$
\theta_{t+1} = \theta_t - \eta \nabla J(\theta_t)
$$

## 📌 Meaning of Each Symbol


- $\theta_t$ : parameter vector at step  $t$

- $\eta$ : learning rate (step size)

- $\nabla J(\theta_t)$ : gradient of the cost function

- $J(\theta_t)$ : objective (loss) function


# Rust Implementation

```rs
fn main() {
    let mut theta = 0.0;       // initial guess
    let learning_rate = 0.1;   // η
    let iterations = 50;

    for i in 0..iterations {
        // derivative of (theta - 3)^2
        let gradient = 2.0 * (theta - 3.0);

        // update rule
        theta = theta - learning_rate * gradient;

        println!(
            "iter {:02} | theta = {:.6} | cost = {:.6}",
            i,
            theta,
            (theta - 3.0).powi(2)
        );
    }

    println!("\nFinal theta ≈ {}", theta);
}
```


# 📌 What It Means in Gradient Descent
$$
\mathcal{L}
$$

- represents the Loss function.

- So in ML:

- $ \theta$ → model parameters

- $L(θ)$ → how bad the model is

- Gradient Descent minimizes  $\mathcal{L}

Update rule:

$$
\theta_{t+1} = \theta_t - \eta \nabla \mathcal{L}(\theta_t)
$$

# 📌 Why Use Script L?

- In machine learning:
  - $J(θ)$ → often used in textbooks
  - $\mathcal{L}(θ)$ → common in research papers

- They usually mean the same thing: objective / loss function.

# 📌 Other Similar L-like Symbols

| Symbol          | LaTeX         | Meaning            |
| --------------- | ------------- | ------------------ |
| $ \mathcal{L} $ | `\mathcal{L}` | Loss function      |
| $ L $           | `L`           | Normal letter      |
| $ \ell $        | `\ell`        | Lowercase script l |
| $ \lambda $     | `\lambda`     | Lambda             |



