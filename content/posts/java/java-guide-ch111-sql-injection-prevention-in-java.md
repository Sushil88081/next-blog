---
title: "Chapter 111: SQL Injection Prevention in Java — Parameters, Allow-Lists, and Second-Order Surprises"
description: "Prevent SQL injection in Java JDBC: always bind values with PreparedStatement, never concatenate user input into SQL, use allow-lists for identifiers and sort keys, and watch second-order injection through stored data."
category: "Java"
tags:
  - Java SQL injection prevention
  - Java PreparedStatement security
  - Java JDBC bind parameters
  - Java SQL allow list ORDER BY
  - Java second order SQL injection
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 111
---

# Chapter 111: SQL Injection Prevention in Java

**SQL injection** happens when **user-controlled text** becomes **part of the SQL grammar** the database **parses**—not just **data** passed as **parameters**. The fix is **structural**: **bind** values, **allow-list** anything that must be **syntax** (sort columns, **`ASC`/`DESC`**), and **validate** shape **before** it touches **SQL**.

**`PreparedStatement`** (Chapter 108) is the **default** answer for **values**; this chapter stresses what **`?` still cannot do** and how **ORMs** do not **remove** your **responsibility**.

---

## 1. Topic title

**Injection prevention: separate SQL shape from user data; never let users pick grammar**

---

## 2. What it means

**Safe (parameterized):**

```java
PreparedStatement ps = conn.prepareStatement("SELECT name FROM jdbc_demo_items WHERE id = ?");
ps.setLong(1, userId);
```

**Unsafe (string splice):**

```java
String sql = "SELECT name FROM jdbc_demo_items WHERE id = " + userId; // still bad if userId is tainted text
```

If **`userId`** is **`"1 OR 1=1"`** as **raw text**, the **server** may execute **unintended** logic—**classic injection**.

**`?` cannot parameterize** table names, column names, **`ORDER BY`** expressions, or **`LIKE`** **structural** wildcards you **forgot** to escape—those need **code-side** **allow-lists** or **trusted** builders.

---

## 3. Why it is used

**Compliance** and **basic duty of care**—injection bugs are **OWASP** top-ten regulars with **severe** blast radius.

**Defense in depth**—**WAFs** and **least privilege DB roles** help, but **correct parameterization** is the **root** fix.

---

## 4. Mental sketch

Think of SQL as a **fill-in-the-blank worksheet** printed **once** in the **teacher’s office** (**`prepareStatement`**). Students (**users**) only **write in the blanks** (**`setString`**). Injection is letting a student **reprint the worksheet** with **new instructions** in the **margin**.

---

## 5. Java code example

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Set;

public class SafeQueryPatterns {
    private static final Set<String> SORTABLE = Set.of("id", "name");

    public static String orderByClause(String userRequestedColumn) {
        if (!SORTABLE.contains(userRequestedColumn)) {
            return "id";
        }
        return userRequestedColumn;
    }

    public static void main(String[] args) throws SQLException {
        String url = System.getenv().getOrDefault("JDBC_URL", "jdbc:postgresql://localhost:5432/demo");
        try (Connection conn = DriverManager.getConnection(url,
                System.getenv().getOrDefault("JDBC_USER", "demo"),
                System.getenv().getOrDefault("JDBC_PASSWORD", "demo"))) {

            String sortCol = orderByClause(args.length > 0 ? args[0] : "name");
            String sql = "SELECT id, name FROM jdbc_demo_items ORDER BY " + sortCol + " LIMIT ?";
            try (PreparedStatement ps = conn.prepareStatement(sql)) {
                ps.setInt(1, 10);
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        System.out.println(rs.getLong("id") + " " + rs.getString("name"));
                    }
                }
            }
        }
    }
}
```

**`ORDER BY`** piece is **not** a **`?`** bind—**Postgres** expects a **column name or expression** there. The **allow-list** **`SORTABLE`** is the **guard**.

---

## 6. Explanation of code

**`LIMIT ?`** **is** bindable as a **parameter** here—**drivers** differ for some **keywords**; when stuck, **parse** user input to **`int`** in Java and **concatenate the validated int** (still not **open-ended** text).

**`LIKE`** with user substrings: bind **`?`** for the **value**, but **escape `%` and `_`** if users may **inject** **wildcard** semantics—or **prefix-only** searches with **`value + "%"`** after **length** checks.

---

## 7. Common mistakes

**“We use an ORM, so we are safe”**—**HQL/JPQL** mistakes, **native queries**, and **string column defaults** still bite.

**Second-order injection**—data **stored** **safely** once, later **concatenated** when **read** back into **dynamic SQL**—**treat DB text as untrusted** when composing **new** statements.

---

## 8. Best practices

**Least privilege DB users**—app role **cannot** **`DROP SCHEMA`**.

**Centralize query builders**—one module owns **allow-lists** and **audit** logging.

**Fuzz and SAST**—automated tests with **`'`**, **`;--`**, **Unicode** homoglyphs on **every** text field.

---

## 9. Small practice task

Write the **unsafe** version of **`findNameById`** using **string concat** and prove a **`userId`** payload can return **more than one row** in a **throwaway** database—then **delete** the unsafe code and keep only **parameterized** form.

---

## Beginner tip

If a **code review** shows **`" + `** inside SQL **construction**, **stop** the line—**almost always** the wrong **habit** in **Java** services.
