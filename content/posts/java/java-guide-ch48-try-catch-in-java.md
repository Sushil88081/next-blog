---
title: "Chapter 48: try-catch in Java — Handling Errors Without Pretending They Never Happened"
description: "Learn Java try and catch: execution order, catching specific types, multi-catch, variable scope, logging vs swallowing, and a small parser example you can extend."
category: "Java"
tags:
  - Java try catch
  - Java exception handling
  - Java catch block
  - Java multi catch
  - Java beginner exceptions
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 48
---

# Chapter 48: try-catch in Java

**Exceptions** (Chapter 47) need a **listener**. In Java, that listener is a **`catch`** block attached to a **`try`** block. Code inside **`try`** runs **until** either it finishes, **`return`s**, or **throws**. If it throws, matching **`catch`** blocks are considered **in order**.

**`finally`** (always-run cleanup) is Chapter 49.

---

## 1. Topic title

**try / catch: fence off risky lines and decide Plan B**

---

## 2. What it means

```java
try {
    int n = Integer.parseInt(text);
    System.out.println(n * 2);
} catch (NumberFormatException ex) {
    System.out.println("not a number: " + ex.getMessage());
}
```

**`Integer.parseInt`** throws **`NumberFormatException`** when the string is not an integer. The **`catch`** receives **`ex`**, a reference to the thrown object, so you can log **`getMessage()`** or **`toString()`**.

---

## 3. Why it matters

Without **`try` / `catch`**, a thrown exception **bubbles** until something handles it—or the program ends. Wrapping risky calls lets you **retry**, **substitute defaults**, or **show a friendly message** while keeping the rest of the app alive.

---

## 4. Picture for memory

**`try`** is a **glass bowl**: you only want certain cracks to shatter outward. **`catch`** is the **mat** underneath labeled with crack shapes—only matching pieces land there.

---

## 5. Java code example

```java
public class TryCatchDemo {
    static int parsePositive(String raw) {
        try {
            int v = Integer.parseInt(raw.trim());
            if (v <= 0) {
                throw new IllegalArgumentException("must be > 0");
            }
            return v;
        } catch (NumberFormatException bad) {
            throw new IllegalArgumentException("not an int: " + raw, bad);
        }
    }

    public static void main(String[] args) {
        String[] samples = {"12", "0", "oops"};
        for (String s : samples) {
            try {
                System.out.println(parsePositive(s));
            } catch (IllegalArgumentException ex) {
                System.out.println("skip: " + ex.getMessage());
            }
        }
    }
}
```

**Chaining**: the inner **`catch`** wraps the **`NumberFormatException`** inside a new **`IllegalArgumentException`** using the two-argument constructor (**cause** preserved for stack digging).

---

## 6. Explanation of code

**`try` inside `parsePositive`** handles **string shape** problems. **`IllegalArgumentException`** for **`<= 0`** is a **logic** problem—no `catch` inside that method, so it **flies** to **`main`’s** loop-level **`try`**.

---

## 7. Common mistakes

**Catching `Exception` first** then **`NumberFormatException` below**—unreachable; always order **most specific** before **general**.

**Empty `catch` blocks**—if you truly must swallow, leave a **one-line comment** explaining **why** that is safe here.

**Huge `try` blocks**—if fifty lines sit in `try`, you lose clarity about **which** line failed. Prefer **smaller tries** or **extract methods** with clear names.

---

## 8. Practical habits

Log or print **both** **`ex.getMessage()`** and **`ex`** (or use a logger that prints stack traces). Messages alone sometimes hide **where** the throw originated.

---

## 9. Small practice task

Wrap **`Double.parseDouble`** for user input in **`try` / `catch (NumberFormatException)`**; on failure, return **`OptionalDouble.empty()`** from a helper **`safeDouble(String s)`** (Java 8+). Call it from **`main`** with good and bad strings.

---

## Beginner tip

A **`catch`** variable is only visible **inside** that `catch` block—if you need the exception later, **assign** to a field or **rethrow** wrapped. Chapter 49 shows **`finally`** for work that must run **whether or not** `catch` ran.
