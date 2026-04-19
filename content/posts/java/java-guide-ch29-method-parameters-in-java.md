---
title: "Chapter 29: Method Parameters in Java — Pass-by-Value, Order, and References"
description: "Learn Java method parameters in depth: pass-by-value semantics, primitives vs references, final parameters, arity and order rules, and common misconceptions about swapping."
category: "Java"
tags:
  - Java method parameters
  - Java pass by value
  - Java final parameter
  - Java swap method myth
  - Java reference parameter
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 29
---

# Chapter 29: Method Parameters in Java

This chapter is **only** about **parameters**: the **inputs** listed in the method declaration and the **arguments** you pass at the call site. Return values are Chapter 30; the word **method** itself was Chapter 28.

---

## 1. Topic title

**Method parameters: names, types, order, and Java’s always pass-by-value rule**

---

## 2. What it means

```java
static int add(int a, int b) {
    return a + b;
}

// call site
int x = add(2, 3);
```

Here `a` and `b` are **parameters** (the placeholders). `2` and `3` are **arguments** (actual values for this call).

**Java is pass-by-value:** the method receives **copies** of the argument values.

- For **primitives**, the copy is the bits of the number—changing `a` inside does not change the caller’s variable.
- For **references**, the copy is the **reference value** (address-like token)—both caller and callee may point at the **same object** on the heap; mutating **object state** through that reference is visible to the caller, but **reassigning** the parameter to a new object does not replace the caller’s variable.

---

## 3. Why it is used

Parameters let one method handle **many situations**: same `formatCurrency(amount, locale)` with different numbers and locales.

They also document **inputs** in the signature—better than reading magic globals.

---

## 4. Real-world example

A **`registerUser(String email, String passwordHash, boolean marketingOptIn)`** method (names illustrative): three pieces of data must arrive together; parameters enforce that contract at compile time (types) and in code review (names).

---

## 5. Java code example

```java
import java.util.Arrays;

public class ParametersDemo {

    static void tryChangePrimitive(int x) {
        x = 999;
        System.out.println("inside tryChangePrimitive x=" + x);
    }

    static void mutateArrayFirstSlot(int[] data) {
        if (data != null && data.length > 0) {
            data[0] = 99;
        }
    }

    static void reassignArrayParameter(int[] data) {
        data = new int[] {1, 2, 3};
        System.out.println("inside reassign, param points to: " + Arrays.toString(data));
    }

    static void useFinal(final String label) {
        System.out.println(label);
    }

    public static void main(String[] args) {
        int n = 1;
        tryChangePrimitive(n);
        System.out.println("after call n=" + n);

        int[] arr = {0, 2, 4};
        mutateArrayFirstSlot(arr);
        System.out.println("after mutate, arr=" + Arrays.toString(arr));

        int[] arr2 = {7, 8};
        reassignArrayParameter(arr2);
        System.out.println("after reassign attempt, arr2=" + Arrays.toString(arr2));

        useFinal("locked name for doc");
    }
}
```

**Output highlights:** `n` stays `1`. `arr` first slot becomes `99` (mutation through shared reference). `arr2` **unchanged** after `reassignArrayParameter` because only the **parameter copy** pointed at the new array.

---

## 6. Explanation of code

- **Primitives:** `tryChangePrimitive` cannot change `n` in `main`.
- **Array mutation:** `data[0] = 99` changes **shared object**.
- **Array reassignment:** `data = new int[]{...}` only changes the **local copy** of the reference.
- **`final` parameter:** cannot reassign `label` inside `useFinal`; still can use the value read-only.

---

## 7. Common mistakes

**Believing Java is pass-by-reference for objects** — no; always pass-by-value of the reference.

**Trying to swap two `int`s with a method** without returning values or using a holder object—won’t work with two plain `int` parameters.

**Parameter shadowing** a field with the same name—legal but confusing; use `this.field` in instance methods later.

**Wrong argument order** — `add(3, 2)` vs `add(2, 3)` matters for non-commutative operations.

---

## 8. Best practices

**Keep parameter lists short** — long lists suggest a parameter object or builder.

**Use meaningful names** — `amountPaise` beats `a`.

**Document units** in names (`delayMillis`) so callers pass the right scale.

**Null-check** defensive public APIs or fail fast with `Objects.requireNonNull`.

---

## 9. Small practice task

Write **`static void bump(int[] counter, int delta)`** that adds `delta` to `counter[0]` if `counter` is non-null and non-empty. Call from `main` with `int[] c = {5}; bump(c, 3);` and print `c[0]` (expect `8`). Then try writing a method that **only** reassigns its `int[]` parameter and confirm `main`’s array is unchanged.

---

## Beginner tip

Draw **two boxes** for caller variable and parameter copy for references. Draw **one object** both arrows point to until reassignment breaks the link.
