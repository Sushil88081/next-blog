---
title: "Full Spring Boot + PostgreSQL CRUD app ."
description: "Maven project, YAML config, and Java source for Item CRUD (create, read, list, update, delete) on PostgreSQL. Run with Docker for Postgres and mvnw spring-boot:run."
category: "Spring Boot + PostgreSQL + AI"
tags:
  - CRUD
  - PostgreSQL
  - Spring Boot
  - copy-paste
image: "/assets/java/java.png"
author: "Sushil Kumar"
series: spring-boot-postgres-ai
chapter: 29
---

# Full Spring Boot + PostgreSQL CRUD app — copy, paste, and run

This is a **single end-to-end reference** for a minimal **Item** resource: **C**reate, **R**ead, **L**ist, **U**pdate, **D**elete, talking to **PostgreSQL** with **Spring Data JPA** and a **JSON REST API**. Copy the files into a folder structure as below, then run **PostgreSQL** and the app with the **run** section at the bottom.

**What you get**

- `POST   /api/items` — create
- `GET    /api/items` — list all
- `GET    /api/items/{id}` — get one
- `PUT    /api/items/{id}` — full update
- `DELETE /api/items/{id}` — delete
- `application.yml` using **env** for URL/user/password
- JPA can **create/alter** tables in `dev` when `ddl-auto` is `update` (use Flyway for real production)

---

## 1) Folder layout

Create a Maven project (or `spring init` with Web + JPA + PostgreSQL + Lombok + Validation) and use this tree:

```text
demo-service/
  pom.xml
  src/main/java/com/example/demoservice/
    DemoServiceApplication.java
    exception/NotFoundException.java
    model/Item.java
    repository/ItemRepository.java
    service/ItemService.java
    dto/CreateItemRequest.java
    dto/ItemResponse.java
    dto/UpdateItemRequest.java
    web/ItemController.java
    web/RestExceptionHandler.java
  src/main/resources/
    application.yml
```

**Package** — `com.example.demoservice` (change the folder path if you rename the package; keep it consistent in every file).

---

## 2) `pom.xml`

**Replace** `groupId` / `artifactId` if you use your own coordinates. This uses **Java 17** and **Spring Boot 3.2+** (adjust `parent` version in a real file if you generate from start.spring.io).

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.5</version>
    <relativePath/>
  </parent>

  <groupId>com.example</groupId>
  <artifactId>demo-service</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <name>demo-service</name>
  <description>CRUD with PostgreSQL</description>

  <properties>
    <java.version>17</java.version>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-devtools</artifactId>
      <scope>runtime</scope>
      <optional>true</optional>
    </dependency>
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <optional>true</optional>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
```

---

## 3) `src/main/resources/application.yml`

```yaml
server:
  port: 8080

spring:
  application:
    name: demo-service
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/demo}
    username: ${DB_USER:demo}
    password: ${DB_PASSWORD:demo}
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: ${JPA_DDL:update}
    show-sql: false
    open-in-view: false
    properties:
      hibernate:
        format_sql: true
```

- **`spring.jpa.hibernate.ddl-auto: update`** — in dev, Hibernate can **create/alter** tables. For **production** use `validate` (or `none`) and **Flyway** migrations; do **not** rely on `update` there.

---

## 4) `DemoServiceApplication.java`

```java
package com.example.demoservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoServiceApplication {
  public static void main(String[] args) {
    SpringApplication.run(DemoServiceApplication.class, args);
  }
}
```

---

## 5) `model/Item.java`

```java
package com.example.demoservice.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "items")
public class Item {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 200)
  private String name;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt = Instant.now();

  protected Item() {}

  public Item(String name) {
    this.name = name;
  }

  public Long getId() { return id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public Instant getCreatedAt() { return createdAt; }
}
```

---

## 6) `repository/ItemRepository.java`

```java
package com.example.demoservice.repository;

import com.example.demoservice.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
```

---

## 7) DTOs

`dto/CreateItemRequest.java`

```java
package com.example.demoservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateItemRequest(
    @NotBlank @Size(max = 200) String name
) {}
```

`dto/UpdateItemRequest.java`

```java
package com.example.demoservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateItemRequest(
    @NotBlank @Size(max = 200) String name
) {}
```

`dto/ItemResponse.java`

```java
package com.example.demoservice.dto;

import com.example.demoservice.model.Item;
import java.time.Instant;

public record ItemResponse(Long id, String name, Instant createdAt) {
  public static ItemResponse from(Item e) {
    return new ItemResponse(e.getId(), e.getName(), e.getCreatedAt());
  }
}
```

---

## 8) `exception/NotFoundException.java` (add before the service; used by it)

```java
package com.example.demoservice.exception;

public class NotFoundException extends RuntimeException {
  public NotFoundException(String message) {
    super(message);
  }
}
```

---

## 9) `service/ItemService.java`

```java
package com.example.demoservice.service;

import com.example.demoservice.exception.NotFoundException;
import com.example.demoservice.model.Item;
import com.example.demoservice.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ItemService {

  private final ItemRepository itemRepository;

  public ItemService(ItemRepository itemRepository) {
    this.itemRepository = itemRepository;
  }

  @Transactional
  public Item create(String name) {
    return itemRepository.save(new Item(name.trim()));
  }

  @Transactional(readOnly = true)
  public List<Item> listAll() {
    return itemRepository.findAll();
  }

  @Transactional(readOnly = true)
  public Item getById(Long id) {
    return itemRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Item not found: " + id));
  }

  @Transactional
  public Item updateName(Long id, String newName) {
    Item item = getById(id);
    item.setName(newName.trim());
    return item;
  }

  @Transactional
  public void delete(Long id) {
    if (!itemRepository.existsById(id)) {
      throw new NotFoundException("Item not found: " + id);
    }
    itemRepository.deleteById(id);
  }
}
```

---

## 10) `web/ItemController.java`

```java
package com.example.demoservice.web;

import com.example.demoservice.dto.*;
import com.example.demoservice.model.Item;
import com.example.demoservice.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

  private final ItemService itemService;

  public ItemController(ItemService itemService) {
    this.itemService = itemService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ItemResponse create(@RequestBody @Valid CreateItemRequest body) {
    return ItemResponse.from(itemService.create(body.name()));
  }

  @GetMapping
  public List<ItemResponse> list() {
    return itemService.listAll().stream().map(ItemResponse::from).toList();
  }

  @GetMapping("/{id}")
  public ItemResponse get(@PathVariable Long id) {
    return ItemResponse.from(itemService.getById(id));
  }

  @PutMapping("/{id}")
  public ItemResponse update(@PathVariable Long id, @RequestBody @Valid UpdateItemRequest body) {
    return ItemResponse.from(itemService.updateName(id, body.name()));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    itemService.delete(id);
  }
}
```

---

## 11) `web/RestExceptionHandler.java` (map 404 to HTTP)

```java
package com.example.demoservice.web;

import com.example.demoservice.exception.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class RestExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<Map<String, String>> notFound(NotFoundException ex) {
    return ResponseEntity
        .status(HttpStatus.NOT_FOUND)
        .body(Map.of("error", ex.getMessage()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> badRequest(MethodArgumentNotValidException ex) {
    String msg = ex.getBindingResult().getFieldErrors().stream()
        .map(fe -> fe.getField() + ": " + fe.getDefaultMessage())
        .collect(Collectors.joining(", "));
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(Map.of("error", msg));
  }
}
```

---

## 12) Optional: one-command PostgreSQL with Docker

```bash
docker run --name pg-demo -e POSTGRES_USER=demo -e POSTGRES_PASSWORD=demo -e POSTGRES_DB=demo -p 5432:5432 -d postgres:16
```

Then either **export** env in your shell:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/demo
export DB_USER=demo
export DB_PASSWORD=demo
export JPA_DDL=update
```

Or leave defaults in `application.yml` (they already match the Docker command above, except ensure **username/password/db** are `demo`).

**Create DB manually** (without Docker) example:

```bash
createdb -U postgres demo
psql -U postgres -c "CREATE USER demo WITH PASSWORD 'demo';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE demo TO demo;"
```

(Tune to your local Postgres; match `application.yml`.)

---

## 13) Build and run

```bash
cd demo-service
./mvnw -DskipTests package
java -jar target/demo-service-0.0.1-SNAPSHOT.jar
```

Or during development:

```bash
./mvnw spring-boot:run
```

**Health check** — open or curl:

- `http://localhost:8080/api/items` — should return `[]` the first time.

**Try CRUD** (use **curl** or Postman):

```bash
# Create
curl -s -X POST http://localhost:8080/api/items -H "Content-Type: application/json" -d '{"name":"Alpha"}'

# List
curl -s http://localhost:8080/api/items

# Get by id (replace 1)
curl -s http://localhost:8080/api/items/1

# Update
curl -s -X PUT http://localhost:8080/api/items/1 -H "Content-Type: application/json" -d '{"name":"Alpha renamed"}'

# Delete
curl -s -X DELETE http://localhost:8080/api/items/1
```

---

## 14) Notes

- **Lombok** is in `pom.xml` for optional use; the Java above does **not** use Lombok annotations, so the project compiles as-is. You can remove the Lombok dependency if you like.
- If you do not have the Maven **wrapper** (`mvnw`), use **`mvn package`** and **`mvn spring-boot:run`** instead, or add the wrapper with `mvn -N io.takari:maven:wrapper` (once).
- For **production**: switch `ddl-auto` to `validate`, add **Flyway** migrations, use **strong** DB credentials from a **secret store**, and do not expose the DB to the public internet.
