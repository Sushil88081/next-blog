---
title: "Chapter 116: JSON Request and Response in Java — Content-Type, Escaping, and Parsing Choices"
description: "Work with JSON over HTTP in Java: set Content-Type and Accept, build JSON strings safely, avoid manual parsing at scale, and choose Jackson or Gson vs minimal hand-built JSON for learning."
category: "Java"
tags:
  - Java JSON HTTP
  - Java HttpClient JSON body
  - Java Content-Type application json
  - Java escape JSON string
  - Java Jackson vs manual JSON
image: "/assets/images/java.png"
author: "Sushil Kumar"
series: java-complete-learning-guide
chapter: 116
---

# Chapter 116: JSON Request and Response in Java

**JSON** (**JavaScript Object Notation**) is the **dominant** **text** representation for **REST** bodies—**objects** **`{}`**, **arrays** **`[]`**, **strings** in **double quotes**, **numbers**, **`true`/`false`/`null`**. The **JDK** does not ship a **full JSON parser** in **`java.base`**—**production** code uses **Jackson**, **Gson**, **Moshi**, or **JSON-B**; **learning** code can **build strings** carefully like Chapter 65.

---

## 1. Topic title

**JSON over HTTP: declare types with headers; escape strings; validate shape before acting**

---

## 2. What it means

**Request headers** — **`Content-Type: application/json`** on **POST/PUT/PATCH** with a **JSON body**; **`Accept: application/json`** asks for **JSON** responses (servers may **ignore**, but **polite**).

**Escaping** — **backslash** before **`"`**, **`\`**, **control chars**; **Unicode** allowed—**never** **concatenate** **raw user text** without **escaping** or **library** **serializers**.

**Parsing** — **walk** to **fields** you need; **libraries** map to **`record`** / **POJO** types with **annotations**.

---

## 3. Why it is used

**Browser-native** **`fetch`** and **mobile** stacks **speak JSON** fluently.

**Schema evolution** — **optional fields** and **version** properties ease **rollouts** when paired with **compatibility rules**.

---

## 4. Mental sketch

JSON is a **postcard** with **labeled lines**—**machine-readable** **handwriting**. **XML** was the **multi-page form**; **Protobuf** is the **shrink-wrapped binary**—JSON trades **size** for **human** **debuggability**.

---

## 5. Java code example

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class JsonPostDemo {
    static String jsonUser(String name, int age) {
        String safe = name.replace("\\", "\\\\").replace("\"", "\\\"");
        return "{\"name\":\"" + safe + "\",\"age\":" + age + "}";
    }

    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        String body = jsonUser("Ada", 36);
        HttpRequest req = HttpRequest.newBuilder(URI.create("https://httpbin.org/post"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body, StandardCharsets.UTF_8))
                .build();
        HttpResponse<String> res = client.send(req, HttpResponse.BodyHandlers.ofString());
        System.out.println(res.statusCode());
        System.out.println(res.body().substring(0, Math.min(300, res.body().length())));
    }
}
```

**`httpbin/post`** echoes **JSON** inside a **wrapper**—good for **inspecting** **what arrived**.

---

## 6. Explanation of code

**Tiny escaper** handles **backslash and quote**—still **not** **production-grade** (**Unicode**, **control chars**); **Jackson**’s **`ObjectMapper.writeValueAsString`** is the **real** tool once you add the **dependency**.

---

## 7. Common mistakes

**Wrong `Content-Type`** with **JSON body**—frameworks and **firewalls** **mis-route** or **strip** bodies.

**Parsing with regex**—brittle; use a **parser** even for **throwaway** tools.

---

## 8. Best practices

Add **`charset=utf-8`** when sending **text** bodies if **servers** require **explicit** charset.

**Bound response size** when calling **untrusted** origins—**stream** with **limits** where APIs allow.

---

## 9. Small practice task

Add a **`"`** inside **`name`** (e.g. **`Al"ice`**) and confirm **`jsonUser`** still produces **valid JSON**; then imagine **`\n`** inside **`name`** and list **what** your **tiny escaper** **still misses**.

---

## Beginner tip

**Pretty-printed JSON** in **logs** is **friendly** in **dev**; in **prod**, **structured logging** (**JSON lines**) often beats **multiline** blobs for **grep** and **SIEM** ingestion.
