---
title: "Chapter 95: Try-with-resources in Java — AutoCloseable, Suppressed Exceptions, and Custom Cleanup"
description: "Learn try-with-resources: AutoCloseable close order, suppressed exceptions from close, effectively final resources, and migrating old finally-close patterns safely."
category: "Java"
tags:
  - Java try with resources
  - Java AutoCloseable
  - Java try resources close order
  - Java suppressed exception
  - Java finally vs try with resources
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 95
---

# Chapter 95: Try-with-resources in Java

**`finally` blocks** (Chapter 49) can **close** handles—but easy to **mistype**, **return early**, or **mask** exceptions. **`try-with-resources`** asks the compiler to **`close()`** each **`AutoCloseable`** resource in a **predictable order**, even when **`try`** throws.

**Reading** and **writing** chapters assumed this syntax—here it gets a **first-class** explanation.

---

## 1. Topic title

**try-with-resources: declare handles in parens; compiler inserts safe close choreography**

---

## 2. What it means

```java
try (BufferedReader br = Files.newBufferedReader(path)) {
    use(br);
}
```

**`close`** runs **automatically** at the end—normal finish, **`return`**, or **`throw`**. If **`try`** threw **and** **`close`** throws, the **`close`** exception is **suppressed** and attached to the **primary** throwable—**`getSuppressed()`** lists them.

**Multiple resources:** semicolon-separated, **closed reverse order of declaration** (last opened closes first).

---

## 3. Why it is used

**Fewer leaked sockets**, **temp file cleanup**, **clearer** code than **`finally { if (x != null) x.close(); }`**.

---

## 4. Mental sketch

Classic **`finally`** is you **locking the door** on the way out no matter what. **`try-with-resources`** is a **smart lock** that **knows** which keys you carried in and **turns each** without you narrating every step.

---

## 5. Java code example

```java
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

public class TryWithResourcesDemo {
    static class LoudClose implements AutoCloseable {
        private final String name;

        LoudClose(String name) {
            this.name = name;
        }

        @Override
        public void close() {
            System.out.println("close " + name);
        }
    }

    public static void main(String[] args) throws IOException {
        try (LoudClose a = new LoudClose("outer");
                LoudClose b = new LoudClose("inner")) {
            System.out.println("work");
        }

        byte[] data = "hi".getBytes(StandardCharsets.UTF_8);
        try (InputStream in = new ByteArrayInputStream(data)) {
            System.out.println(in.read());
        }
    }
}
```

Prints **`work`**, then **`close inner`**, then **`close outer`**—reverse declaration order.

---

## 6. Explanation of code

**`InputStream`** extends **`AutoCloseable`**—byte streams participate too, not only **`Reader`/`Writer`**.

---

## 7. Common mistakes

**Swallowing suppressed exceptions**—log **`Arrays.toString(ex.getSuppressed())`** when diagnosing **close** failures.

**Assigning resource in `try` without final-ish semantics**—resource variables are **effectively final** inside the block; you cannot **reassign** them mid-**`try`**.

---

## 8. Best practices

Keep **`try`** bodies **short**—if logic grows, extract **`private void runWith(BufferedReader br)`**.

Add **`AutoCloseable`** to your own types when they wrap **native** or **external** resources.

---

## 9. Small practice task

Write a **`try`** with **two** **`LoudClose`** objects where **`try`** throws **`RuntimeException`**—implement **`close`** to **throw** too and print **`getSuppressed().length`** from the caught outer exception.

---

## Beginner tip

If your IDE offers **“surround with try-with-resources”**, accept it for **`BufferedReader`**, **`PreparedStatement`**, **`HttpResponse<InputStream>`** bodies—**boring safety** beats heroic **`finally`**.
