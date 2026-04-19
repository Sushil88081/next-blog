---
title: "Chapter 33: Class and Object in Java — Blueprint, Instance, and new"
description: "Learn Java class and object fundamentals: fields, methods, instantiation with new, reference variables, dot notation, and a first tiny domain model without inheritance yet."
category: "Java"
tags:
  - Java class and object
  - Java new keyword
  - Java instance
  - Java object reference
  - beginner Java OOP
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 33
---

# Chapter 33: Class and Object in Java

This chapter is **only** about **class** (the blueprint) and **object** (an instance in memory). **Constructors** get their own chapter next (34). **Inheritance** comes later—keep models flat here.

---

## 1. Topic title

**Class and object: `class` defines shape; `new` builds one instance in the heap**

---

## 2. What it means

```java
class Lamp {
    boolean isOn;

    void flip() {
        isOn = !isOn;
    }
}

Lamp desk = new Lamp();
desk.flip();
```

- **`class Lamp`** — defines a type with a **field** `isOn` and a **method** `flip`.
- **`new Lamp()`** — allocates a **`Lamp` object** on the heap, runs the **constructor** (compiler adds a default one here), returns a **reference**.
- **`desk`** — reference variable pointing at that object.
- **`desk.flip()`** — sends message `flip` to the object `desk` refers to.

---

## 3. Why it is used

Programs model the world as **things with state and behavior**. Classes bundle **data + operations** so you can create **many independent lamps** (many objects) from one class.

---

## 4. Real-world example

A **`BankAccount`** class (toy): fields like `String owner` and `double balance`, methods like `deposit` and `withdraw`. Each customer gets **`new BankAccount()`**—separate balances, same code.

---

## 5. Java code example

```java
class Counter {
    int value;

    void increment() {
        value++;
    }

    void reset() {
        value = 0;
    }

    int read() {
        return value;
    }
}

public class ClassObjectDemo {
    public static void main(String[] args) {
        Counter a = new Counter();
        Counter b = new Counter();
        a.increment();
        a.increment();
        b.increment();
        System.out.println("a reads " + a.read());
        System.out.println("b reads " + b.read());
    }
}
```

**Output:** `a reads 2`, `b reads 1` — two objects, two `value` fields.

---

## 6. Explanation of code

- **`Counter a` and `Counter b`** are separate references; unless assigned same reference, they point to **different** objects.
- **Instance fields** (`value`) live **per object**. **Instance methods** run on a specific object; `value` inside `increment` means **this object’s** field (implicit `this`—Chapter 35).

---

## 7. Common mistakes

**Thinking `static` fields are per-object** — they are per-class; not this chapter’s focus, but do not mix them up when you add counters.

**Null reference** — `Counter c = null; c.increment();` → **`NullPointerException`**.

**Forgetting `new`** — `Counter c = Counter();` is invalid Java syntax for construction.

---

## 8. Best practices

**One public class per file** for public top-level classes; filename matches public class.

**Initialize fields** in constructors or at declaration when you have a sensible default (Chapter 34).

**Prefer private fields** once you learn **encapsulation** (Chapter 38); public fields are okay in tiny learning snippets only.

---

## 9. Small practice task

Define **`class Point`** with `int x` and `int y`, and methods **`void move(int dx, int dy)`** and **`String describe()`** returning `"(" + x + "," + y + ")"`. In `main`, create two `Point` objects, move them differently, print `describe()` for each.

---

## Beginner tip

Say **“object in the heap, reference is the remote control”**—two remotes can point at one TV if you assign references that way.
