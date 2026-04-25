---
title: "What is an “AI agent” in a Spring Boot backend (plain English)"
description: "Agent means the system can take a goal, call tools, and use a model in a loop—here we start with a single request–response chat as the foundation."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - AI
  - Spring Boot
  - Architecture
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 22
---

# What is an “AI agent” in a Spring Boot backend (plain English)

**Introduction**

People use **“agent”** in two **ways**. In **marketing** it is anything with a **model** inside. In **software** it often means: **(1)** a **model** that can **use** **tools** (search, database, HTTP) in a **loop** until a **task** is **done**; **(2)** a **stateful** **session** that **remembers** **turns** and **context**. Your **Spring** app is the **orchestrator**: it **validates** **input**, **calls** the **model** **API**, **enforces** **auth** and **quotas**, and **persists** **history** in **PostgreSQL** (next posts).

**Real-world explanation**

- **Stateless** **HTTP** from the **client**; **state** lives in **Postgres** (or **cache**) **on** the **server**
- **The** **model** is **not** in your **JVM** (unless you **self-host** with **Ollama** or **local** **GPU**); you **call** a **remote** **HTTP** **API** and **treat** it like **any** **external** **dependency**
- **Risks** — **PII** in **prompts**, **prompt** **injection** from **users** **sneaking** **“ignore** **earlier** **rules**” text, and **cost** per **token**; you add **rate** **limits**, **redaction**, and **logging** **policy** over time (production topics)

**Step-by-step: mental model in one diagram (conceptual)**

```text
Client  →  Spring (@RestController)  →  ChatService
                      ↓
              AI provider HTTP API (e.g. OpenAI-compatible)
                      ↓
              response text + optional tool calls (advanced)
```

For this **series**, the **“agent”** **grows** from: **(a)** a **POST** that returns the **model** **reply**, to **(b)** **saved** **history** in the **DB**, to **(c)** optional **tool** use if you add **function** **calling** later (out of **scope** for a **first** **course**).

**Folder structure (later in the same project)**

```text
web/ChatController.java
service/ChatService.java
client/OpenAiClient.java  (or Spring AI abstractions)
model/ChatMessage.java, ChatSession.java
```

**Common mistakes**

- Storing **API** **keys** in **the** **repo** or **logging** **full** **prompts** in **plain** text in **prod**
- Treating **model** **output** as **authoritative** **fact** for **medical** or **financial** **decisions** without **human** **review** where **required** by **policy**
- **Blocking** **all** **Tomcat** **threads** on **very** **slow** **LLM** **calls** at **high** **QPS** — for **serious** **load**, you **asynchronous** and **backpressure** (advanced)

**Best practices**

- **Timeouts** and **retries** with **jitter** on the **AI** **HTTP** **client**; **fail** **open** or **closed** by **product** **choice**
- **Redact** **or** **hash** **sensitive** **user** text before **sending** to a **third** **party** if **compliance** **requires** it
- **Version** your **prompts** in **code** (or **config** **flags**) so you can **reproduce** **regressions**

**Final summary**

**Agent** in **this** **project** = **orchestrated** **LLM** **access** with **persistence** and **clear** **APIs**. **Next** we add a **Chat** **HTTP** **endpoint** and **then** connect it to a **model** with **config**-driven **credentials**.
