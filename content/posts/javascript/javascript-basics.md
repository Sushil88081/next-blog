---
title: "JavaScript Basics - Variables, Types, and Syntax"
date: "2025-02-02"
description: "Learn JavaScript fundamentals including variables, data types, operators, and basic syntax. Perfect for beginners starting their JavaScript journey."
category: "JavaScript Basics"
tags: ["javascript", "basics", "variables", "types", "syntax", "beginners"]
image: "/assets/images/javascript.jpg"
author: "Sushil Kumar"
---

# JavaScript Basics - Variables, Types, and Syntax

Welcome to JavaScript basics! This is where your JavaScript journey begins. We'll learn about variables, data types, and how to write basic JavaScript code. Don't worry - I'll explain everything step by step!

## Variables in JavaScript

Variables store data. In JavaScript, you can create variables in three ways:

### 1. var (Old Way - Avoid This)

```javascript
var name = "John";
var age = 25;
```

**Note:** `var` is outdated. Don't use it in modern JavaScript!

### 2. let (For Values That Change)

```javascript
let name = "John";
let age = 25;

name = "Jane";  // OK - can change
age = 30;       // OK - can change
```

### 3. const (For Values That Don't Change)

```javascript
const pi = 3.14159;
const name = "John";

pi = 3.14;  // Error! Can't change const
```

**Best Practice:** Use `const` by default, `let` when you need to change the value.

## Data Types in JavaScript

JavaScript has several data types:

### Numbers

```javascript
let age = 25;           // Integer
let price = 19.99;      // Float
let temperature = -5.5; // Negative number
```

### Strings

Text data:

```javascript
let name = "John";
let message = 'Hello, World!';
let template = `Hello, ${name}!`;  // Template literal
```

### Booleans

True or false:

```javascript
let isActive = true;
let isDone = false;
```

### Undefined

Variable declared but not assigned:

```javascript
let value;
console.log(value);  // undefined
```

### Null

Explicitly empty value:

```javascript
let value = null;
```

### Objects

Collections of data:

```javascript
let person = {
    name: "John",
    age: 25,
    city: "New York"
};
```

### Arrays

Lists of items:

```javascript
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
```

## Type Checking

Check a variable's type:

```javascript
let name = "John";
console.log(typeof name);  // "string"

let age = 25;
console.log(typeof age);   // "number"
```

## Basic Operations

### Arithmetic Operations

```javascript
let a = 10;
let b = 3;

console.log(a + b);  // 13 (addition)
console.log(a - b);  // 7 (subtraction)
console.log(a * b);  // 30 (multiplication)
console.log(a / b);  // 3.333... (division)
console.log(a % b);  // 1 (modulo/remainder)
console.log(a ** b); // 1000 (exponentiation)
```

### String Operations

```javascript
let firstName = "John";
let lastName = "Doe";

// Concatenation
let fullName = firstName + " " + lastName;
console.log(fullName);  // "John Doe"

// Template literals (better way)
let fullName2 = `${firstName} ${lastName}`;
console.log(fullName2);  // "John Doe"

// Length
console.log(fullName.length);  // 8
```

### Comparison Operations

```javascript
let a = 10;
let b = 5;

console.log(a == b);   // false (loose equality)
console.log(a === b);  // false (strict equality)
console.log(a != b);   // true (not equal)
console.log(a !== b);  // true (strict not equal)
console.log(a > b);    // true (greater than)
console.log(a < b);    // false (less than)
console.log(a >= b);   // true (greater than or equal)
console.log(a <= b);   // false (less than or equal)
```

**Important:** Use `===` instead of `==` for strict comparison!

## Logical Operations

```javascript
let isAdult = true;
let hasLicense = false;

console.log(isAdult && hasLicense);  // false (AND)
console.log(isAdult || hasLicense);   // true (OR)
console.log(!isAdult);                // false (NOT)
```

## Comments

Comments help explain your code:

```javascript
// This is a single-line comment

/*
This is a
multi-line comment
*/

// Comments are ignored by JavaScript
```

## Console Output

Print to console:

```javascript
console.log("Hello, World!");
console.log("Name:", name);
console.log(`Age: ${age}`);  // Template literal
```

## Visual Explanation: Variable Assignment

Here's how variables work in JavaScript:

```
Variable Assignment:
┌─────────────────────────────┐
│ let name = "John"            │
│                             │
│ 1. Declare variable         │
│ 2. Assign value "John"      │
│ 3. JavaScript determines    │
│    type: string             │
└─────────────────────────────┘

Memory:
┌──────────────┐
│ name         │
│ ────────────│
│ "John"       │
│ (string)     │
└──────────────┘
```

## Type Coercion

JavaScript automatically converts types in some situations:

```javascript
console.log("5" + 3);    // "53" (string concatenation)
console.log("5" - 3);    // 2 (number subtraction)
console.log("5" * 3);    // 15 (number multiplication)
console.log("5" == 5);   // true (loose equality - converts types)
console.log("5" === 5);  // false (strict equality - no conversion)
```

**Best Practice:** Always use `===` for comparison to avoid surprises!

## Frequently Asked Questions (FAQ)

### Q1: What's the difference between let, const, and var?

**A:** 
- **var** - Old way, function-scoped, avoid using
- **let** - Block-scoped, can be reassigned
- **const** - Block-scoped, cannot be reassigned

Use `const` by default, `let` when you need to change the value.

### Q2: Can I change a variable's type?

**A:** Yes! JavaScript is dynamically typed:

```javascript
let value = "Hello";  // String
value = 42;           // Now it's a number
value = true;         // Now it's a boolean
```

### Q3: What's the difference between == and ===?

**A:** 
- **==** - Loose equality (converts types)
- **===** - Strict equality (no type conversion)

Always use `===` to avoid bugs!

### Q4: What are template literals?

**A:** Template literals use backticks and allow embedded expressions:

```javascript
let name = "John";
let message = `Hello, ${name}!`;  // Template literal
```

They're better than string concatenation!

### Q5: What's the difference between null and undefined?

**A:** 
- **undefined** - Variable declared but not assigned
- **null** - Explicitly set to empty value

```javascript
let x;           // undefined
let y = null;    // null (intentionally empty)
```

### Q6: Can I use numbers as strings?

**A:** Yes, but they behave differently:

```javascript
let num1 = 5;      // Number
let num2 = "5";    // String

console.log(num1 + num1);  // 10 (addition)
console.log(num2 + num2);   // "55" (concatenation)
```

### Q7: How do I check if a variable exists?

**A:** Check if it's not undefined:

```javascript
if (typeof variable !== 'undefined') {
    // Variable exists
}
```

### Q8: What's the difference between an array and an object?

**A:** 
- **Array** - Ordered list, accessed by index `[0]`
- **Object** - Key-value pairs, accessed by key `{name: "John"}`

### Q9: Can I use special characters in variable names?

**A:** Limited! You can use:
- Letters, numbers, `$`, `_`
- Cannot start with a number
- Cannot use spaces or special characters

```javascript
let userName = "John";  // Good
let user_name = "John"; // Good
let $value = 10;        // Good
let 2name = "John";     // Error!
```

### Q10: What happens if I use a variable before declaring it?

**A:** 
- **let/const** - Error (Temporal Dead Zone)
- **var** - undefined (hoisted)

```javascript
console.log(x);  // Error with let/const
let x = 5;
```

---

## Next Steps

Now that you understand JavaScript basics, here's what to learn next:

- **Next:** Learn about [JavaScript Functions](/javascript/javascript-functions) - Write reusable code blocks
- Explore [JavaScript Arrays](/javascript/javascript-arrays) - Work with lists of data
- Understand [JavaScript Objects](/javascript/javascript-objects) - Store and organize data
- Master [JavaScript Control Flow](/javascript/javascript-control-flow) - If statements, loops, and more

Keep practicing! Write small programs to get comfortable with these concepts. JavaScript is all about practice and building things!

