---
title: "Chapter 77: Functional Interface in Java — SAM Types, @FunctionalInterface, and Built-in Families"
description: "Learn Java functional interfaces: single abstract method rule, default and static methods allowed, @FunctionalInterface compiler help, and how Runnable fits the same pattern as Predicate."
category: "Java"
tags:
  - Java functional interface
  - Java SAM interface
  - Java FunctionalInterface annotation
  - Java Runnable functional
  - Java java.util.function
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 77
---

# Chapter 77: Functional Interface in Java

A **functional interface** is any **`interface`** with **exactly one abstract method** (Java counts **`abstract`** methods from **`Object`** carefully—**`equals`** does not count). **`@FunctionalInterface`** is an **annotation** that makes the compiler **verify** the rule so teammates do not accidentally add a **second** abstract method later.

**Lambdas** (Chapter 76) plug into these interfaces. **`java.util.function`** adds **`Predicate`**, **`Function`**, **`Consumer`**, **`Supplier`**—each gets its own short chapter next.

---

## 1. Topic title

**Functional interface: one abstract “job slot,” lambdas fill the slot**

---

## 2. What it means

**`default`** and **`static`** methods on the interface **do not** break the SAM rule—they ship with bodies already.

```java
@FunctionalInterface
interface ScoreRule {
    int rank(int value);

    default boolean passes(int value) {
        return rank(value) >= 0;
    }
}
```

**`ScoreRule`** stays valid: **one** abstract **`rank`**, **`passes`** is **default**.

---

## 3. Why it is used

**Shared vocabulary**—APIs say **`Predicate<String>`** instead of inventing **`StringBoolFun`** everywhere.

**Compiler-checked lambdas**—wrong arity or types fail **fast** at compile time.

---

## 4. Mental sketch

A **functional interface** is a **single-purpose remote** with **one big red button**. **`default` methods** are **stickers** on the side explaining how to **double-click**—they do not add a second red button.

---

## 5. Java code example

```java
import java.util.function.IntUnaryOperator;

public class FunctionalInterfaceDemo {
    public static void main(String[] args) {
        IntUnaryOperator triple = x -> x * 3;
        System.out.println(triple.applyAsInt(4));

        Runnable tick = () -> System.out.println("tick");
        tick.run();
    }
}
```

**`IntUnaryOperator`** is a **built-in** functional interface for **`int -> int`** without boxing noise.

---

## 6. Explanation of code

**`Runnable.run`** takes **no args**, returns **`void`**—still a **SAM**, so **`() -> …`** fits.

---

## 7. Common mistakes

**Adding a second abstract method** to a **`@FunctionalInterface`**—compile error immediately—celebrate it.

**Confusing functional interface with “must be small”**—the **interface** is narrow; the **lambda body** can still be large (though style guides may disagree).

---

## 8. Best practices

Mark your own **single-method** teaching interfaces with **`@FunctionalInterface`** when you intend lambdas—future edits stay honest.

Prefer **`java.util.function`** types in **new APIs** instead of reinventing **`ThingProcessor`**.

---

## 9. Small practice task

Declare **`@FunctionalInterface interface IntPredicate2 { boolean test(int a, int b); }`** and store **`(a,b) -> a + b > 0`** in a variable of that type. Call **`test(-1, 2)`** and print the result.

---

## Beginner tip

If your IDE says **“not a functional interface”**, count **abstract** methods inherited—something sneaky (another **`void foo();`**) joined the party.
