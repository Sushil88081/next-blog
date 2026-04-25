---
title: "Environment variables and Spring profiles for real deployments"
description: "Keep secrets and environment-specific values out of source, use application-{profile}, and override with env vars the platform provides."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Configuration
  - Profiles
  - Spring Boot
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 21
---

# Environment variables and Spring profiles for real deployments

**Introduction**

**Local**, **staging**, and **production** do not share the same **database** **URL** or **API** **keys**. **Spring** **profiles** (e.g. `dev`, `prod`) select **overlays** like **`application-prod.yml`**, while **environment** **variables** and **placeholders** supply **values** the **orchestrator** **sets** (Docker, **Kubernetes**, **PaaS**), **not** the **code** **author**.

**Real-world explanation**

- **`${VAR:default}`** in `application.yml` **reads** **VAR**; **if** **missing**, **use** `default` for **dev** only
- **Profile** `spring.profiles.active=prod` (env **or** **JVM** **flag**)
- **Secrets** — never commit **OpenAI** keys or **DB** **passwords**; **reference** by **name** only: `api.openai.key` **from** **`OPENAI_API_KEY`**

**Step-by-step: `application.yml` (sketch)**

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/demo}
    username: ${DB_USER:demo}
    password: ${DB_PASSWORD:demo}
  jpa:
    hibernate:
      ddl-auto: ${JPA_DDL:validate}
```

**Profile-specific: `application-prod.yml`**

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: validate
logging:
  level:
    root: WARN
```

**`application-dev.yml`**

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: update
logging:
  level:
    org.springframework.web: DEBUG
```

**Activate**

- **IDE**: Run **configuration** with **active** **profiles** `dev`
- **Shell**: `export SPRING_PROFILES_ACTIVE=dev` (or `prod` on a **server**)
- **JAR**: `java -jar app.jar --spring.profiles.active=prod`

**AI key (for later article)**

```yaml
app:
  ai:
    openai:
      base-url: ${OPENAI_BASE_URL:https://api.openai.com}
      api-key: ${OPENAI_API_KEY:}
```

If **`OPENAI_API_KEY`** is **empty** in **prod**, **fail** **fast** in **@PostConstruct** or **ConditionalOnProperty** so the app **does** not **start** without **secrets** **when** the **feature** is **enabled**.

**Common mistakes**

- **Hardcoding** **passwords** in `application.yml` **in** **git** **history** — they **are** then **leaked** **forever**
- **Forgetting** that some **PaaS** set **`PORT`**, **not** **8080** — use **`${PORT:8080}`** in **`server.port`** for **port** **binding** **if** the **platform** **uses** that **convention** (e.g. **Heroku**-style, **varies** by **provider**)
- **Mixing** `SPRING_CONFIG_LOCATION` and **default** **search** **order** and **wondering** which **file** **wins** — read **“Externalized Configuration”** in **Spring** **docs** when **you** go **off** **the** **default** path

**Best practices**

- **`validate`** (or **Flyway**/**Liquibase** migrations) in **prod** for **schema** **control**
- **12-factor** app style: **config** in **the** **environment**; **code** does **not** know **if** it is “**Azure**” or “**laptop**”
- **Separate** **logging** **and** **metrics** **sinks** by **profile** (JSON logs in **prod**)

**Final summary**

**Profiles** pick **which** **YAML** **applies**; **env** **vars** provide **data** the **app** should **not** own. Next: what an **“AI** **agent**”** means in a **web** **backend** **context**.
