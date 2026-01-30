---
title: "Go Concurrency - Goroutines and Channels"
date: "2025-02-10"
description: "Learn about Go's powerful concurrency features. Understand goroutines, channels, and how to write concurrent programs in Go."
category: "Go Advanced"
tags: ["golang", "concurrency", "goroutines", "channels", "parallel"]
image: "/assets/images/golang.jpg"
author: "Sushil Kumar"
---

# Go Concurrency - Goroutines and Channels

Concurrency is one of Go's strongest features. It lets you run multiple tasks at the same time, making your programs faster and more efficient. Let's learn how to use it!

## What is Concurrency?

Concurrency means doing multiple things at the same time. Think of it like a restaurant - one chef can start cooking while another prepares ingredients. Both tasks happen simultaneously!

**Concurrency vs Parallelism:**
- **Concurrency** - Managing multiple tasks (can run on one CPU)
- **Parallelism** - Running tasks simultaneously (needs multiple CPUs)

Go makes concurrency easy with goroutines and channels!

## Goroutines

Goroutines are lightweight threads managed by Go. They're super cheap to create - you can have thousands of them!

### Basic Goroutine

```go
package main

import (
    "fmt"
    "time"
)

func sayHello() {
    for i := 0; i < 5; i++ {
        fmt.Println("Hello", i)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    // Start goroutine
    go sayHello()
    
    // Main continues immediately
    fmt.Println("Main function")
    time.Sleep(1 * time.Second)
}
```

### Multiple Goroutines

```go
func printNumbers() {
    for i := 1; i <= 5; i++ {
        fmt.Println("Number:", i)
        time.Sleep(100 * time.Millisecond)
    }
}

func printLetters() {
    for i := 'a'; i <= 'e'; i++ {
        fmt.Println("Letter:", string(i))
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    go printNumbers()
    go printLetters()
    
    time.Sleep(1 * time.Second)
}
```

## Channels

Channels are how goroutines communicate. Think of them as pipes - you send data in one end and receive it from the other.

### Creating Channels

```go
// Unbuffered channel
ch := make(chan int)

// Buffered channel (can hold 5 values)
ch := make(chan int, 5)
```

### Sending and Receiving

```go
ch := make(chan string)

// Send data
go func() {
    ch <- "Hello"  // Send
}()

// Receive data
msg := <-ch  // Receive
fmt.Println(msg)  // "Hello"
```

### Complete Example

```go
package main

import "fmt"

func sendData(ch chan string) {
    ch <- "Hello"
    ch <- "World"
    close(ch)  // Close channel when done
}

func main() {
    ch := make(chan string)
    
    go sendData(ch)
    
    // Receive data
    for msg := range ch {
        fmt.Println(msg)
    }
}
// Output:
// Hello
// World
```

## Channel Directions

You can specify channel direction:

```go
// Send-only channel
func sendOnly(ch chan<- string) {
    ch <- "Hello"
}

// Receive-only channel
func receiveOnly(ch <-chan string) {
    msg := <-ch
    fmt.Println(msg)
}
```

## Buffered Channels

Buffered channels can hold values without blocking:

```go
ch := make(chan int, 3)  // Buffer size 3

ch <- 1  // Doesn't block
ch <- 2  // Doesn't block
ch <- 3  // Doesn't block
ch <- 4  // Blocks until space available
```

## Select Statement

Select lets you wait on multiple channels:

```go
select {
case msg1 := <-ch1:
    fmt.Println("Received from ch1:", msg1)
case msg2 := <-ch2:
    fmt.Println("Received from ch2:", msg2)
case <-time.After(1 * time.Second):
    fmt.Println("Timeout!")
}
```

## Real-World Example: Worker Pool

```go
package main

import (
    "fmt"
    "sync"
)

func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {
        fmt.Printf("Worker %d processing job %d\n", id, job)
        results <- job * 2  // Process job
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    
    // Start 3 workers
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
    
    // Send jobs
    for j := 1; j <= 5; j++ {
        jobs <- j
    }
    close(jobs)
    
    // Collect results
    for r := 1; r <= 5; r++ {
        fmt.Println("Result:", <-results)
    }
}
```

## WaitGroups

WaitGroups wait for goroutines to finish:

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()  // Signal completion
    
    fmt.Printf("Worker %d starting\n", id)
    time.Sleep(time.Second)
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    var wg sync.WaitGroup
    
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    
    wg.Wait()  // Wait for all workers
    fmt.Println("All workers done")
}
```

## Mutex (Mutual Exclusion)

Protect shared data:

```go
package main

import (
    "fmt"
    "sync"
)

type SafeCounter struct {
    mu    sync.Mutex
    value int
}

func (c *SafeCounter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func (c *SafeCounter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}

func main() {
    counter := SafeCounter{}
    var wg sync.WaitGroup
    
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }
    
    wg.Wait()
    fmt.Println("Final value:", counter.Value())  // 1000
}
```

## Visual Explanation: Goroutines and Channels

Here's how concurrency works:

```
Goroutines Flow:
┌─────────────────────────────┐
│ Main Goroutine              │
│   │                         │
│   ├─► Goroutine 1           │
│   ├─► Goroutine 2           │
│   └─► Goroutine 3           │
│                             │
│ All run concurrently        │
└─────────────────────────────┘

Channel Communication:
┌──────────────┐         ┌──────────────┐
│ Goroutine 1  │         │ Goroutine 2  │
│              │         │              │
│ ch <- data   │────────►│ data := <-ch │
│              │         │              │
└──────────────┘         └──────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between goroutine and thread?

**A:** 
- **Goroutine** - Lightweight, managed by Go runtime, cheaper
- **Thread** - OS-level, heavier, more expensive

Goroutines are much cheaper - you can have millions!

### Q2: How do I wait for a goroutine to finish?

**A:** Use WaitGroup or channels:

```go
var wg sync.WaitGroup
wg.Add(1)
go func() {
    defer wg.Done()
    // Work
}()
wg.Wait()
```

### Q3: What's the difference between buffered and unbuffered channels?

**A:** 
- **Unbuffered** - Sender blocks until receiver ready
- **Buffered** - Sender blocks only when buffer full

### Q4: Can I close a channel?

**A:** Yes! Close when sender is done:

```go
close(ch)
```

Receivers can check if channel is closed:

```go
msg, ok := <-ch
if !ok {
    // Channel closed
}
```

### Q5: What happens if I send to a closed channel?

**A:** Panic! Always close from sender side, and only once.

### Q6: How do I prevent race conditions?

**A:** Use mutexes or channels to synchronize access to shared data:

```go
var mu sync.Mutex
mu.Lock()
// Critical section
mu.Unlock()
```

### Q7: What's a deadlock?

**A:** When goroutines wait for each other forever:

```go
ch := make(chan int)
ch <- 1  // Blocks forever (no receiver)
```

### Q8: Can I use select with default?

**A:** Yes! Default makes select non-blocking:

```go
select {
case msg := <-ch:
    fmt.Println(msg)
default:
    fmt.Println("No message")
}
```

### Q9: How many goroutines can I create?

**A:** Thousands or even millions! Goroutines are very lightweight. Only limited by available memory.

### Q10: When should I use channels vs mutexes?

**A:** 
- **Channels** - Communication between goroutines
- **Mutexes** - Protecting shared data

Use channels for communication, mutexes for synchronization.

---

## Next Steps

Now that you understand concurrency, here's what to learn next:

- **Next:** Learn about [Go REST API](/go/golang-rest-api) - Build concurrent APIs
- Explore [Go Error Handling](/go/golang-errors) - Handle errors in goroutines
- Understand [Go Context](/go/golang-context) - Cancel and timeout goroutines
- Master [Go Best Practices](/go/golang-best-practices) - Write better concurrent code

Concurrency is powerful in Go. Practice using goroutines and channels to get comfortable!

