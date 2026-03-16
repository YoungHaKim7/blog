---
title: glibc_stdio_h
published: 2026-01-02
description: 'This is glibc_s `stdio.h` header - the standard C I/O library interface. Let me explain the main function categories and their purposes:'
image: ''
tags: [c, glibc, kernel]
category: 'z_c'
draft: false 
lang: ''
---

# link

<hr />

- This is glibc's `stdio.h` header - the standard C I/O library interface. Let me explain the main function categories and their purposes:

## 1. **File Operations**

| Function | Purpose |
|----------|---------|
| `fopen()` | Opens a file and returns a FILE stream pointer |
| `freopen()` | Reopens a file with a different mode or reassigns an existing stream |
| `fclose()` | Closes a stream and flushes buffers |
| `remove()` | Deletes a file |
| `rename()` | Moves/renames a file |
| `fdopen()` | Creates a FILE stream from an existing file descriptor |

## 2. **Character I/O**

| Function | Purpose |
|----------|---------|
| `fgetc()` / `getc()` | Reads one character from a stream |
| `fgets()` | Reads a line (up to newline) into a string buffer |
| `getchar()` | Reads one character from stdin |
| `fputc()` / `putc()` | Writes one character to a stream |
| `fputs()` | Writes a string to a stream |
| `putchar()` | Writes one character to stdout |
| `ungetc()` | Pushes a character back into the input buffer |

## 3. **Formatted I/O - Output (printf family)**

| Function | Purpose |
|----------|---------|
| `printf()` | Writes formatted output to stdout |
| `fprintf()` | Writes formatted output to a stream |
| `sprintf()` | Writes formatted output to a string buffer (unsafe - no bounds) |
| `snprintf()` | Writes formatted output with size limit (safe) |
| `asprintf()` / `vasprintf()` | Allocates buffer automatically via malloc |
| `dprintf()` | Writes formatted output to a file descriptor |

## 4. **Formatted I/O - Input (scanf family)**

| Function | Purpose |
|----------|---------|
| `scanf()` | Reads formatted input from stdin |
| `fscanf()` | Reads formatted input from a stream |
| `sscanf()` | Reads formatted input from a string |

## 5. **Block I/O**

| Function | Purpose |
|----------|---------|
| `fread()` | Reads an array of elements (binary data) |
| `fwrite()` | Writes an array of elements (binary data) |

## 6. **File Positioning**

| Function | Purpose |
|----------|---------|
| `fseek()` | Sets file position (uses `long`) |
| `fseeko()` | Sets file position (uses `off_t` for large files) |
| `ftell()` / `ftello()` | Gets current file position |
| `rewind()` | Resets position to start of file |
| `fgetpos()` / `fsetpos()` | Saves/restores file position (handles large files) |

## 7. **Error Handling**

| Function | Purpose |
|----------|---------|
| `feof()` | Checks if EOF was reached |
| `ferror()` | Checks if an error occurred |
| `clearerr()` | Clears error and EOF flags |
| `perror()` | Prints error message describing current errno |

## 8. **Buffering Control**

| Function | Purpose |
|----------|---------|
| `setbuf()` | Sets buffer (or makes unbuffered if NULL) |
| `setvbuf()` | Sets buffering mode and size (`_IOFBF`, `_IOLBF`, `_IONBF`) |

## 9. **Temporary Files**

| Function | Purpose |
|----------|---------|
| `tmpfile()` | Creates a temporary file (deleted on close) |
| `tmpnam()` | Generates a unique temporary filename |
| `tempnam()` | Generates temp filename with directory/prefix control |

## 10. **Stream Locking (POSIX threads)**

| Function | Purpose |
|----------|---------|
| `flockfile()` | Acquires exclusive lock on a stream |
| `ftrylockfile()` | Tries to acquire lock without blocking |
| `funlockfile()` | Releases lock on a stream |

## 11. **Line-Oriented Input**

| Function | Purpose |
|----------|---------|
| `getline()` | Reads an entire line (allocates/reallocs buffer automatically) |
| `getdelim()` | Reads up to a specified delimiter |

## 12. **Process Pipes**

| Function | Purpose |
|----------|---------|
| `popen()` | Creates a pipe to/from a child process |
| `pclose()` | Closes a pipe and waits for child process |

---

## Key Constants

| Constant | Value/Description |
|----------|-------------------|
| `EOF` | End-of-file indicator (-1) |
| `BUFSIZ` | Default buffer size (8192) |
| `FILENAME_MAX` | Maximum filename length |
| `FOPEN_MAX` | Maximum open streams (16) |
| `SEEK_SET/CUR/END` | fseek origins |
| `_IOFBF/_IOLBF/_IONBF` | Buffering modes |

## Important Features

- **Large File Support**: `fopen64`, `fseeko64`, `off64_t` for files >2GB
- **Thread Safety**: `_unlocked` variants avoid locking overhead in single-threaded code
- **Cancellation Points**: Many functions can be cancelled by POSIX threads
- **GNU Extensions**: `renameat2`, `open_memstream`, `obstack_printf`

