---
title: "Chapter 118: What is Spring Boot? in Java — Convention, Starters, and the Embedded Server"
description: "Understand Spring Boot: opinionated configuration on Spring Framework, starters and auto-configuration, fat JARs with embedded servers, actuator hooks, and when Boot is the right default for Java services."
category: "Java"
tags:
  - Java Spring Boot introduction
  - what is Spring Boot
  - Spring Boot auto configuration
  - Spring Boot embedded server
  - Java Spring Boot vs Spring Framework
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 118
---

# Chapter 118: What is Spring Boot? in Java

**Spring Boot** is an **opinionated layer** on top of the **Spring Framework**: it **auto-wires** common **beans**, **embeds** an **HTTP server** (**Tomcat** by default), and ships **“starter”** dependencies that **pull coordinated** **versions** so **`pom.xml`** / **`build.gradle`** stays **small** at first.

You still write **plain Java**—**`@Configuration`**, **`@Bean`**, **`@Component`**—but **Boot** tries **sensible defaults** so a **`main`** method plus **`SpringApplication.run`** gets you to **`http://localhost:8080`** quickly.

---

## 1. Topic title

**Spring Boot: production-ready defaults + escape hatches when you outgrow the defaults**

---

## 2. What it means

**Spring Framework** — **IoC container**, **AOP**, **transaction** abstraction, **data access** helpers.

**Spring Boot** — **starters** (**`spring-boot-starter-web`**), **`application.properties`/`yaml`**, **`@SpringBootApplication`**, **Actuator** endpoints, **fat JAR** layout.

**Embedded server** — **no** separate **WAR deploy** step for **learning**; **same** code can still **deploy** to **containers** and **cloud** **runtimes**.

---

## 3. Why it is used

**Team velocity** — **new service** skeleton in **minutes** with **tests**, **metrics**, and **health** **patterns** **aligned** across **repos**.

**Ecosystem** — **Spring Data**, **Security**, **Cloud** integrate with **predictable** **versions**.

---

## 4. Mental sketch

If **Spring Framework** is a **box of LEGO**, **Spring Boot** is the **printed instructions** for **“build a race car”**—you **may** **swap** **wheels** later, but you **start** **rolling** without **counting** every **stud** first.

---

## 5. Java code example

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @RestController
    static class Hello {
        @GetMapping("/")
        String home() {
            return "Boot is up";
        }
    }
}
```

This **fits** one file for **reading**; **real** projects **split** **controllers** into **their own** types (Chapters 119–120).

---

## 6. Explanation of code

**`@SpringBootApplication`** bundles **`@Configuration`**, **`@EnableAutoConfiguration`**, and **`@ComponentScan`** for the **package** of the **application class**.

**`SpringApplication.run`** starts the **context**, **Tomcat**, and **blocks** until **shutdown** (unless **reactive** / **custom** **lifecycle**).

---

## 7. Common mistakes

**Treating magic as law** — when **auto-config** guesses wrong, **read** **condition reports** (**`--debug`**) and **override** **explicitly**.

**Giant single class** — **works** for **tutorials**, **scales** poorly—**split** early (Chapter 119).

---

## 8. Best practices

Keep **Spring Boot** **version** aligned with **your** **JDK** LTS choice—**release notes** mention **baseline** bumps.

**Pin** **parent BOM** (**`spring-boot-dependencies`**) and **avoid** **random** **library** **version** **sprawl**.

---

## 9. Small practice task

Generate a project at **start.spring.io** with **Web** only—run **`./mvnw spring-boot:run`** or **`./gradlew bootRun`** and **`curl localhost:8080`** after adding a **`@RestController`** like above.

---

## Beginner tip

**“Spring vs Spring Boot”** interview question: **Spring** is the **engine**; **Boot** is the **car around it** with **dashboard lights** (**Actuator**) and a **keyless start** (**auto-configuration**).
