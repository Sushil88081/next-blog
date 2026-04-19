---
title: "Chapter 43: Abstract Class in Java — abstract Methods, Partial Templates, and Construction"
description: "Learn Java abstract classes: abstract and concrete methods, cannot instantiate, constructors for subclasses, when to choose abstract class vs interface, and template method style."
category: "Java"
tags:
  - Java abstract class
  - Java abstract method
  - Java cannot instantiate abstract
  - Java template method pattern
  - Java OOP abstract
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 43
---

# Chapter 43: Abstract Class in Java

This chapter is **only** about **`abstract` classes**: types you **cannot instantiate** directly, which may mix **abstract** methods (no body) and **concrete** helpers. **Abstraction as a concept** was Chapter 42; **interfaces** are Chapter 44.

---

## 1. Topic title

**Abstract class: `abstract` on class and/or methods—subclasses finish the story**

---

## 2. What it means

```java
abstract class Report {
    private final String title;

    protected Report(String title) {
        this.title = title;
    }

    public final String render() {
        return header() + body() + footer();
    }

    private String header() {
        return "# " + title + "\n";
    }

    protected abstract String body();

    private String footer() {
        return "\n— end —\n";
    }
}
```

**`render` is `final`** so the **template** does not drift; subclasses supply **`body()`** only.

---

## 3. Why it is used

**Shared state + shared code** — fields and non-abstract methods live in one place; children fill gaps.

**Force overrides** — `abstract` methods **must** be implemented by **concrete** subclasses (unless the child is also abstract).

---

## 4. Real-world example

**Game AI:** `abstract class Bot` holds energy and logging; each **`AggressiveBot`**, **`DefensiveBot`** implements **`chooseMove()`**.

---

## 5. Java code example

```java
abstract class DataSource {
    protected final String name;

    protected DataSource(String name) {
        this.name = name;
    }

    public final String label() {
        return "[" + name + "]";
    }

    public abstract String fetchRow();
}

class FakeSource extends DataSource {
    private int n;

    FakeSource() {
        super("fake");
    }

    @Override
    public String fetchRow() {
        return "row-" + (n++);
    }
}

public class AbstractClassDemo {
    public static void main(String[] args) {
        DataSource src = new FakeSource();
        System.out.println(src.label() + " " + src.fetchRow());
    }
}
```

You **cannot** write **`new DataSource("x")`** — the compiler blocks instantiating **`abstract`** classes.

---

## 6. Explanation of code

**Constructor on abstract class** runs when **`new FakeSource()`** chains to **`super("fake")`**. Abstract classes **often** have constructors even though you never `new` the abstract type itself.

---

## 7. Common mistakes

**Forgetting to implement all abstract methods** in a concrete class—compile error lists what is missing.

**Marking everything abstract** when an **`interface`** (Chapter 44) or a **simple class** would read cleaner.

---

## 8. Best practices

**Use abstract classes for “is-a” shared skeletons** with real code and fields.

**Prefer smaller abstract bases**—deep inheritance trees get hard to reason about; composition helps (later design topics).

---

## 9. Small practice task

Create **`abstract class Serializer`** with **`final String toWire(Object o)`** that calls abstract **`String encode(Object o)`** and wraps with a prefix `"V1:"`. Implement **`JsonishSerializer`** with a toy `encode` that returns **`String.valueOf(o)`**.

---

## Beginner tip

**Abstract class = incomplete blueprint.** You finish the blueprint in **`extends`**. If the blueprint is *only* behavior names with no shared fields, an **interface** is often the first tool to try—next chapter.
