---
title: "Chapter 92: Writing File in Java — Create, Truncate, Append, and Atomic Moves"
description: "Write files in Java with Files.writeString write, StandardOpenOption, creating parent directories, newline habits, and safe patterns for logs and exports."
category: "Java"
tags:
  - Java write file
  - Java Files writeString
  - Java StandardOpenOption append
  - Java create file UTF-8
  - Java write text file
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 92
---

# Chapter 92: Writing File in Java

Reading (Chapter 91) pulled bytes **in**. Writing pushes bytes **out**: **create**, **replace**, or **append** depending on how you open the file.

---

## 1. Topic title

**Writing a file: choose truncate vs append, then flush mental model of “disk commits”**

---

## 2. What it means

**`Files.writeString(path, text, charset, OPEN_OPTIONS…)`** — common options:

- **`CREATE`** — make the file if missing.
- **`TRUNCATE_EXISTING`** — start from **empty** when combined with **`WRITE`**.
- **`APPEND`** — add bytes **after** existing content.

Combine with **`StandardOpenOption`** varargs. When unsure, **read the enum Javadoc** once—names are honest.

---

## 3. Why it is used

**Export CSV**, **append audit lines**, **dump debug snapshots**—any output that must **survive** past **`main`**.

---

## 4. Mental sketch

**Truncate** is **erasing the whiteboard** before lecture. **Append** is **adding bullet points** to yesterday’s notes.

---

## 5. Java code example

```java
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;

public class WriteFileDemo {
    public static void main(String[] args) throws IOException {
        Path tmp = Files.createTempFile("write-demo", ".log");
        Files.writeString(tmp, "start\n", StandardCharsets.UTF_8, StandardOpenOption.TRUNCATE_EXISTING);

        Files.writeString(
                tmp,
                "more\n",
                StandardCharsets.UTF_8,
                StandardOpenOption.CREATE,
                StandardOpenOption.APPEND);

        System.out.print(Files.readString(tmp, StandardCharsets.UTF_8));
        Files.deleteIfExists(tmp);
    }
}
```

First write **replaces** content with **`start\n`**. Second call **appends** **`more\n`**.

---

## 6. Explanation of code

**`CREATE` + `APPEND`** is a common pair for **log rotation** handled elsewhere—here it simply guarantees the file **exists** before appending.

---

## 7. Common mistakes

**Forgetting parent directories**—`Files.write` does **not** mkdir **`a/b/file.txt`** automatically unless you **`createDirectories`** first.

**Platform newlines**—use **`System.lineSeparator()`** or **`\n`** consistently depending on **consumer** expectations.

---

## 8. Best practices

**Write temp files**, **`flush`** (implicit on close for buffered writers), then **`move`** atomically when publishing—reduces half-written **visible** files.

**Test on read-only volumes** occasionally—errors teach **permission** handling.

---

## 9. Small practice task

Write **three** JSON lines (fake objects) using **three** **`append`** calls, then **`readString`** and print—confirm **order** matches call order.

---

## Beginner tip

If nothing appears on disk, check you **flushed/closed** writers—buffered data can sit in RAM until **close**.
