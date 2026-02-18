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


# CLI Visualization

- Imagine the curve:

```txt
Cost
 ^
 |                *
 |            *
 |        *
 |     *
 |   *
 | *
 +-----------------------> theta
    0    1    2    3
```
- Each iteration moves right toward the minimum.

# 📌 Intuition

- Gradient Descent moves parameters in the opposite direction of the gradient, because:
  - The gradient points toward the steepest increase
  - We want to go toward the minimum
  - So we subtract it

## 🔎 1D Case (Single Variable)

- If the function is:

$$
J(\theta)
$$

- Then the update becomes:

$$
\theta_{t+1} = \theta_t - \eta\frac{d}{d\theta}J(\theta_t)
$$

## 🔎 Multi-Dimensional Case 

- if:

$$
\theta =
\begin{bmatrix}
\theta_1 \\
\theta_2 \\
\vdots \\
\theta_n
\end{bmatrix}
$$

- Then:

$$
\nabla J(\theta) =
\begin{bmatrix}
\frac{\partial J}{\partial \theta_1} \\
\frac{\partial J}{\partial \theta_2} \\
\vdots \\
\frac{\partial J}{\partial \theta_n}
\end{bmatrix}
$$

- Each parameter updates independently:

$$
\theta_i := \theta_i - \eta \frac{\partial J}{\partial \theta_i}
$$



# Rust Implementation

```rs
fn main() {
    let mut theta: f64 = 0.0;       // initial guess
    let learning_rate: f64 = 0.1;   // η
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

# Why This Works

- Because:
  - If θ < 3 → gradient is negative → subtracting negative increases θ
  - If θ > 3 → gradient is positive → subtracting decreases θ

- It automatically moves toward equilibrium.


# 📌 What It Means in Gradient Descent
$$
\mathcal{L}
$$

- represents the Loss function.

- So in ML:

- $ \theta$ → model parameters

- $L(θ)$ → how bad the model is

- Gradient Descent minimizes  $\mathcal{L}$

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



