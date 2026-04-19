---
title: "Chapter 117: Building API with Java — HttpServer, Handlers, JSON Responses, and Thread Model"
description: "Build a minimal HTTP API with JDK com.sun.net.httpserver.HttpServer: contexts, HttpHandler, response codes, JSON bodies, and notes on threading limits before Spring Boot in the series."
category: "Java"
tags:
  - Java HttpServer API
  - Java build REST API JDK
  - Java HttpHandler JSON
  - Java embedded HTTP server
  - Java API without framework
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 117
---

# Chapter 117: Building API with Java

You can serve **HTTP** from **plain Java** using **`com.sun.net.httpserver.HttpServer`**—**not** an **EE container**, but **enough** to **learn** **routing**, **status codes**, and **JSON responses** before **Spring Boot** (Part 15). Chapter 65 built a **larger** example with **JDBC**; here the **focus** is the **HTTP shell**.

**`HttpServer`** is **fine for demos**; **production** services usually sit behind **reverse proxies** and use **frameworks** or **containers** with **richer** **filters** and **metrics**.

---

## 1. Topic title

**HttpServer: map paths to HttpHandler, write status, headers, body bytes, close exchange**

---

## 2. What it means

**`HttpServer.create(InetSocketAddress(port), backlog)`** binds a **listener**.

**`createContext("/path", handler)`** registers a **prefix** match—**longer** paths may need **manual** **dispatch** inside **one** handler or **multiple** contexts.

**`HttpExchange`** gives **request method**, **headers**, **query string**, **body stream**, and **`sendResponseHeaders(code, length)`** before **`getResponseBody()`**.

---

## 3. Why it is used

**Spike APIs** without **Gradle** **wizardry**.

**Teach** **HTTP** **mechanics** **unobscured** by **annotations**.

---

## 4. Mental sketch

**`HttpServer`** is a **food stall** with **one short counter**—fine for **classroom** **traffic**; **Spring** is the **airport terminal** with **baggage**, **security**, and **signage**.

---

## 5. Java code example

```java
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class TinyApi {
    static void json(HttpExchange ex, int code, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        ex.getResponseHeaders().add("Content-Type", "application/json; charset=utf-8");
        ex.sendResponseHeaders(code, bytes.length);
        try (OutputStream os = ex.getResponseBody()) {
            os.write(bytes);
        }
    }

    static class HealthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange ex) throws IOException {
            if (!"GET".equalsIgnoreCase(ex.getRequestMethod())) {
                json(ex, 405, "{\"error\":\"method not allowed\"}");
                return;
            }
            json(ex, 200, "{\"status\":\"ok\"}");
        }
    }

    static class EchoHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange ex) throws IOException {
            if (!"GET".equalsIgnoreCase(ex.getRequestMethod())) {
                json(ex, 405, "{\"error\":\"method not allowed\"}");
                return;
            }
            String q = ex.getRequestURI().getQuery() == null ? "" : ex.getRequestURI().getQuery();
            json(ex, 200, "{\"query\":\"" + q.replace("\\", "\\\\").replace("\"", "\\\"") + "\"}");
        }
    }

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/health", new HealthHandler());
        server.createContext("/echo", new EchoHandler());
        server.setExecutor(null); // default executor: new thread per request — OK for learning only
        server.start();
        System.out.println("http://localhost:8080/health");
    }
}
```

**`setExecutor(null)`** uses a **built-in** **thread-per-request** model—**simple** but **not** **throughput-tuned**.

---

## 6. Explanation of code

**`sendResponseHeaders`** must run **exactly once** before **body** writes; **`-1`** means **chunked** mode—**omit** here for **fixed** **JSON** size.

**Echo** **query** still needs **real** **JSON encoding** for **arbitrary** input—this demo is **minimal**, not **hardened**.

---

## 7. Common mistakes

**Forgetting `close()` on streams**—**leaks** **sockets**; **`try-with-resources`** on **`InputStream`** for **request bodies** when reading **POST JSON**.

**Blocking JDBC on the default executor**—few **threads** → **head-of-line blocking**; use **`Executors`** with a **bounded** pool for **mixed** workloads.

---

## 8. Best practices

Put **shared JSON helpers** in **`private static`** methods; **factor** **routing** when **more than** a **handful** of paths.

Terminate with **`server.stop(delay)`** in **shutdown hooks** when embedding in **long-running** **CLI** tools.

---

## 9. Small practice task

Add **`POST /items`** that reads **JSON** body text into a **`String`** and responds **`201`** with **`{"received\":true}`**—**wire** **JDBC** **`ItemRepository`** from Chapter 110 when you are ready for **persistence**.

---

## Beginner tip

**`com.sun.net.httpserver`** lives in the **`jdk.httpserver` module** (Java 9+)—**IDE** module paths sometimes **hide** it; **add** the **module** or **run** on **classpath** **configs** your **tooling** documents.
