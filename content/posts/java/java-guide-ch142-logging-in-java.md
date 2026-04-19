---
title: "Chapter 142: Logging in Java — SLF4J, Logback, Levels, and Structured Fields"
description: "Log effectively in Java services: SLF4J facades, Logback configuration, log levels, correlation IDs, MDC, JSON logs for aggregation, and what never to log (passwords, tokens, full PII)."
category: "Java"
tags:
  - Java SLF4J logging
  - Java Logback configuration
  - Java structured logging JSON
  - Java MDC correlation id
  - Java log levels best practices
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 142
---

# Chapter 142: Logging in Java

**Logging** is your **flight recorder**: **timestamps**, **severity**, **context**, and **enough** **detail** to **reconstruct** **failures** without **drowning** **operators** in **noise**. **SLF4J** is the **common API**; **Logback** or **Log4j2** sits **behind** it as the **implementation** in **most** **Spring Boot** apps.

---

## 1. Topic title

**Logging: choose level, add correlation, ship machine-parseable lines to your log stack**

---

## 2. What it means

**Levels** — **`ERROR`** (**fix now**), **`WARN`** (**degraded**), **`INFO`** (**lifecycle**), **`DEBUG`** (**dev detail**), **`TRACE`** (**very chatty**).

**`MDC`** (**Mapped Diagnostic Context**) — **thread-local** **map** for **`requestId`**, **`userId`**—**auto-appended** by **appenders** when **configured**.

**Structured JSON** — one **JSON object** per **line**—**Elasticsearch**, **Loki**, **CloudWatch** **parse** **reliably**.

---

## 3. Why it is used

**Post-mortems** without **SSH** **guesswork**.

**Alerting** on **`ERROR` rate** or **missing** **`heartbeat`** **logs**.

---

## 4. Mental sketch

**`println`** is **shouting** in a **crowded** **room**. **Logging** is **radio** **call signs** with **frequency** **discipline**—**dispatch** hears **you** when **it matters**.

---

## 5. Java code example

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogDemo {
    private static final Logger log = LoggerFactory.getLogger(LogDemo.class);

    public static void main(String[] args) {
        log.info("starting demo");
        try {
            int x = 1 / 0;
        } catch (ArithmeticException ex) {
            log.error("math failed", ex);
        }
    }
}
```

**Pass the throwable** as the **last argument**—**stack traces** land in **appenders** **correctly**.

---

## 6. Explanation of code

**`{}` placeholders** defer **`toString()`** until the **level** is **enabled**—**cheaper** than **string concat** for **`DEBUG`** **guarded** paths.

---

## 7. Common mistakes

**Logging secrets**—**Authorization** headers, **SQL** with **raw passwords**, **JWT** **bodies**.

**`INFO` spam** in **hot loops**—**disk** and **cost** **burn**.

---

## 8. Best practices

**One line per event** in **JSON** pipelines; **multi-line** only for **stack traces** with **escape** **rules** **understood** by **your** **collector**.

**Sample** **`DEBUG`** in **prod** for **subset** of **traffic** when **needed**.

---

## 9. Small practice task

Add **`MDC.put("requestId", UUID.randomUUID().toString())`** at **filter** **entry** and **`MDC.clear()`** in **`finally`**—confirm **IDs** appear in **Logback** **pattern**.

---

## Beginner tip

If logs **disappear** in **Docker**, **stdout** is **correct**—**collect** from the **runtime**, not **only** **files** **inside** the **container**.
