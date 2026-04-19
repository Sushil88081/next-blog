---
title: "Chapter 129: Reflection in Java — Class Objects, Members, setAccessible, and When to Stop"
description: "Use Java reflection safely: Class.forName, getDeclaredMethods and getMethods, Field get/set, Method invoke, setAccessible and module checks, and prefer compile-time APIs unless frameworks require reflection."
category: "Java"
tags:
  - Java reflection tutorial
  - Java Class forName
  - Java Method invoke reflection
  - Java setAccessible Field
  - Java reflection performance
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 129
---

# Chapter 129: Reflection in Java

**Reflection** lets code **inspect and invoke** types **at runtime** through **`java.lang.Class`** and **`java.lang.reflect.*`**: **methods**, **fields**, **constructors**, **annotations**. Frameworks (**Spring**, **JPA**, **Jackson**) use it heavily; **application** code should **reach** for it **sparingly**—it **breaks** **compile-time** **checks** and **hides** **intent**.

---

## 1. Topic title

**Reflection: meta-programming on live classes—powerful, fragile, and hard to refactor**

---

## 2. What it means

**`SomeType.class`** or **`object.getClass()`** yields a **`Class<?>`** token.

**`getMethod("name", argTypes)`** walks **public API** including **superclasses**; **`getDeclaredMethod`** includes **non-public** members on **that exact class**—you still **`setAccessible(true)`** to **invoke** **private** members (**illegal** on JDK **modules** you **do not open**).

**`Method.invoke(target, args)`** calls the **method**—**`null` target** for **static** methods.

---

## 3. Why it is used

**Dependency injection** and **serialization** **discover** **annotations** and **construct** **objects** without **hand-written** **factories** for **every** type.

**Plugins** where **bytecode** is **not** on the **compile** classpath—**load** **classes** by **name** from **configuration**.

---

## 4. Mental sketch

Reflection is **opening a car hood with gloves off**—you **can** **touch** **everything**, but **one** **wrong wire** **voids** the **warranty** (**encapsulation**). **Mechanics** (**frameworks**) wear **tools**; **drivers** (**app code**) usually **should not**.

---

## 5. Java code example

```java
import java.lang.reflect.Method;

public class ReflectionDemo {
    public static void main(String[] args) throws Exception {
        Class<?> c = Class.forName("java.util.ArrayList");
        Object list = c.getConstructor().newInstance();
        Method add = c.getMethod("add", Object.class);
        add.invoke(list, "hi");
        Method size = c.getMethod("size");
        System.out.println(size.invoke(list));
    }
}
```

**`Class.forName`** can run **static initializers**—prefer **`Some.class`** when the **type** is **already** **known** at **compile time**.

---

## 6. Explanation of code

**`getMethod`** returns **`Method`** objects **shared** across **instances**—**thread-safe** **descriptor**; **invocation** still **serializes** **per** **target** semantics.

---

## 7. Common mistakes

**Caching `Method` without `setAccessible` plan**—**hot loops** pay **access checks** unless **opened** **carefully**.

**Swallowing `InvocationTargetException`** without **`getCause()`**—**hides** **real** failures.

---

## 8. Best practices

**Wrap** reflection **behind** **small** **interfaces**—**tests** swap **implementations** without **`invoke`**.

**Prefer `MethodHandle` / `VarHandle`** when **micro-benchmarks** prove **need**—**not** **day one**.

---

## 9. Small practice task

Reflectively call **`String::isEmpty`** on a **`String` instance** via **`getMethod("isEmpty")`**—then repeat with **`MethodHandles.lookup`** and **compare** **code size**.

---

## Beginner tip

If your **IDE** **cannot** **find usages** of a **method** called **only** via **reflection**, **rename** **safely** breaks **runtime**—**search strings** in **configs** when **refactoring**.
