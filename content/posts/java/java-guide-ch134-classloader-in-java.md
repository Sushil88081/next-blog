---
title: "Chapter 134: ClassLoader in Java — Delegation, Visibility, and Isolation Patterns"
description: "Understand ClassLoader chains: delegation model, defining vs initiating loaders, visibility between loaders, URLClassLoader patterns, and why duplicate classes on different loaders break equals."
category: "Java"
tags:
  - Java ClassLoader tutorial
  - Java delegation ClassLoader
  - Java URLClassLoader
  - Java class loader isolation
  - Java duplicate class ClassLoader
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 134
---

# Chapter 134: ClassLoader in Java

**`ClassLoader`** loads **bytecode** and **defines** **`Class<?>`** objects. The **JVM** uses a **delegation model**: **child loaders** ask **parents** first—**bootstrap** (**`null` parent**) loads **`java.*`**, **platform** loaders cover **JDK modules**, **application** loaders read **`CLASSPATH`** / **module path**.

**Different loaders** can **load two classes with the same binary name**—they are **not** **assignable** to each other—**`instanceof`** fails in **confusing** ways.

---

## 1. Topic title

**ClassLoader: namespace for loaded types; delegation keeps core JDK stable**

---

## 2. What it means

**`Class.forName(name, initialize, loader)`** picks which **loader** **defines** the **class**.

**`Thread.currentThread().getContextClassLoader()`** is the **“who should load plugins?”** **escape hatch**—**frameworks** set it **carefully** around **SPI** calls.

**`URLClassLoader`** (or **`Layer` APIs**) historically loaded **plugins** from **directories**—**security** and **JPMS** changed **defaults**—**prefer** **documented** **plugin** **mechanisms**.

---

## 3. Why it is used

**OSGi**, **application servers**, and **build tools** (**Surefire**) use **loader** **isolation** to **avoid** **version** **hell**.

**Hot reload** in **dev** sometimes **spins** **throwaway** loaders—**never** **ship** naive **reload** without **leak** **analysis**.

---

## 4. Mental sketch

**ClassLoader** is **library branch** **cataloging**—same **book title** on **two shelves** (**loaders**) means **two** **distinct** **copies**—**do not** **mix** **pages** across **shelves** expecting **one** **volume**.

---

## 5. Java code example

```java
public class LoaderIntrospection {
    public static void main(String[] args) {
        ClassLoader cl = String.class.getClassLoader();
        System.out.println("String loader=" + cl); // null -> bootstrap

        ClassLoader app = LoaderIntrospection.class.getClassLoader();
        System.out.println("app loader=" + app);
    }
}
```

**`null` loader** on **`String`** signals **bootstrap**—**normal** for **JDK core** types.

---

## 6. Explanation of code

**Parent delegation** prevents **user** code from **redefining** **`java.lang.Object`** security—**children** **cannot** **override** **bootstrap** **classes**.

---

## 7. Common mistakes

**Closing `URLClassLoader` while classes still live**—**native** **libraries** **unload** **painfully**.

**Casting instances across loaders**—**`ClassCastException`** even when **`.class` names** **match**.

---

## 8. Best practices

**Log loader identity** when **debugging** **`ServiceConfigurationError`**.

**Prefer module layers** over **ad-hoc** **`URLClassLoader` towers** on **modern** **JDKs**.

---

## 9. Small practice task

Print **`getClass().getClassLoader()`** for **`com.mysql.cj.jdbc.Driver`** when loaded from **your** app—compare to **`java.sql.Driver`** interface **loader** chain.

---

## Beginner tip

If **`NoClassDefFoundError`** follows **`ClassNotFoundException`**, you **fixed** **loading** once but **static init** **failed** **later**—**read** the **caused-by** **chain** fully.
