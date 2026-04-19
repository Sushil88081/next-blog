---
title: "Chapter 85: collect in Java — Collectors, toList, joining, groupingBy, and Mutable vs Immutable"
description: "Learn Stream.collect with Collector, Collectors.toList and toUnmodifiableList, joining delimiter, simple groupingBy, and why collect is a terminal that materializes results."
category: "Java"
tags:
  - Java stream collect
  - Java Collectors toList
  - Java Collectors joining
  - Java groupingBy Collectors
  - Java Collector terminal
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 85
---

# Chapter 85: collect in Java

**`collect(Collector<? super T,A,R>)`** is a **terminal** operation that **folds** a stream into a **mutable accumulation** (`A`) then optionally **finishes** into a result **`R`**—often a **`List`**, **`Set`**, **`String`**, or **`Map`**.

The **`Collectors`** factory class ships **ready-made recipes**—**`toList`**, **`joining`**, **`groupingBy`**, **`counting`**, … **`reduce`** (Chapter 86) is a different folding style without a **`Collector`**.

---

## 1. Topic title

**collect: end the stream by pouring it into a bucket recipe you name**

---

## 2. What it means

**`Collectors.toList()`** returns a **mutable** list implementation (documented as **unspecified** concrete class—do not rely on **`ArrayList`** specifically).

**`Collectors.toUnmodifiableList()`** (Java 10+) finishes with an **immutable** list—great for **return values** from service methods.

**`Collectors.joining(delimiter)`** concatenates **`CharSequence`** elements—watch **`String` joining on empty stream** → **empty string**, not **`null`**.

---

## 3. Why it is used

**Materialize** stream pipelines into **plain Java collections** you can pass to **older APIs**, **JSON serializers**, or **loggers**.

**`groupingBy`** builds **`Map<K, List<T>>`** in one readable line instead of manual **`Map`/`get`/`compute`**.

---

## 4. Mental sketch

If the stream is **water**, **`collect`** is picking **which jug shape** you pour into—measuring cup (**`counting`**), mason jar (**`toList`**), labeled bottles (**`groupingBy`**).

---

## 5. Java code example

```java
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class StreamCollectDemo {
    public static void main(String[] args) {
        List<String> items = List.of("apple", "apricot", "banana", "blueberry", "cherry");

        String csv = items.stream().filter(s -> s.startsWith("b")).collect(Collectors.joining(", "));
        System.out.println(csv);

        Map<Integer, List<String>> byLength =
                items.stream().collect(Collectors.groupingBy(String::length));
        System.out.println(byLength.get(5));
    }
}
```

**`joining`** prints **`banana, blueberry`**. **`groupingBy(String::length)`** puts **five-letter** words in one bucket—only **`apple`**—so **`byLength.get(5)`** prints **`[apple]`**.

---

## 6. Explanation of code

**`groupingBy`** uses **`HashMap`**-style buckets by default—**iteration order** of the **map** is **not** sorted by key unless you use **`TreeMap`** supplier overload.

---

## 7. Common mistakes

**Mutating the collected list** when you promised callers **immutability**—document or return **`toUnmodifiableList`**.

**Expensive `Collector` per element** inside **`flatMap`**—profile; sometimes a **`for` loop** wins clarity.

---

## 8. Best practices

Import **`Collectors`** static helpers sparingly—**`Collectors.joining`** reads fine fully qualified or static import **only** **`joining`** to avoid **wildcard static import** noise.

Prefer **`toMap`** with **merge function** when keys collide—default **throws** on duplicates.

---

## 9. Small practice task

Count words by **first letter** using **`groupingBy(s -> s.substring(0,1), Collectors.counting())`**. Print the **map** for **`List.of("ada","alan","bob","bea")`**.

---

## Beginner tip

**`collect` runs the pipeline**—if you **`peek` logged** earlier, you see logs **now**, not when **`filter`** was declared.
