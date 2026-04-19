---
title: "Chapter 140: Input Validation in Java — Boundaries, Allow-Lists, File Uploads, and API Hardening"
description: "Harden Java APIs with input validation beyond bean validation: size limits, allow-lists for enums and sorts, filename and path safety, multipart limits, and defense in depth with WAF and auth."
category: "Java"
tags:
  - Java API input validation
  - Java file upload validation
  - Java allow list security
  - Java multipart size limit Spring
  - Java defense in depth API
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 140
---

# Chapter 140: Input Validation in Java

Chapter 126 covered **Bean Validation** on **DTOs**—this chapter is **the wider hardening layer**: **HTTP size** limits, **query** **parameter** **sanity**, **file upload** **rules**, and **allow-lists** for anything **SQL** or **OS** **cannot** **parameterize**.

**Validation** is **not** **authorization**—**both** **must** **pass**.

---

## 1. Topic title

**Input validation: reject impossible or dangerous shapes before business logic runs**

---

## 2. What it means

**Size caps** — **`spring.servlet.multipart.max-file-size`**, **reverse proxy** **body limits**, **`MaxUploadSizeExceededException`** **handlers**.

**Filename rules** — **strip paths** (**`../`**), **reject** **control chars**, **store** with **random ids**, **serve** from **non-executable** **directories**.

**Semantic caps** — **max page size** on **pagination**, **max string length** even if **DB column** **allows** more—**stop** **accidental** **DoS**.

---

## 3. Why it is used

**Attack surface** shrinks—**many** **bugs** become **`400`** **noise** instead of **`RCE`**.

**Cost control**—**giant** **JSON** **trees** **hurt** **CPU** and **GC** before **they** are **“valid business objects”**.

---

## 4. Mental sketch

**DTO validation** is **spell-check** on **forms**. **API hardening** is **maximum parcel weight** at the **loading dock**—**even** **correctly spelled** **orders** can **break** the **forklift**.

---

## 5. Java code example

```java
import java.nio.file.Path;

public final class UploadGuards {
    private UploadGuards() {
    }

    public static String safeFilename(String original) {
        String name = Path.of(original).getFileName().toString();
        if (!name.equals(original.replace('\\', '/'))) {
            throw new IllegalArgumentException("path segments not allowed");
        }
        if (name.isBlank() || name.length() > 120) {
            throw new IllegalArgumentException("bad filename");
        }
        return name;
    }
}
```

**Combine** with **virus scanning** / **content sniffing** when **policy** demands—**code** alone **is not** **enough** for **all** **threats**.

---

## 6. Explanation of code

**`Path.getFileName()`** drops **leading** **directories**—still **validate** **length** and **charset** for **your** **filesystem**.

---

## 7. Common mistakes

**Trusting `Content-Type` headers**—**verify** **magic bytes** for **upload** **pipelines** that **matter**.

**Regex validation without anchors**—**partial** **matches** **lie**.

---

## 8. Best practices

**Central filters** for **global** **limits**; **DTO annotations** for **per-field** **rules**.

**Fuzz** **upload** and **JSON** **endpoints** with **malformed** **nested** structures.

---

## 9. Small practice task

Add a **`max=500`** **page size** guard in a **`Pageable`** **resolver** or **service**—return **`400`** when **exceeded**.

---

## Beginner tip

**Validation** errors belong in **`4xx`** with **actionable** **field keys**—**`500`** means **you** **crashed**, not **the user** **typed** **bad** **data**.
