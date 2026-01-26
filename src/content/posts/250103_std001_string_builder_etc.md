---
title: 250103_std001_string_builder_etc
published: 2025-01-03
description: 'Rust Standard Library_training 001_ Concatenating strings(All 11 Rust code examples)'
image: ''
tags: [rust, std]
category: 'rust'
draft: false 
lang: ''
---

# link

<hr />

# Concatenating strings[|🔝|](#link)
- Using the format! macro
- Providing a default implementation
- Using the constructor pattern
- Using the builder pattern
- Parallelism through simple threads
- Generating random numbers
- Querying with regexes
- Accessing the command line
- Interacting with environment variables
- Reading from stdin
- Accepting a variable number of arguments


# Concatenating strings(All 11 Rust code examples)[|🔝|](#link)
- Here's a summary of what was implemented:

  |  #  |                 Topic                 |             Key Features Demonstrated             |
  |-|-|-|
  | 1   | [Concatenating strings (`format!` macro)](#1-concatenating-strings-format-macro) | String interpolation, positional/named parameters |
  | 2   | [Default implementation](#2-default-implementation)                | `Trait` with `default` methods, selective override  |
  | 3   | [Constructor pattern](#3-constructor-pattern)                   | `new()`, `origin()`, `from_polar()` constructors  |
  | 4   | [Builder pattern](#4-builder-pattern)                       | Fluent API, method chaining, optional fields      |
  | 5   | [Parallelism through threads](#5-parallelism-through-threads)           | `thread::spawn`, `join()`, `move` closure         |
  | 6   | [Generating random numbers](#6-generating-random-numbers)             | Custom LCG, range generation, f64 values          |
  | 7   | [Querying with regexes](#7-querying-with-regexes)                 | Pattern matching, find all, validation            |
  | 8   | [Accessing command line](#8-accessing-command-line)                | `env::args()`, flag parsing                       |
  | 9   | [Environment variables](#9-environment-variables)                 | `env::var()`, `set_var()`, `remove_var()`         |
  | 10  | [Reading from stdin](#10-reading-from-stdin)                    | `read_line()`, `read_to_end()`                    |
  | 11  | [Variadic arguments](#11-variadic-arguments)                    | Slice-based functions, macros for sum             |


## 1 Concatenating strings (`format!` macro)[|🔝|](#link)

```rs
// ============================================================================
// 1. CONCATENATING STRINGS - Using the format! macro
// ============================================================================

fn concat_strings_format() {
    let greeting = "Hello";
    let name = "Rust";

    // format! creates a new String without taking ownership
    let message = format!("{}, {}! Welcome to systems programming.", greeting, name);
    println!("{}", message);

    // Multiple values
    let a = 42;
    let b = 3.14;
    let formatted = format!("Integer: {}, Float: {:.2}", a, b);
    println!("{}", formatted);

    // Named parameters
    let formatted_named = format!("{greeting}, {name}!", greeting = "Hi", name = "World");
    println!("{}", formatted_named);
}
```

## 2. Default implementation[|🔝|](#link)

```rs
// ============================================================================
// 2. PROVIDING A DEFAULT IMPLEMENTATION
// ============================================================================

trait NoiseMaker {
    fn make_noise(&self) -> String {
        String::from("...silence...")
    }

    fn announce(&self) {
        println!("{}", self.make_noise());
    }
}

struct Dog;
struct Cat;

impl NoiseMaker for Dog {
    fn make_noise(&self) -> String {
        String::from("Woof!")
    }
}

impl NoiseMaker for Cat {} // Uses default implementation

fn default_implementation_example() {
    let dog = Dog;
    let cat = Cat;

    dog.announce(); // Woof!
    cat.announce(); // ...silence...
}
```

## 3. Constructor pattern[|🔝|](#link)
    
```rs
// ============================================================================
// 3. USING THE CONSTRUCTOR PATTERN
// ============================================================================

struct Point {
    x: f64,
    y: f64,
}

impl Point {
    // Constructor - new is a common naming convention
    fn new(x: f64, y: f64) -> Self {
        Point { x, y }
    }

    // Additional constructors with common patterns
    fn origin() -> Self {
        Point { x: 0.0, y: 0.0 }
    }

    fn from_polar(radius: f64, angle: f64) -> Self {
        Point {
            x: radius * angle.cos(),
            y: radius * angle.sin(),
        }
    }

    fn distance_from(&self, other: &Point) -> f64 {
        ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()
    }
}

fn constructor_pattern_example() {
    let p1 = Point::new(3.0, 4.0);
    let origin = Point::origin();
    let p2 = Point::from_polar(5.0, std::f64::consts::FRAC_PI_4);

    println!("Distance from p1 to origin: {}", p1.distance_from(&origin));
    println!("Distance from p2 to origin: {}", p2.distance_from(&origin));
}

```

## 4. Builder pattern[|🔝|](#link)

```rs

// ============================================================================
// 4. USING THE BUILDER PATTERN
// ============================================================================

struct HttpRequest {
    method: String,
    url: String,
    headers: Vec<(String, String)>,
    body: Option<String>,
    timeout: u64,
}

struct HttpRequestBuilder {
    method: Option<String>,
    url: Option<String>,
    headers: Vec<(String, String)>,
    body: Option<String>,
    timeout: Option<u64>,
}

impl HttpRequestBuilder {
    fn new() -> Self {
        HttpRequestBuilder {
            method: None,
            url: None,
            headers: Vec::new(),
            body: None,
            timeout: None,
        }
    }

    fn method(mut self, method: &str) -> Self {
        self.method = Some(method.to_string());
        self
    }

    fn url(mut self, url: &str) -> Self {
        self.url = Some(url.to_string());
        self
    }

    fn header(mut self, key: &str, value: &str) -> Self {
        self.headers.push((key.to_string(), value.to_string()));
        self
    }

    fn body(mut self, body: &str) -> Self {
        self.body = Some(body.to_string());
        self
    }

    fn timeout(mut self, seconds: u64) -> Self {
        self.timeout = Some(seconds);
        self
    }

    fn build(self) -> Result<HttpRequest, String> {
        Ok(HttpRequest {
            method: self.method.ok_or("Method is required")?,
            url: self.url.ok_or("URL is required")?,
            headers: self.headers,
            body: self.body,
            timeout: self.timeout.unwrap_or(30),
        })
    }
}

fn builder_pattern_example() {
    let request = HttpRequestBuilder::new()
        .method("GET")
        .url("https://api.example.com/users")
        .header("Accept", "application/json")
        .header("User-Agent", "Rust-Client")
        .timeout(10)
        .build()
        .unwrap();

    println!("Request: {} {} (timeout: {}s)", request.method, request.url, request.timeout);
}
```

## 5. Parallelism through threads[|🔝|](#link)


```rs
// ============================================================================
// 5. PARALLELISM THROUGH SIMPLE THREADS
// ============================================================================

use std::thread;
use std::time::Duration;

fn parallelism_threads_example() {
    // Spawn threads that run concurrently
    let handle1 = thread::spawn(|| {
        for i in 1..=5 {
            println!("Thread 1: count {}", i);
            thread::sleep(Duration::from_millis(100));
        }
    });

    let handle2 = thread::spawn(|| {
        for i in 1..=5 {
            println!("Thread 2: count {}", i);
            thread::sleep(Duration::from_millis(150));
        }
    });

    // Main thread also does work
    for i in 1..=3 {
        println!("Main thread: count {}", i);
        thread::sleep(Duration::from_millis(200));
    }

    // Wait for threads to complete
    handle1.join().unwrap();
    handle2.join().unwrap();

    println!("All threads completed!");

    // Moving data into threads
    let data = vec![1, 2, 3, 4, 5];
    let handle = thread::spawn(move || {
        let sum: i32 = data.into_iter().sum();
        println!("Sum calculated in thread: {}", sum);
        sum
    });

    let result = handle.join().unwrap();
    println!("Result from thread: {}", result);
}

```

## 6. Generating random numbers[|🔝|](#link)
    
```rs


// ============================================================================
// 6. GENERATING RANDOM NUMBERS
// ============================================================================

use std::time::SystemTime;
use std::collections::HashMap;

// Simple custom random number generator (Linear Congruential Generator)
struct SimpleRng {
    state: u64,
}

impl SimpleRng {
    fn new() -> Self {
        // Seed with system time
        let seed = SystemTime::now()
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_nanos() as u64;
        SimpleRng { state: seed }
    }

    fn next(&mut self) -> u64 {
        // LCG parameters from Numerical Recipes
        self.state = self.state.wrapping_mul(1664525).wrapping_add(1013904223);
        self.state
    }

    fn next_range(&mut self, min: u64, max: u64) -> u64 {
        min + (self.next() % (max - min + 1))
    }

    fn next_f64(&mut self) -> f64 {
        (self.next() >> 11) as f64 / (1u64 << 53) as f64
    }
}

fn random_numbers_example() {
    let mut rng = SimpleRng::new();

    println!("Random u64 values:");
    for _ in 0..5 {
        println!("  {}", rng.next());
    }

    println!("Random numbers in range 1-10:");
    for _ in 0..5 {
        println!("  {}", rng.next_range(1, 10));
    }

    println!("Random f64 values [0, 1):");
    for _ in 0..5 {
        println!("  {:.4}", rng.next_f64());
    }

    // Simulating dice rolls
    let mut rolls = HashMap::new();
    for _ in 0..1000 {
        let roll = rng.next_range(1, 6);
        *rolls.entry(roll).or_insert(0) += 1;
    }

    println!("Dice roll distribution (1000 rolls):");
    for face in 1..=6 {
        println!("  {}: {}", face, rolls.get(&face).unwrap_or(&0));
    }
}
```

## 7. Querying with regexes[|🔝|](#link)

```rs
// ============================================================================
// 7. QUERYING WITH REGEXES
// ============================================================================

// Simple regex implementation without external crates
struct SimpleRegex {
    pattern: String,
}

impl SimpleRegex {
    fn new(pattern: &str) -> Self {
        SimpleRegex {
            pattern: pattern.to_string(),
        }
    }

    // Simple literal string matching
    fn is_match(&self, text: &str) -> bool {
        text.contains(&self.pattern)
    }

    // Find all occurrences
    fn find_all(&self, text: &str) -> Vec<usize> {
        let mut positions = Vec::new();
        let mut start = 0;

        while let Some(pos) = text[start..].find(&self.pattern) {
            let absolute_pos = start + pos;
            positions.push(absolute_pos);
            start = absolute_pos + self.pattern.len();
        }

        positions
    }
}

fn regex_query_example() {
    let email_pattern = SimpleRegex::new("@");
    let text = "Contact us at user1@example.com or user2@test.org";

    println!("Text: {}", text);
    println!("Contains '@'? {}", email_pattern.is_match(text));

    println!("Positions of '@': {:?}", email_pattern.find_all(text));

    // Simple validation examples
    let validate_contains_digit = |s: &str| -> bool {
        s.chars().any(|c| c.is_ascii_digit())
    };

    let validate_contains_upper = |s: &str| -> bool {
        s.chars().any(|c| c.is_ascii_uppercase())
    };

    let validate_contains_lower = |s: &str| -> bool {
        s.chars().any(|c| c.is_ascii_lowercase())
    };

    let password = "SecurePass123";
    println!("Password validation:");
    println!("  Has digit: {}", validate_contains_digit(password));
    println!("  Has uppercase: {}", validate_contains_upper(password));
    println!("  Has lowercase: {}", validate_contains_lower(password));

    // Extract words from text
    let words: Vec<&str> = text.split_whitespace().collect();
    println!("Words found: {:?}", words);
}
```

## 8. Accessing command line[|🔝|](#link)

```rs

// ============================================================================
// 8. ACCESSING THE COMMAND LINE
// ============================================================================

use std::env;

fn command_line_example() {
    // Get the program name
    let program_name = env::args().next().unwrap_or_else(|| "program".to_string());
    println!("Program name: {}", program_name);

    // Get all arguments
    let args: Vec<String> = env::args().collect();
    println!("Total arguments: {}", args.len());
    println!("All arguments: {:?}", args);

    // Parse command line flags
    let mut show_help = false;
    let mut verbose = false;
    let mut input_file = String::new();

    for arg in args.iter().skip(1) {
        match arg.as_str() {
            "-h" | "--help" => show_help = true,
            "-v" | "--verbose" => verbose = true,
            arg if arg.starts_with("--file=") => {
                input_file = arg.strip_prefix("--file=").unwrap().to_string();
            }
            _ => {}
        }
    }

    if show_help {
        println!("Usage: {} [options]", program_name);
        println!("Options:");
        println!("  -h, --help       Show this help message");
        println!("  -v, --verbose    Enable verbose output");
        println!("  --file=FILE      Specify input file");
    } else {
        println!("Configuration:");
        println!("  Verbose: {}", verbose);
        println!("  Input file: {}", if input_file.is_empty() { "(none)" } else { &input_file });
    }
}

```

## 9. Environment variables[|🔝|](#link)
    
```rs

// ============================================================================
// 9. INTERACTING WITH ENVIRONMENT VARIABLES
// ============================================================================

fn environment_variables_example() {
    // Get a specific environment variable
    println!("PATH: {}", env::var("PATH").unwrap_or_else(|_| "Not set".to_string()));
    println!("HOME: {}", env::var("HOME").unwrap_or_else(|_| "Not set".to_string()));

    // Check if a variable exists
    let custom_var = env::var("MY_CUSTOM_VAR");
    match custom_var {
        Ok(value) => println!("MY_CUSTOM_VAR: {}", value),
        Err(_) => println!("MY_CUSTOM_VAR is not set"),
    }

    // Set environment variable (only affects current process and children)
    unsafe { env::set_var("MY_APP_DEBUG", "true"); }
    println!("MY_APP_DEBUG: {:?}", env::var("MY_APP_DEBUG"));

    // List all environment variables (warning: can be very long)
    println!("\nFirst 5 environment variables:");
    for (key, value) in env::vars().take(5) {
        println!("  {} = {}", key, value);
    }

    // Unset a variable
    unsafe { env::remove_var("MY_APP_DEBUG"); }
    println!("After unset, MY_APP_DEBUG: {:?}", env::var("MY_APP_DEBUG"));
}
```

## 10. Reading from stdin[|🔝|](#link)

```rs
// ============================================================================
// 10. READING FROM STDIN
// ============================================================================

use std::io::{self, Read, Write};

fn stdin_example() {
    // Reading a single line
    print!("Enter your name: ");
    io::stdout().flush().unwrap();

    let mut name = String::new();
    io::stdin()
        .read_line(&mut name)
        .expect("Failed to read line");

    println!("Hello, {}!", name.trim());

    // Reading multiple lines until empty input
    println!("\nEnter lines of text (empty line to stop):");
    let mut lines = Vec::new();

    loop {
        let mut line = String::new();
        io::stdin()
            .read_line(&mut line)
            .expect("Failed to read line");

        if line.trim().is_empty() {
            break;
        }

        lines.push(line.trim().to_string());
    }

    println!("You entered {} lines:", lines.len());
    for line in &lines {
        println!("  - {}", line);
    }

    // Reading raw bytes
    println!("\nEnter some text (Ctrl+D to finish):");
    let mut buffer = Vec::new();
    io::stdin().read_to_end(&mut buffer).unwrap_or(0);
    println!("Read {} bytes", buffer.len());
}

```

## 11. Variadic arguments[|🔝|](#link)

```rs
// ============================================================================
// 11. ACCEPTING A VARIABLE NUMBER OF ARGUMENTS
// ============================================================================

fn sum_all(numbers: &[i32]) -> i32 {
    numbers.iter().sum()
}

fn print_all(args: &[&str]) {
    for (i, arg) in args.iter().enumerate() {
        println!("Argument {}: {}", i, arg);
    }
}

// Using variadic function pattern via macro
macro_rules! calculate_sum {
    // Single element
    ($x:expr) => {
        $x
    };
    // Two or more elements
    ($($x:expr),+ $(,)?) => {
        {
            let mut sum = 0;
            $(
                sum += $x;
            )*
            sum
        }
    };
}

// Function with variadic-like behavior using vectors
fn find_min_max(numbers: &[i32]) -> Option<(i32, i32)> {
    if numbers.is_empty() {
        return None;
    }

    let mut min = numbers[0];
    let mut max = numbers[0];

    for &num in numbers.iter().skip(1) {
        if num < min {
            min = num;
        }
        if num > max {
            max = num;
        }
    }

    Some((min, max))
}

fn variadic_arguments_example() {
    // Using slice-based approach
    let nums = vec![1, 2, 3, 4, 5];
    println!("Sum of {:?}: {}", nums, sum_all(&nums));

    // Macro-based variadic
    println!("Sum via macro (1, 2, 3, 4, 5): {}", calculate_sum!(1, 2, 3, 4, 5));
    println!("Sum via macro (10, 20, 30): {}", calculate_sum!(10, 20, 30));
    println!("Sum via macro (42): {}", calculate_sum!(42));

    // Find min/max
    let numbers = vec![3, 1, 4, 1, 5, 9, 2, 6];
    match find_min_max(&numbers) {
        Some((min, max)) => println!("Range: {} to {}", min, max),
        None => println!("No numbers provided"),
    }

    // String arguments
    let args = vec!["hello", "world", "from", "rust"];
    print_all(&args);
}

// ============================================================================
// MAIN - Run all examples
// ============================================================================

fn main() {
    println!("=== 1. CONCATENATING STRINGS ===");
    concat_strings_format();

    println!("\n=== 2. DEFAULT IMPLEMENTATION ===");
    default_implementation_example();

    println!("\n=== 3. CONSTRUCTOR PATTERN ===");
    constructor_pattern_example();

    println!("\n=== 4. BUILDER PATTERN ===");
    builder_pattern_example();

    println!("\n=== 5. PARALLELISM WITH THREADS ===");
    parallelism_threads_example();

    println!("\n=== 6. RANDOM NUMBERS ===");
    random_numbers_example();

    println!("\n=== 7. REGEX QUERIES ===");
    regex_query_example();

    println!("\n=== 8. COMMAND LINE ACCESS ===");
    command_line_example();

    println!("\n=== 9. ENVIRONMENT VARIABLES ===");
    environment_variables_example();

    println!("\n=== 10. READING FROM STDIN ===");
    println!("(Skipping interactive stdin example in automated run)");
    // Uncomment to run interactively:
    // stdin_example();

    println!("\n=== 11. VARIADIC ARGUMENTS ===");
    variadic_arguments_example();
}
```


