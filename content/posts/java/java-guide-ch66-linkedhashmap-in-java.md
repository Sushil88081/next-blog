---
title: "Chapter 66: LinkedHashMap in Java — Stable Key Order on Top of HashMap Speed"
description: "Learn LinkedHashMap in Java: insertion-ordered key iteration, predictable entrySet walks, memory vs HashMap, LRU access-order mode at a glance, and when to choose it over TreeMap."
category: "Java"
tags:
  - Java LinkedHashMap
  - Java ordered map
  - Java LinkedHashMap vs HashMap
  - Java insertion order map
  - Java collections LinkedHashMap
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 66
---

# Chapter 66: LinkedHashMap in Java

**`HashMap`** (Chapter 64) is **fast** and **unordered** when you iterate keys. **`LinkedHashMap`** keeps the same **`get`/`put`** story but threads entries in a **linked list** so **`keySet()`** and **`entrySet()`** visit keys in **insertion order** (unless you switch the map into **access-order** mode for LRU-style behavior—advanced knob).

Chapter 65 detoured into a **REST + JDBC** project; we return to **collections** here. **`TreeMap`** is Chapter 67.

---

## 1. Topic title

**LinkedHashMap: HashMap plus a dependable walk order**

---

## 2. What it means

**`java.util.LinkedHashMap<K,V>`** extends **`HashMap`**. Bucket logic still uses **hash codes** on **keys**; the **extra links** remember **which key appeared when**. **`equals`** on keys still decides **uniqueness**.

**Cost:** slightly **more memory** and bookkeeping than **`HashMap`**. For typical web-app maps of a few thousand entries, the difference is usually noise.

---

## 3. Why it is used

**JSON-ish maps** where you want logs or exports to **match the order** users typed fields. **Caches** where **iteration order** should match **freshness** (often combined with access-order constructors in libraries you will read later).

---

## 4. Mental picture

**`HashMap`** is a **filing drawer** where clerks find papers quickly but dump them back in **random** slots. **`LinkedHashMap`** is the **same speed**, but clerks **thread a string** through tabs in **arrival order** so you can sweep the wall left-to-right predictably.

---

## 5. Java code example

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new LinkedHashMap<>();
        scores.put("ada", 92);
        scores.put("bob", 88);
        scores.put("chen", 91);
        scores.put("ada", 95);

        for (String name : scores.keySet()) {
            System.out.println(name + "=" + scores.get(name));
        }
    }
}
```

Second **`put("ada", …)`** **replaces** the value but **does not** move **`ada`** to the end in **insertion-order** mode—**key order stays first-seen position**.

---

## 6. Explanation of code

**`LinkedHashMap`** implements **`Map`** the same way **`HashMap`** does for **`putIfAbsent`**, **`merge`**, etc. Only **iteration** personality changes in the way beginners feel first.

---

## 7. Common mistakes

**Expecting keys sorted alphabetically**—that is **`TreeMap`**, not default **`LinkedHashMap`**.

**Thinking access-order LRU is automatic**—you must construct with **`accessOrder = true`** and **trim** entries yourself or use higher-level caches later.

---

## 8. Best practices

Declare **`Map<K,V>`** on APIs; **`new LinkedHashMap<>()`** when **stable iteration** matters.

If you only need **counts** and never care about iteration order, **`HashMap`** stays simpler.

---

## 9. Small practice task

Build **`LinkedHashMap<String, String>`** for **HTTP headers** mock: **`put("Date", …)`**, **`put("Server", …)`**, then print **`entrySet()`** twice to confirm **order is identical** across runs on the same JVM build.

---

## Beginner tip

If tests fail because **JSON field order** flipped, **`LinkedHashMap`** is a common **teaching fix**—production APIs should still treat JSON objects as **unordered** logically.
