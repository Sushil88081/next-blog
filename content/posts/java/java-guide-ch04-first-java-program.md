---
title: "Chapter 4: First Java Program — class, main, println, how it runs"
description: "Write your first Java program: public class, the main method, System.out.println, and what the JVM does step by step when you hit run."
category: "Java"
tags:
  - Java first program
  - Java main method
  - System.out.println
  - public class Java
  - how Java program runs
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 4
---

# Chapter 4: First Java Program

This chapter walks through **one small program** and explains **each moving part** and **how the JVM starts it**.

---

## 1. Topic title

**Your first Java program: `public class`, `main`, `System.out.println`, execution flow**

---

## 2. What it means

A Java application starts at a **single entry method** with this exact shape (for now):

```java
public static void main(String[] args) { ... }
```

The JVM loads the class you asked to run, finds this method, and executes it from the top of the method body downward (until branches, loops, or calls change order—later chapters).

---

## 3. Why it is used

Every standalone Java tool, student exercise, and many servers **bootstrap** through `main`. Frameworks like Spring still **start** from a generated `main` under the hood.

If you understand `main`, you understand where **your code begins**.

---

## 4. Real-world example

A Spring Boot service might hide `main` inside generated boilerplate, but production still launches with **Java running a class** that contains `main`. Your tiny `Hello` class is the same pattern, just without frameworks yet.

---

## 5. Java code example

```java
public class FirstProgram {
    public static void main(String[] args) {
        System.out.println("My first Java program");
        if (args.length > 0) {
            System.out.println("First argument: " + args[0]);
        }
    }
}
```

Run without arguments:

```bash
javac FirstProgram.java
java FirstProgram
```

**Output:**

```text
My first Java program
```

Run with an argument:

```bash
java FirstProgram Alice
```

**Output:**

```text
My first Java program
First argument: Alice
```

---

## 6. Explanation of code

- `public class FirstProgram` — the **class** is a template for behavior. The **public** class name must match the filename `FirstProgram.java`.
- `public static void main(String[] args)` — **public**: JVM can call it from outside the class. **static**: belongs to the class, not a specific object instance (you have not learned objects deeply yet—treat `static` as “callable without creating an object”). **void**: returns nothing. **String[] args**: command-line arguments.
- `System.out.println` — writes a line to **standard output** (usually your terminal).

The JVM executes statements **in order** until it hits a branch (`if`) that skips a block.

---

## 7. Common mistakes

**Filename does not match the public class name.** `public class FirstProgram` must live in `FirstProgram.java`.

**Writing `Main` instead of `main`.** Java is case-sensitive. The JVM looks for **`main`**, not `Main`.

**Running the wrong class name.** If your class is `FirstProgram`, run `java FirstProgram`, not `java FirstProgram.java`.

**Putting multiple `public` classes in one file.** Only one public top-level class per file (with matching name).

---

## 8. Best practices

**One class per file** while learning. Keep life simple.

**Use meaningful class names** once you move past `FirstProgram`—`TaxCalculatorDemo` beats `Test3`.

**Keep `main` thin later.** For now it is fine to experiment in `main`. Soon you will call other methods from `main` so `main` stays readable.

---

## 9. Small practice task

Change the program to print **two** lines: your name on the first line, today’s date as plain text on the second (hard-coded string is fine). Recompile and run.

---

## Beginner tip

When your IDE shows a green **run** gutter icon next to `main`, that is the same as typing `java YourClass` with the correct classpath. If the IDE run fails but terminal works, compare **working directory** and **JDK** settings.
