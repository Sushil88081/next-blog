---
title: "Chapter 104: CompletableFuture in Java — Async Pipelines, thenApply, exceptionally, and ForkJoinPool"
description: "Build async pipelines with CompletableFuture supplyAsync and thenApply, handle failures with exceptionally, choose join vs get, and know the commonPool defaults for async stages."
category: "Java"
tags:
  - Java CompletableFuture
  - Java supplyAsync thenApply
  - Java exceptionally async
  - Java CompletableFuture join
  - Java ForkJoinPool commonPool
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 104
---

# Chapter 104: CompletableFuture in Java

**`CompletableFuture<T>`** implements **`Future<T>`** but shines as a **composition** API: **supply** a value **async**, **transform** it with **`thenApply`**, **chain** async steps with **`thenCompose`**, **combine** futures, and **recover** with **`exceptionally`** or **`handle`**.

It is the **default mental model** for **non-blocking style** in **modern** Java libraries—still built on **threads** and **executors** underneath.

---

## 1. Topic title

**CompletableFuture: explicit completion, pipelined stages, and structured error propagation**

---

## 2. What it means

```java
import java.util.concurrent.CompletableFuture;

CompletableFuture<String> cf = CompletableFuture.supplyAsync(() -> "hi")
        .thenApply(s -> s.toUpperCase());
```

**`supplyAsync`** runs **`Supplier`** on **`ForkJoinPool.commonPool()`** unless you pass an **`Executor`**. **`thenApply`** runs on the **same** stage’s **completion executor** rules (defaults often **same thread** that completed the **previous** stage—**read the javadoc** when **ordering** matters).

---

## 3. Why it is used

**Microservice glue** — parallel **HTTP** fetches then **merge** JSON.

**UI / reactive backends** — avoid **blocking** request threads when **I/O** libraries expose **async** APIs.

---

## 4. Mental sketch

**`Future.get()`** is **one phone call** that **waits**. **`CompletableFuture`** is a **recipe card** with **boxes**—each box **fills in** when **ingredients** arrive; **`exceptionally`** is the **“if burn, serve salad”** fallback line.

---

## 5. Java code example

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        CompletableFuture<Integer> ok = CompletableFuture.supplyAsync(() -> 10)
                .thenApply(x -> x + 1)
                .thenApply(x -> x * 2);

        System.out.println("ok=" + ok.get());

        CompletableFuture<Integer> bad = CompletableFuture.supplyAsync(() -> {
                    throw new IllegalStateException("fail");
                })
                .exceptionally(ex -> -1);

        System.out.println("bad=" + bad.join());
    }
}
```

**`join()`** is like **`get()`** but wraps **`CompletionException`** around **unchecked** causes—handy when **APIs forbid** **`throws Exception`**.

---

## 6. Explanation of code

**`exceptionally`** receives **`Throwable`** and **returns a replacement value**—good for **defaults**, not for **hiding** every **bug** without **logging**.

**`allOf` / `anyOf`** (not shown) **aggregate** multiple **`CompletableFuture<?>`** instances—**`allOf`** returns **`CompletableFuture<Void>`**; you still **`join`** each **source** to read **results**.

---

## 7. Common mistakes

**Blocking everywhere with `get()`**—defeats the **pipeline** unless you are at a **true** boundary (HTTP response, **`main`** demo).

**Assuming `commonPool()` is right for blocking IO**—can **starve** **CPU** stages; pass a **dedicated executor** for **blocking** work.

**Fire-and-forget async without exception handling**—**uncaught** **`CompletionException`** surfaces to **`Thread.getDefaultUncaughtExceptionHandler()`** in **some** paths—**always** attach **`whenComplete`** for **logging** in **servers**.

---

## 8. Best practices

Use **`thenCompose`** (monadic **flatMap**) when the **next step returns another CompletableFuture**—avoids **`CompletableFuture<CompletableFuture<T>>`**.

Copy **MDC / trace context** in **`executor`** wrappers or **`whenComplete`** if you **log** across **stages**.

---

## 9. Small practice task

Chain **`supplyAsync(() -> readLine())`** (stub with a **fixed string**) to **`thenApply(String::length)`** and print—then add **`orTimeout(100, MILLISECONDS)`** (Java 9+) and trigger **`TimeoutException`** with a **slow stub**.

---

## Beginner tip

Draw your **`CompletableFuture`** graph on **paper**—**diamond** joins and **error** paths get **messy** fast; **paper** catches **missing** **`exceptionally`** branches before **production** does.
