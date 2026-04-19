---
title: "Chapter 76: Lambda Expression in Java — Compact Blocks, Target Typing, and Effectively Final"
description: "Learn Java lambda syntax: parameters arrow body, target types and SAM interfaces, capturing locals, effectively final rules, and when a method reference reads cleaner than a lambda."
category: "Java"
tags:
  - Java lambda expression
  - Java lambda syntax
  - Java effectively final
  - Java SAM lambda
  - Java functional style intro
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 76
---

# Chapter 76: Lambda Expression in Java

A **lambda** is a **compact way to pass behavior** where Java already expected a **single-method interface** (a **SAM**). Instead of **`new Runnable() { public void run() { … } }`**, you write **`() -> { … }`** when the compiler can **infer** which interface you mean from **context**—called **target typing**.

**Functional interfaces** get a dedicated chapter next (77). **`@FunctionalInterface`** is optional sugar that helps the compiler catch accidental second abstract methods.

---

## 1. Topic title

**Lambda: unnamed function body wired into a one-method interface slot**

---

## 2. What it means

Syntax shapes:

- **`() -> 1`** — no parameters, expression body (returns **`1`**).
- **`x -> x * 2`** — one parameter, **parentheses optional** for a single untyped parameter.
- **`(a, b) -> a + b`** — multiple parameters need **parentheses**.
- **`() -> { log(); return 3; }`** — **block body** needs **`return`** when not a single expression.

**Captured locals** must be **effectively final**: you cannot assign to them after capture, because the lambda might run **later** when the old value would be ambiguous.

---

## 3. Why it is used

**Shorter listeners**, **sort keys**, **lazy jobs**—anywhere anonymous classes felt **noisy** but the idea was always “**pass this one behavior**.”

---

## 4. Mental hook

Think of a lambda as a **sticky note on a takeout order**: **no customer name printed**, but the kitchen still knows **“extra rice, no spice.”**

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class LambdaDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("Chen", "Ada", "Bob"));
        Collections.sort(names, (a, b) -> a.compareToIgnoreCase(b));
        System.out.println(names);

        Runnable job =
                () -> {
                    System.out.println("from lambda");
                };
        job.run();
    }
}
```

**`(a, b) -> …`** targets **`Comparator<String>`** because **`sort`** overload expects that interface.

---

## 6. Explanation of code

**Expression lambdas** return without **`return`** keyword. **Block lambdas** need explicit **`return`** when non-**`void`**.

---

## 7. Common mistakes

**Mutating captured variables**—compiler error once the variable stops being **effectively final**.

**Overshrinking readability**—a ten-line lambda with nested **`if`** sometimes deserves a **named method** again.

---

## 8. Best practices

Let **types appear on the left** (`Comparator<String> c = (a,b) -> …`) when inference feels fragile to readers.

Prefer **`Comparator.comparing(String::toLowerCase)`** when it reads clearer than a manual lambda—method references preview Chapter 88.

---

## 9. Small practice task

Rewrite **`names.removeIf(s -> s.length() < 4)`** using a **block lambda** with a **`boolean` local** named **`drop`** for clarity, then collapse back to one line and compare readability.

---

## Beginner tip

If the compiler says **“target type for lambda must be a functional interface”**, you parked the lambda where Java **does not know** which SAM you meant—**assign to a typed variable** or **cast** sparingly to teach the compiler.
