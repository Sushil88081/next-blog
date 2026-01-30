---
title: "Go Error Handling - Complete Guide"
date: "2025-02-11"
description: "Learn how to handle errors in Go. Understand Go's error handling philosophy, error types, and best practices for writing robust Go code."
category: "Go Advanced"
tags: ["golang", "error-handling", "errors", "programming"]
image: "/assets/images/golang.jpg"
author: "Sushil Kumar"
---

# Go Error Handling - Complete Guide

Error handling in Go is different from other languages. Go doesn't have exceptions - instead, functions return errors as values. This makes error handling explicit and predictable!

## Go's Error Philosophy

In Go, errors are values. Functions return errors, and you check them explicitly. No hidden exceptions, no surprises!

```go
result, err := doSomething()
if err != nil {
    // Handle error
    return err
}
// Use result
```

## The Error Interface

Go has a built-in error interface:

```go
type error interface {
    Error() string
}
```

Any type with an `Error() string` method implements the error interface!

## Creating Errors

### errors.New()

```go
import "errors"

err := errors.New("something went wrong")
```

### fmt.Errorf()

```go
import "fmt"

err := fmt.Errorf("user %s not found", username)
```

### Custom Error Types

```go
type NotFoundError struct {
    Resource string
    ID       int
}

func (e NotFoundError) Error() string {
    return fmt.Sprintf("%s with ID %d not found", e.Resource, e.ID)
}

func findUser(id int) (*User, error) {
    // If not found:
    return nil, NotFoundError{Resource: "user", ID: id}
}
```

## Handling Errors

### Basic Error Handling

```go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result)
}
```

### Error Wrapping

Wrap errors to add context:

```go
import "fmt"

func processUser(id int) error {
    user, err := getUser(id)
    if err != nil {
        return fmt.Errorf("failed to process user: %w", err)
    }
    // Process user...
    return nil
}
```

### Checking Error Types

```go
var notFound NotFoundError
if errors.As(err, &notFound) {
    fmt.Println("Not found:", notFound.Resource)
}
```

### Unwrapping Errors

```go
import "errors"

wrappedErr := fmt.Errorf("outer: %w", innerErr)
unwrapped := errors.Unwrap(wrappedErr)
```

## Common Error Patterns

### Pattern 1: Early Return

```go
func process(data string) error {
    if data == "" {
        return errors.New("data is empty")
    }
    
    if len(data) < 5 {
        return errors.New("data too short")
    }
    
    // Process data
    return nil
}
```

### Pattern 2: Error Propagation

```go
func getUser(id int) (*User, error) {
    data, err := fetchData(id)
    if err != nil {
        return nil, err  // Propagate error
    }
    
    user, err := parseUser(data)
    if err != nil {
        return nil, err  // Propagate error
    }
    
    return user, nil
}
```

### Pattern 3: Error Wrapping

```go
func processFile(filename string) error {
    file, err := os.Open(filename)
    if err != nil {
        return fmt.Errorf("failed to open file %s: %w", filename, err)
    }
    defer file.Close()
    
    // Process file...
    return nil
}
```

## Sentinel Errors

Predefined errors you can compare:

```go
var ErrNotFound = errors.New("not found")
var ErrInvalidInput = errors.New("invalid input")

func find(id int) (*Item, error) {
    if id < 0 {
        return nil, ErrInvalidInput
    }
    // If not found:
    return nil, ErrNotFound
}

// Usage
item, err := find(5)
if err == ErrNotFound {
    fmt.Println("Item not found")
}
```

## Error Handling in Goroutines

Handle errors in concurrent code:

```go
func worker(id int, results chan<- Result, errors chan<- error) {
    result, err := doWork(id)
    if err != nil {
        errors <- err
        return
    }
    results <- result
}

func main() {
    results := make(chan Result)
    errors := make(chan error)
    
    for i := 0; i < 10; i++ {
        go worker(i, results, errors)
    }
    
    // Collect results and errors
    for i := 0; i < 10; i++ {
        select {
        case result := <-results:
            fmt.Println("Result:", result)
        case err := <-errors:
            fmt.Println("Error:", err)
        }
    }
}
```

## Visual Explanation: Error Flow

Here's how errors propagate:

```
Function Call:
┌─────────────────────────────┐
│ func doSomething() error {  │
│     if error {               │
│         return error        │
│     }                        │
│     return nil              │
│ }                           │
└──────────────┬──────────────┘
               │
               ▼
┌──────────────┐
│ Caller       │
│              │
│ err :=       │
│ doSomething()│
│              │
│ if err != nil│
│   handle     │
└──────────────┘
```

## Best Practices

### 1. Always Check Errors

```go
// Bad
result, _ := doSomething()  // Ignoring error!

// Good
result, err := doSomething()
if err != nil {
    return err
}
```

### 2. Add Context

```go
// Bad
return err

// Good
return fmt.Errorf("failed to process user %d: %w", userID, err)
```

### 3. Use Sentinel Errors

```go
var ErrNotFound = errors.New("not found")

// Easy to check
if err == ErrNotFound {
    // Handle not found
}
```

### 4. Don't Panic (Usually)

```go
// Bad - Don't panic for normal errors
if err != nil {
    panic(err)
}

// Good - Return error
if err != nil {
    return err
}
```

## Frequently Asked Questions (FAQ)

### Q1: Why doesn't Go have exceptions?

**A:** Go's designers wanted explicit error handling. Returning errors makes it clear what can fail. No hidden exceptions that might crash your program!

### Q2: Should I use panic?

**A:** Only for truly unrecoverable errors (like programming bugs). For normal errors, return error values.

### Q3: How do I create custom errors?

**A:** Create a type with `Error() string` method:

```go
type MyError struct {
    Message string
}

func (e MyError) Error() string {
    return e.Message
}
```

### Q4: What's the difference between errors.New and fmt.Errorf?

**A:** 
- **errors.New** - Simple error message
- **fmt.Errorf** - Formatted error message, can wrap errors with `%w`

### Q5: How do I check error types?

**A:** Use `errors.As`:

```go
var myErr MyError
if errors.As(err, &myErr) {
    // Handle MyError
}
```

### Q6: Can I ignore errors?

**A:** Technically yes with `_`, but it's usually a bad idea:

```go
result, _ := doSomething()  // Bad!
```

Always handle errors!

### Q7: How do I wrap errors?

**A:** Use `fmt.Errorf` with `%w`:

```go
return fmt.Errorf("context: %w", err)
```

### Q8: What's a sentinel error?

**A:** A predefined error you can compare:

```go
var ErrNotFound = errors.New("not found")

if err == ErrNotFound {
    // Handle
}
```

### Q9: How do I handle errors in loops?

**A:** Check and handle in each iteration:

```go
for _, item := range items {
    if err := process(item); err != nil {
        log.Printf("Error processing %v: %v", item, err)
        continue  // Skip this item
    }
}
```

### Q10: Should errors be part of function signature?

**A:** Yes! If a function can fail, it should return an error:

```go
func doSomething() (Result, error) {
    // ...
}
```

---

## Next Steps

Now that you understand error handling, here's what to learn next:

- **Next:** Learn about [Go Testing](/go/golang-testing) - Test error cases
- Explore [Go REST API](/go/golang-rest-api) - Handle API errors
- Understand [Go Concurrency](/go/golang-concurrency) - Handle errors in goroutines
- Master [Go Best Practices](/go/golang-best-practices) - Write robust code

Error handling is crucial in Go. Always check errors and handle them properly!

