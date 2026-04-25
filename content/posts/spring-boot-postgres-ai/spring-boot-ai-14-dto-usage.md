---
title: "DTOs for request and response in a Spring REST API"
description: "Separates JSON contracts from JPA entities using records or classes, so your API can evolve without leaking database details."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - DTO
  - Spring Boot
  - REST
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 14
---

# DTOs for request and response in a Spring REST API

**Introduction**

A **DTO** (Data Transfer Object) is a **type** for **one** message shape: e.g. **“create item”** body or **“item response”** JSON. It is **not** a JPA **entity**. Keeping them **separate** means you can **rename** a **column** or **add** a **field** in the **entity** without breaking **clients**. Java **records** are a good fit in Boot 3.

**Real-world explanation**

- **Request DTO** — what the **client** sends: validation annotations live **here** (next post)
- **Response DTO** — what the **client** **sees**: you might **hide** internal **ids** or add **aggregated** fields
- **Mapping** — from **Entity** ↔ **DTO**: small `static` methods, **mapper** class, or MapStruct if the team standardizes

**Step-by-step: records and mapping**

`dto/CreateItemRequest.java`

```java
package com.example.demoservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateItemRequest(
    @NotBlank @Size(max = 200) String name
) { }
```

`dto/ItemResponse.java`

```java
package com.example.demoservice.dto;

public record ItemResponse(Long id, String name) {
  public static ItemResponse from(com.example.demoservice.model.Item e) {
    return new ItemResponse(e.getId(), e.getName());
  }
}
```

**Controller (accept body)**

```java
@PostMapping
public ResponseEntity<ItemResponse> create(@RequestBody @Valid CreateItemRequest body) {
  var item = itemService.create(body.name());
  return ResponseEntity.status(HttpStatus.CREATED)
      .body(ItemResponse.from(item));
}
```

`@Valid` is picked up in the **validation** post; include **`spring-boot-starter-validation`**.

**Common mistakes**

- **Reusing** the **entity** as a **body** in POST—serializes **lazy** **relations** accidentally
- **Putting** **JPA** annotations on **DTOs**—mixing layers
- **Huge** **DTOs** for **one** use case; prefer **separate** **per** **operation** (`ItemCreateRequest`, `ItemUpdateRequest`) when their fields differ

**Best practices**

- **Name** DTOs after the **action** or **read model** (`ItemCreatedResponse` vs `ItemListRow`)
- **Immutability** of records matches **read**-oriented **responses** well
- **Unit test** mappers for **sensitive** mapping rules

**Final summary**

**DTOs** are your **public** **contract** for **JSON**. **Map** to and from **entities** in a **known** place. Next: full **CRUD** with **PUT/DELETE** and the same **pattern**.
