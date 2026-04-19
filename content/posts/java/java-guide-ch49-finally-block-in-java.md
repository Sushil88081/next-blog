---
title: "Chapter 49: finally Block in Java — Cleanup That Runs Even When Things Go Sideways"
description: "Learn Java finally: order of execution with try and catch, interaction with return, why it is not a full safety net, and how try-with-resources often replaces manual closing."
category: "Java"
tags:
  - Java finally block
  - Java try finally
  - Java cleanup resources
  - Java try with resources intro
  - Java exception control flow
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 49
---

# Chapter 49: finally Block in Java

Sometimes you open a **door** you must close: files, locks, temporary toggles. **`finally`** is Java’s way of saying **“run this chunk after the `try` finishes—normally, by `return`, or after a `catch` handles a throw.”**

**`try` / `catch`** was Chapter 48. **`throw` / `throws`** and checked-vs-unchecked nuance come soon after.

---

## 1. Topic title

**finally: the mop bucket after cooking, success or smoke alarm**

---

## 2. What it means

```java
try {
    work();
} catch (IllegalStateException ex) {
    patch();
} finally {
    tidy();
}
```

**`tidy()`** runs **after** `work` completes **or** after **`patch`** runs **if** `work` threw **`IllegalStateException`**. If `work` throws something else, **`tidy` still runs** on the way out—then the exception continues bubbling unless another `catch` matches.

---

## 3. Why it matters

Resource leaks (open handles, half-updated flags) are **quiet** bugs. **`finally`** gives you **one** obvious place to **undo** temporary state.

---

## 4. Small caution in plain words

**`finally` does not swallow exceptions for you.** If `work` throws, **`finally` runs**, then the exception **still propagates** unless a **`catch`** already handled that exact path.

Also, if **`finally` itself throws**, that new problem **masks** the earlier one—keep **`finally`** **boring**: close, log, reset—avoid risky calls there.

---

## 5. Java code example

```java
public class FinallyDemo {
    static int demo(boolean fail) {
        try {
            if (fail) {
                throw new IllegalStateException("boom");
            }
            return 1;
        } catch (IllegalStateException ex) {
            return 2;
        } finally {
            System.out.println("finally runs");
        }
    }

    public static void main(String[] args) {
        System.out.println("case a: " + demo(false));
        System.out.println("case b: " + demo(true));
    }
}
```

Both cases print **`finally runs`**. Returned values are **`1`** or **`2`**, but **`finally` executes before the caller sees that return**.

---

## 6. Explanation of code

**Order snapshot:** evaluate `return` expression → **`finally`** body → **actually return** to caller. That is why **`finally` + `return` mixing** gets confusing—prefer **`try-with-resources`** or small methods instead of clever return tricks.

---

## 7. Common mistakes

**Heavy logic in `finally`**—errors there hide the original failure.

**Using `finally` for normal business flow**—readers expect **cleanup**, not **core calculations**.

**Forgetting modern `try-with-resources`** for **`AutoCloseable`** types—later chapters will practice that pattern; it often removes hand-written **`close()` in finally`**.

---

## 8. Practical habits

Write **`finally`** bodies so short you can **read them in one breath**. If they grow large, extract **`private void restoreInvariants()`** and call that one line.

---

## 9. Small practice task

Write a method that sets **`boolean busy = true`**, enters **`try`**, may throw, and sets **`busy = false` in `finally`**. From **`main`**, assert (by printing) that **`busy`** ends **`false`** even when the **`try` throws**.

---

## Beginner tip

If you only need **`try` / `finally`** without **`catch`**, that is legal—useful when you **rethrow** after cleanup. Pair that pattern carefully; Chapter 50 explores **`throw`** again with more control-flow detail.
