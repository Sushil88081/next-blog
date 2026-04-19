---
title: "Chapter 84: map in Java — Transform Each Element, mapToInt, and flatMap One Level"
description: "Learn Stream.map and primitive map variants, flatMap for one-to-many expansion, avoiding null returns, and when map chains read clearer than nested loops."
category: "Java"
tags:
  - Java stream map
  - Java mapToInt Double map
  - Java flatMap stream
  - Java Stream map example
  - Java transform stream
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 84
---

# Chapter 84: map in Java

**`map(Function<? super T,? extends R>)`** runs a **function per element** and replaces the stream’s element type with **`R`**. It is the stream version of **“for each item, compute a new value.”**

**`filter`** (83) **drops** items; **`map`** **keeps count** but **changes shape**—including **`String` → `int`** via **`mapToInt`**.

---

## 1. Topic title

**map: same conveyor length, each package repacked before the next stage**

---

## 2. What it means

**`mapToInt(ToIntFunction)`** returns an **`IntStream`**—fewer **`Integer`** boxes on hot paths.

**`flatMap`** takes a **function to a stream** and **concatenates** those inner streams **one level**—classic example: **line of text → words**.

**Avoid `null`**: **`map`** should not return **`null`** elements—use **`flatMap(s -> Stream.empty())`** or **`filter(Objects::nonNull)`** patterns instead of **`null` bombs**.

---

## 3. Why it is used

**DTO shaping**, **parsing**, **normalizing strings**, **projecting fields**—anywhere each input has **exactly one** output (or **`flatMap`** when **zero or many**).

---

## 4. Mental sketch

**`filter`** removes passengers before the photo. **`map`** gives everyone a **hat**—same **number** of people walk out, different **prop**.

---

## 5. Java code example

```java
import java.util.List;
import java.util.stream.Collectors;

public class StreamMapDemo {
    public static void main(String[] args) {
        List<String> nums = List.of("1", "2", "3");
        int sum = nums.stream().mapToInt(Integer::parseInt).sum();
        System.out.println("sum=" + sum);

        List<List<Integer>> groups = List.of(List.of(1, 2), List.of(3), List.of());
        List<Integer> flat =
                groups.stream().flatMap(List::stream).collect(Collectors.toList());
        System.out.println(flat);
    }
}
```

**`flatMap(List::stream)`** turns **nested lists** into **one** stream of integers.

---

## 6. Explanation of code

**`mapToInt`** ends with **`sum()`**—a **`IntStream`** terminal. **`sum`** on **`IntStream`** is **`int`**; watch **overflow** on huge data in real finance code.

---

## 7. Common mistakes

**`map(mapper)` returning streams accidentally**—compiler usually catches wrong types; when in doubt, **`flatMap`**.

**Chaining ten maps** when one **well-named method** would read better—**style** matters.

---

## 8. Best practices

Prefer **`mapToInt`/`mapToLong`/`mapToDouble`** when the next steps are **math-heavy**.

Use **`flatMap`** for **optional expansions**: **`optional.stream()`** patterns in modern Java reduce **`ifPresent` boilerplate**.

---

## 9. Small practice task

Uppercase a list of words with **`map(String::toUpperCase)`**, then **`filter`** those starting with **`"A"`**, then **`collect(Collectors.toList())`**.

---

## Beginner tip

Read **`map` then `filter`** **top to bottom** in time order: **repack first**, **throw away next**—order matters when **`map` is expensive**.
