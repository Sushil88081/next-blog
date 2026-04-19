---
title: "Chapter 102: ExecutorService in Java — Thread Pools, submit vs execute, and Graceful Shutdown"
description: "Use ExecutorService and Executors factories for pooled workers, choose execute vs submit, and shut down with shutdown, awaitTermination, and shutdownNow without orphaning tasks."
category: "Java"
tags:
  - Java ExecutorService
  - Java thread pool
  - Java Executors newFixedThreadPool
  - Java executor shutdown
  - Java submit vs execute
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 102
---

# Chapter 102: ExecutorService in Java

Raw **`new Thread(...).start()`** per task **does not scale**: **thread creation** costs memory, and **unbounded** threads can **stall** the OS. **`ExecutorService`** is an **interface** for **submitting tasks** to a **managed pool**—reuse **worker threads**, **queue** excess work, and **coordinate shutdown**.

---

## 1. Topic title

**ExecutorService: decouple “what to run” from “how many threads exist right now”**

---

## 2. What it means

Common factories in **`java.util.concurrent.Executors`**:

- **`newFixedThreadPool(n)`** — at most **`n`** workers; **unbounded queue** (watch **memory** if producers outpace consumers).
- **`newCachedThreadPool()`** — grows under load; good for **short** tasks; risky if tasks **block** forever.
- **`newSingleThreadExecutor()`** — strict **FIFO**-like **serialization** without you juggling **`synchronized`** for **ordering** (still not a **fairness** guarantee for **your** locks).

**`execute(Runnable)`** — fire-and-forget; exceptions may hit the **`Thread.UncaughtExceptionHandler`**.

**`submit(Runnable)`** / **`submit(Callable)`** — returns **`Future<?>`** / **`Future<T>`** for **observation** and **cancellation** (Chapter 103).

---

## 3. Why it is used

**Server request handling** maps naturally to **pools**—bounded **workers**, bounded or **monitored** queues.

**Batch jobs** reuse threads across **thousands** of small **`Runnable`** units.

---

## 4. Mental sketch

**`Thread`** is hiring a **new temp** for every box you move. **`ExecutorService`** is a **warehouse crew** on **shift**—you **drop tickets** on a **cart**; the **crew** pulls the next ticket when **free**.

---

## 5. Java code example

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ExecutorServiceDemo {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService pool = Executors.newFixedThreadPool(2);

        for (int i = 0; i < 5; i++) {
            final int task = i;
            pool.submit(() -> {
                System.out.println(Thread.currentThread().getName() + " task=" + task);
                try {
                    Thread.sleep(30);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
        }

        pool.shutdown();
        if (!pool.awaitTermination(2, TimeUnit.SECONDS)) {
            pool.shutdownNow();
        }
        System.out.println("pool stopped");
    }
}
```

**`shutdown()`** stops **accepting new** tasks; **queued** work still runs. **`awaitTermination`** waits politely; **`shutdownNow()`** tries to **interrupt** workers and returns **pending** tasks.

---

## 6. Explanation of code

**Two** threads **multiplex** **five** tasks—**interleaving** changes run to run. **`shutdown`** + **`awaitTermination`** is the **minimum** polite lifecycle for **main**-driven demos; **servers** wire the same idea into **hooks** on **SIGTERM**.

---

## 7. Common mistakes

**Never calling `shutdown`** on a **fixed** pool—JVM **hangs** at exit because **non-daemon** workers **stay alive**.

**Unbounded queue + slow consumers** — **memory** grows until **OOM**; production often uses **`ThreadPoolExecutor`** with **explicit** queue bounds and **rejection policies**.

**Blocking tasks on `cached`** pool—can **spawn** enormous thread counts **historically**; always **understand** workload shape.

---

## 8. Best practices

For **new** server code, **`Executors`** factories are a **learning** step; **`ThreadPoolExecutor`** directly (or a **framework** pool) gives **named** threads, **metrics**, and **bounded** queues.

**Name thread factories** — **`new ThreadFactoryBuilder().setNameFormat("worker-%d").build()`** in Guava style, or a **5-line** custom **`ThreadFactory`**.

---

## 9. Small practice task

Change the demo to **`newSingleThreadExecutor()`** and confirm **task order prints** match **submission order** (for **that** executor’s **queue** semantics)—then reason why **your** **`Runnable`** must still avoid **throwing unchecked** exceptions without handling.

---

## Beginner tip

**`try (ExecutorService pool = Executors.newFixedThreadPool(4))`** works on **Java 19+** where **`ExecutorService`** extends **`AutoCloseable`** with **shutdown** semantics—on **older** JDKs, stick to **explicit** **`shutdown`/`awaitTermination`**.
