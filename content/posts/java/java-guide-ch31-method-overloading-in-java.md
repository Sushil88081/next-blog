---
title: "Chapter 31: Method Overloading in Java — Same Name, Different Parameter Lists"
description: "Learn Java method overloading: rules the compiler uses, overload vs override, autoboxing pitfalls, and why return type alone cannot distinguish overloads."
category: "Java"
tags:
  - Java method overloading
  - Java overload vs override
  - Java overloaded methods
  - Java overload rules
  - Java same method name
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 31
---

# Chapter 31: Method Overloading in Java

This chapter is **only** about **method overloading**: multiple methods in the **same class** with the **same name** but **different parameter lists** (different count or types). **Overriding** (inheritance, same signature) is a different chapter in Part 6.

---

## 1. Topic title

**Overloading: the compiler picks the “best match” method for each call**

---

## 2. What it means

```java
static int add(int a, int b) {
    return a + b;
}

static int add(int a, int b, int c) {
    return a + b + c;
}

static double add(double a, double b) {
    return a + b;
}
```

Calls:

```java
add(1, 2);       // two ints
add(1, 2, 3);     // three ints
add(1.0, 2.0);    // two doubles
```

The **method signature** the compiler cares about for overload resolution is **name + parameter types** (and arity). **Return type** and **`throws`** clauses are **not** enough to create a second overload if parameter lists are identical—would be a compile error duplicate.

---

## 3. Why it is used

APIs read nicer when one **concept** has several shapes: `println(int)`, `println(String)`, `println(boolean)` are overloads in the standard library. Callers write natural `println(x)` without inventing ugly names like `printlnInt`.

---

## 4. Real-world example

A **`log(String message)`** and **`log(String message, Throwable error)`** pair: simple events vs stack traces—same verb, more data when needed.

---

## 5. Java code example

```java
public class OverloadDemo {

    static void show(int x) {
        System.out.println("int: " + x);
    }

    static void show(double x) {
        System.out.println("double: " + x);
    }

    static void show(String x) {
        System.out.println("String: " + x);
    }

    static int mul(int a, int b) {
        return a * b;
    }

    static int mul(int a, int b, int c) {
        return a * b * c;
    }

    public static void main(String[] args) {
        show(5);
        show(5.0);
        show("five");
        System.out.println(mul(2, 3));
        System.out.println(mul(2, 3, 4));
    }
}
```

---

## 6. Explanation of code

`show(5)` picks `int` overload; `5.0` is a `double` literal; `"five"` is `String`. Widening conversions may apply when picking among numeric overloads—can surprise you with **`byte`** vs **`int`** style edge cases.

---

## 7. Common mistakes

**Trying to overload by return type only** — not allowed; compiler cannot decide.

**Ambiguous calls** when two overloads both match after widening—rare but real; fix by casting at the call site.

**Accidentally calling the wrong overload** after a refactor—rename if two overloads differ only by `int` vs `long` and callers mix literals.

---

## 8. Best practices

**Overload when behavior is truly the same idea** with different shapes—not when logic diverges completely (then use different names).

**Javadoc** overloads clearly so IDE tooltips help.

**Avoid too many overloads** on public APIs; consider a small parameter object or builder.

---

## 9. Small practice task

Add overloads **`format(int cents)`** returning `"$0.99"` style (integer cents to two decimals string, use `String.format` or manual math), and **`format(double amount)`** for whole dollars with two decimals. Call both from `main` with `199` cents and `19.5` dollars.

---

## Beginner tip

Overload resolution happens at **compile time** based on **static types** of arguments—not runtime class of objects (that is overriding / virtual dispatch later).
