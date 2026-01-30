---
title: "Go Packages - Organizing Your Code"
date: "2025-02-12"
description: "Learn about Go packages, how to create and use them. Understand package structure, imports, and how to organize your Go code effectively."
category: "Go Basics"
tags: ["golang", "packages", "modules", "organization"]
image: "/assets/images/golang.jpg"
author: "Sushil Kumar"
---

# Go Packages - Organizing Your Code

Packages are how you organize code in Go. They let you group related code together and reuse it across your project. Understanding packages is essential for writing maintainable Go code!

## What is a Package?

A package is a collection of Go files in the same directory. All files in a package share the same package name and can access each other's code.

```
myproject/
├── main.go          (package main)
├── utils/
│   ├── math.go      (package utils)
│   └── string.go    (package utils)
└── models/
    └── user.go      (package models)
```

## Package Declaration

Every Go file starts with a package declaration:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

### Package main

The `main` package is special - it creates an executable program:

```go
package main

func main() {
    // Entry point
}
```

### Other Packages

Other packages create libraries:

```go
package utils

func Add(a, b int) int {
    return a + b
}
```

## Creating Your Own Package

### Step 1: Create Directory

```bash
mkdir utils
cd utils
```

### Step 2: Create Go File

```go
// utils/math.go
package utils

func Add(a, b int) int {
    return a + b
}

func Multiply(a, b int) int {
    return a * b
}
```

### Step 3: Use Package

```go
// main.go
package main

import (
    "fmt"
    "./utils"  // Import your package
)

func main() {
    sum := utils.Add(5, 3)
    fmt.Println(sum)  // 8
}
```

## Exported vs Unexported

### Exported (Public)

Start with capital letter - can be used outside package:

```go
package utils

func Add(a, b int) int {  // Exported
    return a + b
}

type User struct {  // Exported
    Name string
}
```

### Unexported (Private)

Start with lowercase - only usable within package:

```go
package utils

func add(a, b int) int {  // Unexported
    return a + b
}

type user struct {  // Unexported
    name string
}
```

## Package Structure

### Simple Package

```
utils/
├── math.go
└── string.go
```

Both files have `package utils`.

### Multiple Packages

```
myproject/
├── main.go          (package main)
├── utils/
│   └── math.go      (package utils)
├── models/
│   └── user.go      (package models)
└── handlers/
    └── api.go       (package handlers)
```

## Importing Packages

### Single Import

```go
import "fmt"
```

### Multiple Imports

```go
import (
    "fmt"
    "math"
    "strings"
)
```

### Import with Alias

```go
import (
    f "fmt"
    m "math"
)

func main() {
    f.Println("Hello")
    result := m.Sqrt(16)
}
```

### Dot Import

```go
import . "fmt"

func main() {
    Println("Hello")  // No fmt prefix needed
}
```

### Blank Import

```go
import _ "database/sql/driver"  // Import for side effects only
```

## Go Modules (Modern Way)

Go modules manage dependencies:

### Initialize Module

```bash
go mod init myproject
```

Creates `go.mod` file.

### Add Dependencies

```bash
go get github.com/gorilla/mux
```

### go.mod File

```go
module myproject

go 1.21

require (
    github.com/gorilla/mux v1.8.0
)
```

## Standard Library Packages

Go comes with many built-in packages:

```go
import (
    "fmt"        // Formatting and printing
    "math"       // Math functions
    "strings"    // String manipulation
    "os"         // Operating system interface
    "net/http"   // HTTP client and server
    "encoding/json"  // JSON encoding/decoding
)
```

## Visual Explanation: Package Structure

Here's how packages are organized:

```
Project Structure:
┌─────────────────────────────┐
│ myproject/                  │
│   │                         │
│   ├─► main.go              │
│   │   (package main)        │
│   │                         │
│   ├─► utils/               │
│   │   ├─► math.go          │
│   │   └─► string.go        │
│   │   (package utils)       │
│   │                         │
│   └─► models/              │
│       └─► user.go          │
│       (package models)      │
└─────────────────────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between package and module?

**A:** 
- **Package** - Collection of Go files in same directory
- **Module** - Collection of packages, managed by go.mod

A module can contain multiple packages.

### Q2: Can I have multiple packages in one directory?

**A:** No! All files in a directory must have the same package name.

### Q3: What's the difference between exported and unexported?

**A:** 
- **Exported** - Capital letter, public (can be used outside)
- **Unexported** - Lowercase, private (package-only)

### Q4: Do I need go.mod for every project?

**A:** Yes! For Go 1.11+, use modules. Run `go mod init projectname` to create one.

### Q5: How do I install packages?

**A:** Use `go get`:

```bash
go get github.com/package/name
```

### Q6: Can I use relative imports?

**A:** Yes, but not recommended. Use module paths instead:

```go
import "./utils"  // Works but not ideal
import "myproject/utils"  // Better
```

### Q7: What's the main package?

**A:** The `main` package creates an executable. It must have a `main()` function.

### Q8: How do I organize packages?

**A:** Group related functionality:
- `utils/` - Utility functions
- `models/` - Data structures
- `handlers/` - Request handlers
- `config/` - Configuration

### Q9: Can I import the same package twice?

**A:** No! Go will give an error. Use aliases if needed:

```go
import (
    "fmt"
    f "fmt"  // Error!
)
```

### Q10: What's init() function?

**A:** `init()` runs automatically when package is imported:

```go
package utils

func init() {
    // Runs when package is imported
}
```

---

## Next Steps

Now that you understand packages, here's what to learn next:

- **Next:** Learn about [Go Modules](/go/golang-modules) - Manage dependencies
- Explore [Go Testing](/go/golang-testing) - Test your packages
- Understand [Go Interfaces](/go/golang-interfaces) - Use interfaces across packages
- Master [Go REST API](/go/golang-rest-api) - Organize API code with packages

Packages help you write organized, maintainable code. Practice creating and using packages!

