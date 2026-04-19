---
title: "Chapter 103: Callable and Future in Java — Typed Results, Exceptions Through get, and Timeouts"
description: "Use Callable for tasks that return a value and throw checked exceptions, consume results with Future get and timeouts, cancel work, and compare Callable to Runnable for executor.submit."
category: "Java"
tags:
  - Java Callable Future
  - Java Future get timeout
  - Java Callable vs Runnable
  - Java ExecutorService submit Callable
  - Java cancel future
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 103
---

# Chapter 103: Callable and Future in Java

**`Runnable.run()`** returns **`void`** and **cannot** declare **checked exceptions**. **`Callable<V>`** adds **`V call() throws Exception`**—executors map that to **`Future<V>`**, a **handle** for **completion**, **result**, **failure**, and **cancellation**.

---

## 1. Topic title

**Callable + Future: return values and propagate errors across thread boundaries**

---

## 2. What it means

```java
import java.util.concurrent.Callable;

Callable<Integer> job = () -> {
    Thread.sleep(50);
    return 7;
};
```

**`ExecutorService.submit(callable)`** returns **`Future<Integer>`**. **`future.get()`** blocks until **done**, then returns **`7`**, or wraps **`ExecutionException`** around whatever **`call`** threw.

**`get(timeout, TimeUnit)`** throws **`TimeoutException`** if not finished—**essential** for **responsiveness**.

---

## 3. Why it is used

**Parallel decomposition** — fan out **CPU** chunks, **`get()`** each **`Future`** when **all** must finish.

**Async bridges** in **older** code before **`CompletableFuture`** (Chapter 104) became the default **composition** tool.

---

## 4. Mental sketch

**`Runnable`** is a **postcard** with **no return address**. **`Callable`** is a **self-addressed stamped envelope**—the **pool** mails back **`Future`**, and **`get()`** is you **opening** the reply (sometimes **waiting** at the mailbox).

---

## 5. Java code example

```java
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CallableFutureDemo {
    public static void main(String[] args)
            throws ExecutionException, InterruptedException, TimeoutException {
        ExecutorService pool = Executors.newSingleThreadExecutor();
        try {
            Future<Integer> f = pool.submit(() -> 21 * 2);

            Integer early = f.get(1, TimeUnit.SECONDS);
            System.out.println("result=" + early);

            Future<Integer> bad = pool.submit(() -> {
                throw new IllegalStateException("boom");
            });
            try {
                bad.get();
            } catch (ExecutionException ex) {
                System.out.println("cause=" + ex.getCause().getClass().getSimpleName());
            }
        } finally {
            pool.shutdown();
        }
    }
}
```

**`ExecutionException.getCause()`** unwraps the **original** throwable from **`call()`**.

---

## 6. Explanation of code

**`cancel(true)`** (not shown) **interrupts** the worker if **running** and **may not stop** IO unless the task **cooperates** with **`interrupt`**. **`isDone`** / **`isCancelled`** poll state without **blocking**.

---

## 7. Common mistakes

**Calling `get()` on the pool thread** that cannot make progress—**deadlock** if you **wait for yourself**.

**Ignoring `InterruptedException` on `get`**—loses **shutdown** signals; **restore interrupt** or **rethrow** wrapped.

**Swallowing `ExecutionException`** without logging **`getCause()`**—hides **real** bugs.

---

## 8. Best practices

Batch **`Future.get`** with **timeouts**; if **one** times out, **cancel** siblings you no longer need to save **CPU**.

Prefer **`invokeAll`** with a **timeout overload** when submitting **many** **`Callable`** instances at once.

---

## 9. Small practice task

Submit **three** **`Callable<Integer>`** tasks that **`sleep`** different durations and **`return`** their **index**; print results in **submission order** using **`List<Future>`** and **`get()`** in a **loop**.

---

## Beginner tip

**`Future` is easy to block on**—if you chain **many** dependent steps, **`CompletableFuture`** usually **reads cleaner** than **nested `get()`** calls.
