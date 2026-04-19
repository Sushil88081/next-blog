---
title: "Chapter 55: List Interface in Java — Ordered Sequences, Indexes, and What Every List Promises"
description: "Learn the Java List interface: positional get and set, add, remove, size, subList view, iterating with for-each, and why you declare List but often instantiate ArrayList or LinkedList."
category: "Java"
tags:
  - Java List interface
  - Java List vs ArrayList
  - Java ordered collection
  - Java list get add remove
  - Java collections List
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 55
---

# Chapter 55: List Interface in Java

Chapter 54 placed **`List`**, **`Set`**, and **`Map`** on the mental map. This chapter zooms into **`List`**: an **ordered** sequence where you care about **position**—first item, last item, item at index **`i`**.

**`ArrayList`** is Chapter 56; **`LinkedList`** Chapter 57.

---

## 1. Topic title

**List: integer positions, duplicates allowed, contract shared by several classes**

---

## 2. What it means

**`java.util.List<E>`** is an **`interface`**. It promises operations such as **`add(E)`**, **`get(int index)`**, **`set(int index, E)`**, **`remove(int index)`**, **`size()`**, **`isEmpty()`**, and **`contains(Object)`**. **Order is part of the meaning**: two lists with the same elements in **different** order are **not** equal under **`equals`** (for standard implementations).

You usually **declare** **`List<String> notes`** and **construct** **`new ArrayList<>()`** or **`new LinkedList<>()`** on the right. The **left-hand type** stays **`List`** so calling code does not depend on growth internals.

---

## 3. Why it is used

**Random access questions**—“what is item **7**?”—are natural on a **`List`**. **`Set`** (later) forgets positions on purpose. **`Map`** (later) keys by arbitrary values, not dense indexes.

---

## 4. Small analogy

A **`List`** is a **numbered ticket roll**: position **0** is the front of the line, new tickets can attach at the end, and you may **insert** a VIP ticket in the middle (shifting numbers for everyone after).

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.List;

public class ListInterfaceDemo {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("salt");
        items.add("pepper");
        items.add(1, "paprika");
        System.out.println(items.get(0) + ", size=" + items.size());

        items.set(2, "chili");
        items.remove(0);
        System.out.println(items);

        for (String s : items) {
            System.out.println("-> " + s);
        }
    }
}
```

**`add(1, "paprika")`** **inserts** at index **1** and pushes old index **1** forward.

---

## 6. Explanation of code

The variable **`items`** is typed as **`List<String>`** even though the object is **`ArrayList`**. Every method used here exists on **`List`**, so you could swap the concrete class later without changing **`main`**.

---

## 7. Common mistakes

**Confusing `remove(int)` with `remove(Object)`**—overload resolution surprises beginners when the list holds **`Integer`** boxes (Chapter 56 touches this family of bugs).

**Assuming `subList` is a full copy**—it is typically a **view** backed by the original list; structural changes through the sublist affect the parent.

---

## 8. Best practices

Prefer **`List.of(...)`** for tiny **immutable** demos when you do not need mutability (Java 9+).

When a method only **reads**, accept **`List<T>`** (or **`Collection<T>`**) instead of **`ArrayList<T>`** in the parameter type.

---

## 9. Small practice task

Build a **`List<Integer>`** of three exam scores, **replace** the lowest score with **`100`** using **`set`**, then print the **sum** using a **`for-each`** loop (no streams required).

---

## Beginner tip

Say **“list of strings”** out loud, then type **`List<String>`**. The **generic** mirrors English left-to-right once you trust the angle brackets.
