---
title: "CRUD REST API with PostgreSQL and Spring Boot"
description: "Implement create, read, update, and delete for a resource, wire JPA, and return appropriate HTTP status codes and bodies."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - REST
  - CRUD
  - PostgreSQL
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 15
---

# CRUD REST API with PostgreSQL and Spring Boot

**Introduction**

**CRUD** is **Create**, **Read**, **Update**, **Delete**. A typical REST design uses **POST** create, **GET** read, **PUT/PATCH** update, **DELETE** remove. This post extends **Item** with an **updatable** `name` and a **delete** by **id**.

**Real-world explanation**

- **Idempotent** `PUT` — same request twice should leave the same **resource** (when possible)
- **204 No Content** — common for **delete** or **update** with **no** **body** to return
- **404** — when the **id** is **not** in the database

**Service: update + delete**

```java
@Transactional
public Item updateName(Long id, String newName) {
  Item it = itemRepository.findById(id)
      .orElseThrow(() -> new IllegalArgumentException("not found"));
  it.setName(newName.trim());
  return it; // managed entity, flush on commit
}

@Transactional
public void delete(Long id) {
  if (!itemRepository.existsById(id)) {
    throw new IllegalArgumentException("not found");
  }
  itemRepository.deleteById(id);
}
```

**Controller: REST mapping**

```java
@GetMapping("/{id}")
public ItemResponse get(@PathVariable Long id) {
  return itemRepository.findById(id)
      .map(ItemResponse::from)
      .orElseThrow(() -> new IllegalArgumentException("not found"));
}

@PutMapping("/{id}")
public ItemResponse replace(@PathVariable Long id, @RequestBody @Valid CreateItemRequest body) {
  return ItemResponse.from(itemService.updateName(id, body.name()));
}

@DeleteMapping("/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void remove(@PathVariable Long id) {
  itemService.delete(id);
}
```

(Use a **central** not-found / problem response in the **next** error-handling **article**; here we keep **exceptions** for illustration.)

**Folder structure (recap)**

```text
web/ItemController.java
service/ItemService.java
repository/ItemRepository.java
model/Item.java
dto/ItemResponse.java, CreateItemRequest.java, UpdateItemRequest.java (if fields differ)
```

**Common mistakes**

- **Exposing** **all** `findAll()` in production on a **huge** table without **pagination** (article 18)
- **DELETE 200** with a **body** when **no** **body** is **needed**—`204` is **cleaner**
- **Losing** **concurrency** control—later, **optimistic locking** with **@Version** if the **same** **row** is **edited** often

**Best practices**

- **List** with **page** and **size** (next article) in real APIs
- **Consistent** **error** **shape** for 404/400/409
- **Integration** tests: `@SpringBootTest` with **Testcontainers** PostgreSQL when the team is ready (optional, not the focus of this post)

**Final summary**

**CRUD** is **wiring** **service** and **HTTP** to **JPA** **persistence** with the **right** **verbs** and **codes**. Next: **Bean Validation** on DTOs.
