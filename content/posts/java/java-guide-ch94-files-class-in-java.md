---
title: "Chapter 94: Files Class in Java — copy move walk exists mismatch, and Attribute Views"
description: "Use java.nio.file.Files for create delete copy move walk, isSameFile mismatch, probeContentType cautiously, and readAttributes for metadata without extra syscalls when possible."
category: "Java"
tags:
  - Java Files class
  - Java Files copy move
  - Java Files walk
  - Java readAttributes BasicFileAttributes
  - Java NIO Files tutorial
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 94
---

# Chapter 94: Files Class in Java

**`java.nio.file.Files`** is a **static toolbox** sitting beside **`Path`**. You already used **`readString`**, **`writeString`**, **`createTempFile`**. This chapter widens the drawer: **copy/move**, **tree walk**, **existence checks**, **metadata**.

**Try-with-resources** (Chapter 95) matters for **`walk`** streams.

---

## 1. Topic title

**Files: one-stop static helpers for common path operations**

---

## 2. What it means

- **`exists` / `notExists`** — beware **race conditions** between check and act—often prefer **`CREATE` options** or **atomic** moves.
- **`copy` / `move`** — take **`CopyOption`** / **`StandardCopyOption`** flags (**`REPLACE_EXISTING`**, **`ATOMIC_MOVE`** when supported).
- **`walk`** — depth-first stream of paths—**must** close stream or use **`try-with-resources`**.
- **`readAttributes`** — grab **size**, **modified time**, **directory flag** in one shot.

---

## 3. Why it is used

**Deployment scripts**, **cache eviction**, **bulk imports**, **static site generators**—any tool that **shuffles files**.

---

## 4. Mental sketch

If **`Path`** is the **address**, **`Files`** is the **moving company**—boxes, tape, insurance forms included.

---

## 5. Java code example

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributes;

public class FilesClassDemo {
    public static void main(String[] args) throws IOException {
        Path dir = Files.createTempDirectory("demo-tree");
        Path a = dir.resolve("a.txt");
        Path b = dir.resolve("b.txt");
        Files.writeString(a, "hello");
        Files.copy(a, b, StandardCopyOption.REPLACE_EXISTING);

        BasicFileAttributes attr = Files.readAttributes(b, BasicFileAttributes.class);
        System.out.println("size=" + attr.size() + " regular=" + attr.isRegularFile());

        try (java.util.stream.Stream<Path> stream = Files.walk(dir)) {
            long txtCount = stream.filter(p -> p.toString().endsWith(".txt")).count();
            System.out.println("txt files=" + txtCount);
        }

        Files.walkFileTree(dir, new java.nio.file.SimpleFileVisitor<>() {
            @Override
            public java.nio.file.FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                Files.deleteIfExists(file);
                return java.nio.file.FileVisitResult.CONTINUE;
            }

            @Override
            public java.nio.file.FileVisitResult postVisitDirectory(Path d, IOException exc) throws IOException {
                Files.deleteIfExists(d);
                return java.nio.file.FileVisitResult.CONTINUE;
            }
        });
    }
}
```

**`walk` stream** counts **`.txt`** entries. **`SimpleFileVisitor`** deletes **files then directories**—teaching pattern only; production deletes need **error policy**.

---

## 6. Explanation of code

**`REPLACE_EXISTING`** avoids **`FileAlreadyExistsException`** on **`copy`**.

---

## 7. Common mistakes

**Walking without depth limit** on **deep trees**—pass **`maxDepth`** overload when exploring **unknown** trees.

**Following symlinks accidentally**—**`FileVisitOption.FOLLOW_LINKS`** can **loop**; default **no follow** is safer for **deletes**.

---

## 8. Best practices

Prefer **`Files.isSameFile(a,b)`** over **`path.equals`** when comparing **possible symlinks**.

Use **`probeContentType`** only as a **hint**—sniffing bytes is safer for **security** decisions.

---

## 9. Small practice task

Create **two** temp files with the **same text**, then **`Files.mismatch(a,b)`**—print the **byte offset** of first difference (should be **`-1`** when identical).

---

## Beginner tip

If **`AccessDeniedException`** surprises you, run with **fewer privileges** in tests—catching permission issues early beats **production-only** discovery.
