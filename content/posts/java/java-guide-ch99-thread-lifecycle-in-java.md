---
title: "Chapter 99: Thread Lifecycle in Java — States, sleep, join, and Interrupt Cooperation"
description: "Map Java Thread.State NEW through TERMINATED, understand RUNNABLE vs blocked waiting, and use sleep, join, and interrupt correctly for cooperative lifecycle control."
category: "Java"
tags:
  - Java thread lifecycle
  - Java Thread State enum
  - Java Thread sleep join
  - Java thread interrupt
  - Java blocked waiting timed waiting
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 99
---

# Chapter 99: Thread Lifecycle in Java

Every **`Thread`** moves through **states** exposed by **`Thread.State`**: **`NEW`**, **`RUNNABLE`**, **`BLOCKED`**, **`WAITING`**, **`TIMED_WAITING`**, **`TERMINATED`**. You do not “set” most states by hand—you **call APIs** (**`start`**, **`sleep`**, **`join`**, **`wait`**, **`park`**, lock acquisition) and the JVM **transitions** the thread.

---

## 1. Topic title

**Lifecycle: start once, run until `run()` returns or uncaught exception, then TERMINATED**

---

## 2. What it means

- **`NEW`** — constructed, **`start()`** not yet called successfully.
- **`RUNNABLE`** — eligible to run (may actually be **running** on a core or **ready** in the scheduler queue).
- **`BLOCKED`** — waiting to **enter** a **`synchronized`** block/monitor (Chapter 100).
- **`WAITING`** / **`TIMED_WAITING`** — parked in **`Object.wait`**, **`Thread.join`**, **`LockSupport.parkNanos`**, **`sleep`**, etc., with or without a **timeout**.
- **`TERMINATED`** — **`run()`** finished **normally** or via **uncaught** throwable.

---

## 3. Why it is used

**Reasoning about hangs** — thread dumps list **states**; knowing names maps **BLOCKED** vs **`WAITING`** to **locks** vs **conditions**.

**Shutdown design** — **`join`** with **timeouts** or **interrupt** tells threads **“wrap up.”**

---

## 4. Mental sketch

**`RUNNABLE`** is “**in the arena**.” **`WAITING`** is “**in the waiting room** until someone pages you**.” **`BLOCKED`** is “**at the door** waiting for the **key** (**monitor**) another thread holds.” **`TERMINATED`** is “**went home**.”

---

## 5. Java code example

```java
public class LifecycleDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            try {
                System.out.println("working " + Thread.currentThread().getState());
                Thread.sleep(200);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        System.out.println("before start: " + worker.getState());
        worker.start();
        Thread.sleep(10);
        System.out.println("likely timed_waiting: " + worker.getState());
        worker.join();
        System.out.println("after join: " + worker.getState());
    }
}
```

**`getState()`** on **another** thread is a **snapshot**—by the time you print, it may already have moved—still useful **in aggregate** in dumps.

---

## 6. Explanation of code

**`join()`** blocks the **caller** until **`worker`** completes—**`main`** becomes **`WAITING`** on **`worker`**’s termination (implementation detail: **`WAITING`**/**`TIMED_WAITING`** depending on overload).

**`sleep`** moves the **current** thread to **`TIMED_WAITING`** without releasing **monitors**—if you hold **`synchronized`**, others still **BLOCKED**.

---

## 7. Common mistakes

**Busy-wait loops** (`while (!ready) { }`)—burn CPU; prefer **`join`**, **`CountDownLatch`**, **`Phaser`**, or **concurrent** structures.

**Swallowing interrupt** without **`interrupt()`** again—breaks **cancellation** contracts up the stack.

**Assuming `RUNNABLE` means “on CPU now”**—it only means **not parked** in the **listed** waiting categories.

---

## 8. Best practices

Use **timeouts** on **`join(long)`** for **controlled** shutdown, then log if threads **stick**.

Learn to read **`jstack`** / IDE **thread dump** output early—**lifecycle vocabulary** becomes **real** there.

---

## 9. Small practice task

Spawn a thread that **loops** five times with **`sleep(100)`**; from **`main`**, poll **`getState()`** in a **`for`** loop with **`sleep(30)`** and print **each** distinct state you observe (expect **`RUNNABLE`**/**`TIMED_WAITING`**/**`TERMINATED`** glimpses).

---

## Beginner tip

**`Thread.yield()`** exists but is a **weak hint**—do not build **correctness** on it; use **proper** coordination primitives when **order** matters.
