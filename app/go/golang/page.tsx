import Image from "next/image";
import PostCard from "@/components/PostCard";
import CategorySearch from "@/components/CategorySearch";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://learn-code-easy.vercel.app";

export const metadata: Metadata = {
  title: "Go (Golang) Tutorials and Guides",
  description:
    "Learn Go programming language with comprehensive tutorials and guides. Master Go basics, functions, concurrency, and more with detailed examples and best practices.",
  keywords: [
    "golang",
    "go",
    "go programming",
    "golang tutorial",
    "go lang",
    "go language",
    "backend development",
    "concurrency",
    "go examples",
    "learn golang",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/go/golang`,
    siteName: "Programming Blog",
    title: "Go (Golang) Tutorials and Guides",
    description:
      "Learn Go programming language with comprehensive tutorials and guides. Master Go basics, functions, concurrency, and more.",
    images: [
      {
        url: `${siteUrl}/assets/images/golang.jpg`,
        width: 1200,
        height: 630,
        alt: "Go (Golang) Tutorials and Guides",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Go (Golang) Tutorials and Guides",
    description:
      "Learn Go programming language with comprehensive tutorials and guides.",
    images: [`${siteUrl}/assets/images/golang.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/go/golang`,
  },
};

export default function GoPage() {
  const goPosts = [
    {
      title: "What is Go (Golang)? - Complete Introduction",
      description:
        "Learn what Go programming language is, why it was created, and why it's worth learning. Discover Go's features, advantages, and use cases.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-01",
      slug: "golang-introduction",
    },
    {
      title: "How to Install Go (Golang) - Step by Step Guide",
      description:
        "Complete guide on installing Go programming language on Windows, macOS, and Linux. Learn how to set up your Go development environment.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-02",
      slug: "golang-installation",
    },
    {
      title: "Go Basics - Variables, Types, and Syntax",
      description:
        "Learn the fundamentals of Go programming. Understand variables, data types, constants, and basic syntax with practical examples.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-03",
      slug: "golang-basics",
    },
    {
      title: "Functions in Go - Complete Guide",
      description:
        "Learn how to create and use functions in Go. Understand function syntax, parameters, return values, and best practices.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-04",
      slug: "golang-functions",
    },
    {
      title: "Go Structs - Complete Guide",
      description:
        "Learn about Go structs, how to create and use them. Understand struct fields, methods, embedding, and best practices for working with custom types.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-05",
      slug: "golang-structs",
    },
    {
      title: "Go Interfaces - Complete Guide",
      description:
        "Learn about Go interfaces, how they work, and how to use them effectively. Understand interface implementation and polymorphism in Go.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-06",
      slug: "golang-interfaces",
    },
    {
      title: "Building REST API with Go - Complete Guide",
      description:
        "Learn how to build REST APIs in Go using the net/http package and popular frameworks. Create endpoints, handle requests, and build production-ready APIs.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-07",
      slug: "golang-rest-api",
    },
    {
      title: "Go Concurrency - Goroutines and Channels",
      description:
        "Learn about Go's powerful concurrency features. Understand goroutines, channels, and how to write concurrent programs in Go.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-08",
      slug: "golang-concurrency",
    },
    {
      title: "Go Error Handling - Complete Guide",
      description:
        "Learn how to handle errors in Go. Understand Go's error handling philosophy, error types, and best practices for writing robust Go code.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-09",
      slug: "golang-error-handling",
    },
    {
      title: "Go Packages - Organizing Your Code",
      description:
        "Learn about Go packages, how to create and use them. Understand package structure, imports, and how to organize your Go code effectively.",
      image: "/assets/images/golang.jpg",
      date: "2025-12-10",
      slug: "golang-packages",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src="/assets/images/golang.jpg"
          alt="Go (Golang)"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Go (Golang)
          </h1>
          <p className="text-lg text-white/90">
            {goPosts.length} Posts Available
          </p>
        </div>
      </div>

      {/* Comprehensive Content Section for AdSense Compliance */}
      <div className="max-w-none mb-12">
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What is Go (Golang)? A Modern Systems Programming Language
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Go, also known as Golang, is an open-source programming language developed by Google engineers Robert Griesemer, Rob Pike, and Ken Thompson. It was first released in 2009 and designed to address common problems in large-scale software development. Go combines the development speed of interpreted languages like Python with the performance and safety of compiled languages like C++.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Go was created to solve real problems Google faced: slow compilation times, difficulty writing concurrent programs, and complex dependency management. The language emphasizes simplicity, readability, and efficiency. Go's design philosophy is "less is more" - it intentionally omits features found in other languages to keep the language simple and maintainable.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Today, Go is used by major companies like Google, Docker, Kubernetes, Dropbox, Uber, and many others. It's particularly popular for building cloud services, microservices, distributed systems, and DevOps tools. Go's combination of simplicity, performance, and built-in concurrency makes it ideal for modern backend development.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Why Learn Go? Key Advantages
          </h2>
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Exceptional Performance
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Go compiles directly to machine code, resulting in fast execution speeds. It's significantly faster than interpreted languages like Python, Ruby, or JavaScript, often 10-100x faster for CPU-intensive tasks. Go's performance is comparable to C++ or Java while being easier to write. This makes Go perfect for high-performance applications, APIs, and services that need to handle thousands of concurrent requests.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Built-in Concurrency Model
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Go's concurrency model is one of its standout features. Goroutines are lightweight threads managed by the Go runtime, and channels provide safe communication between goroutines. This makes concurrent programming much simpler and safer than traditional threading models. You can easily spawn thousands of goroutines without the overhead of OS threads, making Go ideal for concurrent applications.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Simple and Readable Syntax
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Go has a clean, minimal syntax that's easy to learn and read. It intentionally omits features like classes, inheritance, generics (until recently), and operator overloading to keep the language simple. This simplicity means less code to write, fewer bugs, and easier maintenance. Go code written by one developer is easily understood by another, making it excellent for team projects.
              </p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Fast Compilation and Great Tooling
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Go compiles extremely quickly, even for large projects. The Go toolchain includes excellent tools: gofmt for code formatting, go test for testing, go vet for static analysis, and the go command for building and managing dependencies. The tooling is built-in and works consistently across platforms, making development smooth and efficient.
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Growing Industry Adoption
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Go is increasingly used in cloud computing, microservices, DevOps tools, and backend development. Major projects like Docker, Kubernetes, Prometheus, and Terraform are written in Go. Learning Go opens opportunities in cloud infrastructure, distributed systems, and modern backend development. The demand for Go developers continues to grow.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Core Go Concepts Explained
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              1. Packages and Imports
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Go code is organized into packages. Every Go file belongs to a package, and the main package is the entry point for executable programs. You import packages to use code from other packages. Go's package system is simple and encourages code reuse. The standard library provides many useful packages for common tasks.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`package main

import (
    "fmt"
    "net/http"
)

func main() {
    fmt.Println("Hello, Go!")
}`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              2. Variables and Types
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Go is statically typed, meaning variables have a specific type. You can declare variables explicitly or let Go infer the type. Go has basic types (int, string, bool, float64) and composite types (arrays, slices, maps, structs). Understanding Go's type system is fundamental to writing correct Go code.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`// Variable declarations
var name string = "Go"
var age int = 10
var isActive bool = true

// Short variable declaration
name := "Go"
age := 10

// Multiple variables
var x, y int = 1, 2`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              3. Functions - The Building Blocks
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Functions in Go can have multiple return values, which is common in Go for returning both a result and an error. Go functions are first-class citizens - they can be assigned to variables, passed as arguments, and returned from other functions. Understanding functions and error handling is crucial for Go programming.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`// Function with return value
func add(a int, b int) int {
    return a + b
}

// Multiple return values (common pattern)
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              4. Structs - Custom Types
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Structs in Go are collections of fields. They're similar to classes in other languages but simpler. You can define methods on structs, embed structs for composition, and use structs to create custom types. Structs are the primary way to organize data in Go.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`// Struct definition
type Person struct {
    Name string
    Age  int
}

// Method on struct
func (p Person) Introduce() string {
    return fmt.Sprintf("I'm %s, %d years old", p.Name, p.Age)
}

// Usage
person := Person{Name: "Alice", Age: 30}`}
                </code>
              </pre>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              5. Goroutines and Channels - Concurrency
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Goroutines are lightweight threads managed by the Go runtime. You start a goroutine with the go keyword. Channels are typed conduits for communication between goroutines. They allow goroutines to synchronize and share data safely. This concurrency model is one of Go's most powerful features.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
              <pre className="text-sm overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200 font-mono">
                  {`// Starting a goroutine
go processData()

// Channels
ch := make(chan string)

// Sending to channel
go func() {
    ch <- "Hello"
}()

// Receiving from channel
msg := <-ch`}
                </code>

              </pre>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            What Can You Build with Go?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Web Servers and APIs
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Build fast, scalable web servers and REST APIs. Go's net/http package provides everything you need, or use frameworks like Gin, Echo, or Fiber for additional features. Go's performance makes it ideal for high-traffic APIs and microservices.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>RESTful APIs</li>
                <li>GraphQL servers</li>
                <li>Microservices</li>
                <li>WebSocket servers</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Cloud Services and Infrastructure
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Go is widely used in cloud computing and infrastructure tools. Docker, Kubernetes, Terraform, and many cloud services are built with Go. Its performance and simplicity make it perfect for infrastructure tools.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Container orchestration</li>
                <li>Infrastructure as code</li>
                <li>Cloud-native applications</li>
                <li>DevOps tools</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Command-Line Tools
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Go compiles to a single binary with no dependencies, making it perfect for command-line tools. Tools like Docker CLI, Kubernetes kubectl, and many others are written in Go. You can distribute a single executable file.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>CLI applications</li>
                <li>System utilities</li>
                <li>Automation scripts</li>
                <li>Developer tools</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                Distributed Systems
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
                Go's concurrency features make it excellent for building distributed systems. You can easily handle thousands of concurrent connections, making Go perfect for real-time systems, message queues, and distributed applications.
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li>Distributed databases</li>
                <li>Message brokers</li>
                <li>Real-time systems</li>
                <li>Network services</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Go's Unique Features
          </h2>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Error Handling Philosophy
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Go doesn't have exceptions. Instead, functions return errors as values. This explicit error handling makes error paths clear and forces developers to handle errors. While it requires more code, it leads to more robust programs. The pattern of returning (result, error) is ubiquitous in Go code.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Interfaces - Implicit Implementation
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Go interfaces are implemented implicitly. If a type has all the methods an interface requires, it implements that interface automatically. This allows for flexible, decoupled code. You don't need to explicitly declare that a type implements an interface - it just does if it has the right methods.
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Defer Statement
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              The defer statement schedules a function call to run after the surrounding function returns. This is commonly used for cleanup operations like closing files or releasing resources. Defer ensures cleanup happens even if the function returns early or panics, making resource management safer.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Learning Path: From Beginner to Advanced
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 1: Learn the Basics
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Start with Go fundamentals: variables, types, functions, and basic syntax. Learn about packages, imports, and the Go workspace. Understand how to write, compile, and run Go programs. Get comfortable with Go's syntax and way of thinking.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 2: Data Structures and Control Flow
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Master Go's data structures: arrays, slices, maps, and structs. Learn control flow with if/else, for loops, and switch statements. Understand how to work with collections of data and make decisions in your code.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 3: Functions and Error Handling
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Deep dive into functions: multiple return values, variadic functions, and function types. Master Go's error handling pattern. Learn about the defer statement and how to properly handle resources and errors in Go programs.
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 4: Structs, Methods, and Interfaces
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn about structs, methods, and interfaces. Understand how to create custom types, define methods on types, and use interfaces for polymorphism. This is where Go's object-oriented features come into play, though implemented differently than in other languages.
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 5: Concurrency - Goroutines and Channels
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Master Go's concurrency features: goroutines, channels, select statements, and synchronization primitives. Learn how to write concurrent programs safely and efficiently. This is one of Go's most powerful features and what sets it apart from many other languages.
              </p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Step 6: Build Real Projects
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Apply your knowledge by building real projects. Create REST APIs, web servers, CLI tools, or concurrent applications. Build projects that solve real problems. This is the best way to solidify your Go knowledge and become proficient.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Career Opportunities with Go
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Go developers are in high demand, especially in cloud computing, microservices, and backend development. Companies building cloud infrastructure, distributed systems, and high-performance services value Go skills. The language's growth in the industry means more opportunities for Go developers.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Common job titles include Go Developer, Backend Developer, Cloud Engineer, DevOps Engineer, and Systems Programmer. Go developers often work on interesting problems involving scalability, performance, and distributed systems. Many positions offer competitive salaries and opportunities to work on cutting-edge technology.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Our comprehensive Go tutorials cover everything from basics to advanced topics like concurrency, building REST APIs, and creating production-ready applications. We provide practical examples, real-world patterns, and best practices to help you become a proficient Go developer. By completing our tutorials and building projects, you'll develop the skills needed to pursue a career in Go development.
          </p>
        </section>
      </div>

      {/* Search and Posts */}
      <CategorySearch
        posts={goPosts}
        category="Go"
        basePath="/go/golang"
      />
    </div>
  );
}

