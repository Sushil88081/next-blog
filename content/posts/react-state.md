---
title: "What is State in React?"
date: "2025-01-20"
description: "How to use State in React, complete guide. Learn about useState hook, state management and best practices."
category: "React Basics"
tags: ["react", "state", "hooks", "useState"]
image: "/images/react-state.jpg"
author: "sushil kumar"
---

# What is State in React?

State is a very important concept in React. State is the internal data of a component that can change over time. When state changes, the component automatically re-renders.

## Why is State Important?

State makes components dynamic. Without state, components remain static and cannot change with user interaction.

## useState Hook

In React Hooks, the `useState` hook is used to create state.

### Basic Syntax

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}
```

### How does useState work?

1. `useState(0)` - creates state with initial value 0
2. `count` - current state value
3. `setCount` - function to update state

## State Examples

### Counter Example

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Form Input Example

```jsx
function NameInput() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

## Multiple State Variables

You can use multiple state variables in one component:

```jsx
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </div>
  );
}
```

## State Update Best Practices

### 1. Functional Updates

When you need to depend on previous state:

```jsx
setCount(prevCount => prevCount + 1);
```

### 2. Object State Updates

```jsx
const [user, setUser] = useState({ name: '', age: 0 });

// Correct way
setUser({ ...user, name: 'John' });

// Wrong way
user.name = 'John';
setUser(user);
```

### 3. Array State Updates

```jsx
const [items, setItems] = useState([]);

// Add item
setItems([...items, newItem]);

// Remove item
setItems(items.filter(item => item.id !== id));
```

## State vs Props

| State | Props |
|-------|-------|
| Created inside component | Passed from parent |
| Can be changed | Read-only |
| Causes component to re-render | Re-renders when props change |

## Conclusion

State is the main way to create dynamic components in React. Using the `useState` hook, you can easily manage state.

## Next Steps

- Learn useEffect Hook
- Learn State management patterns
- Read about Context API
