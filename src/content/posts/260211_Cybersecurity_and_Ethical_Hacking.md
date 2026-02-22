---
title: 260211_Cybersecurity_and_Ethical_Hacking
published: 2026-02-11
description: 'Rust Cybersecurity and Ethical Hacking 001'
image: ''
tags: [rust, cybersecurity, hacking]
category: 'rust_CybersecurityHacking'
draft: false 
lang: ''
---

# link

- [Hands-On Cybersecurity and Ethical Hacking – Full Course | freeCodeCamp.org](https://youtu.be/ug8W0sFiVJo?si=WiUV959wJWoj03n3)


# `nmap` 

- 
```bash
$ nmap -sP scanme.nmap.org
Starting Nmap 7.98 ( https://nmap.org ) at 2026-02-22 13:15 +0900
Nmap scan report for scanme.nmap.org (45.33.32.156)
Host is up (0.14s latency).
Other addresses for scanme.nmap.org (not scanned): 2600:3c01::f03c:91ff:fe18:bb2f
Nmap done: 1 IP address (1 host up) scanned in 0.57 seconds
```

# rust로 만든 nmap

- [🤖 The Modern Port Scanner 🤖](https://github.com/bee-san/RustScan)

## RustScan Usage Guide

**RustScan** is a fast port scanner that can scan all 65,535 ports in ~3 seconds. Here's how to use it:

## Basic Commands

Build and run:
```bash
$ rustscan --help

rustscan 2.3.0
Fast Port Scanner built in Rust. WARNING Do not use this program against sensitive
infrastructure since the specified server may not be able to handle this many socket
connections at once. - Discord  <http://discord.skerritt.blog> - GitHub
<https://github.com/RustScan/RustScan>

USAGE:
    rustscan [OPTIONS] [-- <COMMAND>...]

OPTIONS:
  -a, --addresses <ADDRESSES>
          A comma-delimited list or newline-delimited file of separated CIDRs, IPs, or
          hosts to be scanned
  -p, --ports <PORTS>
          A list of comma separated ports to be scanned. Example: 80,443,8080
  -r, --range <RANGE>
          A range of ports with format start-end. Example: 1-1000
  -n, --no-config
          Whether to ignore the configuration file or not
      --no-banner
          Hide the banner
  -c, --config-path <CONFIG_PATH>
          Custom path to config file
  -g, --greppable
          Greppable mode. Only output the ports. No Nmap. Useful for grep or
          outputting to a file
      --accessible
          Accessible mode. Turns off features which negatively affect screen readers
      --resolver <RESOLVER>
          A comma-delimited list or file of DNS resolvers
  -b, --batch-size <BATCH_SIZE>
          The batch size for port scanning, it increases or slows the speed of
          scanning. Depends on the open file limit of your OS.  If you do 65535 it
          will do every port at the same time. Although, your OS may not support this
          [default: 4500]
  -t, --timeout <TIMEOUT>
          The timeout in milliseconds before a port is assumed to be closed [default:
          1500]
      --tries <TRIES>
          The number of tries before a port is assumed to be closed. If set to 0,
          rustscan will correct it to 1 [default: 1]
  -u, --ulimit <ULIMIT>
          Automatically ups the ULIMIT with the value you provided
      --scan-order <SCAN_ORDER>
          The order of scanning to be performed. The "serial" option will scan ports
          in ascending order while the "random" option will scan ports randomly
          [default: serial] [possible values: serial, random]
      --scripts <SCRIPTS>
          Level of scripting required for the run [default: default] [possible values:
          none, default, custom]
      --top
          Use the top 1000 ports
  -e, --exclude-ports <EXCLUDE_PORTS>
          A list of comma separated ports to be excluded from scanning. Example:
          80,443,8080
  -x, --exclude-addresses <EXCLUDE_ADDRESSES>
          A list of comma separated CIDRs, IPs, or hosts to be excluded from scanning
      --udp
          UDP scanning mode, finds UDP ports that send back responses
  -h, --help
          Print help
  -V, --version
          Print version
```

## Common Usage Examples

```bash
# Scan a host (all ports 1-65535)
rustscan -a 127.0.0.1

# Scan specific ports
rustscan -a 192.168.1.1 -p 80,443,8080

# Scan a port range
rustscan -a 192.168.1.1 -r 1-1000

# Scan with custom batch size (higher = faster but more resource intensive)
rustscan -a 192.168.1.1 -b 1000

# Increase timeout (useful for high latency networks)
rustscan -a 192.168.1.1 -t 2000

# Greppable mode (only show open ports, no banner)
rustscan -a 192.168.1.1 -g

# Scan multiple addresses
rustscan -a 192.168.1.1,192.168.1.2

# Random scan order
rustscan -a 192.168.1.1 --scan-order random

# UDP scanning
rustscan -a 192.168.1.1 --udp

# Exclude specific ports
rustscan -a 192.168.1.1 -e 80,443

# Use top 1000 ports
rustscan -a 192.168.1.1 --top
```

## Key Options

| Option | Description |
|--------|-------------|
| `-a, --addresses` | IP addresses or hostnames to scan |
| `-p, --ports` | Comma-separated ports (e.g., `80,443,8080`) |
| `-r, --range` | Port range (e.g., `1-1000`) |
| `-b, --batch-size` | Concurrent sockets (default: 4500) |
| `-t, --timeout` | Timeout in ms (default: 1500) |
| `-g, --greppable` | Output only open ports |
| `-u, --ulimit` | Automatically set ulimit |
| `--scan-order` | `serial` or `random` |
| `--udp` | Enable UDP scanning |
| `--top` | Use top 1000 ports |
| `-e, --exclude-ports` | Ports to exclude |

## With Nmap (after finding open ports)

```bash
# Pipe to nmap with additional flags
rustscan -- -a 192.168.1.1 -- -A -sC
```

The `--` separates RustScan options from Nmap options.

## Summary

**Problem**: Your command `rustscan -- -a 192.168.1.1 -- -A -sC` had an extra `--` at the beginning. This caused:
1. `-a 192.168.1.1` to be treated as part of the nmap command (positional args), not RustScan's address option
2. Since no address was specified, RustScan merged in config file addresses: `["127.0.0.1", "192.168.0.0/30", "www.google.com"]`
3. `192.168.0.0/30` expanded to 4 IPs, and `www.google.com` resolved to `142.250.77.164`

**Fixed**: I also fixed a code bug where `--no-config` didn't prevent config file parsing errors from crashing the program.

**Correct command format**:
```bash
# Put -a BEFORE the -- separator
rustscan -a 192.168.1.1 -- -A -sC

# Or with --no-config to bypass your config file
rustscan -a 192.168.1.1 --no-config --ulimit 5000 -- -A -sC
```

The `--` separator means "everything after this goes to nmap". RustScan options like `-a` must come **before** it.

# 오류 분석 후 잘 써보자

```bash

$ rustscan -b 32 -a 192.168.1.1

Automatically increasing ulimit value to 1000.
Looks like I didn't find any open ports for 127.0.0.1. This is usually caused by a high batch size.

*I used 1000 batch size, consider lowering it with 'rustscan -b <batch_size> -a <ip address>' or a comfortable number for your system.

 Alternatively, increase the timeout if your ping is high. Rustscan -t 2000 for 2000 milliseconds (2s) timeout.

Looks like I didn't find any open ports for 192.168.0.0. This is usually caused by a high batch size.

*I used 1000 batch size, consider lowering it with 'rustscan -b <batch_size> -a <ip address>' or a comfortable number for your system.

 Alternatively, increase the timeout if your ping is high. Rustscan -t 2000 for 2000 milliseconds (2s) timeout.

Looks like I didn't find any open ports for 192.168.0.1. This is usually caused by a high batch size.

*I used 1000 batch size, consider lowering it with 'rustscan -b <batch_size> -a <ip address>' or a comfortable number for your system.

 Alternatively, increase the timeout if your ping is high. Rustscan -t 2000 for 2000 milliseconds (2s) timeout.

Looks like I didn't find any open ports for 192.168.0.2. This is usually caused by a high batch size.

*I used 1000 batch size, consider lowering it with 'rustscan -b <batch_size> -a <ip address>' or a comfortable number for your system.

 Alternatively, increase the timeout if your ping is high. Rustscan -t 2000 for 2000 milliseconds (2s) timeout.

Looks like I didn't find any open ports for 192.168.0.3. This is usually caused by a high batch size.

*I used 1000 batch size, consider lowering it with 'rustscan -b <batch_size> -a <ip address>' or a comfortable number for your system.

 Alternatively, increase the timeout if your ping is high. Rustscan -t 2000 for 2000 milliseconds (2s) timeout.

Looks like I didn't find any open ports for 142.250.196.68. This is usually caused by a high batch size.

*I used 1000 batch size, consider lowering it with 'rustscan -b <batch_size> -a <ip address>' or a comfortable number for your system.

 Alternatively, increase the timeout if your ping is high. Rustscan -t 2000 for 2000 milliseconds (2s) timeout.
```


# `.rustscan.toml` settting

- https://github.com/bee-san/RustScan/wiki/Config-File

```toml
addresses = ["127.0.0.1", "192.168.0.0/30", "www.google.com"]
command = ["-A"]
# ports = {80 = 1, 443 = 1, 8080 = 1}
range = { start = 1, end = 10 }
greppable = false
accessible = true
scan_order = "Serial"
batch_size = 1000
timeout = 1000
tries = 3
ulimit = 1000

# The hashmap of {ports: {1:1}}
[ports]
1 = 1
3 = 1
4 = 1
6 = 1
7 = 1
9 = 1
13 = 1
17 = 1
19 = 1
20 = 1
21 = 1
22 = 1
23 = 1
24 = 1
25 = 1
26 = 1
30 = 1
32 = 1
33 = 1


..
..

..

port가 많다. 링크 눌러서 찾아보자.
```
