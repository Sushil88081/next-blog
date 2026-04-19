---
title: "Chapter 25: StringBuilder in Java — Mutable Text Buffers and Efficient Append"
description: "Learn Java StringBuilder: append, insert, delete, reverse, internal capacity, toString, why it is not thread-safe, and when to use it instead of String concatenation."
category: "Java"
tags:
  - Java StringBuilder
  - Java StringBuilder append
  - Java mutable string
  - Java StringBuilder vs String
  - Java StringBuilder tutorial
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 25
---

# Chapter 25: StringBuilder in Java

This chapter is **only** about **`StringBuilder`**: a **mutable** character buffer for building text efficiently. **`String`** (Chapters 23–24) is immutable; **`StringBuffer`** is Chapter 26.

---

## 1. Topic title

**`StringBuilder`: growable in-memory text you change with `append`, `insert`, and friends**

---

## 2. What it means

`StringBuilder` is a **class** whose internal array of characters can be **resized** and **edited** without allocating a brand-new `String` for every tiny change.

Typical flow: create builder → **`append`** many pieces → **`toString()`** once at the end if you need a `String`.

```java
StringBuilder sb = new StringBuilder();
sb.append("User: ");
sb.append(name);
sb.append(" score=");
sb.append(score);
String message = sb.toString();
```

---

## 3. Why it is used

**`String` + `String` in a loop** creates many intermediate `String` objects. For thousands of iterations, that is wasted allocations and GC pressure. **`StringBuilder`** keeps edits **in place** (with occasional internal array growth—still far cheaper than naive concat).

---

## 4. Real-world example

Building a **CSV line** in a loop over rows: append field, comma, field, comma… final newline. One `toString()` (or write directly to a writer) at the end.

---

## 5. Java code example

```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("start");
        sb.append('-').append(42).append(true);
        System.out.println(sb);

        sb.insert(5, "X");
        System.out.println("after insert: " + sb);

        sb.delete(5, 6);
        System.out.println("after delete: " + sb);

        StringBuilder words = new StringBuilder("drawer");
        words.reverse();
        System.out.println("reverse fun: " + words);

        StringBuilder cap = new StringBuilder();
        System.out.println("initial length/capacity: " + cap.length() + " / " + cap.capacity());
        for (int i = 0; i < 50; i++) {
            cap.append('a');
        }
        System.out.println("after loop length/capacity: " + cap.length() + " / " + cap.capacity());
    }
}
```

**Note:** `append` is **chained**—each call returns the same `StringBuilder` reference.

---

## 6. Explanation of code

- **`append`** overloads exist for `int`, `boolean`, `char`, `String`, `Object` (calls `String.valueOf`), etc.
- **`insert(offset, ...)`** shifts existing characters right; offsets must stay valid.
- **`delete(start, end)`** removes `[start, end)`—same half-open rule as `String.substring`.
- **`reverse`** mutates in place.
- **`length`** is current character count; **`capacity`** is internal buffer size before next expansion.

---

## 7. Common mistakes

**Calling `toString()` inside a tight loop** for every comparison—defeats the purpose; compare builders or defer `toString`.

**Sharing one `StringBuilder` across threads** without synchronization—**not thread-safe**; use `StringBuffer` (Chapter 26) or local builders only.

**Forgetting `toString()`** when passing to APIs expecting `String`.

**Assuming `equals` on builders compares text** — `StringBuilder` inherits `Object.equals` (reference identity). Convert to `String` or use `contentEquals` with care.

---

## 8. Best practices

**Prefer local `StringBuilder`** variables; do not store in static fields unless you really know concurrency.

**Give an initial capacity** when you can estimate size: `new StringBuilder(256)` reduces array copies.

**Use `String` for stable values**; use `StringBuilder` for **assembly lines** of text.

---

## 9. Small practice task

Build the string `"(0)(1)(2)...(9)"` using **only** `append` in a loop (no `+` on `String` inside the loop). Print with one `toString()`.

---

## Beginner tip

If a profiler or senior says “too many `String` allocations here,” your first fix is often **one builder** instead of **many `+`**.
