---
title: "Chapter 36: static Keyword in Java — Class Members, Utilities, and What static Cannot Do"
description: "Learn Java static fields and methods: belonging to the class not instances, static blocks, calling from static context, and why static cannot touch instance fields directly."
category: "Java"
tags:
  - Java static keyword
  - Java static method
  - Java static field
  - Java static block
  - Java static vs instance
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 36
---

# Chapter 36: static Keyword in Java

This chapter is **only** about **`static`**: members that belong to the **class**, not to each **instance**. **`this`** was Chapter 35; **`final`** is Chapter 37.

---

## 1. Topic title

**`static`: one shared variable or a method you can call without `new`**

---

## 2. What it means

```java
class Demo {
    static int instancesCreated;

    Demo() {
        instancesCreated++;
    }

    static int getInstancesCreated() {
        return instancesCreated;
    }
}
```

Every **`new Demo()`** bumps the **same** `instancesCreated` counter stored with the class. **`getInstancesCreated`** reads that counter without needing a `Demo` object (though you can still call it on an instance—discouraged style).

**`static` methods** can only touch **`static`** fields and other statics directly—they do **not** receive `this`.

---

## 3. Why it is used

**Shared constants and counters** across all objects: `public static final double PI = 3.14159;` (really use `Math.PI`).

**Utility functions** that do not need object state: `Math.max`, `Integer.parseInt`, your own `StringUtils.slugify(...)` if you keep it static in a helper class.

---

## 4. Real-world example

A **`IdGenerator.next()`** static method might read a **static** atomic counter so every call across the JVM gets a unique id sequence—state is global to the class, not per user session object.

---

## 5. Java code example

```java
class AppConfig {
    static String environment = "dev";

    static void setEnvironment(String env) {
        environment = env == null ? "dev" : env;
    }

    static String getEnvironment() {
        return environment;
    }
}

class Visitor {
    static int totalVisits;

    Visitor() {
        totalVisits++;
    }
}

public class StaticKeywordDemo {
    public static void main(String[] args) {
        System.out.println(AppConfig.getEnvironment());
        AppConfig.setEnvironment("prod");
        System.out.println(AppConfig.getEnvironment());

        new Visitor();
        new Visitor();
        System.out.println(Visitor.totalVisits);
    }
}
```

**Static initializer block** (runs once when class loads):

```java
class Loader {
    static {
        // runs once, e.g. load native lib or read static config
    }
}
```

Use rarely; prefer explicit static methods for testability.

---

## 6. Explanation of code

- **`main` is `static`** — JVM calls it without constructing your class first.
- **`static` field** — one slot in memory for the class, not per instance.
- **`static` method** — no implicit `this`.

---

## 7. Common mistakes

**Accessing instance fields from `static` context** — compile error unless you have an explicit object reference.

**Overusing `static`** for everything because `main` taught you that way—real designs mix instance state with a few static helpers.

**Mutable static state in servers** — easy global variable bugs under concurrency; prefer dependency injection later.

---

## 8. Best practices

**Prefer instance methods** when behavior depends on object fields.

**Mark utility classes `final` with private constructor** (advanced pattern) to stop accidental `new` on helper-only classes.

**Question every `static` mutable field** in multi-threaded apps.

---

## 9. Small practice task

Add **`static int add(int a, int b)`** to a small class and call it as `ClassName.add(2, 3)` from `main`. Then create two instances of a class with an **instance** counter field vs the **`static`** total from the chapter—predict outputs before you run.

---

## Beginner tip

If your IDE says “cannot make static reference to non-static field,” you need either **`new`** or pass an existing object reference into the static method.
