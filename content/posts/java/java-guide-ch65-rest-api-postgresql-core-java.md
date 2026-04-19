---
title: "Chapter 65: REST API with PostgreSQL in Core Java — HttpServer, JDBC, and Pieces You Already Learned"
description: "Build a tiny REST-style JSON API with JDK HttpServer and PostgreSQL JDBC: classes for data and storage, try-with-resources, SQLException, ArrayList, manual JSON strings, and SQL you can paste into psql."
category: "Java"
tags:
  - Java REST API core
  - Java HttpServer PostgreSQL
  - Java JDBC REST example
  - Java without Spring REST
  - Java PreparedStatement API
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 65
---

# Chapter 65: REST API with PostgreSQL (Core Java)

This chapter is a **project-shaped** stop: you wire a **small HTTP listener** to a **real database** using only **libraries that ship with learning setups**—the **JDK** plus the **PostgreSQL JDBC driver** JAR. Frameworks like Spring Boot come later in the roadmap; here you see the **moving parts** the frameworks hide.

You will reuse ideas from **classes** (Part 6), **exceptions** (Part 7), **`List` / `ArrayList`** (Chapters 55–56), **`Map`** mental model (63–64), and **encapsulation** (38): keep SQL inside a **repository** class instead of scattering strings through handlers.

---

## 1. What you will run

- **`GET /api/items`** → **`200`** and a **JSON array** of rows from table **`items`**.
- **`POST /api/items`** with body **`{"name":"notebook"}`** → **`201`**, inserts a row, returns **`{"id":…,"name":"…"}`**.
- Wrong path or bad JSON → plain **`400` / `404`** with a short JSON error object.

---

## 2. Things to install or gather

1. **JDK** you already use for the series (`javac` / `java`).
2. **PostgreSQL** running locally (or any host you can reach).
3. **JDBC driver JAR** for PostgreSQL—download a current **`postgresql-*.jar`** from your driver vendor’s site, or drop it in with your build tool if you prefer. The compile and run commands below assume the JAR sits **next to your sources** as **`postgresql.jar`** (rename for convenience).

---

## 3. Database setup (run once in `psql`)

```sql
CREATE TABLE IF NOT EXISTS items (
  id   BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

-- Optional seed row:
-- INSERT INTO items (name) VALUES ('demo');
```

If your server forbids the dummy insert, skip it—the API will still create rows.

---

## 4. Connection string and safety habits

Use a URL shaped like **`jdbc:postgresql://localhost:5432/yourdb`**. Pass **username** and **password** through **environment variables** in real life (`PGUSER`, `PGPASSWORD`) instead of hard-coding secrets in source files.

**`PreparedStatement`** (shown below) binds **`?`** placeholders so user text never splices raw into SQL—this is the same **injection** lesson you will see again in the JDBC chapters later in the roadmap.

---

## 5. Program layout (three types, one file for class-path simplicity)

- **`ItemRecord`** — tiny immutable data carrier (think **record-style** fields without using the `record` keyword if you want broader JDKs).
- **`ItemRepository`** — opens connections, runs SQL, maps **`ResultSet`** rows into **`ArrayList<ItemRecord>`**.
- **`ItemsApi`** — **`HttpHandler`** that reads the path, branches on **GET/POST**, writes **JSON bytes**, maps **SQL errors** to **`500`**.

You can split into multiple files once the flow feels obvious.

---

## 6. Java source (single `ItemsApi.java` file)

Save as **`ItemsApi.java`**, compile with **`postgresql.jar`** beside it, and run with the same classpath.

```java
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Row shape returned to the HTTP layer. */
final class ItemRecord {
    final long id;
    final String name;

    ItemRecord(long id, String name) {
        this.id = id;
        this.name = name;
    }
}

/** All SQL lives here — keeps handlers thin (encapsulation habit). */
final class ItemRepository {
    private final String jdbcUrl;
    private final String user;
    private final String pass;

    ItemRepository(String jdbcUrl, String user, String pass) {
        this.jdbcUrl = jdbcUrl;
        this.user = user;
        this.pass = pass;
    }

    List<ItemRecord> findAll() throws SQLException {
        String sql = "SELECT id, name FROM items ORDER BY id";
        try (Connection c = DriverManager.getConnection(jdbcUrl, user, pass);
             PreparedStatement ps = c.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            ArrayList<ItemRecord> out = new ArrayList<>();
            while (rs.next()) {
                out.add(new ItemRecord(rs.getLong("id"), rs.getString("name")));
            }
            return out;
        }
    }

    ItemRecord insert(String name) throws SQLException {
        String sql = "INSERT INTO items (name) VALUES (?) RETURNING id, name";
        try (Connection c = DriverManager.getConnection(jdbcUrl, user, pass);
             PreparedStatement ps = c.prepareStatement(sql)) {
            ps.setString(1, name);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    throw new SQLException("insert returned no row");
                }
                return new ItemRecord(rs.getLong("id"), rs.getString("name"));
            }
        }
    }
}

/** Minimal JSON helpers — no third-party JSON library on purpose. */
final class TinyJson {
    static String escape(String raw) {
        return raw.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    static String itemsToJson(List<ItemRecord> rows) {
        StringBuilder sb = new StringBuilder();
        sb.append('[');
        for (int i = 0; i < rows.size(); i++) {
            if (i > 0) {
                sb.append(',');
            }
            ItemRecord r = rows.get(i);
            sb.append("{\"id\":").append(r.id).append(",\"name\":\"").append(escape(r.name)).append("\"}");
        }
        sb.append(']');
        return sb.toString();
    }

    static String itemToJson(ItemRecord r) {
        return "{\"id\":" + r.id + ",\"name\":\"" + escape(r.name) + "\"}";
    }

    static String err(String message) {
        return "{\"error\":\"" + escape(message) + "\"}";
    }

    /** Very small parser for {"name":"..."} bodies — good enough for the exercise. */
    static String parseNameField(String body) {
        Pattern p = Pattern.compile("\"name\"\\s*:\\s*\"([^\"]*)\"");
        Matcher m = p.matcher(body);
        if (!m.find()) {
            throw new IllegalArgumentException("expected JSON name field");
        }
        String name = m.group(1).trim();
        if (name.isEmpty()) {
            throw new IllegalArgumentException("name must not be empty");
        }
        return name;
    }
}

public final class ItemsApi {
    private static void sendJson(HttpExchange ex, int status, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().set("Content-Type", "application/json; charset=utf-8");
        ex.sendResponseHeaders(status, bytes.length);
        try (OutputStream os = ex.getResponseBody()) {
            os.write(bytes);
        }
    }

    private static String readBody(HttpExchange ex) throws IOException {
        try (InputStream in = ex.getRequestBody()) {
            return new String(in.readAllBytes(), StandardCharsets.UTF_8);
        }
    }

    public static void main(String[] args) throws Exception {
        String url = System.getenv().getOrDefault("JDBC_URL", "jdbc:postgresql://localhost:5432/postgres");
        String user = System.getenv().getOrDefault("PGUSER", "postgres");
        String pass = System.getenv().getOrDefault("PGPASSWORD", "postgres");
        int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));

        ItemRepository repo = new ItemRepository(url, user, pass);

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext(
                "/api/items",
                new HttpHandler() {
                    @Override
                    public void handle(HttpExchange exchange) throws IOException {
                        try {
                            String method = exchange.getRequestMethod();
                            String path = exchange.getRequestURI().getPath();

                            if (!path.equals("/api/items")) {
                                sendJson(exchange, 404, TinyJson.err("not found"));
                                return;
                            }

                            if ("GET".equalsIgnoreCase(method)) {
                                List<ItemRecord> rows = repo.findAll();
                                sendJson(exchange, 200, TinyJson.itemsToJson(rows));
                                return;
                            }

                            if ("POST".equalsIgnoreCase(method)) {
                                String body = readBody(exchange);
                                String name = TinyJson.parseNameField(body);
                                ItemRecord saved = repo.insert(name);
                                sendJson(exchange, 201, TinyJson.itemToJson(saved));
                                return;
                            }

                            sendJson(exchange, 405, TinyJson.err("method not allowed"));
                        } catch (IllegalArgumentException bad) {
                            sendJson(exchange, 400, TinyJson.err(bad.getMessage()));
                        } catch (SQLException sql) {
                            sendJson(exchange, 500, TinyJson.err(sql.getMessage()));
                        }
                    }
                });

        server.setExecutor(null);
        server.start();
        System.out.println("Listening on http://localhost:" + port + "/api/items");
    }
}
```

---

## 7. Compile and run (classpath includes the driver)

```bash
javac ItemsApi.java
JDBC_URL='jdbc:postgresql://127.0.0.1:5432/mydb' PGUSER='me' PGPASSWORD='secret' PORT='8080' \
  java -cp '.:postgresql.jar' ItemsApi
```

Then try:

```bash
curl -s http://localhost:8080/api/items
curl -s -X POST http://localhost:8080/api/items \
  -H 'Content-Type: application/json' \
  -d '{"name":"notebook"}'
```

---

## 8. How this maps to earlier chapters

- **`ItemRepository`** — **encapsulation**: callers do not build SQL strings.
- **`try (Connection …)`** — **cleanup** like **`finally`** (Chapter 49) but automatic.
- **`ArrayList<ItemRecord>`** — **collections** you practiced in Part 8.
- **`IllegalArgumentException` / `SQLException`** — **exceptions** (Chapters 47–53): translate to **HTTP status codes** at the boundary.
- **`StringBuilder`** — Chapter 25 habits for assembling **JSON** without allocating a forest of tiny strings in a loop.

---

## 9. Common mistakes

**Forgetting the JDBC JAR on `-cp`** — you get **`ClassNotFoundException: org.postgresql.Driver`**.

**Running against the wrong database** — double-check **`JDBC_URL`**.

**Parsing JSON by hand in production** — fine for **learning**; later chapters introduce safer tooling.

---

## 10. Small practice tasks

1. Add **`DELETE /api/items/{id}`** with **`exchange.getRequestURI().getPath()`** parsing—return **`204`** on success.
2. Return **`Location`** header on **`POST`** with **`/api/items/{id}`** (Chapter 30 return values, Chapter 7 string ideas).

---

## Beginner tip

When something fails, read the **first line** of the stack trace, then look at **`SQLException.getMessage()`**—PostgreSQL error text is usually honest about **missing tables**, **bad passwords**, or **refused connections**.
