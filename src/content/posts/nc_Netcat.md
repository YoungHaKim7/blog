---
title: nc_Netcat
published: 2024-01-03
description: 'nc 포트검색, Netcat(ornc)은 TCP 또는 UDP 프로토콜을 사용하여 네트워크 연결을 통해 데이터를 읽고 쓰는 명령줄 유틸리티입니다. `nc` - arbitrary TCP and UDP connections and listens'
image: ''
tags: [rust, linux, nc]
category: 'z_LinuxOS'
draft: false 
lang: ''
---

# link

- [잘 정리된 한글 blog](https://jjeongil.tistory.com/1600)

- [Linux man에 정리된 내용](https://linux.die.net/man/1/nc)

# 현재 열린 포트 검색 가능

- 20 ~ 1,000 열린 포트 검색

```bash
$ nc -z -v 127.0.0.1 20-1000
nc: connectx to 127.0.0.1 port 20 (tcp) failed: Connection refused
nc: connectx to 127.0.0.1 port 21 (tcp) failed: Connection refused
nc: connectx to 127.0.0.1 port 22 (tcp) failed: Connection refused
nc: connectx to 127.0.0.1 port 23 (tcp) failed: Connection refused
nc: connectx to 127.0.0.1 port 24 (tcp) failed: Connection refused
nc: connectx to 127.0.0.1 port 25 (tcp) failed: Connection refused
nc: connectx to 127.0.0.1 port 26 (tcp) failed: Connection refused
nc: connectx to 127.0.0.1 port 27 (tcp) failed: Connection refused

```


# UDP 연결을 설정


```bash
nc -u host port
```



# Examples
- https://linux.die.net/man/1/nc

- Open a TCP connection to port 42 of host.example.com, using port 31337 as the source port, with a timeout of 5 seconds:

```bash
$ nc -p 31337 -w 5 host.example.com 42
```

- Open a UDP connection to port 53 of host.example.com:

```bash
$ nc -u host.example.com 53
```

- Open a TCP connection to port 42 of host.example.com using 10.1.2.3 as the IP for the local end of the connection:

```bash
$ nc -s 10.1.2.3 host.example.com 42
```

- Create and listen on a Unix Domain Socket:

```bash
$ nc -lU /var/tmp/dsocket
```

- Connect to port 42 of host.example.com via an HTTP proxy at 10.2.3.4, port 8080. This example could also be used by ssh(1); see the ProxyCommand directive in ssh_config(5) for more information.

```bash
$ nc -x10.2.3.4:8080 -Xconnect host.example.com 42 
```
