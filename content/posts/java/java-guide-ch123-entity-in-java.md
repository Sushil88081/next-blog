---
title: "Chapter 123: Entity in Java — JPA @Entity, IDs, Mappings, and Persistence State"
description: "Model JPA entities in Spring Boot: @Entity and @Table, @Id and @GeneratedValue, basic column mappings, relationships overview, and equals/hashCode pitfalls with lazy proxies."
category: "Java"
tags:
  - Java JPA Entity
  - Spring Boot Entity annotation
  - Java GeneratedValue JPA
  - Java JPA column mapping
  - Java entity equals hashCode
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 123
---

# Chapter 123: Entity in Java

A **JPA entity** is a **plain Java class** annotated with **`@Entity`** that **maps** to a **database table**. The **persistence provider** (**Hibernate** by default in **Spring Boot**) **synchronizes** **field values** with **rows**—**insert** when **new**, **update** when **managed**, **delete** when **removed**.

Chapter 122’s **`ItemEntity`** sketch becomes **concrete** here: **table name**, **primary key**, **columns**, and **optional** **associations**.

---

## 1. Topic title

**Entity: object graph node with a row identity; lifecycle managed by the persistence context**

---

## 2. What it means

**`@Table(name = "items")`** overrides the **default** table name derived from the **class** name.

**`@Id`** marks the **primary key**; **`@GeneratedValue(strategy = GenerationType.IDENTITY)`** fits **Postgres** **`BIGSERIAL`** / **`SERIAL`**.

**`@Column(nullable = false, length = 200)`** adds **constraints** that **match** **DDL** you expect in **migrations**.

**Relationships** — **`@ManyToOne`**, **`@OneToMany`**, **`@ManyToMany`**—carry **fetch** defaults (**`LAZY`** vs **`EAGER`**)—prefer **`LAZY`** on **collections** unless you **measure** a **reason** for **`EAGER`**.

---

## 3. Why it is used

**Single representation** of **row shape** inside the **ORM** layer—**repositories** return **entities**, **services** **map** them to **DTOs** (Chapter 124).

**Schema evolution** via **Flyway/Liquibase** plus **entity** tweaks—**Boot** can **validate** **DDL** vs **mappings** in **dev**.

---

## 4. Mental sketch

An **entity** is a **live row with an attitude**—it **remembers** whether it is **new**, **loaded**, or **dirty**. A **DTO** is a **photocopy** you **hand to strangers**—**no** **Hibernate** **surprises** on the **copy**.

---

## 5. Java code example

```java
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "items")
public class ItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 500)
    private String note;

    protected ItemEntity() {
    }

    public ItemEntity(String name, String note) {
        this.name = name;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getNote() {
        return note;
    }
}
```

**Protected no-arg constructor** keeps **JPA** happy while you **prefer** **factory** or **builder** patterns for **app code**.

---

## 6. Explanation of code

**`jakarta.persistence.*`** on **Spring Boot 3** / **JDK 17+** baseline—older tutorials show **`javax.persistence`**; **imports differ**, **ideas** **do not**.

---

## 7. Common mistakes

**`equals`/`hashCode` including mutable fields**—breaks **Sets** and **cache keys** when **ORM** **mutates** state.

**Calling lazy associations outside a transaction**—**`LazyInitializationException`**—**open session in view** was a **band-aid**; **better** **DTO** **queries** or **`@Transactional(readOnly=true)`** **service** methods.

---

## 8. Best practices

Keep **entities** **free of web imports**—no **`HttpServletRequest`** in **entities**.

**Version column** (**`@Version`**) for **optimistic locking** when **concurrent** **updates** matter.

---

## 9. Small practice task

Add **`Instant createdAt`** with **`@PrePersist`** defaulting to **`Instant.now()`**—confirm it **appears** in **SQL logs** on **insert**.

---

## Beginner tip

If **`ddl-auto=update`** “**fixes**” **everything** in **dev**, you still **owe** **explicit migrations** before **production**—**Boot** defaults are **training wheels**, not **release** **process**.
