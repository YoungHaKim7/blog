---
title: 260720_Imperative_VS_FP_basic002
published: 2026-07-20
description: 'Comprehensive Analysis: Imperative vs Functional Programming'
image: ''
tags: [FP, Functional, Imperative]
category: 'zFP_FunctionalProgramming'
draft: false 
lang: ''
---

# link

- [(📊 Detailed Comparison Table(C++23으로 비교)_Comprehensive Analysis: Imperative vs Functional Programming](#comprehensive-analysis-imperative-vs-functional-programming)

- [📝 Code Quality Metrics & 결론](#-code-quality-metrics)
  - 뭐가 좋다가 아니라 언제나 상황에 맞게 잘 섞어 써야한다.
  - 병렬실행이(parallels) 많은 작업은 FP가 젤 좋다.

- [📈 Key Insights(Imperative VS Functional Programming 언제 써야 좋을까?)](#-key-insights)

- 🔧 Code Examples Created
  - C++23
    - [Imperative C++23 (a01_imperative_cpp23.cpp) - Updated imperative style](#imperative-c23-a01_imperative_cpp23cpp---updated-imperative-style)
    - [Modern C++23 Functional Examples (`cpp23_functional_upgrade.cpp`)](#modern-c23-functional-examples-cpp23_functional_upgradecpp)
      - [`cpp23_functional_upgradecpp`다른 예시](#cpp23_functional_upgradecpp)
  - Rust Conversions
    - [Imperative Rust (imperative_rust.rs) - Traditional approach](#imperative-rust-imperative_rustrs---traditional-approach)
    - [Functional Rust (functional_rust.rs) - Modern functional patterns](#functional-rust-functional_rustrs---modern-functional-patterns)



<hr />

- [**Imperative Programming Deep Analysis**](#imperative-programming-deep-analysis)
  - **✅ Advantages:**
    - 1. Performance Optimization
    - 2. Debugging Experience
    - 3. Memory Management
    - 4. Developer Familiarity
    - 5. Fine-grained Control

  - **❌ Disadvantages:**
    - 1. Code Verbosity
    - 2. State Mutation Issues
    - 3. Limited Compositionality
    - 4. Testing Challenges
    - 5. Concurrency Barriers
    - 6. Maintenance Complexity

<hr />

- [**Functional Programming Deep Analysis**](#functional-programming-deep-analysis) 
  - **✅ Advantages:**
    - 1. **Declarative Style**
    - 2. **Enhanced Composability**
    - 3. **Immutability Benefits**
    - 4. **Superior Testability**
    - 5. **Natural Parallelization**
    - 6. **Expressiveness & Conciseness**
    - 7. **Better Modularity**
    - 8. **Modern Language Features**

  - **❌ Disadvantages:**
    - 1. **Learning Curve**
    - 2. **Performance Considerations**
    - 3. **Memory Usage Patterns**
    - 4. **Debugging Complexity**
    - 5. **Integration Challenges**

<hr />

- [🚀 Modern Alternative Pattern Examples](#-modern-alternative-pattern-examples)
  - [C++23](#c23-modern-functional-approach)
  - [Rust lang](#rust-functional-programming)

<hr />

# Comprehensive Analysis: Imperative vs Functional Programming[|🔝|](#link)

## 📊 Detailed Comparison Table(C++23으로 비교)

| **Aspect** | **Imperative** | **Functional** | **Key Differences** |
|------------|----------------------|--------------------------|-------------------|
| **Control Flow** | Explicit for/while loops with manual iteration | Algorithm-based (`std::transform`, `std::for_each`) | FP abstracts iteration control |
| **State Management** | Manual state accumulation in mutable variables | Declarative transformations with minimal state | FP reduces mutability |
| **Iteration Style** | `for (auto& file : files)` loop control | `files \| views::transform(func)` abstraction | FP uses iterator composition |
| **Side Effects** | Direct manipulation of state within loops | Controlled side effects through pure functions | FP isolates side effects |
| **Code Philosophy** | "How to do it" - step-by-step instructions | "What to do" - declarative specifications | Different mental models |
| **Variable Mutability** | Heavy use of `vector<int> results`, `int line_count` | Immutable where possible, const variables | FP emphasizes immutability |
| **Function Composition** | Sequential statements, manual orchestration | Composable operations using pipes/chains | FP enables compositionality |
| **Modern C++ Usage** | Traditional C++ style (pre-C++20) | C++20 ranges, C++23 features | FP leverages modern standards |
| **Error Handling** | Manual checking, error codes built into logic | Can be integrated with `std::expected`, `std::optional` | FP has better error handling |
| **Parallelization** | Difficult to parallelize due to shared state | Naturally parallelizable (no shared state) | FP better suited for concurrency |

# 🔍 Detailed Advantages and Disadvantages[|🔝|](#link)

# **Imperative Programming Deep Analysis**

## **✅ Advantages:**

1. **Performance Optimization**
   - Direct control over memory allocation
   - Predictable execution flow
   - Often generates more efficient machine code
   - Fine-grained optimization opportunities

2. **Debugging Experience**
   - Straightforward step-by-step debugging
   - Clear state inspection at each line
   - Easy to insert breakpoints and inspect variables
   - Call stack is more intuitive

3. **Memory Management**
   - Explicit control over allocation/deallocation
   - Predictable memory usage patterns
   - Easier to optimize memory footprint
   - Clear ownership semantics

4. **Developer Familiarity**
   - Matches traditional programming education
   - Similar to C, Java, Python styles
   - Lower learning curve for most developers
   - Industry-proven patterns

5. **Fine-grained Control**
   - Complete control over execution flow
   - Precise timing and sequence control
   - Easy to implement complex business logic
   - Better for hardware-level operations

## **❌ Disadvantages:**

1. **Code Verbosity**
   - More boilerplate code required
   - Repetitive patterns (initialization, loops, accumulation)
   - Higher maintenance burden
   - More lines of code to maintain

2. **State Mutation Issues**
   - Shared mutable state leads to bugs
   - Harder to reason about program state
   - Increased cognitive load when tracking changes
   - Potential for race conditions in concurrent code

3. **Limited Compositionality**
   - Difficult to combine operations
   - Tight coupling between steps
   - Hard to reuse individual components
   - Changes in one step affect others

4. **Testing Challenges**
   - Harder to unit test individual operations
   - Tests often need to mock complex state
   - Integration tests become necessary
   - Side effects make testing unpredictable

5. **Concurrency Barriers**
   - Shared state makes parallelization difficult
   - Requires complex synchronization mechanisms
   - Deadlocks and race conditions more likely
   - Scaling to multiple cores is challenging

6. **Maintenance Complexity**
   - Larger codebases become unwieldy
   - Harder to understand existing code
   - More difficult to refactor safely
   - Higher technical debt accumulation

# **Functional Programming Deep Analysis**[|🔝|](#link)

## **✅ Advantages:**

1. **Declarative Style**
   - Focuses on **what** to do, not **how**
   - More readable and self-documenting
   - Easier to understand intent
   - Reduces implementation details noise

2. **Enhanced Composability**
   - Functions can be easily combined
   - Building blocks for complex operations
   - Reusable components
   - Pipeline-style programming

3. **Immutability Benefits**
   - Reduces bugs from unexpected state changes
   - Easier to reason about program behavior
   - Thread-safe by default
   - Predictable function outputs

4. **Superior Testability**
   - Pure functions are easy to test
   - No complex setup/teardown required
   - Deterministic results
   - Better test coverage possible

5. **Natural Parallelization**
   - No shared state to synchronize
   - Easy to distribute computation
   - Better CPU utilization
   - Scales well with cores

6. **Expressiveness & Conciseness**
   - More code in fewer lines
   - Higher information density
   - Clearer business logic
   - Less boilerplate

7. **Better Modularity**
   - Clear separation of concerns
   - Each function has single responsibility
   - Easy to swap implementations
   - Better code organization

8. **Modern Language Features**
   - Leverages C++20 ranges, C++23 std::expected
   - Type-safe error handling
   - Pattern matching capabilities
   - Compiler optimizations friendly

## **❌ Disadvantages:**

1. **Learning Curve**
   - Requires paradigm shift in thinking
   - New concepts (monads, functors, etc.)
   - Different debugging strategies needed
   - More abstract initially

2. **Performance Considerations**
   - Potential overhead from abstractions
   - Temporary objects creation
   - Memory allocation patterns
   - May require optimization techniques

3. **Memory Usage Patterns**
   - Can create more temporary objects
   - Higher memory footprint sometimes
   - Garbage collection considerations
   - Cache locality impacts

4. **Debugging Complexity**
   - Harder to trace execution flow
   - Stack traces can be deeper
   - Lazy evaluation adds complexity
   - Requires different debugging mindset

5. **Integration Challenges**
   - May clash with existing imperative code
   - Requires different architecture approach
   - Team adoption barriers
   - Legacy code compatibility issues

# 🚀 Modern Alternative Pattern Examples[|🔝|](#link)

## **C++23 Modern Functional Approach**

- The modern C++23 examples demonstrate several advanced patterns:

1. **Error Handling with `std::expected`**
   - Type-safe error handling
   - Explicit success/failure paths
   - Composable error operations

2. **Lazy Evaluation with Ranges**
   - On-demand computation
   - Memory efficient for large datasets
   - Composable operations

3. **Functional Pipelines**
   - Composable function chains
   - Data flow programming
   - Declarative transformation specification

# **Rust Functional Programming**[|🔝|](#link)

- Rust provides excellent functional programming support:

1. **Iterator-based transformations**
   - Zero-cost abstractions
   - Compiler optimizations
   - Memory-efficient patterns

2. **Pattern matching and error handling**
   - `Result<T, E>` type for errors
   - `Option<T>` for optional values
   - Pattern matching with `match`

3. **Ownership and borrowing**
   - Enforces memory safety
   - No garbage collector needed
   - Thread-safe by design

# 📈 Performance and Memory Considerations[|🔝|](#link)

## **Imperative Approach**
- **Memory**: Generally lower memory footprint
- **CPU**: Often faster for simple operations
- **Cache**: Better locality of reference
- **Optimization**: Easier for compiler to optimize simple loops

## **Functional Approach**
- **Memory**: May use more temporary objects
- **CPU**: Can be equally fast with optimizations
- **Cache**: May suffer from poor locality
- **Optimization**: Modern compilers optimize FP code well

# 🎯 When to Use Each Approach[|🔝|](#link)

## **Use Imperative When:**
- Performance is critical and overhead matters
- Working with hardware-level operations
- Team lacks functional programming experience
- Simple, straightforward operations
- Memory constraints are tight

## **Use Functional When:**
- Code maintainability is priority
- Complex data transformations needed
- Concurrent/parallel processing required
- Testing and correctness are critical
- Working with modern C++ standards

# 🔧 Migration Strategies[|🔝|](#link)

1. **Gradual Adoption**
   - Start with small utility functions
   - Use functional patterns where they fit naturally
   - Don't force functional style everywhere

2. **Hybrid Approach**
   - Combine both paradigms
   - Use functional for data processing
   - Use imperative for business logic

3. **Team Training**
   - Invest in functional programming education
   - Code reviews focusing on functional patterns
   - Pair programming to share knowledge

# 📝 Code Quality Metrics[|🔝|](#link)

| Metric | Imperative | Functional |
|--------|-----------|------------|
| Lines of Code | Higher | Lower |
| Cyclomatic Complexity | Higher | Lower |
| Test Coverage | Harder to achieve | Easier to achieve |
| Maintainability Index | Lower | Higher |
| Defect Density | Higher | Lower |

# 🎓 Conclusion[|🔝|](#link)

- Functional programming in modern C++ and Rust offers significant advantages in terms of code quality, maintainability, and correctness, particularly for data processing operations like file line counting. While there is a learning curve and potential performance considerations, the benefits in terms of composability, testability, and concurrency make it a valuable approach for modern software development.

- The evolution from imperative through various functional approaches demonstrates a clear progression toward more maintainable, composable, and robust code. The modern C++23 and Rust examples show how these concepts translate to cutting-edge language features.
  - 현대 C++와 Rust의 기능 프로그래밍은 코드 품질, 유지보수 가능성, 정확성 측면에서 상당한 이점을 제공하며, 특히 파일 라인 카운팅과 같은 데이터 처리 작업에서 더욱 그렇습니다. 학습 곡선과 잠재적인 성능 고려 사항이 있지만, 구성 가능성, 테스트 가능성, 동시성 측면에서의 이점은 현대 소프트웨어 개발을 위한 귀중한 접근 방식이 됩니다.
  - 명령형 접근 방식에서 다양한 기능적 접근 방식을 통한 진화는 보다 유지 관리 가능하고, 구성 가능하며, 견고한 코드로의 명확한 발전을 보여줍니다. 최신 C++23 및 Rust 예제는 이러한 개념이 최첨단 언어 기능으로 어떻게 번역되는지 보여줍니다.

  

# 📋 **Comprehensive Analysis Complete**[|🔝|](#link)

- **Imperative vs Functional Programming** approaches. Here's what I've delivered:

## **📊 Core Analysis**

**Comparison Table**: Detailed comparison across 10 key aspects showing the fundamental differences between imperative and functional approaches.

**Detailed Advantages/Disadvantages**: Comprehensive analysis of both paradigms covering performance, debugging, maintainability, concurrency, and more.

## **🔧 Code Examples Created**

1. **Modern C++23 Functional Examples** (`cpp23_functional_upgrade.cpp`)
   - Error handling with `std::optional`
   - Functional composition
   - Lazy evaluation patterns
   - Pipeline processing

2. **Rust Conversions**
   - **Imperative Rust** (`imperative_rust.rs`) - Traditional approach
   - **Functional Rust** (`functional_rust.rs`) - Modern functional patterns
   - Iterator-based transformations
   - Zero-cost abstractions

3. **C++23 Modernization**
   - **Imperative C++23** (`a01_imperative_cpp23.cpp`) - Updated imperative style
   - **Functional approaches** with modern language features

# **📈 Key Insights**[|🔝|](#link)

- **Imperative Programming Strengths:**
  - Performance-critical operations
  - Hardware-level control
  - Easier debugging
  - Lower learning curve

- **Functional Programming Strengths:**
  - Better maintainability and composability
  - Natural parallelization
  - Enhanced testability
  - Modern language feature leverage

- 프로그래밍 강점(Imperative VS FP)

  - Imperative
    - 성능이 중요한 운영
    - 하드웨어 수준 제어
    - 더 쉬운 디버깅
    - 낮은 학습 곡선

  - (FP)기능적 프로그래밍 강점:
    - 유지 관리성 및 구성성 향상
    - 자연스러운 병렬화
    - 향상된 테스트 가능성
    - 현대 언어 기능 활용

# **🎯 Recommendations**[|🔝|](#link)

The analysis shows that **functional programming approaches offer significant advantages for data processing operations** like file line counting, particularly in terms of:

- **Code Quality**: Lower cyclomatic complexity, better maintainability
- **Testing**: Easier to unit test with pure functions
- **Concurrency**: Naturally parallelizable without shared state
- **Expressiveness**: More declarative and self-documenting code

- The progression from `a01` (imperative) through `a02-a07` (increasingly functional) demonstrates a clear evolution toward more robust, maintainable code.

- All examples are compilable and demonstrate practical implementations of both paradigms in modern C++ and Rust! 🦀


# Modern C++23[|🔝|](#link)

## Modern C++23 Functional Examples** (`cpp23_functional_upgrade.cpp`)[|🔝|](#link)

```cpp
// cpp23_functional_upgrade.cpp
#include <algorithm>
#include <fstream>
#include <iostream>
#include <optional>
#include <string>
#include <vector>

// Modern C++23 Functional Approach - Compatible version

// Using std::optional for error handling
std::optional<int> count_lines_safe(const std::string &filename) {
    std::ifstream in(filename);
    if (!in) {
        return std::nullopt;
    }

    std::istreambuf_iterator<char> it(in);
    std::istreambuf_iterator<char> end;

    return std::count(it, end, '\n');
}

// Functional approach using std::ranges and std::views (when available)
#ifdef __cpp_lib_ranges
std::vector<std::optional<int>>
count_lines_in_files_functional(const std::vector<std::string> &files) {
    auto to_optional = [](const std::string &file) {
        return count_lines_safe(file);
    };

    std::vector<std::optional<int>> results;
    std::ranges::transform(files, std::back_inserter(results), to_optional);
    return results;
}
#else
// Fallback for older compilers
std::vector<std::optional<int>>
count_lines_in_files_functional(const std::vector<std::string> &files) {
    std::vector<std::optional<int>> results;
    std::transform(
        files.begin(), files.end(), std::back_inserter(results),
        [](const std::string &file) { return count_lines_safe(file); });
    return results;
}
#endif

// Higher-order function approach
template <typename InputIt, typename OutputIt, typename UnaryFunc>
OutputIt transform_safe(InputIt first, InputIt last, OutputIt d_first,
                        UnaryFunc func) {
    for (auto it = first; it != last; ++it, ++d_first) {
        *d_first = func(*it);
    }
    return d_first;
}

// Lazy evaluation approach using generator pattern
class LineCounter {
  public:
    class Iterator {
      public:
        Iterator(const std::vector<std::string> *files, size_t index = 0)
            : files_(files), index_(index) {}

        Iterator &operator++() {
            ++index_;
            return *this;
        }

        std::optional<int> operator*() const {
            if (index_ < files_->size()) {
                return count_lines_safe((*files_)[index_]);
            }
            return std::nullopt;
        }

        bool operator!=(const Iterator &other) const {
            return index_ != other.index_;
        }

      private:
        const std::vector<std::string> *files_;
        size_t index_;
    };

    explicit LineCounter(const std::vector<std::string> &files)
        : files_(&files) {}

    Iterator begin() const { return Iterator(files_, 0); }
    Iterator end() const { return Iterator(files_, files_->size()); }

  private:
    const std::vector<std::string> *files_;
};

// Functional composition
template <typename F, typename G> auto compose(F f, G g) {
    return [f, g](auto &&...args) {
        return g(f(std::forward<decltype(args)>(args)...));
    };
}

// Pipeline processing
void process_files_pipeline(const std::vector<std::string> &files) {
    auto count_and_format =
        compose([](const std::string &file) { return count_lines_safe(file); },
                [](std::optional<int> count) -> std::optional<std::string> {
                    if (count) {
                        return std::to_string(*count) + " lines";
                    }
                    return std::nullopt;
                });

    std::cout << "Functional Pipeline Processing:\n";
    for (const auto &file : files) {
        auto result = count_and_format(file);
        if (result) {
            std::cout << "  " << file << ": " << *result << "\n";
        } else {
            std::cout << "  " << file << ": Error processing file\n";
        }
    }
}

int main() {
    std::cout << "C++23 Functional Programming Examples\n\n";

    const std::vector<std::string> files = {"file1.txt", "file2.txt",
                                            "file3.txt"};

    // Functional approach with error handling
    std::cout << "Functional approach with std::optional:\n";
    auto results = count_lines_in_files_functional(files);

    for (size_t i = 0; i < files.size(); ++i) {
        if (results[i]) {
            std::cout << "  " << files[i] << ": " << *results[i] << " lines\n";
        } else {
            std::cout << "  " << files[i] << ": Error - failed to count\n";
        }
    }

    // Lazy evaluation with custom iterator
    std::cout << "\nLazy evaluation with iterator pattern:\n";
    LineCounter counter(files);
    for (auto it = counter.begin(); it != counter.end(); ++it) {
        auto opt_count = *it;
        if (opt_count) {
            std::cout << "  " << *opt_count << " lines\n";
        }
    }

    // Pipeline processing
    process_files_pipeline(files);

    return 0;
}
```
## **Imperative C++23** (`a01_imperative_cpp23.cpp`) - Updated imperative style[|🔝|](#link)

```cpp
// a01_imperative_cpp23.cpp
#include <algorithm>
#include <expected>
#include <fstream>
#include <print>
#include <ranges>
#include <string>
#include <vector>

// Modern C++23 approach using std::expected and improved ranges

// Simple line counter
class LineCounter {
  public:
    int process(const std::string &filename) const {
        std::ifstream in(filename);
        return std::count(std::istreambuf_iterator<char>(in),
                          std::istreambuf_iterator<char>(), '\n');
    }
};

// Lazy evaluation approach using ranges
auto count_lines_lazy(const std::vector<std::string> &files) {
    LineCounter counter;
    return files | std::views::transform([&counter](const auto &file) {
               return counter.process(file);
           });
}

// Modern approach with std::expected for error handling
#include <expected>
std::expected<int, std::string> count_lines_safe(const std::string &filename) {
    std::ifstream in(filename);
    if (!in) {
        return std::unexpected("Failed to open file: " + filename);
    }

    int count = std::count(std::istreambuf_iterator<char>(in),
                           std::istreambuf_iterator<char>(), '\n');

    return count;
}

// Functional approach with error handling
std::vector<std::expected<int, std::string>>
count_lines_in_files_safe(const std::vector<std::string> &files) {
    return files | std::views::transform(count_lines_safe) |
           std::ranges::to<std::vector<std::expected<int, std::string>>>();
}

// Batch processing approach
void process_batch(const std::vector<std::string> &files, size_t batch_size) {
    for (size_t i = 0; i < files.size(); i += batch_size) {
        auto end = std::min(i + batch_size, files.size());
        std::vector<std::string> batch(files.begin() + i, files.begin() + end);

        auto results = count_lines_in_files_safe(batch);

        std::print("Batch {}:\n", i / batch_size);
        for (size_t j = 0; j < batch.size(); ++j) {
            if (results[j]) {
                std::println("  {}: {} lines", batch[j], results[j].value());
            } else {
                std::println("  {}: Error - {}", batch[j], results[j].error());
            }
        }
    }
}

int main() {
    std::print("Modern C++23 Functional Programming Example\n\n");

    const std::vector<std::string> files = {"file1.txt", "file2.txt",
                                            "file3.txt"};

    // Using lazy evaluation with ranges
    std::print("Lazy evaluation with ranges:\n");
    auto lazy_results = count_lines_lazy(files);
    for (const auto &count : lazy_results) {
        std::println("  {} lines", count);
    }

    std::print("\nError handling with std::expected:\n");
    auto safe_results = count_lines_in_files_safe(files);
    for (size_t i = 0; i < files.size(); ++i) {
        if (safe_results[i]) {
            std::println("  {}: {} lines", files[i], safe_results[i].value());
        } else {
            std::println("  {}: Error - {}", files[i], safe_results[i].error());
        }
    }

    std::print("\nBatch processing:\n");
    process_batch(files, 2);

    return 0;
}
```

## `cpp23_functional_upgrade.cpp`[|🔝|](#link)

```cpp
// cpp23_functional_upgrade.cpp
#include <algorithm>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <optional>

// Modern C++23 Functional Approach - Compatible version

// Using std::optional for error handling
std::optional<int> count_lines_safe(const std::string& filename) {
    std::ifstream in(filename);
    if (!in) {
        return std::nullopt;
    }

    std::istreambuf_iterator<char> it(in);
    std::istreambuf_iterator<char> end;

    return std::count(it, end, '\n');
}

// Functional approach using std::ranges and std::views (when available)
#ifdef __cpp_lib_ranges
std::vector<std::optional<int>>
count_lines_in_files_functional(const std::vector<std::string>& files) {
    auto to_optional = [](const std::string& file) {
        return count_lines_safe(file);
    };

    std::vector<std::optional<int>> results;
    std::ranges::transform(files, std::back_inserter(results), to_optional);
    return results;
}
#else
// Fallback for older compilers
std::vector<std::optional<int>>
count_lines_in_files_functional(const std::vector<std::string>& files) {
    std::vector<std::optional<int>> results;
    std::transform(files.begin(), files.end(), std::back_inserter(results),
                  [](const std::string& file) {
                      return count_lines_safe(file);
                  });
    return results;
}
#endif

// Higher-order function approach
template<typename InputIt, typename OutputIt, typename UnaryFunc>
OutputIt transform_safe(InputIt first, InputIt last, OutputIt d_first, UnaryFunc func) {
    for (auto it = first; it != last; ++it, ++d_first) {
        *d_first = func(*it);
    }
    return d_first;
}

// Lazy evaluation approach using generator pattern
class LineCounter {
public:
    class Iterator {
    public:
        Iterator(const std::vector<std::string>* files, size_t index = 0)
            : files_(files), index_(index) {}

        Iterator& operator++() {
            ++index_;
            return *this;
        }

        std::optional<int> operator*() const {
            if (index_ < files_->size()) {
                return count_lines_safe((*files_)[index_]);
            }
            return std::nullopt;
        }

        bool operator!=(const Iterator& other) const {
            return index_ != other.index_;
        }

    private:
        const std::vector<std::string>* files_;
        size_t index_;
    };

    explicit LineCounter(const std::vector<std::string>& files)
        : files_(&files) {}

    Iterator begin() const { return Iterator(files_, 0); }
    Iterator end() const { return Iterator(files_, files_->size()); }

private:
    const std::vector<std::string>* files_;
};

// Functional composition
template<typename F, typename G>
auto compose(F f, G g) {
    return [f, g](auto&&... args) {
        return g(f(std::forward<decltype(args)>(args)...));
    };
}

// Pipeline processing
void process_files_pipeline(const std::vector<std::string>& files) {
    auto count_and_format = compose(
        [](const std::string& file) { return count_lines_safe(file); },
        [](std::optional<int> count) -> std::optional<std::string> {
            if (count) {
                return std::to_string(*count) + " lines";
            }
            return std::nullopt;
        }
    );

    std::cout << "Functional Pipeline Processing:\n";
    for (const auto& file : files) {
        auto result = count_and_format(file);
        if (result) {
            std::cout << "  " << file << ": " << *result << "\n";
        } else {
            std::cout << "  " << file << ": Error processing file\n";
        }
    }
}

int main() {
    std::cout << "C++23 Functional Programming Examples\n\n";

    const std::vector<std::string> files = {
        "file1.txt", "file2.txt", "file3.txt"
    };

    // Functional approach with error handling
    std::cout << "Functional approach with std::optional:\n";
    auto results = count_lines_in_files_functional(files);

    for (size_t i = 0; i < files.size(); ++i) {
        if (results[i]) {
            std::cout << "  " << files[i] << ": " << *results[i] << " lines\n";
        } else {
            std::cout << "  " << files[i] << ": Error - failed to count\n";
        }
    }

    // Lazy evaluation with custom iterator
    std::cout << "\nLazy evaluation with iterator pattern:\n";
    LineCounter counter(files);
    for (auto it = counter.begin(); it != counter.end(); ++it) {
        auto opt_count = *it;
        if (opt_count) {
            std::cout << "  " << *opt_count << " lines\n";
        }
    }

    // Pipeline processing
    process_files_pipeline(files);

    return 0;
}
```


<hr />


# Rust[|🔝|](#link)

## [**Imperative Rust** (`imperative_rust.rs`) - Traditional approach][|🔝|](#link)

```rs
// imperative_rust.rs

// Imperative Rust Approach
use std::fs::File;
use std::io::{BufRead, BufReader};
use std::path::Path;

fn count_lines_imperative(filename: &str) -> Result<usize, std::io::Error> {
    let file = File::open(filename)?;
    let reader = BufReader::new(file);
    let mut count = 0;

    for line in reader.lines() {
        let _line = line?; // Explicitly handle each line
        count += 1;
    }

    Ok(count)
}

fn count_lines_in_files_imperative(files: &[&str]) -> Vec<Result<usize, std::io::Error>> {
    let mut results = Vec::with_capacity(files.len());

    for file in files {
        results.push(count_lines_imperative(file));
    }

    results
}

fn main() {
    println!("Imperative Rust Approach\n");

    let files = vec!["file1.txt", "file2.txt", "file3.txt"];
    let results = count_lines_in_files_imperative(&files);

    for (i, file) in files.iter().enumerate() {
        match &results[i] {
            Ok(count) => println!("{}: {} lines", file, count),
            Err(e) => println!("{}: Error - {}", file, e),
        }
    }
}
```

## **Functional Rust** (`functional_rust.rs`) - Modern functional patterns[|🔝|](#link)

```rs
// functional_rust.rs
// Functional Rust Approach
use std::fs::File;
use std::io::{BufRead, BufReader};

use rayon::iter::{IntoParallelRefIterator, ParallelIterator};

// Functional approach: Pure function with no side effects
fn count_lines_functional(filename: &str) -> Result<usize, std::io::Error> {
    let file = File::open(filename)?;
    let reader = BufReader::new(file);

    // Functional approach: Use iterator methods
    Ok(reader.lines().count())
}

// Higher-order function approach
fn count_lines_in_files_functional(files: &[&str]) -> Vec<Result<usize, std::io::Error>> {
    files
        .iter()
        .map(|&file| count_lines_functional(file))
        .collect()
}

// Even more functional: Using combinators
fn count_lines_in_files_ultra_functional(
    files: &[&str],
) -> impl Iterator<Item = Result<usize, std::io::Error>> {
    files.iter().map(|&file| count_lines_functional(file))
}

// Functional error handling with Result combinators
fn print_results_functional(files: &[&str]) {
    let results = count_lines_in_files_functional(files);

    files
        .iter()
        .zip(results.iter())
        .for_each(|(file, result)| match result {
            Ok(count) => println!("{}: {} lines", file, count),
            Err(e) => println!("{}: Error - {}", file, e),
        });
}

// Lazy evaluation approach using iterators
fn count_lines_lazy(files: &[&str]) -> impl Iterator<Item = usize> {
    files
        .iter()
        .filter_map(|&file| count_lines_functional(file).ok())
}

// Advanced functional approach: Parallel processing (using rayon)
// Note: This would require: use rayon::prelude::*;
fn count_lines_parallel(files: &[&str]) -> Vec<Result<usize, std::io::Error>> {
    files
        .par_iter() // Parallel iterator
        .map(|&file| count_lines_functional(file))
        .collect()
}

// Functional composition example
fn compose<F, G, A, B, C>(f: F, g: G) -> impl Fn(A) -> C
where
    F: Fn(A) -> B,
    G: Fn(B) -> C,
{
    move |x| g(f(x))
}

// File processing pipeline
fn process_files_with_pipeline(files: &[&str]) {
    let count_and_format = compose(
        |file: &str| count_lines_functional(file),
        |result: Result<usize, std::io::Error>| {
            result
                .map(|count| count.to_string())
                .map_err(|e| e.to_string())
        },
    );

    files.iter().for_each(|&file| match count_and_format(file) {
        Ok(formatted) => println!("{}: {} lines", file, formatted),
        Err(e) => println!("{}: Error - {}", file, e),
    });
}

fn main() {
    println!("Functional Rust Approach\n");

    let files = vec!["file1.txt", "file2.txt", "file3.txt"];

    // Basic functional approach
    let results = count_lines_in_files_functional(&files);
    println!("Basic functional approach:");
    files
        .iter()
        .zip(results.iter())
        .for_each(|(file, result)| match result {
            Ok(count) => println!("  {}: {} lines", file, count),
            Err(e) => println!("  {}: Error - {}", file, e),
        });

    // Lazy evaluation
    println!("\nLazy evaluation:");
    let lazy_counts: Vec<_> = count_lines_lazy(&files).collect();
    println!("  Successfully counted files: {:?}", lazy_counts);

    // Using print_results_functional
    println!("\nUsing functional printing:");
    print_results_functional(&files);

    // Pipeline approach
    println!("\nUsing functional pipeline:");
    process_files_with_pipeline(&files);

    // Ultra-functional approach (still lazy)
    println!("\nUltra-functional lazy iterator:");
    let ultra_results = count_lines_in_files_ultra_functional(&files);
    files
        .iter()
        .zip(ultra_results)
        .for_each(|(file, result)| match result {
            Ok(count) => println!("  {}: {} lines", file, count),
            Err(e) => println!("  {}: Error - {}", file, e),
        });

    // Parallel processing approach
    println!("\nParallel processing with rayon:");
    let parallel_results = count_lines_parallel(&files);
    files
        .iter()
        .zip(parallel_results.iter())
        .for_each(|(file, result)| match result {
            Ok(count) => println!("  {}: {} lines (parallel)", file, count),
            Err(e) => println!("  {}: Error - {} (parallel)", file, e),
        });
}
```
