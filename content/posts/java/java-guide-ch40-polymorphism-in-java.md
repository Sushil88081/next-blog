---
title: "Chapter 40: Polymorphism in Java — One Type, Many Behaviors, and Runtime Dispatch"
description: "Learn Java polymorphism: substitutability, parent references to child objects, dynamic method dispatch, instanceof, and how it pairs with inheritance and overriding."
category: "Java"
tags:
  - Java polymorphism
  - Java dynamic dispatch
  - Java instanceof
  - Java subtype polymorphism
  - Java OOP polymorphism
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 40
---

# Chapter 40: Polymorphism in Java

This chapter is **only** about **polymorphism** (“many shapes”): code written against a **supertype** can run **different implementations** depending on the **actual object** at runtime. **Inheritance** was Chapter 39; **method overriding rules** deepen in Chapter 41.

---

## 1. Topic title

**Polymorphism: a reference type is not always the whole story—the object’s class decides which `override` runs**

---

## 2. What it means

```java
class Document {
    String summary() {
        return "generic doc";
    }
}

class Invoice extends Document {
    @Override
    String summary() {
        return "invoice totals";
    }
}

class Memo extends Document {
    @Override
    String summary() {
        return "memo note";
    }
}
```

If you store **`Document d = new Invoice();`** and call **`d.summary()`**, Java runs **`Invoice`’s** version. The **variable** is `Document`; the **object** is `Invoice`. That **runtime choice** is the heart of polymorphism here.

---

## 3. Why it is used

**Plug-in style APIs** — pass different implementations through one method parameter type (`Document`, `Payment`, `Shape`) and callers stay simple.

**Easier extension** — add `class Receipt extends Document` without rewriting every `switch` on concrete class names if you lean on polymorphism instead of scattered conditionals.

---

## 4. Real-world example

**Payment processing:** `Payment p = new CardPayment();` vs `new UpiPayment();` — the checkout flow calls `p.authorize()` once; each subclass implements its own steps.

---

## 5. Java code example

```java
class Shape {
    double area() {
        return 0;
    }
}

class Circle extends Shape {
    private final double r;

    Circle(double r) {
        this.r = r;
    }

    @Override
    double area() {
        return Math.PI * r * r;
    }
}

class Rectangle extends Shape {
    private final double w, h;

    Rectangle(double w, double h) {
        this.w = w;
        this.h = h;
    }

    @Override
    double area() {
        return w * h;
    }
}

public class PolymorphismDemo {
    static void printArea(Shape s) {
        System.out.println(s.area());
    }

    public static void main(String[] args) {
        printArea(new Circle(2));
        printArea(new Rectangle(3, 4));

        Shape s = new Circle(1);
        if (s instanceof Circle c) {
            System.out.println("radius-backed shape, area=" + c.area());
        }
    }
}
```

**`instanceof Circle c`** (pattern matching) is optional sugar on modern Java; use it when you truly need circle-only APIs after treating the value as `Shape`.

---

## 6. Explanation of code

**`printArea(Shape s)`** accepts any `Shape` subtype. **`s.area()`** resolves to **`Circle`** or **`Rectangle`** based on the **runtime** object. That is **subtype polymorphism**—the common Java meaning of the word.

---

## 7. Common mistakes

**Confusing overloads with polymorphism** — overloads pick the method at **compile time** from **static types**; overrides pick at **runtime** from the **actual object**.

**Huge `if (x instanceof A) … else if …` chains** — sometimes a redesign (polymorphic calls, strategy objects) shrinks that noise.

**Calling subclass-only methods on a super reference** without a cast or pattern match—the compiler only knows the supertype’s members.

---

## 8. Best practices

**Prefer polymorphic calls** over repeated type tests when behavior belongs on the object.

**Design supers** with **meaningful shared operations** (`area`, `render`, `authorize`) instead of empty “god” bases.

---

## 9. Small practice task

Add **`class Triangle extends Shape`** with a sensible `area()` (pick a formula). Call **`printArea(new Triangle(...))`** without changing **`printArea`’s** signature.

---

## Beginner tip

Polymorphism is not magic—it is **inheritance + overriding + substitutability**. If overriding feels fuzzy, skim Chapter 39 again, then read Chapter 41 next.
