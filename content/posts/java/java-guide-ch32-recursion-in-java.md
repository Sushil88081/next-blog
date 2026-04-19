---
title: "Chapter 32: Recursion in Java — Base Case, Call Stack, and When to Stop"
description: "Learn recursion in Java: base case and recursive step, stack overflow risk, factorial and fibonacci with warnings, and converting simple recursion to loops."
category: "Java"
tags:
  - Java recursion
  - Java recursive method
  - Java stack overflow recursion
  - Java factorial recursive
  - Java base case
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 32
---

# Chapter 32: Recursion in Java

This chapter is **only** about **recursion**: a method that **calls itself** (directly or indirectly) until a **base case** stops it. **Loops** can often replace recursion; both tools belong in your belt.

---

## 1. Topic title

**Recursion: each call waits for the next to finish—stack depth matters**

---

## 2. What it means

Structure:

```java
static int countdownPrint(int n) {
    if (n <= 0) {
        System.out.println("lift-off");
        return 0;
    }
    System.out.println(n);
    return countdownPrint(n - 1);
}
```

- **Base case:** `n <= 0` — no more self-call.
- **Recursive step:** `countdownPrint(n - 1)` — moves toward base case.

Each call adds a **stack frame** (local variables, return address). Too deep → **`StackOverflowError`**.

---

## 3. Why it is used

Some problems are naturally recursive: **tree** traversals, **divide-and-conquer**, parsing nested structures. Iterative versions exist too—often with an explicit **stack** data structure mimicking the call stack.

---

## 4. Real-world example

**File system walk:** recurse into subdirectories until you hit leaves (files). Real walkers use APIs that avoid infinite symlink cycles—still recursive thinking.

---

## 5. Java code example

```java
public class RecursionDemo {

    static int factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be non-negative");
        }
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    static int sumRange(int from, int to) {
        if (from > to) {
            return 0;
        }
        if (from == to) {
            return from;
        }
        return from + sumRange(from + 1, to);
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5));
        System.out.println("sum 1..4 = " + sumRange(1, 4));
    }
}
```

**Fibonacci** is the famous bad naive recursion (`fib(n)=fib(n-1)+fib(n-2)`)—exponential calls. Not shown as recommended production code; use loop or memoization when `n` grows.

---

## 6. Explanation of code

- **`factorial`:** base `0` or `1` returns `1`; else multiply `n` by smaller factorial.
- **`sumRange`:** empty range returns `0`; single element returns that element; else split problem.

---

## 7. Common mistakes

**Missing or wrong base case** — infinite recursion → stack overflow.

**Not moving toward base** — `factorial(n)` calling `factorial(n)` with no change.

**Deep recursion on large `n`** — JVM stack limit kills you; use iteration or tail-call–friendly languages (Java does **not** guarantee tail-call optimization).

**Naive Fibonacci** for `n=40` in homework—your laptop fans learn the lesson.

---

## 8. Best practices

**Prove termination** on paper: some measure strictly decreases each call.

**Prefer loops** for simple linear accumulations unless recursion teaches the idea clearly.

**Add max depth guards** for exploratory recursion on graphs/trees.

---

## 9. Small practice task

Write **`static int countDownSum(int n)`** that returns `n + (n-1) + ... + 1` for `n >= 1`, and `0` for `n <= 0`, using recursion only (no `for`). Test `n = 6` (expect 21).

---

## Beginner tip

When debugging recursion, log **enter** and **exit** with indentation proportional to depth—cheap teacher for the call tree.
