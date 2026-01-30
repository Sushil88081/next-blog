---
title: "TypeScript with React - Complete Guide"
date: "2025-02-20"
description: "Learn how to use TypeScript with React. Understand how to type components, props, state, hooks, and build type-safe React applications."
category: "TypeScript Advanced"
tags: ["typescript", "react", "typescript-react", "web-development"]
image: "/assets/images/typescript.png"
author: "Sushil Kumar"
---

# TypeScript with React - Complete Guide

Using TypeScript with React makes your code safer and easier to maintain. You get autocomplete, error checking, and better developer experience. Let's learn how to combine them!

## Why Use TypeScript with React?

TypeScript adds type safety to React:
- Catch errors before runtime
- Better autocomplete in your IDE
- Self-documenting code
- Easier refactoring
- Better team collaboration

## Setting Up TypeScript with React

### Create React App with TypeScript

```bash
npx create-react-app my-app --template typescript
```

Or with Vite:

```bash
npm create vite@latest my-app -- --template react-ts
```

## Typing Components

### Functional Component

```typescript
import React from 'react';

interface Props {
    name: string;
    age: number;
}

const Person: React.FC<Props> = ({ name, age }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Age: {age}</p>
        </div>
    );
};

export default Person;
```

### Alternative Syntax (Recommended)

```typescript
interface Props {
    name: string;
    age: number;
}

function Person({ name, age }: Props) {
    return (
        <div>
            <h1>{name}</h1>
            <p>Age: {age}</p>
        </div>
    );
}

export default Person;
```

## Typing Props

### Basic Props

```typescript
interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
}
```

### Props with Children

```typescript
interface ContainerProps {
    children: React.ReactNode;
    title: string;
}

function Container({ children, title }: ContainerProps) {
    return (
        <div>
            <h2>{title}</h2>
            {children}
        </div>
    );
}
```

### Props with Event Handlers

```typescript
interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({ value, onChange, onFocus }: InputProps) {
    return (
        <input
            value={value}
            onChange={onChange}
            onFocus={onFocus}
        />
    );
}
```

## Typing State

### useState Hook

```typescript
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}
```

### useState with Objects

```typescript
interface User {
    name: string;
    age: number;
    email: string;
}

function UserForm() {
    const [user, setUser] = useState<User>({
        name: '',
        age: 0,
        email: ''
    });
    
    const updateName = (name: string) => {
        setUser({ ...user, name });
    };
    
    return (
        <input
            value={user.name}
            onChange={(e) => updateName(e.target.value)}
        />
    );
}
```

## Typing useEffect

```typescript
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
}

function UserProfile({ userId }: { userId: number }) {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        async function fetchUser() {
            const response = await fetch(`/api/users/${userId}`);
            const data: User = await response.json();
            setUser(data);
        }
        fetchUser();
    }, [userId]);
    
    if (!user) return <div>Loading...</div>;
    
    return <div>{user.name}</div>;
}
```

## Typing Custom Hooks

```typescript
import { useState, useEffect } from 'react';

interface UseFetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((data: T) => {
                setData(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err);
                setLoading(false);
            });
    }, [url]);
    
    return { data, loading, error };
}

// Usage
function UserList() {
    const { data, loading, error } = useFetch<User[]>('/api/users');
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <ul>
            {data?.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
    );
}
```

## Typing Context

```typescript
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
}
```

## Typing Refs

```typescript
import { useRef } from 'react';

function TextInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const focusInput = () => {
        inputRef.current?.focus();
    };
    
    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}
```

## Typing Form Events

```typescript
function ContactForm() {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ email, message });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
            />
            <textarea
                value={message}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setMessage(e.target.value)
                }
            />
            <button type="submit">Submit</button>
        </form>
    );
}
```

## Visual Explanation: TypeScript + React Flow

Here's how TypeScript works with React:

```
Component Definition:
┌─────────────────────────────┐
│ interface Props {            │
│     name: string;           │
│     age: number;            │
│ }                           │
│                             │
│ function Component(props) { │
│     // TypeScript checks    │
│     // types here           │
│ }                           │
└─────────────────────────────┘
         │
         │ TypeScript validates
         │
    ┌────┴────┐
    │         │
Valid?    Invalid?
    │         │
    ▼         ▼
Compiles  Error!
```

## Frequently Asked Questions (FAQ)

### Q1: Do I need to type everything in React?

**A:** Not everything, but it's good practice. Type props, state, and function parameters. TypeScript can infer many types automatically.

### Q2: What's React.FC?

**A:** `React.FC` (Function Component) is a type for functional components. It's optional - you can just type props directly.

### Q3: How do I type useState?

**A:** Provide the type parameter:

```typescript
const [count, setCount] = useState<number>(0);
```

### Q4: Can I use TypeScript with React hooks?

**A:** Yes! All hooks work with TypeScript. Just provide types:

```typescript
const [state, setState] = useState<MyType>(initialValue);
```

### Q5: How do I type event handlers?

**A:** Use React's event types:

```typescript
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
```

### Q6: What's the difference between React.ReactNode and React.ReactElement?

**A:** 
- **ReactNode** - Can be string, number, element, etc. (more flexible)
- **ReactElement** - Must be a React element

Use `ReactNode` for children in most cases.

### Q7: How do I type refs?

**A:** Use the element type:

```typescript
const inputRef = useRef<HTMLInputElement>(null);
```

### Q8: Can I use TypeScript with React Router?

**A:** Yes! React Router has TypeScript support. Types are included in the package.

### Q9: How do I type API responses?

**A:** Define interfaces for your API data:

```typescript
interface ApiResponse {
    data: User[];
    status: number;
}
```

### Q10: Is TypeScript required for React?

**A:** No! But it's highly recommended. It makes React development safer and easier, especially for larger projects.

---

## Next Steps

Now that you understand TypeScript with React, here's what to learn next:

- **Next:** Learn about [TypeScript Interfaces](/typescript/typescript-interfaces) - Define prop types
- Explore [TypeScript Advanced Types](/typescript/typescript-advanced) - Generics, unions, and more
- Understand [TypeScript Best Practices](/typescript/typescript-best-practices) - Write better TypeScript code
- Master [React with TypeScript Patterns](/react/react-typescript-patterns) - Common patterns and solutions

TypeScript makes React development much better. Practice typing your React components to get comfortable!
