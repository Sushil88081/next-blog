---
title: "Go Structs - Complete Guide"
date: "2025-02-09"
description: "Learn about Go structs, how to create and use them. Understand struct fields, methods, embedding, and best practices for working with custom types."
category: "Go Basics"
tags: ["golang", "structs", "types", "programming"]
image: "/assets/images/golang.jpg"
author: "Sushil Kumar"
---

# Go Structs - Complete Guide

Structs are Go's way of creating custom types. They let you group related data together. Think of structs as blueprints for creating objects with specific properties.

## What is a Struct?

A struct is a collection of fields. Each field has a name and a type. Structs are like classes in other languages, but simpler!

```go
type Person struct {
    Name string
    Age  int
    City string
}
```

## Creating Structs

### Basic Struct

```go
type Person struct {
    Name string
    Age  int
    Email string
}
```

### Using Structs

```go
// Create struct instance
person := Person{
    Name:  "John",
    Age:   25,
    Email: "john@example.com",
}

// Access fields
fmt.Println(person.Name)  // "John"
fmt.Println(person.Age)   // 25
```

### Different Ways to Create

```go
// Named fields (recommended)
person1 := Person{
    Name:  "John",
    Age:   25,
    Email: "john@example.com",
}

// Positional (order matters)
person2 := Person{"Jane", 30, "jane@example.com"}

// Zero value
var person3 Person  // All fields are zero values

// Pointer
person4 := &Person{
    Name: "Bob",
    Age:  28,
}
```

## Struct Fields

### Field Tags

Add metadata to fields:

```go
type User struct {
    ID    int    `json:"id" db:"user_id"`
    Name  string `json:"name" db:"user_name"`
    Email string `json:"email" db:"user_email"`
}
```

Tags are useful for JSON encoding, database mapping, etc.

### Embedded Fields

Structs can embed other structs:

```go
type Address struct {
    Street string
    City   string
    Zip    string
}

type Person struct {
    Name    string
    Age     int
    Address Address  // Embedded
}

// Usage
person := Person{
    Name: "John",
    Age:  25,
    Address: Address{
        Street: "123 Main St",
        City:   "New York",
        Zip:    "10001",
    },
}

fmt.Println(person.Address.City)  // "New York"
```

### Anonymous Embedding

Embed without field name:

```go
type Person struct {
    Name string
    Age  int
    Address  // Anonymous embedding
}

type Address struct {
    Street string
    City   string
}

// Can access directly
person := Person{
    Name: "John",
    Address: Address{City: "New York"},
}

fmt.Println(person.City)  // Direct access!
```

## Struct Methods

Add methods to structs:

```go
type Rectangle struct {
    Width  float64
    Height float64
}

// Method with value receiver
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

// Method with pointer receiver
func (r *Rectangle) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}

func main() {
    rect := Rectangle{Width: 10, Height: 5}
    fmt.Println(rect.Area())  // 50
    
    rect.Scale(2)
    fmt.Println(rect.Width)   // 20
}
```

### Value vs Pointer Receivers

```go
// Value receiver - works on copy
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

// Pointer receiver - works on original
func (r *Rectangle) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}
```

**Rule:** Use pointer receivers when you need to modify the struct.

## Struct Comparison

Structs can be compared if all fields are comparable:

```go
type Point struct {
    X int
    Y int
}

p1 := Point{1, 2}
p2 := Point{1, 2}
p3 := Point{2, 3}

fmt.Println(p1 == p2)  // true
fmt.Println(p1 == p3)  // false
```

## JSON Encoding/Decoding

Structs work great with JSON:

```go
type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

// Encode to JSON
user := User{ID: 1, Name: "John", Email: "john@example.com"}
jsonData, _ := json.Marshal(user)
fmt.Println(string(jsonData))  // {"id":1,"name":"John","email":"john@example.com"}

// Decode from JSON
var user2 User
json.Unmarshal(jsonData, &user2)
fmt.Println(user2.Name)  // "John"
```

## Visual Explanation: Struct Structure

Here's how structs are organized:

```
Struct Definition:
┌─────────────────────────────┐
│ type Person struct {        │
│     Name  string            │
│     Age   int               │
│     Email string            │
│ }                           │
└─────────────────────────────┘
         │
         │ Creates instances
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│Person1 │ │Person2 │
│Name    │ │Name    │
│Age     │ │Age     │
│Email   │ │Email   │
└────────┘ └────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between struct and class?

**A:** 
- **Struct** - Go's way, simpler, no inheritance
- **Class** - OOP concept, has inheritance

Go structs are simpler - no classes, no inheritance, just composition.

### Q2: Can structs have methods?

**A:** Yes! Methods are functions with receivers:

```go
func (p Person) Greet() string {
    return "Hello, " + p.Name
}
```

### Q3: When should I use value vs pointer receiver?

**A:** 
- **Value receiver** - When method doesn't modify struct
- **Pointer receiver** - When method modifies struct or struct is large

### Q4: Can I have private fields in structs?

**A:** Yes! Lowercase fields are private (package-private):

```go
type Person struct {
    Name string  // Public
    age  int     // Private (package-only)
}
```

### Q5: What's struct embedding?

**A:** Including one struct in another without a field name. It's like composition:

```go
type Person struct {
    Name string
    Address  // Embedded
}
```

### Q6: Can structs be nil?

**A:** Only struct pointers can be nil:

```go
var p *Person  // nil
var p2 Person  // Zero value, not nil
```

### Q7: How do I create a struct with default values?

**A:** Use a constructor function:

```go
func NewPerson(name string) Person {
    return Person{
        Name: name,
        Age:  0,
        Email: "",
    }
}
```

### Q8: Can I compare structs?

**A:** Yes, if all fields are comparable:

```go
p1 := Point{1, 2}
p2 := Point{1, 2}
fmt.Println(p1 == p2)  // true
```

### Q9: What are struct tags for?

**A:** Metadata for encoding, validation, database mapping:

```go
type User struct {
    Name string `json:"name" validate:"required"`
}
```

### Q10: Can I have methods on struct pointers?

**A:** Yes! Methods can have pointer receivers:

```go
func (p *Person) UpdateAge(age int) {
    p.Age = age
}
```

---

## Next Steps

Now that you understand structs, here's what to learn next:

- **Next:** Learn about [Go Interfaces](/go/golang-interfaces) - Define behavior contracts
- Explore [Go Methods](/go/golang-methods) - Add behavior to types
- Understand [Go Packages](/go/golang-packages) - Organize your code
- Master [Go REST API](/go/golang-rest-api) - Build web APIs with structs

Structs are fundamental in Go. Practice creating and using structs to get comfortable!

