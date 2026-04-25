---
title: "Required Spring Boot starters for REST + JPA + PostgreSQL"
description: "Which starters to add in a REST API with PostgreSQL, Lombok, Validation, and DevTools, and what each one brings to the classpath."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Spring Boot
  - dependencies
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 9
---

# Required Spring Boot starters for REST + JPA + PostgreSQL

**Introduction**

In Maven, a **dependency** is a JAR in your build. A **Spring Boot “starter”** is a **pom** that **pulls a bundle** of libraries that work together. This post names the set we use for: **Web**, **JPA** + **PostgreSQL**, **Lombok**, **Bean Validation**, **DevTools**.

**Real-world explanation (each starter)**

| Dependency | What it brings |
|------------|----------------|
| `spring-boot-starter-web` | **Spring MVC**, **Jackson** JSON, **Tomcat** embedded, servlet stack |
| `spring-boot-starter-data-jpa` | **Hibernate** as JPA, **`EntityManager`**, `spring-data-jpa` (repositories) |
| `postgresql` (driver) | **JDBC** driver for `jdbc:postgresql://` URLs |
| `lombok` | Compile-time code generation: `@Data`, `@Builder`, loggers; optional but very common in tutorials and teams |
| `spring-boot-starter-validation` | **Jakarta** Bean Validation 3 (`@NotNull`, etc.) and integration with **Web** |
| `spring-boot-devtools` (optional) | **Restart** in dev, **property** default tweaks; not for **production** classpath |

**`pom.xml` fragment (versions from Boot parent, no manual versions on starters)**

```xml
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
  </dependency>
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
  </dependency>
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
  </dependency>
</dependencies>
```

**Lombok: IDE setup**

- **IntelliJ** — Lombok plugin enabled, **annotation processing** on
- **Eclipse** — Lombok **agent** install; or skip Lombok and write **getters** by hand in learning

**Step-by-step: verify the stack**

1. `mvn dependency:tree` — you should see `hibernate-core`, `jackson-databind`, `tomcat-embed`, `spring-data-jpa` **transitively** under starters.
2. **Run** the app: no entities yet, but Boot should **start** and (if url valid) create a **HikariCP** pool. If the DB is **down**, you will see a **failing** datasource; fix URL first.

**Common mistakes**

- Adding **`hibernate-core` manually** on top of `starter-data-jpa`—**conflicting** version unless you know what you are doing
- **Missing** `validation` starter but using `@Valid` in controllers without understanding that some integration comes from the starter you picked
- Shipping **DevTools** to **production** fat JAR: mark **optional** and do not depend on it in business code

**Best practices**

- Keep the **BOM** parent (`spring-boot-starter-parent`) in charge of **version** for Spring-related deps
- Use **`runtime`** scope for **JDBC** drivers: not needed to **compile** your app code, only to **run**

**Final summary**

You need **web**, **data-jpa**, **validation**, the **PostgreSQL** driver, **Lombok** if you use it, and **devtools** in dev. Next we define **entities** in the JPA model layer.
