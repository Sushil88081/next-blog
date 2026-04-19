---
title: "Chapter 119: Spring Boot Project Structure in Java — Packages, Layers on Disk, and Test Layout"
description: "Lay out a Spring Boot project: groupId and base package, main application class, resources vs java sources, application.yaml, static and templates, and mirror packages in src/test/java."
category: "Java"
tags:
  - Java Spring Boot project structure
  - Spring Boot package layout
  - Spring Boot application yaml
  - Spring Boot src main java
  - Spring Boot test layout
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 119
---

# Chapter 119: Spring Boot Project Structure in Java

A **consistent folder story** matters more than **any one “official” tree**—teams pick a **root package** (**`com.example.app`**) and place **`DemoApplication`** one level below so **`@ComponentScan`** covers **`com.example.app.*`** without scanning the **whole internet**.

**Maven** and **Gradle** both use **`src/main/java`**, **`src/main/resources`**, **`src/test/java`**, **`src/test/resources`**—**Boot** adds **`application.properties`** / **`application.yaml`** under **`resources`**.

---

## 1. Topic title

**Structure: mirror architecture in packages; keep configuration near resources, not scattered**

---

## 2. What it means

Typical **layers as packages** (names vary):

- **`…web` or `…api`** — **controllers** (Chapter 120)
- **`…service`** — **use cases** (Chapter 121)
- **`…repository` or `…persistence`** — **data access** (Chapter 122)
- **`…domain` or `…model`** — **entities**, **value types** (Chapters 123–124)

**`resources/static`** — **CSS/JS** served at **`/`** by default; **`templates`** for **Thymeleaf** if you render **HTML**.

---

## 3. Why it is used

**Onboarding** — **new** hires **guess** where **code** lives.

**Build caching** — **stable** **module** boundaries speed **CI** when you **split** **later**.

---

## 4. Mental sketch

**Packages** are **aisles** in a **supermarket**—**controllers** near the **front door**, **repositories** near the **loading dock** (**database**), **services** in the **middle** so **neither** **aisle** **talks across** the **whole store** **directly**.

---

## 5. Java code example

```text
src/main/java/com/example/demo/DemoApplication.java
src/main/java/com/example/demo/web/HelloController.java
src/main/java/com/example/demo/service/GreetingService.java
src/main/resources/application.yaml
src/test/java/com/example/demo/DemoApplicationTests.java
```

**`DemoApplicationTests`** with **`@SpringBootTest`** proves the **context** **loads**—your **first** **safety net**.

---

## 6. Explanation of code

**`application.yaml`** centralizes **server.port**, **logging.level**, **datasource** URLs—**profiles** (**`application-dev.yaml`**) override **per environment**.

---

## 7. Common mistakes

**Flat package** with **fifty** classes—**navigation** pain; **subpackages** cost **nothing**.

**Committing secrets** in **`application.yaml`**—use **env vars** or **secret managers** (**`${DB_PASSWORD}`** style placeholders).

---

## 8. Best practices

Match **`groupId`** and **root package** to reduce **confusion** in **imports**.

Add **`README`** with **one** command to **run** and **one** to **test**—**Boot** makes this **cheap** kindness.

---

## 9. Small practice task

Create **`src/main/resources/static/index.html`** with a **single** **heading**—hit **`http://localhost:8080/index.html`** and confirm **static** **serving** **without** a **controller**.

---

## Beginner tip

If your **IDE** shows **two** **`DemoApplication`** classes, you **merged** **wrong** **branches**—**delete** **duplicates** before **annotations** **fight** over **beans**.
