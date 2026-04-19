---
title: "Chapter 132: Sealed Classes in Java — permits, Closed Hierarchies, and Exhaustive switch"
description: "Use sealed classes and interfaces in Java: permits clause, same-module rules, non-sealed escape hatches, and exhaustive pattern matching over sealed hierarchies."
category: "Java"
tags:
  - Java sealed classes
  - Java permits sealed interface
  - Java sealed exhaustive switch
  - Java non-sealed subclass
  - Java sealed class tutorial
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 132
---

# Chapter 132: Sealed Classes in Java

**Sealed types** let a **superclass or superinterface** **list** which **subtypes** may **extend**/**implement** it—**closing** the **hierarchy** for **readers** and **compilers**. **`permits A, B, C`** names **allowed** **direct** **subtypes**; **`non-sealed`** **reopens** a **branch** when **framework** **subclassing** **must** continue.

---

## 1. Topic title

**Sealed hierarchy: the type author publishes the allowed subtype set explicitly**

---

## 2. What it means

```java
public sealed interface Shape permits Circle, Rectangle {
    double area();
}

public final class Circle implements Shape {
    private final double r;

    public Circle(double r) {
        this.r = r;
    }

    @Override
    public double area() {
        return Math.PI * r * r;
    }
}

public final class Rectangle implements Shape {
    private final double w;
    private final double h;

    public Rectangle(double w, double h) {
        this.w = w;
        this.h = h;
    }

    @Override
    public double area() {
        return w * h;
    }
}
```

**`final`** on **subtypes** is **common**—**prevents** further **sprawl** unless you **`permits`** **more** **levels**.

---

## 3. Why it is used

**Exhaustive `switch`** over **`Shape`** without **`default`** when **all** **permitted** **subtypes** are **handled**—compiler **checks** **coverage**.

**Domain modeling**—**AST** nodes, **protocol states**, **payment instrument** **families**.

---

## 4. Mental sketch

**Sealed** is a **VIP list** at the **door**—only **named** **guests** **inherit** the **brand**. **`non-sealed`** is **“plus ones allowed”** for **one** **branch** only.

---

## 5. Java code example

```java
public class SealedSwitchDemo {
    public static String describe(Shape s) {
        return switch (s) {
            case Circle c -> "circle area=" + c.area();
            case Rectangle r -> "rect area=" + r.area();
        };
    }

    public static void main(String[] args) {
        System.out.println(describe(new Circle(1)));
    }
}
```

**Pattern `switch`** requires **Java 21** language level for **this** **style** in **some** **configs**—match your **toolchain**.

---

## 6. Explanation of code

**Permitted subtypes** must be **accessible**—often **same module** / **same package** depending on **modifiers** and **`module-info`**.

---

## 7. Common mistakes

**Forgetting `permits`** on **interfaces**—**compile** errors read **dense**—**start** from the **supertype** **declaration**.

**Mixing sealed with public API in libraries**—**clients** **outside** the **module** may be **unable** to **extend** when you **later** **need** them to—**design** **extension** points **deliberately**.

---

## 8. Best practices

Pair **sealed** **types** with **records** when **subtypes** are **pure** **data**.

**Document** why **`non-sealed`** exists—**reviewers** should **see** **intent**.

---

## 9. Small practice task

Add **`Triangle`** to the **`permits`** list and watch **compiler errors** until **`switch`** gains the **new** **case**—feel **exhaustiveness** **helping** refactors.

---

## Beginner tip

If **`switch` is not exhaustive** errors confuse you, **temporarily** **`default`** with **`throw new MatchException`** while **learning**, then **remove** once **cases** **cover** **all** **permitted** types.
