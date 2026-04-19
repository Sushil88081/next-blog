---
title: "Chapter 11: if-else Statement in Java — Two-Way Branching"
description: "Learn Java if-else only: two branches, mutually exclusive paths, style with braces, and patterns like validation without cramming other control flow topics."
category: "Java"
tags:
  - Java if else
  - Java two way branch
  - Java else block
  - Java if else beginner
  - Java conditional else
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 11
---

# Chapter 11: if-else Statement in Java

This chapter is **only** about **`if` with `else`**: exactly **two** paths. Either the condition is true and the first block runs, or it is false and the **`else`** block runs. Long chains of conditions belong to Chapter 12.

---

## 1. Topic title

**The `if-else` statement: choosing between two mutually exclusive actions**

---

## 2. What it means

Shape:

```java
if (condition) {
    // when true
} else {
    // when false
}
```

Exactly **one** of the two blocks runs. There is no third option in plain `if-else`—if you need more, you stack **`else if`** next chapter or use **`switch`** in Chapter 14.

---

## 3. Why it is used

Binary decisions are everywhere: **pass / fail**, **logged in / guest**, **payment success / failure**, **adult / not for age-gated content**. `if-else` models that cleanly when you only care about two outcomes.

---

## 4. Real-world example

An ATM checks **PIN length** before sending anything to the bank:

- If length is 4 digits, proceed to the next screen.
- Else show “Invalid PIN format” and stay on the entry screen.

Two outcomes, one structure. (Real ATMs do more validation; this is the shape.)

---

## 5. Java code example

```java
public class IfElseDemo {
    public static void main(String[] args) {
        int marks = 52;

        if (marks >= 40) {
            System.out.println("Result: Pass");
        } else {
            System.out.println("Result: Fail");
        }

        boolean isWeekend = false;

        if (isWeekend) {
            System.out.println("Sleep in.");
        } else {
            System.out.println("School or office day.");
        }

        int age = 16;

        if (age >= 18) {
            System.out.println("Ticket: adult pricing");
        } else {
            System.out.println("Ticket: minor pricing");
        }
    }
}
```

**Output:**

```text
Result: Pass
School or office day.
Ticket: minor pricing
```

---

## 6. Explanation of code

- First `if-else`: one branch prints Pass, the other Fail. `marks` is only checked once for that pair.
- Second pair: `isWeekend` is `false`, so the `else` branch runs.
- Third pair: age branch—**only one** pricing message prints.

The `else` has **no** condition—it means “everything the `if` did not catch.”

---

## 7. Common mistakes

**Attaching `else` to the wrong `if` in nested code** — indentation lies; braces decide. Chapter 13 digs into nesting; here, keep programs flat.

**Using `if-else` when you need three or more separate cases** — you can nest `if-else` inside `else`, but that gets messy fast; Chapter 12’s ladder is often clearer.

**Empty `if` with work only in `else`** — sometimes you should flip the condition for readability: `if (!ok) { ... } else { ... }` vs positive check—pick the version a human reads faster.

---

## 8. Best practices

**Put the “happy path” or simpler branch first** when it helps reading—teams disagree; consistency with your project matters more than dogma.

**Avoid `else` after `return` in the `if` block** when the `if` already exits the method—some style checkers flag redundant `else` (optional style).

**Keep both blocks short**; if each side is twenty lines, extract methods (Chapter 28+).

---

## 9. Small practice task

Read a `double` `temperature` (you can hard-code `36.5` first). Print `Normal range` if it is strictly **below** 38.0, else print `Check for fever`. Use **only** `if-else`—no `else if`.

---

## Beginner tip

Trace with paper: draw a line from the condition to **true branch** or **false branch**. You should never feel like both ran.
