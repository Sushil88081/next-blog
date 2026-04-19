---
title: "Chapter 114: HTTP Methods in Java — GET POST PUT PATCH DELETE, Safety, and Idempotency"
description: "Map HTTP methods to intent: safe GET and HEAD, idempotent PUT and DELETE, POST for creation and actions, OPTIONS for discovery, and set methods correctly on java.net.http.HttpRequest."
category: "Java"
tags:
  - Java HTTP methods
  - Java HttpRequest GET POST
  - HTTP idempotent PUT DELETE
  - HTTP safe methods GET
  - Java HttpClient method
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 114
---

# Chapter 114: HTTP Methods in Java

**HTTP methods** (verbs) tell **intermediaries** and **clients** what **kind** of action you intend. **`java.net.http.HttpRequest`** exposes **`.GET()`**, **`.POST(BodyPublisher)`**, **`.PUT`**, **`.DELETE`**, and a **generic** **`.method(name, publisher)`** for **`PATCH`** and **custom** verbs.

---

## 1. Topic title

**Methods: vocabulary for intent—GET reads, POST submits, PUT replaces, DELETE removes**

---

## 2. What it means

**Safe methods** — **`GET`**, **`HEAD`**, **`OPTIONS`** should not **change server state** in **ways** that matter—**caches** assume this.

**Idempotent methods** — **`PUT`**, **`DELETE`**, **`GET`**, **`HEAD`** **should** leave the **system** in the **same end state** if **repeated** (network **retries**).

**`POST`** — **creates** resources or **triggers** **non-idempotent** **work**—**duplicate POST** may create **two** rows—**design** **dedup** tokens when needed.

**`PATCH`** — **partial** update—**support** varies; some APIs **use POST** for **partial** updates for **simplicity**.

---

## 3. Why it is used

**CDNs and browser caches** rely on **correct GET** usage.

**Clients auto-retry** **idempotent** calls after **timeouts**—wrong verb choice **duplicates** **payments**.

---

## 4. Mental sketch

**GET** is **looking** at a **museum exhibit** behind **glass**. **POST** is **dropping a coin** into a **donation** box—**each drop** is a **new** event. **PUT** is **replacing the whole painting** in the **frame**. **PATCH** is **touching up** one **corner**.

---

## 5. Java code example

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class HttpMethodsDemo {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();

        HttpRequest get = HttpRequest.newBuilder(URI.create("https://httpbin.org/get")).GET().build();
        System.out.println("GET -> " + client.send(get, HttpResponse.BodyHandlers.ofString()).statusCode());

        String json = "{\"name\":\"ada\"}";
        HttpRequest post = HttpRequest.newBuilder(URI.create("https://httpbin.org/post"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json, StandardCharsets.UTF_8))
                .build();
        System.out.println("POST -> " + client.send(post, HttpResponse.BodyHandlers.ofString()).statusCode());

        HttpRequest del = HttpRequest.newBuilder(URI.create("https://httpbin.org/delete")).DELETE().build();
        System.out.println("DELETE -> " + client.send(del, HttpResponse.BodyHandlers.ofString()).statusCode());
    }
}
```

**`httpbin`** echoes **payloads**—use it to **see** **headers** and **bodies** your client **sent**.

---

## 6. Explanation of code

**`BodyPublishers.ofString`** streams **UTF-8** text—match **`Content-Type`** to **actual** bytes (**JSON** is **text** with a **convention**).

---

## 7. Common mistakes

**Side-effecting GET** — **breaks** **prefetch**, **crawler**, and **human** **expectations**.

**PUT without full body** when your **contract** says **“replace entire resource”**—clients **wipe** **unspecified** fields **accidentally**.

---

## 8. Best practices

Document which **operations** are **idempotent** and how **retries** should behave.

Prefer **`HEAD`** when you only need **headers** (**length**, **`ETag`**) without **body** cost.

---

## 9. Small practice task

Send **`OPTIONS`** to **`https://httpbin.org/get`** with **`.method("OPTIONS", HttpRequest.BodyPublishers.noBody())`**—print **`Allow`** (if present) from **response headers**.

---

## Beginner tip

If **corporate proxies** block **`httpbin`**, run the **same** calls against **`localhost`** once Chapter 117’s **tiny server** is up.
