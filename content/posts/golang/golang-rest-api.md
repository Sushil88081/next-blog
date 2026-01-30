---
title: "Building REST API with Go - Complete Guide"
date: "2025-02-08"
description: "Learn how to build REST APIs in Go using the net/http package and popular frameworks. Create endpoints, handle requests, and build production-ready APIs."
category: "Go Advanced"
tags: ["golang", "rest-api", "web-development", "backend", "http"]
image: "/assets/images/golang.jpg"
author: "Sushil Kumar"
---

# Building REST API with Go - Complete Guide

REST APIs are how applications communicate over the internet. Go is perfect for building fast, efficient APIs. Let's learn how to build a complete REST API from scratch!

## What is a REST API?

REST (Representational State Transfer) is an architectural style for building web services. A REST API uses HTTP methods to perform operations on resources.

**HTTP Methods:**
- **GET** - Retrieve data
- **POST** - Create new data
- **PUT** - Update existing data
- **DELETE** - Remove data

## Setting Up a Basic Server

### Using net/http (Built-in)

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, World!")
    })
    
    fmt.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}
```

### Creating Handlers

```go
func homeHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{
        "message": "Welcome to the API",
    })
}

func main() {
    http.HandleFunc("/", homeHandler)
    http.ListenAndServe(":8080", nil)
}
```

## Handling Different HTTP Methods

```go
func userHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    
    switch r.Method {
    case "GET":
        // Handle GET request
        json.NewEncoder(w).Encode(getUsers())
    case "POST":
        // Handle POST request
        var user User
        json.NewDecoder(r.Body).Decode(&user)
        createUser(user)
        w.WriteHeader(http.StatusCreated)
    case "PUT":
        // Handle PUT request
        var user User
        json.NewDecoder(r.Body).Decode(&user)
        updateUser(user)
    case "DELETE":
        // Handle DELETE request
        id := r.URL.Query().Get("id")
        deleteUser(id)
        w.WriteHeader(http.StatusNoContent)
    default:
        w.WriteHeader(http.StatusMethodNotAllowed)
    }
}
```

## Complete REST API Example

```go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "strconv"
    "strings"
)

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

var users []User
var nextID = 1

// GET /users - Get all users
func getUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

// GET /users/{id} - Get user by ID
func getUserByID(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    
    id, err := strconv.Atoi(strings.TrimPrefix(r.URL.Path, "/users/"))
    if err != nil {
        http.Error(w, "Invalid ID", http.StatusBadRequest)
        return
    }
    
    for _, user := range users {
        if user.ID == id {
            json.NewEncoder(w).Encode(user)
            return
        }
    }
    
    http.Error(w, "User not found", http.StatusNotFound)
}

// POST /users - Create new user
func createUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    
    var user User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    user.ID = nextID
    nextID++
    users = append(users, user)
    
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}

// PUT /users/{id} - Update user
func updateUser(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    
    id, err := strconv.Atoi(strings.TrimPrefix(r.URL.Path, "/users/"))
    if err != nil {
        http.Error(w, "Invalid ID", http.StatusBadRequest)
        return
    }
    
    var updatedUser User
    if err := json.NewDecoder(r.Body).Decode(&updatedUser); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    for i, user := range users {
        if user.ID == id {
            updatedUser.ID = id
            users[i] = updatedUser
            json.NewEncoder(w).Encode(updatedUser)
            return
        }
    }
    
    http.Error(w, "User not found", http.StatusNotFound)
}

// DELETE /users/{id} - Delete user
func deleteUser(w http.ResponseWriter, r *http.Request) {
    id, err := strconv.Atoi(strings.TrimPrefix(r.URL.Path, "/users/"))
    if err != nil {
        http.Error(w, "Invalid ID", http.StatusBadRequest)
        return
    }
    
    for i, user := range users {
        if user.ID == id {
            users = append(users[:i], users[i+1:]...)
            w.WriteHeader(http.StatusNoContent)
            return
        }
    }
    
    http.Error(w, "User not found", http.StatusNotFound)
}

func main() {
    // Setup routes
    http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
        switch r.Method {
        case "GET":
            getUsers(w, r)
        case "POST":
            createUser(w, r)
        default:
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        }
    })
    
    http.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
        switch r.Method {
        case "GET":
            getUserByID(w, r)
        case "PUT":
            updateUser(w, r)
        case "DELETE":
            deleteUser(w, r)
        default:
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        }
    })
    
    fmt.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

## Using Gorilla Mux (Popular Router)

Gorilla Mux makes routing easier:

```go
package main

import (
    "encoding/json"
    "net/http"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    
    r.HandleFunc("/users", getUsers).Methods("GET")
    r.HandleFunc("/users", createUser).Methods("POST")
    r.HandleFunc("/users/{id}", getUserByID).Methods("GET")
    r.HandleFunc("/users/{id}", updateUser).Methods("PUT")
    r.HandleFunc("/users/{id}", deleteUser).Methods("DELETE")
    
    http.ListenAndServe(":8080", r)
}
```

## Handling JSON

### Parsing Request Body

```go
func createUser(w http.ResponseWriter, r *http.Request) {
    var user User
    
    // Decode JSON from request body
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    // Process user...
}
```

### Sending JSON Response

```go
func getUsers(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    
    users := []User{
        {ID: 1, Name: "John", Email: "john@example.com"},
        {ID: 2, Name: "Jane", Email: "jane@example.com"},
    }
    
    json.NewEncoder(w).Encode(users)
}
```

## Error Handling

```go
func handleError(w http.ResponseWriter, err error, statusCode int) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(statusCode)
    json.NewEncoder(w).Encode(map[string]string{
        "error": err.Error(),
    })
}

func getUserByID(w http.ResponseWriter, r *http.Request) {
    id, err := strconv.Atoi(mux.Vars(r)["id"])
    if err != nil {
        handleError(w, err, http.StatusBadRequest)
        return
    }
    
    // Find user...
}
```

## Middleware

Middleware functions process requests before handlers:

```go
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        next.ServeHTTP(w, r)
    })
}

func main() {
    r := mux.NewRouter()
    r.Use(loggingMiddleware)
    r.Use(corsMiddleware)
    
    // Routes...
}
```

## Visual Explanation: REST API Flow

Here's how a REST API request works:

```
Client Request:
┌──────────────┐
│ GET /users/1 │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Go Server    │
│              │
│ 1. Parse     │
│    request   │
│ 2. Route to  │
│    handler   │
│ 3. Process   │
│    data      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ JSON         │
│ Response     │
│              │
│ {            │
│   "id": 1,   │
│   "name":    │
│   "John"     │
│ }            │
└──────────────┘
```

## API Endpoint Structure

```
REST API Endpoints:
┌─────────────────────────────┐
│ GET    /users      - List   │
│ GET    /users/{id} - Get    │
│ POST   /users      - Create │
│ PUT    /users/{id} - Update │
│ DELETE /users/{id} - Delete │
└─────────────────────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between PUT and PATCH?

**A:** 
- **PUT** - Replace entire resource
- **PATCH** - Update part of resource

Use PUT for full updates, PATCH for partial updates.

### Q2: How do I handle CORS in Go?

**A:** Set CORS headers in middleware:

```go
w.Header().Set("Access-Control-Allow-Origin", "*")
w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
```

### Q3: Should I use net/http or a framework?

**A:** 
- **net/http** - Built-in, simple APIs
- **Framework (Gin, Echo)** - More features, easier routing

Start with net/http, use frameworks for complex APIs.

### Q4: How do I handle file uploads?

**A:** Use `multipart/form-data`:

```go
file, header, err := r.FormFile("file")
if err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
    return
}
defer file.Close()
```

### Q5: How do I validate request data?

**A:** Validate before processing:

```go
if user.Name == "" {
    http.Error(w, "Name is required", http.StatusBadRequest)
    return
}
```

### Q6: Can I use databases with REST APIs?

**A:** Yes! Connect to databases (PostgreSQL, MySQL, MongoDB) in your handlers:

```go
func getUsers(w http.ResponseWriter, r *http.Request) {
    users, err := db.GetAllUsers()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(users)
}
```

### Q7: How do I handle authentication?

**A:** Use middleware to check tokens:

```go
func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if !isValidToken(token) {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}
```

### Q8: What HTTP status codes should I use?

**A:** 
- **200** - Success (GET, PUT)
- **201** - Created (POST)
- **204** - No Content (DELETE)
- **400** - Bad Request
- **404** - Not Found
- **500** - Server Error

### Q9: How do I test my API?

**A:** Use tools like:
- **curl** - Command line
- **Postman** - GUI tool
- **Go tests** - Write test functions

### Q10: Can I deploy Go REST APIs?

**A:** Yes! Deploy to:
- Cloud platforms (AWS, Google Cloud, Azure)
- Containers (Docker)
- VPS servers
- Serverless (AWS Lambda with adapter)

Go compiles to a single binary - deployment is easy!

---

## Next Steps

Now that you understand REST APIs, here's what to learn next:

- **Next:** Learn about [Go Database Integration](/go/golang-database) - Connect to databases
- Explore [Go Middleware](/go/golang-middleware) - Add authentication and logging
- Understand [Go Testing](/go/golang-testing) - Test your APIs
- Master [Go Deployment](/go/golang-deployment) - Deploy your API

REST APIs are essential for modern applications. Practice building APIs to get comfortable!

