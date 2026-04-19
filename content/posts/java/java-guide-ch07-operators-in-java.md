---
title: "Chapter 7: Operators in Java — Arithmetic, Logic, Assignment, and More"
description: "Learn Java operators in depth: arithmetic, assignment, comparison, logical, increment and decrement, ternary, and a gentle intro to bitwise operators—with examples and pitfalls."
category: "Java"
tags:
  - Java operators
  - Java logical operators
  - Java ternary operator
  - Java increment decrement
  - Java bitwise operators
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 7
---

# Chapter 7: Operators in Java

This chapter is **only** about **operators**: symbols that combine values, compare them, assign results, or change variables in place. We assume you know variables and basic types from Chapters 5 and 6.

---

## 1. Topic title

**Operators in Java: arithmetic, assignment, comparison, logical, `++`/`--`, ternary, and bitwise basics**

---

## 2. What it means

An **operator** works on one or more **operands** and produces a result (or performs an assignment as a side effect).

Examples:

- `a + b` — **binary** `+` on two numbers (or string concatenation if the left operand is `String`—watch that).
- `!flag` — **unary** logical NOT on a `boolean`.
- `x += 1` — **compound assignment**, same idea as `x = x + 1` with subtle typing rules.

---

## 3. Why it is used

Almost every program **computes** and **decides**: totals, discounts, permissions, loop steps. Operators are the low-level vocabulary for those actions. Reading them fluently is how you stop freezing on one line of someone else’s code.

---

## 4. Real-world example

A login form might combine checks:

- Password length at least 8 → comparison operators.
- Account not locked → `boolean` with `&&`.
- Optional “remember me” → `||` with other rules.

The business rules read as conditions built from operators (Chapter 10+ will put those inside `if`).

---

## 5. Java code example

```java
public class OperatorsDemo {
    public static void main(String[] args) {
        int a = 7;
        int b = 3;

        System.out.println("a + b = " + (a + b));
        System.out.println("a - b = " + (a - b));
        System.out.println("a * b = " + (a * b));
        System.out.println("a / b = " + (a / b));
        System.out.println("a % b = " + (a % b));

        int x = 5;
        x += 2;
        System.out.println("after x += 2, x = " + x);

        boolean p = true;
        boolean q = false;
        System.out.println("p && q = " + (p && q));
        System.out.println("p || q = " + (p || q));
        System.out.println("!p = " + (!p));

        int n = 0;
        System.out.println("n++ prints " + (n++) + " then n is " + n);
        System.out.println("++n prints " + (++n) + " then n is " + n);

        int age = 20;
        String label = age >= 18 ? "adult" : "minor";
        System.out.println("label = " + label);

        int bitmask = 0b1100;
        int mask = 0b1010;
        System.out.println("bitwise AND: " + (bitmask & mask));
        System.out.println("bitwise OR: " + (bitmask | mask));
        System.out.println("bitwise XOR: " + (bitmask ^ mask));
    }
}
```

**Output (truncated logic):** integer division `7 / 3` is `2` (drops fraction—use `double` if you need decimals).

---

## 6. Explanation of code

**Arithmetic:** `+ - * / %` on numbers. `%` is remainder—handy for “every third item” patterns.

**Integer division:** both operands `int` → result is `int`, truncated toward zero. Common surprise for beginners.

**Assignment:** `=` assigns. `+=`, `-=`, `*=`, `/=`, `%=` compound with the current variable value.

**Comparison:** `== != < > <= >=` produce `boolean`. For **objects**, `==` compares references, not deep content—use `.equals` for `String` content.

**Logical:** `&&` AND, `||` OR, `!` NOT. `&&` and `||` **short-circuit**: the right side may not run if the answer is already decided (`false && ...`, `true || ...`).

**Increment:**

- `n++` **post-increment**: use old value in the expression, then add one.
- `++n` **pre-increment**: add one first, then use new value.

**Ternary:** `condition ? valueIfTrue : valueIfFalse` — compact `if`-like expression. Do not nest five levels deep; readability dies.

**Bitwise:** `& | ^ ~ << >> >>>` work on integer bits. You see them in low-level IO, flags, and performance code. Learn `& | ^` first; shifts when a tutorial needs them.

---

## 7. Common mistakes

**Using `=` in a condition by accident** when you meant `==`:

```java
if (x = 5) { } // compile error in Java for boolean context — good guard
```

**Mixing `&&` vs `&` for booleans.** `&&` short-circuits; `&` on booleans does not short-circuit. For logic, almost always use `&&` and `||`.

**String concatenation surprise:**

```java
System.out.println("Sum: " + 1 + 2); // prints Sum: 12
```

Left operand is `String`, so `+` means concat. Use parentheses: `"Sum: " + (1 + 2)`.

**Over-clever ternary** spanning three lines—just use `if`.

---

## 8. Best practices

**Use parentheses** when mixing types of operators so readers do not parse precedence in their heads.

**Prefer meaningful names** over magic: `isEligible = age >= 18 && hasConsent` beats a pile of literals in one return.

**Know integer division** before you debug “wrong average” bugs.

**Reach for `BigDecimal` for money math**, not `double` tricks—when you build real billing.

---

## 9. Small practice task

Given `int minutes = 125`, compute **full hours** and **remaining minutes** using `/` and `%`, print both. Then set `minutes` to `59` and run again. No floats needed.

---

## Beginner tip

Precedence tables are boring to memorize. When in doubt, **add parentheses**. No prize for minimal parentheses in learning code.
