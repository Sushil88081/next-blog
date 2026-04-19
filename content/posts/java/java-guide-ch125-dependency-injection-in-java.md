---
title: "Chapter 125: Dependency Injection in Java — IoC Container, Constructor Injection, and @Bean"
description: "Understand Spring dependency injection: Inversion of Control, singleton-scoped beans by default, constructor injection over field injection, @Configuration classes, and conditional beans."
category: "Java"
tags:
  - Java Spring dependency injection
  - Java constructor injection Spring
  - Spring IoC container
  - Java Configuration Bean Spring
  - Spring Autowired constructor
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 125
---

# Chapter 125: Dependency Injection in Java

**Dependency injection** (**DI**) means **objects do not `new` their collaborators**—the **Spring IoC container** **constructs** **graphs** of **beans**, **wires** **interfaces** to **implementations**, and **honors** **scopes** (**singleton**, **prototype**, **request**, …).

**Inversion of Control** is the **bigger** idea: **framework** **calls** **your** code at **lifecycle** points instead of **`main`** **orchestrating** **everything** **imperatively**.

---

## 1. Topic title

**DI: declare dependencies; Spring resolves implementations and manages lifecycles**

---

## 2. What it means

**`@Component`**, **`@Service`**, **`@Repository`**, **`@Controller`** mark **classes** the **component scan** should **register**.

**Constructor injection** — **`public OrderService(OrderRepository repo, PaymentClient pay)`**—**immutable**, **test-friendly**, **required** **dependencies** **obvious**.

**`@Bean` methods** in **`@Configuration`** classes **produce** **third-party** objects (**`RestTemplate`**, **`ObjectMapper`** tweaks) you **do not** **own** the **source** of.

---

## 3. Why it is used

**Swap implementations** (**fake** **repositories** in **tests**, **real** in **prod**) **without** **subclassing**.

**Cross-cutting** concerns—**transactions**, **security**, **metrics**—attach via **proxies** around **your** **beans**.

---

## 4. Mental sketch

Without **DI**, each **object** **orders its own supplies** by **phone**—**chaos** when **vendors** **change**. With **DI**, a **central** **procurement** desk (**container**) **delivers** the **right** **parts** to **each** **desk** on **Monday morning**.

---

## 5. Java code example

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class HttpClientsConfig {

    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

**`RestTemplate`** is **legacy** for **new** code—**`RestClient`** / **`WebClient`** are **modern** alternatives—but **`@Bean`** **pattern** stays the **same**.

---

## 6. Explanation of code

**`@Configuration`** classes are **processed** at **startup**; **`@Bean` return values** become **singletons** unless **scoped** otherwise.

---

## 7. Common mistakes

**Field `@Autowired`** on **required** **dependencies**—**hides** **non-final** state, complicates **unit tests** that **forget** **reflection** **magic**.

**Circular dependencies**—**constructor** cycles **fail fast** at **startup**—**good**; **fix** by **extracting** a **third** **bean** or **rethinking** **boundaries**.

---

## 8. Best practices

Prefer **`interface` + `final` implementation`** pairs when **multiple** **implementations** are **plausible** (**payments**, **feature flags**).

Use **`@Configuration(proxyBeanMethods = false)`** when you **do not** need **`@Bean` inter-method** **calls**—**faster** startup on **large** apps.

---

## 9. Small practice task

Define **`interface Clock { Instant now(); }`** with **`@Bean Clock systemUtcClock()`** returning **`Instant::now`** wrapper—**inject** **`Clock`** into a **service** and **unit-test** with **fixed** **time**.

---

## Beginner tip

If **startup** logs show **“consider defining a bean of type X”**, read the **bottom** of the **stack**—the **missing** **type** is **almost always** a **typo** in **constructor** **parameter** **types** or **missing** **`@Service`** **annotation**.
