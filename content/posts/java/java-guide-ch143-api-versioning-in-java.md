---
title: "Chapter 143: API Versioning in Java — URL Path, Headers, Content Negotiation, and Deprecation"
description: "Version public Java HTTP APIs: path prefixes like /v1, Accept header negotiation, compatibility rules, deprecation headers, and coordinating clients, docs, and release trains."
category: "Java"
tags:
  - Java API versioning
  - Java REST API v1 v2
  - Java Accept header versioning
  - Spring Boot API version path
  - Java API deprecation Sunset
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 143
---

# Chapter 143: API Versioning in Java

**API versioning** lets you **ship breaking changes** without **silently** **breaking** **existing** **clients**. **Common** patterns: **path** prefix (**`/v1/users`**), **header** (**`API-Version: 2`**), or **`Accept`** **vendor MIME**—**pick one** **per** **ecosystem** and **document** it in **OpenAPI** (Chapter 146).

---

## 1. Topic title

**Versioning: advertise contract generation; migrate clients on a published schedule**

---

## 2. What it means

**Path versioning** — **simple** for **caching** and **routers**; **URLs** **encode** **generation** **explicitly**.

**Header versioning** — **cleaner** **URLs** but **easy** for **clients** to **forget**—**defaults** **matter**.

**Deprecation** — **`Sunset`** header (RFC 8594), **`Deprecation`** header, **changelog** dates—**kindness** to **integrators**.

---

## 3. Why it is used

**Mobile apps** lag **server** deploys by **weeks**—**they** **need** **stable** **`v1`**.

**B2B partners** negotiate **SLAs** on **specific** **major** **lines**.

---

## 4. Mental sketch

**Unversioned public APIs** are **shared drive** **folders**—**rename** a **file** and **someone’s** **link** **dies**. **Versions** are **dated** **snapshots** **clients** can **pin**.

---

## 5. Java code example

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/hello")
public class HelloV1Controller {
    @GetMapping
    public String hello() {
        return "v1";
    }
}
```

**Parallel** **`/v2/hello`** **controllers** let **teams** **delete** **old** code when **metrics** show **zero** **`v1`** **traffic**.

---

## 6. Explanation of code

**Spring** has **no single** **blessed** **version** **switch**—**routing** is **yours**; **gateways** (**Kong**, **Envoy**) can **strip** **prefixes** **too**.

---

## 7. Common mistakes

**Micro-version in URL** (**`/v1.3.2`**) churn—**majors** **carry** **meaning**; **patch** **fixes** stay **compatible**.

**Breaking JSON** **without** **bump**—**clients** **parse** **old** **shapes** **forever** unless **you** **signal** **change**.

---

## 8. Best practices

**Publish** **support matrix**: **which** **versions** get **security** **fixes** **only**.

**Integration tests** per **supported** **major**—**CI** **matrix** **prevents** **accidental** **`v2`** **only** **coverage**.

---

## 9. Small practice task

Add **`/v2/hello`** returning **`{"version":2}`** and **document** **both** paths in a **single** **OpenAPI** **spec** with **servers** or **tags**.

---

## Beginner tip

**Internal** **service-to-service** APIs can **sometimes** **co-deploy** **without** **URL** **versions**—**still** **version** **schemas** in **contracts** (**protobuf**, **JSON schema**).
