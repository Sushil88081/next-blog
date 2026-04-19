---
title: "Chapter 61: LinkedHashSet in Java — Uniqueness Plus Predictable Iteration Order"
description: "Learn LinkedHashSet in Java: insertion-ordered linked buckets on top of hash tables, when to pick it over HashSet, memory tradeoff, and LRU-style hints without building a full cache yet."
category: "Java"
tags:
  - Java LinkedHashSet
  - Java insertion order set
  - Java LinkedHashSet vs HashSet
  - Java ordered unique collection
  - Java collections LinkedHashSet
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 61
---

# Chapter 61: LinkedHashSet in Java

**`HashSet`** (Chapter 60) is **fast** and **unordered**. **`LinkedHashSet`** keeps **hash-table speed** for **`contains`** while also remembering **the order elements first appeared**.

**`TreeSet`** (Chapter 62) sorts by **value rules**, not arrival time—different tradeoff.

---

## 1. Topic title

**LinkedHashSet: HashSet’s cousin that remembers who arrived when**

---

## 2. What it means

Each entry still lives in a **hash bucket**, but a **doubly linked list** threads the elements in **insertion order**. When you **`for-each`**, you walk that list—**stable** and **repeatable** for the same sequence of adds.

**Cost:** a bit more **memory** and pointer work than plain **`HashSet`**. Usually still fine for thousands of items on a laptop.

---

## 3. Why it is used

**UI tag chips** left-to-right as the user typed, **pipeline stages** listed in discovery order, **test expectations** that need deterministic iteration without sorting.

---

## 4. Mental sketch

**`HashSet`** is **confetti** on the floor—everything is there, hard to sweep in the same pattern twice. **`LinkedHashSet`** is **confetti threaded on one string**—still unique pieces, now you can march along the string reliably.

---

## 5. Java code example

```java
import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetDemo {
    public static void main(String[] args) {
        Set<String> steps = new LinkedHashSet<>();
        steps.add("open");
        steps.add("read");
        steps.add("save");
        steps.add("open");
        for (String s : steps) {
            System.out.println(s);
        }
    }
}
```

Prints **`open`**, then **`read`**, then **`save`**—second **`open`** ignored, order preserved.

---

## 6. Explanation of code

**`LinkedHashSet`** implements **`Set`**, so all **`add`/`contains`/`remove`** contracts match **`HashSet`**. Only **iteration semantics** differ in a way humans notice.

---

## 7. Common mistakes

**Assuming LinkedHashSet sorts alphabetically**—it does **not**; it preserves **insertion**. Sorting needs **`TreeSet`** or **`list.sort`**.

**Expecting LRU (least-recently-used) eviction automatically**—plain **`LinkedHashSet`** does **not** throw away old entries; specialized access-order subclasses or **`LinkedHashMap`** patterns handle LRU later.

---

## 8. Best practices

When tests assert on **set iteration order**, **`LinkedHashSet`** (or **`List`**) is clearer than **`HashSet`**.

If you only need uniqueness and never iterate, **`HashSet`** stays the simpler default.

---

## 9. Small practice task

Build **`LinkedHashSet<Integer>`** by adding **`3,1,4,1,5`** in that order. Print elements joined with **`" -> "`** and confirm **no duplicate 1** and **order is not sorted**.

---

## Beginner tip

If a teammate says **“I need a set but stable foreach”**, **`LinkedHashSet`** is often the **one-line** fix—no comparator homework yet.
