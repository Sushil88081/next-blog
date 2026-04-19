---
title: "Chapter 108: PreparedStatement in Java — Bound Parameters, executeUpdate vs executeQuery, and Generated Keys"
description: "Use PreparedStatement for parameterized SQL, set types with setString setInt setNull, choose executeQuery vs executeUpdate, and read RETURNING or getGeneratedKeys safely."
category: "Java"
tags:
  - Java PreparedStatement
  - Java JDBC parameterized query
  - Java setString PreparedStatement
  - Java executeUpdate executeQuery
  - Java getGeneratedKeys JDBC
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 108
---

# Chapter 108: PreparedStatement in Java

**`PreparedStatement`** is a **precompiled** SQL template with **`?`** placeholders. You **bind** values (**`setInt`**, **`setString`**, **`setTimestamp`**, **`setNull`**) so **user input never concatenates** into SQL text—this is the **core defense** you will extend in Chapter 111 with **discipline** and **validation**.

---

## 1. Topic title

**PreparedStatement: one SQL shape, many safe executions, driver sends binds efficiently**

---

## 2. What it means

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class PreparedInsertSelect {
    public static void main(String[] args) throws SQLException {
        String url = System.getenv().getOrDefault("JDBC_URL", "jdbc:postgresql://localhost:5432/demo");
        try (Connection conn = DriverManager.getConnection(url,
                System.getenv().getOrDefault("JDBC_USER", "demo"),
                System.getenv().getOrDefault("JDBC_PASSWORD", "demo"))) {

            try (Statement st = conn.createStatement()) {
                st.executeUpdate(
                        "CREATE TABLE IF NOT EXISTS jdbc_demo_items (id SERIAL PRIMARY KEY, name TEXT NOT NULL, note TEXT)");
            }

            try (PreparedStatement ins = conn.prepareStatement(
                    "INSERT INTO jdbc_demo_items (name) VALUES (?) RETURNING id")) {
                ins.setString(1, "pencil");
                try (ResultSet keys = ins.executeQuery()) {
                    if (keys.next()) {
                        System.out.println("new id=" + keys.getLong("id"));
                    }
                }
            }

            try (PreparedStatement sel = conn.prepareStatement("SELECT id, name FROM jdbc_demo_items WHERE id = ?")) {
                sel.setLong(1, 1L);
                try (ResultSet rs = sel.executeQuery()) {
                    while (rs.next()) {
                        System.out.println(rs.getLong("id") + " " + rs.getString("name"));
                    }
                }
            }
        }
    }
}
```

**Postgres** supports **`RETURNING`** as a **query**—**`executeQuery`** on the **`PreparedStatement`** is appropriate. For drivers that only expose **integer keys** via **`Statement.RETURN_GENERATED_KEYS`**, use **`prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)`** and **`getGeneratedKeys()`** instead.

---

## 3. Why it is used

**Injection resistance** and **plan reuse** on the server for **repeated** shapes.

**Binary-safe** handling of **blobs**, **precise** **`BigDecimal`** for money when paired with **`setBigDecimal`**.

---

## 4. Mental sketch

**`Statement`** with string **concatenation** is **pasting** user stickers onto a **form**—easy to cover the **wrong** box. **`PreparedStatement`** is a **form with blanks**; **`setX`** puts each answer in the **right slot**.

---

## 5. Java code example

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;

public class PreparedNullAndBatchSketch {
    public static void main(String[] args) throws SQLException {
        String url = System.getenv().getOrDefault("JDBC_URL", "jdbc:postgresql://localhost:5432/demo");
        try (Connection conn = DriverManager.getConnection(url,
                System.getenv().getOrDefault("JDBC_USER", "demo"),
                System.getenv().getOrDefault("JDBC_PASSWORD", "demo"))) {

            try (PreparedStatement ps = conn.prepareStatement("UPDATE jdbc_demo_items SET name = ? WHERE id = ?")) {
                ps.setString(1, "pen");
                ps.setLong(2, 1L);
                int updated = ps.executeUpdate();
                System.out.println("rows=" + updated);
            }

            try (PreparedStatement ps = conn.prepareStatement("INSERT INTO jdbc_demo_items (name, note) VALUES (?, ?)")) {
                ps.setString(1, "ghost");
                ps.setNull(2, Types.VARCHAR);
                ps.executeUpdate();
            }

            try (PreparedStatement ps = conn.prepareStatement("INSERT INTO jdbc_demo_items (name) VALUES (?)")) {
                ps.setString(1, "marker");
                ps.addBatch();
                ps.setString(1, "eraser");
                ps.addBatch();
                int[] counts = ps.executeBatch();
                System.out.println("batch lengths=" + counts.length);
            }
        }
    }
}
```

**`setNull`** needs a **`Types.*`** code so the driver sends a **typed NULL**. **`addBatch` / `executeBatch`** amortizes **round trips** for **bulk** inserts—watch **memory** and **transaction size**.

---

## 6. Explanation of code

**`executeUpdate`** returns **rows affected** for **DML**/**DDL** that is not a **`SELECT`**. Mixing **`RETURNING`** changes which **`execute*`** overload you pick—**read driver docs** when in doubt.

---

## 7. Common mistakes

**Reusing a `PreparedStatement` without `clearParameters()`** when loops **skip** some **`setX`** calls—stale binds leak into the **next** iteration.

**Binding timestamps with wrong calendar zone**—prefer **`setObject(n, Instant)`** on newer JDBC levels or **`OffsetDateTime`** where supported.

---

## 8. Best practices

Name SQL **constants** and **log obfuscated parameters**, not raw **secrets**.

Use **`try-with-resources`** per **`PreparedStatement`** when SQL text **changes per iteration**—cheap on modern JVMs compared to **debugging leaks**.

---

## 9. Small practice task

Write **`SELECT * FROM jdbc_demo_items WHERE name LIKE ?`** with **`setString(1, "%" + userFragment + "%")`**—then read Chapter 111’s guidance on **still** validating **`userFragment`** length and **characters**.

---

## Beginner tip

**`PreparedStatement` does not magically sanitize identifiers**—table and column names **cannot** be **`?`** parameters; use **allow-lists** in code, not **user** strings, for those parts.
