---
title: "Chapter 13: Nested if in Java — Conditions Inside Conditions"
description: "Learn nested if statements in Java: when to nest, how braces bind else, flattening with guards, readability limits, and login-style examples without mixing in switch."
category: "Java"
tags:
  - Java nested if
  - Java if inside if
  - Java dangling else
  - Java nested conditions
  - Java readable if
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 13
---

# Chapter 13: Nested if in Java

This chapter is **only** about **nested `if`**: an `if` (or `if-else`, or ladder) **inside** another `if` block. You already know single `if`, `if-else`, and `else-if` from Chapters 10–12.

---

## 1. Topic title

**Nested `if`: combining conditions in layers—and knowing when to stop digging**

---

## 2. What it means

**Nesting** means one control structure sits **inside** another’s body:

```java
if (outerCondition) {
    if (innerCondition) {
        // both true
    }
}
```

The inner `if` runs **only** if the outer condition was true **and** you reach that line.

You can nest `if-else` inside `if`, `else if` inside `else`, and so on. The compiler pairs each `else` with the **nearest** preceding `if` at the **same brace level**—the “dangling else” problem in other languages is less ambiguous in Java if you **always brace**, but humans still get lost in deep trees.

---

## 3. Why it is used

Some rules are naturally **two-dimensional**: “user is logged in” **and** “account is not locked” **and** “role is admin.” You can express that as one big boolean with `&&`, or as nested `if`s that read like a checklist.

Nesting is not evil. **Deep** nesting (four, five levels) is hard to review. This chapter shows **reasonable** nesting and hints at **flattening**.

---

## 4. Real-world example

A file download button:

1. If user is logged in,
2. Then if subscription is active,
3. Then if file size is under quota,

…allow download. Any failure gets its own message. You can write that as nested `if`s or combine conditions—nested form sometimes matches how **support** explains the policy sentence by sentence.

---

## 5. Java code example

```java
public class NestedIfDemo {
    public static void main(String[] args) {
        boolean loggedIn = true;
        boolean hasLicense = true;
        int daysSincePayment = 12;

        if (loggedIn) {
            System.out.println("Session OK.");
            if (hasLicense) {
                System.out.println("License present.");
                if (daysSincePayment <= 30) {
                    System.out.println("Billing OK — feature unlocked.");
                } else {
                    System.out.println("Billing overdue — feature locked.");
                }
            } else {
                System.out.println("No license — read-only mode.");
            }
        } else {
            System.out.println("Please log in.");
        }

        int age = 22;
        boolean hasId = true;

        if (age >= 18) {
            if (hasId) {
                System.out.println("Entry allowed.");
            } else {
                System.out.println("Adult but ID required.");
            }
        } else {
            System.out.println("Minors not admitted without guardian.");
        }
    }
}
```

**Trace `loggedIn = false`:** only “Please log in.” prints from that first tree.

---

## 6. Explanation of code

- **Outer** `if (loggedIn)` gates everything inside. If false, inner checks never run—cheap guard.
- **Middle** `if (hasLicense)` only matters when logged in.
- **Inner** `if (daysSincePayment <= 30)` splits billing health.

Second example: **age** gate first, then **ID** only for adults. Under 18 skips the ID check entirely—that matches many door policies.

---

## 7. Common mistakes

**Pyramid of doom** — six levels of `if` with no blank lines or helper methods. Reviewers cannot see the happy path.

**Wrong `else` pairing** when braces are missing—Java binds `else` to closest `if`; one missing `}` and logic inverts silently.

**Repeating expensive checks** inside each nested branch—compute once, store in a `boolean`.

**Using nesting when `&&` is clearer:**

```java
if (loggedIn && hasLicense && daysSincePayment <= 30) {
    System.out.println("OK");
}
```

That is not nested `if`; it is one condition—pick the style your team reads faster.

---

## 8. Best practices

**Prefer early returns** (once you write methods beyond `main`): handle failure cases first, `return`, then keep the “happy path” at one indent level.

**Extract boolean helpers:** `boolean billingOk = daysSincePayment <= 30;` then `if (loggedIn && hasLicense && billingOk)`.

**Limit depth** to two or three levels in one method; refactor if deeper.

---

## 9. Small practice task

Write nested `if`s (no `&&` on the outer condition) for:

- `temperature` between 20 and 30 inclusive → print `Comfort zone`
- But only if `humidity` is below 60

Test four combinations in your head, then run two in code.

---

## Beginner tip

If you get lost, **number your closing braces** in comments temporarily: `// end login` — delete once stable.
