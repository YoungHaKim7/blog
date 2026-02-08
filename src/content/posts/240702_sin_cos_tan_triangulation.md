---
title: 240702_sin_cos_tan_triangulation
published: 2024-07-02
description: 'sin , cos, tan 기초 & 삼각 측량(TRUE triangulation )'
image: ''
tags: [rust, math, sin, cos, tan, triangulation]
category: 'rust_Math_Science'
draft: false 
lang: ''
---

# link
- 수학용어 잘 정리
  - https://en.wikipedia.org/wiki/Glossary_of_mathematical_symbols
- [sin, cos, tan 1분만에 외우기(youtube 영상 정승제)](https://youtube.com/shorts/WjNfYjKC6vY?si=gjIYIgzNkBgcb92J)

- [삼각측량법(Triangulation) | Wiki](https://ko.wikipedia.org/wiki/삼각측량법)

- [Rust Code로 훈련하기](#rust-code로-훈련하기)

- 기초부터 하나씩
    - [1️⃣ sin, cos, tan — intuition first](#1%EF%B8%8F⃣-sin-cos-tan--intuition-first)
    - [2️⃣ CLI picture: all three at once](#2%EF%B8%8F⃣-cli-picture-all-three-at-once)
    - [3️⃣ Distance measurement using tan (most common)](#3%EF%B8%8F⃣-distance-measurement-using-tan-most-common)
    - [4️⃣ Distance using sin (indirect line of sight)](#4%EF%B8%8F⃣-distance-using-sin-indirect-line-of-sight)
    - [5️⃣ Distance using cos (horizontal distance)](#5%EF%B8%8F⃣-distance-using-cos-horizontal-distance)
    - [6️⃣ TRUE triangulation (two angles, no distance)](#6%EF%B8%8F⃣-true-triangulation-two-angles-no-distance)

<hr />

# CLI summary table[|🔝|](#link)

| Function| Measures                     |Used for      |
|-|-|-|
| sin     | vertical from hypotenuse    | height         |
| cos     | horizontal from hypotenuse  | distance       |
| tan     | height from distance        | slope / height |

## Mental model (very important)

```txt
sin → up
cos → across
tan → steepness
```

```txt
If you can walk to it → tan
If you can see it → sin / cos
If you can't reach it → triangulation
```


# 1️⃣ sin, cos, tan — intuition first[|🔝|](#link)
- sin, cos, tan - 직관 우선

- Right triangle definition
- 직각삼각형 정의

```txt
          /|
         / |  opposite
        /  |
       /θ  |
      /____|
     adjacent
```

- For an angle θ:

```txt
sin(θ) = opposite / hypotenuse
cos(θ) = adjacent / hypotenuse
tan(θ) = opposite / adjacent
```

- Memory trick

```txt
SOH CAH TOA
Sine  = Opp / Hyp
Cos   = Adj / Hyp
Tan   = Opp / Adj
```

# 2️⃣ CLI picture: all three at once[|🔝|](#link)
- CLI 사진: 세 가지 모두 한 번에

```txt
                 hypotenuse
               /|
              / |
             /  |  opposite
            /θ  |
           /____|
         adjacent
```

```txt
sin(θ) → how high?
cos(θ) → how far along?
tan(θ) → how steep?
```

# 3️⃣ Distance measurement using tan (most common)[|🔝|](#link)

## Example 1: Measure the height of a building
- Situation
  - You stand d = 50 m from a building
  - You measure angle to the top: θ = 30°

```txt
        Top of building
              *
              |\
              | \
        height|  \
              |   \
              |θ   \
              |_____\ ← ground
                50m
```

- Formula

```txt
tan(θ) = height / distance
height = distance × tan(θ)
```

- Calculation

```txt
height = 50 × tan(30°)
height = 50 × 0.577
height ≈ 28.9 m
```

- ✅ No ladder needed
- 사다리 필요 없음

# 4️⃣ Distance using sin (indirect line of sight)[|🔝|](#link)
- sin를 사용한 거리(간접 시선)

## Example 2: Distance to a mountain peak
- 산봉우리까지의 거리

- You measure:
  - Angle to peak θ
  - Line of sight (hypotenuse) L

```txt
           *
          /|
         / |
        /  | height
       /θ  |
      /____|
        ground

```

- Formula

```txt
sin(θ) = height / hypotenuse
height = hypotenuse × sin(θ)
```

- hypotenuse
  - 빗변, 사변

- Example

```txt
L = 200 m
θ = 20°

height = 200 × sin(20°)
height ≈ 200 × 0.342
height ≈ 68.4 m

```

# 5️⃣ Distance using cos (horizontal distance)[|🔝|](#link)
- cos를 사용한 거리(수평 거리)

## Example 3: How far is the base?
- 기지는 얼마나 떨어져 있나요?

```txt
           *
          /|
         / |
        /  |
       /θ  |
      /____|
     adjacent (unknown)
```

- adjacent
  - 이웃의, 인접한, 부근의 가까이 있는

- Formula

```txt
cos(θ) = adjacent / hypotenuse
adjacent = hypotenuse × cos(θ)
```

- Example

```txt
L = 100 m
θ = 60°

adjacent = 100 × cos(60°)
adjacent = 100 × 0.5
adjacent = 50 m
```

# 6️⃣ TRUE triangulation (two angles, no distance)[|🔝|](#link)
- 트루(true) 삼각 측량(두 각도, 거리 없음)

## Example 4: Measure distance to an island
- 섬까지의 거리 측정
- You stand at two points A and B, separated by baseline = 100 m.
- 기준선 = 100m로 구분하여 A와 B의 두 지점에 서 있습니다.

```txt
        Island
          *
         / \
        /   \
   θ1  /     \ θ2
      /       \
     A---------B
         100m
```

- Angles measured:

```txt
θ1 = 40°
θ2 = 60°
```

- Key idea
  - Using law of sines:

```txt

```


# distance to island from A =

$$\frac{100 \times \sin(\theta_2)}{\sin\left(180^\circ - \theta_1 - \theta_2\right)} $$



- Calculation

```txt
sin(60°) = 0.866
sin(80°) = 0.985

distance = (100 × 0.866) / 0.985
distance ≈ 87.9 m
```

- ✅ Used in:
  - GPS
  - Surveying
  - Astronomy
  - Radar

# Rust Code로 훈련하기[|🔝|](#link)

- [rust code ](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/011_Math_Science_Rust/Math/001_sin_cos_tan_etc/a01_sin_cos_tan)

```rs
//! Triangulation for Distance Measurement
//!
//! This example demonstrates various triangulation techniques using
//! trigonometric functions (sin, cos, tan) to measure distances.
//!
//! Common applications:
//! - Surveying and mapping
//! - GPS positioning
//! - Camera distance estimation
//! - Astrophysics (stellar parallax)

use std::f64::consts::PI;

/// Convert degrees to radians
fn to_radians(degrees: f64) -> f64 {
    degrees * PI / 180.0
}

/// Convert radians to degrees
fn _to_degrees(radians: f64) -> f64 {
    radians * 180.0 / PI
}

/// Represents a point in 2D space
#[derive(Debug, Clone, Copy)]
struct Point {
    x: f64,
    y: f64,
}

/// Triangulation result containing distance and position
#[derive(Debug)]
struct TriangulationResult {
    distance: f64,     // Distance from first observation point
    position: Point,   // Estimated (x, y) coordinates
    confidence: f64,   // Confidence metric (0-1)
}

/// Basic triangulation using two angles and a baseline
///
/// # Algorithm
/// Given two observation points A and B separated by baseline distance `d`,
/// and angles α (alpha) and β (beta) measured from each point to the target:
///
/// ```
///        Target
///         /|
///        / |
///       /  |
///      /   | height (h)
///     /    |
///    /     |
///   A      B
///   |------|
///   baseline (d)
/// ```
///
/// Using the law of sines:
/// distance_A = d * sin(β) / sin(α + β)
/// distance_B = d * sin(α) / sin(α + β)
///
/// # Arguments
/// * `baseline` - Distance between two observation points
/// * `angle_a` - Angle from point A to target (in degrees)
/// * `angle_b` - Angle from point B to target (in degrees)
///
/// # Returns
/// Triangulation result with distance and estimated position
fn basic_triangulation(baseline: f64, angle_a: f64, angle_b: f64) -> TriangulationResult {
    let alpha = to_radians(angle_a);
    let beta = to_radians(angle_b);

    // Law of sines to find distances
    let distance_from_a = baseline * beta.sin() / (alpha + beta).sin();
    let _distance_from_b = baseline * alpha.sin() / (alpha + beta).sin();

    // Calculate target position (assuming A is at origin, B at (baseline, 0))
    let target_x = distance_from_a * alpha.cos();
    let target_y = distance_from_a * alpha.sin();

    // Confidence metric (higher when angles sum is near 90 degrees)
    let angle_sum = angle_a + angle_b;
    let confidence = if angle_sum > 10.0 && angle_sum < 170.0 {
        1.0 - ((angle_sum - 90.0).abs() / 90.0)
    } else {
        0.1 // Low confidence for extreme angles
    };

    TriangulationResult {
        distance: distance_from_a,
        position: Point { x: target_x, y: target_y },
        confidence,
    }
}

/// Right triangle triangulation (simpler case)
///
/// Used when you have a right angle, such as measuring the height
/// of an object from a known distance.
///
/// # Arguments
/// * `distance` - Horizontal distance to object
/// * `elevation_angle` - Angle of elevation to top of object (in degrees)
///
/// # Returns
/// Height of the object
fn right_triangle_height(distance: f64, elevation_angle: f64) -> f64 {
    let angle = to_radians(elevation_angle);
    distance * angle.tan()
}

/// Calculate distance to object using two elevation angles
///
/// This is useful for measuring the height of an object when you can't
/// measure the horizontal distance directly.
///
/// # Algorithm
/// From two different positions, measure the elevation angle to the top.
/// Let d be the distance between observation points, α and β be the angles.
///
/// height = (d * tan(α) * tan(β)) / (tan(β) - tan(α))
///
/// Note: angle_near should be > angle_far for positive results
///
/// # Arguments
/// * `baseline` - Distance between two observation points
/// * `angle_near` - Elevation angle from closer position (larger angle, in degrees)
/// * `angle_far` - Elevation angle from farther position (smaller angle, in degrees)
///
/// # Returns
/// Height of the object and distance from near position
fn elevation_triangulation(
    baseline: f64,
    angle_near: f64,
    angle_far: f64,
) -> (f64, f64) {
    // Note: angle_near > angle_far typically (closer = larger elevation)
    let alpha = to_radians(angle_far);   // Smaller angle (farther position)
    let beta = to_radians(angle_near);   // Larger angle (closer position)

    let tan_alpha = alpha.tan();
    let tan_beta = beta.tan();

    // Calculate height using the formula
    let height = baseline * tan_alpha * tan_beta / (tan_beta - tan_alpha);

    // Calculate distance from near observation point
    let distance = height / tan_beta;

    (height, distance)
}

/// 3D triangulation using two observation points
///
/// # Arguments
/// * `baseline` - Distance between observation points
/// * `azimuth_a` - Horizontal angle from point A (in degrees)
/// * `elevation_a` - Vertical angle from point A (in degrees)
/// * `azimuth_b` - Horizontal angle from point B (in degrees)
/// * `elevation_b` - Vertical angle from point B (in degrees)
///
/// # Returns
/// 3D distance and position (x, y, z)
fn triangulation_3d(
    baseline: f64,
    azimuth_a: f64,
    elevation_a: f64,
    azimuth_b: f64,
    elevation_b: f64,
) -> (f64, Point) {
    let az_a = to_radians(azimuth_a);
    let el_a = to_radians(elevation_a);
    let az_b = to_radians(azimuth_b);
    let _el_b = to_radians(elevation_b);

    // Project onto horizontal plane
    let horizontal_distance = baseline * az_b.sin() / (az_a + az_b).sin();

    // Calculate 3D position
    let x = horizontal_distance * az_a.cos();
    let y = horizontal_distance * az_a.sin();
    let z = horizontal_distance * el_a.tan();

    let distance_3d = (x * x + y * y + z * z).sqrt();

    (distance_3d, Point { x, y: z })
}

/// Parallax method for distant objects (e.g., stars)
///
/// # Arguments
/// * `baseline` - Distance between observation points (e.g., Earth's orbit diameter)
/// * `parallax_angle` - Parallax angle in arcseconds
///
/// # Returns
/// Distance to object in the same units as baseline
fn parallax_distance(baseline: f64, parallax_angle: f64) -> f64 {
    let angle_radians = to_radians(parallax_angle / 3600.0); // Convert arcseconds to radians
    baseline / (2.0 * angle_radians.tan())
}

fn main() {
    println!("=== Triangulation for Distance Measurement ===\n");

    // Example 1: Basic triangulation
    println!("--- Example 1: Basic Triangulation ---");
    println!("Scenario: Two surveyors are 100m apart, measuring angles to a landmark");

    let baseline = 100.0; // meters
    let angle_a = 45.0;   // degrees from first point
    let angle_b = 60.0;   // degrees from second point

    let result = basic_triangulation(baseline, angle_a, angle_b);
    println!("Baseline: {}m", baseline);
    println!("Angle from point A: {}°", angle_a);
    println!("Angle from point B: {}°", angle_b);
    println!("Distance from A: {:.2}m", result.distance);
    println!("Estimated position: ({:.2}, {:.2})", result.position.x, result.position.y);
    println!("Confidence: {:.1}%\n", result.confidence * 100.0);

    // Example 2: Building height measurement
    println!("--- Example 2: Building Height Measurement ---");
    println!("Scenario: Measure building height from a known distance");

    let distance_to_building = 50.0; // meters
    let elevation_angle = 30.0;       // degrees

    let height = right_triangle_height(distance_to_building, elevation_angle);
    println!("Distance to building: {}m", distance_to_building);
    println!("Elevation angle: {}°", elevation_angle);
    println!("Building height: {:.2}m\n", height);

    // Example 3: Elevation triangulation (unknown distance)
    println!("--- Example 3: Elevation Triangulation ---");
    println!("Scenario: Measure tower height from two positions");

    let movement_distance = 30.0; // meters between observations
    let angle_far = 35.0;         // degrees (farther position - smaller angle)
    let angle_near = 50.0;        // degrees (closer position - larger angle)

    let (tower_height, distance_from_near) = elevation_triangulation(
        movement_distance,
        angle_near,
        angle_far,
    );
    println!("Distance moved: {}m", movement_distance);
    println!("Angle (near): {}°", angle_near);
    println!("Angle (far): {}°", angle_far);
    println!("Tower height: {:.2}m", tower_height);
    println!("Distance from near position: {:.2}m\n", distance_from_near);

    // Example 4: 3D triangulation
    println!("--- Example 4: 3D Triangulation ---");
    println!("Scenario: Track a flying drone");

    let baseline_3d = 50.0;
    let (distance_3d, pos_3d) = triangulation_3d(
        baseline_3d,
        30.0, // azimuth A
        20.0, // elevation A
        50.0, // azimuth B
        15.0, // elevation B
    );
    println!("Baseline: {}m", baseline_3d);
    println!("3D Distance: {:.2}m", distance_3d);
    println!("Position: x={:.2}m, y(z)={:.2}m (height)\n", pos_3d.x, pos_3d.y);

    // Example 5: Stellar parallax
    println!("--- Example 5: Stellar Parallax ---");
    println!("Scenario: Calculate distance to a nearby star");

    let earth_orbit_diameter = 2.0 * 149_600_000_000.0; // 2 AU in meters
    let stellar_parallax = 0.76; // arcseconds (Proxima Centauri)

    let star_distance = parallax_distance(earth_orbit_diameter, stellar_parallax);
    println!("Earth's orbital diameter: {:.2}e11 m", earth_orbit_diameter / 1e11);
    println!("Stellar parallax: {} arcseconds", stellar_parallax);
    println!("Distance to star: {:.2}e12 m ({:.3} light-years)",
        star_distance / 1e12,
        star_distance / 9_461_000_000_000_000.0
    );

    // Demonstrate the trigonometric relationships
    println!("\n--- Trigonometric Reference ---");
    println!("sin(30°) = {:.4}", to_radians(30.0).sin());
    println!("cos(60°) = {:.4}", to_radians(60.0).cos());
    println!("tan(45°) = {:.4}", to_radians(45.0).tan());
    println!("\nNote: sin(θ) = cos(90°-θ)");
}
```

- result


```bash
=== Triangulation for Distance Measurement ===

--- Example 1: Basic Triangulation ---
Scenario: Two surveyors are 100m apart, measuring angles to a landmark
Baseline: 100m
Angle from point A: 45°
Angle from point B: 60°
Distance from A: 89.66m
Estimated position: (63.40, 63.40)
Confidence: 83.3%

--- Example 2: Building Height Measurement ---
Scenario: Measure building height from a known distance
Distance to building: 50m
Elevation angle: 30°
Building height: 28.87m

--- Example 3: Elevation Triangulation ---
Scenario: Measure tower height from two positions
Distance moved: 30m
Angle (near): 50°
Angle (far): 35°
Tower height: 50.93m
Distance from near position: 42.74m

--- Example 4: 3D Triangulation ---
Scenario: Track a flying drone
Baseline: 50m
3D Distance: 41.39m
Position: x=33.68m, y(z)=14.16m (height)

--- Example 5: Stellar Parallax ---
Scenario: Calculate distance to a nearby star
Earth's orbital diameter: 2.99e11 m
Stellar parallax: 0.76 arcseconds
Distance to star: 40601.60e12 m (4.291 light-years)

--- Trigonometric Reference ---
sin(30°) = 0.5000
cos(60°) = 0.5000
tan(45°) = 1.0000

Note: sin(θ) = cos(90°-θ)
```

