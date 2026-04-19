---
title: "Chapter 17: do-while Loop in Java — Body First, Then Condition"
description: "Learn the Java do-while loop only: body runs at least once, trailing while condition, menu-style examples, and when do-while beats while."
category: "Java"
tags:
  - Java do while loop
  - Java do while vs while
  - Java menu loop
  - Java loop at least once
  - Java do while example
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 17
---

# Chapter 17: do-while Loop in Java

This chapter is **only** about the **`do-while` loop**: run the body **first**, then check whether to repeat. The body runs **at least once**. **`while`** (Chapter 16) checks **before** the first run and can skip entirely.

---

## 1. Topic title

**`do { ... } while (condition);` — guaranteed first pass, then same rules as `while`**

---

## 2. What it means

```java
do {
    // runs at least once
} while (condition);
```

Note the **semicolon** after `while (condition)` — required syntax.

Flow:

1. Execute the **body**.
2. Evaluate **condition**; if `true`, go to step 1; if `false`, exit.

Compare to `while`: step 2 happens **before** the body in `while`, so the body might never run.

---

## 3. Why it is used

Whenever the program **must show something or read input once** before it makes sense to ask “again?”—menus, “press 0 to exit” consoles, validating “try again until valid” where you want to **read** before checking.

---

## 4. Real-world example

A text **menu**: print options, read user choice, act, loop until user picks Quit. The menu should appear **once** even if the default choice is “continue”—`do-while` matches that story.

---

## 5. Java code example

```java
public class DoWhileDemo {
    public static void main(String[] args) {
        int attempt = 0;

        do {
            attempt++;
            System.out.println("Guess attempt #" + attempt + " (simulated wrong guess)");
        } while (attempt < 3);

        int x = 10;
        do {
            System.out.println("x = " + x);
            x--;
        } while (x > 7);

        int counter = 0;
        do {
            counter++;
        } while (counter < 1);

        System.out.println("counter after odd do-while = " + counter);
    }
}
```

**Trace second loop:** prints 10, 9, 8 — then `x` is 7, condition `x > 7` is false, stop.

Third mini-example shows a **degenerate** pattern on purpose: body runs, then condition fails—still **one** iteration. Useful to see that “at least once” is literal.

---

## 6. Explanation of code

- First `do-while`: always logs at least one “simulated guess” before checking `attempt < 3`.
- Second: demonstrates numeric countdown with **post-body** check.
- Third: `counter` becomes 1 inside; `counter < 1` is false → loop ends after one pass.

---

## 7. Common mistakes

**Forgetting the semicolon** after `while (...);` — compile error.

**Using `do-while` when `while` is clearer** — if “zero times” is valid, `do-while` is the wrong tool.

**Wrong condition polarity** — `do { ... } while (quit == false)` vs `!quit`; pick readable names.

**Infinite `do-while`** — same as `while`; body must move state.

---

## 8. Best practices

**Default to `while`** unless you truly need the first pass unconditionally.

**Keep bodies short**; long menu `switch` inside `do-while` is common in student code—still try to extract methods when it grows.

**Match user mental model:** “show menu, then decide repeat” → `do-while`.

---

## 9. Small practice task

Write a `do-while` that prints `Entering zone` **once**, then keeps adding `step` to `position` starting from `0` while `position < 15`, printing `position` each time. Use `step = 5`. Predict output before you run.

---

## Beginner tip

If you can rewrite as `while` without changing behavior, you did not need `do-while`. That is a valid sanity check.
