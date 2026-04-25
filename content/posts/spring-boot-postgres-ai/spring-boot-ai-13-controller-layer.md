---
title: "Controller layer: @RestController and HTTP mapping in Spring Boot"
description: "Expose JSON REST endpoints with @RestController, @RequestMapping, proper HTTP status codes, and no business rules in the controller class."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - REST
  - Spring Boot
  - Controller
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 13
---

# Controller layer: @RestController and HTTP mapping in Spring Boot

**Introduction**

A **`@RestController`** is a **`@Controller` + `ResponseBody`** for every handler: return values are **encoded** to JSON (by default) and the body is not a **view** name. This post wires **ItemService** to **GET/POST** endpoints.

**Real-world explanation**

- **@RequestMapping** at **class** level: prefix, e.g. `/api/items`
- **@GetMapping / @PostMapping** at **method** level
- **`ResponseEntity`** to set **201 Created**, `Location` header, etc.
- **@PathVariable** and **@RequestParam** for URL parts and **query** strings
- **Validation** in the next article with **`@Valid`** and request **DTOs**

**Step-by-step: controller (no DTO yet, simplified)**

```java
package com.example.demoservice.web;

import com.example.demoservice.model.Item;
import com.example.demoservice.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class ItemController {

  private final ItemService itemService;

  public ItemController(ItemService itemService) {
    this.itemService = itemService;
  }

  @GetMapping
  public List<Item> list() {
    return itemService.list();
  }

  @PostMapping
  public ResponseEntity<Map<String, Object>> create(
      @RequestParam String name) {
    Item item = itemService.create(name);
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(Map.of("id", item.getId(), "name", item.getName()));
  }
}
```

We will replace the `@RequestParam` with a **JSON** body and **DTO** in article 14+.

**Common mistakes**

- **Business** **if/else** trees in the controller
- **Returning 200** for all outcomes—use **4xx/5xx** and **bodies** from a **shared** error format (with global handler)
- **Leaking** **stack** traces in JSON in production (never)

**Best practices**

- **Consistent** URL nouns, **plural** for collections: `/api/items`
- **201** and **`Location: /api/items/123`** on create when the client needs it
- **CORS** only when a **browser** on another **origin** calls the API; not needed for **server-to-server** or **Postman** by default (article 19)

**Final summary**

**Controllers** map **HTTP** to **service** **calls** and set **status**. Next: **DTOs** so the API shape and **entity** schema **decouple**.
