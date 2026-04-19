---
title: "Chapter 110: CRUD with JDBC in Java — Create Read Update Delete in One Small Repository"
description: "Implement JDBC CRUD with PreparedStatement and try-with-resources: insert with generated keys, select by id, update, delete, optional transactions, and keep SQL in one repository-shaped class."
category: "Java"
tags:
  - Java JDBC CRUD
  - Java PreparedStatement insert update delete
  - Java JDBC repository pattern
  - Java JDBC transaction commit
  - Java getGeneratedKeys RETURNING
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 110
---

# Chapter 110: CRUD with JDBC in Java

**CRUD**—**C**reate, **R**ead, **U**pdate, **D**elete—is the **smallest** honest loop for **row-shaped** data. JDBC does not ship a **repository framework**; you **compose** **`PreparedStatement`** calls yourself (Chapters 108–109) and decide **where** **`Connection`** **commit** boundaries live (Chapter 107).

This chapter uses the same **`jdbc_demo_items`** table idea as Chapter 108—**run** its **`CREATE TABLE`** once if you have not already.

---

## 1. Topic title

**CRUD: four SQL shapes, four methods, one Connection borrowed per operation (or one per transaction)**

---

## 2. What it means

**Create** — **`INSERT`**; learn the new primary key via **`RETURNING`** (Postgres) or **`getGeneratedKeys()`**.

**Read** — **`SELECT … WHERE …`**; map **`ResultSet`** rows to **Java objects** or **`Optional`**.

**Update** — **`UPDATE … SET … WHERE …`**; check **`executeUpdate()`** row count when **“must exist”** matters.

**Delete** — **`DELETE … WHERE …`**; same **row count** discipline.

---

## 3. Why it is used

**Services** (later **Spring**) still end in **SQL**—knowing **CRUD** without a framework keeps **debugging** possible when **ORM** SQL surprises you.

**Migrations + repositories** are how **teams** share **ownership** of schema and access patterns.

---

## 4. Mental sketch

**CRUD** is **four drawers** in a **filing cabinet**—**add paper**, **pull one sheet**, **edit fields**, **shred**. JDBC is the **clerk** who actually **opens** each drawer; **`Connection`** is whether the clerk finishes **one drawer** at a time or **batches** a **whole folder** in one **commit**.

---

## 5. Java code example

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ItemRepository {
    private final String url;
    private final String user;
    private final String password;

    public ItemRepository(String url, String user, String password) {
        this.url = url;
        this.user = user;
        this.password = password;
    }

    public void ensureSchema(Connection conn) throws SQLException {
        try (Statement st = conn.createStatement()) {
            st.executeUpdate(
                    "CREATE TABLE IF NOT EXISTS jdbc_demo_items (id SERIAL PRIMARY KEY, name TEXT NOT NULL, note TEXT)");
        }
    }

    public long create(Connection conn, String name, String note) throws SQLException {
        String sql = "INSERT INTO jdbc_demo_items (name, note) VALUES (?, ?) RETURNING id";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, name);
            if (note == null) {
                ps.setNull(2, java.sql.Types.VARCHAR);
            } else {
                ps.setString(2, note);
            }
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    throw new SQLException("no generated id");
                }
                return rs.getLong("id");
            }
        }
    }

    public Optional<String> findNameById(Connection conn, long id) throws SQLException {
        String sql = "SELECT name FROM jdbc_demo_items WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    return Optional.empty();
                }
                return Optional.of(rs.getString("name"));
            }
        }
    }

    public int updateName(Connection conn, long id, String newName) throws SQLException {
        String sql = "UPDATE jdbc_demo_items SET name = ? WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, newName);
            ps.setLong(2, id);
            return ps.executeUpdate();
        }
    }

    public int deleteById(Connection conn, long id) throws SQLException {
        String sql = "DELETE FROM jdbc_demo_items WHERE id = ?";
        try (PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate();
        }
    }

    public List<Long> listIds(Connection conn) throws SQLException {
        List<Long> ids = new ArrayList<>();
        try (PreparedStatement ps = conn.prepareStatement("SELECT id FROM jdbc_demo_items ORDER BY id");
                ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                ids.add(rs.getLong("id"));
            }
        }
        return ids;
    }

    public static void main(String[] args) throws SQLException {
        String url = System.getenv().getOrDefault("JDBC_URL", "jdbc:postgresql://localhost:5432/demo");
        String user = System.getenv().getOrDefault("JDBC_USER", "demo");
        String password = System.getenv().getOrDefault("JDBC_PASSWORD", "demo");

        ItemRepository repo = new ItemRepository(url, user, password);
        try (Connection conn = DriverManager.getConnection(url, user, password)) {
            repo.ensureSchema(conn);
            long id = repo.create(conn, "notebook", "lined");
            System.out.println("created id=" + id);
            System.out.println(repo.findNameById(conn, id));
            System.out.println("updated rows=" + repo.updateName(conn, id, "journal"));
            System.out.println("ids=" + repo.listIds(conn));
            System.out.println("deleted rows=" + repo.deleteById(conn, id));
        }
    }
}
```

**`Optional`** keeps **“not found”** explicit without **`null`** **sprawl** at the **edge** of JDBC code.

---

## 6. Explanation of code

Each method takes **`Connection`** so callers can **wrap** several calls in **`setAutoCommit(false)`** … **`commit()`** when **invariants** span **multiple** statements—**this** file keeps **auto-commit** default **true** for **clarity**.

---

## 7. Common mistakes

**Opening a new Connection per row** in a **tight loop**—**pool** or **batch** instead.

**Ignoring `executeUpdate` count** when **`0`** means **“silently did nothing”** and your **API** should return **404** or **conflict**.

---

## 8. Best practices

Keep **SQL strings** **`private static final`** or **resource files** when they grow.

Add **`try (Connection conn = …)`** at the **service** layer; **repository** methods stay **narrow** and **testable** with **in-memory** databases later.

---

## 9. Small practice task

Wrap **`create` + `updateName`** in **one transaction**—**force** the **`update`** to **throw** (bad SQL) and confirm **`rollback`** leaves **no orphan row**.

---

## Beginner tip

When logs show **`UPDATE 0`**, your **`WHERE`** did not match—**log the id** and the **bound parameters** (sanitized) before blaming **Postgres**.
