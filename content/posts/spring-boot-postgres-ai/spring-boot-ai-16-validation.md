---
title: "Validation in Spring REST with Jakarta Bean Validation"
description: "Use @NotBlank, @Size, @Min on request DTOs, @Valid on the controller, and return clear 400 responses when the client payload is wrong."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Validation
  - Spring Boot
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 16
---

# Validation in Spring REST with Jakarta Bean Validation

**Introduction**

**Jakarta** Bean Validation (`@NotNull`, `@NotBlank`, `@Size`, `@Email`, …) lets you **declaratively** state **rules** on **request** **DTOs**. In Spring Web, **`@Valid`** (or `@Validated` for groups) on **`@RequestBody` / `@RequestParam` / @ModelAttribute** **triggers** **validation** before the **method** **body** **runs** if **validation** **starter** is on the **classpath** (we added it in the **dependencies** article).

**Real-world explanation**

- If **validation** **fails**, the framework by default can turn it into **400** with a **default** error structure; we **refine** that in the **next** post with a **global** **handler**
- **Groups** (e.g. `Create` vs `Update`) let **different** rules for **the same** class in **different** **operations**—`@Validated` with group **classes** on the **controller** **method**

**Step-by-step: stronger DTO**

```java
public record CreateItemRequest(
    @NotBlank(message = "name is required")
    @Size(max = 200) String name
) { }
```

**Controller**

```java
@PostMapping
public ResponseEntity<ItemResponse> create(
    @RequestBody @Valid CreateItemRequest body) {
  return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(ItemResponse.from(itemService.create(body.name())));
}
```

**Manual check when annotation is not enough**

```java
if (name.startsWith(" ")) {
  throw new IllegalArgumentException("trim your input");
}
```

**Common mistakes**

- Forgetting **validation** **starter** and wondering why **@NotBlank** is **ignored**
- **@Valid** on a **list** of nested objects—**each** item needs **@Valid** on the **list** or **@Valid** on a **Wrapper** with a `List<@Valid Child> **field` (Java 8+ supports **type-use**; verify your JDK)
- **Trusting** **only** client-side **validation**—**always** **validate** on the **server**

**Best practices**

- **Message** in **constraint** (as above) is **read** by the **user**; keep it **actionable**
- For **I18n**, use **code** in messages and a **message** **resolver**; out of **scope** here, but teams plan for it
- **Service**-level rules (e.g. “name **globally** unique”) stay in **@Service**; **syntactic** and **obvious** **size** rules in **DTO**

**Final summary**

**@Valid** + **annotations** on **DTOs** = **first** **line of defense** against **bad** **JSON**. Next: **unify** **all** **errors** with **@ControllerAdvice**.
