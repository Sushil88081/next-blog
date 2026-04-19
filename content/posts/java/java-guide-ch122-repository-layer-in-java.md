---
title: "Chapter 122: Repository Layer in Java — Spring Data JPA, JpaRepository, and Query Ownership"
description: "Model the repository layer in Spring Boot: Spring Data JPA interfaces, JpaRepository and derived query methods, @Query when needed, transactions at the service boundary, and keep SQL readable and reviewed."
category: "Java"
tags:
  - Java Spring Data JPA
  - Java JpaRepository
  - Java repository layer Spring Boot
  - Spring Boot Spring Data repository
  - Java derived query methods
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 122
---

# Chapter 122: Repository Layer in Java

The **repository** (or **persistence**) layer is where **database conversations** live: **CRUD** on **entities**, **pagination**, **projections**, and **occasionally** hand-written **SQL** or **JPQL**. In **Spring Boot**, **`spring-boot-starter-data-jpa`** plus a **datasource** lets you declare **`interface ItemRepository extends JpaRepository<ItemEntity, Long>`** and get **implementations** **without** **boilerplate**.

Chapter 121’s **`ItemServiceImpl`** called **`ItemRepository.save`**—here that **interface** becomes **real**.

---

## 1. Topic title

**Repository: persistence adapter; Spring generates basics; you own tricky queries explicitly**

---

## 2. What it means

**`JpaRepository`** adds **batch flush**, **delete in batch**, and **`findAll(Pageable)`**— **`CrudRepository`** is smaller if you **want** **less** **surface**.

**Derived query methods** — **`findByNameIgnoreCase(String name)`** builds a **query** from the **name**—great until **names grow** **awkward**; then **`@Query`** with **verified** **JPQL** wins.

**`@Modifying`** + **`@Transactional`** on **repository** methods for **updates**—still often **prefer** **service-level** **transactions** for **multi-table** **stories**.

---

## 3. Why it is used

**Less JDBC glue** than Chapter 110 for **straightforward** **mappings**.

**Testability** — **`@DataJpaTest`** slices **JPA** without **starting** **full MVC**.

---

## 4. Mental sketch

Repositories are **warehouse robots** that **fetch pallets** (**rows**) by **SKU** (**keys**); **services** decide **which** **orders** need **which** **pallets**—robots **should not** **negotiate** **pricing** with **customers**.

---

## 5. Java code example

```java
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    List<ItemEntity> findByNameContainingIgnoreCase(String fragment);

    @Query("select i from ItemEntity i where i.name = :exact")
    List<ItemEntity> findExactName(@Param("exact") String name);
}
```

**`ItemEntity`** is a **`@Entity`** class (Chapter 123)—**table name**, **ids**, and **column mappings** live **there**, not in the **repository** **interface**.

---

## 6. Explanation of code

**`extends JpaRepository<Entity, Id>`** brings **`save`**, **`findById`**, **`deleteById`**, **`findAll`**, etc.—the **same** verbs you **wrote** manually in **JDBC**, now **generated**.

---

## 7. Common mistakes

**N+1 queries** when **lazy** **`@OneToMany`** is **touched** in **loops**—**fetch joins** or **DTO projections** fix it—**measure** with **SQL logging** in **dev**.

**Fat repositories** with **business rules**—**keep** **invariants** in **services**; **repositories** return **facts**.

---

## 8. Best practices

Enable **`spring.jpa.show-sql=true`** only **locally**; use **parameterized logging** or **datasource-proxy** in **shared** **environments**.

**Index** columns you **filter** on—**repositories** **cannot** **fix** **missing** **indexes**.

---

## 9. Small practice task

Add **`Page<ItemEntity> findByNameContaining(String q, Pageable pageable)`** and call it from **`ItemService`** with **`PageRequest.of(page, size)`**—return **DTOs** with **total counts** for **UI pagination**.

---

## Beginner tip

If **startup** fails with **`Not a managed type: class ItemEntity`**, your **entity** is **outside** **`@EntityScan`** / **`@SpringBootApplication`** **package** **tree**—**move** **classes** or **configure** **scan** **explicitly**.
