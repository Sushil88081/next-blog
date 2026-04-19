---
title: "Chapter 128: REST API CRUD Example in Java — Layered Spring Boot Flow from GET to DELETE"
description: "Tie together a Spring Boot REST CRUD example: controller routes, DTOs and validation, service transactions, JPA repository, status codes for create read update delete, and global errors for 404 and validation."
category: "Java"
tags:
  - Java Spring Boot REST CRUD
  - Java REST API example Spring
  - Spring Boot CRUD controller
  - Java JPA REST tutorial
  - Spring Boot layered architecture example
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 128
---

# Chapter 128: REST API CRUD Example in Java

This chapter is a **checklist chapter**: it **does not** replace a **full repository** on your machine—it **connects** **Chapters 118–127** into one **story** you can **implement** as a **single small service** named **`items`**.

You already practiced **JDBC CRUD** (Chapter 110) and **raw HTTP** (Chapter 117); here **Spring Boot** **handles** **JSON**, **validation**, **transactions**, and **error mapping**.

---

## 1. Topic title

**REST CRUD: five routes, four layers, one advice class, one migration**

---

## 2. What it means

Suggested **routes**:

| Method | Path | Intent | Typical status |
|--------|------|--------|----------------|
| **`GET`** | **`/api/items`** | list (paginated later) | **`200`** |
| **`GET`** | **`/api/items/{id}`** | fetch one | **`200` / `404`** |
| **`POST`** | **`/api/items`** | create | **`201`** + **`Location`** (optional) |
| **`PUT`** | **`/api/items/{id}`** | replace | **`200` / `404`** |
| **`DELETE`** | **`/api/items/{id}`** | remove | **`204` / `404`** |

**Layers**: **`ItemController`** → **`ItemService`** → **`ItemRepository`** → **`ItemEntity`** table **`items`**.

---

## 3. Why it is used

**Interview and onboarding** baseline—**every** **Spring** **shop** expects you to **navigate** this **skeleton**.

**Template** for **feature slices**—copy **package** **pattern** per **aggregate**.

---

## 4. Mental sketch

Think of **CRUD** as **five buttons** on a **remote**—**Spring** wires **batteries** (**auto-config**), **infrared** (**HTTP**), and **TV logic** (**service**); your job is **labeling buttons** so **users** never **accidentally** **eject** the **disk** (**`DELETE`**) without proper **`404` handling**.

---

## 5. Java code example

```java
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/items")
public class ItemCrudController {
    private final ItemService items;

    public ItemCrudController(ItemService items) {
        this.items = items;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemResponse> get(@PathVariable long id) {
        return items.find(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ItemResponse> create(@Valid @RequestBody CreateItemRequest body) {
        ItemResponse created = items.createFromRequest(body);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemResponse> replace(@PathVariable long id, @Valid @RequestBody CreateItemRequest body) {
        return items.replace(id, body).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        return items.delete(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
```

**`ItemService` methods** should run **`replace`** and **`delete`** **inside** **`@Transactional`** where **needed**—**returning** **`Optional`** or **`boolean`** keeps **controllers** **thin**.

---

## 6. Explanation of code

**`201`** responses **often** include the **created body**; **`Location`** header is **nice** when **clients** **follow** **hypermedia** patterns.

**`204 No Content`** on **successful DELETE** avoids **fake JSON** bodies.

---

## 7. Common mistakes

**Returning `200` with `{deleted:false}`** instead of **`404`**—**hides** **intent** from **caches** and **API consumers**.

**Omitting `@Valid` on PUT bodies**—**symmetric** validation with **POST** prevents **silent** **bad** **states**.

---

## 8. Best practices

Add **`GET /api/items?page=&size=`** using **`Pageable`** once **list** grows—**index** **columns** you **filter** on.

**Integration test** the **full matrix** with **`@SpringBootTest` + `WebTestClient`** or **`MockMvc`**.

---

## 9. Small practice task

Implement the **table** end-to-end against **Postgres** with **Flyway** **`V1__items.sql`**—then **load-test** **`GET list`** with **`k6`** or **`ab`** and **watch** **SQL** **counts** in **logs**.

---

## Beginner tip

When **everything works** in **`curl`** but **fails** in the **browser**, open **DevTools → Network**—**nine times** out of ten it is **CORS**, **wrong** **`Content-Type`**, or a **preflight** **`OPTIONS`** you did not **expect**.
