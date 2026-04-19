---
title: "Chapter 63: Map Interface in Java — Keys to Values, No Duplicate Keys, Three Core Operations"
description: "Learn the Java Map interface: put get remove, keys values entrySet, Map vs Collection, null key/value notes at a high level, and declare Map but instantiate HashMap in Chapter 64."
category: "Java"
tags:
  - Java Map interface
  - Java put get remove
  - Java entrySet keySet
  - Java Map vs Collection
  - Java collections Map intro
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 63
---

# Chapter 63: Map Interface in Java

**`List`** numbers slots. **`Set`** tracks membership. **`Map`** pairs **keys** with **values**—think **glossary**, **cache**, **user id → profile**. A **`Map<K,V>`** answers **`get(key)`** without scanning the whole structure on average hash implementations.

**`HashMap`** is Chapter 64; ordered maps follow later.

---

## 1. Topic title

**Map: unique keys each point to at most one value (per map)**

---

## 2. What it means

Core operations: **`put(K key, V value)`** inserts or **replaces**; **`get(Object key)`** returns **`null`** when missing (or when **`null`** is stored—watch ambiguity); **`remove(Object key)`** drops the pair.

You can view **keys** (`keySet()`), **values** (`values()`), or **`Map.Entry`** pairs (`entrySet()`). **`entrySet`** is the usual **`for-each`** path when you need **both** sides per iteration.

**`Map` does not extend `Collection`**—different shape, though **`entrySet()`** gives a **`Set`** of entries you can treat collection-like.

---

## 3. Why it is used

**Configuration tables**, **lookup caches**, **aggregations** (“count per word”), **routing** (“path → handler”). Anywhere **named access** beats **index guessing**.

---

## 4. Mental picture

A **`Map`** is a **labeled drawer wall**: each **label** (key) opens **one** drawer contents (value). Relabeling overwrites the contents; removing a label empties that slot.

---

## 5. Java code example

```java
import java.util.HashMap;
import java.util.Map;

public class MapInterfaceDemo {
    public static void main(String[] args) {
        Map<String, Integer> hits = new HashMap<>();
        hits.put("home", 10);
        hits.put("about", 4);
        hits.put("home", hits.get("home") + 1);
        System.out.println(hits.get("home"));

        for (Map.Entry<String, Integer> e : hits.entrySet()) {
            System.out.println(e.getKey() + "=" + e.getValue());
        }
    }
}
```

**`put` twice on `"home"`** models a **counter bump**. **`entrySet`** loop prints **both** keys eventually—**iteration order** here is **hash-map specific**, not sorted.

---

## 6. Explanation of code

Even though **`HashMap`** is concrete, **`Map<String,Integer>`** is the **variable type**—good habit so callers depend on **`Map`**, not a particular implementation class.

---

## 7. Common mistakes

**Using `get` without null checks when `null` is a legal value**—pair **`containsKey`** when ambiguity matters.

**Thinking `Map` has `add`**—it uses **`put`**.

**Using mutable keys that change their hash** in **`HashMap`**—same bucket chaos as **`HashSet`** keys.

---

## 8. Best practices

Default **`Map`** declarations to **`Map<K,V>`**; pick **`HashMap`** unless you need **`LinkedHashMap`** order or **`TreeMap`** sorting.

Prefer **`Map.of` / `Map.copyOf`** for tiny **immutable** maps in modern Java when teaching snapshots.

---

## 9. Small practice task

Count **word frequency** in **`String text = "java map java"`**: split on spaces, loop words, **`merge(word,1,Integer::sum)`** on a **`HashMap<String,Integer>`**. Print the map.

---

## Beginner tip

**`map.get(k)`** returning **`null`** might mean **missing** **or** **stored null**—when that distinction matters, **`containsKey(k)`** is your friend.
