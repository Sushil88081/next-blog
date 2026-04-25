---
title: "Entity layer in Spring Data JPA"
description: "Model database tables with JPA entities, ids, column mapping, and relationships—foundation for a REST service backed by PostgreSQL."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - JPA
  - Entity
  - Spring Boot
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 10
---

# Entity layer in Spring Data JPA

**Introduction**

In JPA, an **entity** is a Java class mapped to a **table** (or a view in advanced cases). Hibernate (the JPA provider Spring Boot uses by default) maps **object fields** to **SQL columns** and **generates** SQL for **CRUD**. This post creates a **first** entity for a **“items”** feature we will expose through **REST** later.

**Real-world explanation**

- **@Entity** — marks a **managed** class; **one** table per entity in the simple case
- **@Id** + **@GeneratedValue** — primary key, often `IDENTITY` (serial) in PostgreSQL
- **@Column** — optional; names and **constraints** if different from the default field name
- **equals/hashCode** — for **entity** with **ID**, be careful: many teams use only **id** in `equals` after **persist** to avoid subtle bugs; Lombok can help, or hand-write

**Step-by-step: one entity**

`com.example.demoservice.model.Item`

```java
package com.example.demoservice.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "items")
public class Item {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 200)
  private String name;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt = Instant.now();

  protected Item() {} // JPA

  public Item(String name) {
    this.name = name;
  }

  public Long getId() { return id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public Instant getCreatedAt() { return createdAt; }
}
```

**First run with `ddl-auto` in dev only**

In **local** learning, you can use:

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: update
```

Hibernate will **create** the `items` table. Before **production**, switch to **migrations** (Flyway) and `validate` or `none`. This series calls that out; we keep the focus on code first.

**Folder structure**

```text
com.example.demoservice.model
  Item.java
```

**Common mistakes**

- **No** default **constructor** — JPA needs a **no-arg** (can be `protected` with Lombok `@NoArgsConstructor`)
- Exposing the **entity** in JSON as a **return type** of REST controller—tight **coupling**; we fix with **DTOs** in article 14
- Using `fetch = EAGER` on **everything** and wondering why **N+1** queries happen—**default to LAZY** for `*ToMany` and `*ToOne` where possible

**Best practices**

- **Name** the table with `@Table` explicitly in shared databases
- **Types**: use **`Instant`** for **UTC** timestamps, **zone** in API layer, not in DB
- **Keep** entities **thin**—**business** rules that span aggregates belong in the **service** layer

**Final summary**

The **entity** is your **persistence** model. We next add a **`JpaRepository`** to **save and query** `Item` rows without hand-writing SQL (for simple cases).
