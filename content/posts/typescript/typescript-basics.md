---
title: "TypeScript Basics - Types, Variables, and Syntax"
date: "2025-01-31"
description: "Learn TypeScript fundamentals including types, type annotations, variables, and basic syntax. Perfect for JavaScript developers learning TypeScript."
category: "TypeScript Basics"
tags: ["typescript", "basics", "types", "variables", "syntax"]
image: "/assets/images/typescript.png"
author: "Sushil Kumar"
---

# TypeScript Basics - Types, Variables, and Syntax

Welcome to TypeScript basics! If you know JavaScript, you're already halfway there. TypeScript adds types to JavaScript, making your code safer and easier to work with. Let's dive in!

## What Makes TypeScript Different?

TypeScript is JavaScript with types. The main difference is you can (and should) specify types:

```typescript
// JavaScript
let name = "John";

// TypeScript
let name: string = "John";
```

The `: string` part is a type annotation - it tells TypeScript what type `name` should be.

## Basic Types

TypeScript has several basic types:

### String

```typescript
let name: string = "John";
let message: string = 'Hello, World!';
let template: string = `Hello, ${name}!`;
```

### Number

```typescript
let age: number = 25;
let price: number = 19.99;
let count: number = 100;
```

### Boolean

```typescript
let isActive: boolean = true;
let isDone: boolean = false;
```

### Array

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["John", "Jane", "Bob"];

// Alternative syntax
let numbers2: Array<number> = [1, 2, 3];
```

### Any

Use `any` when you don't know the type (try to avoid it):

```typescript
let value: any = "Hello";
value = 42;  // OK, but loses type safety
```

### Void

Used for functions that don't return anything:

```typescript
function logMessage(): void {
    console.log("Hello");
}
```

### Null and Undefined

```typescript
let value: null = null;
let value2: undefined = undefined;
```

## Type Inference

TypeScript can often figure out types automatically:

```typescript
let name = "John";  // TypeScript knows it's a string
let age = 25;       // TypeScript knows it's a number
```

You don't always need to write types explicitly!

## Variables

### let and const

```typescript
let name: string = "John";  // Can be reassigned
name = "Jane";  // OK

const age: number = 25;  // Cannot be reassigned
age = 30;  // Error!
```

### var (Avoid This)

```typescript
var oldWay = "Don't use this";  // Avoid var in modern code
```

## Functions

### Function with Types

```typescript
function greet(name: string): string {
    return `Hello, ${name}!`;
}

let message: string = greet("John");
```

### Arrow Functions

```typescript
const add = (a: number, b: number): number => {
    return a + b;
};

// Shorter version
const multiply = (a: number, b: number): number => a * b;
```

### Optional Parameters

```typescript
function greet(name: string, age?: number): string {
    if (age) {
        return `Hello, ${name}, you are ${age} years old!`;
    }
    return `Hello, ${name}!`;
}
```

### Default Parameters

```typescript
function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}
```

## Objects

### Object Types

```typescript
let user: { name: string; age: number } = {
    name: "John",
    age: 25
};
```

### Interfaces (Better Way)

```typescript
interface User {
    name: string;
    age: number;
    email?: string;  // Optional property
}

let user: User = {
    name: "John",
    age: 25
};
```

## Union Types

A value can be one of several types:

```typescript
let value: string | number;
value = "Hello";  // OK
value = 42;       // OK
value = true;     // Error!
```

## Type Aliases

Create your own type names:

```typescript
type ID = string | number;

let userId: ID = "123";
let productId: ID = 456;
```

## Visual Explanation: Type Checking

Here's how TypeScript checks types:

```
TypeScript Code:
┌─────────────────────────────┐
│ let name: string = "John"  │
│ name = 123                  │
└──────────────┬──────────────┘
               │
               ▼
┌──────────────┐
│ TypeScript   │
│ Compiler     │
│              │
│ Checks:      │
│ name is      │
│ string, but  │
│ 123 is       │
│ number       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Error!       │
│ Type 'number'│
│ is not       │
│ assignable   │
│ to 'string'  │
└──────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: Do I need to add types everywhere?

**A:** No! TypeScript can infer many types. Add types when:
- TypeScript can't figure it out
- You want to be explicit
- It makes code clearer

### Q2: What's the difference between : and = in TypeScript?

**A:** 
- **:** - Type annotation (specifies type)
- **=** - Assignment (assigns value)

```typescript
let name: string = "John";
//      ^        ^
//   type    assignment
```

### Q3: Can I use TypeScript without types?

**A:** Yes! TypeScript allows JavaScript code. But you lose the benefits of TypeScript. Gradually add types as you learn.

### Q4: What's the difference between interface and type?

**A:** 
- **interface** - Can be extended, merged
- **type** - More flexible, can use unions, intersections

For objects, both work similarly. Use interface for objects, type for unions/intersections.

### Q5: What does ? mean in TypeScript?

**A:** Makes a property or parameter optional:

```typescript
interface User {
    name: string;
    age?: number;  // Optional
}
```

### Q6: Can I use TypeScript in the browser?

**A:** No! TypeScript compiles to JavaScript first. Browsers only understand JavaScript. The TypeScript compiler converts your code.

### Q7: What's the difference between any and unknown?

**A:** 
- **any** - Disables type checking (avoid if possible)
- **unknown** - Type-safe version of any (must check before using)

```typescript
let value: unknown = "Hello";
// value.toUpperCase();  // Error!
if (typeof value === "string") {
    value.toUpperCase();  // OK
}
```

### Q8: How do I handle errors in TypeScript?

**A:** TypeScript catches type errors at compile time. For runtime errors, use try-catch like in JavaScript.

### Q9: Can I convert JavaScript to TypeScript gradually?

**A:** Yes! Start by renaming `.js` files to `.ts` and add types gradually. TypeScript is designed for gradual adoption.

### Q10: What's the difference between let and const?

**A:** 
- **let** - Can be reassigned
- **const** - Cannot be reassigned (but object properties can change)

```typescript
let x = 1;
x = 2;  // OK

const y = 1;
y = 2;  // Error!

const obj = { name: "John" };
obj.name = "Jane";  // OK (object property can change)
```

---

## Next Steps

Now that you understand TypeScript basics, here's what to learn next:

- **Next:** Learn about [TypeScript Interfaces](/typescript/typescript-interfaces) - Define object shapes and contracts
- Explore [TypeScript Functions](/typescript/typescript-functions) - Advanced function types and overloads
- Understand [TypeScript with React](/typescript/typescript-react) - Use TypeScript in React projects
- Master [TypeScript Advanced Types](/typescript/typescript-advanced) - Generics, unions, and more

TypeScript makes JavaScript development much better. Keep practicing and adding types to your code!

