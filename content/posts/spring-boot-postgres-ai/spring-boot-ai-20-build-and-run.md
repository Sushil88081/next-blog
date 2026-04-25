---
title: "Build and run a Spring Boot application (Maven/Gradle, JAR, and local run)"
description: "Compile, package a runnable JAR, run it, and use dev-friendly commands so you are not lost on day one of a new project."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Build
  - Spring Boot
  - JAR
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 20
---

# Build and run a Spring Boot application (Maven/Gradle, JAR, and local run)

**Introduction**

A **build** compiles your **.java** files, runs **tests** (if you keep them on), and **packages** a **fat JAR** (executable with dependencies inside). A **run** **starts** the **embedded** **Tomcat** and **wires** your **@SpringBootApplication** **context** — the same on **laptop** and in **many** **cloud** **images**.

**Real-world explanation**

- **CI** (GitHub Actions, Jenkins) runs the **same** **as** you: **mvnw** **package** (or **gradlew** **build**)
- The **JAR** name and **location** is usually `target/… .jar` (Maven) or `build/libs/… .jar` (Gradle) — the **log** on **package** **prints** it
- **Dev** runs: **no** need to repackage for every line change if you use the **plugin** to **recompile** in place or **DevTools** **restart** (covered in **dependencies** **post**)

**Step-by-step: Maven**

From the project root (where `pom.xml` lives):

```bash
./mvnw -q -DskipTests clean package
java -jar target/demoservice-0.0.1-SNAPSHOT.jar
```

Use **`-DskipTests`** only when you are **certain** **tests** are not part of the **change**; for **day-to-day** **quality**, **let** **tests** **run** in **CI** at least.

**Run without packaging (IDE or CLI dev)**

```bash
./mvnw spring-boot:run
```

**Gradle (equivalent)**

```bash
./gradlew build
java -jar build/libs/demoservice-0.0.1-SNAPSHOT.jar

./gradlew bootRun
```

**Common mistakes**

- Running **`java -jar`** from the **wrong** **directory** so the **JAR** path is **not** **found**
- Forgetting to **set** `JAVA_HOME` to a **Java** version your **pom** **declares** (e.g. **17** for Boot 3)
- **Omitting** the **active** **profile** or **env** so the app **points** to **H2** while you **think** you use **Postgres** (see **env** and **profiles**)

**Best practices**

- **Same** **JDK** **version** in **IDE**, **local** **shell**, and **CI** **image**
- **Reproducible** **builds**: use **Wrapper** **scripts** (`mvnw`, `gradlew`) in **git**
- For **local** **Postgres**, keep **docker-compose** (later article) or a **one-line** `createdb` in **project** **README** your team **maintains**

**Final summary**

**Package** a **JAR** once, **java -jar** **anywhere** **Java** **runs**; **`spring-boot:run`** and **`bootRun`** are for **faster** **day-to-day** **turnaround**. Next: **environment** **variables** and **Spring** **profiles** for **clean** **config** **per** **environment**.
