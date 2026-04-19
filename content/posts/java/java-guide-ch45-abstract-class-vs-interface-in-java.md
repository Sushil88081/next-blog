---
title: "Chapter 45: Abstract Class vs Interface in Java — How to Choose Without Memorizing Rules"
description: "Compare Java abstract classes and interfaces in plain language: shared code vs pure contracts, single class inheritance, when to combine both, and small exercises to build judgment."
category: "Java"
tags:
  - Java abstract class vs interface
  - Java when to use interface
  - Java when to use abstract class
  - Java OOP design beginner
  - Java extends implements
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 45
---

# Chapter 45: Abstract Class vs Interface in Java

You now have **two** big tools for “something promises behavior, details live elsewhere.” This chapter is about **choosing** between them without treating either as a magic badge.

**Abstract class** was Chapter 43. **Interface** was Chapter 44. **Access modifiers** tighten visibility next, in Chapter 46.

---

## 1. Topic title

**Abstract class vs interface: shared skeleton vs portable promise**

---

## 2. What it means

An **abstract class** is allowed to carry **fields**, **constructors**, and **finished methods** next to the bits you leave `abstract`. Think of it as a **half-built house**: wiring might already be in place; subclasses add rooms.

An **interface** is usually a **thin list of jobs** (`save`, `parse`, `score`) that a class can **implement** alongside other interfaces. It shines when you want **several unrelated types** to answer the same call without forcing them under one parent class.

---

## 3. Why it matters

If you pick the wrong shape early, you either **duplicate** logic everywhere or **lock** types into a hierarchy they do not naturally share.

Neither tool is “more professional.” They answer different pressures: **reuse + hierarchy** vs **flexible contracts**.

---

## 4. A small story you can reuse mentally

Imagine a **school lunch line**.

- The **abstract class** might define **tray size** and **how to queue**, because every meal uses the same tray rules. Subclasses only swap **what food** appears.
- The **interface** might say **`Payable`** with **`int centsOwed()`**—a teacher’s salad, a student burger, and a guest wrap can all implement **`Payable`** even if they do not share a single food parent.

---

## 5. Java code example

```java
/** Contract only: many types can implement it. */
interface Named {
    String displayName();
}

/** Shared helper + one abstract hook. */
abstract class ScoredItem implements Named {
    protected final String code;

    protected ScoredItem(String code) {
        this.code = code;
    }

    protected abstract int rawPoints();

    public final int cappedScore() {
        return Math.min(100, Math.max(0, rawPoints()));
    }

    @Override
    public String displayName() {
        return code + " (" + cappedScore() + ")";
    }
}

final class QuizAttempt extends ScoredItem {
    private final int answersRight;

    QuizAttempt(String code, int answersRight) {
        super(code);
        this.answersRight = answersRight;
    }

    @Override
    protected int rawPoints() {
        return answersRight * 10;
    }
}

public class AbstractVsInterfaceDemo {
    public static void main(String[] args) {
        Named n = new QuizAttempt("QZ-12", 7);
        System.out.println(n.displayName());
    }
}
```

**`implements Named`** could live on the abstract class so every **`ScoredItem`** is automatically **`Named`**. Concrete classes only **`extends ScoredItem`**.

---

## 6. Explanation of code

**`cappedScore`** is **`final`** on purpose: every scored item shares the same clamp rule. **`rawPoints`** is the **variable** part subclasses supply. **`Named`** stays **narrow**—anything else in the app could implement **`Named`** without touching **`ScoredItem`**.

---

## 7. Common mistakes

**Empty abstract classes** that only mirror an interface—if there is no shared code or state, an **interface** (or plain class) is usually clearer.

**Fat interfaces** with twenty unrelated methods—callers cannot tell which calls matter for their scenario.

**Deep trees** because “abstract sounded serious”—sometimes **composition** (an object holds a helper) is calmer than a fourth **`extends`**.

---

## 8. Practical habits

Start with the **smallest** surface that still reads well in **`main`**. If two classes share **real** code, lift it to an abstract parent or a **helper object**. If they only share **verbs**, lean on **interfaces**.

---

## 9. Small practice task

Sketch **`interface Storable { void persist(); }`** and **`abstract class WebPayload`** with **`final String traceId()`** plus abstract **`byte[] body()`**. Make **`InvoicePayload`** extend **`WebPayload`** and implement **`Storable`** with a toy `persist` that prints the trace id.

---

## Beginner tip

When stuck, ask: **“Do I already have a parent class I want to extend?”** If yes, **abstract class** is on the table. If the answer is **no** but several types still need the same verbs, **interface** is often the gentler first step.
