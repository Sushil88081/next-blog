---
title: "Chapter 109: ResultSet in Java — next, Column Access, wasNull, and Forward-Only Cursors"
description: "Navigate rows with ResultSet.next, read columns by label vs index, use wasNull after getInt, understand TYPE_FORWARD_ONLY default, and close ResultSet in try-with-resources."
category: "Java"
tags:
  - Java ResultSet JDBC
  - Java ResultSet next getString
  - Java ResultSet wasNull
  - Java JDBC forward only cursor
  - Java try with resources ResultSet
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 109
---

# Chapter 109: ResultSet in Java

**`ResultSet`** is a **cursor** over rows returned by a **query**. By default it is **forward-only** and **read-only**—you **`next()`** until **`false`**, pulling values with **`getX`** accessors. It is **`AutoCloseable`**—close it when done so **server-side** cursors release early.

---

## 1. Topic title

**ResultSet: lazy row stream; column access by name or index; JDBC maps SQL types to Java types**

---

## 2. What it means

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ResultSetWalkthrough {
    public static void main(String[] args) throws SQLException {
        String url = System.getenv().getOrDefault("JDBC_URL", "jdbc:postgresql://localhost:5432/demo");
        try (Connection conn = DriverManager.getConnection(url,
                System.getenv().getOrDefault("JDBC_USER", "demo"),
                System.getenv().getOrDefault("JDBC_PASSWORD", "demo"));
                PreparedStatement ps = conn.prepareStatement("SELECT id, name FROM jdbc_demo_items ORDER BY id");
                ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                long id = rs.getLong(1);
                String name = rs.getString("name");
                System.out.println(id + " " + name);
            }
        }
    }
}
```

**Column index** is **1-based** (SQL tradition). **Label** access is case-insensitive for simple names on most drivers—still **prefer exact** aliases from **`SELECT id AS …`** for **stable** contracts.

---

## 3. Why it is used

**Streaming** large results—**do not** **`SELECT *`** into **`ArrayList`** blindly if the table is **huge**; process **row-by-row** or **page** with **`LIMIT`/`OFFSET`** or **keyset** pagination.

**Metadata-driven** tools read **`ResultSetMetaData`** for **column count** and **types**.

---

## 4. Mental sketch

**`ResultSet`** is a **bookmark** in a **novel**—**`next()`** turns the **page**; **`getString`** reads the **line** you care about on **that** page.

---

## 5. Java code example

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ResultSetNullableInt {
    public static void main(String[] args) throws SQLException {
        String url = System.getenv().getOrDefault("JDBC_URL", "jdbc:postgresql://localhost:5432/demo");
        try (Connection conn = DriverManager.getConnection(url,
                System.getenv().getOrDefault("JDBC_USER", "demo"),
                System.getenv().getOrDefault("JDBC_PASSWORD", "demo"))) {

            try (PreparedStatement ps = conn.prepareStatement("SELECT NULL::int AS maybe")) {
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        int v = rs.getInt("maybe");
                        boolean wasNull = rs.wasNull();
                        System.out.println("value=" + v + " wasNull=" + wasNull);
                    }
                }
            }
        }
    }
}
```

**`getInt` on SQL NULL** returns **`0`**—**`wasNull()`** disambiguates. For **`Integer`** objects, prefer **`getObject`** returning **`Integer`** or **`Optional`** patterns in higher layers.

---

## 6. Explanation of code

**`try-with-resources` nesting**—close **`ResultSet`** before **`Statement`** before **`Connection`** when not using the **flat** multi-resource form; the **flat** form closes in **reverse declaration order** (here **`rs`** then **`ps`** then **`conn`** if combined on one **`try`**).

---

## 7. Common mistakes

**Calling `getString` before `next()`**—cursor starts **before first row**; first **`next()`** moves to **row 1**.

**Assuming column order from `SELECT *`**—schema changes **reorder** columns; **explicit lists** or **aliases** stabilize code.

---

## 8. Best practices

Fetch **only needed columns**—less **I/O**, clearer **indexes**.

For **pagination**, prefer **keyset** predicates (**`WHERE id > ? ORDER BY id LIMIT ?`**) over **large offsets** when **datasets** grow.

---

## 9. Small practice task

Run a query that returns **zero rows**—confirm **`next()`** is **`false`** immediately and you **never** read columns—then add **`if (rs.isBeforeFirst())`** / **`isAfterLast()`** checks in a tiny helper for **logging**.

---

## Beginner tip

If **`SQLException`** says **“ResultSet not positioned properly”**, you almost always forgot **`next()`** or called **`getX`** after **`next()`** already returned **`false`**.
