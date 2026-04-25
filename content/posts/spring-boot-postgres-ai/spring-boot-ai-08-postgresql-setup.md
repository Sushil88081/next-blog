---
title: "PostgreSQL setup for Spring Boot (local and Docker)"
description: "Install or run PostgreSQL, create a database and user, and verify connectivity before Spring Data JPA talks to it."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - PostgreSQL
  - Spring Boot
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 8
---

# PostgreSQL setup for Spring Boot (local and Docker)

**Introduction**

**Spring Data JPA** (with Hibernate) needs a real **JDBC** database. This series uses **PostgreSQL**. This post is only about the **database** side: a running server, a **database** name, a **user** with a password, and a quick **psql** check. Your Boot app is wired in the **next** dependency post.

**Real-world explanation**

PostgreSQL is a **separate** process. Boot does **not** “install” the database for you in production. Locally you can use: native install, **Docker**, or a small cloud instance. The **JDBC URL** form is:

`jdbc:postgresql://HOST:PORT/DB_NAME`

**Option A: Docker (repeatable, common on dev machines)**

`docker-compose.yml` (we expand this in article 27):

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: demo
      POSTGRES_USER: demo
      POSTGRES_PASSWORD: demo
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata: {}
```

Run: `docker compose up -d`

**Option B: local server**

Use your OS package or the official installer. **Create** database and user if not done by the installer (examples vary; use your admin tool or `psql` as the superuser).

**Verify with psql**

```bash
psql "postgresql://demo:demo@localhost:5432/demo" -c "SELECT 1"
```

**Spring Boot will use (in `application.yml`)**

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/demo
    username: demo
    password: demo
  jpa:
    hibernate:
      ddl-auto: validate
```

- **`validate`**: Hibernate checks **schema** against entities at startup, **no** table creation. Good when you will add **Flyway** (optional later) or when schema is pre-created. For a **blank** first run while learning, you can temporarily set `update` in **dev** only, then return to a migration approach.

**Common mistakes**

- **No server listening** on 5432 but Boot log says `Connection refused`—start Docker or the service
- **Wrong** password in yml; Spring fails at startup
- **Using** the **postgres** superuser** for the app in production—**least privilege** user per application database

**Best practices**

- **One** app database per app in shared clusters
- **Version** your schema with **migrations** before production; avoid relying on `ddl-auto: update` there

**Final summary**

Run PostgreSQL, know **JDBC** URL, **user**, and **password**. `SELECT 1` must work from `psql`. The next post lists **dependencies** in Maven to connect Boot to this database.
