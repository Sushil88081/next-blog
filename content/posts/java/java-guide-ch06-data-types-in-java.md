---
title: "Chapter 6: Data Types in Java — Primitives, String, Array, and Objects"
description: "Master Java data types: every primitive from byte to boolean, String and arrays as non-primitive types, defaults, ranges, and the difference between primitives and references."
category: "Java"
tags:
  - Java primitive types
  - Java int long double
  - Java String type
  - primitive vs reference Java
  - Java data types tutorial
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 6
---

# Chapter 6: Data Types in Java

This chapter is **only** about **types of data** Java can store: the **primitive** types built into the language, and a first look at important **non-primitive** types (`String`, arrays, `Object`). Operators and casting get their own chapters next.

---

## 1. Topic title

**Data types in Java: primitives, `String`, arrays, objects, and how they behave in memory (high level)**

---

## 2. What it means

Every variable has a **type**. The type tells the compiler:

- How much **memory** to plan for.
- Which **operations** are legal (`int` can multiply; `boolean` cannot).
- How **literals** must look (`true`/`false`, `'A'`, `3.14f`).

**Primitive types** store the value **directly** in the variable slot (for locals, think stack—Chapter 16 will refine the picture).

**Non-primitive types** (also called **reference types**) store a **reference** (an address-like value) pointing at an object in the heap. `String`, arrays, and your own classes are references.

---

## 3. Why it is used

Types catch mistakes **before** run time:

```java
int count = 10;
count = "ten"; // compile error — wrong type
```

They also document intent. A `boolean isPaid` reads better than reusing an `int` where `1` means paid and `0` means not—people still do that, but types give you a better option.

---

## 4. Real-world example

A weather app might store:

- `double temperatureC` — a primitive for a reading.
- `String city` — reference to text like `"Chennai"`.
- `double[] hourlyTemps` — reference to an array object holding many numbers.

The UI layer reads those values and decides what to show. The type choices communicate what each field **is**.

---

## 5. Java code example

```java
public class DataTypesDemo {
    public static void main(String[] args) {
        byte tiny = 100;
        short roomCount = 32000;
        int population = 2_000_000;
        long distanceMeters = 9_000_000_000L;

        float ratio = 0.375f;
        double precise = 0.1 + 0.2;

        char grade = 'A';
        boolean passed = true;

        String message = "Course complete";

        int[] scores = {88, 92, 76};

        System.out.println("byte: " + tiny);
        System.out.println("long needs L suffix on big literals: " + distanceMeters);
        System.out.println("float needs f suffix: " + ratio);
        System.out.println("double 0.1+0.2 surprise: " + precise);
        System.out.println("char prints as character: " + grade);
        System.out.println("boolean: " + passed);
        System.out.println("String: " + message);
        System.out.println("First score: " + scores[0]);
    }
}
```

**Note:** `0.1 + 0.2` in floating point is a famous **not exact** lesson—good for science flags, tricky for money. That is why serious money code uses `BigDecimal` later.

---

## 6. Explanation of code

**Primitives (quick map):**

| Type | What it holds | Typical use (examples) |
|------|----------------|-------------------------|
| `byte` | 8-bit integer | tight binary protocols, large arrays of small numbers |
| `short` | 16-bit integer | uncommon alone; sometimes legacy APIs |
| `int` | 32-bit integer | counters, loops, IDs in learning code |
| `long` | 64-bit integer | timestamps, big counts—suffix **`L`** on literals |
| `float` | 32-bit IEEE float | graphics, ML hooks—suffix **`f`** |
| `double` | 64-bit IEEE float | default for decimals in Java |
| `char` | single 16-bit Unicode unit | one character in single quotes |
| `boolean` | `true` or `false` only | flags, conditions |

**`String`** — immutable text. `"hello"` is a `String` object; your variable points at it.

**Arrays** — `int[]` is a reference type whose object holds many `int`s in order. `scores[0]` is the first element.

**`Object`** — every reference type eventually extends `Object`. You rarely declare `Object` everywhere on purpose; it is the wide escape hatch when you truly do not know the type yet (prefer generics later).

---

## 7. Common mistakes

**Forgetting `L` on big integer literals** — literals default to `int`; huge numbers overflow at compile time unless you mark `long`.

**Forgetting `f` on float literals** — `float x = 0.1;` is a compile error because `0.1` defaults to `double`.

**Using `==` to compare `String` content** — use `.equals` (Chapter 23 will revisit). `==` compares references for objects.

**Assuming `char` is “a byte.”** It is 16-bit Unicode; some math on `char` silently promotes to `int`.

---

## 8. Best practices

**Default to `int` for integers** unless you have a measured reason for `long`/`byte`/`short`.

**Default to `double` for learning floats**, or skip `float` until a library forces it.

**Use `boolean` for yes/no flags**, not `int` magic numbers, when you control the design.

**Use underscores in numeric literals** (`2_000_000`) for readability—Java allows them.

**Pick types that match the domain** early: counts are integers; money in production deserves `BigDecimal` when you get there.

---

## 9. Small practice task

Create variables for a tiny “student card”:

- `String name`
- `int rollNumber`
- `double cgpa`
- `boolean attendanceAbove75`

Assign realistic values, print them on four lines, then change only `cgpa` and print again. Notice which types feel natural for which field.

---

## Beginner tip

If your IDE suggests “change to `long`,” it often means your literal or expression overflowed `int`. Read the message instead of clicking blindly—those hints teach the numeric limits.
