---
title: "Chapter 98: Runnable Interface in Java — Task vs Thread, Lambdas, and Composition"
description: "Implement java.lang.Runnable to separate work from Thread lifecycle, use lambdas for short tasks, and see why Runnable fits executors and testing better than subclassing Thread."
category: "Java"
tags:
  - Java Runnable interface
  - Java Runnable vs Thread
  - Java lambda Runnable
  - Java task separation threading
  - Java Runnable executor
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 98
---

# Chapter 98: Runnable Interface in Java

**`Runnable`** describes **what to run**—a **`void run()`** with **no checked exceptions** allowed through the signature. **`Thread`** is **how** that work gets a **stack** and **scheduler ticket**. Keeping the **task** in **`Runnable`** (or **`Callable`** later) keeps designs **composable** and **testable**.

---

## 1. Topic title

**Runnable: the portable “no-args void job” shape the JVM and executors both understand**

---

## 2. What it means

```java
public class Greeter implements Runnable {
    private final String msg;

    public Greeter(String msg) {
        this.msg = msg;
    }

    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + ": " + msg);
    }
}
```

**`new Thread(new Greeter("hi")).start()`** — **`Thread`** owns **thread-ness**; **`Greeter`** owns **business text**.

---

## 3. Why it is used

**Single inheritance** — your domain class may already **`extend`** something; **`implements Runnable`** still fits.

**Executor APIs** — **`Executor.execute(Runnable)`** is the **narrow** contract pools are built around.

**Unit tests** — call **`run()`** directly on the **same** thread to verify logic **without** flaking on scheduling.

---

## 4. Mental sketch

**`Thread`** is the **delivery truck**. **`Runnable`** is the **parcel**. Same parcel can be carried by **different trucks** (thread pools swap workers); subclassing **`Thread`** glues the **parcel** to **one truck model**.

---

## 5. Java code example

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class RunnableDemo {
    public static void main(String[] args) {
        Runnable quick = () -> System.out.println("lambda on " + Thread.currentThread().getName());

        new Thread(quick, "plain-thread").start();

        ExecutorService pool = Executors.newFixedThreadPool(2);
        pool.submit(quick);
        pool.submit(quick);
        pool.shutdown();
    }
}
```

**`submit`** accepts **`Runnable`** (and returns a **`Future<?>`** you can ignore for **`void`** tasks).

---

## 6. Explanation of code

**Lambdas** that match **`() -> void`** automatically implement **`Runnable`**. **`Executors.newFixedThreadPool`** reuses **two** worker threads—**`quick`** may run **twice** on the **same** worker name; that is **normal**.

---

## 7. Common mistakes

**Throwing checked exceptions from `run()`**—signature forbids **`throws`**; wrap in **`RuntimeException`** or use **`Callable`** (Chapter 103).

**Capturing non-final mutable locals** incorrectly in lambdas—compiler rules help, but **shared** mutable fields still **race** across threads.

---

## 8. Best practices

Keep **`run()`** **short**—delegate to **`private`** methods so **`Runnable`** stays a **thin adapter**.

Document **thread-safety** expectations on classes whose **`run()`** touches **static** or **injected** shared state.

---

## 9. Small practice task

Write **`class CounterJob implements Runnable`** with an **`int` field `n`**; **`run()`** prints **`n..1`**. Instantiate **one** **`CounterJob`** and pass the **same instance** to **two** threads—observe why **shared mutable state** needs synchronization (preview Chapter 100).

---

## Beginner tip

If **`run()`** is hard to test because it **spawns** more threads, extract the **pure** part (compute result, build string) and keep **`run()`** as a **one-liner** delegator.
