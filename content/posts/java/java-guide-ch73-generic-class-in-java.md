---
title: "Chapter 73: Generic Class in Java — Type Parameters on Your Own Box and Factory Helpers"
description: "Define generic classes in Java with type parameters T, multiple parameters K V, static caveats, instance coherence, and simple Pair or Holder patterns without frameworks."
category: "Java"
tags:
  - Java generic class
  - Java type parameter T
  - Java generic constructor
  - Java multiple type parameters
  - Java generics class tutorial
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 73
---

# Chapter 73: Generic Class in Java

A **generic class** declares **one or more type parameters** next to its name: **`class Cup<T>`**. Every **non-static** field or method can then mention **`T`** as a **real** type inside that class for each **instantiation**—**`Cup<String>`** vs **`Cup<Integer>`** are two **different** shapes carved from the same template.

**What generics are** was Chapter 72; **generic methods** refine Chapter 74.

---

## 1. Topic title

**Generic class: bake the “kind of value” into the type name itself**

---

## 2. What it means

```java
class Slot<T> {
    private T value;

    void put(T value) {
        this.value = value;
    }

    T take() {
        T out = value;
        value = null;
        return out;
    }
}
```

**`Slot<String>`** only accepts **`String`** in **`put`**; **`Slot<Integer>`** only **`Integer`**. The **compiler** enforces that—no **`Object`** casts at call sites.

**Static members** cannot refer to **`T`** from the outer class’s parameter list—there is no single **`T`** yet. Use **static generic methods** (next chapter) instead.

---

## 3. Why it is used

**Reusable containers**, **result types**, **wrappers** around persistence rows—anywhere the **same logic** applies but the **payload type** changes.

---

## 4. Mental picture

A **vending column** template knows **“snack shape”** but not which snack until you **label the column**—**`Slot<Gum>`** vs **`Slot<Chips>`**.

---

## 5. Java code example

```java
class Pair<A, B> {
    private A first;
    private B second;

    Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }

    A first() {
        return first;
    }

    B second() {
        return second;
    }
}

public class GenericClassDemo {
    public static void main(String[] args) {
        Pair<String, Integer> nameAndAge = new Pair<>("Ada", 12);
        System.out.println(nameAndAge.first() + " " + nameAndAge.second());
    }
}
```

**Two parameters** read like **`Pair<A,B>`**—order matters: **`first`** is **`A`**, **`second`** is **`B`**.

---

## 6. Explanation of code

**Diamond** inference: **`new Pair<>("Ada", 12)`** picks **`A=String`**, **`B=Integer`** from the **left-hand side** type.

---

## 7. Common mistakes

**Recursive generics** (`class Node<T extends Node<T>>`) too early—powerful but head-spinning; skip until patterns demand it.

**Exposing `T[]` arrays**—array creation with generics has sharp corners; prefer **`List<T>`** internally for learning code.

---

## 8. Best practices

Name type parameters **meaningfully** in public APIs (`Key`, `Value`) when **`K`/`V`** feel cryptic to your team—**`T`** alone is fine for tiny teaching types.

Keep **generic classes focused**—if a class needs **five** unrelated parameters, split responsibilities.

---

## 9. Small practice task

Write **`class LastOne<T>`** with **`void push(T item)`** and **`Optional<T> pop()`** behavior using a **single field** (last wins). Use **`java.util.Optional`** or allow **`null`** with a **boolean empty** flag—pick one style and document it in a one-line comment.

---

## Beginner tip

**`Slot` vs `Slot<String>`** relationship is the same mental step as **`List` vs `List<String>`**—you already practiced it with library types; now you author the template.
