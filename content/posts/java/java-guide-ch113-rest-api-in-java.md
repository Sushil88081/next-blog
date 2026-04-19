---
title: "Chapter 113: REST API in Java — Resources, HTTP Verbs, Statelessness, and Pragmatic REST"
description: "Understand REST-style HTTP APIs: resources and representations, stateless requests, common verb usage, HATEOAS as optional richness, and how Java services expose REST without frameworks first."
category: "Java"
tags:
  - Java REST API basics
  - REST principles HTTP
  - Java REST resource design
  - REST stateless API
  - Java REST without Spring
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 113
---

# Chapter 113: REST API in Java

**REST** (**RE**presentational **S**tate **T**ransfer) is an **architectural style** popularized with **HTTP**. In **practice**, “**REST API**” usually means **resource-oriented URLs**, **JSON bodies**, **stateless** requests, and **meaningful status codes**—not every service checks every **Fielding dissertation** constraint.

**Java** teams implement **REST** with **`HttpServer`**, **JAX-RS**, **Spring MVC**, **Micronaut**, and more—**concepts** here apply to **all** of them.

---

## 1. Topic title

**REST-style API: name things with URLs; move state with HTTP methods and representations**

---

## 2. What it means

**Resource** — a **thing** you address (**`/customers/7`**, **`/orders/12/line-items`**).

**Representation** — a **snapshot** of state at a moment—often **JSON**; could be **XML** or **binary** with **headers** describing **type**.

**Stateless server handling** — each request carries **enough context** (**auth token**, **ids**)—the **server** does not assume **prior** **TCP connection memory** beyond what **protocols** define (**sessions** still exist but should be **designed**, not **accidental**).

---

## 3. Why it is used

**Caching** and **proxies** understand **GET** semantics (Chapter 114).

**Uniform interface** — **verbs + URLs + status codes** are **teachable** and **toolable** (**curl**, **Postman**, **OpenAPI**).

---

## 4. Mental sketch

**REST** is **organized filing**: **drawer** (**resource collection**), **folder tab** (**id**), **sheet inside** (**representation**). You **do not** “**open drawer**” to **change** a **different** folder without **naming** which **folder**—URLs stay **explicit**.

---

## 5. Java code example

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class RestClientPeek {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest req = HttpRequest.newBuilder(URI.create("https://httpbin.org/get"))
                .GET()
                .header("Accept", "application/json")
                .build();
        HttpResponse<String> res = client.send(req, HttpResponse.BodyHandlers.ofString());
        System.out.println("status=" + res.statusCode());
        System.out.println(res.body().substring(0, Math.min(200, res.body().length())));
    }
}
```

**`httpbin`** is a **public test origin**—fine for **learning**; **do not** send **secrets** there.

---

## 6. Explanation of code

**`HttpClient`** (Java 11+) is a **native REST client**—**URI**, **verb**, **headers**, **body handlers** map directly to **HTTP** concepts you will **mirror** on the **server** side in Chapter 117.

---

## 7. Common mistakes

**RPC-over-GET** — **`GET /deleteOrder?id=3`** breaks **caching** and **safety**; use **`DELETE /orders/3`**.

**Tunnelling everything through POST** — sometimes **OK** for **batch** **graphql-style** gateways, but **default** to **verb-appropriate** **REST** unless **constraints** say otherwise.

---

## 8. Best practices

Plural **collection** names (**`/orders`**) with **singular reads** via **id** path segment.

Return **`201 Created`** with **`Location`** on **successful POST** when you mint a **new** resource (Chapter 115).

---

## 9. Small practice task

Sketch **URLs** (no code) for **library** checkout: **books**, **loans**, **members**—decide which are **sub-resources** of which.

---

## Beginner tip

**“REST vs RESTful”** debates are **noise** at **junior** level—**aim** for **clear resources**, **correct verbs**, **honest status codes**, and **predictable JSON**; refine **theory** after **shipping** once.
