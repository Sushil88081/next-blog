---
title: "Chapter 28: Methods in Java — What They Are, How to Declare Them, and How to Call Them"
description: "Learn Java methods from scratch: why they exist, declaration parts (name, parameters, return type preview), void methods, calling from main, and organizing main to stay thin."
category: "Java"
tags:
  - Java methods tutorial
  - Java void method
  - Java method declaration
  - Java static method basics
  - learn Java methods
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 28
---

# Chapter 28: Methods in Java

This chapter is **only** about the **idea of a method** and **how to declare and call** simple ones—including **`void`** methods that return nothing. **Parameters** get extra depth in Chapter 29; **return types** beyond “preview” are Chapter 30; **overloading** is Chapter 31.

---

## 1. Topic title

**Methods: named blocks you call to avoid copy-paste and to name intent**

---

## 2. What it means

A **method** is a named sequence of statements with optional **inputs** (parameters) and optional **output** (return value). You **declare** it once inside a class, then **invoke** it many times.

```java
static void greet(String name) {
    System.out.println("Hello, " + name);
}
```

- **`static`** here means “belongs to the class, not a specific object instance.” You can call it from `main` without `new`—handy for learning. Object instance methods come with OOP chapters later.
- **`void`** means the method does not send a value back to the caller—it might print, mutate something passed in, etc.
- **`greet`** is the method **name**.
- **`(String name)`** is the **parameter list** (Chapter 29 zooms in).

---

## 3. Why it is used

**DRY** — Don’t Repeat Yourself. If you print the same banner in five places, one `printBanner()` method updates behavior everywhere.

**Readability** — `computeTotalWithTax(...)` reads better than twenty lines of math inline.

**Testing** — later you can call small methods from unit tests (Chapter 146 area).

---

## 4. Real-world example

A CLI tool might parse arguments in `main`, then call **`runHelp()`**, **`runMigrate()`**, **`runReport()`** based on a verb. Each verb is a method—easy to navigate in the IDE.

---

## 5. Java code example

```java
public class MethodsIntroDemo {

    static void line() {
        System.out.println("--------------------");
    }

    static void greetTwice(String who) {
        greetOnce(who);
        greetOnce(who);
    }

    static void greetOnce(String who) {
        System.out.println("Hi " + who);
    }

    static void showSum(int a, int b) {
        System.out.println(a + b);
    }

    public static void main(String[] args) {
        line();
        greetTwice("Sam");
        line();
        showSum(2, 3);
    }
}
```

**Output:**

```text
--------------------
Hi Sam
Hi Sam
--------------------
5
```

---

## 6. Explanation of code

- **`line`** takes no parameters, returns nothing—pure side effect (printing).
- **`greetTwice`** calls **`greetOnce`** twice—methods calling methods is normal.
- **`showSum`** demonstrates two `int` parameters (details in Chapter 29).
- **`main`** stays short: orchestration only.

---

## 7. Common mistakes

**Declaring a method inside another method** — not allowed in Java; methods live at **class level**.

**Forgetting `static`** when calling from `static main` without an object—beginners hit “cannot be referenced from a static context.”

**Missing return type** — every method needs a type or `void`.

**Wrong method name casing** — Java is case-sensitive; `Greet` ≠ `greet`.

---

## 8. Best practices

**Verb names** for methods that do actions: `save`, `calculate`, `print`.

**Keep `main` thin** — parse args, call a few methods, done.

**One clear purpose per method** — if the name needs “and,” split.

---

## 9. Small practice task

Add a method **`static void printBox(String title)`** that prints a line of `=`, then the title, then another line of `=`. Call it twice from `main` with different titles.

---

## Beginner tip

Use **Jump to definition** in the IDE on `greetTwice` → `greetOnce` until navigation feels natural. That is how professionals read unfamiliar codebases.
