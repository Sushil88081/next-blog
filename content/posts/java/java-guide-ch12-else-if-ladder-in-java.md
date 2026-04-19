---
title: "Chapter 12: else-if Ladder in Java — Many Ordered Conditions"
description: "Learn the else-if ladder in Java: ordered mutually exclusive branches, comparing to stacked ifs, fall-through risks, and grade or discount style examples."
category: "Java"
tags:
  - Java else if
  - Java else if ladder
  - Java multiple conditions
  - Java grade program
  - Java if else if chain
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 12
---

# Chapter 12: else-if Ladder in Java

This chapter is **only** about the **`else if` chain** (sometimes called an **else-if ladder**): many conditions checked **in order**, at most **one** branch runs, then the rest of the chain is skipped.

We are **not** covering nested `if` inside `if` as the main topic—that is Chapter 13.

---

## 1. Topic title

**The `else if` ladder: ordering cases from specific to general (or the reverse, on purpose)**

---

## 2. What it means

Pattern:

```java
if (condition1) {
    // A
} else if (condition2) {
    // B
} else if (condition3) {
    // C
} else {
    // default when none matched
}
```

Java checks **top to bottom**. The **first** condition that is `true` wins. Later conditions are **not evaluated** for that run (short-circuiting the ladder in practice—once you are inside a taken branch, you exit the whole construct).

The final `else` is optional. If you omit it and nothing matches, **no** block runs.

---

## 3. Why it is used

You need **more than two** outcomes that are still **one dimension** of logic: letter grades, shipping tiers, HTTP-like status buckets in a toy program. A ladder keeps everything **flat** and readable compared to a pyramid of nested `if-else`.

---

## 4. Real-world example

A **shipping fee** rule might say:

- Under 1 kg: flat small fee.
- 1 kg up to 5 kg: medium fee.
- Above 5 kg: heavy fee.

Those are ordered ranges. The ladder checks **lightest band first** or you design ranges so boundaries do not overlap wrong—**order matters**.

---

## 5. Java code example

```java
public class ElseIfLadderDemo {
    public static void main(String[] args) {
        int score = 73;
        String grade;

        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else if (score >= 60) {
            grade = "D";
        } else {
            grade = "F";
        }

        System.out.println("Score " + score + " -> grade " + grade);

        int hour = 14;
        String meal;

        if (hour < 11) {
            meal = "Breakfast window";
        } else if (hour < 15) {
            meal = "Lunch window";
        } else if (hour < 21) {
            meal = "Dinner window";
        } else {
            meal = "Late snack or closed";
        }

        System.out.println(meal);
    }
}
```

**Output:**

```text
Score 73 -> grade C
Lunch window
```

---

## 6. Explanation of code

**Grades:** `score` is 73. First test `>= 90` fails, `>= 80` fails, `>= 70` **succeeds** → `grade` is `"C"`. The `D` and `F` checks never run for this score.

**Meals:** `hour` 14 fails `< 11`, passes `< 15`, so lunch branch runs; dinner branch is skipped.

**Important:** if you wrote `>= 70` **before** `>= 80` incorrectly, high scores could land in the wrong bucket. Always walk through **boundary values**: 90, 89, 80, 79, 70, 69, 60, 59.

---

## 7. Common mistakes

**Overlapping ranges with wrong order** — first true wins; a bug can hide forever.

**Using many separate `if`s instead of `else if` when cases should be exclusive** — two blocks could run when only one should.

**Copy-paste drift** — `else if (score >= 80)` on one line and `else if (score > 80)` on another; off-by-one bugs.

**Omitting final `else`** when you actually need a guaranteed action—sometimes silent “do nothing” is wrong; add `else` with a log or default.

---

## 8. Best practices

**Put comments for business rules** when thresholds come from a doc: `// per pricing sheet v3`.

**Consider `switch` (Chapter 14)** when the condition is **one variable** against many **constant** values—`switch` on `String` or `int` enums can read cleaner.

**Extract long ladders to a method** with a name like `computeShippingBand(weightKg)` when the `main` method grows.

---

## 9. Small practice task

Build a ladder for **discount percent** by `int cartTotal` rupees:

- `< 500` → 0%
- `< 1500` → 5%
- `< 3000` → 10%
- else → 15%

Print only the percent for `cartTotal = 1200`. Then test `499`, `500`, `1499`, `1500` mentally and fix the ladder if any boundary is wrong.

---

## Beginner tip

Say “**first match wins**” out loud while you trace. That sentence saves hours over a career.
