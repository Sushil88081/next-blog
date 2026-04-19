---
title: "Chapter 68: Queue in Java — FIFO Lines, Deque Ends, and ArrayDeque as Default"
description: "Learn the Java Queue and Deque interfaces: offer poll peek, FIFO vs stack, ArrayDeque vs LinkedList, BlockingQueue preview, and clear habits for bounded work lists."
category: "Java"
tags:
  - Java Queue interface
  - Java Deque ArrayDeque
  - Java FIFO queue
  - Java offer poll peek
  - Java LinkedList queue
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 68
---

# Chapter 68: Queue in Java

A **`Queue`** is a **`Collection`** shaped for **hand-offs**: things join at the **tail** and leave from the **head** (**FIFO**) unless you pick a **LIFO stack** view. Java splits the idea across **`Queue`**, **`Deque`** (double-ended), and later **blocking** variants for threads.

**`PriorityQueue`** (Chapter 69) is **not** a strict FIFO—order comes from **priority**. **`Iterator`** details land in Chapter 70.

---

## 1. Topic title

**Queue: polite lines—`offer` joins, `poll` serves, `peek` looks without removing**

---

## 2. What it means

Common **`Queue`** methods: **`add`** / **`offer`** (enqueue, **`offer` fails softly** when bounded), **`remove`** / **`poll`** (dequeue, **`poll` returns null** when empty), **`element`** / **`peek`** (front without remove).

**`Deque`** adds **`push`/`pop`** stack names plus **`addFirst`/`removeLast`**—**`ArrayDeque`** implements **`Deque`** with a **growable ring buffer**, usually **faster** than **`LinkedList`** for both ends when you do not need **`List`** index access.

---

## 3. Why it is used

**Work queues**, **breadth-first search layers**, **UI event pipes**, **rate smoothing**—anywhere **order of arrival** matters more than **random access**.

---

## 4. Mental hook

Picture a **cafeteria tray rail**: new trays **`offer`** at the back, hungry **`poll`** from the front. **`peek`** is **looking** at the next tray without stealing it.

---

## 5. Java code example

```java
import java.util.ArrayDeque;
import java.util.Queue;

public class QueueDemo {
    public static void main(String[] args) {
        Queue<String> line = new ArrayDeque<>();
        line.offer("Ada");
        line.offer("Bob");
        line.offer("Chen");

        while (!line.isEmpty()) {
            System.out.println(line.poll());
        }

        System.out.println("empty peek=" + line.peek());
    }
}
```

Prints **Ada, Bob, Chen**—classic **FIFO**. **`peek`** on empty returns **`null`** here; **`element`** would **throw** instead.

---

## 6. Explanation of code

**`ArrayDeque`** as **`Queue<String>`** keeps the field type **flexible**—you could swap implementations later for specialized **blocking** queues when you study concurrency.

---

## 7. Common mistakes

**Iterating a queue expecting FIFO order**—**`iterator()`** is **not** guaranteed to follow **`poll`** order on all implementations; **`poll` in a loop** is the reliable story.

**Using `LinkedList` as default queue** out of habit—**measure**; **`ArrayDeque`** is often the better default.

**Calling `remove()` on empty queue**—throws **`NoSuchElementException`**; prefer **`poll`**.

---

## 8. Best practices

Prefer **`isEmpty()`** over **`size() == 0`** for readability.

When teaching APIs, pair **`offer`/`poll`/`peek`**—they form a **consistent failure style** with **`null`** instead of exceptions on emptiness.

---

## 9. Small practice task

Simulate a **ticket counter**: **`offer`** five names, **`poll`** two, **`peek`** the next without removing, then **drain** the rest with **`poll`**. Print each step.

---

## Beginner tip

**`Stack` class** exists but is considered **legacy**—modern code leans on **`Deque`** (**`ArrayDeque`**) for stack operations (**`push`/`pop`/`peek`**).
