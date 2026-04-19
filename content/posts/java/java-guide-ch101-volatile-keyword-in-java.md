---
title: "Chapter 101: volatile Keyword in Java — Visibility, Happens-Before, and What It Does Not Fix"
description: "Use volatile for safe publication and visibility of writes across threads, understand happens-before with reads, and avoid mistaking volatile for atomicity on read-modify-write."
category: "Java"
tags:
  - Java volatile keyword
  - Java memory visibility
  - Java happens before volatile
  - Java volatile vs synchronized
  - Java thread safe flag
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 101
---

# Chapter 101: volatile Keyword in Java

**`volatile`** marks a **field** so that **reads** and **writes** go through **main memory** rules the JMM defines: a **write** to a **`volatile`** variable **happens-before** any subsequent **read** of that same variable by **another** thread. That gives **visibility**—other threads **see** the latest value—not a general **mutex** over arbitrary **compound** operations.

Chapter 100 fixed **mutual exclusion** with **`synchronized`**. **`volatile`** answers a **narrower** question: **“Did thread A publish a new value for this one flag?”**

---

## 1. Topic title

**volatile: ordered visibility for a single field’s write/read pair—not a lock for whole objects**

---

## 2. What it means

```java
public class ShutdownFlag {
    private volatile boolean stop;

    public void requestStop() {
        stop = true;
    }

    public boolean shouldStop() {
        return stop;
    }
}
```

Without **`volatile`**, a **worker** thread might **cache** **`stop == false`** forever even after **`requestStop()`** ran on **`main`**—**visibility bug**, not always reproducible.

**`volatile`** does **not** make **`count++`** atomic—still **read-modify-write** on a **non-volatile** **`int`** needs **`synchronized`**, **`AtomicInteger`**, or **`VarHandle`** patterns.

---

## 3. Why it is used

**Cooperative shutdown** flags, **state machine** phase markers, **double-checked** initialization **when done correctly** (often easier: **static holder** idiom or **`enum`** singleton).

**Single-writer** counters are **still unsafe** with **`volatile`** if **multiple** threads **increment**—do not do it.

---

## 4. Mental sketch

**`synchronized`** is a **meeting room** with **one key**. **`volatile`** is a **public bulletin board**: everyone **must** look at the **latest** flyer for **that** pin—but **tearing** a coupon (**increment**) is **still two steps** unless the **rules** say otherwise.

---

## 5. Java code example

```java
public class VolatileDemo {
    private static volatile int published;

    public static void main(String[] args) throws InterruptedException {
        Thread writer = new Thread(() -> {
            try {
                Thread.sleep(20);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return;
            }
            published = 42;
        });

        Thread reader = new Thread(() -> {
            int local = 0;
            while (local == 0) {
                local = published;
            }
            System.out.println("saw " + local);
        });

        reader.start();
        writer.start();
        reader.join();
        writer.join();
    }
}
```

**`while (local == 0)`** spins on a **stack copy**; assigning **`published`** into **`local`** each iteration eventually observes **`42`** once the writer **commits**.

---

## 6. Explanation of code

**`volatile`** forbids certain **reorderings** around the field access so **reader** cannot **observe stale 0** forever after **`published = 42`** completes. **Busy spin** is **CPU-wasteful**—production code prefers **`wait`/`notify`**, **`Lock`**, **`BlockingQueue`**, or **`CompletableFuture`**—here it **shows** visibility.

---

## 7. Common mistakes

**`volatile` on a reference** publishes the **pointer** write, not **deep immutability** of the **object’s fields**—if **other** fields mutate **after** publish without **synchronization**, readers can see **partial** state.

**Using volatile instead of locks** for **compound invariants** (balance transfer, **`if (x) then y++`**).

---

## 8. Best practices

Prefer **immutable messages** on queues over **shared volatile** toggles when the design allows.

When in doubt on **one-time** lazy init, use **`class Holder { static final X x = new X(); }`**—**initialization-on-demand holder** is **simple** and **correct** without **DCL** gymnastics.

---

## 9. Small practice task

Run **`VolatileDemo`** **many** times; then remove **`volatile`** from **`published`** and run again on a **quiet** laptop—note how **hard** the hang becomes to **reproduce** while still being a **real** bug class.

---

## Beginner tip

If someone says **“just add volatile”** to fix **multithreaded** corruption, ask **which invariant** needs **atomicity** vs **visibility**—often the answer is **`synchronized`**, **`java.util.concurrent`**, or **redesign**, not **`volatile` alone**.
