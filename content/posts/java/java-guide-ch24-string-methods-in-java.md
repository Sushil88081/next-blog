---
title: "Chapter 24: String Methods in Java — Searching, Slicing, Cleaning, and Comparing"
description: "Tour essential Java String methods: length, charAt, substring, indexOf, contains, equals, equalsIgnoreCase, trim, split, replace, toLowerCase, isEmpty, and isBlank—with pitfalls."
category: "Java"
tags:
  - Java String methods
  - Java substring indexOf
  - Java String split
  - Java String trim
  - Java String charAt
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 24
---

# Chapter 24: String Methods in Java

This chapter is **only** about **common `String` instance methods**—the toolbox you use every day. **`String` concepts** were Chapter 23; **`StringBuilder`** is Chapter 25.

---

## 1. Topic title

**Important `String` methods: inspection, search, slice, clean, split, replace, case**

---

## 2. What it means

Each method below runs on a `String` value and usually returns a **new** `String` (or a `boolean` / `int` / `char` / `String[]`) without changing the original—because **`String` is immutable**.

---

## 3. Why it is used

Parsing CSV-ish lines, normalizing user input, extracting file extensions, comparing case-insensitive commands, splitting log lines—**methods** turn raw text into decisions.

---

## 4. Real-world example

A signup field returns `"  Ana  "`. You **`trim()`**, then check **`isBlank()`** (Java 11+) or `length() == 0`, then compare email domain with **`endsWith`**—small pipeline of method calls.

---

## 5. Java code example

```java
public class StringMethodsDemo {
    public static void main(String[] args) {
        String s = "  Hello, Java world!  ";

        System.out.println("length: " + s.length());
        System.out.println("trim: '" + s.trim() + "'");
        System.out.println("charAt 7: " + s.trim().charAt(7));

        String core = "Hello, Java world!";
        System.out.println("substring(7, 11): '" + core.substring(7, 11) + "'");

        System.out.println("indexOf Java: " + core.indexOf("Java"));
        System.out.println("contains world: " + core.contains("world"));

        System.out.println("equals HELLO: " + core.equals("HELLO"));
        System.out.println("equalsIgnoreCase hello: " + core.equalsIgnoreCase("hello, java world!"));

        String csv = "one,two,three";
        String[] parts = csv.split(",");
        System.out.println("split parts: " + parts.length + " first=" + parts[0]);

        String messy = "foo_bar_foo";
        System.out.println("replace bar -> dash: " + messy.replace("_", "-"));

        System.out.println("toLower: " + "MixedCase".toLowerCase());

        String empty = "   ";
        System.out.println("isEmpty: " + empty.isEmpty());
        System.out.println("isBlank: " + empty.isBlank());
    }
}
```

**Note:** `substring(begin, end)` uses **begin inclusive**, **end exclusive**.

---

## 6. Explanation of code

| Method | Role |
|--------|------|
| `length()` | number of `char` code units |
| `charAt(i)` | single `char` at index |
| `substring(b, e)` | slice `[b, e)` |
| `indexOf(sub)` | first index or `-1` |
| `contains(sub)` | convenience search |
| `equals` / `equalsIgnoreCase` | value compare |
| `trim()` | strip leading/trailing whitespace (limited Unicode awareness—good enough for many tasks) |
| `split(regex)` | `String[]` (regex power = watch `.` and special chars) |
| `replace(old, new)` | literal char sequence replace, **all** occurrences |
| `toLowerCase` / `toUpperCase` | locale rules exist—use overload with `Locale` when language matters |
| `isEmpty` | length 0 |
| `isBlank` | Java 11+, true if empty or only whitespace |

---

## 7. Common mistakes

**`split(".")` splitting on “any character”** — `.` is regex special; use `"\\."` for a literal dot.

**Thinking `replace` uses regex** — `replace` is **literal**; `replaceAll` uses regex (different method).

**Substring index confusion** — end exclusive; easy to be off by one.

**Calling `charAt` out of range** — `StringIndexOutOfBoundsException`.

**Locale surprises** on `toLowerCase()`** for Turkish `I` issues—rare in homework, real in global apps.

---

## 8. Best practices

**Chain thoughtfully** — each call allocates; fine for small data.

**Prefer `isBlank` over trim + isEmpty** when on Java 11+.

**Use `strip` (Java 11+)** for Unicode-aware trimming when you need stricter whitespace handling than `trim`.

**Read Javadoc** once for `startsWith` / `endsWith` / `regionMatches` when protocols need them.

---

## 9. Small practice task

Given `String raw = "  SKU-12345;Widget;9.99  "`:

1. `trim` the whole string.
2. `split` on `";"` into three parts.
3. Print SKU, name, and price as separate lines (price stays `String` for now).

Handle wrong segment count with a simple `if (parts.length < 3)` message.

---

## Beginner tip

When `indexOf` returns `-1`, **do not** pass that to `substring` blindly—check first.
