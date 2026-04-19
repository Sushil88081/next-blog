---
title: "Chapter 136: Garbage Collection in Java — Pauses, Collectors G1 ZGC, and Practical Tuning Mindset"
description: "Understand Java garbage collection: unreachable object reclamation, stop-the-world pauses, G1 as default collector, ZGC Shenandoah for low latency goals, and logs versus guessing with flags."
category: "Java"
tags:
  - Java garbage collection tutorial
  - Java G1 GC
  - Java ZGC low latency
  - Java GC pause tuning
  - Java GC logs Xlog
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 136
---

# Chapter 136: Garbage Collection in Java

**Garbage collection** **reclaims** **heap** **objects** **unreachable** from **GC roots** (**stack references**, **static fields**, **JNI**, **active** **threads**). **Collectors** trade **throughput**, **pause times**, and **memory overhead** differently—**JDK** **defaults** evolved from **Parallel** → **G1** on **server-class** machines.

---

## 1. Topic title

**GC: automatic memory recycling with collector-specific pause and footprint trade-offs**

---

## 2. What it means

**Young collections** clear **short-lived** garbage **cheaply**; **old** collections **compact** **long-lived** graphs—**algorithms** differ (**mark-sweep-compact**, **regional** **G1**, **concurrent** **ZGC**).

**`System.gc()`** is a **hint**—**production** code rarely **calls** it; **tests** sometimes **`@Disabled`**.

**Logs** — **`-Xlog:gc*:file=gc.log:time,uptime,level,tags`** (flag **shape** varies by **JDK**) **turn** **mystery** **stutters** into **timelines**.

---

## 3. Why it is used

**Developer productivity**—**manual** **`free`** errors **vanish** at **the cost** of **pause** **awareness**.

**Elastic services**—**right-size** **heap** + **collector** with **SLO-driven** **evidence**, not **folklore**.

---

## 4. Mental sketch

**GC** is **roomba** **cleaning** while you **still** **walk** on the **rug**—sometimes it **pauses** to **lift chairs** (**stop-the-world** phases). **Different models** **bump furniture** **less often** but may **use more battery** (**CPU overhead**).

---

## 5. Java code example

```java
public class GcHintDemo {
    public static void main(String[] args) {
        for (int i = 0; i < 5_000_000; i++) {
            new Object();
        }
        System.out.println("allocated short-lived garbage");
    }
}
```

**Short-lived** allocations usually **die** in **young** **GC**—**watch** **logs**, not **`println`**, for **real** **behavior**.

---

## 6. Explanation of code

**Escape analysis** may **scalar replace** tiny **objects**—**microbenchmarks** **lie** without **`-prof gc`**.

---

## 7. Common mistakes

**Giant heaps** to “**fix**” **memory leaks**—**GC pauses** **grow**; **fix** **retained** **references**.

**Tuning without metrics**—**`-XX:+AlwaysPreTouch`** and **friends** **have** **costs**—**measure**.

---

## 8. Best practices

**Set container memory limits** **above** **`Xmx` + non-heap headroom** explicitly—**OOMKilled** vs **`Java heap space`** **diagnose** **differently**.

**Upgrade JDK** for **collector improvements** before **heroic flags**.

---

## 9. Small practice task

Enable **GC logging** on a **sample** app and **mark** **young** vs **old** **events** during a **warm-up** **load**—**correlate** with **p99 latency**.

---

## Beginner tip

If **latency spikes** align with **GC logs** on the **same** **second**, you found a **suspect**—**not** **proof** until **CPU**, **locks**, and **I/O** are **ruled out** too.
