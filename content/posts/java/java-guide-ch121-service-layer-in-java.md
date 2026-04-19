---
title: "Chapter 121: Service Layer in Java — @Service, Transactions, and Orchestrating Repositories"
description: "Design the service layer in Spring Boot: @Service stereotype, @Transactional boundaries, orchestrating repositories, domain rules, and why controllers should call services not JDBC directly."
category: "Java"
tags:
  - Java Spring Boot service layer
  - Java Transactional Spring
  - Java Service annotation Spring
  - Spring Boot business logic layer
  - Java service repository pattern
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 121
---

# Chapter 121: Service Layer in Java

The **service layer** holds **use-case logic**: **validate** **invariants**, **coordinate** **multiple** **repositories**, **apply** **transactions**, and **translate** **domain** outcomes into **results** the **controller** can **turn into HTTP**.

In **Spring**, **`@Service`** is a **stereotype** over **`@Component`**—**semantic** **clarity** for **humans** and **AOP** hooks like **`@Transactional`**.

---

## 1. Topic title

**Service: one place for business rules; start transactions here, not in controllers**

---

## 2. What it means

**`@Transactional`** on a **public** **service method** (interface **proxy** caveats apply) begins a **transaction** at **entry** and **commits** on **success** or **rolls back** on **unchecked** **exceptions**—**checked** **exceptions** need **`rollbackFor`** if they should **abort**.

**Services** **depend on** **interfaces** (**`ItemRepository`**) when you want **tests** with **fakes**—**Spring Data** generates **implementations** at **runtime** (Chapter 122).

---

## 3. Why it is used

**Reuse** — **CLI**, **batch**, and **HTTP** **controllers** can **call** the **same** **service**.

**Clarity** — **code review** finds **rules** **faster** when **they are not** **hidden** in **controllers**.

---

## 4. Mental sketch

If the **controller** is **check-in**, the **service** is **the airline operations room**—**weather reroutes**, **crew swaps**, **baggage reconciliation**—**gate agents** **should not** **re-fuel** **planes**.

---

## 5. Java code example

```java
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

record ItemDto(long id, String name) {
}

interface ItemService {
    Optional<ItemDto> find(long id);

    ItemDto create(String name);
}

record ItemEntity(Long id, String name) {
}

interface ItemRepository {
    Optional<ItemEntity> findById(long id);

    ItemEntity save(ItemEntity entity);
}

@Service
class ItemServiceImpl implements ItemService {
    private final ItemRepository items;

    ItemServiceImpl(ItemRepository items) {
        this.items = items;
    }

    @Override
    public Optional<ItemDto> find(long id) {
        return items.findById(id).map(e -> new ItemDto(e.id(), e.name()));
    }

    @Override
    @Transactional
    public ItemDto create(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("name required");
        }
        ItemEntity saved = items.save(new ItemEntity(null, name.trim()));
        return new ItemDto(saved.id(), saved.name());
    }
}
```

**`ItemRepository`** is usually a **Spring Data** interface (Chapter 122); **`ItemEntity`** here is a **compact sketch**—Chapter 123 will add **`@Entity`** details.

---

## 6. Explanation of code

**`@Transactional`** on **`create`** ensures **save + side effects** **commit** **atomically**—if you later **emit events** or **touch two tables**, the **boundary** is **already** **right**.

---

## 7. Common mistakes

**Self-invocation** bypassing **proxy**—**`this.create()`** inside the **same** class **skips** **`@Transactional`**—**extract** to **another** **bean** or **use** **`TransactionTemplate`** when **needed**.

**Leaking `Entity` into controllers**—**map** to **DTOs** before **returning** across **HTTP**.

---

## 8. Best practices

Keep **methods** **small**; **private** helpers for **non-transactional** **pure** **steps**.

**Name services** after **verbs** or **workflows** when **use cases** grow (**`CheckoutService`**).

---

## 9. Small practice task

Add **`rename(long id, String newName)`** with **`@Transactional`** that **loads**, **checks** **version** or **optimistic lock**, **updates**, and **throws** a **domain** **exception** mapped to **`409`** later (Chapter 127).

---

## Beginner tip

If **`@Transactional` “does nothing”**, check **(a)** **public** method?, **(b)** **proxy** **bypass**?, **(c)** **read-only** **datasource** **routing**?—**three** **usual** **suspects**.
