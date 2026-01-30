---
title: "TypeScript Interfaces - Complete Guide"
date: "2025-02-19"
description: "Learn about TypeScript interfaces, how to define them, and how to use them effectively. Understand interface inheritance, optional properties, and more."
category: "TypeScript Basics"
tags: ["typescript", "interfaces", "types", "programming"]
image: "/assets/images/typescript.png"
author: "Sushil Kumar"
---

# TypeScript Interfaces - Complete Guide

Interfaces are one of TypeScript's most powerful features. They let you define the shape of objects and ensure type safety. Let's master interfaces!

## What is an Interface?

An interface defines the structure of an object. It's like a contract - it says "this object must have these properties with these types."

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}
```

## Basic Interface

```typescript
interface Person {
    name: string;
    age: number;
}

function greet(person: Person): string {
    return `Hello, ${person.name}!`;
}

const user: Person = {
    name: "John",
    age: 25
};

greet(user);  // "Hello, John!"
```

## Optional Properties

Properties that might not exist:

```typescript
interface User {
    name: string;
    age: number;
    email?: string;  // Optional property
}

const user1: User = {
    name: "John",
    age: 25
    // email is optional, so we can omit it
};

const user2: User = {
    name: "Jane",
    age: 30,
    email: "jane@example.com"
};
```

## Readonly Properties

Properties that can't be changed after creation:

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };
point.x = 5;  // Error! Cannot assign to readonly property
```

## Function Types in Interfaces

Define function signatures:

```typescript
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

const calc: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};
```

## Index Signatures

Allow additional properties:

```typescript
interface Dictionary {
    [key: string]: string;
}

const colors: Dictionary = {
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff"
};
```

## Extending Interfaces

Interfaces can extend other interfaces:

```typescript
interface Animal {
    name: string;
    age: number;
}

interface Dog extends Animal {
    breed: string;
    bark(): void;
}

const myDog: Dog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever",
    bark: () => console.log("Woof!")
};
```

## Multiple Inheritance

Interfaces can extend multiple interfaces:

```typescript
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

interface Duck extends Flyable, Swimmable {
    name: string;
}

const duck: Duck = {
    name: "Donald",
    fly: () => console.log("Flying!"),
    swim: () => console.log("Swimming!")
};
```

## Interface vs Type Alias

Both can define object shapes, but interfaces can be extended:

```typescript
// Interface
interface User {
    name: string;
}

// Type alias
type User = {
    name: string;
}

// Interface can be extended
interface Admin extends User {
    role: string;
}

// Type alias uses intersection
type Admin = User & {
    role: string;
}
```

## Generic Interfaces

Interfaces with type parameters:

```typescript
interface Container<T> {
    value: T;
    getValue(): T;
}

const stringContainer: Container<string> = {
    value: "Hello",
    getValue: function() { return this.value; }
};

const numberContainer: Container<number> = {
    value: 42,
    getValue: function() { return this.value; }
};
```

## Visual Explanation: Interface Structure

Here's how interfaces work:

```
Interface Definition:
┌─────────────────────────────┐
│ interface User {            │
│     name: string;          │
│     age: number;           │
│     email?: string;        │
│ }                           │
└─────────────────────────────┘
         │
         │ Objects must match
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│User1   │ │User2   │
│name    │ │name    │
│age     │ │age     │
│email   │ │(no email)│
└────────┘ └────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between interface and type?

**A:** 
- **Interface** - Can be extended, merged
- **Type** - More flexible, can use unions/intersections

For objects, both work similarly. Use interface for objects, type for unions.

### Q2: Can interfaces have optional properties?

**A:** Yes! Use `?`:

```typescript
interface User {
    name: string;
    email?: string;  // Optional
}
```

### Q3: Can I make properties readonly?

**A:** Yes! Use `readonly`:

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
```

### Q4: Can interfaces extend other interfaces?

**A:** Yes! Use `extends`:

```typescript
interface Child extends Parent {
    // Additional properties
}
```

### Q5: What's the difference between interface and class?

**A:** 
- **Interface** - Defines structure (compile-time only)
- **Class** - Defines structure AND implementation (runtime)

Interfaces are for type checking, classes are for creating objects.

### Q6: Can interfaces have methods?

**A:** Yes! Define method signatures:

```typescript
interface Calculator {
    add(a: number, b: number): number;
}
```

### Q7: What are index signatures?

**A:** Allow additional properties with specific key/value types:

```typescript
interface Dictionary {
    [key: string]: string;
}
```

### Q8: Can I use interfaces with functions?

**A:** Yes! Define function types:

```typescript
interface MathOperation {
    (a: number, b: number): number;
}
```

### Q9: What's interface merging?

**A:** TypeScript automatically merges interfaces with the same name:

```typescript
interface User {
    name: string;
}

interface User {
    age: number;
}

// User now has both name and age
```

### Q10: When should I use interfaces?

**A:** Use interfaces for:
- Object shapes
- Function types
- Class contracts
- API responses
- Configuration objects

---

## Next Steps

Now that you understand interfaces, here's what to learn next:

- **Next:** Learn about [TypeScript Types](/typescript/typescript-types) - Advanced type features
- Explore [TypeScript with React](/typescript/typescript-react) - Use interfaces in React
- Understand [TypeScript Generics](/typescript/typescript-generics) - Create reusable types
- Master [TypeScript Utility Types](/typescript/typescript-utility-types) - Built-in type helpers

Interfaces are essential in TypeScript. Practice defining and using interfaces to get comfortable!
