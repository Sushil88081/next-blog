---
title: "Chapter 133: Java Modules in Java — module-info, requires exports opens, and JPMS Boundaries"
description: "Learn the Java Platform Module System: module-info.java requires transitive exports opens to, strong encapsulation by default, services, and how modules interact with unnamed code and the classpath."
category: "Java"
tags:
  - Java modules JPMS
  - Java module-info requires exports
  - Java opens module reflection
  - Java platform module system tutorial
  - Java unnamed module classpath
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 133
---

# Chapter 133: Java Modules in Java

**JPMS** (**Java Platform Module System**) groups packages into **`module`** units with an explicit **`module-info.java`**: **dependencies** (**`requires`**), **API surface** (**`exports`**), and **reflective access** (**`opens`**). **JDK 9+** **libraries** and **apps** can **ship** as **modules**; **classpath-only** jars still load in the **unnamed module**.

---

## 1. Topic title

**Modules: compile-time and runtime dependency graph with enforced encapsulation**

---

## 2. What it means

**`module com.example.app { requires java.net.http; exports com.example.api; }`**

**`requires transitive`** propagates readability to **consumers** of your **module**—use for **API** types that **leak** into **signatures**.

**`opens com.example.internal` to spring.core`** grants **deep reflection** to **named** **friends** without **exporting** **internals** to **everyone**.

---

## 3. Why it is used

**Shrink runtime images** with **`jlink`**—**custom** **distros** without **unused** **JDK** **modules**.

**Security**—**default deny** for **reflective** **poking** at **`jdk.internal.*`**.

---

## 4. Mental sketch

**Classpath** is a **pile of jars** in a **shared attic**—anything might **touch** anything. **Modules** are **labeled boxes** with **signed permission slips** for **who may open** which **lid**.

---

## 5. Java code example

```java
/* file: src/main/java/module-info.java */
module demo.modules {
    requires java.base;
    exports com.example.demo.api;
}
```

**Real apps** add **`requires`** lines for **logging**, **SQL drivers**, **HTTP clients**—**start** **minimal**, **let** **compiler errors** **teach** **missing** **`requires`**.

---

## 6. Explanation of code

**`java.base`** is **implicitly** **required** but **listing** it is **fine** for **clarity** in **learning** snippets.

---

## 7. Common mistakes

**Split-package** across **two modules**—**illegal**; **merge** packages or **stop** **exporting** **half**.

**Assuming Spring Boot apps are modular**—many **still** run **classpath-first**; **module** migration is **incremental**.

---

## 8. Best practices

**`jdeps`** on **fat jars** before **modularizing**—see **accidental** **coupling**.

**Keep `exports` lists** **small**—**prefer** **`opens … to`** for **framework** **introspection** **only**.

---

## 9. Small practice task

Create a **two-module** **Gradle** or **Maven** build where **api** exports **one** package and **impl** **`requires api`**—run **`java --module-path … -m impl/com.example.Main`**.

---

## Beginner tip

If **reflection** fails with **`InaccessibleObjectException`**, you hit **JPMS** **walls**—**open** the **package**, **move** code to an **exported** **API**, or **rethink** the **hack**.
