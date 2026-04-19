---
title: "Chapter 138: JWT Basics in Java — Claims, Signature, Expiry, and Stateless Trade-offs"
description: "Learn JWT structure for Java APIs: header payload signature, standard claims like exp and aud, verifying with public keys JWKS, rotation, and why JWTs are credentials not authorization by themselves."
category: "Java"
tags:
  - Java JWT basics
  - Java JWT verification
  - Java JWT claims exp aud
  - Java JWKS JWT signature
  - Java stateless JWT tradeoffs
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 138
---

# Chapter 138: JWT Basics in Java

A **JWT** (**JSON Web Token**) is a **compact string** with **three Base64URL** segments: **header** (algorithm, type), **payload** (**claims** JSON), **signature** (integrity). **Servers** that **issue** JWTs **sign** (or **encrypt** for **JWE**) them; **resource servers** **verify** **signature** and **validate claims** before **trusting** **identity**.

**JWT is not a session store**—it is a **credential** anyone **holding** it can **replay** until **expiry** unless you add **binding** (**DPoP**, **mTLS**, **rotation**, **revocation lists**).

---

## 1. Topic title

**JWT: signed claims in a portable string—verify signature, validate time and audience, then authorize**

---

## 2. What it means

**Registered claims** — **`exp`** (**expiry**), **`nbf`**, **`iat`**, **`iss`** (**issuer**), **`sub`** (**subject**), **`aud`** (**audience**).

**Symmetric** (**HS256**) vs **asymmetric** (**RS256**, **ES256**) signing—**microservices** usually **verify** with **public keys** from **JWKS** endpoints; **symmetric** secrets **must** stay **only** on **issuer**.

**Libraries** — **Nimbus JOSE + JWT**, **jjwt**, **Spring Security OAuth2 Resource Server**—**do not** **parse** **by hand**.

---

## 3. Why it is used

**Cross-service** **identity** without **sticky sessions** on **every** **hop**.

**Browser SPAs** and **mobile** **clients** **cache** **short-lived** **access tokens**.

---

## 4. Mental sketch

A **JWT** is a **wax-sealed envelope**—**postmen** (**HTTP**) can **read** **unencrypted** **payloads** (**do not** **put secrets** inside **signed-only** JWTs). **Signature** proves **who sealed** it; **authorization** still **decides** **room** **entry**.

---

## 5. Java code example

```java
import java.time.Instant;
import java.util.Map;

/** Pseudocode shape—use a vetted JWT library in production. */
public final class JwtClaimsCheck {
    private JwtClaimsCheck() {
    }

    public static boolean lifetimeOk(Map<String, Object> claims, Instant now, long skewSeconds) {
        Object exp = claims.get("exp");
        if (!(exp instanceof Number)) {
            return false;
        }
        long expEpoch = ((Number) exp).longValue();
        return now.getEpochSecond() <= expEpoch + skewSeconds;
    }
}
```

**Clock skew** tolerance avoids **false negatives** when **servers** **drift** **seconds**.

---

## 6. Explanation of code

**After** **signature** **verification**, **still** **check** **`aud`** matches **your** **API** **identifier**—**prevents** **token** **replay** across **unrelated** **services** sharing an **issuer**.

---

## 7. Common mistakes

**Storing JWTs in `localStorage`**—**XSS** **steals** them—**prefer** **httpOnly** **cookies** or **memory** with **refresh** **patterns** **designed** with **your** **threat model**.

**Long-lived access tokens** without **revocation**—**compromised** **tokens** **live** **too long**.

---

## 8. Best practices

**Rotate signing keys**; **publish JWKS** with **`kid`** so **verifiers** **pick** the **right** **public key**.

**Prefer opaque refresh tokens** paired with **short** **access** **JWTs** when **revocation** matters.

---

## 9. Small practice task

Decode a **test JWT** from **`jwt.io`** in a **notebook**—**list** **claims** you would **enforce** in **code** beyond **signature**.

---

## Beginner tip

**“JWT auth”** usually means **“Bearer token in `Authorization` header”**—**transport** detail; **real auth** is **how** that **token** was **minted** and **validated**.
