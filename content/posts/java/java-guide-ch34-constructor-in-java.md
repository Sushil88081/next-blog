---
title: "Chapter 34: Constructor in Java — Object Initialization and Overloading Constructors"
description: "Learn Java constructors: default vs explicit, parameter lists, this() chaining, initialization order, and common mistakes with return types and names."
category: "Java"
tags:
  - Java constructor
  - Java default constructor
  - Java constructor overloading
  - Java new object init
  - Java this constructor chain
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 34
---

# Chapter 34: Constructor in Java

This chapter is **only** about **constructors**: special methods that run when you write **`new`**. **Class vs object** was Chapter 33; **`this` keyword** details expand in Chapter 35.

---

## 1. Topic title

**Constructors: same name as the class, no return type, run once per `new`**

---

## 2. What it means

```java
class Book {
    String title;
    int pages;

    Book(String title, int pages) {
        this.title = title;
        this.pages = pages;
    }
}
```

- **Name** must match the class exactly.
- **No return type** — not even `void`. If you write `void Book(...)`, it is **not** a constructor—almost never what you want.
- **`this.title = title`** disambiguates field vs parameter (full `this` story next chapter).

If you write **no** constructors, Java adds a **public no-arg default**—until you define any constructor; then the default disappears unless you add it yourself.

---

## 3. Why it is used

Constructors **establish invariants** before anyone uses the object: non-null title, positive page count, sensible defaults.

They also give a **single obvious place** for setup instead of scattered `init()` methods people forget to call.

---

## 4. Real-world example

A **`User`** object might require `email` and `createdAt` at birth—constructor enforces “cannot exist half-built.” Validation can grow into factory methods later; the idea starts here.

---

## 5. Java code example

```java
class Cup {
    int milliliters;

    Cup() {
        this(250);
    }

    Cup(int milliliters) {
        if (milliliters <= 0) {
            throw new IllegalArgumentException("milliliters must be positive");
        }
        this.milliliters = milliliters;
    }
}

public class ConstructorDemo {
    public static void main(String[] args) {
        Cup small = new Cup();
        Cup big = new Cup(500);
        System.out.println(small.milliliters + " ml");
        System.out.println(big.milliliters + " ml");
    }
}
```

**`this(250)`** calls the other constructor in the same class—must be **first line** of the no-arg constructor.

---

## 6. Explanation of code

- **No-arg** `Cup()` delegates to **`Cup(int)`** so default size lives in one place.
- **Validation** throws if rules break—fail fast instead of silent bad state.

---

## 7. Common mistakes

**Accidental `void` constructor** — silently breaks initialization expectations.

**Recursive constructor calls** — `Cup() { this(); }` loops forever at runtime.

**Calling instance methods before fields are safe** — rare foot-gun during construction; keep constructors simple early on.

---

## 8. Best practices

**Keep constructors short**; heavy work can move to factories or `init` services in big apps.

**Overload constructors** for common shapes; delegate with `this(...)` to one “master” constructor when possible.

**Document thrown exceptions** from validation in class-level comments or Javadoc.

---

## 9. Small practice task

Create **`class Rectangle`** with `int width` and `int height`. Provide:

1. A constructor that takes `width` and `height` and rejects non-positive values.
2. A no-arg constructor that builds a **1×1** rectangle via `this(...)`.

In `main`, print dimensions for default and for `(4, 9)`.

---

## Beginner tip

If the IDE does not generate a constructor stub when you ask, check you did not type **`void`** by muscle memory.
