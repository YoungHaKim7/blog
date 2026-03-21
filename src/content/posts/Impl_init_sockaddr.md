---
title: Impl_init_sockaddr
published: 2026-03-21
description: 'Implemented init_sockaddr function(server & client) '
image: ''
tags: [UnsafeRust, socket, server, client]
category: 'Unsafe_Rust'
draft: false 
lang: ''
---

# link


- [예시 & c & unsaferust code](https://github.com/YoungHaKim7/glibc_The_GNU_C_Library_Training/tree/main/001_study_glibc/training_c/inetcli)


# C code

```c
// inetcli.c
#include <arpa/inet.h>
#include <errno.h>
#include <netdb.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <unistd.h>

#define PORT 5555
#define MESSAGE "Yow!!! Are we having fun yet?!?"
#define SERVERHOST "www.gnu.org"

void init_sockaddr(struct sockaddr_in *name, const char *hostname,
                   uint16_t port) {
    struct hostent *hostinfo;

    name->sin_family = AF_INET;
    name->sin_port = htons(port);
    hostinfo = gethostbyname(hostname);
    if (hostinfo == NULL) {
        fprintf(stderr, "Unknown host %s\n", hostname);
        exit(EXIT_FAILURE);
    }
    name->sin_addr = *(struct in_addr *)hostinfo->h_addr;
}

void write_to_server(int filedes) {
    int nbytes;

    nbytes = write(filedes, MESSAGE, strlen(MESSAGE) + 1);
    if (nbytes < 0) {
        perror("write");
        exit(EXIT_FAILURE);
    }
}

int main(void) {
    int sock;
    struct sockaddr_in servername;

    /* Create the socket.  */
    sock = socket(PF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        perror("socket (client)");
        exit(EXIT_FAILURE);
    }

    /* Connect to the server.  */
    init_sockaddr(&servername, SERVERHOST, PORT);
    if (0 > connect(sock, (struct sockaddr *)&servername, sizeof(servername))) {
        perror("connect (client)");
        exit(EXIT_FAILURE);
    }

    /* Send data to the server.  */
    write_to_server(sock);
    close(sock);
    exit(EXIT_SUCCESS);
}
```


# Unsafe Rust Code

## Result

- `server.rs`

```bash
$ cargo r --bin server
Yow!!! Are we having fun yet?!?
```

- `client.rs`

```bash
cargo r --bin client
```

- `server.rs`

```rs
// server.rs
use std::io::Read;
use std::net::TcpListener;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:5555").unwrap();

    for stream in listener.incoming() {
        let mut stream = stream.unwrap();

        let mut buf = [0u8; 1024];

        let n = stream.read(&mut buf).unwrap();

        println!("{}", String::from_utf8_lossy(&buf[..n]));
    }
}
```

- `client.rs`

```rs
// client.rs
use std::{ffi::CString, mem, process};

use libc::{
    AF_INET, PF_INET, SOCK_STREAM, addrinfo, close, connect, freeaddrinfo, getaddrinfo, htons,
    perror, sockaddr, sockaddr_in, socket, write,
};

const PORT: u16 = 5555;
const MESSAGE: &str = "Yow!!! Are we having fun yet?!?";
const SERVERHOST: &str = "127.0.0.1";

unsafe fn init_sockaddr(name: &mut sockaddr_in, hostname: &str, port: u16) {
    unsafe {
        let c_host = CString::new(hostname).unwrap();
        let c_port = format!("{}", port);
        let c_port = CString::new(c_port).unwrap();

        name.sin_family = AF_INET as u8;
        name.sin_port = htons(port);

        // Use getaddrinfo for address resolution (modern POSIX approach)
        let hints: addrinfo = mem::zeroed();
        let mut res: *mut addrinfo = std::ptr::null_mut();

        let status = getaddrinfo(c_host.as_ptr(), c_port.as_ptr(), &hints, &mut res);

        if status != 0 {
            eprintln!("getaddrinfo: {}", hostname);
            process::exit(1);
        }

        if res.is_null() {
            eprintln!("No address found for {}", hostname);
            process::exit(1);
        }

        let addr = &mut *(*res).ai_addr as *mut sockaddr as *mut sockaddr_in;
        name.sin_addr = (*addr).sin_addr;

        freeaddrinfo(res);
    }
}

unsafe fn write_to_server(fd: i32) {
    unsafe {
        let msg = MESSAGE.as_bytes();

        let nbytes = write(fd, msg.as_ptr() as *const _, msg.len());

        if nbytes < 0 {
            perror(b"write\0".as_ptr() as *const _);
            process::exit(1);
        }
    }
}

fn main() {
    unsafe {
        let sock = socket(PF_INET, SOCK_STREAM, 0);

        if sock < 0 {
            perror(b"socket (client)\0".as_ptr() as *const _);
            process::exit(1);
        }

        let mut servername: sockaddr_in = mem::zeroed();

        init_sockaddr(&mut servername, SERVERHOST, PORT);

        let result = connect(
            sock,
            &servername as *const _ as *const sockaddr,
            mem::size_of::<sockaddr_in>() as u32,
        );

        if result < 0 {
            perror(b"connect (client)\0".as_ptr() as *const _);
            process::exit(1);
        }

        write_to_server(sock);

        close(sock);
    }
}
```



