---
title: "Chapter 80: Consumer in Java — Side Effects, andThen Chaining, and Iterable forEach"
description: "Learn java.util.function.Consumer: accept void return, andThen sequencing, BiConsumer pairs, Iterable.forEach style, and balancing clarity with mutation."
category: "Java"
tags:
  - Java Consumer interface
  - Java Consumer andThen
  - Java forEach Consumer
  - Java BiConsumer
  - Java functional side effect
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 80
---

# Chapter 80: Consumer in Java

**`Consumer<T>`** describes **`void accept(T t)`**—you receive a value and **do something** with it: print, mutate a builder, append to a log. Unlike **`Function`**, there is **no returned replacement value** in the interface contract.

**`Supplier<T>`** (Chapter 81) is the **opposite** shape—**no input**, produces **`T`**.

---

## 1. Topic title

**Consumer: an action slot—run for side effect, not for a returned object**

---

## 2. What it means

**`andThen`** chains another **`Consumer<T>`** that runs **after** this one on the **same** **`T`**: **`first.andThen(second)`** means **`first.accept(t); second.accept(t);`**.

Actually **`Consumer.andThen`** returns **`Consumer<T>`** that runs **this.accept(t)`** then **`after.accept(t)`** — both get **same t**.

**`BiConsumer<T,U>`** accepts **two** arguments—handy for **`Map.forEach((k,v) -> …)`**.

---

## 3. Why it is used

**`list.forEach(System.out::println)`**, **logging**, **adding to a collection inside a stream terminal** (sometimes discouraged—know the tradeoff), **resource visitors**.

---

## 4. Mental sketch

If **`Function`** is a **vending machine** that **dispenses** a new snack, **`Consumer`** is a **trash chute**—input goes in, **nothing** comes back **through the same interface** (the room might still get messier—that is your side effect).

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class ConsumerDemo {
    public static void main(String[] args) {
        List<String> log = new ArrayList<>();
        Consumer<String> remember = s -> log.add(s);
        Consumer<String> print = System.out::println;
        Consumer<String> both = print.andThen(remember);

        List<String> items = List.of("a", "b", "c");
        items.forEach(both);
        System.out.println("log copy " + log);
    }
}
```

**`print.andThen(remember)`** prints **first**, then **records** the same string.

---

## 6. Explanation of code

**`Iterable.forEach`** accepts a **`Consumer`**—your first **fluent** loop alternative to **enhanced `for`** when you only need **one** operation.

---

## 7. Common mistakes

**Heavy work inside `forEach`** when a **`for`** loop with **`break`/`continue`** would read clearer—**`forEach`** is not always a win.

**Assuming order** on **unordered collections**—**`HashSet.forEach`** order is **not** your API contract.

---

## 8. Best practices

Keep **`accept`** bodies **short**; extract private methods when the lambda grows teeth.

Prefer **`Consumer`** fields for **event hooks** instead of **single giant** listener interfaces when prototypes stay small.

---

## 9. Small practice task

Use **`Map.of("a",1,"b",2).forEach((k,v) -> …)`** with a **`BiConsumer`** that prints **`k + "=" + v`**. No streams required.

---

## Beginner tip

If you instinctively write **`return;` inside a lambda passed to `Consumer`**, that is fine—**`void`** lambdas allow **`return;`** early exits just like **`void`** methods.
