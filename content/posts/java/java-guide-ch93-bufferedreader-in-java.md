---
title: "Chapter 93: BufferedReader in Java — readLine, lines(), Mark, and Wrapping Readers"
description: "Learn BufferedReader: buffering semantics, readLine and EOF, lines stream, mark reset limits, and wrapping InputStreamReader for byte-to-text bridges."
category: "Java"
tags:
  - Java BufferedReader
  - Java readLine
  - Java BufferedReader lines stream
  - Java InputStreamReader
  - Java read text file line by line
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 93
---

# Chapter 93: BufferedReader in Java

**`BufferedReader`** sits on top of another **`Reader`**—often **`Files.newBufferedReader`** or **`InputStreamReader`** wrapping bytes. It **fills an internal char array** so **`readLine`** does not hammer the OS for **one character at a time**.

**Reading files** (Chapter 91) showed **`readLine`**; here we stress **behavior** and **streams**.

---

## 1. Topic title

**BufferedReader: cheap line reads by batching characters behind the scenes**

---

## 2. What it means

**`readLine()`** returns **`null`** only at **end of stream**—not for **blank lines** (those become **empty strings**).

**`lines()`** (Java 8+) exposes a **`Stream<String>`**—handy with **`filter`/`map`**, but remember the stream’s **close** ties to the **reader**—use **`try-with-resources`**.

**`mark`/`reset`** exist but **mark** has a **readAheadLimit**—overshooting **invalidates** the mark.

---

## 3. Why it is used

**Log tailing**, **CSV row loops**, **protocol parsers** that are naturally **line-based**.

---

## 4. Mental sketch

Without buffering, reading a line is like **walking to the store for every single ingredient**. **`BufferedReader`** is a **full pantry fetch**—fewer trips.

---

## 5. Java code example

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

public class BufferedReaderDemo {
    public static void main(String[] args) throws IOException {
        String data = "alpha\n\nbeta\n";
        try (BufferedReader br = new BufferedReader(new StringReader(data))) {
            long nonBlank =
                    br.lines().filter(line -> !line.isBlank()).count();
            System.out.println("nonBlank lines=" + nonBlank);
        }

        try (BufferedReader br2 = new BufferedReader(new StringReader(data))) {
            String joined = br2.lines().collect(Collectors.joining("|"));
            System.out.println(joined);
        }
    }
}
```

Two separate **`try`** blocks because **`lines()`** consumes the stream—**do not** call **`lines()` twice** on the same exhausted reader without **reopening**.

---

## 6. Explanation of code

**`StringReader`** turns **`String`** into a **`Reader`**—great for **unit tests** without temp files.

---

## 7. Common mistakes

**Mixing `readLine` and `lines()`** on one reader—easy to **lose elements**; pick **one** style per scope.

**Huge lines**—**`readLine`** still allocates a **whole line** string; **protocol abuse** can blow memory.

---

## 8. Best practices

Wrap **`InputStreamReader(stream, UTF_8)`** with **`BufferedReader`** for **socket text**—same batching win.

Use **`Files.readAllLines`** only when **memory budget** is known safe.

---

## 9. Small practice task

Implement **`long countLines(Path path)`** using **`try-with-resources`** and **`readLine` loop**—no **`lines()`**—and compare results to **`Files.readAllLines`** on a small test file.

---

## Beginner tip

If **`readLine` blocks forever** on a **socket**, you are waiting on bytes that never arrive—timeouts live at **`Socket`** or **`HttpClient`** layers, not inside **`BufferedReader`**.
