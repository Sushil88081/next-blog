---
title: "Chapter 145: Rate Limiting in Java — Token Buckets, Gateways, and Fairness"
description: "Protect Java APIs with rate limiting: why limits exist, per-IP and per-API-key strategies, token bucket intuition, Redis-backed limits at scale, and gateway vs application enforcement."
category: "Java"
tags:
  - Java rate limiting API
  - Java token bucket rate limit
  - Java Redis rate limit
  - Spring Boot rate limiter
  - API gateway rate limiting
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 145
---

# Chapter 145: Rate Limiting in Java

**Rate limiting** caps **how many requests** a **caller** may make in a **window**—**protecting** **CPU**, **database**, and **neighbors** from **abuse** or **accidental** **retry storms**. Limits can live at the **edge** (**API gateway**, **CDN**) or **inside** the **JVM** (**filters**, **Bucket4j**, **Resilience4j**).

---

## 1. Topic title

**Rate limiting: fair share of capacity; communicate limits with 429 and Retry-After**

---

## 2. What it means

**Identities** for **limits** — **API key**, **user id**, **IP** (weak behind **NATs**), **tenant** **header**.

**Algorithms** — **token bucket** (**burst** friendly), **leaky bucket** (**smoother**), **fixed window** (**simple**, **boundary** spikes).

**`429 Too Many Requests`** + **`Retry-After`** header—**clients** **back off** **politely**.

---

## 3. Why it is used

**Cost control** on **expensive** **endpoints** (**reports**, **exports**).

**Brute-force** **slowdown** on **login** (**pair** with **account lockout** policies).

---

## 4. Mental sketch

**No rate limit** is a **cafeteria** with **one** **cashier** and **no** **queue** **rope**—**polite** and **rude** **customers** **collide**. **Limits** are **stanchions** and **“take a number”** **slips**.

---

## 5. Java code example

```java
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

/** Tiny in-memory counter — use Redis or gateway for clusters. */
public final class LocalFixedWindow {
    private final int max;
    private final AtomicInteger count = new AtomicInteger();
    private final AtomicLong windowStart = new AtomicLong(System.currentTimeMillis());
    private final long windowMillis;

    public LocalFixedWindow(int maxPerWindow, long windowMillis) {
        this.max = maxPerWindow;
        this.windowMillis = windowMillis;
    }

    public boolean tryAcquire() {
        long now = System.currentTimeMillis();
        long start = windowStart.get();
        if (now - start > windowMillis) {
            windowStart.compareAndSet(start, now);
            count.set(0);
        }
        return count.incrementAndGet() <= max;
    }
}
```

**Per-key** maps of **such** **counters** approximate **prod** **patterns** in **tests** only.

---

## 6. Explanation of code

**Distributed** **limits** need **atomic** **INCR** + **TTL** in **Redis** or **dedicated** **service**—**local** **counters** **lie** across **pods**.

---

## 7. Common mistakes

**Rate limiting authenticated users by IP only**—**mobile** **carriers** **share** **IPs**.

**Returning `503` for limit**—**use** **`429`** so **clients** **distinguish** **overload** from **outage**.

---

## 8. Best practices

**Whitelist** **health checks** and **internal** **mesh** **traffic**.

**Expose** **remaining quota** headers (**`X-RateLimit-Remaining`**) when **product** **wants** **transparency**.

---

## 9. Small practice task

Wrap **`tryAcquire()`** in a **Servlet filter** returning **`429`** JSON when **false**—**log** **client id**.

---

## Beginner tip

**Client-side** **rate limits** are **courtesy** only—**assume** **malicious** **traffic** hits **your** **server**.
