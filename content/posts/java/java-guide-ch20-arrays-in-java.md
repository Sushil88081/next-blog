---
title: "Chapter 20: Arrays in Java — What They Are, How They Live in Memory, and First Steps"
description: "Learn what Java arrays are: fixed-size containers, reference types, default element values, length field, indexing and bounds, and how arrays differ from a pile of separate variables."
category: "Java"
tags:
  - Java arrays introduction
  - Java array reference
  - Java array length
  - Java array default values
  - learn Java arrays
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 20
---

# Chapter 20: Arrays in Java

This chapter is the **big-picture** chapter for **arrays**: what they are, how they relate to variables you already know, and the rules every array shares. **One-dimensional** patterns get extra depth in Chapter 21; **two-dimensional** grids are Chapter 22.

---

## 1. Topic title

**Arrays in Java: fixed-size, indexed, single-variable name for many slots**

---

## 2. What it means

An **array** is an object that holds a **fixed number** of slots of the **same type**, accessed by **index** starting at **0**.

```java
int[] scores;          // reference variable, no array yet
scores = new int[4]; // array object of four ints, heap allocated
```

`int[] scores` reads “`scores` is a reference that can point to an `int` array.” Until you assign `new int[...]` or an initializer, the reference may be **`null`**.

**Length** is fixed at creation time. You cannot `push` like some dynamic lists—`ArrayList` comes later in the collections part.

---

## 3. Why it is used

When you have **many values of the same kind**—temperature readings, pixel rows, student IDs for one class—it is clumsy to use `score1`, `score2`, … `score40`. One array keeps them under **one name** and lets loops walk them.

---

## 4. Real-world example

A **weekly sales total**: seven numbers, one per day. `double[] dayTotals = new double[7];` — index `0` might mean Monday in your convention; document that in a comment.

---

## 5. Java code example

```java
public class ArraysIntroDemo {
    public static void main(String[] args) {
        int[] a = new int[3];
        System.out.println("default ints: " + a[0] + ", " + a[1] + ", " + a[2]);

        double[] temps = new double[2];
        System.out.println("default doubles: " + temps[0]);

        boolean[] flags = new boolean[2];
        System.out.println("default boolean: " + flags[0]);

        String[] names = new String[2];
        System.out.println("default String slot: " + names[0]);

        int[] primes = {2, 3, 5, 7};
        System.out.println("length of primes: " + primes.length);

        primes[0] = 1;
        System.out.println("after change, first = " + primes[0]);
    }
}
```

**Output notes:** numeric primitives default to `0`, `boolean` to `false`, reference slots like `String` to **`null`**. `primes.length` is `4` (no parentheses—`length` is a field, not a method).

---

## 6. Explanation of code

- `new int[3]` allocates three `int` cells, all zero.
- `String[]` array: each cell is a **reference** defaulting to `null`, not empty string.
- `{2, 3, 5, 7}` is an **array initializer**—size inferred, no `new int[]` needed (Java fills it in).
- **Valid indices** for `primes` are `0` through `primes.length - 1`.

---

## 7. Common mistakes

**`ArrayIndexOutOfBoundsException`** — index `length` or negative index.

**Thinking length can grow** — it cannot for a plain array; you need a new array or a collection class.

**Using `length()` on arrays** — that is for `String`; arrays use **`length`**.

**Comparing arrays with `==`** — compares **references**, not contents. Use `Arrays.equals` (later) or compare element by element.

---

## 8. Best practices

**Comment index meanings** when they stand for days, seats, or channels.

**Prefer enhanced `for`** when you only read values (Chapter 15); use index when you need position.

**Do not leave `String[]` slots null** if your code assumes text—initialize to `""` or check `null`.

---

## 9. Small practice task

Create `char[] letters = new char[5];`. Assign `'H'`, `'e'`, `'l'`, `'l'`, `'o'` at indices 0–4 in code (not a string literal trick). Print each char on one line using a **`for` index loop**. Print `letters.length`.

---

## Beginner tip

Say **“length is the count, last index is length minus one”** until it is muscle memory.
