---
title: "Go Basics - Variables, Types, and Syntax"
date: "2025-01-26"
description: "Learn the fundamentals of Go programming. Understand variables, data types, constants, and basic syntax with practical examples."
category: "Go Basics"
tags: ["golang", "basics", "variables", "types", "syntax"]
image: "/assets/images/golang.jpg"
author: "Sushil Kumar"
---

# Go Basics - Variables, Types, and Syntax

Welcome to Go basics! This is where your Go journey really begins. We'll learn about variables, data types, and how to write basic Go code. Don't worry - I'll explain everything step by step!

## Variables in Go

Variables are containers that store data. In Go, you can declare variables in several ways:

### Method 1: Using var

```go
var name string = "John"
var age int = 25
```

### Method 2: Type Inference

Go can figure out the type automatically:

```go
var name = "John"  // Go knows it's a string
var age = 25       // Go knows it's an int
```

### Method 3: Short Declaration (Most Common)

```go
name := "John"
age := 25
```

The `:=` operator declares and assigns in one step. This is the most common way!

### Multiple Variables

You can declare multiple variables at once:

```go
var (
    name string = "John"
    age  int    = 25
    city string = "New York"
)

// Or with short declaration
name, age, city := "John", 25, "New York"
```

## Data Types in Go

Go has several built-in types:

### Numbers

```go
var age int = 25           // Integer (whole numbers)
var price float64 = 19.99  // Floating point (decimal numbers)
var count uint = 100       // Unsigned integer (only positive)
```

### Strings

```go
var name string = "John"
var message = "Hello, World!"
```

### Booleans

```go
var isActive bool = true
var isDone = false
```

### Zero Values

In Go, variables have default values if you don't initialize them:

```go
var age int        // 0
var name string    // "" (empty string)
var isActive bool  // false
```

## Constants

Constants are values that never change:

```go
const pi = 3.14159
const greeting = "Hello"
const maxUsers = 100
```

## Basic Operations

### Arithmetic Operations

```go
a := 10
b := 5

sum := a + b      // 15
diff := a - b    // 5
product := a * b // 50
quotient := a / b // 2
remainder := a % b // 0
```

### String Operations

```go
firstName := "John"
lastName := "Doe"

fullName := firstName + " " + lastName  // "John Doe"
length := len(fullName)                  // 8
```

### Comparison Operations

```go
a := 10
b := 5

isEqual := a == b    // false
isNotEqual := a != b // true
isGreater := a > b   // true
isLess := a < b      // false
```

## Type Conversion

Go requires explicit type conversion:

```go
var i int = 42
var f float64 = float64(i)  // Convert int to float64
var u uint = uint(f)        // Convert float64 to uint
```

## Printing Output

Use `fmt` package to print:

```go
package main

import "fmt"

func main() {
    name := "John"
    age := 25
    
    fmt.Print("Hello")           // Prints without newline
    fmt.Println("World")         // Prints with newline
    fmt.Printf("Name: %s\n", name) // Formatted printing
    fmt.Printf("Age: %d\n", age)   // %d for integers
}
```

## Formatting Strings

```go
name := "John"
age := 25

// Different format verbs
fmt.Printf("Name: %s\n", name)      // %s for strings
fmt.Printf("Age: %d\n", age)         // %d for integers
fmt.Printf("Price: %.2f\n", 19.99)   // %.2f for floats (2 decimals)
fmt.Printf("Boolean: %t\n", true)    // %t for booleans
```

## Getting User Input

```go
package main

import "fmt"

func main() {
    var name string
    fmt.Print("Enter your name: ")
    fmt.Scanln(&name)
    fmt.Printf("Hello, %s!\n", name)
}
```

## Visual Explanation: Variable Declaration

Here's how variables work in Go:

```
Variable Declaration Flow:
┌─────────────────────────────┐
│ var name string = "John"   │
│                             │
│ 1. Declare variable        │
│ 2. Specify type            │
│ 3. Assign value            │
└─────────────────────────────┘

Short Declaration:
┌─────────────────────────────┐
│ name := "John"              │
│                             │
│ 1. Declare & assign        │
│ 2. Type inferred            │
│ 3. Shorter syntax          │
└─────────────────────────────┘
```

## Type System Overview

```
Go Types:
┌─────────────────────────────┐
│ Basic Types:                │
│ - int, int8, int16, int32   │
│ - uint, uint8, uint16       │
│ - float32, float64          │
│ - string                    │
│ - bool                      │
│ - byte (alias for uint8)    │
│ - rune (alias for int32)    │
├─────────────────────────────┤
│ Composite Types:            │
│ - Arrays                    │
│ - Slices                    │
│ - Maps                      │
│ - Structs                   │
│ - Interfaces                │
└─────────────────────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between var and :=?

**A:** 
- **var** - Can be used anywhere, can declare without initializing
- **:=** - Only inside functions, must initialize immediately

Use `:=` inside functions, `var` for package-level variables.

### Q2: Can I change a variable's type?

**A:** No! Once declared, a variable's type is fixed. But you can create a new variable with a different type.

### Q3: What's the difference between int and int32?

**A:** 
- **int** - Size depends on your system (32 or 64 bits)
- **int32** - Always 32 bits

Use `int` unless you specifically need a certain size.

### Q4: How do I declare a variable without initializing?

**A:** Use `var`:

```go
var name string  // Zero value: ""
var age int      // Zero value: 0
```

### Q5: Can I use := outside functions?

**A:** No! `:=` only works inside functions. Use `var` for package-level variables.

### Q6: What's the difference between string and []byte?

**A:** 
- **string** - Immutable sequence of characters
- **[]byte** - Mutable sequence of bytes

Strings are easier to work with, []byte gives more control.

### Q7: How do I convert between types?

**A:** Use explicit conversion:

```go
var i int = 42
var f float64 = float64(i)
```

### Q8: What's a zero value?

**A:** The default value a variable gets if you don't initialize it:
- Numbers: 0
- Strings: ""
- Booleans: false
- Pointers: nil

### Q9: Can I declare multiple variables of different types?

**A:** Yes! Use multiple declarations:

```go
var (
    name string = "John"
    age int = 25
    active bool = true
)
```

### Q10: What's the difference between Print, Println, and Printf?

**A:** 
- **Print** - No newline, no formatting
- **Println** - Adds newline, no formatting
- **Printf** - Formatted output with format verbs

Use Printf when you need formatting!

---

## Next Steps

Now that you understand Go basics, here's what to learn next:

- **Next:** Learn about [Go Functions](/go/golang-functions) - Write reusable code blocks
- Explore [Go Control Flow](/go/golang-control-flow) - If statements, loops, and switches
- Understand [Go Arrays and Slices](/go/golang-arrays-slices) - Work with collections of data
- Master [Go Structs](/go/golang-structs) - Create custom data types

Keep practicing! Write small programs to get comfortable with these concepts. The more you code, the better you'll understand Go!

