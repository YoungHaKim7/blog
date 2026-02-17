---
title: 260215_PostgresSQL_backup_export_import
published: 2026-02-15
description: 'extract files to PostgreSQL DB files'
image: ''
tags: [rust, db, postgresql]
category: 'rust_DB'
draft: false 
lang: ''
---

# link

- When you say “extract files to PostgreSQL DB files”, this can mean two different things:
  - 1. ✅ Import external files (CSV, JSON, etc.) into tables
  - 2. ✅ Extract/export data from PostgreSQL into files
  - 3. ⚠️ Directly modifying PostgreSQL’s internal database files (not recommended)

- I’ll clearly separate them.

# PostgreSQL backup(전체백업, Full physical DB copy)

```bash
pg_basebackup -D backup_folder -Fp -Xs -P
```
# 1. Summary (Clear Difference)

| Goal                  | Command         |
| --------------------- | --------------- |
| CSV → Table           | `\copy FROM`    |
| Table → CSV           | `\copy TO`      |
| DB → SQL file         | `pg_dump`       |
| Full physical DB copy | `pg_basebackup` |
| Edit raw DB files     | ❌ Never         |


# 2. Where PostgreSQL Stores Its Real DB Files

- PostgreSQL stores internal data files in its data directory.

- On Linux typically:

```bash
/var/lib/postgresql/<version>/main/
```

- On macOS (Homebrew):

```bash
/opt/homebrew/var/postgresql@<version>/
```

- Inside you'll see: (global에 저장 되나봄)

```bash
base/
global/
pg_wal/
```

# Visualizing Internal Storage

```bash
data_directory/
├── base/
│   ├── 16384/
│   │   ├── 12345
│   │   ├── 12346
│
├── global/
├── pg_wal/

```

# 2️⃣ Extract PostgreSQL Data → File

- Now the reverse direction.

## csv로 export하기

- Server-side (faster but requires permission)

```sql
COPY users FROM '/absolute/path/data.csv' CSV HEADER;
```

- The file must be accessible to the PostgreSQL server process.


## Export Entire Database

- Use:

```bash
pg_dump

```

- Example:

```bash
pg_dump -U postgres mydb > backup.sql
```

- This creates a logical SQL dump file.

## Export Binary Backup (Faster, Production)

```bash
pg_dump -Fc mydb > backup.dump
```

- Restore with:

```bash
pg_restore -U postgres -d mydb backup.dump
```

# 3️⃣ Where PostgreSQL Stores Its Real DB Files

- PostgreSQL stores internal data files in its data directory.

## 3.1. Where PostgreSQL Stores Its Real DB Files

- PostgreSQL stores internal data files in its data directory.

- On Linux typically:

```bash
/var/lib/postgresql/<version>/main/
```

- On macOS (Homebrew):

```bash
/opt/homebrew/var/postgresql@<version>/
```

- Inside you'll see: (global에 저장 되나봄)

```bash
base/
global/
pg_wal/
```

## 3.2 Visualizing Internal Storage

```bash
data_directory/
├── base/
│   ├── 16384/
│   │   ├── 12345
│   │   ├── 12346
│
├── global/
├── pg_wal/

```

- Each number represents:
  - Database OID
  - Table files
  - WAL logs

- ⚠️ You should NEVER manually edit these files.
- If you want to know the data directory:

```sql
SHOW data_directory;
```

# 4️⃣ If You Meant "Extract Raw Database Files"

- PostgreSQL is different from file-based databases like:
  - SQLite
- SQLite uses:

```bash
mydb.sqlite
```
- PostgreSQL does NOT work like that.
- PostgreSQL is a server-based database.
- You cannot simply copy one file to move a database.

- Instead, use:
  - `pg_dump`
  - `pg_basebackup` (for full physical backup)


# 5️⃣ Physical Backup (Real DB Files)

- To copy actual internal database files safely:
- Stop PostgreSQL first OR use:

```bash
pg_basebackup -D backup_folder -Fp -Xs -P
```

- This copies real database storage safely.



