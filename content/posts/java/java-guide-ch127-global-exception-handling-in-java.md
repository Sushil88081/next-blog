---
title: "Chapter 127: Global Exception Handling in Java — @RestControllerAdvice, ProblemDetail, and Stable Error JSON"
description: "Centralize Spring MVC error handling with @RestControllerAdvice and @ExceptionHandler, return consistent JSON for validation and domain errors, and use ProblemDetail on supported Spring Boot versions."
category: "Java"
tags:
  - Java RestControllerAdvice
  - Java ExceptionHandler Spring
  - Spring Boot global exception handling
  - Java ProblemDetail Spring 6
  - Java MethodArgumentNotValidException handler
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 127
---

# Chapter 127: Global Exception Handling in Java

**Global exception handling** moves **`try/catch`** out of **every controller method** into **one** **`@RestControllerAdvice`** class that **translates** **throwables** to **HTTP status codes** + **bodies** clients can **parse**.

**Spring Framework 6+ / Boot 3+** adds **`ProblemDetail`** (**RFC 7807**-style) helpers—older stacks still return **plain maps** or **custom** **records**.

---

## 1. Topic title

**Controller advice: one translation table from domain and framework errors to HTTP**

---

## 2. What it means

**`@RestControllerAdvice`** (or **`@ControllerAdvice` + `@ResponseBody`**) applies to **all** **`@RestController`** beans in **chosen** **packages**.

**`@ExceptionHandler(MethodArgumentNotValidException.class)`** formats **field errors** into **`400`** with a **stable JSON** shape.

**`@ExceptionHandler(NotFoundException.class)`** maps **domain** “**missing**” to **`404`** without **each** **`Optional`** **branch** in **controllers**.

---

## 3. Why it is used

**Consistency** — **clients** **parse** **one** **error schema**.

**Security** — **hide** **stack traces** from **public** responses while **logging** **server-side**.

---

## 4. Mental sketch

Without advice, each **waiter** **shouts** a **different** apology when the **kitchen** burns dinner. With advice, the **maître d’** (**advice** class) **speaks** in **one voice** while **still** **noting** **which** **chef** **failed** internally.

---

## 5. Java code example

```java
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        var fieldErrors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(f -> f.getField(), f -> f.getDefaultMessage(), (a, b) -> a));
        return ResponseEntity.badRequest().body(Map.of(
                "title", "Validation failed",
                "status", 400,
                "fields", fieldErrors));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<Map<String, Object>> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("title", "Bad request", "status", 400, "detail", ex.getMessage()));
    }
}
```

**`ProblemDetail`** (Spring 6+) carries **RFC 7807**-style **fields**—build a **`ResponseEntity`** with **`status(problemDetail.getStatus())`** and **`body(problemDetail)`** when your **version** exposes the **right** helpers, or **map** fields into your **own** **JSON** **record**.

---

## 6. Explanation of code

**Order of handlers** matters for **most-specific-first** when **exceptions** **subclass** each other—**put** **narrow** handlers **above** **broad** **`Exception`**.

---

## 7. Common mistakes

**Swallowing root causes**—**log** **`ex`** with **correlation ids** before **returning** **sanitized** **JSON**.

**Returning `500` for validation**—**confuses** **monitoring** (**SRE** treats **`5xx`** as **your** fault).

---

## 8. Best practices

Add **`@ExceptionHandler(ResponseStatusException.class)`** to **respect** **`HttpStatusCode`** chosen **deep** in **services**.

**Test** advice with **`MockMvc`** / **`WebTestClient`** by **triggering** each **failure** path **once**.

---

## 9. Small practice task

Introduce **`class ConflictException extends RuntimeException`** for **duplicate** **name** inserts—**map** it to **`409`** with **`{"title":"Conflict"}`** body.

---

## Beginner tip

If **two** advice beans **both** handle the **same** type, **startup** may **fail** or **order** becomes **undefined**—**one** **owner** per **exception** **type** per **app**.
