---
title: "Chapter 60: HashSet in Java — Hash Buckets, Fast contains, and One null Element"
description: "Learn HashSet in Java: how hash codes pick a bucket, equals decides duplicates, average O(1) add and contains, null allowance, and why iteration order is not your API contract."
category: "Java"
tags:
  - Java HashSet
  - Java hash set tutorial
  - Java Set HashSet example
  - Java equals hashCode set
  - Java unique elements HashSet
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 60
---

# Chapter 60: HashSet in Java

Chapter 59 introduced **`Set`** as a **bag without duplicates**. **`HashSet`** is the usual **`Hash`** implementation: **fast** average **`add`**, **`remove`**, and **`contains`** when keys spread nicely across buckets.

**`LinkedHashSet`** (Chapter 61) remembers **insertion order**. **`TreeSet`** (Chapter 62) keeps **sorted** order.

---

## 1. Topic title

**HashSet: hash the element, find a bucket, let equals settle collisions**

---

## 2. What it means

Internally a **`HashSet`** wraps a **`HashMap`**-style structure: **values** are dummy placeholders; the **set element** is the **key**. When you **`add("java")`**, the string’s **`hashCode()`** suggests a bucket; **`equals`** confirms whether **`"java"`** is already there.

**Average** time for **`add`/`contains`/`remove`** is **constant** with respect to size—until hashes **clump**, then buckets grow long chains or trees (implementation detail you rarely tune at lesson sixty).

---

## 3. Why it is used

**Tag clouds**, **permission names**, **visitor ids today**—anywhere you need **“have I seen this?”** without caring **which slot** it lives in.

---

## 4. Mental image

Picture **mail slots** labeled by a **quick math fingerprint** of the envelope. **`equals`** is the clerk who opens the slot and checks the **real address** if two fingerprints collided.

---

## 5. Java code example

```java
import java.util.HashSet;
import java.util.Set;

public class HashSetDemo {
    public static void main(String[] args) {
        Set<String> langs = new HashSet<>();
        langs.add("Go");
        langs.add("Java");
        langs.add("Go");
        System.out.println(langs.size());
        System.out.println(langs.contains("Rust"));

        langs.remove("Go");
        System.out.println(langs);

        langs.add(null);
        langs.add(null);
        System.out.println("null count path size=" + langs.size());
    }
}
```

**`HashSet`** allows **one `null`** element (as of typical JDK behavior—still treat **`null`** in sets as a smell in production models).

---

## 6. Explanation of code

Duplicate **`"Go"`** does not grow the set. **`remove`** returns **`true`** when something was removed. Second **`add(null)`** is ignored—**uniqueness** still applies.

---

## 7. Common mistakes

**Relying on `println` order** for tests—iteration order can change between runs or JVM versions.

**Storing objects whose `equals`/`hashCode` change after insert**—you can “lose” elements behind wrong buckets.

**Using `HashSet` when you need sorted output**—reach for **`TreeSet`** or sort a **`List`** copy.

---

## 8. Best practices

If you need **predictable iteration**, Chapter 61’s **`LinkedHashSet`** is the lighter move before jumping to **`TreeSet`**.

For domain objects in a set, define **`equals`/`hashCode`** together around **stable business keys** (id fields), not volatile display strings unless that is truly your identity rule.

---

## 9. Small practice task

Feed **`List.of("a","b","a","c","b")`** into **`new HashSet<>(...)`** and print **size** plus **`contains("c")`**. Then iterate and notice order is **not** alphabetical.

---

## Beginner tip

**`HashSet` is not magic dedupe dust**—it dedupes by **`equals`**. Two different **`Person`** objects with the same id but default **`Object.equals`** still count as **two** entries until you fix equality.
