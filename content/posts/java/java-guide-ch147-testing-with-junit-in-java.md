---
title: "Chapter 147: Testing with JUnit in Java — JUnit 5, Lifecycle, Assertions, and Test Slices"
description: "Write tests with JUnit 5: @Test, lifecycle annotations, assertions and parameterized tests, nested tests, extensions, and Spring Boot test slices like @WebMvcTest and @DataJpaTest at a glance."
category: "Java"
tags:
  - Java JUnit 5 tutorial
  - Java Spring Boot test
  - Java parameterized tests JUnit
  - Java WebMvcTest DataJpaTest
  - Java unit testing best practices
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 147
---

# Chapter 147: Testing with JUnit in Java

**JUnit 5** (**Jupiter**) is the **default** **test** **engine** for **modern** **Java** and **Spring Boot**: **`@Test`** methods, **rich** **assertions** via **`org.junit.jupiter.api.Assertions`**, **lifecycle** hooks, and **extensions** for **Spring**, **Testcontainers**, and **more**.

**Tests** are **executable** **specs**—**fast** **feedback** beats **manual** **click** **retesting**.

---

## 1. Topic title

**JUnit: automate checks; keep tests deterministic, fast, and independent**

---

## 2. What it means

**`@BeforeEach` / `@AfterEach`** prepare **fresh** **state** per **test**—**avoid** **order** **dependence**.

**`@ParameterizedTest`** feeds **many** **inputs** through **`@CsvSource`** or **`@MethodSource`**.

**Spring** **`@SpringBootTest`** loads **full** **context**—**heavy**; **slices** (**`@WebMvcTest`**, **`@DataJpaTest`**) **narrow** **scope**.

---

## 3. Why it is used

**Regression safety net** when **refactoring** **controllers** or **queries**.

**Documentation** that **runs**—**failing** **tests** **prove** **drift**.

---

## 4. Mental sketch

**Manual QA** is **tasting** every **dish** **before** **service**. **JUnit** is **recipe** **cards** with **checkboxes**—**kitchen** **runs** them **every** **commit**.

---

## 5. Java code example

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class CalculatorTest {
    @Test
    void adds() {
        assertEquals(3, 1 + 2);
    }

    @Test
    void rejectsBadInput() {
        assertThrows(IllegalArgumentException.class, () -> {
            if (true) {
                throw new IllegalArgumentException("demo");
            }
        });
    }
}
```

**`assertThrows`** captures **expected** **failure** **types**—**better** than **`try/catch`** **in** **each** **test**.

---

## 6. Explanation of code

**`@DisplayName`** improves **report** **readability** in **IDE** and **CI** **HTML**.

---

## 7. Common mistakes

**Flaky** **timing** tests—**avoid** **`Thread.sleep`** for **synchronization**; **use** **Awaitility** or **proper** **latches**.

**Shared mutable statics** between **tests**—**order-dependent** **failures**.

---

## 8. Best practices

**AAA** pattern—**Arrange**, **Act**, **Assert**—**blank lines** help **readers**.

**One logical assertion cluster** per **test** **name**—**split** **when** **name** **needs** **“and”**.

---

## 9. Small practice task

Add **`@ParameterizedTest` + `@CsvSource`** for **several** **input/output** pairs on a **pure** **function** you **own**.

---

## Beginner tip

If **CI** fails **only** on **Linux**, suspect **line endings**, **locale**, or **filesystem** **case** **sensitivity**—**tests** should **pin** **locale** when **parsing** **dates**.
