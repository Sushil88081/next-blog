---
title: "Chapter 69: PriorityQueue in Java — Heap Order, Comparable Keys, and Not-So-FIFO Iteration"
description: "Learn PriorityQueue in Java: internal binary heap, natural ordering vs Comparator, O(log n) offer and poll, why iterator order differs from poll order, and sensible use cases."
category: "Java"
tags:
  - Java PriorityQueue
  - Java heap queue
  - Java Comparator PriorityQueue
  - Java task scheduling queue
  - Java collections priority
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 69
---

# Chapter 69: PriorityQueue in Java

**`Queue`** (Chapter 68) usually means **FIFO**. **`PriorityQueue`** is still a **`Queue`**, but **`poll`** always removes the **smallest** element according to **`Comparable`** or your **`Comparator`**—not necessarily the **oldest** arrival.

**`Iterator`** (Chapter 70) walks the **internal array** in an order that **does not** match **`poll`** order—do not confuse the two.

---

## 1. Topic title

**PriorityQueue: a bag where the “smallest” always leaves first**

---

## 2. What it means

Internally a **binary heap** stored in an array supports **`offer`** and **`poll`** in **O(log n)** time. **`peek`** reads the root without removing.

**Ties:** when **`compare`** says two items are **equal**, which one **`poll`** returns first is **not** a strong promise—do not build fairness guarantees on ties alone.

---

## 3. Why it is used

**Task schedulers** (“run the soonest deadline”), **Dijkstra’s algorithm** queues, **top-K streaming** patterns—anywhere **best candidate** matters more than **arrival stamp**.

---

## 4. Contrast in one sentence

**`ArrayDeque`** answers **“who waited longest?”** **`PriorityQueue`** answers **“who has the smallest score / soonest time?”**

---

## 5. Java code example

```java
import java.util.Comparator;
import java.util.PriorityQueue;

public class PriorityQueueDemo {
    public static void main(String[] args) {
        PriorityQueue<Integer> smallFirst = new PriorityQueue<>();
        smallFirst.offer(30);
        smallFirst.offer(10);
        smallFirst.offer(20);
        while (!smallFirst.isEmpty()) {
            System.out.println(smallFirst.poll());
        }

        PriorityQueue<String> longFirst =
                new PriorityQueue<>(Comparator.comparingInt(String::length).reversed());
        longFirst.offer("go");
        longFirst.offer("java");
        longFirst.offer("hi");
        System.out.println("longest first poll=" + longFirst.poll());
    }
}
```

First block prints **10, 20, 30**. Second picks **`"java"`** first by **length** rule.

---

## 6. Explanation of code

**`Comparator.comparingInt(...).reversed()`** flips the **priority** so **long strings** win. Without **`reversed`**, **shortest** string would **`poll`** first.

---

## 7. Common mistakes

**Expecting FIFO**—arrival order is **not** preserved in **`poll`** results.

**Using `iterator()` to “peek all in priority order”**—wrong API; **`poll`** repeatedly on a **copy** if you must drain sorted.

**Unbounded growth**—**`offer`** forever without **`poll`** fills memory.

---

## 8. Best practices

When **`poll`** order must be **stable for ties**, include a **tie-breaker** in the comparator (**sequence number**, **insertion id**).

For **thread-safe** priority work, concurrent queues live in later chapters—**`PriorityQueue`** is **not** synchronized.

---

## 9. Small practice task

Store a small **`static class Task { final int id, dueMinute; … }`** in **`PriorityQueue<Task>`** with **`Comparator.comparingInt(t -> t.dueMinute)`**. **`offer`** tasks out of order, then **`poll`** until empty and print **ids** in **due-minute** order.

---

## Beginner tip

Think **“heap,” not “line at the bank”**—the mental picture of **people standing in arrival order** will mislead you here.
