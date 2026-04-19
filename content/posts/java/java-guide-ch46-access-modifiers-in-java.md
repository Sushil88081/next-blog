---
title: "Chapter 46: Access Modifiers in Java — public, protected, Default, and private Explained Slowly"
description: "Learn Java access levels: who can see classes, fields, and methods across packages and subclasses, plus common packaging mistakes and tiny experiments to build intuition."
category: "Java"
tags:
  - Java access modifiers
  - Java private protected public
  - Java package private default
  - Java visibility rules
  - Java beginner OOP
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 46
---

# Chapter 46: Access Modifiers in Java

Java does not guess who should touch your fields. It **labels** each member with an **access modifier** (or leaves the **default**). This chapter walks the four levels in **plain language**.

**Abstract class vs interface** was Chapter 45. **Exceptions** start in Chapter 47.

---

## 1. Topic title

**Access modifiers: draw a fence around your code on purpose**

---

## 2. What it means

- **`private`** — only **inside the same class** body. Not subclasses, not neighbors. Best default for **fields** you still learning with.
- **Package-private** (no keyword) — **same package** only. Subclasses **outside** the package cannot see package-private members of the parent. That surprises people—remember **package first**, inheritance second for this level.
- **`protected`** — **same package** **or** subclasses (even in other packages) for **inheritance-shaped** access.
- **`public`** — **anywhere** a reference to the type is legal.

Top-level **`class`** without `public` is package-private too: only that folder’s package may use it.

---

## 3. Why it matters

Tight visibility shrinks **accidental coupling**. If every field is public, every other class becomes a silent co-author of your bugs.

---

## 4. Everyday picture

Treat **`public`** like a **storefront sign**: anyone walking by may read it. Treat **`private`** like a **kitchen diary**: only cooks in that kitchen should flip the pages.

---

## 5. Java code example

```java
class Diary {
    private String secret = "recipe";

    public String teaser() {
        return secret.substring(0, 1) + "...";
    }

    void whisperTo(Diary other) {
        // same class: can read private fields of another instance
        System.out.println("peek: " + other.secret);
    }
}

public class AccessDemo {
    public static void main(String[] args) {
        Diary a = new Diary();
        System.out.println(a.teaser());
        // a.secret would not compile here
    }
}
```

Notice **`Diary`** can read **`other.secret`** because **`private` is per-class**, not “only this instance of me.”

---

## 6. Explanation of code

**`teaser`** is **`public`** on purpose: outside callers get a **safe string**. **`secret`** stays **`private`**, so **`main`** cannot assign a prank value directly.

---

## 7. Common mistakes

**Making getters for every private field** out of habit—sometimes **behavior methods** (`addNote`, `void clear()`) tell a clearer story.

**Expecting `protected` to mean “trusted friend”** for random callers—it is still pretty wide once subclasses exist in other packages.

**Huge `public` surface** on internal helpers—if only one package needs a type, consider **package-private** class + tighter members.

---

## 8. Practical habits

When you add a field, ask **“who truly needs this?”** If the answer is **only this class**, mark it **`private`** immediately. Widen later with a reason, not by default.

---

## 9. Small practice task

Create **`class Vault`** with **`private int code`**, **`public boolean tryOpen(int guess)`**, and **`protected void rotate()`** that prints `"rotating"` (subclass can call). Try reading **`code`** from another file in the same package and confirm what the compiler allows.

---

## Beginner tip

If an error says **`secret has private access`**, celebrate a little—the language is doing **exactly** what you asked it to do. Adjust the API (`teaser`, `tryOpen`) instead of making the field public on the first frustration.
