---
title: "Repository layer with Spring Data JPA"
description: "Use JpaRepository for CRUD and derived queries, and when to drop down to @Query or custom implementations."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Spring Data JPA
  - Repository
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 11
---

# Repository layer with Spring Data JPA

**Introduction**

**Spring Data JPA** can **implement** an **interface** that extends `JpaRepository` at **runtime** (JDK proxy or subclass). You get `save`, `findById`, `findAll`, **delete** without **writing** implementation classes. This is the **repository** layer: **persistence** only, no HTTP.

**Real-world explanation**

- **`JpaRepository<T, ID>`** — T is the **entity**, ID is the **id** type
- **Derived query methods** — `findByName(String name)` is parsed to a **WHERE** clause
- **`Optional`** as return for **one** result—matches **0 or 1** without null checks
- Heavier queries use **`@Query`** (JPQL or native) or **`EntityManager`** in a custom impl

**Step-by-step: repository for `Item`**

`com.example.demoservice.repository.ItemRepository`

```java
package com.example.demoservice.repository;

import com.example.demoservice.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {

  Optional<Item> findByName(String name);

  boolean existsByName(String name);
}
```

**Service will call**

```java
// inside a @Service, injected via constructor
private final ItemRepository itemRepository;

public Item createIfAbsent(String name) {
  if (itemRepository.existsByName(name)) {
    throw new IllegalStateException("already exists");
  }
  return itemRepository.save(new Item(name));
}
```

(We will move **exceptions** to **global** handler in a later post.)

**Common mistakes**

- **Putting** `@Service` on the **repository** interface—only **extend** the Spring Data **marker**; Spring Data creates the **bean** itself
- **Wrong** `ID` type (`int` vs `Integer` vs `Long`); JPA `GenerationType.IDENTITY` usually **Long**
- **Transactions**: **read** methods in simple paths work without `readOnly` but for **larger** reads, `@Transactional(readOnly = true)` on the **service** is better

**Best practices**

- **Query** in **service**-appropriate terms; **keep** the repository as **dumb** data access; **or** a **thin** query layer if the team allows **complex** `@Query` here
- **Indexes**: if you `findByName` a lot, add a **DB index** on the column; JPA is not a substitute for **index** design
- **Pagination**: use **`Pageable`** in repository methods (article 18) instead of `findAll()` on large tables

**Final summary**

**Repositories** extend `JpaRepository` and expose **persistence** operations. **Services** call them and **orchestrate** work. The next article is the **service** layer: **where** transactions and **use cases** live.
