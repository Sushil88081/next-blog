---
title: "React Context API - Easy State Management"
date: "2025-02-05"
description: "What is React Context API and how to use it? Learn how to use Context API to avoid props drilling and share data across components."
category: "React Advanced"
tags: ["react", "context", "state-management", "props-drilling"]
image: "/images/react-context.jpg"
author: "Sushil Kumar"
---

# React Context API - Easy State Management

React Context API is a powerful feature that lets you share data across your component tree without passing props down manually at every level. It's React's built-in solution for avoiding "props drilling" - that annoying pattern where you pass props through components that don't even use them!

## What is Context API?

Context API is React's built-in way to manage state globally. It lets you share data with deeply nested components without passing props through every level in between.

Think of it like a shared storage box that any component can access, no matter how deep it's nested in your component tree.

## The Props Drilling Problem

When you have nested components and need to pass data from top to bottom, you end up passing props through every level - even components that don't use them. This is called "props drilling":

```jsx
// Props drilling example
function App() {
  const user = { name: "John", age: 25 };
  return <Header user={user} />;
}

function Header({ user }) {
  return <Navbar user={user} />;
}

function Navbar({ user }) {
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  return <div>{user.name}</div>;
}
```

See how `Header` and `Navbar` don't actually use `user`, but they still have to pass it down? That's props drilling, and it gets annoying fast!

## Using Context API

Context API solves this problem. Here's how:

### 1. Create a Context

First, create a context:

```jsx
import { createContext } from 'react';

const UserContext = createContext();
```

### 2. Create a Provider

Wrap your components with a Provider:

```jsx
function App() {
  const user = { name: "John", age: 25 };
  
  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}
```

### 3. Use the Context

Any component inside the Provider can access the context:

```jsx
import { useContext } from 'react';

function UserProfile() {
  const user = useContext(UserContext);
  return <div>{user.name}</div>;
}
```

Now `UserProfile` can access `user` directly, without props drilling!

## Complete Example

Here's a complete example with state management:

```jsx
import { createContext, useContext, useState } from 'react';

// Create Context
const ThemeContext = createContext();

// Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom Hook
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </header>
  );
}
```

This is a common pattern - create a Provider, make a custom hook, and use it anywhere!

## Benefits of Context API

1. **No Props Drilling** - Access data directly without passing through every level
2. **Cleaner Code** - Code is more organized and easier to maintain
3. **Performance** - Can prevent unnecessary re-renders with proper setup
4. **Built-in Solution** - No need for external libraries

## Drawbacks of Context API

1. **Overuse** - Don't use Context for everything! Only for truly global state
2. **Re-renders** - All consumers re-render when context value changes
3. **Testing** - Can make testing a bit more complex

## When to Use Context

Use Context when:
- You have data that many components need
- Props drilling is getting annoying
- You need theme, user, or language settings
- You want to share state across distant components

Don't use Context when:
- Only a few components need the data
- Props drilling is simple (1-2 levels)
- The data changes frequently (consider state management libraries)

## Best Practices

### 1. Use Context for Global State Only

Don't use Context for everything. Only for truly global concerns:

```jsx
// Good - Global theme
const ThemeContext = createContext();

// Avoid - Local component state
const ButtonContext = createContext(); // Just use props!
```

### 2. Create Multiple Contexts

Separate concerns into different contexts:

```jsx
const ThemeContext = createContext();
const UserContext = createContext();
const LanguageContext = createContext();
```

This prevents unnecessary re-renders and keeps things organized.

### 3. Use Memoization

Memoize context values to prevent unnecessary re-renders:

```jsx
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### 4. Create Custom Hooks

Always create custom hooks for your contexts:

```jsx
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

This gives better error messages and makes usage cleaner.

## Real-World Example

Here's a complete user authentication example:

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav>
      {user ? (
        <>
          <span>Hello, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button>Login</button>
      )}
    </nav>
  );
}
```

This shows how Context works in a real app!

## Common Mistakes

Here's what to avoid:

1. **Overusing Context** - Don't use it for everything!
2. **Not memoizing values** - Causes unnecessary re-renders
3. **Forgetting error handling** - Always check if context exists
4. **Creating contexts in components** - Create them outside!

## Conclusion

Context API is a powerful tool for managing global state in React. It solves the props drilling problem and makes your code cleaner. Just remember to use it wisely - not everything needs to be in Context!

Key points:
- Use Context for global state
- Create custom hooks for better DX
- Memoize context values
- Don't overuse it

## Next Steps

Now that you understand Context API, check out:
- Learn about [State Management Libraries](/react/react-state) - Redux, Zustand, etc.
- Explore [Performance Optimization](/react/react-performance-tips) - Optimize Context usage
- Study [Advanced Patterns](/react/react-custom-hooks) - Combine Context with custom hooks

Happy coding! 🚀
