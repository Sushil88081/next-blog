---
title: "Creating Custom Hooks in React"
date: "2025-01-18"
description: "Learn how to create your own custom React hooks. Reuse logic across components with simple examples and best practices."
category: "React Advanced"
tags: ["react", "hooks", "custom hooks", "reusable logic", "react hooks"]
image: "/assets/images/react.jpg"
author: "Sushil Kumar"
---

# Creating Custom Hooks in React

Hey there! Today I'm going to teach you about custom hooks in React. These are super cool because they let you reuse logic across different components. Let me explain it simply!

## What are Custom Hooks?

A custom hook is just a JavaScript function that starts with "use" and can use other React hooks inside it. That's it! Nothing fancy.

The idea is simple: if you find yourself writing the same code in multiple components, extract it into a custom hook. Then you can use that logic anywhere!

## Why Use Custom Hooks?

Before custom hooks, you had to copy-paste the same code everywhere. Not fun! Custom hooks let you:

- Reuse logic easily
- Keep your components clean
- Share logic between components
- Make testing easier

## Your First Custom Hook

Let's start with something simple - a counter hook:

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

Now you can use it in any component:

```jsx
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

Pretty neat, right? Now you can use this counter logic anywhere without rewriting it!

## Fetching Data Custom Hook

Here's a more useful example - fetching data from an API:

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}
```

Now using it is super simple:

```jsx
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/user/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Name: {data.name}</div>;
}
```

See how clean that is? All the loading and error handling is in one place!

## Local Storage Hook

Here's a hook to save data to browser storage:

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

Usage:

```jsx
function Settings() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

The theme will persist even after you refresh the page!

## Toggle Hook

This one is super simple but useful:

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [value, toggle, setTrue, setFalse];
}
```

Use it like this:

```jsx
function Modal() {
  const [isOpen, toggle, open, close] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle Modal</button>
      {isOpen && <div>Modal content here</div>}
    </div>
  );
}
```

Super clean and reusable!

## Window Size Hook

Want to know the window size? Here's a hook for that:

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
```

Usage:

```jsx
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window size: {width} x {height}
      {width < 768 && <div>Mobile view!</div>}
    </div>
  );
}
```

## Debounce Hook

This is useful for search inputs - wait until user stops typing:

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

Use it:

```jsx
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // This only runs 500ms after user stops typing
    if (debouncedSearch) {
      // Make API call here
      console.log("Searching for:", debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  );
}
```

This prevents making API calls on every keystroke!

## Online Status Hook

Check if user is online:

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
```

Simple and useful!

## Rules for Custom Hooks

Remember these rules:

1. **Always start with "use"** - React needs this to know it's a hook
2. **Only call other hooks** - You can use useState, useEffect, etc.
3. **Don't call hooks conditionally** - Always at the top level
4. **Return what you need** - Can return anything: values, functions, objects, arrays

## Organizing Custom Hooks

I like to put all my custom hooks in a `hooks` folder:

```
src/
  hooks/
    useCounter.js
    useFetch.js
    useLocalStorage.js
  components/
    Counter.js
```

This keeps everything organized and easy to find.

## Tips and Best Practices

- Keep hooks focused on one thing
- Use descriptive names
- Document what your hook does
- Share hooks across projects if they're generic
- Test your hooks separately

## Common Mistakes

Here's what to avoid:

1. **Forgetting the "use" prefix** - React won't recognize it as a hook

2. **Calling hooks conditionally** - Always call at top level

3. **Not cleaning up** - Remember to remove event listeners, timers, etc.

4. **Making hooks too complex** - Keep them simple and focused

## Conclusion

Custom hooks are awesome! They help you write cleaner code and reuse logic easily. Start with simple hooks, then build more complex ones as you need them.

The key is: if you're repeating code, make it a hook. That's it!

Practice by creating your own hooks for common patterns in your projects. Soon you'll have a library of useful hooks!

## Visual Explanation: Custom Hook Reusability

Here's how custom hooks enable code reuse:

```
Without Custom Hook:
┌─────────────────────────────┐
│ Component A                 │
│ - useState logic            │
│ - useEffect logic           │
│ - Event handlers            │
└─────────────────────────────┘

┌─────────────────────────────┐
│ Component B                 │
│ - Same useState logic       │ ← Duplicated!
│ - Same useEffect logic      │ ← Duplicated!
│ - Same event handlers       │ ← Duplicated!
└─────────────────────────────┘

With Custom Hook:
┌─────────────────────────────┐
│ useCustomHook()            │
│ - useState logic            │
│ - useEffect logic           │
│ - Returns values/functions  │
└───────────┬─────────────────┘
            │
    ┌───────┴───────┐
    │               │
    ▼               ▼
Component A    Component B
Uses hook      Uses hook
(No duplication!)
```

## Custom Hook Structure

```
┌─────────────────────────────┐
│ function useCustomHook() {  │
│   // 1. Use other hooks     │
│   const [state] = useState()│
│   useEffect(() => {})       │
│                             │
│   // 2. Custom logic        │
│   // ...                    │
│                             │
│   // 3. Return values       │
│   return { state, handler } │
│ }                           │
└─────────────────────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: What makes a custom hook?

**A:** A function that:
- Starts with "use" (required!)
- Can call other hooks
- Returns values/functions

That's it! It's just a regular function following these rules.

### Q2: Can I use hooks inside custom hooks?

**A:** Yes! That's the whole point. Custom hooks can use useState, useEffect, and any other hooks.

### Q3: Do custom hooks need to return something?

**A:** Not always! Some hooks just set up side effects:

```jsx
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  // No return needed
}
```

### Q4: Can I have multiple custom hooks in one component?

**A:** Yes! Use as many as you need:

```jsx
function Component() {
  const data = useFetch('/api/data');
  const windowSize = useWindowSize();
  const theme = useTheme();
  // Multiple custom hooks!
}
```

### Q5: Should I put custom hooks in separate files?

**A:** Yes! Put them in a `hooks` folder:

```
src/
  hooks/
    useFetch.js
    useWindowSize.js
    useTheme.js
```

### Q6: Can custom hooks accept parameters?

**A:** Yes! They're just functions:

```jsx
function useFetch(url) {
  // Use url parameter
}
```

### Q7: What's the difference between custom hook and regular function?

**A:** 
- **Custom Hook** - Can use hooks, starts with "use"
- **Regular Function** - Can't use hooks

If it uses hooks, it's a custom hook!

### Q8: Can I share custom hooks between projects?

**A:** Yes! Many developers publish custom hooks as npm packages. You can too!

### Q9: How do I test custom hooks?

**A:** Use `@testing-library/react-hooks`:

```jsx
import { renderHook } from '@testing-library/react-hooks';

test('useCounter works', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
});
```

### Q10: When should I create a custom hook?

**A:** When you:
- Use the same hook logic in multiple components
- Want to separate logic from UI
- Need to test logic independently

Don't create hooks for one-time use!

---

## Next Steps

Now that you understand custom hooks, here's what to learn next:

- **Next:** Learn about [Context API](/react/react-context-api) - Combine Context with custom hooks
- Explore [React Router](/react/react-router-basics) - Add navigation to your React app
- Master [Performance Tips](/react/react-performance-tips) - Optimize your hooks
