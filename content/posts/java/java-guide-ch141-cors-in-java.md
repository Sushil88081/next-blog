---
title: "Chapter 141: CORS in Java — Preflight, Allowed Origins, and Spring WebMvcConfigurer"
description: "Configure CORS for Java REST APIs: browser same-origin policy, preflight OPTIONS, Access-Control-* headers, credentials mode, and safe Spring Boot patterns with allowCredentials and explicit origins."
category: "Java"
tags:
  - Java CORS Spring Boot
  - Java WebMvcConfigurer CORS
  - Java CORS preflight OPTIONS
  - Java Access-Control-Allow-Origin
  - Java CORS credentials cookies
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 141
---

# Chapter 141: CORS in Java

**CORS** (**Cross-Origin Resource Sharing**) is a **browser** mechanism: **scripts** on **`https://app.example`** may **not** **read** **responses** from **`https://api.example`** unless the **API** **opts in** with **`Access-Control-*`** **headers**. **Servers** still **receive** **cross-site** **requests**—**CORS** is **not** a **firewall** for **curl** or **server-side** **callers**.

**Spring MVC** exposes **`CorsRegistry`** via **`WebMvcConfigurer.addCorsMappings`** or **`@CrossOrigin`** on **controllers**.

---

## 1. Topic title

**CORS: explicit permission for browsers to read cross-origin responses your API approves**

---

## 2. What it means

**Simple requests** — certain **methods**, **headers**, and **content types**—may skip **preflight**.

**Preflight** — **`OPTIONS`** with **`Access-Control-Request-Method`**—**server** answers **allowed** **verbs** and **headers**.

**`Access-Control-Allow-Credentials: true`** pairs with **`Allow-Origin` ≠ `*`**—**browsers** **reject** **wildcard** **with** **cookies**.

---

## 3. Why it is used

**SPAs** on **static** **hosts** calling **separate** **API** **domains**—**daily** **need**.

**Developer ergonomics**—**wrong CORS** looks like **“network error”** in **DevTools**—**know** the **symptoms**.

---

## 4. Mental sketch

**Same-origin policy** is **tinted car windows**—you **can** **wave** (**send** **request**) but **cannot** **see inside** (**read** **response**) unless **owner** (**API**) **rolls down** **specific** **windows** (**CORS** **headers**).

---

## 5. Java code example

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("https://app.example")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

**Replace** **`allowedOrigins`** with **environment-specific** **lists**—**never** **copy** **`*`** **with** **`allowCredentials(true)`**.

---

## 6. Explanation of code

**`addMapping`** scopes **which** **URLs** **participate**—**tighten** beyond **`/**`** when **possible**.

---

## 7. Common mistakes

**Disabling CORS “temporarily” in prod** with **`allowedOriginPatterns("*")`**—**opens** **browser-readable** **responses** **globally**.

**Forgetting** the **`Authorization`** header in **`allowedHeaders`** when using **Bearer** tokens—**preflight** failures often look like **opaque** **network** errors in the browser.

---

## 8. Best practices

**Mirror** **CORS** rules at **API gateway** and **app** **only** when **both** **exist**—**avoid** **contradictions**.

**Prefer** **same-site** **cookies** + **CSRF** **defenses** when **architecture** allows—**CORS** + **Bearer** is **not** **automatically** **easier**.

---

## 9. Small practice task

Open **DevTools → Network**, trigger a **failing** **preflight** by **sending** a **custom** **`X-Debug`** header—**add** it to **`allowedHeaders`** and **watch** **204/200** **preflight** **succeed**.

---

## Beginner tip

If **`curl` works** but **browser fails**, suspect **CORS** or **mixed content** (**HTTPS page** calling **`http://` API**) before **rewriting** **Java** **business** **logic**.
