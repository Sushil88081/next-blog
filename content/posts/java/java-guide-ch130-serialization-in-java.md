---
title: "Chapter 130: Serialization in Java — Serializable, serialVersionUID, JSON vs Java Binary"
description: "Understand Java serialization: Serializable marker, serialVersionUID, ObjectOutputStream risks, evolution rules, and why production services prefer JSON or protobuf over native binary serialization."
category: "Java"
tags:
  - Java Serializable
  - Java serialVersionUID
  - Java ObjectOutputStream
  - Java serialization vs JSON
  - Java deserialization security
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 130
---

# Chapter 130: Serialization in Java

**Java serialization** turns **object graphs** into **bytes** via **`ObjectOutputStream`** / **`ObjectInputStream`** for types implementing **`java.io.Serializable`**. It was **the** **default** **RMI-era** **solution**; **today** **JSON**, **Protocol Buffers**, and **Avro** dominate **service** boundaries because they are **safer**, **versionable**, and **cross-language**.

You still **meet `Serializable`** on **`Throwable`**, **Swing** legacies, and **some** **caching** **APIs**—know the **rules**, **avoid** **blind** **`readObject`**.

---

## 1. Topic title

**Serialization: byte snapshot of an object graph—brittle across versions and dangerous if untrusted**

---

## 2. What it means

**`Serializable`** is a **marker**—no **methods**, but **opts in** to **JVM** **machinery**.

**`serialVersionUID`** **locks** **compatibility** expectations—**change** it when you **accept** **breaking** old **streams**, or **keep** stable when **fields** evolve **carefully** with **`serialPersistentFields`** / **custom** **`readObject`**.

**`transient`** fields **skip** **default** **serialization**; **`Externalizable`** gives **full manual** control.

---

## 3. Why it is used

**Distributed caches** (**session replication**) sometimes **still** store **Serializable** **blobs**.

**JDK tools** (**deep copies** in **tests**) occasionally **serialize round-trip** as a **hack**.

---

## 4. Mental sketch

Binary Java serialization is **shrink-wrapping** your **living room furniture** for **shipping**—works **once** if **nothing** **moves**; **add a lamp** and **customs** (**another JVM version**) may **reject** the **crate**.

---

## 5. Java code example

```java
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

public class SerializationDemo implements Serializable {
    private static final long serialVersionUID = 1L;
    private final String msg;

    public SerializationDemo(String msg) {
        this.msg = msg;
    }

    @Override
    public String toString() {
        return msg;
    }

    public static void main(String[] args) throws Exception {
        SerializationDemo orig = new SerializationDemo("hi");
        byte[] bytes;
        try (ByteArrayOutputStream bos = new ByteArrayOutputStream();
                ObjectOutputStream oos = new ObjectOutputStream(bos)) {
            oos.writeObject(orig);
            bytes = bos.toByteArray();
        }
        try (ObjectInputStream ois = new ObjectInputStream(new ByteArrayInputStream(bytes))) {
            Object back = ois.readObject();
            System.out.println(back);
        }
    }
}
```

**Only deserialize data you trust**—**gadget chains** turned **`readObject`** into a **historic** **attack surface**.

---

## 6. Explanation of code

**`writeObject` / `readObject`** hooks let you **migrate** **schema**—**complex**; **prefer** **explicit DTO** **mappers** for **new** designs.

---

## 7. Common mistakes

**Default serialization of large graphs**—**slow**, **memory** spikes.

**Missing `serialVersionUID`**—**IncompatibleClassChangeError** surprises after **small** **refactors**.

---

## 8. Best practices

**Filter incoming streams** with **`ObjectInputFilter`** (**whitelist** classes) when **binary** **format** is **unavoidable**.

**Log schema versions** alongside **payloads** in **queues** you **own**.

---

## 9. Small practice task

Add a **field** to **`SerializationDemo`**, **bump** **`serialVersionUID`**, and observe **`InvalidClassException`** when **reading** **old bytes**—then **document** the **lesson**.

---

## Beginner tip

If a **security review** flags **`ObjectInputStream`**, assume **valid** until **proven** **filtered**—**JSON** **parsers** can **also** **blow up** on **deep** nesting; **defense** is **layered**.
