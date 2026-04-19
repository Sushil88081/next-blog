---
title: "Chapter 75: Bounded Type Parameter in Java — extends, super, and Reading vs Writing Collections"
description: "Learn bounded generics in Java: T extends Number, wildcards ? extends and ? super, PECS mnemonic for APIs, and why copyFrom(List<? extends T>) differs from addTo(List<? super T>)."
category: "Java"
tags:
  - Java bounded type parameter
  - Java extends wildcard
  - Java super wildcard PECS
  - Java generics extends super
  - Java wildcard producer consumer
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 75
---

# Chapter 75: Bounded Type Parameter in Java

Sometimes **`T`** should not be **anything**—only **`Number`** subclasses, or only types that **`implement Comparable<T>`**. **Bounds** (`T extends Foo`) express that. **Wildcards** (`? extends`, `? super`) express **flexible** method parameters when you only **read** or only **write**.

**Generic class** (73) and **generic method** (74) groundwork makes this chapter readable.

---

## 1. Topic title

**Bounds: “T must be at least this capable.” Wildcards: “I only read” vs “I only write.”**

---

## 2. What it means

- **` <T extends Number> `** — **`T`** can be **`Integer`**, **`Double`**, …—you may call **`doubleValue()`** on **`T`** safely.
- **`List<? extends Number>`** — **producer** of numbers: you can **`get`** **`Number`** (or subtype) references; **`add`** is **limited** (except **`null`**) because the **real** list might be **`List<Integer>`**.
- **`List<? super Integer>`** — **consumer** of integers: you can **`add`** **`Integer`**; **`get`** returns **`Object`** unless you narrow carefully.

**PECS** (Producer **Extends**, Consumer **Super**) is a **memory aid** for **public APIs**—not a law of physics, but it stops many wildcard mistakes.

---

## 3. Why it is used

**Flexible utilities** that accept **`List<Integer>`**, **`List<Long>`**, etc., when only **reading** numbers—**`? extends Number`**.

**Flexible sinks** that accept **`List<Number>`** or **`List<Object>`** when you only **write integers**—**`? super Integer`**.

---

## 4. Mental sketch

**`extends`** is a **read-only telescope** pointed at a shelf—you can **look** at items but not assume which exact box brand sits there, so you cannot **stash** arbitrary new items.

**`super`** is a **donation bin** labeled “at least accepts **`Integer`** gifts”—you may **drop integers**, but **pulling** items out is vague until you cast or inspect.

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.List;

public class BoundedGenericsDemo {
    static double sumNumbers(List<? extends Number> values) {
        double total = 0;
        for (Number n : values) {
            total += n.doubleValue();
        }
        return total;
    }

    static void addBonus(List<? super Integer> sink) {
        sink.add(5);
    }

    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<>(List.of(1, 2, 3));
        System.out.println(sumNumbers(ints));

        List<Number> mixed = new ArrayList<>();
        addBonus(mixed);
        addBonus(mixed);
        System.out.println(mixed);
    }
}
```

**`sumNumbers`** accepts **`List<Integer>`** thanks to **`? extends Number`**. **`addBonus`** accepts **`List<Number>`** thanks to **`? super Integer`**.

---

## 6. Explanation of code

Without **wildcards**, you would need **overload explosion** or **unsafe casts**. Bounds package **intent** into the **signature**.

---

## 7. Common mistakes

**Putting `extends` where `super` belongs**—compiler errors about **`add`** show up fast; re-read **PECS** with a tiny example.

**Returning `List<? extends T>` from everything**—callers then struggle to **mutate**; prefer **concrete** or **`List<T>`** when both read and write matter.

---

## 8. Best practices

Name methods so **producer/consumer** intent is obvious: **`copyFrom`**, **`drainTo`**, **`addAllScores`**.

When learning, draw **two columns**—**read operations** vs **write operations**—before picking **`extends`** vs **`super`**.

---

## 9. Small practice task

Write **`void copyInts(List<? super Integer> dest, List<Integer> src)`** that **`addAll`s**. Try passing **`List<Number>`** as **`dest`** and **`List<Integer>`** as **`src`**. Then try **`List<String>`** as **`dest`** and confirm the compiler blocks nonsense.

---

## Beginner tip

If wildcards feel like **spells**, slow down: you are only answering **“Am I mostly reading from this list, or mostly writing into it?”** The answer picks **`extends`** vs **`super`** more often than not.
