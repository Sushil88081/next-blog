---
title: "Chapter 112: What is API? in Java — Contracts, Boundaries, and Why Network APIs Matter"
description: "Learn what an API is: a contract between producer and consumer, in-process libraries versus HTTP APIs, resources and operations, and how Java code on both sides relies on stable shapes."
category: "Java"
tags:
  - Java API basics
  - what is an API
  - Java HTTP API introduction
  - Java client server contract
  - Java library vs web API
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 112
---

# Chapter 112: What is API? in Java

An **API** (**Application Programming Interface**) is a **contract**: **names**, **inputs**, **outputs**, and **rules** you can rely on without re-reading the **whole implementation** every time. In **Java**, **`List.add(E)`** is an **in-process API**; **`GET /orders/42`** is a **network API**—same **idea**, different **transport**.

This part of the series connects **HTTP** vocabulary to **Java** clients and tiny **servers** you will build in Chapter 117 (and you already glimpsed in Chapter 65).

---

## 1. Topic title

**API: the published surface—what callers may depend on—separate from private internals**

---

## 2. What it means

**Library API** — **classes and methods** in a **JAR**; **binary compatibility** and **semantic versioning** (**`1.x`** vs **`2.0`**) matter.

**Web / HTTP API** — **URLs**, **methods**, **headers**, **status codes**, and **body formats** (often **JSON**); **documentation** (OpenAPI) replaces **Javadoc** for **remote** consumers.

**Breaking change** — anything that makes **existing correct clients** **fail** without updates—**renaming** fields, **removing** endpoints, **changing** error shapes without **versioning**.

---

## 3. Why it is used

**Teams split** — **mobile**, **web**, and **partner** integrations consume the **same** **HTTP API** from different **codebases**.

**Evolution** — **clear contracts** let you **refactor internals** while **honoring** the **published** shape.

---

## 4. Mental sketch

An API is the **menu** in a restaurant: **patrons** order by **dish name**; the **kitchen** may **change recipes** as long as **plates** still match the **menu promise**. **Peeking into the kitchen** is **coupling**—**avoid** it across **service boundaries**.

---

## 5. Java code example

```java
/** In-process API: callers depend on method name + types, not on how we store data. */
public interface OrderLookup {
    String describe(long orderId);
}

public final class StubOrders implements OrderLookup {
    @Override
    public String describe(long orderId) {
        return "order " + orderId + " (stub)";
    }

    public static void main(String[] args) {
        OrderLookup api = new StubOrders();
        System.out.println(api.describe(42));
    }
}
```

The **`OrderLookup`** type **is** the **contract**—later, a **class** could call **HTTP** **instead** of **stubs** while **keeping** the **interface** for **tests**.

---

## 6. Explanation of code

**Interfaces** in **Java** model **local** APIs cleanly; **HTTP** APIs are often described with **OpenAPI** YAML—**conceptually** the same **separation** of **what** from **how**.

---

## 7. Common mistakes

**“We have no API, just code”** — every **public** endpoint **is** an API, **documented** or **not**; mystery **URLs** **rot** faster.

**Leaking database keys** as the **only** identifier story—sometimes fine, sometimes you want **opaque** **public ids**—decide **explicitly**.

---

## 8. Best practices

Name **resources** after **nouns** (**`/customers`**, **`/orders/{id}`**) and keep **verbs** in **HTTP methods** (Chapter 114).

Publish **error format** once—**stable JSON** keys help **clients** branch reliably.

---

## 9. Small practice task

List **three** **HTTP endpoints** you use daily (**search**, **maps**, **payments**); for each, note **URL pattern**, **method**, and **whether** responses are **JSON**.

---

## Beginner tip

When reading **vendor Java SDKs**, the **SDK’s public methods** are **wrappers** around **HTTP APIs**—if **SDK** feels **heavy**, **`HttpClient`** + **JSON** (Chapters 116–117) is often **enough**.
