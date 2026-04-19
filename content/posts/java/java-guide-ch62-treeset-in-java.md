---
title: "Chapter 62: TreeSet in Java — Sorted Unique Elements and NavigableSet Extras"
description: "Learn TreeSet in Java: red-black tree idea, natural ordering with Comparable, custom Comparator, higher/lower navigation, and costs compared to HashSet and LinkedHashSet."
category: "Java"
tags:
  - Java TreeSet
  - Java sorted set
  - Java NavigableSet
  - Java Comparator TreeSet
  - Java TreeSet vs HashSet
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 62
---

# Chapter 62: TreeSet in Java

**`HashSet`** answers **“is it there?”** quickly without order. **`LinkedHashSet`** remembers **arrival order**. **`TreeSet`** keeps elements in **sorted order** according to **`Comparable`** on the element type—or a **`Comparator`** you pass at construction time.

Still a **`Set`**: **duplicates** (by the tree’s **compareTo / compare** rule) are rejected.

---

## 1. Topic title

**TreeSet: a sorted unique bag with neighbor navigation APIs**

---

## 2. What it means

Internally a **tree** structure (commonly red-black) stores nodes so **`add`**, **`remove`**, and **`contains`** cost **log(n)** in the height of the tree—predictable, grows smoothly with size.

**`TreeSet`** implements **`NavigableSet`**: helpers like **`higher`**, **`lower`**, **`ceiling`**, **`floor`** find **nearby** elements for games, calendars, or numeric bands.

---

## 3. Why it is used

**Leaderboards**, **time windows**, **dictionary keys** when you want **range scans** (`subSet`) without sorting a list on every read.

---

## 4. Ordering rule in one breath

Every element must **compare cleanly**: **`a.compareTo(b)`** (or **`compare(a,b)`**) must be **consistent with equals-ish behavior**—if **`compare` says equal**, **`TreeSet`** treats them as **one** slot, even if **`equals`** differs (rare footgun—design comparisons carefully).

---

## 5. Java code example

```java
import java.util.Comparator;
import java.util.TreeSet;

public class TreeSetDemo {
    public static void main(String[] args) {
        TreeSet<Integer> scores = new TreeSet<>();
        scores.add(40);
        scores.add(10);
        scores.add(25);
        System.out.println(scores);

        TreeSet<String> words = new TreeSet<>(Comparator.reverseOrder());
        words.add("apple");
        words.add("pear");
        words.add("fig");
        System.out.println(words);

        System.out.println("just above 25? " + scores.higher(25));
    }
}
```

First set prints **sorted ascending** integers. Second set prints **reverse alphabetical** because of **`Comparator.reverseOrder()`**.

---

## 6. Explanation of code

**`TreeSet`** without a comparator relies on **`Integer`**’s natural ordering. **`String`** uses lexicographic order; reversing the comparator flips the **`for-each`** print path.

---

## 7. Common mistakes

**Inserting elements whose type lacks `Comparable` and forgetting a `Comparator`**—compiler/runtime complaints follow.

**Expecting `log(n)` to beat `HashSet` on tiny sizes**—constants matter; **`HashSet`** often wins small batches.

**Mutating fields that affect ordering while an object still lives in the set**—the tree can become **internally inconsistent**. Treat **`TreeSet`** elements as **immutable** keys when possible.

---

## 8. Best practices

Prefer **`NavigableSet<Integer> view = scores.headSet(50, true)`** style range views when modeling **bands**—less copying than manual filters.

Document whether your **`Comparator`** is **case-insensitive** for strings—subtle bugs live there.

---

## 9. Small practice task

Create **`TreeSet<String>`** with **`Comparator.comparingInt(String::length)`** so **short words sort first**; add **`"go","java","hi"`** and print. Try adding **`"fun"`** and **`"art"`** (same length) and observe **tie-break** behavior by second comparator rule if you add **`.thenComparing(...)`**.

---

## Beginner tip

If homework says **“unique and sorted”**, **`TreeSet`** is the headline answer—just confirm **comparison rules** match the problem’s definition of **duplicate**.
