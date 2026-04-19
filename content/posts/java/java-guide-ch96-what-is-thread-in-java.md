---
title: "Chapter 96: What is Thread? in Java — Concurrency, the JVM, and Why Parallelism Shows Up Everywhere"
description: "Understand what a thread is in Java: OS threads and the JVM, the main thread, concurrency vs parallelism, and when splitting work across threads actually helps."
category: "Java"
tags:
  - Java threads explained
  - Java concurrency basics
  - Java main thread
  - Java multithreading introduction
  - Java what is a thread
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 96
---

# Chapter 96: What is Thread? in Java

Your program already runs on at least **one thread**: **`main`**. **Multithreading** means **more than one** thread of execution **inside the same JVM process**, sharing **heap memory** but each with its **own call stack**.

This chapter names the idea **before** you memorize **`Thread`** APIs—**why** threads exist matters more than **how** to spawn them carelessly.

---

## 1. Topic title

**Thread: an independent sequence of instructions the scheduler can run alongside others**

---

## 2. What it means

Rough picture:

- **Process** — an OS-level program instance (your JVM is one).
- **Thread** — a **lightweight** unit inside that process; the JVM maps Java threads to **platform threads** (classic model: one Java thread ≈ one OS thread).

**Concurrency** is **dealing with** many tasks **overlapping in time** (one core can **interleave** them). **Parallelism** is **doing** work **at the same instant** on **multiple cores**. Threads help with **both**, but they are not magic: **coordination**, **locks**, and **I/O** dominate real behavior.

---

## 3. Why it is used

**Responsiveness** — keep the UI or request path from freezing while something slow runs.

**Throughput** — split **CPU-bound** chunks across cores when the problem **divides cleanly**.

**Structure** — isolate **blocking I/O** or **message handling** into dedicated workers.

---

## 4. Mental sketch

A **single-threaded** kitchen: one cook finishes dish A, then dish B. **Threads**: several cooks **share the pantry (heap)** but each follows **their own recipe card (stack)**. If two cooks grab the **same** pan without rules, dinner **burns**—that is why later chapters add **`synchronized`**, **`volatile`**, and **executors**.

---

## 5. Java code example

```java
public class ThreadBasicsDemo {
    public static void main(String[] args) {
        Thread current = Thread.currentThread();
        System.out.println("name=" + current.getName());
        System.out.println("state=" + current.getState());
    }
}
```

Typical output includes **`name=main`** and **`state=RUNNABLE`** (the scheduler may **park** threads briefly; **`RUNNABLE`** means “not in **`BLOCKED`/`WAITING`/`TIMED_WAITING`**” per **`Thread.State`**).

---

## 6. Explanation of code

**`Thread.currentThread()`** is how any method asks **“who is running me?”** The **`main`** method always starts on the **main thread**—the one the launcher creates before **`main`** executes.

---

## 7. Common mistakes

**Assuming “more threads = faster”** on **one** contended resource—threads **wait** on each other and **context-switch** cost grows.

**Treating threads as “free async”** without defining **ownership** of shared data—**data races** are undefined behavior territory in spirit even when the program “usually works.”

---

## 8. Best practices

Learn the **happens-before** story **gradually**—start with **immutable** shared data and **message passing** patterns before clever shared **mutable** caches.

Prefer **higher-level** tools (**`ExecutorService`**, **`CompletableFuture`**) for app code once you understand **what a thread is**—raw **`Thread`** is a sharp scalpel.

---

## 9. Small practice task

Print **`Thread.currentThread().getName()`** from **`main`** and again from a **second** thread you start with **`new Thread(() -> ...).start()`** (you may peek ahead to Chapter 97)—confirm **two different names**.

---

## Beginner tip

When debugging, log **`Thread.currentThread().getName()`** at the **start** of suspicious methods—**half** of “impossible” interleaving bugs become **obvious** once you see **which** thread actually called the code.
