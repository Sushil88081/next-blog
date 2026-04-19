---
title: "Chapter 41: Method Overriding in Java — @Override, Rules, static vs Instance, and super"
description: "Learn Java method overriding: @Override, access modifiers, return types, exceptions, hiding static methods, calling super, and mistakes that break substitutability."
category: "Java"
tags:
  - Java method overriding
  - Java Override annotation
  - Java static hiding
  - Java super method call
  - Java Liskov substitution
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 41
---

# Chapter 41: Method Overriding in Java

This chapter is **only** about **method overriding**: a **child** class provides a **replacement** for an **instance** method inherited from a **parent**, with **rules** the compiler enforces. **Polymorphism** (Chapter 40) is what makes those replacements matter at runtime.

---

## 1. Topic title

**Overriding: same signature, compatible return, not weaker access, instance methods only—annotate with `@Override`**

---

## 2. What it means

```java
class Logger {
    void log(String msg) {
        System.out.println(msg);
    }
}

class TimestampLogger extends Logger {
    @Override
    void log(String msg) {
        super.log(java.time.Instant.now() + " " + msg);
    }
}
```

**`@Override`** tells the compiler “this must override something.” If you mistype the name or parameters, you get a **compile error** instead of a silent **overload** you did not intend.

---

## 3. Why it is used

**Specialize behavior** while keeping the **same call site** (`logger.log("x")`).

**Catch mistakes early** — without `@Override`, a tiny signature drift creates a **new overload** and your “override” never runs.

---

## 4. Real-world example

**UI themes:** `Widget.draw()` overridden per theme; the layout engine calls `draw()` on `Widget` references without branching on concrete widget classes everywhere.

---

## 5. Java code example

```java
class Account {
    protected String id() {
        return "acct";
    }

    void printId() {
        System.out.println(id());
    }
}

class SavingsAccount extends Account {
    @Override
    public String id() {
        return "sav-" + super.id();
    }
}

class Tool {
    static void ping() {
        System.out.println("tool");
    }
}

class Hammer extends Tool {
    static void ping() {
        System.out.println("hammer");
    }
}

public class OverrideDemo {
    public static void main(String[] args) {
        Account a = new SavingsAccount();
        a.printId();

        Tool t = new Hammer();
        t.ping();
        Hammer.ping();
    }
}
```

**`static` methods are not overridden** in the instance sense—they **hide** by **static type** of the reference. **`t.ping()`** prints **`tool`** because **`t`’s compile-time type** is `Tool`. **`Hammer.ping()`** prints **`hammer`**.

---

## 6. Explanation of code

**Instance `id()`** is overridden; **`printId`** calls the runtime override through polymorphism. **`super.id()`** reaches the parent implementation when you want to **extend**, not discard, behavior.

---

## 7. Common mistakes

**Trying to override `private` methods** — they are not visible to the child; you may accidentally define an unrelated method with the same name.

**Narrowing access** — you cannot make an overridden method **more private** than the parent’s version.

**Forgetting `super(...)`** in constructors when the parent has no default constructor—Chapter 34.

---

## 8. Best practices

**Always use `@Override`** on intentional overrides.

**Keep overrides surprising-behavior-free** when the method is part of a **contract** callers rely on—**Liskov** intuition: subclasses should remain usable where the parent was promised.

---

## 9. Small practice task

Add **`class CheckingAccount extends Account`** with **`@Override String id()`**. Store it in **`Account ref = new CheckingAccount();`** and print **`ref.id()`**—confirm which body runs.

---

## Beginner tip

If two methods “feel” like overrides but only one runs, check **`static`**, **`private`**, **`final` on parent method**, and **signatures**—those details decide what Java allows and what it dispatches.
