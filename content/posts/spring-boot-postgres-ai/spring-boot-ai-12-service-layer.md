---
title: "Service layer: use cases and transactions in Spring"
description: "Build a service class with @Service, constructor injection, and @Transactional for coherent business operations around your repositories."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Spring
  - Service layer
  - transactions
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 12
---

# Service layer: use cases and transactions in Spring

**Introduction**

**Controllers** should be **thin**. The **service** (or “application” / “use case”) layer holds the **rules**: create an item, validate, apply **one** database **transaction** when multiple **writes** must **commit** together. This post uses **`@Service`** and **`@Transactional`**.

**Real-world explanation**

- **@Service** is a **stereotype** for `@Component` with a name that **signals** intent in reviews
- **@Transactional** on a **class** (or **public** methods of a class proxied) opens a **transaction** around the method, **commit** on success, **rollback** on **unchecked** exceptions (default)
- **Constructor** **injection** of repositories—**immutable** `final` fields, easy to **test** with **mocks**

**Step-by-step: ItemService**

```java
package com.example.demoservice.service;

import com.example.demoservice.model.Item;
import com.example.demoservice.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ItemService {

  private final ItemRepository itemRepository;

  public ItemService(ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  @Transactional
  public Item create(String name) {
    if (itemRepository.existsByName(name.trim())) {
      throw new IllegalStateException("name taken");
    }
    return itemRepository.save(new Item(name.trim()));
  }

  @Transactional(readOnly = true)
  public List<Item> list() {
    return itemRepository.findAll();
  }
}
```

**When to add `@Transactional` on the controller?**

Usually **not**. It hides **use case** **boundaries** and is easy to misuse. Keep it on the **service**.

**Common mistakes**

- **Calling** **private** `this.foo()` with `@Transactional` on `foo` - **self-invocation** bypasses the **proxy** in default Spring. Move `foo` to **another** bean, or use **interface**-based AOP, or restructure
- **Swallowing** **exceptions** and expecting **rollback** to still happen—**must** rethrow
- **Fat** service class with 2000 lines—**split** by feature or by **read/write** models

**Best practices**

- **One** **use case** method, **one** name that reads like a **sentence** (`create`, `deactivateItem`)
- For **read** APIs, `readOnly = true` on **read** service methods to help **Hibernate** and **datasource** tuning
- **Return** **domain** objects to the web layer, then **map to DTO** in controller (or a **mapper** class) as we do next

**Final summary**

The **service** coordinates **repositories** and **rules**. **Transactions** belong here. Next: **HTTP** in the **controller** and **status codes** for the client.
