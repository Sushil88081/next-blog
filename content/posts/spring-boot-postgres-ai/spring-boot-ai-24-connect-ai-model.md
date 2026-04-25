---
title: "Connect Spring Boot to a remote language model (OpenAI-compatible API)"
description: "Implement ChatService with RestClient, read base URL and API key from configuration, and parse JSON in a way you can test without calling the real API every time."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - OpenAI
  - RestClient
  - Spring Boot
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 24
---

# Connect Spring Boot to a remote language model (OpenAI-compatible API)

**Introduction**

Many providers (OpenAI, some on-prem gateways, Ollama in OpenAI-compatible mode) use the same JSON shape for chat: **POST** `/v1/chat/completions` with a `model` and `messages` array, and a response with `choices[0].message.content` for the assistant text. This post uses Spring 6’s **`RestClient`**, **Jackson** to build a JSON string body (so `content` is always safely escaped), and **`JsonNode`** to read the reply. If your team adopts **Spring AI** later, you still keep the same `ChatService` port and swap the adapter.

**Real-world explanation**

- `Authorization: Bearer <key>` — never commit the key; set **`LLM_API_KEY`** (or `app.llm.api-key` from env) in your shell or host.
- In dev you might point at **`https://api.openai.com`**; for Ollama’s OpenAI mode you set **`https://api.openai.com` → `http://host.docker.internal:11434/v1`** (exact URL depends on your setup: base URL is **host + optional path prefix** only once).
- Set **HTTP timeouts** so a stuck provider does not hold a servlet thread until the process is killed (values depend on SLO: start with tens of seconds for LLMs).

**Configuration (`application.yml`)**

```yaml
app:
  llm:
    base-url: ${LLM_BASE_URL:https://api.openai.com}
    api-key: ${LLM_API_KEY:}
    model: ${LLM_MODEL:gpt-4o-mini}
```

**Binding class**

```java
package com.example.demoservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.llm")
public record LlmProperties(
    String baseUrl,
    String apiKey,
    String model
) { }
```

Enable with **`@EnableConfigurationProperties(LlmProperties.class)`** or **`@ConfigurationPropertiesScan`**.

**Service: `Map` + JSON string + `JsonNode` response**

```java
package com.example.demoservice.service;

import com.example.demoservice.config.LlmProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class OpenAiStyleChatService implements ChatService {

  private final LlmProperties props;
  private final ObjectMapper objectMapper;
  private final RestClient restClient;

  public OpenAiStyleChatService(LlmProperties props, ObjectMapper objectMapper) {
    this.props = props;
    this.objectMapper = objectMapper;
    this.restClient = RestClient.builder()
        .baseUrl(stripTrailingSlash(props.baseUrl()))
        .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + props.apiKey())
        .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
        .build();
  }

  @PostConstruct
  void requireKey() {
    if (!StringUtils.hasText(props.apiKey())) {
      throw new IllegalStateException("Set LLM_API_KEY (or app.llm.api-key) to enable chat.");
    }
  }

  @Override
  public String replyToUserMessage(String userMessage) {
    String json;
    try {
      json = objectMapper.writeValueAsString(
          Map.of(
              "model", props.model(),
              "messages", List.of(
                  Map.of("role", "user", "content", userMessage)
              )
          )
      );
    } catch (JsonProcessingException e) {
      throw new IllegalStateException("Failed to build JSON for LLM request", e);
    }
    // restClient 4xx/5xx: map RestClientException in your @ControllerAdvice, or add .onStatus on your version of RestClient
    JsonNode root = restClient
        .post()
        .uri("/v1/chat/completions")
        .body(json)
        .retrieve()
        .body(JsonNode.class);
    if (root == null) {
      return "";
    }
    return root.path("choices")
        .path(0)
        .path("message")
        .path("content")
        .asText("");
  }

  private static String stripTrailingSlash(String url) {
    if (url == null) {
      return "";
    }
    return url.replaceAll("/+$", "");
  }
}
```

**Optional typed DTOs**

If the provider’s JSON is stable, you can deserialize the response into records (`choices` → `message` → `content`) instead of `JsonNode` for stronger typing.

**Timeouts (example)**

`RestClient` accepts a `ClientHttpRequestFactory`. A common choice is the JDK 11+ client with connect/read timeouts, or a connection pool for high QPS. Wire this once in a `@Configuration` that exposes the `RestClient` as a **bean** and inject it into the service, instead of the inline `builder()` above, when you are ready to tune.

**Common mistakes**

- Storing the API key in the repo or logging request bodies that contain secrets.
- **Double** `/v1/...` in the URL: either base is `https://api.openai.com` and you use `.uri("/v1/chat/completions")`, or base already includes a path; pick one style and stick to it.
- No timeout: one slow call can block many threads on the servlet path under load.
- `String.format` to build JSON without `ObjectMapper` — you will break on quotes in user input.

**Best practices**

- In `@RestControllerAdvice`, map provider **429/503** to a clear 503/429 with a short, safe message; retry with backoff only where your product allows costs.
- Integration tests: mock the HTTP side (`MockWebServer` or `MockRestServiceServer`) so CI does not need a key.
- If you go past “single turn,” pass previous messages in the `messages` array; the next article stores them in PostgreSQL so you can rebuild that array on each call.

**Final summary**

`RestClient` + **`Map` / `ObjectMapper` for the request body** + **`JsonNode` for a minimal read path** is a small, testable way to call an OpenAI-style endpoint. The next post saves each user/assistant turn in PostgreSQL and threads `sessionId` through the API so conversations persist.
