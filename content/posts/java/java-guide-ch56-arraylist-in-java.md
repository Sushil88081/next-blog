---
title: "Chapter 56: ArrayList in Java — Resizable Array Backing, Fast get, Careful remove"
description: "Learn ArrayList in Java: backing array growth, amortized cost mental model, iterator remove vs foreach, capacity hints, and common Integer-removal pitfalls."
category: "Java"
tags:
  - Java ArrayList
  - Java resizable array list
  - Java ArrayList remove
  - Java list capacity
  - Java collections ArrayList
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 56
---

# Chapter 56: ArrayList in Java

**`ArrayList`** is the **default workhorse** **`List`** implementation: a **resizable array** behind the scenes. Chapter 55 explained the **`List`** contract; here you see the **class** most tutorials reach for first—and learn where it **shines** and where it **stumbles**.

**`LinkedList`** is Chapter 57; a straight **comparison** is Chapter 58.

---

## 1. Topic title

**ArrayList: array speed for `get`, copy cost when the middle shifts**

---

## 2. What it means

Internally, **`ArrayList`** keeps an **array buffer**. When it fills, a **larger** array is allocated and elements are **copied** across. Appending at the **end** is usually **cheap** amortized. Inserting or removing **near the front** must **slide** many elements—cost grows with **size**.

**`new ArrayList<>(expectedSize)`** avoids repeated growth if you already know **roughly** how many elements you will store.

---

## 3. Why it is used

**Simple mental model**, great **cache locality** for scans, excellent **`get(index)`** speed. For many small-to-medium programs, **`ArrayList`** is the **right first pick**.

---

## 4. Picture

Think of **`ArrayList`** as a **long bench**. Sitting at the **end** is easy. Inserting someone in the **middle** means **everyone slides**—fine for ten people, tedious for ten thousand.

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ArrayListDemo {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>(3);
        scores.add(72);
        scores.add(81);
        scores.add(69);
        System.out.println(scores.get(1));

        Iterator<Integer> it = scores.iterator();
        while (it.hasNext()) {
            if (it.next() < 70) {
                it.remove();
            }
        }
        System.out.println("after trim: " + scores);
    }
}
```

**`Iterator.remove()`** is the safe pattern for **dropping items while walking**; **`for-each`** plus **`scores.remove(...)`** throws **`ConcurrentModificationException`** in this situation.

---

## 6. Explanation of code

**`ArrayList<>(3)`** is only a **capacity hint**—size still starts at **0** until you **`add`**. The iterator walks **in order** and removes low scores **without** manual index math.

---

## 7. Common mistakes

**`list.remove(1)` on `List<Integer>`** removes **index 1**, not the **value** **`Integer.valueOf(1)`**. To remove by **value**, use **`remove(Integer.valueOf(1))`** or **`removeIf(n -> n == 1)`**.

**Huge default capacity** on thousands of short-lived lists—memory adds up.

---

## 8. Best practices

Prefer **`isEmpty()`** over **`size() == 0`** for readability.

If you expose a **`List`** from a getter, decide whether callers may **mutate** your internal list—often **`Collections.unmodifiableList`** (later topic) protects invariants.

---

## 9. Small practice task

Create **`ArrayList<String>`**, add five words, then remove **only words shorter than four letters** using **`removeIf`**. Print before and after.

---

## Beginner tip

When the compiler complains about **“reference to remove is ambiguous”** with integers, you met the **`int` vs `Integer`** overload puzzle—name the intent explicitly with **`Integer.valueOf(...)`** or use **`removeIf`**.
