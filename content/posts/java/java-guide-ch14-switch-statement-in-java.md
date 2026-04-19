---
title: "Chapter 14: switch Statement in Java — Classic and Modern switch Expressions"
description: "Learn Java switch alone: classic switch with break, fall-through risks, String and enum cases, and modern switch expressions with yield and arrows (Java 14+)."
category: "Java"
tags:
  - Java switch statement
  - Java switch expression
  - Java switch break
  - Java switch yield
  - Java enum switch
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 14
---

# Chapter 14: switch Statement in Java

This chapter is **only** about **`switch`**: choosing a branch based on **one** expression’s value (often `int`, `String`, or `enum`). Loops are not here—Chapter 15 starts `for`.

You need a **modern JDK** (14+ for switch expressions, 17 LTS recommended) to compile every example below. If an example fails to compile, check `java -version`.

---

## 1. Topic title

**`switch` in Java: classic `switch` with `break`, and newer `switch` expressions**

---

## 2. What it means

**Classic `switch`** compares the **selector expression** against **constant case labels**. When a case matches, execution **falls through** every case below until a **`break`** (or `return`, or thrown exception) stops it.

```java
switch (dayCode) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    default:
        System.out.println("Other day");
}
```

**`default`** runs when no case matches. It is optional but usually wise.

**Modern `switch` expression** (Java 14+): the whole `switch` can **produce a value** and, with arrow syntax, does **not** fall through by default.

```java
String label = switch (dayCode) {
    case 1, 7 -> "Start or end of week";
    case 2, 3, 4, 5, 6 -> "Midweek";
    default -> "Unknown code";
};
```

With **blocks** per case, use **`yield`** to return a value:

```java
int fee = switch (zone) {
    case "A" -> 100;
    case "B" -> {
        int base = 80;
        yield base + 10;
    }
    default -> 0;
};
```

---

## 3. Why it is used

When many branches depend on **one variable** and values are **discrete constants**, `switch` can read cleaner than a long **`else-if` chain** on the same variable. IDEs also autocomplete `enum` cases.

---

## 4. Real-world example

HTTP-like **status class** in a toy client: map integer `1`–`5` to labels like `Informational`, `Success`, `Redirect`, `Client Error`, `Server Error`. Same variable, many named buckets—`switch` fits.

---

## 5. Java code example

**Classic style (watch `break`):**

```java
public class SwitchClassicDemo {
    public static void main(String[] args) {
        String command = "save";

        switch (command) {
            case "save":
                System.out.println("Persisting...");
                break;
            case "load":
                System.out.println("Loading...");
                break;
            case "quit":
                System.out.println("Bye.");
                break;
            default:
                System.out.println("Unknown command.");
        }

        int month = 2;
        switch (month) {
            case 12:
            case 1:
            case 2:
                System.out.println("Winter bucket (demo)");
                break;
            default:
                System.out.println("Other season");
        }
    }
}
```

**Expression style (Java 14+):**

```java
public class SwitchExpressionDemo {
    public static void main(String[] args) {
        String tier = "gold";

        int discountPercent = switch (tier) {
            case "platinum" -> 20;
            case "gold" -> 15;
            case "silver" -> 10;
            default -> 0;
        };

        System.out.println("Discount: " + discountPercent + "%");
    }
}
```

---

## 6. Explanation of code

**Classic:** Without `break` after `"save"`, execution would fall into `"load"` and print both—almost never what you want for strings. The winter month example **intentionally** stacks cases with no `break` between 12,1,2 so they share one action—**document** that pattern when you use it.

**Expression:** `switch` returns an `int` assigned to `discountPercent`. No `break` needed with `->`. `default` covers unknown tiers.

**`String` switch:** case labels are **compile-time constants** (literals or `static final` strings).

---

## 7. Common mistakes

**Forgotten `break`** in classic `switch` — classic bug; some teams ban classic `switch` entirely.

**Using `switch` with **ranges** like `score >= 90`** — `switch` matches **exact** constants; ranges belong to `if` / `else-if` or need mapping first.

**Null selector** — `switch (maybeNull)` throws **`NullPointerException`**. Guard with `if (maybeNull == null)` first or use `Objects.requireNonNull` with intent.

**Mixing `return` inside `void` switch** — fine in methods; confusing inside `main` if half cases return and half `break`.

---

## 8. Best practices

**Prefer expression `switch` with `->`** for new code when every case produces a value—less fall-through risk.

**Use `enum` in `switch`** when your domain has a fixed set—compiler can warn about missing cases (with the right flags or IDE inspection).

**Keep `default`**, even if it throws `IllegalArgumentException` for impossible values—fail loud in APIs.

---

## 9. Small practice task

Write a **switch expression** on `String language` (`"en"`, `"hi"`, `"mr"`) that returns a greeting string (`"Hello"`, `"Namaste"`, `"Namaskar"`) and print it. Add `default` → `"Hello"`. Test an unknown language code.

---

## Beginner tip

If your IDE offers “Convert to switch expression,” use it on toy code to see the modern shape. Then you are not afraid of `yield` when a case needs three lines.
