---
title: "Chapter 82: Stream API in Java — Pipeline, Lazy Intermediates, and One Terminal"
description: "Introduce Java Stream: source to intermediate ops to terminal, laziness until a terminal runs, no storage guarantee, parallel stream caution, and how stream differs from a Collection."
category: "Java"
tags:
  - Java Stream API
  - Java stream pipeline
  - Java intermediate terminal stream
  - Java lazy stream
  - Java stream vs collection
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 82
---

# Chapter 82: Stream API in Java

A **`Stream<T>`** is a **one-use pipeline** over a **sequence** of values. It is **not** a replacement for **`List`**—think **assembly line**: data **flows** through **stages** (**`filter`**, **`map`**, …) until a **terminal** operation (**`collect`**, **`forEach`**, **`count`**) **finishes** the job and **closes** the line.

Chapters **83–85** zoom into **`filter`**, **`map`**, and **`collect`**. **`reduce`** waits in Chapter 86.

---

## 1. Topic title

**Stream: describe a computation pipeline; nothing runs until a terminal pulls the chain**

---

## 2. What it means

**Source:** **`list.stream()`**, **`Stream.of("a","b")`**, **`Stream.generate`**, **`Files.lines`**, …

**Intermediate ops:** return a **new** stream—**lazy**, can **fuse** internally.

**Terminal ops:** produce a **non-stream** result or **side effect**—**eager**, triggers computation.

Calling **`filter`** alone does **nothing visible**—no terminal, no work.

---

## 3. Why it is used

**Declarative** list processing—say **what** transformation chain you want without manual index loops.

**Composable** stages—small lambdas bolt together; readers scan **top to bottom** like a recipe.

---

## 4. Mental picture

A **roller coaster car** is the **element**. **`filter`** is a **height gate**, **`map`** repaints the car, **`collect`** is the **photo booth** at the end—you only get the picture when the ride **finishes**.

---

## 5. Java code example

```java
import java.util.List;

public class StreamIntroDemo {
    public static void main(String[] args) {
        List<Integer> nums = List.of(1, 2, 3, 4, 5);
        long count =
                nums.stream()
                        .peek(n -> System.out.println("see " + n))
                        .filter(n -> n % 2 == 0)
                        .count();
        System.out.println("even count=" + count);
    }
}
```

**`peek`** logs **during** the terminal **`count`**—proof intermediates stayed **quiet** until **`count`** executed.

---

## 6. Explanation of code

**`stream()`** does **not** copy the list into a new data structure up front—it sets up **views** and **spliterators** that walk the backing data when needed.

---

## 7. Common mistakes

**Using a stream twice**—after **terminal**, the stream is **spent**; call **`list.stream()`** again.

**`.parallelStream()` everywhere**—debug pain and ordering surprises; default **sequential** until profiling says otherwise.

---

## 8. Best practices

Prefer **`IntStream`** / **`LongStream`** when primitives dominate to reduce **boxing**.

Keep **side effects** in **`peek`** only for **temporary debugging**—production pipelines stay **pure** in intermediates when possible.

---

## 9. Small practice task

Build **`Stream<String>`** from **`Stream.of("a","bb","ccc")`**, **`map` to lengths**, then **`count`** how many lengths are **`>= 2`**—do it with **`filter` on the int stream** after **`mapToInt`** (preview **`mapToInt`** mentally; full detail in Chapter 84).

---

## Beginner tip

If nothing prints inside your **`filter`**, verify you actually called a **terminal**—**`filter` alone** is a **planned sieve**, not a **working** one yet.
