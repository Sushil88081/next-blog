---
title: "Testing your Spring REST API with Postman (or a similar client)"
description: "Send requests, save a collection, pass variables, and read responses so you can verify behavior before a frontend or mobile app exists."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - Postman
  - Spring Boot
  - API testing
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 19
---

# Testing your Spring REST API with Postman (or a similar client)

**Introduction**

**Postman** (and **Insomnia**, **Bruno**, **HTTPie**, **IntelliJ HTTP** files) helps you call **HTTP** while the app runs locally. You **document** a **flow**: health check → create item → list with **page** → get by id → update → delete. **Collections** and **environments** keep **base URL** and **auth** in one place.

**Real-world explanation**

- **Base URL** — `http://localhost:8080` in dev; switch **environment** for **staging**
- **Variables** — `{{baseUrl}}` and `{{itemId}}` set from a **Test** **script** after create
- **Pre-request** — optional **header** (e.g. `Authorization`) when you add **security** later
- **Assertions** — in Postman **Tests** tab: expect **status** 201, **json** has **id**

**Step-by-step: a minimal runbook**

1. **Start** the app (see the **build and run** article) and **PostgreSQL** (or H2 in memory if you are only experimenting).
2. **Create** a new **Request**: **POST** `{{baseUrl}}/api/items`  
   - **Headers:** `Content-Type: application/json`  
   - **Body** (raw): `{ "name": "Alpha" }`  
   - Expect **201** and a body with `id` and `name`.
3. **List** with paging: **GET** `{{baseUrl}}/api/items?page=0&size=5&sort=name` — check **200** and **paged** **shape** if you implemented the previous article.
4. **GET** by id: **GET** `{{baseUrl}}/api/items/1` — expect **200** or **404** (your **global** **handler** should be **clear**).
5. **PUT** update: same URL with body `{ "name": "Alpha renamed" }`.
6. **DELETE** and then **GET** again to confirm **404** or your chosen behavior.

**Exporting**

- **Export** the **Collection** to JSON and commit it under **`docs/postman/`** in the repo if the team **wants** a **shared** runbook (optional, team choice).

**Common mistakes**

- Hitting the **wrong** **port** or **forgot** **context** **path** (`/api/...` vs no prefix)
- **Form** key-value body instead of **raw** **JSON** for `application/json` endpoints
- **Ignoring** **validation** **errors** — look at the **400** **body** from your **@ControllerAdvice**
- Storing **secrets** in a **public** **collection** — use **environments** and **.gitignore** for **local** only

**Best practices**

- One **request** per **user** **story** (create, list, get, update, delete) in **order**
- **Name** **requests** like the **test** you would **code** in **JUnit** later: “create returns 201 with id”
- For **automation** at scale, add **@SpringBootTest** with **Testcontainers**; Postman is great for **manual** **exploration** and **onboarding** **new** **developers**

**Final summary**

**Postman** is your **click-through** **proof** that the **server** and **DB** do what the **client** will need. Next: **build** and **run** the **JAR** **on** **your** **machine**.
