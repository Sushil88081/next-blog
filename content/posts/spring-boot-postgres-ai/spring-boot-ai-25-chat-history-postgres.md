---
title: "Store AI chat history in PostgreSQL (sessions and messages)"
description: "Add ChatSession and ChatMessage entities, persist user and assistant turns, and build the messages list you send to the model from the database."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - PostgreSQL
  - JPA
  - Chat
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 25
---

# Store AI chat history in PostgreSQL (sessions and messages)

**Introduction**

One-shot Q&A is enough for a demo. In a real app you **link** many **turns** to a **session** (user id + conversation id) so the client can **reload** history, your **UI** can show a **thread**, and the **LLM** call can include the **last N** messages for **context**. JPA + PostgreSQL fits: small rows, **indexed** by `session_id` and `created_at`.

**Real-world explanation**

- **Session** row — *who* and *when* it started; optional *title* after the first turn.
- **Message** row — *role* (`user`, `assistant`, sometimes `system`), *content* (text; **large** text → use `TEXT` in SQL / `@Lob` in JPA if you ever need multi‑MB, usually stay under a limit at the API).
- **Privacy** — the same PII and retention rules as any user generated content: delete on account delete, follow legal holds, etc.
- **Cost** — you do not send 10,000 past messages to the model; you **trim** to last **N** or **summary** the thread (out of scope here; start with a **cap**).

**Entities (sketch)**

`ChatSession.java` — one row per “conversation”.

```java
@Entity
@Table(name = "chat_sessions")
public class ChatSession {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String externalRef; // client or server-issued id for the same chat over reloads, UUID string

  @Column(nullable = false)
  private java.time.Instant createdAt = java.time.Instant.now();
}
```

`ChatMessage.java` — one row per turn.

```java
@Entity
@Table(name = "chat_messages", indexes = @Index(name = "ix_msg_session", columnList = "session_id,createdAt"))
public class ChatMessage {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional = false) @JoinColumn(name = "session_id")
  private ChatSession session;

  @Column(nullable = false, length = 16)
  private String role; // user, assistant, system

  @Column(nullable = false, columnDefinition = "text")
  private String content;

  @Column(nullable = false)
  private java.time.Instant createdAt = java.time.Instant.now();
}
```

**Repository**

```java
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
  java.util.List<ChatMessage> findBySessionIdOrderByCreatedAtAsc(Long sessionId);
}
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
  java.util.Optional<ChatSession> findByExternalRef(String externalRef);
}
```

**API shape**

- **POST** `/api/chat/sessions` with `{}` (or a title) → `201` with `sessionId` and `externalRef` (or return only `sessionKey` a client stores).
- **POST** `/api/chat/sessions/{sessionId}/messages` with `{ "message": "Hi" }`  
  1) Save `user` row.  
  2) Load history (last, say, 50) into `List<Map<role,content>>`.  
  3) Call the LLM.  
  4) Save `assistant` row.  
  5) Return `{ "reply": "…" }`.

**Load history for the model**

```java
List<Map<String, String>> messages = history.stream()
    .map(m -> Map.of("role", m.getRole(), "content", m.getContent()))
    .toList();
// Build JSON like in chapter 24: { "model": ..., "messages": [ {role, content}, ... ] }
```

**Folder structure**

```text
model/ChatSession.java, ChatMessage.java
repository/ChatSessionRepository.java, ChatMessageRepository.java
service/ChatTranscriptService.java
web/ChatSessionController.java, ChatMessageController.java (or one nested resource controller)
```

**Common mistakes**

- Storing the **entire** prompt including **system** instructions in the same table you expose to the user — use a **separate** internal **field** or **rebuild** system from **code** on each call.
- **N+1** queries: **eager** load **one** **session** with **messages** with **`@Query`** **+** **`JOIN`** **+** **DTO** for **read**; or **paged** list by **session** only.
- **Unbounded** **history** in the model request — add **`limit`** and optional **pruning** job for **very** long threads.

**Best practices**

- **`@Transactional`** on the **method** that **saves** user message + **calls** model + **saves** reply so a **failed** model call does **not** **leave** only half the turn (or use **outbox** pattern for stricter **exactly**-**once** semantics, advanced).
- **Index** `(session_id, created_at)` as shown.
- **Migrations** with **Flyway** for `chat_messages` in **prod** instead of **`ddl-auto=update`**.

**Final summary**

**Sessions** + **messages** in **PostgreSQL** is the **simplest** way to get **durable** **chat** **and** a **reproducible** `messages` array for the next **LLM** **call**. Next: how **this** all **hangs** together in a **one**-**page** **architecture** diagram and **responsibility** list.
