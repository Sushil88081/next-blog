---
title: "Chapter 39: Inheritance in Java — extends, super, and Method Overriding Basics"
description: "Learn Java inheritance: extends, parent and child classes, super for constructors and members, @Override, when inheritance helps, and when composition is safer."
category: "Java"
tags:
  - Java inheritance
  - Java extends super
  - Java method overriding
  - Java subclass
  - Java OOP inheritance
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 39
---

# Chapter 39: Inheritance in Java

This chapter is **only** about **inheritance**: a **child** class **extends** a **parent**, reusing and specializing behavior. **Encapsulation** was Chapter 38; **polymorphism** and deeper override rules come in later chapters.

---

## 1. Topic title

**Inheritance: `extends`, `super(...)`, and `@Override` on replaced methods**

---

## 2. What it means

```java
class Employee {
    protected final String name;

    Employee(String name) {
        this.name = name;
    }

    String role() {
        return "Employee";
    }
}

class Manager extends Employee {
    private final int teamSize;

    Manager(String name, int teamSize) {
        super(name);
        this.teamSize = teamSize;
    }

    @Override
    String role() {
        return "Manager (" + teamSize + ")";
    }
}
```

- **`extends`** — `Manager` **is-a** `Employee` for assignment and polymorphic calls.
- **`super(name)`** — calls the **parent constructor**; must be **first line** in child constructor if present.
- **`@Override`** — documents intent; compiler verifies you actually override something.

---

## 3. Why it is used

**Reuse** common fields and behavior—payroll might treat all `Employee` types through one list while `Manager` adds bonus rules.

**Model hierarchies** that match the domain—**when the relationship is stable and true “is-a.”**

---

## 4. Real-world example

**Shape hierarchy** (teaching classic): `Rectangle extends Shape` with shared `color` field and `area()` override. Real graphics APIs often prefer composition; inheritance is still the language lesson.

---

## 5. Java code example

```java
class Employee {
    protected final String name;

    Employee(String name) {
        this.name = name;
    }

    String role() {
        return "Employee";
    }
}

class Manager extends Employee {
    private final int teamSize;

    Manager(String name, int teamSize) {
        super(name);
        this.teamSize = teamSize;
    }

    @Override
    String role() {
        return "Manager (" + teamSize + ")";
    }
}

class Animal {
    String sound() {
        return "…";
    }
}

class Dog extends Animal {
    @Override
    String sound() {
        return "woof";
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Animal a = new Dog();
        System.out.println(a.sound());

        Employee e = new Manager("Lee", 4);
        System.out.println(e.role() + " " + e.name);
    }
}
```

Save as `InheritanceDemo.java` (filename matches the `public` class). Other classes are package-private in the same file.

---

## 6. Explanation of code

**`Animal a = new Dog();`** — variable type `Animal`, object type `Dog`; **virtual method dispatch** calls `Dog.sound()` at runtime for **instance** methods.

**`protected`** on `name` lets subclasses read it without making it public.

---

## 7. Common mistakes

**Forgetting `super(...)`** when parent has no default constructor—compile error.

**Using inheritance for code reuse only** when the relationship is not “is-a”—favor **composition** (hold a helper object) instead.

**Hiding instead of overriding** — `static` methods hide; not the same as override. Instance methods override.

---

## 8. Best practices

**Prefer shallow hierarchies**; deep trees age badly.

**Mark intentional overrides with `@Override`**.

**Design for substitution**—subtypes should honor expectations of the parent type (Liskov idea—study later formally).

---

## 9. Small practice task

Create **`class Vehicle`** with `String model` and method **`String describe()`**. Create **`class Bike extends Vehicle`** adding `int gearCount`, constructor using **`super`**, and **`@Override describe()`** including gears. Instantiate polymorphically (`Vehicle v = new Bike(...)`) and print `v.describe()`.

---

## Beginner tip

If you cannot finish the sentence “`Child` **is a** `Parent` in the real domain,” pause before you write `extends`.
