---
title: "React Hooks - Complete Guide"
date: "2025-01-17"
description: "What are React Hooks? Detailed information about useState, useEffect, useContext and other hooks."
category: "React Advanced"
tags: ["react", "hooks", "useState", "useEffect"]
image: "/images/react-hooks.jpg"
author: "Sushil Kumar"
---

# React Hooks - Complete Guide

React Hooks were introduced in React 16.8. Hooks are functions that allow you to use state and lifecycle features in functional components.

## Why are Hooks Important?

Previously, state and lifecycle methods could only be used in class components. With Hooks, you can use these features in functional components as well.

## Rules of Hooks

1. **Only call Hooks at the top level** - not inside loops, conditions, or nested functions
2. **Only call from React functions** - not from regular JavaScript functions

## useState Hook

`useState` is used to create and manage state.

```jsx
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

## useEffect Hook

`useEffect` is used to perform side effects, such as data fetching, subscriptions, or DOM manipulation.

### Basic Syntax

```jsx
import { useEffect } from 'react';

function Example() {
  useEffect(() => {
    // Side effect code
    console.log('Component mounted');
  }, []); // Empty dependency array = runs once

  return <div>Example</div>;
}
```

### With Dependencies

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Runs when userId changes

  return <div>{user?.name}</div>;
}
```

### Cleanup Function

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);

  return () => {
    clearInterval(timer); // Cleanup
  };
}, []);
```

## useContext Hook

`useContext` is used to read context values.

```jsx
import { useContext, createContext } from 'react';

const ThemeContext = createContext('light');

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
```

## useReducer Hook

`useReducer` is used to manage complex state logic.

```jsx
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

## useMemo Hook

`useMemo` is used to memoize expensive calculations.

```jsx
import { useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>Total: {expensiveValue}</div>;
}
```

## useCallback Hook

`useCallback` is used to memoize functions.

```jsx
import { useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return <Child onClick={handleClick} />;
}
```

## Custom Hooks

You can also create your own custom hooks:

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Usage
function Counter() {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Common Hooks Summary

| Hook | Purpose |
|------|---------|
| `useState` | To manage state |
| `useEffect` | For side effects |
| `useContext` | To read context |
| `useReducer` | For complex state logic |
| `useMemo` | To memoize expensive calculations |
| `useCallback` | To memoize functions |
| `useRef` | To store DOM elements or values |

## Visual Explanation: Hooks Flow

Here's how hooks work in a component:

```
Component Function
┌─────────────────────────────────┐
│ function MyComponent() {        │
│                                 │
│   useState() ───────────────┐  │
│   useEffect() ──────────────┼──┼──┐
│   useContext() ─────────────┼──┼──┼──┐
│                             │  │  │  │
│   return JSX               │  │  │  │
│ }                           │  │  │  │
└─────────────────────────────┼──┼──┼──┘
                              │  │  │
                              ▼  ▼  ▼
                    React Hooks System
                    ┌──────────────┐
                    │ Manages State │
                    │ & Side Effects│
                    └──────────────┘
```

## Hooks Rules Visualization

```
✅ CORRECT:
┌─────────────────────────────┐
│ function Component() {      │
│   const [state] = useState()│ ← Top level
│   useEffect(() => {})       │ ← Top level
│                             │
│   if (condition) {          │
│     return <div>...</div>   │
│   }                         │
│                             │
│   return <div>...</div>     │
│ }                           │
└─────────────────────────────┘

❌ WRONG:
┌─────────────────────────────┐
│ function Component() {      │
│   if (condition) {          │
│     useState() ← Can't do!  │
│   }                         │
│                             │
│   for (let i = 0; i < 5; i++)│
│     useEffect() ← Can't do! │
│ }                           │
└─────────────────────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: Can I use hooks conditionally?

**A:** No! Hooks must always be called in the same order. Don't put them in if statements, loops, or nested functions. Always call them at the top level of your component.

### Q2: What happens if I break the rules of hooks?

**A:** React will show an error. The most common error is "React Hook useEffect is called conditionally." Always call hooks unconditionally at the top level.

### Q3: Can I create my own hooks?

**A:** Yes! Custom hooks are just functions that start with "use" and can call other hooks. They're a great way to reuse logic.

### Q4: Do hooks work in class components?

**A:** No! Hooks only work in functional components. If you need hooks, convert your class component to a functional component.

### Q5: What's the difference between useState and useReducer?

**A:** 
- **useState** - Simple state (single value or object)
- **useReducer** - Complex state (multiple actions, complex logic)

Use useState for simple cases, useReducer when state logic gets complex.

### Q6: Can I use multiple hooks of the same type?

**A:** Yes! You can have multiple useState, useEffect, etc.:

```jsx
function Component() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  // Multiple useState hooks are fine!
}
```

### Q7: Do hooks replace class components completely?

**A:** Almost! Hooks can do everything class components can do. Class components are still supported but not recommended for new code. Use functional components with hooks.

### Q8: What's the purpose of useMemo and useCallback?

**A:** They optimize performance by memoizing values and functions. Use them when you have expensive calculations or want to prevent unnecessary re-renders.

### Q9: Can I use hooks in regular JavaScript functions?

**A:** No! Hooks only work in:
- React functional components
- Custom hooks (functions starting with "use")

Regular functions can't use hooks.

### Q10: How do I know which hook to use?

**A:** 
- **useState** - For state
- **useEffect** - For side effects
- **useContext** - For context values
- **useRef** - For DOM refs or values that don't trigger re-renders
- **useMemo** - For expensive calculations
- **useCallback** - For memoizing functions

Start with useState and useEffect - they cover 90% of use cases!

---

## Next Steps

Now that you understand React Hooks, here's what to learn next:

- **Next:** Learn about [Custom Hooks](/react/react-custom-hooks) - Create your own reusable hooks
- Explore [Context API](/react/react-context-api) - Use Context with hooks
- Master [Performance Tips](/react/react-performance-tips) - Optimize hooks performance
