---
title: "Chapter 120: Controller Layer in Java — RestController, Mappings, Request/Response DTOs"
description: "Build the web layer in Spring Boot: @RestController, @GetMapping @PostMapping, path variables and request params, HTTP status with ResponseEntity, and keep controllers thin by delegating to services."
category: "Java"
tags:
  - Java Spring Boot controller
  - Java RestController GetMapping
  - Java ResponseEntity status
  - Spring Boot web layer
  - Java RequestBody PathVariable
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 120
---

# Chapter 120: Controller Layer in Java

The **controller** (or **“web” / “API” layer**) is the **HTTP front door**: it **maps URLs + verbs** to **Java methods**, **deserializes** **JSON** bodies, **validates** **inputs** (often with **annotations**—Chapter 126), and **chooses status codes** + **response bodies**.

**Spring MVC** uses **`@RestController`** (**`@Controller` + `@ResponseBody`**) so **return values** become **JSON** by default when **Jackson** is on the **classpath** (**`spring-boot-starter-web`**).

---

## 1. Topic title

**Controller: translate HTTP to service calls; avoid business rules and SQL here**

---

## 2. What it means

**`@RequestMapping` on the class** sets a **shared prefix**; **method-level** **`@GetMapping` / `@PostMapping`** refine **paths** and **verbs**. **`@PathVariable`** binds **`{id}`** segments; **`@RequestBody`** tells **Jackson** to **parse JSON** into a **Java type** (often a **`record`** DTO—Chapter 124).

**Constructor injection** of **`ItemService`** keeps the **controller** a **thin adapter**—Chapter 121 owns **rules** and **transactions**.

---

## 3. Why it is used

**Stable HTTP contract** independent of **service refactors**.

**Framework features**—**content negotiation**, **exception handlers** (Chapter 127), **CORS**—**attach** at this **layer**.

---

## 4. Mental sketch

Controllers are **airport check-in counters**: they **check tickets** (**routing**), **weigh bags** (**validation**), and **hand you a boarding pass** (**DTO**); they **do not fly the plane** (**business logic** deeper inside).

---

## 5. Java code example

```java
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

record CreateItemRequest(String name) {
}

record ItemDto(long id, String name) {
}

interface ItemService {
    Optional<ItemDto> find(long id);

    ItemDto create(String name);
}

@RestController
@RequestMapping("/api/items")
class ItemController {
    private final ItemService itemService;

    ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/{id}")
    ResponseEntity<ItemDto> get(@PathVariable long id) {
        return itemService.find(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    ResponseEntity<ItemDto> create(@RequestBody CreateItemRequest body) {
        ItemDto created = itemService.create(body.name());
        return ResponseEntity.status(201).body(created);
    }
}
```

**`ItemService`** implementation lives in **Chapter 121**; **persistence** behind it in **Chapter 122**.

---

## 6. Explanation of code

**`ResponseEntity`** carries **status + headers + body** explicitly—**better** than **magic 200** when you need **`201`**, **`204`**, or **empty** **404**.

---

## 7. Common mistakes

**Fat controllers** with **SQL strings**—**duplicate** Chapter 110 mistakes at **scale**.

**Domain entities leaked** as **JSON**—**serialization** **couples** **API** to **schema** **migrations**; prefer **DTOs** (Chapter 124).

---

## 8. Best practices

One **controller** per **aggregate** or **bounded context** slice—not **one** **god** class for **the whole company**.

**Integration-test** **happy paths** with **`MockMvc`** or **`WebTestClient`** early.

---

## 9. Small practice task

Add **`@GetMapping(params = "q")`** **search** endpoint **`/api/items?q=pen`** that returns a **list**—delegate **filtering** to **`ItemService`**.

---

## Beginner tip

**`@RequestParam` vs `@PathVariable`**: **query** **`?q=`** vs **path** **`/items/7`**—**bookmarks** and **caches** treat them **differently**; choose **on purpose**.
