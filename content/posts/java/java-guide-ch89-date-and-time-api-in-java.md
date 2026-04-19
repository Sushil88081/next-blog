---
title: "Chapter 89: Date and Time API in Java — LocalDate, LocalTime, ZonedDateTime, and Period vs Duration"
description: "Learn java.time: immutable values, LocalDate LocalTime LocalDateTime, ZoneId and ZonedDateTime, Period and Duration, DateTimeFormatter basics, and why legacy Date Calendar fade for new code."
category: "Java"
tags:
  - Java java.time
  - Java LocalDate LocalTime
  - Java ZonedDateTime
  - Java Period Duration
  - Java DateTimeFormatter
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 89
---

# Chapter 89: Date and Time API in Java

Java 8 introduced **`java.time`**—**immutable** value types for clocks and calendars. Prefer these types in **new** code instead of juggling **`java.util.Date`** and **`Calendar`** unless you are patching **old libraries**.

**Method references** (Chapter 88) show up in **`formatter`/`query`** style APIs occasionally; here the focus is **modeling time** clearly.

---

## 1. Topic title

**java.time: separate “calendar date” from “wall clock time” from “instant on the planet”**

---

## 2. What it means

- **`LocalDate`** — year-month-day **without** time zone (birthday, due date).
- **`LocalTime`** — time-of-day **without** zone (shop opens at 09:00).
- **`LocalDateTime`** — both **without** zone (meeting agenda draft).
- **`ZonedDateTime`** — instant meaning tied to **`ZoneId`** (flight departs **here**).
- **`Instant`** — **UTC** timeline point—great for **server logs** and **API timestamps**.
- **`Period`** — calendar **days/months/years** difference ( **`plusMonths(1)`** ).
- **`Duration`** — **seconds/nanos** between instants (timeouts).

---

## 3. Why it is used

**Thread-safe immutables**, **clear naming**, **fewer off-by-one timezone** bugs when you **pick the right type** for each layer.

---

## 4. Mental sketch

**`LocalDate`** is a **paper calendar page**. **`ZonedDateTime`** is that page **plus** which **city’s sunrise** you mean. **`Instant`** is **seconds since an agreed epoch**—good for **sorting events** globally.

---

## 5. Java code example

```java
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeDemo {
    public static void main(String[] args) {
        LocalDate today = LocalDate.of(2026, 4, 19);
        LocalTime meet = LocalTime.of(14, 30);
        LocalDateTime local = LocalDateTime.of(today, meet);
        ZonedDateTime tokyo = local.atZone(ZoneId.of("Asia/Tokyo"));
        System.out.println(tokyo);

        Duration gap = Duration.between(local, local.plusHours(2));
        System.out.println(gap.toMinutes());

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        System.out.println(fmt.format(local));
    }
}
```

**`atZone`** pins a **local** datetime to a **real offset ruleset**—DST changes live inside **`ZoneId`**, not in your **manual math**.

---

## 6. Explanation of code

**`Duration.between`** measures **elapsed** time on a timeline—here **two hours → 120 minutes**.

---

## 7. Common mistakes

**Storing `LocalDateTime` when you meant `Instant`**—servers in **two zones** disagree.

**Using `Period` for short timeouts**—use **`Duration`** for **sub-day** waits.

---

## 8. Best practices

Pass **`ZoneId`** from **config**, not hard-coded strings scattered everywhere—**`ZoneId.systemDefault()`** is fine for **local tools**, risky for **distributed** systems.

Log **`Instant`** plus **zone context** when debugging **customer-reported** “wrong hour” bugs.

---

## 9. Small practice task

Compute **`Period.between`** two **`LocalDate`** birthdays and print **years** component. Then add **`Duration.ofMinutes(90)`** to a **`LocalTime`** and print **overflow** across midnight using **`plus`** on **`LocalDateTime`**.

---

## Beginner tip

When tests fail only on **CI servers**, suspect **default zone** differs from your laptop—**pin zones** in tests with **`Clock` fixed** (advanced) or explicit **`ZoneId.of("UTC")`**.
