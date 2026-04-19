---
title: "Chapter 124: DTO in Java — API Shapes, Records, Mapping from Entities, and Versioning"
description: "Use DTOs in Spring Boot: separate HTTP JSON from JPA entities, prefer records for immutable API models, map in the service layer, and evolve APIs without leaking database columns."
category: "Java"
tags:
  - Java DTO Spring Boot
  - Java record API model
  - Java DTO vs entity
  - Spring Boot request response DTO
  - Java map entity to DTO
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 124
---

# Chapter 124: DTO in Java

**DTO** (**Data Transfer Object**) is a **purpose-built type** for **crossing a boundary**—HTTP **JSON**, **message queue** payloads, or **batch export** rows. It **should not** carry **Hibernate proxies** or **lazy-loading** **baggage** your **clients** never **asked** for.

**Java `record`** types are a **natural** fit for **immutable** **read models** and **small** **request bodies**.

---

## 1. Topic title

**DTO: contract-first payload; map early, serialize predictably, version consciously**

---

## 2. What it means

**Request DTO** — what **`@RequestBody`** **deserializes** into—**validation annotations** land here (Chapter 126).

**Response DTO** — what **`@RestController`** **returns**—**hide** **internal ids**, **embed** **computed** fields (**`displayName`**), **omit** **secrets**.

**Mapping** — **`ItemEntity` → `ItemResponse`** inside **`ItemService`** (or a **dedicated mapper** class) keeps **controllers** dumb.

---

## 3. Why it is used

**Decouple** **database refactors** from **mobile apps** still on **old JSON**.

**Security** — **no accidental** serialization of **password hashes** or **internal** **flags**.

---

## 4. Mental sketch

**Entity** is the **kitchen prep table**—**messy**, **hot**, **staff-only**. **DTO** is the **plate** that **leaves** the **swing door**—**only** what the **guest** should **see**.

---

## 5. Java code example

```java
public record CreateItemRequest(String name, String note) {
}

public record ItemResponse(long id, String name) {
}

public final class ItemMapper {
    private ItemMapper() {
    }

    public static ItemResponse toResponse(ItemEntity entity) {
        return new ItemResponse(entity.getId(), entity.getName());
    }
}
```

**`note`** might exist on **entity** but stay **absent** from **`ItemResponse`** if **clients** do not **need** it yet—**explicit** omission is a **feature**.

---

## 6. Explanation of code

**Records** give **`equals`/`hashCode`/`toString`** for **free**—great for **DTOs**; **entities** often stay **classes** for **mutability** and **JPA** **callbacks**.

---

## 7. Common mistakes

**One mega-DTO** reused for **create**, **update**, **admin**, and **public** views—**split** types when **fields** diverge.

**Entity graphs as JSON**—**serialization** **annotations** on **entities** become **coupling** **tar**.

---

## 8. Best practices

Name **types** after **role** (**`PublicItemResponse`**, **`AdminItemDetail`**), not only **`ItemDto`**.

When **API v2** ships, **new package** or **suffix** types rather than **overloading** **`ItemResponse`** **semantics**.

---

## 9. Small practice task

Add **`ItemAdminResponse`** including **`note`** and map it **only** in an **admin** controller—keep **`ItemResponse`** **lean** for **public** **`GET`**.

---

## Beginner tip

**MapStruct** and **manual mappers** both **work**—start **manual** until **boilerplate** **hurts**, then **automate** with **compile-time** **codegen**.
