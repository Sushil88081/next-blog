---
title: "Chapter 10: if Statement in Java — Conditions and Single-Branch Decisions"
description: "Learn the Java if statement only: boolean conditions, braces, when the body runs, common bugs with assignment vs comparison, and small real-world examples."
category: "Java"
tags:
  - Java if statement
  - Java boolean condition
  - Java control flow
  - Java if braces
  - learn Java if
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 10
---

# Chapter 10: if Statement in Java

This chapter covers **only** the **`if` statement**: one condition, one optional block of code that runs when the condition is **true**. We do **not** cover `else` here—that is Chapter 11.

---

## 1. Topic title

**The `if` statement: testing a condition and running code only when it passes**

---

## 2. What it means

Syntax shape:

```java
if (condition) {
    // runs only when condition is true
}
```

**`condition`** must be a **`boolean`** expression: something that evaluates to `true` or `false`. Examples: `age >= 18`, `balance > 0`, `name.equals("admin")` (for `String` content—never `==` for `String` values).

The **body** is usually written in curly braces `{ }`. If you omit braces, only the **next single statement** belongs to the `if`. That trips people up—see mistakes below.

---

## 3. Why it is used

Programs need to **react** to the world: enough stock, valid password, business hours open. `if` is the smallest building block for “do this only when the situation matches.” Every larger rule (discount ladders, permissions) eventually sits on top of many `if`-style checks.

---

## 4. Real-world example

A parcel locker checks **weight** before opening the deposit slot:

- If weight is over the limit, show an error and do not unlock.
- If weight is fine, allow the next step.

The “over limit” path can be a single `if` that prints a message and returns early from a method (once you learn methods beyond `main`).

---

## 5. Java code example

```java
public class IfOnlyDemo {
    public static void main(String[] args) {
        int temperature = 38;

        if (temperature >= 38) {
            System.out.println("Fever advisory: rest and hydrate.");
        }

        int stock = 3;
        if (stock < 5) {
            System.out.println("Low stock warning: reorder soon.");
        }

        boolean loggedIn = true;
        if (loggedIn) {
            System.out.println("Welcome back.");
        }

        int score = 40;
        if (score >= 40) {
            System.out.println("Pass (minimum met).");
        }
    }
}
```

**Output:**

```text
Fever advisory: rest and hydrate.
Low stock warning: reorder soon.
Welcome back.
Pass (minimum met).
```

Each `if` is independent. All conditions that are `true` run their bodies.

---

## 6. Explanation of code

- `temperature >= 38` compares two `int`s; result is `boolean`.
- `stock < 5` is another comparison.
- `if (loggedIn)` is allowed because `loggedIn` is already `boolean`. Do **not** write `if (loggedIn == true)` in real code—it is noisy.
- Multiple `if`s in a row each get evaluated. There is **no** “otherwise” branch in this chapter—if you need “if not, do B,” wait for Chapter 11.

---

## 7. Common mistakes

**Dropping braces and adding a second line you thought was inside the `if`:**

```java
if (x > 0)
    System.out.println("positive");
    System.out.println("this always runs");
```

The second `println` always runs. Always use `{ }` while learning.

**Using `=` instead of `==` for numbers** — in Java, `if (x = 5)` does not compile for `int` the way old C habits suggest; still, know the difference for `boolean` assignments in conditions in other contexts.

**Putting a semicolon after `if (condition);`** — empty `if`, then the next line always runs. Evil bug.

**Wrong `String` check:** `if (role == "admin")` compares references. Use `if ("admin".equals(role))` to avoid null issues.

---

## 8. Best practices

**Always use braces** `{}` for `if` bodies, even one-liners. Style guides (Google, most teams) agree.

**Keep conditions readable** — extract complex checks to a `boolean` variable with a good name: `boolean eligibleForDiscount = ...`.

**Prefer early `if` + return** inside methods later in the series to avoid deep nesting—paired with Chapter 13 you will see why.

---

## 9. Small practice task

Write a program with `int hour =` a value between 0 and 23. Use **one** `if` (no `else`) that prints `Good evening` only when `hour >= 18`. Run with `hour = 20` and confirm output. Change `hour` to `10` and confirm **nothing** prints from that `if`.

---

## Beginner tip

Read `if` aloud: “**If** this is true, **then** do that block.” If you cannot read the condition aloud clearly, simplify the expression first.
