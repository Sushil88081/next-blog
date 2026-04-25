---
title: "Pagination and sorting in Spring Data REST lists"
description: "Use Pageable, Page, and sort parameters so list endpoints stay fast and predictable as tables grow."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Spring Data
  - Pagination
  - REST
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 18
---

# Pagination and sorting in Spring Data REST lists

**Introduction**

A **`GET /items`** that returns every row will **time out** once the table is large. **Spring Data** understands **`Pageable`**: the client sends **page** and **size** (and optionally **sort**), and the database returns only one **page** of rows. You respond with **metadata** (total count, has next page) so the UI can show **pagers**.

**Real-world explanation**

- **Default** limits: cap **`size`** on the **server** so a client cannot ask for a million rows
- **Sort** field **allowlist** — **never** pass a raw **String** to **SQL** **sort** from the client without **validation** (injection and odd column names)
- **Offset** **pagination** is simple; **keyset** **(cursor)** pagination is better for **very** **wide** **tables** with **frequent** **inserts** (advanced)

**Step-by-step: repository**

`ItemRepository` already extends `JpaRepository`. `findAll(Pageable p)` is **inherited** — you do not need a **custom** **method** for **all** **items** **paged**.

**Service**

```java
import org.springframework.data.domain.*;
import org.springframework.data.domain.Page;

public Page<Item> list(int page, int size, String sort) {
  int p = Math.max(0, page);
  int s = Math.min(100, Math.max(1, size)); // cap 1..100, Java 17–friendly
  var sortBy = "name";
  if ("id".equalsIgnoreCase(sort)) {
    sortBy = "id";
  }
  Pageable pr = PageRequest.of(p, s, Sort.by(sortBy).ascending());
  return itemRepository.findAll(pr);
}
```

**Controller**

```java
@GetMapping
public PageResponse<ItemResponse> all(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "name") String sort
) {
  return PageResponse.from(
      itemService.list(page, size, sort)
          .map(ItemResponse::from)
  );
}
```

**`PageResponse` record (simplified; map from Spring’s `Page`)**

```java
import org.springframework.data.domain.Page;

public record PageResponse<T>(
    java.util.List<T> content,
    int number,
    int size,
    long totalElements,
    int totalPages,
    boolean hasNext
) {
  public static <T> PageResponse<T> from(Page<T> p) {
    return new PageResponse<>(
        p.getContent(),
        p.getNumber(),
        p.getSize(),
        p.getTotalElements(),
        p.getTotalPages(),
        p.hasNext()
    );
  }
}
```

**Folder structure**

- Keep **pagination** **params** in **one** place (constant **max** **size**)

**Common mistakes**

- **Unbounded** `size` from **query** **param**
- **Exposing** internal **column** names in **sort** and letting users sort by **heavy** **join** fields without **indexes**
- Forgetting that **page** is **0-based** in Spring Data; **UIs** often use **1-based** — **document** or **translate**

**Best practices**

- **Index** the **columns** you **sort** on most (PostgreSQL: `EXPLAIN` on the **query**)
- Add **`Cache-Control`** or **ETag** for **rarely** **changing** **read** **lists** only if your **architecture** **needs** it
- For **search** with **filters** plus **paging**, use **Specification** or a **@Query** **with** **parameters**

**Final summary**

**`Pageable`** + **`Page<>`** = **scales** your **list** **APIs**. **Cap** **size** and **control** **sort** **fields**. Next: **testing** the **API** in **Postman** (or similar).
