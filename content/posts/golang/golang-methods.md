---
title: "Go Methods - Complete Guide"
date: "2026-03-31"
description: "Learn Go methods with simple examples. Understand value vs pointer receivers, methods with interfaces, and build a beginner-friendly REST API using interfaces and methods."
category: "Go Basics"
tags: ["golang", "methods", "interfaces", "rest-api", "programming"]
image: "/assets/images/golang.jpg"
author: "Sushil Kumar"
---

# Go Methods - Complete Guide

Methods are one of the most important parts of Go. They let you attach behavior to your custom types.

If structs are your data, methods are the actions you can perform on that data.

## What is a Method?

A method is a function with a receiver. The receiver tells Go which type this method belongs to.

```go
type Person struct {
    Name string
}

func (p Person) Greet() string {
    return "Hello, " + p.Name
}
```

In this example:

- `Person` is the type
- `Greet()` is the method
- `(p Person)` is the receiver

## Why Methods are Useful

Methods help you:

- Keep related code together
- Make code easier to read
- Create reusable behavior on types

Without methods, you would pass structs into normal functions all the time.

## Basic Method Example

```go
package main

import "fmt"

type Rectangle struct {
    Width  float64
    Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func main() {
    rect := Rectangle{Width: 10, Height: 5}
    fmt.Println(rect.Area()) // 50
}
```

`Area()` belongs to `Rectangle`, so calling `rect.Area()` feels natural.

## Value Receiver vs Pointer Receiver

This is a very important topic for beginners.

### Value Receiver

Works on a copy of the struct.

```go
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}
```

Use value receiver when:

- You only read data
- You do not modify fields
- Struct is small

### Pointer Receiver

Works on the original struct.

```go
func (r *Rectangle) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}
```

Use pointer receiver when:

- You need to modify data
- Struct is large (avoid copying)
- You want consistent method behavior

### Full Example

```go
package main

import "fmt"

type Counter struct {
    Count int
}

// Value receiver (copy)
func (c Counter) Show() {
    fmt.Println("Count:", c.Count)
}

// Pointer receiver (original)
func (c *Counter) Increment() {
    c.Count++
}

func main() {
    c := Counter{Count: 1}

    c.Show()        // Count: 1
    c.Increment()
    c.Show()        // Count: 2
}
```

## Methods on Different Types

Methods are not only for structs. You can attach methods to custom named types too.

```go
package main

import "fmt"

type Celsius float64

func (c Celsius) ToFahrenheit() float64 {
    return float64(c)*9/5 + 32
}

func main() {
    temp := Celsius(25)
    fmt.Println(temp.ToFahrenheit()) // 77
}
```

## Methods + Interfaces (Core Go Concept)

Interfaces define behavior using method signatures.

```go
type Speaker interface {
    Speak() string
}
```

Any type that has `Speak() string` satisfies this interface automatically.

### Interface Example with Methods

```go
package main

import "fmt"

type Speaker interface {
    Speak() string
}

type Dog struct {
    Name string
}

func (d Dog) Speak() string {
    return "Woof! I am " + d.Name
}

type Cat struct {
    Name string
}

func (c Cat) Speak() string {
    return "Meow! I am " + c.Name
}

func PrintSound(s Speaker) {
    fmt.Println(s.Speak())
}

func main() {
    dog := Dog{Name: "Buddy"}
    cat := Cat{Name: "Luna"}

    PrintSound(dog)
    PrintSound(cat)
}
```

### Important Go Rule

Go does not use an `implements` keyword.

If a type has the required methods, it satisfies the interface automatically.

## Pointer Receiver and Interfaces

This is a common interview and beginner question.

```go
package main

import "fmt"

type Updater interface {
    UpdateName(name string)
}

type User struct {
    Name string
}

func (u *User) UpdateName(name string) {
    u.Name = name
}

func main() {
    user := User{Name: "John"}

    // var up Updater = user // Error: User does not implement Updater
    var up Updater = &user   // Correct: *User implements Updater

    up.UpdateName("Johnny")
    fmt.Println(user.Name) // Johnny
}
```

Because the method receiver is `*User`, the interface expects a pointer.

## REST API Using Interfaces + Methods

Now let us build a beginner-friendly REST API design.

Goal:

- Keep business logic in a service
- Keep HTTP logic in a handler
- Use interface to make code flexible and testable

### Step 1: Define Model

```go
type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}
```

### Step 2: Define Service Interface (Methods Contract)

```go
type UserService interface {
    GetAllUsers() []User
    GetUserByID(id int) (User, bool)
    CreateUser(name string) User
}
```

This interface says what methods a user service must have.

### Step 3: Implement Service with Struct + Methods

```go
type InMemoryUserService struct {
    users  []User
    nextID int
}

func NewInMemoryUserService() *InMemoryUserService {
    return &InMemoryUserService{
        users:  []User{},
        nextID: 1,
    }
}

func (s *InMemoryUserService) GetAllUsers() []User {
    return s.users
}

func (s *InMemoryUserService) GetUserByID(id int) (User, bool) {
    for _, u := range s.users {
        if u.ID == id {
            return u, true
        }
    }
    return User{}, false
}

func (s *InMemoryUserService) CreateUser(name string) User {
    user := User{ID: s.nextID, Name: name}
    s.users = append(s.users, user)
    s.nextID++
    return user
}
```

### Step 4: HTTP Handler Uses Interface

```go
type UserHandler struct {
    service UserService
}

func NewUserHandler(service UserService) *UserHandler {
    return &UserHandler{service: service}
}
```

### Step 5: Add HTTP Methods

```go
package main

import (
    "encoding/json"
    "net/http"
    "strconv"
    "strings"
)

func (h *UserHandler) GetUsers(w http.ResponseWriter, r *http.Request) {
    users := h.service.GetAllUsers()
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
    // Example path: /users/2
    idStr := strings.TrimPrefix(r.URL.Path, "/users/")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        http.Error(w, "invalid user id", http.StatusBadRequest)
        return
    }

    user, ok := h.service.GetUserByID(id)
    if !ok {
        http.Error(w, "user not found", http.StatusNotFound)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Name string `json:"name"`
    }

    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "invalid request body", http.StatusBadRequest)
        return
    }

    if req.Name == "" {
        http.Error(w, "name is required", http.StatusBadRequest)
        return
    }

    user := h.service.CreateUser(req.Name)
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}
```

### Step 6: Wire Everything in `main()`

```go
package main

import (
    "log"
    "net/http"
)

func main() {
    service := NewInMemoryUserService()
    handler := NewUserHandler(service)

    http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
        switch r.Method {
        case http.MethodGet:
            handler.GetUsers(w, r)
        case http.MethodPost:
            handler.CreateUser(w, r)
        default:
            http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
        }
    })

    http.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
        if r.Method != http.MethodGet {
            http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
            return
        }
        handler.GetUser(w, r)
    })

    log.Println("Server running on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

### Why This Design is Good

- `UserHandler` depends on `UserService` interface, not concrete struct
- You can replace in-memory service with DB service later
- Testing becomes simple with mock service

This is a clean and common Go backend pattern.

## Visual Explanation: Methods and Interfaces

```
Type + Methods:
┌──────────────────────────────┐
│ type InMemoryUserService{}   │
│ func (s *InMemoryUserService)│
│   GetAllUsers() []User       │
│ func (s *InMemoryUserService)│
│   CreateUser(name string)User│
└──────────────────────────────┘
              │
              │ satisfies
              ▼
┌──────────────────────────────┐
│ type UserService interface { │
│   GetAllUsers() []User       │
│   GetUserByID(id int)...     │
│   CreateUser(name string)User│
│ }                            │
└──────────────────────────────┘
              │
              │ injected into
              ▼
┌──────────────────────────────┐
│ type UserHandler struct {    │
│   service UserService        │
│ }                            │
└──────────────────────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What is the difference between function and method in Go?

**A:**  
- **Function** is standalone  
- **Method** is attached to a type with receiver

### Q2: When should I use pointer receiver?

**A:** Use pointer receiver when:
- You need to modify struct fields
- Struct is large and you want to avoid copying

### Q3: Can one type have many methods?

**A:** Yes, absolutely. A type can have multiple methods, and that is very common in Go.

### Q4: Do I need to declare that a type implements an interface?

**A:** No. Go checks methods automatically. If method signatures match, interface is satisfied.

### Q5: Why use interfaces in REST API code?

**A:** Interfaces make your code:
- Flexible (easy to swap implementations)
- Testable (easy to mock)
- Clean (handler and business logic are separated)

### Q6: Can methods return multiple values?

**A:** Yes. Methods are just functions with receivers, so they can return multiple values.

### Q7: Is it okay to use value receivers everywhere?

**A:** Not always. If method changes state, use pointer receiver.

### Q8: Can interfaces have many methods?

**A:** Yes, but keep interfaces small and focused whenever possible.

---

## Next Steps

Now that you understand methods and interfaces, here is what to learn next:

- **Next:** Learn about [Go Interfaces](/go/golang-interfaces) - Master contracts and polymorphism
- Explore [Go Structs](/go/golang-structs) - Build custom data types
- Understand [Go REST API](/go/golang-rest-api) - Build production-ready web APIs
- Practice [Go Error Handling](/go/golang-error-handling) - Write safer backend code

Methods and interfaces are core Go skills. Practice them with small projects, then use them in real APIs.
