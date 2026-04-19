---
title: "Chapter 53: Custom Exception in Java — Your Own Types for Domain-Specific Failures"
description: "Create Java exception subclasses: extend Exception or RuntimeException, add fields and constructors, keep messages useful, and know when checked custom types help or hurt an API."
category: "Java"
tags:
  - Java custom exception
  - Java extend Exception
  - Java extend RuntimeException
  - Java domain exception
  - Java exception subclass
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 53
---

# Chapter 53: Custom Exception in Java

Built-in names (`IOException`, `IllegalStateException`) cover many cases. When a **domain phrase** keeps repeating in logs—“**seat conflict**,” “**duplicate nickname**”—a **small custom class** can make **`catch`** blocks clearer and messages more uniform.

**Checked vs unchecked** tradeoffs were Chapter 52. **Collections** start in Chapter 54.

---

## 1. Topic title

**Custom exception: a named subtype with constructors that match your vocabulary**

---

## 2. What it means

You **extend** **`Exception`** (checked unless you extend **`RuntimeException`**) or **`RuntimeException`** (always unchecked). Add **constructors** that forward **`message`** and optional **`cause`** to **`super(...)`**.

```java
public class SeatConflictException extends Exception {
    public SeatConflictException(String message) {
        super(message);
    }

    public SeatConflictException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

Callers of methods **`throws SeatConflictException`** must **handle or declare** it—because **`Exception`** is checked **unless** the parent chain includes **`RuntimeException`**.

---

## 3. Why it is used

**Type-based handling** — `catch (SeatConflictException ex)` reads sharper than parsing **`getMessage()`** strings.

**Extra fields** — store **`int row`**, **`char column`**, or a **correlation id** for support staff.

---

## 4. When unchecked might fit better

If the situation is almost always a **caller bug** (wrong index passed in), a **`RuntimeException`** subtype keeps signatures **quiet**. Reserve **checked** custom types for **expected recoverable** flows.

---

## 5. Java code example

```java
class SeatConflictException extends Exception {
    SeatConflictException(String message) {
        super(message);
    }
}

class SeatBoard {
    void assign(boolean alreadyTaken, String guest) throws SeatConflictException {
        if (guest == null || guest.isBlank()) {
            throw new IllegalArgumentException("guest required");
        }
        if (alreadyTaken) {
            throw new SeatConflictException("row already claimed for " + guest);
        }
    }
}

public class CustomExceptionDemo {
    public static void main(String[] args) {
        SeatBoard board = new SeatBoard();
        try {
            board.assign(false, "Chen");
            board.assign(true, "Chen");
        } catch (SeatConflictException ex) {
            System.out.println("please pick another row: " + ex.getMessage());
        }
    }
}
```

---

## 6. Explanation of code

**`IllegalArgumentException`** fires for **bad input** (unchecked). **`SeatConflictException`** models a **business rule collision** (checked here). **`main`** catches only the **seat** problem; a **`null`** guest would still crash unless you widen **`catch`**—that is a design choice.

---

## 7. Common mistakes

**Deep inheritance trees of exceptions**—two layers are usually enough.

**Empty custom classes** with no constructors—callers lose helpful **`super`** wiring.

**SerialVersionUID** obsession at lesson seven—skip until you serialize exception objects across machines (rare for beginners).

---

## 8. Best practices

Keep **messages human**, **fields factual**, and **constructors boring** (forward to **`super`**).

Document **which** operations throw **which** custom types in the method **`/**` comment** if the type is checked.

---

## 9. Small practice task

Add **`class RefundDeclinedException extends RuntimeException`** with a constructor taking **`long centsRequested`**. Throw it from **`void refund(long cents)`** when **`cents < 0`**. Call **`refund`** from **`main`** without **`throws`** and **`catch`** it—note how the compiler stays quiet because the type is **unchecked**.

---

## Beginner tip

If you are unsure **checked vs unchecked** for your new type, ask: **“Will callers often recover in the same block?”** If **yes**, lean **checked**. If **no**, lean **unchecked** and keep validation strict so the error is rare.
