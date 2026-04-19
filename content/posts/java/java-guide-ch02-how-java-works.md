---
title: "Chapter 2: How Java Works — JVM, JRE, JDK, and Bytecode"
description: "Understand the JVM, JRE, and JDK, how Java source compiles to bytecode, and what Write Once Run Anywhere really means—with a simple compile-and-run walkthrough."
category: "Java"
tags:
  - JVM JRE JDK
  - Java bytecode
  - how Java works
  - Java compilation
  - Write Once Run Anywhere
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 2
---

# Chapter 2: How Java Works

This chapter is only about the **machine story**: what happens from the moment you save a `.java` file to the moment your program runs.

---

## 1. Topic title

**How Java works (JVM, JRE, JDK, compilation, bytecode, WORA)**

---

## 2. What it means

When you write Java, you are writing **source code** (human-readable). The Java **compiler** (`javac`) translates that into **bytecode** (a compact instruction format the JVM understands).

At run time, the **JVM** loads your classes, verifies bytecode, executes it, and talks to the OS for things like files and network sockets.

So there are two big phases:

1. **Compile time** — `javac` checks types and syntax, emits `.class` files (bytecode).
2. **Run time** — `java` starts the JVM, loads your `main` class, and runs bytecode.

---

## 3. Why it is used

This split is useful in the real world:

- The same **`.class` files** can run on any OS that has a compatible JVM (within the same major Java world you target).
- The JVM can **optimize hot code** while the program runs (JIT compilation).
- Teams can ship **libraries as jars** without giving away source code.

---

## 4. Real-world example

You build a payment microservice on your laptop. CI builds a **jar** or **fat jar**. Production runs the same bytecode on Linux servers with a matching Java version. You are not recompiling per server brand—you are relying on the **JVM port** for that platform.

---

## 5. Java code example

Assume a file `Hello.java`:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello from bytecode");
    }
}
```

Typical terminal flow:

```bash
javac Hello.java
java Hello
```

**Expected output:**

```text
Hello from bytecode
```

After `javac`, you should see `Hello.class` next to your source file.

---

## 6. Explanation of code

- `javac Hello.java` runs the **compiler** on your source file.
- `java Hello` starts the **JVM** and tells it to run the `main` method of class `Hello`. Note: you pass the **class name**, not `Hello.class`.

The JVM finds bytecode on the **classpath** (default: current directory). Later tools hide these steps, but the mental model stays the same.

---

## 7. Common mistakes

**Saying “Java is interpreted only.”** Bytecode starts interpreted, but the JVM **JIT-compiles** hot paths to native code. For learners, “compiled to bytecode, run by JVM” is enough truth.

**Mixing up `javac` and `java`.** Compile with `javac`, run with `java`.

**Running `java Hello.class`.** Use `java Hello` instead.

---

## 8. Best practices

**Install a JDK, not “just Java” from a random tutorial link.** You need `javac` for development.

**Keep your JDK version in sync** with teammates and CI. Small version drift causes annoying “works on my machine” bugs.

**Learn where bytecode lives** (`target/` in Maven, `build/` in Gradle). When something breaks in builds, you will search those folders.

---

## 9. Small practice task

After you install a JDK (next chapter), compile and run `Hello.java` above. Delete `Hello.class` and confirm `java Hello` fails until you compile again.

---

## Beginner tip

**JDK vs JRE vs JVM** — quick map:

- **JVM** — runs bytecode.
- **JRE** (older concept) — JVM + enough libraries to **run** programs.
- **JDK** — JRE pieces for running **plus** developer tools like **`javac`**, `javadoc`, `jdb`.

Modern installs are usually a **JDK** that bundles what you need to develop.
