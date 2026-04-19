---
title: "Chapter 88: Method Reference in Java — Static, Bound, Unbound, and Constructor Shorthand"
description: "Learn Java method references: Type::staticMethod, instance::instanceMethod, Type::instanceMethod, Class::new, array constructors, and when a lambda stays clearer."
category: "Java"
tags:
  - Java method reference
  - Java double colon syntax
  - Java constructor reference
  - Java static method reference
  - Java instance method reference
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 88
---

# Chapter 88: Method Reference in Java

A **method reference** is **`::` shorthand** when a lambda would only **call one existing method** with **parameters forwarded unchanged**. It targets the same **functional interface** slot as a lambda (Chapters 76–80).

---

## 1. Topic title

**Method reference: name the method directly when it already matches the SAM shape**

---

## 2. What it means

Forms:

1. **`ClassName::staticMethod`** — **`s -> Integer.parseInt(s)`** becomes **`Integer::parseInt`** when types line up.
2. **`instance::method`** — **`x -> out.println(x)`** becomes **`out::println`** (**bound** receiver).
3. **`ClassName::instanceMethod`** — **`(a,b) -> a.compareToIgnoreCase(b)`** becomes **`String::compareToIgnoreCase`** (**first parameter** is receiver).
4. **`ClassName::new`** — **`() -> new ArrayList<>()`** with inferred type args sometimes collapses to **`ArrayList::new`** in context.

---

## 3. Why it is used

**Shorter stream pipelines**, **grep-friendly** names in stack traces sometimes read clearer than huge lambdas.

---

## 4. Mental sketch

If a lambda is a **wrapper envelope** around one stamp, a method reference is **just the stamp**—same ink, less paper.

---

## 5. Java code example

```java
import java.util.List;
import java.util.stream.Collectors;

public class MethodRefDemo {
    public static void main(String[] args) {
        List<String> words = List.of("Java", "Go", "Rust");

        List<String> lower = words.stream().map(String::toLowerCase).collect(Collectors.toList());
        System.out.println(lower);

        List<Integer> nums = List.of(0, 1, 2);
        List<String> built = nums.stream().map(String::valueOf).collect(Collectors.toList());
        System.out.println(built);
    }
}
```

## 6. Explanation of code

**`String::toLowerCase`** uses the **unbound instance** form: each stream element becomes the **receiver** of **`toLowerCase`**. **`String::valueOf`** picks the **`valueOf(int)`** overload when the stream carries **`Integer`** elements.

---

## 7. Common mistakes

**Wrong overload picked**—when **`println`** ambiguity appears, fall back to a lambda with explicit casts.

**Unreadable `::` chains**—if readers need **six mental hops**, keep the lambda.

---

## 8. Best practices

Use **`this::save`** for **callbacks** inside instance methods—clear receiver.

Pair **constructor references** with **`toCollection(ArrayList::new)`** when you care about **list implementation**.

---

## 9. Small practice task

Sort **`List<String>`** with **`list.sort(String::compareToIgnoreCase)`**—identify which **method reference** form it is.

---

## Beginner tip

If **`::`** autocompletion lists **five overloads**, the compiler picks **one** using **target typing**—when it fails, **expand to a lambda** once, then **collapse** again when you see the winning signature.