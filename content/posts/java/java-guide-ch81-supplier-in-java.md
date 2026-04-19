---
title: "Chapter 81: Supplier in Java — Lazy Values, Optional.orElseGet, and Stream.generate"
description: "Learn java.util.function.Supplier: get with no arguments, deferring expensive work, Optional factory patterns, and Stream.generate for infinite-style sequences with limit."
category: "Java"
tags:
  - Java Supplier
  - Java Supplier get
  - Java Optional orElseGet
  - Java Stream generate
  - Java lazy initialization Supplier
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 81
---

# Chapter 81: Supplier in Java

**`Supplier<T>`** is the **`T get()`** shape: **no input**, **one output**. It pairs naturally with **`Consumer`** (Chapter 80) in diagrams—**pull** vs **push**.

Use it when you want to **delay work** until someone actually asks for the value, or when an API needs a **factory callback** instead of a **pre-built object**.

---

## 1. Topic title

**Supplier: a no-arg factory you can pass around like any other lambda**

---

## 2. What it means

Unlike **`Function`**, there is **nothing to apply**—you only **`get()`** when ready. **`Optional.orElseGet(Supplier<? extends T>)`** is the textbook example: if the **`Optional`** is **empty**, Java calls your **`Supplier`** once to build the **fallback**; if **present**, your **`Supplier`** is **skipped**—cheap when the fallback is costly.

---

## 3. Why it is used

**Lazy defaults**, **memoization hooks**, **random seed sources**, **`Stream.generate`** seeds—anywhere **“give me the next `T` on demand”** reads clearer than **`() -> new Thing()`** jammed inline without a name.

---

## 4. Mental sketch

**`Consumer`** eats a donut you hand it. **`Supplier`** is the **kitchen window**—you knock **`get()`**, maybe you receive a **fresh donut** each time, maybe the same recipe runs again.

---

## 5. Java code example

```java
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Supplier;
import java.util.stream.Stream;

public class SupplierDemo {
    public static void main(String[] args) {
        Supplier<String> lazyMsg =
                () -> {
                    System.out.println("building fallback…");
                    return "guest";
                };
        Optional<String> name = Optional.empty();
        System.out.println(name.orElseGet(lazyMsg));

        AtomicInteger seq = new AtomicInteger(1);
        Supplier<Integer> ids = seq::getAndIncrement;
        Stream.generate(ids).limit(4).forEach(System.out::println);
    }
}
```

First block prints **`building fallback…`** once, then **`guest`**. Second prints **`1`–`4`** from the **atomic** counter.

---

## 6. Explanation of code

**`orElseGet`** takes a **`Supplier`**; **`orElse("guest")`** would build the string **even when not needed**—fine for constants, wrong for **`new DatabaseConnection()`**-style work.

---

## 7. Common mistakes

**Passing `orElse(expensive())` by accident**—argument **evaluates eagerly**. Switch to **`orElseGet(() -> expensive())`**.

**Infinite `Stream.generate` without `limit`**—your program **hangs** printing forever.

---

## 8. Best practices

Name suppliers **`clock`**, **`idSource`**, **`fallbackLoader`** when storing in fields—call sites read like intent.

Prefer **`IntSupplier`** / **`LongSupplier`** when **`int`/`long`** streams avoid boxing noise.

---

## 9. Small practice task

Write **`Supplier<Double>`** returning **`Math.random()`** and collect **five** values with **`Stream.generate(sup).limit(5).toList()`** (Java 16+) or **`collect(Collectors.toList())`**.

---

## Beginner tip

If **`Supplier`** feels pointless next to **`() -> 5`**, compare **`orElse(compute())`** vs **`orElseGet(() -> compute())`** side by side with a **`println` inside `compute`**—the laziness becomes obvious.
