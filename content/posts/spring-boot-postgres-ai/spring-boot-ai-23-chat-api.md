---
title: "Create a chat-style REST API in Spring Boot"
description: "Add request and response DTOs, a ChatController, and a service interface so you can plug the model implementation in the next post."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - REST
  - Spring Boot
  - Chat
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 23
---

# Create a chat-style REST API in Spring Boot

**Introduction**

A **chat** **API** for **our** **series** accepts a **user** **message** (and optional **session** **id**) and **returns** an **assistant** **reply** **string**. We **separate** **the** **HTTP** **shape** from **the** **AI** **call** with **`ChatService`** and **`LlmClient`**-style **interfaces** so the **next** post can **swap** **providers** (OpenAI, Ollama, **Azure** OpenAI) by **config** only.

**Real-world explanation**

- **POST** `/api/chat` with JSON body, **201** or **200** (pick **one** and **document**; here **200** with a **synthetic** **id** is fine)
- **Id** **in** the **path** is **separate** from the **“conversation”** **id** **we** will **use** in **persistence** (next **posts**)
- **Validation** — max **length** on **the** **message** to **control** **cost** and **abuse**

**Step-by-step: DTOs**

`dto/ChatRequest.java`

```java
package com.example.demoservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChatRequest(
    @NotBlank
    @Size(max = 8000) String message
) { }
```

`dto/ChatResponse.java`

```java
public record ChatResponse(
    String reply
) { }
```

**Service interface (implementation in next post)**

```java
package com.example.demoservice.service;

public interface ChatService {
  String replyToUserMessage(String userMessage);
}
```

**Controller**

```java
package com.example.demoservice.web;

import com.example.demoservice.dto.*;
import com.example.demoservice.service.ChatService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

  private final ChatService chatService;

  public ChatController(ChatService chatService) {
    this.chatService = chatService;
  }

  @PostMapping
  public ChatResponse ask(@RequestBody @Valid ChatRequest request) {
    String text = chatService.replyToUserMessage(request.message());
    return new ChatResponse(text);
  }
}
```

**Wiring: provide a `ChatService` @Bean of your implementation** in the next article (a `@Service` that calls the **LLM**).

**Common mistakes**

- **Blocking** the **EventLoop** **does** not **apply** to **Servlet** stack by **default**—**still** set **sensible** **timeouts** on the **outbound** **client**
- **Echoing** **unescaped** model **text** in **HTML** in a **future** **web** **view** would need **escaping**; **here** it is **JSON** only
- **No** **input** **length** **limit** = **bills** and **DoS** **risk**

**Best practices**

- **Rate** **limit** (bucket per **user** or **IP**) before **or** in **conjunction** with **this** **endpoint** in **production**
- **Structured** **logging** with a **request** **id** (MDC) so support can **correlate** user report with **one** line in **Kibana**/**CloudWatch** later
- **Feature** **flag** the **path** in **config** for **staged** **rollout**

**Final summary**

You have a **clean** **REST** **face** for **“send message, get reply.”** The next post connects `ChatService` to a real model over HTTP with keys from the environment.
