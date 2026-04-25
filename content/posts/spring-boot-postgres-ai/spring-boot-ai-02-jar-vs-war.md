---
title: "JAR vs WAR in Java and Spring Boot"
description: "When you build a Java app you get a JAR or a WAR. This post explains the difference, what Spring Boot prefers, and what that means for you day to day."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - JAR
  - WAR
  - Spring Boot
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 2
---

# JAR vs WAR in Java and Spring Boot

**Introduction**

Build tools (Maven, Gradle) produce **artifacts**—files you deploy or run. The two you hear most are **JAR** (Java ARchive) and **WAR** (Web Application aRchive). Spring Boot is famous for a **runnable JAR** with a server **inside** it. This post keeps the distinction clear so the rest of the series makes sense.

**Real-world explanation**

- **JAR** — A **zip** layout with `META-INF/MANIFEST.MF`, compiled `.class` files, and other resources. It can be a **library** (no `main`, something else depends on it) or an **application** (has `Main-Class` in the manifest, or you run a known class). With Spring Boot, the **default** is a “fat” or “executable” JAR: your code plus **most** third-party jars **nested** inside, plus a **loader** that runs it all with one `java -jar` command.
- **WAR** — Also a **zip** layout, but with **`WEB-INF/`**, `web.xml` (or Servlet 3+ annotations), and a layout **expected** by a **servlet container** (Tomcat, Jetty) when you **deploy the file into that container**. The container owns the process; your app is a **child** in that world.

**Spring Boot and JAR (default path)**

`spring-boot-maven-plugin` (or the Gradle plugin) can **repackage** your build into an executable JAR that:
- Puts the **embeddable** Tomcat (or other) and Spring libraries **inside** the JAR
- Sets `Main-Class` to `org.springframework.boot.loader.launch.JarLauncher` (in Boot 3.x naming)

You run: `java -jar target/myapp-0.0.1-SNAPSHOT.jar`

**Spring Boot and WAR (optional path)**

If your organization **only** allows deployment as WARs into a **shared** Tomcat, you can:
- Set `<packaging>war</packaging>` in Maven
- Extend `SpringBootServletInitializer`
- Do **not** embed Tomcat in the WAR the same way, or mark Tomcat as `provided`

That path is more common in **older** org standards. For **new** services and for **this series**, we stay on **executable JAR + containers** (Docker later).

**Step-by-step: see what the Boot plugin does (Maven sketch)**

`pom.xml` usually includes:

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

After `mvn package`, look under `target/`: the **large** JAR (often `*-0.0.1-SNAPSHOT.jar`) is the one you run. A smaller `.jar.original` may be the pre-repackage jar (implementation detail; rely on the runnable one).

**Common mistakes**

- Thinking a **WAR** is “more production.” Many teams run **Boot JARs in Docker**; what matters is how you **build**, **scan**, and **roll out**, not the three letters.
- **Double** embedding a server: if you use **WAR + external Tomcat**, you must not also bundle the **same** embedded server without understanding `provided` scope.
- Forgetting the **JAR** must be run with a **JRE** that **matches** your build’s `--release` or `target` (for example, Java 21 class files need Java 21 to run).

**Best practices**

- For learning and for **most** new APIs: **executable JAR** + `java -jar` (or a container with the same JAR as `CMD`).
- Keep **one** way to start the app in a team: document `java -jar ...` and the **profile** in `SPRING_PROFILES_ACTIVE`.

**Final summary**

A **JAR** is the normal Spring Boot **delivery** format: one file, embedded server, `java -jar`. A **WAR** is for **servlet** containers that **host** the app; useful when standards require it, not because it is “better.” The next article compares **build tools** (Maven and Gradle) we use to produce that JAR.
