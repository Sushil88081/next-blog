---
title: "TypeScript Types - Advanced Type Features"
date: "2025-02-21"
description: "Learn about advanced TypeScript types including union types, intersection types, generics, conditional types, and more advanced type features."
category: "TypeScript Advanced"
tags: ["typescript", "types", "advanced", "generics", "programming"]
image: "/assets/images/typescript.png"
author: "Sushil Kumar"
---

# TypeScript Types - Advanced Type Features

TypeScript has powerful type features that make your code more flexible and type-safe. Let's explore advanced types!

## Union Types

A value can be one of several types:

```typescript
let value: string | number;
value = "hello";  // OK
value = 42;       // OK
value = true;     // Error!
```

### Union Types in Functions

```typescript
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(2));
    }
}
```

## Intersection Types

Combine multiple types:

```typescript
interface Person {
    name: string;
}

interface Employee {
    employeeId: number;
}

type Staff = Person & Employee;

const staff: Staff = {
    name: "John",
    employeeId: 123
};
```

## Literal Types

Specific values as types:

```typescript
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction) {
    // direction can only be one of the four values
}

move("up");    // OK
move("north"); // Error!
```

## Generics

Create reusable, type-safe code:

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("hello");
let output2 = identity<number>(42);
```

### Generic Interfaces

```typescript
interface Container<T> {
    value: T;
    getValue(): T;
}

const stringContainer: Container<string> = {
    value: "hello",
    getValue: () => "hello"
};
```

### Generic Functions

```typescript
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

const firstNumber = getFirst<number>([1, 2, 3]);  // number | undefined
const firstString = getFirst<string>(["a", "b"]);  // string | undefined
```

## Conditional Types

Types that depend on conditions:

```typescript
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>;  // true
type Test2 = IsArray<string>;     // false
```

## Mapped Types

Create new types from existing ones:

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

interface User {
    name: string;
    age: number;
}

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; }
```

## Utility Types

TypeScript provides built-in utility types:

### Partial

Make all properties optional:

```typescript
interface User {
    name: string;
    age: number;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; }
```

### Required

Make all properties required:

```typescript
interface User {
    name?: string;
    age?: number;
}

type RequiredUser = Required<User>;
// { name: string; age: number; }
```

### Pick

Select specific properties:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

type UserName = Pick<User, "name" | "email">;
// { name: string; email: string; }
```

### Omit

Remove specific properties:

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

type UserWithoutEmail = Omit<User, "email">;
// { name: string; age: number; }
```

## Type Guards

Narrow types with type guards:

```typescript
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function process(value: string | number) {
    if (isString(value)) {
        // TypeScript knows value is string here
        console.log(value.toUpperCase());
    } else {
        // TypeScript knows value is number here
        console.log(value.toFixed(2));
    }
}
```

## Visual Explanation: Type System

Here's how TypeScript types work:

```
Type Definition:
┌─────────────────────────────┐
│ type MyType = string | number│
│                             │
│ Value can be:               │
│ - string                    │
│ - number                    │
│ - NOT boolean              │
└─────────────────────────────┘
         │
         │ TypeScript checks
         │
    ┌────┴────┐
    │         │
Valid?    Invalid?
    │         │
    ▼         ▼
Compiles  Error!
```

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between union and intersection?

**A:** 
- **Union (|)** - Value can be one type OR another
- **Intersection (&)** - Value must be ALL types

### Q2: When should I use generics?

**A:** When you want to create reusable code that works with different types:

```typescript
function getFirst<T>(items: T[]): T {
    return items[0];
}
```

### Q3: What are utility types?

**A:** Built-in TypeScript types that transform other types:

```typescript
Partial<T>  // Make all optional
Required<T>  // Make all required
Pick<T, K>   // Select properties
Omit<T, K>   // Remove properties
```

### Q4: What's a type guard?

**A:** A function that narrows a type:

```typescript
function isString(x: unknown): x is string {
    return typeof x === "string";
}
```

### Q5: Can I create my own utility types?

**A:** Yes! Use type aliases:

```typescript
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
```

### Q6: What's the difference between type and interface?

**A:** 
- **type** - Can use unions, intersections, more flexible
- **interface** - Can be extended, merged, better for objects

### Q7: What are conditional types?

**A:** Types that depend on conditions:

```typescript
type IsString<T> = T extends string ? true : false;
```

### Q8: What's mapped types?

**A:** Creating new types by transforming properties:

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

### Q9: Can I use generics with classes?

**A:** Yes!

```typescript
class Container<T> {
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}
```

### Q10: How do I learn advanced types?

**A:** Start with basics (unions, generics), then learn utility types, then conditional and mapped types. Practice with real projects!

---

## Next Steps

Now that you understand advanced types, here's what to learn next:

- **Next:** Learn about [TypeScript with React](/typescript/typescript-react) - Use advanced types in React
- Explore [TypeScript Best Practices](/typescript/typescript-best-practices) - Write better TypeScript
- Understand [TypeScript Compiler Options](/typescript/typescript-config) - Configure TypeScript
- Master [TypeScript Patterns](/typescript/typescript-patterns) - Common type patterns

Advanced types make TypeScript powerful. Practice using them to write better code!

