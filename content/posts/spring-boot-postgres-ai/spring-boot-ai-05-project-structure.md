---
title: "Spring Boot project structure explained"
description: "A practical package layout for a layered REST service: what goes where, and how Spring finds your beans."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Spring Boot
  - project structure
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 5
---

# Spring Boot project structure explained

**Introduction**

Random packages make **refactors** painful. A **layered** layout (web → service → domain/persistence) matches how Spring Boot **documentation** and **tutorials** think, and how **reviews** in jobs read code. This post defines the structure we use in this series.

**Real-world explanation**

- **`@SpringBootApplication`** (on your main class) is `@Configuration` + `@EnableAutoConfiguration` + **component scan** from that class’s **package** **downward**. Put `Application` in a **root** package like `com.example.demoservice` and place everything else **under** it. Do not hide controllers in a path that is **not** a subpackage.
- **Layers (simple mental model)**
  - **Web** — HTTP, JSON, status codes, validation at the **boundary**
  - **Service** — **use cases**, transactions, orchestration
  - **Repository** — JPA to PostgreSQL
  - **Domain / entity** — JPA-mapped **entities**; sometimes a separate `domain` package for pure business rules
  - **DTO** — request/response shapes, separate from **entities** (covered in article 14)

**Recommended layout**

```text
com.example.demoservice
  Application.java
  config/           — @Configuration, beans, WebClient, security bits
  web/              — @RestController, exception handlers
  service/          — @Service, interfaces + impls
  repository/       — Spring Data JpaRepository
  model/            — JPA @Entity
  dto/              — request/response records or classes
```

**Minimal example: empty layers as placeholders**

```text
# packages only, classes added in next posts
com.example.demoservice.web.HelloController
com.example.demoservice.service.HelloService
com.example.demoservice.repository.ThingRepository
com.example.demoservice.model.Thing
```

A tiny controller to prove the layout works:

```java
package com.example.demoservice.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {
  @GetMapping("/health")
  public String health() {
    return "ok";
  }
}
```

**`src/main/resources`**

- **`application.yml`** (or `properties`) — one place for datasource URL, JPA, logging, AI keys (later, via env)
- **Optional** `static/` and `templates/` for web UI (we focus on **JSON API** in this series)

**`src/test`**

- Mirror `main` for unit tests. Use `@SpringBootTest` sparingly; prefer **slice** tests and `@WebMvcTest` where possible (later post).

**Common mistakes**

- Putting `Application` in a **subpackage** so that **other** packages are **siblings** and **not** scanned. Fix: `Application` parent package must **cover** all component packages.
- **Fat “util”** packages with **200** mix-and-match static calls—makes **testing** hard. Prefer small **service** classes.
- Exposing **entities** directly in JSON—use **DTOs** (article 14) so API and schema evolve independently.

**Best practices**

- **One** responsibility per class name (`UserController` not `Api`).
- **Interfaces** for services are optional; many teams use **concrete** `@Service` first and extract interfaces when a second **implementation** appears.
- **Keep** `config` small—only cross-cutting things.

**Final summary**

Use a **root** `Application` under `com...project`, then `web`, `service`, `repository`, `model`, `dto`, `config`. The next two articles **configure** the app: **`application.yml`** and **best practices** for that configuration.
