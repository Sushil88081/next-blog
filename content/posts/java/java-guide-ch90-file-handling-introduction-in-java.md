---
title: "Chapter 90: File Handling Introduction in Java — Paths, Bytes vs Text, Encoding, and IOException"
description: "Introduce Java file IO concepts: Path vs File, text vs binary, character sets, checked IOException, try-with-resources preview, and how the next chapters read files and write files safely."
category: "Java"
tags:
  - Java file handling intro
  - Java Path File
  - Java IOException files
  - Java text encoding UTF-8
  - Java NIO2 files intro
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 90
---

# Chapter 90: File Handling Introduction in Java

Programs rarely live entirely in memory. They **read configs**, **write logs**, **import CSV**, **export reports**. This chapter lines up **words** you will see in Chapters **91–95**: **path**, **stream**, **encoding**, **resource cleanup**.

---

## 1. Topic title

**File handling: turn disk bytes into program values—and back—without leaking handles**

---

## 2. What it means

**`java.nio.file.Path`** (often built with **`Paths.get("…")`**) names **a location** in a file system—**not** automatically “a file that exists.” **`Files.exists(path)`** answers that.

**Text** is **bytes interpreted through a charset**—**UTF-8** is the usual default today. **Wrong charset** → **mojibake** (`Ã©` style garbage).

**Binary** data (images, protobuf) should not pass through **Reader/Writer**—use **`InputStream`/`OutputStream`**.

---

## 3. Why it is used

**Persistence**, **interop**, **local tooling**—any feature that must **survive JVM restart**.

---

## 4. Mental sketch

A **file** is a **named drawer** of bytes. **`Reader`** is a **translator** between bytes and **`char`**. **`Stream`** APIs are **fire hoses**—powerful, easy to **leave running** if you forget **`close`**.

---

## 5. Java code example

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileIntroDemo {
    public static void main(String[] args) throws IOException {
        Path tmp = Files.createTempFile("demo", ".txt");
        Files.writeString(tmp, "hello\nworld", StandardCharsets.UTF_8);
        String roundTrip = Files.readString(tmp, StandardCharsets.UTF_8);
        System.out.println(roundTrip);
        Files.deleteIfExists(tmp);
    }
}
```

**`Files.writeString` / `readString`** (Java 11+) hide **buffer** wiring for **small** teaching files—**large** files deserve **streaming** APIs (coming chapters).

---

## 6. Explanation of code

**`throws IOException`** on **`main`** is fine for **learning**; real **`main`** often wraps **`try/catch`** or delegates to a **framework** that already handles IO failures.

---

## 7. Common mistakes

**String path math** (`dir + "/" + name`)—use **`path.resolve(child)`** to respect **OS separators**.

**Ignoring encoding**—platform default charset surprises **CI** machines.

---

## 8. Best practices

Prefer **`Path`/`Files`** over legacy **`File`** for **new** code—richer error types, better **directory stream** support.

Always plan **cleanup**—**try-with-resources** (Chapter 95) is your friend.

---

## 9. Small practice task

Create a **temp file**, write **three lines** with **`Files.write`**, read them back with **`readAllLines`**, and print **line count**. Delete the file in a **`finally`** block (manual practice) even though **`deleteIfExists`** already appears above—feel the difference.

---

## Beginner tip

If **`IOException`** feels annoying, remember it is **checked** because **disks lie**: full volumes, unplugged USB sticks, permission changes—Java forces you to **decide** what failure means to the user.
