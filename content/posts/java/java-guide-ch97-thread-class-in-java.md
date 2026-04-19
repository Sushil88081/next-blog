---
title: "Chapter 97: Thread Class in Java — start vs run, Naming, Priorities, and Daemon Threads"
description: "Use java.lang.Thread: start versus run, thread names and IDs, priority as a hint, daemon threads, and why subclassing Thread is usually the wrong default."
category: "Java"
tags:
  - Java Thread class
  - Java start vs run
  - Java daemon thread
  - Java thread priority
  - Java create thread
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 97
---

# Chapter 97: Thread Class in Java

**`java.lang.Thread`** is the **built-in** way to create a **platform thread** tied to a **`Runnable`** task. The critical API split is **`start()`** (schedules **new** execution) versus **`run()`** (just **calls** the method on the **current** thread—almost never what you want for concurrency).

---

## 1. Topic title

**Thread + Runnable: construct, start once, let the JVM schedule run on a worker stack**

---

## 2. What it means

```java
Thread t = new Thread(() -> System.out.println("hi from " + Thread.currentThread().getName()));
t.setName("worker-1");
t.start(); // NOT t.run()
```

**`start()`** is **idempotent in spirit** only once—calling **`start()`** twice throws **`IllegalThreadStateException`**. **`run()`** does **not** start anything new; it is the **entry** the JVM calls **after** **`start()`** succeeds.

---

## 3. Why it is used

**Explicit lifetimes** when learning or prototyping **low-level** behavior (timers, **JVMTI**-style demos, tiny CLIs).

**Integration** with APIs that still expose **`Thread`** directly (older libraries, some **GUI** toolkits).

---

## 4. Mental sketch

**`start()`** rings a **bell** for the OS scheduler: “please run this **recipe** on **another** cook when you can.” **`run()`** is reading the **recipe aloud yourself**—same kitchen, same cook, **no** new parallelism.

---

## 5. Java code example

```java
public class ThreadClassDemo {
    public static void main(String[] args) throws InterruptedException {
        Runnable job = () -> {
            for (int i = 0; i < 3; i++) {
                System.out.println(Thread.currentThread().getName() + " i=" + i);
                try {
                    Thread.sleep(50);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return;
                }
            }
        };

        Thread a = new Thread(job, "alpha");
        Thread b = new Thread(job, "beta");
        a.start();
        b.start();
        a.join();
        b.join();
        System.out.println("main done");
    }
}
```

**`join()`** makes **`main`** **wait** until each thread **finishes**—handy in **toy** programs so the VM does not exit early.

---

## 6. Explanation of code

**`Thread(Runnable target, String name)`** wires **task + label**. **`sleep`** yields time without releasing **locks** you might hold (important later with **`synchronized`**). **`interrupt()`** sets a flag; blocking methods may throw **`InterruptedException`**—re-interrupt on catch **preserves** the signal for callers.

**`setDaemon(true)`** (not shown) marks a thread as **daemon**: JVM **will not wait** for it at shutdown—good for **background** chores, risky if they **own** data you still need flushed.

---

## 7. Common mistakes

**Calling `run()` instead of `start()`**—everything runs on **`main`**; looks “threaded” in logs only if you squint wrong.

**Ignoring `InterruptedException`** with an empty **`catch`**—hides cooperative shutdown and breaks **`ExecutorService`** shutdown patterns.

**Overusing `setPriority`**—priorities are **hints**, not **real-time guarantees**; behavior differs by OS.

---

## 8. Best practices

Implement **`Runnable`** (or use a **lambda**) and pass it to **`new Thread(...)`** or, in production-style code, hand it to an **`ExecutorService`** (Chapter 102).

Name threads **`meaningfully`**—when a log line shows **`http-worker-7`**, you **thank** yourself.

---

## 9. Small practice task

Create **two** threads that each **`sleep`** a **random** 0–200 ms between prints; observe **nondeterministic** interleaving across several runs.

---

## Beginner tip

If unit tests **flake** only on **CI**, suspect **timing** and **ordering**—**`Thread.sleep`** in tests is a **smell**; still, for **learning**, it makes **scheduling** visible.
