---
title: "Chapter 115: HTTP Status Codes in Java — 2xx 3xx 4xx 5xx and Mapping Them in Clients"
description: "Use HTTP status codes correctly: success 200 201 204, redirects 301 302, client errors 400 401 403 404 409 422, server errors 500 502 503, and branch on HttpResponse.statusCode in Java HttpClient."
category: "Java"
tags:
  - Java HTTP status codes
  - Java HttpResponse statusCode
  - HTTP 201 204 404 meaning
  - Java REST error handling
  - HTTP 500 vs 400
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 115
---

# Chapter 115: HTTP Status Codes in Java

**Status codes** are **three-digit** **signals** in the **HTTP response line**—**machines** branch on them faster than **parsing JSON**. **`HttpResponse.statusCode()`** in **Java** returns that **int**; **your client** should **treat ranges** **systematically**, not **only check 200**.

---

## 1. Topic title

**Status codes: coarse outcome classes—success, redirect, client fault, server fault**

---

## 2. What it means

**`2xx` Success** — **`200 OK`** generic success; **`201 Created`** resource **born** (often with **`Location`**); **`204 No Content`** success with **empty body** (**DELETE**, some **updates**).

**`3xx` Redirection** — **`301`/`302`/`307`/`308`** tell clients to **retry elsewhere**—**`HttpClient`** may **follow** automatically depending on **configuration**.

**`4xx` Client errors** — **`400`** bad syntax/validation; **`401`** **authenticate**; **`403`** **authenticated** but **forbidden**; **`404`** missing resource; **`409`** conflict; **`422`** semantic validation (common in **APIs**, not **RFC** core).

**`5xx` Server errors** — **`500`** generic server fault; **`502`** bad gateway; **`503`** unavailable—often **retryable** with **backoff**.

---

## 3. Why it is used

**Interoperability** — **generic middleware** logs and **alerts** on **5xx** spikes without **knowing your JSON**.

**Clear client logic** — **`404`** triggers **“show empty state”**, **`409`** triggers **“refresh conflict UI”**.

---

## 4. Mental sketch

Status codes are **traffic lights**: **`2xx` green**, **`4xx` you turned wrong** (recheck **GPS**), **`5xx` road closed** (try **again later** or **call ops**).

---

## 5. Java code example

```java
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class StatusBranchingDemo {
    public static void describe(HttpResponse<String> res) {
        int code = res.statusCode();
        if (code >= 200 && code < 300) {
            System.out.println("success bodyLen=" + res.body().length());
        } else if (code >= 400 && code < 500) {
            System.out.println("client problem " + code + ": " + res.body());
        } else if (code >= 500) {
            System.out.println("server problem " + code);
        } else {
            System.out.println("other " + code);
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest ok = HttpRequest.newBuilder(URI.create("https://httpbin.org/status/200")).GET().build();
        describe(client.send(ok, HttpResponse.BodyHandlers.ofString()));

        HttpRequest teapot = HttpRequest.newBuilder(URI.create("https://httpbin.org/status/418")).GET().build();
        describe(client.send(teapot, HttpResponse.BodyHandlers.ofString()));
    }
}
```

**`418 I'm a teapot`** is an **Easter egg**—but **still exercises** **branching** logic.

---

## 6. Explanation of code

**`HttpClient.send`** completes with an **`HttpResponse`** for **typical** **4xx/5xx** codes—**you** choose how to **handle** **`statusCode()`** (unless you opt into **handlers** that **throw** on error codes).

---

## 7. Common mistakes

**Returning `200` with `{error: true}`** for **all failures**—hides problems from **caches** and **generic** **tooling**.

**Overloading `404` vs `403`** to **hide existence**—sometimes **security**-motivated; **document** the **policy**.

---

## 8. Best practices

Include **stable `application/problem+json`** bodies (RFC 7807 style) for **`4xx`/`5xx`** when **teams** agree—still keep **correct** **status**.

Log **`statusCode` + request id** server-side; **never** log **full** **PII** bodies by default.

---

## 9. Small practice task

Call **`https://httpbin.org/status/500`** and implement **exponential backoff** **retry** **twice** before **giving up**.

---

## Beginner tip

**`401` + `WWW-Authenticate`** and **`403`** confuse beginners—**remember**: **`401`** = **“who are you?”**, **`403`** = **“I know you; you may not.”**
