---
title: "React Hooks - Complete Guide"
date: "2025-01-13"
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

## Conclusion

React Hooks make functional components powerful. They make code simpler and more reusable.

## Next Steps

Now that you understand React Hooks, here's what to learn next:

- **Next:** Learn about [Custom Hooks](/react/react-custom-hooks) - Create your own reusable hooks
- Explore [Context API](/react/react-context-api) - Use Context with hooks
- Master [Performance Tips](/react/react-performance-tips) - Optimize hooks performance
