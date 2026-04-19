---
title: "Chapter 139: Password Hashing in Java — Argon2id, bcrypt, PBKDF2, and Spring Security Crypto"
description: "Hash passwords safely in Java: adaptive algorithms, salts and pepper, work factors, BCryptPasswordEncoder and delegating encoders, and never compare plaintext or roll crypto alone in production."
category: "Java"
tags:
  - Java password hashing bcrypt
  - Java Argon2 password
  - Java PBKDF2 salt
  - Spring Security PasswordEncoder
  - Java store password safely
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 139
---

# Chapter 139: Password Hashing in Java

**Password hashing** turns a **secret** into a **one-way**, **slow**, **salted** **string** safe to **store** in a **database**. **Adaptive** functions (**Argon2id**, **bcrypt**, **scrypt**, **PBKDF2**) let you **raise cost** as **hardware** gets **faster**.

**Never** **encrypt** passwords **reversibly**; **never** **compare** **plaintext** in **logs** or **exceptions**.

---

## 1. Topic title

**Password hashing: per-password salt, high iteration/memory cost, upgrade path when algorithms age**

---

## 2. What it means

**Salt** — **unique random** bytes **stored** **with** the **hash**—defeats **rainbow tables**.

**Pepper** — **secret not in DB**—**optional** **extra** **defense**; **key management** **harder** than **salt alone**.

**Spring Security** ships **`PasswordEncoder`** with **`BCryptPasswordEncoder`** and **`DelegatingPasswordEncoder`** to **support** **multiple** **formats** during **migrations**.

---

## 3. Why it is used

**Database leaks** should **not** **immediately** **reveal** **user passwords** reused **elsewhere**.

**Compliance** frameworks **expect** **modern** **algorithms** and **rotation** **policies**.

---

## 4. Mental sketch

**Hashing** is **pulverizing** **grain** into **flour**—you **cannot** **reconstruct** the **original kernel**, but you **can** **bake** (**verify**) by **pulverizing** a **candidate** the **same way** and **comparing** **dust**.

---

## 5. Java code example

```java
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashDemo {
    public static void main(String[] args) {
        BCryptPasswordEncoder enc = new BCryptPasswordEncoder();
        String raw = "correct horse battery staple";
        String hash = enc.encode(raw);
        System.out.println("matches=" + enc.matches(raw, hash));
        System.out.println("wrong=" + enc.matches("guess", hash));
    }
}
```

**Requires** **`spring-security-crypto`** on the **classpath**—often **already** present with **Spring Security**.

---

## 6. Explanation of code

**`encode`** generates a **new salt** each call—**hashes** **differ** for the **same** **password**—**normal**.

---

## 7. Common mistakes

**MD5/SHA256 once** on **passwords**—**too fast**; **GPUs** **break** them.

**Logging `User.password` DTOs**—**DTO reviews** must **exclude** **secrets**.

---

## 8. Best practices

**Rehash on login** when **work factor** **increases**—**transparent** **upgrades**.

**Prefer Argon2id** when **policy allows**; **bcrypt** remains **acceptable** with **strong** **cost** **parameters**.

---

## 9. Small practice task

Benchmark **`BCryptPasswordEncoder`** with **strength 10 vs 12`** on your **laptop**—pick the **slowest** **acceptable** **p99** **login** **latency**.

---

## Beginner tip

**“We hash client-side”** does **not** **remove** **server-side** **hashing**—**treat** **client output** as a **password** **equivalent** **anyone** on the **wire** could **replay**.
