---
title: "Chapter 44: Interface in Java — implements, Multiple Types, default and static Methods"
description: "Learn Java interfaces: implements, implicit public abstract methods, constants, default and static interface methods, functional interfaces preview, and common pitfalls."
category: "Java"
tags:
  - Java interface
  - Java implements
  - Java default method interface
  - Java static interface method
  - Java functional interface
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 44
---

# Chapter 44: Interface in Java

This chapter is **only** about **`interface` types**: a **contract** of **abstract instance methods** a class **`implements`**. Java allows **`default`** and **`static`** methods on interfaces since Java 8—useful for evolution without breaking implementors.

---

## 1. Topic title

**Interface: a named bundle of capabilities—`implements`, often several at once**

---

## 2. What it means

```java
interface Readable {
    String readLine();
}

class Buffer implements Readable {
    private int i;
    private final String[] lines = {"a", "b"};

    @Override
    public String readLine() {
        return i < lines.length ? lines[i++] : null;
    }
}
```

**Methods without modifiers** in interfaces are **`public abstract`** by default. Fields, if you declare them, are **`public static final`**—prefer enums or classes for non-trivial constants.

---

## 3. Why it is used

**Multiple interface implementation** — a class can **`implements A, B`**; Java has **single inheritance of classes** only.

**Stable contracts** for libraries and tests—swap implementations behind the same type.

---

## 4. Real-world example

**`java.util.List`** is an interface; **`ArrayList`**, **`LinkedList`** are implementations—callers depend on **`List`**, not a concrete list class, when flexibility matters.

---

## 5. Java code example

```java
interface Priced {
    double price();
}

interface Taxable extends Priced {
    default double withVat(double rate) {
        return price() * (1 + rate);
    }

    static double combine(Priced a, Priced b) {
        return a.price() + b.price();
    }
}

record Book(String title, double price) implements Taxable {}

public class InterfaceDemo {
    public static void main(String[] args) {
        Taxable t = new Book("Java", 40);
        System.out.println(t.withVat(0.1));
        System.out.println(Taxable.combine(new Book("A", 10), new Book("B", 20)));
    }
}
```

**`default withVat`** adds behavior **on the interface** with a **body**; implementors inherit it unless they override. **`static combine`** is a **namespace helper**, not inherited as an instance method.

---

## 6. Explanation of code

**`record Book`** is concise syntax for immutable data carriers (Java 16+). It **`implements Taxable`** and supplies **`price()`**, satisfying the **`Priced`**/`Taxable` contract.

---

## 7. Common mistakes

**Treating interfaces as storage for lots of static helpers**—that drifts into a utility smell; prefer focused types.

**Diamond/default conflicts** — if two interfaces provide **defaults** with the same signature, the class must **override** and disambiguate (advanced edge case).

---

## 8. Best practices

**Keep interfaces cohesive**—`SerializableAndComparableAndRunnable` is a smell; split when roles differ.

**Document nullability and exceptions** on interface methods—implementations should honor the same expectations.

---

## 9. Small practice task

Define **`interface Cache<K,V>`** with **`V get(K key)`** and **`void put(K key, V value)`**. Implement **`HashMapCache`** backed by **`java.util.HashMap`**. Add a **`default void putIfAbsent`** that only `put`s when `get` returns `null`.

---

## Beginner tip

Think **`extends` one parent class**, **`implements` many interfaces**. Chapter 45 compares **abstract class vs interface** when both seem possible—read that next for decision rules.
