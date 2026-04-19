---
title: "Chapter 15: for Loop in Java — Indexed Loops and the Enhanced for"
description: "Learn the Java for loop in depth: init, condition, update, scope of loop variable, nested for, and the enhanced for-each form—with examples and off-by-one pitfalls."
category: "Java"
tags:
  - Java for loop
  - Java enhanced for loop
  - Java nested for loop
  - Java loop increment
  - beginner Java loops
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 15
---

# Chapter 15: for Loop in Java

This chapter is **only** about the **`for` loop**: repeating work with a compact header that controls **initialization**, **condition**, and **update**. The **`while`** and **`do-while`** loops are Chapters 16 and 17.

---

## 1. Topic title

**The `for` loop: `for (init; condition; update)` and the enhanced `for-each`**

---

## 2. What it means

**Classic `for`:**

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

Three parts in the header, separated by semicolons:

1. **Initialization** — runs once before the first check (`int i = 0`).
2. **Condition** — checked **before** each iteration; if `false`, the loop stops.
3. **Update** — runs **after** each iteration’s body (`i++` here).

The loop variable (`i`) exists **only inside** the `for` block if you declare it in the init (as above).

**Enhanced `for` (“for-each”):**

```java
int[] scores = {10, 20, 30};
for (int value : scores) {
    System.out.println(value);
}
```

Reads: “for each `value` in `scores`.” No index unless you add one manually. Arrays get a deeper treatment in Part 4; here you only need the syntax to read collections you already have.

---

## 3. Why it is used

`for` shines when you know **how many steps** you want, or you want the **index** (`i`) for printing row numbers, walking a string by position, or driving a times table. The header keeps all loop control in **one line**—easier to scan than a `while` with scattered update.

---

## 4. Real-world example

Printing a **receipt line list**: you have five items; you loop `i` from `0` to `4` and print `i + 1` as the line number plus the item name from a parallel array (again, Part 4 makes arrays comfortable—for now, imagine the data exists).

---

## 5. Java code example

```java
public class ForLoopDemo {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.println("classic i = " + i);
        }

        for (int row = 1; row <= 3; row++) {
            for (int col = 1; col <= 3; col++) {
                System.out.print("(" + row + "," + col + ") ");
            }
            System.out.println();
        }

        int total = 0;
        for (int n = 1; n <= 100; n++) {
            total += n;
        }
        System.out.println("sum 1..100 = " + total);

        String[] days = {"Mon", "Tue", "Wed"};
        for (String d : days) {
            System.out.println("for-each day: " + d);
        }
    }
}
```

**Sample output:** nested block prints a 3×3 grid of coordinates; last line shows `sum 1..100 = 5050`.

---

## 6. Explanation of code

- First loop: `i` is 0, 1, 2 — condition `i < 3` fails when `i` becomes 3.
- **Nested `for`:** inner completes for each outer value; `col` resets every outer iteration.
- **Summation:** `total` declared **outside** the loop so it survives after the loop ends; `n` is loop-local.
- **Enhanced `for`:** each `d` is one element of `days`; no index variable.

---

## 7. Common mistakes

**Off-by-one:** `i <= array.length` when indexing `0..length-1` → **`ArrayIndexOutOfBoundsException`**. Prefer `i < arr.length` when using index `i`.

**Wrong update:** `i--` when you meant `i++` → infinite loop or wrong direction.

**Declaring `int i` twice** in nested loops is fine (`for (int i...)` inner shadows outer—confusing; use `row`/`col` names).

**Forgetting braces** and adding a second line you thought was in the loop—same lesson as `if`.

---

## 8. Best practices

**Use meaningful names:** `row`, `col`, `attempt`, not only `i` in non-trivial loops.

**Prefer `i < n` style** over `i <= n-1` when both mean the same—pick one style per project.

**Keep loop bodies small**; extract a method if the body grows huge.

**Use enhanced `for`** when you only need values, not indices.

---

## 9. Small practice task

Print a **multiplication line** for 7: `7 x 1 = 7` through `7 x 10 = 70` using one classic `for` with `multiplier` from 1 to 10.

---

## Beginner tip

Trace the **first and last** iteration on paper: what is `i` at start, what is `i` when the loop exits? If you cannot answer, the condition is unclear.
