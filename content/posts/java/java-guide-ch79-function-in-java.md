---
title: "Chapter 79: Function in Java — map Transformations, compose, and identity"
description: "Learn java.util.function.Function: apply, compose and andThen chaining, identity helper, primitive specializations at a glance, and map on streams and Optional."
category: "Java"
tags:
  - Java Function interface
  - Java Function compose andThen
  - Java Function identity
  - Java stream map
  - Java functional transform
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 79
---

# Chapter 79: Function in Java

**`Function<T,R>`** models **one input → one output**: **`R apply(T t)`**. It is the shape behind **`Stream.map`**, many **`Optional.map`** calls, and **data conversion** utilities.

**`Predicate`** (78) returned **`boolean`**; **`Function`** returns **whatever type `R` you need**.

---

## 1. Topic title

**Function: a typed transformer you can chain like plumbing fittings**

---

## 2. What it means

**`andThen`** runs **this** function first, then the **next** function on the result: **`f.andThen(g)`** means **`g(f(x))`**.

**`compose`** runs the **argument** function first, then **this**: **`f.compose(g)`** means **`f(g(x))`**.

**`Function.identity()`** returns a function that **hands the value through unchanged**—useful when an API demands a **`Function`** but sometimes you want a **no-op** step.

---

## 3. Why it is used

**Parsing layers** (`String` → `int` → `Money`), **DTO mapping**, **pipeline steps** in streams—anywhere **transform** is clearer than **five** nested helper calls.

---

## 4. Mental sketch

**`Function`** is a **machine in a factory line**: crates enter (**`T`**), crates leave (**`R`**). **`andThen`** bolts the next machine **after**; **`compose`** slides a **pre-processor** **before** your machine.

---

## 5. Java code example

```java
import java.util.function.Function;

public class FunctionDemo {
    public static void main(String[] args) {
        Function<String, String> trim = String::trim;
        Function<String, Integer> len = String::length;

        Function<String, Integer> pipeline = trim.andThen(len);
        System.out.println(pipeline.apply("  hello  "));

        Function<Integer, Integer> timesTwo = x -> x * 2;
        Function<Integer, Integer> plusOne = x -> x + 1;
        Function<Integer, Integer> math = timesTwo.compose(plusOne);
        System.out.println(math.apply(3));
    }
}
```

**`timesTwo.compose(plusOne)`** applies **`plusOne` first** → **`3+1=4`**, then **`timesTwo`** → **`8`**.

---

## 6. Explanation of code

**`String::trim`** is a **method reference**—Chapter 88 dives deeper; here read it as **`s -> s.trim()`** shorthand.

---

## 7. Common mistakes

**Confusing `compose` vs `andThen`**—draw **`f(g(x))`** vs **`g(f(x))`** on paper once; future-you will thank present-you.

**Returning `null` from `apply`**—downstream **`map`** steps may **`NullPointerException`**; prefer **`Optional`** when absence is normal (Chapter 87).

---

## 8. Best practices

Prefer **`IntFunction`**, **`ToIntFunction`**, etc., when **primitives** dominate to reduce **boxing**.

Keep **`apply`** **pure** when used in **parallel** streams—side effects race.

---

## 9. Small practice task

Build **`Function<String, String>`** that **`trim`s**, **`toLowerCase`s**, then **`replace(' ', '_')`** using **`andThen`**. Print the result for **`"  Hello Big World  "`**.

---

## Beginner tip

When stuck naming **`R`**, think **“what leaves the function?”**—that type is **`R`**, even if it matches **`T`** sometimes.
