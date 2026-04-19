---
title: "Chapter 78: Predicate in Java — boolean Tests, and, or, negate, and Stream filter"
description: "Learn java.util.function.Predicate: test method, combining predicates, negation, isEqual helper, and using filter on streams without drowning in syntax."
category: "Java"
tags:
  - Java Predicate
  - Java Predicate and or negate
  - Java filter stream
  - Java functional interface Predicate
  - Java boolean lambda
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 78
---

# Chapter 78: Predicate in Java

**`Predicate<T>`** is a **built-in functional interface** for **`boolean test(T value)`**. It answers **yes/no** questions about a **single** input: **“is blank?”**, **“score high enough?”**, **“file name ends with `.log`?”**

**Lambdas** (76) and **functional interfaces** (77) are prerequisites. **`Function`** and **`Consumer`** follow in Chapters 79–80.

---

## 1. Topic title

**Predicate: a reusable yes/no probe you can chain with and/or/negate**

---

## 2. What it means

Core method: **`boolean test(T t)`**.

Combinators:

- **`and`** — both must pass.
- **`or`** — either passes.
- **`negate`** — flips the result.

**`Predicate.isEqual(target)`** builds a predicate that compares **`Objects.equals`** to **`target`**—handy for **`null`**-safe equality tests.

---

## 3. Why it is used

**Validation pipelines**, **`Stream.filter`**, **configurable rules** passed into services—anywhere you want **named boolean logic** without subclass explosion.

---

## 4. Mental picture

A **`Predicate`** is a **bouncer checklist** clipped on a clipboard: each patron (**`T`**) walks past; combined rules **`and`** two stamps, **`or`** allows VIP exceptions, **`negate`** flips “deny list” to “allow list.”

---

## 5. Java code example

```java
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class PredicateDemo {
    public static void main(String[] args) {
        Predicate<String> notBlank = s -> s != null && !s.isBlank();
        Predicate<String> shortWord = s -> s.length() <= 4;
        Predicate<String> rule = notBlank.and(shortWord);

        List<String> words = List.of("hi", " ", "java", "go");
        List<String> kept = words.stream().filter(rule).collect(Collectors.toList());
        System.out.println(kept);
    }
}
```

**`stream()`** / **`filter`** preview the **Stream API** (Chapter 82)—here focus on **`Predicate` composition**.

---

## 6. Explanation of code

**`notBlank.and(shortWord)`** returns a **new** predicate; originals stay reusable elsewhere.

---

## 7. Common mistakes

**Side effects inside `test`**—keep predicates **pure** when possible; surprises multiply when reused in **parallel** streams later.

**Boxing costs** with **`Predicate<Integer>`** on hot paths—consider **`IntPredicate`** for primitive **`int`** pipelines.

---

## 8. Best practices

Name predicates **`is…` / `has…` / `can…`** when storing them in **`final`** fields—call sites read like English.

Extract complex **`and`** chains to **well-named** predicate variables instead of one mega-lambda.

---

## 9. Small practice task

Write **`Predicate<Integer> inBand = …`** true for **30 ≤ x ≤ 50** using **`and`**. Test **`List.of(10, 40, 60)`** with **`stream().filter(inBand)`** and print.

---

## Beginner tip

If **`filter`** confuses you, read it as **“keep only items where the predicate cheers yes.”** Everything else is **dropped** from the stream for that pipeline step.
