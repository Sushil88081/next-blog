---
title: "Event Handling in React - Complete Guide"
date: "2025-01-08"
description: "Learn how to handle events in React. Understand onClick, onChange, onSubmit and other common events with examples."
category: "React Basics"
tags: ["react", "events", "onClick", "onChange", "event-handling"]
image: "/images/react-events.jpg"
author: "Sushil Kumar"
---

# Event Handling in React - Complete Guide

Event handling is how React responds to user interactions. When someone clicks a button, types in an input, or submits a form, you need to handle those events. React's event system is similar to HTML events, but there are some important differences you should know about.

## Basic Event Handling

### onClick Event

The most common event is probably `onClick`. Here's how it works:

```jsx
function Button() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

You can also use inline functions:

```jsx
function Button() {
  return (
    <button onClick={() => alert('Clicked!')}>
      Click me
    </button>
  );
}
```

Both ways work! Use named functions for complex logic, and inline functions for simple stuff.

## Common Events

### onChange Event

This fires when an input's value changes:

```jsx
function Input() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Type something..."
    />
  );
}
```

This is how you make controlled inputs in React. The input's value is controlled by state!

### onSubmit Event

Handle form submissions:

```jsx
function Form() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Notice `e.preventDefault()` - this stops the form from refreshing the page, which is usually what you want in React apps.

### onMouseOver and onMouseOut

These fire when the mouse enters or leaves an element:

```jsx
function HoverButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? 'blue' : 'gray'
      }}
    >
      Hover me
    </button>
  );
}
```

Great for hover effects and tooltips!

## Event Object

Event handler functions automatically receive an event object:

```jsx
function Input() {
  const handleChange = (e) => {
    console.log(e.target.value); // Input value
    console.log(e.target.name);  // Input name
    console.log(e.type);         // Event type
  };

  return <input onChange={handleChange} />;
}
```

The `e.target` gives you access to the element that triggered the event. Super useful!

## Synthetic Events

React uses Synthetic Events, which wrap native browser events. This gives React more control and better performance:

```jsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event bubbling
    console.log('Clicked!');
  };

  return <button onClick={handleClick}>Click</button>;
}
```

Synthetic events work the same as native events, but React optimizes them under the hood.

## Passing Arguments

Sometimes you need to pass extra data to your event handler:

```jsx
function TodoList({ todos }) {
  const handleDelete = (id) => {
    console.log('Deleting:', id);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleDelete(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

The arrow function `() => handleDelete(todo.id)` lets you pass the `todo.id` to the handler. This is super common!

## Event Handler Best Practices

### 1. Use Named Functions

For complex logic, use named functions:

```jsx
// Good - Easy to read and test
function Component() {
  const handleClick = () => { 
    // Complex logic here
  };
  return <button onClick={handleClick}>Click</button>;
}

// Avoid for complex logic
function Component() {
  return <button onClick={() => { 
    // Too much logic inline
  }}>Click</button>;
}
```

Named functions are easier to read, test, and debug.

### 2. useCallback for Performance

If you're passing handlers to child components, use useCallback:

```jsx
import { useCallback } from 'react';

function Component() {
  const handleClick = useCallback(() => {
    // Handler logic
  }, []);

  return <button onClick={handleClick}>Click</button>;
}
```

This prevents unnecessary re-renders of child components.

### 3. Prevent Default Behavior

Always prevent default when needed:

```jsx
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    // Your form handling logic
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

Without `preventDefault()`, the form would submit normally and refresh the page.

## Multiple Event Handlers

You can attach multiple handlers to one element:

```jsx
function Input() {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    console.log('Input focused');
  };

  const handleBlur = () => {
    console.log('Input blurred');
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
```

Each event type can have its own handler. Pretty flexible!

## Event Bubbling

Events bubble up through the component tree in React:

```jsx
function Parent() {
  const handleParentClick = () => {
    console.log('Parent clicked');
  };

  return (
    <div onClick={handleParentClick}>
      <Child />
    </div>
  );
}

function Child() {
  const handleChildClick = (e) => {
    e.stopPropagation(); // Stop bubbling
    console.log('Child clicked');
  };

  return <button onClick={handleChildClick}>Click</button>;
}
```

If you click the button, both handlers fire unless you call `stopPropagation()`. This is useful sometimes, annoying other times!

## Common Event Types

Here's a quick reference of common events:

| Event | Description |
|-------|-------------|
| `onClick` | Mouse click |
| `onChange` | Input value change |
| `onSubmit` | Form submission |
| `onFocus` | Element focused |
| `onBlur` | Element blurred |
| `onMouseOver` | Mouse enters element |
| `onMouseOut` | Mouse leaves element |
| `onKeyDown` | Key pressed |
| `onKeyUp` | Key released |
| `onDoubleClick` | Double click |
| `onMouseEnter` | Mouse enters (doesn't bubble) |
| `onMouseLeave` | Mouse leaves (doesn't bubble) |

## Real-World Example

Here's a complete example combining multiple events:

```jsx
function SearchBox() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Searching for:', query);
      // Perform search
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className={isFocused ? 'focused' : ''}
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

This shows how multiple events work together in a real component.

## Tips and Tricks

1. **Always use camelCase** - `onClick`, not `onclick`
2. **Pass functions, not calls** - `onClick={handleClick}`, not `onClick={handleClick()}`
3. **Use preventDefault** when needed - Especially for forms
4. **Stop propagation** when needed - To prevent unwanted bubbling
5. **Name handlers clearly** - `handleClick`, `handleSubmit`, etc.

## Common Mistakes

Here's what to avoid:

1. **Calling the function instead of passing it**
   ```jsx
   // Wrong
   <button onClick={handleClick()}>
   
   // Right
   <button onClick={handleClick}>
   ```

2. **Forgetting preventDefault on forms**
   ```jsx
   // Wrong - Page refreshes
   <form onSubmit={handleSubmit}>
   
   // Right
   <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
   ```

3. **Not using camelCase**
   ```jsx
   // Wrong
   <button onclick={handleClick}>
   
   // Right
   <button onClick={handleClick}>
   ```

## Conclusion

Event handling is essential in React. It's how your app responds to users. Once you understand the basics, you'll be building interactive apps in no time!

Remember:
- Use camelCase for event names
- Pass functions, don't call them
- Use preventDefault for forms
- Handle events to make your app interactive

## Next Steps

Now that you understand events, here's what to learn next:

- **Next:** Learn about [Conditional Rendering](/react/react-conditional-rendering) - Show different content based on conditions
- Explore [Lists and Keys](/react/react-lists-keys) - Render dynamic lists with event handlers
- Study [Forms in React](/react/react-forms) - Handle form inputs and validation

Happy coding! 🎉
