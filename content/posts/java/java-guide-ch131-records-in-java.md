---
title: "Chapter 131: Records in Java — Compact Data Carriers, Canonical Constructor, and Immutability"
description: "Use Java records for immutable data aggregates: generated accessors, equals hashCode toString, compact constructors for validation, and records vs Lombok POJOs and JPA entities."
category: "Java"
tags:
  - Java records tutorial
  - Java record vs class
  - Java record compact constructor
  - Java immutable data carrier
  - Java record JSON Jackson
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 131
---

# Chapter 131: Records in Java

**Records** (**Java 16+**) are **nominal tuples**: the **compiler** generates **private final fields**, **accessors** **`name()`** (not **`getName`** unless **annotated** for **beans**), **`equals`/`hashCode`/`toString`**, and a **canonical constructor**.

They shine for **DTOs** (Chapter 124), **pattern matching** carriers, and **small** **value-like** **types** where **behavior** is **thin**.

---

## 1. Topic title

**Record: declare state once; compiler writes boilerplate you would have pasted**

---

## 2. What it means

```java
public record Point(int x, int y) {
    public Point {
        if (x < 0 || y < 0) {
            throw new IllegalArgumentException("non-negative only");
        }
    }
}
```

**Compact constructor** validates **before** **field assignment** completes—**no** **`this.x = x`** **noise**.

**Records cannot extend classes**—only **`java.lang.Record`** implicitly; **implement interfaces** freely.

---

## 3. Why it is used

**Less bug surface** than **IDE-generated** getters/setters on **mutable** **beans**.

**Clear semantics** in **`switch` pattern** matching (**Java 21+** previews / **features**) when **modeling** **sealed** **hierarchies** (Chapter 132).

---

## 4. Mental sketch

A **record** is a **labeled cardboard box**—**tape** (**final**) already **sealed**; you **write** the **label** list once, not **every** **edge** by hand.

---

## 5. Java code example

```java
public record Money(long cents, String currency) {
    public Money add(Money other) {
        if (!currency.equals(other.currency)) {
            throw new IllegalArgumentException("currency mismatch");
        }
        return new Money(cents + other.cents, currency);
    }
}

class RecordDemo {
    public static void main(String[] args) {
        Money a = new Money(100, "USD");
        Money b = new Money(50, "USD");
        System.out.println(a.add(b));
    }
}
```

**Immutability** makes **`Money`** **safe** to **share** across **threads** if **references** are not **mutated** **elsewhere**.

---

## 6. Explanation of code

**Jackson** maps **JSON** to **records** with **constructor** parameters—**parameter names** may need **`-parameters`** **compiler** flag or **`@JsonProperty`** for **stable** wire **contracts**.

---

## 7. Common mistakes

**Using records as JPA entities** early on—**possible** with **Hibernate 6+** patterns, but **often** **still** **awkward**; **classes** remain **common** for **lazy** **graphs**.

**Expecting JavaBean `get*` names**—**interop** libraries may need **configuration**.

---

## 8. Best practices

Keep **records** **small**—**extract** **behavior** to **domain services** when **methods** **multiply**.

**Nest** **records** inside **related** **types** for **scoped** **API** clarity.

---

## 9. Small practice task

Convert a **three-field** **mutable POJO** DTO to a **record** and **fix** **call sites** to use **`field()`** accessors—note **Jackson** / **Spring** **bindings** in **your** project.

---

## Beginner tip

**`record` components** are **not** **JavaBeans properties**—**SpEL** and **older** **templates** may **need** **adapters**.
