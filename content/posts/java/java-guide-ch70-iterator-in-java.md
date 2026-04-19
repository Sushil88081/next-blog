---
title: "Chapter 70: Iterator in Java — Walk Collections, remove Safely, and Fail-Fast Behavior"
description: "Learn the Java Iterator interface: hasNext next remove, enhanced for-loop wiring, ConcurrentModificationException and modCount, and ListIterator peek for lists."
category: "Java"
tags:
  - Java Iterator
  - Java iterator remove
  - Java fail fast iterator
  - Java enhanced for loop iterator
  - Java ListIterator
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 70
---

# Chapter 70: Iterator in Java

**`for-each`** loops over **`Iterable`** types compile down to **`iterator()`** calls under the hood. Understanding **`Iterator`** explains **why** you sometimes see **`ConcurrentModificationException`** and **how** to **remove during traversal** without hand-index bugs.

**`Comparable` / `Comparator`** sort theory is Chapter 71.

---

## 1. Topic title

**Iterator: step through a collection with permission to delete the current item**

---

## 2. What it means

**`Iterator<E>`** exposes **`boolean hasNext()`**, **`E next()`**, and optional **`void remove()`** (removes the **last returned** element). **`Collection.iterator()`** hands you a fresh iterator object; each **`next()`** advances a **cursor**.

**`ListIterator`** extends the idea for **`List`** with **`previous()`**, **`add`**, **`set`**, and index hints—useful for **editing** while walking both directions.

---

## 3. Why it is used

**Safe removal** while scanning—**`list.remove(i)`** inside a classic **`for (int i=0; …)`** loop is easy to **off-by-one**; **`Iterator.remove()`** tracks structure for you on **`ArrayList`**.

**Library interoperability**—many APIs accept **`Iterable`** because **streaming** starts from **iteration**.

---

## 4. Mental picture

The iterator is a **bookmark**: **`next()`** flips the page you read; **`remove()`** tears **that** page out before you move on again.

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class IteratorDemo {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>(List.of(3, 7, 8, 9));
        Iterator<Integer> it = nums.iterator();
        while (it.hasNext()) {
            int n = it.next();
            if (n % 2 == 0) {
                it.remove();
            }
        }
        System.out.println(nums);

        for (String s : List.of("a", "b", "c")) {
            System.out.println(s);
        }
    }
}
```

After the loop, **`nums`** drops **8**—even numbers removed **without** index math.

---

## 6. Explanation of code

**Enhanced `for`** on **`List.of(...)`** uses an iterator internally but **does not expose** **`remove`**—you cannot delete safely that way; use an **explicit iterator** or **`removeIf`**.

---

## 7. Common mistakes

**Calling `remove()` before `next()`**—**`IllegalStateException`**.

**Modifying the collection through other means** while an iterator is open on **`ArrayList`**—**fail-fast** checks throw **`ConcurrentModificationException`** (best-effort, not a concurrency guarantee).

**Confusing iterator order with `PriorityQueue` priority order** (Chapter 69)—**`iterator`** on **`PriorityQueue`** does **not** drain by **poll** priority.

---

## 8. Best practices

Prefer **`removeIf`** when you only need a **predicate filter**—less code than manual iterators.

When you need **index** while looping lists, use **`ListIterator`** or a **`for (int i = 0; …)`** with care—pick the least surprising style for teammates.

---

## 9. Small practice task

Build **`List<String>`** with mixed blank strings. Remove **blanks** with an **iterator** (not **`removeIf`** this time). Print the cleaned list.

---

## Beginner tip

If the debugger shows **“modCount”** in a stack trace, you changed a **structurally backed collection** while something else was **iterating**—clone first, or collect **deletions** in a second list, then apply.
