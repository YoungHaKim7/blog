---
title: 260217_SurrealDB_Basic001
published: 2026-02-17
description: 'SurrealDB is an end-to-end cloud native database for web, mobile, serverless, jamstack, backend, and traditional applications. SurrealDB reduces the development time of modern applications by simplifying your database and API stack, removing the need for most server-side components, allowing you to build secure, performant apps quicker and cheaper. SurrealDB acts as both a database and a modern, realtime, collaborative API backend layer. SurrealDB can run as a single server or in a highly-available, highly-scalable distributed mode - with support for SQL querying from client devices, GraphQL, ACID transactions, WebSocket connections, structured and unstructured data, graph querying, full-text indexing, geospatial querying, and row-by-row permissions-based access'
image: ''
tags: [rust, db, surrealdb]
category: 'rust_DB'
draft: false 
lang: ''
---

# link

- tutorial
  - easy rust에서 만든거
    - https://surrealdb.com/learn/book
  - https://surrealdb.com/learn

- [awesome-surrreal) A curated list of SurrealDB resources, tools, utilities, and applications.](https://github.com/surrealdb/awesome-surreal)
  - https://surrealdb.com/

- [lib.rs(crates)_surrealDB잘 정리됨.](https://lib.rs/crates/surrealdb-beta)

- https://surrealdb.com/docs/surrealql/statements/info

<hr />

#  What is SurrealDB?
- SurrealDB is an end-to-end cloud native database for web, mobile, serverless, jamstack, backend, and traditional applications. SurrealDB reduces the development time of modern applications by simplifying your database and API stack, removing the need for most server-side components, allowing you to build secure, performant apps quicker and cheaper. SurrealDB acts as both a database and a modern, realtime, collaborative API backend layer. SurrealDB can run as a single server or in a highly-available, highly-scalable distributed mode - with support for SQL querying from client devices, GraphQL, ACID transactions, WebSocket connections, structured and unstructured data, graph querying, full-text indexing, geospatial querying, and row-by-row permissions-based access

- SurrealDB는 웹, 모바일, 서버리스, 잼스택, 백엔드 및 전통적인 애플리케이션을 위한 엔드투엔드 클라우드 네이티브 데이터베이스입니다. SurrealDB는 데이터베이스와 API 스택을 단순화하여 최신 애플리케이션의 개발 시간을 단축하고, 대부분의 서버 측 구성 요소를 필요로 하지 않아 안전하고 성능이 뛰어난 애플리케이션을 더 빠르고 저렴하게 구축할 수 있습니다. SuperraryDB는 데이터베이스이자 현대적이고 실시간으로 협업 가능한 API 백엔드 레이어 역할을 합니다. SuperraryDB는 단일 서버 또는 고가용성, 확장성이 높은 분산 모드로 실행될 수 있으며, 클라이언트 장치, GraphQL, ACID 트랜잭션, WebSocket 연결, 구조화 및 비정형 데이터, 그래프 쿼리, 전체 텍스트 인덱싱, 지리 공간 쿼리 및 행별 권한 기반 액세스를 지원합니다

# Data RAM에 저장해서 Redis같이
- https://surrealdb.com/learn/book/chapter-03

```bash
surreal start --user root --pass root memory
```

- SurrealDB 내장된 저장 프로그램 이용하기

```bash
surreal start --user root --pass root surrealkv://mydb
```

You'll see that the Starting kvs store in `memory` has changed to Starting kvs store at `surrealkv://mydb`. Now let's open up Surrealist, connect to `127.0.0.1:8000` (or `localhost:8000`), and do a very simple query:
- 메모리의 Starting kvs 스토어가 surrealkv://mydb에서 Starting kvs 스토어로 변경되었음을 확인할 수 있습니다. 이제 Superrialist를 열고 127.0.1:8000(또는 localhost:8000)에 연결하여 매우 간단한 쿼리를 해보겠습니다:

- https://surrealdb.com/learn/book/chapter-03


# A low-level, versioned, embedded, ACID-compliant, key-value database for Rust 
- https://github.com/surrealdb/surrealkv

<hr />

# curl로 Test

```bash
$ curl -X POST http://localhost:8000/sql \
        -u "root:root" \
        -d "USE NS test01; USE DB test_db; SELECT * FROM users"
[{"result":{"database":null,"namespace":"test01"},"status":"OK","time":"6.966436ms","type":null},{"result":{"database":"test_db","namespace":"test01"},"status":"OK","time":"170.53µs","type":null},{"result":"The table 'users' does not exist","status":"ERR","time":"1.497145ms","type":null}]**
```


# local server 구동할때 아이디 비번 다 설정하고 들어가야함

- memory 에 저장하기 redis같은거
  - `surreal start --user root --pass root memory`

- pretty해야 보기 편하다 ㅠㅠ
 `surreal sql --user root --pass root --pretty`

```bash
$ surreal start --user root --pass 1

 .d8888b.                                             888 8888888b.  888888b.
d88P  Y88b                                            888 888  'Y88b 888  '88b
Y88b.                                                 888 888    888 888  .88P
 'Y888b.   888  888 888d888 888d888  .d88b.   8888b.  888 888    888 8888888K.
    'Y88b. 888  888 888P'   888P'   d8P  Y8b     '88b 888 888    888 888  'Y88b
      '888 888  888 888     888     88888888 .d888888 888 888    888 888    888
Y88b  d88P Y88b 888 888     888     Y8b.     888  888 888 888  .d88P 888   d88P
 'Y8888P'   'Y88888 888     888      'Y8888  'Y888888 888 8888888P'  8888888P'


2026-02-15T15:27:56.572847Z  INFO surrealdb_server::env: Running 3.0.0-nightly+20260215.2d16ea0 for macos on aarch644
2026-02-15T15:27:56.572998Z  INFO surrealdb::core::kvs::ds: Starting kvs store in memory
2026-02-15T15:27:56.573061Z  INFO surrealdb::core::kvs::ds: Started kvs store in memory
2026-02-15T15:27:56.574485Z  INFO surreal::dbs: Initialising credentials user=root
2026-02-15T15:27:56.574580Z  INFO surrealdb::core::kvs::ds: Credentials were provided, and no root users were found. The root user 'root' will be created
2026-02-15T15:27:56.621087Z  INFO surrealdb::net: Started web server on 127.0.0.1:8000
2026-02-15T15:27:56.621099Z  INFO surrealdb::net: Listening for a system shutdown signal.

```

# surrealDB sql CLI로 test해보기
- https://surrealdb.com/docs/cli/sql


```bash
$ surreal sql --user root --pass 1

#
#  Welcome to the SurrealDB SQL shell
#
#  How to use this shell:
#    - Different statements within a query should be separated by a (;) semicolon.
#    - To create a multi-line query, end your lines with a (\) backslash, and press enter.
#    - To exit, send a SIGTERM or press CTRL+C
#
#  Consult https://surrealdb.com/docs/cli/sql for further instructions
#
#  SurrealDB version: 3.0.0-nightly+20260215.2d16ea0
#

> DEFINE USER root ON ROOT PASSWORD '1';
["The root user 'root' already exists"]

> USE NS test DB test;
[NONE]

test/test> CREATE category SET name = 'Technology', created_at = time::now();
[[{ created_at: d'2026-02-15T15:29:12.291572Z', id: category:846lh141sao1i93bt217, name: 'Technology' }]]

test/test> INFO FOR DB;                                                             [{ accesses: {  }, analyzers: {  }, apis: {  }, configs: {  }, functions: {  }, models: {  }, params: {  }, tables: { category: 'DEFINE TABLE category TYPE ANY SCHEMALESS PERMISSIONS NONE' }, users: {  } }]

test/test> INFO FOR NS;
[{ accesses: {  }, databases: { test: 'DEFINE DATABASE test' }, users: {  } }]

test/test> INFO FOR ROOT;
[{ accesses: {  }, namespaces: { test: 'DEFINE NAMESPACE test' }, nodes: { "bdec37bb-6ee6-4bb0-80a1-14e22bd5db79": 'NODE bdec37bb-6ee6-4bb0-80a1-14e22bd5db79 SEEN 1771169453639 ACTIVE' }, system: { available_parallelism: 8, cpu_usage: 0.08978643268346786f, load_average: [3.98681640625f, 2.89013671875f, 2.5029296875f], memory_allocated: 13226633, memory_usage: 32882688, physical_cores: 8, threads: 20 }, users: { root: "DEFINE USER root ON ROOT PASSHASH '$argon2id$v=19$m=19456,t=2,p=1$kmY2cdU12IAtgkQr/1Vd6A$HwB6LphDmRROXFmTJf9nQ/gMCwLdtuZ/EywCjJJHB4k' ROLES OWNER DURATION FOR TOKEN 1h, FOR SESSION NONE" } }]

test/test>

```

<hr />

- https://surrealdb.com/learn/book/chapter-03

# SQL start할떄 pretty해야 보기 좋다.

```bash
surreal sql --user root --pass root --pretty
```

# SurrealDB자체 저장하기
- https://surrealdb.com/learn/book/chapter-03

```bash
surreal start --user root --pass root surrealkv://mydb
```

## export(저장된 파일을 뽑아내고 싶다면 id , pw 입력해 주면됨.

```bash
$ surreal export --user root --password root --namespace test_name --database test_db export.surql
2026-02-17T06:53:31.775350Z  INFO surrealdb_server::cli::export: The SurrealQL file was exported successfully
```

## import (파일을 surrealDB에 넣어주는건 import로 바꿔주면됨.)

```bash
$ surreal import --user root --password root --namespace test_name --database test_db export.surql
2026-02-17T06:55:43.556903Z ERROR surrealdb_server::cli::import: Surreal import failed, import might only be partially completed or have failed entirely.
2026-02-17T06:55:43.556965Z ERROR surrealdb_server::cli: Thrown error: Database record `person:aeon` already exists
```

<hr />
                               
# ● Querying SurrealDB                                                                                          
                                                                                                              
  SurrealDB uses SurrealQL, a SQL-like query language. Here are the main ways to query:                       
                                                                                                              
- 1. Basic Query Syntax                                                                                       

```                                                                                                             
  -- Select records                                                                                           
  SELECT * FROM person;                                                                                       

  -- Select with filtering
  SELECT * FROM person WHERE age > 18;

  -- Create a record
  CREATE person SET name = "John", age = 25;

  -- Update records
  UPDATE person SET age = 26 WHERE name = "John";

  -- Delete records
  DELETE FROM person WHERE age < 18;

```

- 2. Query Interfaces

  HTTP/REST

# Using curl

```bash
  curl -X POST http://localhost:8000/sql \
    -u "root:root" \
    -d "SELECT * FROM person"
```
  
- WebSocket (Recommended for production)

```js
  const db = new Surreal('ws://localhost:8000/rpc');
  await db.signin({ user: 'root', pass: 'root' });
  await db.use('namespace', 'database');
  const result = await db.select('person');
```

- Rust SDK

```rs
  let sql = "SELECT * FROM person WHERE age > $age";
  let result = db.query(sql, [("age", 18)]).await?;
```

- CLI
```bash
surreal sql --endpoint http://localhost:8000 --namespace ns --database db
```

# Then enter queries interactively

- 3. Quick Start

- Run the development server:

- https://github.com/surrealdb
  - https://github.com/surrealdb/surrealdb

```bash
cargo run --no-default-features --features storage-mem,http,scripting -- start --log trace --user root --pass root memory
```
  
- Then query via HTTP or WebSocket at `http://localhost:8000`.

- Learn More
  - Full SurrealQL reference: https://surrealdb.com/docs/surrealql
  - SurrealDB University: https://surrealdb.com/learn

- Would you like help with a specific query type (e.g., graph queries, relationships, aggregations)?


# 10 Basic SurrealDB Commands

Based on your interaction with the SurrealDB SQL shell, here are the fundamental commands:

## 1. USE NS / USE DB
```sql
USE NS namespace_name;
USE DB database_name;
```
Select a namespace and database to work with. Required before most operations.

## 2. INFO
```sql
INFO FOR DB;     -- Database info (tables, users, etc.)
INFO FOR NS;     -- Namespace info
INFO FOR TABLE table_name;  -- Table schema
```

## 3. CREATE - Insert records
```sql
-- Create a record with auto-generated ID
CREATE user SET name = 'John', age = 30;

-- Create with specific ID
CREATE user:tobias SET name = 'Tobias', email = 'tobias@example.com';
```

## 4. SELECT - Query data
```sql
-- Select all records
SELECT * FROM user;

-- Select specific fields
SELECT name, email FROM user;

-- With conditions
SELECT * FROM user WHERE age > 25;
```

## 5. UPDATE - Modify records
```sql
-- Update specific record
UPDATE user:tobias SET email = 'newemail@example.com';

-- Update with conditions
UPDATE user SET age = 31 WHERE name = 'John';
```

## 6. DELETE - Remove records
```sql
-- Delete specific record
DELETE user:tobias;

-- Delete with conditions
DELETE user WHERE age < 18;

-- Delete all records in table
DELETE user;
```

## 7. RELATE - Create relationships
```sql
-- Create a relationship between two records
RELATE user:tobias->friend->user:john;
```

## 8. UPSERT - Update or insert
```sql
-- Updates if exists, inserts if not
UPSERT user:tobias SET name = 'Tobias', age = 32;
```

## 9. DEFINE TABLE - Create table
```sql
-- Define a schemaless table
DEFINE TABLE user SCHEMALESS;

-- Define with schema
DEFINE TABLE user SCHEMAFUL
  PERMISSIVE;
```

## 10. DEFINE FIELD - Add field constraints
```sql
DEFINE FIELD name ON TABLE user TYPE string;
DEFINE FIELD email ON TABLE user TYPE string ASSERT email@.com;
```

---

**Quick workflow to verify data:**
```sql
CREATE user SET name = 'Alice', role = 'admin';
SELECT * FROM user;  -- Verify it was created
UPDATE user SET role = 'superadmin' WHERE name = 'Alice';
SELECT * FROM user;  -- Verify update
```

For more details, see the [SurrealQL documentation](https://surrealdb.com/docs/surrealql).


# claude

⏺ Done! I've created:

  1. SURREALDB.md - A comprehensive cheat sheet formatted similarly to your
  PostgreSQL reference
  2. memory/MEMORY.md - Project memory with key commands and reference to the cheat
  sheet

  The cheat sheet covers all major SurrealDB features including its unique
  multi-model capabilities (graph, time-series, geospatial, vector search) that
  distinguish it from traditional databases like PostgreSQL.

To check if your data was inserted, simply run the SELECT query in the SurrealDB SQL shell:

```sql
SELECT * FROM category;
```

This will return all records in the `category` table. Based on your CREATE statement, you should see something like:

```json
[{ id: category:1a6ipew2kdc6frm47ats, name: 'Technology', created_at: d'2026-02-15T16:03:46.656535Z' }]
```

**Other useful queries:**

- Select specific fields:
```sql
SELECT name, created_at FROM category;
```

- Filter by a condition:
```sql
SELECT * FROM category WHERE name = 'Technology';
```

- Count records:
```sql
SELECT count() FROM category GROUP ALL;
```

- Get table info:
```sql
INFO FOR TABLE category;
```

Just type `SELECT * FROM category;` and press Enter in your shell where you see `test/test>`.


