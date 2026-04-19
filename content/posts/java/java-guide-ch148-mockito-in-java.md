---
title: "Chapter 148: Mockito in Java — Mocks, Stubs, verify, and Test Doubles in Spring"
description: "Isolate units with Mockito: mock interfaces, when thenReturn, verify interactions, @Mock and @InjectMocks, lenient stubs, and integrating with SpringExtension for slice tests."
category: "Java"
tags:
  - Java Mockito tutorial
  - Java mock verify when
  - Java Mockito SpringExtension
  - Java InjectMocks Mock
  - Java test doubles Mockito
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 148
---

# Chapter 148: Mockito in Java

**Mockito** builds **test doubles**: **mocks** **record** **interactions**, **stubs** **answer** **calls** with **canned** **values**. You **cut** **dependencies** on **databases**, **HTTP**, and **clocks** so **one** **class’s** **logic** **fails** **alone** when **wrong**.

---

## 1. Topic title

**Mockito: replace collaborators with programmable fakes; assert both results and calls**

---

## 2. What it means

**`when(repo.findById(1L)).thenReturn(Optional.of(entity))`** **stubs** **behavior**.

**`verify(repo).save(any())`** asserts **side** **effects** happened—**use** **sparingly** on **true** **collaborators**, not **every** **private** **helper**.

**`@ExtendWith(MockitoExtension.class)`** wires **Jupiter** + **Mockito** **annotations** (**`@Mock`**, **`@InjectMocks`**).

---

## 3. Why it is used

**Fast** **tests** without **Docker** for **every** **save**.

**Edge cases** (**repository throws**, **timeout**) **hard** to **stage** in **integration** **environments**.

---

## 4. Mental sketch

**Mocks** are **stunt doubles** on a **film** **set**—they **wear** the **costume** of **`PaymentGateway`** but **never** **charge** a **real** **card**.

---

## 5. Java code example

```java
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ServiceWithMockTest {
    @Mock
    ItemRepository repo;

    @InjectMocks
    ItemServiceImpl service;

    @Test
    void loads() {
        when(repo.findById(1L)).thenReturn(Optional.of(new ItemEntity(1L, "pen")));
        assertEquals("pen", service.find(1L).orElseThrow().name());
        verify(repo).findById(1L);
    }
}
```

**`ItemEntity` / `ItemServiceImpl`** names **assume** **Chapter 121/123** **shapes**—**swap** for **your** **types**.

---

## 6. Explanation of code

**`@InjectMocks`** picks **constructor** with **most** **matching** **`@Mock`** **types**—**ambiguous** **constructors** **need** **manual** **wiring**.

---

## 7. Common mistakes

**Over-mocking** value **objects**—**prefer** **real** **immutable** **DTOs**.

**Unnecessary** **`verify`** on **every** **call**—**noise** **couples** tests to **implementation** **details**.

---

## 8. Best practices

**ArgumentCaptor** for **complex** **arguments** when **equals** is **hard**.

**Strict stubbing** defaults—**use** **`lenient()`** **only** when **branched** **code** **skips** **some** **stubs**.

---

## 9. Small practice task

Stub **`repo.save`** to **throw** **`DataIntegrityViolationException`** and **assert** your **service** **wraps** it in a **domain** **exception**.

---

## Beginner tip

If **`UnnecessaryStubbingException`** appears, **either** **remove** the **`when`** or **mark** **`lenient()`**—**Mockito** **helps** **find** **dead** **setup**.
