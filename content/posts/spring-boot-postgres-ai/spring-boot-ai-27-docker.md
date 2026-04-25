---
title: "Dockerize Spring Boot and PostgreSQL for a reproducible local stack"
description: "A multi-stage Dockerfile for a lean runtime image, plus docker-compose wiring the app to Postgres with healthchecks and the right environment variables."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Docker
  - Spring Boot
  - PostgreSQL
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 27
---

# Dockerize Spring Boot and PostgreSQL for a reproducible local stack

**Introduction**

**Docker** **packages** your app **as** a **file** you can run **on** a **laptop** or a **build** **agent** **the** same **way**. A **`docker-compose.yml`** starts **Postgres** next to the **JVM** and sets **network** and **env** in **one** command so **onboarding** does **not** need **a** long **“install** **Postgres** on **Mac** with **brew”** runbook. **This** is **rehearsal** for how **most** **clouds** run **containers** too (even if the **orchestrator** is **not** `compose` in **prod**).

**Real-world explanation**

- **Multi-stage** **build**: **stage 1** uses **full** **JDK** + **Maven/Gradle** to **compile**; **stage 2** is **Eclipse** **Temurin** **JRE** **only** + the **fat** **JAR** — **small** **attack** **surface** and **image** size.
- **No** **secret** in **the** **image**; **at** **runtime** the **orchestrator** (compose, **K8s** **secret**) sets **`DB_PASSWORD`**, **`LLM_API_KEY`**, etc.
- **Health** — **`depends_on`** with **`condition: service_healthy`** (Compose v2+) or **a** small **script** that **waits** for **port** 5432 before **JVM** **start**; Spring **also** **retries** the **datasource** if you enable **hikari** + **reconnect** (Boot **defaults** help, but a **ready** **Postgres** is still **cleaner**).

**Step-by-step: `Dockerfile` (Maven example, multi-stage)**

```dockerfile
# --- build
FROM eclipse-temurin:17-jdk AS build
WORKDIR /src
COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src ./src
RUN ./mvnw -q -DskipTests package
# JAR name: adjust to your artifact
RUN cp target/*.jar /app.jar

# --- run
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app.jar app.jar
EXPOSE 8080
USER 65532:65532
ENTRYPOINT ["java","-jar","/app/app.jar"]
```

**`docker-compose.yml` (illustration)**

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: demo
      POSTGRES_USER: demo
      POSTGRES_PASSWORD: demopass
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U demo -d demo"]
      interval: 3s
      timeout: 3s
      retries: 20
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/demo
      SPRING_DATASOURCE_USERNAME: demo
      SPRING_DATASOURCE_PASSWORD: demopass
      LLM_API_KEY: ${LLM_API_KEY} # host injects, never in compose file in git for real
    ports:
      - "8080:8080"
volumes:
  pgdata: {}
```

Run: **`export LLM_API_KEY=...`** on the host, then **`docker compose up --build`**.

**Common mistakes**

- **Building** the **JAR** **on** the **host** and **only** `COPY` **into** an **image** with **a** different **glibc** — use **the** same **base** in **build** and **CI**; **the** **multi**-**stage** **in**-**container** build **avoids** this.
- **Running** **as** **root** **inside** the **container** — the **`USER` **line** above** is a **start**; **K8s** can **further** **tighten**.
- Storing **real** **passwords** in **`docker-compose.yml`** in **a** public **repo**; use **`.env`** (gitignored) and **`env_file`**, or **a** **secret** **store**.

**Best practices**

- **`.dockerignore`**: `target/`, `node_modules/`, `**/.git` so the **context** is **small**
- **JVM** **flags** for **container** **memory** (`-XX:MaxRAMPercentage=75.0` in **Java 17+**) in **an** `ENTRYPOINT` **script** when you **tune** for **K8s** **limits**
- **Same** **JAR** **artifact** **passes** to **K8s**; **only** the **orchestrator** YML **changes**

**Final summary**

**One** `Dockerfile` and **one** `compose` **file** get **a** new **dev** to **`docker compose up`** and **use** the **app** and **DB** together. Next: **where** to **put** the **image** in **“real”** **environments** and what **“deployment** **basics”** means without **picking** one **vendor** **messaging**.
