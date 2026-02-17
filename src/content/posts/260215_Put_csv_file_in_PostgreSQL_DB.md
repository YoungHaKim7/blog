---
title: 260215_Put_csv_file_in_PostgreSQL_DB
published: 2026-02-15
description: 'Put csv file in DB'
image: ''
tags: [rust, db, postgresql]
category: 'rust_DB'
draft: false 
lang: ''
---

# rust code

- [rust code](https://github.com/YoungHaKim7/SQL_Training_PostgreSQL/tree/main/999_small_project_Rust/001_csv_to_postgresql/customers-1000)

```rs
use postgres::NoTls;

fn main() {
    // Connect to PostgreSQL
    let mut client = postgres::Client::connect(
        "postgres://gy:your_new_password@localhost/customers_db",
        NoTls,
    )
    .expect("Connection failed");

    // Create table
    client
        .execute(
            "DROP TABLE IF EXISTS customers",
            &[]
        )
        .expect("Drop table failed");

    client
        .execute(
            "CREATE TABLE customers (
                id SERIAL PRIMARY KEY,
                customer_id TEXT,
                first_name TEXT,
                last_name TEXT,
                company TEXT,
                city TEXT,
                country TEXT,
                phone1 TEXT,
                phone2 TEXT,
                email TEXT,
                subscription_date TEXT,
                website TEXT
            )",
            &[],
        )
        .expect("Create table failed");

    // Prepare insert statement
    let insert_sql = "INSERT INTO customers (
        customer_id, first_name, last_name, company, city, country,
        phone1, phone2, email, subscription_date, website
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

    let mut rowcnt = 0;

    // Read CSV file
    let csv_path = "/Users/gy-gyoung/my_project/Rust_Lang/9999/SQL_Training_PostgreSQL/999_small_project_Rust/001_csv_to_postgresql/customers-1000/customers-1000.csv";
    let mut rdr = csv::Reader::from_path(csv_path).expect("Failed to open CSV");

    // Begin transaction
    let mut tran = client.transaction().expect("Transaction failed");

    for result in rdr.records() {
        let record = result.expect("Failed to read record");

        let customer_id: &str = record.get(1).unwrap_or("");
        let first_name: &str = record.get(2).unwrap_or("");
        let last_name: &str = record.get(3).unwrap_or("");
        let company: &str = record.get(4).unwrap_or("");
        let city: &str = record.get(5).unwrap_or("");
        let country: &str = record.get(6).unwrap_or("");
        let phone1: &str = record.get(7).unwrap_or("");
        let phone2: &str = record.get(8).unwrap_or("");
        let email: &str = record.get(9).unwrap_or("");
        let subscription_date: &str = record.get(10).unwrap_or("");
        let website: &str = record.get(11).unwrap_or("");

        tran.execute(
            insert_sql,
            &[
                &customer_id, &first_name, &last_name, &company, &city, &country,
                &phone1, &phone2, &email, &subscription_date, &website
            ],
        )
        .expect("Insert failed");

        rowcnt += 1;
        if rowcnt % 100 == 0 {
            println!("rowcount = {}", rowcnt);
        }
    }

    tran.commit().expect("Commit failed");
    println!("Total rowcount = {}", rowcnt);
}
```

- 잘 들어갔나 확인

```bash
psql -U gy -d customers_db -c "SELECT * FROM customers LIMIT 10;"
```
