---
title: "Chapter 67: TreeMap in Java — Sorted Keys, subMap Ranges, and NavigableMap Tools"
description: "Learn TreeMap in Java: red-black tree backing, natural ordering or Comparator, log-cost get and put, range views like subMap, and when sorted keys beat LinkedHashMap."
category: "Java"
tags:
  - Java TreeMap
  - Java sorted map
  - Java NavigableMap
  - Java subMap TreeMap
  - Java TreeMap vs HashMap
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 67
---

# Chapter 67: TreeMap in Java

**`HashMap`** finds a key in **average** **O(1)** time with hashing. **`TreeMap`** keeps keys in **sorted order** under a **`Comparator`** or the keys’ **natural ordering**—**`get`/`put`** cost **O(log n)** because a **balanced tree** walks height, not a single bucket hop.

**`LinkedHashMap`** (Chapter 66) remembers **arrival order**, not **value order**.

---

## 1. Topic title

**TreeMap: every key has a place in the sorted line**

---

## 2. What it means

**`TreeMap<K,V>`** implements **`NavigableMap`**. You get **`firstKey`**, **`lastKey`**, **`ceilingKey`**, **`floorEntry`**, and **range views** like **`subMap(from, true, to, true)`** without copying the whole map.

Keys must **compare** cleanly—**`null`** keys are **not** allowed (unlike **`HashMap`** where one **`null`** key is allowed).

---

## 3. Why it is used

**Time lines**, **version tables keyed by build number**, **leaderboards keyed by score** (with care on tie-break rules), anywhere you want **“everything between A and B”** cheaply by key.

---

## 4. Mental sketch

**`HashMap`** is a **coat check** numbered by a quick hash. **`TreeMap`** is a **dictionary shelf** where words stay **alphabetical** so you can grab **all entries from “kite” to “lunar”** in one sweep.

---

## 5. Java code example

```java
import java.util.Map;
import java.util.TreeMap;

public class TreeMapDemo {
    public static void main(String[] args) {
        TreeMap<Integer, String> releases = new TreeMap<>();
        releases.put(2022, "v1");
        releases.put(2024, "v3");
        releases.put(2023, "v2");

        for (Map.Entry<Integer, String> e : releases.entrySet()) {
            System.out.println(e.getKey() + " -> " + e.getValue());
        }

        Map<Integer, String> slice = releases.subMap(2022, true, 2023, true);
        System.out.println("slice size " + slice.size());
    }
}
```

Prints years **2022, 2023, 2024** even though **`put`** order differed—**keys sort numerically** for **`Integer`**.

---

## 6. Explanation of code

**`subMap`** returns a **view** backed by the same tree—changes through the slice affect the **parent** map unless you copy.

---

## 7. Common mistakes

**Inserting keys whose type is not `Comparable` and forgetting a `Comparator`**—constructor overload exists for **`Comparator<? super K>`**.

**Using `TreeMap` “because maps should sort”** when you only need **FIFO** behavior—wrong tool; consider **`Queue`** (Chapter 68).

**Mutating key objects that affect `compareTo` while still inside the map**—same danger as **`HashMap`** with **`hashCode`**.

---

## 8. Best practices

Prefer **`NavigableMap<Integer, V>`** variable types when you rely on **`ceiling`/`floor`** APIs.

Document **tie-breaking** when two different keys **compare equal** under a weak comparator—surprises hide there.

---

## 9. Small practice task

Count words, then move results into **`TreeMap<String,Integer>`** sorted by **word** automatically. Print the **first and last** key using **`firstKey()`** and **`lastKey()`**.

---

## Beginner tip

If you only need **sorted output once**, sometimes **`new ArrayList<>(map.keySet()); list.sort(...)`** is enough—**`TreeMap`** pays **log n** on **every** mutating operation to keep order always true.
