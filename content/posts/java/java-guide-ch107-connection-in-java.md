---
title: "Chapter 107: Connection in Java — DriverManager, try-with-resources, Timeouts, and Transactions"
description: "Use java.sql.Connection from DriverManager.getConnection, set auto-commit and network timeouts, validate with isValid, and close connections reliably with try-with-resources."
category: "Java"
tags:
  - Java JDBC Connection
  - Java DriverManager getConnection
  - Java Connection setAutoCommit
  - Java Connection isValid
  - Java try with resources Connection
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 107
---

# Chapter 107: Connection in Java

**`Connection`** is a **session** with the database: **transaction** boundaries, **isolation** level, **schema** search path, and **warnings** accumulate here. You obtain it from **`DriverManager.getConnection`** (learning) or a **`DataSource.getConnection`** (production pools).

---

## 1. Topic title

**Connection: one client session; auto-commit default true; close releases server-side state**

---

## 2. What it means

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionBasics {
    public static void main(String[] args) throws SQLException {
        String url = System.getenv().getOrDefault("JDBC_URL", "jdbc:postgresql://localhost:5432/demo");
        String user = System.getenv().getOrDefault("JDBC_USER", "demo");
        String password = System.getenv().getOrDefault("JDBC_PASSWORD", "demo");

        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            conn.setNetworkTimeout(command -> command.run(), 5_000);
            if (!conn.isValid(2)) {
                throw new SQLException("connection not valid");
            }
            System.out.println("autoCommit=" + conn.getAutoCommit());
        }
    }
}
```

**`setNetworkTimeout`** helps **fail fast** when the network **stalls**—the **milliseconds** value is the second argument; the **`Executor`** runs the driver’s **timeout callback** (here **`command -> command.run()`** keeps the demo **self-contained** on the **calling** thread).

---

## 3. Why it is used

**Transaction control** — **`setAutoCommit(false)`**, **`commit()`**, **`rollback()`** for **multi-statement** atomic units (shown more in Chapter 110).

**Metadata** — **`getMetaData()`** for **portable** introspection (indexes, types).

---

## 4. Mental sketch

**`Connection`** is a **phone call** to the database: keep it **short** in **pool-less** learning scripts; in **servers**, you **borrow** a line from a **pool** and **hang up**—**`close()`** returns the line to the rack.

---

## 5. Java code example

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class TransactionSketch {
    public static void apply(Connection conn) throws SQLException {
        conn.setAutoCommit(false);
        try (Statement st = conn.createStatement()) {
            st.executeUpdate("UPDATE accounts SET balance = balance - 10 WHERE id = 1");
            st.executeUpdate("UPDATE accounts SET balance = balance + 10 WHERE id = 2");
            conn.commit();
        } catch (SQLException e) {
            conn.rollback();
            throw e;
        } finally {
            conn.setAutoCommit(true);
        }
    }

    public static void main(String[] args) throws SQLException {
        String url = System.getenv().getOrDefault("JDBC_URL", "jdbc:postgresql://localhost:5432/demo");
        try (Connection conn = DriverManager.getConnection(url,
                System.getenv().getOrDefault("JDBC_USER", "demo"),
                System.getenv().getOrDefault("JDBC_PASSWORD", "demo"))) {
            apply(conn);
        }
    }
}
```

Requires **`accounts`** table—**adapt** names or treat as **pattern** reading.

---

## 6. Explanation of code

**`rollback()`** must run on the **same** **`Connection`** that failed—**pool** users still follow the **try / commit / catch rollback** skeleton inside **`borrowedConn`** scope.

**`setAutoCommit(true)`** in **`finally`** restores **default** behavior for pooled connections that **return** to a **shared** bin.

---

## 7. Common mistakes

**Holding Connection across async gaps**—threads and **transactions** tangle; **one thread owns one connection** per transaction in **classic JDBC**.

**Ignoring `SQLWarning` chain** on **`Connection`**—use **`getWarnings()` / `clearWarnings()`** when debugging **odd truncations**.

---

## 8. Best practices

Centralize **URL + user + password** resolution (env, **config file**, **secret**) in **one factory** class.

Log **`conn.getClientInfo()`** / **application name** properties supported by Postgres so **DBA** traces map to **services**.

---

## 9. Small practice task

Add **`conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE)`** before the sketch updates and observe **serialization failures** under **concurrent** load—then read your driver’s **retry** guidance.

---

## Beginner tip

**`close()` on a pooled `Connection`** is usually **not** a real TCP teardown—it **returns** the socket to the pool—still **always** **`close()`** in **`try-with-resources`** so the pool can **recycle** correctly.
