---
title: "Chapter 51: throws Keyword in Java — Telling Callers a Method May Propagate Checked Trouble"
description: "Learn Java throws on method signatures: checked exceptions, who must handle or declare, call-chain rules, and a tiny file-read style example without relying on memorized APIs."
category: "Java"
tags:
  - Java throws keyword
  - Java checked exception declare
  - Java IOException throws
  - Java exception signature
  - Java beginner throws
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 51
---

# Chapter 51: throws Keyword in Java

**`throw`** (Chapter 50) fires inside a method. **`throws`**, spelled with an **s**, sits on the **method signature** and answers one question for **checked** exceptions: **“This method might let these types escape without catching them.”**

**Checked vs unchecked** details get a full chapter next (52). For now: if the compiler insists you **deal** with a type, it is **checked**.

---

## 1. Topic title

**throws: document propagated checked exceptions—or catch them inside**

---

## 2. What it means

```java
void run() throws java.io.IOException {
    mightUseDisk();
}
```

Here **`run`** promises **not** to swallow **`IOException`** itself; **callers of `run`** must either **`catch`** **`IOException`** (or a supertype) or **add `throws`** on their own methods.

**Unchecked** problems (`NullPointerException`, `IllegalArgumentException`, …) do **not** force this chain—the compiler does not require **`throws`** for them.

---

## 3. Why it is used

Checked exceptions were meant to make **failure modes visible** in signatures. Whether you love or dislike that choice, you still need to **read** **`throws`** lines when calling library code.

---

## 4. Mental hook

**`throws`** is like a **sticky note** on a door: “Wet paint—touch at own risk.” Callers decide whether to **wear gloves** (`try`/`catch`) or **pass the warning** to the next room (`throws` again).

---

## 5. Java code example

This toy **`FakeReader`** mimics “sometimes IO fails” without opening real files:

```java
class FakeReader {
    private final boolean fail;

    FakeReader(boolean fail) {
        this.fail = fail;
    }

    void readChunk() throws java.io.IOException {
        if (fail) {
            throw new java.io.IOException("device hiccup");
        }
    }
}

class App {
    static void load(boolean badDevice) throws java.io.IOException {
        new FakeReader(badDevice).readChunk();
    }
}

public class ThrowsKeywordDemo {
    public static void main(String[] args) {
        try {
            App.load(false);
            App.load(true);
        } catch (java.io.IOException ex) {
            System.out.println("recovered: " + ex.getMessage());
        }
    }
}
```

**`load`** **declares** **`throws IOException`** because it calls **`readChunk`** without catching. **`ThrowsKeywordDemo.main`** **catches**, so it does not need **`throws`** on its signature.

---

## 6. Explanation of code

If you **removed** **`throws IOException`** from **`load`** while still calling **`readChunk`**, the compiler would ask you to **either catch** or **declare**—that is the **checked** rule in action.

---

## 7. Common mistakes

**Declaring `throws Exception`** on everything—too wide; callers cannot tell **which** failures to prepare for.

**Swallowing checked exceptions in empty `catch`** just to silence the compiler—dangerous; at least wrap or log.

**Forgetting that `throws` is not inherited in a way that removes responsibility**—overridden methods have rules about **compatible** throws lists (advanced; remember **signatures matter**).

---

## 8. Best practices

List **only** the checked types you truly let through. If you can **handle** a failure **locally**, prefer **`try`/`catch`** and a **narrow** **`throws`** list on public APIs.

---

## 9. Small practice task

Add **`static void relay(boolean bad)`** that calls **`load(bad)`** and **declares `throws IOException`** without a **`try`**. Call **`relay`** from **`ThrowsKeywordDemo.main`** inside **`try`/`catch`** and confirm the compiler stays happy.

---

## Beginner tip

When your IDE offers **“Add throws declaration”** vs **“Surround with try/catch”**, pause: **who** should own the recovery—the **leaf** method, a **middle** layer, or **`main`**? There is no single right answer, but **centralizing** user-visible messages often feels nicer than scattering **`catch`** everywhere.
