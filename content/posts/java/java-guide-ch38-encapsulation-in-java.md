---
title: "Chapter 38: Encapsulation in Java — private Fields, getters, setters, and Invariants"
description: "Learn Java encapsulation: hiding fields with private, exposing controlled access via methods, validation in setters, and a BankAccount-style example without inheritance yet."
category: "Java"
tags:
  - Java encapsulation
  - Java private field
  - Java getter setter
  - Java data hiding
  - Java BankAccount example
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 38
---

# Chapter 38: Encapsulation in Java

This chapter is **only** about **encapsulation**: **hiding** internal state and exposing a **small, safe surface** (methods) for the outside world. **Inheritance** is Chapter 39.

---

## 1. Topic title

**Encapsulation: keep fields private, let methods enforce rules**

---

## 2. What it means

```java
class BankAccount {
    private double balance;

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("amount must be positive");
        }
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("amount must be positive");
        }
        if (amount > balance) {
            throw new IllegalStateException("insufficient funds");
        }
        balance -= amount;
    }
}
```

Callers cannot write `account.balance = -999999` because **`balance` is `private`**. They must use **`deposit`** / **`withdraw`**, which check rules.

---

## 3. Why it is used

**Centralize invariants** — “balance never negative” lives in one place instead of every caller remembering the rule.

**Freedom to change internals** later—switch `double` to `BigDecimal`, add audit logging—without breaking every line that used to poke fields.

---

## 4. Real-world example

**Player health in a game:** `private int hp` with `damage(int)` and `heal(int)` so cheats cannot set `hp = Integer.MAX_VALUE` from outside the module if the package boundary is respected.

---

## 5. Java code example

```java
class Thermostat {
    private double celsius;

    public double getCelsius() {
        return celsius;
    }

    public void setCelsius(double value) {
        if (value < -273.15) {
            throw new IllegalArgumentException("below absolute zero");
        }
        this.celsius = value;
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        Thermostat t = new Thermostat();
        t.setCelsius(21.0);
        System.out.println(t.getCelsius());
    }
}
```

---

## 6. Explanation of code

**Getter** reads; **setter** writes with validation. Some fields are **get-only** (no setter) if they should never change after construction—combine with `final` (Chapter 37) when appropriate.

---

## 7. Common mistakes

**Leaking mutable internal collections** — `public List<Item> getItems() { return items; }` if `items` is the real list lets callers mutate it. Return **unmodifiable** view or copy (collections chapters later).

**Getters that do heavy work** without signaling—surprise side effects confuse teams.

**Setters for everything** when immutability would be simpler—sometimes use constructor-only setup.

---

## 8. Best practices

**Start fields `private`** by default; widen access only with a reason.

**Validate at the boundary** of your object—public methods.

**Prefer meaningful names** over JavaBean noise when your domain allows (`credit` instead of `setBalanceAddAmount`).

---

## 9. Small practice task

Implement **`class PiggyBank`** with **`private int coins`**, **`void add(int n)`** (reject negative), **`int count()`** getter. No setter for raw `coins`—only `add`. Try to set coins from `main` illegally and confirm the compiler stops you.

---

## Beginner tip

If you feel getters/setters are boilerplate, you are feeling what IDEs and **records** (later advanced topics) try to reduce—still learn the pattern first so you know what the shortcuts hide.
