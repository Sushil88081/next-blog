---
title: "Chapter 126: Request Validation in Java — Jakarta Validation, @Valid, and Consistent 400 Responses"
description: "Validate HTTP requests in Spring Boot with jakarta.validation constraints on DTOs, @Valid on controller parameters, MethodArgumentNotValidException handling, and custom validators when needed."
category: "Java"
tags:
  - Java Spring validation
  - Java Valid RequestBody Spring
  - Jakarta validation annotations
  - Java MethodArgumentNotValidException
  - Spring Boot request validation
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 126
---

# Chapter 126: Request Validation in Java

**Request validation** rejects **bad input early**—before **services** or **databases** waste work. In **Spring Boot**, **`spring-boot-starter-validation`** brings **Jakarta Bean Validation** annotations (**`@NotBlank`**, **`@Size`**, **`@Email`**, **`@Positive`**) you place on **DTO fields** or **controller parameters**, then trigger with **`@Valid`**.

---

## 1. Topic title

**Validation: declarative constraints on DTOs; framework binds errors to HTTP 400**

---

## 2. What it means

**`public record CreateItemRequest(@NotBlank String name, @Size(max = 500) String note) { }`**

**Controller signature** — **`ResponseEntity<?> create(@Valid @RequestBody CreateItemRequest body)`**—**`@Valid`** **cascades** validation; failures become **`MethodArgumentNotValidException`** (or **`ConstraintViolationException`** for **param** validation).

**Custom rules** — **`@Constraint` + `ConstraintValidator`** when **cross-field** logic exceeds **built-ins**.

---

## 3. Why it is used

**Uniform 400** bodies instead of **hand-rolled** **`if (name == null)`** in **every** **method**.

**Documentation**—annotations double as **API schema hints** when you export **OpenAPI**.

---

## 4. Mental sketch

Validation is the **bouncer** at the **club door**—**ID format**, **dress code**, **capacity**—**before** you **reach** the **bar** (**service layer**) where **real money** moves.

---

## 5. Java code example

```java
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

public record CreateItemRequest(@NotBlank String name, @Size(max = 500) String note) {
}

@RestController
class ItemsController {
    private final ItemService items;

    ItemsController(ItemService items) {
        this.items = items;
    }

    @PostMapping("/api/items")
    ResponseEntity<ItemResponse> create(@Valid @RequestBody CreateItemRequest body) {
        return ResponseEntity.status(201).body(items.createFromRequest(body));
    }
}
```

**`ItemService.createFromRequest`** maps **DTO → entity → persisted row → response DTO**; validation **covers shape**, while **rules** like **unique name** still **live** in the **service** (**`409`** path—Chapter 127 maps exceptions to HTTP).

---

## 6. Explanation of code

**`@Valid` on nested DTOs** validates **whole trees**—handy for **address** objects **inside** **requests**.

---

## 7. Common mistakes

**Validating only the controller** but **re-trusting** data **inside** **async** workers—**validate again** at **trust boundaries**.

**Huge error payloads** listing **every** internal **field** path—**trim** for **public** APIs.

---

## 8. Best practices

Pair **`@Validated` on classes** with **`@NotNull Long id`** on **path variables** when you **need** **grouped** constraints.

**i18n** message keys in **`ValidationMessages.properties`** for **user-facing** **text**.

---

## 9. Small practice task

Add **`@Pattern(regexp = "[a-z0-9-]+")`** on **`name`** slug field and **observe** **JSON error** output—then **map** it to a **stable** **`problem+json`** body in Chapter 127.

---

## Beginner tip

If **`@Valid` “does nothing”**, you **forgot** **`spring-boot-starter-validation`** on the **classpath**—**dependency** **first**, **annotations** second.
