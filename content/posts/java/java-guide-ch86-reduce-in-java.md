---
title: "Chapter 86: reduce in Java — Fold a Stream, Identity vs Optional, and Order Caution"
description: "Learn Stream.reduce: accumulator binary operator, identity element, empty stream behavior, combiner role in parallel streams, and when collect fits better than reduce."
category: "Java"
tags:
  - Java stream reduce
  - Java reduce accumulator
  - Java IntStream reduce
  - Java parallel reduce combiner
  - Java fold stream
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 86
---

# Chapter 86: reduce in Java

**`collect`** (Chapter 85) used a **`Collector`** recipe. **`reduce`** is the **stream’s built-in fold**: combine **two elements** into **one**, walk the sequence until **one value** remains—or **`Optional.empty()`** when there is **nothing** to fold and **no identity** was supplied.

Think **“total price”**, **“longest string”**, **“boolean and across flags”**—**associative** operations behave best.

---

## 1. Topic title

**reduce: collapse many values into one with a combiner you trust**

---

## 2. What it means

**Two-arg form:** **`reduce(BinaryOperator<T>)`** returns **`Optional<T>`**. First stream element seeds the accumulator; each next pairs with the running result. **Empty stream → empty Optional.**

**Three-arg form:** **`reduce(identity, accumulator, combiner)`**—the **`identity`** is returned for **empty** streams and must **behave** like a true neutral element (`0` for **`+`**, **`1` for `*`** on positives, **`""` for string concat**—note **`""`** still allocates patterns).

**Parallel** streams use **`combiner`** to merge **partial** reductions—must align with **`accumulator`** algebraically.

---

## 3. Why it is used

**Custom folds** without writing a **`Collector`**, **numeric totals** on **`IntStream`**, **“first non-empty”** style reductions when **`collect`** feels heavy.

---

## 4. Mental sketch

**`collect`** is a **factory assembly line** with named parts. **`reduce`** is **origami**—keep **folding the paper** until one **shape** remains.

---

## 5. Java code example

```java
import java.util.List;
import java.util.Optional;

public class StreamReduceDemo {
    public static void main(String[] args) {
        List<Integer> nums = List.of(3, 5, 2);
        int product = nums.stream().reduce(1, (a, b) -> a * b);
        System.out.println("product=" + product);

        Optional<String> longest =
                List.of("hi", "java", "go").stream().reduce((a, b) -> a.length() >= b.length() ? a : b);
        System.out.println(longest.orElse("none"));

        Optional<Integer> empty = List.<Integer>of().stream().reduce(Integer::sum);
        System.out.println("empty? " + empty.isPresent());
    }
}
```

**`reduce(identity, op)`** returns the **identity** when the stream is **empty**—here **`1`** for **product**. The **two-arg** **`reduce(op)`** form returns **`Optional.empty()`** for an **empty** stream.

---

## 6. Explanation of code

**`reduce(BinaryOperator)`** on an **empty** stream → **`Optional.empty()`** (see **`empty`** line). **`Optional.orElse`** supplies **`"none"`** only when **no** longest exists. **`reduce(identity, op)`** on **empty** returns **`identity`** (here **`1`** for product).

---

## 7. Common mistakes

**Non-associative operations** (`(a,b) -> a - b`)—parallel streams can **mix** order and **surprise** you.

**Wrong identity**—`0` for **multiplication** collapses everything to **zero** immediately.

---

## 8. Best practices

Prefer **`IntStream.sum`** / **`average`** when they already express the math—shorter and optimized paths.

Reach for **`collect`** when the result is a **collection or map**, not a **single scalar**.

---

## 9. Small practice task

Use **two-arg `reduce`** to find the **maximum** `Integer` in a **non-empty** list without **`max()`** helper—return **`Optional`**.

---

## Beginner tip

If **`reduce`** feels clumsy, rewrite the same problem with a **`for` loop** once—when the loop is **five lines**, **`reduce`** might not buy clarity yet.
