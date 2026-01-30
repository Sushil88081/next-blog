---
title: "React Refs - Accessing DOM Elements Directly"
date: "2025-01-19"
description: "Learn about React refs to access DOM elements directly. Understand useRef hook and when to use refs in React components."
category: "React Advanced"
tags: ["react", "refs", "useRef", "dom", "direct-access"]
image: "/assets/images/react.jpg"
author: "Sushil Kumar"
---

# React Refs - Accessing DOM Elements Directly

Sometimes in React, you need to directly access a DOM element. Maybe you want to focus an input, measure its size, or integrate with a third-party library. That's where refs come in!

## What are Refs?

Refs are React's way of giving you direct access to DOM elements or React component instances. Think of them as a way to "reference" an element so you can do things with it that you normally can't do through React's normal data flow.

## When to Use Refs

Use refs when you need to:
- Focus an input field
- Measure element size
- Play a video or audio
- Integrate with non-React libraries
- Trigger animations
- Access form values (though usually state is better)

**Important:** Don't overuse refs! Most of the time, React's state and props are enough.

## Basic useRef Hook

The `useRef` hook creates a ref:

```jsx
import { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);
  
  return <input ref={inputRef} />;
}
```

The `useRef(null)` creates a ref object. The `ref={inputRef}` connects it to the input element.

## Focusing an Input

Here's a common use case - focusing an input when a button is clicked:

```jsx
function SearchBox() {
  const inputRef = useRef(null);
  
  const handleFocus = () => {
    inputRef.current.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Search..." />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

When you click the button, the input gets focused automatically!

## Accessing Input Value

You can also get the value directly (though useState is usually better):

```jsx
function Form() {
  const nameRef = useRef(null);
  
  const handleSubmit = () => {
    const name = nameRef.current.value;
    console.log('Name:', name);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Measuring Element Size

Refs are great for measuring elements:

```jsx
function MeasuredBox() {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    if (boxRef.current) {
      setSize({
        width: boxRef.current.offsetWidth,
        height: boxRef.current.offsetHeight
      });
    }
  }, []);
  
  return (
    <div ref={boxRef}>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
    </div>
  );
}
```

## Storing Values (Not Just DOM)

Refs can also store values that persist across renders but don't cause re-renders:

```jsx
function Counter() {
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);
  
  const increment = () => {
    countRef.current += 1;
    setRenderCount(renderCount + 1);
  };
  
  return (
    <div>
      <p>Count: {countRef.current}</p>
      <p>Renders: {renderCount}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

Notice how `countRef.current` changes but doesn't trigger a re-render. This is useful for things like timers or previous values.

## Refs with Class Components

If you're using class components (though functional is preferred), you use `createRef`:

```jsx
class MyComponent extends React.Component {
  inputRef = React.createRef();
  
  componentDidMount() {
    this.inputRef.current.focus();
  }
  
  render() {
    return <input ref={this.inputRef} />;
  }
}
```

But with functional components and hooks, `useRef` is much simpler!

## Forwarding Refs

Sometimes you want to pass a ref to a child component. Use `forwardRef`:

```jsx
const CustomInput = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

function Parent() {
  const inputRef = useRef(null);
  
  return (
    <CustomInput ref={inputRef} placeholder="Type here" />
  );
}
```

This lets parent components access the child's DOM element.

## Real-World Example: Auto-Focus on Mount

Here's a complete example that focuses an input when the component loads:

```jsx
function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  useEffect(() => {
    // Focus email input when component loads
    emailRef.current?.focus();
  }, []);
  
  const handleEmailEnter = (e) => {
    if (e.key === 'Enter') {
      passwordRef.current?.focus();
    }
  };
  
  return (
    <form>
      <input
        ref={emailRef}
        type="email"
        placeholder="Email"
        onKeyDown={handleEmailEnter}
      />
      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

This creates a nice user experience - email field is focused automatically, and pressing Enter moves to password!

## Common Patterns

### Pattern 1: Previous Value

```jsx
function Component({ value }) {
  const prevValue = useRef();
  
  useEffect(() => {
    prevValue.current = value;
  });
  
  return <div>Previous: {prevValue.current}</div>;
}
```

### Pattern 2: Timer Reference

```jsx
function Timer() {
  const intervalRef = useRef(null);
  
  const start = () => {
    intervalRef.current = setInterval(() => {
      console.log('Tick');
    }, 1000);
  };
  
  const stop = () => {
    clearInterval(intervalRef.current);
  };
  
  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

## When NOT to Use Refs

Don't use refs for:
- Managing component state (use useState)
- Triggering re-renders (use state)
- Passing data to children (use props)
- Most form handling (use controlled components)

Refs are for direct DOM manipulation, not for React's data flow!

## Tips and Best Practices

1. **Use sparingly** - Most things can be done with state/props
2. **Check for null** - `ref.current` might be null initially
3. **Use optional chaining** - `ref.current?.focus()` is safer
4. **Don't modify DOM directly** - Let React handle most updates
5. **Use for specific needs** - Focus, measurements, third-party libs

## Common Mistakes

### Mistake 1: Using refs for State

```jsx
// Wrong - Use state instead
const countRef = useRef(0);
countRef.current += 1;

// Right - Use state
const [count, setCount] = useState(0);
setCount(count + 1);
```

### Mistake 2: Not Checking for Null

```jsx
// Wrong - Might crash
inputRef.current.focus();

// Right - Check first
inputRef.current?.focus();
```

## Conclusion

Refs are a powerful tool for when you need direct DOM access. They're not used often, but when you need them, they're essential!

Remember:
- Use `useRef` to create refs
- Access elements via `ref.current`
- Use for focus, measurements, third-party libs
- Don't overuse - state/props are usually better

## Visual Explanation: Refs vs State

Here's when to use each:

```
┌─────────────────┬─────────────────┐
│      REFS       │      STATE      │
├─────────────────┼─────────────────┤
│ DOM access      │ Component data  │
│ No re-render    │ Triggers render │
│ Mutable         │ Immutable       │
│ .current        │ Direct access   │
│                 │                 │
│ Use for:        │ Use for:        │
│ - Focus         │ - Display data  │
│ - Measurements  │ - User input     │
│ - Third-party   │ - Calculations   │
│   libraries     │                 │
└─────────────────┴─────────────────┘
```

## Ref Flow Diagram

```
Component Renders
       │
       ▼
┌──────────────┐
│ useRef()     │
│ Creates ref  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ ref={inputRef}│
│ Connects to   │
│ DOM element   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ ref.current  │
│ Points to    │
│ DOM element  │
└──────────────┘
```

## Frequently Asked Questions (FAQ)

### Q1: When should I use refs vs state?

**A:** 
- **Refs** - For DOM access, values that don't need re-renders
- **State** - For data that affects what's displayed

If changing it should update UI, use state. Otherwise, consider refs.

### Q2: Can I use refs to update state?

**A:** Technically yes, but it's usually wrong. Refs don't trigger re-renders, so UI won't update. Use state instead.

### Q3: What's the difference between useRef and useState?

**A:** 
- **useState** - Creates state that triggers re-renders
- **useRef** - Creates mutable value that doesn't trigger re-renders

### Q4: Can I use refs in functional components?

**A:** Yes! That's what useRef is for. In class components, you'd use `createRef()` or callback refs.

### Q5: What happens if ref.current is null?

**A:** It means the element hasn't mounted yet or was removed. Always check:

```jsx
if (inputRef.current) {
  inputRef.current.focus();
}
```

### Q6: Can I use refs with custom components?

**A:** Yes, but you need `forwardRef`:

```jsx
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

### Q7: How do I access multiple refs?

**A:** Create multiple refs:

```jsx
const inputRef = useRef(null);
const buttonRef = useRef(null);
```

### Q8: Can I store values in refs?

**A:** Yes! Refs can store any value, not just DOM elements. Useful for values that persist but don't trigger renders.

### Q9: What's a callback ref?

**A:** Instead of useRef, you can use a function:

```jsx
<input ref={(el) => { inputElement = el; }} />
```

Less common now, but still works.

### Q10: Do refs persist across re-renders?

**A:** Yes! That's the point. Refs persist their `.current` value across renders, unlike regular variables.

---

## Next Steps

Now that you understand refs, here's what to learn next:

- **Next:** Learn about [Context API](/react/react-context-api) - Share data across components
- Explore [React Router](/react/react-router-basics) - Add navigation to your app
- Understand [Error Handling](/react/react-error-handling) - Handle errors gracefully

Happy coding! 🚀

