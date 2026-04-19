---
title: "Chapter 23: String in Java — Immutability, Literals, and Reference Behavior"
description: "Learn Java String as a type: immutability, string literals, concatenation, == vs equals, null safety, and why String is not a primitive—without dumping every method here (Chapter 24)."
category: "Java"
tags:
  - Java String immutable
  - Java String equals
  - Java String literal
  - Java String reference
  - Java String concatenation
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 23
---

# Chapter 23: String in Java

This chapter is **only** about **`String` as a concept**: what kind of type it is, how assignment and comparison behave, and **immutability**. Individual **methods** get their own tour in **Chapter 24**; **`StringBuilder`** is Chapter 25.

---

## 1. Topic title

**`String` in Java: immutable text, references, literals, and `equals` vs `==`**

---

## 2. What it means

`String` is a **class** in the Java standard library. A variable of type `String` holds a **reference** to an object that represents **text** (Unicode code units under the hood).

**Immutable** means: once a `String` object is created, its characters are not changed in place. Operations like `toUpperCase()` return a **new** `String` (or the same instance when optimized—do not rely on that for logic).

```java
String s = "hi";
s = s + "!"; // new String object, old "hi" may be garbage collected
```

---

## 3. Why it is used

Text is everywhere: names, JSON, file paths, error messages. `String` is the default way Java represents **read-only** character sequences in APIs.

Immutability makes **sharing** safe: many parts of the program can hold references to the same `"ERROR"` literal without one caller mutating everyone else’s view.

---

## 4. Real-world example

A **HTTP header value** like `"application/json"` is fixed for a given response. You pass it around as `String`, compare with `.equals`, never worry another module trimmed your copy in place—because it cannot.

---

## 5. Java code example

```java
public class StringConceptDemo {
    public static void main(String[] args) {
        String a = "java";
        String b = "java";
        String c = new String("java");

        System.out.println("a == b: " + (a == b));
        System.out.println("a == c: " + (a == c));
        System.out.println("a.equals(c): " + a.equals(c));

        String name = "  Alex  ";
        String trimmed = name.trim();
        System.out.println("same object after trim? " + (name == trimmed));
        System.out.println("trimmed value: '" + trimmed + "'");

        String path = "C:\\data";
        String longer = path + "\\file.txt";
        System.out.println(longer);
    }
}
```

**Typical output:** `a == b` is often **`true`** for identical **literals** (interning in the constant pool—implementation detail). `a == c` is **`false`** because `new` forces a fresh object. **`a.equals(c)`** is **`true`** for same characters.

---

## 6. Explanation of code

- **`==` on objects** compares **references** (same object in memory?).
- **`.equals`** compares **logical content** for `String` (case-sensitive by default).
- **`trim()`** returns a **new** string without leading/trailing spaces; original `name` unchanged.
- **`+` concatenation** builds new strings; fine for small demos, expensive in tight loops (Chapter 25).

---

## 7. Common mistakes

**Using `==` for business equality** of user input or database text—use `.equals`.

**Calling `.equals` on a possibly-null variable first** — `user.equals("admin")` throws if `user` is `null`. Prefer `"admin".equals(user)`.

**Trying to mutate a character** like `s[0] = 'X'` — not valid Java syntax; `String` has no public index setter.

---

## 8. Best practices

**Default to `.equals` for value comparison**; reserve `==` for enums or intentional identity checks.

**Use `text blocks` `"""` (Java 15+)** for multiline SQL or JSON in modern codebases—optional sugar once basics stick.

**Avoid heavy `+` chains in loops**—use `StringBuilder` when profiling shows a hotspot.

---

## 9. Small practice task

Create two strings: `String x = new String("ok");` and `String y = new String("ok");`. Print `x == y` and `x.equals(y)`. Then assign `String z = "ok";` and compare `x == z` and `x.equals(z)`. Write one sentence in a comment explaining what surprised you.

---

## Beginner tip

Think **`String` = read-only snapshot of text**. If you need a **scratchpad** that changes character by character, you are already hinting at **`StringBuilder`**.
