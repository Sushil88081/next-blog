---
title: "Chapter 5: Variables in Java — Declaration, Initialization, and Naming"
description: "Learn Java variables in depth: what they are, how to declare and initialize them, naming rules and conventions, scope basics, and mistakes beginners make."
category: "Java"
tags:
  - Java variables
  - declare variables Java
  - Java naming conventions
  - Java variable scope
  - learn Java basics
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 5
---

# Chapter 5: Variables in Java

This chapter is **only** about **variables**: a name that holds a value you can read and change while your program runs. We do not mix in full data-type theory here—that is Chapter 6. We still need enough type words (`int`, `String`) to show real examples.

---

## 1. Topic title

**Variables in Java: declaration, initialization, naming rules, and why they exist**

---

## 2. What it means

A **variable** is a **named piece of memory** the compiler knows about. You pick a **type** (next chapter goes deep) and a **name**. The JVM reserves space (or a reference, for objects) and lets you assign values.

Two common patterns:

**Declaration then assignment:**

```java
int score;
score = 10;
```

**Declaration with initialization:**

```java
int score = 10;
```

The `=` is **assignment**: “put this value into this variable.” It is not the same as “equals” in math.

---

## 3. Why it is used

Programs work on **data**: user IDs, prices, counters, flags. Without variables, you would hard-code every value or repeat literals everywhere. Variables let you:

- **Compute** results and store them.
- **Read** the same value from many lines of code using one name.
- **Change** a value as time goes on (a loop counter, a running total).

---

## 4. Real-world example

An e-commerce cart might keep:

- `itemCount` — how many lines are in the cart.
- `subtotal` — money sum before tax.
- `freeShippingApplied` — yes/no for a rule.

Each of those is a variable (with types you will formalize in Chapter 6). The checkout logic reads and updates them step by step.

---

## 5. Java code example

```java
public class VariableDemo {
    public static void main(String[] args) {
        int items = 3;
        double priceEach = 4.99;
        double subtotal = items * priceEach;

        String customerName = "Alex";

        System.out.println("Customer: " + customerName);
        System.out.println("Items: " + items);
        System.out.println("Subtotal: " + subtotal);

        items = items + 1;
        subtotal = items * priceEach;
        System.out.println("After adding one item, items = " + items);
        System.out.println("New subtotal: " + subtotal);
    }
}
```

**Sample output:**

```text
Customer: Alex
Items: 3
Subtotal: 14.97
After adding one item, items = 4
New subtotal: 19.96
```

---

## 6. Explanation of code

- `int items = 3;` — `items` is an integer variable, starting at 3.
- `double priceEach = 4.99;` — `double` holds decimal numbers; good for money **learning** (production money often uses `BigDecimal`—later topic).
- `double subtotal = items * priceEach;` — expression on the right is evaluated, then stored in `subtotal`.
- `String customerName = "Alex";` — `String` is a reference type; the variable holds a **reference** to text in memory.
- `items = items + 1;` — read old value, add one, write back. Same idea as “increment cart line count.”

---

## 7. Common mistakes

**Using a variable before assigning it (for locals).** If you declare `int x;` and then `System.out.println(x);` without assigning, the **compiler** stops you. Good safety net.

**Bad names like `a`, `b`, `x1` in real code.** Fine for a five-line demo; painful in a fifty-line method.

**Thinking `=` means “equals forever.”** It means “assign now.” Later you can assign again.

**Re-declaring inside the same block:**

```java
int score = 1;
int score = 2; // compile error in Java
```

Use `score = 2;` instead.

---

## 8. Best practices

**Use camelCase for variables:** `itemCount`, `maxRetries`, `isActive`. That is the Java community default.

**Names should read like plain language:** `totalPrice` beats `tp`.

**Declare variables close to first use** when possible. Scattering declarations at the top of a huge method makes readers hunt for meaning.

**Prefer `final` when a value should not change** (Chapter 37 goes deeper, but you can peek now):

```java
final int maxLoginAttempts = 5;
```

That signals “do not reassign this by accident.”

---

## 9. Small practice task

Write a `main` program with:

- `int books = 2;`
- `double pricePerBook = 12.50;`
- `String readerName =` your first name as a string literal.

Print a one-line summary like: `Reader Maria has 2 books, estimated cost 25.0` (you can build the string with `+` for now). Then change `books` to `5` and **only** re-run—no duplicate literals for the count in the print line (use the variable).

---

## Beginner tip

When the compiler says “variable might not have been initialized,” it is doing you a favor. Assign a sensible default or compute the value before you read it.
