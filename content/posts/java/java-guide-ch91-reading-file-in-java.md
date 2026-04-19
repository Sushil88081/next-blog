---
title: "Chapter 91: Reading File in Java — Bytes, Characters, Paths, and Choosing a Strategy"
description: "Read files in Java with Path and Files: readAllBytes readString newBufferedReader, charset choice, streaming large files with InputStream, and IOException handling patterns."
category: "Java"
tags:
  - Java read file
  - Java Files readString
  - Java BufferedReader file
  - Java read file UTF-8
  - Java Path read text
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 91
---

# Chapter 91: Reading File in Java

Chapter 90 set vocabulary: **path**, **encoding**, **checked `IOException`**. This chapter is about **pulling data in**: whole file at once vs **streaming** line by line when files grow large.

**Writing** mirrors many APIs—Chapter 92.

---

## 1. Topic title

**Reading a file: pick charset, pick “all at once” vs “piece by piece,” then close**

---

## 2. What it means

**Small text config:** **`Files.readString(path, StandardCharsets.UTF_8)`** (Java 11+) returns a **`String`**.

**Line-oriented text:** **`Files.readAllLines`** builds a **`List<String>`**—simple, but **duplicates** big files in memory.

**Streaming:** **`Files.newBufferedReader(path, charset)`** or **`newInputStream`** for **byte** pipelines—constant memory if you **process while reading**.

---

## 3. Why it is used

**Load settings**, **parse logs**, **ingest CSV**—any workflow that starts with **bytes on disk**.

---

## 4. Mental sketch

**`readString`** is **drinking a mug** in one gulp. **`BufferedReader`** is **sipping through a straw**—better when the **thermos** is huge.

---

## 5. Java code example

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class ReadFileDemo {
    public static void main(String[] args) throws IOException {
        Path tmp = Files.createTempFile("read-demo", ".txt");
        Files.writeString(tmp, "line1\nline2\n", StandardCharsets.UTF_8);

        String all = Files.readString(tmp, StandardCharsets.UTF_8);
        System.out.println("whole:\n" + all);

        try (BufferedReader br = Files.newBufferedReader(tmp, StandardCharsets.UTF_8)) {
            String first = br.readLine();
            System.out.println("first line=" + first);
        }

        Files.deleteIfExists(tmp);
    }
}
```

**`try-with-resources`** closes **`br`** automatically—Chapter 95 explains the rule; use it **now** as habit.

---

## 6. Explanation of code

**`readLine`** returns **`null`** at **EOF**—loop with **`while ((line = br.readLine()) != null)`** is the classic pattern.

---

## 7. Common mistakes

**Default charset** on **`Files.readString(path)`** overload—explicit **`UTF_8`** avoids **“works on my machine”** bugs.

**Reading gigabytes into one `String`**—switch to **streams** or **channels**.

---

## 8. Best practices

Centralize **charset** in a **`private static final Charset UTF = StandardCharsets.UTF_8`** constant if your module reads many files.

**Log the path** on **`IOException`**—support staff need the **exact** filename.

---

## 9. Small practice task

Count **non-blank** lines in a temp file using **`BufferedReader`** only—no **`readString`**.

---

## Beginner tip

If **`NoSuchFileException`** appears, you looked **before** the file existed—print **`path.toAbsolutePath()`** once; typos hide in **relative** paths.
