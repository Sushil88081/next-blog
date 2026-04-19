---
title: "Chapter 83: filter in Java — Predicates on a Stream, Short-Circuit Friends, and takeWhile"
description: "Deepen Stream.filter: Predicate per element, stateless habit, dropWhile and takeWhile on ordered streams, and combining predicates before or inside the pipeline."
category: "Java"
tags:
  - Java stream filter
  - Java filter predicate
  - Java takeWhile dropWhile
  - Java Stream filter example
  - Java stream intermediate ops
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 83
---

# Chapter 83: filter in Java

**`Stream.filter(Predicate<? super T>)`** keeps elements where the **predicate returns true**. It is the **stream-shaped** version of the **`Predicate`** ideas from Chapter 78—same **`test`**, new **pipeline** context.

**Stream overview** was Chapter 82; **`map`** is Chapter 84.

---

## 1. Topic title

**filter: drop everything the predicate does not cheer for**

---

## 2. What it means

Each element flows **in order** (for **ordered** streams) into the predicate. **False** means **discarded** from the rest of the pipeline for that pass—**no slot**, **no `null` placeholder**.

**`takeWhile`** (Java 9+) keeps an **initial prefix** while the predicate holds, then **stops**—handy for **sorted** inputs where you only want **“still less than threshold.”**

**`dropWhile`** skips until the predicate becomes **false**, then **keeps the tail**.

---

## 3. Why it is used

**Input cleaning**, **feature flags**, **security trimming**—anywhere **“only continue with items that pass rule X”** reads naturally as a **stage**.

---

## 4. Mental sketch

**`filter`** is a **coin sorter**: nickels fall through one slot, quarters another—here only **one** output slot continues down the belt.

---

## 5. Java code example

```java
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class StreamFilterDemo {
    public static void main(String[] args) {
        List<String> words = List.of("hi", "java", "go", "sky", "sun");

        Predicate<String> shortWord = w -> w.length() <= 3;
        Predicate<String> hasVowel = w -> w.matches(".*[aeiou].*");

        List<String> kept =
                words.stream().filter(shortWord.and(hasVowel)).collect(Collectors.toList());
        System.out.println(kept);

        List<Integer> nums = List.of(2, 4, 6, 3, 8);
        List<Integer> prefix =
                nums.stream().takeWhile(n -> n % 2 == 0).collect(Collectors.toList());
        System.out.println(prefix);
    }
}
```

First pipeline keeps **`hi`**, **`go`**, **`sun`**. **`takeWhile`** example keeps **`2,4,6`** then **stops** at **`3`**.

---

## 6. Explanation of code

**`Predicate.and`** composes **before** the stream sees it—same effect as **`.filter(a).filter(b)`**, one pass vs two (implementation may still **fuse** either way).

---

## 7. Common mistakes

**Stateful predicates** (`boolean[] seen`) without care—**parallel** streams can **race**; keep **`filter`** **pure** when possible.

**Assuming `takeWhile` scans whole list**—it **short-circuits** once the predicate fails on an ordered stream.

---

## 8. Best practices

Extract gnarly predicates to **named variables** or **methods** (`Words::isNice`) for readability.

Combine **`and`/`or`/`negate`** when the **same** compound rule appears in **multiple** pipelines—single source of truth.

---

## 9. Small practice task

Given **`List<Integer>`**, count how many numbers are **strictly between 10 and 20** using **one** **`filter`** with a **compound predicate** ( **`>`** and **`<`** ).

---

## Beginner tip

**`removeIf` on a list** mutates the list; **`stream().filter`** builds a **new view** until **`collect`**—different **lifetimes**; pick consciously.
