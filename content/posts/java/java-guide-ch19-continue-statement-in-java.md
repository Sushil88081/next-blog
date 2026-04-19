---
title: "Chapter 19: continue Statement in Java — Skip to the Next Iteration"
description: "Learn Java continue alone: skipping the rest of a loop body, behavior in for vs while, labeled continue, and common confusion with break."
category: "Java"
tags:
  - Java continue statement
  - Java continue vs break
  - Java skip loop iteration
  - Java labeled continue
  - Java for continue
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 19
---

# Chapter 19: continue Statement in Java

This chapter is **only** about **`continue`**: skip the **rest of the current iteration** and jump to the **next** iteration’s condition check (for `while`/`do-while`) or update step (for classic `for`). **`break`** was Chapter 18.

---

## 1. Topic title

**`continue`: “skip what is left below me in this lap, start the next lap”**

---

## 2. What it means

When `continue` runs inside a **loop**:

- **`for`:** jump to the **update** part, then condition.
- **`while` / `do-while`:** jump to the **condition** (for `do-while`, after a `continue` you go to the condition, **not** straight into the body again without checking—think it through on paper).

`continue` does **not** exit the loop—it **skips** the remainder of the **current** pass.

**Labeled `continue`** (rare) targets an outer loop’s next iteration—only needed in nested designs; most code avoids it.

---

## 3. Why it is used

You want to **filter** inside a loop without wrapping the whole body in `if`: “if invalid, `continue`; otherwise do the real work.” That keeps the **happy path** less indented than a giant `if` wrapping everything.

---

## 4. Real-world example

Print **only odd** numbers from 1 to 9: loop all `n`, if `n` is even, `continue`; otherwise print. Same idea as `if (n % 2 != 0) print`, but shows `continue` clearly.

---

## 5. Java code example

```java
public class ContinueDemo {
    public static void main(String[] args) {
        for (int i = 0; i < 6; i++) {
            if (i == 2) {
                continue;
            }
            System.out.print(i + " ");
        }
        System.out.println();

        int n = 0;
        while (n < 5) {
            n++;
            if (n % 2 == 0) {
                continue;
            }
            System.out.println("odd n after increment: " + n);
        }

        for (int k = 1; k <= 12; k++) {
            if (k % 3 == 0) {
                continue;
            }
            System.out.print(k + " ");
        }
        System.out.println(" (skipped multiples of 3)");
    }
}
```

**First loop output:** `0 1 3 4 5 ` — `2` is skipped.

**Second block:** prints lines for odd `n` after `n++` (watch where you place increment vs `continue`—order matters).

---

## 6. Explanation of code

- **`for` + `continue`:** skips printing when `i == 2`; update `i++` still runs, then condition.
- **`while`:** increment first so you do not stick on the same `n`; even values skip the print.
- **Third loop:** prints `k` unless `k` is divisible by 3.

---

## 7. Common mistakes

**Mixing up `break` and `continue`** — `break` leaves the whole loop; `continue` only skips to next iteration.

**Infinite `while` with badly placed `continue`** if you `continue` **before** updating the variable that should move toward exit.

**Using `continue` to avoid tiny `if` negations** when `if (valid) { work }` is clearer—style team preference.

---

## 8. Best practices

**Prefer guard clauses** (`if (!ok) continue;`) at the **top** of the loop body so the rest reads linearly.

**Do not nest `continue` logic** three levels deep—refactor.

**Comment non-obvious `continue`** — future you forgets why a lap was skipped.

---

## 9. Small practice task

Loop `year` from 2000 to 2020 inclusive. Print the year **only** if it is divisible by **4** but **use `continue`** to skip years divisible by **100** unless also divisible by **400** (classic leap-year rule). This is a small filter exercise—print one line per qualifying leap year.

---

## Beginner tip

Trace **`while` + `continue`** on paper with a column for `n` before body, after `n++`, after `continue` jump. One wrong line order changes everything.
