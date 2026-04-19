---
title: "Chapter 3: Java Setup — Install JDK and Choose an IDE"
description: "Install a Java JDK on Windows, macOS, or Linux, verify it with java and javac, and pick an IDE—IntelliJ, Eclipse, or VS Code—with sane defaults for beginners."
category: "Java"
tags:
  - install Java JDK
  - Java IDE
  - IntelliJ Java
  - VS Code Java
  - Java setup Windows
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 3
---

# Chapter 3: Java Setup

This chapter is only about **getting a working Java development environment** on your machine. No language features yet—just tools that behave.

---

## 1. Topic title

**Java setup: JDK install, IDE choice, first project folder**

---

## 2. What it means

**Setup** means:

1. Installing a **JDK** (Java Development Kit) so you have `java` and `javac`.
2. Installing an **IDE** or editor so you are not fighting Notepad for indentation and errors.
3. Knowing how to open a folder and run a class with a `main` method.

---

## 3. Why it is used

Broken setup wastes more beginner hours than almost any language feature. A clean JDK + IDE means:

- Errors show **inline** with line numbers.
- You can **debug** (pause, inspect variables) early.
- You stop guessing whether your code is wrong or your install is wrong.

---

## 4. Real-world example

On a real team, everyone pins a **Java version** in the README or build file (`pom.xml`, `build.gradle`). New hires install that JDK, clone the repo, and run one command. Your home setup is a small version of that habit.

---

## 5. Java code example

No Java source required for verification. Use your terminal:

```bash
java -version
javac -version
```

You want both commands to print a version line from the **same vendor family** you installed (Temurin, Oracle, Corretto, Microsoft build—pick one and stay consistent).

---

## 6. Explanation of code

- `java -version` shows the **runtime** you will execute programs with.
- `javac -version` shows the **compiler** version. For learning, these should match closely (same major version).

If `javac` is “command not found,” you installed a **JRE-only** bundle or your **PATH** is wrong. Fix that before writing programs.

---

## 7. Common mistakes

**Installing multiple JDKs** and not knowing which one your terminal uses. Uninstall extras while learning, or learn `JAVA_HOME`.

**Using very old tutorials** that point to Oracle download pages that changed. Prefer **JDK 17 or 21 LTS** from a well-known distribution.

**Skipping `javac` verification.** Only checking `java -version` hides a broken compiler setup.

---

## 8. Best practices

**Prefer an LTS JDK** (17 or 21 today) unless a course forces another version.

**Use an IDE early:**

- **IntelliJ IDEA Community** — strong defaults for Java and Spring later.
- **Eclipse** — still common in enterprises; slightly steeper UI.
- **VS Code** + Extension Pack for Java — light and fine for learning; IntelliJ still wins for heavy refactoring on huge codebases.

**Create one folder** like `~/projects/java-learning` and keep all exercises there.

---

## 9. Small practice task

Create `HelloSetup.java` with the `Hello` class from Chapter 2. Compile and run it from the terminal **once**, then open the same folder in your IDE and run `main` from the green play button (or your IDE’s equivalent).

---

## Beginner tip

If your IDE says “Project SDK is not defined,” point it at the JDK you just installed. That single setting fixes half of “red squiggles everywhere” panic.
