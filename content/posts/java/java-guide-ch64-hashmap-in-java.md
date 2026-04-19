---
title: "Chapter 64: HashMap in Java — Hash Buckets for Keys, Fast get, and put Return Value"
description: "Learn HashMap in Java: put get remove, old value from put, computeIfAbsent, load factor at a glance, HashMap vs Hashtable naming history without worshiping legacy APIs."
category: "Java"
tags:
  - Java HashMap
  - Java map put get
  - Java HashMap tutorial
  - Java computeIfAbsent
  - Java collections HashMap
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 64
---

# Chapter 64: HashMap in Java

**`Map`** (Chapter 63) described the **verbs**. **`HashMap`** is the **default hash-table implementation**: **average** fast **`get`/`put`/`remove`** keyed by **`hashCode`** + **`equals`** on the **key** object.

**`LinkedHashMap`** and **`TreeMap`** add **order** stories soon (Chapters 65–66).

---

## 1. Topic title

**HashMap: array of buckets, each bucket holds keys sharing a hash trail**

---

## 2. What it means

**`put(key,value)`** stores the pair; if **`key`** was already present, the **previous value** is **returned** (and replaced). Fresh inserts return **`null`** (or the old value if old was **`null`**—another reason to read javadoc when storing nulls).

**`get`** probes the bucket chain/tree for a **`equals`** match on the key.

---

## 3. Why it is used

**Caches**, **indexes**, **JSON-like records in memory**, **graph adjacency lists** (`Map<Node, List<Node>>`)—anywhere **named lookup** dominates.

---

## 4. Tiny API detail worth remembering

```java
import java.util.HashMap;

HashMap<String, Integer> map = new HashMap<>();
Integer previous = map.put("k", 1);
Integer again = map.put("k", 2);
```

After this, **`map.get("k")`** is **`2`**, **`previous`** is **`null`**, **`again`** is **`1`** (boxed)—handy for **“did we overwrite?”** logging.

---

## 5. Java code example

```java
import java.util.HashMap;
import java.util.Map;

public class HashMapDemo {
    public static void main(String[] args) {
        Map<String, String> capitals = new HashMap<>();
        capitals.put("FR", "Paris");
        capitals.put("DE", "Berlin");
        capitals.putIfAbsent("FR", "Lyon");
        System.out.println(capitals.get("FR"));

        capitals.computeIfAbsent("ES", k -> k.toLowerCase() + "-capital");
        System.out.println(capitals.get("ES"));

        capitals.remove("DE");
        System.out.println(capitals.size());
    }
}
```

**`putIfAbsent`** keeps **`Paris`** because **`FR`** already exists. **`computeIfAbsent`** lazily fabricates a placeholder value for **`ES`** only if missing.

---

## 6. Explanation of code

**`HashMap`** is **not synchronized**—two threads mutating the same map without locks can corrupt internal structures. For single-threaded learning code, that is fine; concurrency chapters handle production fixes.

---

## 7. Common mistakes

**Iterating `values()` while mutating keys**—concurrent modification exceptions or weird states—snapshot or iterate **`entrySet`** carefully.

**Using mutable StringBuilders as keys**—changing contents after **`put`** breaks lookup.

**Relying on `HashMap` iteration order** in saved files—order is **not** part of the contract.

---

## 8. Best practices

Use **`Map<String, V>`** field types; **`new HashMap<>()`** construction.

Prefer **`merge` / `computeIfAbsent`** over manual **`get` then `put`** patterns when counting or memoizing—less boilerplate, fewer races in real code when paired with concurrent maps later.

---

## 9. Small practice task

Track **last login day** per user: **`Map<String, String>`** with **`put` overwriting** each time **`login(user, day)`** runs. Print the map after three logins for **`"ada"`** on different days.

---

## Beginner tip

**`HashMap`** is the **`ArrayList`** of maps—reach for it first, then justify **`LinkedHashMap`**, **`TreeMap`**, or concurrent variants with **measured** or **specified** ordering/thread needs.
