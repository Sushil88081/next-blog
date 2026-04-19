---
title: "Chapter 27: String vs StringBuilder vs StringBuffer in Java — When to Use Which"
description: "Compare Java String, StringBuilder, and StringBuffer: immutability, mutability, threading, performance patterns, and decision rules for real code—not memorized slogans."
category: "Java"
tags:
  - String vs StringBuilder Java
  - Java StringBuffer vs String
  - when to use StringBuilder
  - Java immutable vs mutable string
  - Java string performance
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 27
---

# Chapter 27: String vs StringBuilder vs StringBuffer in Java

This chapter is **only** the **comparison** and **decision guide**. Deep dives already live in Chapters **23–26**. Use this when you ask: “Which type should I reach for right now?”

---

## 1. Topic title

**`String` vs `StringBuilder` vs `StringBuffer`: trade-offs in one place**

---

## 2. What it means

| Type | Mutable? | Thread-safe mutations? | Typical role |
|------|------------|-------------------------|--------------|
| `String` | No (`final` class, immutable value) | N/A (read-only sharing is safe) | Stable text, keys, messages |
| `StringBuilder` | Yes | No (not synchronized) | Single-threaded assembly of text |
| `StringBuffer` | Yes | Yes (synchronized methods) | Shared mutable buffer across threads (rare in app code) |

**Mutable** = you can change the internal character sequence **without** replacing the object reference for every edit.

---

## 3. Why it is used

Junior bugs often come from **mixing mental models**: treating `String` like a scratchpad, or using `StringBuffer` everywhere “for safety.” A clear comparison table saves review time and GC spikes.

---

## 4. Real-world example

**HTTP JSON body** built in a servlet: usually you accumulate in a **`StringBuilder`** (or write to an `OutputStream` directly), then send as bytes. The **immutable** `String` might appear once at the boundary when the framework needs it.

---

## 5. Java code example

```java
public class ThreeWayDemo {
    public static void main(String[] args) {
        String a = "x";
        String b = a + "y";
        System.out.println("String concat creates new: a=" + a + " b=" + b);

        StringBuilder sb = new StringBuilder("x");
        sb.append('y');
        System.out.println("same builder object, content now: " + sb);

        StringBuffer sbuf = new StringBuffer("x");
        sbuf.append('y');
        System.out.println("buffer: " + sbuf);

        long t0 = System.nanoTime();
        String slow = "";
        for (int i = 0; i < 5000; i++) {
            slow = slow + "a";
        }
        long t1 = System.nanoTime();

        StringBuilder fast = new StringBuilder();
        for (int i = 0; i < 5000; i++) {
            fast.append('a');
        }
        long t2 = System.nanoTime();

        System.out.println("naive concat ns: " + (t1 - t0));
        System.out.println("builder ns: " + (t2 - t1));
        System.out.println("lengths match: " + (slow.length() == fast.length()));
    }
}
```

**Warning:** timing on laptops is noisy—run on battery vs plugged, warm JVM, etc. Still, the **order of magnitude** gap often shows up clearly.

---

## 6. Explanation of code

- **`String` concat** in a loop allocates a new `String` each iteration (old becomes garbage).
- **`StringBuilder`** reuses internal storage, growing occasionally.
- **`StringBuffer`** would look like `StringBuilder` in this single-thread demo but pay extra lock overhead—wasted here.

---

## 7. Common mistakes

**Micro-optimizing every concat** — `"SELECT * FROM " + table` is fine; loops are the danger zone.

**Using `StringBuilder` for constants** known at compile time—compiler may already optimize some concat; readability first.

**Calling `StringBuffer` from many threads without a higher-level contract** — synchronization on the buffer does not fix all races in your logging design.

---

## 8. Best practices

**Rule of thumb:** immutable snapshot → **`String`**. Building text in one thread → **`StringBuilder`**. Truly shared mutable text buffer across threads → **`StringBuffer`** or better, **a queue + workers**.

**Prefer streaming APIs** (`Writer`, response output stream) for huge payloads instead of giant in-memory strings.

**Measure** before rewriting hot paths—profilers lie less than intuition.

---

## 9. Small practice task

Rewrite a method (in `main` is fine) that currently does:

```java
String out = "";
for (int i = 0; i < 1000; i++) {
    out += i % 10;
}
```

Use **`StringBuilder`** instead, single `toString()` at the end. Compare lengths (should match) and note which version you would ship.

---

## Beginner tip

If your variable never changes after first assignment except full replacement, **`String`** is probably right. If you keep **mutating** the same logical text, **`StringBuilder`**.
