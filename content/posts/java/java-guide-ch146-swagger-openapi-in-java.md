---
title: "Chapter 146: Swagger/OpenAPI in Java — Contracts, springdoc-ui, and Generated Clients"
description: "Document and exercise Java APIs with OpenAPI 3: YAML vs annotations, springdoc-openapi with Spring Boot, Swagger UI for try-it-out, and generating clients or server stubs from the spec."
category: "Java"
tags:
  - Java OpenAPI Spring Boot
  - Java springdoc swagger
  - Java Swagger UI REST
  - OpenAPI 3 Java contract
  - Java API documentation OpenAPI
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 146
---

# Chapter 146: Swagger/OpenAPI in Java

**OpenAPI** (**formerly Swagger spec**) describes **paths**, **parameters**, **request bodies**, **responses**, and **security schemes** in **YAML or JSON**. **springdoc-openapi** auto-generates a **spec** from **Spring MVC** annotations and serves **Swagger UI** for **interactive** **trials**.

---

## 1. Topic title

**OpenAPI: single contract for docs, tests, gateways, and client SDK generation**

---

## 2. What it means

**`openapi: 3.0.x`** document lists **`servers`**, **`paths./items.get`**, **`components.schemas.Item`**—**machines** and **humans** **share** it.

**Annotations** (**`@Operation`**, **`@Parameter`**) refine **generated** **docs** when **defaults** are **vague**.

**Codegen** produces **Java clients** or **server** **interfaces**—**CI** can **fail** when **spec** **drifts**.

---

## 3. Why it is used

**Onboarding**—**new** **developers** **explore** **APIs** **without** **reading** **all** **controllers**.

**Consumer-driven** **contracts**—**publish** **spec** to **portal** **versioned** with **API**.

---

## 4. Mental sketch

**OpenAPI** is the **sheet music** for your **HTTP orchestra**—**conductors** (**gateways**), **players** (**services**), and **audience** (**SDK users**) **read** the **same** **score**.

---

## 5. Java code example

```java
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Hello")
public class OpenApiHelloController {
    @GetMapping("/api/hello")
    @Operation(summary = "Returns greeting")
    public String hello() {
        return "hello";
    }
}
```

**Requires** **`springdoc-openapi-starter-webmvc-ui`** dependency—**visit** **`/swagger-ui.html`** after **bootRun**.

---

## 6. Explanation of code

**springdoc** **groups** **beans** by **tags**—**mirror** **bounded contexts** in **tag names**.

---

## 7. Common mistakes

**Shipping UI in prod without auth**—**Swagger UI** **can** **invoke** **real** **mutations**—**protect** or **disable**.

**Spec lying**—**annotations** **out of sync** with **real** **validation**—**treat** **spec** as **code** **in review**.

---

## 8. Best practices

**Publish** **`openapi.yaml`** as **build** **artifact**—**diff** on **PRs**.

**Example** payloads for **`4xx`** **responses** help **clients** **branch** **UI**.

---

## 9. Small practice task

Add **`@Schema`** descriptions to a **DTO** field and **reload** **Swagger UI**—**confirm** **text** appears.

---

## Beginner tip

**OpenAPI ≠ implementation**—**integration tests** still **prove** **behavior**; **docs** **describe** **intent**.
