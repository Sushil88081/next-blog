---
title: "Chapter 74: Generic Method in Java — Type Parameters on a Single Method, Inference, and Wildcards"
description: "Learn generic methods in Java: <T> before return type, type inference at call sites, bounded parameters preview, PECS-style wildcards at a high level, and static utility patterns."
category: "Java"
tags:
  - Java generic method
  - Java static generic method
  - Java type inference
  - Java Collections emptyList
  - Java generic utility
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 74
---

# Chapter 74: Generic Method in Java

**Generic classes** (Chapter 73) tie **`T`** to the **whole object**. **Generic methods** attach type parameters to **one method**—handy for **`static` helpers** that must work on **many** element types without duplicating code.

**Bounded type parameters** deepen in Chapter 75.

---

## 1. Topic title

**Generic method: `<T>` before the return type, inference fills it in at the call site**

---

## 2. What it means

```java
static <T> void swapEnds(List<T> list) {
    if (list.size() < 2) {
        return;
    }
    T tmp = list.get(0);
    list.set(0, list.get(list.size() - 1));
    list.set(list.size() - 1, tmp);
}
```

**`<T>`** introduces **`T`** **only** for **`swapEnds`**. Callers can write **`swapEnds(strings)`** or **`swapEnds(nums)`**—the compiler **infers** **`T`** from the **argument list**.

---

## 3. Why it is used

**Library-style utilities**—`Collections.sort`, `Arrays.asList`, `List.copyOf` all lean on **generic methods** so **call sites** stay clean.

---

## 4. Mental hook

If a **generic class** is a **whole kitchen themed around vegan food**, a **generic method** is a **single blender attachment** that fits **many** jars—**borrow once**, reuse often.

---

## 5. Java code example

```java
import java.util.ArrayList;
import java.util.List;

public class GenericMethodDemo {
    static <T> T middle(List<T> items) {
        return items.get(items.size() / 2);
    }

    public static void main(String[] args) {
        List<String> letters = new ArrayList<>(List.of("a", "b", "c", "d", "e"));
        System.out.println(middle(letters));

        List<Integer> nums = new ArrayList<>(List.of(10, 20, 30));
        System.out.println(middle(nums));
    }
}
```

Two different **`T`** inferences—**`String`** then **`Integer`**—from the **same** method body.

---

## 6. Explanation of code

If inference fails (rare in simple cases), call with **explicit type witness**: **`GenericMethodDemo.<String>middle(letters)`**—ugly but clarifying for the compiler in edge cases.

---

## 7. Common mistakes

**Thinking `<T>` on a method shadows the class `<T>`** accidentally—legal but confusing; rename one (`U`) when both appear.

**Using raw `List` in a generic method signature**—defeats safety; keep **`List<T>`**.

---

## 8. Best practices

Prefer **`List.copyOf`** / **`List.of`** when building **immutable** snapshots to pass into generic utilities.

Keep **generic methods short**—if the method grows huge, maybe a **small generic class** carries state clearer.

---

## 9. Small practice task

Write **`<T> List<T> firstTwo(List<T> source)`** returning a **new `ArrayList`** containing at most the **first two** elements. Test with **`List.of(1,2,3)`** and **`List.of("x")`**.

---

## Beginner tip

Read **`static <T> T middle(...)`** aloud as **“for any type T, middle returns a T.”** The **`<T>`** is the **introducer**; **`T`** later is the **use**.
