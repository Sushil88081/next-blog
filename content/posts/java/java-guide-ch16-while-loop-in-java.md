---
title: "Chapter 16: while Loop in Java — Condition-First Repetition"
description: "Learn the Java while loop only: condition checked before each iteration, zero or more runs, update inside the body, and infinite-loop pitfalls compared to for."
category: "Java"
tags:
  - Java while loop
  - Java while true
  - Java loop condition
  - Java while vs for
  - beginner Java while
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 16
---

# Chapter 16: while Loop in Java

This chapter is **only** about the **`while` loop**: repeat a block **while** a condition is `true`. The condition is tested **before** each iteration, so the body may run **zero** times. The **`for`** loop was Chapter 15; **`do-while`** is Chapter 17.

---

## 1. Topic title

**The `while` loop: `while (condition) { ... }` and keeping the condition honest**

---

## 2. What it means

```java
while (condition) {
    // body
}
```

Before **every** iteration (including the first), Java evaluates `condition`. If it is `false` immediately, the body **never** runs.

Something inside the body (or the condition itself if it has side effects—usually avoid) must eventually make the condition `false`, or you get an **infinite loop**.

There is no automatic “counter” slot like `for`’s header—you manage state with normal variables.

---

## 3. Why it is used

`while` fits **“keep going until the world changes”** problems: read lines until EOF, retry until success, poll until a flag flips. You often **do not know** the iteration count up front—that is a hint to reach for `while` (or `for` with a complex condition, but `while` reads cleaner).

---

## 4. Real-world example

A simple **password retry** (toy logic): allow up to three attempts. You keep a `attempt` counter and `while (attempt < 3 && !success)` — each failed try increments `attempt`. Real auth is more complex; the shape is what matters.

---

## 5. Java code example

```java
public class WhileLoopDemo {
    public static void main(String[] args) {
        int count = 0;
        while (count < 3) {
            System.out.println("count = " + count);
            count++;
        }

        int n = 1;
        while (n <= 5) {
            System.out.print(n * n + " ");
            n++;
        }
        System.out.println();

        int value = 100;
        while (value > 3) {
            value = value / 2;
            System.out.println("value now " + value);
        }
    }
}
```

**Output shape:** first loop prints 0,1,2. Second prints squares `1 4 9 16 25`. Third keeps halving until `value` is not greater than 3.

---

## 6. Explanation of code

- First loop: `count` starts at 0; each pass prints and increments; when `count` becomes 3, condition `count < 3` fails—loop ends.
- Second: `n` walks 1..5; body uses current `n` then increments.
- Third: shows **update inside body** driving the condition toward exit.

---

## 7. Common mistakes

**Never updating** the variable used in the condition → infinite loop.

**Off-by-one on exit:** `while (count <= 3)` when you only wanted three iterations—trace carefully.

**Copy-pasting `for` habits** and leaving the update only in your head.

**Busy-wait** loops in real apps (`while (!ready) { }`) burn CPU—learning only; later you use waits, callbacks, or blocking APIs.

---

## 8. Best practices

**Make progress obvious:** one clear statement (or small block) that moves state toward the exit.

**Consider `for`** when you have init + condition + update as a natural trio—less room to forget the update.

**Use `break` / `continue`** sparingly (Chapters 18–19); structure can often stay clear without them.

---

## 9. Small practice task

Use `while` to print powers of 2 starting at 1, doubling each line, **stop before** exceeding 1000 (last printed value should be ≤ 1000). No `for` in this exercise.

---

## Beginner tip

If your program “freezes,” check the **Run** tab in the IDE—often a **tight infinite loop**. Stop the process, add a print inside the loop to see which variable never changes.
