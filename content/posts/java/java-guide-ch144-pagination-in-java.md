---
title: "Chapter 144: Pagination in Java — Offset vs Keyset, Pageable, and Stable Sort Keys"
description: "Paginate data in Java APIs: LIMIT OFFSET trade-offs, keyset pagination for large datasets, Spring Data Pageable, total count costs, and cursor encoding for mobile feeds."
category: "Java"
tags:
  - Java pagination REST API
  - Java keyset pagination
  - Java Spring Pageable
  - Java offset pagination problems
  - Java cursor API pagination
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 144
---

# Chapter 144: Pagination in Java

**Pagination** splits **large** **result sets** into **pages** so **HTTP** **responses** stay **fast** and **bounded**. **Offset** pagination (**`?page=3&size=20`**) is **easy** but **degrades** on **deep** pages; **keyset** (**seek**) pagination uses **`WHERE id > ? ORDER BY id LIMIT ?`** and a **cursor**—**stable** under **concurrent** **inserts** when **keys** are **monotonic**.

---

## 1. Topic title

**Pagination: cap response size; choose offset or keyset based on data churn and depth**

---

## 2. What it means

**`Page<T>`** in **Spring Data** wraps **content**, **totalElements**, **number**, **size**—**`count(*)`** **queries** **cost** **money** on **big** **tables**.

**Keyset** needs a **unique** **sort** **key**—**composite** **cursors** when **sorting** by **non-unique** **columns** (**tie-breaker** **`id`**).

**Opaque cursors** (**Base64** JSON) **hide** **internal** **ids** if **needed**.

---

## 3. Why it is used

**Mobile** **feeds** and **admin** **tables** **both** **need** **predictable** **latency**.

**Database** **planners** **prefer** **range** **scans** over **large** **offsets**.

---

## 4. Mental sketch

**Offset** pagination is **flipping** to **page 400** of a **magazine** while **someone** **reorders** **pages**—**you** **skip** **wrong**. **Keyset** is **“start after this bookmark”**—**robust** when **the** **book** **grows**.

---

## 5. Java code example

```java
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

/** Illustrative service API — repository returns Page<ItemEntity>. */
public final class PageSketch {
    private PageSketch() {
    }

    public static Pageable firstPage(int size) {
        return PageRequest.of(0, Math.min(size, 100));
    }
}
```

**Clamp** **`size`** **server-side**—**clients** **lie**.

---

## 6. Explanation of code

**`PageRequest.of(page, size)`** is **zero-based** **page** **index**—**document** that for **frontend** **teams**.

---

## 7. Common mistakes

**Unbounded `size=999999`**—**OOM** **or** **timeouts**.

**Sorting** **without** **stable** **tie-breaker**—**duplicate/missing** **rows** **across** **pages**.

---

## 8. Best practices

Return **`Link` headers** (**RFC 8288**) for **`next`/`prev`** when **easy**—**clients** **follow** **URLs** you **control**.

**Keyset** for **infinite** **scroll**; **offset** for **jump** **to page** **UIs** **with** **full** **counts** **when** **acceptable**.

---

## 9. Small practice task

Implement **`GET /items?afterId=42&limit=20`** with **repository** **query** **`findByIdGreaterThanOrderById`**—**compare** **explain** **plans** vs **`OFFSET 10000`**.

---

## Beginner tip

**“Total pages” UI** **forces** **`COUNT(*)`**—if **that** **query** **times out**, **switch** **UX** to **“has next”** **only**.
