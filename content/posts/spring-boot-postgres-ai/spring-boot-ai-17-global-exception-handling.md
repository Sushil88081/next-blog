---
title: "Global exception handling with @ControllerAdvice in Spring"
description: "Map exceptions to HTTP status, body, and problem details so your API is predictable and easy to test."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Exception handling
  - Spring Boot
  - REST
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 17
---

# Global exception handling with @ControllerAdvice in Spring

**Introduction**

**Controllers** and **services** can **throw** **for** “not found” or “**bad** state.” Centralizing **translation** to **status + body** in **one** class avoids **repeated** **try/catch** in every **method** and **keeps** **JSON** **shapes** **stable**.

**Real-world explanation**

- **@ControllerAdvice** + **@RestControllerAdvice** (same, **includes** @ResponseBody for REST)
- **@ExceptionHandler** **methods** receive the **thrown** **type**; return **ResponseEntity<Problem>**
- **MethodArgumentNotValidException** is thrown when **@Valid** **fails**; **ConstraintViolationException** in some other paths

**Step-by-step: simple problem model**

`dto/ErrorResponse.java`

```java
package com.example.demoservice.dto;

import java.util.List;
import java.util.Map;

public record ErrorResponse(
    String type,
    String message,
    List<String> fieldErrors
) { }
```

**Advised handler (sketch)**

```java
package com.example.demoservice.web;

import com.example.demoservice.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class RestExceptionHandler {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ErrorResponse> notFoundOrBadRequest(IllegalArgumentException ex) {
    HttpStatus status = ex.getMessage().toLowerCase().contains("not found")
        ? HttpStatus.NOT_FOUND
        : HttpStatus.BAD_REQUEST;
    return ResponseEntity
        .status(status)
        .body(new ErrorResponse("business", ex.getMessage(), List.of()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> onValidation(MethodArgumentNotValidException ex) {
    var list = ex.getBindingResult()
        .getFieldErrors()
        .stream()
        .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
        .toList();
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(new ErrorResponse("validation", "invalid request", list));
  }
}
```

**Common mistakes**

- **Swallowing** **all** `Exception` in one **handler** with **200** for **everything**
- **Log** the **id** in **PII**-heavy apps—**never** return **raw** **SQL** in **bodies** to **browsers** in **prod** (we print **developer** text carefully)
- Forgetting to **@RestControllerAdvice** in a **package** that **Spring** **sees** (it is a **@Component**)

**Best practices**

- Align on **one** error **JSON** **for** the **whole** **API** (teams sometimes adopt **Problem Details** RFC 7807—optional extension)
- **Log** with **context** in the **advice** or **AOP** if you add **user** **id** in **MCD** (logging topic)

**Final summary**

**@RestControllerAdvice** centralizes **HTTP** error **mapping**. **Validation** **errors** and **business** **exceptions** **both** get **clear** **responses**. Next: **paging** **for** `GET` **lists**.
