---
title: "Chapter 21: One-Dimensional Array in Java — Patterns, Copying, and Common Algorithms"
description: "Master one-dimensional Java arrays: filling and scanning, min/max, sum and average, swapping, copying with Arrays.copyOf, anonymous arrays, and typical exam-style loops."
category: "Java"
tags:
  - Java one dimensional array
  - Java array loop
  - Arrays.copyOf Java
  - Java array min max
  - Java 1D array tutorial
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 21
---

# Chapter 21: One-Dimensional Array in Java

This chapter goes **deep on one-dimensional** arrays only: patterns you will write in homework, interviews, and small utilities. **2D** arrays are Chapter 22.

---

## 1. Topic title

**One-dimensional arrays: scanning, aggregating, searching, copying, and safe indexing**

---

## 2. What it means

A **1D array** is a single row of slots: `type[] name`. You already know creation from Chapter 20. Here we focus on **what you do** with that row: read every cell, update cells, find answers that depend on all cells, and copy data without sharing unwanted references.

---

## 3. Why it is used

Most list-shaped data starts life as a 1D array or later moves to `ArrayList`. Understanding **loops + indices** makes both easier: summing a bill, finding the max test score, reversing a sequence, shifting elements.

---

## 4. Real-world example

A teacher stores **30 quiz scores** in `int[]`. Functions of that array: **average**, **highest**, **count** of scores below passing. All are single-pass or two-pass loops over one dimension.

---

## 5. Java code example

```java
import java.util.Arrays;

public class OneDimensionalArrayDemo {
    public static void main(String[] args) {
        int[] scores = {55, 80, 72, 90, 65};

        int sum = 0;
        for (int s : scores) {
            sum += s;
        }
        double average = (double) sum / scores.length;
        System.out.println("Sum = " + sum + ", average = " + average);

        int max = scores[0];
        for (int i = 1; i < scores.length; i++) {
            if (scores[i] > max) {
                max = scores[i];
            }
        }
        System.out.println("Max score = " + max);

        int[] original = {1, 2, 3};
        int[] grow = Arrays.copyOf(original, 5);
        System.out.println("grown: " + Arrays.toString(grow));

        printTotal(new int[] {10, 20, 30});
    }

    static void printTotal(int[] values) {
        int t = 0;
        for (int v : values) {
            t += v;
        }
        System.out.println("anonymous array total = " + t);
    }
}
```

**`Arrays.toString`** is great for debugging—it prints `[a, b, c]`.

---

## 6. Explanation of code

- **Sum / average:** enhanced `for` accumulates `sum`; cast to `double` before divide so you do not lose decimals.
- **Max:** start with first element; scan rest with index loop when you need `i`.
- **`Arrays.copyOf(original, 5)`** — new array length 5, first elements copied, extra slots default (0 for `int`).
- **`new int[] {10, 20, 30}`** — **anonymous array** passed directly without storing in a variable first.

---

## 7. Common mistakes

**Integer division on averages** — forgot `(double) sum`.

**Starting max at `0`** when all scores could be negative—use first element or `Integer.MIN_VALUE` with care.

**Off-by-one** in loops—`i <= scores.length` is wrong for indexing.

**Copy with assignment `int[] b = a`** — **aliases** same object; changing `b[0]` changes `a[0]`. Use `copyOf` or manual copy when you need independence.

---

## 8. Best practices

**Use `Arrays.copyOf` / `System.arraycopy`** instead of hand-written copy loops unless you are learning.

**Extract tiny methods** like `average(int[] data)` once patterns repeat.

**Validate empty arrays** before dividing by `length`—`length == 0` guard.

---

## 9. Small practice task

Given `int[] data = {3, -1, 7, 7, 2}`:

1. Count how many times the **maximum value** appears.
2. Build a **new** array that is the **reverse** of `data` (do not reverse in place first if you want extra practice—either way is fine).

Print results with `Arrays.toString` where helpful.

---

## Beginner tip

When stuck, print **`Arrays.toString(arr)`** after every “clever” loop iteration during debugging. Clarity beats pride.
