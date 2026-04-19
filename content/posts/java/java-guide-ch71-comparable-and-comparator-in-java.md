---
title: "Chapter 71: Comparable and Comparator in Java — Natural Order vs Plug-In Sort Rules"
description: "Learn Comparable compareTo, Comparator compare, Collections.sort and List.sort, static Comparator helpers, consistent-with-equals pitfalls, and TreeSet or TreeMap ordering ties."
category: "Java"
tags:
  - Java Comparable Comparator
  - Java compareTo
  - Java Collections sort
  - Java Comparator comparing
  - Java sort custom order
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 71
---

# Chapter 71: Comparable and Comparator in Java

**`TreeSet`** and **`TreeMap`** (Chapter 67) need a **total ordering** story. **`Collections.sort`** on a **`List`** needs the same. Java splits the idea into two interfaces:

- **`Comparable<T>`** on the **element type** itself — “**natural** order.”
- **`Comparator<T>`** as a **separate object** — “**alternate** order” without editing the original class.

**Generics** get their own Part 9 starting Chapter 72; this chapter still uses **angle-bracket types** you have already seen on **`List<String>`**.

---

## 1. Topic title

**Comparable: type knows how to rank itself. Comparator: visitor brings a ranking lens**

---

## 2. What it means

**`compareTo`** returns **negative / zero / positive** to say **less / equal / greater** than the other operand. **`Comparator.compare(a,b)`** does the same for **two arguments**.

**Contract sketch:** reflexive, antisymmetric, transitive—if you break transitivity, sorts and trees behave **strangely** or throw **`IllegalArgumentException`** in newer APIs that detect bad comparators.

---

## 3. Why it is used

**One default** order (`Student` by **id**) plus **many views** (sort by **name**, by **grade**) via **`Comparator`** instances you pass into **`sort`** or **`TreeSet`** constructors.

---

## 4. Mental picture

**`Comparable`** is a **name tag printed on the object**. **`Comparator`** is a **guest judge’s scorecard** you can swap between rounds without reprinting tags.

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

final class Score implements Comparable<Score> {
    final String player;
    final int points;

    Score(String player, int points) {
        this.player = player;
        this.points = points;
    }

    @Override
    public int compareTo(Score other) {
        return Integer.compare(this.points, other.points);
    }

    @Override
    public String toString() {
        return player + ":" + points;
    }
}

public class ComparableComparatorDemo {
    public static void main(String[] args) {
        List<Score> board = new ArrayList<>();
        board.add(new Score("Ada", 40));
        board.add(new Score("Bob", 55));
        board.add(new Score("Chen", 40));
        board.sort(Comparator.naturalOrder());
        System.out.println("by points " + board);

        board.sort(Comparator.comparing(s -> s.player));
        System.out.println("by name " + board);
    }
}
```

**`naturalOrder()`** uses each **`Score`’s `compareTo`** (points ascending). Second sort **reorders by player name** lexicographically.

---

## 6. Explanation of code

**`Comparator.comparing`** takes a **function** that extracts the sort key—here a lambda **`s -> s.player`**. You can chain **`.thenComparingInt(s -> s.points)`** to break ties deliberately.

---

## 7. Common mistakes

**Subtracting ints for `compareTo`** — overflow when gaps exceed **`Integer.MAX_VALUE`**; prefer **`Integer.compare`**.

**Forgetting `equals` consistency** when **`compareTo` returns 0`** — **`TreeSet`** treats items as **duplicates** if **`compare` says equal**, even if **`equals`** disagrees—keep rules aligned.

---

## 8. Best practices

Expose **`Comparator`** factories as **`static` methods** on the domain class (`Score.byName()`), keeping call sites readable.

Document whether **sort is stable** when ties exist—**`List.sort`** is stable; knowing that helps UI expectations.

---

## 9. Small practice task

Add **`thenComparing`** so ties on **points** break by **player name**. Print the board and confirm **both 40-point** players appear with **alphabetical** order among equals on points.

---

## Beginner tip

If the compiler says **`Score cannot be converted to Comparable<?>`**, you forgot **`implements Comparable<Score>`** or left a **raw** type somewhere—fix the implements clause first.
