---
title: "How to Install TypeScript - Step by Step Guide"
date: "2025-02-19"
description: "Complete guide on installing TypeScript. Learn how to set up TypeScript in your project, configure it, and start writing type-safe code."
category: "TypeScript Basics"
tags: ["typescript", "installation", "setup", "getting-started"]
image: "/assets/images/typescript.png"
author: "Sushil Kumar"
---

# How to Install TypeScript - Step by Step Guide

Ready to start using TypeScript? Great! Let me show you how to install and set it up. TypeScript makes JavaScript safer and more maintainable!

## Prerequisites

Before installing TypeScript, you need:
- **Node.js** installed (TypeScript needs Node.js)
- **npm** (comes with Node.js)
- A code editor (VS Code recommended)

Check if you have Node.js:

```bash
node --version
npm --version
```

If you see version numbers, you're good to go!

## Method 1: Install TypeScript Globally

Install TypeScript globally on your system:

```bash
npm install -g typescript
```

### Verify Installation

```bash
tsc --version
```

You should see: `Version 4.x.x` (or similar)

## Method 2: Install TypeScript in Project (Recommended)

Install TypeScript in your project folder:

```bash
# Create project folder
mkdir my-typescript-project
cd my-typescript-project

# Initialize npm
npm init -y

# Install TypeScript
npm install --save-dev typescript
```

### Use Local TypeScript

```bash
# Use npx to run local TypeScript
npx tsc --version

# Or add to package.json scripts
```

## Creating Your First TypeScript File

Create a file called `hello.ts`:

```typescript
let message: string = "Hello, TypeScript!";
console.log(message);
```

## Compiling TypeScript

Compile TypeScript to JavaScript:

```bash
tsc hello.ts
```

This creates `hello.js` file!

### Run the JavaScript

```bash
node hello.js
```

## TypeScript Configuration

Create `tsconfig.json` for project settings:

```bash
tsc --init
```

This creates a `tsconfig.json` file with default settings.

### Basic tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Using TypeScript with React

### Create React App with TypeScript

```bash
npx create-react-app my-app --template typescript
```

### Or add TypeScript to existing React app

```bash
npm install --save-dev typescript @types/react @types/react-dom
```

## Using TypeScript with Node.js

### Setup Node.js Project

```bash
mkdir my-node-project
cd my-node-project
npm init -y
npm install --save-dev typescript @types/node
npx tsc --init
```

### Update tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  }
}
```

## Visual Explanation: TypeScript Workflow

Here's how TypeScript works:

```
TypeScript File (.ts)
┌──────────────┐
│ let x: number│
│ = 5;         │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ TypeScript   │
│ Compiler     │
│ (tsc)        │
│              │
│ - Checks     │
│   types      │
│ - Finds      │
│   errors     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ JavaScript   │
│ File (.js)   │
│              │
│ let x = 5;   │
└──────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: Do I need to install TypeScript separately?

**A:** Yes! TypeScript is not built into browsers. You need to install it and compile to JavaScript.

### Q2: What's the difference between global and local installation?

**A:** 
- **Global** - Available everywhere, use `tsc` command
- **Local** - Only in project, use `npx tsc` or `npm run build`

For projects, local is better!

### Q3: Do I need tsconfig.json?

**A:** Not required, but highly recommended! It configures how TypeScript compiles your code.

### Q4: Can I use TypeScript without compilation?

**A:** No! TypeScript must compile to JavaScript. But tools like `ts-node` let you run TypeScript directly:

```bash
npm install -g ts-node
ts-node hello.ts
```

### Q5: How do I watch for changes?

**A:** Use watch mode:

```bash
tsc --watch
```

Recompiles automatically when files change!

### Q6: Can I use TypeScript in the browser?

**A:** Not directly! TypeScript compiles to JavaScript first. Browsers only understand JavaScript.

### Q7: What's @types packages?

**A:** Type definitions for JavaScript libraries:

```bash
npm install --save-dev @types/node
npm install --save-dev @types/react
```

### Q8: How do I update TypeScript?

**A:** 

```bash
# Global
npm install -g typescript@latest

# Local
npm install --save-dev typescript@latest
```

### Q9: Can I use TypeScript with JavaScript files?

**A:** Yes! TypeScript can work with `.js` files. Just rename to `.ts` and add types gradually.

### Q10: What's the latest TypeScript version?

**A:** Check with:

```bash
npm view typescript version
```

Or visit typescriptlang.org for latest version.

---

## Next Steps

Now that TypeScript is installed, here's what to learn next:

- **Next:** Learn about [TypeScript Basics](/typescript/typescript-basics) - Types, variables, and syntax
- Explore [TypeScript Interfaces](/typescript/typescript-interfaces) - Define object shapes
- Understand [TypeScript with React](/typescript/typescript-react) - Use TypeScript in React
- Master [TypeScript Advanced Types](/typescript/typescript-advanced) - Generics and more

TypeScript is installed! Start writing type-safe code!

