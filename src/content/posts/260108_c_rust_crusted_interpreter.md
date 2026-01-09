---
title: 260108_c_rust_crusted_interpreter
published: 2026-01-08
description: '(67hr) Crusted Interpreter: The Whole Typed Affair | David Beazley'
image: ''
tags: [rust, compiler, c]
category: 'rust'
draft: false 
lang: ''
---

# link

- [C언어로 작성한 컴파일러 기초](#우선-c로-작성)
- [러스트로 코드를 변환해 보자.](#러스트로-코드를-변환해-보자)

<hr />

# 자료출처: Ahthor[|🔝|](#link)

- David Beazley(https://dabeaz.com/)

- [(67hr) Crusted Interpreter: The Whole Typed Affair | David Beazley](https://youtu.be/Rou26TpUG0Y?si=fym-TlOCpyHxr-p_)

- https://www.craftinginterpreters.com/

- https://github.com/munificent/craftinginterpreters

# 우선 C로 작성[|🔝|](#link)

- [C code ex)](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/C_Lang/001_Crusted_Interpreter_in_Rust_David_Beazley/001_chapter001/a01_interpreter)

```c
#include <stdio.h>
#include <stdlib.h>

typedef double Value;

/* -------- OpCode -------- */

typedef enum { OP_RETURN, OP_CONSTANT } OpCode;

/* Instruction with operand */
typedef struct {
    OpCode opcode;
    size_t operand; /* used only for OP_CONSTANT */
} Instruction;

/* -------- Chunk -------- */

typedef struct {
    Instruction *code;
    size_t code_count;
    size_t code_capacity;

    Value *constants;
    size_t constants_count;
    size_t constants_capacity;

    size_t *lines;
} Chunk;

/* -------- Utilities -------- */

static void *grow_array(void *array, size_t old_count, size_t new_count,
                        size_t elem_size) {
    (void)old_count;
    return realloc(array, elem_size * new_count);
}

/* -------- Chunk API -------- */

void init_chunk(Chunk *chunk) {
    chunk->code = NULL;
    chunk->code_count = 0;
    chunk->code_capacity = 0;

    chunk->constants = NULL;
    chunk->constants_count = 0;
    chunk->constants_capacity = 0;

    chunk->lines = NULL;
}

void free_chunk(Chunk *chunk) {
    free(chunk->code);
    free(chunk->constants);
    free(chunk->lines);
    init_chunk(chunk);
}

size_t add_constant(Chunk *chunk, Value value) {
    if (chunk->constants_count + 1 > chunk->constants_capacity) {
        size_t old = chunk->constants_capacity;
        chunk->constants_capacity = old < 8 ? 8 : old * 2;
        chunk->constants = grow_array(chunk->constants, old,
                                      chunk->constants_capacity, sizeof(Value));
    }

    chunk->constants[chunk->constants_count] = value;
    return chunk->constants_count++;
}

void write_chunk(Chunk *chunk, OpCode opcode, size_t operand, size_t line) {
    if (chunk->code_count + 1 > chunk->code_capacity) {
        size_t old = chunk->code_capacity;
        chunk->code_capacity = old < 8 ? 8 : old * 2;

        chunk->code = grow_array(chunk->code, old, chunk->code_capacity,
                                 sizeof(Instruction));

        chunk->lines =
            grow_array(chunk->lines, old, chunk->code_capacity, sizeof(size_t));
    }

    chunk->code[chunk->code_count] = (Instruction){opcode, operand};
    chunk->lines[chunk->code_count] = line;
    chunk->code_count++;
}

void disassemble_chunk(Chunk *chunk, const char *name) {
    printf("== %s ==\n", name);
    for (size_t i = 0; i < chunk->code_count; i++) {
        printf("%04zu ", i);
        switch (chunk->code[i].opcode) {
        case OP_RETURN:
            printf("OP_RETURN\n");
            break;
        case OP_CONSTANT:
            printf("%-16s %4zu ", "OP_CONSTANT", chunk->code[i].operand);
            printf("%g\n", chunk->constants[chunk->code[i].operand]);
            break;
        default:
            printf("Unknown opcode\n");
            break;
        }
    }
}

/* -------- Main -------- */

int main(void) {
    Chunk chunk;
    init_chunk(&chunk);

    size_t constant = add_constant(&chunk, 1.2);
    write_chunk(&chunk, OP_CONSTANT, constant, 123);

    write_chunk(&chunk, OP_RETURN, 0, 123);

    disassemble_chunk(&chunk, "test chunk");

    free_chunk(&chunk);
    return 0;
}
```



# 러스트로 코드를 변환해 보자.[|🔝|](#link)

- [rust code](https://github.com/YoungHaKim7/blog_code_polyglot/tree/main/Rust_Lang/001_Crusted_Interpreter_in_Rust_David_Beazley/chapter001/b01_interpreter_start)

```rs
#![allow(non_camel_case_types)]

pub type Value = f64;

#[derive(Debug)]
pub enum OpCode {
    OP_RETURN,
    OP_CONSTANT(usize),
}

#[derive(Debug)]
pub struct Chunk {
    code: Vec<OpCode>,
    constants: Vec<Value>,
    lines: Vec<usize>,
}

impl Chunk {
    pub fn new() -> Chunk {
        Chunk {
            code: Vec::new(),
            constants: Vec::new(),
            lines: Vec::new(),
        }
    }

    pub fn add_constant(&mut self, value: Value) -> usize {
        self.constants.push(value);
        self.constants.len() - 1
    }

    pub fn write(&mut self, op: OpCode, line: usize) {
        self.code.push(op);
        self.lines.push(line);
    }

    pub fn disassemble(&self, name: &str) {
        println!("== {name} ==");
        for (n, inst) in self.code.iter().enumerate() {
            println!("{n:04}, {inst:?}");
        }
    }
}


fn main() {
    println!("Hello, lox!");

    let mut chunk = Chunk::new();
    let constant = chunk.add_constant(1.2);
    chunk.write(OP_CONSTANT(constant), 1);
    chunk.write(OP_RETURN, 1);
    chunk.disassemble("test chunk");
}
```

