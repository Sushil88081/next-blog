---
title: "React Hooks - पूरी गाइड"
date: "2025-01-25"
description: "React Hooks क्या हैं? useState, useEffect, useContext और अन्य hooks के बारे में विस्तृत जानकारी।"
category: "React Advanced"
tags: ["react", "hooks", "useState", "useEffect", "हिंदी"]
image: "/images/react-hooks.jpg"
author: "आपका नाम"
---

# React Hooks - पूरी गाइड

React Hooks React 16.8 में introduce किए गए थे। Hooks functions हैं जो आपको functional components में state और lifecycle features use करने की अनुमति देते हैं।

## Hooks क्यों जरूरी हैं?

पहले, state और lifecycle methods केवल class components में use हो सकते थे। Hooks के साथ, आप functional components में भी ये features use कर सकते हैं।

## Hooks के नियम

1. **Hooks को केवल top level पर call करें** - loops, conditions, या nested functions में नहीं
2. **केवल React functions में call करें** - regular JavaScript functions में नहीं

## useState Hook

`useState` state बनाने और manage करने के लिए use होता है।

```jsx
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

## useEffect Hook

`useEffect` side effects perform करने के लिए use होता है, जैसे data fetching, subscriptions, या DOM manipulation।

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

### Dependencies के साथ

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

`useContext` context value को read करने के लिए use होता है।

```jsx
import { useContext, createContext } from 'react';

const ThemeContext = createContext('light');

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
```

## useReducer Hook

`useReducer` complex state logic manage करने के लिए use होता है।

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

`useMemo` expensive calculations को memoize करने के लिए use होता है।

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

`useCallback` functions को memoize करने के लिए use होता है।

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

आप अपने custom hooks भी बना सकते हैं:

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
| `useState` | State manage करने के लिए |
| `useEffect` | Side effects के लिए |
| `useContext` | Context read करने के लिए |
| `useReducer` | Complex state logic के लिए |
| `useMemo` | Expensive calculations memoize करने के लिए |
| `useCallback` | Functions memoize करने के लिए |
| `useRef` | DOM elements या values store करने के लिए |

## निष्कर्ष

React Hooks functional components को powerful बनाते हैं। वे code को simpler और reusable बनाते हैं।

## अगले कदम

- Custom hooks बनाना सीखें
- Performance optimization के लिए hooks use करें
- Advanced hooks patterns explore करें

