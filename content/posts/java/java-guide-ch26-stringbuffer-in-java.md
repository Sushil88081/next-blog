---
title: "Chapter 26: StringBuffer in Java — Synchronized Mutable Buffers and Legacy APIs"
description: "Learn Java StringBuffer: same operations as StringBuilder but synchronized, when that matters, performance cost, and where you still see it in older code."
category: "Java"
tags:
  - Java StringBuffer
  - Java StringBuffer vs StringBuilder
  - Java synchronized string buffer
  - Java StringBuffer thread safe
  - Java StringBuffer append
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 26
---

# Chapter 26: StringBuffer in Java

This chapter is **only** about **`StringBuffer`**: a **mutable** character sequence like `StringBuilder`, but **synchronized** so multiple threads can call methods on the **same instance** without corrupting internal state (at the cost of speed). **`StringBuilder`** was Chapter 25.

---

## 1. Topic title

**`StringBuffer`: thread-safe sibling of `StringBuilder` with almost the same API**

---

## 2. What it means

`StringBuffer` has **`append`**, **`insert`**, **`delete`**, **`reverse`**, **`length`**, **`capacity`**, **`toString`**, and related methods—mirroring `StringBuilder` because both extend **`AbstractStringBuilder`** under the hood.

The key difference: critical methods are declared **`synchronized`**, so only one thread at a time mutates that buffer on that object.

---

## 3. Why it is used

Before `StringBuilder` existed (Java 5), **`StringBuffer` was the standard** way to build strings efficiently. Older libraries and tutorials still reference it.

Today you choose `StringBuffer` when **multiple threads** truly share **one** growing text buffer—rare in application code. Most of the time each thread uses its **own** `StringBuilder`.

---

## 4. Real-world example

A **logging framework** from the early 2000s might accumulate log lines in a shared buffer from many threads—`StringBuffer` would have been a defensible choice then. Modern loggers use different architectures (queues, async appenders), but you will still **`grep` StringBuffer** in legacy enterprise jars.

---

## 5. Java code example

```java
public class StringBufferDemo {
    public static void main(String[] args) {
        StringBuffer buf = new StringBuffer("log: ");
        buf.append("start").append(' ').append(404);
        System.out.println(buf.toString());

        buf.insert(4, "[WARN] ");
        System.out.println(buf);

        buf.delete(4, 11);
        System.out.println(buf);

        StringBuffer b2 = new StringBuffer(10);
        b2.append("0123456789extra");
        System.out.println("len=" + b2.length() + " cap=" + b2.capacity());
    }
}
```

Same mental model as `StringBuilder` for **how** you edit text.

---

## 6. Explanation of code

- **`append` chaining** works like `StringBuilder`.
- **`insert` / `delete`** use the same index rules.
- **Capacity grows** when you exceed internal storage—synchronized methods make each growth step safe under contention (slower than unsynchronized growth).

---

## 7. Common mistakes

**Using `StringBuffer` “just to be safe”** on single-threaded code—paying synchronization tax for no benefit.

**Assuming “thread-safe” means your whole logging design is safe**—you still need correct visibility rules for **publishing** the buffer reference across threads (`volatile`, proper handoff, etc.).

**Mixing `StringBuilder` and `StringBuffer` in one codebase** without a rule—pick one default for new code (`StringBuilder`) and isolate `StringBuffer` to legacy boundaries.

---

## 8. Best practices

**Default to `StringBuilder`** for new single-threaded string assembly.

**Use `StringBuffer` only with a comment** explaining shared multi-thread mutation—or refactor to per-thread builders.

**Convert to `String`** at system boundaries (HTTP response, file write) with `toString()`.

---

## 9. Small practice task

Write a program that creates **`StringBuffer`**, appends your name and the current loop index from 0 to 4 on separate lines inside the buffer using `append('\n')`, then prints once. (Single-threaded—note in a comment that `StringBuilder` would be preferred in new code.)

---

## Beginner tip

If interviewers ask “difference between `StringBuilder` and `StringBuffer`,” the one-liner is: **same shape, `StringBuffer` is synchronized and slower under contention.**
