---
title: "Chapter 58: ArrayList vs LinkedList in Java — Picking the List That Matches Your Access Pattern"
description: "Compare ArrayList and LinkedList in Java: get and add complexity stories, memory layout, iterator wins, and practical rules of thumb without treating Big-O as religion."
category: "Java"
tags:
  - Java ArrayList vs LinkedList
  - Java when to use LinkedList
  - Java list performance
  - Java collections choose list
  - Java ArrayList LinkedList
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 58
---

# Chapter 58: ArrayList vs LinkedList in Java

You can store **`"Mon"`**, **`"Tue"`**, **`"Wed"`** in **either** class—they both honor **`List`**. The difference is **how** they pay for **operations** as the list grows.

Chapters **55–57** introduced **`List`**, **`ArrayList`**, and **`LinkedList`**. **`Set`** is Chapter 59.

---

## 1. Topic title

**ArrayList vs LinkedList: pay at random access vs pay at middle inserts**

---

## 2. What it means

**`ArrayList`** keeps **one array**. **`get(k)`** is **fast**—direct index math. **`add(0, x)`** on a long list is **expensive** because elements shift.

**`LinkedList`** keeps **nodes**. **Insert at an iterator position** can be **cheap** if you already walked there. **`get(k)`** on a long list can be **expensive** because the implementation may **walk** from a nearest end.

---

## 3. Why the choice matters

Pick wrong, and a simple loop becomes **seconds** instead of **milliseconds** on large data—especially nested loops that call **`get`** repeatedly on a **`LinkedList`**.

---

## 4. Rule-of-thumb card

| Pattern | Friendly default |
| --- | --- |
| Mostly append + random index reads | **`ArrayList`** |
| Heavy middle inserts with iterator already there | consider **`LinkedList`** |
| Queue/stack at both ends | **`ArrayDeque`** often beats **`LinkedList`** for speed (later topic); still, **`LinkedList`** reads clearly in lessons |

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ArrayVsLinkedDemo {
    static long sumByIndex(List<Integer> nums) {
        long acc = 0;
        for (int i = 0; i < nums.size(); i++) {
            acc += nums.get(i);
        }
        return acc;
    }

    public static void main(String[] args) {
        List<Integer> a = new ArrayList<>();
        List<Integer> b = new LinkedList<>();
        for (int i = 0; i < 5000; i++) {
            a.add(i);
            b.add(i);
        }
        long t0 = System.nanoTime();
        sumByIndex(a);
        long t1 = System.nanoTime();
        sumByIndex(b);
        long t2 = System.nanoTime();
        System.out.println("array ms=" + (t1 - t0) / 1_000_000);
        System.out.println("linked ms=" + (t2 - t1) / 1_000_000);
    }
}
```

Numbers vary by machine—often **`ArrayList`** wins this **`get` loop** by a wide margin. **Do not worship one run**; change sizes and repeat.

---

## 6. Explanation of code

Both lists hold the **same integers**. The **only** difference is **implementation**, yet **`sumByIndex`** behaves differently in time because **`get`** cost differs.

---

## 7. Common mistakes

**Micro-benchmarking on tiny lists**—noise dominates; use **meaningful sizes** or trust **documented patterns** until you profile real workloads.

**Casting everything to `LinkedList`** because an old blog said so—**measure** or default to **`ArrayList`**.

---

## 8. Best practices

Prefer **enhanced for** (`for (int n : nums)`) when you **do not need the index**—works well for **both** implementations.

When in doubt, **`ArrayList`**—switch when **profiling** or a **clear deque** API need appears.

---

## 9. Small practice task

Rewrite **`sumByIndex`** as **`sumForEach`** using an **enhanced for-loop**. Time it on **`LinkedList`** with **50_000** elements and compare to the indexed version—observe the gap shrinking or vanishing.

---

## Beginner tip

**Big-O** is a **language for trends**, not a **timer reading**. Your laptop’s cache and JVM tricks mean **constants** still matter—patterns plus occasional timing beat memorized slogans.
