---
title: "What is Spring Boot and why teams use it"
description: "A friendly introduction to Spring Boot: what problem it solves, how it fits on top of Spring Framework, and why it is the default choice for new Java services."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Spring Boot
  - Java backend
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 1
---

# What is Spring Boot and why teams use it

**Introduction**

If you are learning Java for backend work, you will keep seeing **Spring Boot**. It is not a new language. It is a set of **tools and conventions** built on top of the **Spring Framework** so you can start a service quickly and still grow it in production. This post opens our series: we will later wire **REST APIs**, **PostgreSQL**, and an **AI-facing HTTP API** in the same style teams use in real projects.

**Real-world explanation**

Most companies that ship **HTTP APIs in Java** use Spring in some form. Plain **Spring Framework** gives you powerful building blocks: dependency injection, transactions, integration with databases. The cost is **configuration**—which beans exist, which XML or Java config wires them, which version of a library works with which other. **Spring Boot** flips the default: it **auto-configures** a lot of that when it sees your classpath (for example, if you add a web starter, it sets up an embedded **Tomcat** and Spring MVC). You override only what you need. The result: a small `main` method and a `pom.xml` (or Gradle) with **starters** that line up **compatible versions** for you.

**Step-by-step**

1. You write a normal Java application with a `public static void main`.
2. You add `@SpringBootApplication` on a class. That is a convenience annotation that **enables** component scanning, configuration, and auto-configuration.
3. You add **starters** like `spring-boot-starter-web` so HTTP endpoints work without manual servlet setup.
4. You run a **single executable JAR** (covered in the next post in detail). The JAR can contain an **embedded** web server, so you do not need to deploy a WAR to an external app server to start learning (production often still uses containers, which we do later in this series).

**Example: smallest Boot app (one file is fine for learning; split by package in real repos)**

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class Application {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }
}

@RestController
class HelloController {
  @GetMapping("/api/health")
  public String health() {
    return "ok";
  }
}
```

`SpringApplication.run` **bootstraps** the **ApplicationContext** (the Spring “container” of beans), **starts** the web server, and **listens** on a port (default 8080).

**Folder structure (for later posts)**

For this series we will use something like:

```text
src/main/java/com/example/demoservice/
  Application.java
  config/
  domain/
  repository/
  service/
  web/
src/main/resources/
  application.yml
  application-dev.yml
src/test/java/
pom.xml or build.gradle
```

**Common mistakes**

- **Confusing Spring and Spring Boot.** Spring is the ecosystem; Boot is a **convention** layer and auto-configuration, not a replacement for understanding beans and dependency injection.
- **Treating `application.yml` as magic.** Auto-configuration is driven by what is on the classpath and what you configure; if something is wrong, the fix is still “correct dependency + correct property.”
- **Skipping the embedded server model.** In Boot you run `java -jar app.jar` for many deployments; the mental model is different from “drop WAR in Tomcat” school tutorials.

**Best practices**

- Start from **Spring Initializr** (covered in article 4) so dependencies match.
- **One executable application class** with `@SpringBootApplication` in the **root package** of your main code, so component scanning is predictable.
- **Pin** a Java LTS in your build (17 or 21) for stability across this series and jobs.

**Final summary**

Spring Boot exists to **reduce** boilerplate and **align** library versions for Java services. It sits on the Spring stack, uses **starters** and **auto-configuration**, and usually ships as a **fat JAR** with an embedded server. The rest of this series builds a **REST + PostgreSQL** service and then adds an **AI chat** surface—using the same Boot habits you will see at work.
