---
title: "Chapter 137: Authentication vs Authorization in Java — Identity, Scopes, and Where Each Runs"
description: "Separate authentication and authorization in Java backends: login vs permission checks, sessions vs tokens, roles and scopes, Spring Security filters at a high level, and common 401 vs 403 mistakes."
category: "Java"
tags:
  - Java authentication vs authorization
  - Java Spring Security basics
  - Java 401 vs 403
  - Java RBAC API security
  - Java OAuth2 scopes roles
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 137
---

# Chapter 137: Authentication vs Authorization in Java

**Authentication** answers **“who are you?”**—**credentials**, **MFA**, **federated login**. **Authorization** answers **“what may you do?”**—**roles**, **scopes**, **row-level rules** after **identity** is **known**.

**HTTP** maps them roughly to **`401 Unauthorized`** (**authenticate**) and **`403 Forbidden`** (**authenticated** but **not allowed**)—Chapter 115 vocabulary **returns** here with **security** **meaning**.

---

## 1. Topic title

**Authentication establishes subject; authorization evaluates policy for each action**

---

## 2. What it means

**Subject** — a **stable user id** or **service principal** carried in **session**, **JWT**, or **mTLS** **certificate**.

**Policy** — **RBAC** (**role-based**), **ABAC** (**attribute-based**), or **ReBAC** (**relationship-based**)—**pick** the **simplest** that **fits** **risk**.

**Spring Security** (typical in **Java** **services**) runs **filters** that **authenticate** once per **request**, then **authorize** **method** or **URL** **rules**—**details** **deepen** with **framework docs** after this **vocabulary** chapter.

---

## 3. Why it is used

**Clear separation** stops **“check admin flag in random if”** **sprawl**.

**Auditing**—**who** **did** **what** needs **identity**; **why denied** needs **policy** **context**.

---

## 4. Mental sketch

**Authentication** is **showing ID at the lobby**. **Authorization** is **your key card** only **opening** **floors** you **paid** for—**different** **failures** deserve **different** **HTTP** **signals**.

---

## 5. Java code example

```java
import java.util.Set;

/** Illustrative types only—wire real checks with Spring Security or your stack. */
public final class AccessDecision {
    private AccessDecision() {
    }

    public static boolean isAuthenticated(String subject) {
        return subject != null && !subject.isBlank();
    }

    public static boolean canDeleteOrders(String subject, Set<String> roles) {
        return isAuthenticated(subject) && roles.contains("ORDER_ADMIN");
    }
}
```

**Real apps** pull **`roles`** from **tokens** or **database**—**keep** **pure** **functions** **unit-testable** **before** **framework** **glue**.

---

## 6. Explanation of code

**Two-step** **checks** mirror **filter chain** **order**: **establish** **subject**, then **evaluate** **policy**—**never** **invert** without **good** **reason**.

---

## 7. Common mistakes

**Returning `403` before authentication**—**clients** cannot tell **whether** to **retry** **login**.

**Overloading roles** until **everyone** is **`SUPER_ADMIN`**—**role explosion** **defeats** **review**.

---

## 8. Best practices

**Centralize policy**—**one** **module** owns **“who may call `deleteOrder`”** rules.

**Log security decisions** with **correlation ids**, not **raw passwords** or **tokens**.

---

## 9. Small practice task

List **three** **APIs** you use (**email**, **cloud**, **payments**) and **label** each **call** as **authn** or **authz** **heavy**.

---

## Beginner tip

If **docs** say **OAuth2 “authorization server”**, that **phrase** is **about** **issuing tokens** (**protocol**)—not the **same** word as **authorization** **checks** **inside** **your** **service**—**context** **disambiguates**.
