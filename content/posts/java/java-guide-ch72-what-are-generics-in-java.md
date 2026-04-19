---
title: "Chapter 72: What are Generics in Java — Type Parameters, Safety at Compile Time, and Erasure"
description: "Introduce Java generics: angle-bracket type parameters, why raw types hurt, type inference with the diamond operator, erasure at runtime, and mental models before generic classes and methods."
category: "Java"
tags:
  - Java generics intro
  - Java type parameter
  - Java diamond operator
  - Java raw type warning
  - Java generics erasure
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 72
---

# Chapter 72: What are Generics in Java

You already wrote **`List<String>`**, **`Map<String, Integer>`**, **`Comparable<Score>`**. **Generics** are the language feature behind those **angle brackets**: you **name a placeholder type** (`T`, `E`, `K`, `V`) so the compiler can **reject** mistakes like **`list.add(123)`** on a **string list** before you run.

**Generic class** patterns expand in Chapter 73; **generic methods** in Chapter 74.

---

## 1. Topic title

**Generics: one implementation, many “shape of contents” promises checked by the compiler**

---

## 2. What it means

**Parameter types** appear in **class and interface headers** and in **method signatures**. At **runtime**, most generic detail is **erased**—the JVM sees **`List`** plus **`Object`** or **bounds**, not **`List<String>`**—but the **compile-time** checks already stopped many **`ClassCastException`** bugs older Java suffered from.

---

## 3. Why it is used

**Safer collections** — wrong insert is a **compile error**.

**Readable APIs** — `Box<UUID>` tells readers what lives inside without reading the whole class body.

---

## 4. Mental hook

Generics are **sticky notes on a moving box** that say **“fragile glass”**—the shipping company (**compiler**) refuses to stack **bricks** on top because the note is explicit.

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.List;

public class GenericsIntroDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Ada");
        // names.add(42); // does not compile

        List<Integer> scores = new ArrayList<>();
        scores.add(42);

        printSize(names);
        printSize(scores);
    }

    static void printSize(List<?> items) {
        System.out.println(items.size());
    }
}
```

**`List<?>`** (“**wildcard** unknown element”) lets **`printSize`** accept **any** list while still treating elements as **unknown**—you cannot **`add`** (except **`null`**) without more rules (Chapter 75 touches bounds).

---

## 6. Explanation of code

**`new ArrayList<>()`** uses the **diamond**: the right-hand side **copies** type arguments from the left **`List<String>`** target.

---

## 7. Common mistakes

**Suppressing “unchecked” warnings** with **`@SuppressWarnings`** before you understand them—sometimes necessary for legacy interop, often a smell.

**Casting through raw types** to sneak bad values in—defeats the whole point.

---

## 8. Best practices

Keep **variables and parameters** typed with **interfaces + generics** (`List<T>`, `Map<K,V>`) not raw **`ArrayList`**.

Prefer **`List.of("a","b")`** for tiny immutable lists when you do not need mutation.

---

## 9. Small practice task

Declare **`List<Double>`**, add three numbers, then try to **`add("pi")`** and read the compiler message out loud—celebrate the compiler catching it.

---

## Beginner tip

When angle brackets feel noisy, read them left to right: **“list **of** string.”** The English sentence matches the Java type almost exactly.
