---
title: "Chapter 100: synchronized Keyword in Java — Monitors, Intrinsic Locks, and Reentrant Mutual Exclusion"
description: "Use synchronized methods and blocks for mutual exclusion on the intrinsic monitor, understand reentrancy, and avoid holding locks while calling alien code or blocking on I/O."
category: "Java"
tags:
  - Java synchronized keyword
  - Java intrinsic lock monitor
  - Java synchronized method block
  - Java thread safe counter
  - Java reentrant synchronized
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 100
---

# Chapter 100: synchronized Keyword in Java

**`synchronized`** ties **mutual exclusion** to an **object’s intrinsic lock** (its **monitor**). **One thread** at a time may execute a **`synchronized`** region **for a given lock object**—others **BLOCKED** until the lock **releases** when the region exits **normally** or by **exception**.

This is the **first** tool most developers use for **“make my counter correct.”** It is **not** the **only** tool—**`java.util.concurrent`** adds finer locks—but **`synchronized`** remains **everywhere** in **JDK** and **legacy** code.

---

## 1. Topic title

**synchronized: same monitor, serialized access, memory visibility flush on exit**

---

## 2. What it means

```java
public class Counter {
    private int value = 0;

    public synchronized void increment() {
        value++;
    }

    public synchronized int get() {
        return value;
    }
}
```

**`synchronized` instance methods** share the **lock on `this`**. **`static synchronized`** methods use the **Class object’s** lock—**different** from instance locks.

**Block form** narrows scope:

```java
private final Object lock = new Object();

public void bump() {
    synchronized (lock) {
        value++;
    }
}
```

---

## 3. Why it is used

**Fix data races** when **multiple threads** touch the **same mutable fields**.

**Publish work safely**—exiting **`synchronized`** establishes **happens-before** with the **next** acquirer of that lock (visibility, not just atomicity of the single **counter++** story).

---

## 4. Mental sketch

The **monitor** is a **single bathroom key** on **`this`**. **`synchronized`** means “**take key**, do **small** business, **return key**.” If someone **forgets** to return (**holds lock during `sleep`**), the hallway **backs up**.

---

## 5. Java code example

```java
public class SynchronizedDemo {
    static class SafeCounter {
        private int n = 0;

        public void add() {
            synchronized (this) {
                n++;
            }
        }

        public int snapshot() {
            synchronized (this) {
                return n;
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        SafeCounter c = new SafeCounter();
        Thread a = new Thread(() -> {
            for (int i = 0; i < 50_000; i++) {
                c.add();
            }
        });
        Thread b = new Thread(() -> {
            for (int i = 0; i < 50_000; i++) {
                c.add();
            }
        });
        a.start();
        b.start();
        a.join();
        b.join();
        System.out.println(c.snapshot());
    }
}
```

Expect **`100000`**—without **`synchronized`**, you would often see **lost updates**.

---

## 6. Explanation of code

**`n++`** is **read-modify-write**—not atomic without a lock or **`AtomicInteger`**. **`Reentrant`** behavior: the **same** thread may **re-enter** **`synchronized (this)`** nested calls on **`this`** without **self-deadlock**.

---

## 7. Common mistakes

**Locking on `String` literals or boxed `Integer`**—**interned** or **cached** values can **collide** with **unrelated** code.

**Long `synchronized` bodies**—increases **contention**; **hold locks briefly**.

**Calling alien code while holding the lock**—unknown callees might **block** or **re-lock**, risking **deadlocks**.

---

## 8. Best practices

Prefer **`private final Object lock`** or **document** that **`synchronized` methods** use **`this`** as the lock—subclasses **can** synchronize on **`this`** too and **surprise** you.

For **high** contention counters, consider **`LongAdder`** / **`AtomicInteger`**—but understand **`synchronized`** first.

---

## 9. Small practice task

Remove **`synchronized`** from **`add()`** and run the demo **ten** times—record the **lowest** result you see and reason about **lost increments**.

---

## Beginner tip

**`volatile`** (next chapter) fixes **visibility** for **single** variable **writes** in specific patterns—it **does not** make **`count++`** atomic. Do not **`volatile`** your way out of a **read-modify-write** race.
