---
title: "application.yml vs application.properties in Spring Boot"
description: "How Spring reads externalized configuration, when to use YAML or properties, and a typical starter application.yml for this series."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Spring Boot
  - application.yml
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 6
---

# application.yml vs application.properties in Spring Boot

**Introduction**

Spring Boot **externalizes** configuration. You can use **`application.properties`** (flat `key=value`) or **`application.yml`** (hierarchical, readable). **Both** work. This series uses **YAML** for **nested** blocks (datasource, JPA, logging) without repeating long prefixes.

**Real-world explanation**

- **Properties** — One line per key. `spring.datasource.url=jdbc:...` is fine for a few lines; it gets long when you add 30 keys.
- **YAML** — Indentation defines **tree** structure. Easy to **read** and **comment**. Watch **indentation** (use spaces, not tabs, per YAML spec).
- **Order of loading** — `application.properties` and `application.yml` in `src/main/resources` both load. **Profile-specific** files `application-dev.yml` **override** base keys when `dev` is active. Same rules apply to `.properties`.

**Step-by-step: one base file**

`src/main/resources/application.yml` (skeleton, filled more in next articles)

```yaml
spring:
  application:
    name: demo-service
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    open-in-view: false
  datasource:
    url: ${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/demo}
    username: ${SPRING_DATASOURCE_USERNAME:demo}
    password: ${SPRING_DATASOURCE_PASSWORD:demo}
server:
  port: 8080
```

**Same in properties (for comparison)**

```properties
spring.application.name=demo-service
spring.jpa.hibernate.ddl-auto=validate
server.port=8080
```

**Why we prefer YAML here**

- Datasource and JPA sit under **`spring`**, easier to **scan** in code review
- You can add **`spring.profiles`**: in YAML you often do **profile-specific** `application-prod.yml` (article 21)

**Common mistakes**

- **Tab** characters in YAML: parsers fail with obscure errors. Use **2 spaces** as team standard.
- **Two** keys for the same thing in two files; **last** loaded wins, which is confusing in debugging.
- Putting **secrets** in the repo. Use **environment** variables: `${VAR:default}` as above.

**Best practices**

- `ddl-auto: validate` or `none` in **production**; `update` is **only** a dev convenience, know the trade-off.
- **Disable** `spring.jpa.open-in-view` in APIs—prevents **lazy** loading surprises in controllers.

**Final summary**

Use **`.yml` or `.properties`**; pick one style per project. This series standardizes on **`application.yml`**, profile files like **`application-dev.yml`**, and **placeholders** for **secrets**. Next: configuration **discipline** beyond syntax.
