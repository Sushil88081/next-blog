---
title: "Chapter 57: LinkedList in Java — Nodes, Deques, and When Links Beat Arrays"
description: "Learn Java LinkedList as a doubly linked list: fast head-tail add and remove, List and Deque APIs, why middle access is slower than ArrayList, and sane use cases."
category: "Java"
tags:
  - Java LinkedList
  - Java doubly linked list
  - Java Deque LinkedList
  - Java LinkedList vs ArrayList
  - Java collections LinkedList
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 57
---

# Chapter 57: LinkedList in Java

**`LinkedList`** is another **`List`**, backed by **nodes** pointing **forward and backward** instead of one contiguous array. Chapter 58 compares performance stories; here, learn **what extra buttons** **`LinkedList`** gives you.

---

## 1. Topic title

**LinkedList: cheap inserts at ends, costly hops to `get(i)`**

---

## 2. What it means

Each element lives in a **node** with **`next`** and **`prev`** links. Adding at the **front** or **back** adjusts a few pointers—**no mass slide** like **`ArrayList`** middle inserts.

**Downside:** **`get(5000)`** may walk **five thousand links** from an end. **`ArrayList`** jumps with math to the slot.

**`LinkedList`** also implements **`Deque`**—**`addFirst`**, **`removeLast`**, **`peek`** style operations—so it doubles as a **queue** or **stack** when you want **linked** semantics.

---

## 3. Why it is used

**Work-stealing style queues**, **undo stacks** with frequent **front** operations, or educational clarity about **links**. For random index-heavy loops, **`ArrayList`** is usually calmer.

---

## 4. Mental sketch

**`ArrayList`** is a **street with house numbers**. **`LinkedList`** is a **treasure hunt** where each clue points to the next clue—fun at small scale, tiring if you always jump to clue **#9000**.

---

## 5. Java code example

```java
import java.util.LinkedList;
import java.util.List;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> line = new LinkedList<>();
        line.addLast("Ada");
        line.addLast("Bob");
        line.addFirst("Zara");
        System.out.println(line.removeLast());
        System.out.println(line);

        List<String> asList = line;
        asList.add("Chen");
        System.out.println(asList.get(1));
    }
}
```

**`LinkedList`** typed as **`List`** still supports **`add`/`get`**, but you lose **`addFirst`** in the static type unless you cast back—often keep **`Deque<String> queue = new LinkedList<>();`** when you mostly use ends.

---

## 6. Explanation of code

**`addFirst` / `addLast` / `removeLast`** show **deque** ergonomics. **`asList.add`** appends at the tail because **`List.add`** defaults to **end** when no index is given.

---

## 7. Common mistakes

**Using `get(i)` inside a tight loop** over a giant **`LinkedList`**—each **`get`** may walk from an end; use an **iterator** or **enhanced for** instead.

**Choosing `LinkedList` “because lists link”** without a **measured** reason—**`ArrayList`** wins many benchmarks on modern hardware.

---

## 8. Best practices

If both ends matter, **declare `Deque<T>`** with **`LinkedList`** implementation for **clear intent**.

Profile or think about **access patterns** before switching implementations—micro-optimizations without data are guesses.

---

## 9. Small practice task

Simulate a **palindrome check** with **`LinkedList<Character>`**: push half the characters from a string, then compare popping from both ends. Use **`removeFirst`** and **`removeLast`** only.

---

## Beginner tip

**`LinkedList`** is still a **`List`**—**duplicates allowed**, **order preserved**. The difference is **internal plumbing**, not the **English** meaning of the word “list.”
