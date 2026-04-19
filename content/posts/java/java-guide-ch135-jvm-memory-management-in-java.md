---
title: "Chapter 135: JVM Memory Management in Java — Heap, Stack, Metaspace, and Native Off-Heap"
description: "Map JVM memory regions: heap generations for objects, thread stacks and frames, metaspace for class metadata, direct buffers and native memory, and how flags like Xmx Xms relate to tuning."
category: "Java"
tags:
  - Java JVM memory model
  - Java heap stack metaspace
  - Java Xmx Xms heap size
  - Java native memory JVM
  - Java JVM memory regions
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 135
---

# Chapter 135: JVM Memory Management in Java

The **JVM** splits memory into **regions** with **different lifetimes and collectors**. **Objects** usually live in the **heap**; **local variables and call frames** live on **per-thread stacks**; **class metadata** moved from **PermGen** to **Metaspace** (mostly **native**) on **modern** JDKs; **NIO direct buffers** and **JNI** allocate **off-heap** memory **still** **charged** to your **process**.

---

## 1. Topic title

**Memory management: know heap vs stack vs metadata vs native to read metrics and crashes**

---

## 2. What it means

**Heap** — shared by **all threads**; **young** (**Eden**, **Survivor**) vs **old** (**Tenured**) **conceptually** describe **object aging** for **generational** collectors.

**Stack** — **primitive** and **reference slots** for **active** **methods**; **depth** limits prevent **infinite recursion** **`StackOverflowError`**.

**Metaspace** — **class** **metadata**; **`-XX:MaxMetaspaceSize`** caps it—**leaks** from **dynamic proxies** still **hurt**.

**Native memory** — **GC threads**, **JIT code cache**, **mapped jars**—watch **RSS** vs **heap** **only** metrics.

---

## 3. Why it is used

**Tuning** **`Xmx`/`Xms`** balances **tail latency** vs **cost** on **VMs**.

**Diagnosing OOME** types—**`Java heap space`**, **`Metaspace`**, **`Direct buffer memory`**—**point** to **different** **fixes**.

---

## 4. Mental sketch

**Heap** is the **shared warehouse**; **stack** is each **worker’s clipboard**; **metaspace** is the **HR filing cabinet** of **who works here**; **native** is **the parking lot** you **still** **pay rent** on even if **warehouse** **looks empty**.

---

## 5. Java code example

```java
public class MemorySketch {
    private static final Object[] KEEP = new Object[1];

    public static void main(String[] args) {
        Runtime rt = Runtime.getRuntime();
        long heap = rt.maxMemory();
        System.out.println("max heap bytes ~ " + heap);
        KEEP[0] = new byte[1024 * 1024]; // 1 MiB object on heap
    }
}
```

**`Runtime.maxMemory`** reflects **`-Xmx`** **ceiling**—**actual** **usage** **oscillates** with **allocation** **rate** and **GC**.

---

## 6. Explanation of code

**`totalMemory` / `freeMemory`** are **coarse**—**prefer** **`MemoryMXBean`** or **Micrometer** **`jvm.memory.*`** for **graphs**.

---

## 7. Common mistakes

**Setting `Xmx` == physical RAM`**—**OS** and **native** **need** **headroom**—**swap thrash** follows.

**Ignoring direct memory** when tuning **heap-only**—**`OutOfMemoryError: Direct buffer memory`** **surprises** **Netty** users.

---

## 8. Best practices

Capture **`-XX:+ExitOnOutOfMemoryError`** in **containers** so **orchestrators** **restart** **cleanly**.

**Heap dumps** (**`-XX:+HeapDumpOnOutOfMemoryError`**) on **staging** **before** **first** **prod** **launch**.

---

## 9. Small practice task

Run **`jcmd <pid> VM.native_memory summary`** on a **local** **Spring Boot** app and **label** **top** **categories** in your **notes**.

---

## Beginner tip

**`top` RES growing while heap flat** often means **metaspace**, **threads**, or **native** **allocators**—**do not** **blame** **GC** **first**.
