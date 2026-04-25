---
title: "Spring Boot configuration best practices"
description: "Sensible rules for config files, secrets, feature flags, and 12-factor style for Spring Boot services on the way to production."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Spring Boot
  - configuration
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 7
---

# Spring Boot configuration best practices

**Introduction**

A service that is easy to run **locally**, in **CI**, and in the **cloud** is mostly about **good configuration habits**: what lives in the repo, what is **injected** at deploy time, and what **never** is printed in logs. This post sets habits before we wire **PostgreSQL** and later **AI** keys.

**Real-world explanation**

- **12-factor** style: **config in the environment**, not in the code. Spring maps env vars to relaxed binding: `SPRING_DATASOURCE_URL` → `spring.datasource.url`
- **Profiles** (`dev`, `prod`, `test`) let you **change** a small set of beans or properties without **forking** the codebase.
- **@ConfigurationProperties** (optional) binds a **prefix** to a **typed** Java class—handy for reviewable, validated settings.

**Short example: typed config**

`AppProperties.java` (package `com.example.demoservice.config`):

```java
package com.example.demoservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
    String publicBaseUrl
) { }
```

Enable in a `@Configuration` class: `@EnableConfigurationProperties(AppProperties.class)`.

`application.yml`:

```yaml
app:
  public-base-url: "http://localhost:8080"
```

**Practical rules**

1. **Never** commit real **passwords** or **API** keys. Use **env** or a **secret** store; Spring reads them the same.
2. **Log** the **active profile** and **datasource** host in startup **without** credentials (Boot’s datasource auto-config is careful; you still should not `println` the password).
3. **Default** to **fail** if a required value is **missing** in `prod`—`@Value("${foo}")` with no default will fail fast, which is what you want for critical settings.
4. **Validation** of properties: use `@Validated` + `@NotBlank` on the `@ConfigurationProperties` type when the field must exist in prod.

**Common mistakes**

- **Giant** `application.yml` with 300 lines: split by `spring.config.import` (Boot 2.4+) or profile files
- `ddl-auto: update` in **production** without a **migration** strategy
- Relying on `localhost` in **default** yml and forgetting to **override** in **staging**—treat `localhost` as a **dev-only** default

**Best practices**

- One **name** for the app: `spring.application.name` (helps in logs, tracing later)
- **JPA** logging: in dev, `org.hibernate.SQL` to **DEBUG** temporarily; in prod, **not** in steady state
- **Feature flags** for **AI** routes: simple `app.ai.enabled: false` in prod until ready (covered in AI posts)

**Final summary**

**Externalize** secrets, **name** your application, use **profiles**, avoid dangerous **DDL** defaults, and type **frequent** settings. Next article: run **PostgreSQL** locally and point Boot at it.
