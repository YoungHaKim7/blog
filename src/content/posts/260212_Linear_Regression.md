---
title: 260212_Linear_Regression
published: 2026-02-12
description: 'We’ll implement 1D Linear Regression using Batch Gradient Descent.'
image: ''
tags: [rust, ML, MachineLearning]
category: 'rust_ML_MachineLearning'
draft: false 
lang: ''
---


# link

<hr />

# Summary

- Let’s build Linear Regression from scratch in Rust and briefly explain the math.
- We’ll implement 1D Linear Regression using Batch Gradient Descent.

# 📌 1️⃣ Mathematical Model
- Hypothesis (model)

$$
\hat{y} = wx + b
$$

- $w$ → weight (slope)

- $b$ → bias (intercept)

# 📌 2️⃣ Loss Function (Mean Squared Error)

- [What It Means in Gradient Descent "L"- represents the Loss function `\mathcal{L}`](../260211_how_to_train_a_neural_net_sgd001/#-what-it-means-in-gradient-descent)

$$
\mathcal{L}(w,b)
=
\frac{1}{n}
\sum_{i=1}^{n}
\left( w x_i + b - y_i \right)^2
$$

- Goal:
- Minimize $\mathcal{L}(w,b)$ 

# 📌 3️⃣ Gradients
- Partial derivatives:

$$
\frac{\partial \mathcal{L}}{\partial w}
=
\frac{2}{n}
\sum_{i=1}^{n}
(w x_i + b - y_i)x_i
$$

$$
\frac{\partial \mathcal{L}}{\partial b}
=
\frac{2}{n}
\sum_{i=1}^{n}
(w x_i + b - y_i)
$$



# 📌 4️⃣ Update Rule (Gradient Descent)

$$
w := w - \eta \frac{\partial \mathcal{L}}{\partial w}
$$

$$
b := b - \eta \frac{\partial \mathcal{L}}{\partial b}
$$

- $\eta$ → learning rate

# 🦀 Rust Implementation (From Scratch)

- No external crates. Everything on stack.

```rs
fn main() {
    // Training data (y = 2x + 1)
    let x = vec![1.0, 2.0, 3.0, 4.0, 5.0];
    let y = vec![3.0, 5.0, 7.0, 9.0, 11.0];

    let n = x.len() as f64;

    let mut w: f64 = 0.0;   // weight
    let mut b: f64 = 0.0;   // bias

    let learning_rate = 0.01;
    let iterations = 1000;

    for iter in 0..iterations {
        let mut dw = 0.0;
        let mut db = 0.0;
        let mut loss = 0.0;

        for i in 0..x.len() {
            let y_pred = w * x[i] + b;
            let error = y_pred - y[i];

            loss += error * error;

            dw += error * x[i];
            db += error;
        }

        // compute gradients
        dw = (2.0 / n) * dw;
        db = (2.0 / n) * db;
        loss /= n;

        // update parameters
        w -= learning_rate * dw;
        b -= learning_rate * db;

        if iter % 100 == 0 {
            println!(
                "iter {:4} | w={:.4} b={:.4} loss={:.6}",
                iter, w, b, loss
            );
        }
    }

    println!("\nFinal Model: y = {:.4}x + {:.4}", w, b);
}
```

- result

```bash
iter    0 | w=0.5000 b=0.1400 loss=57.000000
iter  100 | w=2.0815 b=0.7058 loss=0.015866
iter  200 | w=2.0581 b=0.7903 loss=0.008060
iter  300 | w=2.0414 b=0.8505 loss=0.004094
iter  400 | w=2.0295 b=0.8935 loss=0.002080
iter  500 | w=2.0210 b=0.9241 loss=0.001056
iter  600 | w=2.0150 b=0.9459 loss=0.000537
iter  700 | w=2.0107 b=0.9614 loss=0.000273
iter  800 | w=2.0076 b=0.9725 loss=0.000138
iter  900 | w=2.0054 b=0.9804 loss=0.000070

Final Model: y = 2.0039x + 0.9860
```

# 📈 What Happens Internally

- Dataset:

```txt
x: 1 2 3 4 5
y: 3 5 7 9 11
```

- True relationship:

$$
y = 2x + 1
$$

- Gradient descent gradually updates:

```txt
w: 0 → 0.8 → 1.5 → 1.9 → 2.0
b: 0 → 0.5 → 0.9 → 1.0
```

- Eventually:

```txt
w ≈ 2
b ≈ 1

```

- Loss → almost 0.

# 🧠 Principle Behind It
- Why it works:
  - 1. Compute prediction error
  - 2. Measure how sensitive loss is to each parameter
  - 3. Move parameters in opposite direction of gradient
  - 4. Repeat until convergence

- Geometrically:
  - Loss surface is a bowl (convex)
  - Gradient always points uphill
  - We step downhill


# 🔬 Computational Complexity

- Each iteration:

```txt
O(n)
```

- Total:

```txt
O(n × iterations)
```

- No heap allocations inside loop except the original vectors.
