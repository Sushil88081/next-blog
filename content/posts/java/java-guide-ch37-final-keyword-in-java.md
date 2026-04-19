---
title: "Chapter 37: final Keyword in Java — Variables, Methods, and Classes"
description: "Learn Java final on variables, parameters, methods, and classes: reassignment rules, blank final fields, preventing override, and stopping subclassing."
category: "Java"
tags:
  - Java final keyword
  - Java final variable
  - Java final method
  - Java final class
  - Java blank final
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 37
---

# Chapter 37: final Keyword in Java

This chapter is **only** about **`final`**: a modifier that means **different things** on variables, methods, and classes. **`static`** was Chapter 36; **inheritance and overriding** deepen in Chapter 39.

---

## 1. Topic title

**`final`: freeze reassignment, freeze overriding, or freeze subclassing—depending where it sits**

---

## 2. What it means

**`final` local variable or parameter:**

```java
void example(final int max) {
    final int step = 1;
    // max = 2; // compile error
    // step = 2; // compile error
}
```

Cannot **reassign** after first assignment. For parameters, the method cannot change which `int` the name points to (still pass-by-value for primitives).

**`final` instance field:**

```java
class Box {
    final int width;
    Box(int width) {
        this.width = width;
    }
}
```

Must be assigned **exactly once** per constructor path—constructor is the usual place (also field initializer or instance initializer).

**`final` method** — subclasses **cannot override** it (still callable).

**`final` class** — **cannot be extended** — `String` is `final`.

---

## 3. Why it is used

**Communicate intent** — “this reference should not point at another object.” Helps readers and catches bugs at compile time.

**Security and design** — `final` classes stop unexpected subclasses from breaking invariants (`String` stability).

---

## 4. Real-world example

**Configuration object** with `final int port` set at construction—no one accidentally mutates port after startup.

---

## 5. Java code example

```java
final class SecureToken {
    private final String value;

    SecureToken(String value) {
        this.value = value;
    }

    String getValue() {
        return value;
    }
}

class Account {
    final String id;
    double balance;

    Account(String id) {
        this.id = id;
    }

    final void printId() {
        System.out.println("id=" + id);
    }
}

public class FinalKeywordDemo {
    public static void main(String[] args) {
        Account a = new Account("A-1");
        a.balance = 50;
        System.out.println(a.id + " balance=" + a.balance);
        a.printId();
    }
}
```

---

## 6. Explanation of code

- **`SecureToken` as `final` class** — no subclass can pretend to be a token type.
- **`final String id`** — cannot reassign `id` after construction; `balance` stays mutable on purpose here.

---

## 7. Common mistakes

**Declaring `final` field without assigning in all constructors** — compile error.

**Thinking `final` on reference stops mutation** of the **object inside** — `final List<String> names = ...;` still allows `names.add(...)`; you cannot reassign `names` to another list.

---

## 8. Best practices

**Default locals to `final`** in short methods if your team style agrees—some IDEs can enforce it.

**Use `final` for fields** that should never change after construction.

**Do not mark everything `final` class**—blocks useful testing with mocks unless you design for extension points.

---

## 9. Small practice task

Create **`class Point`** with **`final int x`** and **`final int y`**, set only via constructor. Add **`Point translate(int dx, int dy)`** that returns a **new** `Point` (do not mutate `x`/`y`). Call from `main` and show original unchanged.

---

## Beginner tip

`final` on a reference is a **padlock on the variable name**, not on the house inside—immutable **objects** need design, not `final` alone.
