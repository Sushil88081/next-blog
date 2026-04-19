---
title: "Chapter 59: Set Interface in Java — Uniqueness, No Positional Index, and equals/hashCode"
description: "Learn the Java Set interface: no duplicate elements, no get(i), iteration order depends on implementation, and why hash-based sets care about equals and hashCode contracts."
category: "Java"
tags:
  - Java Set interface
  - Java HashSet uniqueness
  - Java equals hashCode set
  - Java collection no duplicates
  - Java Set vs List
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 59
---

# Chapter 59: Set Interface in Java

**`List`** cares about **positions** and gladly stores **duplicates**. **`Set`** flips the story: **each value appears at most once** (by the set’s **`equals`** rules). There is **no `get(index)`**—you either **ask membership** or **walk everything**.

**`HashSet`** details arrive in Chapter 60; ordered variants follow.

---

## 1. Topic title

**Set: membership and uniqueness—not “item number five”**

---

## 2. What it means

**`java.util.Set<E>`** extends **`Collection<E>`** with extra **`equals`/`hashCode`** contracts documented on the interface. Practical habits:

- **`add(x)`** returns **`false`** if **`x`** was already considered present.
- **`contains(x)`** answers **yes/no** quickly on **`HashSet`** when **`hashCode`** behaves.
- **Iteration order** is **not** part of the general **`Set`** promise—**`HashSet`** scrambles, **`LinkedHashSet`** remembers insertion order, **`TreeSet`** sorts (later chapters).

---

## 3. Why it is used

**De-duplicate** a stream of user ids, **tag** sets, **permission** names—anywhere **“already seen”** matters more than **position**.

---

## 4. Mental flip

If **`List`** is a **shopping receipt line-by-line**, **`Set`** is a **spice rack label check**: **cumin** either **exists** or **does not**; you do not ask for **“cumin slot 3.”**

---

## 5. Java code example

```java
import java.util.HashSet;
import java.util.Set;

public class SetInterfaceDemo {
    public static void main(String[] args) {
        Set<String> tags = new HashSet<>();
        tags.add("java");
        tags.add("beginner");
        tags.add("java");
        System.out.println("size " + tags.size());
        System.out.println("has sql? " + tags.contains("sql"));

        for (String t : tags) {
            System.out.println("tag: " + t);
        }
    }
}
```

Adding **`"java"`** twice still yields **size 2**. Loop order is **not guaranteed**—do not write homework that depends on print order from **`HashSet`**.

---

## 6. Explanation of code

**`HashSet`** is the **simplest** default **`Set`** for learning: **fast** **`add`/`contains`** average case when keys distribute hashes well.

---

## 7. Common mistakes

**Assuming `Set` remembers insertion order**—only some implementations do.

**Putting mutable objects into a `HashSet` then changing fields that affect `hashCode`**—membership lookups **break** in confusing ways (advanced but real).

**Using `List` APIs on a `Set`**—there is **no index**; use **`contains`**, **`remove`**, or **iterate**.

---

## 8. Best practices

If you need **both uniqueness and stable iteration order**, plan for **`LinkedHashSet`** (next chapter family).

For custom classes in sets, **override `equals` and `hashCode` together** when you mean “same id means same object”—Chapter 33-style objects revisited.

---

## 9. Small practice task

Given **`List<String>`** with duplicates, build **`new HashSet<>(list)`** and print **original size vs set size**. Explain the difference in one sentence you would tell a teammate.

---

## Beginner tip

When a problem says **“unique”**, **`Set`** is often the **first data shape** to sketch—even if you later swap **`HashSet`** for **`TreeSet`** for sorting.
